import type { HandleResult, Incident } from "./Incident";
import { BaseHandler } from "./Handler";

/** Tier 1 — прості запити (severity 1–2). */
export class Tier1Support extends BaseHandler {
  protected canHandle(incident: Incident): boolean {
    return incident.severity <= 2;
  }

  protected process(incident: Incident): HandleResult {
    return {
      handledBy: "Tier 1 Support",
      message: `Password reset / FAQ: "${incident.title}" resolved at L1.`,
    };
  }
}

/** Tier 2 — середня складність (severity 3). */
export class Tier2Support extends BaseHandler {
  protected canHandle(incident: Incident): boolean {
    return incident.severity === 3;
  }

  protected process(incident: Incident): HandleResult {
    return {
      handledBy: "Tier 2 Support",
      message: `Config / integration issue: "${incident.title}" escalated to L2 engineer.`,
    };
  }
}

/** Tier 3 — критичні інциденти (severity 4–5). */
export class Tier3Support extends BaseHandler {
  protected canHandle(incident: Incident): boolean {
    return incident.severity >= 4;
  }

  protected process(incident: Incident): HandleResult {
    return {
      handledBy: "Tier 3 Support",
      message: `Production outage: "${incident.title}" — on-call SRE engaged.`,
    };
  }
}
