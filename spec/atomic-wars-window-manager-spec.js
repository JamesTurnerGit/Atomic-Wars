'use babel';

import WindowManager from '../lib/window-manager';

describe('AtomicWarsWindowManager', () => {

  fakeApi = function(){
    var apiObject = {}
    apiObject.session = {}
    apiObject.name = "name of kata"
    apiObject.description = "some description text"
    apiObject.author = "Authors name"
    apiObject.session.setup = "this is the starting codeblock"
    apiObject.session.exampleFixture = "this is the starting testblocks"
  }

  let activationPromise, wMan;
  beforeEach(() => {
    wMan = new WindowManager

    wMan.setupWindows('language name', fakeApi())
    // activationPromise = atom.packages.activatePackage('atomic-wars');

//     var myFirstPromise = new Promise(function(resolve, reject){
//     //We call resolve(...) when what we were doing async succeeded, and reject(...) when it failed.
//     //In this example, we use setTimeout(...) to simulate async code.
//     //In reality, you will probabally using something like XHR or an HTML5 API.
//     // setTimeout(function(){
//         resolve("Success!"); //Yay! Everything went well!
//     // }, 250);
// });
//
//     waitsForPromise(() => {
//       return myFirstPromise
//     });
  });

  describe('setupWindows', () => {
    it('creates some text editors', () => {
      // runs(() => {
        items = atom.workspace.getPaneItems()
        expect(items.length).toBe(3)
      // });
    });

    it('creates some panes', () => {
      runs(() => {
        panes = atom.workspace.getPanes()
        expect(panes.length).toBe(3)
      })
    })

    it('names panes correctly', () => {
      runs(() => {
        descriptionWindowTitle = atom.workspace.getPaneItems()[0].getTitle()
        codeWindowTitle        = atom.workspace.getPaneItems()[1].getTitle()
        testsWindowTitle       = atom.workspace.getPaneItems()[2].getTitle()
        console.log(codeWindowTitle)
        expect(descriptionWindowTitle).toBe("description")
        expect(testsWindowTitle).toBe("tests")
        expect(codeWindowTitle).toBe("code")
      })
    })
    it('populates panes with data', () => {
      runs(() => {
        descriptionWindowText = atom.workspace.getPaneItems()[0].getText()
        codeWindowText        = atom.workspace.getPaneItems()[1].getText()
        testsWindowText       = atom.workspace.getPaneItems()[2].getText()

        expect(descriptionWindowText).toContain("language name")
        expect(descriptionWindowText).toContain("name of kata")
        expect(descriptionWindowText).toContain("Authors name")
        expect(descriptionWindowText).toContain("some description text")
        expect(codeWindowText).toBe("this is the starting codeblock")
        expect(testsWindowText).toBe("this is the starting testblocks")
      })
    })
  })
});
