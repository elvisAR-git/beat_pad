var main_loop;

loadPads();

async function start() {
  main_loop = setInterval(() => {
    indicator.classList.add("indicator-active");

    // check for kicks
    if (kicks_enabled) {
      kick_beats.forEach((pad) => {
        if (pad.id === current_bank) {
          pad.play(bpm_for_one);
        }
      });
    }

    // check for snares
    if (snares_enabled) {
      snare_beats.forEach((pad) => {
        if (pad.id === current_bank) {
          pad.play(bpm_for_one);
        }
      });
    }

    // check for hats
    if (hats_enabled) {
      hat_beats.forEach((pad) => {
        if (pad.id === current_bank) {
          pad.play(bpm_for_one);
        }
      });
    }

    // check for crashes
    if (crash_enabled) {
      crash_beats.forEach((pad) => {
        if (pad.id === current_bank) {
          pad.play(bpm_for_one);
        }
      });
    }

    // if at end of banks, reset to zero position

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
