// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
        || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

(function () {

    var coin, coin2, coin3,
        coinImage, coinImage2, coinImage3,
        canvas;

    function gameLoop() {

        window.requestAnimationFrame(gameLoop);

        coin.clear();
        coin2.clear();
        coin3.clear();

        coin.update();
        coin2.update();
        coin3.update();

        coin.render();
        coin2.render();
        coin3.render();
    }

    function sprite(options) {

        var that = {},
            frameIndex = 0,
            tickCount = 0,
            ticksPerFrame = options.ticksPerFrame || 0,
            numberOfFrames = options.numberOfFrames || 1;

        that.context = options.context;
        that.left = options.left;
        that.top = options.top;
        that.width = options.width;
        that.height = options.height;
        that.image = options.image;

        that.update = function () {

            tickCount += 1;

            if (tickCount > ticksPerFrame) {

                tickCount = 0;

                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };

        that.clear = function(){
            that.context.clearRect(that.left, that.top, that.width / numberOfFrames, that.height);
        }

        that.render = function () {

            // Clear the canvas

            // Draw the animation
            that.context.drawImage(
                that.image,
                frameIndex * that.width / numberOfFrames,
                0,
                that.width / numberOfFrames,
                that.height,
                that.left,
                that.top,
                that.width / numberOfFrames,
                that.height);
        };

        return that;
    }

    // Get canvas
    canvas = document.getElementById("coinAnimation");
    canvas.width = 1000;
    canvas.height = 1000;

    // Create sprite sheet
    coinImage = new Image();
    coinImage.src = "images/coin-sprite-animation.png";

    // Create sprite
    coin = sprite({
        context: canvas.getContext("2d"),
        left: 50,
        top: 100,
        width: 1000,
        height: 100,
        image: coinImage,
        numberOfFrames: 10,
        ticksPerFrame: 2
    });

    coinImage2 = new Image();
    coinImage2.src = "images/player.png";
    // Create sprite
    coin2 = sprite({
        context: canvas.getContext("2d"),
        left: 0,
        top: 0,
        width: 670,
        height: 391,
        image: coinImage2,
        numberOfFrames: 7,
        ticksPerFrame: 4
    });

    coinImage3 = new Image();
    coinImage3.src = "images/face.png";
    // Create sprite
    coin3 = sprite({
        context: canvas.getContext("2d"),
        left: 200,
        top: 50,
        width: 600,
        height: 60,
        image: coinImage3,
        numberOfFrames: 10,
        ticksPerFrame: 36
    });

    // Load sprite sheet
    coinImage.addEventListener("load", gameLoop);

}());

