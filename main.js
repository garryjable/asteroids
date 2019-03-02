MyGame.main = (function(graphics, ship) {
  var currentScore = 0;
  var highScores = [];
  var lastMoveStamp = 0;
  var elapsedTime = 0;
  var gameOver = false;
  var moveRate = 5;

  var nextInput;
  var input = [];


//  let rotation = 0;
//  let shipSpecTexture = {
//    imageSrc: 'resources/ship.png',
//    center: {x: graphics.canvas.width / 2 + .5, y: graphics.canvas.height / 2},
//    width: 19,
//    height: 17,
//    rotation: 0,
//    moveRate: 500 / 1000
//  };
  let shipSpec = ship.getShipSpec()
  let shipTexture = graphics.Texture(shipSpec);



  gameLoop();

  function gameLoop(elapsedTime) {
    if (!gameOver) {
      processInput(elapsedTime);
      update(elapsedTime);
    }
      render();
      requestAnimationFrame(gameLoop);
  }


  function processInput(elapsedTime) {
    nextInput = input.pop();
    input = []
  }


  function update(elapsedTime) {
    if(elapsedTime - lastMoveStamp >= moveRate){
    }
  }

  function render() {
    graphics.clear();
    graphics.refresh();
    shipTexture.draw();
  }


  function checkInput (e) {
    e = e || window.event;
    if ( e.keyCode == '38') {
      input.push('thrust');
    } else if ( e.keyCode == '40') {
      input.push('rotateCounter');
    } else if ( e.keyCode == '39') {
      input.push('rotateClock');
    } else if ( e.charCode == '122') {
      input.push('hyperspace');
    }
  }

  document.onkeypress = checkInput;

}(MyGame.graphics, MyGame.ship));
