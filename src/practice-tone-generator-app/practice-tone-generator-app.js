import {PtgElement} from './ptg-element.js';
import '../../node_modules/@polymer/iron-pages/iron-pages.js';
import './practice-page.js';
import './settings-page.js';
import { html } from '../../node_modules/@polymer/polymer/lib/utils/html-tag.js';
/**
 * @customElement
 * @polymer
 */
class PracticeToneGeneratorApp extends PtgElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        -webkit-tap-highlight-color: transparent;
        -webkit-text-size-adjust: none;

        --text-base: {
          text-rendering: optimizeLegibility;
          font-kerning: normal;
          -webkit-font-smoothing: antialiased;
        };
        background-color: rgb(51, 51, 51);
      }
      * {
        box-sizing: border-box;
      }
      iron-pages {
        height: 100%;
      }
      practice-page, settings-page {
        overflow: hidden;
        height: 100%;
      } 

    </style>

    <iron-pages selected="[[selectedPage]]">
      <practice-page beat="{{beat}}" measure="{{measure}}" user-interacted="{{userInteracted}}" run-generator="{{runGenerator}}" bpm="{{bpm}}" tone="[[tone]]" next-tone="[[nextTone]]" on-switch-page-intend="_switchPage" on-repeat-tone-intend="repeatCurrentTone" on-skip-current-tone-intend="skipCurrentTone"></practice-page>

      <settings-page key-type="{{keyType}}" metronome-volume="{{metronomeVolume}}" synth-volume="{{synthVolume}}" no-succedent-identical-notes="{{noSuccedentIdenticalNotes}}" bars-before-switch="{{barsBeforeSwitch}}" on-switch-page-intend="_switchPage"></settings-page>
    </iron-pages>
`;
  }

  static get is() { return 'practice-tone-generator-app'; }
  static get properties() {
    return {
      selectedPage: {
        type: Number,
        value: 0
      }
    };
  }

  _switchPage() {
    if(this.selectedPage == 0) return this.set('selectedPage', 1)
    this.set('selectedPage', 0);
  }
}

window.customElements.define(PracticeToneGeneratorApp.is, PracticeToneGeneratorApp);
