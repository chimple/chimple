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
  multiplybeads: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ea638O900RBerCHTZ/pmM4m", "multiplybeads");
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
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var util_1 = require("../../../common/scripts/util");
    var game_1 = require("../../../common/scripts/game");
    var profile_1 = require("../../../common/scripts/lib/profile");
    var helper_1 = require("../../../common/scripts/helper");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MultiplyBeads = function(_super) {
      __extends(MultiplyBeads, _super);
      function MultiplyBeads() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.dragPrefab = null;
        _this.lamplabel = null;
        _this.progressMonitorPrefab = null;
        _this.dropPrefab = null;
        _this.resLabel = null;
        _this.block1 = null;
        _this.block2 = null;
        _this.block3 = null;
        _this.block4 = null;
        _this.block5 = null;
        _this.block6 = null;
        _this.block7 = null;
        _this.block8 = null;
        _this.block9 = null;
        _this.drop1 = null;
        _this.drop2 = null;
        _this.drop3 = null;
        _this.drop4 = null;
        _this.drop5 = null;
        _this.drop6 = null;
        _this.drop7 = null;
        _this.drop8 = null;
        _this.drop9 = null;
        _this.matchAud = null;
        _this.pickAud = null;
        _this.victoryAud = null;
        _this.preven = 0;
        _this.blockarr = [];
        _this.count = 0;
        return _this;
      }
      MultiplyBeads.prototype.onLoad = function() {
        var fieldArr = config_1.default.getInstance().data[0].toString().split(",").map(function(field) {
          return /^\d*\.?\d+$/.test(field) ? Number(field) : field;
        });
        cc.log("field " + fieldArr);
        this.level = fieldArr[0], this.worksheet = fieldArr[1], this.problem = fieldArr[2], 
        this.multiplicand = fieldArr[3], this.multiplier = fieldArr[4], this.prod = fieldArr[5];
        this.noOfDrag = parseInt(this.multiplier);
        cc.log("led" + this.noOfDrag);
        this.noOfDrop = parseInt(this.multiplier);
        this.x0 = 200;
        this.y0 = 0;
        this.xoff = 0;
        this.yoff = 0;
        this.xdrop = -400;
        this.dropArea = new Map();
        var boxnam = this.multiplicand.toString();
        this.imgname = config_1.default.dir + "games/multiplication/texture/box" + boxnam + "_multiplicationboard";
        this.imgnameb = config_1.default.dir + "games/multiplication/texture/placeholder" + boxnam + "_multiplicationboard";
        this.numtomultiply = parseInt(this.multiplicand);
        this.totalPieces = this.noOfDrag;
        cc.log("lol" + this.imgname);
        cc.log("put");
        cc.log("led" + this.noOfDrag);
        this.createLamps();
        this.createDropArea();
        this.totalPieces = this.noOfDrop;
        var filea = config_1.default.dir + profile_1.default.lang + "-help/" + helper_1.NUMBER_VOICE + "d_" + this.multiplicand.toString() + ".mp3";
        var totalres = this.numtomultiply * this.noOfDrop;
        this.temp = this.noOfDrag;
        var filea = config_1.default.dir + profile_1.default.lang + "-help/" + helper_1.NUMBER_VOICE + "d_" + this.multiplicand.toString() + ".mp3";
        var fileb = config_1.default.dir + profile_1.default.lang + "-help/" + helper_1.NUMBER_VOICE + "times.mp3";
        var filec = config_1.default.dir + profile_1.default.lang + "-help/" + helper_1.NUMBER_VOICE + "d_" + this.multiplier.toString() + ".mp3";
        var fileeq = config_1.default.dir + profile_1.default.lang + "-help/" + helper_1.NUMBER_VOICE + "equals.mp3";
        var filefin = config_1.default.dir + profile_1.default.lang + "-help/" + helper_1.NUMBER_VOICE + "d_" + totalres.toString() + ".mp3";
        this.soundarr = [ filea, fileb, filec, fileeq, filefin ];
        this.multarrp = [ this.multiplicand, "X", this.multiplier, "=", this.prod ];
        util_1.Util.showHelp(this.firstDrag, this.firstDrop);
        this.a = 1;
      };
      MultiplyBeads.prototype.createLamps = function() {
        cc.log("drop ");
        var lampin = cc.instantiate(this["block" + [ this.multiplicand ]]);
        var xran = this.getRandomArbitrary(10, 20);
        lampin.position = cc.v2(this.x0, this.y0);
        this.numtomultiply > 6 && (lampin.scale = .8);
        lampin.parent = this.node;
        var numa = 0;
        lampin.name = numa.toString();
        this.firstDrag = lampin;
        lampin.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        lampin.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        lampin.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        lampin.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        var xbox = -500;
        for (var i = 1; i <= 9; i++) if (i != this.noOfDrag) {
          var labela = cc.instantiate(this.lamplabel);
          labela.position = cc.v2(100 * i - 500, this.y0 + 330);
          labela.parent = this.node;
          labela.getChildByName("numburr").getComponent(cc.Label).string = i.toString();
        } else {
          var labela = cc.instantiate(this.lamplabel);
          labela.position = cc.v2(100 * i - 500, this.y0 + 330);
          labela.parent = this.node;
          labela.getChildByName("numburr").getComponent(cc.Label).string = i.toString();
          labela.color = new cc.Color(255, 100, 100);
        }
        this.resultt = cc.instantiate(this.resLabel);
        this.resultt.position = cc.v2(0, -600);
        this.resultt.parent = this.node;
        var actiona = cc.moveTo(3, cc.v2(0, -300));
        this.resultt.runAction(actiona);
      };
      MultiplyBeads.prototype.getRandomArbitrary = function(min, max) {
        return Math.random() * (max - min) + min;
      };
      MultiplyBeads.prototype.createDropArea = function() {
        cc.log("drop");
        var dropin = cc.instantiate(this["drop" + [ this.multiplicand ]]);
        dropin.color = new cc.Color(255, 255, 100);
        dropin.position = cc.v2(this.xdrop, this.y0 + 50);
        this.numtomultiply > 6 && (dropin.scale = .8);
        dropin.parent = this.node;
        var numb = 0;
        this.dropArea.set(numb.toString(), dropin.getBoundingBox());
        this.firstDrop = dropin;
      };
      MultiplyBeads.prototype.resultDisplay = function() {
        var _this = this;
        new cc.Tween().target(this.node).to(1, {}, {
          progress: null,
          easing: "sineOutIn"
        }).call(function() {
          var labll = cc.instantiate(_this.lamplabel);
          labll.position = cc.v2(0, 0);
          labll.parent = _this.node;
          _this.onTouchAudio(_this.soundarr[_this.count].toString());
        }).start();
      };
      MultiplyBeads.prototype.onTouchStart = function(touch) {
        if (0 == touch.getID() && "a" != touch.currentTarget.name) {
          this.originalLocation = touch.currentTarget.position;
          util_1.Util.playSfx(this.pickAud);
          1 == this.atend && (this.resultt.getChildByName("disp").getComponent(cc.Label).string = this.tempresultt + "+");
        }
      };
      MultiplyBeads.prototype.onTouchMove = function(touch) {
        if (0 == touch.getID() && "a" != touch.currentTarget.name) {
          this.tstore = touch.currentTarget.name;
          touch.currentTarget.position = touch.currentTarget.getParent().convertToNodeSpaceAR(touch.getLocation());
          this.auther = 1;
        }
      };
      MultiplyBeads.prototype.onTouchEnd = function(touch) {
        var _this = this;
        if (0 == touch.getID() && "a" != touch.currentTarget.name) {
          this.finalLocation = this.dropArea.get(this.tstore);
          if (this.dropArea.get(this.tstore).intersects(touch.currentTarget.getBoundingBox()) && 1 == this.auther) {
            this.faceAnim = touch.currentTarget.getChildByName("face").getComponent(cc.Animation);
            this.faceAnim.play();
            this.temp = this.temp - 1;
            this.atend = 1;
            this.auther = 0;
            this.node.emit("correct");
            util_1.Util.playSfx(this.matchAud);
            var dropin = void 0;
            touch.currentTarget.position = cc.v2(this.xdrop, this.y0 + 50);
            touch.currentTarget.name = "a";
            var value = (this.a * this.numtomultiply).toString();
            this.finalval = value;
            var file = config_1.default.dir + profile_1.default.lang + "-help/" + helper_1.NUMBER_VOICE + "d_" + value + ".mp3";
            this.a = this.a + 1;
            cc.log("audi" + file);
            this.resultt.getChildByName("disp").getComponent(cc.Label).string = this.resultt.getChildByName("disp").getComponent(cc.Label).string + this.numtomultiply;
            this.tempresultt = this.resultt.getChildByName("disp").getComponent(cc.Label).string;
            1 != this.noOfDrag && 2 != this.a && (this.resultt.getChildByName("disp").getComponent(cc.Label).string = this.resultt.getChildByName("disp").getComponent(cc.Label).string + "=" + value);
            util_1.Util.load(file, function(err, clip) {
              _this.friend.speak(clip, function() {
                _this.match();
              });
            });
            if (this.temp > 0) {
              cc.log("drop" + this.temp);
              dropin = cc.instantiate(this["drop" + [ this.multiplicand ]]);
              dropin.color = new cc.Color(255, 255, 100);
              this.xdrop = this.xdrop + 100;
              this.numtomultiply > 6 && (dropin.scale = .8);
              dropin.position = cc.v2(this.xdrop, this.y0 + 50);
              dropin.parent = this.node;
              var numb = 0;
              this.dropArea.set(numb.toString(), dropin.getBoundingBox());
              var lampin = cc.instantiate(this["block" + [ this.multiplicand ]]);
              var xran = this.getRandomArbitrary(10, 20);
              lampin.position = cc.v2(this.x0 + this.temp * xran, this.y0 + xran);
              this.numtomultiply > 6 && (lampin.scale = .8);
              lampin.parent = this.node;
              var numa = 0;
              lampin.name = numa.toString();
              lampin.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
              lampin.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
              lampin.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
              lampin.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
            }
          } else {
            var actiona = cc.moveTo(.5, cc.v2(this.originalLocation.x, this.originalLocation.y));
            touch.currentTarget.runAction(actiona);
            this.node.emit("wrong");
          }
        }
      };
      MultiplyBeads.prototype.onTouchAudio = function(filename) {
        var _this = this;
        cc.audioEngine.isMusicPlaying() || util_1.Util.load(filename, function(err, clip) {
          5 != _this.count && _this.friend.speak(clip, function() {
            _this.count++;
            _this.match();
          });
        });
      };
      MultiplyBeads.prototype.match = function() {
        var _this = this;
        if (--this.totalPieces <= 0) {
          var config = config_1.default.getInstance();
          if (0 == this.preven) {
            this.preven = 1;
            this.resultt.getChildByName("disp").getComponent(cc.Label).string = "";
          }
          if (5 != this.count) {
            this.resultt.getChildByName("disp").getComponent(cc.Label).string = this.resultt.getChildByName("disp").getComponent(cc.Label).string + this.multarrp[this.count] + "  ";
            this.onTouchAudio(this.soundarr[this.count].toString());
          }
          4 == this.count && new cc.Tween().target(this.node).to(2, {}, {
            progress: null,
            easing: "sineOutIn"
          }).call(function() {
            cc.log("chk" + _this.totalPieces);
            util_1.Util.playSfx(_this.victoryAud);
            _this.node.emit("nextProblem");
          }).start();
        }
      };
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "dragPrefab", void 0);
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "lamplabel", void 0);
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "progressMonitorPrefab", void 0);
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "dropPrefab", void 0);
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "resLabel", void 0);
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "block1", void 0);
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "block2", void 0);
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "block3", void 0);
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "block4", void 0);
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "block5", void 0);
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "block6", void 0);
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "block7", void 0);
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "block8", void 0);
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "block9", void 0);
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "drop1", void 0);
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "drop2", void 0);
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "drop3", void 0);
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "drop4", void 0);
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "drop5", void 0);
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "drop6", void 0);
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "drop7", void 0);
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "drop8", void 0);
      __decorate([ property(cc.Prefab) ], MultiplyBeads.prototype, "drop9", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], MultiplyBeads.prototype, "matchAud", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], MultiplyBeads.prototype, "pickAud", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], MultiplyBeads.prototype, "victoryAud", void 0);
      __decorate([ error_handler_1.default() ], MultiplyBeads.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], MultiplyBeads.prototype, "createLamps", null);
      __decorate([ error_handler_1.default() ], MultiplyBeads.prototype, "getRandomArbitrary", null);
      __decorate([ error_handler_1.default() ], MultiplyBeads.prototype, "createDropArea", null);
      __decorate([ error_handler_1.default() ], MultiplyBeads.prototype, "resultDisplay", null);
      __decorate([ error_handler_1.default() ], MultiplyBeads.prototype, "onTouchStart", null);
      __decorate([ error_handler_1.default() ], MultiplyBeads.prototype, "onTouchMove", null);
      __decorate([ error_handler_1.default() ], MultiplyBeads.prototype, "onTouchEnd", null);
      __decorate([ error_handler_1.default() ], MultiplyBeads.prototype, "onTouchAudio", null);
      __decorate([ error_handler_1.default() ], MultiplyBeads.prototype, "match", null);
      MultiplyBeads = __decorate([ ccclass ], MultiplyBeads);
      return MultiplyBeads;
    }(game_1.default);
    exports.default = MultiplyBeads;
    cc._RF.pop();
  }, {
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/helper": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/util": void 0
  } ]
}, {}, [ "multiplybeads" ]);