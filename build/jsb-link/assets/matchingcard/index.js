window.__require = function t(e, o, n) {
function r(c, a) {
if (!o[c]) {
if (!e[c]) {
var l = c.split("/");
l = l[l.length - 1];
if (!e[l]) {
var d = "function" == typeof __require && __require;
if (!a && d) return d(l, !0);
if (i) return i(l, !0);
throw new Error("Cannot find module '" + c + "'");
}
c = l;
}
var s = o[c] = {
exports: {}
};
e[c][0].call(s.exports, function(t) {
return r(e[c][1][t] || t);
}, s, s.exports, t, e, o, n);
}
return o[c].exports;
}
for (var i = "function" == typeof __require && __require, c = 0; c < n.length; c++) r(n[c]);
return r;
}({
matchingcard: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "07ee2NU7FFLYJWEUG++IlM9", "matchingcard");
var n = this && this.__extends || function() {
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
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(t, e, o, n) {
var r, i = arguments.length, c = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (c = (i < 3 ? r(c) : i > 3 ? r(e, o, c) : r(e, o)) || c);
return i > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = t("../../../common/scripts/lib/config"), c = t("../../../common/scripts/util"), a = t("../../../common/scripts/lib/error-handler"), l = cc._decorator, d = l.ccclass, s = l.property, u = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.back = null;
e.front = null;
e.shadow = null;
e.left = null;
e.right = null;
e.match = null;
e.truck = null;
e.friendPos = null;
e.choice = null;
e.isMoving = !1;
e.friend = null;
e.cards = null;
e.choiceY = null;
return e;
}
e.prototype.onLoad = function() {
var t = this;
c.Util.loadFriend(function(e) {
t.friend = e.getComponent(dragonBones.ArmatureDisplay);
t.friendPos.addChild(e);
t.friend.playAnimation("laugh", 1);
});
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
var t = this;
this.left.removeAllChildren();
this.right.removeAllChildren();
this.isMoving = !1;
this.choice.y = -cc.winSize.height;
var e = i.default.getInstance().data[0], o = (e[0], e[1], e[2], e[3]), n = e[4], r = [ n, e[5], e[6], e[7] ];
this.cards = [];
c.Util.loadTexture(n, function(e) {
var o = new cc.Node();
o.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(e);
t.left.addChild(o);
});
for (var a = null, l = 0; l < parseInt(o); l++) {
var d = this.makeChoiceCard(r[l], l);
this.cards.push(d);
0 == l && (a = d);
}
c.Util.shuffle(this.cards);
this.cards.forEach(function(e) {
t.choice.addChild(e);
});
new cc.Tween().target(this.choice).to(.25, {
y: this.choiceY
}, {
progress: null,
easing: "quadOut"
}).call(function() {
c.Util.showHelp(a, a);
}).start();
};
e.prototype.makeChoiceCard = function(t, e) {
var o = this, n = new cc.Node(e.toString());
n.addComponent(cc.Sprite).spriteFrame = this.front;
var r = new cc.Node(), a = r.addComponent(cc.Sprite);
c.Util.loadTexture(t, function(t) {
a.spriteFrame = new cc.SpriteFrame(t);
});
n.addChild(r);
n.on("touchstart", function() {
if (!o.isMoving) {
o.isMoving = !0;
new cc.Tween().target(n).to(.5, {
position: n.convertToNodeSpaceAR(o.right.convertToWorldSpaceAR(cc.Vec2.ZERO))
}, null).call(function() {
if (0 == e) {
o.node.emit("correct");
null != o.friend && o.friend.playAnimation("happy", 1);
o.scheduleOnce(function() {
n.removeFromParent(!1);
n.position = cc.Vec2.ZERO;
o.right.addChild(n);
o.choice.removeAllChildren();
var t = i.default.getInstance();
if (t.problem == t.totalProblems) {
o.truck.getComponent(cc.Animation).play();
new cc.Tween().target(o.truck).delay(1).to(2, {
x: 1.5 * -cc.winSize.width
}, {
progress: null,
easing: "quadOut"
}).call(function() {
o.node.emit("nextProblem", !0);
}).start();
} else o.node.emit("nextProblem", !1);
}, 1);
} else {
o.node.emit("wrong");
null != o.friend && o.friend.playAnimation("sad", 1);
new cc.Tween().target(n).to(.25, {
position: cc.Vec2.ZERO
}, {
progress: null,
easing: "quadOut"
}).call(function() {
o.isMoving = !1;
}).start();
}
}).start();
}
}, this);
var l = new cc.Node();
l.width = 168;
l.height = 200;
l.addChild(n);
return l;
};
r([ s(cc.SpriteFrame) ], e.prototype, "back", void 0);
r([ s(cc.SpriteFrame) ], e.prototype, "front", void 0);
r([ s(cc.SpriteFrame) ], e.prototype, "shadow", void 0);
r([ s(cc.Node) ], e.prototype, "left", void 0);
r([ s(cc.Node) ], e.prototype, "right", void 0);
r([ s(cc.Node) ], e.prototype, "match", void 0);
r([ s(cc.Node) ], e.prototype, "truck", void 0);
r([ s(cc.Node) ], e.prototype, "friendPos", void 0);
r([ s(cc.Node) ], e.prototype, "choice", void 0);
r([ a.default() ], e.prototype, "onLoad", null);
return e = r([ d ], e);
}(cc.Component);
o.default = u;
cc._RF.pop();
}, {
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/error-handler": void 0,
"../../../common/scripts/util": void 0
} ]
}, {}, [ "matchingcard" ]);