import * as cdk from 'aws-cdk-lib';
import {aws_ec2, aws_logs, IgnoreMode} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {DockerImageAsset} from "aws-cdk-lib/aws-ecr-assets";
import {Cluster, ContainerImage, FargateTaskDefinition, LogDriver} from "aws-cdk-lib/aws-ecs";
import {Vpc} from "aws-cdk-lib/aws-ec2";
import {NetworkLoadBalancedFargateService} from "aws-cdk-lib/aws-ecs-patterns";

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
        /*const myCustomPolicy = new PolicyDocument({
            statements: [new PolicyStatement({
                actions: [
                    'cloudformation:*',
                ],
                principals: [new AccountRootPrincipal()],
                resources: ['*'],
            })],
        });*/
      //  const role = new Role(this,appName+"role", {roleName:"RightForInfra",inlinePolicies:{}})

        const taskDefinition = new FargateTaskDefinition(this,appName,{cpu:256 })

        taskDefinition.addContainer(appName+"taskDefinition",{
            cpu:256,
            memoryLimitMiB:512 ,
            image:ContainerImage.fromDockerImageAsset(asset),
            environment:{"temp": "something"},
            logging: LogDriver.awsLogs({logRetention:aws_logs.RetentionDays.FIVE_DAYS,streamPrefix:"aws"})
        }).addPortMappings({hostPort:80,containerPort:80})


        const loadBalancedFargateService = new NetworkLoadBalancedFargateService(this,appName+"serverloadbancer",{
            serviceName: "",
            cluster : serviceCluster,
            cpu:256,
            desiredCount:2,
            taskDefinition:taskDefinition,
            memoryLimitMiB:512 ,
            listenerPort: 80,
            publicLoadBalancer:true // remember turn this off after testing
        })
        // check this configuration for security whole, in actual production add firewall and other security systems

        // health check failure, check port and what it is testing
        loadBalancedFargateService.service.connections.allowToAnyIpv4(aws_ec2.Port.tcp(80))
        loadBalancedFargateService.service.connections.allowInternally(aws_ec2.Port.tcp(80))
        loadBalancedFargateService.service.connections.allowFromAnyIpv4(aws_ec2.Port.tcp(80))
    }
}
