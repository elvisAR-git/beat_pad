function handlePadToggle(view) {
  INSTRUMENT_ARRAY.forEach((instrument) => {
    instrument.checkPadToggle(view);
  });
}

function handleInstrumentToggle(view) {
  INSTRUMENT_ARRAY.forEach((instrument) => {
    instrument.checkStatusToggle(view);
  });
}

function handleInstrumentAddBank() {
  INSTRUMENT_ARRAY.forEach((instrument) => {
    instrument.addPad();
  });
  UpdateUI();
}

function handleInstrumentRemoveBank() {
  INSTRUMENT_ARRAY.forEach((instrument) => {
    instrument.removePad();
  });
  UpdateUI();
}

function UpdateUI() {
  bpm_for_one = 60000 / bpm;
  document.getElementById("bpm").textContent = bpm.toString() + " BPM";

  if (banks == 1) {
    document.getElementById("banks").textContent = banks.toString() + " BANK";
  } else {
    document.getElementById("banks").textContent = banks.toString() + " BANKS";
  }
}

// turns a single pad ON or OFF
function togglePad(view) {
  handlePadToggle(view);
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
  if (bpm == 0) {
    start_stop(null);
  } else {
    UpdateUI();
    start_stop(null);
    start_stop(null);
  }
}

// adds 5bpm
function addBPM() {
  if (bpm < 400) {
    bpm += 5;
  }
  UpdateUI();
  start_stop(null);
  start_stop(null);
}

// turns instruments ON/OFF
function toggleInstrument(view) {
  handleInstrumentToggle(view);
}

// add 1 bank
function addBank() {
  if (banks < maximum_banks) {
    banks += 1;
    handleInstrumentAddBank();
  }
}

// Subtract 1 bank

function subtractBank() {
  if (banks > 1 && current_bank != banks - 1) {
    banks -= 1;
    handleInstrumentRemoveBank();
  }
}
