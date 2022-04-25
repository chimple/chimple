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
  singlenumbertracing: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5da4eDY4s1EHawDKyXsr9Mj", "singlenumbertracing");
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
    exports.SingleNumberTracing = exports.TRACE_NODE_POS_Y = exports.TRACE_NODE_POS_X = exports.LETTER_SCALE = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var util_1 = require("../../../common/scripts/util");
    var config_1 = require("../../../common/scripts/lib/config");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var helper_1 = require("../../../common/scripts/helper");
    var tracing_container_1 = require("../../../common/Tracing/scripts/tracing-container");
    var lessonController_1 = require("../../../common/scripts/lessonController");
    var trace_graphics_1 = require("../../../common/Tracing/scripts/trace-graphics");
    exports.LETTER_SCALE = .95;
    exports.TRACE_NODE_POS_X = -256;
    exports.TRACE_NODE_POS_Y = -384;
    var SingleNumberTracing = function(_super) {
      __extends(SingleNumberTracing, _super);
      function SingleNumberTracing() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._tracingContainerComponent = null;
        _this._traceGraphics = null;
        _this._letter = null;
        _this._wordTracingContainer = null;
        _this._tracingScale = null;
        _this._sound = null;
        return _this;
      }
      SingleNumberTracing.prototype.onLoad = function() {
        var _this = this;
        var manager = cc.director.getCollisionManager();
        manager.enabled = false;
        this._tracingContainer = cc.instantiate(this.tracingContainerPrefab);
        this._tracingContainer.scale = .75;
        this._wordTracingContainer.on(helper_1.CONFIG_LOADED, function() {
          _this.setAlphabetToDisplay(_this._letter);
          _this.loadSounds(_this._letter);
        });
      };
      SingleNumberTracing.prototype.loadSounds = function(text) {
        var _this = this;
        var isString = isNaN(Number(text));
        if (isString) {
          this.preloadSound(text.toLowerCase(), config_1.default.dir + helper_1.PHONIC_VOICE);
          null === this._sound && this.preloadSound(text.toLowerCase(), config_1.default.dir + helper_1.LETTER_VOICE);
          null === this._sound && this.preloadSound(text.toLowerCase(), config_1.default.dir + WORD_TRACING_SOUNDS);
        } else util_1.Util.loadNumericSound(text, function(clip) {
          _this._sound = clip;
        });
      };
      SingleNumberTracing.prototype.reset = function() {
        var traceGraphics = this._traceGraphics.getComponent(trace_graphics_1.default);
        traceGraphics.resetGraphics();
      };
      SingleNumberTracing.prototype.preloadSound = function(content, loadFrom) {
        var _this = this;
        var soundFile = loadFrom + content;
        cc.resources.load(soundFile, cc.AudioClip, function(err, clip) {
          err || null === clip || (_this._sound = clip);
        });
      };
      SingleNumberTracing.prototype.pronounce = function() {
        lessonController_1.default.getFriend().speak(this._sound);
      };
      SingleNumberTracing.prototype.setAlphabetToDisplay = function(letter) {
        var _this = this;
        this._tracingContainerComponent = this._tracingContainer.getComponent(tracing_container_1.default);
        this._tracingContainerComponent.tracingLetter = letter;
        this._tracingContainerComponent.traceGenerationMode = false;
        this.node.addChild(this._tracingContainer);
        null !== this._tracingScale ? this._tracingContainerComponent._traceGraphicsComponent.adjustedScale = this._tracingScale : this._tracingContainerComponent._traceGraphicsComponent.adjustedScale = exports.LETTER_SCALE;
        this._traceGraphics = this._tracingContainerComponent.traceGraphics;
        this._tracingContainer.setPosition(new cc.Vec2(exports.TRACE_NODE_POS_X, exports.TRACE_NODE_POS_Y));
        this.node.on("letterEnabledEvent", function(index, timeToEnable) {
          void 0 === timeToEnable && (timeToEnable = 0);
          _this._order === index && _this.scheduleOnce(function() {
            _this._traceGraphics.emit("enabledGraphics");
          }, timeToEnable);
        });
        this.node.width = this._tracingContainer.width;
      };
      SingleNumberTracing.prototype.onDestroy = function() {
        cc.audioEngine.stopAllEffects();
      };
      Object.defineProperty(SingleNumberTracing.prototype, "letter", {
        set: function(l) {
          this._letter = l;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SingleNumberTracing.prototype, "wordTracingContainer", {
        set: function(c) {
          this._wordTracingContainer = c;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SingleNumberTracing.prototype, "order", {
        get: function() {
          return this._order;
        },
        set: function(o) {
          this._order = o;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SingleNumberTracing.prototype, "tracingScale", {
        get: function() {
          return this._tracingScale;
        },
        set: function(n) {
          this._tracingScale = n;
        },
        enumerable: false,
        configurable: true
      });
      __decorate([ property(cc.Prefab) ], SingleNumberTracing.prototype, "tracingContainerPrefab", void 0);
      __decorate([ error_handler_1.default() ], SingleNumberTracing.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], SingleNumberTracing.prototype, "setAlphabetToDisplay", null);
      SingleNumberTracing = __decorate([ ccclass ], SingleNumberTracing);
      return SingleNumberTracing;
    }(cc.Component);
    exports.SingleNumberTracing = SingleNumberTracing;
    cc._RF.pop();
  }, {
    "../../../common/Tracing/scripts/trace-graphics": void 0,
    "../../../common/Tracing/scripts/tracing-container": void 0,
    "../../../common/scripts/helper": void 0,
    "../../../common/scripts/lessonController": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0
  } ],
  writeset: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9b9b8DQ5iFEVLfnKGfxdWGv", "writeset");
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
    exports.WriteSet = exports.TRACE_HEIGHT = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var Layout = cc.Layout;
    var config_1 = require("../../../common/scripts/lib/config");
    var util_1 = require("../../../common/scripts/util");
    var singlenumbertracing_1 = require("./singlenumbertracing");
    var helper_1 = require("../../../common/scripts/helper");
    var game_1 = require("../../../common/scripts/game");
    exports.TRACE_HEIGHT = 768;
    var BAT_SIZE_X = 176;
    var BAT_SIZE_Y = 30;
    var BALL_SIZE = 20;
    var LIMIT = 25;
    var SPACE = 10;
    var WriteSet = function(_super) {
      __extends(WriteSet, _super);
      function WriteSet() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.wordsPrefab = null;
        _this.animsPrefab = null;
        _this.singleLetterPrefab = null;
        _this.b1 = null;
        _this.b2 = null;
        _this._currentConfig = null;
        _this._numericTracingContainer = null;
        _this._words = null;
        _this._anims = null;
        _this._currentLetterIndex = 0;
        _this._shelf = null;
        _this._touchAllowedOnAnimLayout = false;
        return _this;
      }
      WriteSet.prototype.onLoad = function() {
        var _this = this;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        var writeBg = this.node.getChildByName("writeset_bg");
        !writeBg || (this._shelf = writeBg.getChildByName("writeset_shelf_main"));
        this._currentConfig = this.processConfiguration(config_1.default.getInstance().data[0]);
        if (null !== this._currentConfig) {
          this._words = cc.instantiate(this.wordsPrefab);
          this.node.addChild(this._words);
          this._anims = cc.instantiate(this.animsPrefab);
          this.node.addChild(this._anims);
          this._numericTracingContainer = this.node;
          this._numericTracingContainer.scale *= 1;
          this._speakCount = 0;
          this.buildNumbersWithGrid();
          this.subScribeToTracingEvents();
          this.node.emit(helper_1.CONFIG_LOADED);
          var equations_1 = Number(this._currentConfig.count) <= 100 ? [ this._currentConfig.count ] : [ String(Number(this._currentConfig.count) - Number(this._currentConfig.count) % 10), String(Number(this._currentConfig.count) % 10) ];
          Number(this._currentConfig.count) <= LIMIT && this.friend.node.setPosition(this.friend.node.position.x, this.friend.node.position.y - 600);
          util_1.Util.showHelp(null, null, function() {
            _this.friend.speakEquation(equations_1, function(index) {
              _this.emitLetterEnabledEvent(_this._layout.node.getChildByName(_this._originalLetterName + "0"), 0);
            });
          });
        }
      };
      WriteSet.prototype.createSprite = function(parent, count, index) {
        var sprite = count > LIMIT ? cc.instantiate(this.b2) : cc.instantiate(this.b1);
        sprite.scale = .75;
        parent.addChild(sprite);
      };
      WriteSet.prototype.buildLayout = function() {
        var _this = this;
        this._layout = this._words.getComponent(cc.Layout);
        this._layout.node.zIndex = 2;
        this._layout.spacingX = 125;
        this._layout.spacingY = 0;
        this._layout.resizeMode = Layout.ResizeMode.CONTAINER;
        this._words.scale = singlenumbertracing_1.LETTER_SCALE;
        this._characters.forEach(function(c, i) {
          var singleLetter = cc.instantiate(_this.singleLetterPrefab);
          singleLetter.height = exports.TRACE_HEIGHT;
          singleLetter.scale = 1.25;
          _this._originalLetterName = singleLetter.name;
          singleLetter.name = _this._originalLetterName + i;
          var singleLetterComponent = singleLetter.getComponent(singlenumbertracing_1.SingleNumberTracing);
          singleLetterComponent.tracingScale = .75;
          singleLetterComponent.wordTracingContainer = _this.node;
          singleLetterComponent.order = i;
          singleLetterComponent.letter = c;
          _this._layout.node.addChild(singleLetter);
          0 === i && (_this._currentLetterIndex = i);
        });
        this._layout.updateLayout();
      };
      WriteSet.prototype.buildGrid = function() {
        this._animLayout = this._anims.getComponent(cc.Layout);
        this._animLayout.node.zIndex = 1;
        this._animLayout.node.setPosition(new cc.Vec2(cc.winSize.width / 2, 0));
        this._animLayout.resizeMode = Layout.ResizeMode.CHILDREN;
        this.adjustLayout(Number(this._currentConfig.count));
        this._animLayout.updateLayout();
      };
      WriteSet.prototype.adjustLayout = function(howMany) {
        if (howMany <= LIMIT) {
          this._animLayout.spacingX = 0;
          this._animLayout.cellSize = new cc.Size(BAT_SIZE_X, BAT_SIZE_Y);
          var totalWidth = Math.floor(howMany / (SPACE / 2)) * BAT_SIZE_X + Math.floor(howMany / (SPACE / 2)) * SPACE + 1 * BAT_SIZE_X;
          this._anims.width = totalWidth;
          this._anims.height = BAT_SIZE_Y * SPACE / 2 + SPACE;
          this.generateSprites(howMany);
        } else {
          this._animLayout.cellSize = new cc.Size(BALL_SIZE, BALL_SIZE);
          this._animLayout.spacingX = SPACE;
          var totalWidth = Math.floor(howMany / SPACE) * BALL_SIZE + Math.floor(howMany / SPACE) * SPACE + 1 * BALL_SIZE;
          this._anims.width = totalWidth;
          this._anims.height = BALL_SIZE * SPACE + SPACE;
          this.generateSprites(howMany);
        }
      };
      WriteSet.prototype.buildNumbersWithGrid = function() {
        this.buildGrid();
        this.buildLayout();
        this._words.width = cc.winSize.width;
        this._words.height = cc.winSize.height / 2;
        !!this._shelf && Number(this._currentConfig.count) <= LIMIT && (this._shelf.width = this._shelf.width < this._layout.node.width ? this._layout.node.width : this._shelf.width);
        this._words.setPosition(new cc.Vec2(50, 25));
        this._anims.setPosition(new cc.Vec2(0, 250));
      };
      WriteSet.prototype.generateSprites = function(count) {
        for (var i = 0; i < count; i++) this.createSprite(this._animLayout.node, count, i + 1);
      };
      WriteSet.prototype.subScribeToTracingEvents = function() {
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
          var letterNode = _this._layout.node.getChildByName(_this._originalLetterName + _this._currentLetterIndex);
          var singleLetterTracing = letterNode.getComponent(singlenumbertracing_1.SingleNumberTracing);
          singleLetterTracing.reset();
        });
        this.node.on(helper_1.RESET_TRACING_ALLOWED, function() {
          null !== _this.node.getChildByName("reeetTracingButton") && (_this.node.getChildByName("reeetTracingButton").opacity = 255);
        });
        this.node.on(helper_1.RESET_TRACING_NOT_ALLOWED, function() {
          null !== _this.node.getChildByName("reeetTracingButton") && (_this.node.getChildByName("reeetTracingButton").opacity = 0);
        });
        null !== this.node.getChildByName("reeetTracingButton") && (this.node.getChildByName("reeetTracingButton").opacity = 0);
      };
      WriteSet.prototype.emitLetterEnabledEvent = function(fNode, index) {
        fNode.emit("letterEnabledEvent", index, 1);
      };
      WriteSet.prototype.tracingFinished = function() {
        this.pronounceAndTrigger();
      };
      WriteSet.prototype.individualLetterSound = function() {
        if (this._characters.length > 1) {
          var letterNode = this._layout.node.getChildByName(this._originalLetterName + (this._currentLetterIndex - 1));
          letterNode.getComponent(singlenumbertracing_1.SingleNumberTracing).pronounce();
        }
      };
      WriteSet.prototype.pronounceAndTrigger = function() {
        var _this = this;
        this._currentLetterIndex++;
        this.individualLetterSound();
        this._currentLetterIndex === this._characters.length ? this.scheduleOnce(function() {
          var equations = Number(_this._currentConfig.count) <= 100 ? [ _this._currentConfig.count ] : [ String(Number(_this._currentConfig.count) - Number(_this._currentConfig.count) % 10), String(Number(_this._currentConfig.count) % 10) ];
          util_1.Util.showHelp(null, null, function() {
            _this.friend.speakEquation(equations, function(index) {
              _this.emitLetterEnabledEvent(_this._layout.node.getChildByName(_this._originalLetterName + "0"), 0);
            });
          });
          _this.node.emit("nextProblem");
        }, 1) : this.emitLetterEnabledEvent(this._layout.node.getChildByName(this._originalLetterName + this._currentLetterIndex), this._currentLetterIndex);
      };
      WriteSet.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var level = configurations[0], workSheet = configurations[1], problemNo = configurations[2], count = configurations[3];
        this._characters = Array.from(count);
        return {
          level: level,
          workSheet: workSheet,
          problemNo: problemNo,
          count: count
        };
      };
      WriteSet.prototype.onDestroy = function() {
        cc.audioEngine.stopAllEffects();
      };
      WriteSet.prototype.updateSpeakCount = function() {
        this._speakCount++;
      };
      Object.defineProperty(WriteSet.prototype, "speakCount", {
        get: function() {
          return this._speakCount;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(WriteSet.prototype, "touchAllowedOnAnimLayout", {
        get: function() {
          return this._touchAllowedOnAnimLayout;
        },
        enumerable: false,
        configurable: true
      });
      __decorate([ property(cc.Prefab) ], WriteSet.prototype, "wordsPrefab", void 0);
      __decorate([ property(cc.Prefab) ], WriteSet.prototype, "animsPrefab", void 0);
      __decorate([ property(cc.Prefab) ], WriteSet.prototype, "singleLetterPrefab", void 0);
      __decorate([ property(cc.Prefab) ], WriteSet.prototype, "b1", void 0);
      __decorate([ property(cc.Prefab) ], WriteSet.prototype, "b2", void 0);
      WriteSet = __decorate([ ccclass ], WriteSet);
      return WriteSet;
    }(game_1.default);
    exports.WriteSet = WriteSet;
    cc._RF.pop();
  }, {
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/helper": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/util": void 0,
    "./singlenumbertracing": "singlenumbertracing"
  } ]
}, {}, [ "singlenumbertracing", "writeset" ]);