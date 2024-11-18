"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AutoPause = /** @class */ (function () {
    function AutoPause() {
        this.threshold = 0.25;
        this.handlerIntersection = this.handlerIntersection.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }
    AutoPause.prototype.run = function (player) {
        this.player = player;
        //se utiliza la palabara reservada intersectionObserver para ver que parte del obejto esta siendo vizualizad en la pantalla, se usa el callback(handlerIntersection) y la propiedad threshold 
        var observer = new IntersectionObserver(this.handlerIntersection, {
            threshold: this.threshold,
        });
        observer.observe(this.player.media);
        document.addEventListener("visibilitychange", this.handleVisibilityChange);
    };
    AutoPause.prototype.handlerIntersection = function (entries) {
        var entry = entries[0];
        /* console.log(entry); */
        //creo una variable para almacenar si es verdadero o no que la variable supera el rango de pantalla especificado
        var isVisible = entry.intersectionRatio >= this.threshold;
        if (isVisible) {
            this.player.play();
        }
        else {
            this.player.pause();
        }
    };
    AutoPause.prototype.handleVisibilityChange = function () {
        var isVisible = document.visibilityState === "visible";
        if (isVisible) {
            this.player.play();
        }
        else {
            this.player.pause();
        }
    };
    return AutoPause;
}());
exports.default = AutoPause;
