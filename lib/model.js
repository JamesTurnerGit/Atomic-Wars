'use babel';
'use strict';

export default class Model {
  newKata(params){
    var language = atom.config.get('atomic-wars.CodeWarsLanguage').toLowerCase()
    var url = "https://www.codewars.com/api/v1/code-challenges/" + language + "/train"
    if (atom.config.get('atomic-wars.gitSync') === true) {
      this.gitSync.init().then(() => {
        this._callWindowManager(language, url)
      });
    } else {
      this._callWindowManager(language, url)
    }
  }

  _callWindowManager(language, url) {
    var newKata = this.CodeWarsAPI.getKata(url)
    newKata.then((obj) => {
      this.WindowManager.setupWindows(language,obj)
    })
  }

  submit(url) {
    var codeWindowText = atom.workspace.getPaneItems()[1].getText()
    atom.clipboard.write(codeWindowText)
    var language = atom.config.get('atomic-wars.CodeWarsLanguage').toLowerCase()
    this.CodeWarsAPI.submit("https://www.codewars.com/kata/" + this.newKata.slug + "/train/" + language)
  }
}
