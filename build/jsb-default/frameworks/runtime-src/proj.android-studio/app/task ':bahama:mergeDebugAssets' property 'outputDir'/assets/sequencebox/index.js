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
  missingnumberdrag: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6e907bK6XZOxJods+sqHYNw", "missingnumberdrag");
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MissingNumberDrag = function(_super) {
      __extends(MissingNumberDrag, _super);
      function MissingNumberDrag() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.missingNumber = null;
        return _this;
      }
      MissingNumberDrag.prototype.onTouchEnd = function(touch) {
        var isDragging = this.isDragging;
        _super.prototype.onTouchEnd.call(this, touch);
        isDragging && (this.match ? this.missingNumber.emit("missingNumberMatch", this) : this.missingNumber.emit("missingNumberNoMatch"));
      };
      __decorate([ property(cc.Label) ], MissingNumberDrag.prototype, "label", void 0);
      __decorate([ property(cc.Node) ], MissingNumberDrag.prototype, "missingNumber", void 0);
      MissingNumberDrag = __decorate([ ccclass ], MissingNumberDrag);
      return MissingNumberDrag;
    }(drag_1.default);
    exports.default = MissingNumberDrag;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0
  } ],
  missingnumberdrop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ab052ZPDTRCCJUgtl+OEIUn", "missingnumberdrop");
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MissingNumberDrop = function(_super) {
      __extends(MissingNumberDrop, _super);
      function MissingNumberDrop() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        return _this;
      }
      MissingNumberDrop.prototype.onLoad = function() {};
      __decorate([ property(cc.Label) ], MissingNumberDrop.prototype, "label", void 0);
      MissingNumberDrop = __decorate([ ccclass ], MissingNumberDrop);
      return MissingNumberDrop;
    }(drop_1.default);
    exports.default = MissingNumberDrop;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drop": void 0
  } ],
  sequencebox: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f23c3Abn3REVrlShtrbqkp2", "sequencebox");
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
    var missingnumberdrag_1 = require("./missingnumberdrag");
    var config_1 = require("../../../common/scripts/lib/config");
    var util_1 = require("../../../common/scripts/util");
    var drag_1 = require("../../../common/scripts/drag");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var game_1 = require("../../../common/scripts/game");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SequenceBox = function(_super) {
      __extends(SequenceBox, _super);
      function SequenceBox() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.singleCard = null;
        _this.singleDrop = null;
        _this.longCard = null;
        _this.longDrop = null;
        _this.box = null;
        _this.choices = null;
        _this.boxes = null;
        _this.dropClip = null;
        _this.answer = null;
        _this.answerBox = null;
        _this.empty = 0;
        return _this;
      }
      SequenceBox.prototype.onLoad = function() {
        var _this = this;
        cc.director.getCollisionManager().enabled = true;
        drag_1.default.letDrag = false;
        this.node.on("missingNumberMatch", this.onMatch.bind(this));
        this.node.on("missingNumberNoMatch", function() {
          _this.node.emit("wrong");
        });
        var _a = config_1.default.getInstance().data[0], level = _a[0], worksheet = _a[1], problem = _a[2], q1 = _a[3], q2 = _a[4], q3 = _a[5], q4 = _a[6], suggest = _a[7], answer = _a[8];
        var series = [ q1, q2, q3, q4 ];
        var audioClips = [];
        this.answer = answer;
        var delay = 0;
        var firstDrop = null;
        series.forEach(function(element, index) {
          var newBox = cc.instantiate(_this.box);
          if ("?" == element) {
            var layout_1 = newBox.getChildByName("layout");
            "" == suggest ? _this.answer.split("").forEach(function(digit) {
              _this.createDropBox(_this.singleDrop, digit, layout_1);
            }) : _this.createDropBox(_this.longDrop, _this.answer, layout_1);
            firstDrop = layout_1.children[layout_1.childrenCount - 1];
            _this.answerBox = newBox;
          } else {
            var label = newBox.getChildByName("label");
            var labelComp = label.getComponent(cc.Label);
            labelComp.string = element;
          }
          _this.boxes.addChild(newBox);
          "?" != element && parseInt(element) <= 100 ? util_1.Util.loadNumericSound(element, function(clip) {
            audioClips[index] = clip;
          }) : audioClips[index] = null;
          delay += .5;
          new cc.Tween().target(newBox).set({
            y: cc.winSize.height
          }).delay(delay).to(.5, {
            y: 0
          }, {
            progress: null,
            easing: "cubicIn"
          }).call(function() {
            util_1.Util.playSfx(_this.dropClip);
          }).delay(delay + 2).call(function() {
            null != audioClips[index] && util_1.Util.play(audioClips[index], false);
            new cc.Tween().target(newBox).to(.25, {
              scale: 1.1
            }, {
              progress: null,
              easing: "sineOut"
            }).to(.25, {
              scale: 1
            }, {
              progress: null,
              easing: "sineIn"
            }).call(function() {
              if (index + 1 == series.length) {
                util_1.Util.showHelp(firstDrag, firstDrop);
                drag_1.default.letDrag = true;
              }
            }).start();
          }).start();
        });
        var suggestions = [];
        if ("" == suggest) for (var index = 0; index < 10; index++) suggestions.push(index.toString()); else suggest.split(",").forEach(function(el) {
          suggestions.push(el.trim());
        });
        var firstDrag = null;
        suggestions.forEach(function(element) {
          var card = cc.instantiate("" == suggest ? _this.singleCard : _this.longCard);
          card.name = element;
          var dragComp = card.getComponent(missingnumberdrag_1.default);
          dragComp.missingNumber = _this.node;
          dragComp.label.string = element;
          var tempNode = new cc.Node();
          tempNode.width = card.width;
          tempNode.height = card.height;
          tempNode.addChild(card);
          _this.choices.addChild(tempNode);
          element == firstDrop.name && (firstDrag = card);
        });
      };
      SequenceBox.prototype.createDropBox = function(dropPrefab, digit, layout) {
        this.empty++;
        var drop = cc.instantiate(dropPrefab);
        drop.name = digit;
        layout.addChild(drop);
      };
      SequenceBox.prototype.onMatch = function() {
        var _this = this;
        this.node.emit("correct");
        if (--this.empty <= 0) {
          this.answerBox.getChildByName("layout").active = false;
          var label = this.answerBox.getChildByName("label");
          var labelComp = label.getComponent(cc.Label);
          labelComp.string = this.answer;
          var anim = this.answerBox.getComponent(cc.Animation);
          anim.on("finished", function() {
            var particle = _this.answerBox.getChildByName("particlesystem");
            if (null != particle) {
              var particleSystem_1 = particle.getComponent(cc.ParticleSystem);
              particleSystem_1.resetSystem();
              _this.scheduleOnce(function() {
                particleSystem_1.stopSystem();
                _this.node.emit("nextProblem");
              }, 3);
            }
          });
          anim.play();
        }
      };
      __decorate([ property(cc.Prefab) ], SequenceBox.prototype, "singleCard", void 0);
      __decorate([ property(cc.Prefab) ], SequenceBox.prototype, "singleDrop", void 0);
      __decorate([ property(cc.Prefab) ], SequenceBox.prototype, "longCard", void 0);
      __decorate([ property(cc.Prefab) ], SequenceBox.prototype, "longDrop", void 0);
      __decorate([ property(cc.Prefab) ], SequenceBox.prototype, "box", void 0);
      __decorate([ property(cc.Node) ], SequenceBox.prototype, "choices", void 0);
      __decorate([ property(cc.Node) ], SequenceBox.prototype, "boxes", void 0);
      __decorate([ property(cc.AudioClip) ], SequenceBox.prototype, "dropClip", void 0);
      __decorate([ error_handler_1.default() ], SequenceBox.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], SequenceBox.prototype, "onMatch", null);
      SequenceBox = __decorate([ ccclass ], SequenceBox);
      return SequenceBox;
    }(game_1.default);
    exports.default = SequenceBox;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./missingnumberdrag": "missingnumberdrag"
  } ]
}, {}, [ "missingnumberdrag", "missingnumberdrop", "sequencebox" ]);