MyGame.ship = (function() {
  'use strict';

  let width = 75;
  let height = 75;
  let xCoord = 500;
  let yCoord = 500;
  let orientation = 0;
  let xSpeed = 0;
  let ySpeed = 0;
  let acceleration = .5;
  let turnRate = .174533;
  let cycle = 6.2831853;
  let thrusting = false;
  let turning = 0;

  function getShipSpec() {
    let shipSpecTexture = {
      imageSrc: 'resources/ship.png',
      center: {x: this.xCoord, y: this.yCoord},
      width: width,
      height: height,
      rotation: this.orientation,
    };
    return shipSpecTexture;
  }

  function update(canvasWidth, canvasHeight) {
    if (this.xSpeed > 0) {
      if (this.xCoord + this.xSpeed > canvasWidth + this.width) {
        this.xCoord = 0;
      } else {
        this.xCoord = this.xCoord + this.xSpeed;
      }
    } else if (this.xSpeed < 0) {
      if (this.xCoord + this.xSpeed < 0 - this.width) {
        this.xCoord = canvasWidth + this.width
      } else {
        this.xCoord = this.xCoord + this.xSpeed;
      }
    }
    if (this.ySpeed > 0) {
      if (this.yCoord + this.ySpeed > canvasHeight + this.height) {
        this.yCoord = 0;
      } else {
        this.yCoord = this.yCoord + this.ySpeed;
      }
    } else if (this.ySpeed < 0) {
      if (this.yCoord + this.ySpeed < 0 - this.height) {
        this.yCoord = canvasHeight + this.width
      } else {
        this.yCoord = this.yCoord + this.ySpeed;
      }
    }
    if (this.thrusting) {
      this.thrust();
    }
    if (this.turning > 0 ) {
      this.turnClockwise();
    } else if (this.turning < 0) {
      this.turnCounterClockwise();
    }
    return;
  }

  function turnClockwise(){
    if (this.orientation < this.cycle) {
      this.orientation = this.orientation + this.turnRate;
    } else {
      this.orientation = 0;
    }
  }

  function turnCounterClockwise() {
    if (this.orientation > 0) {
      this.orientation = this.orientation - this.turnRate;
    } else {
      this.orientation = this.cycle;
    }
  }

  function hyperspace() {
  }

  function fire() {
    let rocketParams = {
      center: {x: this.xCoord, y: this.yCoord},
      orientation: this.orientation,
      xSpeed: this.xSpeed,
      ySpeed: this.ySpeed,
    };
    return rocketParams;
  }

  function thrust() {
    this.xSpeed = this.xSpeed + Math.sin(this.orientation) * this.acceleration;
    this.ySpeed = this.ySpeed - Math.cos(this.orientation) * this.acceleration;
  }

  function explode() {
  }

  let api = {
      getShipSpec: getShipSpec,
      update: update,
      turnClockwise: turnClockwise,
      turnCounterClockwise: turnCounterClockwise,
      hyperspace: hyperspace,
      fire: fire,
      thrust: thrust,
      explode: explode,
      orientation: orientation,
      xSpeed: xSpeed,
      ySpeed: ySpeed,
      acceleration: acceleration,
      cycle: cycle,
  };

  Object.defineProperty(api, 'width', {
      value: width,
      writable: false,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'height', {
      value: height,
      writable: false,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'xCoord', {
      value: xCoord,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'yCoord', {
      value: yCoord,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'orientation', {
      value: orientation,
      writable: true,
      enumerable: true,
      configurable: true
  });

  Object.defineProperty(api, 'xSpeed', {
      value: xSpeed,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'ySpeed', {
      value: ySpeed,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'turnRate', {
      value: turnRate,
      writable: false,
      enumerable: true,
      configurable: false
  });


  Object.defineProperty(api, 'thrusting', {
      value: thrusting,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'turning', {
      value: turning,
      writable: true,
      enumerable: true,
      configurable: false
  });

  return api;

}());
