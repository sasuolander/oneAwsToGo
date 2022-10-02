import axios from "axios";
import Utils from "./utils";

interface ICachePath {
    templateName: string
    templatePath: string
}

export default class GithubClient {
    static cache: ICachePath[]

    async fetchTemplate(url: string): Promise<string> {
        return axios.get(url).then(r => {
            return r.data
        })
    }

    // TODO add logic to use cache if needed
    // const client = await new GithubClient().getTemplate("test","https://raw.githubusercontent.com/sasuolander/templatesAWS/master/S3_Website_Bucket_With_Retain_On_Delete.yaml")
    async getTemplate(templateName: string, templateURL: string, cache: boolean = false): Promise<string> {
        const response = await this.fetchTemplate(templateURL)
        if (cache) {
            const dirr = process.env.TEMP_FOLDER + "\\" + templateName
            Utils.createFile(dirr, response)
            GithubClient.cache.push({templateName: templateName, templatePath: dirr})
        }
        return response
    }
}
