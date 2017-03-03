'use babel';
'use strict';

export default class CodeWarsAPI {
  getKata(url, method='post') {
    var apiKey = atom.config.get('atomic-wars.CodeWarsAPIkey')
    if(apiKey === ''){
      throw 'codewars apiKey not set'
    }
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open( method, url);
      xhr.setRequestHeader("Authorization", apiKey);
      xhr.onload = function() {
          if (xhr.status === 200) {
              resolve(JSON.parse(xhr.responseText))
          }
          else {
              reject(xhr.status)
              alert('Request failed.  Returned status of ' + xhr.status);
          }
      };
      var data = "strategy=" + atom.config.get('atomic-wars.CodeWarsStrategy')
      xhr.send(data);
    })
  }

  submit(url) {
    var shell = require('shell')
    shell.openExternal(url)
  }
}
