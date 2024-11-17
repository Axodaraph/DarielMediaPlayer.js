// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/MediaPlayerInit.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var MediaPlayer = /** @class */function () {
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
    } else {
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
}();
/* MediaPlayer.prototype.changeSound = function() {
    if(this.media.muted){
        this.media.muted = false;
    } else {
        this.media.muted = true;
    }
}; */
exports.default = MediaPlayer;
},{}],"plugins/AutoPlay.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var AutoPlay = /** @class */function () {
  function AutoPlay() {}
  AutoPlay.prototype.run = function (player) {
    if (!player.media.muted) {
      player.media.muted = true;
    }
    player.play();
  };
  return AutoPlay;
}();
exports.default = AutoPlay;
},{}],"plugins/AutoPause.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var AutoPause = /** @class */function () {
  function AutoPause() {
    this.threshold = 0.25;
    this.handlerIntersection = this.handlerIntersection.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }
  AutoPause.prototype.run = function (player) {
    this.player = player;
    //se utiliza la palabara reservada intersectionObserver para ver que parte del obejto esta siendo vizualizad en la pantalla, se usa el callback(handlerIntersection) y la propiedad threshold 
    var observer = new IntersectionObserver(this.handlerIntersection, {
      threshold: this.threshold
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
    } else {
      this.player.pause();
    }
  };
  AutoPause.prototype.handleVisibilityChange = function () {
    var isVisible = document.visibilityState === "visible";
    if (isVisible) {
      this.player.play();
    } else {
      this.player.pause();
    }
  };
  return AutoPause;
}();
exports.default = AutoPause;
},{}],"plugins/Ads/Ads.ts":[function(require,module,exports) {
"use strict";

var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var ALL_ADS = [{
  imageUrl: 'https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/badge-curso-frontend-developer-825407d1-49b1-4c9b-90c4-eee793720ede.png',
  title: 'Curso de Frontend Developer',
  body: 'Aprende a crear la parte frontal de una pagina web desde cero',
  url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fplatzi.com%2Fcursos%2Ffrontend-developer%2F&psig=AOvVaw2Mk0cF0TlbT961ZcPecGmW&ust=1731857255823000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIDFi5mV4YkDFQAAAAAdAAAAABAE'
}, {
  imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlejFDgINrAaFx9cRCaYstxO2J0jNC7YRrnA&s',
  title: 'Curso Profesional de Javascript',
  body: 'Aprende a crear la parte frontal de una pagina web desde cero',
  url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fplatzi.com%2Fblog%2Fjschallenge%2F&psig=AOvVaw0GaD1ha050v5GVPUFA61_f&ust=1731858312472000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNiNg46Z4YkDFQAAAAAdAAAAABAE'
}, {
  imageUrl: 'https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/badge-curso-frontend-developer-825407d1-49b1-4c9b-90c4-eee793720ede.png',
  title: 'Curso mySQL',
  body: 'Aprende a crear la parte frontal de una pagina web desde cero',
  url: 'https://platzi.com/home/clases/9873-db-sql/69931-el-poder-de-los-datos/'
}];
var Ads = /** @class */function () {
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
}();
exports.default = Ads;
},{}],"plugins/Ads/ratatata.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var Ads_1 = __importDefault(require("./Ads"));
var AdsPlugin = /** @class */function () {
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
    } else {
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
    if (this.media) {
      // Verifica si media es válido
      var currentTime = this.media.currentTime; // No necesita Math.floor para este caso.  Se puede usar para mayor precisión si es necesario.
      if (Math.abs(currentTime % 30) < 0.5) {
        // Chequea si está cercano a un múltiplo de 30.
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
    } else {
      console.warn("No hay anuncio disponible.");
    }
  };
  return AdsPlugin;
}();
exports.default = AdsPlugin;
},{"./Ads":"plugins/Ads/Ads.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var MediaPlayerInit_1 = __importDefault(require("./MediaPlayerInit"));
var AutoPlay_1 = __importDefault(require("../plugins/AutoPlay"));
var AutoPause_1 = __importDefault(require("../plugins/AutoPause"));
var ratatata_1 = __importDefault(require("../plugins/Ads/ratatata"));
var video = document.querySelector("video");
var player = new MediaPlayerInit_1.default({
  el: video,
  plugins: [new AutoPlay_1.default(), new AutoPause_1.default(), new ratatata_1.default()]
});
var playButton = document.querySelector("#play");
if (playButton) {
  playButton.onclick = function () {
    return player.togglePlay();
  };
} else {
  console.error('problemas con el boton de play');
}
var muttedButton = document.querySelector("#muted");
if (muttedButton) {
  muttedButton.onclick = function () {
    if (player.media.muted) {
      player.unmute(); //aqui no uso media como en el button de play porque unmute y mute es una funcion definida en player
    } else {
      player.mute();
    }
  };
} else {
  console.error('el boton de muteado esta presentado errores');
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(function (error) {
    console.log(error.message);
  });
}
},{"./MediaPlayerInit":"src/MediaPlayerInit.ts","../plugins/AutoPlay":"plugins/AutoPlay.ts","../plugins/AutoPause":"plugins/AutoPause.ts","../plugins/Ads/ratatata":"plugins/Ads/ratatata.ts","C:\\Users\\User\\Proyectos_Js\\PlatziMediaPlayer.js\\sw.js":[["sw.js","sw.js"],"sw.js.map","sw.js"]}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57256" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map