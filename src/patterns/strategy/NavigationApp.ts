import type { RoutePlan, RouteStrategy } from "./RouteStrategy";

export class NavigationApp {
  constructor(private strategy: RouteStrategy) {}

  setStrategy(strategy: RouteStrategy) {
    this.strategy = strategy;
  }

  planRoute(from: string, to: string): RoutePlan {
    return this.strategy.calculateRoute(from, to);
  }
}
