/** Підсистема: освітлення (низькорівневі методи). */
export class Light {
  private on = false;
  private brightness = 0;

  turnOn() {
    this.on = true;
  }

  turnOff() {
    this.on = false;
    this.brightness = 0;
  }

  setBrightness(level: number) {
    this.brightness = Math.min(100, Math.max(0, level));
    this.on = this.brightness > 0;
  }

  getState() {
    return { on: this.on, brightness: this.brightness };
  }
}
