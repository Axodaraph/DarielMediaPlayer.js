"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ads_1 = require("./Ads");
var AdsPlugin = /** @class */ (function () {
    function AdsPlugin() {
        this.media = null; // Permite null
        this.ads = Ads_1.default.getInstance();
        this.adsContainer = document.createElement('div');
        this.adsContainer.style.position = 'absolute';
        this.timeupdateHandler = this.handleTimeUpdate.bind(this);
    }
    AdsPlugin.prototype.run = function (player) {
        this.player = player;
        this.player.container.appendChild(this.adsContainer);
        this.media = this.player.media || null; // Manejo de null
        if (this.media) {
            this.media.addEventListener('timeupdate', this.timeupdateHandler);
        }
        else {
            console.error("El elemento media es nulo.");
        }
    };
    AdsPlugin.prototype.destroy = function () {
        if (this.media) {
            this.media.removeEventListener('timeupdate', this.timeupdateHandler);
            this.media = null; // Limpia la referencia
        }
    };
    AdsPlugin.prototype.handleTimeUpdate = function () {
        if (this.media) { // Verifica si media es válido
            var currentTime = this.media.currentTime; // No necesita Math.floor para este caso.  Se puede usar para mayor precisión si es necesario.
            if (Math.abs(currentTime % 30) < 0.5) { // Chequea si está cercano a un múltiplo de 30.
                this.renderAd();
            }
        }
    };
    AdsPlugin.prototype.renderAd = function () {
        var _this = this;
        if (this.currentAd) {
            return;
        }
        var ad = this.ads.getAd();
        this.currentAd = ad;
        this.adsContainer.innerHTML = "\n        <div class=\"ads\" style=\"display: flex;\n        width: 300px;\n        height: 100px;\">\n                <a class=\"ads__link\" href=\"".concat(this.currentAd.url, "\"  target=\"_blank\" style=\"display: flex;\n                flex-direction: row;\n                justify-content: space-between;\n                width: auto;\n                height: auto;\">\n                    <img class=\"ads__img\" src=\"").concat(this.currentAd.imageUrl, "\" alt=\"\" style =\"width: 100px;\n                    height: 100px;\">\n                    <div class=\"ads__info\">\n                        <h5 class=\"ads__title\">").concat(this.currentAd.title, "</h5>\n                        <p class=\"ads__body\">").concat(this.currentAd.body, "</p>\n                    </div>\n                </a>\n            </div>");
        setTimeout(function () {
            _this.currentAd = null;
            _this.adsContainer.innerHTML = '';
        }, 5000);
        if (ad) {
            // Aquí va la lógica para mostrar el anuncio en el reproductor.
            // Ejemplo (requiere implementar una función para mostrar anuncios en el reproductor):
            console.log(ad);
            /* this.player.showAd(ad); */
        }
        else {
            console.warn("No hay anuncio disponible.");
        }
    };
    return AdsPlugin;
}());
exports.default = AdsPlugin;
