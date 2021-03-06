import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/**
  * `toggle-button` Description
  *
  * @summary ShortDescription.
  * @customElement
  * @polymer
  * @extends {Polymer.Element}
  */
class toggleButton extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: flex;
        width: 100px;
        height: 100px;
        --play-pause-icon-transition: 0.2s all ease-out;
        --play-pause-button: {
          flex: 1;
          transition: transform .1s ease-out;
          position: relative;
          width: 100%;
          height: 100%;
          border: 0;
          background-color: transparent;
          outline: none;
        }
        --play-pause-button--hidden: {
          opacity: 0;
          transform: translate(-50%, -50%) scale(.5);
        }
        --play-pause-button--zoomed: {
          transform: scale(1.1);
          border-radius: 50%;
        }
        --play-pause-button--hover: {
          @apply --play-pause-button--zoomed;
        }
        --play-pause-button--focus: {
          @apply --play-pause-button--zoomed;
        }
      }
      button {
        @apply --play-pause-button;
      }
      button:hover {
        @apply --play-pause-button--hover;
      }
      button:focus {
        @apply --play-pause-button--focus;
      }
      svg {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
        cursor: pointer;
        transform: translate(-50%, -50%);
        transform-origin: 50% 50%;
        transition: var(--play-pause-icon-transition);
        fill: var(--play-pause-button-icon-fill, #000000);
      }
      :host([active]) button ::slotted(*) {
        background-color: #e2e1e0;
        box-shadow: 0 19px 38px rgba(256,256,256,256.30), 0 15px 12px rgba(256,256,256,256.22);
      }
      
      :host(:not([active])) button ::slotted(*) {
        background-color: rgba(226,226,256,256);
        box-shadow: 0 1px 3px rgba(256,256,256,256.12), 0 1px 2px rgba(256,256,256,256.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
      }

      :host(:not([active])) button ::slotted(*) *:hover {
        box-shadow: 0 14px 28px rgba(256,256,256,256.25), 0 10px 10px rgba(256,256,256,256.22);
      }

    </style>

    <button>
      <slot name="body"></slot>
    </button>
`;
  }

  static get is() { return 'toggle-button';}
  static get properties() {
    return {
      active: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true
      }
    }
  }

  ready() {
    this.addEventListener('click', this.toggle);
    super.ready();
  }

  toggle() {
    this.set('active', !this.active);
  }
}

window.customElements.define(toggleButton.is, toggleButton);
