import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-slider/paper-slider.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
// import '@polymer/neon-animation/web-animations.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
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
class SettingsPage extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }

      * {
        box-sizing: border-box;
        color: #FFFFFF;
      }

      input {
        -moz-transform: scaleX(-1);
        -o-transform: scaleX(-1);
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
        filter: FlipH;
        -ms-filter: "FlipH";
      }

      main {
        margin: auto;
        max-width: 600px;
        padding: 8px;
        width: 100%;
        display: grid;
        grid-gap: 16px;
        grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));        
        grid-template-columns: 0.5fr 0.5fr;
      }

      section {
        border: 1px solid darkgrey;
        border-radius: 5%;
        padding: 12px;
      }

      header {
        padding-left: 8px;
        line-height: 120px;
        height: 120px;
        margin: auto;
        max-width: 600px;
        width: 100%;
        position: relative;
      }      

      header h1 {
        margin: 0;
      }

      @media screen and (min-device-width: 599px) {
        section {
          padding: 24px;
        }
        main {
          padding: 0;
        }
        header {
          padding: 0;
        }
        paper-slider {
          width: 80%;
        }

      }

      paper-radio-button {
        display: block;
        --paper-radio-button-unchecked-background-color: #FFFFFF;
        --paper-radio-button-unchecked-color: #FFFFFF;
        --paper-radio-button-unchecked-ink-color: #FFFFFF;
        --paper-radio-button-label-color: #FFFFFF;
      } 

      paper-item {
        color: black;
      }

      paper-dropdown-menu {
        --paper-dropdown-menu-input: {
          color: #FFFFFF;
        }
        --paper-input-container-input: {
          color: #FFFFFF;
          font-style: normal;
          font-family: serif;
          text-transform: uppercase;
        };
      }

      paper-slider {
        width: 100%;
        @apply --ptg-font-body-base;
        --paper-slider-input: {
          width: 70px; 
        }
        --paper-slider-input-container-input: {
          background-color: darkgrey;
          color: #FFFFFF;
        }
      }

      paper-icon-button {
        position: absolute;
        right: 4px;
        top: 42px;
        color: #FFFFFF;
      }

    </style>

    <header>
      <h1>Settings</h1>
      <paper-icon-button icon="ptg-icons:arrow-back" alt="settings" on-click="_switchPageIntend"></paper-icon-button>
    </header>

    <main>
      <section>
        <h1>Tone type</h1>

        <paper-radio-group selected="{{keyType}}" aria-labelledby="label2">
          <paper-radio-button name="all">All</paper-radio-button>
          <paper-radio-button name="sharps">Sharps only</paper-radio-button>
          <paper-radio-button name="flats">Flats only</paper-radio-button>
          <paper-radio-button name="whiteKeys">White keys only</paper-radio-button>
        </paper-radio-group>

        <div>
          <input type="checkbox" value="{{noSuccedentIdenticalNotes::change}}">
          <span>No succesent identical tones</span>
        </div>
        
      </section>

      <section>
        <h1># Bars before next tone</h1>
        <paper-slider pin="" min="1" max="20" editable="" value="{{barsBeforeSwitch}}"></paper-slider>
      </section>

      <section>
        <h1>Volume</h1>
        <div>
          <span>Metronome volume</span>
          <paper-slider pin="" min="0" max="100" value="{{metronomeVolume}}"></paper-slider>
        </div>
      </section>

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
      keyType: {
        type: String,
        notify: true
      },
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
        value: false,
        notify: true
      }        
    };
  }

  _switchPageIntend() {
    this.dispatchEvent(new CustomEvent('switch-page-intend'));
  }
}

window.customElements.define(SettingsPage.is, SettingsPage);