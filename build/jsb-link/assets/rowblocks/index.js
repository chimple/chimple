window.__require = function t(e, o, r) {
function n(c, a) {
if (!o[c]) {
if (!e[c]) {
var l = c.split("/");
l = l[l.length - 1];
if (!e[l]) {
var s = "function" == typeof __require && __require;
if (!a && s) return s(l, !0);
if (i) return i(l, !0);
throw new Error("Cannot find module '" + c + "'");
}
c = l;
}
var u = o[c] = {
exports: {}
};
e[c][0].call(u.exports, function(t) {
return n(e[c][1][t] || t);
}, u, u.exports, t, e, o, r);
}
return o[c].exports;
}
for (var i = "function" == typeof __require && __require, c = 0; c < r.length; c++) n(r[c]);
return n;
}({
rowblocks: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "12807aaEE9HJb90O9Ox1dj8", "rowblocks");
var r = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function r() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (r.prototype = o.prototype, new r());
};
}(), n = this && this.__decorate || function(t, e, o, r) {
var n, i = arguments.length, c = i < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, o) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, r); else for (var a = t.length - 1; a >= 0; a--) (n = t[a]) && (c = (i < 3 ? n(c) : i > 3 ? n(e, o, c) : n(e, o)) || c);
return i > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator.ccclass, c = cc._decorator.property, a = t("../../../common/scripts/lib/config"), l = t("../../../common/scripts/drag"), s = t("../../../common/scripts/util"), u = t("../../../common/scripts/lib/error-handler"), d = [ "#E3EB0E", "#FF809A", "#74F750", "#56DEA8", "#A857FF" ], p = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.board = null;
e.truck = null;
e.dragPrefab = null;
e.dropPrefab = null;
e.dragTilePrefab = null;
e.tilePrefab = null;
e.dark = null;
e.light = null;
e.friendPos = null;
e.truckInAudio = null;
e.truckOutAudio = null;
e.friend = null;
e.currentConfig = null;
e.matchCount = 0;
e.boardContents = [ [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], [ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ], [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 ] ];
e.dragTiles = new Map();
e.colorMap = new Map();
return e;
}
e.prototype.onLoad = function() {
var t = this;
cc.director.getCollisionManager().enabled = !0;
this.currentConfig = this.processConfiguration(a.default.getInstance().data[0]);
s.Util.loadFriend(function(e) {
t.friend = e.getComponent(dragonBones.ArmatureDisplay);
t.friendPos.addChild(e);
t.friend.playAnimation("laugh", 1);
});
this.generateAllSingleSquares();
for (var e = Math.floor(this.currentConfig.columns.length / 10), o = null, r = null, n = 0; n < e; n++) for (var i = 0; i < 10; i++) {
var c = 10 * n + i + 1, u = new cc.Node(), p = u.addComponent(cc.Sprite);
u.x = 80 * i;
u.y = 80 * -n;
u.anchorX = 0;
u.anchorY = 1;
p.spriteFrame = n % 2 == 0 ? i % 2 == 0 ? this.dark : this.light : i % 2 == 0 ? this.light : this.dark;
this.board.addChild(u);
this.board.setPosition(new cc.Vec2(this.board.x, .75 * cc.winSize.height - (e - 1) * this.board.height));
var h = cc.instantiate(this.boardContents[n][i] < 0 ? this.dropPrefab : this.tilePrefab);
cc.log("tile.name", c.toString());
h.name = c.toString();
h.x = 80 * i;
h.y = 80 * -n;
this.board.addChild(h);
if (this.boardContents[n][i] < 0) {
if (!this.dragTiles.has(this.boardContents[n][i])) {
var f = cc.instantiate(this.dragTilePrefab);
cc.log("dragTile.name", (-this.boardContents[n][i]).toString());
f.name = (-this.boardContents[n][i]).toString();
this.dragTiles.set(this.boardContents[n][i], f);
this.colorMap.set(-this.boardContents[n][i], new cc.Color().fromHEX(d[Math.floor(Math.random() * d.length)]));
f.on("thirtypuzzleMatch", this.onMatch, this);
f.on("thirtypuzzleNoMatch", function() {
t.node.emit("wrong");
null != t.friend && t.friend.playAnimation("sad", 1);
});
if (null == o) {
o = f;
r = h;
}
}
this.addToDragTile(-this.boardContents[n][i], c, this.dragTiles.get(this.boardContents[n][i]));
}
}
var y = this.truck.x, g = s.Util.generatePositionsArray(700, 300, 100, 40);
new cc.Tween().target(this.truck).set({
x: cc.winSize.width
}).call(function() {
s.Util.playSfx(t.truckInAudio);
}).to(3, {
x: y
}, {
progress: null,
easing: "quadOut"
}).call(function() {
t.truck.getComponent(cc.Animation).stop();
var e = 0;
t.dragTiles.forEach(function(o, r) {
o.position = cc.v2(cc.winSize.width + 10, -cc.winSize.height / 8);
t.node.addChild(o);
new cc.Tween().target(o).delay(2 * Math.random()).to(.5, {
x: g[e].x,
y: g[e].y
}, {
progress: null,
easing: "sineOut"
}).start();
e++;
});
t.scheduleOnce(function() {
l.default.letDrag = !0;
s.Util.showHelp(o, r);
}, 2.5);
}).start();
};
e.prototype.processConfiguration = function(t) {
void 0 === t && (t = []);
var e = [].concat.apply([], t), o = e[0], r = e[1], n = e[2], i = e[3], c = e[4], a = e[5], l = e[6];
return {
level: o,
workSheet: r,
problem: n,
columns: i.split(",").map(function(t) {
return parseInt(t, 10);
}),
suggests: c.split(",").map(function(t) {
return parseInt(t, 10);
}),
isRandom: a,
problemNumber: l
};
};
e.prototype.onMatch = function() {
var t = this;
this.node.emit("correct");
null != this.friend && this.friend.playAnimation("happy", 1);
if (++this.matchCount >= this.dragTiles.size) {
this.truck.getComponent(cc.Animation).play();
new cc.Tween().target(this.truck).call(function() {
t.truckInAudio = s.Util.playSfx(t.truckAudio, !1, !0);
}).delay(2).call(function() {
s.Util.playSfx(t.truckOutAudio);
}).to(3, {
x: 2 * -cc.winSize.width
}, {
progress: null,
easing: "quadOut"
}).call(function() {
cc.audioEngine.stop(t.truckAudioId);
t.node.emit("nextProblem");
}).start();
}
};
e.prototype.addToDragTile = function(t, e, o) {
var r = cc.instantiate(this.dragPrefab);
r.name = e.toString();
r.x = 0;
r.y = 80 * (Math.floor((t - 1) / 10) - Math.floor((e - 1) / 10));
o.addChild(r);
o.width < r.x + 80 && (o.width = r.x + 80);
o.height < 80 - r.y && (o.height = 80 - r.y);
var n = r.getChildByName("sprite");
null != n && (n.color = this.colorMap.get(t));
};
e.prototype.generateAllSingleSquares = function() {
for (var t = Math.floor(this.currentConfig.columns.length / 10), e = 0; e < t; e++) for (var o = 0; o < 10; o++) {
var r = 10 * e + o, n = this.currentConfig.columns[r];
-1 !== this.currentConfig.suggests.indexOf(n) && (this.boardContents[e][o] = -this.boardContents[e][o]);
}
};
n([ c(cc.Node) ], e.prototype, "board", void 0);
n([ c(cc.Node) ], e.prototype, "truck", void 0);
n([ c(cc.Prefab) ], e.prototype, "dragPrefab", void 0);
n([ c(cc.Prefab) ], e.prototype, "dropPrefab", void 0);
n([ c(cc.Prefab) ], e.prototype, "dragTilePrefab", void 0);
n([ c(cc.Prefab) ], e.prototype, "tilePrefab", void 0);
n([ c(cc.SpriteFrame) ], e.prototype, "dark", void 0);
n([ c(cc.SpriteFrame) ], e.prototype, "light", void 0);
n([ c(cc.Node) ], e.prototype, "friendPos", void 0);
n([ c(cc.AudioClip) ], e.prototype, "truckInAudio", void 0);
n([ c(cc.AudioClip) ], e.prototype, "truckOutAudio", void 0);
n([ u.default() ], e.prototype, "onLoad", null);
return e = n([ i ], e);
}(cc.Component);
o.default = p;
cc._RF.pop();
}, {
"../../../common/scripts/drag": void 0,
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/error-handler": void 0,
"../../../common/scripts/util": void 0
} ],
thirtypuzzleboard: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "b585fpQEdZFCLsWaxi0XujG", "thirtypuzzleboard");
var r = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function r() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (r.prototype = o.prototype, new r());
};
}(), n = this && this.__decorate || function(t, e, o, r) {
var n, i = arguments.length, c = i < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, o) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, r); else for (var a = t.length - 1; a >= 0; a--) (n = t[a]) && (c = (i < 3 ? n(c) : i > 3 ? n(e, o, c) : n(e, o)) || c);
return i > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = t("../../../common/scripts/lib/config"), c = t("../../../common/scripts/util"), a = t("../../../common/scripts/lib/error-handler"), l = cc._decorator, s = l.ccclass, u = l.property, d = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.back = null;
e.front = null;
e.shadow = null;
e.left = null;
e.right = null;
e.match = null;
e.truck = null;
e.choice = null;
e.isMoving = !1;
e.cards = null;
e.choiceY = null;
return e;
}
e.prototype.onLoad = function() {
var t = this;
this.choiceY = this.choice.y;
this.choice.y = -cc.winSize.height;
var e = this.truck.x;
new cc.Tween().target(this.truck).set({
x: cc.winSize.width
}).to(3, {
x: e
}, {
progress: null,
easing: "quadOut"
}).call(function() {
t.truck.getComponent(cc.Animation).stop();
t.onIteration();
}).start();
this.node.on("nextIteration", function() {
t.onIteration();
});
};
e.prototype.onIteration = function() {
var t = this, e = i.default.dir + "games/findthematch/images/", o = i.default.getInstance().data[0], r = (o[0], 
o[1], o[2], o[3]), n = o[4], a = [ n, o[5], o[6], o[7] ];
this.cards = [];
c.Util.load(e + n, function(e, o) {
var r = new cc.Node();
r.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(o);
t.left.addChild(r);
});
for (var l = 0; l < parseInt(r); l++) this.cards.push(this.makeChoiceCard(e + a[l], l));
c.Util.shuffle(this.cards);
this.cards.forEach(function(e) {
t.choice.addChild(e);
});
new cc.Tween().target(this.choice).to(.25, {
y: this.choiceY
}, {
progress: null,
easing: "quadOut"
}).start();
};
e.prototype.makeChoiceCard = function(t, e) {
var o = this, r = new cc.Node(e.toString());
r.addComponent(cc.Sprite).spriteFrame = this.front;
var n = new cc.Node(), i = n.addComponent(cc.Sprite);
c.Util.load(t, function(t, e) {
i.spriteFrame = new cc.SpriteFrame(e);
});
r.addChild(n);
r.on("touchstart", function() {
if (!o.isMoving) {
o.isMoving = !0;
new cc.Tween().target(r).to(.5, {
position: r.convertToNodeSpaceAR(o.right.convertToWorldSpaceAR(cc.Vec2.ZERO))
}, null).call(function() {
0 == e ? o.node.emit("correct") : o.node.emit("wrong");
}).call(function() {
0 == e ? o.scheduleOnce(function() {
o.choice.removeAllChildren();
o.left.removeAllChildren();
o.isMoving = !1;
o.choice.y = -cc.winSize.height;
o.node.emit("nextProblem", !1);
}, 2) : new cc.Tween().target(r).to(.25, {
position: cc.Vec2.ZERO
}, {
progress: null,
easing: "quadOut"
}).call(function() {
o.isMoving = !1;
}).start();
}).start();
}
}, this);
var a = new cc.Node();
a.width = 168;
a.height = 200;
a.addChild(r);
return a;
};
n([ u(cc.SpriteFrame) ], e.prototype, "back", void 0);
n([ u(cc.SpriteFrame) ], e.prototype, "front", void 0);
n([ u(cc.SpriteFrame) ], e.prototype, "shadow", void 0);
n([ u(cc.Node) ], e.prototype, "left", void 0);
n([ u(cc.Node) ], e.prototype, "right", void 0);
n([ u(cc.Node) ], e.prototype, "match", void 0);
n([ u(cc.Node) ], e.prototype, "truck", void 0);
n([ u(cc.Node) ], e.prototype, "choice", void 0);
n([ a.default() ], e.prototype, "onLoad", null);
n([ a.default() ], e.prototype, "onIteration", null);
n([ a.default() ], e.prototype, "makeChoiceCard", null);
return e = n([ s ], e);
}(cc.Component);
o.default = d;
cc._RF.pop();
}, {
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/error-handler": void 0,
"../../../common/scripts/util": void 0
} ],
thirtypuzzledragtile: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "154c6pfZMpDy4D6AnFSfXly", "thirtypuzzledragtile");
var r = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function r() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (r.prototype = o.prototype, new r());
};
}(), n = this && this.__decorate || function(t, e, o, r) {
var n, i = arguments.length, c = i < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, o) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, r); else for (var a = t.length - 1; a >= 0; a--) (n = t[a]) && (c = (i < 3 ? n(c) : i > 3 ? n(e, o, c) : n(e, o)) || c);
return i > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = t("../../../common/scripts/drag"), c = t("../../../common/scripts/lib/error-handler"), a = cc._decorator, l = a.ccclass, s = (a.property, 
function(t) {
r(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.onTouchEnd = function(e) {
t.prototype.onTouchEnd.call(this, e);
if (this.match) this.node.emit("thirtypuzzleMatch", this); else {
this.node.emit("thirtypuzzleNoMatch");
var o = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO), r = this.node.getPosition(), n = !1;
if (o.x + this.node.width > cc.winSize.width) {
r.x -= o.x + this.node.width - cc.winSize.width;
n = !0;
} else if (o.x < 0) {
r.x -= o.x;
n = !0;
}
if (o.y > cc.winSize.height) {
r.y -= o.y - cc.winSize.height;
n = !0;
} else if (o.y - this.node.height < 0) {
r.y -= o.y - this.node.height;
n = !0;
}
n && new cc.Tween().target(this.node).to(.25, {
position: r
}, {
progress: null,
easing: "sineOut"
}).start();
}
};
n([ c.default() ], e.prototype, "onTouchEnd", null);
return e = n([ l ], e);
}(i.default));
o.default = s;
cc._RF.pop();
}, {
"../../../common/scripts/drag": void 0,
"../../../common/scripts/lib/error-handler": void 0
} ],
thirtypuzzletile: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "52320TDYzFGZJiyqDmSbA/8", "thirtypuzzletile");
var r = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function r() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (r.prototype = o.prototype, new r());
};
}(), n = this && this.__decorate || function(t, e, o, r) {
var n, i = arguments.length, c = i < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, o) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, r); else for (var a = t.length - 1; a >= 0; a--) (n = t[a]) && (c = (i < 3 ? n(c) : i > 3 ? n(e, o, c) : n(e, o)) || c);
return i > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = t("../../../common/scripts/lib/error-handler"), c = cc._decorator, a = c.ccclass, l = c.property, s = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.numberLabel = null;
return e;
}
e.prototype.onLoad = function() {
this.numberLabel.string = this.node.name;
};
n([ l(cc.Label) ], e.prototype, "numberLabel", void 0);
n([ i.default() ], e.prototype, "onLoad", null);
return e = n([ a ], e);
}(cc.Component);
o.default = s;
cc._RF.pop();
}, {
"../../../common/scripts/lib/error-handler": void 0
} ]
}, {}, [ "rowblocks", "thirtypuzzleboard", "thirtypuzzledragtile", "thirtypuzzletile" ]);