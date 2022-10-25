import * as cdk from 'aws-cdk-lib';
import {aws_ec2, aws_logs, IgnoreMode} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {DockerImageAsset} from "aws-cdk-lib/aws-ecr-assets";
import {Cluster, ContainerImage, FargateTaskDefinition, LogDriver} from "aws-cdk-lib/aws-ecs";
import {Vpc} from "aws-cdk-lib/aws-ec2";
import {NetworkLoadBalancedFargateService} from "aws-cdk-lib/aws-ecs-patterns";
import {PolicyStatement, Role, ServicePrincipal} from "aws-cdk-lib/aws-iam";

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
        const vpc =new  Vpc(this, appName+"VPC", {maxAzs:2})
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
            ],
            resources: ['*'],
        }))
        const taskDefinition = new FargateTaskDefinition(this,appName,{cpu:256,executionRole:execRole,taskRole:containerTaskRole})

        taskDefinition.addContainer(appName+"taskDefinition",{
            cpu:256,
            memoryLimitMiB:512 ,
            image:ContainerImage.fromDockerImageAsset(asset),
            environment:{"temp": "something"},
            logging: LogDriver.awsLogs({logRetention:aws_logs.RetentionDays.FIVE_DAYS,streamPrefix:"aws"})
        }).addPortMappings({hostPort:80,containerPort:80})

        const loadBalancedFargateService = new NetworkLoadBalancedFargateService(this,appName+"serverloadbancer",{
            serviceName: "oneAWSGoService",
            cluster : serviceCluster,
            cpu:256,
            desiredCount:2,
            taskDefinition:taskDefinition,
            memoryLimitMiB:512 ,
            listenerPort: 80,
            publicLoadBalancer:true // remember turn this off after testing
        })
        // check this configuration for security whole, in actual production add firewall/WAF and other security systems

        loadBalancedFargateService.service.connections.allowToAnyIpv4(aws_ec2.Port.tcp(80))
        loadBalancedFargateService.service.connections.allowFromAnyIpv4(aws_ec2.Port.tcp(80)) // http

        loadBalancedFargateService.service.connections.allowToAnyIpv4(aws_ec2.Port.tcp(443))
        loadBalancedFargateService.service.connections.allowFromAnyIpv4(aws_ec2.Port.tcp(443)) // https

        loadBalancedFargateService.service.connections.allowInternally(aws_ec2.Port.tcp(80)) // http
        loadBalancedFargateService.service.connections.allowInternally(aws_ec2.Port.tcp(443)) // https

        loadBalancedFargateService.service.connections.allowInternally(aws_ec2.Port.tcp(5432)) // postgresql
    }
}
