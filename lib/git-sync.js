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
    var makeFolder = self._makeDir(repoPath)
    makeFolder.then(function(response) {
      self._checkConfig(repo, repoPath)
    });
    return makeFolder
  }

  _makeDir(repoPath) {
    return new Promise(function(resolve, reject) {
      mkdirp(repoPath, function (err) {
        err ? resolve(false) : resolve(true);
      });
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
        var reposMatch = data.replace(/\s/g,'') === repo.replace(/\s/g,'');
        resolve(reposMatch);
      });
    })
  }

  _pullRepo(repoPath) {
    var self = this;
    var pull = new Promise(function(resolve, reject) {
      simpleGit(repoPath).pull(atom.config.get('atomic-wars.RemoteRepoUrl'), function(err, data) {
        err ? resolve(false) : resolve(true);
      });
    });
    pull.then(function(response) {
      var message = "Remote repository pull"
      self._message(response, message)
    });
  }

  _cloneRepo(repoPath) {
    var self = this;
    var clone = new Promise(function(resolve, reject) {
      simpleGit(repoPath).clone(atom.config.get('atomic-wars.RemoteRepoUrl'), repoPath, function(err, data) {
        err ? resolve(false) : resolve(true);
      });
    });
    clone.then(function(response) {
      var message = "Remote repository clone"
      self._message(response, message)
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
      .push('origin', 'master', function(err, data) {
        err ? resolve(false) : resolve(true);
      });
    });
    push.then(function(response) {
      var message = "Commit and push"
      self._message(response, message)
    });
  }

  _message(success, message) {
    if (success) {
      atom.notifications.addSuccess("Atomic-Wars says: \n\n" + message + " successful")
    } else {
      atom.notifications.addError("Atomic-Wars says: \n\n" + message + " failed")
    }
  }

}
