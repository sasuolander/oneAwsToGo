How to run:
You can start the server with the "npm start" command.
The server will run on port 3000
Currently HTTP GET and POST are available on: /users, /templates
HTTP GET, PUT and DELETE are available on: /users/:id, /templates:id

Create file .env with properties:
TEMP_FOLDER=
AWS_PROFILE= // aws profile, , for local debugging
AWS_REGION=eu-west-1 // aws region, for local debugging
SERVER_PORT= // server port

dbUser=oneawstogo
dbHost=localhost
dbDatabase=oneawstogo
dbPort=5432
dbPassword=oneawstogo

Bundle source code by npm build

load database with test data:

npx knex --knexfile ./src/database/knexConfig.ts seed:run


run migration:

npx knex --knexfile ./BACKEND/knexConfig.ts migrate:latest


REMEMBER to always run CREATE SEQUENCE serial START 101; on db before testing it.
