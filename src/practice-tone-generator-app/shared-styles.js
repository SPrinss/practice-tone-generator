import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
      :host {
        --main-vertical-padding: 5vh;
        --max-width: 600px;
        --bar-height: 40px;
        --tone-size: 90px;
        --next-tone-width: 23px;
        --header-footer-height: 120px;
        --header-footer-margin: 5vh;
        --overlay-color: rgba(255, 0, 0, .95);
        --ptg-font-body-base: {};
          
        /* Unfortunately, can't use variables to set linear gradient % yet; change main linear gradient percentages if you change this value */
        --middle-bar-half-width: 15%;
        --background-color: rgba(51, 51, 51, .5);
        --background-color-bright: rgba(51, 51, 51, 1);
        --support-color: rgba(255, 0, 0, .5);
        --support-color-bright: rgba(255, 0, 0, 1);
        --first-horizontal-positioned-item-position: 8%;
        --second-horizontal-positioned-item-position: 22%;
        --first-vertical-positioned-item-position: 10%;
        --second-vertical-positioned-item-position: 23%;
      }

      * {
        box-sizing: border-box;
        color: white;
      }      
      
      .absolute {
        position: absolute;
      } 
    
      .first-top {
        top: var(--first-vertical-positioned-item-position);
      }      
    
      .second-top {
        top: var(--second-vertical-positioned-item-position);
      } 
    
      .first-bottom {
        bottom: var(--first-vertical-positioned-item-position);
      }      
    
      .second-bottom {
        bottom: var(--second-vertical-positioned-item-position);
      }       
    
      .first-left {
        left: var(--first-horizontal-positioned-item-position);        
      }
    
      .second-left {
        left: var(--second-horizontal-positioned-item-position);        
      }
    
      .first-right {
        right: var(--first-horizontal-positioned-item-position);        
      }
    
      .second-right {
        right: var(--second-horizontal-positioned-item-position);        
      }      
    
      .ptg-button {
        z-index: 2;
      }

      .image {
        padding: 0;
        margin: 0;
      }

      .center {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform:translate(-50%, -50%);
        -moz-transform:translate(-50%, -50%);
        -ms-transform:translate(-50%, -50%);
        -o-transform:translate(-50%, -50%);
        transform:translate(-50%, -50%);
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);