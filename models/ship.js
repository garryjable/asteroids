MyGame.ship = (function(audio, graphics) {
  'use strict';
  const fireRate = 200;
  let lastShot = 0;
  let width = 75;
  let height = 75;
  let xCoord = 500;
  let yCoord = 500;
  let orientation = 0;
  let xSpeed = 0;
  let ySpeed = 0;
  let acceleration = .5;
  let turnRate = .1;
  let thrusting = false;
  let turning = 0;
  let lives = 3;

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

  function update() {
    if (this.xSpeed > 0) {
      if (this.xCoord + this.xSpeed > graphics.canvas.width + graphics.buffer) {
        this.xCoord = 0;
      } else {
        this.xCoord = this.xCoord + this.xSpeed;
      }
    } else if (this.xSpeed < 0) {
      if (this.xCoord + this.xSpeed < 0 - graphics.buffer) {
        this.xCoord = graphics.canvas.width + graphics.buffer
      } else {
        this.xCoord = this.xCoord + this.xSpeed;
      }
    }
    if (this.ySpeed > 0) {
      if (this.yCoord + this.ySpeed > graphics.canvas.height + graphics.buffer) {
        this.yCoord = 0;
      } else {
        this.yCoord = this.yCoord + this.ySpeed;
      }
    } else if (this.ySpeed < 0) {
      if (this.yCoord + this.ySpeed < 0 - graphics.buffer) {
        this.yCoord = graphics.canvas.height + graphics.buffer
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
    if (this.orientation < graphics.cycle) {
      this.orientation = this.orientation + this.turnRate;
    } else {
      this.orientation = this.orientation + this.turnRate - graphics.cycle;
    }
  }

  function turnCounterClockwise() {
    if (this.orientation > 0) {
      this.orientation = this.orientation - this.turnRate;
    } else {
      this.orientation = graphics.cycle + this.orientation - this.turnRate;
    }
  }

  function hyperspace(asteroids) {
    audio.playSound('resources/hyperspace');
    let safe = false;
    let safeDist = 200;
    let randXCoord = Math.floor(Math.random() * (graphics.canvas.width + 1));
    let randYCoord = Math.floor(Math.random() * (graphics.canvas.height + 1));
    let shipLoc = this.getCollisionLoc();
    while (!safe) {
      safe = true;
      for (let j = 0; j < asteroids.length; j++) {
        let xDistAst = Math.abs(randXCoord - asteroids[j].xCoord);
        let yDistAst = Math.abs(randYCoord - asteroids[j].yCoord);
        let distanceAst = Math.sqrt(xDistAst**2 + yDistAst**2);
        if (shipLoc.radius + asteroids[j].radius + distanceAst <= safeDist) {
          safe = false;
        }
      }
      if (safe === true) {
        this.xCoord = randXCoord;
        this.yCoord = randYCoord;
        this.orientation = Math.random() * (graphics.cycle);
        this.xSpeed = 0;
        this.ySpeed = 0;
      } else {
        randXCoord = Math.floor(Math.random() * (graphics.canvas.width + 1));
        randYCoord = Math.floor(Math.random() * (graphics.canvas.height + 1));
      }
    }
    return;
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

  function handleCollisions(results) {
    if (results.hit === true) {
      audio.playSound('resources/ship-death');
    }
  }

  function explode() {
  }

  let api = {
      getShipSpec: getShipSpec,
      update: update,
      turnClockwise: turnClockwise,
      turnCounterClockwise: turnCounterClockwise,
      getCollisionLoc: getCollisionLoc,
      handleCollisions: handleCollisions,
      hyperspace: hyperspace,
      fire: fire,
      thrust: thrust,
      explode: explode,
      orientation: orientation,
      xSpeed: xSpeed,
      ySpeed: ySpeed,
      acceleration: acceleration,
      cycle: graphics.cycle,
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

  Object.defineProperty(api, 'lives', {
      value: lives,
      writable: true,
      enumerable: true,
      configurable: false
  });


  return api;

}(MyGame.audio, MyGame.graphics));
