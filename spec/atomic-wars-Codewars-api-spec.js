'use babel';
'use strict';

import CodeWarsAPI from '../lib/codewars-API';

describe('AtomicWars-codewarsAPI', () => {
  let CWapi
  beforeEach(() => {
    CWapi = new CodeWarsAPI
  })

  describe('new', () => {
    it('returns a promise that resolves into a kata json', () => {
      var url = 'https://www.codewars.com/api/v1/code-challenges/javascript/train'
      atom.config.set('atomic-wars.CodeWarsAPIkey','4okdeUCSuvfPs6W9vqr5')// TODO: clean this out
      var result = CWapi.getKata(url)
      waitsForPromise(() =>
        result.then((messages) => {
          expect(messages.author).toBeDefined();
        }),
      );
    });
  });
})
