'use babel';
'use strict';

console.log('codeWars API loaded');

export default class CodeWarsAPI {
  getKata(url, method='post') {

    var options = {
      method: method,
      url: url,
      headers: {'Authorization': 'goQFFyfs3zXhBAzDC7hd'}
    }
    
    request(options, function (err, res, body) {
      if (err) {
        inspect(err, 'error');
        return;
      }
      var response = JSON.parse(body);
    })

  }
}
