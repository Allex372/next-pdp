import { Pizza } from "./Pizza";

/** Concrete component — pizza без toppings. */
export class BasicPizza extends Pizza {
  getDescription(): string {
    return "Basic pizza";
  }

  getCost(): number {
    return 8;
  }
}
