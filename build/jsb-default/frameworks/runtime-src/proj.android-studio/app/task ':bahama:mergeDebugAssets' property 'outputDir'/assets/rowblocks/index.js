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
  rowblocks: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "12807aaEE9HJb90O9Ox1dj8", "rowblocks");
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
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var config_1 = require("../../../common/scripts/lib/config");
    var drag_1 = require("../../../common/scripts/drag");
    var util_1 = require("../../../common/scripts/util");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var game_1 = require("../../../common/scripts/game");
    var tileWidth = 80;
    var tileHeight = 80;
    var startX = 50;
    var colors = [ "#E3EB0E", "#FF809A", "#74F750", "#56DEA8", "#A857FF" ];
    var RowBlocks = function(_super) {
      __extends(RowBlocks, _super);
      function RowBlocks() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.board = null;
        _this.truck = null;
        _this.dragPrefab = null;
        _this.dropPrefab = null;
        _this.dragTilePrefab = null;
        _this.tilePrefab = null;
        _this.dark = null;
        _this.light = null;
        _this.truckInAudio = null;
        _this.truckOutAudio = null;
        _this.currentConfig = null;
        _this.matchCount = 0;
        _this.boardContents = [ [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], [ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ], [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 ] ];
        _this.dragTiles = new Map();
        _this.colorMap = new Map();
        return _this;
      }
      RowBlocks.prototype.onLoad = function() {
        var _this = this;
        cc.director.getCollisionManager().enabled = true;
        this.currentConfig = this.processConfiguration(config_1.default.getInstance().data[0]);
        this.generateAllSingleSquares();
        var howManyRows = Math.floor(this.currentConfig.columns.length / 10);
        var firstDrag = null;
        var firstDrop = null;
        for (var i = 0; i < howManyRows; i++) for (var j = 0; j < 10; j++) {
          var num = this.currentConfig.columns[10 * i + j];
          var bg = new cc.Node();
          var bgComp = bg.addComponent(cc.Sprite);
          bg.x = j * tileWidth;
          bg.y = -i * tileHeight;
          bg.anchorX = 0;
          bg.anchorY = 1;
          bgComp.spriteFrame = i % 2 == 0 ? j % 2 == 0 ? this.dark : this.light : j % 2 == 0 ? this.light : this.dark;
          this.board.addChild(bg);
          this.board.setPosition(new cc.Vec2(this.board.x, .75 * cc.winSize.height - (howManyRows - 1) * this.board.height));
          var tile = cc.instantiate(this.boardContents[i][j] < 0 ? this.dropPrefab : this.tilePrefab);
          cc.log("tile.name", num.toString());
          tile.name = num.toString();
          tile.x = j * tileWidth;
          tile.y = -i * tileHeight;
          this.board.addChild(tile);
          if (this.boardContents[i][j] < 0) {
            if (!this.dragTiles.has(this.boardContents[i][j])) {
              var dragTile = cc.instantiate(this.dragTilePrefab);
              cc.log("dragTile.name", (-this.boardContents[i][j]).toString());
              dragTile.name = (-this.boardContents[i][j]).toString();
              this.dragTiles.set(this.boardContents[i][j], dragTile);
              this.colorMap.set(-this.boardContents[i][j], new cc.Color().fromHEX(colors[Math.floor(Math.random() * colors.length)]));
              dragTile.on("thirtypuzzleMatch", this.onMatch, this);
              dragTile.on("thirtypuzzleNoMatch", function() {
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
        var randomPositions = util_1.Util.generatePositionsArray(700, 300, 100, 40);
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
          var count = 0;
          _this.dragTiles.forEach(function(val, key) {
            val.position = cc.v2(cc.winSize.width + 10, -cc.winSize.height / 8);
            _this.node.addChild(val);
            new cc.Tween().target(val).delay(2 * Math.random()).to(.5, {
              x: randomPositions[count].x,
              y: randomPositions[count].y
            }, {
              progress: null,
              easing: "sineOut"
            }).start();
            count++;
          });
          _this.scheduleOnce(function() {
            drag_1.default.letDrag = true;
            util_1.Util.showHelp(firstDrag, firstDrop);
          }, 2.5);
        }).start();
      };
      RowBlocks.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var level = configurations[0], workSheet = configurations[1], problem = configurations[2], columnStr = configurations[3], suggestStr = configurations[4], isRandom = configurations[5], problemNumber = configurations[6];
        return {
          level: level,
          workSheet: workSheet,
          problem: problem,
          columns: columnStr.split(",").map(function(i) {
            return parseInt(i, 10);
          }),
          suggests: suggestStr.split(",").map(function(i) {
            return parseInt(i, 10);
          }),
          isRandom: isRandom,
          problemNumber: problemNumber
        };
      };
      RowBlocks.prototype.onMatch = function() {
        var _this = this;
        this.node.emit("correct");
        if (++this.matchCount >= this.dragTiles.size) {
          var anim = this.truck.getComponent(cc.Animation);
          anim.play();
          new cc.Tween().target(this.truck).call(function() {
            _this.truckInAudio = util_1.Util.playSfx(_this.truckAudio, false, true);
          }).delay(2).call(function() {
            util_1.Util.playSfx(_this.truckOutAudio);
          }).to(3, {
            x: 2 * -cc.winSize.width
          }, {
            progress: null,
            easing: "quadOut"
          }).call(function() {
            cc.audioEngine.stop(_this.truckAudioId);
            _this.node.emit("nextProblem");
          }).start();
        }
      };
      RowBlocks.prototype.addToDragTile = function(pos, currentPos, dragTile) {
        var drag = cc.instantiate(this.dragPrefab);
        drag.name = currentPos.toString();
        drag.x = 0;
        drag.y = (Math.floor((pos - 1) / 10) - Math.floor((currentPos - 1) / 10)) * tileHeight;
        dragTile.addChild(drag);
        dragTile.width < drag.x + tileWidth && (dragTile.width = drag.x + tileWidth);
        dragTile.height < -drag.y + tileHeight && (dragTile.height = -drag.y + tileHeight);
        var sprite = drag.getChildByName("sprite");
        null != sprite && (sprite.color = this.colorMap.get(pos));
      };
      RowBlocks.prototype.generateAllSingleSquares = function() {
        var index = 0;
        var howManyRows = Math.floor(this.currentConfig.columns.length / 10);
        for (var i = 0; i < howManyRows; i++) for (var j = 0; j < 10; j++) {
          var num = 10 * i + j;
          var eleNum = this.currentConfig.columns[num];
          -1 !== this.currentConfig.suggests.indexOf(eleNum) && (this.boardContents[i][j] = -this.currentConfig.suggests[index++]);
        }
      };
      __decorate([ property(cc.Node) ], RowBlocks.prototype, "board", void 0);
      __decorate([ property(cc.Node) ], RowBlocks.prototype, "truck", void 0);
      __decorate([ property(cc.Prefab) ], RowBlocks.prototype, "dragPrefab", void 0);
      __decorate([ property(cc.Prefab) ], RowBlocks.prototype, "dropPrefab", void 0);
      __decorate([ property(cc.Prefab) ], RowBlocks.prototype, "dragTilePrefab", void 0);
      __decorate([ property(cc.Prefab) ], RowBlocks.prototype, "tilePrefab", void 0);
      __decorate([ property(cc.SpriteFrame) ], RowBlocks.prototype, "dark", void 0);
      __decorate([ property(cc.SpriteFrame) ], RowBlocks.prototype, "light", void 0);
      __decorate([ property(cc.AudioClip) ], RowBlocks.prototype, "truckInAudio", void 0);
      __decorate([ property(cc.AudioClip) ], RowBlocks.prototype, "truckOutAudio", void 0);
      __decorate([ error_handler_1.default() ], RowBlocks.prototype, "onLoad", null);
      RowBlocks = __decorate([ ccclass ], RowBlocks);
      return RowBlocks;
    }(game_1.default);
    exports.default = RowBlocks;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0
  } ],
  thirtypuzzleboard: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b585fpQEdZFCLsWaxi0XujG", "thirtypuzzleboard");
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ThirtyPuzzleBoard = function(_super) {
      __extends(ThirtyPuzzleBoard, _super);
      function ThirtyPuzzleBoard() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.back = null;
        _this.front = null;
        _this.shadow = null;
        _this.left = null;
        _this.right = null;
        _this.match = null;
        _this.truck = null;
        _this.choice = null;
        _this.isMoving = false;
        _this.cards = null;
        _this.choiceY = null;
        return _this;
      }
      ThirtyPuzzleBoard.prototype.onLoad = function() {
        var _this = this;
        this.choiceY = this.choice.y;
        this.choice.y = -cc.winSize.height;
        var truckX = this.truck.x;
        new cc.Tween().target(this.truck).set({
          x: cc.winSize.width
        }).to(3, {
          x: truckX
        }, {
          progress: null,
          easing: "quadOut"
        }).call(function() {
          var anim = _this.truck.getComponent(cc.Animation);
          anim.stop();
          _this.onIteration();
        }).start();
        this.node.on("nextIteration", function() {
          _this.onIteration();
        });
      };
      ThirtyPuzzleBoard.prototype.onIteration = function() {
        var _this = this;
        var prefix = config_1.default.dir + "games/findthematch/images/";
        var _a = config_1.default.getInstance().data[0], level = _a[0], worksheet = _a[1], problem = _a[2], choices = _a[3], choice0 = _a[4], choice1 = _a[5], choice2 = _a[6], choice3 = _a[7];
        var choiceArray = [ choice0, choice1, choice2, choice3 ];
        this.cards = [];
        util_1.Util.load(prefix + choice0, function(err, texture) {
          var spriteNode = new cc.Node();
          var sprite = spriteNode.addComponent(cc.Sprite);
          sprite.spriteFrame = new cc.SpriteFrame(texture);
          _this.left.addChild(spriteNode);
        });
        for (var index = 0; index < parseInt(choices); index++) this.cards.push(this.makeChoiceCard(prefix + choiceArray[index], index));
        util_1.Util.shuffle(this.cards);
        this.cards.forEach(function(element) {
          _this.choice.addChild(element);
        });
        new cc.Tween().target(this.choice).to(.25, {
          y: this.choiceY
        }, {
          progress: null,
          easing: "quadOut"
        }).start();
      };
      ThirtyPuzzleBoard.prototype.makeChoiceCard = function(textureName, index) {
        var _this = this;
        var cardNode = new cc.Node(index.toString());
        var cardSprite = cardNode.addComponent(cc.Sprite);
        cardSprite.spriteFrame = this.front;
        var spriteNode = new cc.Node();
        var sprite = spriteNode.addComponent(cc.Sprite);
        util_1.Util.load(textureName, function(err, texture) {
          sprite.spriteFrame = new cc.SpriteFrame(texture);
        });
        cardNode.addChild(spriteNode);
        cardNode.on("touchstart", function() {
          if (!_this.isMoving) {
            _this.isMoving = true;
            new cc.Tween().target(cardNode).to(.5, {
              position: cardNode.convertToNodeSpaceAR(_this.right.convertToWorldSpaceAR(cc.Vec2.ZERO))
            }, null).call(function() {
              0 == index ? _this.node.emit("correct") : _this.node.emit("wrong");
            }).call(function() {
              0 == index ? _this.scheduleOnce(function() {
                _this.choice.removeAllChildren();
                _this.left.removeAllChildren();
                _this.isMoving = false;
                _this.choice.y = -cc.winSize.height;
                _this.node.emit("nextProblem", false);
              }, 2) : new cc.Tween().target(cardNode).to(.25, {
                position: cc.Vec2.ZERO
              }, {
                progress: null,
                easing: "quadOut"
              }).call(function() {
                _this.isMoving = false;
              }).start();
            }).start();
          }
        }, this);
        var tempNode = new cc.Node();
        tempNode.width = 168;
        tempNode.height = 200;
        tempNode.addChild(cardNode);
        return tempNode;
      };
      __decorate([ property(cc.SpriteFrame) ], ThirtyPuzzleBoard.prototype, "back", void 0);
      __decorate([ property(cc.SpriteFrame) ], ThirtyPuzzleBoard.prototype, "front", void 0);
      __decorate([ property(cc.SpriteFrame) ], ThirtyPuzzleBoard.prototype, "shadow", void 0);
      __decorate([ property(cc.Node) ], ThirtyPuzzleBoard.prototype, "left", void 0);
      __decorate([ property(cc.Node) ], ThirtyPuzzleBoard.prototype, "right", void 0);
      __decorate([ property(cc.Node) ], ThirtyPuzzleBoard.prototype, "match", void 0);
      __decorate([ property(cc.Node) ], ThirtyPuzzleBoard.prototype, "truck", void 0);
      __decorate([ property(cc.Node) ], ThirtyPuzzleBoard.prototype, "choice", void 0);
      __decorate([ error_handler_1.default() ], ThirtyPuzzleBoard.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], ThirtyPuzzleBoard.prototype, "onIteration", null);
      __decorate([ error_handler_1.default() ], ThirtyPuzzleBoard.prototype, "makeChoiceCard", null);
      ThirtyPuzzleBoard = __decorate([ ccclass ], ThirtyPuzzleBoard);
      return ThirtyPuzzleBoard;
    }(cc.Component);
    exports.default = ThirtyPuzzleBoard;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0
  } ],
  thirtypuzzledragtile: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "154c6pfZMpDy4D6AnFSfXly", "thirtypuzzledragtile");
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
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ThirtyPuzzleDragTile = function(_super) {
      __extends(ThirtyPuzzleDragTile, _super);
      function ThirtyPuzzleDragTile() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ThirtyPuzzleDragTile.prototype.onTouchEnd = function(touch) {
        _super.prototype.onTouchEnd.call(this, touch);
        if (this.match) this.node.emit("thirtypuzzleMatch", this); else {
          this.node.emit("thirtypuzzleNoMatch");
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
      __decorate([ error_handler_1.default() ], ThirtyPuzzleDragTile.prototype, "onTouchEnd", null);
      ThirtyPuzzleDragTile = __decorate([ ccclass ], ThirtyPuzzleDragTile);
      return ThirtyPuzzleDragTile;
    }(drag_1.default);
    exports.default = ThirtyPuzzleDragTile;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/lib/error-handler": void 0
  } ],
  thirtypuzzletile: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "52320TDYzFGZJiyqDmSbA/8", "thirtypuzzletile");
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
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ThirtyPuzzleTile = function(_super) {
      __extends(ThirtyPuzzleTile, _super);
      function ThirtyPuzzleTile() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.numberLabel = null;
        return _this;
      }
      ThirtyPuzzleTile.prototype.onLoad = function() {
        this.numberLabel.string = this.node.name;
      };
      __decorate([ property(cc.Label) ], ThirtyPuzzleTile.prototype, "numberLabel", void 0);
      __decorate([ error_handler_1.default() ], ThirtyPuzzleTile.prototype, "onLoad", null);
      ThirtyPuzzleTile = __decorate([ ccclass ], ThirtyPuzzleTile);
      return ThirtyPuzzleTile;
    }(cc.Component);
    exports.default = ThirtyPuzzleTile;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/error-handler": void 0
  } ]
}, {}, [ "rowblocks", "thirtypuzzleboard", "thirtypuzzledragtile", "thirtypuzzletile" ]);