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
  card: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "74bbfoi9P1BsLbPdPwWvpFP", "card");
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
    var util_1 = require("../../../common/scripts/util");
    var letterpair_1 = require("./letterpair");
    var chimple_label_1 = require("../../../common/scripts/chimple-label");
    var countingLayout_1 = require("../../../common/scripts/countingLayout");
    var lessonController_1 = require("../../../common/scripts/lessonController");
    var config_1 = require("../../../common/scripts/lib/config");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var FRUITS = [ "items/fruit/peach", "items/fruit/xigua", "items/fruit/avacado", "items/fruit/pineapple", "items/fruit/mango", "items/fruit/dragonfruit", "items/fruit/nuts", "items/fruit/watermelon", "items/fruit/cherry", "items/fruit/orange", "items/fruit/grapes", "items/fruit/apple", "items/fruit/lemon", "items/fruit/banana", "items/fruit/acorn", "items/fruit/strawberry", "items/fruit/guava", "items/fruit/kiwi", "items/vegetable/potato", "items/vegetable/corn", "items/vegetable/capsicum", "items/vegetable/carrot", "items/vegetable/onion", "items/vegetable/tomato", "items/vegetable/chilly", "items/vegetable/garlic", "items/vegetable/peas", "items/vegetable/brinjal", "items/vegetable/spinach", "items/vegetable/cabbage", "items/vegetable/pumpkin", "items/vegetable/radish", "items/vegetable/broccoli" ];
    var Card = function(_super) {
      __extends(Card, _super);
      function Card() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.cardParticle = null;
        _this.explodeParticle = null;
        _this.countingLayout = null;
        _this.pickupAudio = null;
        _this.correctAudio = null;
        _this.wordAudio = null;
        _this.square = null;
        _this.rectangle = null;
        _this.block = null;
        _this.pairCard = null;
        _this.particleNode = null;
        _this.cardType = null;
        _this.cardContent = null;
        _this.audio = null;
        _this.color = null;
        _this.isInteracting = false;
        return _this;
      }
      Card_1 = Card;
      Card.prototype.onLoad = function() {
        var _this = this;
        this.node.on("touchstart", this.onTouchStart, this);
        this.node.on("touchend", this.onTouchEnd, this);
        this.node.on("touchcancel", this.onTouchEnd, this);
        this.node.on("touchmove", this.onTouchMove, this);
        var bgBack = null;
        var bgFront = null;
        var giftBox = "maths" == config_1.default.i.course.type ? cc.instantiate(this.rectangle) : cc.instantiate(this.square);
        bgBack = giftBox.getChildByName("giftbox");
        bgFront = giftBox.getChildByName("giftboxwhite");
        this.node.addChild(giftBox);
        if ("image" == this.cardType || "rotate" == this.cardType) util_1.Util.loadTexture(this.cardContent, function(texture) {
          var spriteNode = new cc.Node("frontSprite");
          var sprite = spriteNode.addComponent(cc.Sprite);
          sprite.spriteFrame = new cc.SpriteFrame(texture);
          "rotate" == _this.cardType && (spriteNode.angle = 90);
          _this.node.addChild(spriteNode);
          util_1.Util.resizeSprite(sprite, 120, 120);
        }); else if ("dice" == this.cardType) cc.resources.load("items/" + this.cardContent, cc.SpriteFrame, function(err, spriteFrame) {
          if (!err) {
            var spriteNode = new cc.Node("frontSprite");
            var sprite = spriteNode.addComponent(cc.Sprite);
            sprite.spriteFrame = spriteFrame;
            spriteNode.scale = .9;
            _this.node.addChild(spriteNode);
          }
        }); else if ("number" == this.cardType || "stick" == this.cardType) {
          var image = "number" == this.cardType ? FRUITS[Math.floor(Math.random() * FRUITS.length)] : "items/shake/stick";
          cc.resources.load(image, cc.SpriteFrame, function(err, spriteFrame) {
            if (!err) {
              var clNode = cc.instantiate(_this.countingLayout);
              var cl = clNode.getComponent(countingLayout_1.default);
              cl.fullCount = parseInt(_this.cardContent);
              cl.scale = .4;
              cl.fullTexture = spriteFrame;
              _this.node.addChild(clNode);
            }
          });
          0 == this.audio.length && util_1.Util.loadNumericSound(this.cardContent, function(clip) {
            if (clip) {
              _this.wordAudio = clip;
              _this.pairCard.wordAudio = clip;
            }
          });
        } else {
          var labelNode = new cc.Node("label");
          labelNode.height = .5 * this.node.height;
          labelNode.width = .8 * this.node.width;
          var label = labelNode.addComponent(chimple_label_1.default);
          label.string = this.cardContent;
          label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
          label.overflow = cc.Label.Overflow.SHRINK;
          label.enableWrapText = false;
          labelNode.color = this.color;
          label.fontSize = 128;
          label.lineHeight = 150;
          labelNode.position = new cc.Vec3(0, 12.8);
          this.node.addChild(labelNode);
          0 == this.audio.length && (isNaN(parseInt(this.cardContent)) ? util_1.Util.loadsLetter(this.cardContent.toLowerCase(), function(clip) {
            _this.wordAudio = clip;
          }) : util_1.Util.loadNumericSound(this.cardContent, function(clip) {
            _this.wordAudio = clip;
          }));
        }
        "maths" == config_1.default.i.course.type && "image" == this.cardType || "dice" == this.cardType ? bgFront.color = this.color : bgBack.color = this.color;
        this.audio.length > 0 && util_1.Util.loadGameSound(this.audio, function(clip) {
          _this.wordAudio = clip;
        });
      };
      Card.prototype.start = function() {
        var lastChar = this.node.name.charAt(this.node.name.length - 1);
        var toMatchName = this.node.name.substr(0, this.node.name.length - 1) + ("1" == lastChar ? "2" : "1");
        this.pairCard = this.node.parent.getChildByName(toMatchName).getComponent(Card_1);
      };
      Card.prototype.onDestroy = function() {
        this.unregisterTouch();
      };
      Card.prototype.unregisterTouch = function() {
        this.node.off("touchstart", this.onTouchStart, this);
        this.node.off("touchend", this.onTouchEnd, this);
        this.node.off("touchcancel", this.onTouchEnd, this);
        this.node.off("touchmove", this.onTouchMove, this);
      };
      Card.prototype.onTouchStart = function(touch) {
        var match = this.node.parent.parent.getComponent(letterpair_1.default);
        if (Card_1.letDrag) {
          Card_1.letDrag = false;
          this.isInteracting = true;
          this.node.zIndex = 3;
          util_1.Util.playSfx(this.pickupAudio);
          this.node.setSiblingIndex(this.node.parent.childrenCount - 1);
          new cc.Tween().target(this.node).to(.25, {
            scale: 1.1
          }, {
            progress: null,
            easing: "sineOut"
          }).start();
        }
      };
      Card.prototype.onTouchMove = function(touch) {
        if (this.isInteracting) {
          this.node.setPosition(this.node.position.add(touch.getDelta()));
          if (this.node.getBoundingBoxToWorld().intersects(this.pairCard.node.getBoundingBoxToWorld())) {
            this.sparkle();
            if (null != this.particleNode) {
              this.pairCard.node.setSiblingIndex(this.node.parent.childrenCount - 2);
              new cc.Tween().target(this.pairCard.node).to(.25, {
                scale: 1.1
              }, {
                progress: null,
                easing: "elasticOut"
              }).start();
              this.pairCard.node.zIndex = 2;
              this.pairCard.sparkle();
            }
          } else {
            this.unSparkle();
            new cc.Tween().target(this.pairCard.node).to(.25, {
              scale: 1
            }, {
              progress: null,
              easing: "elasticOut"
            }).start();
            this.pairCard.node.zIndex = 0;
            this.pairCard.unSparkle();
          }
        }
      };
      Card.prototype.onTouchEnd = function(touch) {
        var _this = this;
        if (this.isInteracting) if (null != this.particleNode) {
          var blockNode_1 = cc.instantiate(this.block);
          var blockWidget = blockNode_1.getComponent(cc.Widget);
          null != blockWidget && (blockWidget.target = cc.director.getScene());
          this.node.parent.addChild(blockNode_1);
          blockNode_1.opacity = 224;
          blockNode_1.zIndex = 1;
          new cc.Tween().target(lessonController_1.default.getFriend().node).to(.25, {
            y: 0
          }, {
            progress: null,
            easing: "sineOut"
          }).call(function() {
            _this.node.parent.parent.emit("correct");
          }).delay(1).to(.25, {
            y: -600
          }, {
            progress: null,
            easing: "sineOut"
          }).start();
          this.unregisterTouch();
          this.unSparkle();
          new cc.Tween().target(this.node).to(.25, {
            position: this.pairCard.node.position,
            scale: 1
          }, {
            progress: null,
            easing: "elasticOut"
          }).delay(.5).call(function() {
            null != _this.wordAudio && lessonController_1.default.getFriend().speak(_this.wordAudio);
          }).to(.5, {
            position: cc.v2(-this.node.width / 2 - 20, 0)
          }, null).delay(.5).call(function() {
            var explode = cc.instantiate(_this.explodeParticle);
            explode.position = _this.node.position;
            _this.node.parent.addChild(explode);
            var match = _this.node.parent.parent.getComponent(letterpair_1.default);
            match.scheduleOnce(function() {
              blockNode_1.destroy();
              Card_1.letDrag = true;
              _this.isInteracting = false;
              match.drop(true);
              _this.pairCard.node.destroy();
              _this.node.destroy();
            }, .25);
            match.scheduleOnce(function() {
              explode.destroy();
            }, .5);
          }).start();
          this.pairCard.unSparkle();
          new cc.Tween().target(this.pairCard.node).to(.25, {
            scale: 1
          }, {
            progress: null,
            easing: "elasticOut"
          }).delay(.5).to(.5, {
            position: cc.v2(this.node.width / 2 + 20, 0)
          }, null).delay(.5).call(function() {
            var explode = cc.instantiate(_this.explodeParticle);
            explode.position = _this.pairCard.node.position;
            _this.node.parent.addChild(explode);
            _this.node.parent.parent.getComponent(letterpair_1.default).scheduleOnce(function() {
              explode.destroy();
            }, .5);
          }).start();
        } else {
          new cc.Tween().target(lessonController_1.default.getFriend().node).to(.25, {
            y: 0
          }, {
            progress: null,
            easing: "sineOut"
          }).call(function() {
            _this.node.parent.parent.emit("wrong");
          }).delay(1).to(.25, {
            y: -600
          }, {
            progress: null,
            easing: "sineOut"
          }).start();
          new cc.Tween().target(this.node).to(.25, {
            scale: 1,
            position: this.node.position.clampf(new cc.Vec2(this.node.width - cc.winSize.width, this.node.height - cc.winSize.height).mul(.5), new cc.Vec2(cc.winSize.width - this.node.width, cc.winSize.height - this.node.height).mul(.5))
          }, {
            progress: null,
            easing: "sineOut"
          }).call(function() {
            var match = _this.node.parent.parent.getComponent(letterpair_1.default);
            Card_1.letDrag = true;
            _this.isInteracting = false;
            _this.node.zIndex = 0;
            _this.pairCard.node.zIndex = 0;
            match.drop(false);
          }).start();
          this.node.parent.children.forEach(function(element) {
            if (element != _this.node && element.getBoundingBox().intersects(_this.node.getBoundingBox())) {
              var inter = new cc.Rect();
              element.getBoundingBox().intersection(inter, _this.node.getBoundingBox());
              var mag = new cc.Vec2(inter.width / element.getBoundingBox().width, inter.height / element.getBoundingBox().height);
              var pos = element.position.add(element.position.sub(_this.node.position).scale(mag).mul(2)).clampf(new cc.Vec2(element.getBoundingBox().width - cc.winSize.width, element.getBoundingBox().height - cc.winSize.height).mul(.5), new cc.Vec2(cc.winSize.width - element.getBoundingBox().width, cc.winSize.height - element.getBoundingBox().height).mul(.5));
              new cc.Tween().target(element).to(.5, {
                position: pos
              }, {
                progress: null,
                easing: "quadOut"
              }).start();
            }
          });
        }
      };
      Card.prototype.sparkle = function() {
        if (null == this.particleNode) {
          this.particleNode = cc.instantiate(this.cardParticle);
          this.node.addChild(this.particleNode, 1, "particle");
        }
      };
      Card.prototype.unSparkle = function() {
        if (null != this.particleNode) {
          this.node.removeChild(this.particleNode);
          this.particleNode = null;
        }
      };
      var Card_1;
      Card.letDrag = true;
      __decorate([ property(cc.Prefab) ], Card.prototype, "cardParticle", void 0);
      __decorate([ property(cc.Prefab) ], Card.prototype, "explodeParticle", void 0);
      __decorate([ property(cc.Prefab) ], Card.prototype, "countingLayout", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], Card.prototype, "pickupAudio", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], Card.prototype, "correctAudio", void 0);
      __decorate([ property(cc.AudioClip) ], Card.prototype, "wordAudio", void 0);
      __decorate([ property(cc.Prefab) ], Card.prototype, "square", void 0);
      __decorate([ property(cc.Prefab) ], Card.prototype, "rectangle", void 0);
      __decorate([ property(cc.Prefab) ], Card.prototype, "block", void 0);
      Card = Card_1 = __decorate([ ccclass ], Card);
      return Card;
    }(cc.Component);
    exports.default = Card;
    cc._RF.pop();
  }, {
    "../../../common/scripts/chimple-label": void 0,
    "../../../common/scripts/countingLayout": void 0,
    "../../../common/scripts/lessonController": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/util": void 0,
    "./letterpair": "letterpair"
  } ],
  letterpair: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "93765v8zaxLGJHiUW+Jazhw", "letterpair");
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
    var card_1 = require("./card");
    var config_1 = require("../../../common/scripts/lib/config");
    var util_1 = require("../../../common/scripts/util");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var game_1 = require("../../../common/scripts/game");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var border = 80;
    var CONFIG_LEN = 3;
    var COLORS = [ "#E556F4", "#F1C82A", "#F25949", "#65179C", "#45BA0F", "#00CFFF", "#2C3E50", "#D9042B", "#1FB170", "#2980B9", "#FF6425" ];
    var LetterPair = function(_super) {
      __extends(LetterPair, _super);
      function LetterPair() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.cardPrefab = null;
        _this.progressMonitorPrefab = null;
        _this.totalPieces = 0;
        _this.isInteracting = false;
        return _this;
      }
      LetterPair.prototype.onLoad = function() {
        var _this = this;
        var data = config_1.default.getInstance().data[0];
        var numCards = 2 * Math.floor((data.length - 5) / CONFIG_LEN);
        var allValues = Array(numCards / 2);
        for (var i = 0; i < numCards; i++) {
          var place = Math.floor(Math.random() * numCards);
          var j = place;
          while (null != allValues[j]) j = (j + 1) % numCards;
          allValues[j] = i;
        }
        var boxWidth = (cc.winSize.width - border) / numCards * 2;
        var boxHeight = (cc.winSize.height - 2 * border) / 2;
        var prefix = 0;
        var card1Type = data[3];
        var card2Type = data[4];
        for (var index = 0; index < numCards / 2; index++) {
          var color = new cc.Color().fromHEX(COLORS[index]);
          var card1 = cc.instantiate(this.cardPrefab);
          card1.name = prefix + "1";
          var cardComp1 = card1.getComponent(card_1.default);
          cardComp1.cardType = card1Type;
          cardComp1.color = color;
          cardComp1.cardContent = data[index * CONFIG_LEN + 5];
          cardComp1.audio = data[index * CONFIG_LEN + 7];
          card1.position = new cc.Vec2(boxWidth * (allValues[prefix] % (numCards / 2)) + Math.random() * (boxWidth - border) - cc.winSize.width / 2 + border, boxHeight * Math.floor(allValues[prefix] / numCards * 2) + Math.random() * (boxHeight - border) - cc.winSize.height / 2 + border);
          var card2 = cc.instantiate(this.cardPrefab);
          card2.name = prefix + "2";
          prefix++;
          var cardComp2 = card2.getComponent(card_1.default);
          cardComp2.cardType = card2Type;
          cardComp2.color = color;
          cardComp2.cardContent = data[index * CONFIG_LEN + 6];
          cardComp2.audio = data[index * CONFIG_LEN + 7];
          card2.position = new cc.Vec2(boxWidth * (allValues[prefix] % (numCards / 2)) + Math.random() * (boxWidth - border) - cc.winSize.width / 2 + border, boxHeight * Math.floor(allValues[prefix] / numCards * 2) + Math.random() * (boxHeight - border) - cc.winSize.height / 2 + border);
          this.node.getChildByName("CardContainer").addChild(card1);
          this.node.getChildByName("CardContainer").addChild(card2);
          prefix++;
          this.totalPieces++;
          2 == prefix && util_1.Util.showHelp(card1, card2, function() {
            new cc.Tween().target(_this.friend.node).to(.25, {
              y: -600
            }, {
              progress: null,
              easing: "sineOut"
            }).start();
          });
        }
        card_1.default.letDrag = true;
      };
      LetterPair.prototype.drop = function(isMatch) {
        this.isInteracting = false;
        isMatch && --this.totalPieces <= 0 && this.node.emit("nextProblem");
      };
      LetterPair.prototype.drag = function() {
        if (!this.isInteracting) {
          this.isInteracting = true;
          return true;
        }
        return false;
      };
      __decorate([ property(cc.Prefab) ], LetterPair.prototype, "cardPrefab", void 0);
      __decorate([ property(cc.Prefab) ], LetterPair.prototype, "progressMonitorPrefab", void 0);
      __decorate([ error_handler_1.default() ], LetterPair.prototype, "onLoad", null);
      LetterPair = __decorate([ ccclass ], LetterPair);
      return LetterPair;
    }(game_1.default);
    exports.default = LetterPair;
    cc._RF.pop();
  }, {
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./card": "card"
  } ]
}, {}, [ "card", "letterpair" ]);