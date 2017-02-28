'use babel';

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
        descriptionWindowTitle = atom.workspace.getPaneItems()[0].getTitle()
        codeWindowTitle        = atom.workspace.getPaneItems()[1].getTitle()
        testsWindowTitle       = atom.workspace.getPaneItems()[2].getTitle()
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
        expect(descriptionWindowText).toContain("some descrition text")
        expect(testsWindowText).toBe("this is the starter codeblock")
        expect(codeWindowText).toBe("this is the starting testblocks")
      })
    })
  })
});
