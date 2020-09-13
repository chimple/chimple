window.__require = function t(e, n, r) {
function o(c, a) {
if (!n[c]) {
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
var u = n[c] = {
exports: {}
};
e[c][0].call(u.exports, function(t) {
return o(e[c][1][t] || t);
}, u, u.exports, t, e, n, r);
}
return n[c].exports;
}
for (var i = "function" == typeof __require && __require, c = 0; c < r.length; c++) o(r[c]);
return o;
}({
taprise: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "3726fWjxaxNu6O6gihwo23+", "taprise");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), o = this && this.__decorate || function(t, e, n, r) {
var o, i = arguments.length, c = i < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, n, r); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (c = (i < 3 ? o(c) : i > 3 ? o(e, n, c) : o(e, n)) || c);
return i > 3 && c && Object.defineProperty(e, n, c), c;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = t("../../../common/scripts/lib/config"), c = t("../../../common/scripts/util"), a = t("../../../common/scripts/lib/error-handler"), l = cc._decorator, s = l.ccclass, u = l.property, h = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.bubble = null;
e.friendPos = null;
e.touchAudio = null;
e.ai = 0;
e.countArr = [ 0, 10, 10, 1 ];
e.tap = [ 0, 1, 1, 100 ];
e.touchcount = 0;
e.destroyCount = 0;
e.touchArray = [ 0, 0, 0, 0, 0 ];
e.shouldTouch = !0;
e.shouldGen = !0;
e.endofgame = 0;
e.genval = 0;
e.auther = 1;
return e;
}
e.prototype.onLoad = function() {
var t = i.default.getInstance().data[0].toString().split(",").map(function(t) {
return /^\d*\.?\d+$/.test(t) ? Number(t) : t;
});
cc.log("field " + t);
this.nameOfGame = t[0], this.lev = t[1], this.description = t[2], this.level = t[3], 
this.worksheet = t[4], this.problem = t[5], this.objb = t[6];
this.noobj = parseInt(this.objb);
cc.log("obj" + this.noobj);
for (;this.ai < this.noobj; this.ai++) this.generateObj(0);
this.x = 0;
this.y = 100;
this.levelint = parseInt(this.level);
cc.log("lvl" + this.levelint);
this.problemint = parseInt(this.problem);
c.Util.showHelp(this.firstDrag, this.firstDrop);
};
e.prototype.generateObj = function(t) {
var e = this;
cc.log("boop");
c.Util.loadFriend(function(t) {
console.log(e.genval, "ai");
e.objin = cc.instantiate(e.bubble);
var n = e.getRandomArbitrary(-170, 170);
e.objin.parent = e.node;
if (0 == e.ai) {
e.firstDrag = e.objin;
e.firstDrop = e.objin;
}
e.objin.on(cc.Node.EventType.TOUCH_START, e.onTouchStart, e);
e.objin.on(cc.Node.EventType.TOUCH_END, e.onTouchEnd, e);
e.objin.on(cc.Node.EventType.TOUCH_CANCEL, e.onTouchEnd, e);
var r = e.objin.getChildByName("charnode");
if (null != r) {
e.dc = t.getComponent(dragonBones.ArmatureDisplay);
r.addChild(t);
var o = 200 * e.genval - 400;
cc.log("xcor" + o);
e.objin.position = cc.v2(o, n);
e.objin.name = e.genval.toString();
e.genval = e.genval + 1;
}
});
};
e.prototype.getRandomArbitrary = function(t, e) {
return Math.floor(Math.random() * (e - t) + t);
};
e.prototype.onTouchStart = function(t) {
var e = this;
if (this.shouldTouch && this.shouldGen && 0 == t.getID()) {
cc.log("yx" + t.currentTarget.y);
this.namee = t.currentTarget.name;
if (3 != this.levelint) {
var n = cc.moveTo(2, cc.v2(t.currentTarget.x, t.currentTarget.y = t.currentTarget.y + 10));
t.currentTarget.runAction(n);
}
this.shouldTouch = !1;
if ("a" != t.currentTarget.name && 1 != this.endofgame) {
t.currentTarget.zIndex = 1;
this.node.emit("correct");
this.charNode = t.currentTarget.getChildByName("charnode");
cc.log("qw" + this.touchArray[this.namee]);
cc.log("namee" + this.namee);
if (3 != this.levelint) {
t.currentTarget.getChildByName("cardParticlea").opacity = 255;
t.currentTarget.getChildByName("cardParticleb").opacity = 255;
t.currentTarget.getChildByName("flyboard").getComponent(cc.Animation).play();
setTimeout(function() {
t.currentTarget.getChildByName("cardParticlea").opacity = 0;
t.currentTarget.getChildByName("cardParticleb").opacity = 0;
t.currentTarget.getChildByName("flyboard").getComponent(cc.Animation).stop();
}, 500);
setTimeout(function() {
e.shouldTouch = !0;
}, 700);
this.timing = .3;
this.getRandomArbitrary(1, 5);
var r = "labcenter";
cc.log(r + "xran");
var o = t.currentTarget.getChildByName(r);
if (null != o) {
o.getComponent(cc.Label).string = (this.touchArray[parseInt(this.namee)] = this.touchArray[parseInt(this.namee)] + 1).toString();
cc.log("result" + this.touchArray[parseInt(this.namee)]);
if (10 == this.touchArray[parseInt(this.namee)]) {
t.currentTarget.getChildByName("res").getComponent(cc.Label).string = (10 * this.problemint).toString();
var i = cc.moveTo(3, cc.v2(0, 1500));
t.currentTarget.runAction(i);
t.currentTarget.getChildByName("cardParticlea").opacity = 255;
t.currentTarget.getChildByName("cardParticleb").opacity = 255;
}
}
} else 3 == this.levelint && (this.timing = .7);
new cc.Tween().target(this.node).to(this.timing, {}, {
progress: null,
easing: "sineOutIn"
}).call(function() {
var e = t.currentTarget.getChildByName(r);
null != e && (e.getComponent(cc.Label).string = "");
}).start();
}
}
};
e.prototype.onTouchEnd = function(t) {
var e = this;
if (0 == t.getID()) {
cc.log("lol" + t.currentTarget.name);
t.currentTarget.zIndex = 0;
if (this.touchArray[parseInt(this.namee)] == this.countArr[this.levelint] && 3 != this.levelint && 1 != this.endofgame) {
cc.log("this" + this.touchArray[parseInt(this.namee)]);
if (3 != this.levelint) {
this.shouldTouch = !0;
t.currentTarget.getChildByName("flyboard").getComponent(cc.Animation).play();
t.currentTarget.getChildByName("cardParticle").opacity = 255;
}
t.currentTarget.name = "a";
this.destroyCount++;
if (this.destroyCount == this.tap[this.levelint]) {
this.endofgame = 1;
cc.log("charge" + this.destroyCount + this.tap[this.levelint]);
new cc.Tween().target(this.node).to(.5, {}, {
progress: null,
easing: "sineOutIn"
}).call(function() {
e.node.emit("nextProblem");
}).start();
}
} else if (3 == this.levelint && "a" != t.currentTarget.name && 1 != this.endofgame && this.shouldGen) {
this.shouldGen = !1;
var n = void 0;
n = this.touchcount % 10 == 0 ? 3 : 2;
var r = cc.moveTo(n, cc.v2(0, 1e3));
setTimeout(function() {
e.shouldGen = !0;
e.shouldTouch = !0;
}, 2e3);
t.currentTarget.runAction(r);
t.currentTarget.zIndex = 3;
t.currentTarget.name = "a";
if (this.touchcount % 10 == 0) {
t.currentTarget.getChildByName("cardParticle").opacity = 255;
t.currentTarget.getChildByName("flyboard").getComponent(cc.Animation).play();
}
t.currentTarget.getChildByName("cardParticlea").opacity = 255;
t.currentTarget.getChildByName("cardParticleb").opacity = 255;
t.currentTarget.getChildByName("flyboard").getComponent(cc.Animation).play();
cc.log("me100");
this.timing = .7;
cc.log("labcenterlabval");
var o = t.currentTarget.getChildByName("labcenter");
if (null != o) {
this.touchcount = this.touchcount + 1;
if (this.touchcount % 10 != 0) {
o.getComponent(cc.Label).string = this.touchcount.toString();
t.currentTarget.getChildByName("res").getComponent(cc.Label).string = this.touchcount.toString();
}
this.touchcount % 10 == 0 && (t.currentTarget.getChildByName("res").getComponent(cc.Label).string = this.touchcount.toString());
}
new cc.Tween().target(this.node).to(2, {}, {
progress: null,
easing: "sineOutIn"
}).call(function() {
e.auther = 1;
e.shouldTouch = !0;
var t = parseInt(e.namee);
cc.log("imi" + t);
e.objin = cc.instantiate(e.bubble);
var n = e.getRandomArbitrary(-250, 250), r = 150 * t - 300 + e.getRandomArbitrary(-70, 100);
e.objin.position = cc.v2(r, n);
e.objin.parent = e.node;
e.objin.name = t.toString();
c.Util.loadFriend(function(t) {
var n = e.objin.getChildByName("charnode");
if (null != n) {
n.addChild(t);
e.db = t.getComponent(dragonBones.ArmatureDisplay);
}
});
e.objin.on(cc.Node.EventType.TOUCH_START, e.onTouchStart, e);
e.objin.on(cc.Node.EventType.TOUCH_END, e.onTouchEnd, e);
e.objin.on(cc.Node.EventType.TOUCH_CANCEL, e.onTouchEnd, e);
}).start();
this.destroyCount++;
if (this.destroyCount == this.tap[this.levelint]) {
cc.log("charge" + this.destroyCount + this.tap[this.levelint]);
this.endofgame = 1;
new cc.Tween().target(this.node).to(.5, {}, {
progress: null,
easing: "sineOutIn"
}).call(function() {
e.node.emit("nextProblem");
}).start();
}
}
}
};
o([ u(cc.Prefab) ], e.prototype, "bubble", void 0);
o([ u(cc.Node) ], e.prototype, "friendPos", void 0);
o([ u({
type: cc.AudioClip
}) ], e.prototype, "touchAudio", void 0);
o([ a.default() ], e.prototype, "onLoad", null);
o([ a.default() ], e.prototype, "generateObj", null);
o([ a.default() ], e.prototype, "getRandomArbitrary", null);
o([ a.default() ], e.prototype, "onTouchStart", null);
o([ a.default() ], e.prototype, "onTouchEnd", null);
return e = o([ s ], e);
}(cc.Component);
n.default = h;
cc._RF.pop();
}, {
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/error-handler": void 0,
"../../../common/scripts/util": void 0
} ]
}, {}, [ "taprise" ]);