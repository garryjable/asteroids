MyGame.main = (function(graphics, ship) {
  var currentScore = 0;
  var highScores = [];
  var lastMoveStamp = 0;
  var gameOver = false;
  var moveRate = 10;

  var nextInput;
  var input = [];

  var rockets = [];

  var shipSpec = ship.getShipSpec()
  var shipTexture = graphics.shipTexture(shipSpec);


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
    if (nextInput === 'rotateCounter') {
      ship.turnCounterClockwise();
    } else if (nextInput === 'rotateClock') {
      ship.turnClockwise();
    } else if (nextInput === 'thrust') {
      ship.thrust();
    }
    ship.update(graphics.canvas.width, graphics.canvas.height);
  }

  function render() {
    graphics.clear();
    graphics.refresh();
    shipSpec = ship.getShipSpec()
    shipTexture.renderShip(shipSpec);
    shipTexture.draw();
  }


  function checkInput (e) {
    e = e || window.event;
    if ( e.keyCode == '38') {
      input.push('thrust');
    } else if ( e.keyCode == '37') {
      input.push('rotateCounter');
    } else if ( e.keyCode == '39') {
      input.push('rotateClock');
    } else if ( e.charCode == '122') {
      input.push('hyperspace');
    }
  }

  document.onkeypress = checkInput;

}(MyGame.graphics, MyGame.ship));
