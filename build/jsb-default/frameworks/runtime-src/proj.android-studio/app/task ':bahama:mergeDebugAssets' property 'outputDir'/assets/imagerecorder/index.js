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
  imagerecorder: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "81166YxH/9FvoH17KHx2wTS", "imagerecorder");
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
    exports.ImageRecorder = void 0;
    var ccclass = cc._decorator.ccclass;
    var config_1 = require("../../../common/scripts/lib/config");
    var property = cc._decorator.property;
    var tracing_container_1 = require("../../../common/Tracing/scripts/tracing-container");
    var helper_1 = require("../../../common/scripts/helper");
    var ImageRecorder = function(_super) {
      __extends(ImageRecorder, _super);
      function ImageRecorder() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.progressMonitorPrefab = null;
        _this._tracingContainerVisible = false;
        _this._recordingContainerComponent = null;
        _this._tracingContainerComponent = null;
        _this._imageName = null;
        _this._tracePath = null;
        _this._jsonLoadingStatus = true;
        _this._currentConfig = null;
        return _this;
      }
      ImageRecorder.prototype.onLoad = function() {
        var _this = this;
        this._recordingContainer = cc.instantiate(this.recordContainerPrefab);
        this._tracingContainer = cc.instantiate(this.tracingContainerPrefab);
        this._currentConfig = this.processConfiguration(config_1.default.getInstance().data[0]);
        if (null !== this._currentConfig) {
          this._imageName = this._currentConfig.image;
          this.setImageToDisplay(this._imageName);
        }
        this.node.dispatchEvent(new cc.Event.EventCustom(helper_1.TRACING_FINISHED, true));
        this.node.on(helper_1.RECORDING_FINISHED, function(event) {
          event.stopPropagation();
          _this.scheduleOnce(function() {
            _this._tracingContainer.active = true;
            _this._recordingContainer.active = false;
          }, 3);
        });
        this.node.on(helper_1.BACK_FINISHED, function(event) {
          event.stopPropagation();
          _this._tracingContainer.active = false;
          _this._recordingContainer.active = true;
        });
        this.node.on(helper_1.TRACING_FINISHED, function(event) {
          event.stopPropagation();
          _this.nextProblem();
        });
      };
      ImageRecorder.prototype.nextProblem = function() {
        this.node.emit("nextProblem");
      };
      ImageRecorder.prototype.loadTracePath = function(letter) {
        var _this = this;
        try {
          null == this._tracePath && config_1.default.getInstance().loadPathJSON(letter, function(data) {
            if (!!data && data.length > 0) {
              _this._jsonLoadingStatus = true;
              _this._tracePath = data;
            } else {
              _this._jsonLoadingStatus = false;
              _this._tracePath = null;
            }
          });
        } catch (e) {
          this._jsonLoadingStatus = false;
        }
      };
      ImageRecorder.prototype.setImageToDisplay = function(image) {
        this._recordingContainerComponent = this._recordingContainer.getComponent(tracing_container_1.default);
        this._recordingContainerComponent.tracingImage = image;
        this._tracingContainerComponent = this._tracingContainer.getComponent(tracing_container_1.default);
        this._tracingContainerComponent.tracingImage = this._imageName;
        this._tracingContainerComponent.lineWidth = 25;
        this._recordingContainerComponent.lineWidth = 25;
        this._tracingContainerComponent.traceGenerationMode = true;
        this.node.addChild(this._recordingContainer);
        this.node.addChild(this._tracingContainer);
        this.node.setPosition(new cc.Vec2(-cc.winSize.width / 2, -cc.winSize.height / 2));
        this._tracingContainer.active = false;
        this._recordingContainer.setPosition(new cc.Vec2(0, 0));
        this._tracingContainer.setPosition(new cc.Vec2(0, 0));
        this._recordingContainerComponent.traceGraphics.emit("enabledGraphics");
        this._tracingContainerComponent.traceGraphics.emit("enabledGraphics");
        null !== this._imageName && null == this._tracePath && this.loadTracePath(this._imageName);
      };
      ImageRecorder.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        if (4 === configurations.length) {
          var level = configurations[0], workSheet = configurations[1], problemNo = configurations[2], image = configurations[3];
          return {
            level: level,
            workSheet: workSheet,
            problemNo: problemNo,
            image: image
          };
        }
        return null;
      };
      ImageRecorder.prototype.update = function(dt) {
        null !== this._imageName && null == this._tracePath && this._jsonLoadingStatus && this.loadTracePath(this._imageName);
        if (false === this._tracingContainerVisible && null !== this._tracePath) {
          this._tracingContainer.active = true;
          this._tracingContainerVisible = true;
          this._tracingContainerComponent._traceGraphicsComponent.loadTracePath(this._imageName);
        }
      };
      __decorate([ property(cc.Prefab) ], ImageRecorder.prototype, "progressMonitorPrefab", void 0);
      __decorate([ property(cc.Prefab) ], ImageRecorder.prototype, "recordContainerPrefab", void 0);
      __decorate([ property(cc.Prefab) ], ImageRecorder.prototype, "tracingContainerPrefab", void 0);
      ImageRecorder = __decorate([ ccclass ], ImageRecorder);
      return ImageRecorder;
    }(cc.Component);
    exports.ImageRecorder = ImageRecorder;
    cc._RF.pop();
  }, {
    "../../../common/Tracing/scripts/tracing-container": void 0,
    "../../../common/scripts/helper": void 0,
    "../../../common/scripts/lib/config": void 0
  } ]
}, {}, [ "imagerecorder" ]);