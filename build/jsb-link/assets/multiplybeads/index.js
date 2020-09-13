window.__require = function t(o, e, i) {
function r(c, s) {
if (!e[c]) {
if (!o[c]) {
var l = c.split("/");
l = l[l.length - 1];
if (!o[l]) {
var a = "function" == typeof __require && __require;
if (!s && a) return a(l, !0);
if (n) return n(l, !0);
throw new Error("Cannot find module '" + c + "'");
}
c = l;
}
var p = e[c] = {
exports: {}
};
o[c][0].call(p.exports, function(t) {
return r(o[c][1][t] || t);
}, p, p.exports, t, o, e, i);
}
return e[c].exports;
}
for (var n = "function" == typeof __require && __require, c = 0; c < i.length; c++) r(i[c]);
return r;
}({
multiplybeads: [ function(t, o, e) {
"use strict";
cc._RF.push(o, "ea638O900RBerCHTZ/pmM4m", "multiplybeads");
var i = this && this.__extends || function() {
var t = function(o, e) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, o) {
t.__proto__ = o;
} || function(t, o) {
for (var e in o) o.hasOwnProperty(e) && (t[e] = o[e]);
})(o, e);
};
return function(o, e) {
t(o, e);
function i() {
this.constructor = o;
}
o.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i());
};
}(), r = this && this.__decorate || function(t, o, e, i) {
var r, n = arguments.length, c = n < 3 ? o : null === i ? i = Object.getOwnPropertyDescriptor(o, e) : i;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, o, e, i); else for (var s = t.length - 1; s >= 0; s--) (r = t[s]) && (c = (n < 3 ? r(c) : n > 3 ? r(o, e, c) : r(o, e)) || c);
return n > 3 && c && Object.defineProperty(o, e, c), c;
};
Object.defineProperty(e, "__esModule", {
value: !0
});
var n = t("../../../common/scripts/lib/config"), c = t("../../../common/scripts/lib/error-handler"), s = t("../../../common/scripts/util"), l = cc._decorator, a = l.ccclass, p = l.property, u = function(t) {
i(o, t);
function o() {
var o = null !== t && t.apply(this, arguments) || this;
o.dragPrefab = null;
o.lamplabel = null;
o.progressMonitorPrefab = null;
o.dropPrefab = null;
o.resLabel = null;
o.block1 = null;
o.block2 = null;
o.block3 = null;
o.block4 = null;
o.block5 = null;
o.block6 = null;
o.block7 = null;
o.block8 = null;
o.block9 = null;
o.drop1 = null;
o.drop2 = null;
o.drop3 = null;
o.drop4 = null;
o.drop5 = null;
o.drop6 = null;
o.drop7 = null;
o.drop8 = null;
o.drop9 = null;
o.matchAud = null;
o.pickAud = null;
o.victoryAud = null;
o.preven = 0;
o.blockarr = [];
o.count = 0;
return o;
}
o.prototype.onLoad = function() {
var t = n.default.getInstance().data[0].toString().split(",").map(function(t) {
return /^\d*\.?\d+$/.test(t) ? Number(t) : t;
});
cc.log("field " + t);
this.level = t[0], this.worksheet = t[1], this.problem = t[2], this.multiplicand = t[3], 
this.multiplier = t[4], this.prod = t[5];
this.noOfDrag = parseInt(this.multiplier);
cc.log("led" + this.noOfDrag);
this.noOfDrop = parseInt(this.multiplier);
this.x0 = 200;
this.y0 = 0;
this.xoff = 0;
this.yoff = 0;
this.xdrop = -400;
this.dropArea = new Map();
var o = this.multiplicand.toString();
this.imgname = n.default.dir + "games/multiplication/texture/box" + o + "_multiplicationboard";
this.imgnameb = n.default.dir + "games/multiplication/texture/placeholder" + o + "_multiplicationboard";
this.numtomultiply = parseInt(this.multiplicand);
this.totalPieces = this.noOfDrag;
cc.log("lol" + this.imgname);
cc.log("put");
cc.log("led" + this.noOfDrag);
this.createLamps();
this.createDropArea();
this.totalPieces = this.noOfDrop;
var e = (n.default.dir, this.multiplicand.toString()), i = this.numtomultiply * this.noOfDrop;
this.temp = this.noOfDrag;
e = n.default.dir + "course/res/sound/numbervoice/d_" + this.multiplicand.toString() + ".mp3";
var r = n.default.dir + "course/res/sound/numbervoice/times.mp3", c = n.default.dir + "course/res/sound/numbervoice/d_" + this.multiplier.toString() + ".mp3", l = n.default.dir + "course/res/sound/numbervoice/equals.mp3", a = n.default.dir + "course/res/sound/numbervoice/d_" + i.toString() + ".mp3";
this.soundarr = [ e, r, c, l, a ];
this.multarrp = [ this.multiplicand, "X", this.multiplier, "=", this.prod ];
s.Util.showHelp(this.firstDrag, this.firstDrop);
this.a = 1;
};
o.prototype.createLamps = function() {
cc.log("drop ");
var t = cc.instantiate(this["block" + [ this.multiplicand ]]);
this.getRandomArbitrary(10, 20);
t.position = cc.v2(this.x0, this.y0);
this.numtomultiply > 6 && (t.scale = .8);
t.parent = this.node;
t.name = (0).toString();
this.firstDrag = t;
t.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
t.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
t.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
t.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
for (var o = 1; o <= 9; o++) if (o != this.noOfDrag) {
(e = cc.instantiate(this.lamplabel)).position = cc.v2(100 * o - 500, this.y0 + 330);
e.parent = this.node;
e.getChildByName("numburr").getComponent(cc.Label).string = o.toString();
} else {
var e;
(e = cc.instantiate(this.lamplabel)).position = cc.v2(100 * o - 500, this.y0 + 330);
e.parent = this.node;
e.getChildByName("numburr").getComponent(cc.Label).string = o.toString();
e.color = new cc.Color(255, 100, 100);
}
this.resultt = cc.instantiate(this.resLabel);
if (this.noOfDrop > 7) {
this.resultt.scaleX = 1.5;
this.resultt.getChildByName("disp").scaleX = .7;
}
this.resultt.position = cc.v2(0, -600);
this.resultt.parent = this.node;
var i = cc.moveTo(3, cc.v2(0, -300));
this.resultt.runAction(i);
};
o.prototype.getRandomArbitrary = function(t, o) {
return Math.random() * (o - t) + t;
};
o.prototype.createDropArea = function() {
cc.log("drop");
var t = cc.instantiate(this["drop" + [ this.multiplicand ]]);
t.color = new cc.Color(255, 255, 100);
t.position = cc.v2(this.xdrop, this.y0 + 50);
this.numtomultiply > 6 && (t.scale = .8);
t.parent = this.node;
this.dropArea.set((0).toString(), t.getBoundingBox());
this.firstDrop = t;
};
o.prototype.resultDisplay = function() {
var t = this;
new cc.Tween().target(this.node).to(1, {}, {
progress: null,
easing: "sineOutIn"
}).call(function() {
var o = cc.instantiate(t.lamplabel);
o.position = cc.v2(0, 0);
o.parent = t.node;
t.onTouchAudio(t.soundarr[t.count].toString());
}).start();
};
o.prototype.onTouchStart = function(t) {
if (0 == t.getID() && "a" != t.currentTarget.name) {
this.originalLocation = t.currentTarget.position;
s.Util.playSfx(this.pickAud);
1 == this.atend && (this.resultt.getChildByName("disp").getComponent(cc.Label).string = this.tempresultt + "+");
}
};
o.prototype.onTouchMove = function(t) {
if (0 == t.getID() && "a" != t.currentTarget.name) {
this.tstore = t.currentTarget.name;
t.currentTarget.position = t.currentTarget.getParent().convertToNodeSpaceAR(t.getLocation());
this.auther = 1;
}
};
o.prototype.onTouchEnd = function(t) {
if (0 == t.getID() && "a" != t.currentTarget.name) {
this.finalLocation = this.dropArea.get(this.tstore);
if (this.dropArea.get(this.tstore).intersects(t.currentTarget.getBoundingBox()) && 1 == this.auther) {
this.faceAnim = t.currentTarget.getChildByName("face").getComponent(cc.Animation);
this.faceAnim.play();
this.temp = this.temp - 1;
this.atend = 1;
this.auther = 0;
this.node.emit("correct");
s.Util.playSfx(this.matchAud);
var o = void 0;
t.currentTarget.position = cc.v2(this.xdrop, this.y0 + 50);
t.currentTarget.name = "a";
var e = (this.a * this.numtomultiply).toString();
this.finalval = e;
var i = n.default.dir + "course/res/sound/numbervoice/d_" + e + ".mp3";
this.a = this.a + 1;
cc.log("audi" + i);
this.resultt.getChildByName("disp").getComponent(cc.Label).string = this.resultt.getChildByName("disp").getComponent(cc.Label).string + this.numtomultiply;
this.tempresultt = this.resultt.getChildByName("disp").getComponent(cc.Label).string;
1 != this.noOfDrag && 2 != this.a && (this.resultt.getChildByName("disp").getComponent(cc.Label).string = this.resultt.getChildByName("disp").getComponent(cc.Label).string + "=" + e);
cc.audioEngine.isMusicPlaying() || s.Util.load(i, function(t, o) {
var e = this;
if (t || null === o) new cc.Tween().target(this.node).to(1, {}, {
progress: null,
easing: "sineOutIn"
}).call(function() {
e.match();
}).start(); else {
var i = cc.audioEngine.play(o, !1, 1);
cc.audioEngine.setFinishCallback(i, function() {
this.match();
}.bind(this));
}
}.bind(this));
if (this.temp > 0) {
cc.log("drop" + this.temp);
(o = cc.instantiate(this["drop" + [ this.multiplicand ]])).color = new cc.Color(255, 255, 100);
this.xdrop = this.xdrop + 100;
this.numtomultiply > 6 && (o.scale = .8);
o.position = cc.v2(this.xdrop, this.y0 + 50);
o.parent = this.node;
this.dropArea.set((0).toString(), o.getBoundingBox());
var r = cc.instantiate(this["block" + [ this.multiplicand ]]), c = this.getRandomArbitrary(10, 20);
r.position = cc.v2(this.x0 + this.temp * c, this.y0 + c);
this.numtomultiply > 6 && (r.scale = .8);
r.parent = this.node;
r.name = (0).toString();
r.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
r.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
r.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
r.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
}
} else {
var l = cc.moveTo(.5, cc.v2(this.originalLocation.x, this.originalLocation.y));
t.currentTarget.runAction(l);
this.node.emit("wrong");
}
}
};
o.prototype.onTouchAudio = function(t) {
cc.audioEngine.isMusicPlaying() || s.Util.load(t, function(t, o) {
var e = this;
if (t || null === o) new cc.Tween().target(this.node).to(1, {}, {
progress: null,
easing: "sineOutIn"
}).call(function() {
e.count++;
e.match();
}).start(); else if (5 != this.count) {
var i = cc.audioEngine.play(o, !1, 1);
cc.audioEngine.setFinishCallback(i, function() {
this.count++;
this.match();
}.bind(this));
}
}.bind(this));
};
o.prototype.match = function() {
var t = this;
if (--this.totalPieces <= 0) {
n.default.getInstance();
if (0 == this.preven) {
this.preven = 1;
this.resultt.getChildByName("disp").getComponent(cc.Label).string = "";
}
if (5 != this.count) {
this.resultt.getChildByName("disp").getComponent(cc.Label).string = this.resultt.getChildByName("disp").getComponent(cc.Label).string + this.multarrp[this.count] + "  ";
this.onTouchAudio(this.soundarr[this.count].toString());
}
4 == this.count && new cc.Tween().target(this.node).to(2, {}, {
progress: null,
easing: "sineOutIn"
}).call(function() {
cc.log("chk" + t.totalPieces);
s.Util.playSfx(t.victoryAud);
t.node.emit("nextProblem");
}).start();
}
};
r([ p(cc.Prefab) ], o.prototype, "dragPrefab", void 0);
r([ p(cc.Prefab) ], o.prototype, "lamplabel", void 0);
r([ p(cc.Prefab) ], o.prototype, "progressMonitorPrefab", void 0);
r([ p(cc.Prefab) ], o.prototype, "dropPrefab", void 0);
r([ p(cc.Prefab) ], o.prototype, "resLabel", void 0);
r([ p(cc.Prefab) ], o.prototype, "block1", void 0);
r([ p(cc.Prefab) ], o.prototype, "block2", void 0);
r([ p(cc.Prefab) ], o.prototype, "block3", void 0);
r([ p(cc.Prefab) ], o.prototype, "block4", void 0);
r([ p(cc.Prefab) ], o.prototype, "block5", void 0);
r([ p(cc.Prefab) ], o.prototype, "block6", void 0);
r([ p(cc.Prefab) ], o.prototype, "block7", void 0);
r([ p(cc.Prefab) ], o.prototype, "block8", void 0);
r([ p(cc.Prefab) ], o.prototype, "block9", void 0);
r([ p(cc.Prefab) ], o.prototype, "drop1", void 0);
r([ p(cc.Prefab) ], o.prototype, "drop2", void 0);
r([ p(cc.Prefab) ], o.prototype, "drop3", void 0);
r([ p(cc.Prefab) ], o.prototype, "drop4", void 0);
r([ p(cc.Prefab) ], o.prototype, "drop5", void 0);
r([ p(cc.Prefab) ], o.prototype, "drop6", void 0);
r([ p(cc.Prefab) ], o.prototype, "drop7", void 0);
r([ p(cc.Prefab) ], o.prototype, "drop8", void 0);
r([ p(cc.Prefab) ], o.prototype, "drop9", void 0);
r([ p({
type: cc.AudioClip
}) ], o.prototype, "matchAud", void 0);
r([ p({
type: cc.AudioClip
}) ], o.prototype, "pickAud", void 0);
r([ p({
type: cc.AudioClip
}) ], o.prototype, "victoryAud", void 0);
r([ c.default() ], o.prototype, "onLoad", null);
r([ c.default() ], o.prototype, "createLamps", null);
r([ c.default() ], o.prototype, "getRandomArbitrary", null);
r([ c.default() ], o.prototype, "createDropArea", null);
r([ c.default() ], o.prototype, "resultDisplay", null);
r([ c.default() ], o.prototype, "onTouchStart", null);
r([ c.default() ], o.prototype, "onTouchMove", null);
r([ c.default() ], o.prototype, "onTouchEnd", null);
r([ c.default() ], o.prototype, "onTouchAudio", null);
r([ c.default() ], o.prototype, "match", null);
return o = r([ a ], o);
}(cc.Component);
e.default = u;
cc._RF.pop();
}, {
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/error-handler": void 0,
"../../../common/scripts/util": void 0
} ]
}, {}, [ "multiplybeads" ]);