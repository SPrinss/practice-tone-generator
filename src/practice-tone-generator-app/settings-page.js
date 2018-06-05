import {PwaStatus} from './pwa-status.js';
import './shared-styles.js';
import '@polymer/paper-slider/paper-slider.js';
// import '@polymer/neon-animation/web-animations.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import './ptg-image.js';
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

      #email-img {
        height: 20px;
        margin-top: 4px;
      }

      textarea {
        resize: none;
        height: 100px;
        overflow: auto;
      }

      input, textarea {
        @apply --ptg-font-body;
        font-size: 11px;
        outline: none;
        border: none;
        display: block;
        margin: 4px 0;
        width: 100%;
        max-width: 300px;
        border-radius: 4px;
        padding: 7px;
        background-color: #e8eeef;
        width: 100%;
        color: black;
        -webkit-box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
        box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
      }

      input:placeholder, textarea:placeholder, input::-webkit-input-placeholder, textarea::-webkit-input-placeholder, input::-moz-placeholder, textarea::-moz-placeholder, input:-ms-input-placeholder, textarea:-ms-input-placeholder {
        color:#8a97a0;
      }

      input {
        margin-top: 8px;
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
          <h1>Preferences</h1>
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
        
        <section>
          <h1>About</h1>
          <p>Made with <a href="https://tonejs.github.io/" target="_blank">ToneJS</a>, <a href="https://www.polymer-project.org/" target="_blank">Polymer 3.0</a> and <a href="https://firebase.google.com/docs/hosting/" target="_blank">Firebase hosting</a>.</p>

          <input type="text" placeholder="Email (optional)" value="{{email::change}}">
          <textarea placeholder="Provide feedback, report a bug, request a feature... or show some love." maxlength="700"  value="{{feedback::input}}"></textarea>
          <paper-button
            on-click="_sendFeedback"
            disabled="[[!feedback]]"
          >
            Send
          </paper-button>   
          <span hidden$="[[!_thanksMessageVisible]]">Thanks a lot!</span>
          <ptg-image class="image" id="email-img" source="../../images/email.svg"></ptg-image>
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
      email: {
        type: String,
        value: ""
      },
      feedback: {
        type: String,
        value: "",
        observer: "_loadDatabase"
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
      },
      _thanksMessageVisible: {
        type: Boolean,
        value: false
      },
      _loadingDatabaseScripts: {
        type: Boolean,
        value: false
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

  _loadScript(url, callback){
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
  }

  _loadDatabase(feedback) {
    if(!feedback || feedback == "" || this._loadingDatabaseScripts) return;

    this.set('_loadingDatabaseScripts', true)

    this._loadScript("https://www.gstatic.com/firebasejs/5.0.4/firebase-app.js", this._handleDatabaseScriptLoaded)
    this._loadScript("https://www.gstatic.com/firebasejs/5.0.4/firebase-firestore.js")
  }
  
  _handleDatabaseScriptLoaded() {
    var config = {
      apiKey: "AIzaSyC0JcpiON9yP-UYQehou-YYRU5Re66Att0",
      authDomain: "practice-tone-generator.firebaseapp.com",
      databaseURL: "https://practice-tone-generator.firebaseio.com",
      projectId: "practice-tone-generator",
      storageBucket: "practice-tone-generator.appspot.com",
      messagingSenderId: "94272529138"
    };
    firebase.initializeApp(config);
  }

  _sendFeedback() {
    var email = this.email; var feedback = this.feedback;
    var date = new Date();
    var dateInMs = date.getTime()

    firebase.firestore().collection('feedback').add({
      email: email, feedback: feedback, timestamp: dateInMs
    }).then((function() {
        this.set('email', ""); this.set('feedback', ""); this.set('_thanksMessageVisible', true)
    }).bind(this)).catch((function(error) {
      console.warn('Adding feedback failed...' + error)}).bind(this)
    );
  }
}

window.customElements.define(SettingsPage.is, SettingsPage);
