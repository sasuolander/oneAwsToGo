export default class Backend {

 // place rest api call code here they can be static method
    static testCall (input:string) : string{
        return "not implemented input "+input;
    }

    static fetchTemplates(){
        const URL = 'http://localhost:3000/templates';
        return fetch(URL)
            .then(response => response.json())
            .then(data => {return data})
     }
}


