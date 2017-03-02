'use babel';
// 'use strict';
import path from 'path';
// import chokidar from 'chokidar';
import watch from 'node-watch';

export default class GitSync {

  _watchGit(){
    gitDir = path.normalize(path.join(atom.config.get('atomic-wars.LocalGitPath'), "Kata"))

    // chokidar.watch(gitDir, {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {
    //   console.log("sdasd")
    // });

    watch(gitDir, (filename) => {
      console.log(filename, 'changed - ' + new Date().toLocaleString());
    });

  }

}
