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
  tenboxChoiceDrag: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b7e8c5HIaRDSK7anLugLpru", "tenboxChoiceDrag");
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
    var TenBoxChoiceDrag = function(_super) {
      __extends(TenBoxChoiceDrag, _super);
      function TenBoxChoiceDrag() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.missingNumber = null;
        return _this;
      }
      TenBoxChoiceDrag.prototype.onTouchEnd = function(touch) {
        var isDragging = this.isDragging;
        _super.prototype.onTouchEnd.call(this, touch);
        isDragging && (this.match ? this.missingNumber.emit("tenBoxChoiceMatch", this) : this.missingNumber.emit("tenBoxChoiceNoMatch"));
      };
      __decorate([ property(cc.Label) ], TenBoxChoiceDrag.prototype, "label", void 0);
      __decorate([ property(cc.Node) ], TenBoxChoiceDrag.prototype, "missingNumber", void 0);
      TenBoxChoiceDrag = __decorate([ ccclass ], TenBoxChoiceDrag);
      return TenBoxChoiceDrag;
    }(drag_1.default);
    exports.default = TenBoxChoiceDrag;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0
  } ],
  tenboxDrag: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c9dc7csF+lOZKHnRWOZ68WX", "tenboxDrag");
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
    var drop_1 = require("../../../common/scripts/drop");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TenboxDrag = function(_super) {
      __extends(TenboxDrag, _super);
      function TenboxDrag() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      TenboxDrag.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
      };
      TenboxDrag.prototype.onTouchStart = function(touch) {
        _super.prototype.onTouchStart.call(this, touch);
        this.node.parent.parent.parent.zIndex = 1;
      };
      TenboxDrag.prototype.onTouchEnd = function(touch) {
        _super.prototype.onTouchEnd.call(this, touch);
        this.node.parent.parent.parent.zIndex = 0;
        !this.match;
      };
      TenboxDrag.prototype.onMatchOver = function() {
        this.isDragging = false;
        this.allowDrag = true;
        drag_1.default.letDrag = true;
        var mNode = this.matchingNode;
        var parent = this.node.parent;
        parent.removeFromParent();
        this.node.position = cc.Vec2.ZERO;
        mNode.addChild(parent);
        mNode.getComponent(drop_1.default).onMatchOver();
      };
      TenboxDrag = __decorate([ ccclass ], TenboxDrag);
      return TenboxDrag;
    }(drag_1.default);
    exports.default = TenboxDrag;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/drop": void 0
  } ],
  tenboxDrop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b7851hBZftIEbGOjKvyr7Rx", "tenboxDrop");
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
    var commonName = "A";
    var TenboxDrop = function(_super) {
      __extends(TenboxDrop, _super);
      function TenboxDrop() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.count = 0;
        _this.dropPrefab = null;
        _this.subPrefab = null;
        _this.cover = null;
        _this.seal = null;
        return _this;
      }
      TenboxDrop.prototype.onLoad = function() {
        var _this = this;
        if (10 == this.count) this.closeCover(); else {
          this.cover.active = false;
          this.seal.active = false;
        }
        this.node.name = commonName;
        for (var index = 0; index < this.count; index++) {
          var drop = cc.instantiate(this.dropPrefab);
          drop.name = commonName;
          var tempNode = new cc.Node();
          tempNode.height = drop.height;
          tempNode.width = drop.width;
          tempNode.addChild(drop);
          this.node.addChild(tempNode);
        }
        this.node.on("child-added", function() {
          if (++_this.count >= 10) {
            _this.allowDrop = false;
            _this.closeCover();
          }
        }, this);
        this.node.on("child-removed", function() {
          --_this.count < 10 && (_this.allowDrop = true);
        }, this);
      };
      TenboxDrop.prototype.closeCover = function() {
        var _this = this;
        this.allowDrop = false;
        this.scheduleOnce(function() {
          _this.cover.active = true;
          _this.seal.active = true;
          _this.cover.on("touchstart", function() {
            _this.cover.active = false;
            _this.seal.active = false;
          }, _this);
          new cc.Tween().target(_this.seal).set({
            scale: 2
          }).to(.5, {
            scale: 1
          }, null).start();
        }, 1);
      };
      __decorate([ property ], TenboxDrop.prototype, "count", void 0);
      __decorate([ property(cc.Prefab) ], TenboxDrop.prototype, "dropPrefab", void 0);
      __decorate([ property(cc.Prefab) ], TenboxDrop.prototype, "subPrefab", void 0);
      __decorate([ property(cc.Node) ], TenboxDrop.prototype, "cover", void 0);
      __decorate([ property(cc.Node) ], TenboxDrop.prototype, "seal", void 0);
      TenboxDrop = __decorate([ ccclass ], TenboxDrop);
      return TenboxDrop;
    }(drop_1.default);
    exports.default = TenboxDrop;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drop": void 0
  } ],
  tenboxSub: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1939fodrYRH1LqUcX6kHYjq", "tenboxSub");
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
    var commonName = "A";
    var TenboxSub = function(_super) {
      __extends(TenboxSub, _super);
      function TenboxSub() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.count = 0;
        _this.subLayout = null;
        _this.subPrefab = null;
        return _this;
      }
      TenboxSub.prototype.onLoad = function() {
        var _this = this;
        this.node.name = commonName;
        for (var index = 0; index < this.count; index++) {
          var drop = cc.instantiate(this.subPrefab);
          drop.name = commonName;
          var tempNode = new cc.Node();
          tempNode.height = drop.height;
          tempNode.width = drop.width;
          tempNode.addChild(drop);
          this.subLayout.addChild(tempNode);
        }
        this.node.on("child-added", function() {
          if (_this.node.childrenCount >= _this.count) {
            _this.allowDrop = false;
            _this.scheduleOnce(function() {
              new cc.Tween().target(_this.node.parent).to(.5, {
                x: cc.winSize.width
              }, null).start();
            }, 1);
          }
        }, this);
        this.node.on("child-removed", function() {
          _this.node.childrenCount < _this.count && (_this.allowDrop = true);
        }, this);
      };
      __decorate([ property ], TenboxSub.prototype, "count", void 0);
      __decorate([ property(cc.Node) ], TenboxSub.prototype, "subLayout", void 0);
      __decorate([ property(cc.Prefab) ], TenboxSub.prototype, "subPrefab", void 0);
      TenboxSub = __decorate([ ccclass ], TenboxSub);
      return TenboxSub;
    }(drop_1.default);
    exports.default = TenboxSub;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drop": void 0
  } ],
  tenbox: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fe772XRpipECrBrs8ZjOHue", "tenbox");
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
    var tenboxDrop_1 = require("./tenboxDrop");
    var tenboxSub_1 = require("./tenboxSub");
    var config_1 = require("../../../common/scripts/lib/config");
    var drag_1 = require("../../../common/scripts/drag");
    var util_1 = require("../../../common/scripts/util");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var tenboxChoiceDrag_1 = require("./tenboxChoiceDrag");
    var game_1 = require("../../../common/scripts/game");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Tenbox = function(_super) {
      __extends(Tenbox, _super);
      function Tenbox() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.numberDrag = null;
        _this.numberDrop = null;
        _this.tenboxDrop = null;
        _this.tenboxSub = null;
        _this.numberDragLayout = null;
        _this.problemLayout = null;
        _this.boxLayout = null;
        _this.empty = 0;
        return _this;
      }
      Tenbox.prototype.onLoad = function() {
        var _this = this;
        cc.director.getCollisionManager().enabled = true;
        drag_1.default.letDrag = false;
        this.node.on("tenBoxChoiceMatch", this.onMatch.bind(this));
        this.node.on("tenBoxChoiceNoMatch", function() {
          _this.node.emit("wrong");
        });
        var _a = config_1.default.getInstance().data[0], level = _a[0], worksheet = _a[1], problem = _a[2], category = _a[3], question = _a[4], answerStr = _a[5];
        var answer = parseInt(answerStr);
        if ("SUB" == category) {
          var operands = question.split("-");
          this.addTenBoxes(true, parseInt(operands[0]), 2, 0);
          this.addTenBoxes(false, parseInt(operands[1]), 2, 1);
        } else {
          var operands_1 = question.split("+");
          operands_1.forEach(function(val, index) {
            _this.addTenBoxes(true, parseInt(val), operands_1.length, index);
          });
        }
        for (var index = 0; index < 10; index++) {
          var card = cc.instantiate(this.numberDrag);
          card.name = index.toString();
          var dragComp = card.getComponent(tenboxChoiceDrag_1.default);
          dragComp.missingNumber = this.node;
          dragComp.label.string = index.toString();
          var tempNode = new cc.Node();
          tempNode.width = card.width;
          tempNode.height = card.height;
          tempNode.addChild(card);
          this.numberDragLayout.addChild(tempNode);
        }
        var label = this.problemLayout.getChildByName("label");
        if (null != label) {
          var labelComp = label.getComponent(cc.Label);
          labelComp.string = question + "=";
        }
        if (answer > 9) {
          this.createDropBox(this.numberDrop, Math.floor(answer / 10).toString(), this.problemLayout);
          this.createDropBox(this.numberDrop, (answer % 10).toString(), this.problemLayout);
        } else this.createDropBox(this.numberDrop, answer.toString(), this.problemLayout);
        var firstDrag = this.numberDragLayout.children[answer % 10];
        var firstDrop = this.problemLayout.children[this.problemLayout.childrenCount - 1];
        util_1.Util.showHelp(firstDrag, firstDrop);
        drag_1.default.letDrag = true;
      };
      Tenbox.prototype.addTenBoxes = function(add, count, totalBoxes, boxNum) {
        if (count > 10) {
          var drop1 = this.createTenBox(add, 10, boxNum, totalBoxes);
          drop1.y = drop1.height / 2 + 10;
          this.boxLayout.addChild(drop1);
          var drop2 = this.createTenBox(add, count - 10, boxNum, totalBoxes);
          drop2.y = -drop1.height / 2 - 10;
          this.boxLayout.addChild(drop2);
        } else this.boxLayout.addChild(this.createTenBox(add, count, boxNum, totalBoxes));
      };
      Tenbox.prototype.createTenBox = function(add, count, boxNum, totalBoxes) {
        var drop = cc.instantiate(add ? this.tenboxDrop : this.tenboxSub);
        var box = drop.getChildByName("layout");
        if (add) {
          var boxComp = box.getComponent(tenboxDrop_1.default);
          boxComp.count = count;
        } else {
          var boxComp = box.getComponent(tenboxSub_1.default);
          boxComp.count = count;
        }
        drop.x = (.5 + boxNum - totalBoxes / 2) * (drop.width + 20);
        return drop;
      };
      Tenbox.prototype.createDropBox = function(dropPrefab, digit, layout) {
        this.empty++;
        var drop = cc.instantiate(dropPrefab);
        drop.name = digit;
        layout.addChild(drop);
      };
      Tenbox.prototype.onMatch = function() {
        this.node.emit("correct");
        --this.empty <= 0 && this.node.emit("nextProblem");
      };
      __decorate([ property(cc.Prefab) ], Tenbox.prototype, "numberDrag", void 0);
      __decorate([ property(cc.Prefab) ], Tenbox.prototype, "numberDrop", void 0);
      __decorate([ property(cc.Prefab) ], Tenbox.prototype, "tenboxDrop", void 0);
      __decorate([ property(cc.Prefab) ], Tenbox.prototype, "tenboxSub", void 0);
      __decorate([ property(cc.Node) ], Tenbox.prototype, "numberDragLayout", void 0);
      __decorate([ property(cc.Node) ], Tenbox.prototype, "problemLayout", void 0);
      __decorate([ property(cc.Node) ], Tenbox.prototype, "boxLayout", void 0);
      __decorate([ error_handler_1.default() ], Tenbox.prototype, "onLoad", null);
      Tenbox = __decorate([ ccclass ], Tenbox);
      return Tenbox;
    }(game_1.default);
    exports.default = Tenbox;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./tenboxChoiceDrag": "tenboxChoiceDrag",
    "./tenboxDrop": "tenboxDrop",
    "./tenboxSub": "tenboxSub"
  } ]
}, {}, [ "tenbox", "tenboxChoiceDrag", "tenboxDrag", "tenboxDrop", "tenboxSub" ]);