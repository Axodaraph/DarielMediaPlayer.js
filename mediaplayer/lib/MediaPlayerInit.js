"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MediaPlayer = /** @class */ (function () {
    function MediaPlayer(config) {
        this.media = config.el;
        this.plugins = config.plugins || [];
        this.initPlayer();
        this.initPlugins();
    }
    MediaPlayer.prototype.initPlayer = function () {
        var _a;
        this.container = document.createElement('div');
        this.container.style.position = 'relative';
        (_a = this.media.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(this.container, this.media);
        this.container.appendChild(this.media);
    };
    MediaPlayer.prototype.initPlugins = function () {
        /*  const player = {
             play: () => this.play(),
             pause: () => this.pause(),
             media: this.media,
             get muted() {
                 return this.media.muted;
             },
 
             set muted(value) {
                 this.media.muted = value;
             }
         }; */
        var _this = this;
        this.plugins.forEach(function (plugin) {
            plugin.run(_this);
        });
    };
    MediaPlayer.prototype.play = function () {
        this.media.play();
    };
    MediaPlayer.prototype.pause = function () {
        this.media.pause();
    };
    MediaPlayer.prototype.togglePlay = function () {
        if (this.media.paused) {
            this.media.play();
        }
        else {
            this.media.pause();
        }
    };
    MediaPlayer.prototype.mute = function () {
        this.media.muted = true;
    };
    MediaPlayer.prototype.unmute = function () {
        this.media.muted = false;
    };
    return MediaPlayer;
}());
/* MediaPlayer.prototype.changeSound = function() {
    if(this.media.muted){
        this.media.muted = false;
    } else {
        this.media.muted = true;
    }
}; */
exports.default = MediaPlayer;
