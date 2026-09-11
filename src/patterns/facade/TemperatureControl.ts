/** Підсистема: клімат-контроль. */
export class TemperatureControl {
  private targetCelsius = 21;
  private mode: "off" | "heating" | "cooling" = "off";

  setTarget(celsius: number) {
    this.targetCelsius = celsius;
  }

  enableHeating() {
    this.mode = "heating";
  }

  enableCooling() {
    this.mode = "cooling";
  }

  turnOff() {
    this.mode = "off";
  }

  getState() {
    return { targetCelsius: this.targetCelsius, mode: this.mode };
  }
}
