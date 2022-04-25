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
  "alphabet-recorder": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0586ePKqORMIYYC3r8h/qkg", "alphabet-recorder");
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
    exports.AlphabetRecorder = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var config_1 = require("../../../common/scripts/lib/config");
    var helper_1 = require("../../../common/scripts/helper");
    var tracing_container_1 = require("../../../common/Tracing/scripts/tracing-container");
    var AlphabetRecorder = function(_super) {
      __extends(AlphabetRecorder, _super);
      function AlphabetRecorder() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.progressMonitorPrefab = null;
        _this._tracingContainerVisible = false;
        _this._recordingContainerComponent = null;
        _this._tracingContainerComponent = null;
        _this._letter = null;
        _this._tracePath = null;
        _this._currentConfig = null;
        return _this;
      }
      AlphabetRecorder.prototype.onLoad = function() {
        var _this = this;
        this._recordingContainer = cc.instantiate(this.recordContainerPrefab);
        this._tracingContainer = cc.instantiate(this.tracingContainerPrefab);
        this._currentConfig = this.processConfiguration(config_1.default.getInstance().data[0]);
        if (null !== this._currentConfig) {
          this._letter = this._currentConfig.problem;
          this.setAlphabetToDisplay(this._letter);
        }
        this.node.dispatchEvent(new cc.Event.EventCustom(helper_1.TRACING_FINISHED, true));
        this.node.on(helper_1.TRACING_FINISHED, function(event) {
          event.stopPropagation();
          _this.nextProblem();
        });
      };
      AlphabetRecorder.prototype.nextProblem = function() {
        this.node.emit("nextProblem");
      };
      AlphabetRecorder.prototype.loadTracePath = function(letter) {
        var _this = this;
        null == this._tracePath && config_1.default.getInstance().loadPathJSON(letter, function(data) {
          !!data && data.length > 0 && (_this._tracePath = data);
        });
      };
      AlphabetRecorder.prototype.setAlphabetToDisplay = function(letter) {
        this._recordingContainerComponent = this._recordingContainer.getComponent(tracing_container_1.default);
        this._recordingContainerComponent.tracingLetter = letter;
        this._tracingContainerComponent = this._tracingContainer.getComponent(tracing_container_1.default);
        this._tracingContainerComponent.tracingLetter = letter;
        this._tracingContainerComponent.traceGenerationMode = false;
        this.node.addChild(this._recordingContainer);
        this.node.addChild(this._tracingContainer);
        this._recordingContainer.setPosition(new cc.Vec2(-512, -384));
        this._tracingContainer.setPosition(new cc.Vec2(0, -384));
        this._recordingContainerComponent.traceGraphics.emit("enabledGraphics");
        this._tracingContainerComponent.traceGraphics.emit("enabledGraphics");
        null !== this._letter && null == this._tracePath && this.loadTracePath(this._letter);
      };
      AlphabetRecorder.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        if (4 === configurations.length) {
          var level = configurations[0], workSheet = configurations[1], problemNo = configurations[2], problem = configurations[3];
          return {
            level: level,
            workSheet: workSheet,
            problemNo: problemNo,
            problem: problem
          };
        }
        return null;
      };
      AlphabetRecorder.prototype.update = function(dt) {
        null !== this._letter && null == this._tracePath && this.loadTracePath(this._letter);
        if (false === this._tracingContainerVisible && null !== this._tracePath) {
          this._tracingContainer.active = true;
          this._tracingContainerVisible = true;
          this._tracingContainerComponent._traceGraphicsComponent.loadTracePath(this._letter);
        }
      };
      __decorate([ property(cc.Prefab) ], AlphabetRecorder.prototype, "progressMonitorPrefab", void 0);
      __decorate([ property(cc.Prefab) ], AlphabetRecorder.prototype, "recordContainerPrefab", void 0);
      __decorate([ property(cc.Prefab) ], AlphabetRecorder.prototype, "tracingContainerPrefab", void 0);
      AlphabetRecorder = __decorate([ ccclass ], AlphabetRecorder);
      return AlphabetRecorder;
    }(cc.Component);
    exports.AlphabetRecorder = AlphabetRecorder;
    cc._RF.pop();
  }, {
    "../../../common/Tracing/scripts/tracing-container": void 0,
    "../../../common/scripts/helper": void 0,
    "../../../common/scripts/lib/config": void 0
  } ]
}, {}, [ "alphabet-recorder" ]);