import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/**
 * @customElement
 * @polymer
 */
class PtgImage extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }
      figure {
        padding: 0;
        margin: 0;
        overflow: hidden;
        position: relative;
        height: 100%;
        width: 100%;
        pointer-events: none;
      }
      img {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        transition: 0.3s opacity;
        width: 100%;
        height: 100%;
        object-fit: var(--ptg-image-object-fit, contain);
        object-position: var(--ptg-image-object-position, 50% 50%);
        border: 0;
        border-style: none;
        opacity: 0;
        box-sizing: border-box;
        padding: var(--ptg-image-padding, 0);
      }
      :host([loaded]) #full {
        opacity: 1;        
      }
      [hidden] {
        display: none!important;
      }
    </style>

    <figure>
      <img id="full" src\$="[[source]]" on-load="_handleLoaded">
    </figure>
`;
  }

  static get is() { return 'ptg-image'; }
  static get properties() {
    return {
      source: {
        type: Object
      },
      preload: {
        type: Boolean,
        value: false
      },
      loaded: {
        type: Boolean,
        value: false,
        readOnly: true,
        notify: true,
        reflectToAttribute: true
      },

    }
  }

  _handleLoaded() {
    this._setLoaded(true);
  }
}
window.customElements.define(PtgImage.is, PtgImage);
