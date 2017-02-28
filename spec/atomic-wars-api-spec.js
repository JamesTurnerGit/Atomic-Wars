'use babel';

describe('AtomicWars-codewarsAPI', () => {
  console.log("weeeeeeeeee")
  let workspaceElement, activationPromise;
  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('atomic-wars');
    atom.commands.dispatch(workspaceElement, 'atomic-wars:new');

    waitsForPromise(() => {
      return activationPromise;
    });
  })

  describe('new', () => {
    it('creates some sdaf', () => {
      runs(() => {
        var url = 'https://www.codewars.com/api/v1/code-challenges/javascript/train'
        var result = atom.packages.loadedPackages["atomic-wars"].mainModule.Model.CodeWarsAPI.getKata(url)
        console.log(result)
        result.then(function(xhr){
          console.log(xhr)
          expect(xhr.author).toBe("Bob Eyre");
        });
      });
    });
  });
})
