'use babel';
'use strict';
import files from './save-files'

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
      files.saveMe(editor, apiObject, "description")
    })
  }

  _setupCodeWindow(language,activeKata,apiObject){
    var self = this
    activeKata.codeWindow.then(function(editor){
      editor.insertText(apiObject.session.setup)
      files.saveMe(editor, apiObject, "code")
    })
  }

  _setupTestWindow(language,activeKata,apiObject) {
    var self = this
    activeKata.testWindow.then(function(editor){
      editor.insertText(apiObject.session.exampleFixture)
      files.saveMe(editor, apiObject, "test")
    })
  }
}
