'use babel';
'use strict';

import path from 'path';
import chokidar from 'chokidar';
import simpleGit from 'simple-git';
import mkdirp from 'mkdirp';

export default class GitSync {

  init() {
    var self = this;
    var repo = atom.config.get('atomic-wars.RemoteRepoUrl')
    var repoName = repo.match(/(?!\/)\w+.git$/).join().replace(/(\.git)$/, "")
    var repoPath = path.normalize(path.join(atom.config.get('atomic-wars.LocalGitPath'), repoName))
    return new Promise(function(resolve, reject) {
      self._makeDir(repoPath).then(function() {
        resolve(self._checkConfig(repo, repoPath))
      });
    })
  }

  _makeDir(repoPath) {
    return new Promise(function(resolve, reject) {
      resolve(mkdirp(repoPath));
    });
  }

  _checkConfig(repo, repoPath) {
    var self = this;
    self._isRepo(repo, repoPath).then(function(isRepo) {
      if (isRepo) {
        self._checkCorrectRepo(repo, repoPath)
      }
      else {
        self._watcher(repoPath)
        self._cloneRepo(repoPath)
      }
    });
  }

  _isRepo(repo, repoPath) {
    return new Promise(function(resolve, reject) {
      simpleGit(repoPath).listRemote(['--get-url'], function(err, data) {
        data ? resolve(true) : resolve(false)
      });
    })
  }

  _checkCorrectRepo(repo, repoPath) {
    var self = this;
    self._isCorrectRepo(repo, repoPath).then(function(isCorrectRepo) {
      if (isCorrectRepo) {
        self._watcher(repoPath)
        self._pullRepo(repoPath)
      } else {
        atom.notifications.addError(`Atomic-Wars says:
        \n\nError: Unable to pull from remote URL
        \nProject folder is already a Git repo and remote URL does not match the given remote repo URL\n`)
      }
    });
  }

  _isCorrectRepo(repo, repoPath) {
    return new Promise(function(resolve, reject) {
      simpleGit(repoPath).listRemote(['--get-url'], function(err, data) {
        resolve(data.replace(/\s/g,'') === repo.replace(/\s/g,''))
      });
    })
  }

  _pullRepo(repoPath) {
    var self = this;
    simpleGit(repoPath)
      .pull(atom.config.get('atomic-wars.RemoteRepoUrl'), function(err, data) {
        self._message(err, data, "Remote repository pull")
      });
  }

  _cloneRepo(repoPath) {
    var self = this;
    var clone = new Promise(function(resolve, reject) {
      simpleGit(repoPath).clone(atom.config.get('atomic-wars.RemoteRepoUrl'), repoPath, function(err, data) {
        resolve(data)
        reject(err)
        // self._message(err, data, "Remote repository clone")
      });
    });
    clone.then(function(data) {
      console.log(data)
      self._message(err=null, data=null, "Remote repository clone")
    });
  }

  _watcher(filePath) {
    var self = this;
    var folder = path.join(filePath, "Kata")
    var watcher = chokidar.watch(folder, {ignored: /[\/\\]\./, persistant: false}).on('change', (event, path) => {
      self._canCommit(watcher, folder)
    });
  }

  _canCommit(watcher, repoPath) {
    var self = this;
    var repo = atom.config.get('atomic-wars.RemoteRepoUrl')
    var correctRepo = self._isCorrectRepo(repo, repoPath)
    correctRepo.then(function(bool) {
      if (bool) {
        self._commitPush(repoPath)
      } else {
        return watcher.close()
      }
    })
  }

  _commitPush(repoPath) {
    var self = this;
    var push = new Promise(function(resolve, reject) {
       simpleGit(repoPath)
        .add('./*')
        .commit(new Date().toLocaleString())
       resolve(simpleGit(repoPath).push('origin', 'master'))
     });
     push.then(function() {
       self._message(err=null, data=null, "Commit and push")
     });
  }

  _message(err, data, message) {
    if (!err) {
      atom.notifications.addSuccess("Atomic-Wars says: \n\n" + message + " successful")
    } else {
      atom.notifications.addError("Atomic-Wars says: \n\n" + message + " failed")
    }
  }

}
