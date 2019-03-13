MyGame.saucer = (function() {
  'use strict';

  let saucerList = [];

  function update(canvasWidth, canvasHeight) {
    let newSaucerList = [];
    for (let i = 0; i < this.saucerList.length; i++) {
      this.saucerList[i].update(canvasWidth, canvasHeight);
      if (this.saucerList[i].hit !== true) {
        newSaucerList.push(this.saucerList[i]);
      }
    }
    this.saucerList = newSaucerList;
  }

  function getSaucersSpecs() {
    let saucersSpecs = [];
    for (let i = 0; i < this.saucerList.length; i++) {
      let saucerSpec = this.saucerList[i].getSaucerSpec();
      saucersSpecs.push(saucerSpec);
    }
    return {
             specList: saucersSpecs,
             imageSrc: 'resources/william-robinson-blob-alien-passive.gif',
           };
  }

  function spawn(canvasWidth, canvasHeight, level) {
    const buffer = 50;
    const cycle = 6.2831853;
    let maxSpeed = 2;
    let coinFlip = Math.floor(Math.random() * (2));
    let randOrientation = Math.random() * (cycle);
    let randTurnRate = (-cycle + Math.random() * (Math.abs(-cycle) + cycle)) / 360;
    let randXSpeed = (-maxSpeed + Math.random() * (Math.abs(-maxSpeed) + maxSpeed));
    let randYSpeed = (-maxSpeed + Math.random() * (Math.abs(-maxSpeed) + maxSpeed));
    let randYCoord;
    let randXCoord;
    if (coinFlip) {
      randYCoord = Math.floor(Math.random() * (canvasHeight + 1));
      randXCoord = canvasWidth + (buffer / 2);
    } else {
      randXCoord = Math.floor(Math.random() * (canvasWidth + 1));
      randYCoord = canvasHeight + (buffer / 2);
    }
    let saucerParams = {
      center: {x: randXCoord, y: randYCoord},
      orientation: randOrientation,
      turnRate: randTurnRate,
      xSpeed: randXSpeed,
      ySpeed: randYSpeed,
      size: coinFlip + 1,
    };
    return saucerParams;
  }

  function getCollisionList() {
    let collisionList = [];
    for (let i = 0; i < this.saucerList.length; i++) {
      let saucerCoord = {
        xCoord: this.saucerList[i].xCoord,
        yCoord: this.saucerList[i].yCoord,
        radius: this.saucerList[i].width / 3,
        hit: this.saucerList[i].hit,
      }
      collisionList.push(saucerCoord);
    }
    return collisionList;
  }

  function handleCollisions(results) {
    if (results.length > 0 && this.saucerList.length > 0) {
      let newSaucerList = [];
      for (let i = 0; i < this.saucerList.length; i++) {
        if (results[i].hit === true) {
          if (results[i].xCoord === this.saucerList[i].xCoord && results[i].yCoord === this.saucerList[i].yCoord) {
            this.saucerList[i].hit = true;
          }
        }
        if (this.saucerList[i].hit !== true) {
          newSaucerList.push(this.saucerList[i]);
        }
      }
      this.saucerList = newSaucerList;
    }
  }

  function addSaucer(saucer) {
    this.saucerList.push(saucer);
  }

  function createSaucer(params) {
    let width = 100;
    let height = 100;

    const buffer = 50;
    let age = 0;
    let hit = false;

    let xCoord = params.center.x;
    let yCoord = params.center.y;
    let orientation = params.orientation;
    let xSpeed = params.xSpeed;
    let ySpeed = params.ySpeed;

    function getSaucerSpec() {
      let saucerSpecTexture = {
        center: {x: this.xCoord, y: this.yCoord},
        width: width,
        height: height,
        rotation: this.orientation,
        age: this.age,
      };
      return saucerSpecTexture;
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
        getSaucerSpec: getSaucerSpec,
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

    Object.defineProperty(api, 'hit', {
        value: hit,
        writable: true,
        enumerable: true,
        configurable: false
    });



    return api;
  }

  let api = {
      saucerList: saucerList,
      getSaucersSpecs: getSaucersSpecs,
      spawn: spawn,
      update: update,
      addSaucer: addSaucer,
      createSaucer: createSaucer,
      getCollisionList: getCollisionList,
      handleCollisions: handleCollisions,
  };

  Object.defineProperty(api, 'saucerList', {
      value: saucerList,
      writable: true,
      enumerable: true,
      configurable: false
  });

  return api;

}());
