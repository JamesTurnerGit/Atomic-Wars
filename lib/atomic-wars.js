'use babel';

import Model from './model';
import settings from './config';
import CodeWarsAPI from './codewars-API';
import AtomicWarsView from './atomic-wars-view';
import WindowManager from './window-manager';
import GitSync from './git-sync';
import { CompositeDisposable } from 'atom';

export default {

  config: settings.config,

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
