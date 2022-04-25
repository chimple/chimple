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
  matchingcard: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "07ee2NU7FFLYJWEUG++IlM9", "matchingcard");
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
    var MatchingCard = function(_super) {
      __extends(MatchingCard, _super);
      function MatchingCard() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.back = null;
        _this.front = null;
        _this.shadow = null;
        _this.left = null;
        _this.right = null;
        _this.match = null;
        _this.truck = null;
        _this.choice = null;
        _this.isMoving = false;
        _this.cards = null;
        _this.choiceY = null;
        return _this;
      }
      MatchingCard.prototype.onLoad = function() {
        var _this = this;
        this.choiceY = this.choice.y;
        this.choice.y = -cc.winSize.height;
        var truckX = this.truck.x;
        new cc.Tween().target(this.truck).set({
          x: cc.winSize.width
        }).to(3, {
          x: truckX
        }, {
          progress: null,
          easing: "quadOut"
        }).call(function() {
          var anim = _this.truck.getComponent(cc.Animation);
          anim.stop();
          _this.onIteration();
        }).start();
        this.node.on("nextIteration", function() {
          _this.onIteration();
        });
      };
      MatchingCard.prototype.onIteration = function() {
        var _this = this;
        this.left.removeAllChildren();
        this.right.removeAllChildren();
        this.isMoving = false;
        this.choice.y = -cc.winSize.height;
        var _a = config_1.default.getInstance().data[0], level = _a[0], worksheet = _a[1], problem = _a[2], choices = _a[3], choice0 = _a[4], choice1 = _a[5], choice2 = _a[6], choice3 = _a[7];
        var choiceArray = [ choice0, choice1, choice2, choice3 ];
        this.cards = [];
        util_1.Util.loadTexture(choice0, function(texture) {
          var spriteNode = new cc.Node();
          var sprite = spriteNode.addComponent(cc.Sprite);
          sprite.spriteFrame = new cc.SpriteFrame(texture);
          _this.left.addChild(spriteNode);
        });
        var correctChoice = null;
        for (var index = 0; index < parseInt(choices); index++) {
          var thisChoice = this.makeChoiceCard(choiceArray[index], index);
          this.cards.push(thisChoice);
          0 == index && (correctChoice = thisChoice);
        }
        util_1.Util.shuffle(this.cards);
        this.cards.forEach(function(element) {
          _this.choice.addChild(element);
        });
        new cc.Tween().target(this.choice).to(.25, {
          y: this.choiceY
        }, {
          progress: null,
          easing: "quadOut"
        }).call(function() {
          util_1.Util.showHelp(correctChoice, correctChoice);
        }).start();
      };
      MatchingCard.prototype.makeChoiceCard = function(textureName, index) {
        var _this = this;
        var cardNode = new cc.Node(index.toString());
        var cardSprite = cardNode.addComponent(cc.Sprite);
        cardSprite.spriteFrame = this.front;
        var spriteNode = new cc.Node();
        var sprite = spriteNode.addComponent(cc.Sprite);
        util_1.Util.loadTexture(textureName, function(texture) {
          sprite.spriteFrame = new cc.SpriteFrame(texture);
        });
        cardNode.addChild(spriteNode);
        cardNode.on("touchstart", function() {
          if (!_this.isMoving) {
            _this.isMoving = true;
            new cc.Tween().target(cardNode).to(.5, {
              position: cardNode.convertToNodeSpaceAR(_this.right.convertToWorldSpaceAR(cc.Vec2.ZERO))
            }, null).call(function() {
              if (0 == index) {
                _this.node.emit("correct");
                _this.scheduleOnce(function() {
                  cardNode.removeFromParent(false);
                  cardNode.position = cc.Vec2.ZERO;
                  _this.right.addChild(cardNode);
                  _this.choice.removeAllChildren();
                  var config = config_1.default.getInstance();
                  if (config.problem == config.totalProblems) {
                    var anim = _this.truck.getComponent(cc.Animation);
                    anim.play();
                    new cc.Tween().target(_this.truck).delay(1).to(2, {
                      x: 1.5 * -cc.winSize.width
                    }, {
                      progress: null,
                      easing: "quadOut"
                    }).call(function() {
                      _this.node.emit("nextProblem", true);
                    }).start();
                  } else _this.node.emit("nextProblem", false);
                }, 1);
              } else {
                _this.node.emit("wrong");
                new cc.Tween().target(cardNode).to(.25, {
                  position: cc.Vec2.ZERO
                }, {
                  progress: null,
                  easing: "quadOut"
                }).call(function() {
                  _this.isMoving = false;
                }).start();
              }
            }).start();
          }
        }, this);
        var tempNode = new cc.Node();
        tempNode.width = 168;
        tempNode.height = 200;
        tempNode.addChild(cardNode);
        return tempNode;
      };
      __decorate([ property(cc.SpriteFrame) ], MatchingCard.prototype, "back", void 0);
      __decorate([ property(cc.SpriteFrame) ], MatchingCard.prototype, "front", void 0);
      __decorate([ property(cc.SpriteFrame) ], MatchingCard.prototype, "shadow", void 0);
      __decorate([ property(cc.Node) ], MatchingCard.prototype, "left", void 0);
      __decorate([ property(cc.Node) ], MatchingCard.prototype, "right", void 0);
      __decorate([ property(cc.Node) ], MatchingCard.prototype, "match", void 0);
      __decorate([ property(cc.Node) ], MatchingCard.prototype, "truck", void 0);
      __decorate([ property(cc.Node) ], MatchingCard.prototype, "choice", void 0);
      __decorate([ error_handler_1.default() ], MatchingCard.prototype, "onLoad", null);
      MatchingCard = __decorate([ ccclass ], MatchingCard);
      return MatchingCard;
    }(game_1.default);
    exports.default = MatchingCard;
    cc._RF.pop();
  }, {
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0
  } ]
}, {}, [ "matchingcard" ]);