class Pad {
  sound = null;
  view = null;
  id = null;
  enabled = false;
  audio;

  constructor(pad_sound, html_element, id) {
    if (pad_sound && html_element) {
      this.sound = pad_sound;
      this.view = html_element;
      this.audio = new Audio(this.sound);
      this.id = parseInt(id);
    }
  }

  async play(bpm) {
    this.view.classList.add("hit-active");
    if (this.enabled) {
      this.audio.play();
    }

    setTimeout(() => {
      if (this.enabled) {
        this.audio.pause;
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
}
