import { PizzaDecorator } from "./PizzaDecorator";

export class CheeseTopping extends PizzaDecorator {
  getDescription(): string {
    return `${super.getDescription()}, cheese`;
  }

  getCost(): number {
    return super.getCost() + 1.5;
  }
}

export class PepperoniTopping extends PizzaDecorator {
  getDescription(): string {
    return `${super.getDescription()}, pepperoni`;
  }

  getCost(): number {
    return super.getCost() + 2;
  }
}

export class MushroomTopping extends PizzaDecorator {
  getDescription(): string {
    return `${super.getDescription()}, mushrooms`;
  }

  getCost(): number {
    return super.getCost() + 1;
  }
}
