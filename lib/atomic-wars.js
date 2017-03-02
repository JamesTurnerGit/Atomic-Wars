'use babel';

import Model from './model';
import CodeWarsAPI from './codewars-API';
import AtomicWarsView from './atomic-wars-view';
import WindowManager from './window-manager';
import GitSync from './git-sync';
import { CompositeDisposable } from 'atom';

export default {

  config: {
    // TODO move this somewhere else
    userName: {
      type: 'string',
      title: 'CodeWars User Name',
      order: 1,
      "default": ''
    },
    CodeWarsAPIkey: {
      type: 'string',
      title: 'Codewars Api-key',
      order: 2,
      "default": ''
    },
    CodeWarsLanguage: {
      type: 'string',
      title: 'Default language',
      order: 3,
      "default": 'Ruby'
    },
    LocalGitPath:{
      type: 'string',
      title: 'Local Repo Location',
      order: 4,
      "default": atom.project.getPaths().join()
    },
    gitSync: {
      type: 'boolean',
      title: 'Commit and push to github on save',
      order: 5,
      "default": true
    },
    RemoteRepoUrl: {
      type: 'string',
      title: 'Remote Repo Url',
      order: 6,
      // TODO change this back to username
      "default": 'https://github.com/BenJohnCarson/codewars.git'
    }
  },

  atomicWarsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomicWarsView = new AtomicWarsView(state.atomicWarsViewState);
    this.Model = new Model();
    this.Model.WindowManager = new WindowManager();
    this.Model.CodeWarsAPI = new CodeWarsAPI();
    this.Model.gitSync = new GitSync();

    // Events subscribed to in atom's system can be easily cleaned ups with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atomic-wars:toggle': () => this.toggle(),
      'atomic-wars:new': () => this.newKata()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.atomicWarsView.destroy();
  },

  serialize() {
    return {
      atomicWarsViewState: this.atomicWarsView.serialize()
    };
  },


  newKata() {
    console.log('AtomicWars was newd!');
    this.Model.newKata();
    // console.log (atom)
  },
};
