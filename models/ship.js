class Ship {
  constructor() {
  }

  get position() {
    return this._position;
  }

  get direction() {
    return this._direction;
  }

  get speed() {
    return this._direction;
  }

  get orientation() {
    return this._orientation;
  }

  turnClockwise() {
    if (this._orientation < 360) {
      this._orientation++;
    } else {
      this._orientation = 0;
    }
  }

  turnCounterClockwise() {
    if (this._orientation > 0) {
      this._orientation--;
    } else {
      this._orientation = 360;
    }
  }

  hyperspace() {
  }

  fire() {
  }

  thrust() {

  }

  explode() {
  }

}
