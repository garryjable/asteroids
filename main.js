MyGame.main = (function(graphics, collisions, ship, rockets, asteroids) {
  var currentScore = 0;
  var highScores = [];
  var lastMoveStamp = 0;
  var gameOver = false;
  var moveRate = 10;
  var level = 1;
  var levelComplete = true;

  var nextInput;
  var input = [];

  var shipSpec = ship.getShipSpec()
  var shipTexture = graphics.shipTexture(shipSpec);

  var rocketsSpecs = rockets.getRocketsSpecs()
  var rocketsTexture = graphics.rocketsTexture(rocketsSpecs);

  var asteroidsSpecs = asteroids.getAsteroidsSpecs()
  var asteroidsTexture = graphics.asteroidsTexture(asteroidsSpecs);

  performance.now();
  requestAnimationFrame(gameLoop);

  function gameLoop(elapsedTime) {
    if (!gameOver) {
      if(elapsedTime - lastMoveStamp >= moveRate){
        lastMoveStamp = elapsedTime;
        processInput(elapsedTime);
        update(elapsedTime);
        render();
      }
    }
    requestAnimationFrame(gameLoop);
  }


  function processInput(elapsedTime) {
    //nextInput = input.pop();
    nextInput = input.filter(onlyUnique);
    input = []
  }

  function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
  }


  function update(elapsedTime) {
    for (let i = 0; i < nextInput.length; i++) {
      if (nextInput[i] === 'startRotateCounter') {
        ship.turning = -1;
      } else if (nextInput[i] === 'startRotateClock') {
        ship.turning = 1;
      } else if (nextInput[i] === 'stopRotate') {
        ship.turning = 0;
      } else if (nextInput[i] === 'startThrust') {
        ship.thrusting = true;
      } else if (nextInput[i] === 'stopThrust') {
        ship.thrusting = false;
      } else if (nextInput[i] === 'fire') {
        let rocketParams = ship.fire(elapsedTime);
        if (rocketParams !== false) {
            let rocket = rockets.createRocket(rocketParams);
            rockets.addRocket(rocket);
        }
      }
    }
    if (levelComplete === true) {
        levelComplete = false;
        let asteroidParams = asteroids.spawn(graphics.canvas.width, graphics.canvas.height, level);
        asteroids.addAsteroids(asteroidParams);
    }
    rockets.update(graphics.canvas.width, graphics.canvas.height);
    asteroids.update(graphics.canvas.width, graphics.canvas.height);
    let results = collisions.checkCollisions(rockets.getCollisionList(), asteroids.getCollisionList(), ship.getCollisionLoc());
    if (results.asteroids.length === 0) {
      level++;
      levelComplete = true;
    }
    rockets.handleCollisions(results.rockets);
    asteroids.handleCollisions(results.asteroids);
    ship.update(graphics.canvas.width, graphics.canvas.height);
  }

  function render() {
    graphics.clear();
    graphics.refresh();
    rocketsSpecs = rockets.getRocketsSpecs();
    rocketsTexture.renderRockets(rocketsSpecs);
    rocketsTexture.draw();
    asteroidsSpecs = asteroids.getAsteroidsSpecs();
    asteroidsTexture.renderAsteroids(asteroidsSpecs);
    asteroidsTexture.draw();
    shipSpec = ship.getShipSpec();
    shipTexture.renderShip(shipSpec);
    shipTexture.draw();
  }


  function startInput (e) {
    e = e || window.event;
    if ( e.keyCode == '38') {
      input.push('startThrust');
    } else if ( e.keyCode == '37') {
      input.push('startRotateCounter');
    } else if ( e.keyCode == '39') {
      input.push('startRotateClock');
    } else if ( e.keyCode == '122') {
      input.push('hyperspace');
    } else if ( e.keyCode == '32') {
      input.push('fire');
    }
  }



  function stopInput (e) {
    e = e || window.event;
    if ( e.keyCode == '38') {
      input.push('stopThrust');
    } else if ( e.keyCode == '37') {
      input.push('stopRotate');
    } else if ( e.keyCode == '39') {
      input.push('stopRotate');
    }
  }

  document.onkeydown = startInput;
  document.onkeyup = stopInput;

}(MyGame.graphics, MyGame.collisions, MyGame.ship, MyGame.rockets, MyGame.asteroids));
