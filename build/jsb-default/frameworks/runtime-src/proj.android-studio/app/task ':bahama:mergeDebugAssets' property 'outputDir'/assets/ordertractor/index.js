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
  numbertrainDrag: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dcaa4SgbbtBZJfoUQLRl+uB", "numbertrainDrag");
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
    var NumberTrainDrag = function(_super) {
      __extends(NumberTrainDrag, _super);
      function NumberTrainDrag() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.num = null;
        _this.numbertrain = null;
        return _this;
      }
      NumberTrainDrag.prototype.onTouchEnd = function(touch) {
        _super.prototype.onTouchEnd.call(this, touch);
        this.isDragging && (this.match ? this.numbertrain.emit("numbertrainMatch", this) : this.numbertrain.emit("numbertrainNoMatch"));
      };
      __decorate([ property(cc.Label) ], NumberTrainDrag.prototype, "num", void 0);
      __decorate([ property(cc.Node) ], NumberTrainDrag.prototype, "numbertrain", void 0);
      NumberTrainDrag = __decorate([ ccclass ], NumberTrainDrag);
      return NumberTrainDrag;
    }(drag_1.default);
    exports.default = NumberTrainDrag;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0
  } ],
  numbertrainDrop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "09812f4G5hIL6AbaR79Uoxg", "numbertrainDrop");
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
    var NumberTrainDrop = function(_super) {
      __extends(NumberTrainDrop, _super);
      function NumberTrainDrop() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.wagonBase = null;
        _this.order = 1;
        return _this;
      }
      NumberTrainDrop.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.wagonBase.scaleY = .5 * this.order;
      };
      __decorate([ property(cc.Node) ], NumberTrainDrop.prototype, "wagonBase", void 0);
      __decorate([ property ], NumberTrainDrop.prototype, "order", void 0);
      NumberTrainDrop = __decorate([ ccclass ], NumberTrainDrop);
      return NumberTrainDrop;
    }(drop_1.default);
    exports.default = NumberTrainDrop;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drop": void 0
  } ],
  ordertractor: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0bd5b3GLgBKOoj3SG3ZINoP", "ordertractor");
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
    var numbertrainDrag_1 = require("./numbertrainDrag");
    var config_1 = require("../../../common/scripts/lib/config");
    var numbertrainDrop_1 = require("./numbertrainDrop");
    var drag_1 = require("../../../common/scripts/drag");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var game_1 = require("../../../common/scripts/game");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var OrderTractor = function(_super) {
      __extends(OrderTractor, _super);
      function OrderTractor() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.drag = null;
        _this.outerDrop = null;
        _this.choices = null;
        _this.train = null;
        _this.trainClip = null;
        _this.metalClink = null;
        _this.empty = 0;
        return _this;
      }
      OrderTractor.prototype.onLoad = function() {
        var _this = this;
        cc.director.getCollisionManager().enabled = true;
        drag_1.default.letDrag = false;
        this.node.on("numbertrainMatch", this.onMatch.bind(this));
        this.node.on("numbertrainNoMatch", function() {
          _this.node.emit("wrong");
        });
        this.friend.isFace = true;
        var _a = config_1.default.getInstance().data[0], oldLevel = _a[0], worksheet = _a[1], oldProblem = _a[2], level = _a[3], reverseStr = _a[4];
        var reverse = "true" == reverseStr.toLowerCase();
        var ordered = this.generateNumbers(parseInt(level));
        reverse && ordered.reverse();
        this.empty = ordered.length;
        var firstDrag = null;
        var firstDrop = null;
        ordered.forEach(function(val, index) {
          var bogey = cc.instantiate(_this.outerDrop);
          var layout = bogey.getChildByName("layout");
          if (null != layout) {
            var drop = layout.getChildByName("drop");
            if (null != drop) {
              drop.name = val.toString();
              var dropComp = drop.getComponent(numbertrainDrop_1.default);
              dropComp.order = reverse ? ordered.length - index : index + 1;
              0 == index && (firstDrop = drop);
            }
          }
          var tempNode = new cc.Node();
          tempNode.width = bogey.width;
          tempNode.height = bogey.height;
          tempNode.addChild(bogey);
          _this.train.addChild(tempNode);
          new cc.Tween().target(bogey).set({
            x: 20 * (index + 1)
          }).delay(2).to(1, {
            x: 0
          }, {
            progress: null,
            easing: "sineIn"
          }).start();
        });
        util_1.Util.shuffle(ordered);
        ordered.forEach(function(val) {
          var drag = cc.instantiate(_this.drag);
          drag.name = val.toString();
          var dragComp = drag.getComponent(numbertrainDrag_1.default);
          dragComp.num.string = val.toString();
          dragComp.numbertrain = _this.node;
          var tempNode = new cc.Node();
          tempNode.width = drag.width;
          tempNode.height = drag.height;
          tempNode.addChild(drag);
          _this.choices.addChild(tempNode);
          drag.name == firstDrop.name && (firstDrag = drag);
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
          util_1.Util.playSfx(_this.metalClink);
        }).call(function() {
          drag_1.default.letDrag = true;
          util_1.Util.showHelp(firstDrag, firstDrop);
        }).start();
      };
      OrderTractor.prototype.onMatch = function() {
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
      OrderTractor.prototype.generateNumbers = function(level) {
        switch (level) {
         case 1:
          return [ 1, 2, 3, 4, 5 ];

         case 2:
          return [ 6, 7, 8, 9, 10 ];

         case 3:
          return this.generateIncrementals(2, 4);

         case 4:
          return [ 2, 4, 6, 8, 10 ];

         case 5:
          return this.generateRandoms(1, 10);

         case 6:
          return this.generateIncrementals(11, 16);

         case 7:
          return this.generateIncrementals(6, 16);

         case 8:
          return this.generateRandoms(1, 20);

         case 9:
          return this.generateIncrementals(10, 12, 2);

         case 10:
          return this.generateMultiples(3, 1, 20);

         case 11:
          return this.generateIncrementals(20, 46);

         case 12:
          return this.generateMultiples(5, 20, 50);

         case 13:
          return this.generateMultiples(3, 20, 50);

         case 14:
          return this.generateMultiples(10, 1, 100);

         case 15:
          return this.generateRandoms(1, 50);

         case 16:
          return this.generateIncrementals(60, 96);

         case 17:
          return this.generateMultiples(5, 1, 100);

         case 18:
          return this.generateRandoms(60, 100);

         default:
          return this.generateRandoms(1, 100);
        }
      };
      OrderTractor.prototype.generateIncrementals = function(min, max, incr) {
        void 0 === incr && (incr = 1);
        var num = Math.floor(Math.random() * (max - min)) + min;
        return [ num, num + 1 * incr, num + 2 * incr, num + 3 * incr, num + 4 * incr ];
      };
      OrderTractor.prototype.generateMultiples = function(mul, min, max) {
        var minBase = Math.ceil(min / mul);
        var maxBase = Math.floor(max / mul) - 4;
        var base = Math.floor(Math.random() * (maxBase - minBase)) + minBase;
        return [ base * mul, (base + 1) * mul, (base + 2) * mul, (base + 3) * mul, (base + 4) * mul ];
      };
      OrderTractor.prototype.generateRandoms = function(min, max) {
        var arr = [];
        var _loop_1 = function() {
          var num = Math.floor(Math.random() * (max - min)) + min;
          arr.find(function(val) {
            return val == num;
          }) != num && arr.push(num);
        };
        while (arr.length < 5) _loop_1();
        return arr.sort(function(a, b) {
          return a - b;
        });
      };
      __decorate([ property(cc.Prefab) ], OrderTractor.prototype, "drag", void 0);
      __decorate([ property(cc.Prefab) ], OrderTractor.prototype, "outerDrop", void 0);
      __decorate([ property(cc.Node) ], OrderTractor.prototype, "choices", void 0);
      __decorate([ property(cc.Node) ], OrderTractor.prototype, "train", void 0);
      __decorate([ property(cc.AudioClip) ], OrderTractor.prototype, "trainClip", void 0);
      __decorate([ property(cc.AudioClip) ], OrderTractor.prototype, "metalClink", void 0);
      __decorate([ error_handler_1.default() ], OrderTractor.prototype, "onMatch", null);
      OrderTractor = __decorate([ ccclass ], OrderTractor);
      return OrderTractor;
    }(game_1.default);
    exports.default = OrderTractor;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./numbertrainDrag": "numbertrainDrag",
    "./numbertrainDrop": "numbertrainDrop"
  } ]
}, {}, [ "numbertrainDrag", "numbertrainDrop", "ordertractor" ]);