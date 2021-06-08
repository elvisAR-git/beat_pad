var kicks_enabled = false;
var snares_enabled = false;
var hats_enabled = false;
var crash_enabled = false;

let bpm = 200;
var playing = false;
let bpm_for_one = 60000 / bpm;

// Number of starting pads
let banks = 18;
// where to start the cycle
let current_bank = 0;

// list of pad objects to use
var kick_beats = [];
var snare_beats = [];
var hat_beats = [];
var crash_beats = [];

function addPad() {
  document.getElementById("banks").textContent = banks.toString() + " BANKS";

  var kickPads = document.getElementById("kick-pads");
  var snarePads = document.getElementById("snare-pads");
  var hatPads = document.getElementById("hat-pads");
  var crashPads = document.getElementById("crash-pads");

  // kicks
  let kick = document.createElement("div");
  kick.classList.add("pad");
  kick.classList.add("shadow");
  kick.setAttribute("id", `kick${kick_beats.length}`);
  kick.setAttribute("onclick", `togglePad(this)`);
  kickPads.appendChild(kick);

  //   snares
  let snare = document.createElement("div");
  snare.classList.add("pad");
  snare.classList.add("shadow");
  snare.setAttribute("id", `snare${snare_beats.length}`);
  snare.setAttribute("onclick", `togglePad(this)`);
  snarePads.appendChild(snare);

  // hats
  let hat = document.createElement("div");
  hat.classList.add("pad");
  hat.classList.add("shadow");
  hat.setAttribute("id", `hat${hat_beats.length}`);
  hat.setAttribute("onclick", `togglePad(this)`);
  hatPads.appendChild(hat);

  // crashes
  let crash = document.createElement("div");
  crash.classList.add("pad");
  crash.classList.add("shadow");
  crash.setAttribute("id", `crash${crash_beats.length}`);
  crash.setAttribute("onclick", `togglePad(this)`);
  crashPads.appendChild(crash);

  kickPads = document.getElementById("kick-pads").children;
  snarePads = document.getElementById("snare-pads").children;
  hatPads = document.getElementById("hat-pads").children;
  crashPads = document.getElementById("crash-pads").children;

  /*Create Pad object and add sounds */

  kick_beats.push(new Pad("sounds/kick.mp3", kick, kick_beats.length));
  snare_beats.push(new Pad("sounds/snare.mp3", snare, snare_beats.length));
  hat_beats.push(new Pad("sounds/hat.wav", hat, hat_beats.length));
  crash_beats.push(new Pad("sounds/crash.wav", crash, crash_beats.length));
}

function restSwitches() {
  document.getElementById("kick-switch").checked = false;
  document.getElementById("snare-switch").checked = false;
  document.getElementById("hat-switch").checked = false;
  document.getElementById("crash-switch").checked = false;
}

function removePad() {
  // get last pad set
  document.getElementById("banks").textContent = banks.toString() + " BANKS";
  kick_beats.pop().destroy();
  snare_beats.pop().destroy();
  hat_beats.pop().destroy();
  crash_beats.pop().destroy();
}

function loadPads() {
  restSwitches();
  current_bank = 0;
  kick_beats = [];
  snare_beats = [];
  hat_beats = [];
  crash_beats = [];

  indicator = document.getElementById("indicator");
  document.getElementById("bpm").textContent = bpm.toString() + " BPM";
  document.getElementById("banks").textContent = banks.toString() + " BANKS";

  var kickPads = document.getElementById("kick-pads");
  var snarePads = document.getElementById("snare-pads");
  var hatPads = document.getElementById("hat-pads");
  var crashPads = document.getElementById("crash-pads");
  kickPads.innerHTML = "";
  snarePads.innerHTML = "";
  hatPads.innerHTML = "";
  crashPads.innerHTML = "";

  for (let index = 0; index < banks; index++) {
    // kicks
    let p = document.createElement("div");
    p.classList.add("pad");
    p.classList.add("shadow");
    p.setAttribute("id", `kick${index}`);
    p.setAttribute("onclick", `togglePad(this)`);
    kickPads.appendChild(p);

    //   snares
    p = document.createElement("div");
    p.classList.add("pad");
    p.classList.add("shadow");
    p.setAttribute("id", `snare${index}`);
    p.setAttribute("onclick", `togglePad(this)`);
    snarePads.appendChild(p);

    // hats
    p = document.createElement("div");
    p.classList.add("pad");
    p.classList.add("shadow");
    p.setAttribute("id", `hat${index}`);
    p.setAttribute("onclick", `togglePad(this)`);
    hatPads.appendChild(p);

    // crashes
    p = document.createElement("div");
    p.classList.add("pad");
    p.classList.add("shadow");
    p.setAttribute("id", `crash${index}`);
    p.setAttribute("onclick", `togglePad(this)`);
    crashPads.appendChild(p);
  }

  kickPads = document.getElementById("kick-pads").children;
  snarePads = document.getElementById("snare-pads").children;
  hatPads = document.getElementById("hat-pads").children;
  crashPads = document.getElementById("crash-pads").children;

  /*Create Pad object and add sounds */

  var i = 0;

  for (let _ of kickPads) {
    let v = new Pad("sounds/kick.mp3", kickPads.item(i), i);
    kick_beats.push(v);
    i += 1;
  }

  i = 0;
  for (let _ of snarePads) {
    let v = new Pad("sounds/snare.mp3", snarePads.item(i), i);
    snare_beats.push(v);
    i += 1;
  }

  i = 0;
  for (let _ of hatPads) {
    let v = new Pad("sounds/hat.wav", hatPads.item(i), i);
    hat_beats.push(v);
    i += 1;
  }

  i = 0;
  for (let _ of crashPads) {
    let v = new Pad("sounds/crash.wav", crashPads.item(i), i);
    crash_beats.push(v);
    i += 1;
  }
}
