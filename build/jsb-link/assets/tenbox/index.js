window.__require = function t(o, e, r) {
function n(c, a) {
if (!e[c]) {
if (!o[c]) {
var s = c.split("/");
s = s[s.length - 1];
if (!o[s]) {
var u = "function" == typeof __require && __require;
if (!a && u) return u(s, !0);
if (i) return i(s, !0);
throw new Error("Cannot find module '" + c + "'");
}
c = s;
}
var p = e[c] = {
exports: {}
};
o[c][0].call(p.exports, function(t) {
return n(o[c][1][t] || t);
}, p, p.exports, t, o, e, r);
}
return e[c].exports;
}
for (var i = "function" == typeof __require && __require, c = 0; c < r.length; c++) n(r[c]);
return n;
}({
tenboxDrag: [ function(t, o, e) {
"use strict";
cc._RF.push(o, "c9dc7csF+lOZKHnRWOZ68WX", "tenboxDrag");
var r = this && this.__extends || function() {
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
function r() {
this.constructor = o;
}
o.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r());
};
}(), n = this && this.__decorate || function(t, o, e, r) {
var n, i = arguments.length, c = i < 3 ? o : null === r ? r = Object.getOwnPropertyDescriptor(o, e) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, o, e, r); else for (var a = t.length - 1; a >= 0; a--) (n = t[a]) && (c = (i < 3 ? n(c) : i > 3 ? n(o, e, c) : n(o, e)) || c);
return i > 3 && c && Object.defineProperty(o, e, c), c;
};
Object.defineProperty(e, "__esModule", {
value: !0
});
var i = t("../../../common/scripts/drag"), c = t("../../../common/scripts/drop"), a = t("../../../common/scripts/util"), s = cc._decorator, u = s.ccclass, p = s.property, l = function(t) {
r(o, t);
function o() {
var o = null !== t && t.apply(this, arguments) || this;
o.friendPos = null;
return o;
}
o.prototype.onLoad = function() {
var o = this;
t.prototype.onLoad.call(this);
a.Util.loadFriend(function(t) {
o.friend = t.getComponent(dragonBones.ArmatureDisplay);
o.friendPos.addChild(t);
o.friend.playAnimation("face_eating", 1);
});
};
o.prototype.onTouchStart = function(o) {
t.prototype.onTouchStart.call(this, o);
this.node.parent.parent.parent.zIndex = 1;
null != this.friend && this.friend.playAnimation("face_touch", 1);
};
o.prototype.onTouchEnd = function(o) {
t.prototype.onTouchEnd.call(this, o);
this.node.parent.parent.parent.zIndex = 0;
this.match || null != this.friend && this.friend.playAnimation("face_wrong", 1);
};
o.prototype.onMatchOver = function() {
this.isDragging = !1;
this.allowDrag = !0;
i.default.letDrag = !0;
var t = this.matchingNode, o = this.node.parent;
o.removeFromParent();
this.node.position = cc.Vec2.ZERO;
t.addChild(o);
t.getComponent(c.default).onMatchOver();
};
n([ p(cc.Node) ], o.prototype, "friendPos", void 0);
return o = n([ u ], o);
}(i.default);
e.default = l;
cc._RF.pop();
}, {
"../../../common/scripts/drag": void 0,
"../../../common/scripts/drop": void 0,
"../../../common/scripts/util": void 0
} ],
tenboxDrop: [ function(t, o, e) {
"use strict";
cc._RF.push(o, "b7851hBZftIEbGOjKvyr7Rx", "tenboxDrop");
var r = this && this.__extends || function() {
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
function r() {
this.constructor = o;
}
o.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r());
};
}(), n = this && this.__decorate || function(t, o, e, r) {
var n, i = arguments.length, c = i < 3 ? o : null === r ? r = Object.getOwnPropertyDescriptor(o, e) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, o, e, r); else for (var a = t.length - 1; a >= 0; a--) (n = t[a]) && (c = (i < 3 ? n(c) : i > 3 ? n(o, e, c) : n(o, e)) || c);
return i > 3 && c && Object.defineProperty(o, e, c), c;
};
Object.defineProperty(e, "__esModule", {
value: !0
});
var i = t("../../../common/scripts/drop"), c = cc._decorator, a = c.ccclass, s = c.property, u = function(t) {
r(o, t);
function o() {
var o = null !== t && t.apply(this, arguments) || this;
o.count = 0;
o.dropPrefab = null;
o.subPrefab = null;
o.cover = null;
o.seal = null;
return o;
}
o.prototype.onLoad = function() {
var t = this;
if (10 == this.count) this.closeCover(); else {
this.cover.active = !1;
this.seal.active = !1;
}
this.node.name = "A";
for (var o = 0; o < this.count; o++) {
var e = cc.instantiate(this.dropPrefab);
e.name = "A";
var r = new cc.Node();
r.height = e.height;
r.width = e.width;
r.addChild(e);
this.node.addChild(r);
}
this.node.on("child-added", function() {
if (++t.count >= 10) {
t.allowDrop = !1;
t.closeCover();
}
}, this);
this.node.on("child-removed", function() {
--t.count < 10 && (t.allowDrop = !0);
}, this);
};
o.prototype.closeCover = function() {
var t = this;
this.allowDrop = !1;
this.scheduleOnce(function() {
t.cover.active = !0;
t.seal.active = !0;
t.cover.on("touchstart", function() {
t.cover.active = !1;
t.seal.active = !1;
}, t);
new cc.Tween().target(t.seal).set({
scale: 2
}).to(.5, {
scale: 1
}, null).start();
}, 1);
};
n([ s ], o.prototype, "count", void 0);
n([ s(cc.Prefab) ], o.prototype, "dropPrefab", void 0);
n([ s(cc.Prefab) ], o.prototype, "subPrefab", void 0);
n([ s(cc.Node) ], o.prototype, "cover", void 0);
n([ s(cc.Node) ], o.prototype, "seal", void 0);
return o = n([ a ], o);
}(i.default);
e.default = u;
cc._RF.pop();
}, {
"../../../common/scripts/drop": void 0
} ],
tenboxSub: [ function(t, o, e) {
"use strict";
cc._RF.push(o, "1939fodrYRH1LqUcX6kHYjq", "tenboxSub");
var r = this && this.__extends || function() {
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
function r() {
this.constructor = o;
}
o.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r());
};
}(), n = this && this.__decorate || function(t, o, e, r) {
var n, i = arguments.length, c = i < 3 ? o : null === r ? r = Object.getOwnPropertyDescriptor(o, e) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, o, e, r); else for (var a = t.length - 1; a >= 0; a--) (n = t[a]) && (c = (i < 3 ? n(c) : i > 3 ? n(o, e, c) : n(o, e)) || c);
return i > 3 && c && Object.defineProperty(o, e, c), c;
};
Object.defineProperty(e, "__esModule", {
value: !0
});
var i = t("../../../common/scripts/drop"), c = cc._decorator, a = c.ccclass, s = c.property, u = function(t) {
r(o, t);
function o() {
var o = null !== t && t.apply(this, arguments) || this;
o.count = 0;
o.subLayout = null;
o.subPrefab = null;
return o;
}
o.prototype.onLoad = function() {
var t = this;
this.node.name = "A";
for (var o = 0; o < this.count; o++) {
var e = cc.instantiate(this.subPrefab);
e.name = "A";
var r = new cc.Node();
r.height = e.height;
r.width = e.width;
r.addChild(e);
this.subLayout.addChild(r);
}
this.node.on("child-added", function() {
if (t.node.childrenCount >= t.count) {
t.allowDrop = !1;
t.scheduleOnce(function() {
new cc.Tween().target(t.node.parent).to(.5, {
x: cc.winSize.width
}, null).start();
}, 1);
}
}, this);
this.node.on("child-removed", function() {
t.node.childrenCount < t.count && (t.allowDrop = !0);
}, this);
};
n([ s ], o.prototype, "count", void 0);
n([ s(cc.Node) ], o.prototype, "subLayout", void 0);
n([ s(cc.Prefab) ], o.prototype, "subPrefab", void 0);
return o = n([ a ], o);
}(i.default);
e.default = u;
cc._RF.pop();
}, {
"../../../common/scripts/drop": void 0
} ],
tenbox: [ function(t, o, e) {
"use strict";
cc._RF.push(o, "fe772XRpipECrBrs8ZjOHue", "tenbox");
var r = this && this.__extends || function() {
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
function r() {
this.constructor = o;
}
o.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r());
};
}(), n = this && this.__decorate || function(t, o, e, r) {
var n, i = arguments.length, c = i < 3 ? o : null === r ? r = Object.getOwnPropertyDescriptor(o, e) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, o, e, r); else for (var a = t.length - 1; a >= 0; a--) (n = t[a]) && (c = (i < 3 ? n(c) : i > 3 ? n(o, e, c) : n(o, e)) || c);
return i > 3 && c && Object.defineProperty(o, e, c), c;
};
Object.defineProperty(e, "__esModule", {
value: !0
});
var i = t("../../sequencebox/scripts/missingnumberdrag"), c = t("./tenboxDrop"), a = t("./tenboxSub"), s = t("../../../common/scripts/lib/config"), u = t("../../../common/scripts/drag"), p = t("../../../common/scripts/util"), l = t("../../../common/scripts/lib/error-handler"), d = cc._decorator, h = d.ccclass, f = d.property, b = function(t) {
r(o, t);
function o() {
var o = null !== t && t.apply(this, arguments) || this;
o.numberDrag = null;
o.numberDrop = null;
o.tenboxDrop = null;
o.tenboxSub = null;
o.numberDragLayout = null;
o.problemLayout = null;
o.boxLayout = null;
o.empty = 0;
return o;
}
o.prototype.onLoad = function() {
var t = this;
cc.director.getCollisionManager().enabled = !0;
u.default.letDrag = !1;
this.node.on("missingNumberMatch", this.onMatch.bind(this));
this.node.on("missingNumberNoMatch", function() {
t.node.emit("wrong");
});
var o = s.default.getInstance().data[0], e = (o[0], o[1], o[2], o[3]), r = o[4], n = o[5], c = parseInt(n);
if ("SUB" == e) {
var a = r.split("-");
this.addTenBoxes(!0, parseInt(a[0]), 2, 0);
this.addTenBoxes(!1, parseInt(a[1]), 2, 1);
} else {
var l = r.split("+");
l.forEach(function(o, e) {
t.addTenBoxes(!0, parseInt(o), l.length, e);
});
}
for (var d = 0; d < 10; d++) {
var h = cc.instantiate(this.numberDrag);
h.name = d.toString();
var f = h.getComponent(i.default);
f.missingNumber = this.node;
f.label.string = d.toString();
var b = new cc.Node();
b.width = h.width;
b.height = h.height;
b.addChild(h);
this.numberDragLayout.addChild(b);
}
var y = this.problemLayout.getChildByName("label");
if (null != y) {
y.getComponent(cc.Label).string = r + "=";
}
if (c > 9) {
this.createDropBox(this.numberDrop, Math.floor(c / 10).toString(), this.problemLayout);
this.createDropBox(this.numberDrop, (c % 10).toString(), this.problemLayout);
} else this.createDropBox(this.numberDrop, c.toString(), this.problemLayout);
var v = this.numberDragLayout.children[c % 10], m = this.problemLayout.children[this.problemLayout.childrenCount - 1];
p.Util.showHelp(v, m);
u.default.letDrag = !0;
};
o.prototype.addTenBoxes = function(t, o, e, r) {
if (o > 10) {
var n = this.createTenBox(t, 10, r, e);
n.y = n.height / 2 + 10;
this.boxLayout.addChild(n);
var i = this.createTenBox(t, o - 10, r, e);
i.y = -n.height / 2 - 10;
this.boxLayout.addChild(i);
} else this.boxLayout.addChild(this.createTenBox(t, o, r, e));
};
o.prototype.createTenBox = function(t, o, e, r) {
var n = cc.instantiate(t ? this.tenboxDrop : this.tenboxSub), i = n.getChildByName("layout");
if (t) {
i.getComponent(c.default).count = o;
} else {
i.getComponent(a.default).count = o;
}
n.x = (.5 + e - r / 2) * (n.width + 20);
return n;
};
o.prototype.createDropBox = function(t, o, e) {
this.empty++;
var r = cc.instantiate(t);
r.name = o;
e.addChild(r);
};
o.prototype.onMatch = function() {
this.node.emit("correct");
--this.empty <= 0 && this.node.emit("nextProblem");
};
n([ f(cc.Prefab) ], o.prototype, "numberDrag", void 0);
n([ f(cc.Prefab) ], o.prototype, "numberDrop", void 0);
n([ f(cc.Prefab) ], o.prototype, "tenboxDrop", void 0);
n([ f(cc.Prefab) ], o.prototype, "tenboxSub", void 0);
n([ f(cc.Node) ], o.prototype, "numberDragLayout", void 0);
n([ f(cc.Node) ], o.prototype, "problemLayout", void 0);
n([ f(cc.Node) ], o.prototype, "boxLayout", void 0);
n([ l.default() ], o.prototype, "onLoad", null);
return o = n([ h ], o);
}(cc.Component);
e.default = b;
cc._RF.pop();
}, {
"../../../common/scripts/drag": void 0,
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/error-handler": void 0,
"../../../common/scripts/util": void 0,
"../../sequencebox/scripts/missingnumberdrag": void 0,
"./tenboxDrop": "tenboxDrop",
"./tenboxSub": "tenboxSub"
} ]
}, {}, [ "tenbox", "tenboxDrag", "tenboxDrop", "tenboxSub" ]);