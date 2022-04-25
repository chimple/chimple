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
  "balloon-burst": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3109aM85OZHSpJ8F3Ie9Bok", "balloon-burst");
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
    var util_1 = require("../../../common/scripts/util");
    var balloonpop_1 = require("./balloonpop");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BalloonBurst = function(_super) {
      __extends(BalloonBurst, _super);
      function BalloonBurst() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      BalloonBurst_1 = BalloonBurst;
      BalloonBurst.prototype.onEnable = function() {
        this.enableTouch();
      };
      BalloonBurst.prototype.enableTouch = function() {
        this.node.on("touchstart", this.onTouchStart, this);
      };
      BalloonBurst.prototype.onTouchStart = function(touch) {
        if (null != this.node.getChildByName("label")) {
          this.node.getChildByName("label").destroy();
          this.node.getChildByName("balloon_texture").destroy();
          var letter = this.node.getComponentInChildren(cc.Label).string;
          letter >= "1" && letter <= "99" ? util_1.Util.loadNumericSound(letter, function(clip) {
            null != clip && util_1.Util.play(clip);
          }) : util_1.Util.loadsLetter(letter.toLowerCase(), function(clip) {
            null != clip && util_1.Util.play(clip);
          });
          this.burstBalloonAnimation();
          this.node.parent.getComponent("balloonpop").createSingleBallon(this.node.x);
          if (this.node.getComponentInChildren(cc.Label).string === balloonpop_1.default.correctLetter) {
            BalloonBurst_1.letterBursted = BalloonBurst_1.letterBursted + 1 / balloonpop_1.default.letterNo;
            this.node.parent.getComponent("balloonpop").letterProgress();
            BalloonBurst_1.wrongMoves = 0;
            this.node.parent.emit("correct");
          } else {
            if (BalloonBurst_1.letterBursted > 0) {
              BalloonBurst_1.letterBursted = BalloonBurst_1.letterBursted - 1 / balloonpop_1.default.letterNo;
              this.node.parent.getComponent("balloonpop").letterProgress();
            }
            this.node.parent.emit("wrong");
            BalloonBurst_1.wrongMoves++;
          }
        }
      };
      BalloonBurst.prototype.burstBalloonAnimation = function() {
        var balloonAnimation = this.node.getComponent(cc.Animation);
        null != balloonAnimation && balloonAnimation.play();
      };
      BalloonBurst.prototype.update = function(dt) {
        if (this.node.position.y > cc.winSize.height / 2) {
          this.node.parent.getComponent("balloonpop").createSingleBallon(this.node.x);
          this.node.destroy();
        }
      };
      var BalloonBurst_1;
      BalloonBurst.letterBursted = 0;
      BalloonBurst.wrongMoves = 0;
      BalloonBurst = BalloonBurst_1 = __decorate([ ccclass ], BalloonBurst);
      return BalloonBurst;
    }(drag_1.default);
    exports.default = BalloonBurst;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/util": void 0,
    "./balloonpop": "balloonpop"
  } ],
  balloonpop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3a473crEwRLD5IYdmHnutD8", "balloonpop");
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
    var lessonController_1 = require("../../../common/scripts/lessonController");
    var config_1 = require("../../../common/scripts/lib/config");
    var util_1 = require("../../../common/scripts/util");
    var balloon_burst_1 = require("./balloon-burst");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Balloonpop = function(_super) {
      __extends(Balloonpop, _super);
      function Balloonpop() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.balloon = null;
        _this.displayCard = null;
        _this.backgroundPlatform = null;
        _this.progressBar = null;
        _this.prgbar = null;
        _this.currentConfig = null;
        return _this;
      }
      Balloonpop_1 = Balloonpop;
      Balloonpop.prototype.onLoad = function() {
        var _this = this;
        cc.director.getPhysicsManager().enabled = true;
        var display = cc.instantiate(this.displayCard);
        var bgPlatfrom = cc.instantiate(this.backgroundPlatform);
        this.node.addChild(bgPlatfrom);
        bgPlatfrom.scale = 1;
        bgPlatfrom.setPosition(-cc.winSize.width / 2 + cc.winSize.height / 25, -390);
        this.node.addChild(display);
        this.currentConfig = this.processConfiguration(config_1.default.getInstance().data[0]);
        display.getChildByName("label").getComponent(cc.Label).string = this.currentConfig.answer;
        Balloonpop_1.correctLetter = this.currentConfig.answer;
        Balloonpop_1.letterNo = this.currentConfig.clickOnAnswer;
        this.friendPos.scale = .5;
        this.friendPos.setPosition(-cc.winSize.width / 2 + cc.winSize.height / 8, -cc.winSize.height / 2 + cc.winSize.height / 6.7);
        cc.tween(display).to(1, {
          scale: .5
        }, {
          easing: "quintInOut"
        }).call(function() {
          _this.playAudio();
          display.runAction(cc.sequence(cc.spawn(cc.moveTo(1, cc.v2(-cc.winSize.width / 2 + cc.winSize.height / 8, -cc.winSize.height / 2 + cc.winSize.height / 1.9), 0), cc.scaleTo(.5, .08)), cc.scaleTo(.5, .08), cc.callFunc(_this.displayLetterInProgressBar, _this, display), cc.callFunc(_this.displayProgressBar, _this, _this.name), cc.callFunc(_this.createBallon, _this, _this.name)));
        }).start();
      };
      Balloonpop.prototype.createBallon = function() {
        this.maxBalloon = Math.floor(cc.winSize.width / 160);
        cc.log(this.maxBalloon + "<------");
        for (var i = 1; i < this.maxBalloon; i++) {
          var ballon = cc.instantiate(this.balloon);
          this.node.addChild(ballon);
          ballon.getComponentInChildren(cc.Label).string = this.currentConfig.options[Math.floor(0 + Math.random() * (this.currentConfig.options.length - 0))];
          ballon.setPosition(-cc.winSize.width / 2 + cc.winSize.height / 8 + ballon.width * i, -480);
          var currentColor = cc.color(Math.round((205 * Math.random() + 50) % 255), Math.round((205 * Math.random() + 50) % 255), Math.round((205 * Math.random() + 50) % 255));
          ballon.getChildByName("balloon_texture").color = currentColor;
          ballon.addComponent(cc.RigidBody).gravityScale = .1 * Math.random() - .2;
          ballon.getChildByName("burst_node").color = currentColor;
        }
      };
      Balloonpop.prototype.createSingleBallon = function(xPos) {
        if (this.node.children.length < 20) {
          var ballon = cc.instantiate(this.balloon);
          this.node.addChild(ballon);
          ballon.getComponentInChildren(cc.Label).string = this.currentConfig.options[Math.floor(0 + Math.random() * (this.currentConfig.options.length - 0))];
          ballon.setPosition(-cc.winSize.width / 2 + cc.winSize.height / 8 + ballon.width * Math.floor(1 + Math.random() * (this.maxBalloon - 1)), -550);
          var currentColor = cc.color(Math.round((205 * Math.random() + 50) % 255), Math.round((205 * Math.random() + 50) % 255), Math.round((205 * Math.random() + 50) % 255));
          ballon.getChildByName("balloon_texture").color = currentColor;
          balloon_burst_1.default.wrongMoves >= 2 ? ballon.addComponent(cc.RigidBody).gravityScale = -.05 * Math.random() - .05 : ballon.addComponent(cc.RigidBody).gravityScale = .1 * Math.random() - .2;
          ballon.getChildByName("burst_node").color = currentColor;
        }
      };
      Balloonpop.prototype.playAudio = function() {
        this.currentConfig.answer >= "1" && this.currentConfig.answer <= "99" ? util_1.Util.loadNumericSound(this.currentConfig.answer, function(clip) {
          null != clip && lessonController_1.default.getFriend().speak(clip);
        }) : util_1.Util.loadsLetter(this.currentConfig.answer.toLowerCase(), function(clip) {
          null != clip && lessonController_1.default.getFriend().speak(clip);
        });
      };
      Balloonpop.prototype.displayProgressBar = function() {
        this.progressBar.active = true;
        this.progressBar.setPosition(-cc.winSize.width / 2 + cc.winSize.height / 8, -cc.winSize.height / 2 + cc.winSize.height / 1.4);
        this.prgbar.progress = 0;
      };
      Balloonpop.prototype.displayLetterInProgressBar = function(disp) {
        disp.getChildByName("frontFace").active = false;
        disp.getChildByName("shadowFace").active = false;
        disp.getChildByName("label").color = cc.Color.WHITE;
      };
      Balloonpop.prototype.letterProgress = function() {
        this.prgbar.progress = balloon_burst_1.default.letterBursted;
        if (this.prgbar.progress >= 1) {
          balloon_burst_1.default.letterBursted = 0;
          this.node.pauseSystemEvents(true);
          this.node.emit("correct");
          this.node.emit("nextProblem");
        }
      };
      Balloonpop.prototype.onDestroy = function() {
        balloon_burst_1.default.letterBursted = 0;
        this.node.destroy();
      };
      Balloonpop.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var level = configurations[0], worksheet = configurations[1], problem = configurations[2], problemCount = configurations[3], answer = configurations[4], clickOnAnswer = configurations[5], options = configurations[6], audio = configurations[7];
        options = options.split(",");
        return {
          level: level,
          worksheet: worksheet,
          problem: problem,
          problemCount: problemCount,
          answer: answer,
          clickOnAnswer: clickOnAnswer,
          options: options,
          audio: audio
        };
      };
      var Balloonpop_1;
      __decorate([ property(cc.Prefab) ], Balloonpop.prototype, "balloon", void 0);
      __decorate([ property(cc.Prefab) ], Balloonpop.prototype, "displayCard", void 0);
      __decorate([ property(cc.Prefab) ], Balloonpop.prototype, "backgroundPlatform", void 0);
      __decorate([ property(cc.Node) ], Balloonpop.prototype, "progressBar", void 0);
      __decorate([ property(cc.ProgressBar) ], Balloonpop.prototype, "prgbar", void 0);
      Balloonpop = Balloonpop_1 = __decorate([ ccclass ], Balloonpop);
      return Balloonpop;
    }(game_1.default);
    exports.default = Balloonpop;
    cc._RF.pop();
  }, {
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lessonController": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/util": void 0,
    "./balloon-burst": "balloon-burst"
  } ]
}, {}, [ "balloon-burst", "balloonpop" ]);