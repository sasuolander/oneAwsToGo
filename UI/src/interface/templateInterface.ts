export enum TemplateFormat {
    CloudFormation = 1,
    CDK,
    TerraForm,
}

export default interface ITemplate {
    id: number;
    name: string;
    formConfig:string
    templateFormat:TemplateFormat;
  };
