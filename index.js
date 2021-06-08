var main_loop;
let MAIN_VIEW = document.getElementById("main");
let INSTRUMENT_ARRAY = [];

// Number of starting pads
let banks = 18;
// where to start the cycle
let current_bank = 0;
let bpm = 100;
var playing = false;
let bpm_for_one = 0;

/**Initialize instruments
 * using the Instrument component
 */
let kick = new Instrument(banks, "sounds/kick.mp3", "Kick");
let snare = new Instrument(banks, "sounds/snare.mp3", "909-Snare");
let hitHat = new Instrument(banks, "sounds/hat.wav", "Hit-Hat");
let crash = new Instrument(banks, "sounds/crash.wav", "Crash");

kick.RenderInstrument(MAIN_VIEW);
snare.RenderInstrument(MAIN_VIEW);
hitHat.RenderInstrument(MAIN_VIEW);
crash.RenderInstrument(MAIN_VIEW);

INSTRUMENT_ARRAY.push(snare, kick, hitHat, crash);

const maximum_banks = 40;

UpdateUI();

async function start() {
  indicator = document.getElementById("indicator");

  main_loop = setInterval(() => {
    indicator.classList.add("indicator-active");

    INSTRUMENT_ARRAY.forEach((instrument) => {
      instrument.playPads(current_bank);
    });

    if (current_bank === banks - 1) {
      current_bank = 0;
    } else {
      current_bank += 1;
    }

    // flash indicator
    setTimeout(() => {
      indicator.classList.remove("indicator-active");
    }, bpm_for_one - 30);
  }, bpm_for_one);
}
