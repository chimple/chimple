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
  stampDrag: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a4573yt5RVGJ42Gc6ELNRzx", "stampDrag");
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
    var StampDrag = function(_super) {
      __extends(StampDrag, _super);
      function StampDrag() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.inStickerPack = true;
        _this.imageIndex = 0;
        return _this;
      }
      StampDrag.prototype.touchStartAnimation = function() {
        _super.prototype.touchStartAnimation.call(this);
        this.node.zIndex = 1;
        this.node.children[0].y = -15;
        this.node.x += 5;
      };
      StampDrag.prototype.touchEndAnimation = function() {
        _super.prototype.touchEndAnimation.call(this);
        this.node.children[0].y = -10;
        this.node.x -= 5;
        this.node.zIndex = 0;
      };
      StampDrag.prototype.onTouchStart = function(touch) {
        _super.prototype.onTouchStart.call(this, touch);
        if (this.allowDrag && this.inStickerPack) {
          this.inStickerPack = false;
          this.node.scale = 1;
          this.node.parent = this.node.parent.parent.parent;
        }
      };
      StampDrag.prototype.onTouchEnd = function(touch) {
        _super.prototype.onTouchEnd.call(this, touch);
        if (this.match) {
          this.node.children[0].active = false;
          this.node.emit("stampMatch", this, this.node);
        } else {
          var pic = this.node.children[1];
          var worldPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
          var newPos = this.node.getPosition();
          var doTween = false;
          if (worldPos.x + pic.width > cc.winSize.width) {
            newPos.x -= worldPos.x + pic.width - cc.winSize.width;
            doTween = true;
          } else if (worldPos.x < 0) {
            newPos.x -= worldPos.x;
            doTween = true;
          }
          if (worldPos.y + pic.height > cc.winSize.height) {
            newPos.y -= worldPos.y + pic.height - cc.winSize.height;
            doTween = true;
          } else if (worldPos.y < 0) {
            newPos.y -= worldPos.y;
            doTween = true;
          }
          doTween && new cc.Tween().target(this.node).to(.25, {
            position: newPos
          }, {
            progress: null,
            easing: "sineOut"
          }).start();
          var temp = this.node.parent.convertToWorldSpaceAR(touch.getLocation());
          this.node.position.x = temp.x;
          this.node.position.y = temp.y;
          console.log("this.node.position ", this.node.position);
          this.node.emit("stampNoMatch", this, this.node);
        }
      };
      StampDrag = __decorate([ ccclass ], StampDrag);
      return StampDrag;
    }(drag_1.default);
    exports.default = StampDrag;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0
  } ],
  stampDrop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8f35dUsgcdDCYTYNpIxYVMv", "stampDrop");
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
    var StampDrop = function(_super) {
      __extends(StampDrop, _super);
      function StampDrop() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      StampDrop = __decorate([ ccclass ], StampDrop);
      return StampDrop;
    }(drop_1.default);
    exports.default = StampDrop;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drop": void 0
  } ],
  stamp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e42a8U9jAVJ+aTaNF1tBayg", "stamp");
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
    var config_1 = require("../../../common/scripts/lib/config");
    var game_1 = require("../../../common/scripts/game");
    var stickerHolder_1 = require("./stickerHolder");
    var stampDrag_1 = require("./stampDrag");
    var profile_1 = require("../../../common/scripts/lib/profile");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Stamp = function(_super) {
      __extends(Stamp, _super);
      function Stamp() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.stampDrag = null;
        _this.stampDrop = null;
        _this.label = null;
        _this.stickerPrefab = null;
        _this.graphics = null;
        _this.bottomPaint = null;
        _this.stickerLayer = null;
        _this.mask = null;
        _this.camera = null;
        _this.numPieces = 0;
        _this.text = null;
        _this.audio = null;
        _this.stampReward = null;
        _this.drags = [];
        _this.isPainting = false;
        return _this;
      }
      Stamp.prototype.onLoad = function() {
        var _this = this;
        var config = config_1.default.getInstance();
        cc.director.getCollisionManager().enabled = true;
        this.graphics.node.on("touchstart", function() {});
        this.graphics.node.on("touchmove", this.onTouchMove, this);
        this.graphics.node.on("touchend", this.onTouchEnd, this);
        var _a = config.data[0], level = _a[0], worksheet = _a[1], problem = _a[2], name = _a[3], bgImage = _a[4], num = _a[5], fixed = _a[6], sound = _a[7];
        this.text = name;
        this.numPieces = parseInt(num);
        var itemName = this.getItemName(config);
        this.stampReward = JSON.parse(cc.sys.localStorage.getItem(itemName));
        null == this.stampReward && (this.stampReward = {
          done: false,
          stickers: [],
          drawStokes: []
        });
        this.toDrawSavedDrawing();
        util_1.Util.loadTexture(bgImage, function(texture) {
          null != texture && (_this.bg.spriteFrame = new cc.SpriteFrame(texture));
        });
        util_1.Util.loadGameSound(sound, function(audioClip) {
          _this.audio = audioClip;
        });
        var firstDrag = null;
        var firstDrop = null;
        var _loop_1 = function(index) {
          var image = config.data[0][8 + 4 * index];
          var x = config.data[0][9 + 4 * index];
          var y = config.data[0][10 + 4 * index];
          this_1.stampReward.stickers.length <= index && this_1.stampReward.stickers.push({
            id: image,
            fixed: false,
            peeled: false,
            x: 0,
            y: 0
          });
          var sticker = cc.instantiate(this_1.stickerPrefab);
          var stickerHolder = sticker.getComponent(stickerHolder_1.default);
          stickerHolder.bg = this_1.stickerLayer;
          this_1.stickerPack.addChild(sticker);
          var drag = cc.instantiate(this_1.stampDrag);
          drag.name = index.toString();
          console.log("drag.position", drag.position);
          drag.position = cc.Vec3.ZERO;
          console.log("drag.position", drag.position);
          stickerHolder.icon.addChild(drag);
          this_1.drags.push(drag);
          var rewardName = util_1.REWARD_TYPES[4] + "-" + config_1.default.i.chapter.id + "-" + config_1.default.i.lesson.id + "-" + image;
          stickerHolder.rewardArray = [ util_1.REWARD_TYPES[4], config_1.default.i.chapter.id, config_1.default.i.lesson.id, image ];
          util_1.Util.loadTexture(image, function(texture) {
            if (null != texture) {
              var spriteFrame = new cc.SpriteFrame(texture);
              var stickerHolderSprite = stickerHolder.icon.getComponent(cc.Sprite);
              stickerHolderSprite.spriteFrame = spriteFrame;
              util_1.Util.resizeSprite(stickerHolderSprite, 96, 96);
              var _a = util_1.Util.minScale(stickerHolderSprite, 96, 96), scale = _a.scale, size = _a.size;
              if (1 == profile_1.User.getCurrentUser().unlockedRewards[rewardName]) {
                stickerHolder.lock.active = false;
                var stickerButton = stickerHolder.icon.getComponent(cc.Button);
                stickerButton.interactable = false;
                config_1.default.i.direction === config_1.Direction.RTL && (drag.getComponent(drag_1.default).isReverseXNeeded = true);
                drag.on("stampMatch", function(th, drag) {
                  console.log("this.stampReward.stickers", _this.stampReward.stickers);
                  console.log("drag", drag);
                  _this.stampReward.stickers[drag.name].fixed = true;
                  _this.stampReward.stickers[drag.name].peeled = true;
                  _this.stampReward.stickers[drag.name].x = 0;
                  _this.stampReward.stickers[drag.name].y = 0;
                  console.log("this.stampReward.stickers", _this.stampReward.stickers);
                  _this.saveItem();
                });
                drag.on("stampNoMatch", function(th, drag) {
                  console.log("this.stampReward.stickers", _this.stampReward.stickers);
                  console.log("drag", drag);
                  _this.stampReward.stickers[drag.name].fixed = false;
                  _this.stampReward.stickers[drag.name].peeled = true;
                  _this.stampReward.stickers[drag.name].x = drag.x;
                  _this.stampReward.stickers[drag.name].y = drag.y;
                  console.log("this.stampReward.stickers", _this.stampReward.stickers);
                  _this.saveItem();
                });
                var stampNode = drag.children[1];
                stampNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                var shadowNode = drag.children[0];
                shadowNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                shadowNode.active = false;
                var dragComp = drag.getComponent(stampDrag_1.default);
                dragComp.imageIndex = index;
                if (_this.stampReward.stickers[index].fixed) {
                  drag.parent = _this.stickerLayer;
                  dragComp.allowDrag = false;
                  drag.position = new cc.Vec3(parseInt(x), parseInt(y));
                  shadowNode.active = false;
                  dragComp.inStickerPack = false;
                } else {
                  if (_this.stampReward.stickers[index].peeled) {
                    drag.position = new cc.Vec3(_this.stampReward.stickers[index].x, _this.stampReward.stickers[index].y, 0);
                    dragComp.inStickerPack = false;
                    drag.parent = drag.parent.parent.parent;
                    drag.height = spriteFrame.getOriginalSize().height;
                    drag.width = spriteFrame.getOriginalSize().width;
                  } else {
                    drag.scale = scale;
                    drag.position = new cc.Vec3(-stickerHolder.icon.width / 2, -stickerHolder.icon.height / 2, 0);
                    drag.height = spriteFrame.getOriginalSize().height;
                    drag.width = spriteFrame.getOriginalSize().width;
                  }
                  drag.getComponent(drag_1.default).allowDrag = true;
                }
                var drop = cc.instantiate(_this.stampDrop);
                drop.name = index.toString();
                drop.position = new cc.Vec3(parseInt(x), parseInt(y));
                drop.height = drag.height;
                drop.width = drag.width;
                _this.stickerLayer.addChild(drop);
                if (1 == index) {
                  firstDrag = drag;
                  firstDrop = drop;
                }
              }
            }
          });
          console.log("this.stampReward in onload before change", this_1.stampReward);
        };
        var this_1 = this;
        for (var index = 0; index < this.numPieces; index++) _loop_1(index);
      };
      Stamp.prototype.getItemName = function(config) {
        return profile_1.User.getCurrentUser().id + "_" + config.course.id + "_" + config.chapter.id + "_" + config.lesson.id + "_" + config.problem;
      };
      Stamp.prototype.saveItem = function() {
        cc.sys.localStorage.setItem(this.getItemName(config_1.default.i), JSON.stringify(this.stampReward));
        console.log("this.stampReward in saveItem", this.stampReward);
      };
      Stamp.prototype.onPaintClick = function(event, customEventData) {
        this.graphics.strokeColor = new cc.Color().fromHEX(customEventData);
        this.isPainting = true;
        drag_1.default.letDrag = false;
        this.currentColor = customEventData;
      };
      Stamp.prototype.onTouchMove = function(touch) {
        if (this.isPainting) {
          var from = this.graphics.node.convertToNodeSpaceAR(touch.getPreviousLocation());
          var to = this.graphics.node.convertToNodeSpaceAR(touch.getLocation());
          this.graphics.moveTo(from.x, from.y);
          this.graphics.lineTo(to.x, to.y);
          this.graphics.stroke();
          this.stampReward.drawStokes.push([ this.currentColor, from.x, from.y, to.x, to.y ]);
        }
      };
      Stamp.prototype.onTouchEnd = function(touch) {
        if (this.isPainting) {
          this.isPainting = false;
          drag_1.default.letDrag = true;
          this.saveItem();
        }
      };
      Stamp.prototype.onToolClick = function(event, customEventData) {
        if (this.isPainting) {
          this.isPainting = false;
          drag_1.default.letDrag = true;
          this.bottomPaint.active = false;
        } else {
          this.isPainting = true;
          drag_1.default.letDrag = false;
          this.bottomPaint.active = true;
        }
      };
      Stamp.prototype.toDrawSavedDrawing = function() {
        console.log("const drawstrokes", this.stampReward);
        void 0 == this.stampReward.drawStokes && (this.stampReward.drawStokes = []);
        var drawstrokes = this.stampReward.drawStokes;
        for (var i = 0; i < drawstrokes.length; i++) {
          this.graphics.strokeColor = new cc.Color().fromHEX(drawstrokes[i][0]);
          this.graphics.moveTo(drawstrokes[i][1], drawstrokes[i][2]);
          this.graphics.lineTo(drawstrokes[i][3], drawstrokes[i][4]);
          this.graphics.stroke();
        }
      };
      Stamp.prototype.capturingScreenshot = function() {
        var _this = this;
        console.log("screenshot method called");
        var texture = new cc.RenderTexture();
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, cc.Texture2D.PixelFormat.RGBA8888);
        this.camera.getComponent(cc.Camera).targetTexture = texture;
        this.texture = texture;
        this.schedule(function() {
          var picData = _this.initImage();
          _this.createCanvas(picData);
          _this.saveFile(picData);
        }, 1, 0);
      };
      Stamp.prototype.initImage = function() {
        var data = this.texture.readPixels();
        this._width = this.texture.width;
        this._height = this.texture.height;
        var picData = this.filpYImage(data, this._width, this._height);
        return picData;
      };
      Stamp.prototype.filpYImage = function(data, width, height) {
        var picData = new Uint8Array(width * height * 4);
        var rowBytes = 4 * width;
        for (var row = 0; row < height; row++) {
          var srow = height - 1 - row;
          var start = srow * width * 4;
          var reStart = row * width * 4;
          for (var i = 0; i < rowBytes; i++) picData[reStart + i] = data[start + i];
        }
        return picData;
      };
      Stamp.prototype.createCanvas = function(picData) {
        var texture = new cc.Texture2D();
        texture.initWithData(picData, 32, this._width, this._height);
        var spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);
        var node = new cc.Node();
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;
        node.zIndex = cc.macro.MAX_ZINDEX;
        node.parent = cc.director.getScene();
        var width = cc.winSize.width;
        var height = cc.winSize.height;
        node.x = width / 2;
        node.y = height / 2;
        node.on(cc.Node.EventType.TOUCH_START, function() {
          node.parent = null;
          node.destroy();
        });
        this.captureAction(node, width, height);
      };
      Stamp.prototype.captureAction = function(capture, width, height) {
        var scaleAction = cc.scaleTo(1, .3);
        var targetPos = cc.v2(width - width / 6, height / 4);
        var moveAction = cc.moveTo(1, targetPos);
        var spawn = cc.spawn(scaleAction, moveAction);
        capture.runAction(spawn);
        var blinkAction = cc.blink(.1, 1);
        this.node.runAction(blinkAction);
      };
      Stamp.prototype.saveFile = function(picData) {
        cc.log("saveFile() called");
        true;
        cc.log("saveFile() Entered if(CC_JSB)");
        var filePath = jsb.fileUtils.getWritablePath() + "render_to_sprite_image.png";
        var success = jsb.saveImageData(picData, this._width, this._height, filePath);
        cc.log("saveFile() success", success);
        success ? cc.log("save image data success, file: " + filePath) : cc.error("save image data failed!");
      };
      __decorate([ property(cc.Prefab) ], Stamp.prototype, "stampDrag", void 0);
      __decorate([ property(cc.Prefab) ], Stamp.prototype, "stampDrop", void 0);
      __decorate([ property(cc.Sprite) ], Stamp.prototype, "bg", void 0);
      __decorate([ property(cc.Node) ], Stamp.prototype, "label", void 0);
      __decorate([ property(cc.Prefab) ], Stamp.prototype, "stickerPrefab", void 0);
      __decorate([ property(cc.Node) ], Stamp.prototype, "stickerPack", void 0);
      __decorate([ property(cc.Graphics) ], Stamp.prototype, "graphics", void 0);
      __decorate([ property(cc.Node) ], Stamp.prototype, "bottomPaint", void 0);
      __decorate([ property(cc.Node) ], Stamp.prototype, "stickerLayer", void 0);
      __decorate([ property(cc.Node) ], Stamp.prototype, "mask", void 0);
      __decorate([ property(cc.Node) ], Stamp.prototype, "camera", void 0);
      Stamp = __decorate([ ccclass ], Stamp);
      return Stamp;
    }(game_1.default);
    exports.default = Stamp;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/util": void 0,
    "./stampDrag": "stampDrag",
    "./stickerHolder": "stickerHolder"
  } ],
  stickerHolder: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b32b0MVudVFoKPoIC3ME9Cg", "stickerHolder");
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
    var profile_1 = require("../../../common/scripts/lib/profile");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StickerHolder = function(_super) {
      __extends(StickerHolder, _super);
      function StickerHolder() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.icon = null;
        _this.bg = null;
        _this.lock = null;
        return _this;
      }
      StickerHolder.prototype.start = function() {};
      StickerHolder.prototype.onClick = function(event, customEventData) {
        this.icon.getComponent(cc.Button).interactable = false;
        profile_1.User.getCurrentUser().currentReward = this.rewardArray;
        config_1.default.i.popAllScenes();
        config_1.default.i.pushScene("menu/start/scenes/start", "menu", null, true);
      };
      __decorate([ property(cc.Node) ], StickerHolder.prototype, "icon", void 0);
      __decorate([ property(cc.Node) ], StickerHolder.prototype, "bg", void 0);
      __decorate([ property(cc.Node) ], StickerHolder.prototype, "lock", void 0);
      StickerHolder = __decorate([ ccclass ], StickerHolder);
      return StickerHolder;
    }(cc.Component);
    exports.default = StickerHolder;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/profile": void 0
  } ]
}, {}, [ "stamp", "stampDrag", "stampDrop", "stickerHolder" ]);