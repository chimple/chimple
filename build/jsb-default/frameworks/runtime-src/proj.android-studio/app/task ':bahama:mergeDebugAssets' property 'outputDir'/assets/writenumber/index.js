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
  anim: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c1a23/FDA5BXKhzdnCenA9q", "anim");
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
    exports.Anim = void 0;
    var ccclass = cc._decorator.ccclass;
    var util_1 = require("../../../common/scripts/util");
    var writenumber_1 = require("./writenumber");
    var Anim = function(_super) {
      __extends(Anim, _super);
      function Anim() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._position = null;
        _this._containerNode = null;
        _this._component = null;
        _this._movedToRightPos = false;
        _this._animRunning = false;
        _this._touchEnabled = false;
        return _this;
      }
      Anim.prototype.onLoad = function() {
        this.enableTouchHandlers();
        this.node.scale = 0;
        this._anim = this.node.getComponent(cc.Animation);
      };
      Anim.prototype.enableTouchHandlers = function() {
        this.node.on(util_1.TouchEvents.TOUCH_START, this.onTouchStart, this);
        this.node.on(util_1.TouchEvents.TOUCH_END, this.onTouchEnd, this);
      };
      Anim.prototype.disableTouchHandlers = function() {
        this.node.off(util_1.TouchEvents.TOUCH_START, this.onTouchStart, this);
        this.node.off(util_1.TouchEvents.TOUCH_END, this.onTouchEnd, this);
      };
      Anim.prototype.onTouchStart = function(touch) {
        if (this._component.touchAllowedOnAnimLayout && this._movedToRightPos && !this._touchEnabled) {
          this._touchEnabled = true;
          this._component.updateSpeakCount();
          this.animateOffScreen();
          this._component.friend.speakEquation([ String(this._component.speakCount) ], function(index) {});
        }
      };
      Anim.prototype.animateOffScreen = function() {
        var _this = this;
        var x = util_1.Util.randomBetween(0, .3 * cc.winSize.width);
        new cc.Tween().target(this.node).to(1, {
          opacity: 255,
          x: x,
          y: cc.winSize.width
        }, {
          progress: null,
          easing: "cubicOut"
        }).call(function() {
          _this.scheduleOnce(function() {
            _this._component.updateAnimationIndexCount();
          }, .1);
        }).start();
      };
      Anim.prototype.onTouchEnd = function(touch) {};
      Anim.prototype.animateToScreen = function() {
        var _this = this;
        this._animRunning = true;
        this._anim.play("fly1");
        new cc.Tween().target(this.node).to(1.5, {
          scaleX: -1,
          scaleY: 1,
          opacity: 255,
          x: this._position.x,
          y: this._position.y
        }, {
          progress: null,
          easing: "quadOut"
        }).call(function() {
          _this._movedToRightPos = true;
          _this._anim.stop();
          _this._animRunning = false;
        }).start();
      };
      Object.defineProperty(Anim.prototype, "containerNode", {
        set: function(c) {
          this._containerNode = c;
          this._component = this._containerNode.getComponent(writenumber_1.WriteNumber);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Anim.prototype, "position", {
        set: function(p) {
          this._position = p;
        },
        enumerable: false,
        configurable: true
      });
      Anim.prototype.update = function(dt) {
        if (this._component.touchAllowedOnAnimLayout && !this._animRunning) {
          this._animRunning = true;
          this._anim.play("fly1");
        }
      };
      Anim = __decorate([ ccclass ], Anim);
      return Anim;
    }(cc.Component);
    exports.Anim = Anim;
    cc._RF.pop();
  }, {
    "../../../common/scripts/util": void 0,
    "./writenumber": "writenumber"
  } ],
  writenumber: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c8092ykRKdHVY+mvluDmXHA", "writenumber");
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
    exports.WriteNumber = exports.NUMBER_TRACING_TEXTURE = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var Layout = cc.Layout;
    var config_1 = require("../../../common/scripts/lib/config");
    var util_1 = require("../../../common/scripts/util");
    var anim_1 = require("./anim");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var helper_1 = require("../../../common/scripts/helper");
    var singlelettertracing_1 = require("../../../common/Tracing/scripts/singlelettertracing");
    var game_1 = require("../../../common/scripts/game");
    var LETTER_SCALE = .95;
    var TRACE_HEIGHT = 768;
    var LENGTH_3 = 3;
    var LENGTH_2 = 2;
    var SPACING_1 = 660;
    var SPACING_2 = 465;
    var SPACING_3 = 400;
    var ADJ_1 = .4;
    var ADJ_2 = .4;
    exports.NUMBER_TRACING_TEXTURE = "games/writenumber/textures/";
    var WriteNumber = function(_super) {
      __extends(WriteNumber, _super);
      function WriteNumber() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.wordsPrefab = null;
        _this.animsPrefab = null;
        _this.progressMonitorPrefab = null;
        _this.singleLetterPrefab = null;
        _this.imageNode = null;
        _this._currentConfig = null;
        _this._numericTracingContainer = null;
        _this._sound = null;
        _this._words = null;
        _this._anims = null;
        _this._dog = null;
        _this._currentLetterIndex = 0;
        _this._touchAllowedOnAnimLayout = false;
        _this._shouldShowAnimSprite = true;
        _this._animationFinishIndex = 0;
        return _this;
      }
      WriteNumber.prototype.onLoad = function() {
        var _this = this;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this._shouldShowAnimSprite = true;
        if (this._shouldShowAnimSprite) {
          var friendY = this.friend.node.y;
          this.friend.node.y += cc.winSize.height;
          new cc.Tween().target(this.friend.node).to(.25, {
            y: friendY
          }, {
            progress: null,
            easing: "quadOut"
          }).call(function() {
            _this.friend.playAnimation("throw", 1);
            _this.scheduleOnce(function() {
              _this.buildAnimSprites();
              _this.scheduleOnce(function() {
                _this._words.opacity = 255;
                util_1.Util.showHelp(null, null);
              }, 2);
            }, .65);
          }).start();
        }
        this._currentConfig = this.processConfiguration(config_1.default.getInstance().data[0]);
        if (null !== this._currentConfig) {
          this._words = cc.instantiate(this.wordsPrefab);
          this.node.addChild(this._words);
          var adj = this._characters.length === LENGTH_3 ? ADJ_1 : ADJ_2;
          var diff = this._characters.length === LENGTH_3 ? SPACING_1 : this._characters.length === LENGTH_2 ? SPACING_2 : SPACING_3;
          this._words.setPosition(new cc.Vec2(adj * cc.winSize.width - diff, 100));
          this._anims = cc.instantiate(this.animsPrefab);
          this.node.addChild(this._anims);
          this._anims.setPosition(new cc.Vec2(-cc.winSize.width / 4, 0));
          this._anims.width = (1 - adj) * cc.winSize.width;
          this._anims.height = cc.winSize.height;
          this._numericTracingContainer = this.node;
          this._numericTracingContainer.scale *= 1;
          this.node.width = cc.winSize.width;
          this.node.height = cc.winSize.height;
          this._speakCount = 0;
          this._words.opacity = this._shouldShowAnimSprite ? 0 : 255;
          this.buildNumbers();
          this.subScribeToTracingEvents();
          this.node.emit(helper_1.CONFIG_LOADED);
          this.emitLetterEnabledEvent(this._layout.node.getChildByName(this._originalLetterName + "0"), 0);
          this.loadSounds(this._currentConfig.count);
        }
      };
      WriteNumber.prototype.createSprite = function(parent, pos) {
        var sprite = cc.instantiate(this.imageNode);
        sprite.setPosition(new cc.Vec2(850, 200));
        sprite.scale = 0;
        sprite.opacity = 255;
        var component = sprite.getComponent(anim_1.Anim);
        parent.addChild(sprite);
        component.containerNode = this.node;
        component.position = pos;
        component.animateToScreen();
      };
      WriteNumber.prototype.buildNumbers = function() {
        this.buildLayout();
      };
      WriteNumber.prototype.buildLayout = function() {
        var _this = this;
        this._layout = this._words.getComponent(cc.Layout);
        this._layout.node.zIndex = 2;
        this._layout.spacingX = 20;
        this._layout.spacingY = 0;
        this._layout.resizeMode = Layout.ResizeMode.CONTAINER;
        this._words.setPosition(new cc.Vec2(this._words.getPosition().x, this._words.getPosition().y - 50));
        this._words.scale = LETTER_SCALE;
        this._characters.forEach(function(c, i) {
          var singleLetter = cc.instantiate(_this.singleLetterPrefab);
          singleLetter.height = TRACE_HEIGHT;
          singleLetter.scale = 1.25;
          _this._originalLetterName = singleLetter.name;
          singleLetter.name = _this._originalLetterName + i;
          var singleLetterComponent = singleLetter.getComponent(singlelettertracing_1.SingleLetterTracing);
          singleLetterComponent.wordTracingContainer = _this.node;
          singleLetterComponent.order = i;
          singleLetterComponent.letter = c;
          _this._layout.node.addChild(singleLetter);
          0 === i && (_this._currentLetterIndex = i);
        });
        this._layout.updateLayout();
      };
      WriteNumber.prototype.buildAnimSprites = function() {
        this._animLayout = this._anims.getComponent(cc.Layout);
        this._animLayout.node.width = 425;
        this._animLayout.node.setPosition(new cc.Vec2(-512, -350));
        this._animLayout.type = Layout.Type.NONE;
        this._animLayout.resizeMode = Layout.ResizeMode.NONE;
        this._anims.scale = .85;
        this.generateAnimSprites(Number(this._currentConfig.count));
        this._animLayout.updateLayout();
      };
      WriteNumber.prototype.generateAnimSprites = function(howMany) {
        var rows = Math.ceil(howMany / 2);
        var columns = 2;
        var gapX = Math.floor(350 / howMany) + 25;
        var gapY = howMany < 3 ? 400 : Math.floor(800 / Math.ceil(.5 * howMany));
        for (var i = 0; i < howMany; i++) {
          var variationX = i % 2 === 0 ? 100 : 300;
          this.createSprite(this._animLayout.node, new cc.Vec2(variationX, gapY + gapY * Math.floor(i / 2)));
        }
      };
      WriteNumber.prototype.loadSounds = function(text) {
        var _this = this;
        util_1.Util.loadNumericSound(text, function(data) {
          _this._sound = data;
          _this.node.emit(helper_1.SOUND_LOADED_EVENT);
        });
      };
      WriteNumber.prototype.subScribeToTracingEvents = function() {
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
          var singleLetterTracing = letterNode.getComponent(singlelettertracing_1.SingleLetterTracing);
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
      WriteNumber.prototype.emitLetterEnabledEvent = function(fNode, index) {
        fNode.emit("letterEnabledEvent", index, 1);
      };
      WriteNumber.prototype.tracingFinished = function() {
        this.pronounceAndTrigger();
      };
      WriteNumber.prototype.individualLetterSound = function() {
        if (this._characters.length > 1) {
          var letterNode = this._layout.node.getChildByName(this._originalLetterName + (this._currentLetterIndex - 1));
          letterNode.getComponent(singlelettertracing_1.SingleLetterTracing).pronounce();
        }
      };
      WriteNumber.prototype.pronounceAndTrigger = function() {
        var _this = this;
        this._currentLetterIndex++;
        this.individualLetterSound();
        this._currentLetterIndex === this._characters.length ? this.scheduleOnce(function() {
          _this.friend.speak(_this._sound);
          _this.scheduleOnce(function() {
            _this._touchAllowedOnAnimLayout = true;
          }, .1);
        }, 1) : this.emitLetterEnabledEvent(this._layout.node.getChildByName(this._originalLetterName + this._currentLetterIndex), this._currentLetterIndex);
      };
      WriteNumber.prototype.processConfiguration = function(data) {
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
      WriteNumber.prototype.onDestroy = function() {
        cc.audioEngine.stopAllEffects();
      };
      WriteNumber.prototype.moveToNext = function() {
        this._animationFinishIndex === Number(this._currentConfig.count) && this._speakCount === Number(this._currentConfig.count) && this.node.emit("nextProblem");
      };
      WriteNumber.prototype.updateSpeakCount = function() {
        this._speakCount < Number(this._currentConfig.count) && this._speakCount++;
      };
      WriteNumber.prototype.updateAnimationIndexCount = function() {
        this._animationFinishIndex < Number(this._currentConfig.count) && this._animationFinishIndex++;
        this._animationFinishIndex === Number(this._currentConfig.count) && this.moveToNext();
      };
      Object.defineProperty(WriteNumber.prototype, "speakCount", {
        get: function() {
          return this._speakCount;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(WriteNumber.prototype, "touchAllowedOnAnimLayout", {
        get: function() {
          return this._touchAllowedOnAnimLayout;
        },
        enumerable: false,
        configurable: true
      });
      __decorate([ property(cc.Prefab) ], WriteNumber.prototype, "wordsPrefab", void 0);
      __decorate([ property(cc.Prefab) ], WriteNumber.prototype, "animsPrefab", void 0);
      __decorate([ property(cc.Prefab) ], WriteNumber.prototype, "progressMonitorPrefab", void 0);
      __decorate([ property(cc.Prefab) ], WriteNumber.prototype, "singleLetterPrefab", void 0);
      __decorate([ property(cc.Prefab) ], WriteNumber.prototype, "imageNode", void 0);
      __decorate([ error_handler_1.default() ], WriteNumber.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], WriteNumber.prototype, "createSprite", null);
      __decorate([ error_handler_1.default() ], WriteNumber.prototype, "buildNumbers", null);
      __decorate([ error_handler_1.default() ], WriteNumber.prototype, "buildLayout", null);
      __decorate([ error_handler_1.default() ], WriteNumber.prototype, "buildAnimSprites", null);
      __decorate([ error_handler_1.default() ], WriteNumber.prototype, "generateAnimSprites", null);
      __decorate([ error_handler_1.default() ], WriteNumber.prototype, "subScribeToTracingEvents", null);
      __decorate([ error_handler_1.default() ], WriteNumber.prototype, "emitLetterEnabledEvent", null);
      __decorate([ error_handler_1.default() ], WriteNumber.prototype, "tracingFinished", null);
      __decorate([ error_handler_1.default() ], WriteNumber.prototype, "individualLetterSound", null);
      __decorate([ error_handler_1.default() ], WriteNumber.prototype, "pronounceAndTrigger", null);
      WriteNumber = __decorate([ ccclass ], WriteNumber);
      return WriteNumber;
    }(game_1.default);
    exports.WriteNumber = WriteNumber;
    cc._RF.pop();
  }, {
    "../../../common/Tracing/scripts/singlelettertracing": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/helper": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./anim": "anim"
  } ]
}, {}, [ "anim", "writenumber" ]);