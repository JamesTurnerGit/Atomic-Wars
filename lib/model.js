'use babel';
'use strict';

console.log('atomic wars model loaded');

export default class Model {
  newKata(params){
    var language = atom.config.get('atomic-wars.CodeWarsLanguage').toLowerCase()
    var url = "https://www.codewars.com/api/v1/code-challenges/" + language + "/train"
    var newKata = this.CodeWarsAPI.getKata(url)

    newKata.then((obj) => {
      this.WindowManager.setupWindows(language,obj)
    })
  }
}
