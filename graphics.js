MyGame.graphics = (function() {
    'use strict';

    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function refresh () {
//        context.imageSmoothingEnabled = false;
//        context.mozImageSmoothingEnabled = false;
//        context.webkitImageSmoothingEnabled = false;
//        context.msImageSmoothingEnabled = false;
    }

    function shipTexture(spec) {
        let ready = false;
        let image = new Image();

        image.onload = function() {
            ready = true;
        };
        image.src = spec.imageSrc;

        function draw() {
            if (ready) {
                context.save();

                context.translate(spec.center.x, spec.center.y);
                context.rotate(spec.rotation);
                context.translate(-spec.center.x, -spec.center.y);

                context.drawImage(
                    image,
                    spec.center.x - spec.width / 2,
                    spec.center.y - spec.height / 2,
                    spec.width, spec.height);

                context.restore();
            }
        }

        function renderShip(newSpec) {
            spec.rotation = newSpec.rotation;
            spec.center.x = newSpec.center.x;
            spec.center.y = newSpec.center.y;
        }

        return {
            draw: draw,
            renderShip: renderShip
        };
    }

    function rocketsTexture(specs) {
        let ready = false;
        let image = new Image();
        let specList = specs.specList;

        image.onload = function() {
            ready = true;
        };
        image.src = specs.imageSrc;

        function draw() {
            if (ready) {
                for (let i = 0; i < this.specList.length; i++) {
                  context.save();

                  context.translate(this.specList[i].center.x, this.specList[i].center.y);
                  context.rotate(this.specList[i].rotation);
                  context.translate(-this.specList[i].center.x, -this.specList[i].center.y);

                  context.drawImage(
                      image,
                      this.specList[i].center.x - this.specList[i].width / 2,
                      this.specList[i].center.y - this.specList[i].height / 2,
                      this.specList[i].width, this.specList[i].height);

                  context.restore();
                }
            }
        }

        function renderRockets(newSpecs) {
          this.specList = [];
          for (let i = 0; i < newSpecs.specList.length; i++) {
           this.specList.push(newSpecs.specList[i]);
          }
        }

        let api = {
            draw: draw,
            renderRockets: renderRockets,
            specList: specList,
        };

       Object.defineProperty(api, 'specList', {
           value: specList,
           writable: true,
           enumerable: true,
           configurable: false
       });


        return api;
    }


    let api = {
        clear: clear,
        shipTexture: shipTexture,
        rocketsTexture: rocketsTexture,
        refresh: refresh
    };

    Object.defineProperty(api, 'context', {
        value: context,
        writable: false,
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(api, 'canvas', {
        value: canvas,
        writable: false,
        enumerable: true,
        configurable: false
    });

    return api;
}());
