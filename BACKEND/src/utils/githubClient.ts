import axios from "axios";
import Utils from "./utils";

interface ICachePath {
    templateName: string
    templatePath: string
}

export default class GithubClient {
    static cache: ICachePath[]

    async fetchTemplate(url: string | undefined): Promise<string> {
        if ( typeof url !=="undefined") {
            return axios.get(<string>url).then(r => {
                return r.data
            })
        } else  {
        throw Error("Trying fetch something with undefined url")
        }
    }

    // TODO add logic to use cache if needed
    async getTemplate(templateURL: string | undefined, cache = false,templateName = ""): Promise<string> {
        const response = await this.fetchTemplate(templateURL)
        if (cache) {
            const dirr = process.env.TEMP_FOLDER + "\\" + templateName
            Utils.createFile(dirr, response)
            GithubClient.cache.push({templateName: templateName, templatePath: dirr})
        }
        return response
    }
}
