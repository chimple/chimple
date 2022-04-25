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
  taprise: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3726fWjxaxNu6O6gihwo23+", "taprise");
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TapRise = function(_super) {
      __extends(TapRise, _super);
      function TapRise() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bubble = null;
        _this.ai = 0;
        _this.countArr = [ 0, 10, 10, 1 ];
        _this.tap = [ 0, 1, 1, 100 ];
        _this.touchcount = 0;
        _this.destroyCount = 0;
        _this.touchArray = [ 0, 0, 0, 0, 0 ];
        _this.shouldTouch = true;
        _this.shouldGen = true;
        _this.endofgame = 0;
        _this.genval = 0;
        _this.auther = 1;
        return _this;
      }
      TapRise.prototype.onLoad = function() {
        var fieldArr = config_1.default.getInstance().data[0].toString().split(",").map(function(field) {
          return /^\d*\.?\d+$/.test(field) ? Number(field) : field;
        });
        cc.log("field " + fieldArr);
        this.nameOfGame = fieldArr[0], this.lev = fieldArr[1], this.description = fieldArr[2], 
        this.level = fieldArr[3], this.worksheet = fieldArr[4], this.problem = fieldArr[5], 
        this.objb = fieldArr[6];
        this.noobj = parseInt(this.objb);
        cc.log("obj" + this.noobj);
        for (var ai = 0; this.ai < this.noobj; this.ai++) this.generateObj(ai);
        this.x = 0;
        this.y = 100;
        this.levelint = parseInt(this.level);
        cc.log("lvl" + this.levelint);
        this.problemint = parseInt(this.problem);
        util_1.Util.showHelp(this.firstDrag, this.firstDrop);
      };
      TapRise.prototype.generateObj = function(indexx) {
        var _this = this;
        util_1.Util.loadFriend(function(friendNode) {
          _this.friendName = friendNode.name;
          console.log(_this.genval, "ai");
          _this.objin = cc.instantiate(_this.bubble);
          var yi = _this.getRandomArbitrary(-170, 170);
          _this.objin.parent = _this.node;
          if (0 == _this.ai) {
            _this.firstDrag = _this.objin;
            _this.firstDrop = _this.objin;
          }
          _this.objin.on(cc.Node.EventType.TOUCH_START, _this.onTouchStart, _this);
          _this.objin.on(cc.Node.EventType.TOUCH_END, _this.onTouchEnd, _this);
          _this.objin.on(cc.Node.EventType.TOUCH_CANCEL, _this.onTouchEnd, _this);
          var characterNode = _this.objin.getChildByName("charnode");
          if (null != characterNode) {
            friendNode.getComponent(cc.Button).interactable = false;
            characterNode.addChild(friendNode);
            util_1.Util.loadAccessoriesAndEquipAcc(friendNode.children[1], characterNode.getChildByName(friendNode.name));
            console.log(friendNode);
            var xcor = 200 * _this.genval - 400;
            cc.log("xcor" + xcor);
            _this.objin.position = cc.v2(xcor, yi);
            _this.objin.name = _this.genval.toString();
            _this.genval = _this.genval + 1;
          }
        });
      };
      TapRise.prototype.getRandomArbitrary = function(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      };
      TapRise.prototype.onTouchStart = function(touch) {
        var _this = this;
        var touchObj = touch.currentTarget;
        if (this.shouldTouch && this.shouldGen && 0 == touch.getID()) {
          cc.log("yx" + touchObj.y);
          this.namee = touchObj.name;
          if (3 != this.levelint) {
            var actiondx = cc.moveTo(2, cc.v2(touchObj.x, touchObj.y = touchObj.y + 10));
            touchObj.runAction(actiondx);
          }
          this.shouldTouch = false;
          if ("a" != touchObj.name && 1 != this.endofgame) {
            touchObj.zIndex = 1;
            this.node.emit("correct");
            this.charNode = touchObj.getChildByName("charnode");
            cc.log("qw" + this.touchArray[this.namee]);
            cc.log("namee" + this.namee);
            if (3 != this.levelint) {
              touchObj.getChildByName("cardParticlea").opacity = 255;
              touchObj.getChildByName("cardParticleb").opacity = 255;
              touchObj.getChildByName("flyboard").getComponent(cc.Animation).play();
              setTimeout(function() {
                touchObj.getChildByName("cardParticlea").opacity = 0;
                touchObj.getChildByName("cardParticleb").opacity = 0;
                touchObj.getChildByName("flyboard").getComponent(cc.Animation).stop();
              }, 500);
              setTimeout(function() {
                _this.shouldTouch = true;
              }, 700);
              this.timing = .3;
              var xran = this.getRandomArbitrary(1, 5);
              var labval = "labcenter";
              cc.log(labval + "xran");
              var labvalNode = touchObj.getChildByName(labval);
              if (null != labvalNode) {
                labvalNode.getComponent(cc.Label).string = (this.touchArray[parseInt(this.namee)] = this.touchArray[parseInt(this.namee)] + 1).toString();
                cc.log("result" + this.touchArray[parseInt(this.namee)]);
                if (10 == this.touchArray[parseInt(this.namee)]) {
                  touchObj.getChildByName("res").getComponent(cc.Label).string = (10 * this.problemint).toString();
                  var actionfly = cc.moveTo(3, cc.v2(0, 1500));
                  touchObj.runAction(actionfly);
                  touchObj.getChildByName("cardParticlea").opacity = 255;
                  touchObj.getChildByName("cardParticleb").opacity = 255;
                }
              }
            } else 3 == this.levelint && (this.timing = .7);
            new cc.Tween().target(this.node).to(this.timing, {}, {
              progress: null,
              easing: "sineOutIn"
            }).call(function() {
              var labvalNode = touchObj.getChildByName(labval);
              null != labvalNode && (labvalNode.getComponent(cc.Label).string = "");
            }).start();
          }
        }
      };
      TapRise.prototype.onTouchEnd = function(touch) {
        var _this = this;
        var touchEndObj = touch.currentTarget;
        var animation = touchEndObj.children[0].children[0].children[0].getComponent(dragonBones.ArmatureDisplay);
        touchEndObj.children[0].children[0].children[0].getComponent(dragonBones.ArmatureDisplay).playAnimation("joy", 1);
        touchEndObj.zIndex = 0;
        if (this.touchArray[parseInt(this.namee)] == this.countArr[this.levelint] && 3 != this.levelint && 1 != this.endofgame) {
          cc.log("this" + this.touchArray[parseInt(this.namee)]);
          if (3 != this.levelint) {
            this.shouldTouch = true;
            touchEndObj.getChildByName("flyboard").getComponent(cc.Animation).play();
            touchEndObj.getChildByName("cardParticle").opacity = 255;
          }
          animation.playAnimation("joy");
          touchEndObj.name = "a";
          this.destroyCount++;
          if (this.destroyCount == this.tap[this.levelint]) {
            this.endofgame = 1;
            cc.log("charge" + this.destroyCount + this.tap[this.levelint]);
            new cc.Tween().target(this.node).to(.5, {}, {
              progress: null,
              easing: "sineOutIn"
            }).call(function() {
              _this.node.emit("nextProblem");
            }).start();
          }
        } else if (3 == this.levelint && "a" != touchEndObj.name && 1 != this.endofgame && this.shouldGen) {
          this.shouldGen = false;
          var runtime = void 0;
          runtime = this.touchcount % 10 == 0 ? 3 : 2;
          var actiona = cc.moveTo(runtime, cc.v2(0, 1e3));
          setTimeout(function() {
            _this.shouldGen = true;
            _this.shouldTouch = true;
          }, 2e3);
          touchEndObj.runAction(actiona);
          touchEndObj.zIndex = 3;
          touchEndObj.name = "a";
          if (this.touchcount % 10 == 0) {
            touchEndObj.getChildByName("cardParticle").opacity = 255;
            touchEndObj.getChildByName("flyboard").getComponent(cc.Animation).play();
          }
          touchEndObj.getChildByName("cardParticlea").opacity = 255;
          touchEndObj.getChildByName("cardParticleb").opacity = 255;
          touchEndObj.getChildByName("flyboard").getComponent(cc.Animation).play();
          var me = 100;
          cc.log("me" + me);
          this.timing = .7;
          var labval = "labcenter";
          cc.log(labval + "labval");
          var labvalNode = touchEndObj.getChildByName(labval);
          if (null != labvalNode) {
            this.touchcount = this.touchcount + 1;
            if (this.touchcount % 10 != 0) {
              labvalNode.getComponent(cc.Label).string = this.touchcount.toString();
              touchEndObj.getChildByName("res").getComponent(cc.Label).string = this.touchcount.toString();
            }
            this.touchcount % 10 == 0 && (touchEndObj.getChildByName("res").getComponent(cc.Label).string = this.touchcount.toString());
          }
          new cc.Tween().target(this.node).to(2, {}, {
            progress: null,
            easing: "sineOutIn"
          }).call(function() {
            _this.auther = 1;
            _this.shouldTouch = true;
            var i = parseInt(_this.namee);
            cc.log("imi" + i);
            _this.objin = cc.instantiate(_this.bubble);
            var yi = _this.getRandomArbitrary(-250, 250);
            var xi = 150 * i - 300 + _this.getRandomArbitrary(-70, 100);
            _this.objin.position = cc.v2(xi, yi);
            _this.objin.parent = _this.node;
            _this.objin.name = i.toString();
            util_1.Util.loadFriend(function(friendNode) {
              var characterNode = _this.objin.getChildByName("charnode");
              if (null != characterNode) {
                characterNode.addChild(friendNode);
                util_1.Util.loadAccessoriesAndEquipAcc(friendNode.children[1], characterNode.getChildByName(friendNode.name));
                animation.playAnimation("joy");
              }
            });
            _this.objin.on(cc.Node.EventType.TOUCH_START, _this.onTouchStart, _this);
            _this.objin.on(cc.Node.EventType.TOUCH_END, _this.onTouchEnd, _this);
            _this.objin.on(cc.Node.EventType.TOUCH_CANCEL, _this.onTouchEnd, _this);
          }).start();
          this.destroyCount++;
          if (this.destroyCount == this.tap[this.levelint]) {
            cc.log("charge" + this.destroyCount + this.tap[this.levelint]);
            this.endofgame = 1;
            new cc.Tween().target(this.node).to(.5, {}, {
              progress: null,
              easing: "sineOutIn"
            }).call(function() {
              _this.node.emit("nextProblem");
            }).start();
          }
        }
      };
      __decorate([ property(cc.Prefab) ], TapRise.prototype, "bubble", void 0);
      __decorate([ error_handler_1.default() ], TapRise.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], TapRise.prototype, "generateObj", null);
      __decorate([ error_handler_1.default() ], TapRise.prototype, "getRandomArbitrary", null);
      __decorate([ error_handler_1.default() ], TapRise.prototype, "onTouchStart", null);
      __decorate([ error_handler_1.default() ], TapRise.prototype, "onTouchEnd", null);
      TapRise = __decorate([ ccclass ], TapRise);
      return TapRise;
    }(cc.Component);
    exports.default = TapRise;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0
  } ]
}, {}, [ "taprise" ]);