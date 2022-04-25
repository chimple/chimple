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
  drawshape: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3f0f1gHZZ9PW7BGMLuhBiRT", "drawshape");
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
    exports.DrawShape = exports.GAME_VOICE = exports.LETTER_TRACING_TEXTURE = void 0;
    var config_1 = require("../../../common/scripts/lib/config");
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var helper_1 = require("../../../common/scripts/helper");
    var tracing_container_1 = require("../../../common/Tracing/scripts/tracing-container");
    var game_1 = require("../../../common/scripts/game");
    exports.LETTER_TRACING_TEXTURE = "games/lettertracing/textures/";
    exports.GAME_VOICE = "games/lettertracing/sounds";
    var DrawShape = function(_super) {
      __extends(DrawShape, _super);
      function DrawShape() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.progressMonitorPrefab = null;
        _this._tracingContainerComponent = null;
        _this._imageName = null;
        _this._currentConfig = null;
        _this._imageTracingContainer = null;
        return _this;
      }
      DrawShape.prototype.onLoad = function() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = false;
        this._currentConfig = this.processConfiguration(config_1.default.getInstance().data[0]);
        if (null !== this._currentConfig) {
          this._imageTracingContainer = this.node;
          this._imageTracingContainer.scale *= 1;
          this.node.width = cc.winSize.width;
          this.node.height = cc.winSize.height;
          this._tracingContainer = cc.instantiate(this.tracingContainerPrefab);
          this.setImageToDisplay(this._currentConfig.image);
          this.subScribeToTracingEvents();
        }
      };
      DrawShape.prototype.subScribeToTracingEvents = function() {
        var _this = this;
        this.node.on(helper_1.TRACING_FINISHED, function(event) {
          event.stopPropagation();
          _this.tracingFinished();
        });
        this.node.on(helper_1.TRACING_CORRECT, function(event) {
          event.stopPropagation();
          _this.node.emit("correct");
        });
        this.node.on(helper_1.TRACING_WRONG, function(event) {
          event.stopPropagation();
          _this.node.emit("wrong");
        });
      };
      DrawShape.prototype.tracingFinished = function() {
        var _this = this;
        this.scheduleOnce(function() {
          _this.node.emit("nextProblem");
        }, 1);
      };
      DrawShape.prototype.setImageToDisplay = function(image) {
        this._tracingContainerComponent = this._tracingContainer.getComponent(tracing_container_1.default);
        this._tracingContainerComponent.tracingImage = image;
        this._tracingContainerComponent.lineWidth = 25;
        this._tracingContainerComponent.traceGenerationMode = false;
        this.node.addChild(this._tracingContainer);
        this._tracingContainer.setPosition(new cc.Vec2(0, 100));
        this._tracingContainerComponent.traceGraphics.emit("enabledGraphics");
      };
      DrawShape.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var level = configurations[0], workSheet = configurations[1], problemNo = configurations[2], image = configurations[3];
        return {
          level: level,
          workSheet: workSheet,
          problemNo: problemNo,
          image: image
        };
      };
      DrawShape.prototype.onDestroy = function() {
        cc.resources.release(this._imageName, cc.SpriteFrame);
        cc.audioEngine.stopAllEffects();
      };
      __decorate([ property(cc.Prefab) ], DrawShape.prototype, "progressMonitorPrefab", void 0);
      __decorate([ property(cc.Prefab) ], DrawShape.prototype, "tracingContainerPrefab", void 0);
      __decorate([ error_handler_1.default() ], DrawShape.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], DrawShape.prototype, "subScribeToTracingEvents", null);
      __decorate([ error_handler_1.default() ], DrawShape.prototype, "tracingFinished", null);
      __decorate([ error_handler_1.default() ], DrawShape.prototype, "setImageToDisplay", null);
      __decorate([ error_handler_1.default() ], DrawShape.prototype, "processConfiguration", null);
      DrawShape = __decorate([ ccclass ], DrawShape);
      return DrawShape;
    }(game_1.default);
    exports.DrawShape = DrawShape;
    cc._RF.pop();
  }, {
    "../../../common/Tracing/scripts/tracing-container": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/helper": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0
  } ]
}, {}, [ "drawshape" ]);