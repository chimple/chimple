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
  spelldoor: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "32d3et6w8hIjqTgdBZJpv/o", "spelldoor");
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
    var drag_1 = require("../../../common/scripts/drag");
    var spellingDrag_1 = require("./spellingDrag");
    var util_1 = require("../../../common/scripts/util");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var Utility_1 = require("../../../common/scripts/Utility");
    var game_1 = require("../../../common/scripts/game");
    var drop_1 = require("../../../common/scripts/drop");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SpellDoor = function(_super) {
      __extends(SpellDoor, _super);
      function SpellDoor() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.dropLayout = null;
        _this.choiceLayout = null;
        _this.sprite = null;
        _this.spellingDrag = null;
        _this.spellingDrop = null;
        _this.anim = null;
        _this.choices = [];
        _this.empty = 0;
        return _this;
      }
      SpellDoor.prototype.onLoad = function() {
        var _this = this;
        var config = config_1.default.getInstance();
        cc.director.getCollisionManager().enabled = true;
        drag_1.default.letDrag = false;
        var _a = config.data[0], level = _a[0], worksheet = _a[1], problem = _a[2], word = _a[3], missingPos = _a[4], totalConsonants = _a[5], totalVowels = _a[6], image = _a[7], sound = _a[8];
        var firstDrag = null;
        var firstDrop = null;
        var positions = this.splitWord(missingPos);
        var numConsonants = parseInt(totalConsonants);
        var numVowels = parseInt(totalVowels);
        if (config_1.default.wide) {
          this.dropLayout.getComponent(cc.Layout).spacingX += 30;
          this.choiceLayout.getComponent(cc.Layout).spacingX += 30;
        }
        this.splitWord(word).forEach(function(val, index, arr) {
          Utility_1.AlphabetUtil.isConsonantOrVowel(val) == Utility_1.LetterType.Consonant ? numConsonants-- : numVowels--;
          var drop = cc.instantiate(_this.spellingDrop);
          var dropC = drop.getComponent(drop_1.default);
          dropC && (dropC.allowDrop = false);
          drop.name = val;
          _this.dropLayout.addChild(drop);
          var drag = _this.createDrag(val);
          drop.addChild(drag);
          if ("*" == positions[index] || 0 == _this.empty && index == arr.length - 1) {
            _this.empty++;
            var dropComponent = drag.parent.getComponent(drop_1.default);
            null !== dropComponent && (dropComponent.allowDrop = dropComponent.node.name === drag.name);
            _this.choices.push(drag);
            if (null == firstDrag) {
              firstDrag = drag;
              firstDrop = drop;
            }
            new cc.Tween().target(drag).delay(3).to(.5, {
              y: -cc.winSize.height
            }, null).start();
          } else drag.getComponent(spellingDrag_1.default).allowDrag = false;
        });
        while (numConsonants-- > 0) this.choices.push(this.createDrag(Utility_1.AlphabetUtil.getRandomConsonant().toLowerCase()));
        while (numVowels-- > 0) this.choices.push(this.createDrag(Utility_1.AlphabetUtil.getRandomVowel().toLowerCase()));
        util_1.Util.loadTexture(image, function(texture) {
          _this.anim.once("finished", function() {
            _this.scheduleOnce(function() {
              _this.sprite.spriteFrame = new cc.SpriteFrame(texture);
              util_1.Util.resizeSprite(_this.sprite, 370, 273);
              util_1.Util.loadGameSound(sound, function(clip) {
                if (null != clip) {
                  _this.friend.extraClip = clip;
                  _this.friend.speakExtra();
                }
              });
              var animState = _this.anim.play();
              animState.wrapMode = cc.WrapMode.Reverse;
            }, 1);
          });
          _this.scheduleOnce(function() {
            _this.anim.play();
          }, 1);
        });
        var choiceY = this.choiceLayout.y;
        new cc.Tween().target(this.choiceLayout).set({
          y: -cc.winSize.height
        }).delay(5).call(function() {
          util_1.Util.shuffle(_this.choices);
          _this.choices.forEach(function(drag) {
            if (null != drag.parent) {
              drag.removeFromParent();
              drag.position = cc.Vec2.ZERO;
            }
            var temp = new cc.Node();
            temp.width = drag.width;
            temp.addChild(drag);
            _this.choiceLayout.addChild(temp);
          });
        }).to(.5, {
          y: choiceY
        }, null).call(function() {
          util_1.Util.showHelp(firstDrag, firstDrop);
          drag_1.default.letDrag = true;
        }).start();
      };
      SpellDoor.prototype.splitWord = function(word) {
        var splitter = new GraphemeSplitter();
        return -1 != word.indexOf(",") ? word.split(",") : splitter.splitGraphemes(word);
      };
      SpellDoor.prototype.createDrag = function(val) {
        var _this = this;
        var drag = cc.instantiate(this.spellingDrag);
        drag.name = val;
        drag.on("spellingMatch", this.onMatch.bind(this));
        drag.on("spellingNoMatch", function() {
          _this.node.emit("wrong");
        });
        return drag;
      };
      SpellDoor.prototype.onMatch = function() {
        var _this = this;
        this.node.emit("correct");
        if (--this.empty <= 0) {
          drag_1.default.letDrag = false;
          this.node.pauseSystemEvents(true);
          this.scheduleOnce(function() {
            return _this.friend.speakExtra(_this.endAnimate.bind(_this));
          }, .5);
        }
      };
      SpellDoor.prototype.endAnimate = function() {
        var _this = this;
        this.scheduleOnce(function() {
          _this.anim.once("finished", function() {
            new cc.Tween().target(_this.friendPos).delay(.5).call(function() {
              null != _this.friend && _this.friend.playAnimation("jumping", 1);
            }).to(1, {
              x: 0
            }, null).delay(1).call(function() {
              _this.node.emit("nextProblem");
            }).start();
          });
          var animState = _this.anim.play();
          animState.wrapMode = cc.WrapMode.Normal;
        }, 1);
      };
      __decorate([ property(cc.Node) ], SpellDoor.prototype, "dropLayout", void 0);
      __decorate([ property(cc.Node) ], SpellDoor.prototype, "choiceLayout", void 0);
      __decorate([ property(cc.Sprite) ], SpellDoor.prototype, "sprite", void 0);
      __decorate([ property(cc.Prefab) ], SpellDoor.prototype, "spellingDrag", void 0);
      __decorate([ property(cc.Prefab) ], SpellDoor.prototype, "spellingDrop", void 0);
      __decorate([ property(cc.Animation) ], SpellDoor.prototype, "anim", void 0);
      __decorate([ error_handler_1.default() ], SpellDoor.prototype, "onLoad", null);
      SpellDoor = __decorate([ ccclass ], SpellDoor);
      return SpellDoor;
    }(game_1.default);
    exports.default = SpellDoor;
    cc._RF.pop();
  }, {
    "../../../common/scripts/Utility": void 0,
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/drop": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./spellingDrag": "spellingDrag"
  } ],
  spellingDrag: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1d505nPB4hNAI/dqMsKYwJt", "spellingDrag");
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
    var lessonController_1 = require("../../../common/scripts/lessonController");
    var config_1 = require("../../../common/scripts/lib/config");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SpellingDrag = function(_super) {
      __extends(SpellingDrag, _super);
      function SpellingDrag() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._soundClip = null;
        return _this;
      }
      SpellingDrag.prototype.onLoad = function() {
        var _this = this;
        _super.prototype.onLoad.call(this);
        this.label.string = config_1.default.wide ? " " + this.node.name + " " : this.node.name;
        util_1.Util.loadsPhonicsOrLetter(this.node.name.toLowerCase(), function(clip) {
          _this._soundClip = clip;
        });
      };
      SpellingDrag.prototype.start = function() {
        this.label.node.width = 2 * this.label.node.width;
      };
      SpellingDrag.prototype.onTouchStart = function(touch) {
        _super.prototype.onTouchStart.call(this, touch);
        if (null != this._soundClip) try {
          lessonController_1.default.getFriend().speak(this._soundClip);
        } catch (error) {
          console.log("Failed playing sound");
        }
      };
      SpellingDrag.prototype.onTouchEnd = function(touch) {
        var allowDrag = this.allowDrag;
        _super.prototype.onTouchEnd.call(this, touch);
        allowDrag && this.isMoved && (this.match ? this.node.emit("spellingMatch", this) : this.node.emit("spellingNoMatch"));
      };
      SpellingDrag = __decorate([ ccclass ], SpellingDrag);
      return SpellingDrag;
    }(drag_1.default);
    exports.default = SpellingDrag;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/lessonController": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/util": void 0
  } ],
  spellingDrop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ac928EDQMVMboj3SFohsgXo", "spellingDrop");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SpellingDrop = void 0;
    var SpellingDrop = function() {
      function SpellingDrop(index, letter, letterType) {
        this.letter = letter;
        this.index = index;
        this.isVowelOrConsonant = letterType;
      }
      SpellingDrop.prototype.setIndex = function(index) {
        this.index = index;
      };
      SpellingDrop.prototype.setLetter = function(letter) {
        this.letter = letter;
      };
      SpellingDrop.prototype.setBoundary = function(boundary) {
        this.boundary = boundary;
      };
      SpellingDrop.prototype.setPosition = function(position) {
        this.position = position;
      };
      return SpellingDrop;
    }();
    exports.SpellingDrop = SpellingDrop;
    cc._RF.pop();
  }, {} ]
}, {}, [ "spelldoor", "spellingDrag", "spellingDrop" ]);