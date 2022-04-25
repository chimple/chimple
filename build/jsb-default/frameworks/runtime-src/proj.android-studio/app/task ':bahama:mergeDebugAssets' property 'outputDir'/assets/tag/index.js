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
  label: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bd504The1JKtZtqVts+d1wS", "label");
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
    var tag_1 = require("./tag");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Label = function(_super) {
      __extends(Label, _super);
      function Label() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.homePos = null;
        return _this;
      }
      Label.prototype.onDestroy = function() {
        this.node.off("touchstart", this.onTouchStart, this);
        this.node.off("touchend", this.onTouchEnd, this);
        this.node.off("touchmove", this.onTouchMove, this);
        this.node.off("touchcancel", this.onTouchEnd, this);
      };
      Label.prototype.scaleLabel = function(scaleFactor) {
        if (config_1.default.i.direction == config_1.Direction.RTL) {
          this.node.scaleX = -scaleFactor;
          this.node.getChildByName("text").scaleX = -1;
        } else this.node.scale = scaleFactor;
      };
      Label.prototype.onTouchStart = function(touch) {
        if (0 == touch.getID()) {
          this.scaleLabel(1.1);
          this.node.parent.getComponent(tag_1.default).onTouchAudio(this.audioName);
        }
      };
      Label.prototype.onTouchMove = function(touch) {
        0 == touch.getID() && this.node.setPosition(this.node.position.add(touch.getDelta()));
      };
      Label.prototype.handleNodeTouch = function(handle) {
        if ("off" == handle) {
          this.node.off("touchstart", this.onTouchStart, this);
          this.node.off("touchend", this.onTouchEnd, this);
          this.node.off("touchmove", this.onTouchMove, this);
          this.node.off("touchcancel", this.onTouchEnd, this);
        } else if ("on" == handle) {
          this.node.on("touchstart", this.onTouchStart, this);
          this.node.on("touchend", this.onTouchEnd, this);
          this.node.on("touchmove", this.onTouchMove, this);
          this.node.on("touchcancel", this.onTouchEnd, this);
        }
      };
      Label.prototype.onTouchEnd = function(touch) {
        var _this = this;
        cc.log("touchend " + touch.getID());
        this.handleNodeTouch("off");
        var parentComp = this.node.parent.getComponent(tag_1.default);
        var isWrong = false;
        this.node.parent.getChildByName("truck").getChildByName("container").children.forEach(function(e) {
          null != e && e.name != "dropBox_" + _this.node.name && e.getBoundingBoxToWorld().contains(touch.getLocation()) && (isWrong = true);
        });
        isWrong && this.node.parent.emit("wrong");
        if (null != this.node.parent.getChildByName("truck").getChildByName("container").getChildByName("dropBox_" + this.node.name) && this.node.parent.getChildByName("truck").getChildByName("container").getChildByName("dropBox_" + this.node.name).getBoundingBoxToWorld().contains(touch.getLocation())) {
          cc.log("hi");
          var dropBox = this.node.parent.getChildByName("truck").getChildByName("container").getChildByName("dropBox_" + this.node.name);
          this.scaleLabel(1);
          this.node.parent = null;
          this.node.parent = dropBox.parent;
          this.node.position = dropBox.position;
          dropBox.removeFromParent(false);
          this.node.parent.parent.parent.emit("correct");
          parentComp.complete--;
          parentComp.match();
        } else {
          this.scaleLabel(1);
          new cc.Tween().target(this.node).to(.7, {
            position: this.homePos
          }, {
            progress: null,
            easing: "sineOut"
          }).call(function() {
            _this.handleNodeTouch("on");
          }).start();
        }
      };
      __decorate([ error_handler_1.catchError() ], Label.prototype, "onDestroy", null);
      __decorate([ error_handler_1.catchError() ], Label.prototype, "scaleLabel", null);
      __decorate([ error_handler_1.catchError() ], Label.prototype, "onTouchStart", null);
      __decorate([ error_handler_1.catchError() ], Label.prototype, "onTouchMove", null);
      __decorate([ error_handler_1.catchError() ], Label.prototype, "handleNodeTouch", null);
      __decorate([ error_handler_1.catchError() ], Label.prototype, "onTouchEnd", null);
      Label = __decorate([ ccclass ], Label);
      return Label;
    }(cc.Component);
    exports.default = Label;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "./tag": "tag"
  } ],
  tag: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2a21a3wccNEzq61A63XMdBW", "tag");
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
    var label_1 = require("./label");
    var util_1 = require("../../../common/scripts/util");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var game_1 = require("../../../common/scripts/game");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var FONT_SIZE = 45;
    var Tag = function(_super) {
      __extends(Tag, _super);
      function Tag() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.dropNodePrefab = null;
        _this.queNodePrefab = null;
        _this.label0Prefab = null;
        _this.label1Prefab = null;
        _this.label2Prefab = null;
        _this.label3Prefab = null;
        _this.label4Prefab = null;
        _this.label5Prefab = null;
        _this.labelAudio = null;
        _this.truck = null;
        _this.totalPieces = 0;
        _this.complete = 0;
        return _this;
      }
      Tag.prototype.onLoad = function() {
        var _this = this;
        this.node.opacity = 0;
        this.totalPieces--;
        this.quePos = new Map();
        this.queAudio = new Map();
        var fieldArr = config_1.default.getInstance().data[0];
        var bgName = fieldArr[3];
        var firstDrag = null;
        var firstDrop = null;
        util_1.Util.loadTexture(bgName, function(texture) {
          _this.node.opacity = 255;
          var temp = new cc.SpriteFrame(texture);
          temp.setRect(new cc.Rect(30, 30, 790, 650));
          _this.node.getChildByName("truck").getChildByName("container").getComponent(cc.Sprite).spriteFrame = temp;
          _this.node.getChildByName("truck").getChildByName("container").opacity = 255;
          var animClip;
          var _loop_1 = function(i, id) {
            if ("" == fieldArr[i + 1]) return out_i_1 = i, "break";
            var dropBox_1 = cc.instantiate(_this.dropNodePrefab);
            var name = "";
            var arr = fieldArr[++i].split("/");
            for (var l = 0; l < arr.length; l++) name = name.concat(arr[l]);
            var itemPos = fieldArr[++i].split(".");
            var audio = fieldArr[i + 1];
            _this.queAudio.set(name, audio);
            dropBox_1.name = "dropBox_" + name;
            dropBox_1.getChildByName("drop_label_labelling").height += 20;
            dropBox_1.getChildByName("drop_label_labelling").width += 15;
            _this.node.getChildByName("truck").getChildByName("container").addChild(dropBox_1);
            dropBox_1.opacity = 0;
            dropBox_1.position = cc.v3(+itemPos[0] / 2.27 - 340, - +itemPos[1] / 1.92 - 490);
            0 == id && (firstDrop = dropBox_1);
            animClip = dropBox_1.getChildByName("drop_label_labelling").getComponent(cc.Animation);
            setTimeout(function() {
              if (null != _this.node) {
                animClip = dropBox_1.getChildByName("drop_label_labelling").getComponent(cc.Animation);
                animClip.play();
                util_1.Util.playSfx(_this.labelAudio);
                dropBox_1.opacity = 255;
              }
            }, 3e3 * Math.random() + 2e3);
            out_i_1 = i;
          };
          var out_i_1;
          for (var i = 3, id = 0; i < fieldArr.length - 1; i++, id++) {
            var state_1 = _loop_1(i, id);
            i = out_i_1;
            if ("break" === state_1) break;
          }
          var truckX = _this.truck.x;
          new cc.Tween().target(_this.truck).set({
            x: cc.winSize.width
          }).to(3, {
            x: truckX
          }, {
            progress: null,
            easing: "quadOut"
          }).call(function() {
            var anim = _this.truck.getComponent(cc.Animation);
            anim.stop();
            for (var i = 3, id = 0; i < fieldArr.length - 1; i += 2, id++) {
              if ("" == fieldArr[i + 1]) break;
              var queLabel = cc.instantiate(_this.queNodePrefab);
              var queBox = void 0;
              switch (id % 6) {
               case 0:
                queBox = cc.instantiate(_this.label0Prefab);
                break;

               case 1:
                queBox = cc.instantiate(_this.label1Prefab);
                break;

               case 2:
                queBox = cc.instantiate(_this.label2Prefab);
                break;

               case 3:
                queBox = cc.instantiate(_this.label3Prefab);
                break;

               case 4:
                queBox = cc.instantiate(_this.label4Prefab);
                break;

               case 5:
                queBox = cc.instantiate(_this.label5Prefab);
              }
              var name = "";
              var arr = fieldArr[++i].split("/");
              for (var l = 0; l < arr.length; l++) name = name.concat(arr[l]);
              queLabel.name = "text";
              queLabel.getComponent(cc.Label).string = fieldArr[i];
              queLabel.getComponent(cc.Label).fontSize = FONT_SIZE;
              queBox.name = name;
              _this.complete++;
              queBox.addChild(queLabel);
              queBox.height += 20;
              queBox.width += 15;
              0 == id && (firstDrag = queBox);
              var labelComp = queBox.getComponent(label_1.default);
              queBox.name = name;
              _this.node.addChild(queBox);
              queLabel.zIndex = 1;
              queBox.position = cc.v2(.75 * cc.winSize.width / 2, queBox.y - 85 * id - 100);
              labelComp.homePos = queBox.position;
              labelComp.audioName = _this.queAudio.get(name);
              if (config_1.default.i.direction == config_1.Direction.RTL) {
                queLabel.getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.RIGHT;
                queBox.scaleX = -1;
                queBox.getChildByName("text").scaleX = -1;
              }
            }
          }).start();
          _this.scheduleOnce(function() {
            util_1.Util.showHelp(firstDrag, firstDrop);
            _this.node.getComponentsInChildren(label_1.default).forEach(function(e) {
              e.handleNodeTouch("on");
            });
          }, 5);
        });
      };
      Tag.prototype.match = function() {
        var _this = this;
        if (0 == this.complete && --this.totalPieces <= 0) {
          cc.log("label game finish");
          new cc.Tween().target(this.truck).delay(1).to(1.5, {
            x: this.truck.x - cc.winSize.width
          }, {
            progress: null,
            easing: "quadOut"
          }).call(function() {
            return _this.node.emit("nextProblem");
          }).start();
        }
      };
      Tag.prototype.onDestroy = function() {
        cc.audioEngine.stopAllEffects();
      };
      Tag.prototype.onTouchAudio = function(musicName) {
        var _this = this;
        util_1.Util.loadGameSound(musicName, function(clip) {
          clip && _this.friend.speak(clip);
        });
      };
      __decorate([ property(cc.Prefab) ], Tag.prototype, "dropNodePrefab", void 0);
      __decorate([ property(cc.Prefab) ], Tag.prototype, "queNodePrefab", void 0);
      __decorate([ property(cc.Prefab) ], Tag.prototype, "label0Prefab", void 0);
      __decorate([ property(cc.Prefab) ], Tag.prototype, "label1Prefab", void 0);
      __decorate([ property(cc.Prefab) ], Tag.prototype, "label2Prefab", void 0);
      __decorate([ property(cc.Prefab) ], Tag.prototype, "label3Prefab", void 0);
      __decorate([ property(cc.Prefab) ], Tag.prototype, "label4Prefab", void 0);
      __decorate([ property(cc.Prefab) ], Tag.prototype, "label5Prefab", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], Tag.prototype, "labelAudio", void 0);
      __decorate([ property(cc.Node) ], Tag.prototype, "truck", void 0);
      __decorate([ error_handler_1.catchError() ], Tag.prototype, "onLoad", null);
      __decorate([ error_handler_1.catchError() ], Tag.prototype, "match", null);
      __decorate([ error_handler_1.catchError() ], Tag.prototype, "onDestroy", null);
      __decorate([ error_handler_1.catchError() ], Tag.prototype, "onTouchAudio", null);
      Tag = __decorate([ ccclass ], Tag);
      return Tag;
    }(game_1.default);
    exports.default = Tag;
    cc._RF.pop();
  }, {
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./label": "label"
  } ]
}, {}, [ "label", "tag" ]);