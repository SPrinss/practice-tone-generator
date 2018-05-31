import { PolymerElement } from '@polymer/polymer/polymer-element.js';

/**
 * `ptg-element` Description
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {Polymer.Element}
 */
export class PtgElement extends PolymerElement {
  static get is() {return 'ptg-element';}
  static get properties() {
    return {
      bpm:{
        type: Number,
        value: 60,
        observer: "_handleBpmChanged"
      },
      runGenerator: {
        type: Boolean,
        value: false,
        observer: "_switchRunGenerator"
      },
      tone: {
        type: String
      },
      nextTone: {
        type: String
      },
      keyType: {
        type: String,
        value: "all"
      },
      beat: {
        type: String,
        observer: "_handleBeatChange"
      },
      measure: {
        type: String,
        observer: "_handleMeasureChange"
      },
      tones: {
        type: Array,
        computed: "_computePossibleTones(keyType, whiteKeyTones.splices, flatTones.splices, sharpTones.splices)"
      },
      whiteKeyTones: {
        type: Array,
        value: function () {
          return ['C', 'D', 'E', 'F', 'G', 'A', 'B']
        }    
      },
      // ♭
      flatTones: {
        type: Array,
        value: function () {
          return ['Db', 'Eb', 'Gb', 'Ab', 'Bb']
        }
      },
      sharpTones: {
        type: Array,
        value: function () {
          return ['C#', 'D#', 'F#', 'G#', 'A#']
        }
      }, 
      barsBeforeSwitch: {
        type: String,
        observer: "_handleBarsBeforeSwitchChanged"
      },
      synthVolume: {
        type: Number,
        observer: "_setSynthVolume"
      },
      metronomeVolume: {
        type: Number,
        observer: "_setMetronomeVolume"
      },
      octave: {
        type: Number,
        value: 4
      },
      noSuccedentIdenticalNotes: {
        type: Boolean,
        value: false
      },       
      _synthStarted: {
        type: Boolean,
        value: false
      },
      _player: {
        type: Object,
        value: {}
      },
      _clickPlayer: {
        type: Object,
        value: {}
      },
      _synth: {
        type: Object
      },
      _transportReady: {
        type: Boolean,
        value: false,
        observer: "_handleTransportReadyChanged"
      },
      _loop: {
        type: Object
      },
      _transportId: {
        type: String
      },
      _metronome: {
        type: Object,
        value: {}
      },
      _metronomeClick: {
        type: Object,
        value: {}
      },     
      _repeatingCurrentTone: {
        type: Boolean,
        value: false
      },
      _toneLibraryLoaded: {
        type: Boolean,
        value: false
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadScript('../../node_modules/tone/build/tone.min.js', this._setToneLibraryLoaded.bind(this))
  }

  static get observers() {
    return [
      '_computeTranportReady(keyType, measure, beat, _toneLibraryLoaded)',
    ]
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

  _setToneLibraryLoaded() {
    this.set('_toneLibraryLoaded', true)
  }

  _handleTransportReadyChanged(ready, oldReady) {
    if(ready == false|| ready == true && oldReady == true) return;
    return this._startTransport()
  }

  _startTransport() {
    Tone.Transport.bpm.value = this.bpm;
    this._clickPlayer = new Tone.Player("./sounds/woodblock.mp3").toMaster();
    this._player = new Tone.Player("./sounds/click.wav").toMaster();
    
    this._synth =  new Tone.Synth().toMaster()
    // synth muted by default
    this._synth.volume.value = -10000;

    let nextToneIndex = Math.floor(Math.random() * Math.floor(this.tones.length -1));
    let nextTone = this.tones[nextToneIndex] + this.octave;
    this.set('nextTone', nextTone)
  }

 _computeTranportReady(keyType, measure, beat, _toneLibraryLoaded) {
    if(!keyType || !measure || !beat || this._transportStarted == true || _toneLibraryLoaded == false) return;
    this.set('_transportReady', true)
 }

  playSynthFunction(time) {
    if(this._repeatingCurrentTone) return this.set('_repeatingCurrentTone', false);
    var synth = this._synth;
    var synth = this._synth;
    var tone = this.nextTone;

    // synth.triggerAttackRelease(tone, this.barsBeforeSwitch + ":0:0", time);

    Tone.Draw.schedule((function(time){

      this.set('tone', tone)
      this.set('nextTone', this._selectNextTone())
      
      //this callback is invoked from a requestAnimationFrame
      //and will be invoked close to AudioContext time

    }.bind(this)), time) //use AudioContext time of the event
  }

  playMetronomeFunction(time) {
    var player = this._player;
    player.start(time)
  }

  playMetronomeFirstMeasureFunction(time) {
    var player = this._clickPlayer;
    player.start(time)
  }

  repeatCurrentTone() {
    this.set('_repeatingCurrentTone', true)
  }

  skipCurrentTone() {
    this.set('tone', this.nextTone)
    this.set('nextTone', this._selectNextTone())
  }

  _handleBarsBeforeSwitchChanged(barsBeforeSwitch, oldBarsBeforeSwitch) {
    if(barsBeforeSwitch == oldBarsBeforeSwitch || typeof oldBarsBeforeSwitch == 'undefined') return;
    this._stop()
    if(!this.runGenerator) return;
    this._start()
  }

  _selectNextTone() {
    // Slice call without arguments 'clones' the Array
    var possibleTones = this.tones.slice();
    var tone = this.tone;
    if(this.noSuccedentIdenticalNotes) possibleTones.splice(possibleTones.indexOf(tone.substring(0, tone.length -1)), 1);
    let nextToneIndex = Math.floor(Math.random() * Math.floor(possibleTones.length -1));
    let nextTone = possibleTones[nextToneIndex] + this.octave;
    return nextTone;
  }

  _handleBeatChange(beat, oldBeat) {
    if(beat == oldBeat || typeof oldBeat == 'undefined') return;
    this._stop();

    if(!this.runGenerator) return;
    window.setTimeout((function() {
      this._start()
    }.bind(this)), 300)
  }

  _handleMeasureChange(measure, oldMeasure) {
    if(measure == oldMeasure || typeof oldMeasure == 'undefined') return;
    this._stop()
    this._setTimeSignature();

    if(!this.runGenerator) return;
    window.setTimeout((function() {
      this._start()        
    }.bind(this)), 300)
  }

  _setTimeSignature() {
    Tone.Transport.timeSignature = [this.beat, this.measure];
  }

  _setSynthVolume(volume) {
    if(this._synth) {
      this._synth.volume.value =  this._computeVolumeToDb(volume);
      if(volume == "0") return this._synth.volume.value = -10000;
    }
  }

  _setMetronomeVolume(volume) {
    if(Object.keys(this._player).length > 0 && Object.keys(this._clickPlayer).length > 0) {
      this._player.volume.value =  this._computeVolumeToDb(volume);;
      this._clickPlayer.volume.value =  this._computeVolumeToDb(volume);;
      if (volume == "0") {
        this._player.mute=true;
        return this._clickPlayer.mute=true;
      }
      this._synth.mute = false;
    }
  }

  _switchRunGenerator(runGenerator) {
    if(runGenerator) return this._start();
    return this._stop()
  }
  

  _start() {
    if(Tone.Transport.state == "started") return;
    
    this._setTimeSignature();

    // var _synth = new Tone.Synth().toMaster();
    // this.set('_synth', _synth);
    // console.log('_start', 'Tone.Transport.timeSignature:',Tone.Transport.timeSignature, 'this.beat', this.beat, (this.measure/this.beat))
    this._metronome = Tone.Transport.scheduleRepeat(this.playMetronomeFunction.bind(this), this.measure + "n", "0:0:6");
    this._metronomeClick =  Tone.Transport.scheduleRepeat(this.playMetronomeFirstMeasureFunction.bind(this), "1:0:0", "0:0:6");       


    this._transportId = Tone.Transport.scheduleRepeat(this.playSynthFunction.bind(this), this.barsBeforeSwitch + ":0:0", "0:0:6");        
    Tone.Transport.start();
  }

  _calculateTime(beat, measure) {
    switch (measure) {
      case 2:
      case "2":
        return parseInt(beat/2) + "n";
        break;
      case 4:
      case "4":
        return beat + "n";
        break;            
      case 8:
      case "8":
        return (beat*2) + "n";
        break;            
      case 16:
      case "16":
        return (beat*4) + "n";
        break;                                 
    }

  }

  _stop() {
    if(typeof Tone === "undefined") return;
    Tone.Transport.cancel()
    Tone.Transport.clear(this._metronome)
    Tone.Transport.clear(this._metronomeClick)
    
    let synth = this._synth;
    let _clickPlayer = this._clickPlayer;
    let _player = this._player;
    if(_clickPlayer.stop) _clickPlayer.stop();
    if(_player.stop) _player.stop();
    if(synth) synth.triggerRelease();

    Tone.Transport.stop();
		  }
  
  _handleBpmChanged(bpm) {
    if(typeof Tone === "undefined") return;
    this._stop()
    Tone.Transport.bpm.rampTo(bpm);

    if(!this.runGenerator) return;
    window.setTimeout((function() {
      this._start()        
    }.bind(this)), 300)
  }

  _computePossibleTones(keyType, whiteKeyTonesSplices, flatTonesSplices, sharpTonesSplices) {
    var tones = [];
    switch(keyType) {
        case 'sharps':
            tones = tones.concat(this.sharpTones);
            break;
        case 'whiteKeys':
            tones = tones.concat(this.whiteKeyTones);
            break;
        case 'flats':
            tones = tones.concat(this.flatTones);
            break;                
        default:
            tones = tones.concat(this.flatTones,this.whiteKeyTones,this.sharpTones);
    }
    return tones;
  }      

  _computeVolumeToDb(volume) {
    var volInDb = (volume - 10) / 2;
    return volInDb;
  }
}

window.customElements.define(PtgElement.is, PtgElement);
