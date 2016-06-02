var Animation = (function () {
    function Animation() {
        this._delay = null;
        this._left = 0;
        this._top = 10;
        this._width = 50;
        this._height = 50;
        this._xPositive = true;
        this._yPositive = true;
        this._xOffset = this.rand();
        this._yOffset = this.rand();
    }

    Animation.prototype.initialize = function () {
        this._canvas = document.getElementById('canvas');
        this._context = this._canvas.getContext('2d');
        this.resizeCanvas();
        this.gameLoop();
        window.onresize = this.resizeCanvas.bind(this);
    };

    Animation.prototype.rand = function () {
        return (Math.floor(Math.random() * 8) * 2) + 1;
    };

    Animation.prototype.offset = function () {
        this._xOffset = this.rand();
        this._yOffset = this.rand();
    };

    Animation.prototype.clear = function () {
        if (this._yPositive)
            this._context.clearRect(this._left, this._top, this._width, this._height);
        else {
            var radius = this._width / 2;
            this.clearCircle(this._left + radius, this._top + radius, radius);
        }
    };

    Animation.prototype.clearCircle = function (x, y, radius) {
        this._context.save();
        this._context.beginPath();
        this._context.arc(x, y, radius, 0, 2 * Math.PI, true);
        this._context.clip();
        this._context.clearRect(x - radius, y - radius, radius * 2, radius * 2);
        this._context.restore();
    };

    Animation.prototype.updatePosition = function () {
        this._left = this._left + (this._xPositive ? this._xOffset : -this._xOffset);
        this._top = this._top + (this._yPositive ? this._yOffset : -this._yOffset);
        if (this._left >= this._canvas.width - this._width) {
            this._xPositive = false;
            this.offset();
        }
        else if (this._left <= 2) {
            this._xPositive = true;
            this.offset();
        }
        if (this._top >= this._canvas.height - this._height) {
            this._yPositive = false;
            this.offset();
        }
        else if (this._top <= 2) {
            this._yPositive = true;
            this.offset();
        }
    };

    Animation.prototype.box = function () {
        this._context.fillRect(this._left, this._top, this._width, this._height);
        this._context.strokeRect(this._left, this._top, this._width, this._height);
    };

    Animation.prototype.circle = function () {
        var radius = this._width / 2;
        this._context.beginPath();
        this._context.arc(this._left + radius, this._top + radius, radius, 0, 2 * Math.PI, false);
        this._context.stroke();
        this._context.fill();
    };

    Animation.prototype.draw = function () {
        if (this._yPositive)
            this.box();
        else
            this.circle();
    };

    Animation.prototype.gameLoop = function () {
        window.requestAnimationFrame(this.gameLoop.bind(this));
        this.clear();
        this.updatePosition();
        this.draw();
    };

    Animation.prototype.resizeCanvas = function () {
        console.log('addEventListener - resize');
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        var grad = this._context.createRadialGradient(0, 0, 30, 0, 0, 900);
        grad.addColorStop(0.5, '#0000FF');
        grad.addColorStop(1, '#00FF00');
        this._context.fillStyle = grad;
        this._context.strokeStyle = "#990000";
    };

    return Animation;
})();

var animation = new Animation();


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

window.addEventListener("load", animation.initialize(), false);
//window.addEventListener('resize', animation.resizeCanvas(), false);