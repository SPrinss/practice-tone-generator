import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/polymer/lib/utils/gestures.js';
import '@polymer/paper-slider/paper-slider.js';
import '@polymer/paper-button/paper-button.js';

import './increment-stepper.js';
import './ptg-image.js';
import './toggle-button.js';
import '@polymer/toggle-icon/toggle-icon.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/**
 * `practice-page` Description
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {Polymer.Element}
 */
class PracticePage extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
    :host {
        display: block;
      }

      /* MAIN ELEMENTS */
      main {
        position: relative;
        margin: auto;
        padding: var(--main-vertical-padding, 5vh) 0;
        height: 100%;
        max-width: var(--max-width, 600px);
        width: 100%;
        display: flex;
        flex-direction: column;
        
        /* Update these values if you change --middle-bar-half-width css variable. */
        background: linear-gradient(
          to top right
          , var(--background-color, rgba(51, 51, 51, .5)) 0%
          , var(--background-color, rgba(51, 51, 51, .5)) 35%
          , var(--support-color, rgba(255, 0, 0, .5)) 35%
          , var(--support-color, rgba(255, 0, 0, .5)) 65%
          , var(--background-color, rgba(51, 51, 51, .5)) 65%
          , var(--background-color, rgba(51, 51, 51, .5)) 100% 
        );
      }

      section {
        width: 100%; 
        margin: auto;
      }

      /* IMAGES */
      #circle  {
        width: 67%;
        height: 67%;
        max-height: 44vh;
        z-index: 1;
        pointer-events: none;
      }

      #current-tone {
        height: calc(var(--tone-size) - 4px);
        width: var(--tone-size);
        z-index: 2;
      }

      #next-tone {
        right: 14px;
        width: var(--next-tone-width);
        height: calc(var(--bar-height) + 14px);  
        top: calc(50% - var(--next-tone-width));
        z-index: 2; 
      }

      @media screen and (max-device-width: 840px) and (orientation: landscape) {
        #current-tone {
          height: calc(var(--tone-size) / 1.5);
          width: calc(var(--tone-size) / 1.5);
        }
        #next-tone {
          width: calc(var(--next-tone-width) / 1.5);
          height: calc(calc(var(--bar-height)-4px));   
          top: calc(50% - var(--next-tone-width));
        }
      }

      @media screen and (max-device-width: 840px) and (orientation: portrait) {
        #current-tone {
          height: calc(var(--tone-size) / 1.5);
          width: calc(var(--tone-size) / 1.5);
        }
        #next-tone {
          width: calc(var(--next-tone-width) / 1.5);
          height: calc(calc(var(--bar-height)-4px) / 1.5);   
          top: 48%;
        }   
      }

      /* USER INPUT ELEMENTS */
      increment-stepper {
        @apply --ptg-font-body;
        display: inline-block;
        width: 100%;
        height: 120px;        
        --hr-margin: 5px;
        --hr-color: var(--background-color-bright, rgba(51, 51, 51, 1));
        margin: 46px 0;
      }
      
      paper-slider {
        position: absolute;

        /* Can't style the padding of the slider container, subtract 16px instead */
        left: calc(var(--first-horizontal-positioned-item-position, 8%) - 16px);
        bottom: var(--first-vertical-positioned-item-position, 12%);
        max-width: 45%;
        --paper-slider-active-color: var(--support-color-bright, rgb(255, 0, 0));
        --paper-slider-knob-color: var(--support-color-bright, rgb(255, 0, 0));
        --paper-slider-pin-color: var(--support-color-bright, rgb(255, 0, 0));
        --paper-slider-knob-color: var(--support-color-bright, rgb(255, 0, 0));
      }

      #bpm-input {
        position: absolute;
        @apply --ptg-font-body;
        color: white;
        left: var(--first-horizontal-positioned-item-position, 8%);
        bottom: var(--second-vertical-positioned-item-position, 22%);
        background-color: var(--background-color-bright, rgb(51, 51, 51));
        width: 60px;
        height: 40px;
        margin-left: calc(var(--first-horizontal-positioned-item-position, 8%) / 2);
        text-align:center;
      }

      #time-signure-button {
        background-color: transparent;
        min-width: 5.14em;
        height: 58px;
        color: var(--text-color, white);
      }      

      toggle-icon {
        --toggle-icon-buttons: {
          width: 50px;
          height: 50px;
        }
      }

      #play-pause-button {
        --toggle-icon-buttons: {
          width: 72px;
          height: 72px;
        }
      }

      @media screen and (max-device-width: 840px) {
        increment-stepper {
          margin: 16px 0;
          --hr-margin: 2px;
        }

        toggle-icon {
          --toggle-icon-buttons: {
            width: 44px;
            height: 44px;
          }
        }

        #play-pause-button {
          --toggle-icon-buttons: {
            width: 66px;
            height: 66px;
          }
        }        

        #time-signure-button {
          min-width: 23px;
          height: 32px;
        }        
      }

      /* OTHER VISUAL ELEMENTS */
      #bar-right {
        display: block;
        background-color: #FFFFFF;
        z-index: 1;
        position: absolute;
        padding: 0;
        margin: 0;
        right: 0;
        top: calc(50% - calc(var(--bar-height)/2));
        width: 50%;
        height: calc(var(--bar-height) * 1.5);
      }

      #next-text {
        display: block;
        z-index: 1;
        right: 0;
        top: calc(50% - calc(var(--bar-height) * 1.5));
        height: calc(calc(var(--bar-height)*1.5)/2);
        width: 80px;        
      }      

      @media screen and (max-device-width: 840px) {
        #bar-right {
          height: var(--bar-height);
        }

        #next-text {
          top: calc(50% - calc(var(--bar-height)*1.2));
          height: calc(var(--bar-height)/2);
        }

        #next-text {
          top: calc(50% - calc(var(--bar-height)*1.2));
          height: calc(var(--bar-height)/2);
        }        
      }

      /* TIME SIGNUTURE OVERLAY */
      #time-signature-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color:  var(--overlay-color, rgba(255, 0, 0, .95));
        transition: 0.7s;
      }

      #time-signature-overlay[data-show-overlay] {
        top: 50%;
        z-index: 3;
      }

      #time-signature-overlay:not([data-show-overlay]) {
        top: 200%;
        z-index: 0;
      }

      #time-signature-overlay-content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: linear-gradient(
          to top
          , var(--background-color, rgba(51, 51, 51, .5)) 0%
          , var(--background-color, rgba(51, 51, 51, .5)) 49%
          , var(--support-color, rgba(255, 0, 0, .5)) 49%
          , var(--support-color, rgba(255, 0, 0, .5)) 51%
          , var(--background-color, rgba(51, 51, 51, .5)) 51%
          , var(--background-color, rgba(51, 51, 51, .5)) 100% 
        );
      }

      #time-signatur-close-bar {
        height: 28px;
        width: 100%;
        text-align: center;
        color: var(--text-color, rgba(255, 255, 255, 1));
        line-height: 28px;
        background-color: rgba(51, 51, 51, .8);
        box-shadow: 0px 3px rgba(51, 51, 51, .4);
        cursor: pointer;
      }

      [hidden] {
        display: none;
      }
    </style>

    <main>
      <toggle-icon 
        class="absolute second-top second-left ptg-button"
        icon="ptg-icons:play-arrow" 
        icon-checked="ptg-icons:pause"
        id="play-pause-button"
        alt="repeat-button"
        on-click="_toggleRunGenerator"
      ></toggle-icon>

      <paper-button 
        class="absolute first-top first-left ptg-button"
        id="time-signure-button"  
        raised 
        on-click="toggleOverlayVisibility"
      >
        [[beat]] / [[measure]]
      </paper-button>

      <toggle-icon 
        id="repeat-button"
        class="absolute second-bottom second-right ptg-button"
        icon="ptg-icons:repeat" 
        alt="repeat-button" 
        animation="rotate" 
        rotation="360"
        on-click="_handleRepeatToneAttempt"
      ></toggle-icon>
      
      <toggle-icon 
        class="absolute first-bottom first-right ptg-button"
        icon="ptg-icons:skip-next" 
        alt="next-button" 
        animation="rotate" 
        rotation="360"
        on-click="_handleSkipCurrentToneAttempt"
      ></toggle-icon>

      <paper-icon-button 
        class="absolute first-top first-right ptg-button"
        icon="ptg-icons:settings" 
        alt="settings-button" 
        on-click="_switchPageIntend"
      ></paper-icon-button>

      <div id="time-signature-overlay" data-show-overlay\$="[[showOverlay]]">
        <div id="time-signatur-close-bar" on-click="toggleOverlayVisibility"> Close </div>
        <div id="time-signature-overlay-content">
          <increment-stepper id="beat-stepper" values="[[beats]]" selected-index="{{beatIndex}}" selected-value="{{beat}}"></increment-stepper>
          <increment-stepper id="measure-stepper" values="[[measures]]" selected-index="{{measureIndex}}" selected-value="{{measure}}"></increment-stepper>
        </div>
      </div>

      <section class="relative">
        <ptg-image class="image center" id="circle" source="../../images/circle.svg"></ptg-image>        
        <ptg-image class="image center" id="current-tone" hidden$="[[!tone]]" source="[[_computeImgPath(tone)]]"></ptg-image>
        <ptg-image class="image absolute" id="next-tone" hidden$="[[!nextTone]]" source="[[_computeImgPath(nextTone)]]"></ptg-image>
        <ptg-image class="image absolute" id="next-text" hidden$="[[!nextTone]]" source="../../images/next.svg"></ptg-image>

        <div id="bar-right"></div>
      </section>

      <input id="bpm-input" min="30" max="200" type="number" value="{{bpm::change}}">
      <paper-slider pin="" min="30" max="200" value="{{bpm}}"></paper-slider>
    </main>
