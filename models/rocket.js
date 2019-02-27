class Rocket {
  constructor() {
  }

  get position() {
    return this._position;
  }

  set position(val) {
    this._position = val;
  }

  get distanceTraveled() {
    return this._position - this._startPosition;
  }

  get direction() {
    return this._direction;
  }

  get speed() {
    return this._speed;
  }

  explode() {
  }

}
