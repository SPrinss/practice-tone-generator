import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/utils/gestures.js';
import '@polymer/paper-slider/paper-slider.js';
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
    <style>
      :host {
        display: block;
        --max-width: 600px;
        --bar-height: 40px;
        --tone-size: 80px;
        --next-tone-width: 23px;
      }
      * {
        box-sizing: border-box;
        color: white;
      }
      main {
        position: relative;
        margin: auto;
        height: 100%;
        max-width: var(--max-width);
        width: 100%;
        display: flex;
        flex-direction: column;
        background: linear-gradient(
          to top right
          , rgba(51, 51, 51, .5) 0%
          , rgba(51, 51, 51, .5) 35%
          , rgba(255, 0, 0, .5) 35%
          , rgba(255, 0, 0, .5) 65%
          , rgba(51, 51, 51, .5) 65%
          , rgba(51, 51, 51, .5) 100% 
        );
      }

      header, footer {
        width: 100%;
        height: 120px;
      }      

      header {
        margin-top: 5vh;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        position: relative;
      }

      section {
        width: 100%; 
        margin: auto;
        flex: 1;
      }

      footer {
        margin-bottom: 5vh;
        position: relative;
        display: flex;
        max-width: 60%;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
      }

      #time-signature-overlay {
        position: absolute;
        top: 200%;
        bottom: 0;
        left: 0;
        right: 0;
        background-color:  rgba(255, 0, 0, .95);
        z-index: 0;
        transition: 0.7s;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: auto;
      }

      #time-signature-overlay[data-show-overlay] {
        top: 50%;
        z-index: 5;
      }

      #time-signature-overlay:not([data-show-overlay]) {
        top: 200%;
      }

      #time-signature-overlay-content {
        align-self: center;
      }

      increment-stepper {
        width: 60px;
        height: 120px;
        @apply --ptg-font-body-base;
      }
      
      paper-slider {
        width: 100%;
      }

      #bpm-input {
        @apply --ptg-font-body-base;
        color: white;
        margin-left: 40px;
        background-color: black;
        border: 0.5px solid darkgrey;
        width: 60px;        
        height: 40px;
        text-align:center;

      }

      footer span {
        line-height: 118px;
      }

      .flex-end {
        justify-content: flex-end;
      }

      .relative {
        width: 100%;
        height: 100%;
        position: relative;
      }

      #signatureDash {
        display: inline-block;
        text-align: center;
        line-height: 120px;
        font-size: 36px;
        margin: 0;
        color: grey;
      }      


      #circle  {
        height: 80%;
        max-height: calc(var(--max-width) - 60px);
        /* width: var(--tone-size); */
        z-index: 1;
        position: absolute;
        padding: 0;
        margin: 0;
        left: 50%;
        top: 50%;
        -webkit-transform:translate(-50%, -50%);
        -moz-transform:translate(-50%, -50%);
        -ms-transform:translate(-50%, -50%);
        -o-transform:translate(-50%, -50%);
        transform:translate(-50%, -50%);
      }

      #current-tone {
        height: calc(var(--tone-size) - 4px);
        width: var(--tone-size);
        z-index: 2;
        position: absolute;
        padding: 0;
        margin: 0;
        left: 50%;
        top: 50%;
        -webkit-transform:translate(-50%, -50%);
        -moz-transform:translate(-50%, -50%);
        -ms-transform:translate(-50%, -50%);
        -o-transform:translate(-50%, -50%);
        transform:translate(-50%, -50%);
      }

      #next-tone {
        position: absolute;
        padding: 0;
        margin: 0;
        right: 14px;
        width: var(--next-tone-width);
        height: 50px;
        height: calc(var(--bar-height) - 4px);  
        top: calc(50% - var(--next-tone-width));
        z-index: 2; 
      }

      #next-text {
        display: block;
        z-index: 1;
        position: absolute;
        padding: 0;
        margin: 0;
        right: 0;
        top: calc(50% - calc(var(--bar-height)*1.2));
        height: calc(var(--bar-height)/2);
        width: 80px;        
      }

      #bar-right {
        display: block;
        background-color: #FFFFFF;
        z-index: 1;
        position: absolute;
        padding: 0;
        margin: 0;
        right: 0;
        top: calc(50% - calc(var(--bar-height)/2));
        height: var(--bar-height);
        width: 50%;
      }

      toggle-icon {
        --toggle-icon-buttons: {
          width: 60px;
          height: 60px;
        }
      }      

      @media screen and (min-device-width: 599px) {
        #current-tone {
          height: calc(var(--tone-size) * 1.5);
          width: calc(var(--tone-size) * 1.5);
        }
        #bar-right {
          height: calc(var(--bar-height) * 1.5);
        }

        #next-text {
          top: calc(50% - calc(var(--bar-height) * 1.5));
          height: calc(calc(var(--bar-height)*1.5)/2);
        }
        #next-tone {
          width: calc(var(--next-tone-width) * 1.5);
          height: calc(calc(var(--bar-height)-4px) * 1.5);   
          top: calc(50% -4px);
        }        

        toggle-icon {
          --toggle-icon-buttons: {
            width: 50px;
            height: 50px;
          }
        }        
      }

      paper-icon-button {
        z-index: 2;
        cursor: pointer;
      }

      #time-signure-button {
        position: absolute;
        left: 8%;
        top: 8%;
        z-index: 2;
      }

      #repeat-button {
        position: absolute;
        right: 20%;
        bottom: 23%;
        z-index: 2;
      }

      #next-button {
        position: absolute;
        right: 8%;
        bottom: 10%;
        z-index: 2;        
      }      

      #play-pause-button {
        /* width: 44px; */
        stroke: white;
        position: absolute;
        left: 22%;
        top: 22%;
        z-index: 2;
      }

      #settings-button {
        position: absolute;
        right: 10%;
        top: 10%;
        color: #FFFFFF;
      }

      [hidden] {
        display: none;
      }

    </style>

    <main>
      <!-- <play-pause-button playing="{{runGenerator}}"></play-pause-button> -->

      <toggle-icon 
        id="play-pause-button"
        icon="ptg-icons:play-arrow" 
        icon-checked="ptg-icons:pause" 
        alt="repeat-button"
        on-click="_toggleRunGenerator"
      ></toggle-icon>

      <toggle-button id="time-signure-button" on-click="_handleShowOverlayAttempt">
        <span slot="body">[[beat]] / [[measure]]</span>
      </toggle-button>

      <toggle-icon 
        id="repeat-button"
        icon="ptg-icons:repeat" 
        alt="repeat-button" 
        animation="rotate" 
        rotation="360"
        on-click="_handleRepeatToneAttempt"
      ></toggle-icon>
      
      <toggle-icon 
        id="next-button"
        icon="ptg-icons:skip-next" 
        alt="next-button" 
        animation="rotate" 
        rotation="360"
        on-click="_handleSkipCurrentToneAttempt"
      ></toggle-icon>
      <paper-icon-button id="settings-button" icon="ptg-icons:settings" alt="settings" on-click="_switchPageIntend"></paper-icon-button>

      <div id="time-signature-overlay" data-show-overlay\$="[[showOverlay]]">
        <div id="time-signature-overlay-content">
          <increment-stepper values="[[beats]]" selected-index="{{beatIndex}}" selected-value="{{beat}}"></increment-stepper>

          <p id="signatureDash">/</p>

          <increment-stepper values="[[measures]]" selected-index="{{measureIndex}}" selected-value="{{measure}}"></increment-stepper>
        </div>
      </div>


        <header></header>

      <section class="relative">
        <img src="../../images/circle.svg" id="circle" alt="">
        <ptg-image id="current-tone" hidden\$="[[!tone]]" source="[[_computeImgPath(tone)]]"></ptg-image>
        <ptg-image id="next-tone" hidden\$="[[!nextTone]]" source="[[_computeImgPath(nextTone)]]"></ptg-image>
        <ptg-image id="next-text" hidden\$="[[!nextTone]]" source="../../images/next.svg"></ptg-image>
          
        <div id="bar-right"></div>
      </section>

      <footer>
        <input id="bpm-input" min="30" max="200" type="number" value="{{bpm::change}}">
        <paper-slider pin="" min="30" max="200" value="{{bpm}}"></paper-slider>
      </footer>
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
      }
    };
  }

  _computeImgPath(toneWithOctave) {
    // Cut off octave Number and replace # with sharp (since Filepaths don't like #)
    var tone = toneWithOctave.substring(0, toneWithOctave.length -1).replace("#", "sharp");
    return "../../images/" + tone + ".svg";
  }

  _toggleRunGenerator() {
    this.set('runGenerator', !this.runGenerator)
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

  _handleShowOverlayAttempt() {
    console.log(!this.showOverlay)
    this.set('showOverlay', !this.showOverlay)
  }

  _hideOverlay(evt) {
    if(evt.target.id == "time-signure-button" || evt.target.id == "time-signature-overlay") return;
    console.log('hide', evt.target.id)
    this.set('showOverlay', false)        
  }
}

window.customElements.define(PracticePage.is, PracticePage);
