'use babel';
'use strict';


console.log('atomic wars model loaded');

export default class Model {
  newKata(params){
    var language = atom.config.get('atomic-wars.CodeWarsLanguage')
    console.log(atom.project.getPaths())
    // var url = "https://www.codewars.com/api/v1/users/treborb"
    var url = "https://www.codewars.com/api/v1/code-challenges/javascript/train"
    // console.log(url)
    var newkata = this.CodeWarsAPI.getKata(url)
    // console.log(newkata)
    // var apiObject = this.getKata(language)
    //apiObject.then
    this.WindowManager.setupWindows(language,newkata)
  }
}
