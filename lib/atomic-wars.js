'use babel';

import Model from './model';
import settings from './config';
import CodeWarsAPI from './codewars-API';
import WindowManager from './window-manager';
import GitSync from './git-sync';
import { CompositeDisposable } from 'atom';

export default {

  config: settings.config,

  atomicWarsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.Model = new Model();
    this.Model.WindowManager = new WindowManager();
    this.Model.CodeWarsAPI = new CodeWarsAPI();
    this.Model.gitSync = new GitSync();
    this.Model.CodeWarsAPI.newKata = {};

    // Events subscribed to in atom's system can be easily cleaned ups with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atomic-wars:new': () => this.newKata(),
      'atomic-wars:submit': () => this.submit()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
  },


  newKata() {
    this.Model.newKata();
  },

  submit() {
    this.Model.submit()
  }
};
