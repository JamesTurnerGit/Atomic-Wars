console.log('atomic wars model loaded');
(function(exports){
  function newKata(){
    apiObject = {}
    apiObject.session = {}
    apiObject.name = "name of kata"
    apiObject.description = "some description text"
    apiObject.author = "Authors name"
    apiObject.session.setup = "this is the starter codeblock"
    apiObject.session.exampleFixture = "this is the starting testblocks"

    activeKata = {}
    activeKata.descriptionWindow = atom.workspace.open()
    activeKata.codeWindow = atom.workspace.open()
    activeKata.testWindow = atom.workspace.open()
  }

  exports.atomicWarsModel = {}
  exports.atomicWarsModel.newKata = newKata;
})(this)
