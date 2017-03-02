'use babel';
// 'use strict';
import path from 'path'
import chokidar  from 'chokidar'

export default class GitSync {

  gitDir = path.normalize(path.join(atom.config.get('atomic-wars.LocalGitPath'), "Kata"))
  //
  // watcher = chokidar.watch(gitDir, {
  //   ignored: /[\/\\]\./,
  //   persistent: true
  // });

  chokidar.watch('.', { ignored: /(^|[\/\\])\../ }).on('all', function (event, path) {
    console.log(event, path);
  });

}
