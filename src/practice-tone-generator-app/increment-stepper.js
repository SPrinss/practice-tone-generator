import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../../node_modules/skeleton-carousel/skeleton-carousel.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/**
 * `increment-stepper` Description
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {Polymer.Element}
 */
class IncrementSteper extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block
      }

      .item-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
      }

      hr {
        border-color: rgb(51, 51, 51);
        background-color: rgb(51, 51, 51);
        border-style:solid;
        width: 8%;
        margin: var(--hr-margin, 2px) auto;
      }

      .small {
        width: 4%;
      }

      .smallest {
        width: 1%;
      }

      p {
        margin: 12px;
        color: #FFFFFF;
      }

      skeleton-carousel {
        height: 100px;
        --skeleton-carousel-min-height: 120px;
        cursor: grab;
      }

    </style>

    <main>
      <skeleton-carousel direction="vertical" selected="{{selectedIndex}}" loop="">
        <template is="dom-repeat" items="[[values]]">
          <div class="item-container">
            <hr class="smallest">
          
            <hr class="small">
            <hr>
            <p>[[item]]</p>
            <hr>
            <hr class="small">     
            <hr class="smallest">
       
          </div>
        </template>
      </skeleton-carousel>
    </main>
`;
  }

  static get is() { return 'increment-stepper';}
  static get properties() {
    return {
      title: {
        type: String
      },
      values: {
        type: Array
      },
      selectedIndex: {
        type: Number,
        notify: true
      },
      selectedValue: {
        type: String,
        notify: true,
        computed: "_computeSelectedValue(values.splices, selectedIndex)"
      }
    };
  }

  increaseIndex() {
    let arrayLength = this.values.length;
    if(arrayLength == this.index +1) return;
    this.set('index', this.index+1)
  }

  decreaseIndex() {
    if(this.index === 0) return;
    this.set('index', this.index-1)
  }

  _computeSelectedValue(valuesSpliced, index) {
    return this.values[index]
  }

  _valueIsZero(value) {
    return value === 0;
  }

  _valueIsLengthArray(valuesSpliced, index) {
    if(!this.values) return true;
    let arrayLength = this.values.length;
    if(arrayLength == index+1) return true;
    return false;
  }
}
window.customElements.define(IncrementSteper.is, IncrementSteper);
