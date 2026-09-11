import type { HandleResult, Incident } from "./Incident";

/**
 * Handler — контракт ланки: встановити наступного + обробити запит.
 * Відправник знає лише перший handler, не весь ланцюжок.
 */
export interface Handler {
  setNext(handler: Handler): Handler;
  handle(incident: Incident): HandleResult;
}

/** Базовий handler — спільна логіка передачі далі по ланцюгу. */
export abstract class BaseHandler implements Handler {
  private next: Handler | null = null;

  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }

  handle(incident: Incident): HandleResult {
    if (this.canHandle(incident)) {
      return this.process(incident);
    }
    if (this.next) {
      return this.next.handle(incident);
    }
    return {
      handledBy: "None",
      message: `No handler available for severity ${incident.severity}.`,
    };
  }

  protected abstract canHandle(incident: Incident): boolean;
  protected abstract process(incident: Incident): HandleResult;
}
