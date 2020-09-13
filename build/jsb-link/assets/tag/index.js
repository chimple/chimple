window.__require = function t(e, o, n) {
function i(c, a) {
if (!o[c]) {
if (!e[c]) {
var l = c.split("/");
l = l[l.length - 1];
if (!e[l]) {
var s = "function" == typeof __require && __require;
if (!a && s) return s(l, !0);
if (r) return r(l, !0);
throw new Error("Cannot find module '" + c + "'");
}
c = l;
}
var d = o[c] = {
exports: {}
};
e[c][0].call(d.exports, function(t) {
return i(e[c][1][t] || t);
}, d, d.exports, t, e, o, n);
}
return o[c].exports;
}
for (var r = "function" == typeof __require && __require, c = 0; c < n.length; c++) i(n[c]);
return i;
}({
label: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "bd504The1JKtZtqVts+d1wS", "label");
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
}(), i = this && this.__decorate || function(t, e, o, n) {
var i, r = arguments.length, c = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (i = t[a]) && (c = (r < 3 ? i(c) : r > 3 ? i(e, o, c) : i(e, o)) || c);
return r > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var r = t("../../../common/scripts/lib/config"), c = t("./tag"), a = t("../../../common/scripts/lib/error-handler"), l = cc._decorator, s = l.ccclass, d = (l.property, 
function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.homePos = null;
return e;
}
e.prototype.onDestroy = function() {
this.node.off("touchstart", this.onTouchStart, this);
this.node.off("touchend", this.onTouchEnd, this);
this.node.off("touchmove", this.onTouchMove, this);
this.node.off("touchcancel", this.onTouchEnd, this);
};
e.prototype.scaleLabel = function(t) {
if (r.default.i.direction == r.Direction.RTL) {
this.node.scaleX = -t;
this.node.getChildByName("text").scaleX = -1;
} else this.node.scale = t;
};
e.prototype.onTouchStart = function(t) {
if (0 == t.getID()) {
this.scaleLabel(1.1);
this.node.parent.getComponent(c.default).onTouchAudio(this.audioName);
}
};
e.prototype.onTouchMove = function(t) {
0 == t.getID() && this.node.setPosition(this.node.position.add(t.getDelta()));
};
e.prototype.handleNodeTouch = function(t) {
if ("off" == t) {
this.node.off("touchstart", this.onTouchStart, this);
this.node.off("touchend", this.onTouchEnd, this);
this.node.off("touchmove", this.onTouchMove, this);
this.node.off("touchcancel", this.onTouchEnd, this);
} else if ("on" == t) {
this.node.on("touchstart", this.onTouchStart, this);
this.node.on("touchend", this.onTouchEnd, this);
this.node.on("touchmove", this.onTouchMove, this);
this.node.on("touchcancel", this.onTouchEnd, this);
}
};
e.prototype.onTouchEnd = function(t) {
var e = this;
cc.log("touchend " + t.getID());
this.handleNodeTouch("off");
var o = this.node.parent.getComponent(c.default), n = !1;
this.node.parent.getChildByName("truck").getChildByName("container").children.forEach(function(o) {
null != o && o.name != "dropBox_" + e.node.name && o.getBoundingBoxToWorld().contains(t.getLocation()) && (n = !0);
});
n && this.node.parent.emit("wrong");
if (null != this.node.parent.getChildByName("truck").getChildByName("container").getChildByName("dropBox_" + this.node.name) && this.node.parent.getChildByName("truck").getChildByName("container").getChildByName("dropBox_" + this.node.name).getBoundingBoxToWorld().contains(t.getLocation())) {
cc.log("hi");
var i = this.node.parent.getChildByName("truck").getChildByName("container").getChildByName("dropBox_" + this.node.name);
this.scaleLabel(1);
this.node.parent = null;
this.node.parent = i.parent;
this.node.position = i.position;
i.removeFromParent(!1);
this.node.parent.parent.parent.emit("correct");
o.complete--;
o.match();
} else {
this.scaleLabel(1);
new cc.Tween().target(this.node).to(.7, {
position: this.homePos
}, {
progress: null,
easing: "sineOut"
}).call(function() {
e.handleNodeTouch("on");
}).start();
}
};
i([ a.catchError() ], e.prototype, "onDestroy", null);
i([ a.catchError() ], e.prototype, "scaleLabel", null);
i([ a.catchError() ], e.prototype, "onTouchStart", null);
i([ a.catchError() ], e.prototype, "onTouchMove", null);
i([ a.catchError() ], e.prototype, "handleNodeTouch", null);
i([ a.catchError() ], e.prototype, "onTouchEnd", null);
return e = i([ s ], e);
}(cc.Component));
o.default = d;
cc._RF.pop();
}, {
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/error-handler": void 0,
"./tag": "tag"
} ],
tag: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "2a21a3wccNEzq61A63XMdBW", "tag");
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
}(), i = this && this.__decorate || function(t, e, o, n) {
var i, r = arguments.length, c = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (i = t[a]) && (c = (r < 3 ? i(c) : r > 3 ? i(e, o, c) : i(e, o)) || c);
return r > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var r = t("../../../common/scripts/lib/config"), c = t("./label"), a = t("../../../common/scripts/util"), l = t("../../../common/scripts/lib/error-handler"), s = cc._decorator, d = s.ccclass, u = s.property, h = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.dropNodePrefab = null;
e.queNodePrefab = null;
e.label0Prefab = null;
e.label1Prefab = null;
e.label2Prefab = null;
e.label3Prefab = null;
e.label4Prefab = null;
e.label5Prefab = null;
e.labelAudio = null;
e.truck = null;
e.friendPos = null;
e.friend = null;
e.totalPieces = 0;
e.complete = 0;
return e;
}
e.prototype.onLoad = function() {
var t = this;
this.node.opacity = 0;
this.totalPieces--;
this.quePos = new Map();
this.queAudio = new Map();
var e = r.default.getInstance().data[0], o = e[3], n = null, i = null;
a.Util.loadTexture(o, function(o) {
t.node.opacity = 255;
var l = new cc.SpriteFrame(o);
l.setRect(new cc.Rect(60, 60, 1580, 1300));
t.node.getChildByName("truck").getChildByName("container").getComponent(cc.Sprite).spriteFrame = l;
t.node.getChildByName("truck").getChildByName("container").opacity = 255;
for (var s, d = function(o, n) {
if ("" == e[o + 1]) return s = o, "break";
for (var r = cc.instantiate(t.dropNodePrefab), c = "", l = e[++o].split("/"), d = 0; d < l.length; d++) c = c.concat(l[d]);
var u = e[++o].split("."), h = e[o + 1];
t.queAudio.set(c, h);
r.name = "dropBox_" + c;
r.getChildByName("drop_label_labelling").height += 20;
r.getChildByName("drop_label_labelling").width += 15;
t.node.getChildByName("truck").getChildByName("container").addChild(r);
r.opacity = 0;
r.position = cc.v3(+u[0] / 2.27 - 340, - +u[1] / 1.92 - 490);
0 == n && (i = r);
r.getChildByName("drop_label_labelling").getComponent(cc.Animation);
setTimeout(function() {
if (null != t.node) {
r.getChildByName("drop_label_labelling").getComponent(cc.Animation).play();
a.Util.playSfx(t.labelAudio);
r.opacity = 255;
}
}, 3e3 * Math.random() + 2e3);
s = o;
}, u = 3, h = 0; u < e.length - 1; u++, h++) {
var p = d(u, h);
u = s;
if ("break" === p) break;
}
var f = t.truck.x;
new cc.Tween().target(t.truck).set({
x: cc.winSize.width
}).to(3, {
x: f
}, {
progress: null,
easing: "quadOut"
}).call(function() {
t.truck.getComponent(cc.Animation).stop();
for (var o = 3, i = 0; o < e.length - 1 && "" != e[o + 1]; o += 2, i++) {
var a = cc.instantiate(t.queNodePrefab), l = void 0;
switch (i % 6) {
case 0:
l = cc.instantiate(t.label0Prefab);
break;

case 1:
l = cc.instantiate(t.label1Prefab);
break;

case 2:
l = cc.instantiate(t.label2Prefab);
break;

case 3:
l = cc.instantiate(t.label3Prefab);
break;

case 4:
l = cc.instantiate(t.label4Prefab);
break;

case 5:
l = cc.instantiate(t.label5Prefab);
}
for (var s = "", d = e[++o].split("/"), u = 0; u < d.length; u++) s = s.concat(d[u]);
a.name = "text";
a.getComponent(cc.Label).string = e[o];
a.getComponent(cc.Label).fontSize = 45;
l.name = s;
t.complete++;
l.addChild(a);
l.height += 20;
l.width += 15;
0 == i && (n = l);
var h = l.getComponent(c.default);
l.name = s;
t.node.addChild(l);
a.zIndex = 1;
l.position = cc.v2(.75 * cc.winSize.width / 2, l.y - 85 * i - 100);
h.homePos = l.position;
h.audioName = t.queAudio.get(s);
if (r.default.i.direction == r.Direction.RTL) {
a.getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.RIGHT;
l.scaleX = -1;
l.getChildByName("text").scaleX = -1;
}
}
}).start();
t.scheduleOnce(function() {
a.Util.showHelp(n, i);
t.node.getComponentsInChildren(c.default).forEach(function(t) {
t.handleNodeTouch("on");
});
}, 5);
});
a.Util.loadFriend(function(e) {
t.friend = e.getComponent(dragonBones.ArmatureDisplay);
t.friendPos.addChild(e);
t.friend.playAnimation("face_happy", 2);
t.friendPos.scale = .5;
});
};
e.prototype.match = function() {
var t = this;
if (0 == this.complete && --this.totalPieces <= 0) {
cc.log("label game finish");
new cc.Tween().target(this.truck).delay(1).to(1.5, {
x: this.truck.x - cc.winSize.width
}, {
progress: null,
easing: "quadOut"
}).call(function() {
return t.node.emit("nextProblem");
}).start();
}
};
e.prototype.onDestroy = function() {
cc.audioEngine.stopAllEffects();
};
e.prototype.onTouchAudio = function(t) {
cc.log("Audio " + t + this.complete);
if (!cc.audioEngine.isMusicPlaying()) {
cc.log("Child Audio " + t + this.complete);
a.Util.loadGameSound(t, function(t) {
try {
cc.audioEngine.play(t, !1, 1);
} catch (t) {
cc.log("Audio Error : " + t);
}
});
}
};
i([ u(cc.Prefab) ], e.prototype, "dropNodePrefab", void 0);
i([ u(cc.Prefab) ], e.prototype, "queNodePrefab", void 0);
i([ u(cc.Prefab) ], e.prototype, "label0Prefab", void 0);
i([ u(cc.Prefab) ], e.prototype, "label1Prefab", void 0);
i([ u(cc.Prefab) ], e.prototype, "label2Prefab", void 0);
i([ u(cc.Prefab) ], e.prototype, "label3Prefab", void 0);
i([ u(cc.Prefab) ], e.prototype, "label4Prefab", void 0);
i([ u(cc.Prefab) ], e.prototype, "label5Prefab", void 0);
i([ u({
type: cc.AudioClip
}) ], e.prototype, "labelAudio", void 0);
i([ u(cc.Node) ], e.prototype, "truck", void 0);
i([ u(cc.Node) ], e.prototype, "friendPos", void 0);
i([ l.catchError() ], e.prototype, "onLoad", null);
i([ l.catchError() ], e.prototype, "match", null);
i([ l.catchError() ], e.prototype, "onDestroy", null);
i([ l.catchError() ], e.prototype, "onTouchAudio", null);
return e = i([ d ], e);
}(cc.Component);
o.default = h;
cc._RF.pop();
}, {
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/error-handler": void 0,
"../../../common/scripts/util": void 0,
"./label": "label"
} ]
}, {}, [ "label", "tag" ]);