'use babel';
'use strict';

export default class Model {

  newKata(params){
    var language = atom.config.get('atomic-wars.CodeWarsLanguage').toLowerCase()
    var url = "https://www.codewars.com/api/v1/code-challenges/" + language + "/train"
    this.newKata = this.CodeWarsAPI.getKata(url)

    this.newKata.then((obj) => {
      this.WindowManager.setupWindows(language,obj)
      this.newKata = obj
    })
  }

  submit(url) {
    var codeWindowText = atom.workspace.getPaneItems()[1].getText()
    console.log(codeWindowText)
    atom.clipboard.write(codeWindowText)
    var language = atom.config.get('atomic-wars.CodeWarsLanguage').toLowerCase()
    this.CodeWarsAPI.submit("https://www.codewars.com/kata/" + this.newKata.slug + "/train/" + language)
  }
}
