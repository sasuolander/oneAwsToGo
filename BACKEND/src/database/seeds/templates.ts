import { Knex } from "knex";
import ITemplate, {TemplateFormat} from "../../interfaces/templateInterface";
import emptysite from "../../../dummy_db/emptysite.json"
import wordpresssite from "../../../dummy_db/wordpresssite.json"

const templates = [
    {
        id : 1,
        name: "Website in S3 bucket",
        url:"https://raw.githubusercontent.com/sasuolander/templatesAWS/master/S3_Website_Bucket_With_Retain_On_Delete.yaml",
        templateFormat: TemplateFormat.CloudFormation, templateSourceCode:"",
        formConfig: JSON.stringify(emptysite)
    },
    {
        id : 2,
        name: "Wordpress site",
        url:"https://raw.githubusercontent.com/sasuolander/templatesAWS/master/WordPress_Single_InstanceOwn.yaml",
        templateFormat: TemplateFormat.CloudFormation, templateSourceCode:"",
        formConfig:JSON.stringify(wordpresssite)
    },
  ];
  
  export async function seed(knex: Knex): Promise<void> {
    console.log("Seeding")
    //await knex("template").truncate();
    await knex("template").insert(templates).then(()=>{
      console.log("Inserting seed")
    });
  }