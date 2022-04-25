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
  alphaDrag: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "80ee4YIDgNNuKEhs9/f7oXY", "alphaDrag");
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
    var drag_1 = require("../../../common/scripts/drag");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var AlphaDrag = function(_super) {
      __extends(AlphaDrag, _super);
      function AlphaDrag() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.pos = 0;
        _this._soundClip = null;
        return _this;
      }
      AlphaDrag.prototype.onLoad = function() {
        var _this = this;
        _super.prototype.onLoad.call(this);
        "letterboard" == config_1.default.i.data[0][0] ? util_1.Util.loadsLetter(this.node.name.toLowerCase(), function(clip) {
          _this._soundClip = clip;
        }) : util_1.Util.loadNumericSound(this.node.name, function(clip) {
          _this._soundClip = clip;
        });
      };
      AlphaDrag.prototype.onTouchStart = function(touch) {
        _super.prototype.onTouchStart.call(this, touch);
        if (this.allowDrag && null != this._soundClip) try {
          !this._soundClip || util_1.Util.play(this._soundClip, false);
        } catch (error) {
          console.log("Failed playing sound");
        }
      };
      AlphaDrag.prototype.onTouchEnd = function(touch) {
        _super.prototype.onTouchEnd.call(this, touch);
        this.match ? this.node.emit("alphaMatch", this) : this.node.emit("alphaNoMatch");
      };
      AlphaDrag.prototype.onMatchOver = function() {
        _super.prototype.onMatchOver.call(this);
        this.node.parent.color = cc.Color.WHITE;
        this.node.parent.opacity = 255;
      };
      AlphaDrag = __decorate([ ccclass ], AlphaDrag);
      return AlphaDrag;
    }(drag_1.default);
    exports.default = AlphaDrag;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/util": void 0
  } ],
  alphaDrop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0afdbuIudJG17Ubeb9JdadQ", "alphaDrop");
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
    var AlphaDrop = function(_super) {
      __extends(AlphaDrop, _super);
      function AlphaDrop() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      AlphaDrop = __decorate([ ccclass ], AlphaDrop);
      return AlphaDrop;
    }(drop_1.default);
    exports.default = AlphaDrop;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drop": void 0
  } ],
  board: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "39a7exrKS9LEquIcYndlzb0", "board");
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
    var alphaDrag_1 = require("./alphaDrag");
    var numberDisplay_1 = require("./numberDisplay");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var colors = [ "#5BC0EB", "#FDE74C", "#9BC53D", "#55934", "#A7921", "#540D6E", "#EE4266", "#FFD23F", "#3BCEAC", "#0EAD69" ];
    var PuzzleType;
    (function(PuzzleType) {
      PuzzleType[PuzzleType["Alpha"] = 0] = "Alpha";
      PuzzleType[PuzzleType["DropStickDragAlpha"] = 1] = "DropStickDragAlpha";
      PuzzleType[PuzzleType["DropAlphaDragStick"] = 2] = "DropAlphaDragStick";
    })(PuzzleType || (PuzzleType = {}));
    var Board = function(_super) {
      __extends(Board, _super);
      function Board() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.dropLayout = null;
        _this.alphaDrag = null;
        _this.alphaDrop = null;
        _this.pos0 = null;
        _this.pos1 = null;
        _this.pos2 = null;
        _this.truck = null;
        _this.truckInClip = null;
        _this.truckOutClip = null;
        _this.letters = null;
        _this.positions = null;
        _this.drags = [];
        _this.currentIndex = 0;
        _this.dragPositions = {};
        _this.fontSize = 0;
        _this.lineHeight = 0;
        _this.type = null;
        return _this;
      }
      Board.prototype.onLoad = function() {
        var _this = this;
        var config = config_1.default.getInstance();
        cc.director.getCollisionManager().enabled = true;
        drag_1.default.letDrag = false;
        var truckX = this.truck.x;
        if (config_1.default.i.direction == config_1.Direction.RTL) {
          this.truck.scaleX = -1;
          this.xpos = -this.truck.x;
          this.truck.x = -cc.winSize.width;
          this.pos0.x = -this.pos0.x;
          this.pos1.x = -this.pos1.x;
          this.pos2.x = -this.pos2.x;
        } else {
          this.xpos = this.truck.x;
          this.truck.x = cc.winSize.width;
        }
        this.positions = [ this.pos0, this.pos1, this.pos2 ];
        this.dropLayout.removeAllChildren();
        var data = config.data;
        this.letters = data[0][3].split(",");
        var layout = this.dropLayout.getComponent(cc.Layout);
        layout.paddingTop = parseInt(data[0][5]);
        layout.paddingBottom = parseInt(data[0][6]);
        layout.spacingX = parseInt(data[0][7]);
        layout.spacingY = parseInt(data[0][8]);
        this.fontSize = parseInt(data[0][9]);
        this.lineHeight = parseInt(data[0][10]);
        if ("Alpha" == data[0][4]) {
          this.type = PuzzleType.Alpha;
          this.letters.forEach(function(element) {
            var drop = cc.instantiate(_this.alphaDrop);
            drop.name = element;
            config_1.default.i.direction == config_1.Direction.RTL && (drop.scaleX = -1);
            var dropLabel = drop.getComponent(cc.Label);
            dropLabel.string = element;
            dropLabel.fontSize = _this.fontSize;
            dropLabel.lineHeight = _this.lineHeight;
            _this.dropLayout.addChild(drop);
          });
        } else if ("DropStickDragAlpha" == data[0][4]) {
          this.type = PuzzleType.DropStickDragAlpha;
          this.letters.forEach(function(element) {
            var drop = cc.instantiate(_this.imagePuzzleDrop);
            drop.name = element;
            config_1.default.i.direction == config_1.Direction.RTL && (drop.scaleX = -1);
            var numberDisplay = cc.instantiate(_this.numberDisplay);
            var numberDisplayComp = numberDisplay.getComponent(numberDisplay_1.default);
            numberDisplayComp.num = parseInt(element);
            numberDisplayComp.type = "Stick";
            drop.getChildByName("imageglass_alphapuzzle").addChild(numberDisplay);
            _this.dropLayout.addChild(drop);
          });
        } else if ("DropAlphaDragStick" == data[0][4]) {
          this.type = PuzzleType.DropAlphaDragStick;
          this.letters.forEach(function(element) {
            var drop = cc.instantiate(_this.imagePuzzleDrop);
            drop.name = element;
            config_1.default.i.direction == config_1.Direction.RTL && (drop.scaleX = -1);
            var numberDisplay = cc.instantiate(_this.numberDisplay);
            numberDisplay.color = new cc.Color().fromHEX(colors[Math.floor(Math.random() * colors.length)]);
            var comp = numberDisplay.getComponent(numberDisplay_1.default);
            comp.type = "Alpha";
            comp.num = parseInt(element);
            comp.fontSize = _this.fontSize;
            comp.lineHeight = _this.lineHeight;
            drop.getChildByName("imageglass_alphapuzzle").addChild(numberDisplay);
            _this.dropLayout.addChild(drop);
          });
        }
        "y" == data[0][11] && (this.letters = util_1.Util.shuffle(this.letters));
        new cc.Tween().target(this.truck).call(function() {
          util_1.Util.playSfx(_this.truckInClip);
        }).to(1.5, {
          x: (this.truck.x + this.xpos) / 2
        }, {
          progress: null,
          easing: "quadOut"
        }).delay(.5).to(1.5, {
          x: this.xpos
        }, {
          progress: null,
          easing: "quadIn"
        }).call(function() {
          var anim = _this.truck.getComponent(cc.Animation);
          anim.stop();
          _this.createDrag(0, 0);
          _this.createDrag(1, 1);
          _this.createDrag(2, 2);
          _this.scheduleOnce(function() {
            drag_1.default.letDrag = true;
          }, 1);
        }).start();
      };
      Board.prototype.onMatch = function(drag) {
        var _this = this;
        this.node.emit("correct");
        null != this.friend && this.friend.playAnimation("happy", 1);
        if (1 == this.drags.length) {
          var anim = this.truck.getComponent(cc.Animation);
          anim.play();
          new cc.Tween().target(this.truck).delay(1).call(function() {
            util_1.Util.playSfx(_this.truckOutClip);
          }).to(3, {
            x: 2 * -cc.winSize.width
          }, {
            progress: null,
            easing: "quadOut"
          }).call(function() {
            _this.node.emit("nextProblem");
          }).start();
        } else {
          for (var i = drag.pos; i < this.drags.length - 1; i++) {
            this.drags[i] = this.drags[i + 1];
            new cc.Tween().target(this.drags[i]).to(.5, {
              position: this.positions[i].position
            }, {
              progress: null,
              easing: "backOut"
            }).start();
            this.drags[i].position = this.positions[i].position;
            var dragChild = this.drags[i].children[0];
            var dragComp = dragChild.getComponent(alphaDrag_1.default);
            dragComp.pos = i;
          }
          ++this.currentIndex < this.letters.length ? this.createDrag(this.currentIndex, this.drags.length - 1) : this.drags.splice(this.drags.length - 1, 1);
        }
      };
      Board.prototype.createDrag = function(index, pos) {
        var _this = this;
        var drag = null;
        this.type == PuzzleType.Alpha ? drag = this.createAlphaDrag(index) : this.type == PuzzleType.DropStickDragAlpha ? drag = this.createImageAlphaDrag(index) : this.type == PuzzleType.DropAlphaDragStick && (drag = this.createImageObjectDrag(index));
        drag.name = this.letters[index];
        drag.on("alphaMatch", this.onMatch.bind(this));
        drag.on("alphaNoMatch", function() {
          _this.node.emit("wrong");
          null != _this.friend && _this.friend.playAnimation("sad", 1);
        });
        var dragComp = drag.getComponent(alphaDrag_1.default);
        dragComp.pos = pos;
        var tempNode = new cc.Node();
        tempNode.addChild(drag);
        tempNode.position = this.positions[pos].position;
        this.node.addChild(tempNode);
        this.drags[pos] = tempNode;
        this.currentIndex = index;
        new cc.Tween().target(tempNode).set({
          position: new cc.Vec2(this.positions[pos].position.x, -cc.winSize.height)
        }).to(.5, {
          position: this.positions[pos].position
        }, {
          progress: null,
          easing: "backOut"
        }).call(function() {
          0 == index && util_1.Util.showHelp(drag, _this.dropLayout.getChildByName(drag.name));
        }).start();
      };
      Board.prototype.createAlphaDrag = function(index) {
        var drag = cc.instantiate(this.alphaDrag);
        drag.color = new cc.Color().fromHEX(colors[Math.floor(Math.random() * colors.length)]);
        var dragLabel = drag.getComponent(cc.Label);
        dragLabel.string = this.letters[index];
        dragLabel.fontSize = this.fontSize;
        dragLabel.lineHeight = this.lineHeight;
        return drag;
      };
      Board.prototype.createImageAlphaDrag = function(index) {
        var drag = cc.instantiate(this.imagePuzzleDrag);
        var display = cc.instantiate(this.numberDisplay);
        display.color = new cc.Color().fromHEX(colors[Math.floor(Math.random() * colors.length)]);
        var comp = display.getComponent(numberDisplay_1.default);
        comp.type = "Alpha";
        comp.num = parseInt(this.letters[index]);
        comp.fontSize = this.fontSize;
        comp.lineHeight = this.lineHeight;
        drag.addChild(display);
        return drag;
      };
      Board.prototype.createImageObjectDrag = function(index) {
        var drag = cc.instantiate(this.imagePuzzleDrag);
        var display = cc.instantiate(this.numberDisplay);
        var comp = display.getComponent(numberDisplay_1.default);
        comp.type = "Object";
        comp.num = parseInt(this.letters[index]);
        drag.addChild(display);
        return drag;
      };
      __decorate([ property(cc.Node) ], Board.prototype, "dropLayout", void 0);
      __decorate([ property(cc.Prefab) ], Board.prototype, "alphaDrag", void 0);
      __decorate([ property(cc.Prefab) ], Board.prototype, "alphaDrop", void 0);
      __decorate([ property(cc.Prefab) ], Board.prototype, "imagePuzzleDrag", void 0);
      __decorate([ property(cc.Prefab) ], Board.prototype, "imagePuzzleDrop", void 0);
      __decorate([ property(cc.Prefab) ], Board.prototype, "numberDisplay", void 0);
      __decorate([ property(cc.Node) ], Board.prototype, "pos0", void 0);
      __decorate([ property(cc.Node) ], Board.prototype, "pos1", void 0);
      __decorate([ property(cc.Node) ], Board.prototype, "pos2", void 0);
      __decorate([ property(cc.Node) ], Board.prototype, "truck", void 0);
      __decorate([ property(cc.AudioClip) ], Board.prototype, "truckInClip", void 0);
      __decorate([ property(cc.AudioClip) ], Board.prototype, "truckOutClip", void 0);
      __decorate([ error_handler_1.default() ], Board.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], Board.prototype, "onMatch", null);
      __decorate([ error_handler_1.default() ], Board.prototype, "createDrag", null);
      Board = __decorate([ ccclass ], Board);
      return Board;
    }(game_1.default);
    exports.default = Board;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./alphaDrag": "alphaDrag",
    "./numberDisplay": "numberDisplay"
  } ],
  numberDisplay: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d0dae0qgp5NMJHe3SoDzmOk", "numberDisplay");
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
    var chimple_label_1 = require("../../../common/scripts/chimple-label");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NumberDisplay = function(_super) {
      __extends(NumberDisplay, _super);
      function NumberDisplay() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.num = null;
        _this.type = "Alpha";
        _this.fontSize = null;
        _this.lineHeight = null;
        _this.stick = null;
        _this.object1 = null;
        _this.object2 = null;
        _this.object3 = null;
        _this.object4 = null;
        _this.object5 = null;
        _this.object6 = null;
        _this.object7 = null;
        _this.object8 = null;
        _this.object9 = null;
        _this.object10 = null;
        return _this;
      }
      NumberDisplay.prototype.onLoad = function() {
        if ("Stick" == this.type) {
          var layout = this.getComponent(cc.Layout);
          if (this.num <= 10) {
            layout.paddingBottom = 10;
            layout.paddingTop = 10;
            layout.paddingLeft = 10;
            layout.paddingRight = 10;
            layout.spacingX = 10;
          }
          for (var index = 0; index < this.num; index++) {
            if (this.num > 10 && index % 5 == 0 && index % 10 != 0) {
              var filler = new cc.Node();
              filler.width = 4;
              this.node.addChild(filler);
            }
            var image = new cc.Node();
            var sprite = image.addComponent(cc.Sprite);
            sprite.spriteFrame = this.stick;
            this.num > 10 && (image.width = 8);
            this.node.addChild(image);
          }
        } else if ("Alpha" == this.type) {
          var label = this.node.addComponent(chimple_label_1.default);
          label.fontSize = this.fontSize;
          label.lineHeight = this.lineHeight;
          label.string = this.num.toString();
        } else if ("Object" == this.type) {
          var layout = this.getComponent(cc.Layout);
          layout.resizeMode = cc.Layout.ResizeMode.CHILDREN;
          if (this.num <= 10) {
            layout.paddingLeft = 5;
            layout.paddingTop = 0;
            layout.spacingX = 5;
            layout.spacingY = 4;
            layout.cellSize = cc.size(30, 30);
          } else {
            layout.paddingLeft = 5;
            layout.paddingTop = 0;
            layout.spacingX = 2;
            layout.spacingY = 5;
            layout.cellSize = cc.size(19, 19);
          }
          var object = this["object" + Math.ceil(10 * Math.random())];
          for (var index = 0; index < this.num; index++) {
            if (10 == index) for (var i = 0; i < 5; i++) {
              var filler = new cc.Node();
              this.node.addChild(filler);
            }
            var image = new cc.Node();
            var sprite = image.addComponent(cc.Sprite);
            sprite.spriteFrame = object;
            this.num > 10 && (image.width = 8);
            this.node.addChild(image);
          }
        }
      };
      __decorate([ property ], NumberDisplay.prototype, "num", void 0);
      __decorate([ property ], NumberDisplay.prototype, "type", void 0);
      __decorate([ property ], NumberDisplay.prototype, "fontSize", void 0);
      __decorate([ property ], NumberDisplay.prototype, "lineHeight", void 0);
      __decorate([ property(cc.SpriteFrame) ], NumberDisplay.prototype, "stick", void 0);
      __decorate([ property(cc.SpriteFrame) ], NumberDisplay.prototype, "object1", void 0);
      __decorate([ property(cc.SpriteFrame) ], NumberDisplay.prototype, "object2", void 0);
      __decorate([ property(cc.SpriteFrame) ], NumberDisplay.prototype, "object3", void 0);
      __decorate([ property(cc.SpriteFrame) ], NumberDisplay.prototype, "object4", void 0);
      __decorate([ property(cc.SpriteFrame) ], NumberDisplay.prototype, "object5", void 0);
      __decorate([ property(cc.SpriteFrame) ], NumberDisplay.prototype, "object6", void 0);
      __decorate([ property(cc.SpriteFrame) ], NumberDisplay.prototype, "object7", void 0);
      __decorate([ property(cc.SpriteFrame) ], NumberDisplay.prototype, "object8", void 0);
      __decorate([ property(cc.SpriteFrame) ], NumberDisplay.prototype, "object9", void 0);
      __decorate([ property(cc.SpriteFrame) ], NumberDisplay.prototype, "object10", void 0);
      NumberDisplay = __decorate([ ccclass ], NumberDisplay);
      return NumberDisplay;
    }(cc.Component);
    exports.default = NumberDisplay;
    cc._RF.pop();
  }, {
    "../../../common/scripts/chimple-label": void 0
  } ]
}, {}, [ "alphaDrag", "alphaDrop", "board", "numberDisplay" ]);