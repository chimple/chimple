window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  youtube: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e18f9pexvhKHboH6tNo+Bsg", "youtube");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Youtube = void 0;
    var ccclass = cc._decorator.ccclass;
    var config_1 = require("../../../common/scripts/lib/config");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var util_logger_1 = require("../../../common/scripts/util-logger");
    var handler = null;
    cc.nextYoutube = function() {
      cc.log("started nextYoutube");
      handler.node.emit("nextProblem");
    };
    var Youtube = function(_super) {
      __extends(Youtube, _super);
      function Youtube() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._currentConfig = null;
        return _this;
      }
      Youtube.prototype.onLoad = function() {
        handler = this;
        this._currentConfig = this.processConfiguration(config_1.default.getInstance().data[0]);
      };
      Youtube.prototype.start = function() {
        util_logger_1.default.launchYoutube(this._currentConfig.videoId);
      };
      Youtube.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var name = configurations[0], version = configurations[1], description = configurations[2], videoId = configurations[3];
        return {
          name: name,
          version: version,
          description: description,
          videoId: videoId
        };
      };
      __decorate([ error_handler_1.default() ], Youtube.prototype, "processConfiguration", null);
      Youtube = __decorate([ ccclass ], Youtube);
      return Youtube;
    }(cc.Component);
    exports.Youtube = Youtube;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util-logger": void 0
  } ]
}, {}, [ "youtube" ]);