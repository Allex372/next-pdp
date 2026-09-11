/** Результат розрахунку маршруту — спільний для всіх стратегій. */
export type RoutePlan = {
  strategyName: string;
  from: string;
  to: string;
  distanceKm: number;
  durationMin: number;
  summary: string;
};

/**
 * Strategy — спільний інтерфейс для всіх алгоритмів маршруту.
 * NavigationApp працює тільки з цим типом, не знаючи конкретної реалізації.
 */
export interface RouteStrategy {
  calculateRoute(from: string, to: string): RoutePlan;
}
