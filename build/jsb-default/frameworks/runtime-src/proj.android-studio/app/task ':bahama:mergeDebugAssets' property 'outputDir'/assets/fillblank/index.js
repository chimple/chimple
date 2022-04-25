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
  animationEvent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2158b6z985AaKJeKWVKF/jy", "animationEvent");
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
    var game_1 = require("../../../common/scripts/game");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var AnimationEvents = function(_super) {
      __extends(AnimationEvents, _super);
      function AnimationEvents() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      AnimationEvents.prototype.onRightAns = function(event) {
        var _this = this;
        cc.log("sdfsdhf awejsf ahgdsfvhdsGASDJS");
        var fillBlank = this.node.getParent();
        var game = fillBlank.getComponent(game_1.default);
        game.friend.speakExtra(function() {
          var questionFadeOut = cc.moveTo(2, 0, 540);
          var nd = _this.node.getParent().getChildByName("board_question_wordkicker");
          nd.runAction(cc.sequence([ questionFadeOut, cc.callFunc(_this.nextQuestion, _this) ]));
          var buttonFadeOut = cc.moveTo(2, 0, -443);
          nd.getParent().getChildByName("buttons").runAction(buttonFadeOut);
        });
      };
      AnimationEvents.prototype.nextQuestion = function() {
        this.node.getParent().emit("nextProblem");
      };
      __decorate([ error_handler_1.default() ], AnimationEvents.prototype, "onRightAns", null);
      __decorate([ error_handler_1.default() ], AnimationEvents.prototype, "nextQuestion", null);
      AnimationEvents = __decorate([ ccclass ], AnimationEvents);
      return AnimationEvents;
    }(cc.Component);
    exports.default = AnimationEvents;
    cc._RF.pop();
  }, {
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/error-handler": void 0
  } ],
  fillblank: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ecf83FCqjBOG4x20zbiUIJv", "fillblank");
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
    var config_1 = require("../../../common/scripts/lib/config");
    var util_1 = require("../../../common/scripts/util");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var game_1 = require("../../../common/scripts/game");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var FillBlank = function(_super) {
      __extends(FillBlank, _super);
      function FillBlank() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.question = "";
        _this.ans_button = 0;
        _this.rightSprite = null;
        _this.wrongSprite = null;
        _this.soundFile = null;
        _this.disableCorrectButton = false;
        return _this;
      }
      FillBlank.prototype.onLoad = function() {
        var _this = this;
        new cc.Tween().target(this.friend.node).set({
          x: -cc.winSize.width
        }).to(1, {
          x: 0
        }, null).start();
        var answerNode = null;
        config_1.default.getInstance().data.forEach(function(row) {
          _this.question = row[3];
          var startIndex = _this.question.indexOf("[");
          var endIndex = _this.question.indexOf("]");
          var ansString = _this.question.substring(startIndex + 1, endIndex);
          _this.question = _this.question.replace(_this.question.substring(startIndex, endIndex + 1), "______");
          _this.soundFile = row[4];
          util_1.Util.loadGameSound(_this.soundFile, function(clip) {
            null != clip && (_this.friend.extraClip = clip);
            _this.scheduleOnce(function() {
              util_1.Util.showHelp(answerNode, answerNode, function() {
                answerNode = _this.enableButtons(node, answerNode, arr, true);
              });
            }, 2);
          });
          var node = _this.node;
          node.getChildByName("board_question_wordkicker").getChildByName("question").getComponent(cc.Label).string = _this.question;
          var arr = [ ansString, row[5], row[6], row[7] ];
          arr = _this.shuffle(arr);
          _this.ans_button = arr.indexOf(ansString) + 1;
          answerNode = _this.enableButtons(node, answerNode, arr, false);
        });
      };
      FillBlank.prototype.enableButtons = function(node, answerNode, arr, enable) {
        for (var i = 0; i < 4; i++) {
          var str = "button_";
          var temp = str + (i + 1);
          var tempNode = node.getChildByName("buttons").getChildByName(temp);
          i + 1 == this.ans_button && (answerNode = tempNode);
          tempNode.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = arr[i];
          enable ? tempNode.on("click", this.callback.bind(this), this) : tempNode.off("click", this.callback.bind(this), this);
        }
        return answerNode;
      };
      FillBlank.prototype.callback = function(event) {
        cc.log(" y i m getting called" + event.node.name);
        if (!this.disableCorrectButton) if (event.node.name === "button_" + this.ans_button) {
          cc.log("this is right answer");
          this.node.emit("correct");
          this.disableCorrectButton = true;
          for (var i = 1; i < 5; i++) {
            var tempButton = "button_";
            if (event.node.name != tempButton + i) {
              var makeButtonDisabled = this.node.getChildByName("buttons").getChildByName(tempButton + i).getComponent(cc.Button);
              makeButtonDisabled.interactable = false;
            }
          }
          var fullAnsString = this.question.replace("______", this.node.getChildByName("buttons").getChildByName(event.node.name).getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string);
          this.node.getChildByName("board_question_wordkicker").getChildByName("question").getComponent(cc.Label).string = fullAnsString;
          this.node.getChildByName("buttons").getChildByName(event.node.name).getChildByName("Background").getComponent(cc.Sprite).spriteFrame = this.rightSprite;
          var rightAnimationNode = this.node.getChildByName("flower_anim");
          rightAnimationNode.x = 0;
          var playRightAnimation = rightAnimationNode.getComponent(cc.Animation);
          playRightAnimation.play();
        } else {
          this.node.emit("wrong");
          this.node.getChildByName("buttons").getChildByName(event.node.name).getChildByName("Background").getComponent(cc.Sprite).spriteFrame = this.wrongSprite;
          var wrongAnimationNode = this.node.getChildByName("flower_wrong");
          wrongAnimationNode.x = 140;
          var playRightAnimation = wrongAnimationNode.getComponent(cc.Animation);
          playRightAnimation.play();
        }
      };
      FillBlank.prototype.shuffle = function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      };
      FillBlank.prototype.start = function() {
        var questionAction = cc.moveTo(1, 0, 278);
        this.node.getChildByName("board_question_wordkicker").runAction(questionAction);
        var buttonAction = cc.moveTo(1, 0, 0);
        this.node.getChildByName("buttons").runAction(buttonAction);
      };
      __decorate([ property(cc.Label) ], FillBlank.prototype, "label", void 0);
      __decorate([ property ], FillBlank.prototype, "question", void 0);
      __decorate([ property ], FillBlank.prototype, "ans_button", void 0);
      __decorate([ property(cc.SpriteFrame) ], FillBlank.prototype, "rightSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], FillBlank.prototype, "wrongSprite", void 0);
      __decorate([ error_handler_1.default() ], FillBlank.prototype, "enableButtons", null);
      __decorate([ error_handler_1.default() ], FillBlank.prototype, "callback", null);
      __decorate([ error_handler_1.default() ], FillBlank.prototype, "shuffle", null);
      __decorate([ error_handler_1.default() ], FillBlank.prototype, "start", null);
      FillBlank = __decorate([ ccclass ], FillBlank);
      return FillBlank;
    }(game_1.default);
    exports.default = FillBlank;
    cc._RF.pop();
  }, {
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0
  } ]
}, {}, [ "animationEvent", "fillblank" ]);