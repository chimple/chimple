window.__require = function t(e, n, r) {
function o(a, c) {
if (!n[a]) {
if (!e[a]) {
var s = a.split("/");
s = s[s.length - 1];
if (!e[s]) {
var l = "function" == typeof __require && __require;
if (!c && l) return l(s, !0);
if (i) return i(s, !0);
throw new Error("Cannot find module '" + a + "'");
}
a = s;
}
var p = n[a] = {
exports: {}
};
e[a][0].call(p.exports, function(t) {
return o(e[a][1][t] || t);
}, p, p.exports, t, e, n, r);
}
return n[a].exports;
}
for (var i = "function" == typeof __require && __require, a = 0; a < r.length; a++) o(r[a]);
return o;
}({
"alphabet-recorder": [ function(t, e, n) {
"use strict";
cc._RF.push(e, "0586ePKqORMIYYC3r8h/qkg", "alphabet-recorder");
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
var o, i = arguments.length, a = i < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var c = t.length - 1; c >= 0; c--) (o = t[c]) && (a = (i < 3 ? o(a) : i > 3 ? o(e, n, a) : o(e, n)) || a);
return i > 3 && a && Object.defineProperty(e, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
n.AlphabetRecorder = void 0;
var i = cc._decorator.ccclass, a = cc._decorator.property, c = t("../../../common/scripts/lib/config"), s = t("../../../common/scripts/helper"), l = t("../../../common/Tracing/scripts/tracing-container"), p = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.progressMonitorPrefab = null;
e._tracingContainerVisible = !1;
e._recordingContainerComponent = null;
e._tracingContainerComponent = null;
e._letter = null;
e._tracePath = null;
e._currentConfig = null;
return e;
}
e.prototype.onLoad = function() {
var t = this;
this._recordingContainer = cc.instantiate(this.recordContainerPrefab);
this._tracingContainer = cc.instantiate(this.tracingContainerPrefab);
this._currentConfig = this.processConfiguration(c.default.getInstance().data[0]);
if (null !== this._currentConfig) {
this._letter = this._currentConfig.problem;
this.setAlphabetToDisplay(this._letter);
}
this.node.dispatchEvent(new cc.Event.EventCustom(s.TRACING_FINISHED, !0));
this.node.on(s.TRACING_FINISHED, function(e) {
e.stopPropagation();
t.nextProblem();
});
};
e.prototype.nextProblem = function() {
this.node.emit("nextProblem");
};
e.prototype.loadTracePath = function(t) {
var e = this;
null == this._tracePath && c.default.getInstance().loadPathJSON(t, function(t) {
t && t.length > 0 && (e._tracePath = t);
});
};
e.prototype.setAlphabetToDisplay = function(t) {
this._recordingContainerComponent = this._recordingContainer.getComponent(l.default);
this._recordingContainerComponent.tracingLetter = t;
this._tracingContainerComponent = this._tracingContainer.getComponent(l.default);
this._tracingContainerComponent.tracingLetter = t;
this._tracingContainerComponent.traceGenerationMode = !1;
this.node.addChild(this._recordingContainer);
this.node.addChild(this._tracingContainer);
this._recordingContainer.setPosition(new cc.Vec2(-512, -384));
this._tracingContainer.setPosition(new cc.Vec2(0, -384));
this._recordingContainerComponent.traceGraphics.emit("enabledGraphics");
this._tracingContainerComponent.traceGraphics.emit("enabledGraphics");
null !== this._letter && null == this._tracePath && this.loadTracePath(this._letter);
};
e.prototype.processConfiguration = function(t) {
void 0 === t && (t = []);
var e = [].concat.apply([], t);
if (4 === e.length) {
return {
level: e[0],
workSheet: e[1],
problemNo: e[2],
problem: e[3]
};
}
return null;
};
e.prototype.update = function(t) {
null !== this._letter && null == this._tracePath && this.loadTracePath(this._letter);
if (!1 === this._tracingContainerVisible && null !== this._tracePath) {
this._tracingContainer.active = !0;
this._tracingContainerVisible = !0;
this._tracingContainerComponent._traceGraphicsComponent.loadTracePath(this._letter);
}
};
o([ a(cc.Prefab) ], e.prototype, "progressMonitorPrefab", void 0);
o([ a(cc.Prefab) ], e.prototype, "recordContainerPrefab", void 0);
o([ a(cc.Prefab) ], e.prototype, "tracingContainerPrefab", void 0);
return e = o([ i ], e);
}(cc.Component);
n.AlphabetRecorder = p;
cc._RF.pop();
}, {
"../../../common/Tracing/scripts/tracing-container": void 0,
"../../../common/scripts/helper": void 0,
"../../../common/scripts/lib/config": void 0
} ]
}, {}, [ "alphabet-recorder" ]);