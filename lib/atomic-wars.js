'use babel';


import AtomicWarsView from './atomic-wars-view';
import { CompositeDisposable } from 'atom';
import request from 'request'

export default {
  config: {
    APIkey: {
      type: 'string',
      title: 'Codewars Api-key',
      "default": 'Chips'
    },
    UserName: {
      type: 'string',
      title: 'UserName',
      "default": ''
    }
  },

  atomicWarsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomicWarsView = new AtomicWarsView(state.atomicWarsViewState);
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
    console.log(atom.config.get('atomic-wars.APIkey'));
    console.log(atom.config.get('atomic-wars.UserName'));
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
