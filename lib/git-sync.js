'use babel';
'use strict';

import path from 'path';
import watch from 'node-watch';
import simpleGit from 'simple-git';

export default class GitSync {

  init() {
    var self = this;
    var rootDir = path.normalize(path.join(atom.config.get('atomic-wars.LocalGitPath')))
    var repoPath = path.normalize(path.join(rootDir, "codewars"))
    simpleGit(repoPath)
      .listRemote(['--get-url'], function(err, data) {
        if (!err) {
          simpleGit(repoPath)
            .pull()
          self._watchGit(repoPath)
        } else {
          self._cloneRepo(repoPath)
        }
      });
  }

  _cloneRepo(repoPath) {
    simpleGit(repoPath)
      .clone(atom.config.get('atomic-wars.RemoteRepoUrl'), repoPath, function(err, data) {
        if (!err) {
          atom.notifications.addSuccess("Atomic-Wars says: \n\nRemote repository clone successful")
        } else {
          atom.notifications.addError("Atomic-Wars says: \n\nRemote repository clone failed\n\nError:\n" + err)
        }
       });
    this._watchGit(repoPath)
  }

  _watchGit(repoPath){
    var joinedRepoPath = path.join(repoPath, "Kata")
    watch(joinedRepoPath, (filename) => {
      this._commit(joinedRepoPath)
    });
  }

  _commit(repoPath) {
    simpleGit(repoPath)
     .add('./*')
     .commit(new Date().toLocaleString())
     .push('origin', 'master', function(err, data) {
       if (!err) {
         atom.notifications.addSuccess("Atomic-Wars says: \n\nCommit and push successful")
       } else {
         atom.notifications.addError("Atomic-Wars says: \n\nCommit and push failed")
       }
     });
  }

}
