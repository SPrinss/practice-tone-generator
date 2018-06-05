import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
      :host {
        --main-vertical-padding: 5vh;
        --max-width: 660px;
        --bar-height: 40px;
        --tone-size: 90px;
        --next-tone-width: 23px;
        --header-footer-height: 120px;
        --header-footer-margin: 5vh;
        --overlay-color: rgba(255, 0, 0, .95);
          
        /* Unfortunately, can't use variables to set linear gradient % yet; change main linear gradient percentages if you change this value */
        --middle-bar-half-width: 15%;
        --background-color: rgba(51, 51, 51, .5);
        --background-color-bright: rgba(51, 51, 51, 1);
        --support-color: rgba(255, 0, 0, .5);
        --support-color-bright: rgba(255, 0, 0, 1);
        --text-color: #FFFFFF;
        --border-color: darkgrey;
        --first-horizontal-positioned-item-position: 8%;
        --second-horizontal-positioned-item-position: 20%;
        --first-vertical-positioned-item-position: 8%;
        --second-vertical-positioned-item-position: 20%;
      }

      * {
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        color: white;
      }

      p, span {
        @apply --ptg-font-body;
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
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none; 
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

      :host {
        --ptg-main-font-family: 'Lora', Georgia,Cambria,'Times New Roman',Times,serif;
        --ptg-main-font-weight: 400;
        --ptg-main-line-height: 1.5;

        --ptg-headline-font-family: 'proxima-nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        --ptg-headline-font-weight: 700;
        --ptg-headline-line-height: 1;
        --ptg-font-h1-size: 32px;
        --ptg-font-body-size: 16px;

        /*
        font styles
        */
        --ptg-font-base: {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          margin-top: 0;
          margin-bottom: 0;
        };

        --ptg-font-h1: {
          @apply --ptg-font-base;
          font-family: var(--ptg-headline-font-family);
          font-weight: var(--ptg-headline-font-weight);
          line-height: var(--ptg-headline-line-height);
          margin: 14px 0;
          font-size: var(--ptg-font-h1-size);
        }
        
        --ptg-font-body: {
          @apply --ptg-font-base;
          font-family: var(--ptg-main-font-family);
          font-weight: var(--ptg-main-font-weight);
          line-height: var(--ptg-main-line-height);
          font-size: var(--ptg-font-body-size);
        }
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);