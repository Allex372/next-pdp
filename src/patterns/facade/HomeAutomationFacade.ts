import { Light } from "./Light";
import { SecuritySystem } from "./SecuritySystem";
import { TemperatureControl } from "./TemperatureControl";

export type HomeState = {
  lights: ReturnType<Light["getState"]>;
  temperature: ReturnType<TemperatureControl["getState"]>;
  security: ReturnType<SecuritySystem["getState"]>;
};

/**
 * Facade — один простий інтерфейс замість багатьох підсистем.
 * Клієнт не викликає Light/Temperature/Security напряму.
 */
export class HomeAutomationFacade {
  private readonly light = new Light();
  private readonly temperature = new TemperatureControl();
  private readonly security = new SecuritySystem();

  turnOnLights(brightness = 80) {
    this.light.turnOn();
    this.light.setBrightness(brightness);
  }

  turnOffLights() {
    this.light.turnOff();
  }

  setTemperature(celsius: number) {
    this.temperature.setTarget(celsius);
    if (celsius < 20) {
      this.temperature.enableHeating();
    } else if (celsius > 24) {
      this.temperature.enableCooling();
    } else {
      this.temperature.turnOff();
    }
  }

  activateSecurity() {
    this.security.arm();
    this.security.lockDoors();
    this.turnOffLights();
  }

  deactivateSecurity() {
    this.security.disarm();
    this.security.unlockDoors();
  }

  /** Сценарій «вихід з дому» — кілька підсистем одним викликом. */
  leaveHome() {
    this.activateSecurity();
    this.temperature.setTarget(16);
    this.temperature.enableHeating();
  }

  /** Сценарій «повернення» — спрощена протилежна операція. */
  arriveHome() {
    this.deactivateSecurity();
    this.turnOnLights(60);
    this.setTemperature(22);
  }

  getState(): HomeState {
    return {
      lights: this.light.getState(),
      temperature: this.temperature.getState(),
      security: this.security.getState(),
    };
  }
}
