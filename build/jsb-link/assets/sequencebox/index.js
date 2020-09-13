window.__require = function t(e, o, n) {
function r(c, s) {
if (!o[c]) {
if (!e[c]) {
var a = c.split("/");
a = a[a.length - 1];
if (!e[a]) {
var l = "function" == typeof __require && __require;
if (!s && l) return l(a, !0);
if (i) return i(a, !0);
throw new Error("Cannot find module '" + c + "'");
}
c = a;
}
var u = o[c] = {
exports: {}
};
e[c][0].call(u.exports, function(t) {
return r(e[c][1][t] || t);
}, u, u.exports, t, e, o, n);
}
return o[c].exports;
}
for (var i = "function" == typeof __require && __require, c = 0; c < n.length; c++) r(n[c]);
return r;
}({
missingnumberdrag: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "6e907bK6XZOxJods+sqHYNw", "missingnumberdrag");
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
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var s = t.length - 1; s >= 0; s--) (r = t[s]) && (c = (i < 3 ? r(c) : i > 3 ? r(e, o, c) : r(e, o)) || c);
return i > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = t("../../../common/scripts/drag"), c = cc._decorator, s = c.ccclass, a = c.property, l = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.label = null;
e.missingNumber = null;
return e;
}
e.prototype.onTouchEnd = function(e) {
var o = this.isDragging;
t.prototype.onTouchEnd.call(this, e);
o && (this.match ? this.missingNumber.emit("missingNumberMatch", this) : this.missingNumber.emit("missingNumberNoMatch"));
};
r([ a(cc.Label) ], e.prototype, "label", void 0);
r([ a(cc.Node) ], e.prototype, "missingNumber", void 0);
return e = r([ s ], e);
}(i.default);
o.default = l;
cc._RF.pop();
}, {
"../../../common/scripts/drag": void 0
} ],
missingnumberdrop: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "ab052ZPDTRCCJUgtl+OEIUn", "missingnumberdrop");
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
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var s = t.length - 1; s >= 0; s--) (r = t[s]) && (c = (i < 3 ? r(c) : i > 3 ? r(e, o, c) : r(e, o)) || c);
return i > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = t("../../../common/scripts/drop"), c = cc._decorator, s = c.ccclass, a = c.property, l = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.label = null;
return e;
}
e.prototype.onLoad = function() {};
r([ a(cc.Label) ], e.prototype, "label", void 0);
return e = r([ s ], e);
}(i.default);
o.default = l;
cc._RF.pop();
}, {
"../../../common/scripts/drop": void 0
} ],
sequencebox: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "f23c3Abn3REVrlShtrbqkp2", "sequencebox");
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
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var s = t.length - 1; s >= 0; s--) (r = t[s]) && (c = (i < 3 ? r(c) : i > 3 ? r(e, o, c) : r(e, o)) || c);
return i > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = t("./missingnumberdrag"), c = t("../../../common/scripts/lib/config"), s = t("../../../common/scripts/util"), a = t("../../../common/scripts/drag"), l = t("../../../common/scripts/lib/error-handler"), u = cc._decorator, p = u.ccclass, d = u.property, f = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.singleCard = null;
e.singleDrop = null;
e.longCard = null;
e.longDrop = null;
e.box = null;
e.choices = null;
e.boxes = null;
e.dropClip = null;
e.answer = null;
e.answerBox = null;
e.empty = 0;
return e;
}
e.prototype.onLoad = function() {
var t = this;
cc.director.getCollisionManager().enabled = !0;
a.default.letDrag = !1;
this.node.on("missingNumberMatch", this.onMatch.bind(this));
this.node.on("missingNumberNoMatch", function() {
t.node.emit("wrong");
});
var e = c.default.getInstance().data[0], o = (e[0], e[1], e[2], e[3]), n = e[4], r = e[5], l = e[6], u = e[7], p = e[8], d = [ o, n, r, l ], f = [];
this.answer = p;
var h = 0, m = null;
d.forEach(function(e, o) {
var n = cc.instantiate(t.box);
if ("?" == e) {
var r = n.getChildByName("layout");
"" == u ? t.answer.split("").forEach(function(e) {
t.createDropBox(t.singleDrop, e, r);
}) : t.createDropBox(t.longDrop, t.answer, r);
m = r.children[r.childrenCount - 1];
t.answerBox = n;
} else {
n.getChildByName("label").getComponent(cc.Label).string = e;
}
t.boxes.addChild(n);
"?" != e && parseInt(e) <= 100 ? s.Util.loadNumericSound(e, function(t) {
f[o] = t;
}) : f[o] = null;
h += .5;
new cc.Tween().target(n).set({
y: cc.winSize.height
}).delay(h).to(.5, {
y: 0
}, {
progress: null,
easing: "cubicIn"
}).call(function() {
s.Util.playSfx(t.dropClip);
}).delay(h + 2).call(function() {
null != f[o] && s.Util.play(f[o], !1);
new cc.Tween().target(n).to(.25, {
scale: 1.1
}, {
progress: null,
easing: "sineOut"
}).to(.25, {
scale: 1
}, {
progress: null,
easing: "sineIn"
}).call(function() {
if (o + 1 == d.length) {
s.Util.showHelp(b, m);
a.default.letDrag = !0;
}
}).start();
}).start();
});
var g = [];
if ("" == u) for (var y = 0; y < 10; y++) g.push(y.toString()); else u.split(",").forEach(function(t) {
g.push(t.trim());
});
var b = null;
g.forEach(function(e) {
var o = cc.instantiate("" == u ? t.singleCard : t.longCard);
o.name = e;
var n = o.getComponent(i.default);
n.missingNumber = t.node;
n.label.string = e;
var r = new cc.Node();
r.width = o.width;
r.height = o.height;
r.addChild(o);
t.choices.addChild(r);
e == m.name && (b = o);
});
};
e.prototype.createDropBox = function(t, e, o) {
this.empty++;
var n = cc.instantiate(t);
n.name = e;
o.addChild(n);
};
e.prototype.onMatch = function() {
var t = this;
this.node.emit("correct");
if (--this.empty <= 0) {
this.answerBox.getChildByName("layout").active = !1;
this.answerBox.getChildByName("label").getComponent(cc.Label).string = this.answer;
var e = this.answerBox.getChildByName("particlesystem");
if (null != e) {
var o = e.getComponent(cc.ParticleSystem);
o.resetSystem();
this.scheduleOnce(function() {
o.stopSystem();
s.Util.loadFriend(function(e) {
var o = t.answerBox.getChildByName("character_node");
if (null != o) {
o.addChild(e);
var n = e.getComponent(dragonBones.ArmatureDisplay);
null != n && n.playAnimation("popup", 1);
var r = t.answerBox.getComponent(cc.Animation);
r.on("finished", function() {
t.node.emit("nextProblem");
});
r.play();
}
});
}, 3);
}
}
};
r([ d(cc.Prefab) ], e.prototype, "singleCard", void 0);
r([ d(cc.Prefab) ], e.prototype, "singleDrop", void 0);
r([ d(cc.Prefab) ], e.prototype, "longCard", void 0);
r([ d(cc.Prefab) ], e.prototype, "longDrop", void 0);
r([ d(cc.Prefab) ], e.prototype, "box", void 0);
r([ d(cc.Node) ], e.prototype, "choices", void 0);
r([ d(cc.Node) ], e.prototype, "boxes", void 0);
r([ d(cc.AudioClip) ], e.prototype, "dropClip", void 0);
r([ l.default() ], e.prototype, "onLoad", null);
r([ l.default() ], e.prototype, "onMatch", null);
return e = r([ p ], e);
}(cc.Component);
o.default = f;
cc._RF.pop();
}, {
"../../../common/scripts/drag": void 0,
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/error-handler": void 0,
"../../../common/scripts/util": void 0,
"./missingnumberdrag": "missingnumberdrag"
} ]
}, {}, [ "missingnumberdrag", "missingnumberdrop", "sequencebox" ]);