MyGame.asteroids = (function() {
  'use strict';

  let asteroidList = [];

  function update() {
  }

  function getAsteroidSpecs(canvasWidth, canvasHeight) {
    let asteroidsSpecs = [];
    for (let i = 0; i < this.asteroidList.length; i++) {
      this.asteroidList[i].update(canvasWidth, canvasHeight);
      let asteroidSpec = this.asteroidList[i].getAsteroidSpec();
      if (asteroidSpec.age < 100) {
        asteroidsSpecs.push(asteroidSpec);
      }
    }
    return {
             specList: asteroidsSpecs,
             imageSrc: 'resources/asteroid-large.png',
           };
  }

  function addAsteroid(asteroid) {
    this.asteroidList.push(asteroid);
  }

  function createAsteroid(params) {
    let width = 20;
    let height = 20;

    let size = 3;

    const asteroidSpeed = 15;
    const buffer = 75;
    let turnRate = .174533;
    let cycle = 6.2831853;

    let xCoord = params.center.x;
    let yCoord = params.center.y;
    let orientation = params.orientation;
    let xSpeed = params.xSpeed + asteroidSpeed * Math.sin(params.orientation);
    let ySpeed = params.ySpeed - asteroidSpeed * Math.cos(params.orientation);

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
      if (this.age < 100) {
        this.age++;
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

    return api;
  }

  let api = {
      asteroidList: asteroidList,
      getAsteroidSpecs: getAsteroidSpecs,
      addAsteroid: addAsteroid,
      createAsteroid: createAsteroid,
  };

  Object.defineProperty(api, 'asteroidList', {
      value: asteroidList,
      writable: true,
      enumerable: true,
      configurable: false
  });

  return api;

}());
