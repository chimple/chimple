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
  ball: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c5b8dPAkWlICI8Qm3q02Ske", "ball");
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
    var groupsum_1 = require("./groupsum");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Ball = function(_super) {
      __extends(Ball, _super);
      function Ball() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.homePos = null;
        _this.box1Rect = null;
        _this.box2Rect = null;
        _this.hasTouchEnd = false;
        _this.hasTouchCanceled = false;
        _this.hasPlacedBallWrong = false;
        _this.hasTouchMoved = false;
        return _this;
      }
      Ball.prototype.onLoad = function() {
        cc.director.getPhysicsManager().enabled = true;
        this.node.on("touchstart", this.onTouchStart, this);
        this.node.on("touchend", this.onTouchCancel, this);
        this.node.on("touchmove", this.onTouchMove, this);
        this.node.on("touchcancel", this.onTouchCancel, this);
      };
      Ball.prototype.onDestroy = function() {
        this.node.off("touchstart", this.onTouchStart, this);
        this.node.off("touchmove", this.onTouchMove, this);
        this.node.off("touchend", this.onTouchCancel, this);
        this.node.off("touchcancel", this.onTouchCancel, this);
      };
      Ball.prototype.onTouchStart = function(touch) {
        if (0 == touch.getID()) {
          this.node.getComponent(cc.PhysicsCircleCollider).sensor = true;
          this.hasTouchEnd = false;
          this.touchedBallName = this.node.name;
          this.node.getComponent(cc.RigidBody).active = false;
          this.node.parent.getComponent(groupsum_1.default).draggedBall = this.node.name;
          this.node.parent.getComponent(groupsum_1.default).checkFinishCtl(false, true);
          this.node.zIndex = 1;
        }
      };
      Ball.prototype.onTouchMove = function(touch) {
        if (0 == touch.getID()) {
          this.hasTouchMoved = true;
          this.node.getComponent(cc.RigidBody).node.setPosition(this.node.position.add(touch.getDelta()));
          if (this.node.position.y < -cc.winSize.height / 2 + 60) {
            this.touchFinished(touch);
            this.hasTouchCanceled = true;
            this.node.off("touchmove", this.onTouchMove, this);
          }
        }
      };
      Ball.prototype.onTouchCancel = function(touch) {
        if (this.hasTouchCanceled) {
          cc.log("hi new test ");
          this.hasTouchCanceled = false;
          this.node.on("touchmove", this.onTouchMove, this);
        } else this.touchFinished(touch);
      };
      Ball.prototype.touchFinished = function(touch) {
        var tub = this.node.parent.getChildByName("tub1");
        this.node.y < tub.getPosition().y - tub.height / 2 ? this.node.parent.getComponent(groupsum_1.default).checkFinishCtl(true, false) : this.node.parent.getComponent(groupsum_1.default).checkFinishCtl(false, false);
        this.node.getComponent(cc.PhysicsCircleCollider).sensor = false;
        this.node.getComponent(cc.RigidBody).active = true;
        this.hasTouchEnd = true;
        if (this.hasTouchMoved) {
          this.hasTouchMoved = false;
          this.node.getBoundingBoxToWorld().intersects(tub.getChildByName("covering collider").getBoundingBoxToWorld()) ? this.hasPlacedBallWrong = true : null != this.node.parent.getChildByName("tub2") && this.node.getBoundingBoxToWorld().intersects(this.node.parent.getChildByName("tub2").getChildByName("covering collider").getBoundingBoxToWorld()) && (this.hasPlacedBallWrong = true);
        }
        this.node.parent.getComponent(groupsum_1.default).draggedBall = "";
      };
      Ball.prototype.handleNodeTouch = function(handle) {
        if ("off" == handle) {
          this.node.off("touchstart", this.onTouchStart, this);
          this.node.off("touchend", this.onTouchCancel, this);
          this.node.off("touchmove", this.onTouchMove, this);
          this.node.off("touchcancel", this.onTouchCancel, this);
        } else if ("on" == handle) {
          this.node.on("touchstart", this.onTouchStart, this);
          this.node.on("touchend", this.onTouchCancel, this);
          this.node.on("touchmove", this.onTouchMove, this);
          this.node.on("touchcancel", this.onTouchCancel, this);
        }
      };
      Ball.prototype.onBeginContact = function(contact, selfCollider, otherCollider) {
        var velocity = selfCollider.node.getComponent(cc.RigidBody).linearVelocity.y;
        cc.log("wrong" + this.hasPlacedBallWrong);
        if (this.hasPlacedBallWrong) if ("colliderLine" == otherCollider.node.name) {
          contact.disabled = false;
          this.hasPlacedBallWrong = false;
        } else (otherCollider.node.name.startsWith("tub") || "ball" == otherCollider.node.name) && (contact.disabled = true);
        if (this.hasTouchEnd) {
          velocity < -110 && !contact.disabled && this.node.parent.getComponent(groupsum_1.default).playBallAudio();
          velocity > -21 && this.node.parent.getComponent(groupsum_1.default).checkFinishCtl(true, false);
        }
      };
      __decorate([ error_handler_1.catchError() ], Ball.prototype, "onLoad", null);
      __decorate([ error_handler_1.catchError() ], Ball.prototype, "onDestroy", null);
      __decorate([ error_handler_1.catchError() ], Ball.prototype, "onTouchStart", null);
      __decorate([ error_handler_1.catchError() ], Ball.prototype, "onTouchMove", null);
      __decorate([ error_handler_1.catchError() ], Ball.prototype, "onTouchCancel", null);
      __decorate([ error_handler_1.catchError() ], Ball.prototype, "touchFinished", null);
      __decorate([ error_handler_1.catchError() ], Ball.prototype, "handleNodeTouch", null);
      __decorate([ error_handler_1.catchError() ], Ball.prototype, "onBeginContact", null);
      Ball = __decorate([ ccclass ], Ball);
      return Ball;
    }(cc.Component);
    exports.default = Ball;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/error-handler": void 0,
    "./groupsum": "groupsum"
  } ],
  groupsum: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "39b92yLE6tEi65ekAba27Th", "groupsum");
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
    exports.GROUND = void 0;
    var ball_1 = require("./ball");
    var config_1 = require("../../../common/scripts/lib/config");
    var util_1 = require("../../../common/scripts/util");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var game_1 = require("../../../common/scripts/game");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    exports.GROUND = 50;
    var GROUND_TUB = 200;
    var GroupSum = function(_super) {
      __extends(GroupSum, _super);
      function GroupSum() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ballAudio = null;
        _this.clearAudio = null;
        _this.ballPrefab = null;
        _this.boxPrefab = null;
        _this.tubPrefab = null;
        _this.helpLabelPrefab = null;
        _this.boxIndex = [ 3, 4, 5, 6, 7, 8 ];
        _this.tub2Count = 0;
        _this.groundBallCount = 0;
        _this.totalPieces = 0;
        _this.count = 0;
        _this.isScrolling = false;
        _this.draggedBall = "";
        _this.firstDrag = null;
        _this.firstDrop = null;
        _this.hasScrollComplete = false;
        return _this;
      }
      GroupSum.prototype.onLoad = function() {
        var data = config_1.default.getInstance().data[0];
        cc.director.getPhysicsManager().enabled = true;
        this.animAudio("problem_clear");
        this.totalPieces++;
        cc.log(data);
        this.boxHomePos = new Map();
        this.ballCurrentPlace = new Map();
        this.audioName = [];
        var fieldArr = data.toString().split(",");
        this.mode = "true" == fieldArr[8] ? "subtraction" : "addition";
        this.showAnswer = "true" == fieldArr[9];
        this.tub1Count = +fieldArr[3];
        this.tub2Count = +fieldArr[5];
        this.groundBallCount = +fieldArr[5];
        this.totalCount = this.tub1Count + this.tub2Count;
        this.finishCount = this.showAnswer ? 3 : 5;
        this.firstDrop = new cc.Node();
        var ac = 3;
        while (ac < 8) {
          this.audioName.push(fieldArr[ac]);
          ac++;
        }
        var tub1;
        var tub2;
        cc.log(fieldArr[3] + fieldArr[4] + fieldArr[8] + this.mode);
        var tubY = -cc.winSize.height / 2 + GROUND_TUB + exports.GROUND;
        if ("addition" == this.mode) {
          tub1 = cc.instantiate(this.tubPrefab);
          tub1.name = "tub1";
          this.node.addChild(tub1);
          tub2 = cc.instantiate(this.tubPrefab);
          tub2.name = "tub2";
          this.node.addChild(tub2);
          tub1.getComponent(cc.RigidBody).node.position = cc.v2(-300, tubY);
          tub1.getChildByName("colliderLine").getComponent(cc.RigidBody).node.position = cc.v2(0, tubY);
          tub2.getComponent(cc.RigidBody).node.position = cc.v2(300, tubY);
          tub2.getChildByName("colliderLine").getComponent(cc.RigidBody).node.position = cc.v2(0, tubY);
          this.firstDrop.parent = tub1;
          this.firstDrop.y += tub1.y + 380;
        } else {
          tub1 = cc.instantiate(this.tubPrefab);
          tub1.name = "tub1";
          this.node.addChild(tub1);
          tub1.getComponent(cc.RigidBody).node.position = cc.v2(0, tubY);
          tub1.getChildByName("colliderLine").getComponent(cc.RigidBody).node.position = cc.v2(0, tubY);
          this.firstDrop.parent = tub1;
          this.firstDrop.position = cc.v2(-350, -150);
        }
        var box1Rect = this.node.getChildByName("tub1").getBoundingBox();
        var loopLen = this.totalCount;
        "subtraction" == this.mode && (loopLen = +fieldArr[3]);
        for (var i = 0, j = box1Rect.y + 45; i < loopLen; i++) {
          var ball = cc.instantiate(this.ballPrefab);
          var ballComp = ball.getComponent(ball_1.default);
          this.node.addChild(ball);
          0 == i && (this.firstDrag = ball);
          if ("subtraction" == this.mode) {
            ballComp.mode = this.mode;
            ballComp.name = i.toString();
            ballComp.homeName = "tub1";
            ballComp.box1Rect = box1Rect;
            i % 6 == 5 && (j += 10 + ball.height);
            ball.position = cc.v2(box1Rect.x + i % 6 * (ball.width - 5) + 130, j);
            ballComp.homePos = ball.position;
          } else {
            ball.position = cc.v2(Math.random() * cc.winSize.width - cc.winSize.width / 2, -cc.winSize.height / 2 + 80);
            ballComp.homePos = ball.position;
            ballComp.homeName = "ground";
            ballComp.mode = this.mode;
            ballComp.name = i.toString();
            ballComp.box1Rect = box1Rect;
            ballComp.box2Rect = this.node.getChildByName("tub2").getBoundingBox();
          }
        }
        var helpLabel1 = cc.instantiate(this.helpLabelPrefab);
        var helpLabel2 = cc.instantiate(this.helpLabelPrefab);
        var helpLabel3 = cc.instantiate(this.helpLabelPrefab);
        var helpLabel4 = cc.instantiate(this.helpLabelPrefab);
        helpLabel1.getComponent(cc.Label).string = fieldArr[3];
        helpLabel2.getComponent(cc.Label).string = fieldArr[5];
        helpLabel3.getComponent(cc.Label).string = fieldArr[3];
        helpLabel4.getComponent(cc.Label).fontSize = 35;
        if ("subtraction" == this.mode) {
          helpLabel1.getComponent(cc.Label).fontSize = 35;
          helpLabel1.opacity = 0;
          helpLabel3.parent = tub1;
          helpLabel3.position = cc.v2(box1Rect.origin.x - 7, box1Rect.height - 70);
          helpLabel1.parent = tub1;
          helpLabel1.name = "help1";
          helpLabel4.parent = tub1;
          helpLabel4.name = "help4";
          helpLabel1.position = cc.v2(box1Rect.width / 2 - 80, box1Rect.height / 2 - 80);
          helpLabel4.position = cc.v2(100, -box1Rect.height / 2 - 20);
          helpLabel2.parent = tub1;
          helpLabel2.position = cc.v2(-310, -75);
          helpLabel2.zIndex = 1;
        } else {
          helpLabel1.parent = this.node;
          helpLabel1.position = box1Rect.center;
          helpLabel2.parent = this.node;
          helpLabel2.position = this.node.getChildByName("tub2").getBoundingBox().center;
        }
        var slot = new cc.Node();
        this.node.addChild(slot);
        slot.position = cc.v2(0, 0);
        slot.name = "box_slot";
        for (var i = 0, j = 3; i < 5; i++, j++) {
          var box = cc.instantiate(this.boxPrefab);
          slot.addChild(box);
          box.position = cc.v2(150 * i - 300, -460);
          box.name = fieldArr[j];
          if (this.showAnswer && ("=" == fieldArr[j] || "+" == fieldArr[j] || "-" == fieldArr[j])) {
            box.getChildByName("label").getComponent(cc.Label).string = fieldArr[j];
            box.name = fieldArr[j] + "_operator";
          }
        }
        this.boxIndex = this.shuffle(this.boxIndex);
        var random = Math.round(this.getRandom(1, 9));
        while (random == +fieldArr[3] || random == +fieldArr[5] || random == +fieldArr[7]) random = Math.round(this.getRandom(1, 9));
        this.notCompare = random.toString();
        for (var i = 0, j = 3; i < 6; i++) {
          var box = cc.instantiate(this.boxPrefab);
          slot.addChild(box);
          box.position = cc.v2(150 * i - 300 - 60, -600);
          if (8 != this.boxIndex[i]) {
            box.getChildByName("label").getComponent(cc.Label).string = fieldArr[this.boxIndex[i]];
            this.boxHomePos.set("choice_" + i.toString() + fieldArr[this.boxIndex[i]], box.position);
            box.name = "choice_" + i.toString() + fieldArr[this.boxIndex[i]];
          } else {
            box.getChildByName("label").getComponent(cc.Label).string = random.toString();
            box.name = "choice_" + i.toString() + random.toString();
            this.boxHomePos.set("choice_" + i.toString() + random.toString(), box.position);
          }
          box.on(util_1.TouchEvents.TOUCH_START, this.onTouchStarted, this);
          box.on(util_1.TouchEvents.TOUCH_MOVE, this.onTouchMoved, this);
          box.on(util_1.TouchEvents.TOUCH_END, this.onTouchEnded, this);
          box.on(util_1.TouchEvents.TOUCH_CANCEL, this.onTouchEnded, this);
        }
        util_1.Util.showHelp(this.firstDrag, this.firstDrop);
      };
      GroupSum.prototype.shuffle = function(array) {
        var currentIndex = array.length;
        var temporaryValue;
        var randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      };
      GroupSum.prototype.getRandom = function(min, max) {
        return Math.random() * (max - min) + min;
      };
      GroupSum.prototype.playBallAudio = function() {
        cc.audioEngine.isMusicPlaying() || util_1.Util.playSfx(this.ballAudio);
      };
      GroupSum.prototype.animAudio = function(musicName) {
        cc.audioEngine.isMusicPlaying() || util_1.Util.playSfx(this.clearAudio);
      };
      GroupSum.prototype.onDestroy = function() {
        cc.audioEngine.stopAllEffects();
      };
      GroupSum.prototype.checkFinishCtl = function(shouldCheckFinish, isDrag) {
        this.Callback = function() {
          this.checkFinish(true);
        };
        this.Callback && this.unscheduleAllCallbacks();
        shouldCheckFinish && (isDrag ? this.checkFinish(false) : this.scheduleOnce(this.Callback, .5));
      };
      GroupSum.prototype.checkFinish = function(shouldScroll) {
        var collider1 = this.node.getChildByName("tub1").getChildByName("collider");
        var collider2;
        "addition" == this.mode && (collider2 = this.node.getChildByName("tub2").getChildByName("collider"));
        cc.log("final fn " + shouldScroll + this.draggedBall + "Count: " + cc.director.getPhysicsManager().testAABB(this.node.getChildByName("tub1").getChildByName("collider").getBoundingBoxToWorld()).length + " diff_1 " + cc.director.getPhysicsManager().testAABB(this.node.getChildByName("tub1").getChildByName("collider").getChildByName("diff_1").getBoundingBoxToWorld()).length + " diff2 " + cc.director.getPhysicsManager().testAABB(this.node.getChildByName("tub1").getChildByName("collider").getChildByName("diff_2").getBoundingBoxToWorld()).length);
        var tub1Count = this.ballsInTub(collider1);
        if ("subtraction" == this.mode) {
          if (this.tub1Count - tub1Count == 0) {
            this.node.getChildByName("tub1").getChildByName("help1").opacity = 0;
            this.node.getChildByName("tub1").getChildByName("help4").opacity = 0;
          } else {
            this.node.getChildByName("tub1").getChildByName("help1").opacity = 255;
            this.node.getChildByName("tub1").getChildByName("help4").opacity = 255;
            this.node.getChildByName("tub1").getChildByName("help1").getComponent(cc.Label).string = tub1Count.toString();
            this.node.getChildByName("tub1").getChildByName("help4").getComponent(cc.Label).string = (this.tub1Count - tub1Count).toString();
          }
          tub1Count == this.tub1Count - this.groundBallCount && shouldScroll && this.scrollScene();
        } else shouldScroll && this.tub1Count == tub1Count && this.tub2Count == this.ballsInTub(collider2) && this.scrollScene();
      };
      GroupSum.prototype.ballsInTub = function(tubCollider) {
        var collideBalls = cc.director.getPhysicsManager().testAABB(tubCollider.getBoundingBoxToWorld());
        var ballsOut = cc.director.getPhysicsManager().testAABB(tubCollider.getChildByName("diff_1").getBoundingBoxToWorld()).concat(cc.director.getPhysicsManager().testAABB(tubCollider.getChildByName("diff_2").getBoundingBoxToWorld()));
        return collideBalls.length - ballsOut.length;
      };
      GroupSum.prototype.scrollScene = function() {
        var _this = this;
        if (!this.isScrolling) {
          this.isScrolling = true;
          this.node.getComponentsInChildren(ball_1.default).forEach(function(e) {
            e.handleNodeTouch("off");
          });
          var target = this.node.getChildByName("box_slot");
          new cc.Tween().target(target).to(2, {
            position: cc.v2(target.x, target.y + 745)
          }, {
            progress: null,
            easing: "bounceOut"
          }).call(function() {
            return _this.hasScrollComplete = true;
          }).start();
        }
      };
      GroupSum.prototype.onTouchStarted = function(touch) {
        0 == touch.getID() && this.hasScrollComplete && (touch.currentTarget.scale = 1.1);
      };
      GroupSum.prototype.onTouchMoved = function(touch) {
        0 == touch.getID() && this.hasScrollComplete && (touch.currentTarget.position = touch.currentTarget.position.add(touch.getDelta()));
      };
      GroupSum.prototype.onTouchEnded = function(touch) {
        var _this = this;
        var touchedName = touch.currentTarget.getChildByName("label").getComponent(cc.Label).string;
        var dropRect;
        var isRight = false;
        this.node.getChildByName("box_slot").children.forEach(function(e) {
          if (e.name == touchedName && e.getBoundingBox().contains(touch.currentTarget)) {
            e.name = "done" + e.name;
            dropRect = e.getBoundingBox();
            isRight = true;
          }
        });
        if (touchedName != this.notCompare && isRight) {
          this.node.emit("correct");
          touch.currentTarget.scale = 1;
          touch.currentTarget.position = dropRect.center;
          touch.currentTarget.name = "done_" + touchedName;
          touch.currentTarget.off(cc.Node.EventType.TOUCH_START, this.onTouchStarted, this);
          touch.currentTarget.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoved, this);
          touch.currentTarget.off(cc.Node.EventType.TOUCH_END, this.onTouchEnded, this);
          touch.currentTarget.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnded, this);
          if (0 == --this.finishCount) {
            this.node.getChildByName("box_slot").children.forEach(function(e) {
              if (e.name.startsWith("choice")) {
                e.off("touchstart", _this.onTouchStarted, _this);
                e.off("touchmove", _this.onTouchMoved, _this);
                e.off("touchend", _this.onTouchEnded, _this);
                e.off("touchcancel", _this.onTouchEnded, _this);
              }
            });
            this.scheduleOnce(function() {
              util_1.Util.speakEquation(_this.audioName, function(index) {
                index + 1 == _this.audioName.length && _this.node.emit("nextProblem");
              });
            }, 1);
          }
          touch.currentTarget.scale = 1;
        } else {
          this.node.emit("wrong");
          new cc.Tween().target(touch.currentTarget).to(.3, {
            position: this.boxHomePos.get(touch.currentTarget.name),
            scale: 1
          }, {
            progress: null,
            easing: function(t) {
              return t;
            }
          }).start();
        }
      };
      __decorate([ property({
        type: cc.AudioClip
      }) ], GroupSum.prototype, "ballAudio", void 0);
      __decorate([ property(cc.AudioClip) ], GroupSum.prototype, "clearAudio", void 0);
      __decorate([ property(cc.Prefab) ], GroupSum.prototype, "ballPrefab", void 0);
      __decorate([ property(cc.Prefab) ], GroupSum.prototype, "boxPrefab", void 0);
      __decorate([ property(cc.Prefab) ], GroupSum.prototype, "tubPrefab", void 0);
      __decorate([ property(cc.Prefab) ], GroupSum.prototype, "helpLabelPrefab", void 0);
      __decorate([ error_handler_1.catchError() ], GroupSum.prototype, "onLoad", null);
      __decorate([ error_handler_1.catchError() ], GroupSum.prototype, "shuffle", null);
      __decorate([ error_handler_1.catchError() ], GroupSum.prototype, "getRandom", null);
      __decorate([ error_handler_1.catchError() ], GroupSum.prototype, "playBallAudio", null);
      __decorate([ error_handler_1.catchError() ], GroupSum.prototype, "animAudio", null);
      __decorate([ error_handler_1.catchError() ], GroupSum.prototype, "onDestroy", null);
      __decorate([ error_handler_1.catchError() ], GroupSum.prototype, "checkFinishCtl", null);
      __decorate([ error_handler_1.catchError() ], GroupSum.prototype, "checkFinish", null);
      __decorate([ error_handler_1.catchError() ], GroupSum.prototype, "ballsInTub", null);
      __decorate([ error_handler_1.catchError() ], GroupSum.prototype, "scrollScene", null);
      __decorate([ error_handler_1.catchError() ], GroupSum.prototype, "onTouchStarted", null);
      __decorate([ error_handler_1.catchError() ], GroupSum.prototype, "onTouchMoved", null);
      __decorate([ error_handler_1.catchError() ], GroupSum.prototype, "onTouchEnded", null);
      GroupSum = __decorate([ ccclass ], GroupSum);
      return GroupSum;
    }(game_1.default);
    exports.default = GroupSum;
    cc._RF.pop();
  }, {
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./ball": "ball"
  } ],
  wall: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "abf56clOGNFW6BijP3gSPXh", "wall");
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
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GROUND = 180;
    var Wall = function(_super) {
      __extends(Wall, _super);
      function Wall() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Wall.prototype.onLoad = function() {
        cc.director.getPhysicsManager().enabled = true;
        switch (this.text) {
         case "ground":
          this.node.getComponent(cc.PhysicsBoxCollider).size.width = cc.winSize.width;
          this.node.getComponent(cc.PhysicsBoxCollider).offset.y = -cc.winSize.height / 2 - 250 + GROUND;
          break;

         case "left":
          this.node.getComponent(cc.PhysicsBoxCollider).size.height = cc.winSize.height;
          this.node.getComponent(cc.PhysicsBoxCollider).offset.x = -cc.winSize.width / 2 - 100;
          break;

         case "right":
          this.node.getComponent(cc.PhysicsBoxCollider).size.height = cc.winSize.height;
          this.node.getComponent(cc.PhysicsBoxCollider).offset.x = cc.winSize.width / 2 + 100;
        }
      };
      __decorate([ property ], Wall.prototype, "text", void 0);
      __decorate([ error_handler_1.catchError() ], Wall.prototype, "onLoad", null);
      Wall = __decorate([ ccclass ], Wall);
      return Wall;
    }(cc.Component);
    exports.default = Wall;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/error-handler": void 0
  } ]
}, {}, [ "ball", "groupsum", "wall" ]);