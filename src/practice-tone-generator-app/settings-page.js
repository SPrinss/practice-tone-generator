import {PwaStatus} from './pwa-status.js';
import './shared-styles.js';
import '@polymer/paper-slider/paper-slider.js';
// import '@polymer/neon-animation/web-animations.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-checkbox/paper-checkbox.js';

import './ptg-icons.js';

import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/**
 * `settings-page` Description
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {Polymer.Element}
 */
class SettingsPage extends PwaStatus {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;
      }

      main {
        position: relative;
        margin: auto;
        max-width: var(--max-width, 600px);
        padding: var(--main-vertical-padding, 5vh) 0;
        width: 100%;
        height: 100%;        
        overflow: scroll;
      }

      #grid-container {
        margin-top: calc(var(--first-vertical-positioned-item-position) * 3);
        display: grid;
        grid-gap: 16px;
        grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));
        grid-template-columns: 0.5fr 0.5fr;
      }

      section {
        border: 1px solid var(--border-color, darkgrey);
        border-radius: 5%;
        padding: 24px;
      }

      paper-slider {
        width: 80%;
        margin-left: -16px;

        --paper-slider-active-color: var(--support-color-bright, rgb(255, 0, 0));
        --paper-slider-knob-color: var(--support-color-bright, rgb(255, 0, 0));
        --paper-slider-pin-color: var(--support-color-bright, rgb(255, 0, 0));
        --paper-slider-knob-color: var(--support-color-bright, rgb(255, 0, 0));
        @apply --ptg-font-body;
        --paper-slider-input: {
          width: 70px; 
        }
        --paper-slider-input-container-input: {
          background-color: var(--background-color, rgb(51, 51, 51));
          color: white;
        }
      }

      paper-button {
        background-color: var(--background-color-bright, rgb(51, 51, 51));
      }

      paper-checkbox {
        --primary-text-color: var(--text-color, #FFFFFF);
        --primary-color: var(--support-color-bright, rgb(255, 0, 0));
        @apply --ptg-font-body;
      }

      h1 {
        @apply --ptg-font-h1;
      }

      #header-h1 {
        position: absolute;
        left: var(--first-horizontal-positioned-item-position, 8%);
        top: var(--first-vertical-positioned-item-position, 8%);
        font-size: calc(var(--ptg-font-h1-size, 32px) * 1.35);
        margin: 0;
      }


      paper-icon-button {
        position: absolute;
        right: var(--first-horizontal-positioned-item-position, 8%);
        top: var(--first-vertical-positioned-item-position, 8%);
        color: var(--text-color, #FFFFFF);
        @apply --ptg-font-body;

      } 

      paper-button {
        z-index: 2;
        @apply --ptg-font-body;
        margin: 8px 8px 8px 0;
      }

      paper-button[data-raised] {
        background-color: var(--support-color-bright, rgb(255, 0, 0));
      }

      paper-button:not([data-raised]) {
        --paper-button {
          background-color: var(--text-color, #FFFFFF);
        }
      }

      paper-button[disabled] {
        color: grey;
      }

      @media screen and (max-device-width: 840px) {
        section {
          padding: 12px;
        }
        main {
          padding: 8px;
        }
        #grid-container {
          grid-template-columns: 1fr;
        }
        paper-slider {
          width: 100%;
        }
      }

      [hidden] {
        display: none;
      }
    </style>

    <main>
      <div id="grid-container">
        <h1 id="header-h1">Settings</h1>
        <paper-icon-button 
          icon="ptg-icons:arrow-back" 
          alt="return-to-player-button" 
          on-click="_switchPageIntend"
        ></paper-icon-button>        
        <section>
          <h1>Keys</h1>

          <paper-button 
            data-raised$="{{flatsActive}}"
            raised="{{flatsActive}}"
            disabled="[[_computeButtonDisabled(whitesActive, sharpsActive, flatsActive, 'flatsActive')]]"
            on-click="_toggleActive"
            data-prop-name="flatsActive"
          >
            Flat keys ♭
          </paper-button>

          <paper-button 
            data-raised$="{{sharpsActive}}"
            raised="{{sharpsActive}}"
            disabled="[[_computeButtonDisabled(whitesActive, sharpsActive, flatsActive, 'sharpsActive')]]"
            on-click="_toggleActive"    
            data-prop-name="sharpsActive"
          >
            Sharp keys ♯
          </paper-button>
          
          <paper-button 
            data-raised$="{{whitesActive}}"
            raised="{{whitesActive}}"
            disabled="[[_computeButtonDisabled(whitesActive, sharpsActive, flatsActive, 'whitesActive')]]"
            on-click="_toggleActive"
            data-prop-name="whitesActive"
          >
            White keys
          </paper-button>        

          <paper-checkbox checked="{{noSuccedentIdenticalNotes}}">Prevent doubles</paper-checkbox>
          
        </section>

        <section>
          <h1># bars</h1>
          <paper-slider pin="" min="1" max="20" editable="" value="{{barsBeforeSwitch}}"></paper-slider>
        </section>

        <section>
          <h1>Volume</h1>
          <div>
            <span>Metronome volume</span>
            <paper-slider pin="" min="0" max="100" value="{{metronomeVolume}}"></paper-slider>
          </div>
        </section>


        <section>
          <h1>Preferrences</h1>
          <paper-button
            hidden$="[[!_atLeastOneIsTrue(isPwa, canInstallPwa)]]"
            on-click="_handleInstallPwa"
            raised
          >
            Add to homescreen
          </paper-button>

          <paper-button
            hidden$="[[_showEnterFullscreenButton(_fullscreenAvailable, fullscreen)]]"
            on-click="toggleFullscreen"
            data-raised$="[[!_showEnterFullscreenButton(_fullscreenAvailable, fullscreen)]]"
            raised
          >
            Enter Fullscreen
          </paper-button>            
          <paper-button
            hidden$="[[!_showEnterFullscreenButton(_fullscreenAvailable, fullscreen)]]"
            on-click="toggleFullscreen"
            raised
            data-raised$="[[_showEnterFullscreenButton(_fullscreenAvailable, fullscreen)]]"
          >
            Exit Fullscreen
          </paper-button>                              
        </section>        
      </div>
    </main>
`;
  }

  static get is() {
    return 'settings-page';
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      metronomeVolume: {
        type: String,
        value: "40",
        notify: true
      },
      synthVolume: {
        type: String,
        value: "0",
        notify: true
      },
      flatsActive: {
        type: Boolean,
        value: true,
        notify: true
      },
      sharpsActive: {
        type: Boolean,
        value: true,
        notify: true
      },
      whitesActive: {
        type: Boolean,
        value: true,
        notify: true
      }, 
      barsBeforeSwitchOptions: {
        type: Array,
        value: function () {
          return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        }
      },
      barsBeforeSwitchIndex: {
        type: Number,
        value: 0
      },   
      barsBeforeSwitch: {
        type: String,
        notify: true
      },
      noSuccedentIdenticalNotes: {
        type: Boolean,
        value: true,
        notify: true
      },
      userInteracted: {
        type: Boolean,
        value: false,
        notify: true
      },
      fullscreen: {
        type: Boolean,
        value: false
      },
      _iOsPwaPromptOverlayVisible: {
        type: Boolean,
        value: false
      },
      _fullscreenAvailable: {
        type: Boolean,
        value: function() {
          var available = !!(this.requestFullscreen || this.webkitRequestFullscreen || this.mozRequestFullscreen || this.msRequestFullscreen);
          return available;
        }
      }
    };
  }


  ready() {
    super.ready()
    this.addEventListener('click', e => this._handleUserInteracted());
  }

  _handleUserInteracted() {
    this.set('userInteracted', true)
  }

  _switchPageIntend() {
    this.dispatchEvent(new CustomEvent('switch-page-intend'));
  }

  _handleInstallPwa() {
    if(this.canInstallPwaUsingPrompt) return this.installPwaWithPrompt();
    this._displayInstallPwaPrompt();
  }

  _displayInstallPwaPrompt() {
    // TODO this.userBrowser -> show custom notification
  }

  _toggleActive(evt) {
    var propName = evt.target.getAttribute('data-prop-name');
    this.set(propName, !this[propName])
  }

  _computeButtonDisabled(whitesActive, sharpsActive, flatsActive, buttonToneType) {
    var buttonsActive = [whitesActive, sharpsActive, flatsActive].filter(v => v).length;
    if(buttonsActive <= 1 && this[buttonToneType] == true) return true;
    return false;
  }

  _atLeastOneIsTrue() {
    var argumentsArray = [].slice.apply(arguments);
    return argumentsArray.includes(true);
  }

  toggleFullscreen() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
    (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
    (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
    (document.msFullscreenElement && document.msFullscreenElement !== null);

    if (!isInFullScreen) {
      this.dispatchEvent(new CustomEvent('enter-fullscreen-attempt'))
    } else {
      this.dispatchEvent(new CustomEvent('exit-fullscreen-attempt'))
    }
  }

  _showEnterFullscreenButton(fullscreenPossible, isInFullscreen) {
    return fullscreenPossible == true && isInFullscreen == true;
  }
}

window.customElements.define(SettingsPage.is, SettingsPage);
