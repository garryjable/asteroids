MyGame.rocket = (function(params) {
  'use strict';

  let width = 10;
  let height = 10;
  let xCoord = params.center.x;
  let yCoord = params.center.y;
  let orientation = params.orientation;

  const rocketSpeed = 1;
  let age = 0;
  let gone = false;

  let = xSpeed = rocketSpeed + Math.sin(orientation);
  let = ySpeed = rocketSpeed - Math.cos(orientation);

  function getRocketSpec() {
    let rocketSpecTexture = {
      imageSrc: 'resources/rocket.png',
      center: {x: this.xCoord, y: this.yCoord},
      width: width,
      height: height,
      rotation: this.orientation,
      gone: this.gone,
    };
    return rocketSpecTexture;
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
    if ( age < 100) {
      age++;
    } else {
      gone = true;
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

  Object.defineProperty(api, 'gone', {
      value: gone,
      writable: true,
      enumerable: true,
      configurable: false
  });

  return api;

}());
