import type { HandleResult, Incident } from "./Incident";
import type { Handler } from "./Handler";
import { Tier1Support, Tier2Support, Tier3Support } from "./handlers";

/** Збирає ланцюжок: Tier1 → Tier2 → Tier3. */
export function createSupportChain(): Handler {
  const tier1 = new Tier1Support();
  const tier2 = new Tier2Support();
  const tier3 = new Tier3Support();

  tier1.setNext(tier2).setNext(tier3);
  return tier1;
}

/**
 * Context — приймає інцидент і передає його першому handler у ланцюгу.
 * Не знає, хто саме обробить запит.
 */
export class IncidentManagementSystem {
  constructor(private firstHandler: Handler) {}

  reportIncident(incident: Incident): HandleResult {
    return this.firstHandler.handle(incident);
  }
}
