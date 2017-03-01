'use babel';
'use strict';

import CodeWarsAPI from '../lib/codewars-API';

describe('AtomicWars-codewarsAPI', () => {
  let CWapi
  beforeEach(() => {
    CWapi = new CodeWarsAPI
    atom.config.set('atomic-wars.CodeWarsAPIkey','4okdeUCSuvfPs6W9vqr5')// TODO: clean this out
  })

  describe('new', () => {
    it('returns a promise that resolves into a kata json', () => {
      // TODO consider ways to test this after stubbing it out
      var url = 'https://www.codewars.com/api/v1/code-challenges/javascript/train'
      var result = CWapi.getKata(url)
      waitsForPromise(() =>
        result.then((messages) => {
          expect(messages.author).toBeDefined();
        }),
      );
    });
  });
})
