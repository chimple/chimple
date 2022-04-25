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
  pictureDrag: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a00fesqYxJBhYtbcmvTKakU", "pictureDrag");
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
    var PictureDrag = function(_super) {
      __extends(PictureDrag, _super);
      function PictureDrag() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      PictureDrag.prototype.touchStartAnimation = function() {
        _super.prototype.touchStartAnimation.call(this);
        this.node.zIndex = 1;
        this.node.children[0].y = -15;
        this.node.x += 5;
      };
      PictureDrag.prototype.touchEndAnimation = function() {
        _super.prototype.touchEndAnimation.call(this);
        this.node.children[0].y = -10;
        this.node.x -= 5;
        this.node.zIndex = 0;
      };
      PictureDrag.prototype.onTouchEnd = function(touch) {
        _super.prototype.onTouchEnd.call(this, touch);
        if (this.match) {
          this.node.children[0].active = false;
          this.node.emit("pictureMatch", this);
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
          this.node.emit("pictureNoMatch", this);
        }
      };
      PictureDrag = __decorate([ ccclass ], PictureDrag);
      return PictureDrag;
    }(drag_1.default);
    exports.default = PictureDrag;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0
  } ],
  pictureDrop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3db01KzXg9KFaQNUFIwPDP9", "pictureDrop");
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
    var PictureDrop = function(_super) {
      __extends(PictureDrop, _super);
      function PictureDrop() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      PictureDrop = __decorate([ ccclass ], PictureDrop);
      return PictureDrop;
    }(drop_1.default);
    exports.default = PictureDrop;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drop": void 0
  } ],
  pictureboard: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c2044giomlA94nwjPf3kUlG", "pictureboard");
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var bgHeight = 432;
    var bgWidth = 802;
    var PictureBoard = function(_super) {
      __extends(PictureBoard, _super);
      function PictureBoard() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.pictureDrag = null;
        _this.pictureDrop = null;
        _this.truck = null;
        _this.label = null;
        _this.truckInAudio = null;
        _this.truckOutAudio = null;
        _this.numPieces = 0;
        _this.text = null;
        _this.audio = null;
        return _this;
      }
      PictureBoard.prototype.onLoad = function() {
        var _this = this;
        var config = config_1.default.getInstance();
        cc.director.getCollisionManager().enabled = true;
        drag_1.default.letDrag = false;
        var _a = config.data[0], level = _a[0], worksheet = _a[1], problem = _a[2], name = _a[3], bgImage = _a[4], num = _a[5], y1 = _a[6], sound = _a[7];
        this.text = name;
        this.numPieces = parseInt(num);
        util_1.Util.loadTexture(bgImage, function(texture) {
          if (null != texture) {
            _this.bg.spriteFrame = new cc.SpriteFrame(texture);
            _this.bg.node.position = new cc.Vec2(_this.bg.node.x - _this.bg.node.width / 2, _this.bg.node.y - _this.bg.node.height);
          }
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
          var drag = cc.instantiate(this_1.pictureDrag);
          drag.name = index.toString();
          drag.position = new cc.Vec2(parseInt(x) / 3, parseInt(y) / 3);
          config_1.default.i.direction === config_1.Direction.RTL && (drag.getComponent(drag_1.default).isReverseXNeeded = true);
          drag.on("pictureMatch", this_1.onMatch.bind(this_1));
          drag.on("pictureNoMatch", function() {
            _this.node.emit("wrong");
          });
          this_1.bg.node.addChild(drag);
          util_1.Util.loadTexture(image, function(texture) {
            if (null != texture) {
              var pictureNode = drag.children[1];
              var spriteFrame = new cc.SpriteFrame(texture);
              pictureNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
              var shadowNode_1 = drag.children[0];
              shadowNode_1.getComponent(cc.Sprite).spriteFrame = spriteFrame;
              shadowNode_1.active = false;
              drag.height = pictureNode.height;
              drag.width = pictureNode.width;
              new cc.Tween().target(drag).delay(4).call(function() {
                shadowNode_1.active = true;
              }).to(.5, {
                position: new cc.Vec2(Math.random() * (bgWidth + (cc.winSize.width - bgWidth) / 2) - (cc.winSize.width - bgWidth) / 2, Math.random() * (bgHeight - cc.winSize.height) / 4 + (bgHeight - cc.winSize.height) / 4)
              }, {
                progress: null,
                easing: "backOut"
              }).call(function() {
                drag.getComponent(drag_1.default).allowDrag = true;
                if (index + 1 == config.data.length) {
                  drag_1.default.letDrag = true;
                  util_1.Util.showHelp(firstDrag, firstDrop);
                }
              }).start();
              var drop = cc.instantiate(_this.pictureDrop);
              drop.name = index.toString();
              drop.position = new cc.Vec2(parseInt(x) / 3, parseInt(y) / 3);
              drop.height = drag.height;
              drop.width = drag.width;
              _this.bg.node.addChild(drop);
              if (1 == index) {
                firstDrag = drag;
                firstDrop = drop;
              }
            }
          });
        };
        var this_1 = this;
        for (var index = 0; index < this.numPieces; index++) _loop_1(index);
        var truckX = this.truck.x;
        if (config_1.default.i.direction === config_1.Direction.RTL) {
          this.truck.scaleX = -1;
          new cc.Tween().target(this.truck).set({
            x: -cc.winSize.width
          }).call(function() {
            util_1.Util.playSfx(_this.truckInAudio);
          }).to(3, {
            x: -truckX
          }, {
            progress: null,
            easing: "quadOut"
          }).call(function() {
            var anim = _this.truck.getComponent(cc.Animation);
            anim.stop();
          }).start();
        } else new cc.Tween().target(this.truck).set({
          x: cc.winSize.width
        }).call(function() {
          util_1.Util.playSfx(_this.truckInAudio);
        }).to(3, {
          x: truckX
        }, {
          progress: null,
          easing: "quadOut"
        }).call(function() {
          var anim = _this.truck.getComponent(cc.Animation);
          anim.stop();
        }).start();
      };
      PictureBoard.prototype.onMatch = function() {
        var _this = this;
        this.node.emit("correct");
        if (--this.numPieces <= 0) {
          drag_1.default.letDrag = false;
          this.scheduleOnce(function() {
            _this.label.string = _this.text;
            config_1.default.i.direction === config_1.Direction.RTL && (_this.label.node.scaleX = -1);
            util_1.Util.speakClip(_this.audio, function() {
              var anim = _this.truck.getComponent(cc.Animation);
              anim.play();
              config_1.default.i.direction === config_1.Direction.RTL ? new cc.Tween().target(_this.truck).call(function() {
                util_1.Util.playSfx(_this.truckOutAudio);
              }).to(3, {
                x: 2 * cc.winSize.width
              }, {
                progress: null,
                easing: "quadOut"
              }).call(function() {
                _this.node.emit("nextProblem");
              }).start() : new cc.Tween().target(_this.truck).call(function() {
                util_1.Util.playSfx(_this.truckOutAudio);
              }).to(3, {
                x: 2 * -cc.winSize.width
              }, {
                progress: null,
                easing: "quadOut"
              }).call(function() {
                _this.node.emit("nextProblem");
              }).start();
            });
          }, 1);
        }
      };
      __decorate([ property(cc.Prefab) ], PictureBoard.prototype, "pictureDrag", void 0);
      __decorate([ property(cc.Prefab) ], PictureBoard.prototype, "pictureDrop", void 0);
      __decorate([ property(cc.Sprite) ], PictureBoard.prototype, "bg", void 0);
      __decorate([ property(cc.Node) ], PictureBoard.prototype, "truck", void 0);
      __decorate([ property(cc.Label) ], PictureBoard.prototype, "label", void 0);
      __decorate([ property(cc.AudioClip) ], PictureBoard.prototype, "truckInAudio", void 0);
      __decorate([ property(cc.AudioClip) ], PictureBoard.prototype, "truckOutAudio", void 0);
      PictureBoard = __decorate([ ccclass ], PictureBoard);
      return PictureBoard;
    }(game_1.default);
    exports.default = PictureBoard;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/util": void 0
  } ]
}, {}, [ "pictureDrag", "pictureDrop", "pictureboard" ]);