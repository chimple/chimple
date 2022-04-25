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
  "balancing-button": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f3d32S9ObxIyJpgmL+EfSK7", "balancing-button");
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
    var balancing_1 = require("./balancing");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var BalancingButton = function(_super) {
      __extends(BalancingButton, _super);
      function BalancingButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._clicked = false;
        _this._enabled = false;
        return _this;
      }
      BalancingButton.prototype.onLoad = function() {
        this._enabled = true;
      };
      BalancingButton.prototype.onButtonClick = function(event, customEventData) {
        if (!this._clicked && this._enabled) {
          this._clicked = true;
          var customEvent = new cc.Event.EventCustom(balancing_1.BALANCE_BTN_CLICKED, true);
          customEvent.setUserData({
            type: this.node.name
          });
          this.node.dispatchEvent(customEvent);
        }
      };
      BalancingButton.prototype.makeInteractable = function(interactable) {
        var butComp = this.node.getComponent(cc.Button);
        if (butComp) {
          butComp.interactable = interactable;
          this._enabled = interactable;
        }
      };
      Object.defineProperty(BalancingButton.prototype, "clicked", {
        set: function(c) {
          this._clicked = c;
        },
        enumerable: false,
        configurable: true
      });
      __decorate([ error_handler_1.default() ], BalancingButton.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], BalancingButton.prototype, "onButtonClick", null);
      __decorate([ error_handler_1.default() ], BalancingButton.prototype, "makeInteractable", null);
      BalancingButton = __decorate([ ccclass ], BalancingButton);
      return BalancingButton;
    }(cc.Component);
    exports.default = BalancingButton;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/error-handler": void 0,
    "./balancing": "balancing"
  } ],
  balancing: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "80af9ysOR1FIJNUu6o0KJj0", "balancing");
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
    exports.BALANCE_BTN_CLICKED = exports.BACK_GROUND = exports.RIGHT_BTN = exports.LEFT_BTN = exports.EQUAL_BTN = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var game_1 = require("../../../common/scripts/game");
    var config_1 = require("../../../common/scripts/lib/config");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var util_1 = require("../../../common/scripts/util");
    var balancing_button_1 = require("./balancing-button");
    exports.EQUAL_BTN = "equalBtn";
    exports.LEFT_BTN = "leftBtn";
    exports.RIGHT_BTN = "rightBtn";
    exports.BACK_GROUND = "Background";
    exports.BALANCE_BTN_CLICKED = "BalanceBtnClicked";
    var BALANCING_MACHINE_NODE = "balancingmachine_node";
    var RIGHT_BUCKET = "right_bucket";
    var LEFT_BUCKET = "left_bucket";
    var LEFT_NODE = "left_node";
    var RIGHT_NODE = "right_node";
    var LEFT = "left";
    var RIGHT = "right";
    var Balancing = function(_super) {
      __extends(Balancing, _super);
      function Balancing() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._currentConfig = null;
        _this._images = [ "apple", "guava", "orange", "peach" ];
        _this.apple = null;
        _this.guava = null;
        _this.orange = null;
        _this.peach = null;
        _this.numberLabelPrefab = null;
        _this.imageNodePrefab = null;
        _this.loadingAudio = null;
        _this.correctAudio = null;
        _this.inCorrectAudio = null;
        _this._leftCount = null;
        _this._rightCount = null;
        _this._leftBucket = null;
        _this._rightBucket = null;
        _this._leftBtn = null;
        _this._rightBtn = null;
        _this._equalBtn = null;
        _this._correctAnswered = false;
        return _this;
      }
      Balancing.prototype.onLoad = function() {
        var _this = this;
        this._currentConfig = this.processConfiguration(config_1.default.getInstance().data[0]);
        this.buildUI();
        this.node.on(exports.BALANCE_BTN_CLICKED, function(event) {
          event.stopPropagation();
          var data = event.getUserData();
          _this.checkResult(data.type);
        });
      };
      Balancing.prototype.checkResult = function(sign) {
        switch (sign) {
         case exports.LEFT_BTN:
          this._leftCount > this._rightCount ? this.playCorrectAnimation() : this.playWrongAnimation();
          break;

         case exports.RIGHT_BTN:
          this._leftCount < this._rightCount ? this.playCorrectAnimation() : this.playWrongAnimation();
          break;

         case exports.EQUAL_BTN:
          this._leftCount === this._rightCount ? this.playCorrectAnimation() : this.playWrongAnimation();
        }
      };
      Balancing.prototype.foodFeedingAnim = function(isLeft) {
        var _this = this;
        var xMove = isLeft ? 340 : -350;
        var node = isLeft ? this._leftBucket : this._rightBucket;
        return new cc.Tween().target(node).call(function() {
          _this.friend.playAnimation("eating", 1);
        }).parallel(new cc.Tween().to(.75, {
          x: node.x + xMove
        }, {
          progress: null,
          easing: "quadOut"
        }), new cc.Tween().to(.75, {
          y: node.y - 10
        }, {
          progress: null,
          easing: "backOut"
        }), new cc.Tween().to(.75, {
          scale: .5
        }, {
          progress: null,
          easing: "backOut"
        })).to(.75, {
          scale: 0
        }, {
          progress: null,
          easing: "backOut"
        });
      };
      Balancing.prototype.playFeedDog = function() {
        var _this = this;
        return this._leftCount > this._rightCount ? this.foodFeedingAnim(true) : this._leftCount < this._rightCount ? this.foodFeedingAnim(false) : this.foodFeedingAnim(true).call(function() {
          _this.foodFeedingAnim(false).start();
        });
      };
      Balancing.prototype.playCorrectAnimation = function() {
        var _this = this;
        try {
          this._leftBtn.getComponent(balancing_button_1.default).makeInteractable(false);
          this._rightBtn.getComponent(balancing_button_1.default).makeInteractable(false);
          this._equalBtn.getComponent(balancing_button_1.default).makeInteractable(false);
          if (!this._correctAnswered) {
            this._correctAnswered = true;
            this.node.emit("correct");
            this.scheduleOnce(function() {
              _this.playFeedDog().call(function() {
                _this.scheduleOnce(function() {
                  _this.node.emit("nextProblem");
                }, 1);
              }).start();
            }, 2);
          }
        } catch (e) {}
      };
      Balancing.prototype.playWrongAnimation = function() {
        var _this = this;
        try {
          if (!this._correctAnswered) {
            this.node.emit("wrong");
            this.scheduleOnce(function() {
              _this._leftBtn.getComponent(balancing_button_1.default).clicked = false;
              _this._rightBtn.getComponent(balancing_button_1.default).clicked = false;
              _this._equalBtn.getComponent(balancing_button_1.default).clicked = false;
            }, .5);
          }
        } catch (e) {}
      };
      Balancing.prototype.createImage = function(index, selectedImage) {
        var image = cc.instantiate(this.imageNodePrefab);
        image.getComponent(cc.Sprite).spriteFrame = this[selectedImage];
        return image;
      };
      Balancing.prototype.buildUI = function() {
        this._leftBucket = this.node.getChildByName(BALANCING_MACHINE_NODE).getChildByName(LEFT_BUCKET).getChildByName(LEFT_NODE);
        this.setUpBucket(this._leftBucket, LEFT);
        this._rightBucket = this.node.getChildByName(BALANCING_MACHINE_NODE).getChildByName(RIGHT_BUCKET).getChildByName(RIGHT_NODE);
        this.setUpBucket(this._rightBucket, RIGHT);
        this._leftBtn = this.node.getChildByName(exports.LEFT_BTN);
        this._rightBtn = this.node.getChildByName(exports.RIGHT_BTN);
        this._equalBtn = this.node.getChildByName(exports.EQUAL_BTN);
        this.loadingAnimation();
      };
      Balancing.prototype.playLoadingSound = function(loop, time) {
        var _this = this;
        if (loop > 0) {
          loop--;
          this.scheduleOnce(function() {
            try {
              if (!!_this.loadingAudio) {
                util_1.Util.playSfx(_this.loadingAudio);
                _this.playLoadingSound(loop, time / 2);
              }
            } catch (e) {}
          }, time);
        }
      };
      Balancing.prototype.loadingAnimation = function() {
        var _this = this;
        var anim = this.node.getComponent(cc.Animation);
        this.playLoadingSound(2, .5);
        anim.play("introduction_balance");
        this.scheduleOnce(function() {
          _this._leftCount > _this._rightCount ? util_1.Util.showHelp(_this._leftBtn, _this._leftBtn) : _this._leftCount < _this._rightCount ? util_1.Util.showHelp(_this._rightBtn, _this._rightBtn) : util_1.Util.showHelp(_this._equalBtn, _this._equalBtn);
        }, 1);
      };
      Balancing.prototype.setUpBucket = function(node, bucketType) {
        switch (this._currentConfig[bucketType + "Property"]) {
         case "image":
          this["_" + bucketType + "Count"] = Number(this._currentConfig[bucketType + "1Count"]);
          console.log("count for " + bucketType + this._currentConfig[bucketType + "1Count"]);
          console.log("counter property", this["_" + bucketType + "Count"]);
          this.buildStack(bucketType, node, this._currentConfig[bucketType + "1Count"]);
          break;

         case "number":
          if (!this._currentConfig[bucketType + "1Count"] || !this._currentConfig[bucketType + "2Count"] || !this._currentConfig[bucketType + "Operator"]) {
            this["_" + bucketType + "Count"] = Number(this._currentConfig[bucketType + "1Count"]);
            this.showNumber(node, this._currentConfig[bucketType + "1Count"]);
          } else {
            switch (this._currentConfig[bucketType + "Operator"]) {
             case "+":
              this["_" + bucketType + "Count"] = Number(this._currentConfig[bucketType + "1Count"]) + Number(this._currentConfig[bucketType + "2Count"]);
              break;

             case "-":
              this["_" + bucketType + "Count"] = Number(this._currentConfig[bucketType + "1Count"]) - Number(this._currentConfig[bucketType + "2Count"]);
            }
            this.equation(node, this._currentConfig[bucketType + "1Count"], this._currentConfig[bucketType + "Operator"], this._currentConfig[bucketType + "2Count"]);
          }
        }
      };
      Balancing.prototype.equation = function(bucketNode, c1, op, c2) {
        this.showNumber(bucketNode, c1 + op + c2);
      };
      Balancing.prototype.showNumber = function(bucketNode, c1) {
        var numberNode = cc.instantiate(this.numberLabelPrefab);
        var label = numberNode.getChildByName("label");
        if (null !== label) {
          var labelComponent = label.getComponent(cc.Label);
          labelComponent.string = String(c1);
          labelComponent.fontSize = 120;
          bucketNode.addChild(numberNode);
          var outLine = label.addComponent(cc.LabelOutline);
          outLine.width = 2;
          numberNode.position = new cc.Vec2(0, 0);
        }
      };
      Balancing.prototype.buildStack = function(bucketType, node, c1) {
        var maxElementInRow = 0;
        var trayWidth = node.getParent().width;
        var selectedImage = util_1.Util.randomElements(this._images, 1)[0];
        for (var i = 0; i < c1; i++) {
          var imageSprite = this.createImage(bucketType === LEFT ? 0 : 1, selectedImage);
          node.addChild(imageSprite);
          maxElementInRow = 3;
          imageSprite.position = new cc.Vec2((i % maxElementInRow === 0 ? 0 : i % maxElementInRow === 1 ? -1 : 1) * imageSprite.width, Math.floor(i / maxElementInRow) * imageSprite.height);
        }
      };
      Balancing.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var level = configurations[0], worksheet = configurations[1], problem = configurations[2], leftProperty = configurations[3], left1Count = configurations[4], leftOperator = configurations[5], left2Count = configurations[6], rightProperty = configurations[7], right1Count = configurations[8], rightOperator = configurations[9], right2Count = configurations[10];
        return {
          level: level,
          worksheet: worksheet,
          problem: problem,
          leftProperty: leftProperty,
          left1Count: left1Count,
          leftOperator: leftOperator,
          left2Count: left2Count,
          rightProperty: rightProperty,
          right1Count: right1Count,
          rightOperator: rightOperator,
          right2Count: right2Count
        };
      };
      __decorate([ property(cc.SpriteFrame) ], Balancing.prototype, "apple", void 0);
      __decorate([ property(cc.SpriteFrame) ], Balancing.prototype, "guava", void 0);
      __decorate([ property(cc.SpriteFrame) ], Balancing.prototype, "orange", void 0);
      __decorate([ property(cc.SpriteFrame) ], Balancing.prototype, "peach", void 0);
      __decorate([ property(cc.Prefab) ], Balancing.prototype, "numberLabelPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Balancing.prototype, "imageNodePrefab", void 0);
      __decorate([ property(cc.AudioClip) ], Balancing.prototype, "loadingAudio", void 0);
      __decorate([ property(cc.AudioClip) ], Balancing.prototype, "correctAudio", void 0);
      __decorate([ property(cc.AudioClip) ], Balancing.prototype, "inCorrectAudio", void 0);
      __decorate([ error_handler_1.catchError() ], Balancing.prototype, "onLoad", null);
      __decorate([ error_handler_1.catchError() ], Balancing.prototype, "foodFeedingAnim", null);
      __decorate([ error_handler_1.catchError() ], Balancing.prototype, "playFeedDog", null);
      __decorate([ error_handler_1.catchError() ], Balancing.prototype, "playCorrectAnimation", null);
      __decorate([ error_handler_1.catchError() ], Balancing.prototype, "playWrongAnimation", null);
      __decorate([ error_handler_1.catchError() ], Balancing.prototype, "createImage", null);
      __decorate([ error_handler_1.catchError() ], Balancing.prototype, "buildUI", null);
      __decorate([ error_handler_1.catchError() ], Balancing.prototype, "playLoadingSound", null);
      __decorate([ error_handler_1.catchError() ], Balancing.prototype, "loadingAnimation", null);
      __decorate([ error_handler_1.catchError() ], Balancing.prototype, "setUpBucket", null);
      __decorate([ error_handler_1.catchError() ], Balancing.prototype, "equation", null);
      __decorate([ error_handler_1.catchError() ], Balancing.prototype, "showNumber", null);
      __decorate([ error_handler_1.catchError() ], Balancing.prototype, "buildStack", null);
      Balancing = __decorate([ ccclass ], Balancing);
      return Balancing;
    }(game_1.default);
    exports.default = Balancing;
    cc._RF.pop();
  }, {
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./balancing-button": "balancing-button"
  } ]
}, {}, [ "balancing-button", "balancing" ]);