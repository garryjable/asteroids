MyGame.main = (function(graphics, ship, rockets) {
  var currentScore = 0;
  var highScores = [];
  var lastMoveStamp = 0;
  var gameOver = false;
  var moveRate = 10;

  var nextInput;
  var input = [];

  var shipSpec = ship.getShipSpec()
  var shipTexture = graphics.shipTexture(shipSpec);

  var rocketsSpecs = rockets.getRocketsSpecs()
  var rocketsTexture = graphics.rocketsTexture(rocketsSpecs);


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
    nextInput = input.pop();
    input = []
  }


  function update(elapsedTime) {
    if (nextInput === 'startRotateCounter') {
      ship.turning = -1;
    } else if (nextInput === 'startRotateClock') {
      ship.turning = 1;
    } else if (nextInput === 'stopRotate') {
      ship.turning = 0;
    } else if (nextInput === 'startThrust') {
      ship.thrusting = true;
    } else if (nextInput === 'stopThrust') {
      ship.thrusting = false;
    } else if (nextInput === 'fire') {
      let rocketParams = ship.fire();
      let rocket = rockets.createRocket(rocketParams);
      rockets.addRocket(rocket);
    }
    ship.update(graphics.canvas.width, graphics.canvas.height);
  }

  function render() {
    graphics.clear();
    graphics.refresh();
    shipSpec = ship.getShipSpec();
    rocketsSpecs = rockets.getRocketsSpecs(graphics.canvas.width, graphics.canvas.height);
    rocketsTexture.renderRockets(rocketsSpecs);
    rocketsTexture.draw();
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

}(MyGame.graphics, MyGame.ship, MyGame.rockets));
