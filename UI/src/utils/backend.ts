
export default class Backend {

 // place rest api call code here they can be static method
    static testCall (input:string) : string{
        return "not implemented input "+input;
    }

    static fetchTemplates(){
        const templateURL = (process.env['REACT_APP_BASE_URL'] as string).concat("/templates");
        return fetch(templateURL)
            .then(response => response.json())
            .then(data => {return data})
     }
}


