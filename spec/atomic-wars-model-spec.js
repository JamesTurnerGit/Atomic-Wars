 'use babel';

// import AtomicWarsModel from '../lib/atomic-wars-model';

describe('AtomicWarsModel', () => {
  let workspaceElement, activationPromise;
  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('atomic-wars');
    atom.commands.dispatch(workspaceElement, 'atomic-wars:new');

    waitsForPromise(() => {
      return activationPromise;
    });
  });

  describe('new', () => {
    it('creates some windows', () => {
      runs(() => {
        panes = atom.workspace.getPaneItems()
        expect(panes.length).toBe(3)
      });
    });

    it('names panes correctly', () => {
      runs(() => {

      })
    })
  })
});
