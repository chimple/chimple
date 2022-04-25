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
  stickerbookDrag: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2bf1fIkVwpDHpexVlwdEv4p", "stickerbookDrag");
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
    var stickerbook_1 = require("./stickerbook");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StickerBookDrag = function(_super) {
      __extends(StickerBookDrag, _super);
      function StickerBookDrag() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      StickerBookDrag.prototype.touchStartAnimation = function() {
        _super.prototype.touchStartAnimation.call(this);
        this.node.zIndex = 1;
        this.node.children[0].y = -15;
        this.node.x += 5;
      };
      StickerBookDrag.prototype.touchEndAnimation = function() {
        _super.prototype.touchEndAnimation.call(this);
        this.node.children[0].y = -10;
        this.node.x -= 5;
        this.node.zIndex = 0;
      };
      StickerBookDrag.prototype.onTouchStart = function(touch) {
        _super.prototype.onTouchStart.call(this, touch);
        this.node.children[1].active = true;
      };
      StickerBookDrag.prototype.onTouchEnd = function(touch) {
        _super.prototype.onTouchEnd.call(this, touch, false);
        if (this.match) {
          this.node.children[0].active = false;
          this.node.emit("stickericonMatch", this);
          stickerbook_1.default.data[13 + 7 * parseInt(this.node.name)] = "true";
          cc.sys.localStorage.setItem("stickerbook", JSON.stringify(stickerbook_1.default.stickerbookDataJson));
        } else {
          var index = parseInt(this.node.name);
          var correctPositionX = parseInt(stickerbook_1.default.data[8 + 7 * index]) || null;
          var correctPositionY = parseInt(stickerbook_1.default.data[9 + 7 * index]) || null;
          if (null != correctPositionX && null != correctPositionY) {
            new cc.Tween().target(this.node).to(.25, {
              x: this.node.getParent().getParent().getParent().convertToWorldSpace(stickerbook_1.default.stickerIconPostion[parseInt(this.node.name)]).x + 6 - .1065088757397,
              y: this.node.getParent().getParent().getParent().convertToWorldSpace(stickerbook_1.default.stickerIconPostion[parseInt(this.node.name)]).y + 60
            }, {
              progress: null,
              easing: "sineOut"
            }).start();
            this.node.children[1].setContentSize(130, 130);
            this.node.emit("stickericonNoMatch");
          }
          this.node.children[1].active = true;
          if (null == correctPositionX && null == correctPositionY) {
            stickerbook_1.default.data[10 + 7 * index] = this.node.getParent().getParent().getParent().convertToWorldSpace(touch.getLocation()).x;
            stickerbook_1.default.data[11 + 7 * index] = this.node.getParent().getParent().getParent().convertToWorldSpace(touch.getLocation()).y;
            stickerbook_1.default.data[13 + 7 * parseInt(this.node.name)] = "true";
            stickerbook_1.default.numPieces--;
            cc.sys.localStorage.setItem("stickerbook", JSON.stringify(stickerbook_1.default.stickerbookDataJson));
            this.node.emit("stickericonMatch", this);
          }
        }
      };
      StickerBookDrag = __decorate([ ccclass ], StickerBookDrag);
      return StickerBookDrag;
    }(drag_1.default);
    exports.default = StickerBookDrag;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "./stickerbook": "stickerbook"
  } ],
  stickerbookDrop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "75467Xr5tpBD75jBab+Y4Bg", "stickerbookDrop");
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
    var StickerBookDrop = function(_super) {
      __extends(StickerBookDrop, _super);
      function StickerBookDrop() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      StickerBookDrop = __decorate([ ccclass ], StickerBookDrop);
      return StickerBookDrop;
    }(drop_1.default);
    exports.default = StickerBookDrop;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drop": void 0
  } ],
  stickerbook: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0e3aahGQltEz5z4nYpOgdjl", "stickerbook");
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
    var util_1 = require("../../../common/scripts/util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StickerBook = function(_super) {
      __extends(StickerBook, _super);
      function StickerBook() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.bg = null;
        _this.mask = null;
        _this.graphics = null;
        _this.bottomPaint = null;
        _this.stickerDrag = null;
        _this.stickerDrop = null;
        _this.stickerPrefab = null;
        _this.stickerIconScrollView = null;
        _this.camera = null;
        _this.paintTool = null;
        _this.numStickers = -50;
        _this.text = null;
        _this.audio = null;
        return _this;
      }
      StickerBook_1 = StickerBook;
      StickerBook.prototype.onLoad = function() {
        var _this = this;
        console.log("stickerbook Game playing");
        this.loadStickerBookData();
        cc.director.getCollisionManager().enabled = true;
        this.toDrawSaveddrawing();
        this.node.on("touchmove", this.onTouchMove, this);
        var _a = StickerBook_1.data, level = _a[0], worksheet = _a[1], problem = _a[2], name = _a[3], bgImage = _a[4], num = _a[5], sound = _a[6];
        this.text = name;
        StickerBook_1.numPieces = parseInt(num);
        util_1.Util.loadTexture(bgImage, function(texture) {
          if (null != texture) {
            _this.bg.spriteFrame = new cc.SpriteFrame(texture);
            _this.mask.spriteFrame = new cc.SpriteFrame(texture);
            _this.bg.node.position = new cc.Vec3(-_this.bg.node.width / 2, -_this.bg.node.height / 2);
            _this.mask.node.position = new cc.Vec3(_this.bg.node.width / 2, _this.bg.node.height / 2);
            _this.mask.node.setContentSize(_this.bg.node.width, _this.bg.node.height);
          }
        });
        util_1.Util.loadGameSound(sound, function(audioClip) {
          _this.audio = audioClip;
        });
        var _loop_1 = function(index) {
          var image = StickerBook_1.data[7 + 7 * index];
          var correctPositionX = parseInt(StickerBook_1.data[8 + 7 * index]) || null;
          var correctPositionY = parseInt(StickerBook_1.data[9 + 7 * index]) || null;
          var randomPostionX = parseInt(StickerBook_1.data[10 + 7 * index]) || null;
          var randomPositionY = parseInt(StickerBook_1.data[11 + 7 * index]) || null;
          var isUnlock = "true" == StickerBook_1.data[12 + 7 * index];
          var isFinished = "true" == StickerBook_1.data[13 + 7 * index];
          var sticker = cc.instantiate(this_1.stickerPrefab);
          if (isFinished) {
            if (isFinished) {
              var drag_3 = cc.instantiate(this_1.stickerDrag);
              drag_3.name = index.toString();
              var pictureNode_1 = drag_3.children[1];
              util_1.Util.loadTexture(image, function(texture) {
                var spriteFrame = new cc.SpriteFrame(texture);
                _this.node.getChildByName("stickericon").addChild(sticker);
                sticker.name = index.toString();
                sticker.getChildByName("photo").getChildByName("mask").getChildByName("picture").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                sticker.getChildByName("photo").getChildByName("mask").getChildByName("picture").setContentSize(130, 130);
                sticker.position = StickerBook_1.stickerIconPostion[index];
                pictureNode_1.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                var shadowNode = drag_3.children[0];
                shadowNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                shadowNode.active = false;
                drag_3.height = pictureNode_1.height;
                drag_3.width = pictureNode_1.width;
                drag_3.position = null == correctPositionX && null == correctPositionY ? new cc.Vec3(randomPostionX, randomPositionY) : new cc.Vec3(correctPositionX, correctPositionY);
                drag_3.getComponent(drag_1.default).allowDrag = false;
                _this.node.getChildByName("New Node").getChildByName("bg").addChild(drag_3);
                StickerBook_1.numPieces--;
              });
            }
          } else {
            firstDrag = null;
            firstDrop = null;
            util_1.Util.loadGameSound(sound, function(audioClip) {
              _this.audio = audioClip;
            });
            var bg_1 = this_1.node.getChildByName("New Node").getChildByName("bg");
            var drag_2 = cc.instantiate(this_1.stickerDrag);
            drag_2.name = index.toString();
            drag_2.on("stickericonMatch", this_1.onMatch.bind(this_1));
            drag_2.on("stickericonNoMatch", function() {
              console.log("this.node.emit wrong");
            });
            bg_1.addChild(drag_2);
            util_1.Util.loadTexture(image, function(texture) {
              if (null != texture && !isFinished) {
                _this.node.getChildByName("stickericon").addChild(sticker);
                sticker.name = index.toString();
                var spriteFrame = new cc.SpriteFrame(texture);
                sticker.getChildByName("photo").getChildByName("mask").getChildByName("picture").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                sticker.getChildByName("photo").getChildByName("mask").getChildByName("picture").setContentSize(130, 130);
                sticker.position = StickerBook_1.stickerIconPostion[index];
                if (isUnlock) {
                  var pictureNode = drag_2.children[1];
                  pictureNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                  pictureNode.active = true;
                  StickerBook_1.pictureSizes.set(index.toString(), cc.size(pictureNode.getContentSize().width, pictureNode.getContentSize().height));
                  pictureNode.setContentSize(130, 130);
                  var shadowNode = drag_2.children[0];
                  shadowNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                  shadowNode.active = false;
                  drag_2.height = pictureNode.height;
                  drag_2.width = pictureNode.width;
                  drag_2.x = _this.node.convertToWorldSpace(StickerBook_1.stickerIconPostion[index]).x + 6 - .1065088757397;
                  drag_2.y = _this.node.convertToWorldSpace(StickerBook_1.stickerIconPostion[index]).y + 60;
                  drag_2.getComponent(drag_1.default).allowDrag = true;
                  if (index + 1 == StickerBook_1.data.length) {
                    drag_1.default.letDrag = true;
                    util_1.Util.showHelp(firstDrag, firstDrop);
                  }
                  var drop = cc.instantiate(_this.stickerDrop);
                  drop.name = index.toString();
                  drop.position = new cc.Vec3(correctPositionX, correctPositionY);
                  drop.height = drag_2.height;
                  drop.width = drag_2.width;
                  bg_1.addChild(drop);
                  if (1 == index) {
                    firstDrag = drag_2;
                    firstDrop = drop;
                  }
                } else {
                  sticker.getChildByName("lock").active = !isUnlock;
                  _this.node.getChildByName("right").active = isUnlock;
                }
              }
            });
          }
        };
        var this_1 = this, firstDrag, firstDrop;
        for (var index = 0; index < StickerBook_1.numPieces; index++) _loop_1(index);
      };
      StickerBook.prototype.onMatch = function() {
        var _this = this;
        this.node.emit("correct");
        console.log("Answer Correct", StickerBook_1.numPieces);
        if (--StickerBook_1.numPieces <= 0) {
          console.log("Entered onMatch if", StickerBook_1.numPieces);
          StickerBook_1.stickerbookDataJson.currentStickerBookLevel++;
          StickerBook_1.stickerbookDataJson.currentStickerBookLevel >= config_1.default.getInstance().totalProblems && (StickerBook_1.stickerbookDataJson.currentStickerBookLevel = 0);
          cc.sys.localStorage.setItem("stickerbook", JSON.stringify(StickerBook_1.stickerbookDataJson));
          drag_1.default.letDrag = false;
          this.scheduleOnce(function() {
            util_1.Util.speakClip(_this.audio, function() {
              _this.node.emit("nextProblem");
              console.log("nextProblem emited");
            });
          }, 1);
        }
      };
      StickerBook.prototype.onToolClick = function(event, customEventData) {
        var paintTool = this[customEventData];
        if (null != paintTool && this.paintTool == paintTool) {
          this.paintTool.active = false;
          this.paintTool = null;
          paintTool = null;
          drag_1.default.letDrag = true;
          this.node.getChildByName("clear").active = false;
          cc.sys.localStorage.setItem("stickerbook", JSON.stringify(StickerBook_1.stickerbookDataJson));
          console.log("After StickerBook.stickerbookData.paintData ", StickerBook_1.stickerbookDataJson.paintData);
        }
        if (null != paintTool) {
          this.paintTool = paintTool;
          paintTool.active = true;
          this.node.getChildByName("clear").active = true;
          var y = paintTool.y;
          new cc.Tween().target(paintTool).set({
            y: -cc.winSize.height / 2
          }).to(.25, {
            y: y
          }, {
            progress: null,
            easing: "elasticOut"
          }).start();
          paintTool == this.bottomPaint ? drag_1.default.letDrag = false : drag_1.default.letDrag = true;
        }
      };
      StickerBook.prototype.onPaintClick = function(event, customEventData) {
        this.graphics.strokeColor = new cc.Color().fromHEX(customEventData);
        this.currentColor = customEventData;
      };
      StickerBook.prototype.capturingScreenshot = function() {
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
      StickerBook.prototype.initImage = function() {
        var data = this.texture.readPixels();
        this._width = this.texture.width;
        this._height = this.texture.height;
        var picData = this.filpYImage(data, this._width, this._height);
        return picData;
      };
      StickerBook.prototype.filpYImage = function(data, width, height) {
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
      StickerBook.prototype.createCanvas = function(picData) {
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
      StickerBook.prototype.captureAction = function(capture, width, height) {
        var scaleAction = cc.scaleTo(1, .3);
        var targetPos = cc.v2(width - width / 6, height / 4);
        var moveAction = cc.moveTo(1, targetPos);
        var spawn = cc.spawn(scaleAction, moveAction);
        capture.runAction(spawn);
        var blinkAction = cc.blink(.1, 1);
        this.node.runAction(blinkAction);
      };
      StickerBook.prototype.saveFile = function(picData) {
        true;
        var filePath = jsb.fileUtils.getWritablePath() + "render_to_sprite_image.png";
        var success = jsb.saveImageData(picData, this._width, this._height, filePath);
        success ? cc.log("save image data success, file: " + filePath) : cc.error("save image data failed!");
      };
      StickerBook.prototype.onTouchMove = function(touch) {
        if (this.paintTool == this.bottomPaint) {
          var from = this.label.convertToNodeSpaceAR(touch.getPreviousLocation());
          var to = this.label.convertToNodeSpaceAR(touch.getLocation());
          this.graphics.moveTo(from.x, from.y);
          this.graphics.lineTo(to.x, to.y);
          this.graphics.stroke();
          StickerBook_1.stickerbookDataJson.paintData[StickerBook_1.stickerbookDataJson.currentStickerBookLevel].push([ this.currentColor, from.x, from.y, to.x, to.y ]);
        }
      };
      StickerBook.prototype.toDrawSaveddrawing = function() {
        console.log("drawStokes() called");
        var paintData = StickerBook_1.stickerbookDataJson.paintData[StickerBook_1.stickerbookDataJson.currentStickerBookLevel];
        for (var i = 0; i < paintData.length; i++) {
          this.graphics.strokeColor = new cc.Color().fromHEX(paintData[i][0]);
          this.graphics.moveTo(paintData[i][1], paintData[i][2]);
          this.graphics.lineTo(paintData[i][3], paintData[i][4]);
          this.graphics.stroke();
        }
      };
      StickerBook.prototype.clearDrawing = function() {
        void 0 != this.graphics && this.graphics.clear();
      };
      StickerBook.prototype.loadStickerBookData = function() {
        if (null == cc.sys.localStorage.getItem("stickerbook")) {
          var stickerBookJson = {
            currentStickerBookLevel: 0,
            data: [ [ "stickerbook", "1", "Description", "Cacti and Camels", "ap_puzzle10_background.jpg", "5", "cacti_and_camels.mp3", "ap_puzzle10_bush1_puzzle.png", "8", "101", "810", "0", "true", "false", "ap_puzzle10_bush2_puzzle.png", "118", "229", "1000", "0", "true", "false", "ap_puzzle10_bush3_puzzle.png", "566", "10", "800", "100", "true", "false", "ap_puzzle10_camel1_puzzle.png", "183", "55", "980", "310", "true", "false", "ap_puzzle10_camel2_puzzle.png", "411", "97", "890", "65", "true", "false" ], [ "stickerbook", "1", "Description", "Cacti and Camels", "ap_puzzle10_background.jpg", "9", "cacti_and_camels.mp3", "ap_puzzle10_bush1_puzzle.png", "8", "101", "810", "0", "false", "false", "ap_puzzle10_bush2_puzzle.png", "118", "229", "1000", "0", "true", "true", "ap_puzzle10_bush3_puzzle.png", "566", "10", "800", "100", "true", "false", "ap_puzzle10_camel1_puzzle.png", "183", "55", "980", "310", "false", "false", "ap_puzzle10_camel2_puzzle.png", "411", "97", "890", "65", "true", "true" ] ],
            paintData: {}
          };
          cc.sys.localStorage.setItem("stickerbook", JSON.stringify(stickerBookJson));
        }
        StickerBook_1.stickerbookDataJson = JSON.parse(cc.sys.localStorage.getItem("stickerbook") || "{}");
        console.log("stickerbook Data ", StickerBook_1.stickerbookDataJson);
        StickerBook_1.pictureSizes.size > 0 && StickerBook_1.pictureSizes.clear();
        StickerBook_1.data = StickerBook_1.stickerbookDataJson.data[StickerBook_1.stickerbookDataJson.currentStickerBookLevel];
        void 0 == StickerBook_1.stickerbookDataJson.paintData[StickerBook_1.stickerbookDataJson.currentStickerBookLevel] && (StickerBook_1.stickerbookDataJson.paintData[StickerBook_1.stickerbookDataJson.currentStickerBookLevel] = []);
        console.log("this.paintDataJson", StickerBook_1.stickerbookDataJson.paintData[StickerBook_1.stickerbookDataJson.currentStickerBookLevel]);
      };
      var StickerBook_1;
      StickerBook.numPieces = 0;
      StickerBook.pictureSizes = new Map();
      StickerBook.stickerIconPostion = [ new cc.Vec2(500, 250), new cc.Vec2(680, 250), new cc.Vec2(500, 75), new cc.Vec2(680, 75), new cc.Vec2(500, -100), new cc.Vec2(680, -100) ];
      StickerBook.stickerPostion = [ new cc.Vec2(800, 320), new cc.Vec2(1035, 345), new cc.Vec2(800, 150), new cc.Vec2(1053, 150), new cc.Vec2(750, -150), new cc.Vec2(910, -100) ];
      __decorate([ property(cc.Node) ], StickerBook.prototype, "label", void 0);
      __decorate([ property(cc.Sprite) ], StickerBook.prototype, "bg", void 0);
      __decorate([ property(cc.Mask) ], StickerBook.prototype, "mask", void 0);
      __decorate([ property(cc.Graphics) ], StickerBook.prototype, "graphics", void 0);
      __decorate([ property(cc.Node) ], StickerBook.prototype, "bottomPaint", void 0);
      __decorate([ property(cc.Prefab) ], StickerBook.prototype, "stickerDrag", void 0);
      __decorate([ property(cc.Prefab) ], StickerBook.prototype, "stickerDrop", void 0);
      __decorate([ property(cc.Prefab) ], StickerBook.prototype, "stickerPrefab", void 0);
      __decorate([ property(cc.Node) ], StickerBook.prototype, "stickerIconScrollView", void 0);
      __decorate([ property(cc.Node) ], StickerBook.prototype, "camera", void 0);
      StickerBook = StickerBook_1 = __decorate([ ccclass ], StickerBook);
      return StickerBook;
    }(game_1.default);
    exports.default = StickerBook;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/util": void 0
  } ],
  stickericon: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8c2a6mxlN5F4KVwLMXfGK3T", "stickericon");
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
    var util_1 = require("../../../common/scripts/util");
    var stickerbook_1 = require("./stickerbook");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StickerIcon = function(_super) {
      __extends(StickerIcon, _super);
      function StickerIcon() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.stickerDrag = null;
        _this.stickerDrop = null;
        _this.audio = null;
        _this.bg = null;
        _this.stickerBook = null;
        _this.bool = true;
        return _this;
      }
      StickerIcon.prototype.onLoad = function() {
        this.node.on("touchmove", this.onTouchMove, this);
      };
      StickerIcon.prototype.onstickerIconClick = function(touch) {
        var _this = this;
        console.log("onstickerIconClick called");
        var _a = stickerbook_1.default.data, level = _a[0], worksheet = _a[1], problem = _a[2], name = _a[3], bgImage = _a[4], num = _a[5], sound = _a[6];
        var index = parseInt(this.node.name);
        console.log("index", index);
        var image = stickerbook_1.default.data[7 + 7 * index];
        var correctPositionX = stickerbook_1.default.data[8 + 7 * index];
        var correctPositionY = stickerbook_1.default.data[9 + 7 * index];
        var randomPostionX = stickerbook_1.default.data[10 + 7 * index];
        var randomPositionY = stickerbook_1.default.data[11 + 7 * index];
        var isUnlock = "true" == stickerbook_1.default.data[12 + 7 * index];
        var isFinished = "true" == stickerbook_1.default.data[13 + 7 * index];
        console.log("isUnlock ", isUnlock, " isFinished ", isFinished);
        if (!isFinished) {
          var firstDrag = null;
          var firstDrop = null;
          util_1.Util.loadGameSound(sound, function(audioClip) {
            _this.audio = audioClip;
          });
          this.stickerBook = this.node.getParent().getParent().getParent().getParent().getParent();
          console.log("this.stickerBook", this.stickerBook.name);
          this.bg = this.stickerBook.getChildByName("New Node").getChildByName("bg");
          console.log("bg node", this.bg.name);
          var drag_2 = cc.instantiate(this.stickerDrag);
          drag_2.name = index.toString();
          drag_2.on("stickericonMatch", this.onMatch.bind(this));
          drag_2.on("stickericonNoMatch", function() {
            console.log("this.node.emit wrong");
          });
          console.log("is drag null", drag_2);
          this.bg.addChild(drag_2);
          util_1.Util.loadTexture(image, function(texture) {
            if (null != texture && !isFinished) {
              var pictureNode = drag_2.children[1];
              var spriteFrame = new cc.SpriteFrame(texture);
              console.log("pictureNode.getChildByName(photo).getChildByName(mask)", pictureNode.children[1]);
              pictureNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
              var shadowNode = drag_2.children[0];
              console.log("pictureNode.getChildByName(photo).getChildByName(mask)", pictureNode.children[0]);
              shadowNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
              shadowNode.active = false;
              drag_2.height = pictureNode.height;
              drag_2.width = pictureNode.width;
              console.log("randomPositionX, randomPositionY", randomPostionX, randomPositionY);
              var to = _this.bg.convertToNodeSpaceAR(touch.getLocation());
              console.log("touchmove touch", to.x, to.y);
              drag_2.x = to.x;
              drag_2.y = to.y;
              drag_2.getComponent(drag_1.default).allowDrag = true;
              if (index + 1 == stickerbook_1.default.data.length) {
                drag_1.default.letDrag = true;
                util_1.Util.showHelp(firstDrag, firstDrop);
              }
              var drop = cc.instantiate(_this.stickerDrop);
              drop.name = index.toString();
              console.log("correctPositionX, correctPositionY", correctPositionX, correctPositionY);
              drop.position = new cc.Vec3(parseInt(correctPositionX), parseInt(correctPositionY));
              drop.height = drag_2.height;
              drop.width = drag_2.width;
              _this.bg.addChild(drop);
              _this.node.getChildByName("photo").getComponent(cc.Sprite).setMaterial(0, _this.grayMaterial);
              _this.node.getChildByName("photo").getChildByName("mask").getChildByName("picture").getComponent(cc.Sprite).setMaterial(0, _this.grayMaterial);
              if (1 == index) {
                firstDrag = drag_2;
                firstDrop = drop;
              }
            }
          });
        }
      };
      StickerIcon.prototype.onTouchMove = function(touch) {
        console.log("stickericon ontouchmove called");
        if (this.bool) {
          console.log("stickericon ontouchmove if called");
          this.onstickerIconClick(touch);
          this.bool = false;
        }
      };
      StickerIcon.prototype.onMatch = function() {
        var _this = this;
        this.stickerBook.emit("correct");
        console.log("Answer Correct", stickerbook_1.default.numPieces);
        console.log("Answer Correct this.node.name", this.node.name);
        stickerbook_1.default.data[13 + 7 * parseInt(this.node.name)] = "true";
        if (--stickerbook_1.default.numPieces <= 0) {
          console.log("Entered onMatch if", stickerbook_1.default.numPieces);
          stickerbook_1.default.stickerbookDataJson.currentStickerBookLevel++;
          stickerbook_1.default.stickerbookDataJson.currentStickerBookLevel >= config_1.default.getInstance().totalProblems && (stickerbook_1.default.stickerbookDataJson.currentStickerBookLevel = 0);
          cc.sys.localStorage.setItem("stickerbook", JSON.stringify(stickerbook_1.default.stickerbookDataJson));
          drag_1.default.letDrag = false;
          this.scheduleOnce(function() {
            util_1.Util.speakClip(_this.audio, function() {
              _this.stickerBook.emit("nextProblem");
              console.log("nextProblem emited");
            });
          }, 1);
        }
      };
      __decorate([ property(cc.Prefab) ], StickerIcon.prototype, "stickerDrag", void 0);
      __decorate([ property(cc.Prefab) ], StickerIcon.prototype, "stickerDrop", void 0);
      __decorate([ property(cc.Material) ], StickerIcon.prototype, "grayMaterial", void 0);
      StickerIcon = __decorate([ ccclass ], StickerIcon);
      return StickerIcon;
    }(cc.Component);
    exports.default = StickerIcon;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/util": void 0,
    "./stickerbook": "stickerbook"
  } ]
}, {}, [ "stickerbook", "stickerbookDrag", "stickerbookDrop", "stickericon" ]);