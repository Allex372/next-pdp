import type { RoutePlan, RouteStrategy } from "./RouteStrategy";

/** Concrete strategy #1 — мінімізує час у дорозі. */
export class FastestRouteStrategy implements RouteStrategy {
  calculateRoute(from: string, to: string): RoutePlan {
    return {
      strategyName: "Fastest",
      from,
      to,
      distanceKm: 42,
      durationMin: 35,
      summary: "Highways and express lanes — shortest travel time.",
    };
  }
}

/** Concrete strategy #2 — мінімізує відстань. */
export class ShortestRouteStrategy implements RouteStrategy {
  calculateRoute(from: string, to: string): RoutePlan {
    return {
      strategyName: "Shortest",
      from,
      to,
      distanceKm: 28,
      durationMin: 48,
      summary: "Direct city streets — fewest kilometers.",
    };
  }
}

/** Concrete strategy #3 — пріоритет краєвидів, не швидкість. */
export class ScenicRouteStrategy implements RouteStrategy {
  calculateRoute(from: string, to: string): RoutePlan {
    return {
      strategyName: "Scenic",
      from,
      to,
      distanceKm: 55,
      durationMin: 72,
      summary: "Coastal road and parks — longer but nicer views.",
    };
  }
}
