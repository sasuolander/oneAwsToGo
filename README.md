
CDK

bootstrap your account, replace ACCOUNT with your own account id

cdk bootstrap aws://ACCOUNT/eu-west-1 --profile profile

Remember destroy infra after testing, this stack is not secure and it is going to cost

 Open termintal in \oneAwsToGo\infra\runtimeEnviroment
Create :

cdk deploy RuntimeEnvironmentStack --profile <profile name> --require-approval never

destroy :

cdk destroy RuntimeEnvironmentStack --profile <profile name> --require-approval never

start database:

docker-compose -f .\oneAwsToGo\system.yml -p oneawssystem up

You can use dbeaver to connect to database.


