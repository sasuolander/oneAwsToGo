
export enum TemplateFormat {
    CloudFormation = 1,
    CDK,
    TerraForm,
}

interface ITemplate {
    id: number;
    name: string;
    url: string;
    templateFormat:TemplateFormat;
    templateSourceCode:string;
  };
export class Template implements ITemplate {
    id: number;
    name: string;
    templateFormat: TemplateFormat;
    templateSourceCode: string;
    url: string;

    constructor(id: number, name: string, templateFormat: TemplateFormat, templateSourceCode: string, url: string) {
        this.id = id;
        this.name = name;
        this.templateFormat = templateFormat;
        this.templateSourceCode = templateSourceCode;
        this.url = url;
    }

}

export default ITemplate;
