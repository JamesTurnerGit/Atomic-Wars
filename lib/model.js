'use babel';
'use strict';


console.log('atomic wars model loaded');

export default class Model {
  newKata(params){
    var language = atom.config.get('atomic-wars.CodeWarsLanguage')
    console.log(atom.project.getPaths())
    // var url = "https://www.codewars.com/api/v1/users/treborb"
    var url = "https://www.codewars.com/api/v1/code-challenges/javascript/train"
    // console.log(url)
    var newkata = this.CodeWarsAPI.getKata(url)
    // console.log(newkata)
    // var apiObject = this.getKata(language)
    //apiObject.then
    this.WindowManager.setupWindows(language,newkata)
  }
  //
  // fakeApi(language){
  //   var apiObject = {}
  //   apiObject.session = {}
  //   apiObject.name = "name of kata"
  //   apiObject.description = "some description text"
  //   apiObject.author = "Authors name"
  //   apiObject.session.setup = "this is the starting codeblock"
  //   apiObject.session.exampleFixture = "this is the starting testblocks"
  //   return apiObject
  // }
}
