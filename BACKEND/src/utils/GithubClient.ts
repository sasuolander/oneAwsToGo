import axios from "axios";
import Utils from "./Utils";

export default class GithubClient {
    async fetchTemplate(url: string): Promise<string> {
        return axios.get(url).then(r => {
         return r.data
     })
    }
    async getTemplate(templateName: string,templateURL:string="https://raw.githubusercontent.com/sasuolander/templatesAWS/master/S3_Website_Bucket_With_Retain_On_Delete.yaml"):Promise<string> {
        const dirr = process.env.TEMP_FOLDER + "\\" + templateName
        // TODO remove this hard coded value
        const response = await this.fetchTemplate(templateURL)
        // TODO check if we need this file creation when deploying template
        Utils.createFile(dirr, response)
        return response
    }
}
