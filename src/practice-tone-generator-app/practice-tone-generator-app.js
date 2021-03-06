import {PtgElement} from './ptg-element.js';
import './shared-styles.js';
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
    <style include="shared-styles">
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

        background-color: var(--background-color-bright,rgb(51, 51, 51));
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
      <practice-page 
        beat="{{beat}}" 
        measure="{{measure}}" 
        user-interacted="{{userInteracted}}" 
        run-generator="{{runGenerator}}" 
        bpm="{{bpm}}" tone="[[tone]]" 
        next-tone="[[nextTone]]" 
        on-switch-page-intend="_switchPage" 
        on-repeat-tone-intend="repeatCurrentTone" 
        on-skip-current-tone-intend="skipCurrentTone"
      ></practice-page>

      <settings-page 
        sharps-active="{{sharpsActive}}" 
        whites-active="{{whitesActive}}" 
        flats-active="{{flatsActive}}"
        user-interacted="{{userInteracted}}"
        metronome-volume="{{metronomeVolume}}" 
        synth-volume="{{synthVolume}}" 
        no-succedent-identical-notes="{{noSuccedentIdenticalNotes}}" 
        bars-before-switch="{{barsBeforeSwitch}}" 
        on-switch-page-intend="_switchPage"
        fullscreen="{{fullscreen}}"
        on-enter-fullscreen-attempt="_handleEnterFullscreenAttempt"
        on-exit-fullscreen-attempt="_handleExitFullscreenAttempt"
        ></settings-page>
    </iron-pages>
`;
  }

  static get is() { return 'practice-tone-generator-app'; }
  static get properties() {
    return {
      selectedPage: {
        type: Number,
        value: 0
      },
      fullscreen: {
        type: Boolean,
        value: false
      }
    };
  }

  ready() {
    super.ready()
    this._addFullscreenEventListeners()
  }

  _addFullscreenEventListeners() {
    document.addEventListener("fullscreenchange", function () {     
      this.set('fullscreen', this._isFullScreen())
    }.bind(this), false);
    
    document.addEventListener("mozfullscreenchange", function () {     
      this.set('fullscreen', this._isFullScreen())
    }.bind(this), false);
    
    document.addEventListener("webkitfullscreenchange", function () {
      this.set('fullscreen', this._isFullScreen())
    }.bind(this), false);
    
    document.addEventListener("msfullscreenchange", function () {     
      this.set('fullscreen', this._isFullScreen())
    }.bind(this), false);
  }

  _isFullScreen() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
    (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
    (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
    (document.msFullscreenElement && document.msFullscreenElement !== null);
    if(typeof isInFullScreen == "undefined" || isInFullScreen == null) isInFullScreen = false;

    return isInFullScreen;
  }

  _switchPage() {
    if(this.selectedPage == 0) return this.set('selectedPage', 1)
    this.set('selectedPage', 0);
  }

  _handleEnterFullscreenAttempt() {
    var reqFullscreenBrowserCompatible = (this.requestFullscreen || this.webkitRequestFullscreen || this.mozRequestFullscreen || this.mozRequestFullScreen || this.msRequestFullscreen);
    reqFullscreenBrowserCompatible.call(this);
  }

  _handleExitFullscreenAttempt() {
    var exitFullscreenBrowserCompatible = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
    exitFullscreenBrowserCompatible.call(document);
  }
}

window.customElements.define(PracticeToneGeneratorApp.is, PracticeToneGeneratorApp);
