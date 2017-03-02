'use babel';

import Model from './model';
import CodeWarsAPI from './codewars-API';
import WindowManager from './window-manager';
import { CompositeDisposable } from 'atom';

export default {

  config: {
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
      title: 'gitPath',
      order: 4,
      "default": atom.project.getPaths().join()
    }
  },

  atomicWarsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.Model = new Model();
    this.Model.WindowManager = new WindowManager();
    this.Model.CodeWarsAPI = new CodeWarsAPI();
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
