'use babel';
'use strict';


console.log('atomic wars model loaded');

export default class Model {
  newKata(params){
    var language = atom.config.get('atomic-wars.CodeWarsLanguage').toLowerCase()
    var url = "https://www.codewars.com/api/v1/code-challenges/" + language + "/train"
    //var newkata = this.CodeWarsAPI.getKata(url)
    var apiObject = this.fakeApi(language)
    //apiObject.then
    this.WindowManager.setupWindows(language,apiObject)
  }

  fakeApi(language){
    var apiObject = {}
    apiObject.session = {}
    apiObject.slug = "sum-consecutives"
    apiObject.rank = -6
    apiObject.description = "some description text"
    apiObject.author = "Authors name"
    apiObject.session.setup = "this is the starting codeblock"
    apiObject.session.exampleFixture = "this is the starting testblocks"
    return apiObject
  }
}
