'use babel';
'use strict';

console.log('codeWars API loaded');

export default class CodeWarsAPI {
  fetch() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getText()
      select = "https://www.codewars.com/api/v1/code-challenges/javascript/train"
      this.download(selection)
    }
  }

  download(url, method='post') {
    options = {
      method: method,
      url: url,
      headers: {'Authorization': 'goQFFyfs3zXhBAzDC7hd'}
    }
    that = this
    request(options, function (err, res, body) {
      if (err) {
        inspect(err, 'error');
        return;

      }
      response = JSON.parse(body);
      that.insert(response)
    })
  }
}
