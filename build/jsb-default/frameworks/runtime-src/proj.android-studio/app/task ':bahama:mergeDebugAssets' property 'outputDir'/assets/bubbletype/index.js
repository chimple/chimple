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
  bubbletype: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "20136wzERpIRK5KrH31nDor", "bubbletype");
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
    exports.GAME_SOUND = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var config_1 = require("../../../common/scripts/lib/config");
    var util_1 = require("../../../common/scripts/util");
    var game_1 = require("../../../common/scripts/game");
    exports.GAME_SOUND = "games/starfall/sound/";
    var BubbleType = function(_super) {
      __extends(BubbleType, _super);
      function BubbleType() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.bubblePrefab = null;
        _this.buttonPrefab = null;
        _this.fallingTime = 30;
        _this.inputBoxString = "";
        _this.correctAudio = null;
        _this.popAudio = null;
        _this.wrongAudio = null;
        _this.words = [];
        _this.wordsOnScreen = [ "", "", "" ];
        _this.score = 0;
        _this.maxScore = 0;
        _this.isScenePoped = false;
        _this.isFirstPageKeys = true;
        _this.bubbledestroyBoundry = 520;
        _this._sound = null;
        return _this;
      }
      BubbleType.prototype.onLoad = function() {
        this.alphabets = JSON.stringify(this.processConfiguration(config_1.default.getInstance().data[0]).numberpads[0]).replace(new RegExp(/"/g), "");
        var element = config_1.default.getInstance().data[0];
        var stringData = element[5] + "";
        this.words = stringData.split(" ");
        this.maxScore = parseInt(element[3]);
        this.startGame();
        this.node.getChildByName("score").getComponent(cc.Label).string = this.score + "/" + this.maxScore;
        this.createDog();
      };
      BubbleType.prototype.startGame = function() {
        var _this = this;
        if (config_1.default.i.direction == config_1.Direction.RTL) {
          this.node.getChildByName("score").position = new cc.Vec2(-415, 107);
          this.bubbledestroyBoundry = -520;
        }
        for (var i = 0; i < 3; i++) {
          var card2 = cc.instantiate(this.bubblePrefab);
          var randomNum = 250 * Math.random() + 100;
          var fallingAction = cc.moveTo(this.fallingTime * (i / 3 + 1), this.bubbledestroyBoundry, randomNum);
          card2.position = new cc.Vec2(i / 3 * -500 - 500, randomNum);
          if (config_1.default.i.direction == config_1.Direction.RTL) {
            fallingAction = cc.moveTo(this.fallingTime * (i / 3 + 1), this.bubbledestroyBoundry, randomNum);
            card2.position = new cc.Vec2(500 + i / 3 * 500, randomNum);
          }
          card2.name = (i + 1).toString();
          var currentWordIndex = Math.floor(Math.random() * (this.words.length - 0)) + 0;
          card2.getChildByName("Label").getComponent(cc.Label).string = this.words[currentWordIndex];
          console.log(this.words[currentWordIndex].length);
          this.words[currentWordIndex].length > 3 && (card2.getChildByName("bubble").scaleX = 1.5);
          this.wordsOnScreen[i] = this.words[currentWordIndex];
          this.node.getChildByName("bubblesFolder").addChild(card2);
          card2.runAction(cc.sequence([ fallingAction, cc.callFunc(this.bubbleAnimationCallback, this, card2.name) ]));
        }
        var formattedData = this.dataConvert(this.words);
        var padding = 20;
        var buttonSize = 100 + padding;
        var alphabetArray = this.alphabets.split(" ");
        var layoutToAdd = 1;
        for (var i_1 = 0; i_1 < alphabetArray.length; i_1++) {
          if ("$" === alphabetArray[i_1]) {
            layoutToAdd++;
            continue;
          }
          var y = 0;
          var x = i_1 * buttonSize - 530;
          if (i_1 > 9 && i_1 < 20) {
            y = -104;
            x = (i_1 - 10) * buttonSize - 530;
          }
          if (i_1 > 19) {
            x = alphabetArray.length < 29 ? (i_1 - 20) * buttonSize - 350 : (i_1 - 20) * buttonSize - 530;
            y = -208;
          }
          if (i_1 > 29) {
            x = alphabetArray.length < 39 ? (i_1 - 30) * buttonSize - 340 : (i_1 - 30) * buttonSize - 530;
            y = -316;
          }
          var tempButton = cc.instantiate(this.buttonPrefab);
          tempButton.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = alphabetArray[i_1];
          tempButton.name = alphabetArray[i_1];
          tempButton.on("touchend", this.callback, this);
          this.words.indexOf(tempButton.name) >= 0 || formattedData.indexOf(tempButton.name) >= 0 ? tempButton.getComponent(cc.Button).interactable = true : tempButton.getComponent(cc.Button).interactable = false;
          this.node.getChildByName("mainLayout").getChildByName("layout" + layoutToAdd).addChild(tempButton);
          tempButton.name == this.wordsOnScreen[0] && util_1.Util.showHelp(tempButton, tempButton, function() {
            _this.friend.playAnimation("blowing", 1);
          });
        }
      };
      BubbleType.prototype.createDog = function() {
        this.friendPos.setPosition(new cc.Vec2(-460, -50));
        this.friendPos.scaleX = .4;
        this.friendPos.scaleY = .4;
        if (config_1.default.i.direction == config_1.Direction.RTL) {
          this.friendPos.setPosition(new cc.Vec2(460, -50));
          this.friendPos.scaleX = -.4;
        }
      };
      BubbleType.prototype.callback = function(event) {
        var _this = this;
        if (event.target.getComponent(cc.Button).interactable) {
          this.inputBoxString = this.inputBoxString.concat(event.target.name);
          for (var i = 0; i < 3; i++) if (this.wordsOnScreen[i] === this.inputBoxString) {
            this.score += 1;
            if (null != this.node) {
              this.node.getChildByName("score").getComponent(cc.Label).string = this.score + "/" + this.maxScore;
              this.node.getChildByName("richText").getComponent(cc.RichText).string = this.inputBoxString;
              setTimeout(function() {
                _this.inputBoxString = "";
                null != _this.node && (_this.node.getChildByName("richText").getComponent(cc.RichText).string = _this.inputBoxString);
              }, 500);
            }
            var randomNum = 250 * Math.random() + 100;
            var popBubbleName = (i + 1).toString();
            util_1.Util.speakLettersOrWords(this.inputBoxString, function() {
              if (_this.score >= _this.maxScore && !_this.isScenePoped) {
                _this.node.emit("nextProblem");
                _this.isScenePoped = true;
              }
              _this.node.emit("correct");
            });
            if (null != this.node) {
              this.node.getChildByName("bubble_pop_node").position = this.node.getChildByName("bubblesFolder").getChildByName(popBubbleName).position;
              this.node.getChildByName("bubble_pop_node").getComponent(cc.Animation).play();
              this.node.getChildByName("bubblesFolder").getChildByName(popBubbleName).position = new cc.Vec2(100 * Math.random() - 700, randomNum);
              config_1.default.i.direction == config_1.Direction.RTL && (this.node.getChildByName("bubblesFolder").getChildByName(popBubbleName).position = new cc.Vec2(700 + 100 * Math.random(), randomNum));
              this.node.getChildByName("bubblesFolder").getChildByName(popBubbleName).stopAllActions();
              var fallingAction = cc.moveTo(this.fallingTime, this.bubbledestroyBoundry, randomNum);
              var currentWordIndex = Math.floor(Math.random() * (this.words.length - 0)) + 0;
              this.wordsOnScreen[parseInt(popBubbleName) - 1] = this.words[currentWordIndex];
              this.node.getChildByName("bubblesFolder").getChildByName(popBubbleName).getChildByName("Label").getComponent(cc.Label).string = this.words[currentWordIndex];
              this.node.getChildByName("bubblesFolder").getChildByName(popBubbleName).runAction(cc.sequence([ fallingAction, cc.callFunc(this.bubbleAnimationCallback, this, popBubbleName) ]));
            }
            return;
          }
          for (var i = 0; i < 3; i++) if (this.wordsOnScreen[i].startsWith(this.inputBoxString)) {
            null != this.node && (this.node.getChildByName("richText").getComponent(cc.RichText).string = this.inputBoxString);
            return;
          }
          this.node.emit("wrong");
          if (null != this.node) {
            setTimeout(function() {
              _this.inputBoxString = "";
              null != _this.node && (_this.node.getChildByName("richText").getComponent(cc.RichText).string = _this.inputBoxString);
            }, 100);
            this.node.getChildByName("richText").getComponent(cc.RichText).string = this.inputBoxString;
          }
        }
      };
      BubbleType.prototype.dataConvert = function(arr) {
        var fullLetterArray = [];
        for (var j = 0; j < this.words.length; j++) for (var i = 0; i < this.words[j].length; i++) fullLetterArray.push(this.words[j].charAt(i));
        for (var i = 0; i < this.alphabets.length; i++) -1 != fullLetterArray.indexOf(this.alphabets.substr(i, 1)) && console.log(this.alphabets.substr(i, 1), "<<");
        return fullLetterArray;
      };
      BubbleType.prototype.bubbleAnimationCallback = function(obj) {
        console.log("Her is log of console");
        if (null != this.node) {
          var randomNum = 250 * Math.random() + 100;
          this.node.getChildByName("bubblesFolder").getChildByName(obj.name).position = new cc.Vec2(this.node.getChildByName("bubblesFolder").getChildByName(obj.name).x - 1100, randomNum);
          config_1.default.i.direction == config_1.Direction.RTL && (this.node.getChildByName("bubblesFolder").getChildByName(obj.name).position = new cc.Vec2(this.node.getChildByName("bubblesFolder").getChildByName(obj.name).x + 1100, randomNum));
          var fallingAction = cc.moveTo(this.fallingTime, this.bubbledestroyBoundry, randomNum);
          var currentWordIndex = Math.floor(Math.random() * (this.words.length - 0)) + 0;
          this.wordsOnScreen[parseInt(obj.name) - 1] = this.words[currentWordIndex];
          this.node.getChildByName("bubblesFolder").getChildByName(obj.name).getChildByName("Label").getComponent(cc.Label).string = this.words[currentWordIndex];
          this.node.getChildByName("bubblesFolder").getChildByName(obj.name).runAction(cc.sequence([ fallingAction, cc.callFunc(this.bubbleAnimationCallback, this, obj.name) ]));
        }
      };
      BubbleType.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var level = configurations[0], worksheet = configurations[1], problemCount = configurations[2], wordRegenTime = configurations[3], words = configurations[4], numberofConsonantChoices = configurations[5], numberofVowelChoices = configurations[6], image = configurations[7], soundDuration = configurations[8], one = configurations[9], two = configurations[10], numberpads = configurations[11];
        numberpads = numberpads.split(",");
        return {
          level: level,
          worksheet: worksheet,
          problemCount: problemCount,
          wordRegenTime: wordRegenTime,
          words: words,
          numberofConsonantChoices: numberofConsonantChoices,
          numberofVowelChoices: numberofVowelChoices,
          image: image,
          soundDuration: soundDuration,
          one: one,
          two: two,
          numberpads: numberpads
        };
      };
      __decorate([ property(cc.Label) ], BubbleType.prototype, "label", void 0);
      __decorate([ property(cc.Prefab) ], BubbleType.prototype, "bubblePrefab", void 0);
      __decorate([ property(cc.Prefab) ], BubbleType.prototype, "buttonPrefab", void 0);
      __decorate([ property ], BubbleType.prototype, "inputBoxString", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], BubbleType.prototype, "correctAudio", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], BubbleType.prototype, "popAudio", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], BubbleType.prototype, "wrongAudio", void 0);
      __decorate([ error_handler_1.default() ], BubbleType.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], BubbleType.prototype, "startGame", null);
      __decorate([ error_handler_1.default() ], BubbleType.prototype, "createDog", null);
      __decorate([ error_handler_1.default() ], BubbleType.prototype, "callback", null);
      __decorate([ error_handler_1.default() ], BubbleType.prototype, "dataConvert", null);
      __decorate([ error_handler_1.default() ], BubbleType.prototype, "bubbleAnimationCallback", null);
      __decorate([ error_handler_1.default() ], BubbleType.prototype, "processConfiguration", null);
      BubbleType = __decorate([ ccclass ], BubbleType);
      return BubbleType;
    }(game_1.default);
    exports.default = BubbleType;
    cc._RF.pop();
  }, {
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0
  } ]
}, {}, [ "bubbletype" ]);