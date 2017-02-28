'use babel';

console.log('atomic wars model loaded');
export default class AtomicWarsModel {


  newKata(language){
    langauge = "ruby"
    apiObject = this.fakeApi(language)
    this.create_windows()
    this.setup_windows(language,activeKata)
  }

  setup_windows(language,activeKata){
    activeKata.descriptionWindow.then(function(editor){
      editor.saveAs(atom.config.get('AtomicWars.gitPath') +"/"+"description")
    })
    activeKata.codeWindow.then(function(editor){
      editor.saveAs(atom.config.get('AtomicWars.gitPath') +"/"+"code")
    })
    activeKata.testWindow.then(function(editor){
      editor.saveAs(atom.config.get('AtomicWars.gitPath') +"/"+"tests")
    })
  }

  create_windows(){
    //TODO check theres no current windows or something
    activeKata = {}
    activeKata.descriptionWindow = atom.workspace.open()
    activeKata.codeWindow = atom.workspace.open()
    activeKata.testWindow = atom.workspace.open()
    return activeKata
  }

  fakeApi(language){
    apiObject = {}
    apiObject.session = {}
    apiObject.name = "name of kata"
    apiObject.description = "some description text"
    apiObject.author = "Authors name"
    apiObject.session.setup = "this is the starter codeblock"
    apiObject.session.exampleFixture = "this is the starting testblocks"
    return apiObject
  }
}
