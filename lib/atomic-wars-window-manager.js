'use babel';
'use strict';

console.log('atomic wars model loaded');
export default class AtomicWarsWindowManager {

  setupWindows(language,apiObject) {
    var activeKata = this.createWindows()
    this.setupDescriptionWindow(language,activeKata,apiObject);
    this.setupCodeWindow(language,activeKata,apiObject);
    this.setupTestWindow(language,activeKata,apiObject);
  }

  createWindows(){
    //TODO check theres no current windows or something
    var activeKata = {}
    activeKata.descriptionWindow = atom.workspace.open()
    activeKata.codeWindow = atom.workspace.open()
    activeKata.testWindow = atom.workspace.open()
    return activeKata
  }

  setupDescriptionWindow(language,activeKata,apiObject){
    activeKata.descriptionWindow.then(function(editor){
    var text =  apiObject.name + "\n\n"
    text += language + "\n\n"
    text += apiObject.description + "\n\n"
    text += apiObject.author
    editor.insertText(text)
    editor.saveAs(atom.config.get('AtomicWars.gitPath') +"/"+"description")
    })
  }

  setupCodeWindow(language,activeKata,apiObject){
    activeKata.codeWindow.then(function(editor){
      editor.insertText(apiObject.session.setup)
      editor.saveAs(atom.config.get('AtomicWars.gitPath') +"/"+"code")
    })
  }

  setupTestWindow(language,activeKata,apiObject) {
    activeKata.testWindow.then(function(editor){
      editor.insertText(apiObject.session.exampleFixture)
      editor.saveAs(atom.config.get('AtomicWars.gitPath') +"/"+"tests")
    })
  }
}
