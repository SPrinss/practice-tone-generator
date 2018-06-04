import { PolymerElement } from '@polymer/polymer/polymer-element.js';

/**
 * `pwaStatus` Description
 *
 * @summary Element which handles PWA add to homescreen information for different browsers.
 * @customElement
 * @polymer
 * @extends {Polymer.Element}
 */
export class PwaStatus extends PolymerElement {
  static get is() {return 'pwa-status';}
  static get properties() {
    return {
      userBrowser: {
        type: String,
        notify: true
      },
      isPwa: {
        type: Boolean,
        value: false,
        notify: true
      },
      canInstallPwa: {
        type: Boolean,
        value: false,
        notify: true
      },
      canInstallPwaUsingPrompt: {
        type: Boolean,
        value: false,
        notify: true
      },
      _deferredPrompt: {
        type: Object
      },              
    };
  }

  ready() {
    super.ready()
    // App already is a PWA
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      this.set('canInstallPwa', false);
      return this.set('isPwa', true);
    }

    // If it's not a PWA yet, we need to check the user's browser to provide the correct installation instructions.
    this._loadScript('https://cdnjs.cloudflare.com/ajax/libs/bowser/1.9.3/bowser.min.js', this._handleBrowserDetectOnline.bind(this))

    // Add event listener for Chrome; this listener can't wait for the Bowser script to be loaded and won't fire on other browsers.
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.set('_deferredPrompt', e);
      this.set('canInstallPwaUsingPrompt', true);
    });
  }

  _handleBrowserDetectOnline() {
    this.set('userBrowser', bowser.name);
    this.set('canInstallPwa', this._computeCanInstallPwa());
  }

  _computeCanInstallPwa() {
    // Currently (June 2018) only the Chrome browser can install a PWA on desktop devices
    if(!bowser.tablet && !bowser.mobile && !bowser.chrome) false;

    // Currently (June 2018) only the Safari browser on Ios devices can install a PWA to the home screen.
    if(bowser.ios && !bowser.safari) false;

    // Currently (June 2018) only Safari, Firefox and Chrome support install to home screen on Android
    if(bowser.android && !bowser.safari || !bowser.firefox || !bowser.chrome) false;
    
    // For now, only enable "Add to home screen" on Android devices with Chrome. 
    // TODO remove this if statement and return true once:
    // 1. More browser support a prompt()
    // 2. A nice banner with instructions has been made
    if(bowser.android && bowser.chrome) true;

    return false;
  }

  installPwaWithPrompt() {
    // currently only Chrome enables the app to prompt the user for an install
    this._installPwaOnChrome();
  }

  _installPwaOnChrome() {
    var _deferredPrompt = this._deferredPrompt;
    _deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    _deferredPrompt.userChoice.then((choiceResult) => {

      // Since beforeinstallprompt is only fired once, we can't prompt the user again after the first attempt. 
      this.set('canInstallPwaUsingPrompt', false)
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      return this.set('_deferredPrompt', null);
    });
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

}

window.customElements.define(PwaStatus.is, PwaStatus);
