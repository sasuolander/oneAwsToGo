
export default interface IDeploy<T,A> {
    deploy(deploymentName:string,templateData:string,parameter:A):T
}
