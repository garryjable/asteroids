MyGame.ship = (function(audio, collisions) {
  'use strict';
  const fireRate = 200;
  let lastShot = 0;
  const buffer = 50;
  let width = 75;
  let height = 75;
  let xCoord = 500;
  let yCoord = 500;
  let orientation = 0;
  let xSpeed = 0;
  let ySpeed = 0;
  let acceleration = .3;
  let turnRate = .1;
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

  function getCollisionLoc() {
    let shipCoord = {
      xCoord: this.xCoord,
      yCoord: this.yCoord,
      radius: this.width / 2,
    }
    return shipCoord;
  }

  function update(canvasWidth, canvasHeight) {
    if (this.xSpeed > 0) {
      if (this.xCoord + this.xSpeed > canvasWidth + this.buffer) {
        this.xCoord = 0;
      } else {
        this.xCoord = this.xCoord + this.xSpeed;
      }
    } else if (this.xSpeed < 0) {
      if (this.xCoord + this.xSpeed < 0 - this.buffer) {
        this.xCoord = canvasWidth + this.buffer
      } else {
        this.xCoord = this.xCoord + this.xSpeed;
      }
    }
    if (this.ySpeed > 0) {
      if (this.yCoord + this.ySpeed > canvasHeight + this.buffer) {
        this.yCoord = 0;
      } else {
        this.yCoord = this.yCoord + this.ySpeed;
      }
    } else if (this.ySpeed < 0) {
      if (this.yCoord + this.ySpeed < 0 - this.buffer) {
        this.yCoord = canvasHeight + this.buffer
      } else {
        this.yCoord = this.yCoord + this.ySpeed;
      }
    }
    if (this.thrusting) {
      audio.playSound('resources/thruster');
      this.thrust();
    } else {
      audio.pauseSound('resources/thruster');
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
      this.orientation = this.orientation + this.turnRate - this.cycle;
    }
  }

  function turnCounterClockwise() {
    if (this.orientation > 0) {
      this.orientation = this.orientation - this.turnRate;
    } else {
      this.orientation = this.cycle + this.orientation - this.turnRate;
    }
  }

  function hyperspace() {
  }

  function fire(elapsedTime) {
    audio.playSound('resources/rocket');
    if (elapsedTime - this.lastShot >= this.fireRate) {
      this.lastShot = elapsedTime;
      let rocketParams = {
        center: {x: this.xCoord, y: this.yCoord},
        orientation: this.orientation,
        xSpeed: this.xSpeed,
        ySpeed: this.ySpeed,
      };
      return rocketParams;
    }
    return false;
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
      getCollisionLoc: getCollisionLoc,
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

  Object.defineProperty(api, 'buffer', {
      value: buffer,
      writable: false,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'fireRate', {
      value: fireRate,
      writable: false,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'lastShot', {
      value: lastShot,
      writable: true,
      enumerable: true,
      configurable: false
  });

  return api;

}(MyGame.audio, MyGame.collisions));
