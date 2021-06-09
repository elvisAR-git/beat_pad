class Instrument {
  template = `<div class="col-md-2 p-2 shadow-sm">
                  <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" onchange="toggleInstrument(this)">
                      <label class="form-check-label">Kick</label>
                  </div>
              </div>
              <div class="col"></div>
              <div class="clear-fix"></div>
            `;

  pads = [];
  pad_view = null;
  view = null;

  instrument_switch = null;
  instrument_label = null;
  name = null;
  enabled = false;
  sound = null;

  /** This class represents the instrument object that can be reused as a component to create many different instruments that can be simple rendered on the DOM by calling the Render method.
  * @param {Number} numberOfPads - these are the number of pad components the instrument should have
  * @param {String} soundFile - path to the sound file
  * @param {String} name - the name of the instrument

  * @returns {Instrument}: an instance of an instrument in Memory
 
 
  * @property {Array} pads - an array of Pad objects for the instrument
  * @property {String} template - A string representing the HTML template for the instrument
  * @property {HTMLElement} pad_view - an HTML element representing the view where the pads will rendered
  * @property {HTMLElement} view - an HTML element representing the template to be rendered when the instrument is rendered
  * @property {HTMLElement} instrument_switch - a HTML switch element that is used to toggle the instrument on/off
  * @property {HTMLElement} instrument_label - a HTML label element that shows the name of the instrument
  * @property {String} name - a string value for the instrument name
  * @property {Boolean} enabled - status of instrument
  * @property {String} sound - path to sound file
  */

  constructor(numberOfPads, soundFile, name) {
    this.view = document.createElement("div");
    this.view.innerHTML = this.template;
    this.name = name;
    this.sound = soundFile;

    this.instrument_switch = this.view.children[0].children[0].children[0];
    this.instrument_label = this.view.children[0].children[0].children[1];
    this.instrument_label.id = `${name}-label`;

    this.instrument_switch.id = `${name}-switch`;
    this.instrument_label.innerText = name;

    this.pad_view = this.view.children[1];
    this.pad_view.id = `${name}-pads`;
    this.template = this.view.innerHTML;

    this.view.classList.add("row");

    for (let index = 0; index < numberOfPads; index++) {
      let padv = document.createElement("div");
      padv.classList.add("pad");
      padv.classList.add("shadow");

      padv.setAttribute("onclick", `togglePad(this)`);
      padv.setAttribute("id", `${name}${index}`);

      var pad = new Pad(soundFile, padv, index);

      this.pads.push(pad);

      this.pad_view.appendChild(pad.view);
    }
  }

  /**Renders Instrument component to supplied element
   * @param {HTMLElement} HtmlElement - The element on which the instrument component will be rendered
   * @returns {void} void
   */
  RenderInstrument(HtmlElement) {
    HtmlElement.appendChild(this.view);
  }
  /**Toggles the enabled status of the instrument
   * @returns {void} void
   */
  toggleInstrument() {
    this.enabled = !this.enabled;
  }
  /**Checks for playable pads and plays them
   * @param {Number} bank - the current selected bank or player position
   * @returns {void} void
   */
  playPads(bank) {
    if (this.enabled) {
      this.pads.forEach(async (pad) => {
        if (pad.bank == bank) {
          // flash indicator
          await pad.play(bpm_for_one);
          // flash indicator
        }
      });
    }
  }
  /**Checks if any of the instrument pads have been toggled, if so, updates them
   * @param {HTMLElement} view - the Pad html component that has been selected
   * @returns {void} void
   */
  checkPadToggle(view) {
    this.pads.filter((pad) => {
      if (pad.view == view) {
        pad.toggle();
      }
    });
  }

  /**Checks if the instrument switch has been changed, if so, updates the status
   * @param {HTMLElement} view - the Switch html component that has been selected
   * * @returns {void} void
   */
  checkStatusToggle(view) {
    if (this.instrument_switch == view) {
      this.toggleInstrument();

      console.log(this.enabled, this.name);
    }
  }

  /**Adds a new Pad Component to the Instrument
   * @returns {void} void
   */
  addPad() {
    let index = this.pads.length;
    let padv = document.createElement("div");
    padv.classList.add("pad");
    padv.classList.add("shadow");
    padv.setAttribute("onclick", `togglePad(this)`);
    padv.setAttribute("id", `${this.name}${index}`);
    var pad = new Pad(this.sound, padv, index);
    this.pads.push(pad);
    this.pad_view.appendChild(pad.view);
  }

  /**Removes the last Pad from the instrument pad array
   * @returns {void} void
   */
  removePad() {
    this.pads.pop().destroy();
  }
}
