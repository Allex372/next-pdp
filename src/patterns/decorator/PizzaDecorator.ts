import { Pizza } from "./Pizza";

/**
 * Base decorator — тримає посилання на Pizza і делегує методи.
 * Concrete decorators розширюють description і cost.
 */
export abstract class PizzaDecorator extends Pizza {
  constructor(protected readonly pizza: Pizza) {
    super();
  }

  getDescription(): string {
    return this.pizza.getDescription();
  }

  getCost(): number {
    return this.pizza.getCost();
  }
}
