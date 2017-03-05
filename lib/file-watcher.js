'use babel';
'use strict';

import chokidar from 'chokidar';
import path from 'path'

module.exports = {

  watch: {
    var watcher = watcher || chokidar.watch(path.join(filePath, "Kata"), {ignored: /[\/\\]\./, persistant: false}).on('change', (event, path) => {
      self._commit(folder);
    })
    return watcher
  }

}
