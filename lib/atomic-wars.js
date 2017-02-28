'use babel';

import AtomicWarsModel from './atomic-wars-model';
import AtomicWarsView from './atomic-wars-view';
import { CompositeDisposable } from 'atom';
import request from 'request'

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
    LocalGitPath:{
      type: 'string',
      title: 'gitPath',
      order: 3,
      "default": ''
    }
  },

  atomicWarsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomicWarsView = new AtomicWarsView(state.atomicWarsViewState);
    this.atomicWarsModel = new AtomicWarsModel();
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomicWarsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atomic-wars:toggle': () => this.toggle(),
      'atomic-wars:new': () => this.newKata()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
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
    this.atomicWarsModel.newKata();
  },

  toggle() {
    console.log('AtomicWars was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
