MyGame.ship = (function(audio, graphics) {
  'use strict';
  const fireRate = 200;
  let lastShot = 0;
  let width = 75;
  let height = 75;
  let xCoord = graphics.canvas.width / 2;
  let yCoord = graphics.canvas.height / 2;
  let orientation = 0;
  let xSpeed = 0;
  let ySpeed = 0;
  let acceleration = .5;
  let turnRate = .1;
  let thrusting = false;
  let turning = 0;
  let lives = 3;
  let dead = false;
  let show = true;
  let immortal = false;
  let respawnRate = 3000;
  let flickerRate = 50;
  let lastFlicker = 0;
  let immortalTime = 6000;
  let lastDeath = 0;

  function getShipSpec() {
    let shipSpecTexture = {
      imageSrc: 'resources/ship.png',
      center: {x: this.xCoord, y: this.yCoord},
      width: width,
      height: height,
      show: this.show,
      rotation: this.orientation,
    };
    return shipSpecTexture;
  }

  function getCollisionLoc() {
    let shipCoord = {
      xCoord: this.xCoord,
      yCoord: this.yCoord,
      immortal: this.immortal,
      radius: this.width / 2,
    }
    return shipCoord;
  }

  function update(elapsedTime) {
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
    if (this.dead === true || this.immortal === true) {
      this.updateRespawn(elapsedTime);
    }
    return;
  }

  function turnClockwise(){
    if (this.dead === false) {
      if (this.orientation < graphics.cycle) {
        this.orientation = this.orientation + this.turnRate;
      } else {
        this.orientation = this.orientation + this.turnRate - graphics.cycle;
      }
    }
  }

  function turnCounterClockwise() {
    if (this.dead === false) {
      if (this.orientation > 0) {
        this.orientation = this.orientation - this.turnRate;
      } else {
        this.orientation = graphics.cycle + this.orientation - this.turnRate;
      }
    }
  }

  function hyperspace(asteroids) {
    if (this.dead === false) {
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
    }
    return;
  }

  function fire(elapsedTime) {
    if (elapsedTime - this.lastShot >= this.fireRate && this.dead === false) {
      audio.playSound('resources/rocket');
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
    if (this.dead === false) {
      this.xSpeed = this.xSpeed + Math.sin(this.orientation) * this.acceleration;
      this.ySpeed = this.ySpeed - Math.cos(this.orientation) * this.acceleration;
    }
  }

  function handleCollisions(results, elapsedTime) {
    if (results.hit === true) {
      audio.playSound('resources/ship-death');
      if (this.lives > 0) {
        this.lives--;
        this.dead = true;
        this.immortal = true;
        this.show = false;
        this.lastDeath = elapsedTime;
        this.orientation = Math.random() * (graphics.cycle);
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.xCoord = graphics.canvas.width / 2;
        this.yCoord = graphics.canvas.height / 2;
      }
    }
  }

  function updateRespawn(elapsedTime) {
    if (elapsedTime - this.lastDeath >= this.respawnRate) {
      this.dead = false;
      if (elapsedTime - this.lastFlicker >= this.flickerRate) {
        this.lastFlicker = elapsedTime;
        this.show = !this.show;
        if (elapsedTime - this.lastDeath >= this.immortalTime) {
          this.immortal = false;
          this.show = true;
        }
      }
    }
  }

  let api = {
      getShipSpec: getShipSpec,
      update: update,
      turnClockwise: turnClockwise,
      turnCounterClockwise: turnCounterClockwise,
      getCollisionLoc: getCollisionLoc,
      handleCollisions: handleCollisions,
      hyperspace: hyperspace,
      updateRespawn: updateRespawn,
      fire: fire,
      thrust: thrust,
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

  Object.defineProperty(api, 'dead', {
      value: dead,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'show', {
      value: show,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'immortal', {
      value: immortal,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'immortalTime', {
      value: immortalTime,
      writable: false,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'acceleration', {
      value: acceleration,
      writable: false,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'respawnRate', {
      value: respawnRate,
      writable: false,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'flickerRate', {
      value: flickerRate,
      writable: false,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'lastFlicker', {
      value: lastFlicker,
      writable: true,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'lastDeath', {
      value: lastDeath,
      writable: true,
      enumerable: true,
      configurable: false
  });

  return api;

}(MyGame.audio, MyGame.graphics));
