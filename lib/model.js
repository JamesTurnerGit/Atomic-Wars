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
    var newKata = this.CodeWarsAPI.getKata(url)

    newKata.then((obj) => {
      this.WindowManager.setupWindows(language,obj)
    })
    // console.log(newkata)
    // var apiObject = this.getKata(language)
    //apiObject.then
  }
}
