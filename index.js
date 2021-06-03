let kickPads;

var kicks_enabled = false;
var snares_enabled = false;
var hats_enabled = false;

let bpm = 200;
var playing = false;
let bpm_for_one = 60000 / bpm;

let limit = 18;

indicator = document.getElementById("indicator");
document.getElementById("bpm").textContent = bpm.toString() + " BPM";
document.getElementById("banks").textContent = limit.toString() + " BANKS";
kickPads = document.getElementById("kick-pads");
snarePads = document.getElementById("snare-pads");
hatPads = document.getElementById("hat-pads");

for (let index = 0; index < limit; index++) {
  let p = document.createElement("div");
  p.classList.add("pad");
  p.classList.add("shadow");
  p.setAttribute("id", `kick${index}`);
  p.setAttribute("onclick", `togglePad(this)`);
  kickPads.appendChild(p);

  p = document.createElement("div");
  p.classList.add("pad");
  p.classList.add("shadow");
  p.setAttribute("id", `snare${index}`);
  p.setAttribute("onclick", `togglePad(this)`);
  snarePads.appendChild(p);

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

var kick_beats = [];
var snare_beats = [];
var hat_beats = [];
var i = 0;

for (let item of kickPads) {
  let v = new Pad("/sounds/kick.mp3", kickPads.item(i), i);
  kick_beats.push(v);
  i += 1;
}

i = 0;
for (let item of snarePads) {
  let v = new Pad("/sounds/snare.mp3", snarePads.item(i), i);
  snare_beats.push(v);
  i += 1;
}

i = 0;
for (let item of hatPads) {
  let v = new Pad("/sounds/hat.wav", hatPads.item(i), i);
  hat_beats.push(v);
  i += 1;
}

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

function togglePad(view) {
  if (view.id.includes("kick")) {
    getPadByViewId(view.id, kick_beats).toggle();
  } else if (view.id.includes("snare")) {
    getPadByViewId(view.id, snare_beats).toggle();
  } else if (view.id.includes("hat")) {
    getPadByViewId(view.id, hat_beats).toggle();
  }
}

console.log(bpm_for_one);
var main_loop;

let bank = 0;

async function start() {
  main_loop = setInterval(() => {
    indicator.classList.add("indicator-active");
    if (kicks_enabled) {
      kick_beats.forEach((pad) => {
        if (pad.id === bank) {
          pad.play(bpm_for_one);
        }
      });
    }

    if (snares_enabled) {
      snare_beats.forEach((pad) => {
        if (pad.id === bank) {
          pad.play(bpm_for_one);
        }
      });
    }

    if (hats_enabled) {
      hat_beats.forEach((pad) => {
        if (pad.id === bank) {
          pad.play(bpm_for_one);
        }
      });
    }

    if (bank === limit - 1) {
      bank = 0;
    } else {
      bank += 1;
    }
    setTimeout(() => {
      indicator.classList.remove("indicator-active");
    }, bpm_for_one - 30);
  }, bpm_for_one);
}

function start_stop(element) {
  if (playing) {
    if (element) element.innerText = "Start";
    window.clearInterval(main_loop);
    playing = false;
    // bank = 0;
  } else {
    if (element) element.innerText = "Stop";
    playing = true;
    start();
  }
}

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

function addBPM() {
  if (bpm < 400) {
    bpm += 5;
  }
  document.getElementById("bpm").textContent = bpm.toString() + " BPM";
  bpm_for_one = 60000 / bpm;
  start_stop(null);
  start_stop(null);
}

function toggleKick() {
  kicks_enabled = !kicks_enabled;
}

function toggleSnare() {
  snares_enabled = !snares_enabled;
}

function toggleHat() {
  hats_enabled = !hats_enabled;
}
