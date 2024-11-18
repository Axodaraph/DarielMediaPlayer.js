"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var ALL_ADS = [
    {
        imageUrl: 'https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/badge-curso-frontend-developer-825407d1-49b1-4c9b-90c4-eee793720ede.png',
        title: 'Curso de Frontend Developer',
        body: 'Aprende a crear la parte frontal de una pagina web desde cero',
        url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fplatzi.com%2Fcursos%2Ffrontend-developer%2F&psig=AOvVaw2Mk0cF0TlbT961ZcPecGmW&ust=1731857255823000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIDFi5mV4YkDFQAAAAAdAAAAABAE',
    },
    {
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlejFDgINrAaFx9cRCaYstxO2J0jNC7YRrnA&s',
        title: 'Curso Profesional de Javascript',
        body: 'Aprende a crear la parte frontal de una pagina web desde cero',
        url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fplatzi.com%2Fblog%2Fjschallenge%2F&psig=AOvVaw0GaD1ha050v5GVPUFA61_f&ust=1731858312472000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNiNg46Z4YkDFQAAAAAdAAAAABAE',
    },
    {
        imageUrl: 'https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/badge-curso-frontend-developer-825407d1-49b1-4c9b-90c4-eee793720ede.png',
        title: 'Curso mySQL',
        body: 'Aprende a crear la parte frontal de una pagina web desde cero',
        url: 'https://platzi.com/home/clases/9873-db-sql/69931-el-poder-de-los-datos/',
    },
];
var Ads = /** @class */ (function () {
    function Ads() {
        this.initAds();
    }
    Ads.getInstance = function () {
        if (!Ads.instance) {
            Ads.instance = new Ads();
        }
        return Ads.instance;
    };
    Ads.prototype.initAds = function () {
        this.ads = __spreadArray([], ALL_ADS, true);
    };
    Ads.prototype.getAd = function () {
        if (this.ads.length === 0) {
            this.initAds();
        }
        return this.ads.pop();
    };
    return Ads;
}());
exports.default = Ads;
