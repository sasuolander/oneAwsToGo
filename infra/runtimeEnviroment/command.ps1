npm run build

cdk deploy
cdk bootstrap aws://642492382028/eu-west-1 --profile sasuAdmin

cdk destroy RuntimeEnviromentStack --profile sasuAdmin --require-approval never
cdk deploy RuntimeEnviromentStack --profile sasuAdmin --require-approval never
 cdk synth | Out-File -FilePath ./templateCloudformation/template.yaml
