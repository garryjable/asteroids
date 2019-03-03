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

    let api = {
        clear: clear,
        shipTexture: shipTexture,
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
