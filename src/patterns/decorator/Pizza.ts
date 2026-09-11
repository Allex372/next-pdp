/** Component — базовий інтерфейс для pizza і decorators. */
export abstract class Pizza {
  abstract getDescription(): string;
  abstract getCost(): number;
}
