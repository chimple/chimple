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
  arrangeLetters: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2137c29qlpJiK1XLcEby1WA", "arrangeLetters");
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
    var ArrangeLetters = function(_super) {
      __extends(ArrangeLetters, _super);
      function ArrangeLetters() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.playground = null;
        _this.playground2 = null;
        _this.ball2 = null;
        _this.ball = null;
        _this.imagePrefab = null;
        _this.isSoundPlaying = false;
        return _this;
      }
      ArrangeLetters_1 = ArrangeLetters;
      ArrangeLetters.prototype.onLoad = function() {
        var _a;
        _a = config_1.default.getInstance().data[0], this.level = _a[0], this.worksheet = _a[1], 
        this.problem = _a[2], this.backgroundName = _a[3], this.objectName = _a[4], this.word = _a[5], 
        this.wordAudioFileName = _a[6], this.imageFileName = _a[7];
        this.correctLetterArray = this.word.split(",");
        ArrangeLetters_1.correctPosition = new Map();
        ArrangeLetters_1.wordLength = this.correctLetterArray.length;
        this.loadBackground();
        ArrangeLetters_1.letterArray = this.word.split(",");
        this.makeDragObjects();
        this.startGameSound();
        this.node.getChildByName("friendPos").zIndex = 1;
        this.node.getChildByName("friendPos").scale = .5;
        util_1.Util.playGameSound(this.wordAudioFileName, function() {});
      };
      ArrangeLetters.prototype.makeDragObjects = function() {
        var shuffledArray = util_1.Util.shuffle(this.correctLetterArray);
        for (var i = 0; i < this.correctLetterArray.length; i++) {
          var dragObj = cc.instantiate(this[this.objectName]);
          dragObj.parent = this.node;
          dragObj.name = shuffledArray[i];
          for (var j = 0; j < ArrangeLetters_1.letterArray.length; j++) if (dragObj.name === ArrangeLetters_1.letterArray[j]) {
            dragObj.name = dragObj.name + i;
            ArrangeLetters_1.letterArray[j] = ArrangeLetters_1.letterArray[j] + i;
            break;
          }
          dragObj.width = (1 - .1 * this.correctLetterArray.length + .7) * dragObj.width;
          dragObj.height = (1 - .1 * this.correctLetterArray.length + .7) * dragObj.height;
          dragObj.getChildByName("objLabel").getComponent(cc.Label).fontSize = 150 * (1 - .1 * this.correctLetterArray.length + .5);
          dragObj.getChildByName("objLabel").getComponent(cc.Label).lineHeight = 150 * (1 - .1 * this.correctLetterArray.length + .5);
          dragObj.position = cc.v3(this.correctLetterArray.length <= 4 ? -cc.winSize.width / 2.8 + i * cc.winSize.width / this.correctLetterArray.length : -cc.winSize.width / 2.4 + i * cc.winSize.width / this.correctLetterArray.length, -cc.winSize.height / 4);
          ArrangeLetters_1.correctPosition.set(dragObj.name, dragObj.position.x);
          dragObj.getChildByName("objLabel").getComponent(cc.Label).string = shuffledArray[i];
        }
      };
      ArrangeLetters.prototype.loadBackground = function() {
        var loadbg = cc.instantiate(this[this.backgroundName]);
        this.node.addChild(loadbg);
        var imgVal = cc.instantiate(this.imagePrefab);
        this.node.addChild(imgVal);
        util_1.Util.loadTexture(this.imageFileName, function(texture, err) {
          imgVal.getChildByName("image").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        });
      };
      ArrangeLetters.prototype.startGameSound = function() {
        var _this = this;
        util_1.Util.loadGameSound(this.wordAudioFileName, function(clip) {
          null != clip && (_this.friend.extraClip = clip);
        });
      };
      var ArrangeLetters_1;
      __decorate([ property(cc.Prefab) ], ArrangeLetters.prototype, "playground", void 0);
      __decorate([ property(cc.Prefab) ], ArrangeLetters.prototype, "playground2", void 0);
      __decorate([ property(cc.Prefab) ], ArrangeLetters.prototype, "ball2", void 0);
      __decorate([ property(cc.Prefab) ], ArrangeLetters.prototype, "ball", void 0);
      __decorate([ property(cc.Prefab) ], ArrangeLetters.prototype, "imagePrefab", void 0);
      ArrangeLetters = ArrangeLetters_1 = __decorate([ ccclass ], ArrangeLetters);
      return ArrangeLetters;
    }(game_1.default);
    exports.default = ArrangeLetters;
    cc._RF.pop();
  }, {
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/util": void 0
  } ],
  dragObj: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9def2ENnVJIraLwiLEaCkx3", "dragObj");
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
    var arrangeLetters_1 = require("./arrangeLetters");
    var util_1 = require("../../../common/scripts/util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DragObj = function(_super) {
      __extends(DragObj, _super);
      function DragObj() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.correctClip = null;
        _this.richTextNode = null;
        _this._text = null;
        _this._soundName = null;
        _this._soundClip = null;
        _this.isCollisionEnable = false;
        _this.goToOriginalPosition = true;
        _this.positionArray = [];
        _this.currentXPos = null;
        _this.done = false;
        _this.allSwapCorrect = [];
        _this.touchSoundIsPlaying = false;
        return _this;
      }
      DragObj.prototype.onLoad = function() {
        cc.director.getCollisionManager().enabled = true;
        cc.macro.ENABLE_MULTI_TOUCH = false;
        for (var i = 0; i < arrangeLetters_1.default.wordLength - 1; i++) this.allSwapCorrect[i] = false;
      };
      DragObj.prototype.onTouchStart = function(touch) {
        var _this = this;
        _super.prototype.onTouchStart.call(this, touch);
        if (!this.touchSoundIsPlaying) {
          this.touchSoundIsPlaying = true;
          util_1.Util.speakPhonicsOrLetter(touch.currentTarget.name, function() {
            _this.touchSoundIsPlaying = false;
          });
        }
        this.goToOriginalPosition = true;
        this.isCollisionEnable = true;
      };
      DragObj.prototype.onTouchMove = function(touch) {
        _super.prototype.onTouchMove.call(this, touch);
        this.node.setPosition(this.node.position.x, -cc.winSize.height / 4);
        touch.currentTarget.position.z = 1;
      };
      DragObj.prototype.onTouchEnd = function(touch) {
        _super.prototype.onTouchEnd.call(this, touch);
        var actiona = cc.moveTo(.1, cc.v2(arrangeLetters_1.default.correctPosition.get(touch.currentTarget.name), -cc.winSize.height / 4));
        this.node.runAction(actiona);
        this.checkIfMatch();
        this.isCollisionEnable = false;
      };
      DragObj.prototype.onCollisionEnter = function(other, self) {
        if (this.isCollisionEnable) {
          this.selfName = self.node.name;
          this.otherName = other.node.name;
          var actiona = cc.moveTo(.1, cc.v2(arrangeLetters_1.default.correctPosition.get(this.selfName), -cc.winSize.height / 4));
          other.node.runAction(actiona);
          var temp = arrangeLetters_1.default.correctPosition.get(this.selfName);
          arrangeLetters_1.default.correctPosition.set(this.selfName, arrangeLetters_1.default.correctPosition.get(this.otherName));
          arrangeLetters_1.default.correctPosition.set(this.otherName, temp);
        }
      };
      DragObj.prototype.onCollisionExit = function(other, self) {};
      DragObj.prototype.checkIfMatch = function() {
        var _this = this;
        this.allSwapCorrect.forEach(function(element, index) {
          _this.allSwapCorrect[index] = false;
        });
        for (var i = 0; i < arrangeLetters_1.default.wordLength; i++) if (arrangeLetters_1.default.correctPosition.get(arrangeLetters_1.default.letterArray[i]) < arrangeLetters_1.default.correctPosition.get(arrangeLetters_1.default.letterArray[i + 1])) {
          cc.log(arrangeLetters_1.default.correctPosition.get(arrangeLetters_1.default.letterArray[i]) + arrangeLetters_1.default.correctPosition.get(arrangeLetters_1.default.letterArray[i + 1]));
          this.allSwapCorrect[i] = true;
        }
        this.done = this.allSwapCorrect.every(function(val, i, arr) {
          return true === val;
        });
        cc.log(this.allSwapCorrect);
        cc.log(arrangeLetters_1.default.correctPosition);
        if (this.done) {
          this.node.parent.emit("correct");
          this.node.parent.emit("nextProblem");
        }
      };
      __decorate([ property(cc.AudioClip) ], DragObj.prototype, "correctClip", void 0);
      __decorate([ property(cc.RichText) ], DragObj.prototype, "richTextNode", void 0);
      DragObj = __decorate([ ccclass ], DragObj);
      return DragObj;
    }(drag_1.default);
    exports.default = DragObj;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/util": void 0,
    "./arrangeLetters": "arrangeLetters"
  } ]
}, {}, [ "arrangeLetters", "dragObj" ]);