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
  monsterDrag: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d506abujG1KdoTaPvO7SSJ0", "monsterDrag");
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
    var MonsterDrag = function(_super) {
      __extends(MonsterDrag, _super);
      function MonsterDrag() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mirror = 1;
        return _this;
      }
      MonsterDrag.prototype.onLoad = function() {
        this.mirror = this.node.parent.convertToWorldSpaceAR(this.node.position).x > cc.winSize.width / 2 ? -1 : 1;
        this.node.scaleX = this.mirror;
      };
      MonsterDrag.prototype.matchPos = function(location) {
        return this.node.parent.convertToNodeSpaceAR(location);
      };
      MonsterDrag.prototype.onMatchOver = function() {
        this.isDragging = false;
        drag_1.default.letDrag = true;
        this.enableTouch();
        this.allowDrag = true;
        var mNode = this.matchingNode;
        this.node.position = mNode.convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(cc.Vec2.ZERO));
        this.node.removeFromParent();
        mNode.addChild(this.node);
        var nNode = this.node.parent;
        if (nNode) {
          var newNode = nNode.parent;
          if (newNode) {
            var monster = newNode.parent;
            monster && monster.emit("monsterMatch");
          }
        }
        var anim = this.node.getComponent(cc.Animation);
        if (null != anim) {
          anim.play();
          this.schedule(function() {
            anim.play();
          }, 4);
        }
      };
      MonsterDrag.prototype.onReturnBackOnNoMatch = function() {
        drag_1.default.letDrag = true;
        this.node.removeFromParent();
      };
      MonsterDrag.prototype.onTouchMove = function(touch) {
        _super.prototype.onTouchMove.call(this, touch);
        if (this.allowDrag && this.isDragging) {
          this.mirror = touch.getLocationX() > cc.winSize.width / 2 ? -1 : 1;
          this.node.scaleX = 1.1 * this.mirror;
        }
      };
      MonsterDrag.prototype.touchStartAnimation = function() {
        new cc.Tween().target(this.node).to(.25, {
          scaleX: 1.1 * this.mirror,
          scaleY: 1.1
        }, {
          progress: null,
          easing: "elasticOut"
        }).start();
      };
      MonsterDrag.prototype.touchEndAnimation = function() {
        new cc.Tween().target(this.node).to(.25, {
          scaleX: 1 * this.mirror,
          scaleY: 1
        }, {
          progress: null,
          easing: "elasticOut"
        }).start();
      };
      MonsterDrag.prototype.collisionEnterCondition = function(self, other) {
        return "a" === other.node.name;
      };
      __decorate([ property ], MonsterDrag.prototype, "mirror", void 0);
      MonsterDrag = __decorate([ ccclass ], MonsterDrag);
      return MonsterDrag;
    }(drag_1.default);
    exports.default = MonsterDrag;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0
  } ],
  monster: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "af1ffJncFNMgKxb8LLUocsy", "monster");
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
    var config_1 = require("../../../common/scripts/lib/config");
    var game_1 = require("../../../common/scripts/game");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MIN_STICKERS_FOR_CAMERA = 5;
    var Monster = function(_super) {
      __extends(Monster, _super);
      function Monster() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.background = null;
        _this.label = null;
        _this.mask = null;
        _this.wallpaper = null;
        _this.graphics = null;
        _this.board = null;
        _this.bottomPaint = null;
        _this.bottomMouth = null;
        _this.bottomHat = null;
        _this.bottomEye = null;
        _this.bottomMark = null;
        _this.bottomHair = null;
        _this.bottomNose = null;
        _this.bottomWallpaper = null;
        _this.wallpaper1 = null;
        _this.wallpaper2 = null;
        _this.wallpaper3 = null;
        _this.wallpaper4 = null;
        _this.wallpaper5 = null;
        _this.wallpaper6 = null;
        _this.wallpaper7 = null;
        _this.cameraButton = null;
        _this.cameraAnim = null;
        _this.currentTool = null;
        _this.numHeightAdjust = 0;
        _this.numYAdjust = 0;
        _this.numStickers = 0;
        return _this;
      }
      Monster.prototype.onLoad = function() {
        var _this = this;
        cc.director.getCollisionManager().enabled = true;
        this.node.on("touchstart", function() {});
        this.node.on("touchmove", this.onTouchMove, this);
        this.node.on("monsterMatch", function() {
          ++_this.numStickers >= MIN_STICKERS_FOR_CAMERA && (_this.cameraButton.interactable = true);
          _this.node.emit("correct");
        });
        this.cameraButton.interactable = false;
        var _a = config_1.default.getInstance().data[0], level = _a[0], worksheet = _a[1], problem = _a[2], letter = _a[3], heightAdjust = _a[4], yAdjust = _a[5];
        this.numHeightAdjust = Number(heightAdjust);
        this.numYAdjust = Number(yAdjust);
        var labelComp = this.label.getComponent(cc.Label);
        null != labelComp && (labelComp.string = letter);
      };
      Monster.prototype.start = function() {
        var texture = this.label._renderComponent._frame._texture;
        this.mask.spriteFrame = new cc.SpriteFrame(texture);
        this.mask.node.width = this.label.width;
        this.mask.node.height = this.label.height;
        this.background.width = this.label.width;
        this.background.height = this.label.height + this.numHeightAdjust;
        this.background.y += this.numHeightAdjust / 2;
        this.board.size.width = this.label.width;
        this.board.size.height = this.label.height + Number(this.numHeightAdjust);
        this.board.offset.y += this.numHeightAdjust / 2;
        this.label.y += Number(this.numYAdjust);
        this.mask.node.y += Number(this.numYAdjust);
      };
      Monster.prototype.onTouchMove = function(touch) {
        if (this.currentTool == this.bottomPaint) {
          var from = this.label.convertToNodeSpaceAR(touch.getPreviousLocation());
          var to = this.label.convertToNodeSpaceAR(touch.getLocation());
          this.graphics.moveTo(from.x, from.y);
          this.graphics.lineTo(to.x, to.y);
          this.graphics.stroke();
        }
      };
      Monster.prototype.onToolClick = function(event, customEventData) {
        var newTool = this[customEventData];
        if (null != newTool) {
          null != this.currentTool && (this.currentTool.active = false);
          this.currentTool = newTool;
          newTool.active = true;
          var y = newTool.y;
          new cc.Tween().target(newTool).set({
            y: -cc.winSize.height / 2
          }).to(.25, {
            y: y
          }, {
            progress: null,
            easing: "elasticOut"
          }).start();
          newTool == this.bottomPaint ? drag_1.default.letDrag = false : drag_1.default.letDrag = true;
        }
      };
      Monster.prototype.onPaintClick = function(event, customEventData) {
        this.graphics.strokeColor = new cc.Color().fromHEX(customEventData);
      };
      Monster.prototype.onCameraClick = function(event, customEventData) {
        var _this = this;
        this.cameraAnim.play();
        this.scheduleOnce(function() {
          _this.node.emit("nextProblem");
        }, 1);
      };
      Monster.prototype.onWallpaperClick = function(event, customEventData) {
        if (this[customEventData]) {
          var wp = cc.instantiate(this[customEventData]);
          this.wallpaper.removeAllChildren();
          this.wallpaper.addChild(wp);
        }
      };
      __decorate([ property(cc.Node) ], Monster.prototype, "background", void 0);
      __decorate([ property(cc.Node) ], Monster.prototype, "label", void 0);
      __decorate([ property(cc.Mask) ], Monster.prototype, "mask", void 0);
      __decorate([ property(cc.Node) ], Monster.prototype, "wallpaper", void 0);
      __decorate([ property(cc.Graphics) ], Monster.prototype, "graphics", void 0);
      __decorate([ property(cc.BoxCollider) ], Monster.prototype, "board", void 0);
      __decorate([ property(cc.Node) ], Monster.prototype, "bottomPaint", void 0);
      __decorate([ property(cc.Node) ], Monster.prototype, "bottomMouth", void 0);
      __decorate([ property(cc.Node) ], Monster.prototype, "bottomHat", void 0);
      __decorate([ property(cc.Node) ], Monster.prototype, "bottomEye", void 0);
      __decorate([ property(cc.Node) ], Monster.prototype, "bottomMark", void 0);
      __decorate([ property(cc.Node) ], Monster.prototype, "bottomHair", void 0);
      __decorate([ property(cc.Node) ], Monster.prototype, "bottomNose", void 0);
      __decorate([ property(cc.Node) ], Monster.prototype, "bottomWallpaper", void 0);
      __decorate([ property(cc.Prefab) ], Monster.prototype, "wallpaper1", void 0);
      __decorate([ property(cc.Prefab) ], Monster.prototype, "wallpaper2", void 0);
      __decorate([ property(cc.Prefab) ], Monster.prototype, "wallpaper3", void 0);
      __decorate([ property(cc.Prefab) ], Monster.prototype, "wallpaper4", void 0);
      __decorate([ property(cc.Prefab) ], Monster.prototype, "wallpaper5", void 0);
      __decorate([ property(cc.Prefab) ], Monster.prototype, "wallpaper6", void 0);
      __decorate([ property(cc.Prefab) ], Monster.prototype, "wallpaper7", void 0);
      __decorate([ property(cc.Button) ], Monster.prototype, "cameraButton", void 0);
      __decorate([ property(cc.Animation) ], Monster.prototype, "cameraAnim", void 0);
      Monster = __decorate([ ccclass ], Monster);
      return Monster;
    }(game_1.default);
    exports.default = Monster;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0
  } ]
}, {}, [ "monster", "monsterDrag" ]);