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
  writeletter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f00d6U85lNJf7T+QE5U3/2Z", "writeletter");
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
    exports.WriteLetter = exports.LETTER_TRACING_SCALE = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var config_1 = require("../../../common/scripts/lib/config");
    var util_1 = require("../../../common/scripts/util");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var helper_1 = require("../../../common/scripts/helper");
    var tracing_container_1 = require("../../../common/Tracing/scripts/tracing-container");
    var game_1 = require("../../../common/scripts/game");
    var trace_graphics_1 = require("../../../common/Tracing/scripts/trace-graphics");
    exports.LETTER_TRACING_SCALE = .85;
    var WriteLetter = function(_super) {
      __extends(WriteLetter, _super);
      function WriteLetter() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.imageNode = null;
        _this._tracingContainerComponent = null;
        _this._traceGraphics = null;
        _this._letter = null;
        _this._currentConfig = null;
        _this._letterTracingContainer = null;
        _this._sound = null;
        _this._imageName = null;
        return _this;
      }
      WriteLetter.prototype.onLoad = function() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = false;
        this._currentConfig = this.processConfiguration(config_1.default.getInstance().data[0]);
        if (null !== this._currentConfig) {
          this._image = cc.instantiate(this.imageNode);
          this._letterTracingContainer = this.node;
          this._letterTracingContainer.scale *= 1;
          this.node.width = cc.winSize.width;
          this.node.height = cc.winSize.height;
          this.initTracingContainer();
          this.subScribeToTracingEvents();
          this.loadSounds(this._currentConfig.traceText);
          this.node.opacity = 255;
        }
        util_1.Util.showHelp(null, null);
      };
      WriteLetter.prototype.initTracingContainer = function() {
        this._tracingContainer = cc.instantiate(this.tracingContainerPrefab);
        this.setAlphabetToDisplay(this._currentConfig.traceText);
      };
      WriteLetter.prototype.subScribeToTracingEvents = function() {
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
        this.node.on(helper_1.RESET_TRACING, function(event) {
          event.stopPropagation();
          console.log("RESET_TRACING.....");
          _this._tracingContainerComponent = _this._tracingContainer.getComponent(tracing_container_1.default);
          _this._traceGraphics = _this._tracingContainerComponent.traceGraphics;
          if (null !== _this._traceGraphics) {
            var traceGraphics = _this._traceGraphics.getComponent(trace_graphics_1.default);
            traceGraphics.resetGraphics();
          }
        });
        this.node.on(helper_1.RESET_TRACING_ALLOWED, function() {
          null !== _this.node.getChildByName("reeetTracingButton") && (_this.node.getChildByName("reeetTracingButton").opacity = 255);
        });
        this.node.on(helper_1.RESET_TRACING_NOT_ALLOWED, function() {
          null !== _this.node.getChildByName("reeetTracingButton") && (_this.node.getChildByName("reeetTracingButton").opacity = 0);
        });
        null !== this.node.getChildByName("reeetTracingButton") && (this.node.getChildByName("reeetTracingButton").opacity = 0);
      };
      WriteLetter.prototype.loadSounds = function(text) {
        var _this = this;
        util_1.Util.loadsLetter(text.toLowerCase(), function(clip) {
          _this._sound = clip;
          _this.node.emit(helper_1.SOUND_LOADED_EVENT);
        });
      };
      WriteLetter.prototype.tracingFinished = function() {
        var _this = this;
        this.pronounce();
        this.scheduleOnce(function() {
          _this.node.emit("nextProblem");
        }, 1);
      };
      WriteLetter.prototype.pronounce = function() {
        this.friend.speak(this._sound);
      };
      WriteLetter.prototype.setAlphabetToDisplay = function(letter) {
        this._tracingContainerComponent = this._tracingContainer.getComponent(tracing_container_1.default);
        this._tracingContainerComponent.tracingLetter = letter;
        this._tracingContainerComponent.traceGenerationMode = false;
        this.node.addChild(this._tracingContainer);
        this._tracingContainerComponent.traceGraphics.emit("enabledGraphics");
        "en/" === config_1.default.dir ? this._tracingContainer.setPosition(new cc.Vec2(-256, -350)) : "hi/" === config_1.default.dir ? this._tracingContainer.setPosition(new cc.Vec2(-256, -450)) : this._tracingContainer.setPosition(new cc.Vec2(-256, -350));
        this.node.scale = exports.LETTER_TRACING_SCALE;
      };
      WriteLetter.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var level = configurations[0], workSheet = configurations[1], problemNo = configurations[2], traceText = configurations[3];
        return {
          level: level,
          workSheet: workSheet,
          problemNo: problemNo,
          traceText: traceText
        };
      };
      WriteLetter.prototype.onDestroy = function() {
        cc.audioEngine.stopAllEffects();
      };
      __decorate([ property(cc.Prefab) ], WriteLetter.prototype, "tracingContainerPrefab", void 0);
      __decorate([ property(cc.Prefab) ], WriteLetter.prototype, "imageNode", void 0);
      __decorate([ error_handler_1.default() ], WriteLetter.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], WriteLetter.prototype, "subScribeToTracingEvents", null);
      __decorate([ error_handler_1.default() ], WriteLetter.prototype, "tracingFinished", null);
      __decorate([ error_handler_1.default() ], WriteLetter.prototype, "pronounce", null);
      __decorate([ error_handler_1.default() ], WriteLetter.prototype, "setAlphabetToDisplay", null);
      WriteLetter = __decorate([ ccclass ], WriteLetter);
      return WriteLetter;
    }(game_1.default);
    exports.WriteLetter = WriteLetter;
    cc._RF.pop();
  }, {
    "../../../common/Tracing/scripts/trace-graphics": void 0,
    "../../../common/Tracing/scripts/tracing-container": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/helper": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0
  } ]
}, {}, [ "writeletter" ]);