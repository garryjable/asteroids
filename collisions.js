MyGame.collisions = (function() {
    'use strict';

    function checkCollisions(rockets, asteroids, ship) {
      for (let j = 0; j < asteroids.length; j++) {
        let xDistAstShip = Math.abs(ship.xCoord - asteroids[j].xCoord);
        let yDistAstShip = Math.abs(ship.yCoord - asteroids[j].yCoord);
        let distanceAstShip = Math.sqrt(xDistAstShip**2 + yDistAstShip**2);
        if (ship.radius + asteroids[j].radius >= distanceAstShip) {
          ship.hit = true;
        } else {
          ship.hit = false;
        }
        for (let i = 0; i < rockets.length; i++) {
          let xDistAstRoc = Math.abs(rockets[i].xCoord - asteroids[j].xCoord);
          let yDistAstRoc = Math.abs(rockets[i].yCoord - asteroids[j].yCoord);
          let distanceAstRoc = Math.sqrt(xDistAstRoc**2 + yDistAstRoc**2);
          if (rockets[i].radius + asteroids[j].radius >= distanceAstRoc) {
            asteroids[j].hit = true;
            rockets[i].hit = true;
          } 
        }
      }
      return {
        rockets: rockets,
        asteroids: asteroids,
        ship: ship,
      };
    }

    let api = {
        checkCollisions: checkCollisions,
    };

    return api;
}());
