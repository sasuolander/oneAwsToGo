import Backend from "../utils/backend";

export default class TemplateService {

   getTemplates(){
      return Backend.fetchTemplates();
   }

}
