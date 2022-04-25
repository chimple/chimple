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
  CommonBlock: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "67f43WsyVpLZ7sWQJdjmnZ6", "CommonBlock");
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
    exports.DEFAULT_FONT_COLOR = void 0;
    var property = cc._decorator.property;
    var Overflow = cc.Label.Overflow;
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var chimple_label_1 = require("../../../common/scripts/chimple-label");
    exports.DEFAULT_FONT_COLOR = cc.Color.BLACK;
    var CommonBlock = function(_super) {
      __extends(CommonBlock, _super);
      function CommonBlock() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.slotSelectedPrefab = null;
        _this._contentText = null;
        _this._fontSize = null;
        _this._fontColor = null;
        _this._questionSound = null;
        _this.highlightNode = null;
        _this._isHighlightNodePresent = false;
        return _this;
      }
      Object.defineProperty(CommonBlock.prototype, "contentText", {
        get: function() {
          return this._contentText;
        },
        set: function(newVal) {
          this._contentText = newVal;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(CommonBlock.prototype, "fontSize", {
        get: function() {
          return this._fontSize;
        },
        set: function(newVal) {
          this._fontSize = newVal;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(CommonBlock.prototype, "fontColor", {
        get: function() {
          return this._fontColor;
        },
        set: function(newVal) {
          this._fontColor = newVal;
        },
        enumerable: false,
        configurable: true
      });
      CommonBlock.prototype.createLabelNode = function(textFont, text, fontSize, fontColor, showLabel) {
        void 0 === textFont && (textFont = null);
        void 0 === text && (text = "");
        void 0 === fontSize && (fontSize = "10");
        void 0 === fontColor && (fontColor = null);
        void 0 === showLabel && (showLabel = true);
        var qLabelNode = new cc.Node(text);
        var label = qLabelNode.addComponent(chimple_label_1.default);
        label.string = showLabel ? text : "";
        label.overflow = Overflow.NONE;
        var defaultFontColor = exports.DEFAULT_FONT_COLOR;
        !fontColor || (defaultFontColor = defaultFontColor.fromHEX(fontColor));
        qLabelNode.color = defaultFontColor;
        var outLine = qLabelNode.addComponent(cc.LabelOutline);
        outLine.width = 3;
        var fSize = parseInt(fontSize);
        label.fontSize = fSize;
        label.lineHeight = fSize;
        qLabelNode.position = new cc.Vec2(0, .1 * fSize);
        return qLabelNode;
      };
      CommonBlock.prototype.getRandom = function(min, max) {
        return Math.random() * (max - min) + min;
      };
      CommonBlock.prototype.addHighLightedNode = function() {
        if (!this._isHighlightNodePresent && !!this.highlightNode) {
          this._isHighlightNodePresent = true;
          this.highlightNode.width = this.node.width;
          this.highlightNode.height = this.node.height;
          this.node.addChild(this.highlightNode);
        }
      };
      CommonBlock.prototype.removeHighLightedNode = function() {
        if (this._isHighlightNodePresent && !!this.highlightNode) {
          this._isHighlightNodePresent = false;
          this.node.removeChild(this.highlightNode);
        }
      };
      __decorate([ property(cc.Prefab) ], CommonBlock.prototype, "slotSelectedPrefab", void 0);
      __decorate([ error_handler_1.default() ], CommonBlock.prototype, "createLabelNode", null);
      __decorate([ error_handler_1.default() ], CommonBlock.prototype, "addHighLightedNode", null);
      __decorate([ error_handler_1.default() ], CommonBlock.prototype, "removeHighLightedNode", null);
      return CommonBlock;
    }(cc.Component);
    exports.default = CommonBlock;
    cc._RF.pop();
  }, {
    "../../../common/scripts/chimple-label": void 0,
    "../../../common/scripts/lib/error-handler": void 0
  } ],
  answerblock: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "736a5xa/ABAMYiLpVMzh3hK", "answerblock");
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
    var CommonBlock_1 = require("./CommonBlock");
    var grid_1 = require("./grid");
    var wordblock_1 = require("./wordblock");
    var questionblock_1 = require("./questionblock");
    var util_1 = require("../../../common/scripts/util");
    var config_1 = require("../../../common/scripts/lib/config");
    var Vec2 = cc.Vec2;
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MIN_MATCH = 40;
    var AnswerBlock = function(_super) {
      __extends(AnswerBlock, _super);
      function AnswerBlock() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.originalPosition = new Vec2(0, 0);
        _this.finishPosition = new Vec2(0, 0);
        _this.matchRect = null;
        _this.match = false;
        _this.moved = false;
        _this._sound = null;
        _this._explode = null;
        _this._startPos = null;
        _this._isRTL = false;
        _this.shouldStopMovementX = false;
        _this.shouldStopMovementY = false;
        _this.wrongMoveAudio = null;
        _this.rightMoveAudio = null;
        _this.problemClear = null;
        _this.explodeParticle = null;
        _this.questionBlocksMap = new Map();
        return _this;
      }
      AnswerBlock.prototype.onLoad = function() {
        var _this = this;
        this.node.on(grid_1.TouchEvents.TOUCH_START, this.onTouchStart, this);
        this.node.on(grid_1.TouchEvents.TOUCH_END, this.onTouchEnd, this);
        this.node.on(grid_1.TouchEvents.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(grid_1.TouchEvents.TOUCH_CANCEL, this.onTouchEnd, this);
        this.fontColor = "#654321";
        var label = this.createLabelNode(null, this.contentText, this.fontSize, this.fontColor);
        this._isRTL = config_1.default.i.direction == config_1.Direction.RTL;
        if (this._isRTL) {
          this.node.scaleX *= -grid_1.SCALE;
          this.node.scaleY *= grid_1.SCALE;
        } else this.node.scale *= grid_1.SCALE;
        this.node.addChild(label);
        this.node.width = grid_1.Grid._maxNodeWidth;
        this.node.height = grid_1.Grid._maxNodeHeight;
        this.highlightNode = cc.instantiate(this.slotSelectedPrefab);
        util_1.Util.loadGameSound(this.contentText, function(clip) {
          _this._sound = clip;
        });
      };
      AnswerBlock.prototype.start = function() {
        var matchedPlaceHolderName = this.contentText + grid_1.PLACEHOLDER_PAIR;
        var ground = this.node.parent.getChildByName("ground");
        this.pairingPlaceHolderBlock = ground.getChildByName(matchedPlaceHolderName).getComponent(wordblock_1.default);
        var pairingPlaceHolderBlockBox = this.pairingPlaceHolderBlock.node.getBoundingBox();
        this.matchRect = cc.Rect.fromMinMax(cc.v2(pairingPlaceHolderBlockBox.x + MIN_MATCH, pairingPlaceHolderBlockBox.y + MIN_MATCH), cc.v2(pairingPlaceHolderBlockBox.x + pairingPlaceHolderBlockBox.width - MIN_MATCH, pairingPlaceHolderBlockBox.y + pairingPlaceHolderBlockBox.height - MIN_MATCH));
        this.finishPosition = this.pairingPlaceHolderBlock.node.position;
        var action = cc.moveTo(.3, this.originalPosition);
        this.node.runAction(action);
      };
      AnswerBlock.prototype.checkRTLAndScale = function(value) {
        return this._isRTL ? -value * grid_1.SCALE : value * grid_1.SCALE;
      };
      AnswerBlock.prototype.renderAnswerHolder = function(renderParams) {
        renderParams.yPositionAdj = 25;
        this.render(renderParams);
        if (!!renderParams.combinedQAndA) {
          var mapKey = renderParams.content;
          var questionBlocks_1 = [];
          renderParams.combinedQAndA.split("-").map(function(s) {
            questionBlocks_1.push(s);
          });
          this.questionBlocksMap.set(mapKey, questionBlocks_1);
        }
      };
      AnswerBlock.prototype.render = function(renderParams) {
        var x = renderParams.xPositions[renderParams.index];
        var y = -renderParams.groundHeight * grid_1.HALF + grid_1.HALF * grid_1.V_MARGIN;
        this.originalPosition = new Vec2(x, y);
        this.originalPosition.y += renderParams.yPositionAdj ? renderParams.yPositionAdj : 0;
        this.grid = renderParams.wordMatrix;
        this.fontSize = grid_1.FONT_SIZE;
        this.contentText = renderParams.content;
        this.node.setPosition(this.originalPosition.x, this.originalPosition.y);
        renderParams.parentNode.addChild(this.node);
      };
      AnswerBlock.prototype.onTouchStart = function(touch) {
        var _this = this;
        this.shouldStopMovementX = false;
        this.shouldStopMovementY = false;
        var nPos = this.node.getParent().convertToNodeSpaceAR(touch.getLocation());
        this._startPos = nPos;
        if (this.match) new cc.Tween().target(this.node).to(.1, {
          scaleX: this.checkRTLAndScale(1.1),
          scaleY: 1.1 * grid_1.SCALE
        }, {
          progress: null,
          easing: "sineOut"
        }).call(function() {
          _this.speak();
        }).start(); else {
          this.moved = false;
          new cc.Tween().target(this.node).to(.1, {
            scaleX: this.checkRTLAndScale(1.1),
            scaleY: 1.1 * grid_1.SCALE
          }, {
            progress: null,
            easing: "sineOut"
          }).call(function() {
            _this.speak();
          }).start();
        }
      };
      AnswerBlock.prototype.speak = function() {
        try {
          if (!this._sound) util_1.Util.speakGameAudioOrPhonics(this.contentText, function() {}); else {
            this._soundID = util_1.Util.play(this._sound, false);
            -1 === this._soundID && util_1.Util.speakGameAudioOrPhonics(this.contentText, function() {});
          }
        } catch (e) {}
      };
      AnswerBlock.prototype.onTouchMove = function(touch) {
        var _this = this;
        this.moved = true;
        var delta = new cc.Vec2(1 / grid_1.MATRIX_CONTAINER_SCALE * touch.getDelta().x, 1 / grid_1.MATRIX_CONTAINER_SCALE * touch.getDelta().y);
        this.node.setPosition(this.node.position.add(cc.v2(this._isRTL ? delta.neg().x : delta.x, delta.y)));
        if (this.node.getBoundingBox().intersects(this.matchRect)) {
          this.match = true;
          this.pairingPlaceHolderBlock.removeHighLightedNode();
          this.pairingPlaceHolderBlock.addHighLightedNode();
          var questions = this.questionBlocksMap.get(this.contentText);
          questions.forEach(function(q) {
            var ground = _this.node.parent.getChildByName("ground");
            var questionBlock = ground.getChildByName(q).getComponent(questionblock_1.default);
            questionBlock.addHighLightedNode();
          });
        } else {
          this.match = false;
          this.pairingPlaceHolderBlock.removeHighLightedNode();
          var questions = this.questionBlocksMap.get(this.contentText);
          questions.forEach(function(q) {
            var ground = _this.node.parent.getChildByName("ground");
            var questionBlock = ground.getChildByName(q).getComponent(questionblock_1.default);
            questionBlock.removeHighLightedNode();
          });
        }
        new cc.Tween().target(this.node).call(function() {
          cc.audioEngine.stopEffect(_this._sound);
        }).to(.15, {
          scaleX: this.checkRTLAndScale(1),
          scaleY: grid_1.SCALE
        }, {
          progress: null,
          easing: "sineOut"
        }).start();
      };
      AnswerBlock.prototype.shouldConsiderAsInvalidMove = function() {
        if (this.node.position.x > cc.winSize.width / 2 - 50) {
          this.node.position.x = cc.winSize.width / 2 - 50;
          this.shouldStopMovementX = true;
        } else if (this.node.position.x < -cc.winSize.width / 2 + 50) {
          this.node.position.x = -cc.winSize.width / 2 + 50;
          this.shouldStopMovementX = true;
        }
        if (this.node.position.y > cc.winSize.height / 2 - 50) {
          this.node.position.y = cc.winSize.height / 2 - 50;
          this.shouldStopMovementY = true;
        } else if (this.node.position.y < -cc.winSize.height / 2) {
          this.node.position.y = -cc.winSize.height / 2 + 50;
          this.shouldStopMovementY = true;
        }
      };
      AnswerBlock.prototype.onTouchEnd = function(touch) {
        var ePos = this.node.getParent().convertToNodeSpaceAR(touch.getLocation());
        var diff = ePos.sub(this._startPos);
        new cc.Tween().target(this.node).to(.15, {
          scaleX: this.checkRTLAndScale(1),
          scaleY: grid_1.SCALE
        }, {
          progress: null,
          easing: "sineOut"
        }).start();
        var needToLog = diff.magSqr() >= 50;
        if (this.match) this.matchFound(); else {
          this.match = false;
          this.matchNotFound(needToLog);
        }
      };
      AnswerBlock.prototype.matchFound = function() {
        var _this = this;
        this.match = true;
        this.node.off(grid_1.TouchEvents.TOUCH_MOVE);
        this.node.off(grid_1.TouchEvents.TOUCH_END);
        this.node.parent.emit("correct");
        this.moveToPos(this.finishPosition).call(function() {
          _this.removeHighLightedNode();
          _this.sparkle();
          !_this.rightMoveAudio || util_1.Util.playSfx(_this.rightMoveAudio);
          _this.grid.scheduleOnce(function() {
            _this.unSparkle();
            _this.grid.wordMatched(_this.contentText);
          }, .5);
          var questions = _this.questionBlocksMap.get(_this.contentText);
          questions.forEach(function(q) {
            var ground = _this.node.parent.getChildByName("ground");
            var questionBlock = ground.getChildByName(q).getComponent(questionblock_1.default);
            questionBlock.removeHighLightedNode();
          });
          _this.moved = false;
        }).start();
      };
      AnswerBlock.prototype.matchNotFound = function(needToLog) {
        var _this = this;
        this.moveToPos(this.originalPosition).call(function() {
          if (_this.moved && needToLog) {
            !_this.wrongMoveAudio || util_1.Util.playSfx(_this.wrongMoveAudio);
            _this.node.parent.emit("wrong");
            _this.moved = false;
          }
        }).start();
      };
      AnswerBlock.prototype.moveToPos = function(pos) {
        return new cc.Tween().target(this.node).to(.15, {
          position: pos,
          scaleX: this.checkRTLAndScale(1),
          scaleY: grid_1.SCALE
        }, {
          progress: null,
          easing: "quadOut"
        });
      };
      AnswerBlock.prototype.onDestroy = function() {
        cc.audioEngine.stopAllEffects();
      };
      AnswerBlock.prototype.sparkle = function() {
        this._explode = cc.instantiate(this.explodeParticle);
        this._explode.position = this.node.position;
        this.node.parent.addChild(this._explode);
      };
      AnswerBlock.prototype.unSparkle = function() {
        if (null != this._explode) {
          this.node.removeChild(this._explode);
          this._explode = null;
        }
      };
      AnswerBlock.prototype.update = function(dt) {
        this.shouldConsiderAsInvalidMove();
        (this.shouldStopMovementX || this.shouldStopMovementY) && this.matchNotFound(false);
      };
      __decorate([ property({
        type: cc.AudioClip
      }) ], AnswerBlock.prototype, "wrongMoveAudio", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], AnswerBlock.prototype, "rightMoveAudio", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], AnswerBlock.prototype, "problemClear", void 0);
      __decorate([ property(cc.Prefab) ], AnswerBlock.prototype, "explodeParticle", void 0);
      __decorate([ error_handler_1.default() ], AnswerBlock.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], AnswerBlock.prototype, "start", null);
      __decorate([ error_handler_1.default() ], AnswerBlock.prototype, "checkRTLAndScale", null);
      __decorate([ error_handler_1.default() ], AnswerBlock.prototype, "renderAnswerHolder", null);
      __decorate([ error_handler_1.default() ], AnswerBlock.prototype, "render", null);
      __decorate([ error_handler_1.default() ], AnswerBlock.prototype, "onTouchStart", null);
      __decorate([ error_handler_1.default() ], AnswerBlock.prototype, "speak", null);
      __decorate([ error_handler_1.default() ], AnswerBlock.prototype, "onTouchMove", null);
      __decorate([ error_handler_1.default() ], AnswerBlock.prototype, "onTouchEnd", null);
      __decorate([ error_handler_1.default() ], AnswerBlock.prototype, "matchFound", null);
      __decorate([ error_handler_1.default() ], AnswerBlock.prototype, "matchNotFound", null);
      __decorate([ error_handler_1.default() ], AnswerBlock.prototype, "moveToPos", null);
      __decorate([ error_handler_1.default() ], AnswerBlock.prototype, "sparkle", null);
      __decorate([ error_handler_1.default() ], AnswerBlock.prototype, "unSparkle", null);
      AnswerBlock = __decorate([ ccclass ], AnswerBlock);
      return AnswerBlock;
    }(CommonBlock_1.default);
    exports.default = AnswerBlock;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./CommonBlock": "CommonBlock",
    "./grid": "grid",
    "./questionblock": "questionblock",
    "./wordblock": "wordblock"
  } ],
  grid: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3ca74VIctlE4JZY6uSw5DYe", "grid");
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
    exports.Grid = exports.TouchEvents = exports.BLOCK_TYPE = exports.PLACEHOLDER_PAIR = exports.FONT_SIZE = exports.HALF = exports.SCALE = exports.MATRIX_CONTAINER_SCALE = exports.V_MARGIN = exports.H_MARGIN = exports.H_GAP = exports.V_GAP = exports.GAME_SOUND = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var config_1 = require("../../../common/scripts/lib/config");
    var answerblock_1 = require("./answerblock");
    var wordblock_1 = require("./wordblock");
    var Vec2 = cc.Vec2;
    var questionblock_1 = require("./questionblock");
    var util_1 = require("../../../common/scripts/util");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var game_1 = require("../../../common/scripts/game");
    exports.GAME_SOUND = "games/grid/sound/";
    exports.V_GAP = 18;
    exports.H_GAP = 20;
    exports.H_MARGIN = 50;
    exports.V_MARGIN = 30;
    exports.MATRIX_CONTAINER_SCALE = 1;
    exports.SCALE = 1;
    exports.HALF = .5;
    exports.FONT_SIZE = "65";
    exports.PLACEHOLDER_PAIR = "-PAIR";
    var BLOCK_TYPE;
    (function(BLOCK_TYPE) {
      BLOCK_TYPE[BLOCK_TYPE["H_QUESTION"] = 0] = "H_QUESTION";
      BLOCK_TYPE[BLOCK_TYPE["V_QUESTION"] = 1] = "V_QUESTION";
      BLOCK_TYPE[BLOCK_TYPE["ANSWER"] = 2] = "ANSWER";
      BLOCK_TYPE[BLOCK_TYPE["PLACEHOLDER"] = 3] = "PLACEHOLDER";
    })(BLOCK_TYPE = exports.BLOCK_TYPE || (exports.BLOCK_TYPE = {}));
    var TouchEvents;
    (function(TouchEvents) {
      TouchEvents["TOUCH_START"] = "touchstart";
      TouchEvents["TOUCH_END"] = "touchend";
      TouchEvents["TOUCH_MOVE"] = "touchmove";
      TouchEvents["TOUCH_CANCEL"] = "touchCancel";
    })(TouchEvents = exports.TouchEvents || (exports.TouchEvents = {}));
    var Grid = function(_super) {
      __extends(Grid, _super);
      function Grid() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.groundPrefab = null;
        _this.questionBlockPrefab = null;
        _this.answerBlockPrefab = null;
        _this.wordBlockPrefab = null;
        _this.gameLoadAudio = null;
        _this.currentConfig = null;
        _this._remainingAnswers = [];
        _this._matchedCounterInCurrentRun = 0;
        _this._helpDragNode = null;
        _this._helpDropNode = null;
        _this._isRTL = false;
        return _this;
      }
      Grid_1 = Grid;
      Grid.prototype.onLoad = function() {
        var _this = this;
        Grid_1._horizontalPositions = [];
        Grid_1._verticalPositions = [];
        this.currentConfig = this.processConfiguration(config_1.default.getInstance().data[0]);
        this._isRTL = config_1.default.i.direction == config_1.Direction.RTL;
        util_1.Util.playSfx(this.gameLoadAudio);
        if (null !== this.currentConfig) {
          this.matrixContainer = this.node;
          if (this._isRTL) {
            this.matrixContainer.scaleX *= -exports.MATRIX_CONTAINER_SCALE;
            this.matrixContainer.scaleY *= exports.MATRIX_CONTAINER_SCALE;
          } else this.matrixContainer.scale *= exports.MATRIX_CONTAINER_SCALE;
          this.currentConfig.horizontalProblem = this.currentConfig.horizontalProblem;
          this.currentConfig.verticalProblem = this.shuffle(this.currentConfig.verticalProblem);
          this.buildGround();
          this.renderWordMatrix(this.mapToWordMatrixElements(this.currentConfig.horizontalProblem), this.questionBlockPrefab, BLOCK_TYPE.H_QUESTION);
          this.renderWordMatrix(this.mapToWordMatrixElements(this.currentConfig.verticalProblem), this.questionBlockPrefab, BLOCK_TYPE.V_QUESTION);
          this.buildAnswersAndPlaceHolders(this.currentConfig.horizontalProblem, this.currentConfig.verticalProblem, this.currentConfig.aHorizontalProblem);
          this.scheduleOnce(function() {
            util_1.Util.showHelp(_this._helpDragNode, _this._helpDropNode);
          }, .5);
        }
      };
      Grid.prototype.mapToWordMatrixElements = function(strs) {
        return strs.map(function(s) {
          return {
            text: s
          };
        });
      };
      Grid.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var level = configurations[0], workSheet = configurations[1], problemNo = configurations[2], verticalProblemStr = configurations[3], horizontalProblemStr = configurations[4], aHorizontalProblemStr = configurations[5];
        var ahorizontalProblemStr = aHorizontalProblemStr || horizontalProblemStr;
        return {
          level: level,
          workSheet: workSheet,
          problemNo: problemNo,
          verticalProblem: this.shuffle(verticalProblemStr.split(",")),
          horizontalProblem: horizontalProblemStr.split(","),
          aHorizontalProblem: ahorizontalProblemStr.split(",")
        };
      };
      Grid.prototype.getRandom = function(min, max) {
        return Math.random() * (max - min) + min;
      };
      Grid.prototype.buildGround = function() {
        var horizontalWordsCount = this.currentConfig.horizontalProblem.length;
        var verticalWordsCount = this.currentConfig.verticalProblem.length;
        var lh = this.currentConfig.horizontalProblem.reduce(function(a, b) {
          return a.length > b.length ? a : b;
        });
        var lv = this.currentConfig.verticalProblem.reduce(function(a, b) {
          return a.length > b.length ? a : b;
        });
        var tNode = cc.instantiate(this.questionBlockPrefab);
        var questionBlockComponent = tNode.getComponent(questionblock_1.default);
        var fontColor = "#654321";
        var labelNode = questionBlockComponent.createLabelNode(questionBlockComponent.textFont, String(verticalWordsCount * Number(lh) + horizontalWordsCount * Number(lv)), exports.FONT_SIZE, fontColor);
        if (this._isRTL) {
          labelNode.scaleX = -exports.SCALE;
          labelNode.scaleY = exports.SCALE;
        } else labelNode.scale = exports.SCALE;
        Grid_1._maxNodeWidth = labelNode.getBoundingBox().width + 2.25 * exports.H_MARGIN;
        Grid_1._maxNodeHeight = labelNode.getBoundingBox().height + 1.5 * exports.V_MARGIN;
        this._ground = cc.instantiate(this.groundPrefab);
        var groundWidth = 10 * exports.V_MARGIN + Grid_1._maxNodeWidth + horizontalWordsCount * Grid_1._maxNodeWidth;
        var groundHeight = 15 * exports.V_MARGIN + Grid_1._maxNodeHeight + verticalWordsCount * Grid_1._maxNodeHeight;
        this.ground.setContentSize(new cc.Size(groundWidth, groundHeight));
        this.ground.width = groundWidth;
        this.ground.height = groundHeight;
        this.matrixContainer.addChild(this.ground);
      };
      Grid.prototype.renderWordMatrix = function(choices, prefab, blockType) {
        var _this = this;
        var length = choices.length;
        choices.forEach(function(choice, index) {
          var ch = JSON.parse(JSON.stringify(choice));
          var node = cc.instantiate(prefab);
          switch (blockType) {
           case BLOCK_TYPE.H_QUESTION:
           case BLOCK_TYPE.V_QUESTION:
            var questionBlockComponent = node.getComponent(questionblock_1.default);
            var renderParams = {
              wordMatrix: _this,
              parentNode: _this.ground,
              content: ch.text,
              blockType: blockType,
              index: index,
              totalBlocks: length
            };
            questionBlockComponent.render(renderParams);
            break;

           case BLOCK_TYPE.ANSWER:
            var answerBlockComponent = node.getComponent(answerblock_1.default);
            var renderParamsAnswer = {
              wordMatrix: _this,
              parentNode: _this.matrixContainer,
              content: ch.text,
              combinedQAndA: ch.questionRelatedText,
              blockType: blockType,
              index: index,
              totalBlocks: length,
              xPositions: ch.xPositions,
              groundHeight: _this.ground.getBoundingBox().height
            };
            answerBlockComponent.renderAnswerHolder(renderParamsAnswer);
            0 === index && (_this._helpDragNode = node);
            break;

           case BLOCK_TYPE.PLACEHOLDER:
            var component = node.getComponent(wordblock_1.default);
            var renderParamsPlaceHolder = {
              wordMatrix: _this,
              parentNode: _this.ground,
              content: ch.placeHolderText,
              blockType: blockType,
              index: index,
              totalBlocks: length,
              position: ch.placeHolderPosition
            };
            component.render(renderParamsPlaceHolder);
            0 === index && (_this._helpDropNode = node);
          }
        });
      };
      Grid.prototype.flattenDeep = function(arr) {
        var _this = this;
        return arr.reduce(function(acc, val) {
          return Array.isArray(val) ? acc.concat(_this.flattenDeep(val)) : acc.concat(val);
        }, []);
      };
      Grid.prototype.buildAnswersAndPlaceHolders = function(horizontalConfigs, verticalConfigs, aHorizontalConfigs) {
        this._remainingAnswers = this.computeAnswers(horizontalConfigs, verticalConfigs, aHorizontalConfigs);
        this.renderWordMatrix(this._remainingAnswers, this.wordBlockPrefab, BLOCK_TYPE.PLACEHOLDER);
        this.renderWordMatrix(this.slices(this._remainingAnswers, horizontalConfigs.length), this.answerBlockPrefab, BLOCK_TYPE.ANSWER);
      };
      Grid.prototype.computeAnswers = function(horizontalConfigs, verticalConfigs, aHorizontalConfigs) {
        console.log("horizontalConfigs", horizontalConfigs);
        console.log("aHorizontalConfigs", aHorizontalConfigs);
        var wordMatrixElements = this.flattenDeep(verticalConfigs.map(function(vText, y) {
          return horizontalConfigs.map(function(hText, x) {
            return {
              text: vText + aHorizontalConfigs[x],
              placeHolderPosition: new Vec2(Grid_1._horizontalPositions[x], Grid_1._verticalPositions[y]),
              placeHolderText: vText + aHorizontalConfigs[x] + exports.PLACEHOLDER_PAIR,
              questionRelatedText: vText + "-" + hText,
              xPositions: Array.from(new Set(Grid_1._horizontalPositions))
            };
          });
        }));
        return this.shuffle(wordMatrixElements);
      };
      Grid.prototype.slices = function(answers, sliceLength) {
        this._matchedCounterInCurrentRun = 0;
        return answers.slice(0, sliceLength);
      };
      Grid.prototype.shuffle = function(arr) {
        var ctr = arr.length;
        var temp;
        var index;
        while (ctr > 0) {
          index = Math.floor(Math.random() * ctr);
          ctr--;
          temp = arr[ctr];
          arr[ctr] = arr[index];
          arr[index] = temp;
        }
        return arr;
      };
      Grid.addToHorizontalPositions = function(x) {
        Grid_1._horizontalPositions.push(x);
      };
      Grid.addToVerticalPositions = function(y) {
        Grid_1._verticalPositions.push(y);
      };
      Object.defineProperty(Grid.prototype, "ground", {
        get: function() {
          return this._ground;
        },
        enumerable: false,
        configurable: true
      });
      Grid.prototype.wordMatched = function(word) {
        this._matchedCounterInCurrentRun++;
        this._remainingAnswers = this._remainingAnswers.filter(function(a) {
          return a.text !== word;
        });
        this._remainingAnswers.length <= 0 ? this.node.emit("nextProblem") : this._matchedCounterInCurrentRun === this.currentConfig.horizontalProblem.length && this.renderWordMatrix(this.slices(this._remainingAnswers, this.currentConfig.horizontalProblem.length), this.answerBlockPrefab, BLOCK_TYPE.ANSWER);
      };
      Grid.prototype.playGameSound = function(nameOfSound) {
        var _this = this;
        util_1.Util.loadGameSound(nameOfSound, function(clip) {
          _this.friend.speak(clip);
        });
      };
      var Grid_1;
      Grid._maxNodeWidth = 0;
      Grid._maxNodeHeight = 0;
      Grid._horizontalPositions = [];
      Grid._verticalPositions = [];
      __decorate([ property(cc.Prefab) ], Grid.prototype, "groundPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Grid.prototype, "questionBlockPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Grid.prototype, "answerBlockPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Grid.prototype, "wordBlockPrefab", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], Grid.prototype, "gameLoadAudio", void 0);
      __decorate([ error_handler_1.default() ], Grid.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], Grid.prototype, "mapToWordMatrixElements", null);
      __decorate([ error_handler_1.default() ], Grid.prototype, "buildGround", null);
      __decorate([ error_handler_1.default() ], Grid.prototype, "renderWordMatrix", null);
      __decorate([ error_handler_1.default() ], Grid.prototype, "buildAnswersAndPlaceHolders", null);
      __decorate([ error_handler_1.default() ], Grid.prototype, "computeAnswers", null);
      __decorate([ error_handler_1.default() ], Grid.prototype, "slices", null);
      __decorate([ error_handler_1.default() ], Grid.prototype, "wordMatched", null);
      __decorate([ error_handler_1.default() ], Grid.prototype, "playGameSound", null);
      Grid = Grid_1 = __decorate([ ccclass ], Grid);
      return Grid;
    }(game_1.default);
    exports.Grid = Grid;
    cc._RF.pop();
  }, {
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./answerblock": "answerblock",
    "./questionblock": "questionblock",
    "./wordblock": "wordblock"
  } ],
  ground: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "16f0fFVfwRFAojrnIPvN0ch", "ground");
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Ground = function(_super) {
      __extends(Ground, _super);
      function Ground() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Ground = __decorate([ ccclass ], Ground);
      return Ground;
    }(cc.Component);
    exports.default = Ground;
    cc._RF.pop();
  }, {} ],
  questionblock: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fec20HTyIZFwZJfUjwQdlER", "questionblock");
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
    var CommonBlock_1 = require("./CommonBlock");
    var grid_1 = require("./grid");
    var property = cc._decorator.property;
    var config_1 = require("../../../common/scripts/lib/config");
    var util_1 = require("../../../common/scripts/util");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var lessonController_1 = require("../../../common/scripts/lessonController");
    var ccclass = cc._decorator.ccclass;
    var QuestionBlock = function(_super) {
      __extends(QuestionBlock, _super);
      function QuestionBlock() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.slotSelectedPrefab = null;
        _this.highlightNode = null;
        _this._isHighlightNodePresent = false;
        _this._sound = null;
        _this._isRTL = false;
        return _this;
      }
      QuestionBlock.prototype.onLoad = function() {
        var _this = this;
        this.node.on(grid_1.TouchEvents.TOUCH_START, this.onTouchStart, this);
        this.node.on(grid_1.TouchEvents.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(grid_1.TouchEvents.TOUCH_END, this.onTouchEnd, this);
        this.node.on(grid_1.TouchEvents.TOUCH_CANCEL, this.onTouchEnd, this);
        this.fontColor = "#654321";
        var label = this.createLabelNode(this.textFont, this.contentText, this.fontSize, this.fontColor);
        this.node.addChild(label);
        this.highlightNode = cc.instantiate(this.slotSelectedPrefab);
        this._isRTL = config_1.default.i.direction == config_1.Direction.RTL;
        util_1.Util.loadGameSound(this.contentText, function(clip) {
          _this._sound = clip;
        });
        this._isRTL && (this.node.scaleX = -1);
      };
      QuestionBlock.prototype.onTouchMove = function(touch) {
        var location = touch.getLocation();
        var nodeSpaceLocation = this.node.getParent().convertToNodeSpaceAR(location);
        this.node.getBoundingBox().contains(nodeSpaceLocation) || this.touchEnded();
      };
      QuestionBlock.prototype.onTouchStart = function(touch) {
        var _this = this;
        new cc.Tween().target(this.node).call(function() {
          _this.addHighLightedNode();
          _this.speak();
        }).to(.15, {
          scaleX: this.checkRTLAndScale(1.1),
          scaleY: 1.1 * grid_1.SCALE
        }, {
          progress: null,
          easing: "sineOut"
        }).start();
      };
      QuestionBlock.prototype.speak = function() {
        lessonController_1.default.getFriend().speakGameAudioOrPhonics(this.contentText, function() {});
      };
      QuestionBlock.prototype.onTouchEnd = function(touch) {
        this.touchEnded();
      };
      QuestionBlock.prototype.touchEnded = function() {
        var _this = this;
        new cc.Tween().target(this.node).to(.15, {
          scaleX: this.checkRTLAndScale(1.1),
          scaleY: 1.1 * grid_1.SCALE
        }, {
          progress: null,
          easing: "sineOut"
        }).call(function() {
          _this.removeHighLightedNode();
        }).start();
      };
      QuestionBlock.prototype.checkRTLAndScale = function(value) {
        return value * grid_1.SCALE * (this._isRTL ? -1 : 1);
      };
      QuestionBlock.prototype.render = function(renderParams) {
        this.node.name = renderParams.content;
        this.contentText = renderParams.content;
        this.node.width = grid_1.Grid._maxNodeWidth;
        this.node.height = grid_1.Grid._maxNodeHeight;
        this.fontSize = grid_1.FONT_SIZE;
        this.node.scale *= grid_1.SCALE;
        var x, y = 0;
        switch (renderParams.blockType) {
         case grid_1.BLOCK_TYPE.H_QUESTION:
          var fraction = parseFloat(((renderParams.index + 1) / (renderParams.totalBlocks + 1)).toFixed(2));
          x = renderParams.parentNode.getBoundingBox().width * (this.node.anchorX - fraction) + .5 * this.node.getBoundingBox().width;
          y = renderParams.parentNode.getBoundingBox().height * grid_1.HALF - 2.35 * grid_1.V_MARGIN;
          this.node.setPosition(x, y);
          grid_1.Grid.addToHorizontalPositions(x);
          break;

         case grid_1.BLOCK_TYPE.V_QUESTION:
          this.node.width -= grid_1.H_MARGIN;
          var fraction = parseFloat(((renderParams.index + 1) / (renderParams.totalBlocks + 1)).toFixed(2));
          x = renderParams.parentNode.getBoundingBox().x + this.node.getBoundingBox().width * grid_1.HALF + grid_1.H_MARGIN;
          y = renderParams.parentNode.getBoundingBox().height * (this.node.anchorY - fraction) - .7 * this.node.getBoundingBox().height;
          this.node.setPosition(x, y);
          grid_1.Grid.addToVerticalPositions(y);
        }
        renderParams.parentNode.addChild(this.node);
      };
      QuestionBlock.prototype.onDestroy = function() {
        cc.audioEngine.stopAllEffects();
      };
      __decorate([ property(cc.Prefab) ], QuestionBlock.prototype, "slotSelectedPrefab", void 0);
      __decorate([ error_handler_1.default() ], QuestionBlock.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], QuestionBlock.prototype, "speak", null);
      __decorate([ error_handler_1.default() ], QuestionBlock.prototype, "checkRTLAndScale", null);
      __decorate([ error_handler_1.default() ], QuestionBlock.prototype, "render", null);
      QuestionBlock = __decorate([ ccclass ], QuestionBlock);
      return QuestionBlock;
    }(CommonBlock_1.default);
    exports.default = QuestionBlock;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lessonController": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./CommonBlock": "CommonBlock",
    "./grid": "grid"
  } ],
  wordblock: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "838aexRwfVPA6gdgGhMuC9w", "wordblock");
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
    var CommonBlock_1 = require("./CommonBlock");
    var grid_1 = require("./grid");
    var config_1 = require("../../../common/scripts/lib/config");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WordBlock = function(_super) {
      __extends(WordBlock, _super);
      function WordBlock() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      WordBlock.prototype.onLoad = function() {
        this.fontColor = "#654321";
        var label = this.createLabelNode(null, this.contentText, this.fontSize, this.fontColor, false);
        this.node.addChild(label);
        this.node.width = grid_1.Grid._maxNodeWidth + grid_1.H_GAP;
        this.node.height = grid_1.Grid._maxNodeHeight + grid_1.V_GAP;
        this.highlightNode = cc.instantiate(this.slotSelectedPrefab);
        config_1.default.i.direction == config_1.Direction.RTL && (this.node.scaleX = -1);
      };
      WordBlock.prototype.render = function(renderParams) {
        this.fontSize = grid_1.FONT_SIZE;
        this.node.name = renderParams.content;
        this.contentText = renderParams.content;
        this.node.setPosition(renderParams.position.x, renderParams.position.y);
        renderParams.parentNode.addChild(this.node);
        config_1.default.i.direction == config_1.Direction.RTL && (this.node.scaleX = -1);
      };
      __decorate([ error_handler_1.default() ], WordBlock.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], WordBlock.prototype, "render", null);
      WordBlock = __decorate([ ccclass ], WordBlock);
      return WordBlock;
    }(CommonBlock_1.default);
    exports.default = WordBlock;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "./CommonBlock": "CommonBlock",
    "./grid": "grid"
  } ]
}, {}, [ "CommonBlock", "answerblock", "grid", "ground", "questionblock", "wordblock" ]);