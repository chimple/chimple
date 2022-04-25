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
  dragthealphabet_choice: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eca1feFMRxD0LahTkMzGLDl", "dragthealphabet_choice");
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
    var drag_1 = require("../../../common/scripts/drag");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DragTheAlphabetChoice = function(_super) {
      __extends(DragTheAlphabetChoice, _super);
      function DragTheAlphabetChoice() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      DragTheAlphabetChoice.prototype.onTouchStart = function(touch) {
        _super.prototype.onTouchStart.call(this, touch);
        this.node.emit("DragTheAlphabetOnTouch");
      };
      DragTheAlphabetChoice.prototype.onTouchEnd = function(touch) {
        _super.prototype.onTouchEnd.call(this, touch);
        this.match ? this.node.emit("DragTheAlphabetChoiceMatch", this) : this.node.emit("DragTheAlphabetChoiceNoMatch");
      };
      __decorate([ error_handler_1.catchError() ], DragTheAlphabetChoice.prototype, "onTouchStart", null);
      __decorate([ error_handler_1.catchError() ], DragTheAlphabetChoice.prototype, "onTouchEnd", null);
      DragTheAlphabetChoice = __decorate([ ccclass ], DragTheAlphabetChoice);
      return DragTheAlphabetChoice;
    }(drag_1.default);
    exports.default = DragTheAlphabetChoice;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/lib/error-handler": void 0
  } ],
  dragthealphabet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2a954frPGZITKVzOvbwzPiu", "dragthealphabet");
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
    var config_1 = require("../../../common/scripts/lib/config");
    var game_1 = require("../../../common/scripts/game");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DragTheAlphabet = function(_super) {
      __extends(DragTheAlphabet, _super);
      function DragTheAlphabet() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.iceCreamBg = null;
        _this.iceCreamDrag = null;
        _this.cakeBg = null;
        _this.cakeDrag = null;
        _this.flowerBg = null;
        _this.flowerDrag = null;
        _this.sandcastleBg = null;
        _this.sandcastleDrag = null;
        _this.layout = null;
        _this.pick = null;
        _this.friendNode = null;
        _this.totalPieces = 0;
        _this.firstDrag = null;
        return _this;
      }
      DragTheAlphabet.prototype.onLoad = function() {
        var _this = this;
        this.friendPos.zIndex = 2;
        cc.director.getCollisionManager().enabled = true;
        var _a = config_1.default.i.data[0], level = _a[0], worksheet = _a[1], problem = _a[2], theme = _a[3], solution = _a[4], choices = _a[5];
        this.theme = theme;
        this.choices = choices;
        this.solution = solution;
        this.totalPieces++;
        var bg = cc.instantiate(this[theme + "Bg"]);
        this.node.addChild(bg);
        this.layout.zIndex = 1;
        bg.getChildByName("drop").getChildByName("drop_collider").name = this.solution;
        this.createChoices();
        var pos = -cc.winSize.width / 2 + 200;
        this.friendPos.x = pos - 300;
        new cc.Tween().target(this.friendPos).call(function() {
          _this.friend.playAnimation("jumping2", 1);
        }).to(2, {
          x: pos
        }, {
          progress: null,
          easing: "sineOut"
        }).call(function() {
          _this.onTouchAudio(_this.solution);
          _this.friend.playAnimation("popup", 1);
        }).start();
        this.friendPos.on("touchstart", function() {
          _this.onTouchAudio(_this.solution);
          _this.friend.playAnimation("popup", 1);
        });
        util_1.Util.showHelp(this.firstDrag, bg.getChildByName("drop").getChildByName("drop_collider"));
      };
      DragTheAlphabet.prototype.createChoices = function() {
        var _this = this;
        var choices = [];
        choices.push(this.solution);
        this.choices.split(",").forEach(function(element) {
          choices.push(element);
        });
        util_1.Util.shuffle(choices);
        var _loop_1 = function(i) {
          var choice = cc.instantiate(this_1[this_1.theme + "Drag"]);
          choice.on("DragTheAlphabetOnTouch", function() {
            cc.audioEngine.playEffect(_this.pick, false);
            _this.onTouchAudio(choices[i]);
          });
          choice.on("DragTheAlphabetChoiceMatch", this_1.onMatch.bind(this_1));
          choice.on("DragTheAlphabetChoiceNoMatch", function() {
            _this.node.emit("wrong");
          });
          choice.getChildByName("label").getComponent(cc.Label).string = choices[i];
          var temp = new cc.Node();
          temp.addChild(choice);
          temp.name = choices[i];
          this_1.layout.insertChild(temp, i);
          choice.name = choices[i];
          this_1.firstDrag = choice.name == this_1.solution ? temp : null;
        };
        var this_1 = this;
        for (var i = 0; i < choices.length; i++) _loop_1(i);
      };
      DragTheAlphabet.prototype.onMatch = function() {
        this.node.emit("correct");
        this.match();
      };
      DragTheAlphabet.prototype.onTouchAudio = function(file) {
        util_1.Util.loadsLetter(file.toLowerCase(), function(clip) {
          try {
            !clip || util_1.Util.play(clip, false);
          } catch (error) {
            console.log("Failed playing sound");
          }
        });
      };
      DragTheAlphabet.prototype.match = function() {
        --this.totalPieces <= 0 && this.node.emit("nextProblem");
      };
      DragTheAlphabet.prototype.onDestroy = function() {
        cc.audioEngine.stopAllEffects();
      };
      __decorate([ property(cc.Prefab) ], DragTheAlphabet.prototype, "iceCreamBg", void 0);
      __decorate([ property(cc.Prefab) ], DragTheAlphabet.prototype, "iceCreamDrag", void 0);
      __decorate([ property(cc.Prefab) ], DragTheAlphabet.prototype, "cakeBg", void 0);
      __decorate([ property(cc.Prefab) ], DragTheAlphabet.prototype, "cakeDrag", void 0);
      __decorate([ property(cc.Prefab) ], DragTheAlphabet.prototype, "flowerBg", void 0);
      __decorate([ property(cc.Prefab) ], DragTheAlphabet.prototype, "flowerDrag", void 0);
      __decorate([ property(cc.Prefab) ], DragTheAlphabet.prototype, "sandcastleBg", void 0);
      __decorate([ property(cc.Prefab) ], DragTheAlphabet.prototype, "sandcastleDrag", void 0);
      __decorate([ property(cc.Node) ], DragTheAlphabet.prototype, "layout", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], DragTheAlphabet.prototype, "pick", void 0);
      __decorate([ property(cc.Node) ], DragTheAlphabet.prototype, "friendNode", void 0);
      DragTheAlphabet = __decorate([ ccclass ], DragTheAlphabet);
      return DragTheAlphabet;
    }(game_1.default);
    exports.default = DragTheAlphabet;
    cc._RF.pop();
  }, {
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/util": void 0
  } ]
}, {}, [ "dragthealphabet", "dragthealphabet_choice" ]);