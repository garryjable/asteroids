MyGame.ship = (function() {
  'use strict';

  let width = 19;
  let height = 17;
  let xCoord = 100;
  let yCoord = 100;
  let orientation = 0;
  let speed = 0;;
  let direction = 0;;
  let thrusting = false;;

  function getShipSpec() {
    let shipSpecTexture = {
      imageSrc: 'resources/ship.png',
      center: {x: xCoord, y: yCoord},
      width: width,
      height: height,
      rotation: orientation,
      moveRate: 500 / 1000
    };
    return shipSpecTexture;
  }

  function update() {
    return;
  }

  function turnClockwise() {
    if (orientation < 360) {
      orientation++;
    } else {
      orientation = 0;
    }
  }

  function turnCounterClockwise() {
    if (orientation > 0) {
      orientation--;
    } else {
      orientation = 360;
    }
  }

  function hyperspace() {
  }

  function fire() {
  }

  function thrust() {

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
      explode: explode
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
      writable: false,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'yCoord', {
      value: yCoord,
      writable: false,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'orientation', {
      value: orientation,
      writable: false,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'speed', {
      value: orientation,
      writable: false,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'direction', {
      value: direction,
      writable: false,
      enumerable: true,
      configurable: false
  });

  Object.defineProperty(api, 'thrusting', {
      value: thrusting,
      writable: false,
      enumerable: true,
      configurable: false
  });

  return api;

}());
