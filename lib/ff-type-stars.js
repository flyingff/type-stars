'use babel';

import StarView from './ff-type-stars-view';
import { CompositeDisposable } from 'atom';

const getElementPosition = (e) => {
  const pos = [0, 0];
  while(e.offsetParent) {
    pos[0] += e.offsetLeft;
    pos[1] += e.offsetTop;
    e = e.offsetParent;
  }
  return pos;
};

export default {
  layer: null,
  visible: true,
  listeners: [],
  activeEditor: undefined,
  activeEditorListeners: [],
  subscriptions: null,

  activate(state) {
    this.layer = document.createElement('div');
    this.layer.classList.add('ff-type-stars-container');
    this.updateVisibility();

    document.body.appendChild(this.layer);
    this.listeners.push(atom.workspace.observeActiveTextEditor(editor => {
      if(editor !== this.activeEditor) {
        this.activeEditorListeners.forEach(it=>it.dispose())
        this.activeEditorListeners = [];
        this.activeEditor = editor;
        console.log("Active editor changed to", editor)
        if(editor) {
          this.activeEditorListeners.push(editor.onWillInsertText(({ text }) => {
            for(const cursor of [...editor.element.querySelectorAll('.cursor')]) {
              new StarView(cursor, this.layer);
            }
          }));
        }
        this.updateVisibility();
      }
    }))
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ff-type-stars:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    // this.modalPanel.destroy();
    this.listeners.forEach(it=>it.dispose());
    this.subscriptions.dispose();
    this.layer.remove();
  },

  serialize() {
    return { };
  },
  updateVisibility() {
    this.layer.style.visibility = this.visible && this.activeEditor ? 'visible' : 'hidden';
  },
  toggle() {
    this.visible = !this.visible;
    this.updateVisibility();
  }
};
