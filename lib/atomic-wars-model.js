'use babel';
'use strict';

// import AtomicWarsWindowManager from './atomic-wars-window-manager';

console.log('atomic wars model loaded');
export default class AtomicWarsModel {

  // activate() {
  //   console.log("HELLLOOO!")
  //   this.AtomicWarsWindowManager = new AtomicWarsWindowManager();
  // }

  newKata(language){
    var language = "language name"
    var apiObject = this.fakeApi(language)
    this.AtomicWarsWindowManager.setupWindows(language,apiObject)
    // var language   = "language name"
    // var apiObject  = this.fakeApi(language)
    // var activeKata = this.createWindows()
    // this.setupWindows(language,activeKata,apiObject)
  }

  fakeApi(language){
    var apiObject = {}
    apiObject.session = {}
    apiObject.name = "name of kata"
    apiObject.description = "some description text"
    apiObject.author = "Authors name"
    apiObject.session.setup = "this is the starting codeblock"
    apiObject.session.exampleFixture = "this is the starting testblocks"
    return apiObject
  }
}
