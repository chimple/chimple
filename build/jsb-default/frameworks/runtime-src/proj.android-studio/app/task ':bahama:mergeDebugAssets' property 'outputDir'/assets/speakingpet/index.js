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
  dragHay: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8a597rLBD5LBIbjLgK7InkY", "dragHay");
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
    var dropCow_1 = require("./dropCow");
    var util_1 = require("../../../common/scripts/util");
    var lessonController_1 = require("../../../common/scripts/lessonController");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DragHay = function(_super) {
      __extends(DragHay, _super);
      function DragHay() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.correctClip = null;
        _this.richTextNode = null;
        _this._text = null;
        _this._soundName = null;
        _this._soundClip = null;
        return _this;
      }
      Object.defineProperty(DragHay.prototype, "text", {
        get: function() {
          return this._text;
        },
        set: function(newVal) {
          this._text = newVal;
          this.richTextNode.string = newVal;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(DragHay.prototype, "soundName", {
        get: function() {
          return this._soundName;
        },
        set: function(newVal) {
          var _this = this;
          this._soundName = newVal;
          util_1.Util.loadGameSound(this._soundName, function(clip) {
            _this._soundClip = clip;
          });
        },
        enumerable: false,
        configurable: true
      });
      DragHay.prototype.onTouchStart = function(touch) {
        _super.prototype.onTouchStart.call(this, touch);
        null != this._soundClip && lessonController_1.default.getFriend().speak(this._soundClip);
      };
      DragHay.prototype.onTouchEnd = function(touch) {
        _super.prototype.onTouchEnd.call(this, touch);
        this.match ? null != this._soundClip && lessonController_1.default.getFriend().speak(this._soundClip) : this.node.emit("dragHayWrong");
      };
      DragHay.prototype.onMatchOver = function() {
        var _this = this;
        new cc.Tween().target(this.node).to(.5, {
          scale: .1
        }, null).hide().call(function() {
          _this.matchingNode.getComponent(dropCow_1.default).eat();
          _this.node.emit("dragHayDone");
          _super.prototype.onMatchOver.call(_this);
        }).start();
      };
      __decorate([ property(cc.AudioClip) ], DragHay.prototype, "correctClip", void 0);
      __decorate([ property(cc.RichText) ], DragHay.prototype, "richTextNode", void 0);
      DragHay = __decorate([ ccclass ], DragHay);
      return DragHay;
    }(drag_1.default);
    exports.default = DragHay;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/lessonController": void 0,
    "../../../common/scripts/util": void 0,
    "./dropCow": "dropCow"
  } ],
  dropCow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "697e97AkHRJfoQYDbZSpuBf", "dropCow");
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
    var drop_1 = require("../../../common/scripts/drop");
    var util_1 = require("../../../common/scripts/util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DropCow = function(_super) {
      __extends(DropCow, _super);
      function DropCow() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.animation = null;
        _this._soundName = null;
        _this._soundClip = null;
        return _this;
      }
      Object.defineProperty(DropCow.prototype, "soundName", {
        get: function() {
          return this._soundName;
        },
        set: function(newVal) {
          var _this = this;
          this._soundName = newVal;
          util_1.Util.loadGameSound(this._soundName, function(clip) {
            _this._soundClip = clip;
          });
        },
        enumerable: false,
        configurable: true
      });
      DropCow.prototype.onLoad = function() {
        var _this = this;
        _super.prototype.onLoad.call(this);
        this.node.on("touchstart", function(touch) {
          _this.playSound();
        }, this);
      };
      DropCow.prototype.onCollisionEnter = function(other, self) {
        _super.prototype.onCollisionEnter.call(this, other, self);
        this.match && this.playSound();
      };
      DropCow.prototype.beHappy = function() {
        var animNode = this.node.getChildByName("cat_pink_ske");
        if (null != animNode) {
          var animation = animNode.getComponent(dragonBones.ArmatureDisplay).armature().animation;
          animation.stop();
          animation.play("happy", 1);
        }
      };
      DropCow.prototype.eat = function() {
        this.match = false;
        var animNode = this.node.getChildByName("cat_pink_ske");
        if (null != animNode) {
          var animation = animNode.getComponent(dragonBones.ArmatureDisplay).armature().animation;
          animation.stop();
          animation.play("eating", 1);
        }
      };
      DropCow.prototype.playSound = function() {
        var animNode = this.node.getChildByName("cat_pink_ske");
        if (null != animNode) {
          var animation = animNode.getComponent(dragonBones.ArmatureDisplay).armature().animation;
          animation.stop();
          animation.play("talk", 1);
        }
        null != this._soundClip && util_1.Util.play(this._soundClip, false);
      };
      __decorate([ property(cc.Node) ], DropCow.prototype, "animation", void 0);
      DropCow = __decorate([ ccclass ], DropCow);
      return DropCow;
    }(drop_1.default);
    exports.default = DropCow;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drop": void 0,
    "../../../common/scripts/util": void 0
  } ],
  speakingpet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4b702LThMdKXbrAvIxS4uxl", "speakingpet");
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
    var dropCow_1 = require("./dropCow");
    var dragHay_1 = require("./dragHay");
    var drag_1 = require("../../../common/scripts/drag");
    var util_1 = require("../../../common/scripts/util");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var game_1 = require("../../../common/scripts/game");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SpeakingPet = function(_super) {
      __extends(SpeakingPet, _super);
      function SpeakingPet() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.hay1 = null;
        _this.hay2 = null;
        _this.hay3 = null;
        _this.hay4 = null;
        _this.cow1 = null;
        _this.cow2 = null;
        _this._numHays = 4;
        return _this;
      }
      SpeakingPet.prototype.onLoad = function() {
        cc.director.getCollisionManager().enabled = true;
        drag_1.default.letDrag = false;
        var cow1Pos = this.cow1.getPosition();
        var cow2Pos = this.cow2.getPosition();
        this.cow1.position = cc.v2(cow1Pos.x - 1e3, cow1Pos.y);
        this.cow2.position = cc.v2(cow2Pos.x + 1e3, cow2Pos.y);
        var row = config_1.default.getInstance().data[0];
        var level = row[0], worksheet = row[1], problem = row[2], soundA = row[3], soundB = row[4], hay1Word = row[5], hay1Sound = row[6], hay1Phonic = row[7], hay1PhonicPlace = row[8], hay2Word = row[9], hay2Sound = row[10], hay2Phonic = row[11], hay2PhonicPlace = row[12], hay3Word = row[13], hay3Sound = row[14], hay3Phonic = row[15], hay3PhonicPlace = row[16], hay4Word = row[17], hay4Sound = row[18], hay4Phonic = row[19], hay4PhonicPlace = row[20];
        var dropCow1 = this.cow1.getComponent(dropCow_1.default);
        dropCow1.soundName = soundA;
        this.cow1.name = "A";
        var dropCow2 = this.cow2.getComponent(dropCow_1.default);
        dropCow2.soundName = soundB;
        this.cow2.name = "B";
        var hays = [ this.hay1, this.hay2, this.hay3, this.hay4 ];
        util_1.Util.shuffle(hays);
        this._makeHay(hays[0], hay1Word, hay1Sound, hay1Phonic, hay1PhonicPlace);
        this._makeHay(hays[1], hay2Word, hay2Sound, hay2Phonic, hay2PhonicPlace);
        this._makeHay(hays[2], hay3Word, hay3Sound, hay3Phonic, hay3PhonicPlace);
        this._makeHay(hays[3], hay4Word, hay4Sound, hay4Phonic, hay4PhonicPlace);
        this._moveCows(true);
      };
      SpeakingPet.prototype._moveCows = function(moveIn) {
        var _this = this;
        var cow1Pos = this.cow1.getPosition();
        var cow2Pos = this.cow2.getPosition();
        if (moveIn) {
          cow1Pos.x += 1e3;
          cow2Pos.x -= 1e3;
        } else {
          cow1Pos.x -= 1e3;
          cow2Pos.x += 1e3;
        }
        new cc.Tween().target(this.cow1).to(.5, {
          position: cow1Pos
        }, null).call(function() {
          moveIn && _this.cow1.getComponent(dropCow_1.default).playSound();
        }).delay(1).call(function() {
          new cc.Tween().target(_this.cow2).to(.5, {
            position: cow2Pos
          }, null).call(function() {
            if (moveIn) {
              _this.cow2.getComponent(dropCow_1.default).playSound();
              _this.scheduleOnce(function() {
                drag_1.default.letDrag = true;
                util_1.Util.showHelp(_this.hay1, _this.cow1.name == _this.hay1.name ? _this.cow1 : _this.cow2);
              }, .5);
            }
          }).start();
        }).start();
      };
      SpeakingPet.prototype._makeHay = function(hayNode, text, soundName, phonic, phonicPlace) {
        var _this = this;
        var dragHay = hayNode.getComponent(dragHay_1.default);
        dragHay.soundName = soundName;
        hayNode.name = phonic;
        hayNode.on("dragHayDone", this._dragDone, this);
        hayNode.on("dragHayWrong", function() {
          _this.node.emit("wrong");
        });
        var places = phonicPlace.split(",");
        var phonicBegin = parseInt(places[0]);
        var phonicEnd = parseInt(places[places.length - 1]);
        var splitter = new GraphemeSplitter();
        var graphemes = splitter.splitGraphemes(text);
        var begin = graphemes.slice(0, phonicBegin - 1).join("");
        var end = graphemes.slice(phonicEnd).join("");
        var mid = graphemes.slice(phonicBegin - 1, phonicEnd).join("");
        dragHay.text = begin + "<color=#DCC994>" + mid + "</color>" + end;
      };
      SpeakingPet.prototype._dragDone = function() {
        var _this = this;
        this.node.emit("correct");
        if (--this._numHays <= 0) {
          this.cow1.getComponent(dropCow_1.default).beHappy();
          this.cow2.getComponent(dropCow_1.default).beHappy();
          this.scheduleOnce(function() {
            _this._moveCows(false);
          }, 2);
          this.scheduleOnce(function() {
            _this.node.emit("nextProblem");
          }, 4);
        }
      };
      __decorate([ property(cc.Node) ], SpeakingPet.prototype, "hay1", void 0);
      __decorate([ property(cc.Node) ], SpeakingPet.prototype, "hay2", void 0);
      __decorate([ property(cc.Node) ], SpeakingPet.prototype, "hay3", void 0);
      __decorate([ property(cc.Node) ], SpeakingPet.prototype, "hay4", void 0);
      __decorate([ property(cc.Node) ], SpeakingPet.prototype, "cow1", void 0);
      __decorate([ property(cc.Node) ], SpeakingPet.prototype, "cow2", void 0);
      __decorate([ error_handler_1.default() ], SpeakingPet.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], SpeakingPet.prototype, "_dragDone", null);
      SpeakingPet = __decorate([ ccclass ], SpeakingPet);
      return SpeakingPet;
    }(game_1.default);
    exports.default = SpeakingPet;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./dragHay": "dragHay",
    "./dropCow": "dropCow"
  } ]
}, {}, [ "dragHay", "dropCow", "speakingpet" ]);