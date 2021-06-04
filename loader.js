var kicks_enabled = false;
var snares_enabled = false;
var hats_enabled = false;

let bpm = 200;
var playing = false;
let bpm_for_one = 60000 / bpm;

// max number of pads
let banks = 18;
let current_bank = 0;

// list of pad objects to use
var kick_beats = [];
var snare_beats = [];
var hat_beats = [];

function loadPads() {
  current_bank = 0;
  kick_beats = [];
  snare_beats = [];
  hat_beats = [];

  indicator = document.getElementById("indicator");
  document.getElementById("bpm").textContent = bpm.toString() + " BPM";
  document.getElementById("banks").textContent = banks.toString() + " BANKS";

  var kickPads = document.getElementById("kick-pads");
  var snarePads = document.getElementById("snare-pads");
  var hatPads = document.getElementById("hat-pads");
  kickPads.innerHTML = "";
  snarePads.innerHTML = "";
  hatPads.innerHTML = "";

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
  }

  kickPads = document.getElementById("kick-pads").children;
  snarePads = document.getElementById("snare-pads").children;
  hatPads = document.getElementById("hat-pads").children;

  /*Create Pad object and add sounds */

  var i = 0;

  for (let _ of kickPads) {
    let v = new Pad("/sounds/kick.mp3", kickPads.item(i), i);
    kick_beats.push(v);
    i += 1;
  }

  i = 0;
  for (let _ of snarePads) {
    let v = new Pad("/sounds/snare.mp3", snarePads.item(i), i);
    snare_beats.push(v);
    i += 1;
  }

  i = 0;
  for (let _ of hatPads) {
    let v = new Pad("/sounds/hat.wav", hatPads.item(i), i);
    hat_beats.push(v);
    i += 1;
  }
}