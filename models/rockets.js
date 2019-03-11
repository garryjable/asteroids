MyGame.rockets = (function() {
  'use strict';

  let rocketList = [];

  function update() {
  }

  function getRocketsSpecs(canvasWidth, canvasHeight) {
    let rocketsSpecs = [];
    for (let i = 0; i < this.rocketList.length; i++) {
      this.rocketList[i].update(canvasWidth, canvasHeight);
      let rocketSpec = this.rocketList[i].getRocketSpec();
      if (rocketSpec.age * 15 < canvasWidth * .70) {
        rocketsSpecs.push(rocketSpec);
      }
    }
    return {
             specList: rocketsSpecs,
             imageSrc: 'resources/rocket.png',
           };
  }

  function addRocket(rocket) {
    this.rocketList.push(rocket);
  }

  function createRocket(params) {
    let width = 20;
    let height = 20;

    const rocketSpeed = 15;
    const buffer = 75;
    let age = 0;
    let gone = false;

    let xCoord = params.center.x;
    let yCoord = params.center.y;
    let orientation = params.orientation;
    let xSpeed = params.xSpeed + rocketSpeed * Math.sin(params.orientation);
    let ySpeed = params.ySpeed - rocketSpeed * Math.cos(params.orientation);

    function getRocketSpec() {
      let rocketSpecTexture = {
        center: {x: this.xCoord, y: this.yCoord},
        width: width,
        height: height,
        rotation: this.orientation,
        age: this.age,
      };
      return rocketSpecTexture;
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
      return;
    }

    function impact() {
    }

    function miss() {
    }

    let api = {
        getRocketSpec: getRocketSpec,
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

    Object.defineProperty(api, 'age', {
        value: age,
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
      rocketList: rocketList,
      getRocketsSpecs: getRocketsSpecs,
      addRocket: addRocket,
      createRocket: createRocket,
  };

  Object.defineProperty(api, 'rocketList', {
      value: rocketList,
      writable: true,
      enumerable: true,
      configurable: false
  });

  return api;

}());
