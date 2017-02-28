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
      var result = CWapi.getKata(url)
      console.log(result)
      waitsForPromise(() =>
        CWapi.getKata(url).then((messages) => {
          console.log(messages)
        }),
      );
      console.log(result)
    });
  });
})
