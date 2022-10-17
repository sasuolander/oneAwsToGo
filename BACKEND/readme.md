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


Bundle source code by npm build
