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
  checkerblocks: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f1e51cat4FPiIsV9dU4d18L", "checkerblocks");
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
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var drag_1 = require("../../../common/scripts/drag");
    var game_1 = require("../../../common/scripts/game");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var tileWidth = 69;
    var tileHeight = 69;
    var startX = 280;
    var topMargin = 128;
    var colors = [ "#E3EB0E", "#FF809A", "#74F750", "#56DEA8", "#A857FF" ];
    var CheckerBlocks = function(_super) {
      __extends(CheckerBlocks, _super);
      function CheckerBlocks() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.dragPrefab = null;
        _this.dropPrefab = null;
        _this.dragTilePrefab = null;
        _this.tilePrefab = null;
        _this.board = null;
        _this.dark = null;
        _this.light = null;
        _this.truck = null;
        _this.truckInAudio = null;
        _this.truckOutAudio = null;
        _this.matchCount = 0;
        _this.boardContents = [ [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], [ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ], [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 ], [ 31, 32, 33, 34, 35, 36, 37, 38, 39, 40 ], [ 41, 42, 43, 44, 45, 46, 47, 48, 49, 50 ], [ 51, 52, 53, 54, 55, 56, 57, 58, 59, 60 ], [ 61, 62, 63, 64, 65, 66, 67, 68, 69, 70 ], [ 71, 72, 73, 74, 75, 76, 77, 78, 79, 80 ], [ 81, 82, 83, 84, 85, 86, 87, 88, 89, 90 ], [ 91, 92, 93, 94, 95, 96, 97, 98, 99, 100 ] ];
        _this.dragTiles = new Map();
        _this.colorMap = new Map();
        return _this;
      }
      CheckerBlocks.prototype.onLoad = function() {
        var _this = this;
        cc.director.getCollisionManager().enabled = true;
        drag_1.default.letDrag = false;
        var _a = config_1.default.getInstance().data[0], oldLevel = _a[0], worksheet = _a[1], problem = _a[2], level = _a[3];
        switch (level) {
         case "1":
          this.generateRandomSquares();
          break;

         case "2":
          this.generateHorizontalStrips();
          break;

         case "3":
          this.generateVerticalStrips();
          break;

         case "4":
          this.generateHorizontalHalfStrips();
          break;

         case "5":
          this.generate5Multiples();
          break;

         case "6":
          this.generatePlus();
          break;

         case "7":
          this.generate2by2Squares();
          break;

         case "8":
          this.generateEvenColumns();
          break;

         case "9":
          this.generateOddColumns();
          break;

         case "10":
          this.generateRandomDoubleSquares();
          break;

         case "11":
          this.generateAllSingleSquares();
          break;

         default:
          this.generateRandomSquares();
        }
        var firstDrag = null;
        var firstDrop = null;
        for (var i = 0; i < 10; i++) for (var j = 0; j < 10; j++) {
          var num = 10 * i + j + 1;
          var bg = new cc.Node();
          var bgComp = bg.addComponent(cc.Sprite);
          bg.x = j * tileWidth;
          bg.y = -i * tileHeight;
          bg.anchorX = 0;
          bg.anchorY = 1;
          bgComp.spriteFrame = i % 2 == 0 ? j % 2 == 0 ? this.dark : this.light : j % 2 == 0 ? this.light : this.dark;
          this.board.addChild(bg);
          var tile = cc.instantiate(this.boardContents[i][j] < 0 ? this.dropPrefab : this.tilePrefab);
          tile.name = num.toString();
          tile.x = j * tileWidth;
          tile.y = -i * tileHeight;
          tile.zIndex = 101 - num;
          this.board.addChild(tile);
          if (this.boardContents[i][j] < 0) {
            if (!this.dragTiles.has(this.boardContents[i][j])) {
              var dragTile = cc.instantiate(this.dragTilePrefab);
              dragTile.name = (-this.boardContents[i][j]).toString();
              this.dragTiles.set(this.boardContents[i][j], dragTile);
              this.colorMap.set(-this.boardContents[i][j], new cc.Color().fromHEX(colors[Math.floor(Math.random() * colors.length)]));
              dragTile.on("hundredpuzzleMatch", this.onMatch, this);
              dragTile.on("hundredpuzzleNoMatch", function() {
                _this.node.emit("wrong");
              });
              if (null == firstDrag) {
                firstDrag = dragTile;
                firstDrop = tile;
              }
            }
            this.addToDragTile(-this.boardContents[i][j], num, this.dragTiles.get(this.boardContents[i][j]));
          }
        }
        var truckX = this.truck.x;
        new cc.Tween().target(this.truck).set({
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
          _this.dragTiles.forEach(function(val, key) {
            val.position = cc.v2(-cc.winSize.width / 2 + Math.random() * (startX - val.width), -cc.winSize.height);
            val.zIndex = 100 - parseInt(val.name);
            _this.node.addChild(val);
            new cc.Tween().target(val).delay(2 * Math.random()).to(.5, {
              y: Math.random() * (cc.winSize.height - topMargin - val.height) - cc.winSize.height / 2 + val.height
            }, {
              progress: null,
              easing: "sineOut"
            }).start();
          });
          _this.scheduleOnce(function() {
            drag_1.default.letDrag = true;
            util_1.Util.showHelp(firstDrag, firstDrop);
          }, 2.5);
        }).start();
      };
      CheckerBlocks.prototype.onMatch = function() {
        var _this = this;
        this.node.emit("correct");
        if (++this.matchCount >= this.dragTiles.size) {
          var anim = this.truck.getComponent(cc.Animation);
          anim.play();
          new cc.Tween().target(this.truck).delay(2).call(function() {
            util_1.Util.playSfx(_this.truckOutAudio);
          }).to(3, {
            x: 2 * -cc.winSize.width
          }, {
            progress: null,
            easing: "quadOut"
          }).call(function() {
            _this.node.emit("nextProblem");
          }).start();
        }
      };
      CheckerBlocks.prototype.addToDragTile = function(pos, currentPos, dragTile) {
        var drag = cc.instantiate(this.dragPrefab);
        drag.name = currentPos.toString();
        drag.x = ((currentPos - 1) % 10 - (pos - 1) % 10) * tileWidth;
        drag.y = (Math.floor((pos - 1) / 10) - Math.floor((currentPos - 1) / 10)) * tileHeight;
        dragTile.addChild(drag);
        dragTile.width < drag.x + tileWidth && (dragTile.width = drag.x + tileWidth);
        dragTile.height < -drag.y + tileHeight && (dragTile.height = -drag.y + tileHeight);
        var sprite = drag.getChildByName("sprite");
        null != sprite && (sprite.color = this.colorMap.get(pos));
      };
      CheckerBlocks.prototype.generateRandomSquares = function() {
        var generated = 0;
        do {
          var num = Math.floor(90 * Math.random());
          var type = Math.floor(3 * Math.random());
          var i = Math.floor(num / 10);
          var j = num % 10;
          if (j + 1 < 10 && this.boardContents[i][j] > 0 && this.boardContents[i][j + 1] > 0 && this.boardContents[i + 1][j] > 0 && this.boardContents[i + 1][j] > 0) if (0 == type) {
            if (i + 2 < 10 && this.boardContents[i + 2][j] > 0 && this.boardContents[i + 2][j + 1] > 0) {
              this.boardContents[i][j] = -(num + 1);
              this.boardContents[i][j + 1] = -(num + 1);
              this.boardContents[i + 1][j] = -(num + 1);
              this.boardContents[i + 1][j + 1] = -(num + 1);
              this.boardContents[i + 2][j] = -(num + 1);
              this.boardContents[i + 2][j + 1] = -(num + 1);
              generated++;
            }
          } else if (1 == type) {
            if (j + 2 < 10 && this.boardContents[i][j + 2] > 0 && this.boardContents[i + 1][j + 2] > 0) {
              this.boardContents[i][j] = -(num + 1);
              this.boardContents[i][j + 1] = -(num + 1);
              this.boardContents[i][j + 2] = -(num + 1);
              this.boardContents[i + 1][j] = -(num + 1);
              this.boardContents[i + 1][j + 1] = -(num + 1);
              this.boardContents[i + 1][j + 2] = -(num + 1);
              generated++;
            }
          } else if (i + 2 < 10 && j + 2 < 10 && this.boardContents[i][j + 2] > 0 && this.boardContents[i + 1][j + 2] > 0 && this.boardContents[i + 2][j] > 0 && this.boardContents[i + 2][j + 1] > 0 && this.boardContents[i + 2][j + 2] > 0) {
            this.boardContents[i][j] = -(num + 1);
            this.boardContents[i][j + 1] = -(num + 1);
            this.boardContents[i][j + 2] = -(num + 1);
            this.boardContents[i + 1][j] = -(num + 1);
            this.boardContents[i + 1][j + 1] = -(num + 1);
            this.boardContents[i + 1][j + 2] = -(num + 1);
            this.boardContents[i + 2][j] = -(num + 1);
            this.boardContents[i + 2][j + 1] = -(num + 1);
            this.boardContents[i + 2][j + 2] = -(num + 1);
            generated++;
          }
        } while (generated < 8);
      };
      CheckerBlocks.prototype.generateHorizontalStrips = function() {
        for (var i = 0; i < 10; i++) for (var j = 0; j < 10; j++) this.boardContents[i][j] = -(10 * i + 1);
      };
      CheckerBlocks.prototype.generateVerticalStrips = function() {
        for (var i = 0; i < 10; i++) for (var j = 0; j < 10; j++) this.boardContents[i][j] = -(j + 1);
      };
      CheckerBlocks.prototype.generateHorizontalHalfStrips = function() {
        var generated = 0;
        do {
          var num = 5 * Math.floor(20 * Math.random()) + 1;
          if (this.boardContents[Math.floor((num - 1) / 10)][(num - 1) % 10] > 0) {
            for (var i = 0; i < 5; i++) this.boardContents[Math.floor((num - 1) / 10)][(num - 1) % 10 + i] = -num;
            generated++;
          }
        } while (generated < 16);
      };
      CheckerBlocks.prototype.generate5Multiples = function() {
        for (var i = 0; i < 10; i++) for (var j = 4; j < 10; j += 5) this.boardContents[i][j] = -(10 * i + j + 1);
      };
      CheckerBlocks.prototype.generatePlus = function() {
        var generated = 0;
        do {
          var num = Math.floor(70 * Math.random());
          var i = Math.floor(num / 10);
          var j = num % 10;
          if (this.boardContents[i][j + 1] > 0 && this.boardContents[i + 1][j] > 0 && this.boardContents[i + 1][j + 2] > 0 && this.boardContents[i + 2][j + 1] > 0) {
            this.boardContents[i][j + 1] = -(num + 1);
            this.boardContents[i + 1][j] = -(num + 1);
            this.boardContents[i + 1][j + 1] = -(num + 1);
            this.boardContents[i + 1][j + 2] = -(num + 1);
            this.boardContents[i + 2][j + 1] = -(num + 1);
            generated++;
          }
        } while (generated < 8);
      };
      CheckerBlocks.prototype.generate2by2Squares = function() {
        var generated = 0;
        do {
          var num = Math.floor(25 * Math.random());
          var i = 2 * Math.floor(num / 5);
          var j = num % 5 * 2;
          if (this.boardContents[i][j] > 0) {
            this.boardContents[i][j] = -(10 * i + j + 1);
            this.boardContents[i + 1][j] = -(10 * i + j + 1);
            this.boardContents[i][j + 1] = -(10 * i + j + 1);
            this.boardContents[i + 1][j + 1] = -(10 * i + j + 1);
            generated++;
          }
        } while (generated < 16);
      };
      CheckerBlocks.prototype.generateOddShapes = function() {};
      CheckerBlocks.prototype.generateEvenColumns = function() {
        for (var i = 0; i < 10; i++) for (var j = 1; j < 10; j += 2) this.boardContents[i][j] = -(10 * i + j + 1);
      };
      CheckerBlocks.prototype.generateOddColumns = function() {
        for (var i = 0; i < 10; i++) for (var j = 0; j < 10; j += 2) this.boardContents[i][j] = -(10 * i + j + 1);
      };
      CheckerBlocks.prototype.generateRandomDoubleSquares = function() {
        var generated = 0;
        do {
          var success = false;
          var num = Math.floor(100 * Math.random());
          var horizontal = 1 == Math.floor(2 * Math.random());
          var i = Math.floor(num / 10);
          var j = num % 10;
          if (this.boardContents[i][j] > 0) if (horizontal) {
            if (j + 1 < 10 && this.boardContents[i][j + 1] > 0) {
              this.boardContents[i][j] = -(num + 1);
              this.boardContents[i][j + 1] = -(num + 1);
              generated++;
              success = true;
            }
          } else if (i + 1 < 10 && this.boardContents[i + 1][j] > 0) {
            this.boardContents[i][j] = -(num + 1);
            this.boardContents[i + 1][j] = -(num + 1);
            generated++;
            success = true;
          }
          if (!success) loop: for (var i_1 = 0; i_1 < 10; i_1++) for (var j_1 = 0; j_1 < 10; j_1++) if (this.boardContents[i_1][j_1] > 0) {
            var num_1 = 10 * i_1 + j_1;
            if (j_1 + 1 < 10 && this.boardContents[i_1][j_1 + 1] > 0) {
              this.boardContents[i_1][j_1] = -(num_1 + 1);
              this.boardContents[i_1][j_1 + 1] = -(num_1 + 1);
              generated++;
              success = true;
              break loop;
            }
            if (i_1 + 1 < 10 && this.boardContents[i_1 + 1][j_1] > 0) {
              this.boardContents[i_1][j_1] = -(num_1 + 1);
              this.boardContents[i_1 + 1][j_1] = -(num_1 + 1);
              generated++;
              success = true;
              break loop;
            }
          }
        } while (generated < 45 && success);
      };
      CheckerBlocks.prototype.generateAllSingleSquares = function() {
        for (var i = 0; i < 10; i++) for (var j = 0; j < 10; j++) {
          var num = 10 * i + j + 1;
          this.boardContents[i][j] = -num;
        }
      };
      __decorate([ property(cc.Prefab) ], CheckerBlocks.prototype, "dragPrefab", void 0);
      __decorate([ property(cc.Prefab) ], CheckerBlocks.prototype, "dropPrefab", void 0);
      __decorate([ property(cc.Prefab) ], CheckerBlocks.prototype, "dragTilePrefab", void 0);
      __decorate([ property(cc.Prefab) ], CheckerBlocks.prototype, "tilePrefab", void 0);
      __decorate([ property(cc.Node) ], CheckerBlocks.prototype, "board", void 0);
      __decorate([ property(cc.SpriteFrame) ], CheckerBlocks.prototype, "dark", void 0);
      __decorate([ property(cc.SpriteFrame) ], CheckerBlocks.prototype, "light", void 0);
      __decorate([ property(cc.Node) ], CheckerBlocks.prototype, "truck", void 0);
      __decorate([ property(cc.AudioClip) ], CheckerBlocks.prototype, "truckInAudio", void 0);
      __decorate([ property(cc.AudioClip) ], CheckerBlocks.prototype, "truckOutAudio", void 0);
      __decorate([ error_handler_1.default() ], CheckerBlocks.prototype, "onLoad", null);
      CheckerBlocks = __decorate([ ccclass ], CheckerBlocks);
      return CheckerBlocks;
    }(game_1.default);
    exports.default = CheckerBlocks;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0
  } ],
  hundredpuzzleDragTile: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6aa15w9Ff5EiaFEdcQ3bdxF", "hundredpuzzleDragTile");
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
    var HundredPuzzleDragTile = function(_super) {
      __extends(HundredPuzzleDragTile, _super);
      function HundredPuzzleDragTile() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      HundredPuzzleDragTile.prototype.onTouchEnd = function(touch) {
        _super.prototype.onTouchEnd.call(this, touch);
        if (this.match) this.node.emit("hundredpuzzleMatch", this); else {
          this.node.emit("hundredpuzzleNoMatch");
          var worldPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
          var newPos = this.node.getPosition();
          var doTween = false;
          if (worldPos.x + this.node.width > cc.winSize.width) {
            newPos.x -= worldPos.x + this.node.width - cc.winSize.width;
            doTween = true;
          } else if (worldPos.x < 0) {
            newPos.x -= worldPos.x;
            doTween = true;
          }
          if (worldPos.y > cc.winSize.height) {
            newPos.y -= worldPos.y - cc.winSize.height;
            doTween = true;
          } else if (worldPos.y - this.node.height < 0) {
            newPos.y -= worldPos.y - this.node.height;
            doTween = true;
          }
          doTween && new cc.Tween().target(this.node).to(.25, {
            position: newPos
          }, {
            progress: null,
            easing: "sineOut"
          }).start();
        }
      };
      HundredPuzzleDragTile = __decorate([ ccclass ], HundredPuzzleDragTile);
      return HundredPuzzleDragTile;
    }(drag_1.default);
    exports.default = HundredPuzzleDragTile;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0
  } ],
  hundredpuzzleTile: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "600ffKuTytNeKitMWAFPKxo", "hundredpuzzleTile");
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HundredPuzzleTile = function(_super) {
      __extends(HundredPuzzleTile, _super);
      function HundredPuzzleTile() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.numberLabel = null;
        return _this;
      }
      HundredPuzzleTile.prototype.onLoad = function() {
        this.numberLabel.string = this.node.name;
      };
      __decorate([ property(cc.Label) ], HundredPuzzleTile.prototype, "numberLabel", void 0);
      HundredPuzzleTile = __decorate([ ccclass ], HundredPuzzleTile);
      return HundredPuzzleTile;
    }(cc.Component);
    exports.default = HundredPuzzleTile;
    cc._RF.pop();
  }, {} ]
}, {}, [ "checkerblocks", "hundredpuzzleDragTile", "hundredpuzzleTile" ]);