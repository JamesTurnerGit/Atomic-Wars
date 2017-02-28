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
        console.log (atom.packages.loadedPackages["atomic-wars"].mainModule)
      });
    });
  });
})
