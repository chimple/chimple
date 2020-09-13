window.__require = function t(o, r, e) {
function i(c, l) {
if (!r[c]) {
if (!o[c]) {
var s = c.split("/");
s = s[s.length - 1];
if (!o[s]) {
var a = "function" == typeof __require && __require;
if (!l && a) return a(s, !0);
if (n) return n(s, !0);
throw new Error("Cannot find module '" + c + "'");
}
c = s;
}
var u = r[c] = {
exports: {}
};
o[c][0].call(u.exports, function(t) {
return i(o[c][1][t] || t);
}, u, u.exports, t, o, r, e);
}
return r[c].exports;
}
for (var n = "function" == typeof __require && __require, c = 0; c < e.length; c++) i(e[c]);
return i;
}({
phonictractor_drag: [ function(t, o, r) {
"use strict";
cc._RF.push(o, "e4098tLChNJ3qDgl7RyRMjd", "phonictractor_drag");
var e = this && this.__extends || function() {
var t = function(o, r) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, o) {
t.__proto__ = o;
} || function(t, o) {
for (var r in o) o.hasOwnProperty(r) && (t[r] = o[r]);
})(o, r);
};
return function(o, r) {
t(o, r);
function e() {
this.constructor = o;
}
o.prototype = null === r ? Object.create(r) : (e.prototype = r.prototype, new e());
};
}(), i = this && this.__decorate || function(t, o, r, e) {
var i, n = arguments.length, c = n < 3 ? o : null === e ? e = Object.getOwnPropertyDescriptor(o, r) : e;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, o, r, e); else for (var l = t.length - 1; l >= 0; l--) (i = t[l]) && (c = (n < 3 ? i(c) : n > 3 ? i(o, r, c) : i(o, r)) || c);
return n > 3 && c && Object.defineProperty(o, r, c), c;
};
Object.defineProperty(r, "__esModule", {
value: !0
});
var n = t("../../../common/scripts/lib/error-handler"), c = t("../../../common/scripts/drag"), l = cc._decorator, s = l.ccclass, a = (l.property, 
function(t) {
e(o, t);
function o() {
return null !== t && t.apply(this, arguments) || this;
}
o.prototype.onTouchEnd = function(o) {
t.prototype.onTouchEnd.call(this, o);
this.match ? this.node.emit("phonicTractorMatch", this) : this.node.emit("phonicTractorNoMatch");
};
i([ n.catchError() ], o.prototype, "onTouchEnd", null);
return o = i([ s ], o);
}(c.default));
r.default = a;
cc._RF.pop();
}, {
"../../../common/scripts/drag": void 0,
"../../../common/scripts/lib/error-handler": void 0
} ],
phonictractor: [ function(t, o, r) {
"use strict";
cc._RF.push(o, "5bfc5YJVeVKdpzUCaJg9HZ5", "phonictractor");
var e = this && this.__extends || function() {
var t = function(o, r) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, o) {
t.__proto__ = o;
} || function(t, o) {
for (var r in o) o.hasOwnProperty(r) && (t[r] = o[r]);
})(o, r);
};
return function(o, r) {
t(o, r);
function e() {
this.constructor = o;
}
o.prototype = null === r ? Object.create(r) : (e.prototype = r.prototype, new e());
};
}(), i = this && this.__decorate || function(t, o, r, e) {
var i, n = arguments.length, c = n < 3 ? o : null === e ? e = Object.getOwnPropertyDescriptor(o, r) : e;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, o, r, e); else for (var l = t.length - 1; l >= 0; l--) (i = t[l]) && (c = (n < 3 ? i(c) : n > 3 ? i(o, r, c) : i(o, r)) || c);
return n > 3 && c && Object.defineProperty(o, r, c), c;
};
Object.defineProperty(r, "__esModule", {
value: !0
});
var n = t("../../../common/scripts/lib/config"), c = t("../../../common/scripts/util"), l = t("./phonictractor_drag"), s = t("../../../common/scripts/lib/error-handler"), a = cc._decorator, u = a.ccclass, p = a.property, h = function(t) {
e(o, t);
function o() {
var o = null !== t && t.apply(this, arguments) || this;
o.truckNode = null;
o.trolleyPrefab = null;
o.boxPrefab = null;
o.metalAudio = null;
o.truckInAudio = null;
o.truckOutAudio = null;
o.friendPos = null;
o.friend = null;
o.trolley = [];
o.box = null;
o.count = 1;
o.totalPieces = 0;
o.finishTruckMoveTo = -2e3;
o.firstDrag = null;
o.firstDrop = null;
o._isRTL = !1;
return o;
}
o.prototype.onLoad = function() {
var t = this;
cc.director.getCollisionManager().enabled = !0;
this._isRTL = n.default.i.direction == n.Direction.RTL;
this.totalPieces++;
this.completed = [];
this.wordAudio = new Map();
var o, r, e, i, l, s, a, u = n.default.getInstance().data[0].toString().split(",");
u[0], u[1], u[2], u[3], this.answer = u[4], this.temp = u[5], o = u[6], i = u[7], 
r = u[8], l = u[9], e = u[10], s = u[11];
null == r && (r = "");
null == l && (l = "");
null == e && (e = "");
null == s && (s = "");
this.truckNode.x = cc.winSize.width / 2;
this.word = [ o ];
"" != r && this.word.push(r);
"" != e && this.word.push(e);
if (this._isRTL) {
this.truckNode.x = -cc.winSize.width / 2;
this.finishTruckMoveTo = 2e3;
}
c.Util.loadFriend(function(o) {
t.friend = o.getComponent(dragonBones.ArmatureDisplay);
t.friendPos.addChild(o);
t.friend.playAnimation("face_touch", 1);
});
this.wordAudio.set(this.answer, this.temp);
this.wordAudio.set(o, i);
this.wordAudio.set(r, l);
this.wordAudio.set(e, s);
console.log("words" + this.word);
this.onTouchAudio(this.wordAudio.get(this.answer));
this.instantiateTrolley(0);
if (0 != r.length) {
this.count++;
this.instantiateTrolley(1);
}
if (0 != e.length) {
this.count++;
this.instantiateTrolley(2);
}
if (n.default.i.direction == n.Direction.RTL) {
this.truckNode.scaleX = -1;
a = 100 * (this.count - 1) + 310;
} else a = 100 * -(this.count - 1) - 310;
new cc.Tween().target(this.truckNode).call(function() {
c.Util.playSfx(t.truckInAudio);
}).to(2.1, {
x: a
}, {
progress: null,
easing: function(t) {
return t;
}
}).call(function() {
var o = 0;
t.trolley.forEach(function(r) {
o++;
new cc.Tween().target(r).call(function() {
c.Util.playSfx(t.metalAudio);
}).to(.5, {
position: cc.v2(r.position.x + 40 * o, r.position.y)
}, {
progress: null,
easing: "easeOutInElastic"
}).start();
});
t.showOptions();
}).start();
this.node.getChildByName("board").getChildByName("answer_label").getComponent(cc.Label).string = this.answer;
};
o.prototype.onTouchAudioCaller = function(t) {
this.onTouchAudio(this.wordAudio.get(this.answer));
};
o.prototype.instantiateTrolley = function(t) {
this.trolley[t] = cc.instantiate(this.trolleyPrefab);
this.trolley[t].parent = this.truckNode;
this.trolley[t].position = cc.v3(this.trolley[t].position.x + 190 * t, -75, 0);
this.trolley[t].getChildByName("drop_area").name = this.word[t];
0 == t && (this.firstDrop = this.trolley[t]);
};
o.prototype.showOptions = function() {
var t = this, o = this.word[0], r = this.word;
Math.random() > .3 && (r = c.Util.shuffle(this.word));
for (var e = 0; e < this.count; e++) {
var i = cc.instantiate(this.boxPrefab), n = i.getComponent(l.default);
null != n && (n.label.string = r[e]);
r[e] == o && (this.firstDrag = i);
i.name = r[e];
var s = new cc.Node();
s.addChild(i);
s.name = r[e];
this.node.getChildByName("New Layout").addChild(s);
i.on("phonicTractorMatch", this.onMatch.bind(this));
i.on("phonicTractorNoMatch", function() {
return t.node.emit("wrong");
});
if (this._isRTL) {
var a = new cc.Node();
a.name = "shouldFlip";
i.addChild(a);
}
}
c.Util.showHelp(this.firstDrag, this.firstDrop);
};
o.prototype.onTouchAudio = function(t) {
c.Util.loadGameSound(t, function(t) {
null != t && cc.audioEngine.play(t, !1, 1);
});
};
o.prototype.onMatch = function() {
var t = this;
this.node.emit("correct");
if (0 == --this.count) {
null != this.friend && this.friend.playAnimation("face_happy", 2);
new cc.Tween().target(this.truckNode).delay(1).call(function() {
t.onTouchAudio(t.wordAudio.get(t.answer));
t.node.getChildByName("board").getChildByName("speaker_button_workkicker").getComponent(cc.Button).enabled = !1;
}).delay(1).call(function() {
var o = 0;
c.Util.playSfx(t.metalAudio);
t.trolley.forEach(function(t) {
o++;
new cc.Tween().target(t).to(.5, {
position: cc.v2(t.position.x - 40 * o, t.position.y)
}, {
progress: null,
easing: "sineOut"
}).start();
});
}).delay(1).call(function() {
c.Util.playSfx(t.truckOutAudio);
}).to(2, {
x: this.finishTruckMoveTo
}, {
progress: null,
easing: function(t) {
return t;
}
}).call(function() {
return t.match();
}).start();
}
};
o.prototype.match = function() {
--this.totalPieces <= 0 && this.node.emit("nextProblem");
};
o.prototype.onDestroy = function() {
cc.audioEngine.stopAllEffects();
};
i([ p(cc.Node) ], o.prototype, "truckNode", void 0);
i([ p(cc.Prefab) ], o.prototype, "trolleyPrefab", void 0);
i([ p(cc.Prefab) ], o.prototype, "boxPrefab", void 0);
i([ p({
type: cc.AudioClip
}) ], o.prototype, "metalAudio", void 0);
i([ p({
type: cc.AudioClip
}) ], o.prototype, "truckInAudio", void 0);
i([ p({
type: cc.AudioClip
}) ], o.prototype, "truckOutAudio", void 0);
i([ p(cc.Node) ], o.prototype, "friendPos", void 0);
i([ s.catchError() ], o.prototype, "onLoad", null);
i([ s.catchError() ], o.prototype, "onTouchAudioCaller", null);
i([ s.catchError() ], o.prototype, "instantiateTrolley", null);
i([ s.catchError() ], o.prototype, "showOptions", null);
i([ s.catchError() ], o.prototype, "onTouchAudio", null);
i([ s.catchError() ], o.prototype, "onMatch", null);
i([ s.catchError() ], o.prototype, "match", null);
i([ s.catchError() ], o.prototype, "onDestroy", null);
return o = i([ u ], o);
}(cc.Component);
r.default = h;
cc._RF.pop();
}, {
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/error-handler": void 0,
"../../../common/scripts/util": void 0,
"./phonictractor_drag": "phonictractor_drag"
} ]
}, {}, [ "phonictractor", "phonictractor_drag" ]);