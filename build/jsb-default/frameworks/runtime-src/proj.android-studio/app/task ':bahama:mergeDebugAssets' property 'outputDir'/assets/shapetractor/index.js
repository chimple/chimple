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
  patterntrainDrag: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "96333ZTyOhGy6Vt492j+m1D", "patterntrainDrag");
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
    var PatternTrainDrag = function(_super) {
      __extends(PatternTrainDrag, _super);
      function PatternTrainDrag() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.pattern = null;
        _this.patterntrain = null;
        return _this;
      }
      PatternTrainDrag.prototype.onTouchEnd = function(touch) {
        _super.prototype.onTouchEnd.call(this, touch);
        this.isDragging && (this.match ? this.patterntrain.emit("patterntrainMatch", this) : this.patterntrain.emit("patterntrainNoMatch"));
      };
      __decorate([ property(cc.Sprite) ], PatternTrainDrag.prototype, "pattern", void 0);
      __decorate([ property(cc.Node) ], PatternTrainDrag.prototype, "patterntrain", void 0);
      PatternTrainDrag = __decorate([ ccclass ], PatternTrainDrag);
      return PatternTrainDrag;
    }(drag_1.default);
    exports.default = PatternTrainDrag;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0
  } ],
  patterntrainDrop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a8067jtko9PFLADt8d6rwY9", "patterntrainDrop");
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
    var PatternTrainDrop = function(_super) {
      __extends(PatternTrainDrop, _super);
      function PatternTrainDrop() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      PatternTrainDrop = __decorate([ ccclass ], PatternTrainDrop);
      return PatternTrainDrop;
    }(drop_1.default);
    exports.default = PatternTrainDrop;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drop": void 0
  } ],
  shapetractor: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1e6f07b/oZANqQsqZCfgNY+", "shapetractor");
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
    var patterntrainDrag_1 = require("./patterntrainDrag");
    var config_1 = require("../../../common/scripts/lib/config");
    var drag_1 = require("../../../common/scripts/drag");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var util_1 = require("../../../common/scripts/util");
    var game_1 = require("../../../common/scripts/game");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var patterns = [ "dummy", "circle", "hexagon", "octagon", "oval", "parallelogram", "pentagon", "rectangle", "rhombus", "square", "star", "trapezoid", "triangle" ];
    var threeCarBogeyWidth = 444;
    var ShapeTractor = function(_super) {
      __extends(ShapeTractor, _super);
      function ShapeTractor() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.drag = null;
        _this.drop = null;
        _this.trainBogey = null;
        _this.threeCarBogey = null;
        _this.choices = null;
        _this.train = null;
        _this.trainClip = null;
        _this.circle = null;
        _this.hexagon = null;
        _this.octagon = null;
        _this.oval = null;
        _this.parallelogram = null;
        _this.pentagon = null;
        _this.rectangle = null;
        _this.rhombus = null;
        _this.square = null;
        _this.star = null;
        _this.trapezoid = null;
        _this.triangle = null;
        _this.empty = 0;
        _this.firstDrag = null;
        _this.firstDrop = null;
        return _this;
      }
      ShapeTractor.prototype.onLoad = function() {
        var _this = this;
        cc.director.getCollisionManager().enabled = true;
        drag_1.default.letDrag = false;
        this.node.on("patterntrainMatch", this.onMatch.bind(this));
        this.node.on("patterntrainNoMatch", function() {
          _this.node.emit("wrong");
        });
        var _a = config_1.default.getInstance().data[0], oldLevelStr = _a[0], worksheet = _a[1], oldProblemStr = _a[2], levelStr = _a[3], problemStr = _a[4];
        var level = parseInt(levelStr);
        var problem = parseInt(problemStr);
        var seq = this.generatePatterns(level, problem);
        var pattern = level >= 4 ? Math.floor(Math.random() * (patterns.length - 1)) + 1 : 0;
        seq.forEach(function(val, index) {
          _this.addBogey(val, index, pattern);
        });
        var selections = level >= 4 ? [ 1, 2, 3 ] : seq[0];
        selections = selections.filter(function(val, index) {
          return selections.indexOf(val) === index;
        });
        while (selections.length < seq[0].length) {
          var rand = Math.floor(Math.random() * (patterns.length - 1)) + 1;
          -1 == selections.indexOf(rand) && selections.push(rand);
        }
        util_1.Util.shuffle(selections);
        selections.forEach(function(val) {
          var drag = cc.instantiate(_this.drag);
          drag.name = val.toString();
          var dragComp = drag.getComponent(patterntrainDrag_1.default);
          dragComp.pattern.spriteFrame = _this[patterns[pattern > 0 ? pattern : val]];
          pattern > 0 && (dragComp.pattern.node.scale = 1 / val);
          dragComp.patterntrain = _this.node;
          var tempNode = new cc.Node();
          tempNode.width = drag.width;
          tempNode.height = drag.height;
          tempNode.addChild(drag);
          _this.choices.addChild(tempNode);
          drag.name == _this.firstDrop.name && null == _this.firstDrag && (_this.firstDrag = drag);
        });
        var trainX = this.train.x;
        new cc.Tween().target(this.train).call(function() {
          util_1.Util.playSfx(_this.trainClip);
        }).set({
          x: trainX + cc.winSize.width
        }).to(3, {
          x: trainX
        }, {
          progress: null,
          easing: "backOut"
        }).call(function() {
          drag_1.default.letDrag = true;
          util_1.Util.showHelp(_this.firstDrag, _this.firstDrop);
        }).start();
      };
      ShapeTractor.prototype.addBogey = function(first, index, pattern) {
        var _this = this;
        var bogey = cc.instantiate(this.trainBogey);
        var cargo = bogey.getChildByName("cargo");
        if (3 == first.length) {
          var car = bogey.getChildByName("car");
          if (null != car) {
            var carComp = car.getComponent(cc.Sprite);
            carComp.spriteFrame = this.threeCarBogey;
            car.width = threeCarBogeyWidth;
            bogey.width = threeCarBogeyWidth;
          }
        }
        null != cargo && first.forEach(function(val) {
          if (val > 0) {
            var drag = cc.instantiate(_this.drag);
            var dragComp = drag.getComponent(patterntrainDrag_1.default);
            dragComp.allowDrag = false;
            dragComp.pattern.spriteFrame = _this[patterns[pattern > 0 ? pattern : val]];
            pattern > 0 && (dragComp.pattern.node.scale = 1 / val);
            cargo.addChild(drag);
          } else {
            var drop = cc.instantiate(_this.drop);
            null != drop && (drop.name = (-val).toString());
            cargo.addChild(drop);
            null == _this.firstDrop && (_this.firstDrop = drop);
          }
        });
        this.train.addChild(bogey);
        new cc.Tween().target(bogey).set({
          x: 40 * (index + 1)
        }).delay(2).to(1, {
          x: 0
        }, {
          progress: null,
          easing: "sineIn"
        }).start();
      };
      ShapeTractor.prototype.onMatch = function() {
        var _this = this;
        this.node.emit("correct");
        if (--this.empty <= 0) {
          drag_1.default.letDrag = false;
          new cc.Tween().target(this.train).delay(1).call(function() {
            util_1.Util.playSfx(_this.trainClip);
          }).to(1, {
            x: this.train.x - cc.winSize.width
          }, {
            progress: null,
            easing: "backIn"
          }).call(function() {
            _this.node.emit("nextProblem");
          }).start();
        }
      };
      ShapeTractor.prototype.generatePatterns = function(level, iteration) {
        switch (level) {
         case 1:
          this.empty = 1;
          if (1 == iteration) {
            var rand = Math.floor(Math.random() * (patterns.length - 1)) + 1;
            return this.generateSequence(2, 2, rand, rand + 1);
          }
          return this.generateSequence(2, 2, 1, patterns.length);

         case 2:
          this.empty = 1;
          return this.generateSequence(3, 2, 1, patterns.length);

         case 3:
          this.empty = 2;
          return this.generateSequence(3, 2, 1, patterns.length);

         case 4:
          this.empty = 2;
          return this.generateSequence(2, 3, 1, 4);

         case 5:
          this.empty = 3;
          return this.generateSequence(3, 2, 1, 4);
        }
      };
      ShapeTractor.prototype.generateSequence = function(numCargo, numBogey, min, max) {
        var numEmpty = this.empty;
        var seq = [];
        var pattern = [];
        for (var index = 0; index < numCargo; index++) pattern.push(Math.floor(Math.random() * (max - min)) + min);
        seq.push(pattern);
        for (var index = 0; index < numBogey - 1; index++) seq.push(__spreadArrays(pattern));
        var lastBogey = seq[seq.length - 1];
        while (numEmpty > 0) {
          var index = Math.floor(Math.random() * numCargo);
          if (lastBogey[index] > 0) {
            lastBogey[index] *= -1;
            numEmpty--;
          }
        }
        return seq;
      };
      __decorate([ property(cc.Prefab) ], ShapeTractor.prototype, "drag", void 0);
      __decorate([ property(cc.Prefab) ], ShapeTractor.prototype, "drop", void 0);
      __decorate([ property(cc.Prefab) ], ShapeTractor.prototype, "trainBogey", void 0);
      __decorate([ property(cc.SpriteFrame) ], ShapeTractor.prototype, "threeCarBogey", void 0);
      __decorate([ property(cc.Node) ], ShapeTractor.prototype, "choices", void 0);
      __decorate([ property(cc.Node) ], ShapeTractor.prototype, "train", void 0);
      __decorate([ property(cc.AudioClip) ], ShapeTractor.prototype, "trainClip", void 0);
      __decorate([ property(cc.SpriteFrame) ], ShapeTractor.prototype, "circle", void 0);
      __decorate([ property(cc.SpriteFrame) ], ShapeTractor.prototype, "hexagon", void 0);
      __decorate([ property(cc.SpriteFrame) ], ShapeTractor.prototype, "octagon", void 0);
      __decorate([ property(cc.SpriteFrame) ], ShapeTractor.prototype, "oval", void 0);
      __decorate([ property(cc.SpriteFrame) ], ShapeTractor.prototype, "parallelogram", void 0);
      __decorate([ property(cc.SpriteFrame) ], ShapeTractor.prototype, "pentagon", void 0);
      __decorate([ property(cc.SpriteFrame) ], ShapeTractor.prototype, "rectangle", void 0);
      __decorate([ property(cc.SpriteFrame) ], ShapeTractor.prototype, "rhombus", void 0);
      __decorate([ property(cc.SpriteFrame) ], ShapeTractor.prototype, "square", void 0);
      __decorate([ property(cc.SpriteFrame) ], ShapeTractor.prototype, "star", void 0);
      __decorate([ property(cc.SpriteFrame) ], ShapeTractor.prototype, "trapezoid", void 0);
      __decorate([ property(cc.SpriteFrame) ], ShapeTractor.prototype, "triangle", void 0);
      __decorate([ error_handler_1.default() ], ShapeTractor.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], ShapeTractor.prototype, "onMatch", null);
      ShapeTractor = __decorate([ ccclass ], ShapeTractor);
      return ShapeTractor;
    }(game_1.default);
    exports.default = ShapeTractor;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./patterntrainDrag": "patterntrainDrag"
  } ]
}, {}, [ "patterntrainDrag", "patterntrainDrop", "shapetractor" ]);