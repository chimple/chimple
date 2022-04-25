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
  createsentence: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0d522qsfkdF0ZDB0HxoAs0Y", "createsentence");
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
    var game_1 = require("../../../common/scripts/game");
    var config_1 = require("../../../common/scripts/lib/config");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var util_1 = require("../../../common/scripts/util");
    var sentencemakerDrag_1 = require("./sentencemakerDrag");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CreateSentence = function(_super) {
      __extends(CreateSentence, _super);
      function CreateSentence() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.truck = null;
        _this.picture = null;
        _this.answer = null;
        _this.choices = null;
        _this.dropPrefab = null;
        _this.dragPrefab = null;
        _this.soundClip = null;
        _this.numAnswers = 0;
        _this.isRTL = false;
        return _this;
      }
      CreateSentence.prototype.onLoad = function() {
        var _this = this;
        this.isRTL = config_1.default.i.direction == config_1.Direction.RTL;
        cc.director.getCollisionManager().enabled = true;
        drag_1.default.letDrag = false;
        var _a = config_1.default.getInstance().data[0], level = _a[0], worksheet = _a[1], problem = _a[2], solution = _a[3], wrong = _a[4], image = _a[5], sound = _a[6];
        util_1.Util.loadGameSound(sound, function(clip) {
          null != clip && (_this.friend.extraClip = clip);
        });
        var picWidth = this.picture.node.width;
        var picHeight = this.picture.node.height;
        util_1.Util.loadTexture(image, function(texture) {
          _this.picture.spriteFrame = new cc.SpriteFrame(texture);
          var size = _this.picture.spriteFrame.getOriginalSize();
          var xScale = picWidth / size.width;
          var yScale = picHeight / size.height;
          var scale = Math.min(xScale, yScale);
          _this.picture.node.width = scale * size.width;
          _this.picture.node.height = scale * size.height;
        });
        this.onFinishTruckMoveTo = -cc.winSize.width;
        var solutions = solution.split("/");
        if (this.isRTL) {
          solutions.reverse();
          this.onFinishTruckMoveTo = 2 * cc.winSize.width;
          this.truck.scaleX = -1;
        }
        this.numAnswers = solutions.length;
        solutions.forEach(function(val) {
          var drop = cc.instantiate(_this.dropPrefab);
          drop.name = val;
          _this.answer.addChild(drop);
        });
        wrong.length > 0 && solutions.push(wrong);
        util_1.Util.shuffle(solutions);
        var delay = 0;
        solutions.forEach(function(val) {
          var drag = cc.instantiate(_this.dragPrefab);
          drag.name = val;
          if (_this.isRTL) {
            var newNode = new cc.Node();
            newNode.name = "shouldFlip";
            drag.addChild(newNode);
          }
          drag.on("sentencemakerMatch", _this.onMatch.bind(_this));
          drag.on("sentencemakerNoMatch", function() {
            _this.node.emit("wrong");
          });
          var dragComp = drag.getComponent(sentencemakerDrag_1.default);
          drag.getComponent(sentencemakerDrag_1.default).allowDrag = false;
          null != dragComp && (dragComp.label.string = val);
          var tempNode = new cc.Node();
          tempNode.name = val;
          tempNode.addChild(drag);
          _this.choices.addChild(tempNode);
          delay += .5;
          new cc.Tween().target(drag).set({
            y: -300
          }).delay(delay).to(.5, {
            y: 0
          }, {
            progress: null,
            easing: "cubicIn"
          }).start();
        });
        var truckX = this.truck.x;
        new cc.Tween().target(this.truck).set({
          x: cc.winSize.width * (this.isRTL ? -1 : 1)
        }).to(3, {
          x: truckX + (this.isRTL ? 1e3 : 0)
        }, {
          progress: null,
          easing: "quadOut"
        }).call(function() {
          var anim = _this.truck.getComponent(cc.Animation);
          anim.stop();
          drag_1.default.letDrag = true;
          var firstDrop = _this.answer.children[0];
          var firstDrag = _this.choices.getChildByName(firstDrop.name);
          null != firstDrag && firstDrag.childrenCount > 0 && util_1.Util.showHelp(firstDrag.children[0], firstDrop);
          _this.choices.children.forEach(function(child) {
            child.children[0].getComponent(sentencemakerDrag_1.default).allowDrag = true;
          });
        }).start();
      };
      CreateSentence.prototype.onMatch = function() {
        var _this = this;
        this.node.emit("correct");
        if (--this.numAnswers <= 0) {
          this.node.pauseSystemEvents(true);
          drag_1.default.letDrag = false;
          this.scheduleOnce(function() {
            _this.friend.speakExtra(function() {
              var anim = _this.truck.getComponent(cc.Animation);
              anim.play();
              new cc.Tween().target(_this.truck).to(3, {
                x: _this.onFinishTruckMoveTo
              }, {
                progress: null,
                easing: "quadOut"
              }).call(function() {
                _this.node.emit("nextProblem");
              }).start();
            });
          }, 2);
        }
      };
      __decorate([ property(cc.Node) ], CreateSentence.prototype, "truck", void 0);
      __decorate([ property(cc.Sprite) ], CreateSentence.prototype, "picture", void 0);
      __decorate([ property(cc.Node) ], CreateSentence.prototype, "answer", void 0);
      __decorate([ property(cc.Node) ], CreateSentence.prototype, "choices", void 0);
      __decorate([ property(cc.Prefab) ], CreateSentence.prototype, "dropPrefab", void 0);
      __decorate([ property(cc.Prefab) ], CreateSentence.prototype, "dragPrefab", void 0);
      __decorate([ error_handler_1.default() ], CreateSentence.prototype, "onLoad", null);
      CreateSentence = __decorate([ ccclass ], CreateSentence);
      return CreateSentence;
    }(game_1.default);
    exports.default = CreateSentence;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./sentencemakerDrag": "sentencemakerDrag"
  } ],
  sentencemakerDrag: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "926b5QAJK1Dw5gQWQQqe12B", "sentencemakerDrag");
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
    var SentencemakerDrag = function(_super) {
      __extends(SentencemakerDrag, _super);
      function SentencemakerDrag() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      SentencemakerDrag.prototype.onTouchEnd = function(touch) {
        _super.prototype.onTouchEnd.call(this, touch);
        this.match ? this.node.emit("sentencemakerMatch", this) : this.node.emit("sentencemakerNoMatch");
      };
      SentencemakerDrag = __decorate([ ccclass ], SentencemakerDrag);
      return SentencemakerDrag;
    }(drag_1.default);
    exports.default = SentencemakerDrag;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0
  } ],
  sentencemakerDrop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d3189irwaJD6bjDTJkHGYD7", "sentencemakerDrop");
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
    var SentencemakerDrop = function(_super) {
      __extends(SentencemakerDrop, _super);
      function SentencemakerDrop() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.origWidth = 0;
        return _this;
      }
      SentencemakerDrop.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.origWidth = this.node.width;
      };
      SentencemakerDrop.prototype.onCollisionEnter = function(other, self) {
        _super.prototype.onCollisionEnter.call(this, other, self);
        this.allowDrop && (this.node.width = other.node.width);
      };
      SentencemakerDrop.prototype.onCollisionExit = function(other, self) {
        _super.prototype.onCollisionExit.call(this, other, self);
        this.allowDrop && (this.node.width = this.origWidth);
      };
      SentencemakerDrop = __decorate([ ccclass ], SentencemakerDrop);
      return SentencemakerDrop;
    }(drop_1.default);
    exports.default = SentencemakerDrop;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drop": void 0
  } ]
}, {}, [ "createsentence", "sentencemakerDrag", "sentencemakerDrop" ]);