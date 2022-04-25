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
  windowgen: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ffc239JYDlPKZ6LqEUcLRtY", "windowgen");
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
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var config_1 = require("../../../common/scripts/lib/config");
    var util_1 = require("../../../common/scripts/util");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var game_1 = require("../../../common/scripts/game");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var window = function(_super) {
      __extends(window, _super);
      function window() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.dragPrefab = null;
        _this.blinds = null;
        _this.window = null;
        _this.linestartaud = null;
        _this.linebackaud = null;
        _this.victoryaud = null;
        _this.correctaud = null;
        _this.friendPos = null;
        _this.totalPieces = 4;
        return _this;
      }
      window.prototype.onLoad = function() {
        var data = config_1.default.getInstance().data[0];
        var fieldArr = data.toString().split(",").map(function(field) {
          return /^\d*\.?\d+$/.test(field) ? Number(field) : field;
        });
        cc.log("love " + fieldArr);
        var imga1, imga2, imga3, imga4, imgc1, imgc2, imgc3, imgc4;
        this.level = fieldArr[0], this.worksheet = fieldArr[1], this.problem = fieldArr[2], 
        this.nowin = fieldArr[3], imga1 = fieldArr[4], imga2 = fieldArr[5], imga3 = fieldArr[6], 
        imga4 = fieldArr[7], imgc1 = fieldArr[8], imgc2 = fieldArr[9], imgc3 = fieldArr[10], 
        imgc4 = fieldArr[11];
        this.qarray = [ imga1, imga2, imga3, imga4 ];
        this.ansarray = [ imgc1, imgc2, imgc3, imgc4 ];
        cc.log("qarray" + this.qarray);
        cc.log("ansarray" + this.ansarray);
        this.x0 = -300;
        this.y0 = -265;
        this.xoff = 600;
        this.yoff = 140;
        this.dropArea = new Map();
        this.dropAreab = new Map();
        this.currentTouchID = -1;
        this.createWindows();
        this.createWindowsb();
        this.auther = 1;
        this.authmov = 1;
        this.makegameagain = [ "a", "b", "c", "d" ];
        this.drawing = this.node.getChildByName("linedraw").getComponent(cc.Graphics);
        util_1.Util.showHelp(this.firstDrag, this.firstDrop);
        this.node.children.forEach(function(f) {
          cc.log(" nodes" + f.name);
        });
      };
      window.prototype.createWindows = function() {
        var _this = this;
        var _loop_1 = function(i) {
          cc.log("This is just a test");
          var windowin = cc.instantiate(this_1.window);
          dragBox = cc.instantiate(this_1.dragPrefab);
          windowin.position = cc.v2(this_1.x0, this_1.y0 + i * this_1.yoff);
          dragBox.position = cc.v2(this_1.x0, this_1.y0 - 30 + i * this_1.yoff);
          windowin.parent = this_1.node;
          dragBox.parent = this_1.node;
          util_1.Util.loadTexture(this_1.qarray[i], function(texture, err) {
            console.log(_this.qarray[i] + err);
            windowin.getChildByName("dyna").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
          });
          dragBox.name = i.toString();
          dragBox.on(cc.Node.EventType.TOUCH_START, this_1.onTouchStart, this_1);
          dragBox.on(cc.Node.EventType.TOUCH_MOVE, this_1.onTouchMove, this_1);
          dragBox.on(cc.Node.EventType.TOUCH_END, this_1.onTouchEnd, this_1);
          dragBox.on(cc.Node.EventType.TOUCH_CANCEL, this_1.onTouchEnd, this_1);
          3 == i && (this_1.firstDrag = windowin);
          this_1.dropAreab.set(i.toString(), windowin.getBoundingBox());
        };
        var this_1 = this, dragBox;
        for (var i = 0; i < 4; i++) _loop_1(i);
      };
      window.prototype.createWindowsb = function() {
        var _this = this;
        this.orgAddr = [];
        this.temparr = [];
        this.temparray = __spreadArrays(this.ansarray);
        this.ansarray;
        this.temparray = this.shuffle(this.temparray);
        cc.log("bogo" + this.temparray);
        cc.log("bogo" + this.ansarray);
        for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) {
          cc.log("printj" + j);
          this.temparray[i] == this.ansarray[j] && (this.orgAddr[i] = j.toString());
        }
        cc.log("bogo" + this.orgAddr);
        var _loop_2 = function(i) {
          var windowinb = cc.instantiate(this_2.window);
          windowinb.position = cc.v2(this_2.x0 + this_2.xoff, this_2.y0 + i * this_2.yoff);
          this_2.selectedObject = windowinb;
          windowinb.parent = this_2.node;
          cc.log("<>", this_2.temparray);
          util_1.Util.loadTexture(this_2.temparray[i], function(texture, err) {
            console.log(_this.temparray[i] + err);
            windowinb.getChildByName("dyna").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
          });
          windowinb.name = i.toString();
          this_2.dropArea.set(this_2.orgAddr[i], windowinb.getBoundingBox());
          var dragBoxb = cc.instantiate(this_2.dragPrefab);
          dragBoxb.position = cc.v2(this_2.x0 + this_2.xoff, this_2.y0 - 30 + i * this_2.yoff);
          dragBoxb.parent = this_2.node;
          dragBoxb.name = this_2.orgAddr[i];
          3 == parseInt(this_2.orgAddr[i]) && (this_2.firstDrop = windowinb);
          cc.log("yol" + dragBoxb.name);
          dragBoxb.on(cc.Node.EventType.TOUCH_START, this_2.onTouchStart, this_2);
          dragBoxb.on(cc.Node.EventType.TOUCH_MOVE, this_2.onTouchMove, this_2);
          dragBoxb.on(cc.Node.EventType.TOUCH_END, this_2.onTouchEnd, this_2);
          dragBoxb.on(cc.Node.EventType.TOUCH_CANCEL, this_2.onTouchEnd, this_2);
        };
        var this_2 = this;
        for (var i = 0; i < 4; i++) _loop_2(i);
      };
      window.prototype.shuffle = function(array) {
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
      window.prototype.onTouchStart = function(touch) {
        touch.currentTarget.name == this.delDupes && this.scheduleOnce(function() {
          touch.currentTarget.removeFromParent(true);
          this.auther = 1;
        }, .1);
        cc.log("go" + touch.currentTarget.name);
        if (1 == this.auther && 0 == touch.getID()) {
          this.auther = 0;
          this.originalLocation = touch.currentTarget.position;
          this.lineStartPoint = touch.currentTarget.position;
          cc.log("trialsa" + this.originalLocation);
        }
        cc.log("nam" + this.originalLocation);
        cc.log("touch start", this.tstore);
        this.drawing.lineWidth = 20;
        this.authmov = 1;
      };
      window.prototype.onTouchMove = function(touch) {
        if (0 == touch.getID()) {
          this.tstore = touch.currentTarget.name;
          cc.log("high" + this.tstore);
          cc.log("movv" + touch.getID());
          touch.currentTarget.position = touch.currentTarget.getParent().convertToNodeSpaceAR(touch.getLocation());
          cc.log("pos" + touch.currentTarget.position);
          this.lineEndPoint = touch.currentTarget.position;
          this.lineType = true;
          this.authmov = 1;
        }
      };
      window.prototype.onTouchEnd = function(touch) {
        cc.log("starting" + touch.getStartLocation());
        touch.currentTarget.off;
        this.finalLocationb = this.dropAreab.get(this.tstore);
        this.finalLocation = this.dropArea.get(this.tstore);
        this.lineType = false;
        this.authmov = 0;
        this.auther = 1;
        cc.log("name onEnd" + touch.currentTarget.position);
        if (this.dropArea.get(this.tstore).intersects(touch.currentTarget.getBoundingBox()) && this.finalLocation.x > -200 && this.originalLocation.x < -200) {
          this.node.emit("correct");
          cc.log("ringer" + this.finalLocation);
          this.finalLocationb = this.dropAreab.get(this.tstore);
          cc.log("centaur" + this.dropArea.get(this.tstore).intersects(touch.currentTarget.getBoundingBox()));
          cc.log("got");
          this.finalLocation = this.dropArea.get(this.tstore);
          cc.log("In touchend" + this.finalLocation);
          this.delDupes = touch.currentTarget.name;
          var blind = cc.instantiate(this.blinds);
          blind.position = cc.v2(this.originalLocation.x, this.originalLocation.y + 26);
          blind.parent = this.node;
          var blind1 = cc.instantiate(this.blinds);
          blind1.position = cc.v2(300, this.finalLocation.y + 59);
          blind1.parent = this.node;
          this.match();
          this.auther = 1;
          this.scheduleOnce(function() {
            touch.currentTarget.removeFromParent(true);
          }, .1);
        } else if (this.dropAreab.get(this.tstore).intersects(touch.currentTarget.getBoundingBox()) && this.originalLocation.x > 200) {
          this.node.emit("correct");
          this.delDupes = touch.currentTarget.name;
          var blind = cc.instantiate(this.blinds);
          blind.position = cc.v2(this.originalLocation.x, this.originalLocation.y + 26);
          blind.parent = this.node;
          var blind1 = cc.instantiate(this.blinds);
          blind1.position = cc.v2(-300, this.finalLocationb.y + 59);
          blind1.parent = this.node;
          this.match();
          this.auther = 1;
          this.scheduleOnce(function() {
            touch.currentTarget.removeFromParent(true);
          }, .1);
        } else if (0 == this.authmov && 0 == touch.getID()) {
          cc.log("endd" + touch.getID());
          touch.currentTarget.position = this.originalLocation;
          this.node.emit("wrong");
          this.auther = 1;
          cc.log("not  got");
          this.node.children.forEach(function(f) {
            cc.log("bird nodes" + f.name);
          });
        }
      };
      window.prototype.update = function() {
        this.drawing.clear();
        switch (this.lineType) {
         case false:
          cc.log("Don't Draw");
          break;

         case true:
          cc.log("Drawing Line.................");
          this.drawing.moveTo(this.lineStartPoint.x, this.lineStartPoint.y);
          this.drawing.lineTo(this.lineEndPoint.x, this.lineEndPoint.y);
          this.drawing.stroke();
          this.drawing.lineWidth = 10;
          this.drawing.strokeColor = cc.Color.RED;
        }
      };
      window.prototype.match = function() {
        var _this = this;
        var config = config_1.default.getInstance();
        if (--this.totalPieces <= 0) {
          cc.log("chk" + this.totalPieces);
          this.scheduleOnce(function() {
            _this.node.emit("nextProblem");
          }, 2);
        }
      };
      __decorate([ property(cc.Prefab) ], window.prototype, "dragPrefab", void 0);
      __decorate([ property(cc.Prefab) ], window.prototype, "blinds", void 0);
      __decorate([ property(cc.Prefab) ], window.prototype, "window", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], window.prototype, "linestartaud", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], window.prototype, "linebackaud", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], window.prototype, "victoryaud", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], window.prototype, "correctaud", void 0);
      __decorate([ property(cc.Node) ], window.prototype, "friendPos", void 0);
      __decorate([ error_handler_1.default() ], window.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], window.prototype, "createWindows", null);
      __decorate([ error_handler_1.default() ], window.prototype, "createWindowsb", null);
      __decorate([ error_handler_1.default() ], window.prototype, "shuffle", null);
      __decorate([ error_handler_1.default() ], window.prototype, "onTouchStart", null);
      __decorate([ error_handler_1.default() ], window.prototype, "onTouchMove", null);
      __decorate([ error_handler_1.default() ], window.prototype, "onTouchEnd", null);
      __decorate([ error_handler_1.default() ], window.prototype, "update", null);
      __decorate([ error_handler_1.default() ], window.prototype, "match", null);
      window = __decorate([ ccclass ], window);
      return window;
    }(game_1.default);
    exports.default = window;
    cc._RF.pop();
  }, {
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0
  } ]
}, {}, [ "windowgen" ]);