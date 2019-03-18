MyGame.main = (function(graphics, particles, collisions, ship, rockets, asteroids, saucers, audio) {
  audio.playSound('resources/comptroller-crossover-dragon');
  var currentScore = 0;
  var highScores = [];
  var lastMoveStamp = 0;
  var gameOver = false;
  var moveRate = 17;
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

  var saucersSpecs = saucers.getSaucersSpecs()
  var saucersTexture = graphics.saucersTexture(saucersSpecs);

  let particlesLaser = particles.init({
      center: { x: 300, y: 300 },
      size: { mean: 15, stdev: 5 },
      speed: { mean: 65, stdev: 35 },
      lifetime: { mean: 4, stdev: 1}
  });

//  let particlesLaser = particles.create({
//      center: { x: 300, y: 300 },
//      size: { mean: 15, stdev: 5 },
//      speed: { mean: 65, stdev: 35 },
//      lifetime: { mean: 4, stdev: 1}
//  });
//  let particlesLaser2 = particles.create({
//      center: { x: 300, y: 300 },
//      size: { mean: 12, stdev: 3 },
//      speed: { mean: 65, stdev: 35 },
//      lifetime: { mean: 4, stdev: 1}
//  });

  particlesSpecs = {
    specList: [particlesLaser],
    imageExplodeSrc: 'assets/laser.png',
    imageThrustSrc: 'assets/laser.png',
    imageHyperspaceSrc: 'assets/laser.png',
  }
  let particlesTexture = graphics.particlesTexture(particlesSpecs);


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
      } else if (nextInput[i] === 'hyperspace') {
        let asteroidsCollisionList = asteroids.getCollisionList()
        ship.hyperspace(asteroidsCollisionList);
      }
    }
    if (levelComplete === true) {
        levelComplete = false;
        let asteroidParams = asteroids.spawn(level, 3);
        asteroids.addAsteroids(asteroidParams);

        let saucersParams = saucers.spawn(level);
        let newSaucer = saucers.createSaucer(saucersParams);
        saucers.addSaucer(newSaucer);
    }
    rockets.update();
    saucers.update();
    asteroids.update();
    particles.update();
    let results = collisions.checkCollisions(rockets.getCollisionList(), asteroids.getCollisionList(), ship.getCollisionLoc(), saucers.getCollisionList());
    if (results.asteroids.length === 0) {
      level++;
      levelComplete = true;
    }
    rockets.handleCollisions(results.rockets);
    asteroids.handleCollisions(results.asteroids);
    saucers.handleCollisions(results.saucers);
    ship.handleCollisions(results.ship);
    ship.update();
  }

  function render() {
    graphics.clear();
    graphics.refresh();
    rocketsSpecs = rockets.getRocketsSpecs();
    rocketsTexture.renderRockets(rocketsSpecs);
    rocketsTexture.draw();
    saucersSpecs = saucers.getSaucersSpecs();
    saucersTexture.renderSaucer(saucersSpecs);
    saucersTexture.draw();
    asteroidsSpecs = asteroids.getAsteroidsSpecs();
    asteroidsTexture.renderAsteroids(asteroidsSpecs);
    asteroidsTexture.draw();
    //particlesSpecs = particles.getParticlesSpecs();
    //particlesTexture.renderParticles(particlesSpecs);
    //particlesTexture.draw();
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
    } else if ( e.keyCode == '90') {
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

}(MyGame.graphics, MyGame.particles, MyGame.collisions, MyGame.ship, MyGame.rockets, MyGame.asteroids, MyGame.saucers, MyGame.audio));
