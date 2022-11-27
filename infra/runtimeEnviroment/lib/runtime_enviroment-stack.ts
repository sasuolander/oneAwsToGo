import * as cdk from 'aws-cdk-lib';
import {aws_ec2, aws_logs, IgnoreMode} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {DockerImageAsset} from "aws-cdk-lib/aws-ecr-assets";
import {Cluster, ContainerImage, FargateTaskDefinition, LogDriver} from "aws-cdk-lib/aws-ecs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import {SubnetSelection, Vpc} from "aws-cdk-lib/aws-ec2";
import {ApplicationLoadBalancedFargateService} from "aws-cdk-lib/aws-ecs-patterns";
import {PolicyStatement, Role, ServicePrincipal} from "aws-cdk-lib/aws-iam";
import * as rds from 'aws-cdk-lib/aws-rds';

export class RuntimeEnviromentStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        const rootDockerfile = `${__dirname}/../../../`
        console.log("rootDockerfile",rootDockerfile)
       const asset = new DockerImageAsset(this, 'OneAwsImage', {
            directory: rootDockerfile,
           file: 'server.dockerfile',
           ignoreMode:IgnoreMode.DOCKER
        });

        const appName = 'oneAwsToGo-';

        const vpc = new ec2.Vpc(this, appName+"VPC", {
            natGateways: 0,
            maxAzs: 2,
            subnetConfiguration: [
                {
                    name: 'public-subnet-1',
                    subnetType: ec2.SubnetType.PUBLIC,
                    cidrMask: 24,
                },
                {
                    name: 'isolated-subnet-1',
                    subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
                    cidrMask: 28,
                },
            ],
        });

        const serviceCluster = new Cluster(this, appName+"ServiceCluster",{vpc:vpc})
        serviceCluster.addDefaultCloudMapNamespace({name:"service.local"})

        const execRole = new Role(this, appName+'execRole', {
            assumedBy: new ServicePrincipal('ecs-tasks.amazonaws.com')
        })

        execRole.addToPolicy(new PolicyStatement({
            actions: [
                'sts:AssumeRole',
            ],
            resources: ['*'],
        }))

        const containerTaskRole = new Role(this, appName+'MyAppTaskRole', {
            assumedBy: new ServicePrincipal('ecs-tasks.amazonaws.com')
        })
        containerTaskRole.addToPolicy(new PolicyStatement({
            actions: [
                'cloudformation:*', // check in later stage all needed action and limit only to these
                // here start listing all supported recourse
                's3:*'
                ,
                'EC2:*'
            ],
            resources: ['*'],
        }))
        const taskDefinition = new FargateTaskDefinition(this,appName,{cpu:256,executionRole:execRole,taskRole:containerTaskRole})
        // some strange problem with pulling from ECR when using private VPC
        taskDefinition.addContainer(appName+"taskDefinition",{
            cpu:256,
            memoryLimitMiB:512 ,
            image:ContainerImage.fromDockerImageAsset(asset),
            environment:{"temp": "something"},
            logging: LogDriver.awsLogs({logRetention:aws_logs.RetentionDays.FIVE_DAYS,streamPrefix:"aws"})
        }).addPortMappings({hostPort:80,containerPort:80})

        const loadBalancedFargateService = new ApplicationLoadBalancedFargateService(this,appName+"loadBalancer",{
            serviceName: "oneAWSGoService",
            cluster : serviceCluster,
            cpu:256,
            desiredCount:1,
            taskDefinition:taskDefinition,
            memoryLimitMiB:512 ,
            listenerPort: 80,
            //redirectHTTP: true,
            //sslPolicy:SslPolicy.RECOMMENDED,
            publicLoadBalancer:false, // remember turn this off after testing
            taskSubnets:   {
                subnetType:ec2.SubnetType.PUBLIC,
                 }as SubnetSelection
        })
        // check this configuration for security whole, in actual production add firewall/WAF and other security systems

        loadBalancedFargateService.service.connections.allowToAnyIpv4(aws_ec2.Port.tcp(80))
        loadBalancedFargateService.service.connections.allowFromAnyIpv4(aws_ec2.Port.tcp(80)) // http

        loadBalancedFargateService.service.connections.allowToAnyIpv4(aws_ec2.Port.tcp(443))
        loadBalancedFargateService.service.connections.allowFromAnyIpv4(aws_ec2.Port.tcp(443)) // https

        loadBalancedFargateService.service.connections.allowInternally(aws_ec2.Port.tcp(80)) // http
        loadBalancedFargateService.service.connections.allowInternally(aws_ec2.Port.tcp(443)) // https

        loadBalancedFargateService.service.connections.allowInternally(aws_ec2.Port.tcp(5432)) // postgresql

   /*     const  securityGroup = new SecurityGroup(this,appName+"securityGroupPublic",{vpc:vpc})

        securityGroup.addIngressRule(aws_ec2.Peer.ipv4("85.76.87.24/32"),aws_ec2.Port.tcp(80))

        const publicLoadBalancer = new ApplicationLoadBalancer(this,appName+"publicLoadBalancer",{internetFacing:true,vpc:vpc,
            })

        const target = new AutoScalingGroup(this,appName+"autoScalingGroup",
            {vpc:vpc,
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
            machineImage: new ec2.AmazonLinuxImage()})

        publicLoadBalancer.connections.allowFrom(new aws_ec2.Connections({securityGroups:[securityGroup]}),aws_ec2.Port.tcp(80))
        target.attachToApplicationTargetGroup(loadBalancedFargateService.targetGroup)*/


        // create RDS instance
        const dbInstance = new rds.DatabaseInstance(this, 'db-instance', {
            vpc,
            vpcSubnets: {
                subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
            },
            engine: rds.DatabaseInstanceEngine.postgres({
                version: rds.PostgresEngineVersion.VER_14_1,
            }),
            instanceType: ec2.InstanceType.of(
                ec2.InstanceClass.BURSTABLE3,
                ec2.InstanceSize.MICRO,
            ),
            credentials: rds.Credentials.fromGeneratedSecret('postgres'),
            multiAz: false,
            allocatedStorage: 100,
            maxAllocatedStorage: 105,
            allowMajorVersionUpgrade: false,
            autoMinorVersionUpgrade: true,
            backupRetention: cdk.Duration.days(0),
            deleteAutomatedBackups: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            deletionProtection: false,
            databaseName: 'oneAWSDatabase',
            publiclyAccessible: false,
        });


    }
}
