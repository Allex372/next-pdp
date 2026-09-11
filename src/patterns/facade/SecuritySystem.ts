/** Підсистема: безпека. */
export class SecuritySystem {
  private armed = false;
  private doorsLocked = false;

  arm() {
    this.armed = true;
  }

  disarm() {
    this.armed = false;
  }

  lockDoors() {
    this.doorsLocked = true;
  }

  unlockDoors() {
    this.doorsLocked = false;
  }

  getState() {
    return { armed: this.armed, doorsLocked: this.doorsLocked };
  }
}
