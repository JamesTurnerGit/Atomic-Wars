'use babel';
'use strict';
import path from 'path'

console.log('atomic wars windowManager loaded');
export default class WindowManager {

  setupWindows(language,apiObject) {
    var activeKata = this._createWindows()
    this._setupDescriptionWindow(language,activeKata,apiObject);
    this._setupCodeWindow(language,activeKata,apiObject);
    this._setupTestWindow(language,activeKata,apiObject);
  }

  _createWindows(){
    //TODO check theres no current windows or something
    var activeKata = {}
    activeKata.descriptionWindow = atom.workspace.open()
    activeKata.codeWindow = atom.workspace.open()
    activeKata.testWindow = atom.workspace.open()
    return activeKata
  }

  _setupDescriptionWindow(language,activeKata,apiObject){
    var self = this
    activeKata.descriptionWindow.then(function(editor){
      var text =  apiObject.name + "\n\n"
      text += language + "\n\n"
      text += apiObject.description + "\n\n"
      text += apiObject.author
      editor.insertText(text)
      console.log(this)
      var filename = self._prettyPath(apiObject, "description")
      editor.saveAs(filename)
    })
  }

  _setupCodeWindow(language,activeKata,apiObject){
    var self = this
    activeKata.codeWindow.then(function(editor){
      editor.insertText(apiObject.session.setup)
      var filename = self._prettyPath(apiObject, "code")
      editor.saveAs(filename)
    })
  }

  _setupTestWindow(language,activeKata,apiObject) {
    var self = this
    activeKata.testWindow.then(function(editor){
      editor.insertText(apiObject.session.exampleFixture)
      var filename = self._prettyPath(apiObject, "test")
      editor.saveAs(filename)
    })
  }
  // TODO: TEST FILE SAVING
  _prettyPath(apiObject, dataType) {
    var fileExtension = {
      c: ".c",
      clojure: ".CLJ",
      coffeescript: ".coffee",
      cpp: ".CPP",
      crystal: ".rpt",
      csharp: ".cs",
      dart: ".dart",
      elixir: ".ex",
      fsharp: ".fs",
      go: ".GO",
      haskell: ".hs",
      java: ".java",
      javascript: ".js",
      objc: ".m",
      ocaml: ".ml",
      php: ".php",
      python: ".py",
      ruby: ".rb",
      rust: ".rs",
      shell: ".sh",
      sql: ".SQL",
      swift: ".SWIFT",
      typescript: ".ts",
    }
    var language = atom.config.get('atomic-wars.CodeWarsLanguage')
    var filename = dataType + fileExtension[language.toLowerCase()]
    var kataName = String(apiObject.slug)
    var rank = String(apiObject.rank).replace("-", "") + "kyu"
    return path.normalize(path.join(atom.config.get('atomic-wars.LocalGitPath'), "Kata", language, rank, kataName, filename))
  }
}
