'use babel';
'use strict';


console.log('atomic wars model loaded');

export default class Model {
  newKata(params){
    var language = "language name"
    var apiObject = this.fakeApi(language)
    //apiObject.then
    this.WindowManager.setupWindows(language,apiObject)
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
