'use babel';
'use strict';

import request from 'request'
import inspect from 'inspect'

console.log('codeWars API loaded');

export default class CodeWarsAPI {
  getKata(url, method='post') {

    var xhr = new XMLHttpRequest();
    xhr.open( method, url);
    xhr.setRequestHeader("Authorization", "4okdeUCSuvfPs6W9vqr5");
    xhr.onload = function() {
        if (xhr.status === 200) {
            apiObject = JSON.parse(xhr.responseText);
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
    return xhr
  }
}
