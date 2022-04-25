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
  phonictractor_drag: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e4098tLChNJ3qDgl7RyRMjd", "phonictractor_drag");
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
    var util_1 = require("../../../common/scripts/util");
    var lessonController_1 = require("../../../common/scripts/lessonController");
    var config_1 = require("../../../common/scripts/lib/config");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PhonicTractorDrag = function(_super) {
      __extends(PhonicTractorDrag, _super);
      function PhonicTractorDrag() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._soundClip = null;
        return _this;
      }
      PhonicTractorDrag.prototype.onLoad = function() {
        var _this = this;
        this.label.string = config_1.default.wide ? " " + this.node.name + " " : this.node.name;
        util_1.Util.loadGameAudioOrPhonics(this.node.name.toLowerCase(), function(clip) {
          null != clip && (_this._soundClip = clip);
        });
      };
      PhonicTractorDrag.prototype.onTouchStart = function(touch) {
        _super.prototype.onTouchStart.call(this, touch);
        if (null != this._soundClip) try {
          lessonController_1.default.getFriend().speak(this._soundClip);
        } catch (error) {
          console.log("Failed playing sound");
        }
      };
      PhonicTractorDrag.prototype.onTouchEnd = function(touch) {
        _super.prototype.onTouchEnd.call(this, touch);
        this.match ? this.node.emit("phonicTractorMatch", this) : this.node.emit("phonicTractorNoMatch");
      };
      __decorate([ error_handler_1.catchError() ], PhonicTractorDrag.prototype, "onTouchEnd", null);
      PhonicTractorDrag = __decorate([ ccclass ], PhonicTractorDrag);
      return PhonicTractorDrag;
    }(drag_1.default);
    exports.default = PhonicTractorDrag;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/lessonController": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0
  } ],
  phonictractor: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5bfc5YJVeVKdpzUCaJg9HZ5", "phonictractor");
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
    var phonictractor_drag_1 = require("./phonictractor_drag");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var game_1 = require("../../../common/scripts/game");
    var drag_1 = require("../../../common/scripts/drag");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PhonicTractor = function(_super) {
      __extends(PhonicTractor, _super);
      function PhonicTractor() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.truckNode = null;
        _this.trolleyPrefab = null;
        _this.boxPrefab = null;
        _this.metalAudio = null;
        _this.truckInAudio = null;
        _this.truckOutAudio = null;
        _this.trolley = [];
        _this.box = null;
        _this.count = 1;
        _this.totalPieces = 0;
        _this.finishTruckMoveTo = -2e3;
        _this.firstDrag = null;
        _this.firstDrop = null;
        _this._isRTL = false;
        return _this;
      }
      PhonicTractor.prototype.onLoad = function() {
        var _this = this;
        drag_1.default.letDrag = false;
        cc.director.getCollisionManager().enabled = true;
        this._isRTL = config_1.default.i.direction == config_1.Direction.RTL;
        this.totalPieces++;
        this.completed = [];
        this.wordAudio = new Map();
        var fieldArr = config_1.default.getInstance().data[0].toString().split(",");
        var word1, word2, word3, problemCount, level, worksheet, problem, audio, audio1, audio2, audio3;
        level = fieldArr[0], worksheet = fieldArr[1], problem = fieldArr[2], problemCount = fieldArr[3], 
        this.answer = fieldArr[4], this.temp = fieldArr[5], word1 = fieldArr[6], audio1 = fieldArr[7], 
        word2 = fieldArr[8], audio2 = fieldArr[9], word3 = fieldArr[10], audio3 = fieldArr[11];
        null == word2 && (word2 = "");
        null == audio2 && (audio2 = "");
        null == word3 && (word3 = "");
        null == audio3 && (audio3 = "");
        this.truckNode.x = cc.winSize.width / 2;
        this.word = [ word1 ];
        "" != word2 && this.word.push(word2);
        "" != word3 && this.word.push(word3);
        if (this._isRTL) {
          this.truckNode.x = -cc.winSize.width / 2;
          this.finishTruckMoveTo = 2e3;
        }
        this.wordAudio.set(this.answer, this.temp);
        this.wordAudio.set(word1, audio1);
        this.wordAudio.set(word2, audio2);
        this.wordAudio.set(word3, audio3);
        console.log("words" + this.word);
        this.onTouchAudio(this.wordAudio.get(this.answer));
        var truckOffset;
        this.instantiateTrolley(0);
        if (0 != word2.length) {
          this.count++;
          this.instantiateTrolley(1);
        }
        if (0 != word3.length) {
          this.count++;
          this.instantiateTrolley(2);
        }
        if (config_1.default.i.direction == config_1.Direction.RTL) {
          this.truckNode.scaleX = -1;
          truckOffset = 100 * (this.count - 1) + 310;
        } else truckOffset = 100 * -(this.count - 1) - 310;
        new cc.Tween().target(this.truckNode).call(function() {
          util_1.Util.playSfx(_this.truckInAudio);
        }).to(2.1, {
          x: truckOffset
        }, {
          progress: null,
          easing: function(t) {
            return t;
          }
        }).call(function() {
          var i = 0;
          _this.trolley.forEach(function(e) {
            i++;
            new cc.Tween().target(e).call(function() {
              util_1.Util.playSfx(_this.metalAudio);
            }).to(.5, {
              position: cc.v2(e.position.x + 20 * i, e.position.y)
            }, {
              progress: null,
              easing: "elasticOut"
            }).start();
          });
          _this.showOptions();
        }).start();
        this.node.getChildByName("board").getChildByName("answer_label").getComponent(cc.Label).string = config_1.default.wide ? " " + this.answer + " " : this.answer;
      };
      PhonicTractor.prototype.instantiateTrolley = function(i) {
        this.trolley[i] = cc.instantiate(this.trolleyPrefab);
        this.trolley[i].parent = this.truckNode;
        this.trolley[i].position = cc.v3(this.trolley[i].position.x + 260 * i, -75, 0);
        this.trolley[i].getChildByName("drop_area").name = this.word[i];
        0 == i && (this.firstDrop = this.trolley[i]);
      };
      PhonicTractor.prototype.showOptions = function() {
        var _this = this;
        var firstDragData = this.word[0];
        var arr = this.word;
        Math.random() > .3 && (arr = util_1.Util.shuffle(this.word));
        for (var i = 0; i < this.count; i++) {
          var dragBox = cc.instantiate(this.boxPrefab);
          var dragComp = dragBox.getComponent(phonictractor_drag_1.default);
          null != dragComp && (dragComp.label.string = arr[i]);
          arr[i] == firstDragData && (this.firstDrag = dragBox);
          dragBox.name = arr[i];
          var tempNode = new cc.Node();
          tempNode.addChild(dragBox);
          tempNode.name = arr[i];
          this.node.getChildByName("New Layout").addChild(tempNode);
          dragBox.on("phonicTractorMatch", this.onMatch.bind(this));
          dragBox.on("phonicTractorNoMatch", function() {
            return _this.node.emit("wrong");
          });
          if (this._isRTL) {
            var newNode = new cc.Node();
            newNode.name = "shouldFlip";
            dragBox.addChild(newNode);
          }
        }
        util_1.Util.loadGameSound(this.wordAudio.get(this.answer), function(clip) {
          null != clip && (_this.friend.extraClip = clip);
          util_1.Util.showHelp(_this.firstDrag, _this.firstDrop);
          drag_1.default.letDrag = true;
        });
      };
      PhonicTractor.prototype.onTouchAudio = function(file) {
        var _this = this;
        util_1.Util.loadGameSound(file, function(clip) {
          null != clip && _this.friend.speak(clip);
        });
      };
      PhonicTractor.prototype.onMatch = function() {
        var _this = this;
        this.node.emit("correct");
        0 == --this.count && new cc.Tween().target(this.truckNode).delay(1).call(function() {
          _this.friend.speakExtra();
        }).delay(1).call(function() {
          var j = 0;
          util_1.Util.playSfx(_this.metalAudio);
          _this.trolley.forEach(function(e) {
            j++;
            new cc.Tween().target(e).to(.5, {
              position: cc.v2(e.position.x - 20 * j, e.position.y)
            }, {
              progress: null,
              easing: "sineOut"
            }).start();
          });
        }).delay(1).call(function() {
          util_1.Util.playSfx(_this.truckOutAudio);
        }).to(2, {
          x: this.finishTruckMoveTo
        }, {
          progress: null,
          easing: function(t) {
            return t;
          }
        }).call(function() {
          return _this.match();
        }).start();
      };
      PhonicTractor.prototype.match = function() {
        --this.totalPieces <= 0 && this.node.emit("nextProblem");
      };
      PhonicTractor.prototype.onDestroy = function() {
        cc.audioEngine.stopAllEffects();
      };
      __decorate([ property(cc.Node) ], PhonicTractor.prototype, "truckNode", void 0);
      __decorate([ property(cc.Prefab) ], PhonicTractor.prototype, "trolleyPrefab", void 0);
      __decorate([ property(cc.Prefab) ], PhonicTractor.prototype, "boxPrefab", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], PhonicTractor.prototype, "metalAudio", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], PhonicTractor.prototype, "truckInAudio", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], PhonicTractor.prototype, "truckOutAudio", void 0);
      __decorate([ error_handler_1.catchError() ], PhonicTractor.prototype, "onLoad", null);
      __decorate([ error_handler_1.catchError() ], PhonicTractor.prototype, "instantiateTrolley", null);
      __decorate([ error_handler_1.catchError() ], PhonicTractor.prototype, "showOptions", null);
      __decorate([ error_handler_1.catchError() ], PhonicTractor.prototype, "onTouchAudio", null);
      __decorate([ error_handler_1.catchError() ], PhonicTractor.prototype, "onMatch", null);
      __decorate([ error_handler_1.catchError() ], PhonicTractor.prototype, "match", null);
      __decorate([ error_handler_1.catchError() ], PhonicTractor.prototype, "onDestroy", null);
      PhonicTractor = __decorate([ ccclass ], PhonicTractor);
      return PhonicTractor;
    }(game_1.default);
    exports.default = PhonicTractor;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./phonictractor_drag": "phonictractor_drag"
  } ]
}, {}, [ "phonictractor", "phonictractor_drag" ]);