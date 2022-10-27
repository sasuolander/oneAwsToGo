npm run build

cdk deploy
cdk bootstrap aws://ACCOUNT/eu-west-1 --profile profile

cdk destroy RuntimeEnviromentStack --profile <profiles> --require-approval never
cdk deploy RuntimeEnviromentStack --profile <profiles> --require-approval never
cdk synth | Out-File -FilePath ./templateCloudformation/template.yaml
