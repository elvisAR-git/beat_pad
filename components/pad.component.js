class Pad {
  sound = null;
  view = null;
  bank = null;
  enabled = false;
  audio;

  /**A pad component. representing the smallest functional unit in the music pad
   * @param {String} pad_sound - Path to the sound file
   * @param {HTMLElement} html_element - The element onto which to bind the pad view
   * @param {Number} bank - a number that corrsponds with the bank on which the pad will be active
   */
  constructor(pad_sound, html_element, bank) {
    if (pad_sound && html_element) {
      this.sound = pad_sound;
      this.view = html_element;
      this.audio = new Audio(this.sound);
      this.bank = parseInt(bank);
    }
  }

  async play(bpm) {
    this.view.classList.add("hit-active");
    if (this.enabled) {
      if (indicator) indicator.classList.add("indicator-active");
      this.audio.play();
    }

    setTimeout(() => {
      if (this.enabled) {
        this.audio.pause;
        if (indicator) {
          indicator.classList.remove("indicator-active");
        }
      }

      this.view.classList.remove("hit-active");
    }, bpm - 150);
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.view.classList.add("pad-active");
    } else {
      this.view.classList.remove("pad-active");
    }
  }

  destroy() {
    this.view.remove();
  }
}
