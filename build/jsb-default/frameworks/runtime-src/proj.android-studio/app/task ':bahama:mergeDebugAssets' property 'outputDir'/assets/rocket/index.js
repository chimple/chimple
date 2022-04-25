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
  rocket: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "036ebjj6pxHQ5T08XFmxWQH", "rocket");
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
    exports.STICK_CHOICE_WRONG = exports.STICK_CHOICE_CORRECT = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var BoxCollider = cc.BoxCollider;
    var Layout = cc.Layout;
    var config_1 = require("../../../common/scripts/lib/config");
    var util_1 = require("../../../common/scripts/util");
    var drag_1 = require("../../../common/scripts/drag");
    var sticker_choice_1 = require("./sticker-choice");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var Utility_1 = require("../../../common/scripts/Utility");
    var game_1 = require("../../../common/scripts/game");
    var MAX_CHOICE_IN_ROW = 13;
    exports.STICK_CHOICE_CORRECT = "stickChoiceCorrect";
    exports.STICK_CHOICE_WRONG = "stickChoiceWrong";
    var Rocket = function(_super) {
      __extends(Rocket, _super);
      function Rocket() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._currentConfig = null;
        _this.wordNoteBoardPrefab = null;
        _this.dropContainerPrefab = null;
        _this.choiceContainerPrefab = null;
        _this.choiceContainerOneRowPrefab = null;
        _this.rocketheadPrefab = null;
        _this.rockettailPrefab = null;
        _this.stickerPrefab = null;
        _this.stickerDropPrefab = null;
        _this.soundBtnPrefab = null;
        _this.imageNodePrefab = null;
        _this._wordNoteBoard = null;
        _this._dropLayout = null;
        _this._loadedTexture = null;
        _this._totalDrops = 0;
        _this._rocketHead = null;
        _this._rocketTail = null;
        _this._dropContainer = null;
        _this._mWord = [];
        _this._choiceContainers = [];
        _this._helpDragNode = null;
        _this._helpDropNode = null;
        _this._helpWord = null;
        _this._isRTL = false;
        return _this;
      }
      Rocket.prototype.onLoad = function() {
        this._isRTL = config_1.default.i.direction == config_1.Direction.RTL;
        cc.director.getCollisionManager().enabled = true;
        drag_1.default.letDrag = true;
        this._currentConfig = this.processConfiguration(config_1.default.getInstance().data[0]);
        var bt = new Date();
        this.buildUI();
        util_1.Util.computeTimeDiff("wordnote buildUI", bt);
      };
      Rocket.prototype.buildUI = function() {
        var _this = this;
        this.buildWordNoteBoard();
        this.buildDropContainer();
        this._mWord = this.diff(this._currentConfig.card, this._currentConfig.activeCard);
        if ("true" === this._currentConfig.fullboard || "true" === this._currentConfig.partialboard) for (var i = 1; i <= 2; i++) {
          var c = this.buildChoiceContainerSingleRow(i);
          this._choiceContainers.push(c);
        } else {
          var c = this.buildChoiceContainer(1);
          this._choiceContainers.push(c);
        }
        try {
          util_1.Util.loadGameSound(this._currentConfig.sound, function(clip) {
            _this.friend.extraClip = clip;
          });
        } catch (e) {}
        this.node.on(exports.STICK_CHOICE_CORRECT, this.stickCorrect.bind(this));
        this.node.on(exports.STICK_CHOICE_WRONG, this.stickWrong.bind(this));
        this.scheduleOnce(function() {
          _this._choiceContainers.forEach(function(c) {
            return c.opacity = 255;
          });
        }, .1);
        this.scheduleOnce(function() {
          util_1.Util.showHelp(_this._helpDragNode, _this._helpDropNode);
        }, .5);
      };
      Rocket.prototype.loadTexture = function() {
        var _this = this;
        util_1.Util.loadTexture(this._currentConfig.image, function(texture) {
          _this.showImage(texture);
        });
      };
      Rocket.prototype.showImage = function(texture) {
        var image = this._wordNoteBoard.getChildByName("imageNode");
        var sprite = image.getComponent(cc.Sprite);
        sprite.spriteFrame = new cc.SpriteFrame(texture);
        util_1.Util.resizeSprite(sprite, 160, 160);
      };
      Rocket.prototype.buildWordNoteBoard = function() {
        this._wordNoteBoard = cc.instantiate(this.wordNoteBoardPrefab);
        var labelNode = this._wordNoteBoard.getChildByName("label");
        var label = labelNode.getComponent(cc.Label);
        var outLine = labelNode.addComponent(cc.LabelOutline);
        outLine.width = 2;
        label.string = this._currentConfig.word;
        this._wordNoteBoard.setPosition(new cc.Vec2(0, 263));
        this.loadTexture();
        this.checkRTLAndScaleX(this._wordNoteBoard, 1);
        this.checkRTLAndScaleX(labelNode, 1);
        this.node.addChild(this._wordNoteBoard);
      };
      Rocket.prototype.buildDropContainer = function() {
        this._dropContainer = cc.instantiate(this.dropContainerPrefab);
        this._dropContainer.setPosition(new cc.Vec2(-80, 25));
        if (this._isRTL) {
          this._dropContainer.setPosition(new cc.Vec2(80, 25));
          this.checkRTLAndScaleX(this._dropContainer, 1);
        }
        this._dropLayout = this._dropContainer.getChildByName("dropLayout");
        this.addChildrenToDropLayout(this._dropLayout, this.stickerDropPrefab);
        this.node.addChild(this._dropContainer);
      };
      Rocket.prototype.addChildrenToDropLayout = function(node, prefab) {
        this._rocketHead = cc.instantiate(this.rocketheadPrefab);
        this.friendPos.removeFromParent();
        this.friendPos.position = cc.Vec3.ZERO;
        this._rocketHead.getChildByName("character_node").getChildByName("dog").addChild(this.friendPos);
        node.addChild(this._rocketHead);
        var word = "en/" === config_1.default.dir ? this._currentConfig.word.split("") : this._currentConfig.activeCard.split(",");
        var card = this._currentConfig.card.split(",");
        var showWords = "true" === this._currentConfig.fullboard || "true" === this._currentConfig.partialboard ? word : card;
        this.buildWords(node, showWords || [], prefab, true);
        this._rocketTail = cc.instantiate(this.rockettailPrefab);
        node.addChild(this._rocketTail);
      };
      Rocket.prototype.createSticker = function(parent, index, word, isDrop, prefab, isAllowDrag) {
        var sticker = !prefab ? parent.getChildByName("sticker" + index) : cc.instantiate(prefab);
        !prefab ? "" : parent.addChild(sticker);
        sticker.getComponent(BoxCollider).size = new cc.Size(sticker.width, sticker.height);
        var labelNode = sticker.getChildByName("label");
        labelNode.color = cc.Color.WHITE;
        var outLine = labelNode.addComponent(cc.LabelOutline);
        outLine.width = 3;
        outLine.color = cc.Color.BLACK;
        if (!!labelNode) {
          var label = labelNode.getComponent(cc.Label);
          labelNode.width = 1 * label.fontSize;
          if (isDrop) {
            sticker.color = cc.Color.GRAY;
            labelNode.opacity = 0;
            this._totalDrops++;
          } else sticker.color = new cc.Color().fromHEX("#" + Math.floor(16777215 * Math.random()).toString(16));
          if (!isDrop) {
            var stickerChoice = sticker.getComponent(sticker_choice_1.default);
            stickerChoice.word = word;
            stickerChoice.name = word;
            stickerChoice.allowDrag = isAllowDrag;
            labelNode.opacity = isAllowDrag ? 255 : 128;
          }
          sticker.width = labelNode.width;
          if (!!label) {
            sticker.name = word;
            label.string = word;
          }
        }
        return sticker;
      };
      Rocket.prototype.buildWords = function(node, words, prefab, isDrop) {
        var _this = this;
        void 0 === isDrop && (isDrop = false);
        words.forEach(function(w, i) {
          _this._helpWord || (_this._helpWord = w);
          var isAllowDrag = true;
          "true" !== _this._currentConfig.partialboard || "true" === _this._currentConfig.fullboard || isDrop || (isAllowDrag = _this._currentConfig.activeCard.includes(w));
          var sticker = _this.createSticker(node, i + 1, w, isDrop, prefab, isAllowDrag);
          if (isDrop) _this._helpWord === w && (_this._helpDropNode = sticker); else {
            _this._helpWord === w && (_this._helpDragNode = sticker);
            if (_this._isRTL) {
              var newNode = new cc.Node();
              newNode.name = "shouldFlip";
              sticker.addChild(newNode);
            }
            sticker.on("stickChoice", function() {
              _this._totalDrops--;
              _this.node.emit("correct");
              0 === _this._totalDrops && _this.scheduleOnce(function() {
                _this.playSuccessAnimation();
              }, 1);
            });
            sticker.on("stickNoChoice", function() {
              _this.node.emit("wrong");
            });
          }
        });
      };
      Rocket.prototype.stickCorrect = function(event) {
        event.stopPropagation();
        this._totalDrops--;
        this.node.emit("correct");
        if (0 === this._totalDrops) {
          this._choiceContainers.forEach(function(choices) {
            choices.pauseSystemEvents(true);
          });
          this.friend.speakExtra(this.playSuccessAnimation.bind(this));
        }
      };
      Rocket.prototype.stickWrong = function(event) {
        event.stopPropagation();
        this.node.emit("wrong");
      };
      Rocket.prototype.moveToNext = function() {
        this.node.emit("nextProblem");
      };
      Rocket.prototype.playSuccessAnimation = function() {
        var _this = this;
        var fire = this._rocketTail.getChildByName("fire");
        var fireAnimation = fire.getComponent(cc.Animation);
        fireAnimation.play("fire");
        this.scheduleOnce(function() {
          new cc.Tween().target(_this._dropContainer).to(1.5, {
            x: (cc.winSize.width + 100) * (_this._isRTL ? 1 : -1)
          }, {
            progress: null,
            easing: "quadOut"
          }).call(function() {
            _this.moveToNext();
          }).start();
        }, 1);
      };
      Rocket.prototype.removeDuplicateCharacters = function(str) {
        return str.replace(/[\s\S](?=([\s\S]+))/g, function(c, s) {
          return s.indexOf(c) + 1 ? "" : c;
        });
      };
      Rocket.prototype.diff = function(card, activeCard) {
        var activeCardArr = "en/" === config_1.default.dir ? this._currentConfig.word.split("") : activeCard.split(",");
        var cardArr = card.split(",");
        var onlyCards = cardArr.filter(function(x) {
          return !activeCard.includes(x);
        });
        return util_1.Util.shuffle(activeCardArr.concat(onlyCards).slice(0, 2 * MAX_CHOICE_IN_ROW));
      };
      Rocket.prototype.addChildrenToChoiceLayout = function(index, node, prefab) {
        var chars = this.buildShowWords(index);
        this.buildWords(node, chars || [], prefab, false);
      };
      Rocket.prototype.buildChoiceContainerSingleRow = function(index) {
        var choiceContainer = cc.instantiate(this.choiceContainerOneRowPrefab);
        this.addChoiceContainerToNode(choiceContainer, index, false);
        return choiceContainer;
      };
      Rocket.prototype.addChoiceContainerToNode = function(choiceContainer, index, addChild) {
        void 0 === addChild && (addChild = false);
        choiceContainer.opacity = 0;
        choiceContainer.name = "choiceContainer" + index;
        choiceContainer.setPosition(new cc.Vec2(0, -150 * index + 50 * (index - 1)));
        var choiceLayout = choiceContainer.getChildByName("choiceLayout");
        addChild ? this.addChildrenToChoiceLayout(index, choiceLayout, this.stickerPrefab) : this.addChildrenToChoiceLayoutSingleRow(index, choiceLayout);
        choiceLayout.name = "choiceLayout" + index;
        this.node.addChild(choiceContainer);
        this.updateChoiceLayout(choiceLayout);
      };
      Rocket.prototype.checkRTLAndScaleX = function(node, scale) {
        node.scaleX = this._isRTL ? -scale : scale;
      };
      Rocket.prototype.buildShowWords = function(index) {
        var showWords = "true" === this._currentConfig.fullboard || "true" === this._currentConfig.partialboard ? util_1.Util.chunk(this._mWord, Math.floor(this._mWord.length / 2)) : util_1.Util.shuffle(this._currentConfig.activeCard.split(","));
        var chars = [];
        chars = "true" === this._currentConfig.fullboard || "true" === this._currentConfig.partialboard ? showWords[index - 1] : showWords;
        return chars;
      };
      Rocket.prototype.addChildrenToChoiceLayoutSingleRow = function(index, node) {
        var chars = this.buildShowWords(index);
        this.buildWords(node, chars || [], null, false);
      };
      Rocket.prototype.buildChoiceContainer = function(index) {
        var choiceContainer = cc.instantiate(this.choiceContainerPrefab);
        this.addChoiceContainerToNode(choiceContainer, index, true);
        return choiceContainer;
      };
      Rocket.prototype.updateChoiceLayout = function(choiceLayoutNode) {
        this.scheduleOnce(function() {
          var layout = choiceLayoutNode.getComponent(cc.Layout);
          layout.type = Layout.Type.NONE;
        }, .05);
      };
      Rocket.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var level = configurations[0], worksheet = configurations[1], problem = configurations[2], word = configurations[3], card = configurations[4], activeCard = configurations[5], sound = configurations[6], image = configurations[7], partialboard = configurations[8], fullboard = configurations[9];
        0 === card.length && (card = Utility_1.AlphabetUtil.getRandomConsonantArray(config_1.default.dir).join(","));
        return {
          level: level,
          worksheet: worksheet,
          problem: problem,
          word: word,
          card: card,
          activeCard: activeCard,
          sound: sound,
          image: image,
          partialboard: partialboard,
          fullboard: fullboard
        };
      };
      __decorate([ property(cc.Prefab) ], Rocket.prototype, "wordNoteBoardPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Rocket.prototype, "dropContainerPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Rocket.prototype, "choiceContainerPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Rocket.prototype, "choiceContainerOneRowPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Rocket.prototype, "rocketheadPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Rocket.prototype, "rockettailPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Rocket.prototype, "stickerPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Rocket.prototype, "stickerDropPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Rocket.prototype, "soundBtnPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Rocket.prototype, "imageNodePrefab", void 0);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "buildUI", null);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "loadTexture", null);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "showImage", null);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "buildWordNoteBoard", null);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "buildDropContainer", null);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "addChildrenToDropLayout", null);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "createSticker", null);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "buildWords", null);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "stickCorrect", null);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "stickWrong", null);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "moveToNext", null);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "playSuccessAnimation", null);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "removeDuplicateCharacters", null);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "diff", null);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "addChildrenToChoiceLayout", null);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "buildChoiceContainerSingleRow", null);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "addChoiceContainerToNode", null);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "checkRTLAndScaleX", null);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "buildShowWords", null);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "addChildrenToChoiceLayoutSingleRow", null);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "buildChoiceContainer", null);
      __decorate([ error_handler_1.default() ], Rocket.prototype, "updateChoiceLayout", null);
      Rocket = __decorate([ ccclass ], Rocket);
      return Rocket;
    }(game_1.default);
    exports.default = Rocket;
    cc._RF.pop();
  }, {
    "../../../common/scripts/Utility": void 0,
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./sticker-choice": "sticker-choice"
  } ],
  "sticker-choice": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "68357KHZmdHJYH5e+nGeKY1", "sticker-choice");
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
    var drag_1 = require("../../../common/scripts/drag");
    var rocket_1 = require("./rocket");
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var util_1 = require("../../../common/scripts/util");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var StickerChoice = function(_super) {
      __extends(StickerChoice, _super);
      function StickerChoice() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._originalPosition = null;
        _this.name = "";
        _this.word = "";
        _this.correctClip = null;
        _this.wrongClip = null;
        return _this;
      }
      StickerChoice.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
      };
      StickerChoice.prototype.start = function() {
        _super.prototype.start.call(this);
      };
      StickerChoice.prototype.onTouchStart = function(touch) {
        _super.prototype.onTouchStart.call(this, touch);
        this._originalPosition = this.node.position;
        try {
          util_1.Util.speakPhonicsOrLetter(this.word || this.name, function() {});
        } catch (e) {}
      };
      StickerChoice.prototype.onTouchMove = function(touch) {
        _super.prototype.onTouchMove.call(this, touch);
      };
      StickerChoice.prototype.returnBackOnNoMatchPos = function() {
        try {
          !this.wrongClip || util_1.Util.playSfx(this.wrongClip);
        } catch (e) {}
        return this._originalPosition ? this._originalPosition : this.node.position;
      };
      StickerChoice.prototype.onTouchEnd = function(touch) {
        _super.prototype.onTouchEnd.call(this, touch);
        this.match ? this.node.dispatchEvent(new cc.Event.EventCustom(rocket_1.STICK_CHOICE_CORRECT, true)) : this.allowDrag && this.isMoved && this.node.dispatchEvent(new cc.Event.EventCustom(rocket_1.STICK_CHOICE_WRONG, true));
      };
      StickerChoice.prototype.onMatchOver = function() {
        _super.prototype.onMatchOver.call(this);
      };
      __decorate([ property(cc.AudioClip) ], StickerChoice.prototype, "correctClip", void 0);
      __decorate([ property(cc.AudioClip) ], StickerChoice.prototype, "wrongClip", void 0);
      __decorate([ error_handler_1.default() ], StickerChoice.prototype, "onLoad", null);
      StickerChoice = __decorate([ ccclass ], StickerChoice);
      return StickerChoice;
    }(drag_1.default);
    exports.default = StickerChoice;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./rocket": "rocket"
  } ],
  "sticker-drop": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "469d0J683hPaKec5sFv8XZs", "sticker-drop");
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
    var drop_1 = require("../../../common/scripts/drop");
    var ccclass = cc._decorator.ccclass;
    var StickerDrop = function(_super) {
      __extends(StickerDrop, _super);
      function StickerDrop() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      StickerDrop.prototype.onMatchOver = function() {
        _super.prototype.onMatchOver.call(this);
        this.node.opacity = 255;
      };
      StickerDrop = __decorate([ ccclass ], StickerDrop);
      return StickerDrop;
    }(drop_1.default);
    exports.default = StickerDrop;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drop": void 0
  } ],
  "word-sound-button": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "06bd7Dt3iFGwLj+Z+8zj0OH", "word-sound-button");
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
    var ccclass = cc._decorator.ccclass;
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var WordSoundButton = function(_super) {
      __extends(WordSoundButton, _super);
      function WordSoundButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._isSoundPlaying = false;
        return _this;
      }
      WordSoundButton.prototype.playSound = function() {
        if (!this._isSoundPlaying) {
          this._isSoundPlaying = true;
          this.containerComponent.speakWord();
        }
      };
      WordSoundButton.prototype.stopSound = function() {
        this._isSoundPlaying = false;
        cc.audioEngine.stopAllEffects();
      };
      WordSoundButton.prototype.soundOnLoad = function() {
        this.playSound();
      };
      WordSoundButton.prototype.onButtonClick = function(event, customEventData) {
        var node = event.target;
        this.stopSound();
        this.playSound();
      };
      WordSoundButton.prototype.onDestroy = function() {
        cc.audioEngine.stopAllEffects();
      };
      __decorate([ error_handler_1.default() ], WordSoundButton.prototype, "playSound", null);
      __decorate([ error_handler_1.default() ], WordSoundButton.prototype, "stopSound", null);
      __decorate([ error_handler_1.default() ], WordSoundButton.prototype, "soundOnLoad", null);
      __decorate([ error_handler_1.default() ], WordSoundButton.prototype, "onButtonClick", null);
      WordSoundButton = __decorate([ ccclass ], WordSoundButton);
      return WordSoundButton;
    }(cc.Component);
    exports.default = WordSoundButton;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/error-handler": void 0
  } ]
}, {}, [ "rocket", "sticker-choice", "sticker-drop", "word-sound-button" ]);