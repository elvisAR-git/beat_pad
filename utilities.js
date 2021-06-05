const maximum_banks = 40;

// Returns a single pad if given a HTML view id of the pad
function getPadByViewId(id, pad_list) {
  let pads = pad_list.filter((value) => {
    if (value.view.id === id) return value;
  });

  if (pads.length > 0) {
    return pads[0];
  } else {
    return undefined;
  }
}

// turns a single pad ON or OFF
function togglePad(view) {
  if (view.id.includes("kick")) {
    getPadByViewId(view.id, kick_beats).toggle();
  } else if (view.id.includes("snare")) {
    getPadByViewId(view.id, snare_beats).toggle();
  } else if (view.id.includes("hat")) {
    getPadByViewId(view.id, hat_beats).toggle();
  } else if (view.id.includes("crash")) {
    getPadByViewId(view.id, crash_beats).toggle();
  }
}

// Starts and stops the playback
function start_stop(element) {
  if (playing) {
    if (element) element.innerText = "play_circle_filled";
    window.clearInterval(main_loop);
    playing = false;
  } else {
    if (element) element.innerText = "pause_circle_filled";
    playing = true;
    start();
  }
}

// subtracts 5 bpm
function subtractBPM() {
  if (bpm - 5 >= 0) {
    bpm -= 5;
  }
  document.getElementById("bpm").textContent = bpm.toString() + " BPM";

  if (bpm == 0) {
    start_stop(null);
  } else {
    bpm_for_one = 60000 / bpm;
    start_stop(null);
    start_stop(null);
  }
}

// adds 5bpm
function addBPM() {
  if (bpm < 400) {
    bpm += 5;
  }
  document.getElementById("bpm").textContent = bpm.toString() + " BPM";
  bpm_for_one = 60000 / bpm;
  start_stop(null);
  start_stop(null);
}

// turns kicks ON/OFF
function toggleKick() {
  kicks_enabled = !kicks_enabled;
}
// turns snares ON/OFF
function toggleSnare() {
  snares_enabled = !snares_enabled;
}
// turns hats ON/OFF
function toggleHat() {
  hats_enabled = !hats_enabled;
}

// turns crashes ON/OFF
function toggleCrash() {
  crash_enabled = !crash_enabled;
}

// add 1 bank
function addBank() {
  if (banks < maximum_banks) {
    banks += 1;
    addPad();
  }
}

// Subtract 1 bank

function subtractBank() {
  if (banks > 1 && current_bank != banks - 1) {
    banks -= 1;
    removePad();
  }
}
