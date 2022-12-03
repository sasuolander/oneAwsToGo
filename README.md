
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

docker-compose -f .\database.yml -p oneawsdatabase up
You can use dbeaver to connect to database.

On Windows start whole systems

docker-compose --env-file .env -f .\wholeSystem.yml -p oneawssystem up

On Linux 

sudo docker compose --env-file .env -f ./wholeSystem.yml -p oneawssystem up

To create and populate database into container postgresql above when container is up. 
NOTE Script drops related tables if those exist!

NOTE Does not work in powershell.

docker exec -i oneawssystem_postgres_1 psql -U oneawstogo < initial_db_create.sql

On Linux based systems use

sudo docker exec -i oneawssystem-postgres-1 psql -U oneawstogo < initial_db_create.sql

Use the username "Dummy" and the password "dummy" to login to the service (without quotation marks).

