'use babel';
'use strict';
import path from 'path'

module.exports = {

  // TODO: TEST FILE SAVING
  saveMe(editor, apiObject, dataType) {
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
    if (dataType == "description"){
      var filename = dataType + ".md"
    }else{
      var filename = dataType + fileExtension[language.toLowerCase()]
    }
    console.log (apiObject)
    var kataName = String(apiObject.slug)
    var rank = String(apiObject.rank).replace("-", "") + "kyu"
    var filepath = path.normalize(path.join(atom.config.get('atomic-wars.LocalGitPath'), "Kata", language, rank, kataName, filename))
    editor.saveAs(filepath)
  }

}
