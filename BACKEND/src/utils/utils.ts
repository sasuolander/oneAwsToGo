import fs from "fs";

export default class Utils {

    static createFile(filename:string,content:string) {
        fs.writeFile(filename, content, err => {
            if (err) {
                console.error(err);
            }
        });
    }

    static  timeout(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
