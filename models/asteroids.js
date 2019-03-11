MyGame.asteroids = (function() {
  'use strict';

  let asteroidList = [];

  function update() {
  }

  function getAsteroidsSpecs(canvasWidth, canvasHeight) {
    let asteroidsSpecs = [];
    for (let i = 0; i < this.asteroidList.length; i++) {
      this.asteroidList[i].update(canvasWidth, canvasHeight);
      let asteroidSpec = this.asteroidList[i].getAsteroidSpec();
      asteroidsSpecs.push(asteroidSpec);
    }
    return {
             specList: asteroidsSpecs,
             imageSrc: 'resources/asteroid-large.png',
           };
  }

  function spawn(canvasWidth, canvasHeight, level) {
    const buffer = 75;
    const cycle = 6.2831853;
    let paramList = [];
    let maxSpeed = 2;
      for (let i = 0; i < level; i++) {
        let asteroidParams;
        let coinFlip = Math.floor(Math.random() * (2));
        let randOrientation = Math.random() * (cycle);
        let randTurnRate = Math.random() * (cycle) / 360;
        let randXSpeed = Math.random() * (maxSpeed);
        let randYSpeed = Math.random() * (maxSpeed);
        let randYCoord;
        let randXCoord;
        if (coinFlip) {
          randYCoord = Math.floor(Math.random() * (canvasHeight + 1));
          randXCoord = canvasWidth + (buffer / 2);
        } else {
          randXCoord = Math.floor(Math.random() * (canvasWidth + 1));
          randYCoord = canvasHeight + (buffer / 2);
        }
        asteroidParams = {
          center: {x: randXCoord, y: randYCoord},
          orientation: randOrientation,
          turnRate: randTurnRate,
          xSpeed: randXSpeed,
          ySpeed: randYSpeed,
        };
        paramList.push(asteroidParams);
      }
    return paramList;
  }

  function addAsteroids(paramList) {
    for (let i = 0; i < paramList.length; i++) {
       let asteroid = this.createAsteroid(paramList[i]);
       this.asteroidList.push(asteroid);
    }
  }

  function createAsteroid(params) {
    let width = 40;
    let height = 40;

    let size = 3;

    const buffer = 75;
    const cycle = 6.2831853;
    let turnRate = params.turnRate;

    let xCoord = params.center.x;
    let yCoord = params.center.y;
    let orientation = params.orientation;
    let xSpeed = params.xSpeed;
    let ySpeed = params.ySpeed;

    function getAsteroidSpec() {
      let asteroidSpecTexture = {
        center: {x: this.xCoord, y: this.yCoord},
        width: width * size,
        height: height * size,
        rotation: this.orientation,
      };
      return asteroidSpecTexture;
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
      if (this.orientation < this.cycle) {
        this.orientation = this.orientation + this.turnRate;
      } else {
        this.orientation = 0;
      }

      return;
    }


    function impact() {
    }

    function miss() {
    }

    let api = {
        getAsteroidSpec: getAsteroidSpec,
        update: update,
        impact: impact,
        miss: miss,
        orientation: orientation,
        xSpeed: xSpeed,
        ySpeed: ySpeed,
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

    Object.defineProperty(api, 'buffer', {
        value: buffer,
        writable: true,
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(api, 'cycle', {
        value: cycle,
        writable: false,
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(api, 'turnRate', {
        value: turnRate,
        writable: false,
        enumerable: true,
        configurable: false
    });
    return api;
  }

  let api = {
      getAsteroidsSpecs: getAsteroidsSpecs,
      addAsteroids: addAsteroids,
      createAsteroid: createAsteroid,
      spawn: spawn,
  };

  Object.defineProperty(api, 'asteroidList', {
      value: asteroidList,
      writable: true,
      enumerable: true,
      configurable: false
  });

  return api;

}());