`;
  }

  static get is() { return 'practice-page';}
  static get properties() {
    return {
      tone: {
        type: String,
        value: ''
      },
      nextTone: {
        type: String,
        value: ''
      },          
      beats: {
        type: Array,
        value: function () {
          return ['1', '2', '3', '4', '5','6', '7', '8', '9','10', '11', '12', '13']
        }
      },
      beatIndex: {
        type: Number,
        value: 3
      },

      beat: {
        type: String,
        value: "4",
        notify: true
      },
      measures: {
        type: Array,
        value: function () {
          return ['2', '4', '8', '16']
        }
      },
      measureIndex: {
        type: Number,
        value: 1
      },
      measure: {
        type: String,
        value: "4",
        notify: true
      },   
      runGenerator: {
        type: Boolean,
        value: false,
        notify: true
      },
      bpm: {
        type: String,
        notify: true
      },
      showOverlay: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true
      },
      userInteracted: {
        type: Boolean,
        value: false,
        notify: true
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

  _computeImgPath(toneWithOctave) {
    // Cut off octave Number and replace # with sharp (since Filepaths don't like #)
    var tone = toneWithOctave.substring(0, toneWithOctave.length -1).replace("#", "sharp");
    return "../../images/" + tone + ".svg";
  }

  _toggleRunGenerator() {
    if(this.userInteracted) return this.set('runGenerator', !this.runGenerator);
    
    window.setTimeout((function () {
      this.set('runGenerator', !this.runGenerator)
    }.bind(this)), 500)
    
  }

  _switchPageIntend() {
    this.dispatchEvent(new CustomEvent('switch-page-intend'));
  }

  _handleRepeatToneAttempt() {
    this.dispatchEvent(new CustomEvent('repeat-tone-intend'));
  }

  _handleSkipCurrentToneAttempt() {
    this.dispatchEvent(new CustomEvent('skip-current-tone-intend'));
  }

  toggleOverlayVisibility() {
    this.set('showOverlay', !this.showOverlay)
  }

  _hideOverlay(evt) {
    if(evt.target.id == "time-signure-button" || evt.target.id == "time-signature-overlay") return;
    console.log('hide', evt.target.id)
    this.set('showOverlay', false)        
  }
}

window.customElements.define(PracticePage.is, PracticePage);
