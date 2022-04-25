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
  addSectionButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1600dAtaJRK7Zcvabq6NsU8", "addSectionButton");
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
    exports.AddSectionButton = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var addSectionDialog_1 = require("./addSectionDialog");
    var AddSectionButton = function(_super) {
      __extends(AddSectionButton, _super);
      function AddSectionButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.addSectionPrefab = null;
        _this.parent = null;
        return _this;
      }
      AddSectionButton.prototype.onAddSelectionClick = function(event) {
        var addSectionDialog = cc.instantiate(this.addSectionPrefab);
        var addSectionDialogComponent = addSectionDialog.getComponent(addSectionDialog_1.default);
        addSectionDialogComponent.parent = this.parent;
        this.parent.addChild(addSectionDialog);
      };
      __decorate([ property(cc.Prefab) ], AddSectionButton.prototype, "addSectionPrefab", void 0);
      AddSectionButton = __decorate([ ccclass ], AddSectionButton);
      return AddSectionButton;
    }(cc.Component);
    exports.AddSectionButton = AddSectionButton;
    cc._RF.pop();
  }, {
    "./addSectionDialog": "addSectionDialog"
  } ],
  addSectionDialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "afc57pz8CVD7JEM7snAXVdP", "addSectionDialog");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TEACHER_ADD_SECTION_DIALOG_CLOSED = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var chimple_label_1 = require("../../../common/scripts/chimple-label");
    var parseApi_1 = require("../../../common/scripts/services/parseApi");
    var customEditBox_1 = require("./customEditBox");
    var parseConstants_1 = require("../../../common/scripts/domain/parseConstants");
    var constants_1 = require("../../../common/scripts/lib/constants");
    var selectionScene_1 = require("./selectionScene");
    exports.TEACHER_ADD_SECTION_DIALOG_CLOSED = "TEACHER_ADD_SECTION_DIALOG_CLOSED";
    var AddSectionDialog = function(_super) {
      __extends(AddSectionDialog, _super);
      function AddSectionDialog() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.text = null;
        _this.text1 = null;
        _this.parent = null;
        return _this;
      }
      AddSectionDialog.prototype.onLoad = function() {
        var _this = this;
        this.node.on(exports.TEACHER_ADD_SECTION_DIALOG_CLOSED, function(event) {
          return __awaiter(_this, void 0, void 0, function() {
            var item;
            return __generator(this, function(_a) {
              event.stopPropagation();
              item = event.getUserData();
              return [ 2 ];
            });
          });
        });
        this.node.on(customEditBox_1.EDIT_ENDED_EVENT, function(event) {
          event.stopPropagation();
          var data = event.getUserData();
          _this.text1 = data.text;
        });
        this.render();
      };
      AddSectionDialog.prototype.render = function() {
        var chimpleLabel = this.text.getComponent(chimple_label_1.default);
        chimpleLabel.string = "Add Section";
      };
      AddSectionDialog.prototype.onYesClicked = function(event) {
        return __awaiter(this, void 0, void 0, function() {
          var schoolId, selectionScene, data;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!!!this.text1) return [ 3, 3 ];
              return [ 4, parseApi_1.ParseApi.getInstance().createSection(this.text1) ];

             case 1:
              _a.sent();
              schoolId = cc.sys.localStorage.getItem(constants_1.CURRENT_SCHOOL_ID);
              parseApi_1.ParseApi.getInstance().removeFromCache(parseConstants_1.SECTIONS + schoolId);
              selectionScene = this.parent.getComponent(selectionScene_1.SelectionScene);
              return [ 4, parseApi_1.ParseApi.getInstance().getSectionsForSchool(schoolId) ];

             case 2:
              data = _a.sent();
              selectionScene.updateSectionData(data);
              _a.label = 3;

             case 3:
              this.closeDialog();
              return [ 2 ];
            }
          });
        });
      };
      AddSectionDialog.prototype.closeDialog = function() {
        var _this = this;
        var customEvent = new cc.Event.EventCustom(exports.TEACHER_ADD_SECTION_DIALOG_CLOSED, true);
        this.node.dispatchEvent(customEvent);
        this.scheduleOnce(function() {
          _this.node.removeFromParent(true);
        }, .25);
      };
      AddSectionDialog.prototype.onNoClicked = function(event) {
        this.closeDialog();
      };
      __decorate([ property(cc.Node) ], AddSectionDialog.prototype, "text", void 0);
      AddSectionDialog = __decorate([ ccclass ], AddSectionDialog);
      return AddSectionDialog;
    }(cc.Component);
    exports.default = AddSectionDialog;
    cc._RF.pop();
  }, {
    "../../../common/scripts/chimple-label": void 0,
    "../../../common/scripts/domain/parseConstants": void 0,
    "../../../common/scripts/lib/constants": void 0,
    "../../../common/scripts/services/parseApi": void 0,
    "./customEditBox": "customEditBox",
    "./selectionScene": "selectionScene"
  } ],
  ageAndGender: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "31f817xNj1LHLaIlwOOEhQn", "ageAndGender");
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
    var profile_1 = require("../../../../common/scripts/lib/profile");
    var collectUserInfo_1 = require("./collectUserInfo");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var AgeAndGender = function(_super) {
      __extends(AgeAndGender, _super);
      function AgeAndGender() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ageNode = null;
        _this.genderNode = null;
        _this.lastSelectedGender = -1;
        _this.normalSprite = null;
        _this.lastSelectedAge = -1;
        _this.normalAgeSprite = null;
        _this.nextButtonLabel = null;
        return _this;
      }
      AgeAndGender.prototype.onAgeClick = function(event) {
        for (var i = 0; i < this.ageNode.childrenCount; i++) this.ageNode.children[i].getChildByName("tick").active = false;
        event.target.getChildByName("tick").active = true;
        this.node.getParent().getParent().getComponent(collectUserInfo_1.default).userAge = parseInt(event.currentTarget.name);
        this.node.getParent().getParent().getComponent(collectUserInfo_1.default).enableButton();
        this.node.getParent().getParent().getComponent(collectUserInfo_1.default).enableNextButton = true;
      };
      AgeAndGender.prototype.onGenderClick = function(event) {
        var nodeName = "indiegenderprefab" + this.lastSelectedGender.toString();
        if (this.lastSelectedGender > -1) {
          this.genderNode.getChildByName(nodeName).getChildByName(this.lastSelectedGender.toString()).getComponent(cc.Button).pressedSprite = this.genderNode.getChildByName(nodeName).getChildByName(this.lastSelectedGender.toString()).getComponent(cc.Button).normalSprite;
          this.genderNode.getChildByName(nodeName).getChildByName(this.lastSelectedGender.toString()).getComponent(cc.Button).normalSprite = this.normalAgeSprite;
          this.genderNode.getChildByName(nodeName).getChildByName(this.lastSelectedGender.toString()).getChildByName("tick").active = false;
        }
        nodeName = "indiegenderprefab" + event.currentTarget.name;
        this.normalAgeSprite = this.genderNode.getChildByName(nodeName).getChildByName(event.currentTarget.name).getComponent(cc.Button).normalSprite;
        this.genderNode.getChildByName(nodeName).getChildByName(event.currentTarget.name).getComponent(cc.Button).normalSprite = this.genderNode.getChildByName(nodeName).getChildByName(event.currentTarget.name).getComponent(cc.Button).pressedSprite;
        this.genderNode.getChildByName(nodeName).getChildByName(event.currentTarget.name).getComponent(cc.Button).pressedSprite = this.normalAgeSprite;
        this.genderNode.getChildByName(nodeName).getChildByName(event.currentTarget.name).getChildByName("tick").active = true;
        this.lastSelectedGender = parseInt(event.currentTarget.name);
        0 === this.lastSelectedGender ? this.node.getParent().getParent().getComponent(collectUserInfo_1.default).userGender = profile_1.Gender.BOY : 1 === this.lastSelectedGender && (this.node.getParent().getParent().getComponent(collectUserInfo_1.default).userGender = profile_1.Gender.GIRL);
      };
      __decorate([ property(cc.Node) ], AgeAndGender.prototype, "ageNode", void 0);
      __decorate([ property(cc.Node) ], AgeAndGender.prototype, "genderNode", void 0);
      __decorate([ property(cc.Label) ], AgeAndGender.prototype, "nextButtonLabel", void 0);
      AgeAndGender = __decorate([ ccclass ], AgeAndGender);
      return AgeAndGender;
    }(cc.Component);
    exports.default = AgeAndGender;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/profile": void 0,
    "./collectUserInfo": "collectUserInfo"
  } ],
  assignHomeWork: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0608fVNgT9NIL/igeFjvisW", "assignHomeWork");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.AssignHomeWork = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var util_1 = require("../../../common/scripts/util");
    var constants_1 = require("../../../common/scripts/lib/constants");
    var parseApi_1 = require("../../../common/scripts/services/parseApi");
    var util_logger_1 = require("../../../common/scripts/util-logger");
    var parseConstants_1 = require("../../../common/scripts/domain/parseConstants");
    var queue_1 = require("../../../queue");
    var chimple_1 = require("../../../chimple");
    var AssignHomeWork = function(_super) {
      __extends(AssignHomeWork, _super);
      function AssignHomeWork() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.text = null;
        _this.parent = null;
        _this.studentId = null;
        _this.subjectId = null;
        _this.callBack = null;
        return _this;
      }
      AssignHomeWork.prototype.onLoad = function() {};
      AssignHomeWork.prototype.onYesClicked = function(event) {
        return __awaiter(this, void 0, void 0, function() {
          var schoolId, sectionId, subjectId, payload;
          var _this = this;
          return __generator(this, function(_a) {
            cc.log("yes clicked :" + this.studentId);
            schoolId = cc.sys.localStorage.getItem(constants_1.CURRENT_SCHOOL_ID);
            sectionId = cc.sys.localStorage.getItem(constants_1.CURRENT_SECTION_ID);
            subjectId = !this.subjectId ? cc.sys.localStorage.getItem(constants_1.CURRENT_SUBJECT_ID) : this.subjectId;
            payload = util_1.Util.assignHomework(this.chapterId, this.lessonId, schoolId, sectionId, subjectId, this.studentId);
            this.parent.active = true;
            this.node.removeFromParent(true);
            cc.log("calling assign Homework API");
            parseApi_1.ParseApi.getInstance().assignHomeWork(payload).then(function(res) {
              util_logger_1.default.logChimpleEvent(parseConstants_1.ASSIGN_HOMEWORK, payload);
              if (res && 200 === res.status && res.data.result && res.data.result.objectId) {
                _this.callBack(_this.studentId);
                var teacherId = parseApi_1.ParseApi.getInstance().getLoggedInUser().objectId;
                var assignHwText = "http://chimple.github.io/" + parseConstants_1.ASSIGN_HOMEWORK + "/" + chimple_1.ASSIGNMENT_ID_KEY_FOR_ASSIGN_HW + "/" + res.data.result.objectId + "/" + chimple_1.TEACHER_ID_KEY_FOR_ASSIGN_HW + "/" + teacherId;
                util_1.Util.shareText(assignHwText);
              }
            }).catch(function(err) {
              queue_1.Queue.getInstance().push(payload);
              util_logger_1.default.logChimpleEvent(parseConstants_1.ASSIGN_HOMEWORK_FAILED, payload);
            });
            return [ 2 ];
          });
        });
      };
      AssignHomeWork.prototype.onNoClicked = function(event) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            this.parent.active = true;
            this.node.removeFromParent(true);
            return [ 2 ];
          });
        });
      };
      __decorate([ property(cc.Node) ], AssignHomeWork.prototype, "text", void 0);
      AssignHomeWork = __decorate([ ccclass ], AssignHomeWork);
      return AssignHomeWork;
    }(cc.Component);
    exports.AssignHomeWork = AssignHomeWork;
    cc._RF.pop();
  }, {
    "../../../chimple": void 0,
    "../../../common/scripts/domain/parseConstants": void 0,
    "../../../common/scripts/lib/constants": void 0,
    "../../../common/scripts/services/parseApi": void 0,
    "../../../common/scripts/util": void 0,
    "../../../common/scripts/util-logger": void 0,
    "../../../queue": void 0
  } ],
  avatar_select: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "89616YyEOZBNoZ8HtciKXKY", "avatar_select");
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
    var cameraScene_1 = require("../../loginnew/scripts/cameraScene");
    var editprofile_1 = require("./editprofile");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var AvatarSelect = function(_super) {
      __extends(AvatarSelect, _super);
      function AvatarSelect() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lastSelectedAvatar = -1;
        _this.normalSprite = null;
        _this.buttonContainerNode = null;
        _this.pageviewLayoutNode = null;
        _this.avatarPrefab = null;
        _this.rightButton = null;
        _this.leftButton = null;
        _this.currentPage = 0;
        _this.avatarsInSinglePage = 12;
        return _this;
      }
      AvatarSelect.prototype.onLoad = function() {
        var _this = this;
        var counter = 0;
        var layoutContainer;
        var currentChildren = 0;
        for (var i = 0; i < cameraScene_1.AVATARS.length / this.avatarsInSinglePage; i++) {
          layoutContainer = cc.instantiate(this.pageviewLayoutNode);
          this.buttonContainerNode.addChild(layoutContainer);
        }
        cameraScene_1.AVATARS.forEach(function(ele, i) {
          cc.resources.load("avatars/" + ele, function(err, sp) {
            if (counter === _this.avatarsInSinglePage) {
              counter = 0;
              currentChildren++;
            }
            0 === counter && (layoutContainer = _this.buttonContainerNode.children[currentChildren]);
            var avatarPrefab = cc.instantiate(_this.avatarPrefab);
            avatarPrefab.name = "" + i;
            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = _this.node;
            clickEventHandler.component = "avatar_select";
            clickEventHandler.handler = "onAvatarButtonClick";
            clickEventHandler.customEventData = "" + ele;
            var button1 = avatarPrefab.getComponent(cc.Button);
            button1.clickEvents.push(clickEventHandler);
            layoutContainer.addChild(avatarPrefab);
            avatarPrefab.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
            counter++;
            cameraScene_1.AVATARS[i] === _this.user.avatarImage && (layoutContainer.getChildByName(i.toString()).getChildByName("tick").active = true);
          });
        });
      };
      AvatarSelect.prototype.onAvatarButtonClick = function(event, customEventData) {
        for (var i = 0; i < this.buttonContainerNode.childrenCount; i++) for (var j = 0; j < this.buttonContainerNode.children[i].childrenCount; j++) {
          var currentNode = this.buttonContainerNode.children[i].children[j];
          currentNode.getChildByName("tick").active = false;
        }
        event.currentTarget.getChildByName("tick").active = true;
        var avatarImage = customEventData;
        this.node.active = false;
        this.node.parent.getChildByName("main_screen").active = true;
        this.user.avatarImage = avatarImage;
        cc.log("selected Avatar ", this.user.avatarImage);
        this.node.parent.getComponent(editprofile_1.default).loadUserImageOrAvatar(this.user);
      };
      AvatarSelect.prototype.onRightScroll = function(event) {
        this.currentPage++;
        this.node.getChildByName("New PageView").getComponent(cc.PageView).setCurrentPageIndex(this.currentPage);
        this.currentPage === this.node.getChildByName("New PageView").getComponent(cc.PageView).getPages().length - 1 && (this.rightButton.node.active = false);
        1 === this.currentPage && (this.leftButton.node.active = true);
      };
      AvatarSelect.prototype.onLeftScroll = function(event) {
        this.currentPage--;
        this.node.getChildByName("New PageView").getComponent(cc.PageView).setCurrentPageIndex(this.currentPage);
        0 === this.currentPage && (this.leftButton.node.active = false);
        this.currentPage === this.node.getChildByName("New PageView").getComponent(cc.PageView).getPages().length - 2 && (this.rightButton.node.active = true);
      };
      __decorate([ property(cc.Node) ], AvatarSelect.prototype, "buttonContainerNode", void 0);
      __decorate([ property(cc.Prefab) ], AvatarSelect.prototype, "pageviewLayoutNode", void 0);
      __decorate([ property(cc.Prefab) ], AvatarSelect.prototype, "avatarPrefab", void 0);
      __decorate([ property(cc.Button) ], AvatarSelect.prototype, "rightButton", void 0);
      __decorate([ property(cc.Button) ], AvatarSelect.prototype, "leftButton", void 0);
      AvatarSelect = __decorate([ ccclass ], AvatarSelect);
      return AvatarSelect;
    }(cc.Component);
    exports.default = AvatarSelect;
    cc._RF.pop();
  }, {
    "../../loginnew/scripts/cameraScene": "cameraScene",
    "./editprofile": "editprofile"
  } ],
  buttons: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "00b241QmX1D0rTE7JgndNw/", "buttons");
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
    var config_1 = require("../../../../common/scripts/lib/config");
    var profile_1 = require("../../../../common/scripts/lib/profile");
    var childGuard_1 = require("./childGuard");
    var welcomePage_1 = require("./welcomePage");
    var util_1 = require("../../../../common/scripts/util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Buttons = function(_super) {
      __extends(Buttons, _super);
      function Buttons() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Buttons.prototype.addButtonCallback = function() {
        welcomePage_1.default.userArr.length < profile_1.MAX_USERS ? config_1.default.loadScene("private/home/loginnew/scenes/homeLoginScene", "private", null) : cc.log(">>max reached");
      };
      Buttons.prototype.userButtonCallback = function() {
        var _this = this;
        profile_1.User.getUsers().forEach(function(user) {
          if (_this.node.name == user.id) {
            profile_1.User.setCurrentUser(user);
            util_1.Util.preloadStartScene(_this.node, cc.director.getScene().getChildByName("Canvas").getChildByName("loading"));
          }
        });
      };
      Buttons.prototype.showChildGuardDialog = function(mode, userName) {
        var guardDialog = cc.director.getScene().getChildByName("Canvas").getChildByName("childGuard");
        guardDialog.getComponent(childGuard_1.default).mode = mode;
        guardDialog.getComponent(childGuard_1.default).userName = userName;
        guardDialog.active = true;
      };
      Buttons.prototype.onClickParentButton = function() {
        this.showChildGuardDialog(childGuard_1.ChildGuardMode.ADULT, null);
      };
      Buttons = __decorate([ ccclass ], Buttons);
      return Buttons;
    }(cc.Component);
    exports.default = Buttons;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/config": void 0,
    "../../../../common/scripts/lib/profile": void 0,
    "../../../../common/scripts/util": void 0,
    "./childGuard": "childGuard",
    "./welcomePage": "welcomePage"
  } ],
  cameraScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "11f3eLMYlhEz7tNDXk1PVdD", "cameraScene");
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
    exports.AVATARS = void 0;
    var collectUserInfo_1 = require("./collectUserInfo");
    var profile_1 = require("../../../../common/scripts/lib/profile");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    exports.AVATARS = [ "Aligator", "armydog", "astronautraccon", "barbermouse", "bosspanda", "bull", "cheetah", "chefrat", "chicken", "chimpanzee", "cow", "deer", "doctorrabbit", "donkey", "elephant", "fox", "giraffe", "goat", "hamster", "hippo", "horse", "journalistdeer", "koala", "lion", "monkey", "owl", "pilotpenguin", "plumerpig", "policecat", "postmanbear", "rabbit", "reporterfox", "rhino", "sheep", "sloth", "snake", "soldierpolar", "teacherbird", "tiger", "zebra" ];
    var CameraScene = function(_super) {
      __extends(CameraScene, _super);
      function CameraScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lastSelectedAvatar = -1;
        _this.normalSprite = null;
        _this.buttonContainerNode = null;
        _this.pageviewLayoutNode = null;
        _this.avatarPrefab = null;
        _this.rightButton = null;
        _this.leftButton = null;
        _this.currentPage = 0;
        _this.avatarsInSinglePage = 12;
        return _this;
      }
      CameraScene.prototype.onLoad = function() {
        var _this = this;
        profile_1.default.setItem(profile_1.IN_LOGIN_FLOW, 1);
        var counter = 0;
        var layoutContainer;
        var currentChildren = 0;
        for (var i = 0; i < exports.AVATARS.length / this.avatarsInSinglePage; i++) {
          layoutContainer = cc.instantiate(this.pageviewLayoutNode);
          this.buttonContainerNode.addChild(layoutContainer);
        }
        exports.AVATARS.forEach(function(ele, i) {
          cc.resources.load("avatars/" + ele, function(err, sp) {
            if (counter === _this.avatarsInSinglePage) {
              counter = 0;
              currentChildren++;
            }
            0 === counter && (layoutContainer = _this.buttonContainerNode.children[currentChildren]);
            var avatarPrefab = cc.instantiate(_this.avatarPrefab);
            avatarPrefab.name = "" + i;
            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = _this.node;
            clickEventHandler.component = "cameraScene";
            clickEventHandler.handler = "onAvatarButtonClick";
            clickEventHandler.customEventData = "" + ele;
            var button1 = avatarPrefab.getComponent(cc.Button);
            button1.clickEvents.push(clickEventHandler);
            layoutContainer.addChild(avatarPrefab);
            avatarPrefab.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
            counter++;
          });
        });
      };
      CameraScene.prototype.onRightScroll = function(event) {
        this.currentPage++;
        this.node.getChildByName("New PageView").getComponent(cc.PageView).setCurrentPageIndex(this.currentPage);
        this.currentPage === this.node.getChildByName("New PageView").getComponent(cc.PageView).getPages().length - 1 && (this.rightButton.node.active = false);
        1 === this.currentPage && (this.leftButton.node.active = true);
      };
      CameraScene.prototype.onLeftScroll = function(event) {
        this.currentPage--;
        this.node.getChildByName("New PageView").getComponent(cc.PageView).setCurrentPageIndex(this.currentPage);
        0 === this.currentPage && (this.leftButton.node.active = false);
        this.currentPage === this.node.getChildByName("New PageView").getComponent(cc.PageView).getPages().length - 2 && (this.rightButton.node.active = true);
      };
      CameraScene.prototype.onAvatarButtonClick = function(event, customEventData) {
        for (var i = 0; i < this.buttonContainerNode.childrenCount; i++) for (var j = 0; j < this.buttonContainerNode.children[i].childrenCount; j++) {
          var currentNode = this.buttonContainerNode.children[i].children[j];
          currentNode.getChildByName("tick").active = false;
        }
        event.currentTarget.getChildByName("tick").active = true;
        this.node.getParent().getParent().getComponent(collectUserInfo_1.default).enableButton();
        var avatarImage = customEventData;
        this.node.getParent().getParent().getComponent(collectUserInfo_1.default).avatarImage = avatarImage;
      };
      __decorate([ property(cc.Node) ], CameraScene.prototype, "buttonContainerNode", void 0);
      __decorate([ property(cc.Prefab) ], CameraScene.prototype, "pageviewLayoutNode", void 0);
      __decorate([ property(cc.Prefab) ], CameraScene.prototype, "avatarPrefab", void 0);
      __decorate([ property(cc.Button) ], CameraScene.prototype, "rightButton", void 0);
      __decorate([ property(cc.Button) ], CameraScene.prototype, "leftButton", void 0);
      CameraScene = __decorate([ ccclass ], CameraScene);
      return CameraScene;
    }(cc.Component);
    exports.default = CameraScene;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/profile": void 0,
    "./collectUserInfo": "collectUserInfo"
  } ],
  chapterButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4a7f7/PmDtII7ZqR7U2H9wI", "chapterButton");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ChapterButton = exports.CHAPTER_ITEM_SELECTED_EVENT = void 0;
    var ccclass = cc._decorator.ccclass;
    exports.CHAPTER_ITEM_SELECTED_EVENT = "CHAPTER_ITEM_SELECTED_EVENT";
    var clickEnabled = true;
    var ChapterButton = function(_super) {
      __extends(ChapterButton, _super);
      function ChapterButton() {
        return _super.call(this) || this;
      }
      ChapterButton.prototype.onLoad = function() {
        clickEnabled = true;
      };
      ChapterButton.prototype.onClicked = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            if (clickEnabled) {
              clickEnabled = false;
              this.itemSelectedEvent();
              cc.log("item clicked", this.node.name);
            }
            return [ 2 ];
          });
        });
      };
      ChapterButton.prototype.itemSelectedEvent = function() {
        var customEvent = new cc.Event.EventCustom(exports.CHAPTER_ITEM_SELECTED_EVENT, true);
        var selectedData = {
          subjectId: this._subjectId,
          chapterId: this._chapterId,
          chapterName: this._chapterName,
          subject: this._subject
        };
        customEvent.setUserData(selectedData);
        this.node.dispatchEvent(customEvent);
      };
      Object.defineProperty(ChapterButton.prototype, "subjectId", {
        set: function(newVal) {
          this._subjectId = newVal;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ChapterButton.prototype, "chapterId", {
        set: function(id) {
          this._chapterId = id;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ChapterButton.prototype, "chapterName", {
        set: function(n) {
          this._chapterName = n;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ChapterButton.prototype, "subject", {
        set: function(l) {
          this._subject = l;
        },
        enumerable: false,
        configurable: true
      });
      ChapterButton = __decorate([ ccclass ], ChapterButton);
      return ChapterButton;
    }(cc.Component);
    exports.ChapterButton = ChapterButton;
    cc._RF.pop();
  }, {} ],
  chapterProgressBar: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "052cfK1sutOCqAjfAEddiKe", "chapterProgressBar");
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
    var lessonIndicator_1 = require("./lessonIndicator");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ChapterProgressBar = function(_super) {
      __extends(ChapterProgressBar, _super);
      function ChapterProgressBar() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.progressBar = null;
        _this.expand = null;
        _this.layout = null;
        _this.lessonIndicatorPrefab = null;
        _this.parent = null;
        _this.goldStar = null;
        _this.grayStar = null;
        _this.subjectId = null;
        _this.isExpanded = false;
        return _this;
      }
      ChapterProgressBar.prototype.onLoad = function() {
        this.progressBar.progress = this.completedRatio;
      };
      ChapterProgressBar.prototype.onExpandClick = function() {
        var _this = this;
        this.isExpanded = !this.isExpanded;
        if (this.isExpanded) this.getLessonProgressMap(this.chapter, function(lessonProgressMap) {
          _this.chapter.lessons.forEach(function(les) {
            var lessonIndicator = cc.instantiate(_this.lessonIndicatorPrefab);
            var lessonIndicatorComp = lessonIndicator.getComponent(lessonIndicator_1.default);
            lessonIndicatorComp.popUpParent = _this.parent;
            lessonIndicatorComp.chapter = _this.chapter;
            lessonIndicatorComp.subjectId = _this.subjectId;
            lessonIndicatorComp.lesson = les;
            lessonIndicatorComp.user = _this.user;
            lessonIndicatorComp.label.string = les.name;
            lessonIndicatorComp.showAssignment = !!_this.shouldShowAssignment && _this.shouldShowAssignment();
            if (lessonProgressMap.has(les.id)) {
              var score = lessonProgressMap.get(les.id).score;
              if (score >= 0) {
                lessonIndicatorComp.star1.spriteFrame = score > 25 ? _this.goldStar : _this.grayStar;
                lessonIndicatorComp.star2.spriteFrame = score > 50 ? _this.goldStar : _this.grayStar;
                lessonIndicatorComp.star3.spriteFrame = score > 75 ? _this.goldStar : _this.grayStar;
              }
            }
            _this.layout.addChild(lessonIndicator);
          });
        }); else {
          this.layout.removeAllChildren();
          this.layout.height = 0;
        }
        new cc.Tween().target(this.expand).to(.2, {
          angle: this.isExpanded ? -90 : 0
        }, {
          progress: null,
          easing: "backOut"
        }).start();
      };
      __decorate([ property(cc.Label) ], ChapterProgressBar.prototype, "label", void 0);
      __decorate([ property(cc.ProgressBar) ], ChapterProgressBar.prototype, "progressBar", void 0);
      __decorate([ property(cc.Node) ], ChapterProgressBar.prototype, "expand", void 0);
      __decorate([ property(cc.Node) ], ChapterProgressBar.prototype, "layout", void 0);
      __decorate([ property(cc.Prefab) ], ChapterProgressBar.prototype, "lessonIndicatorPrefab", void 0);
      __decorate([ property(cc.SpriteFrame) ], ChapterProgressBar.prototype, "goldStar", void 0);
      __decorate([ property(cc.SpriteFrame) ], ChapterProgressBar.prototype, "grayStar", void 0);
      ChapterProgressBar = __decorate([ ccclass ], ChapterProgressBar);
      return ChapterProgressBar;
    }(cc.Component);
    exports.default = ChapterProgressBar;
    cc._RF.pop();
  }, {
    "./lessonIndicator": "lessonIndicator"
  } ],
  childGuard: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "67389mIBDVESZ1/Yevgjpib", "childGuard");
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
    exports.ChildGuardMode = void 0;
    var config_1 = require("../../../../common/scripts/lib/config");
    var profile_1 = require("../../../../common/scripts/lib/profile");
    var util_1 = require("../../../../common/scripts/util");
    var ChildGuardMode;
    (function(ChildGuardMode) {
      ChildGuardMode[ChildGuardMode["CHILD"] = 0] = "CHILD";
      ChildGuardMode[ChildGuardMode["ADULT"] = 1] = "ADULT";
    })(ChildGuardMode = exports.ChildGuardMode || (exports.ChildGuardMode = {}));
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ChildGuard = function(_super) {
      __extends(ChildGuard, _super);
      function ChildGuard() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.inputEventBlocker = null;
        _this.keyboard = null;
        _this.headerNode = null;
        _this.userImg = null;
        _this.title = null;
        _this.normalColor = new cc.Color().fromHEX("#3AA4F7");
        _this.pressedColor = new cc.Color().fromHEX("#20CE7A");
        _this.wrongColor = new cc.Color().fromHEX("#FF6E6E");
        _this.userInput = "";
        _this.passCode = "";
        _this.mode = ChildGuardMode.ADULT;
        _this.userName = "";
        return _this;
      }
      ChildGuard.prototype.onEnable = function() {
        var _this = this;
        this.clearKeyboard();
        profile_1.User.getUsers().forEach(function(e) {
          _this.userName == e.id && (_this.user = e);
        });
        if (this.mode == ChildGuardMode.CHILD) {
          this.loadUserImageOrAvatar(this.user);
          this.title.string = this.user.name;
        } else {
          var code = util_1.Util.randomBetween(1, 10);
          var count = util_1.Util.randomBetween(1, 5);
          var str = util_1.Util.i18NText("Click x1 times on number x2!").replace("x1", util_1.Util.i18NText(util_1.NUMBER_NAME[count])).replace("x2", util_1.Util.i18NText(util_1.NUMBER_NAME[code]));
          this.title.string = str;
          var i = 0;
          while (i++ < count) this.passCode += code.toString();
        }
      };
      ChildGuard.prototype.clearKeyboard = function() {
        var _this = this;
        this.keyboard.children.forEach(function(e, i) {
          e.color = _this.normalColor;
          e.getChildByName("label").color = _this.normalColor;
        });
      };
      ChildGuard.prototype.loadUserImageOrAvatar = function(currentUser) {
        var _this = this;
        "" != currentUser.imgPath ? cc.loader.load(currentUser.imgPath, function(err, texture) {
          if (!err) {
            var temp = new cc.SpriteFrame(texture);
            this.userImg.spriteFrame = temp;
          }
        }) : cc.resources.load("avatars/" + currentUser.avatarImage, function(err, sp) {
          _this.userImg.spriteFrame = new cc.SpriteFrame(sp);
        });
      };
      ChildGuard.prototype.onWrongInput = function() {
        var _this = this;
        this.keyboard.children.forEach(function(e, i) {
          var label = e.getChildByName("label").getComponent(cc.Label).string;
          _this.userInput.includes(label) && _this.wrongAnimate(e);
          e.getChildByName("label").color = _this.normalColor;
        });
        this.userInput = "";
      };
      ChildGuard.prototype.wrongAnimate = function(target) {
        var _this = this;
        var x = target.x;
        new cc.Tween().target(target).call(function() {
          target.color = _this.wrongColor;
          target.getComponent(cc.Button).interactable = false;
        }).to(.2, {
          x: x + 7
        }, {
          progress: null,
          easing: function(t) {
            return t;
          }
        }).to(.2, {
          x: x - 7
        }, {
          progress: null,
          easing: function(t) {
            return t;
          }
        }).to(.2, {
          x: x
        }, {
          progress: null,
          easing: function(t) {
            return t;
          }
        }).call(function() {
          target.color = _this.normalColor;
          target.getComponent(cc.Button).interactable = true;
        }).start();
      };
      ChildGuard.prototype.keyboardButton = function(event, data) {
        var _this = this;
        this.userInput = this.userInput.concat(data);
        this.unscheduleAllCallbacks();
        this.userInput == this.passCode ? this.navigate() : this.scheduleOnce(function() {
          return _this.onWrongInput();
        }, 1.7);
        if (this.mode == ChildGuardMode.CHILD) {
          var node = event.target;
          node.color = this.pressedColor;
          node.getChildByName("label").color = this.pressedColor;
        }
      };
      ChildGuard.prototype.onClickCancel = function() {
        this.node.active = false;
        this.title.string = "";
        this.userImg.spriteFrame = null;
        this.userInput = "";
        this.passCode = "";
      };
      ChildGuard.prototype.navigate = function() {
        this.navigateToParentPage();
      };
      ChildGuard.prototype.navigateToMenu = function() {};
      ChildGuard.prototype.navigateToParentPage = function() {
        config_1.default.getInstance().pushScene("private/home/secondscreen/scenes/profilePage", "private");
      };
      __decorate([ property(cc.Node) ], ChildGuard.prototype, "inputEventBlocker", void 0);
      __decorate([ property(cc.Node) ], ChildGuard.prototype, "keyboard", void 0);
      __decorate([ property(cc.Node) ], ChildGuard.prototype, "headerNode", void 0);
      __decorate([ property(cc.Sprite) ], ChildGuard.prototype, "userImg", void 0);
      __decorate([ property(cc.Label) ], ChildGuard.prototype, "title", void 0);
      ChildGuard = __decorate([ ccclass ], ChildGuard);
      return ChildGuard;
    }(cc.Component);
    exports.default = ChildGuard;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/config": void 0,
    "../../../../common/scripts/lib/profile": void 0,
    "../../../../common/scripts/util": void 0
  } ],
  collectUserInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2f505Ok+DNDRZR8ekhN2Rjd", "collectUserInfo");
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
    var config_1 = require("../../../../common/scripts/lib/config");
    var profile_1 = require("../../../../common/scripts/lib/profile");
    var constants_1 = require("../../../../common/scripts/lib/constants");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CollectUserInfo = function(_super) {
      __extends(CollectUserInfo, _super);
      function CollectUserInfo() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.nextButton = null;
        _this.prefabContainer = null;
        _this.buttonContainer = null;
        _this.schoolPrefab = null;
        _this.newcamerascenePrefab = null;
        _this.ageandgenderscenePrefab = null;
        _this.nameinputscenePrefab = null;
        _this.userAge = 0;
        _this.userName = "";
        _this.userlanguage = "english";
        _this.imgPath = "";
        _this.avatarImage = "";
        _this.currentPrefabNumber = 0;
        _this.isLastScene = false;
        _this.enableNextButton = false;
        _this.profilecreated = false;
        _this.disableSprite = null;
        _this.enableSprite = null;
        _this.scenes = [];
        return _this;
      }
      CollectUserInfo.prototype.onLoad = function() {
        this.scenes.push("newcamerascene", "ageandgenderscene", "nameinputscene");
        this.disableButton();
        this.activateCurrentPrefab();
        0 === profile_1.User.getUsers().length && this.buttonContainer.addChild(cc.instantiate(this.schoolPrefab));
      };
      CollectUserInfo.prototype.activateCurrentPrefab = function() {
        for (var i = 0; i < this.prefabContainer.childrenCount; i++) {
          this.prefabContainer.children[i].active = false;
          this.prefabContainer.children[i].removeFromParent();
        }
        var sceneName = this.scenes[this.currentPrefabNumber];
        var loadedChild = null;
        switch (sceneName) {
         case "newcamerascene":
          loadedChild = cc.instantiate(this.newcamerascenePrefab);
          break;

         case "ageandgenderscene":
          loadedChild = cc.instantiate(this.ageandgenderscenePrefab);
          break;

         case "nameinputscene":
          loadedChild = cc.instantiate(this.nameinputscenePrefab);
        }
        this.prefabContainer.addChild(loadedChild);
        this.prefabContainer.children[0].active = true;
      };
      CollectUserInfo.prototype.disableButton = function() {
        this.nextButton.interactable = false;
        this.nextButton.node.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = this.disableSprite;
      };
      CollectUserInfo.prototype.enableButton = function() {
        this.nextButton.interactable = true;
        this.nextButton.node.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = this.enableSprite;
      };
      CollectUserInfo.prototype.onClickBackBtn = function() {
        config_1.default.loadScene("private/home/loginnew/scenes/welcomePage", "private", null);
      };
      CollectUserInfo.prototype.onNextButtonClicked = function(event) {
        console.log(this.currentPrefabNumber);
        if (!this.profilecreated) {
          if (this.currentPrefabNumber >= 2) {
            this.profilecreated = true;
            profile_1.default.setItem(profile_1.CURRENTMODE, constants_1.Mode.Home);
            var newUser = profile_1.User.createUser(this.userName, this.imgPath, this.userAge, this.userGender, null, this.avatarImage);
            profile_1.User.setCurrentUser(newUser);
            config_1.default.loadScene("menu/inventory/scenes/inventory", "menu", null);
            newUser.openAllRewardsForCharacter("chimp");
            return;
          }
          0 === this.currentPrefabNumber && (this.buttonContainer.active = false);
          this.currentPrefabNumber++;
          this.activateCurrentPrefab();
          this.enableNextButton || this.disableButton();
        }
      };
      __decorate([ property(cc.Button) ], CollectUserInfo.prototype, "nextButton", void 0);
      __decorate([ property(cc.Node) ], CollectUserInfo.prototype, "prefabContainer", void 0);
      __decorate([ property(cc.Node) ], CollectUserInfo.prototype, "buttonContainer", void 0);
      __decorate([ property(cc.Prefab) ], CollectUserInfo.prototype, "schoolPrefab", void 0);
      __decorate([ property(cc.Prefab) ], CollectUserInfo.prototype, "newcamerascenePrefab", void 0);
      __decorate([ property(cc.Prefab) ], CollectUserInfo.prototype, "ageandgenderscenePrefab", void 0);
      __decorate([ property(cc.Prefab) ], CollectUserInfo.prototype, "nameinputscenePrefab", void 0);
      __decorate([ property(cc.SpriteFrame) ], CollectUserInfo.prototype, "disableSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], CollectUserInfo.prototype, "enableSprite", void 0);
      CollectUserInfo = __decorate([ ccclass ], CollectUserInfo);
      return CollectUserInfo;
    }(cc.Component);
    exports.default = CollectUserInfo;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/config": void 0,
    "../../../../common/scripts/lib/constants": void 0,
    "../../../../common/scripts/lib/profile": void 0
  } ],
  countryCodesView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3fe4a8deYtB944HTvr2UWzz", "countryCodesView");
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
    var profile_1 = require("../../../../common/scripts/lib/profile");
    var constants_1 = require("../../../../common/scripts/lib/constants");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ITEM_HEIGHT = 45;
    var INITIAL_LOAD_COUNT = 16;
    var CountryCodesView = function(_super) {
      __extends(CountryCodesView, _super);
      function CountryCodesView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.layoutNode = null;
        _this.itemPrefab = null;
        _this.labelNode = null;
        _this.contactLabel = null;
        _this.loadCount = 0;
        return _this;
      }
      CountryCodesView.prototype.onLoad = function() {
        this.lazyLoadItems(INITIAL_LOAD_COUNT);
        cc.director.getScene().getChildByName("Canvas").on("touchend", this.closeView, this);
        cc.director.getScene().getChildByName("Canvas").on("closeCountryCodeView", this.closeView, this);
      };
      CountryCodesView.prototype.lazyLoadItems = function(count) {
        count = +count + INITIAL_LOAD_COUNT;
        for (var i = this.loadCount; i < Math.min(count, constants_1.COUNTRY_CODES.length); i++) {
          var e = constants_1.COUNTRY_CODES[i];
          var node = cc.instantiate(this.itemPrefab);
          node.getChildByName("label").getComponent(cc.Label).string = e["name"] + "\t\t\t\t" + e["dial_code"];
          var clickEventHandler = new cc.Component.EventHandler();
          clickEventHandler.target = this.node;
          clickEventHandler.component = "countryCodesView";
          clickEventHandler.handler = "onClickItem";
          clickEventHandler.customEventData = e["dial_code"];
          node.getComponent(cc.Button).clickEvents.push(clickEventHandler);
          this.layoutNode.getComponent(cc.Layout).node.insertChild(node, i);
          this.loadCount++;
        }
      };
      CountryCodesView.prototype.onScroll = function(e, data) {
        var offset = e.node.getComponent(cc.ScrollView).getScrollOffset().y;
        this.lazyLoadItems(offset / ITEM_HEIGHT);
      };
      CountryCodesView.prototype.closeView = function() {
        this.node && this.node.active && this.onClickView();
      };
      CountryCodesView.prototype.onClickView = function() {
        this.node.active = !this.node.active;
        if (!this.node.active) {
          this.layoutNode.removeAllChildren();
          this.loadCount = 0;
          this.lazyLoadItems(INITIAL_LOAD_COUNT);
        }
      };
      CountryCodesView.prototype.onClickItem = function(e, data) {
        this.node.active = false;
        this.labelNode.string = data;
        profile_1.default.setValue(profile_1.DIALING_CODE, data);
        this.contactLabel.string.length > 3 && profile_1.default.setValue(profile_1.CONTACT, data + this.contactLabel.string);
      };
      __decorate([ property(cc.Node) ], CountryCodesView.prototype, "layoutNode", void 0);
      __decorate([ property(cc.Prefab) ], CountryCodesView.prototype, "itemPrefab", void 0);
      __decorate([ property(cc.Label) ], CountryCodesView.prototype, "labelNode", void 0);
      __decorate([ property(cc.Label) ], CountryCodesView.prototype, "contactLabel", void 0);
      CountryCodesView = __decorate([ ccclass ], CountryCodesView);
      return CountryCodesView;
    }(cc.Component);
    exports.default = CountryCodesView;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/constants": void 0,
    "../../../../common/scripts/lib/profile": void 0
  } ],
  currentLoggedInUser: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c9cf84mViVGgpTUiEpfESew", "currentLoggedInUser");
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
    var constants_1 = require("../../../common/scripts/lib/constants");
    var util_logger_1 = require("../../../common/scripts/util-logger");
    var itemButton_1 = require("./itemButton");
    var util_1 = require("../../../common/scripts/util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CurrentLoggedInUser = function(_super) {
      __extends(CurrentLoggedInUser, _super);
      function CurrentLoggedInUser() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.StudentItemPrefab = null;
        _this.loadingPrefab = null;
        _this.sectionlayout = null;
        _this.title = null;
        _this.loading = null;
        return _this;
      }
      CurrentLoggedInUser.prototype.onLoad = function() {
        this.createLoading();
        this.showStudent();
      };
      CurrentLoggedInUser.prototype.showStudent = function() {
        this.showLoading();
        this.sectionlayout.removeAllChildren();
        var student = null;
        var currentLoggedInUser = cc.sys.localStorage.getItem(constants_1.REMEMBERED_USER);
        var studentJson = util_logger_1.default.fetchStudentById(currentLoggedInUser);
        !studentJson || (student = JSON.parse(studentJson) || null);
        null != student && this.loadUi(student);
      };
      CurrentLoggedInUser.prototype.createLoading = function() {
        this.loading = cc.instantiate(this.loadingPrefab);
        this.loading.zIndex = 3;
        this.node.addChild(this.loading);
        this.loading.active = false;
      };
      CurrentLoggedInUser.prototype.showLoading = function() {
        this.loading.active = true;
      };
      CurrentLoggedInUser.prototype.hideLoading = function() {
        this.loading.active = false;
      };
      CurrentLoggedInUser.prototype.loadUi = function(currentLoggedInUser) {
        this.hideLoading();
        var studentInfo = currentLoggedInUser;
        var sectionButton = cc.instantiate(this.StudentItemPrefab);
        sectionButton.x = 0;
        sectionButton.y = 0;
        var labelComponent = sectionButton.getChildByName("photo").getComponentInChildren(cc.Label);
        labelComponent.string = studentInfo.name;
        var sectionButtonItem = sectionButton.getComponent(itemButton_1.ItemButton);
        null != studentInfo.image && util_1.Util.loadImage(sectionButton, studentInfo.image, studentInfo.firebaseId);
        sectionButtonItem.studentData = studentInfo;
        this.sectionlayout.addChild(sectionButton);
      };
      CurrentLoggedInUser.prototype.onBackButtonClicked = function() {
        config_1.default.i.pushScene("private/school/scenes/schoolRegistration", "private", null);
      };
      __decorate([ property(cc.Prefab) ], CurrentLoggedInUser.prototype, "StudentItemPrefab", void 0);
      __decorate([ property(cc.Prefab) ], CurrentLoggedInUser.prototype, "loadingPrefab", void 0);
      __decorate([ property(cc.Node) ], CurrentLoggedInUser.prototype, "sectionlayout", void 0);
      __decorate([ property(cc.Label) ], CurrentLoggedInUser.prototype, "title", void 0);
      CurrentLoggedInUser = __decorate([ ccclass ], CurrentLoggedInUser);
      return CurrentLoggedInUser;
    }(cc.Component);
    exports.default = CurrentLoggedInUser;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/constants": void 0,
    "../../../common/scripts/util": void 0,
    "../../../common/scripts/util-logger": void 0,
    "./itemButton": "itemButton"
  } ],
  customEditBox: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eca5eATQF5M7p9mWJr29Ecd", "customEditBox");
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
    exports.CustomEditBox = exports.EDIT_STARTED_EVENT = exports.EDIT_ENDED_EVENT = void 0;
    var ccclass = cc._decorator.ccclass;
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    exports.EDIT_ENDED_EVENT = "editEndedCustomEvent";
    exports.EDIT_STARTED_EVENT = "editStartedCustomEvent";
    var CustomEditBox = function(_super) {
      __extends(CustomEditBox, _super);
      function CustomEditBox() {
        var _this = _super.call(this) || this;
        _this.text = "";
        _this.detectParent = "";
        return _this;
      }
      CustomEditBox.prototype.onLoad = function() {
        this.registerListeners();
      };
      CustomEditBox.prototype.registerListeners = function() {
        var baseNode = this.node.getChildByName("base");
        if (null != baseNode) {
          baseNode.on("text-changed", this.textChanged, this);
          baseNode.on("editing-did-began", this.editBegan, this);
          baseNode.on("editing-did-ended", this.editEnded, this);
        }
      };
      CustomEditBox.prototype.textChanged = function(editBox) {
        cc.log("text", editBox.string, "for", editBox.node.parent.name);
        this.text = editBox.string;
        this.detectParent = editBox.node.parent.name;
      };
      CustomEditBox.prototype.editBegan = function(editBox) {
        var customEvent = new cc.Event.EventCustom(exports.EDIT_STARTED_EVENT, true);
        this.node.dispatchEvent(customEvent);
      };
      CustomEditBox.prototype.editEnded = function(editBox) {
        this.textChangedEvent();
      };
      CustomEditBox.prototype.textChangedEvent = function() {
        var customEvent = new cc.Event.EventCustom(exports.EDIT_ENDED_EVENT, true);
        var data = {
          text: this.text,
          detectParent: this.detectParent
        };
        customEvent.setUserData(data);
        this.node.dispatchEvent(customEvent);
      };
      __decorate([ error_handler_1.catchError() ], CustomEditBox.prototype, "onLoad", null);
      CustomEditBox = __decorate([ ccclass ], CustomEditBox);
      return CustomEditBox;
    }(cc.Component);
    exports.CustomEditBox = CustomEditBox;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/error-handler": void 0
  } ],
  editprofile: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bb068UCjT5F+bOoXOg37uLf", "editprofile");
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
    var profile_1 = require("../../../../common/scripts/lib/profile");
    var config_1 = require("../../../../common/scripts/lib/config");
    var avatar_select_1 = require("./avatar_select");
    var util_1 = require("../../../../common/scripts/util");
    var remove_user_popup_1 = require("./remove_user_popup");
    var welcomePage_1 = require("../../loginnew/scripts/welcomePage");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var EditProfile = function(_super) {
      __extends(EditProfile, _super);
      function EditProfile() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.userNameBox = null;
        _this.userImg = null;
        _this.ageSelect = null;
        _this.boySelect = null;
        _this.girlSelect = null;
        _this.ageLabel = null;
        _this.genderLabel = null;
        _this.nameLabel = null;
        _this.chooseAvatarLabel = null;
        _this.teacherLabel = null;
        _this.avatarSelect = null;
        _this.teacherItem = null;
        _this.teacherNode = null;
        _this.teacherNodeToRemove = null;
        return _this;
      }
      EditProfile.prototype.onLoad = function() {
        var uid = cc.sys.localStorage.getItem("userToEdit");
        this.user = profile_1.User.getUser(uid);
        console.log("came in edit profile", this.user);
        this.userNameBox.string = this.user.name;
        this.loadUserImageOrAvatar(this.user);
        this.onSelectGirlOrBoy(this.user.gender);
        this.initializeAge(this.user.age);
        this.avatarSelect.getComponent(avatar_select_1.default).user = this.user;
        this.initializeTeachersList();
        this.i18n();
      };
      EditProfile.prototype.i18n = function() {
        this.ageLabel.string = util_1.Util.i18NText("Age   :");
        this.genderLabel.string = util_1.Util.i18NText("Gender  :");
        this.nameLabel.string = util_1.Util.i18NText("Name   :");
        this.chooseAvatarLabel.string = util_1.Util.i18NText("Choose your avatar");
        this.teacherLabel.string = util_1.Util.i18NText("Class  :");
      };
      EditProfile.prototype.initializeTeachersList = function() {
        var _this = this;
        var key = "teacher_for_student_" + this.user.id;
        var teachersForStudent = JSON.parse(cc.sys.localStorage.getItem(key) || "[]");
        teachersForStudent.forEach(function(e, index) {
          var node = cc.instantiate(_this.teacherItem);
          node.getChildByName("label").getComponent(cc.Label).string = e;
          _this.teacherNode.addChild(node);
        });
      };
      EditProfile.prototype.showRemovePopup = function(e, data) {
        var node = this.teacherNode.getChildByUuid(data);
        this.node.getChildByName("remove").getComponent(remove_user_popup_1.default).isTeacher = true;
        this.node.getChildByName("remove").active = true;
        this.teacherNodeToRemove = node;
      };
      EditProfile.prototype.deleteTeacher = function() {
        if (this.teacherNodeToRemove) {
          this.teacherNode.removeChild(this.teacherNodeToRemove);
          this.teacherNode.getComponent(cc.Layout).updateLayout();
        }
      };
      EditProfile.prototype.loadUserImageOrAvatar = function(currentUser) {
        var _this = this;
        currentUser.imgPath && "" != currentUser.imgPath && currentUser.imgPath.length > 0 ? cc.loader.load(currentUser.imgPath, function(err, texture) {
          if (!err) {
            var temp = new cc.SpriteFrame(texture);
            this.userImg.spriteFrame = temp;
          }
        }) : currentUser.avatarImage && currentUser.avatarImage.length > 0 && cc.resources.load("avatars/" + currentUser.avatarImage, function(err, sp) {
          _this.userImg.spriteFrame = new cc.SpriteFrame(sp);
        });
      };
      EditProfile.prototype.initializeAge = function(age) {
        this.ageSelect.getChildByName(age.toString()).getChildByName("Active").active = true;
      };
      EditProfile.prototype.onClickAvatarEdit = function() {
        this.node.getChildByName("main_screen").active = false;
        this.avatarSelect.active = true;
      };
      EditProfile.prototype.onEditName = function(e) {
        var value = this.userNameBox.node.getChildByName("text").getComponent(cc.Label).string;
        this.user.name = value;
      };
      EditProfile.prototype.onClickAge = function(e, data) {
        for (var i = 0; i < this.ageSelect.childrenCount; i++) this.ageSelect.children[i].getChildByName("Active").active = false;
        e.target.getChildByName("Active").active = true;
        this.selectedAge = parseInt(data);
        this.user.age = this.selectedAge;
      };
      EditProfile.prototype.onClickGenderSelect = function(event, data) {
        if ("Boy" == data) {
          this.user.gender = profile_1.Gender.BOY;
          this.onSelectGirlOrBoy(profile_1.Gender.BOY);
        } else {
          this.user.gender = profile_1.Gender.GIRL;
          this.onSelectGirlOrBoy(profile_1.Gender.GIRL);
        }
      };
      EditProfile.prototype.onSelectGirlOrBoy = function(value) {
        cc.log(value);
        if (value == profile_1.Gender.BOY) {
          this.girlSelect.active = false;
          this.boySelect.active = true;
        } else if (value == profile_1.Gender.GIRL) {
          this.girlSelect.active = true;
          this.boySelect.active = false;
        }
      };
      EditProfile.prototype.onClickDeleteBtn = function() {
        welcomePage_1.default.userArr.length--;
        this.node.getChildByName("remove").active = true;
      };
      EditProfile.prototype.deleteUser = function() {
        profile_1.User.deleteUser(this.user.id);
        config_1.default.getInstance().popScene();
      };
      EditProfile.prototype.onClickBackBtn = function() {
        config_1.default.getInstance().popScene();
      };
      __decorate([ property(cc.EditBox) ], EditProfile.prototype, "userNameBox", void 0);
      __decorate([ property(cc.Sprite) ], EditProfile.prototype, "userImg", void 0);
      __decorate([ property(cc.Node) ], EditProfile.prototype, "ageSelect", void 0);
      __decorate([ property(cc.Node) ], EditProfile.prototype, "boySelect", void 0);
      __decorate([ property(cc.Node) ], EditProfile.prototype, "girlSelect", void 0);
      __decorate([ property(cc.Label) ], EditProfile.prototype, "ageLabel", void 0);
      __decorate([ property(cc.Label) ], EditProfile.prototype, "genderLabel", void 0);
      __decorate([ property(cc.Label) ], EditProfile.prototype, "nameLabel", void 0);
      __decorate([ property(cc.Label) ], EditProfile.prototype, "chooseAvatarLabel", void 0);
      __decorate([ property(cc.Label) ], EditProfile.prototype, "teacherLabel", void 0);
      __decorate([ property(cc.Node) ], EditProfile.prototype, "avatarSelect", void 0);
      __decorate([ property(cc.Prefab) ], EditProfile.prototype, "teacherItem", void 0);
      __decorate([ property(cc.Node) ], EditProfile.prototype, "teacherNode", void 0);
      EditProfile = __decorate([ ccclass ], EditProfile);
      return EditProfile;
    }(cc.Component);
    exports.default = EditProfile;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/config": void 0,
    "../../../../common/scripts/lib/profile": void 0,
    "../../../../common/scripts/util": void 0,
    "../../loginnew/scripts/welcomePage": "welcomePage",
    "./avatar_select": "avatar_select",
    "./remove_user_popup": "remove_user_popup"
  } ],
  itemButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c9c13wcU3lEi7kYWmv3X4Zg", "itemButton");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ItemButton = exports.PARSE_ITEM_SELECTED_EVENT = void 0;
    var ccclass = cc._decorator.ccclass;
    var config_1 = require("../../../common/scripts/lib/config");
    var studentList_1 = require("./studentList");
    var constants_1 = require("../../../common/scripts/lib/constants");
    var profile_1 = require("../../../common/scripts/lib/profile");
    var util_1 = require("../../../common/scripts/util");
    var clickEnabled = true;
    exports.PARSE_ITEM_SELECTED_EVENT = "parseItemSelectedEvent";
    var ItemButton = function(_super) {
      __extends(ItemButton, _super);
      function ItemButton() {
        var _this = _super.call(this) || this;
        _this._item = null;
        return _this;
      }
      ItemButton.prototype.onLoad = function() {
        clickEnabled = true;
      };
      ItemButton.prototype.onItemClicked = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            studentList_1.default.title = this.section.name;
            studentList_1.default.schoolFirebaseId = this.schoolFirebaseId;
            studentList_1.default.section = this.section;
            config_1.default.loadScene("private/school/scenes/studentList", "private", null);
            return [ 2 ];
          });
        });
      };
      ItemButton.prototype.initializeStudent = function(student) {
        return __awaiter(this, void 0, void 0, function() {
          var profileExists, user, studentGender;
          return __generator(this, function(_a) {
            profile_1.default.setItem(profile_1.CURRENTMODE, constants_1.Mode.School);
            profileExists = !!student.profileInfo;
            user = null;
            if (profileExists) {
              cc.log("Student Profile exists:" + student.profileInfo);
              user = profile_1.User.fromJson(student.profileInfo);
              user.schoolId = student.schoolId;
              user.sectionId = student.sectionId;
              user.studentId = student.firebaseId;
              user.imgPath = student.image;
              cc.log("getting user from profile json:" + user);
            } else {
              cc.log("Student Profile doesn't exists");
              studentGender = "male" === student.gender ? profile_1.Gender.BOY : "female" === student.gender ? profile_1.Gender.GIRL : profile_1.Gender.UNKNOWN;
              user = profile_1.User.createUser(student.name, student.image, student.age, studentGender, null, null);
              user.schoolId = student.schoolId;
              user.sectionId = student.sectionId;
              user.studentId = student.firebaseId;
              cc.log("creating new user:" + user);
            }
            profile_1.User.setCurrentUser(user);
            profile_1.User.syncProfile();
            util_1.Util.preloadStartScene(this.node, cc.director.getScene().getChildByName("Canvas").getChildByName("loading"));
            return [ 2 ];
          });
        });
      };
      ItemButton.prototype.onStudentButtonClicked = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              "true" === profile_1.default.getValue(constants_1.IS_REMEMBER_TOGGLE_ON) && cc.sys.localStorage.setItem(constants_1.REMEMBERED_USER, this.studentData.firebaseId);
              cc.sys.localStorage.setItem(constants_1.FIREBASE_SCHOOL_ID, this.studentData.schoolId);
              cc.sys.localStorage.setItem(constants_1.FIREBASE_SECTION_ID, this.studentData.sectionId);
              cc.sys.localStorage.setItem(constants_1.FIREBASE_STUDENT_ID, this.studentData.firebaseId);
              return [ 4, this.initializeStudent(this.studentData) ];

             case 1:
              _a.sent();
              return [ 2 ];
            }
          });
        });
      };
      ItemButton.prototype.itemSelectedEvent = function() {
        var customEvent = new cc.Event.EventCustom(exports.PARSE_ITEM_SELECTED_EVENT, true);
        var selectedData = {
          data: this._item,
          type: this._type
        };
        customEvent.setUserData(selectedData);
        this.node.dispatchEvent(customEvent);
      };
      Object.defineProperty(ItemButton.prototype, "item", {
        set: function(newVal) {
          this._item = newVal;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ItemButton.prototype, "type", {
        set: function(newVal) {
          this._type = newVal;
        },
        enumerable: false,
        configurable: true
      });
      ItemButton = __decorate([ ccclass ], ItemButton);
      return ItemButton;
    }(cc.Component);
    exports.ItemButton = ItemButton;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/constants": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/util": void 0,
    "./studentList": "studentList"
  } ],
  landing: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "01eaaurT2JPkbtbuAWBd1mN", "landing");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Landing = exports.TEACHER_STUDENT_PROGRESS = exports.STUDENT_PROGRESS_FOR_LESSON = exports.TEACHER_HOME = exports.HOME_SCENE = exports.REGISTER_SCENE = exports.TEACHER_REPORT_METRICS_SCENE = exports.TEACHER_REPORT_CARD_SCENE = exports.TEACHER_CHAPTER_LESSONS = exports.TEACHER_REGISTRATION_SCENE = exports.SCHOOL_REGISTRATION_SCENE = exports.SELECT_SECTIONS_SCENE = exports.SECTION_LIST = exports.STUDENT_LIST = void 0;
    var ccclass = cc._decorator.ccclass;
    var constants_1 = require("../../../common/scripts/lib/constants");
    var config_1 = require("../../../common/scripts/lib/config");
    var parseApi_1 = require("../../../common/scripts/services/parseApi");
    var ParseNetwork_1 = require("../../../common/scripts/services/ParseNetwork");
    var profile_1 = require("../../../common/scripts/lib/profile");
    exports.STUDENT_LIST = "private/school/scenes/studentList";
    exports.SECTION_LIST = "private/school/scenes/sectionList";
    exports.SELECT_SECTIONS_SCENE = "private/school/scenes/selectSections";
    exports.SCHOOL_REGISTRATION_SCENE = "private/school/scenes/schoolRegistration";
    exports.TEACHER_REGISTRATION_SCENE = "private/teacher/scenes/teacherRegistration";
    exports.TEACHER_CHAPTER_LESSONS = "private/teacher/scenes/teacherChapterLessons";
    exports.TEACHER_REPORT_CARD_SCENE = "private/teacher/scenes/teacherReportCard";
    exports.TEACHER_REPORT_METRICS_SCENE = "private/teacher/scenes/teacherReportMetrics";
    exports.REGISTER_SCENE = "private/register/scenes/register";
    exports.HOME_SCENE = "menu/home/scenes/home";
    exports.TEACHER_HOME = "private/teacher/scenes/teacherHome";
    exports.STUDENT_PROGRESS_FOR_LESSON = "private/teacher/scenes/teacherStudentProgress";
    exports.TEACHER_STUDENT_PROGRESS = "private/teacher/scenes/teacherStudentProgressScene";
    var Landing = function(_super) {
      __extends(Landing, _super);
      function Landing() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Landing.prototype.onLoad = function() {
        return __awaiter(this, void 0, void 0, function() {
          var selectedMode, _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              ParseNetwork_1.ParseNetwork.init();
              selectedMode = Number(cc.sys.localStorage.getItem(profile_1.CURRENTMODE)) || constants_1.MODE;
              _a = selectedMode;
              switch (_a) {
               case constants_1.Mode.Home:
                return [ 3, 1 ];

               case constants_1.Mode.School:
                return [ 3, 2 ];

               case constants_1.Mode.Teacher:
                return [ 3, 4 ];
              }
              return [ 3, 6 ];

             case 1:
              this.navigateToHome();
              return [ 3, 7 ];

             case 2:
              return [ 4, this.navigateToSchool() ];

             case 3:
              _b.sent();
              return [ 3, 7 ];

             case 4:
              return [ 4, this.navigateToTeacher() ];

             case 5:
              _b.sent();
              return [ 3, 7 ];

             case 6:
              config_1.default.i.pushScene(exports.REGISTER_SCENE, "private", null, true);
              return [ 3, 7 ];

             case 7:
              return [ 2 ];
            }
          });
        });
      };
      Landing.prototype.navigateToHome = function() {
        config_1.default.i.pushScene("private/home/loginnew/scenes/welcomePage", "private", null, true);
      };
      Landing.prototype.navigateToSchool = function() {
        return __awaiter(this, void 0, void 0, function() {
          var loggedInUser, connections;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              loggedInUser = parseApi_1.ParseApi.getInstance().getLoggedInUser();
              return [ 4, parseApi_1.ParseApi.getInstance().connections() ];

             case 1:
              connections = _a.sent();
              !loggedInUser || ParseNetwork_1.ParseNetwork.getInstance().isEmpty(loggedInUser) || ParseNetwork_1.ParseNetwork.getInstance().isEmpty(connections) ? config_1.default.i.pushScene(exports.SCHOOL_REGISTRATION_SCENE, "private", null, true) : config_1.default.i.pushScene(exports.SELECT_SECTIONS_SCENE, "private", null, true);
              return [ 2 ];
            }
          });
        });
      };
      Landing.prototype.navigateToTeacher = function() {
        return __awaiter(this, void 0, void 0, function() {
          var teacherUser;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              teacherUser = parseApi_1.ParseApi.getInstance().getLoggedInUser();
              if (!(!!teacherUser && !ParseNetwork_1.ParseNetwork.getInstance().isEmpty(teacherUser))) return [ 3, 2 ];
              return [ 4, profile_1.default.teacherPostLoginActivity(teacherUser.objectId) ];

             case 1:
              _a.sent();
              config_1.default.i.pushScene(exports.TEACHER_REPORT_CARD_SCENE, "private", null, true);
              return [ 3, 3 ];

             case 2:
              config_1.default.i.pushScene(exports.TEACHER_REGISTRATION_SCENE, "private", null, true);
              _a.label = 3;

             case 3:
              return [ 2 ];
            }
          });
        });
      };
      Landing = __decorate([ ccclass ], Landing);
      return Landing;
    }(cc.Component);
    exports.Landing = Landing;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/constants": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/services/ParseNetwork": void 0,
    "../../../common/scripts/services/parseApi": void 0
  } ],
  languageButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1cd42GPBppAZqMz+dVxCXmD", "languageButton");
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
    var chimple_label_1 = require("../../../../common/scripts/chimple-label");
    var config_1 = require("../../../../common/scripts/lib/config");
    var profile_1 = require("../../../../common/scripts/lib/profile");
    var util_1 = require("../../../../common/scripts/util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LanguageButton = function(_super) {
      __extends(LanguageButton, _super);
      function LanguageButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.parentNode = null;
        _this.languageDropDownNode = null;
        return _this;
      }
      LanguageButton.prototype.onlanguageButtonClicked = function() {
        var _this = this;
        this.languageDropDownNode.active = false;
        var fontToLoad = config_1.LANG_CONFIGS.get(this.language).font;
        this.languageLable.string = config_1.LANG_CONFIGS.get(this.language).displayName;
        config_1.default.i.loadFontDynamically(fontToLoad, function() {
          profile_1.default.setValue(profile_1.LANGUAGE, _this.language);
          util_1.Util.removeAlli18NMapping();
          util_1.Util.loadi18NMapping(function() {
            return _this.i18n();
          });
        });
      };
      LanguageButton.prototype.i18n = function() {
        null != this.parentNode && (this.parentNode.getChildByName("Background").getChildByName("Label").getComponent(chimple_label_1.default).string = util_1.Util.i18NText("Parent"));
        null != this.schoolNode && (this.schoolNode.getChildByName("photo").getChildByName("name").getComponent(chimple_label_1.default).string = util_1.Util.i18NText("School"));
      };
      LanguageButton = __decorate([ ccclass ], LanguageButton);
      return LanguageButton;
    }(cc.Component);
    exports.default = LanguageButton;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/chimple-label": void 0,
    "../../../../common/scripts/lib/config": void 0,
    "../../../../common/scripts/lib/profile": void 0,
    "../../../../common/scripts/util": void 0
  } ],
  languageSelect: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "39e2eFSW1FJt5k3PDCn0OFu", "languageSelect");
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
    var config_1 = require("../../../../common/scripts/lib/config");
    var profile_1 = require("../../../../common/scripts/lib/profile");
    var util_1 = require("../../../../common/scripts/util");
    var chimple_label_1 = require("../../../../common/scripts/chimple-label");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LanguageSelect = function(_super) {
      __extends(LanguageSelect, _super);
      function LanguageSelect() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.languageNode = null;
        _this.nextButton = null;
        _this.indieLangPrefab = null;
        _this.lastSelectedlang = -1;
        _this.normalSprite = null;
        _this.languageContainerNode = null;
        _this.questionNode = null;
        return _this;
      }
      LanguageSelect.prototype.onLoad = function() {
        var _this = this;
        profile_1.default.setValue(profile_1.LANGUAGE, "en");
        util_1.Util.loadi18NMapping(function() {});
        config_1.LANG_CONFIGS.forEach(function(ele, i) {
          var languagePrefab = cc.instantiate(_this.indieLangPrefab);
          var clickEventHandler = new cc.Component.EventHandler();
          clickEventHandler.target = _this.node;
          clickEventHandler.component = "languageSelect";
          clickEventHandler.handler = "onLanguageClick";
          clickEventHandler.customEventData = "" + i;
          var button1 = languagePrefab.children[0].getComponent(cc.Button);
          button1.clickEvents.push(clickEventHandler);
          languagePrefab.children[0].name = "" + i;
          languagePrefab.name = "languageprefabnew" + i;
          var bgColor = cc.Color.BLACK;
          languagePrefab.children[0].getChildByName("Background").color = bgColor.fromHEX("" + ele.colorCode);
          languagePrefab.getChildByName("namesymbol").getComponent(cc.Label).string = ele.symbol;
          languagePrefab.getChildByName("namelabel").getComponent(cc.Label).string = ele.displayName;
          "en" === i && (languagePrefab.getChildByName("ticksprite").active = true);
          _this.languageContainerNode.addChild(languagePrefab);
        });
        this.node.getChildByName("horiscrollview").getComponent(cc.ScrollView).scrollToLeft();
      };
      LanguageSelect.prototype.onLanguageClick = function(event, customEventData) {
        var _this = this;
        for (var i = 0; i < this.languageContainerNode.childrenCount; i++) this.languageContainerNode.children[i].getChildByName("ticksprite").active = false;
        event.target.getParent().getChildByName("ticksprite").active = true;
        this.lastSelectedlang = parseInt(event.currentTarget.name);
        if (profile_1.default.lang != customEventData) {
          profile_1.default.setValue(profile_1.LANGUAGE, customEventData);
          util_1.Util.removeAlli18NMapping();
          util_1.Util.loadi18NMapping(function() {
            var chimpleLabelComponent = _this.questionNode.getComponent(chimple_label_1.default);
            chimpleLabelComponent && (chimpleLabelComponent.string = util_1.Util.i18NText(chimpleLabelComponent.key));
          });
        }
        this.nextButton.getComponent(cc.Button).interactable = true;
      };
      LanguageSelect.prototype.onNextButtonClicked = function(event) {
        var node = event.target;
        var button = node.getComponent(cc.Button);
        button && (button.interactable = false);
        config_1.default.loadScene("private/home/loginnew/scenes/homeLoginScene", "private", null);
      };
      __decorate([ property(cc.Node) ], LanguageSelect.prototype, "languageNode", void 0);
      __decorate([ property(cc.Button) ], LanguageSelect.prototype, "nextButton", void 0);
      __decorate([ property(cc.Prefab) ], LanguageSelect.prototype, "indieLangPrefab", void 0);
      __decorate([ property(cc.Node) ], LanguageSelect.prototype, "languageContainerNode", void 0);
      __decorate([ property(cc.Node) ], LanguageSelect.prototype, "questionNode", void 0);
      LanguageSelect = __decorate([ ccclass ], LanguageSelect);
      return LanguageSelect;
    }(cc.Component);
    exports.default = LanguageSelect;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/chimple-label": void 0,
    "../../../../common/scripts/lib/config": void 0,
    "../../../../common/scripts/lib/profile": void 0,
    "../../../../common/scripts/util": void 0
  } ],
  lessonIndicator: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e284b/znMVKw6QhCzYv7ubP", "lessonIndicator");
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
    var assignHomeWork_1 = require("../../../teacher/scripts/assignHomeWork");
    var util_1 = require("../../../../common/scripts/util");
    var chimple_label_1 = require("../../../../common/scripts/chimple-label");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LessonIndicator = function(_super) {
      __extends(LessonIndicator, _super);
      function LessonIndicator() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.star1 = null;
        _this.star2 = null;
        _this.star3 = null;
        _this.assignHWPrefab = null;
        _this.showAssignment = false;
        return _this;
      }
      LessonIndicator.prototype.onLoad = function() {
        var assignHW = this.node.getChildByName("assignHW");
        !assignHW || (assignHW.active = this.showAssignment);
      };
      LessonIndicator.prototype.onAssignHomeWorkClick = function(event) {
        this.showAssignHWDialog();
      };
      LessonIndicator.prototype.showAssignHWDialog = function() {
        var assignHw = cc.instantiate(this.assignHWPrefab);
        var assignHwComponent = assignHw.getComponent(assignHomeWork_1.AssignHomeWork);
        assignHwComponent.parent = this.popUpParent;
        assignHwComponent.studentId = this.user.id;
        var chimpleLabelComponent = assignHwComponent.text.getComponent(chimple_label_1.default);
        chimpleLabelComponent.string = util_1.Util.i18NText("Assign Home");
        assignHwComponent.chapterId = this.chapter.id;
        assignHwComponent.lessonId = this.lesson.id;
        assignHwComponent.subjectId = this.subjectId;
        assignHw.setPosition(cc.v2(0, 0));
        this.popUpParent.addChild(assignHw);
      };
      __decorate([ property(cc.Label) ], LessonIndicator.prototype, "label", void 0);
      __decorate([ property(cc.Sprite) ], LessonIndicator.prototype, "star1", void 0);
      __decorate([ property(cc.Sprite) ], LessonIndicator.prototype, "star2", void 0);
      __decorate([ property(cc.Sprite) ], LessonIndicator.prototype, "star3", void 0);
      __decorate([ property(cc.Prefab) ], LessonIndicator.prototype, "assignHWPrefab", void 0);
      LessonIndicator = __decorate([ ccclass ], LessonIndicator);
      return LessonIndicator;
    }(cc.Component);
    exports.default = LessonIndicator;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/chimple-label": void 0,
    "../../../../common/scripts/util": void 0,
    "../../../teacher/scripts/assignHomeWork": "assignHomeWork"
  } ],
  loginButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dbb09Ek+bJAu4UovutTtQH8", "loginButton");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.LoginButton = exports.PARSE_LOGIN_EVENT = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    exports.PARSE_LOGIN_EVENT = "parseLoginEvent";
    var LoginButton = function(_super) {
      __extends(LoginButton, _super);
      function LoginButton() {
        var _this = _super.call(this) || this;
        _this.text = null;
        return _this;
      }
      LoginButton.prototype.onLoad = function() {
        var loginButtonComponent = this.node.getComponent(cc.Button);
        null != loginButtonComponent && (loginButtonComponent.interactable = false);
        this.node.active = false;
      };
      LoginButton.prototype.onLoginButtonClick = function() {
        return __awaiter(this, void 0, void 0, function() {
          var loginButtonComponent;
          return __generator(this, function(_a) {
            loginButtonComponent = this.node.getComponent(cc.Button);
            null != loginButtonComponent && (loginButtonComponent.interactable = false);
            this.startParseLoginEvent();
            return [ 2 ];
          });
        });
      };
      Object.defineProperty(LoginButton.prototype, "confirmPassword", {
        set: function(f) {
          this._fullName = f;
        },
        enumerable: false,
        configurable: true
      });
      LoginButton.prototype.fullName = function(f) {
        this._fullName = f;
      };
      LoginButton.prototype.email = function(e) {
        this._email = e;
      };
      LoginButton.prototype.password = function(password) {
        this._password = password;
      };
      LoginButton.prototype.startParseLoginEvent = function() {
        var customEvent = new cc.Event.EventCustom(exports.PARSE_LOGIN_EVENT, true);
        var selectedData = {
          node: this.node,
          email: this._email,
          password: this._password,
          fullName: this._fullName
        };
        customEvent.setUserData(selectedData);
        this.node.dispatchEvent(customEvent);
        this.node.active = false;
      };
      LoginButton.prototype.activate = function() {
        var loginButtonComponent = this.node.getComponent(cc.Button);
        loginButtonComponent.interactable = true;
        this.node.active = true;
      };
      LoginButton.prototype.deActivate = function() {
        var loginButtonComponent = this.node.getComponent(cc.Button);
        loginButtonComponent.interactable = false;
        this.node.active = false;
      };
      __decorate([ property(cc.Node) ], LoginButton.prototype, "text", void 0);
      LoginButton = __decorate([ ccclass ], LoginButton);
      return LoginButton;
    }(cc.Component);
    exports.LoginButton = LoginButton;
    cc._RF.pop();
  }, {} ],
  nameInputScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "21217fBOTxCVqonM4RSKS+v", "nameInputScene");
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
    var collectUserInfo_1 = require("./collectUserInfo");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NameInputScene = function(_super) {
      __extends(NameInputScene, _super);
      function NameInputScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.nameTextLabel = null;
        return _this;
      }
      NameInputScene.prototype.onLoad = function() {
        var editNode = this.node.getChildByName("usernameeditBox");
        this.node.getParent().getParent().getComponent(collectUserInfo_1.default).disableButton();
        null != editNode && editNode.on("text-changed", this.textChanged, this);
      };
      NameInputScene.prototype.textChanged = function(editBox) {
        "" == editBox.string ? this.node.getParent().getParent().getComponent(collectUserInfo_1.default).disableButton() : this.node.getParent().getParent().getComponent(collectUserInfo_1.default).enableButton();
        this.node.getParent().getParent().getComponent(collectUserInfo_1.default).userName = editBox.string;
      };
      NameInputScene.prototype.onResetClick = function(event) {
        this.node.getChildByName("usernameeditBox").getComponent(cc.EditBox).string = "";
      };
      __decorate([ property(cc.Label) ], NameInputScene.prototype, "nameTextLabel", void 0);
      NameInputScene = __decorate([ ccclass ], NameInputScene);
      return NameInputScene;
    }(cc.Component);
    exports.default = NameInputScene;
    cc._RF.pop();
  }, {
    "./collectUserInfo": "collectUserInfo"
  } ],
  nextButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a3845x7bEpLUKWeCHHa1v4w", "nextButton");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.NextButton = exports.PARSE_LOGIN_EVENT = void 0;
    var ccclass = cc._decorator.ccclass;
    exports.PARSE_LOGIN_EVENT = "parseLoginEvent";
    var NextButton = function(_super) {
      __extends(NextButton, _super);
      function NextButton() {
        return _super.call(this) || this;
      }
      NextButton.prototype.onNextButtonClick = function() {
        return __awaiter(this, void 0, void 0, function() {
          var nextButtonComponent;
          return __generator(this, function(_a) {
            nextButtonComponent = this.node.getComponent(cc.Button);
            null != nextButtonComponent && (nextButtonComponent.interactable = false);
            this.startParseLoginEvent();
            return [ 2 ];
          });
        });
      };
      NextButton.prototype.playSound = function() {
        var source = this.node.getComponent(cc.AudioSource);
        source.play();
      };
      Object.defineProperty(NextButton.prototype, "schoolCode", {
        set: function(code) {
          this._code = code;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NextButton.prototype, "password", {
        set: function(password) {
          this._password = password;
        },
        enumerable: false,
        configurable: true
      });
      NextButton.prototype.startParseLoginEvent = function() {
        var customEvent = new cc.Event.EventCustom(exports.PARSE_LOGIN_EVENT, true);
        var selectedData = {
          node: this.node,
          code: this._code,
          password: this._password
        };
        customEvent.setUserData(selectedData);
        this.node.dispatchEvent(customEvent);
        this.node.active = false;
      };
      NextButton.prototype.activate = function() {
        this.node.active = true;
      };
      NextButton.prototype.deActivate = function() {
        this.node.active = false;
      };
      NextButton = __decorate([ ccclass ], NextButton);
      return NextButton;
    }(cc.Component);
    exports.NextButton = NextButton;
    cc._RF.pop();
  }, {} ],
  otp_verifier: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "14c32lOoplHMaXnV1VmqHLU", "otp_verifier");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.OtpStatus = void 0;
    var profile_1 = require("../../../../common/scripts/lib/profile");
    var util_1 = require("../../../../common/scripts/util");
    var util_logger_1 = require("../../../../common/scripts/util-logger");
    var secondscreen_1 = require("./secondscreen");
    var OtpStatus;
    (function(OtpStatus) {
      OtpStatus[OtpStatus["VERIFIED"] = 0] = "VERIFIED";
      OtpStatus[OtpStatus["VERIFYING"] = 1] = "VERIFYING";
      OtpStatus[OtpStatus["NOT_VERIFIED"] = 2] = "NOT_VERIFIED";
      OtpStatus[OtpStatus["OTP_RESEND"] = 3] = "OTP_RESEND";
    })(OtpStatus = exports.OtpStatus || (exports.OtpStatus = {}));
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    cc.phoneVerificationSucceeded = function(id, otp) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
           case 0:
            cc.log("phoneVerificationSucceeded");
            return [ 4, profile_1.default.setItem(profile_1.IS_OTP_VERIFIED, 1) ];

           case 1:
            _a.sent();
            return [ 2 ];
          }
        });
      });
    };
    cc.phoneVerificationFailed = function() {
      profile_1.default.setItem(profile_1.IS_OTP_VERIFIED, -1);
    };
    var OtpVerifier = function(_super) {
      __extends(OtpVerifier, _super);
      function OtpVerifier() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.editBox = null;
        _this.confirmBtn = null;
        _this.title = null;
        _this.btnLabel = null;
        _this.errLabel = null;
        _this.otpStatus = OtpStatus.NOT_VERIFIED;
        return _this;
      }
      OtpVerifier.prototype.onEnable = function() {
        this.title.string = util_1.Util.i18NText("We sent an OTP to verify your number.");
        this.editBox.string = "";
        this.confirmBtn.interactable = false;
        this.btnLabel.string = util_1.Util.i18NText("Confirm");
        this.editBox.placeholder = util_1.Util.i18NText("Enter the 6-digit otp here...");
        this.errLabel.string = "";
        this.editBox.enabled = true;
      };
      OtpVerifier.prototype.onClose = function() {
        this.node.active = false;
        this.unscheduleAllCallbacks();
      };
      OtpVerifier.prototype.onEditingBegan = function() {
        this.editBox.placeholderLabel.string = "";
      };
      OtpVerifier.prototype.onTextChanged = function() {
        var otp = this.editBox.string;
        6 === otp.length ? this.confirmBtn.interactable = true : this.confirmBtn.interactable = false;
      };
      OtpVerifier.prototype.onEnterOtp = function() {
        if (this.otpStatus === OtpStatus.OTP_RESEND) {
          util_logger_1.default.requestOtp(profile_1.default.getValue(profile_1.CONTACT));
          this.otpStatus = OtpStatus.NOT_VERIFIED;
          this.btnLabel.string = util_1.Util.i18NText("Confirm");
          this.confirmBtn.interactable = false;
          this.errLabel.string = "";
          this.editBox.string = "";
        } else {
          var otp = this.editBox.string;
          util_logger_1.default.verifyOtp(otp);
          this.otpStatus = OtpStatus.VERIFYING;
          this.setOtpStatus();
        }
      };
      OtpVerifier.prototype.setOtpStatus = function() {
        var _this = this;
        cc.log("setOtp ", this.otpStatus);
        if (this.otpStatus === OtpStatus.VERIFIED) {
          this.node.active = false;
          this.node.parent.getComponent(secondscreen_1.default).setContactVerifiedStatus();
        } else if (this.otpStatus === OtpStatus.NOT_VERIFIED) {
          this.errLabel.string = util_1.Util.i18NText("Cannot verify OTP");
          this.btnLabel.string = util_1.Util.i18NText("Resend OTP");
          this.otpStatus = OtpStatus.OTP_RESEND;
          this.editBox.enabled = true;
        } else if (this.otpStatus === OtpStatus.VERIFYING) {
          this.btnLabel.string = util_1.Util.i18NText("verifying...");
          this.editBox.enabled = false;
          var checkCount_1 = 20;
          var result_1 = 0;
          var callback_1 = function() {
            result_1 = profile_1.default.getItem(profile_1.IS_OTP_VERIFIED);
            cc.log("checking ", checkCount_1, result_1);
            if (checkCount_1 < 1 || 1 === result_1 || -1 === result_1) {
              _this.unschedule(callback_1);
              if (1 === result_1) {
                _this.otpStatus = OtpStatus.VERIFIED;
                _this.setOtpStatus();
              } else {
                _this.otpStatus = OtpStatus.NOT_VERIFIED;
                _this.setOtpStatus();
              }
            }
            checkCount_1--;
          };
          this.schedule(callback_1, 3);
        }
      };
      __decorate([ property(cc.EditBox) ], OtpVerifier.prototype, "editBox", void 0);
      __decorate([ property(cc.Button) ], OtpVerifier.prototype, "confirmBtn", void 0);
      __decorate([ property(cc.Label) ], OtpVerifier.prototype, "title", void 0);
      __decorate([ property(cc.Label) ], OtpVerifier.prototype, "btnLabel", void 0);
      __decorate([ property(cc.Label) ], OtpVerifier.prototype, "errLabel", void 0);
      OtpVerifier = __decorate([ ccclass ], OtpVerifier);
      return OtpVerifier;
    }(cc.Component);
    exports.default = OtpVerifier;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/profile": void 0,
    "../../../../common/scripts/util": void 0,
    "../../../../common/scripts/util-logger": void 0,
    "./secondscreen": "secondscreen"
  } ],
  registerButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cc3daIWYGBAUYjAAtXofv6w", "registerButton");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.RegisterButton = exports.REGISTER_ITEM_SELECTED_EVENT = exports.RegisterType = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var RegisterType;
    (function(RegisterType) {
      RegisterType[RegisterType["Child"] = 1] = "Child";
      RegisterType[RegisterType["Teacher"] = 2] = "Teacher";
      RegisterType[RegisterType["School"] = 3] = "School";
    })(RegisterType = exports.RegisterType || (exports.RegisterType = {}));
    exports.REGISTER_ITEM_SELECTED_EVENT = "REGISTER_ITEM_SELECTED_EVENT";
    var clickEnabled = true;
    var RegisterButton = function(_super) {
      __extends(RegisterButton, _super);
      function RegisterButton() {
        var _this = _super.call(this) || this;
        _this.regType = 0;
        return _this;
      }
      RegisterButton.prototype.onLoad = function() {
        clickEnabled = true;
      };
      RegisterButton.prototype.onClicked = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            if (clickEnabled) {
              clickEnabled = false;
              this.itemSelectedEvent();
            }
            return [ 2 ];
          });
        });
      };
      RegisterButton.prototype.itemSelectedEvent = function() {
        var customEvent = new cc.Event.EventCustom(exports.REGISTER_ITEM_SELECTED_EVENT, true);
        var selectedData = {
          type: this.regType
        };
        customEvent.setUserData(selectedData);
        this.node.dispatchEvent(customEvent);
      };
      __decorate([ property ], RegisterButton.prototype, "regType", void 0);
      RegisterButton = __decorate([ ccclass ], RegisterButton);
      return RegisterButton;
    }(cc.Component);
    exports.RegisterButton = RegisterButton;
    cc._RF.pop();
  }, {} ],
  register: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f2caa7WuFZN+Y3b/p1vf5Ji", "register");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Register = void 0;
    var ccclass = cc._decorator.ccclass;
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var chimple_label_1 = require("../../../common/scripts/chimple-label");
    var util_1 = require("../../../common/scripts/util");
    var registerButton_1 = require("./registerButton");
    var constants_1 = require("../../../common/scripts/lib/constants");
    var config_1 = require("../../../common/scripts/lib/config");
    var parseApi_1 = require("../../../common/scripts/services/parseApi");
    var ParseNetwork_1 = require("../../../common/scripts/services/ParseNetwork");
    var profile_1 = require("../../../common/scripts/lib/profile");
    var landing_1 = require("../../school/scripts/landing");
    var selectionScene_1 = require("../../school/scripts/selectionScene");
    var PHOTO = "photo";
    var NAME = "name";
    var Register = function(_super) {
      __extends(Register, _super);
      function Register() {
        return _super.call(this) || this;
      }
      Register.prototype.onLoad = function() {
        this.registerTypeEvent();
        this.renderUI();
      };
      Register.prototype.renderUI = function() {
        var layout = this.node.getChildByName("layout");
        var layoutComponent = layout.getComponent(cc.Layout);
        layout.children.forEach(function(c) {
          var photo = c.getChildByName(PHOTO);
          var name = photo.getChildByName(NAME);
          var chimpleLabel = name.getComponent(chimple_label_1.default);
          chimpleLabel.string = util_1.Util.i18NText(chimpleLabel.string);
        });
      };
      Register.prototype.registerTypeEvent = function() {
        var _this = this;
        this.node.on(registerButton_1.REGISTER_ITEM_SELECTED_EVENT, function(event) {
          return __awaiter(_this, void 0, void 0, function() {
            var selectedItem, _a;
            return __generator(this, function(_b) {
              switch (_b.label) {
               case 0:
                event.stopPropagation();
                selectedItem = event.getUserData();
                _a = selectedItem.type;
                switch (_a) {
                 case registerButton_1.RegisterType.Child:
                  return [ 3, 1 ];

                 case registerButton_1.RegisterType.Teacher:
                  return [ 3, 2 ];

                 case registerButton_1.RegisterType.School:
                  return [ 3, 4 ];
                }
                return [ 3, 6 ];

               case 1:
                constants_1.MODE = constants_1.Mode.Home;
                this.navigateToHome();
                return [ 3, 6 ];

               case 2:
                constants_1.MODE = constants_1.Mode.Teacher;
                return [ 4, this.navigateToTeacher() ];

               case 3:
                _b.sent();
                return [ 3, 6 ];

               case 4:
                cc.log("registration type", registerButton_1.RegisterType.School);
                constants_1.MODE = constants_1.Mode.School;
                return [ 4, this.navigateToSchool() ];

               case 5:
                _b.sent();
                return [ 3, 6 ];

               case 6:
                return [ 2 ];
              }
            });
          });
        });
      };
      Register.prototype.navigateToHome = function() {
        config_1.default.loadScene("private/home/loginnew/scenes/welcomePage", "private", null);
      };
      Register.prototype.navigateToSchool = function() {
        return __awaiter(this, void 0, void 0, function() {
          var loggedInUser, connections;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              loggedInUser = parseApi_1.ParseApi.getInstance().getLoggedInUser();
              return [ 4, parseApi_1.ParseApi.getInstance().connections() ];

             case 1:
              connections = _a.sent();
              !loggedInUser || ParseNetwork_1.ParseNetwork.getInstance().isEmpty(loggedInUser) || ParseNetwork_1.ParseNetwork.getInstance().isEmpty(connections) ? config_1.default.i.pushScene(landing_1.SCHOOL_REGISTRATION_SCENE, "private", null) : config_1.default.i.pushScene(landing_1.SELECT_SECTIONS_SCENE, "private", null, true);
              return [ 2 ];
            }
          });
        });
      };
      Register.prototype.navigateToTeacher = function() {
        return __awaiter(this, void 0, void 0, function() {
          var teacherUser, nextScene;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              teacherUser = parseApi_1.ParseApi.getInstance().getLoggedInUser();
              if (!(!!teacherUser && !ParseNetwork_1.ParseNetwork.getInstance().isEmpty(teacherUser))) return [ 3, 2 ];
              return [ 4, profile_1.default.teacherPostLoginActivity(teacherUser.objectId) ];

             case 1:
              _a.sent();
              nextScene = landing_1.SELECT_SECTIONS_SCENE;
              selectionScene_1.nextSelectMode = parseApi_1.SelectionMode.Section;
              config_1.default.i.pushScene(nextScene, "private", null, true);
              return [ 3, 3 ];

             case 2:
              config_1.default.i.pushScene(landing_1.TEACHER_REGISTRATION_SCENE, "private", null);
              _a.label = 3;

             case 3:
              return [ 2 ];
            }
          });
        });
      };
      __decorate([ error_handler_1.catchError() ], Register.prototype, "onLoad", null);
      Register = __decorate([ ccclass ], Register);
      return Register;
    }(cc.Component);
    exports.Register = Register;
    cc._RF.pop();
  }, {
    "../../../common/scripts/chimple-label": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/constants": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/services/ParseNetwork": void 0,
    "../../../common/scripts/services/parseApi": void 0,
    "../../../common/scripts/util": void 0,
    "../../school/scripts/landing": "landing",
    "../../school/scripts/selectionScene": "selectionScene",
    "./registerButton": "registerButton"
  } ],
  remove_user_popup: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "be6cfwwREpN44VdoGn/98c2", "remove_user_popup");
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
    var util_1 = require("../../../../common/scripts/util");
    var editprofile_1 = require("./editprofile");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var RemoveUserPopup = function(_super) {
      __extends(RemoveUserPopup, _super);
      function RemoveUserPopup() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.removeUserLabel = null;
        _this.isTeacher = false;
        return _this;
      }
      RemoveUserPopup.prototype.onClickYesButton = function() {
        var comp = this.node.parent.getComponent(editprofile_1.default);
        this.isTeacher ? comp.deleteTeacher() : comp.deleteUser();
      };
      RemoveUserPopup.prototype.onClickNoButton = function() {
        this.node.active = false;
        this.isTeacher = false;
      };
      RemoveUserPopup.prototype.onClickHelpButton = function() {
        cc.sys.openURL("https://wa.me/917019270679");
        this.node.active = false;
      };
      RemoveUserPopup.prototype.onEnable = function() {
        var title = this.isTeacher ? "Remove Teacher?" : "Remove User?";
        this.removeUserLabel.string = util_1.Util.i18NText(title);
      };
      __decorate([ property(cc.Label) ], RemoveUserPopup.prototype, "removeUserLabel", void 0);
      __decorate([ property ], RemoveUserPopup.prototype, "isTeacher", void 0);
      RemoveUserPopup = __decorate([ ccclass ], RemoveUserPopup);
      return RemoveUserPopup;
    }(cc.Component);
    exports.default = RemoveUserPopup;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/util": void 0,
    "./editprofile": "editprofile"
  } ],
  rowButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fcccaSls2lH7Iq+uJVF7CP2", "rowButton");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ccclass = cc._decorator.ccclass;
    var config_1 = require("../../../common/scripts/lib/config");
    var landing_1 = require("../../school/scripts/landing");
    var teacherStudentProcessScene_1 = require("./teacherStudentProcessScene");
    var profile_1 = require("../../../common/scripts/lib/profile");
    var RowButton = function(_super) {
      __extends(RowButton, _super);
      function RowButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.studentId = null;
        return _this;
      }
      RowButton.prototype.onLoad = function() {};
      RowButton.prototype.onRowClicked = function(event) {
        return __awaiter(this, void 0, void 0, function() {
          var student;
          return __generator(this, function(_a) {
            if (null !== this.studentId) {
              cc.log(this.studentId);
              student = profile_1.User.createUserOrFindExistingUser({
                id: this.studentId
              });
              teacherStudentProcessScene_1.default.user = student;
              config_1.default.i.pushScene(landing_1.TEACHER_STUDENT_PROGRESS, "private");
            }
            return [ 2 ];
          });
        });
      };
      RowButton = __decorate([ ccclass ], RowButton);
      return RowButton;
    }(cc.Component);
    exports.default = RowButton;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../school/scripts/landing": "landing",
    "./teacherStudentProcessScene": "teacherStudentProcessScene"
  } ],
  schoolBackButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "99930asPRRJYLkyrWkOoY87", "schoolBackButton");
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
    exports.SchoolBackButton = void 0;
    var ccclass = cc._decorator.ccclass;
    var config_1 = require("../../../common/scripts/lib/config");
    var parseApi_1 = require("../../../common/scripts/services/parseApi");
    var selectionScene_1 = require("./selectionScene");
    var landing_1 = require("./landing");
    var SchoolBackButton = function(_super) {
      __extends(SchoolBackButton, _super);
      function SchoolBackButton() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      SchoolBackButton.prototype.onButtonClick = function(event, customEventData) {
        selectionScene_1.nextSelectMode = selectionScene_1.nextSelectMode === parseApi_1.SelectionMode.Student ? parseApi_1.SelectionMode.Section : parseApi_1.SelectionMode.Subject ? parseApi_1.SelectionMode.Student : parseApi_1.SelectionMode.Section;
        config_1.default.loadScene(landing_1.SELECT_SECTIONS_SCENE, "private", null);
      };
      SchoolBackButton = __decorate([ ccclass ], SchoolBackButton);
      return SchoolBackButton;
    }(cc.Component);
    exports.SchoolBackButton = SchoolBackButton;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/services/parseApi": void 0,
    "./landing": "landing",
    "./selectionScene": "selectionScene"
  } ],
  schoolButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "effb5SDjXpDpbVpglwVX9+v", "schoolButton");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var config_1 = require("../../../../common/scripts/lib/config");
    var landing_1 = require("../../../school/scripts/landing");
    var ParseNetwork_1 = require("../../../../common/scripts/services/ParseNetwork");
    var parseApi_1 = require("../../../../common/scripts/services/parseApi");
    var profile_1 = require("../../../../common/scripts/lib/profile");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SchoolButton = function(_super) {
      __extends(SchoolButton, _super);
      function SchoolButton() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      SchoolButton.prototype.onSchoolButtonClicked = function(event) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              profile_1.default.setItem(profile_1.IN_LOGIN_FLOW, 0);
              return [ 4, this.navigateToSchool() ];

             case 1:
              _a.sent();
              return [ 2 ];
            }
          });
        });
      };
      SchoolButton.prototype.navigateToSchool = function() {
        return __awaiter(this, void 0, void 0, function() {
          var loggedInUser, connections;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              loggedInUser = parseApi_1.ParseApi.getInstance().getLoggedInUser();
              return [ 4, parseApi_1.ParseApi.getInstance().connections() ];

             case 1:
              connections = _a.sent();
              !loggedInUser || ParseNetwork_1.ParseNetwork.getInstance().isEmpty(loggedInUser) || ParseNetwork_1.ParseNetwork.getInstance().isEmpty(connections) ? config_1.default.i.pushScene(landing_1.SCHOOL_REGISTRATION_SCENE, "private", null) : config_1.default.i.pushScene(landing_1.SELECT_SECTIONS_SCENE, "private", null, true);
              return [ 2 ];
            }
          });
        });
      };
      SchoolButton = __decorate([ ccclass ], SchoolButton);
      return SchoolButton;
    }(cc.Component);
    exports.default = SchoolButton;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/config": void 0,
    "../../../../common/scripts/lib/profile": void 0,
    "../../../../common/scripts/services/ParseNetwork": void 0,
    "../../../../common/scripts/services/parseApi": void 0,
    "../../../school/scripts/landing": "landing"
  } ],
  schoolRegistration: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f992aetn+tBxJz04xkwgPJz", "schoolRegistration");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SchoolRegistration = exports.EditOptions = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var EditBox = cc.EditBox;
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var nextButton_1 = require("./nextButton");
    var parseApi_1 = require("../../../common/scripts/services/parseApi");
    var config_1 = require("../../../common/scripts/lib/config");
    var selectionScene_1 = require("./selectionScene");
    var landing_1 = require("./landing");
    var util_logger_1 = require("../../../common/scripts/util-logger");
    var constants_1 = require("../../../common/scripts/lib/constants");
    var profile_1 = require("../../../common/scripts/lib/profile");
    var EditOptions;
    (function(EditOptions) {
      EditOptions["SchoolCodeChanged"] = "0";
      EditOptions["PasswordChanged"] = "1";
    })(EditOptions = exports.EditOptions || (exports.EditOptions = {}));
    var SCHOOL_CODE_PLACEHOLDER = "Email id";
    var PASSWORD_PLACEHOLDER = "password";
    cc.loginSucceeded = function(schoolInfo) {
      return __awaiter(this, void 0, void 0, function() {
        var school;
        return __generator(this, function(_a) {
          cc.sys.localStorage.setItem("loginUser", SchoolRegistration.loginUser);
          cc.sys.localStorage.setItem("loginPassword", SchoolRegistration.loginPassword);
          cc.log("loginSucceeded: " + schoolInfo);
          if (!!schoolInfo) {
            school = JSON.parse(schoolInfo);
            cc.sys.localStorage.setItem("SCHOOL_USER", school.firebaseId);
            cc.sys.localStorage.setItem("SCHOOL_CODE", school.schoolCode);
            profile_1.default.setItem(profile_1.CURRENTMODE, constants_1.Mode.School);
            setTimeout(function() {
              var nextScene = landing_1.SECTION_LIST;
              selectionScene_1.nextSelectMode = parseApi_1.SelectionMode.Section;
              config_1.default.i.pushScene(nextScene, "private", null, true);
            }, 5);
          }
          return [ 2 ];
        });
      });
    };
    cc.loginFailed = function(reason) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          SchoolRegistration.registrationNode.getComponent(cc.Button).interactable = true;
          SchoolRegistration.registrationNode.parent.getChildByName("block").active = false;
          SchoolRegistration.loading.active = false;
          SchoolRegistration.warning.active = true;
          cc.log("loginFailed: " + reason);
          return [ 2 ];
        });
      });
    };
    var SchoolRegistration = function(_super) {
      __extends(SchoolRegistration, _super);
      function SchoolRegistration() {
        var _this = _super.call(this) || this;
        _this.customEditBoxPrefab = null;
        _this.nextButtonPrefab = null;
        _this.loadingPrefab = null;
        _this.warningPrefab = null;
        _this.userNameBox = null;
        _this.passwordBox = null;
        _this.enableSprite = null;
        _this.disableSprite = null;
        _this.nextButtonNode = null;
        _this.rememberNode = null;
        _this.schoolEditBox = null;
        _this.nextButton = null;
        _this.schoolCode = null;
        _this.password = null;
        return _this;
      }
      SchoolRegistration_1 = SchoolRegistration;
      SchoolRegistration.prototype.onLoad = function() {
        return __awaiter(this, void 0, Promise, function() {
          var loggedInUser;
          return __generator(this, function(_a) {
            this.createLoading();
            loggedInUser = cc.sys.localStorage.getItem("loginUser");
            if (null != loggedInUser) {
              this.userNameBox.string = loggedInUser;
              this.loginEmail = loggedInUser;
              this.enableNextButton();
            }
            null != cc.sys.localStorage.getItem(constants_1.IS_REMEMBER_TOGGLE_ON) && "true" === cc.sys.localStorage.getItem(constants_1.IS_REMEMBER_TOGGLE_ON) ? this.rememberNode.getComponent(cc.Toggle).isChecked = true : this.rememberNode.getComponent(cc.Toggle).isChecked = false;
            return [ 2 ];
          });
        });
      };
      SchoolRegistration.prototype.createLoading = function() {
        SchoolRegistration_1.loading = cc.instantiate(this.loadingPrefab);
        SchoolRegistration_1.warning = cc.instantiate(this.warningPrefab);
        SchoolRegistration_1.loading.zIndex = 3;
        this.node.getParent().addChild(SchoolRegistration_1.loading);
        this.node.addChild(SchoolRegistration_1.warning);
        SchoolRegistration_1.warning.active = false;
        SchoolRegistration_1.loading.active = false;
      };
      SchoolRegistration.prototype.showLoading = function() {
        SchoolRegistration_1.loading.active = true;
      };
      SchoolRegistration.prototype.hideLoading = function() {
        SchoolRegistration_1.loading.active = false;
      };
      SchoolRegistration.prototype.errorMessage = function() {
        this.node.parent.getChildByName("error").active = true;
        this.node.parent.getChildByName("cancelButton").active = true;
      };
      SchoolRegistration.prototype.onCancelButtonClick = function() {
        this.node.parent.getChildByName("error").active = false;
        this.node.parent.getChildByName("cancelButton").active = false;
        this.enableNextButton();
        SchoolRegistration_1.registrationNode.getComponent(cc.Button).interactable = true;
      };
      SchoolRegistration.prototype.onNextButtonClick = function() {
        var loggedInUser = cc.sys.localStorage.getItem("loginUser");
        null != loggedInUser ? this.checkPasswordCache(this.loginPassword) : this.parseLogin();
      };
      SchoolRegistration.prototype.parseLogin = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            SchoolRegistration_1.registrationNode = this.nextButtonNode.node;
            if (util_logger_1.default.isNetworkAvailable()) {
              SchoolRegistration_1.registrationNode.parent.getChildByName("block").active = true;
              SchoolRegistration_1.registrationNode.parent.getChildByName("block").opacity = 80;
              this.showLoading();
              SchoolRegistration_1.loginUser = this.loginEmail;
              SchoolRegistration_1.loginPassword = this.loginPassword;
              util_logger_1.default.login(this.loginEmail, this.loginPassword);
            } else this.errorMessage();
            return [ 2 ];
          });
        });
      };
      SchoolRegistration.prototype.showNext = function() {
        var nextButtonComponent = this.nextButton.getComponent(nextButton_1.NextButton);
        nextButtonComponent.schoolCode = this.schoolCode;
        nextButtonComponent.password = this.password;
        var shouldShowActive = !(!this.schoolCode || !this.password);
        shouldShowActive ? nextButtonComponent.activate() : nextButtonComponent.deActivate();
      };
      SchoolRegistration.prototype.onEditName = function(e) {
        var value = this.userNameBox.node.getChildByName("text").getComponent(cc.Label).string;
        this.loginEmail = value;
        this.enableNextButton();
      };
      SchoolRegistration.prototype.onCrossButtonClicked = function() {
        this.userNameBox.node.getChildByName("text").getComponent(cc.Label).string = " ";
        this.userNameBox.node.getChildByName("placeholder").getComponent(cc.Label).string = " ";
        this.loginEmail = null;
        this.nextButtonNode.interactable = false;
        this.nextButtonNode.node.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = this.disableSprite;
      };
      SchoolRegistration.prototype.enableNextButton = function() {
        if (null != this.loginPassword && null != this.loginEmail && this.loginPassword.length >= 4) {
          this.nextButtonNode.interactable = true;
          this.nextButtonNode.node.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = this.enableSprite;
        } else this.disableNextButton();
      };
      SchoolRegistration.prototype.disableNextButton = function() {
        this.nextButtonNode.interactable = false;
        this.nextButtonNode.node.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = this.disableSprite;
      };
      SchoolRegistration.prototype.onEditPasswod = function(e) {
        var value = e.string;
        this.loginPassword = value;
        this.enableNextButton();
      };
      SchoolRegistration.prototype.checkPasswordCache = function(password) {
        if (password === cc.sys.localStorage.getItem("loginPassword")) {
          cc.sys.localStorage.removeItem(constants_1.REMEMBERED_USER);
          config_1.default.i.pushScene("private/school/scenes/sectionList", "private", null, true);
        } else {
          SchoolRegistration_1.registrationNode = this.nextButtonNode.node;
          SchoolRegistration_1.registrationNode.getComponent(cc.Button).interactable = true;
          SchoolRegistration_1.registrationNode.parent.getChildByName("block").active = false;
          SchoolRegistration_1.loading.active = false;
          SchoolRegistration_1.warning.active = true;
        }
      };
      SchoolRegistration.prototype.showPassword = function() {
        this.passwordBox.node.getComponent(cc.EditBox).inputFlag = EditBox.InputFlag.PASSWORD;
        this.passwordBox.node.getChildByName("show").active = false;
        this.passwordBox.node.getChildByName("hide").active = true;
      };
      SchoolRegistration.prototype.hidePassword = function() {
        this.passwordBox.node.getComponent(cc.EditBox).inputFlag = EditBox.InputFlag.DEFAULT;
        this.passwordBox.node.getChildByName("show").active = true;
        this.passwordBox.node.getChildByName("hide").active = false;
      };
      SchoolRegistration.prototype.onClickBackBtn = function() {
        config_1.default.i.popScene();
      };
      SchoolRegistration.prototype.onRememberButtonClick = function(toggle, customEventData) {
        toggle.isChecked ? profile_1.default.setValue(constants_1.IS_REMEMBER_TOGGLE_ON, "true") : profile_1.default.setValue(constants_1.IS_REMEMBER_TOGGLE_ON, "false");
      };
      var SchoolRegistration_1;
      SchoolRegistration.loading = null;
      SchoolRegistration.warning = null;
      __decorate([ property(cc.Prefab) ], SchoolRegistration.prototype, "customEditBoxPrefab", void 0);
      __decorate([ property(cc.Prefab) ], SchoolRegistration.prototype, "nextButtonPrefab", void 0);
      __decorate([ property(cc.Prefab) ], SchoolRegistration.prototype, "loadingPrefab", void 0);
      __decorate([ property(cc.Prefab) ], SchoolRegistration.prototype, "warningPrefab", void 0);
      __decorate([ property(cc.EditBox) ], SchoolRegistration.prototype, "userNameBox", void 0);
      __decorate([ property(cc.EditBox) ], SchoolRegistration.prototype, "passwordBox", void 0);
      __decorate([ property(cc.SpriteFrame) ], SchoolRegistration.prototype, "enableSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], SchoolRegistration.prototype, "disableSprite", void 0);
      __decorate([ property(cc.Button) ], SchoolRegistration.prototype, "nextButtonNode", void 0);
      __decorate([ property(cc.Node) ], SchoolRegistration.prototype, "rememberNode", void 0);
      __decorate([ error_handler_1.catchError() ], SchoolRegistration.prototype, "onLoad", null);
      SchoolRegistration = SchoolRegistration_1 = __decorate([ ccclass ], SchoolRegistration);
      return SchoolRegistration;
    }(cc.Component);
    exports.SchoolRegistration = SchoolRegistration;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/constants": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/services/parseApi": void 0,
    "../../../common/scripts/util-logger": void 0,
    "./landing": "landing",
    "./nextButton": "nextButton",
    "./selectionScene": "selectionScene"
  } ],
  secondscreen: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1e091pYv81BPbP8UkNwGn4Z", "secondscreen");
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
    var config_1 = require("../../../../common/scripts/lib/config");
    var profile_1 = require("../../../../common/scripts/lib/profile");
    var util_1 = require("../../../../common/scripts/util");
    var util_logger_1 = require("../../../../common/scripts/util-logger");
    var welcomePage_1 = require("../../loginnew/scripts/welcomePage");
    var usercomponent_1 = require("./usercomponent");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var EMAIL_VALIDATION_RE = /^((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))|)$/;
    var EMAIL_ERR = "Invalid Email Address";
    var CONTACT_ERR = "Invalid Phone Number";
    var SecondScreen = function(_super) {
      __extends(SecondScreen, _super);
      function SecondScreen() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.addButton = null;
        _this.userNode = null;
        _this.bgMusic = null;
        _this.settingNode = null;
        _this.profileNode = null;
        _this.helpNode = null;
        _this.contactNode = null;
        _this.soundHandle = null;
        _this.musicHandle = null;
        _this.languageLabel = null;
        _this.userPrefab = null;
        _this.verifyLabel = null;
        _this.userLayout = null;
        _this.contactEditBox = null;
        _this.dialingCodeLabel = null;
        _this.notifier = null;
        _this.tabLayout = null;
        _this.soundOff = false;
        _this.musicOff = false;
        _this.isEmailInvalid = false;
        _this.isContactInvalid = false;
        _this.contactFieldValue = "";
        _this.isContactVerified = false;
        return _this;
      }
      SecondScreen.prototype.onLoad = function() {
        1 === profile_1.default.getItem(profile_1.IS_OTP_VERIFIED) && (this.verifyLabel.node.parent.getComponent(cc.Button).interactable = false);
        util_1.Util.playSfx(this.bgMusic, true, true);
        this.setMusicSlider();
        this.setSoundSlider();
        this.languageLabel.string = config_1.LANG_CONFIGS.get(profile_1.default.lang).displayName;
        this.makeUsers();
        this.initializeProfileData();
        this.i18n();
      };
      SecondScreen.prototype.i18n = function() {
        this.tabLayout.children[0].getChildByName("Label").getComponent(cc.Label).string = util_1.Util.i18NText("User");
        this.tabLayout.children[1].getChildByName("Label").getComponent(cc.Label).string = util_1.Util.i18NText("Profile");
        this.tabLayout.children[2].getChildByName("Label").getComponent(cc.Label).string = util_1.Util.i18NText("Setting");
        this.tabLayout.children[3].getChildByName("Label").getComponent(cc.Label).string = util_1.Util.i18NText("Contact");
        this.tabLayout.children[4].getChildByName("Label").getComponent(cc.Label).string = util_1.Util.i18NText("Help");
        this.profileNode.getChildByName("email").getChildByName("label").getComponent(cc.Label).string = util_1.Util.i18NText("Email :");
        this.profileNode.getChildByName("contact").getChildByName("label").getComponent(cc.Label).string = util_1.Util.i18NText("Phone number :");
        this.contactNode.getChildByName("Contact Us").getChildByName("Label").getComponent(cc.Label).string = util_1.Util.i18NText("Contact Us");
        this.contactNode.getChildByName("Follow Us").getChildByName("Label").getComponent(cc.Label).string = util_1.Util.i18NText("Follow Us");
        this.contactNode.getChildByName("email_btn").getChildByName("button").getChildByName("Label").getComponent(cc.Label).string = util_1.Util.i18NText("Email");
        this.contactNode.getChildByName("web_btn").getChildByName("button").getChildByName("Label").getComponent(cc.Label).string = util_1.Util.i18NText("Visit");
        this.contactNode.getChildByName("call_btn").getChildByName("button").getChildByName("Label").getComponent(cc.Label).string = util_1.Util.i18NText("WhatsApp");
        this.contactNode.getChildByName("Instagram").getChildByName("Label").getComponent(cc.Label).string = util_1.Util.i18NText("Instagram");
        this.contactNode.getChildByName("Facebook").getChildByName("Label").getComponent(cc.Label).string = util_1.Util.i18NText("Facebook");
        this.contactNode.getChildByName("Twitter").getChildByName("Label").getComponent(cc.Label).string = util_1.Util.i18NText("Twitter");
        this.settingNode.getChildByName("language").getChildByName("Key Label").getComponent(cc.Label).string = util_1.Util.i18NText("App Language :");
        this.settingNode.getChildByName("sound_toggle").getChildByName("Key Label").getComponent(cc.Label).string = util_1.Util.i18NText("Sound :");
        this.verifyLabel.string = this.isContactVerified ? util_1.Util.i18NText("verified") : util_1.Util.i18NText("verify");
        this.setWarningMsg();
      };
      SecondScreen.prototype.setContactVerifiedStatus = function() {
        if (1 === profile_1.default.getItem(profile_1.IS_OTP_VERIFIED)) {
          this.isContactVerified = true;
          this.verifyLabel.string = util_1.Util.i18NText("verified");
          this.verifyLabel.node.parent.getComponent(cc.Button).interactable = false;
        } else {
          this.verifyLabel.string = util_1.Util.i18NText("verify");
          this.isContactVerified = false;
          this.verifyLabel.node.parent.getComponent(cc.Button).interactable = 0 !== this.contactEditBox.string.length;
        }
      };
      SecondScreen.prototype.setWarningMsg = function() {
        this.notifier.getChildByName("email").getComponent(cc.Label).string = this.isEmailInvalid ? util_1.Util.i18NText(EMAIL_ERR) : "";
        this.notifier.getChildByName("contact").getComponent(cc.Label).string = this.isContactInvalid ? util_1.Util.i18NText(CONTACT_ERR) : "";
      };
      SecondScreen.prototype.makeUsers = function() {
        var _this = this;
        profile_1.User.getUsers().forEach(function(e, index) {
          if (!e.isTeacher) {
            cc.log("users", e.name);
            var user = cc.instantiate(_this.userPrefab);
            var userComp = user.getComponent(usercomponent_1.default);
            userComp.user = e;
            index % 2 == 0 && (user.getComponent(cc.Sprite).enabled = true);
            _this.loadUserImageOrAvatar(e, user.getChildByName("Avatar").getChildByName("Img"));
            _this.userLayout.node.addChild(user);
          }
        });
        if (welcomePage_1.default.userArr.length < 3 && 0 != welcomePage_1.default.userArr.length) {
          var addBtn = cc.instantiate(this.addButton);
          addBtn.x = -420;
          this.userLayout.node.addChild(addBtn);
        }
      };
      SecondScreen.prototype.loadUserImageOrAvatar = function(user, userNode) {
        user.imgPath && "" != user.imgPath ? cc.loader.load(user.imgPath, function(err, texture) {
          if (!err) {
            var temp = new cc.SpriteFrame(texture);
            userNode.getComponent(cc.Sprite).spriteFrame = temp;
          }
        }) : cc.resources.load("avatars/" + user.avatarImage, function(err, sp) {
          userNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
        });
      };
      SecondScreen.prototype.initializeProfileData = function() {
        this.dialingCode = profile_1.default.getValue(profile_1.DIALING_CODE);
        var email = profile_1.default.getValue(profile_1.EMAIL);
        var contact = profile_1.default.getValue(profile_1.CONTACT);
        this.dialingCodeLabel.string = this.dialingCode;
        email && (this.profileNode.getChildByName("email").getChildByName("editbox1").getComponent(cc.EditBox).string = email);
        if (contact) {
          contact = contact.substring(this.dialingCode.length);
          this.contactEditBox.string = contact;
          this.contactFieldValue = contact;
        }
        this.setContactVerifiedStatus();
      };
      SecondScreen.prototype.validateEmail = function(mail) {
        return EMAIL_VALIDATION_RE.test(mail);
      };
      SecondScreen.prototype.onClickAddEmailOrContact = function(e, data) {
        var value = e.node.getChildByName("text").getComponent(cc.Label).string;
        if ("button1" == data) if (this.validateEmail(value)) {
          profile_1.default.setValue(profile_1.EMAIL, value);
          this.isEmailInvalid = false;
        } else this.isEmailInvalid = true; else {
          this.contactFieldValue = value;
          if (value.length > 3 || 0 === value.length) {
            if (this.dialingCode + value != profile_1.default.getValue(profile_1.CONTACT)) {
              profile_1.default.setItem(profile_1.IS_OTP_VERIFIED, 0);
              this.setContactVerifiedStatus();
            }
            profile_1.default.setValue(profile_1.CONTACT, this.dialingCode + value);
            this.isContactInvalid = false;
            0 === profile_1.default.getItem(profile_1.IS_OTP_VERIFIED) && (this.verifyLabel.node.parent.getComponent(cc.Button).interactable = 0 !== this.contactEditBox.string.length);
          } else {
            this.isContactInvalid = true;
            this.verifyLabel.node.parent.getComponent(cc.Button).interactable = false;
          }
        }
        this.setWarningMsg();
        this.node.emit("closeCountryCodeView");
      };
      SecondScreen.prototype.setMusicSlider = function() {
        if (profile_1.default.getItem(profile_1.MUSIC_OFF)) {
          this.musicOff = false;
          this.musicButtonToggle();
        }
      };
      SecondScreen.prototype.setSoundSlider = function() {
        if (profile_1.default.getItem(profile_1.SFX_OFF)) {
          this.soundOff = false;
          this.soundButtonToggle();
        }
      };
      SecondScreen.prototype.tabNavigator = function(event, value) {
        this.settingNode.parent.children.forEach(function(e) {
          e.active = false;
        });
        event.target.parent.children.forEach(function(e) {
          return e.getChildByName("Active Tab").active = false;
        });
        event.target.getChildByName("Active Tab").active = true;
        switch (value) {
         case "User":
          this.userNode.active = true;
          break;

         case "Contact":
          this.contactNode.active = true;
          break;

         case "Help":
          this.helpNode.active = true;
          break;

         case "Setting":
          this.settingNode.active = true;
          break;

         case "Profile":
          this.profileNode.active = true;
        }
        this.profileNode.active || this.node.emit("closeCountryCodeView");
      };
      SecondScreen.prototype.soundButtonToggle = function() {
        this.soundOff = !this.soundOff;
        if (this.soundOff) {
          cc.audioEngine.pauseMusic();
          this.soundHandle.x = -146;
          this.changeSliderLabel("Off", this.soundHandle.parent);
          profile_1.default.setItem(profile_1.SFX_OFF, 1);
        } else {
          cc.audioEngine.resumeMusic();
          this.soundHandle.x = 145;
          this.changeSliderLabel("On", this.soundHandle.parent);
          profile_1.default.setItem(profile_1.SFX_OFF, 0);
          util_1.Util.playSfx(this.bgMusic, true, true);
        }
      };
      SecondScreen.prototype.verifyPhoneNumber = function(event) {
        cc.director.getScene().getChildByName("Canvas").getChildByName("otpDialog").active = true;
        cc.log(profile_1.default.getValue(profile_1.CONTACT));
        util_logger_1.default.requestOtp(profile_1.default.getValue(profile_1.CONTACT));
        this.node.emit("closeCountryCodeView");
      };
      SecondScreen.prototype.musicButtonToggle = function() {
        this.musicOff = !this.musicOff;
        if (this.musicOff) {
          this.musicHandle.x = -146;
          this.changeSliderLabel("Off", this.musicHandle.parent);
          profile_1.default.setItem(profile_1.MUSIC_OFF, 1);
        } else {
          this.musicHandle.x = 145;
          this.changeSliderLabel("On", this.musicHandle.parent);
          profile_1.default.setItem(profile_1.MUSIC_OFF, 0);
        }
      };
      SecondScreen.prototype.languageSelector = function() {
        var _this = this;
        var len = config_1.ALL_LANGS.length;
        var index = config_1.ALL_LANGS.indexOf(profile_1.default.lang);
        var langConfig = config_1.LANG_CONFIGS.get(config_1.ALL_LANGS[index]);
        config_1.default.i.releaseFont(langConfig.font);
        var selectedLanguage = config_1.ALL_LANGS[(index + 1) % len];
        var fontToLoad = config_1.LANG_CONFIGS.get(selectedLanguage).font;
        config_1.default.i.loadFontDynamically(fontToLoad, function() {
          _this.languageLabel.string = config_1.LANG_CONFIGS.get(selectedLanguage).displayName;
          profile_1.default.setValue(profile_1.LANGUAGE, selectedLanguage);
          util_1.Util.removeAlli18NMapping();
          util_1.Util.loadi18NMapping(function() {
            return _this.i18n();
          });
        });
      };
      SecondScreen.prototype.openHelpUri = function(e, data) {
        "Visit" == data ? cc.sys.openURL("http://www.chimple.org/") : "Email" == data ? cc.sys.openURL("mailto:help@chimple.org") : cc.sys.openURL("https://wa.me/918904515444");
      };
      SecondScreen.prototype.changeSliderLabel = function(v, node) {
        if ("Off" == v) {
          node.getChildByName("Off").active = 1;
          node.getChildByName("On").active = 0;
        } else {
          node.getChildByName("Off").active = 0;
          node.getChildByName("On").active = 1;
        }
      };
      SecondScreen.prototype.onClickFollow = function(e, data) {
        switch (data) {
         case "instagram":
          cc.sys.openURL("https://instagram.com/chimple_learning?igshid=5zxspthzcdm6");
          break;

         case "twitter":
          cc.sys.openURL("https://twitter.com/chimple_org?s=09");
          break;

         case "facebook":
          cc.sys.openURL("https://www.facebook.com/chimple/");
        }
      };
      SecondScreen.prototype.onClickBackButton = function() {
        cc.director.loadScene("welcomePage");
      };
      __decorate([ property(cc.Prefab) ], SecondScreen.prototype, "addButton", void 0);
      __decorate([ property(cc.Node) ], SecondScreen.prototype, "userNode", void 0);
      __decorate([ property(cc.AudioClip) ], SecondScreen.prototype, "bgMusic", void 0);
      __decorate([ property(cc.Node) ], SecondScreen.prototype, "settingNode", void 0);
      __decorate([ property(cc.Node) ], SecondScreen.prototype, "profileNode", void 0);
      __decorate([ property(cc.Node) ], SecondScreen.prototype, "helpNode", void 0);
      __decorate([ property(cc.Node) ], SecondScreen.prototype, "contactNode", void 0);
      __decorate([ property(cc.Node) ], SecondScreen.prototype, "soundHandle", void 0);
      __decorate([ property(cc.Node) ], SecondScreen.prototype, "musicHandle", void 0);
      __decorate([ property(cc.Label) ], SecondScreen.prototype, "languageLabel", void 0);
      __decorate([ property(cc.Prefab) ], SecondScreen.prototype, "userPrefab", void 0);
      __decorate([ property(cc.Label) ], SecondScreen.prototype, "verifyLabel", void 0);
      __decorate([ property(cc.Layout) ], SecondScreen.prototype, "userLayout", void 0);
      __decorate([ property(cc.EditBox) ], SecondScreen.prototype, "contactEditBox", void 0);
      __decorate([ property(cc.Label) ], SecondScreen.prototype, "dialingCodeLabel", void 0);
      __decorate([ property(cc.Node) ], SecondScreen.prototype, "notifier", void 0);
      __decorate([ property(cc.Node) ], SecondScreen.prototype, "tabLayout", void 0);
      SecondScreen = __decorate([ ccclass ], SecondScreen);
      return SecondScreen;
    }(cc.Component);
    exports.default = SecondScreen;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/config": void 0,
    "../../../../common/scripts/lib/profile": void 0,
    "../../../../common/scripts/util": void 0,
    "../../../../common/scripts/util-logger": void 0,
    "../../loginnew/scripts/welcomePage": "welcomePage",
    "./usercomponent": "usercomponent"
  } ],
  sectionList: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0307aPs0mJJtZwYAa3oFjdP", "sectionList");
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
    var util_logger_1 = require("../../../common/scripts/util-logger");
    var itemButton_1 = require("./itemButton");
    var util_1 = require("../../../common/scripts/util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SectionList = function(_super) {
      __extends(SectionList, _super);
      function SectionList() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.sectionItemPrefab = null;
        _this.loadingPrefab = null;
        _this.sectionlayout = null;
        _this.title = null;
        _this.loading = null;
        _this.sections = [];
        return _this;
      }
      SectionList.prototype.onLoad = function() {
        this.createLoading();
        this.showSections();
      };
      SectionList.prototype.onLogoutButtonClicked = function() {
        config_1.default.i.pushScene("private/school/scenes/schoolRegistration", "private", null);
      };
      SectionList.prototype.showSections = function() {
        this.showLoading();
        this.sectionlayout.destroyAllChildren();
        var schoolJson = util_logger_1.default.findSchool(cc.sys.localStorage.getItem("SCHOOL_USER"));
        if (null != schoolJson) {
          var schoolInfo = JSON.parse(schoolJson);
          if (!!schoolInfo) {
            this.title.string = schoolInfo.name;
            this.loadSectionsIfEmpty(schoolInfo);
          }
        }
      };
      SectionList.prototype.getSections = function(schoolInfo) {
        var sectionJson = util_logger_1.default.fetchSections(schoolInfo.firebaseId);
        null != sectionJson && (this.sections = JSON.parse(sectionJson) || []);
      };
      SectionList.prototype.loadSectionsIfEmpty = function(schoolInfo) {
        this.getSections(schoolInfo);
        var that = this;
        var timeId = null;
        if (0 === that.sections.length) timeId = setTimeout(function() {
          null != timeId ? clearTimeout(timeId) : "";
          that.loadSectionsIfEmpty(schoolInfo);
        }, 200); else {
          null != timeId ? clearTimeout(timeId) : "";
          this.loadUi(this.sections, schoolInfo.firebaseId);
        }
      };
      SectionList.prototype.createLoading = function() {
        this.loading = cc.instantiate(this.loadingPrefab);
        this.loading.zIndex = 3;
        this.node.addChild(this.loading);
        this.loading.active = false;
      };
      SectionList.prototype.showLoading = function() {
        this.loading.active = true;
      };
      SectionList.prototype.hideLoading = function() {
        this.loading.active = false;
      };
      SectionList.prototype.loadUi = function(sectionList, schoolFirebaseId) {
        this.hideLoading();
        for (var _i = 0, sectionList_1 = sectionList; _i < sectionList_1.length; _i++) {
          var data = sectionList_1[_i];
          var sectionInfo = data;
          var sectionButton = cc.instantiate(this.sectionItemPrefab);
          sectionButton.getChildByName("photo").getComponentInChildren(cc.Label).string = sectionInfo.name;
          null != sectionInfo.image && util_1.Util.loadImage(sectionButton, sectionInfo.image, sectionInfo.name);
          var sectionButtonItem = sectionButton.getComponent(itemButton_1.ItemButton);
          sectionButtonItem.section = sectionInfo;
          sectionButtonItem.schoolFirebaseId = schoolFirebaseId;
          this.sectionlayout.addChild(sectionButton);
        }
      };
      SectionList.prototype.onBackButtonClicked = function() {
        config_1.default.loadScene("private/home/loginnew/scenes/welcomePage", "private", null);
      };
      SectionList.prototype.start = function() {};
      __decorate([ property(cc.Prefab) ], SectionList.prototype, "sectionItemPrefab", void 0);
      __decorate([ property(cc.Prefab) ], SectionList.prototype, "loadingPrefab", void 0);
      __decorate([ property(cc.Node) ], SectionList.prototype, "sectionlayout", void 0);
      __decorate([ property(cc.Label) ], SectionList.prototype, "title", void 0);
      SectionList = __decorate([ ccclass ], SectionList);
      return SectionList;
    }(cc.Component);
    exports.default = SectionList;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/util": void 0,
    "../../../common/scripts/util-logger": void 0,
    "./itemButton": "itemButton"
  } ],
  selectionScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f3084iAFZRBsr0x4T8lGRNp", "selectionScene");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SelectionScene = exports.nextSelectMode = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var parseApi_1 = require("../../../common/scripts/services/parseApi");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var chimple_label_1 = require("../../../common/scripts/chimple-label");
    var ParseImageDownloader_1 = require("../../../common/scripts/services/ParseImageDownloader");
    var itemButton_1 = require("./itemButton");
    var config_1 = require("../../../common/scripts/lib/config");
    var chimple_1 = require("../../../chimple");
    var util_1 = require("../../../common/scripts/util");
    var ParseNetwork_1 = require("../../../common/scripts/services/ParseNetwork");
    var landing_1 = require("./landing");
    var constants_1 = require("../../../common/scripts/lib/constants");
    var parseConstants_1 = require("../../../common/scripts/domain/parseConstants");
    var profile_1 = require("../../../common/scripts/lib/profile");
    var addSectionButton_1 = require("./addSectionButton");
    var PHOTO = "photo";
    var NAME = "name";
    exports.nextSelectMode = parseApi_1.SelectionMode.Section;
    var SelectionScene = function(_super) {
      __extends(SelectionScene, _super);
      function SelectionScene() {
        var _this = _super.call(this) || this;
        _this.sectionItemPrefab = null;
        _this.sectionStackedItemPrefab = null;
        _this.loadingPrefab = null;
        _this.addSectionButtonPrefab = null;
        _this._sectionData = [];
        _this.school = null;
        _this.photoInfos = [];
        _this.loading = null;
        _this.viewPort = null;
        _this.content = null;
        _this.schoolLabel = null;
        _this.displayLabel = null;
        _this.backButton = null;
        _this.addSectionButton = null;
        _this.loginType = null;
        _this.isLoading = false;
        return _this;
      }
      SelectionScene.prototype.onLoad = function() {
        return __awaiter(this, void 0, void 0, function() {
          var addSectionButtonComponent;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this.initUI();
              return [ 4, this.determineSelectionScene() ];

             case 1:
              _a.sent();
              return [ 4, this.renderUI() ];

             case 2:
              _a.sent();
              this.isLoading = true;
              if (this.loginType === parseConstants_1.LoginType.Teacher) {
                this.addSectionButton = cc.instantiate(this.addSectionButtonPrefab);
                addSectionButtonComponent = this.addSectionButton.getComponent(addSectionButton_1.AddSectionButton);
                addSectionButtonComponent.parent = this.node;
                this.addSectionButton.active = true;
                this.addSectionButton.setPosition(cc.v2(cc.winSize.width / 4, 0));
                this.node.addChild(this.addSectionButton);
              }
              return [ 2 ];
            }
          });
        });
      };
      SelectionScene.prototype.determineSelectionScene = function() {
        return __awaiter(this, void 0, void 0, function() {
          var _a, sectionId;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              this.showLoading();
              return [ 4, this.loadSelectedSchool() ];

             case 1:
              _b.sent();
              if (!!ParseNetwork_1.ParseNetwork.getInstance().isEmpty(this.school)) return [ 3, 10 ];
              _a = exports.nextSelectMode;
              switch (_a) {
               case parseApi_1.SelectionMode.Section:
                return [ 3, 2 ];

               case parseApi_1.SelectionMode.TeacherHome:
                return [ 3, 4 ];

               case parseApi_1.SelectionMode.Student:
                return [ 3, 5 ];

               case parseApi_1.SelectionMode.Subject:
                return [ 3, 7 ];
              }
              return [ 3, 9 ];

             case 2:
              return [ 4, this.loadSectionsForSchool() ];

             case 3:
              _b.sent();
              this.hideLoading();
              return [ 3, 10 ];

             case 4:
              if (this.loginType === parseConstants_1.LoginType.Teacher) {
                this.hideLoading();
                config_1.default.i.pushScene(landing_1.TEACHER_HOME, "private", null, true);
              }
              return [ 3, 10 ];

             case 5:
              sectionId = ParseNetwork_1.ParseNetwork.getInstance().getStringFromCache(constants_1.CURRENT_SECTION_ID);
              return [ 4, this.loadStudentForSection(this.school.objectId, sectionId) ];

             case 6:
              _b.sent();
              this.hideLoading();
              this.showBackButton();
              return [ 3, 10 ];

             case 7:
              return [ 4, this.loadSubjectAndTeacherForSchool(this.school.objectId) ];

             case 8:
              _b.sent();
              if (this._sectionData && this._sectionData.length > 0) {
                this.hideLoading();
                this.showBackButton();
              } else config_1.default.i.pushScene(chimple_1.HOME_SCENE, "menu", null, true);
              return [ 3, 10 ];

             case 9:
              return [ 3, 10 ];

             case 10:
              return [ 2 ];
            }
          });
        });
      };
      SelectionScene.prototype.loadSelectedSchool = function() {
        return __awaiter(this, void 0, void 0, function() {
          var loginType, _a, connections, _b;
          var _this = this;
          return __generator(this, function(_c) {
            switch (_c.label) {
             case 0:
              loginType = Number(ParseNetwork_1.ParseNetwork.getInstance().getStringFromCache(parseConstants_1.LOGIN_TYPE));
              _a = loginType;
              switch (_a) {
               case parseConstants_1.LoginType.School:
                return [ 3, 1 ];

               case parseConstants_1.LoginType.Teacher:
                return [ 3, 4 ];
              }
              return [ 3, 6 ];

             case 1:
              this.loginType = parseConstants_1.LoginType.School;
              return [ 4, parseApi_1.ParseApi.getInstance().connections() ];

             case 2:
              connections = _c.sent();
              return [ 4, parseApi_1.ParseApi.getInstance().asyncForEach(connections, function(connection) {
                return __awaiter(_this, void 0, void 0, function() {
                  return __generator(this, function(_a) {
                    this.school = connection.school;
                    cc.log("got school", this.school.name + " " + this.school.objectId);
                    ParseNetwork_1.ParseNetwork.getInstance().storeIntoCache(constants_1.CURRENT_SCHOOL_ID, this.school.objectId);
                    return [ 2 ];
                  });
                });
              }) ];

             case 3:
              _c.sent();
              return [ 3, 6 ];

             case 4:
              this.loginType = parseConstants_1.LoginType.Teacher;
              _b = this;
              return [ 4, parseApi_1.ParseApi.getInstance().schoolForTeacher() ];

             case 5:
              _b.school = _c.sent();
              cc.log("got school", this.school.name + " " + this.school.objectId);
              ParseNetwork_1.ParseNetwork.getInstance().storeIntoCache(constants_1.CURRENT_SCHOOL_ID, this.school.objectId);
              return [ 3, 6 ];

             case 6:
              return [ 2 ];
            }
          });
        });
      };
      SelectionScene.prototype.loadSectionsForSchool = function() {
        return __awaiter(this, void 0, Promise, function() {
          var _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              _a = this;
              return [ 4, parseApi_1.ParseApi.getInstance().getSectionsForSchool(this.school.objectId) ];

             case 1:
              _a._sectionData = _b.sent();
              return [ 2 ];
            }
          });
        });
      };
      SelectionScene.prototype.loadSubjectAndTeacherForSchool = function(schoolId) {
        return __awaiter(this, void 0, void 0, function() {
          var classes;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, parseApi_1.ParseApi.getInstance().selectedClasses(schoolId) ];

             case 1:
              classes = _a.sent();
              this._sectionData = classes.map(function(c) {
                return {
                  subject: parseApi_1.ParseApi.getInstance().getSubjectByClass(c.objectId),
                  teacher: parseApi_1.ParseApi.getInstance().getTeacherByClass(c.objectId),
                  classId: c.objectId
                };
              });
              return [ 2 ];
            }
          });
        });
      };
      SelectionScene.prototype.loadStudentForSection = function(schoolId, sectionId) {
        return __awaiter(this, void 0, Promise, function() {
          var loginType, _a, _b, _c;
          return __generator(this, function(_d) {
            switch (_d.label) {
             case 0:
              loginType = Number(ParseNetwork_1.ParseNetwork.getInstance().getStringFromCache(parseConstants_1.LOGIN_TYPE));
              _a = loginType;
              switch (_a) {
               case parseConstants_1.LoginType.School:
                return [ 3, 1 ];

               case parseConstants_1.LoginType.Teacher:
                return [ 3, 4 ];
              }
              return [ 3, 6 ];

             case 1:
              _b = this;
              return [ 4, parseApi_1.ParseApi.getInstance().getStudentsForSection(this.school.objectId, sectionId) ];

             case 2:
              _b._sectionData = _d.sent();
              return [ 4, parseApi_1.ParseApi.getInstance().getActiveClassesForSchoolAndSection(this.school.objectId, sectionId) ];

             case 3:
              _d.sent();
              return [ 3, 6 ];

             case 4:
              _c = this;
              return [ 4, parseApi_1.ParseApi.getInstance().getStudentsForSection(this.school.objectId, sectionId) ];

             case 5:
              _c._sectionData = _d.sent();
              return [ 3, 6 ];

             case 6:
              return [ 2 ];
            }
          });
        });
      };
      SelectionScene.prototype.renderUI = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, this.registerItemSelectedEvent() ];

             case 1:
              _a.sent();
              return [ 4, this.renderScrollContents() ];

             case 2:
              _a.sent();
              return [ 4, this.renderSchoolLabel() ];

             case 3:
              _a.sent();
              this.loadImages();
              return [ 2 ];
            }
          });
        });
      };
      SelectionScene.prototype.renderSchoolLabel = function() {
        return __awaiter(this, void 0, void 0, function() {
          var label, displayLabel, sections, _a, loggedInUser, chimpleLabelComponent, chimpleDisplayLabelComponent;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              label = "";
              displayLabel = "";
              sections = [];
              _a = exports.nextSelectMode;
              switch (_a) {
               case parseApi_1.SelectionMode.Section:
                return [ 3, 1 ];

               case parseApi_1.SelectionMode.Student:
                return [ 3, 2 ];

               case parseApi_1.SelectionMode.Subject:
                return [ 3, 4 ];
              }
              return [ 3, 6 ];

             case 1:
              switch (this.loginType) {
               case parseConstants_1.LoginType.School:
                displayLabel = util_1.Util.i18NText("Choose Your Section");
                label = this.school.name;
                break;

               case parseConstants_1.LoginType.Teacher:
                displayLabel = util_1.Util.i18NText("Choose Your Class");
                loggedInUser = parseApi_1.ParseApi.getInstance().getLoggedInUser();
                label = loggedInUser ? loggedInUser.fullName : "";
              }
              return [ 3, 6 ];

             case 2:
              return [ 4, parseApi_1.ParseApi.getInstance().selectedSection(this.school.objectId) ];

             case 3:
              sections = _b.sent();
              label = sections && sections.length > 0 ? sections[0].name : "";
              displayLabel = util_1.Util.i18NText("Choose Student");
              return [ 3, 6 ];

             case 4:
              return [ 4, parseApi_1.ParseApi.getInstance().selectedSection(this.school.objectId) ];

             case 5:
              sections = _b.sent();
              label = sections && sections.length > 0 ? sections[0].name : "";
              displayLabel = util_1.Util.i18NText("Choose Subject");
              return [ 3, 6 ];

             case 6:
              chimpleLabelComponent = this.schoolLabel.getComponent(chimple_label_1.default);
              !this.school || (chimpleLabelComponent.string = label);
              chimpleDisplayLabelComponent = this.displayLabel.getComponent(chimple_label_1.default);
              chimpleDisplayLabelComponent.string = displayLabel;
              return [ 2 ];
            }
          });
        });
      };
      SelectionScene.prototype.initUI = function() {
        this.backButton = this.node.getChildByName("backButton");
        this.viewPort = this.node.getChildByName("viewport");
        this.content = this.viewPort.getChildByName("content");
        this.schoolLabel = this.node.getChildByName("schoolLabel");
        this.displayLabel = this.node.getChildByName("displayLabel");
        this.createLoading();
      };
      SelectionScene.prototype.renderScrollContents = function() {
        var _this = this;
        this.photoInfos = [];
        this._sectionData.forEach(function(s) {
          var sectionNode = _this.createFrame(s);
          _this.content.addChild(sectionNode);
          _this.content.height += sectionNode.height;
        });
      };
      SelectionScene.prototype.createLoading = function() {
        this.loading = cc.instantiate(this.loadingPrefab);
        this.loading.zIndex = 3;
        this.node.addChild(this.loading);
        this.loading.active = false;
      };
      SelectionScene.prototype.showLoading = function() {
        this.loading.active = true;
        this.viewPort.active = false;
        this.schoolLabel.active = false;
        this.displayLabel.active = false;
        this.backButton.active = false;
      };
      SelectionScene.prototype.hideLoading = function() {
        this.loading.active = false;
        this.viewPort.active = true;
        this.schoolLabel.active = true;
        this.displayLabel.active = true;
      };
      SelectionScene.prototype.showBackButton = function() {
        this.backButton.active = true;
      };
      SelectionScene.prototype.registerItemSelectedEvent = function() {
        return __awaiter(this, void 0, void 0, function() {
          var _this = this;
          return __generator(this, function(_a) {
            this.node.on(itemButton_1.PARSE_ITEM_SELECTED_EVENT, function(event) {
              return __awaiter(_this, void 0, void 0, function() {
                var selectedItem, _a, selectedSection, selectedStudent, pst, currentStudentId_1, students, student;
                return __generator(this, function(_b) {
                  switch (_b.label) {
                   case 0:
                    event.stopPropagation();
                    selectedItem = event.getUserData();
                    _a = selectedItem.type;
                    switch (_a) {
                     case parseApi_1.SelectionMode.Section:
                      return [ 3, 1 ];

                     case parseApi_1.SelectionMode.Student:
                      return [ 3, 2 ];

                     case parseApi_1.SelectionMode.Subject:
                      return [ 3, 3 ];
                    }
                    return [ 3, 8 ];

                   case 1:
                    exports.nextSelectMode = this.loginType === parseConstants_1.LoginType.School ? parseApi_1.SelectionMode.Student : parseApi_1.SelectionMode.TeacherHome;
                    selectedSection = selectedItem.data;
                    ParseNetwork_1.ParseNetwork.getInstance().storeIntoCache(constants_1.CURRENT_SECTION_ID, selectedSection.objectId);
                    this.loginType === parseConstants_1.LoginType.Teacher ? config_1.default.i.pushScene(landing_1.TEACHER_HOME, "private", null) : config_1.default.i.pushScene(landing_1.SELECT_SECTIONS_SCENE, "private", null);
                    return [ 3, 8 ];

                   case 2:
                    exports.nextSelectMode = parseApi_1.SelectionMode.Subject;
                    selectedStudent = selectedItem.data;
                    ParseNetwork_1.ParseNetwork.getInstance().storeIntoCache(constants_1.CURRENT_STUDENT_ID, selectedStudent.objectId);
                    config_1.default.loadScene(landing_1.SELECT_SECTIONS_SCENE, "private", null);
                    return [ 3, 8 ];

                   case 3:
                    exports.nextSelectMode = parseApi_1.SelectionMode.Home;
                    pst = selectedItem.data;
                    currentStudentId_1 = ParseNetwork_1.ParseNetwork.getInstance().getStringFromCache(constants_1.CURRENT_STUDENT_ID);
                    return [ 4, parseApi_1.ParseApi.getInstance().getStudentsForSection(this.school.objectId, ParseNetwork_1.ParseNetwork.getInstance().getStringFromCache(constants_1.CURRENT_SECTION_ID)) ];

                   case 4:
                    students = _b.sent();
                    students = students.filter(function(s) {
                      return s.objectId === currentStudentId_1;
                    });
                    if (!(students && students.length > 0)) return [ 3, 7 ];
                    student = students[0];
                    return [ 4, parseApi_1.ParseApi.getInstance().buildAndLoginUser(student) ];

                   case 5:
                    _b.sent();
                    return [ 4, parseApi_1.ParseApi.getInstance().findOrCreateMonitor(this.school.objectId, student.objectId, pst.classId, pst.subject.name, pst.subject.objectId) ];

                   case 6:
                    _b.sent();
                    config_1.default.i.loadCourseJsons(profile_1.User.getCurrentUser(), this.node, function() {
                      config_1.default.loadScene(chimple_1.START_SCENE, "menu", null);
                    });
                    _b.label = 7;

                   case 7:
                    return [ 3, 8 ];

                   case 8:
                    return [ 2 ];
                  }
                });
              });
            });
            return [ 2 ];
          });
        });
      };
      SelectionScene.prototype.isParseSectionOrStudent = function(item) {
        return void 0 !== item.name;
      };
      SelectionScene.prototype.createFrame = function(s) {
        var item = null;
        if (this.isParseSectionOrStudent(s)) {
          item = cc.instantiate(this.sectionItemPrefab);
          this.renderPhoto({
            item: item,
            photoChildName: PHOTO,
            photoUrl: s && s.image && s.image.url ? s.image.url : null,
            labelChildName: NAME,
            label: s.name
          });
        } else {
          item = cc.instantiate(this.sectionStackedItemPrefab);
          var subjectPhoto = item.getChildByName(PHOTO);
          this.renderPhoto({
            item: item,
            photoChildName: PHOTO,
            photoUrl: s && s.subject && s.subject.image && s.subject.image.url ? s.subject.image.url : null,
            labelChildName: NAME,
            label: s.subject.name
          });
          this.renderPhoto({
            item: subjectPhoto,
            photoChildName: PHOTO,
            photoUrl: s && s.teacher && s.teacher.image && s.teacher.image.url ? s.teacher.image.url : null,
            scale: .5
          });
        }
        var itemButtonComponent = item.getComponent(itemButton_1.ItemButton);
        itemButtonComponent.item = s;
        itemButtonComponent.type = exports.nextSelectMode;
        return item;
      };
      SelectionScene.prototype.renderPhoto = function(photoInfo) {
        try {
          var photo = photoInfo.item.getChildByName(photoInfo.photoChildName);
          photo.scale = !photoInfo.scale ? 1 : photoInfo.scale;
          if (null != photoInfo.labelChildName) {
            var name = photo.getChildByName(photoInfo.labelChildName);
            var nameLabel = name.getComponent(chimple_label_1.default);
            nameLabel.string = photoInfo.label;
          }
          !!photoInfo.photoUrl && photoInfo.photoUrl.length > 0 && this.photoInfos.push({
            photoNode: photo,
            photoUrl: photoInfo.photoUrl
          });
        } catch (e) {
          cc.log(e);
        }
      };
      SelectionScene.prototype.loadImages = function() {
        this.photoInfos.forEach(function(p) {
          cc.log("section image", p.photoUrl);
          ParseImageDownloader_1.ParseImageDownloader.loadImage(p.photoUrl, function(texture) {
            if (!!texture && p.photoNode) {
              var spriteFrame = new cc.SpriteFrame(texture);
              var maskNode = p.photoNode.getChildByName("mask");
              if (maskNode) {
                var image = maskNode.getChildByName("image");
                image.getComponent(cc.Sprite).spriteFrame = spriteFrame;
              }
            }
          });
        });
      };
      SelectionScene.prototype.updateSectionData = function(d) {
        this._sectionData = d;
        this.content.removeAllChildren();
        this.renderScrollContents();
        var layout = this.content.getComponent(cc.Layout);
        layout.updateLayout();
      };
      __decorate([ property(cc.Prefab) ], SelectionScene.prototype, "sectionItemPrefab", void 0);
      __decorate([ property(cc.Prefab) ], SelectionScene.prototype, "sectionStackedItemPrefab", void 0);
      __decorate([ property(cc.Prefab) ], SelectionScene.prototype, "loadingPrefab", void 0);
      __decorate([ property(cc.Prefab) ], SelectionScene.prototype, "addSectionButtonPrefab", void 0);
      __decorate([ error_handler_1.default() ], SelectionScene.prototype, "renderScrollContents", null);
      SelectionScene = __decorate([ ccclass ], SelectionScene);
      return SelectionScene;
    }(cc.Component);
    exports.SelectionScene = SelectionScene;
    cc._RF.pop();
  }, {
    "../../../chimple": void 0,
    "../../../common/scripts/chimple-label": void 0,
    "../../../common/scripts/domain/parseConstants": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/constants": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/services/ParseImageDownloader": void 0,
    "../../../common/scripts/services/ParseNetwork": void 0,
    "../../../common/scripts/services/parseApi": void 0,
    "../../../common/scripts/util": void 0,
    "./addSectionButton": "addSectionButton",
    "./itemButton": "itemButton",
    "./landing": "landing"
  } ],
  starteffects: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e84a2BWevdFnYHlnAQ4Ysht", "starteffects");
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
    var util_1 = require("../../../../common/scripts/util");
    var util_logger_1 = require("../../../../common/scripts/util-logger");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StartEffects = function(_super) {
      __extends(StartEffects, _super);
      function StartEffects() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      StartEffects.prototype.onLoad = function() {
        this.onStartEffects();
      };
      StartEffects.prototype.onStartEffects = function() {
        var titleAction = cc.moveTo(1, cc.v2(0, cc.winSize.width / 6));
        var titleRef = this.node.getChildByName("Main Camera").getChildByName("chimple logo");
        titleRef.runAction(titleAction);
      };
      StartEffects.prototype.onClickShareApp = function() {
        util_1.Util.shareText("Hey checkout Chimple Learning app \nhttps://play.google.com/store/apps/details?id=org.chimple.bahama&hl=en_IN");
      };
      StartEffects.prototype.onClickSetting = function() {
        this.node.getChildByName("settings").active = true;
        this.node.getChildByName("block").active = true;
      };
      StartEffects.prototype.onClickRateApp = function() {
        cc.sys.openURL("https://play.google.com/store/apps/details?id=org.chimple.bahama&hl=en_IN");
      };
      StartEffects.prototype.onClickHelp = function() {
        util_logger_1.default.launchYoutube("Ez9oouE2pOE");
      };
      StartEffects = __decorate([ ccclass ], StartEffects);
      return StartEffects;
    }(cc.Component);
    exports.default = StartEffects;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/util": void 0,
    "../../../../common/scripts/util-logger": void 0
  } ],
  studentList: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b93cc/z13hKSbVYwaxXlUsj", "studentList");
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
    var util_logger_1 = require("../../../common/scripts/util-logger");
    var itemButton_1 = require("./itemButton");
    var util_1 = require("../../../common/scripts/util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StudentList = function(_super) {
      __extends(StudentList, _super);
      function StudentList() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.StudentItemPrefab = null;
        _this.loadingPrefab = null;
        _this.sectionlayout = null;
        _this.title = null;
        _this.loading = null;
        return _this;
      }
      StudentList_1 = StudentList;
      StudentList.prototype.onLoad = function() {
        this.createLoading();
        this.showStudents();
      };
      StudentList.prototype.showStudents = function() {
        this.showLoading();
        this.sectionlayout.removeAllChildren();
        this.title.string = StudentList_1.title;
        var students = [];
        var studentJson = util_logger_1.default.fetchStudents(StudentList_1.schoolFirebaseId, StudentList_1.section.firebaseId);
        !studentJson || (students = JSON.parse(studentJson) || []);
        students.sort(function(a, b) {
          return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : b.name.toUpperCase() > a.name.toUpperCase() ? -1 : 0;
        });
        this.loadUi(students);
      };
      StudentList.prototype.createLoading = function() {
        this.loading = cc.instantiate(this.loadingPrefab);
        this.loading.zIndex = 3;
        this.node.addChild(this.loading);
        this.loading.active = false;
      };
      StudentList.prototype.showLoading = function() {
        this.loading.active = true;
      };
      StudentList.prototype.hideLoading = function() {
        this.loading.active = false;
      };
      StudentList.prototype.loadUi = function(studentList) {
        this.hideLoading();
        for (var _i = 0, studentList_1 = studentList; _i < studentList_1.length; _i++) {
          var data = studentList_1[_i];
          var studentInfo = data;
          var sectionButton = cc.instantiate(this.StudentItemPrefab);
          var labelComponent = sectionButton.getChildByName("photo").getComponentInChildren(cc.Label);
          labelComponent.string = studentInfo.name;
          var sectionButtonItem = sectionButton.getComponent(itemButton_1.ItemButton);
          null != studentInfo.image && util_1.Util.loadImage(sectionButton, studentInfo.image, studentInfo.firebaseId);
          sectionButtonItem.studentData = studentInfo;
          this.sectionlayout.addChild(sectionButton);
        }
        this.sectionlayout.width = cc.winSize.width;
        this.sectionlayout.parent.width = cc.winSize.width;
        this.sectionlayout.parent.parent.width = cc.winSize.width;
        this.sectionlayout.getComponent(cc.Layout).updateLayout();
        this.sectionlayout.parent.height = this.sectionlayout.height;
      };
      StudentList.prototype.onBackButtonClicked = function() {
        config_1.default.loadScene("private/school/scenes/sectionList", "private", null);
      };
      var StudentList_1;
      __decorate([ property(cc.Prefab) ], StudentList.prototype, "StudentItemPrefab", void 0);
      __decorate([ property(cc.Prefab) ], StudentList.prototype, "loadingPrefab", void 0);
      __decorate([ property(cc.Node) ], StudentList.prototype, "sectionlayout", void 0);
      __decorate([ property(cc.Label) ], StudentList.prototype, "title", void 0);
      StudentList = StudentList_1 = __decorate([ ccclass ], StudentList);
      return StudentList;
    }(cc.Component);
    exports.default = StudentList;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/util": void 0,
    "../../../common/scripts/util-logger": void 0,
    "./itemButton": "itemButton"
  } ],
  studentProgressScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "29d27VWPIhCCqyJ9WUuMm1L", "studentProgressScene");
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
    var studentProgress_1 = require("./studentProgress");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StudentProgressScene = function(_super) {
      __extends(StudentProgressScene, _super);
      function StudentProgressScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.studentProgressPrefab = null;
        _this.studentProgressNode = null;
        return _this;
      }
      StudentProgressScene_1 = StudentProgressScene;
      StudentProgressScene.prototype.onLoad = function() {
        var studentProgress = cc.instantiate(this.studentProgressPrefab);
        var studentProgressComp = studentProgress.getComponent(studentProgress_1.default);
        studentProgressComp.user = StudentProgressScene_1.user;
        studentProgressComp.getChapterProgress = this.getChapterProgress.bind(this);
        studentProgressComp.getLessonProgressMap = this.getLessonProgressMap.bind(this);
        studentProgressComp.shouldShowAssignment = this.shouldShowAssignment.bind(this);
        this.studentProgressNode.addChild(studentProgress);
      };
      StudentProgressScene.prototype.getChapterProgress = function(chapter) {
        var completedLessons = chapter.lessons.filter(function(les) {
          var lessonProgress = StudentProgressScene_1.user.lessonProgressMap.get(les.id);
          if (lessonProgress && lessonProgress.score >= 0) return true;
        }).length;
        var totalLessons = chapter.lessons.length;
        return completedLessons / totalLessons;
      };
      StudentProgressScene.prototype.getLessonProgressMap = function(chapter, callback) {
        callback(StudentProgressScene_1.user.lessonProgressMap);
      };
      StudentProgressScene.prototype.shouldShowAssignment = function() {
        return false;
      };
      var StudentProgressScene_1;
      __decorate([ property(cc.Prefab) ], StudentProgressScene.prototype, "studentProgressPrefab", void 0);
      __decorate([ property(cc.Node) ], StudentProgressScene.prototype, "studentProgressNode", void 0);
      StudentProgressScene = StudentProgressScene_1 = __decorate([ ccclass ], StudentProgressScene);
      return StudentProgressScene;
    }(cc.Component);
    exports.default = StudentProgressScene;
    cc._RF.pop();
  }, {
    "./studentProgress": "studentProgress"
  } ],
  studentProgress: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "519a46C/WVMEKQUJTkLeW59", "studentProgress");
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
    var header_1 = require("../../../../common/scripts/header");
    var config_1 = require("../../../../common/scripts/lib/config");
    var chapterProgressBar_1 = require("./chapterProgressBar");
    var parseApi_1 = require("../../../../common/scripts/services/parseApi");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StudentProgress = function(_super) {
      __extends(StudentProgress, _super);
      function StudentProgress() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.header = null;
        _this.headerPrefab = null;
        _this.chapterProgressPrefab = null;
        _this.layout = null;
        _this.loading = null;
        return _this;
      }
      StudentProgress.prototype.onLoad = function() {
        var _this = this;
        var config = config_1.default.i;
        config.loadCourseJsons(this.user, this.node, function() {
          var firstCourseId = _this.user.courseProgressMap.keys().next().value;
          config.course = config.curriculum.get(firstCourseId);
          var headerNode = cc.instantiate(_this.headerPrefab);
          var headerComp = headerNode.getComponent(header_1.default);
          headerComp.showHome = false;
          headerComp.user = _this.user;
          headerComp.onCourseClick = _this.onCourseClick.bind(_this);
          _this.header.addChild(headerNode);
          _this.onCourseClick();
        });
      };
      StudentProgress.prototype.onCourseClick = function() {
        var _this = this;
        var config = config_1.default.i;
        this.layout.removeAllChildren();
        config.curriculum.get(config.course.id).chapters.forEach(function(chapter) {
          var chapterProgress = cc.instantiate(_this.chapterProgressPrefab);
          var parseSubject = parseApi_1.ParseApi.getInstance().allSubjects().filter(function(p) {
            return p.courseCode === config.course.id;
          });
          var chapterProgressComp = chapterProgress.getComponent(chapterProgressBar_1.default);
          chapterProgressComp.parent = _this.node;
          chapterProgressComp.subjectId = Array.isArray(parseSubject) && 1 === parseSubject.length ? parseSubject[0].objectId : null;
          chapterProgressComp.label.string = chapter.name;
          chapterProgressComp.chapter = chapter;
          chapterProgressComp.user = _this.user;
          chapterProgressComp.getLessonProgressMap = _this.getLessonProgressMap;
          chapterProgressComp.completedRatio = _this.getChapterProgress(chapter);
          chapterProgressComp.shouldShowAssignment = _this.shouldShowAssignment;
          _this.loading.active = false;
          _this.layout.addChild(chapterProgress);
        });
      };
      __decorate([ property(cc.Node) ], StudentProgress.prototype, "header", void 0);
      __decorate([ property(cc.Prefab) ], StudentProgress.prototype, "headerPrefab", void 0);
      __decorate([ property(cc.Prefab) ], StudentProgress.prototype, "chapterProgressPrefab", void 0);
      __decorate([ property(cc.Node) ], StudentProgress.prototype, "layout", void 0);
      __decorate([ property(cc.Node) ], StudentProgress.prototype, "loading", void 0);
      StudentProgress = __decorate([ ccclass ], StudentProgress);
      return StudentProgress;
    }(cc.Component);
    exports.default = StudentProgress;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/header": void 0,
    "../../../../common/scripts/lib/config": void 0,
    "../../../../common/scripts/services/parseApi": void 0,
    "./chapterProgressBar": "chapterProgressBar"
  } ],
  subjectButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "035cbp/RIVHoLwz0yFoiIMd", "subjectButton");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SubjectButton = exports.SUBJECT_ITEM_SELECTED_EVENT = void 0;
    var ccclass = cc._decorator.ccclass;
    exports.SUBJECT_ITEM_SELECTED_EVENT = "SUBJECT_ITEM_SELECTED_EVENT";
    var subjectClickEnabled = false;
    var SubjectButton = function(_super) {
      __extends(SubjectButton, _super);
      function SubjectButton() {
        return _super.call(this) || this;
      }
      SubjectButton.prototype.onLoad = function() {
        subjectClickEnabled = true;
      };
      SubjectButton.prototype.onClicked = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            if (subjectClickEnabled) {
              subjectClickEnabled = false;
              this.itemSelectedEvent();
              cc.log("item clicked", this.node.name);
            }
            return [ 2 ];
          });
        });
      };
      SubjectButton.prototype.itemSelectedEvent = function() {
        var customEvent = new cc.Event.EventCustom(exports.SUBJECT_ITEM_SELECTED_EVENT, true);
        var selectedData = {
          subject: this._subject,
          id: this._id
        };
        customEvent.setUserData(selectedData);
        this.node.dispatchEvent(customEvent);
      };
      Object.defineProperty(SubjectButton.prototype, "subject", {
        set: function(newVal) {
          this._subject = newVal;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SubjectButton.prototype, "id", {
        set: function(id) {
          this._id = id;
        },
        enumerable: false,
        configurable: true
      });
      SubjectButton.clickedEnabled = function(enabled) {
        subjectClickEnabled = enabled;
      };
      SubjectButton = __decorate([ ccclass ], SubjectButton);
      return SubjectButton;
    }(cc.Component);
    exports.SubjectButton = SubjectButton;
    cc._RF.pop();
  }, {} ],
  teacherChapterLessons: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3f341i5fcJCtK/j+B40yNVb", "teacherChapterLessons");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var config_1 = require("../../../common/scripts/lib/config");
    var profile_1 = require("../../../common/scripts/lib/profile");
    var teacherLessonButton_1 = require("./teacherLessonButton");
    var constants_1 = require("../../../common/scripts/lib/constants");
    var parseApi_1 = require("../../../common/scripts/services/parseApi");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TeacherChapterLessons = function(_super) {
      __extends(TeacherChapterLessons, _super);
      function TeacherChapterLessons() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lessonButtonPrefab = null;
        _this.layout = null;
        _this.label = null;
        _this.loading = null;
        return _this;
      }
      TeacherChapterLessons.prototype.onLoad = function() {
        return __awaiter(this, void 0, void 0, function() {
          var config, schoolId, assignmentsForChapter;
          var _this = this;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              config = config_1.default.i;
              schoolId = cc.sys.localStorage.getItem(constants_1.CURRENT_SCHOOL_ID);
              return [ 4, parseApi_1.ParseApi.getInstance().getAssignmentsForChapterForWholeClass(schoolId, config.chapter.id) ];

             case 1:
              assignmentsForChapter = _a.sent();
              this.label.string = config.chapter.name;
              config.chapter.lessons.forEach(function(lesson, index) {
                var lessonButton = cc.instantiate(_this.lessonButtonPrefab);
                var lessonButtonComp = lessonButton.getComponent(teacherLessonButton_1.default);
                lessonButtonComp.lesson = lesson;
                var ac = assignmentsForChapter.filter(function(ac) {
                  return ac.lesson === lesson.id;
                });
                lessonButtonComp.assignmentAvailable = !!ac && ac.length > 0;
                lessonButtonComp.chapter = config.chapter;
                lessonButtonComp.course = config.course;
                lessonButtonComp.loading = _this.loading;
                lessonButtonComp.open = 0 == index || lesson.open || profile_1.User.getCurrentUser().lessonProgressMap.has(lesson.id);
                _this.layout.addChild(lessonButton);
              });
              this.layout.width = cc.winSize.width;
              this.layout.parent.height = this.layout.height;
              this.layout.parent.width = cc.winSize.width;
              this.layout.parent.parent.width = cc.winSize.width;
              return [ 2 ];
            }
          });
        });
      };
      TeacherChapterLessons.prototype.onBackClick = function() {
        config_1.default.i.popScene();
      };
      __decorate([ property(cc.Prefab) ], TeacherChapterLessons.prototype, "lessonButtonPrefab", void 0);
      __decorate([ property(cc.Node) ], TeacherChapterLessons.prototype, "layout", void 0);
      __decorate([ property(cc.Label) ], TeacherChapterLessons.prototype, "label", void 0);
      __decorate([ property(cc.Node) ], TeacherChapterLessons.prototype, "loading", void 0);
      TeacherChapterLessons = __decorate([ ccclass ], TeacherChapterLessons);
      return TeacherChapterLessons;
    }(cc.Component);
    exports.default = TeacherChapterLessons;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/constants": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/services/parseApi": void 0,
    "./teacherLessonButton": "teacherLessonButton"
  } ],
  teacherChapterMenuButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7e916uy4yJMTZxu5rTtC3gU", "teacherChapterMenuButton");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var chapterIcon_1 = require("../../../common/scripts/chapterIcon");
    var config_1 = require("../../../common/scripts/lib/config");
    var landing_1 = require("../../school/scripts/landing");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var RADIUS = 54;
    var WIDTH = 4;
    var TeacherChapterMenuButton = function(_super) {
      __extends(TeacherChapterMenuButton, _super);
      function TeacherChapterMenuButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.graphics = null;
        _this.completedLessons = 0;
        _this.totalLessons = 100;
        return _this;
      }
      TeacherChapterMenuButton.prototype.onLoad = function() {
        return __awaiter(this, void 0, void 0, function() {
          var config_2, chapterIcon, chapterIconComp, endAngle;
          var _this = this;
          return __generator(this, function(_a) {
            if (null != this.chapter) {
              config_2 = config_1.default.i;
              this.label.string = this.chapter.name;
              chapterIcon = cc.instantiate(this.chapterIconPrefab);
              chapterIconComp = chapterIcon.getComponent(chapterIcon_1.default);
              chapterIconComp.chapter = this.chapter;
              this.node.insertChild(chapterIcon, 0);
              this.button.node.on("touchend", function() {
                config_2.chapter = _this.chapter;
                config_2.pushScene(landing_1.TEACHER_CHAPTER_LESSONS, "private");
              });
              endAngle = this.completedLessons / this.totalLessons * Math.PI * 2;
              this.graphics.arc(0, 0, RADIUS + WIDTH / 2, 1 * Math.PI / 2, -endAngle + 1 * Math.PI / 2);
              this.graphics.stroke();
            }
            return [ 2 ];
          });
        });
      };
      __decorate([ property(cc.Label) ], TeacherChapterMenuButton.prototype, "label", void 0);
      __decorate([ property(cc.Button) ], TeacherChapterMenuButton.prototype, "button", void 0);
      __decorate([ property(cc.Graphics) ], TeacherChapterMenuButton.prototype, "graphics", void 0);
      __decorate([ property(cc.Prefab) ], TeacherChapterMenuButton.prototype, "chapterIconPrefab", void 0);
      TeacherChapterMenuButton = __decorate([ ccclass ], TeacherChapterMenuButton);
      return TeacherChapterMenuButton;
    }(cc.Component);
    exports.default = TeacherChapterMenuButton;
    cc._RF.pop();
  }, {
    "../../../common/scripts/chapterIcon": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../school/scripts/landing": "landing"
  } ],
  teacherCourseContent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "03394zPrAFJwZHhBNAhztRY", "teacherCourseContent");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var config_1 = require("../../../common/scripts/lib/config");
    var teacherChapterMenuButton_1 = require("./teacherChapterMenuButton");
    var parseApi_1 = require("../../../common/scripts/services/parseApi");
    var constants_1 = require("../../../common/scripts/lib/constants");
    var ParseNetwork_1 = require("../../../common/scripts/services/ParseNetwork");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TeacherCourseContent = function(_super) {
      __extends(TeacherCourseContent, _super);
      function TeacherCourseContent() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lessonButtonPrefab = null;
        _this.chaptersLayout = null;
        _this.chapterMenuButtonPrefab = null;
        return _this;
      }
      TeacherCourseContent.prototype.onLoad = function() {
        return __awaiter(this, void 0, void 0, function() {
          var schoolId, sectionId, subjectId, config, selectedParseSubject, chapterAssignments, _loop_1, this_1, _i, _a, chapter;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              schoolId = cc.sys.localStorage.getItem(constants_1.CURRENT_SCHOOL_ID);
              sectionId = cc.sys.localStorage.getItem(constants_1.CURRENT_SECTION_ID);
              subjectId = "";
              config = config_1.default.i;
              selectedParseSubject = parseApi_1.ParseApi.getInstance().allSubjects().filter(function(p) {
                return p.courseCode === config.course.id;
              });
              if (Array.isArray(selectedParseSubject) && selectedParseSubject.length > 0) {
                subjectId = selectedParseSubject[0].objectId;
                ParseNetwork_1.ParseNetwork.getInstance().storeIntoCache(constants_1.CURRENT_SUBJECT_ID, subjectId);
              }
              return [ 4, parseApi_1.ParseApi.getInstance().getChapterAssignment(schoolId, sectionId, subjectId) ];

             case 1:
              chapterAssignments = _b.sent();
              _loop_1 = function(chapter) {
                var finishedAssignment = chapterAssignments.filter(function(c) {
                  return c.chapter === chapter.id;
                });
                var chapterFinished = 0;
                finishedAssignment && finishedAssignment.length > 0 && (chapterFinished = finishedAssignment[0].percentage);
                var chapterMenuButton = cc.instantiate(this_1.chapterMenuButtonPrefab);
                var chapterMenuButtonComp = chapterMenuButton.getComponent(teacherChapterMenuButton_1.default);
                chapterMenuButtonComp.completedLessons = chapterFinished;
                chapterMenuButtonComp.chapter = chapter;
                chapterMenuButtonComp.content = this_1.content;
                chapterMenuButtonComp.loading = this_1.loading;
                this_1.chaptersLayout.addChild(chapterMenuButton);
              };
              this_1 = this;
              for (_i = 0, _a = config.course.chapters; _i < _a.length; _i++) {
                chapter = _a[_i];
                _loop_1(chapter);
              }
              this.chaptersLayout.width = cc.winSize.width;
              this.chaptersLayout.parent.height = this.chaptersLayout.height;
              this.chaptersLayout.parent.width = cc.winSize.width;
              this.chaptersLayout.parent.parent.width = cc.winSize.width;
              return [ 2 ];
            }
          });
        });
      };
      TeacherCourseContent.colors = [ "#511F73", "#26A699", "#F29727", "#F24C3D" ];
      __decorate([ property(cc.Prefab) ], TeacherCourseContent.prototype, "lessonButtonPrefab", void 0);
      __decorate([ property(cc.Node) ], TeacherCourseContent.prototype, "chaptersLayout", void 0);
      __decorate([ property(cc.Prefab) ], TeacherCourseContent.prototype, "chapterMenuButtonPrefab", void 0);
      TeacherCourseContent = __decorate([ ccclass ], TeacherCourseContent);
      return TeacherCourseContent;
    }(cc.Component);
    exports.default = TeacherCourseContent;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/constants": void 0,
    "../../../common/scripts/services/ParseNetwork": void 0,
    "../../../common/scripts/services/parseApi": void 0,
    "./teacherChapterMenuButton": "teacherChapterMenuButton"
  } ],
  teacherHeaderButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0fbc2TiUDVBq7/C1UQU4z6w", "teacherHeaderButton");
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
    var landing_1 = require("../../school/scripts/landing");
    var parseApi_1 = require("../../../common/scripts/services/parseApi");
    var selectionScene_1 = require("../../school/scripts/selectionScene");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TeacherHeaderButton = function(_super) {
      __extends(TeacherHeaderButton, _super);
      function TeacherHeaderButton() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      TeacherHeaderButton.prototype.onSwitchSectionClicked = function(event) {
        selectionScene_1.nextSelectMode = parseApi_1.SelectionMode.Section;
        config_1.default.loadScene(landing_1.SELECT_SECTIONS_SCENE, "private", null);
      };
      TeacherHeaderButton.prototype.onHomeButtonClicked = function(event) {
        config_1.default.loadScene(landing_1.TEACHER_HOME, "private", null);
      };
      __decorate([ property(cc.Label) ], TeacherHeaderButton.prototype, "label", void 0);
      __decorate([ property(cc.Button) ], TeacherHeaderButton.prototype, "button", void 0);
      __decorate([ property(cc.Sprite) ], TeacherHeaderButton.prototype, "sprite", void 0);
      __decorate([ property(cc.Sprite) ], TeacherHeaderButton.prototype, "selected", void 0);
      TeacherHeaderButton = __decorate([ ccclass ], TeacherHeaderButton);
      return TeacherHeaderButton;
    }(cc.Component);
    exports.default = TeacherHeaderButton;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/services/parseApi": void 0,
    "../../school/scripts/landing": "landing",
    "../../school/scripts/selectionScene": "selectionScene"
  } ],
  teacherHome: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "72fc7ii+ZxBJKX27s9u7iEq", "teacherHome");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var loading_1 = require("../../../common/scripts/loading");
    var config_1 = require("../../../common/scripts/lib/config");
    var profile_1 = require("../../../common/scripts/lib/profile");
    var teacherHeaderButton_1 = require("./teacherHeaderButton");
    var util_1 = require("../../../common/scripts/util");
    var teacherCourseContent_1 = require("./teacherCourseContent");
    var teacherStartContent_1 = require("./teacherStartContent");
    var parseApi_1 = require("../../../common/scripts/services/parseApi");
    var constants_1 = require("../../../common/scripts/lib/constants");
    var chimple_1 = require("../../../chimple");
    var TeacherHome = function(_super) {
      __extends(TeacherHome, _super);
      function TeacherHome() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.startContentPrefab = null;
        _this.courseContentPrefab = null;
        _this.header = null;
        _this.headerButtonPrefab = null;
        _this.homeButton = null;
        _this.loading = null;
        _this.index = 0;
        return _this;
      }
      TeacherHome_1 = TeacherHome;
      TeacherHome.prototype.onLoad = function() {
        return __awaiter(this, void 0, void 0, function() {
          var config;
          var _this = this;
          return __generator(this, function(_a) {
            this.loading.getComponent(loading_1.default).allowCancel = false;
            config = config_1.default.i;
            profile_1.User.getCurrentUser().courseProgressMap.forEach(function() {
              var headerButton = cc.instantiate(_this.headerButtonPrefab);
              var headerButtonComp = headerButton.getComponent(teacherHeaderButton_1.default);
              headerButtonComp.label.string = "";
              headerButtonComp.sprite.spriteFrame = null;
              headerButtonComp.selected.node.active = false;
              _this.header.insertChild(headerButton, ++_this.index);
            });
            this.selectedHeaderButton = this.homeButton.getComponent(teacherHeaderButton_1.default);
            this.selectedHeaderButton.button.node.on("touchend", function() {
              _this.onHomeClick();
            });
            this.selectedHeaderButton.label.string = util_1.Util.i18NText("Home");
            this.header.width = cc.winSize.width;
            this.header.getComponent(cc.Layout).spacingX = Math.max(0, cc.winSize.width / (this.index + 2) - this.homeButton.width);
            this.index = 0;
            config.loadCourseJsons(profile_1.User.getCurrentUser(), this.node, function() {
              return __awaiter(_this, void 0, void 0, function() {
                var _this = this;
                return __generator(this, function(_a) {
                  switch (_a.label) {
                   case 0:
                    config.curriculum.forEach(function(course, name) {
                      var headerButton = _this.header.children[++_this.index];
                      var headerButtonComp = headerButton.getComponent(teacherHeaderButton_1.default);
                      headerButtonComp.label.string = name;
                      util_1.Util.load(name + "/course/res/icons/" + name + ".png", function(err, texture) {
                        err ? _this.loading.getComponent(loading_1.default).addMessage(err.message, false) : headerButtonComp.sprite.spriteFrame = new cc.SpriteFrame(texture);
                      });
                      headerButtonComp.button.node.on("touchend", function() {
                        _this.selectHeaderButton(headerButtonComp);
                        config.course = course;
                        _this.content.removeAllChildren();
                        _this.onCourseClick();
                      });
                      !TeacherHome_1.homeSelected && config.course && config.course.id == course.id && _this.selectHeaderButton(headerButtonComp);
                    });
                    TeacherHome_1.homeSelected ? this.onHomeClick() : this.onCourseClick();
                    return [ 4, this.loadChapterAssignments() ];

                   case 1:
                    _a.sent();
                    this.loading.active = false;
                    return [ 2 ];
                  }
                });
              });
            });
            return [ 2 ];
          });
        });
      };
      TeacherHome.prototype.loadChapterAssignments = function() {
        return __awaiter(this, void 0, void 0, function() {
          var schoolId, sectionId, subjects, promises;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              schoolId = cc.sys.localStorage.getItem(constants_1.CURRENT_SCHOOL_ID);
              sectionId = cc.sys.localStorage.getItem(constants_1.CURRENT_SECTION_ID);
              return [ 4, parseApi_1.ParseApi.getInstance().getAllSubjects() ];

             case 1:
              subjects = _a.sent();
              promises = subjects.map(function(s) {
                return parseApi_1.ParseApi.getInstance().getChapterAssignment(schoolId, sectionId, s.objectId);
              });
              return [ 4, Promise.all(promises) ];

             case 2:
              return [ 2, _a.sent() ];
            }
          });
        });
      };
      TeacherHome.prototype.onAddNewStudentClick = function() {
        var user = parseApi_1.ParseApi.getInstance().getLoggedInUser();
        var schoolId = cc.sys.localStorage.getItem(constants_1.CURRENT_SCHOOL_ID);
        var sectionId = cc.sys.localStorage.getItem(constants_1.CURRENT_SECTION_ID);
        var addTeacherReq = "http://chimple.github.io/" + chimple_1.RECEIVED_TEACHER_REQUEST + "/" + chimple_1.TEACHER_ID_KEY + "/" + schoolId + "/name/" + user.fullName + "/sectionId/" + sectionId;
        util_1.Util.shareText(addTeacherReq);
        cc.log("teacher request", addTeacherReq);
      };
      TeacherHome.prototype.onHomeClick = function() {
        TeacherHome_1.homeSelected = true;
        var config = config_1.default.i;
        config.course = null;
        config.chapter = null;
        config.lesson = null;
        this.selectHeaderButton(this.homeButton.getComponent(teacherHeaderButton_1.default));
        this.content.removeAllChildren();
        var startContent = cc.instantiate(this.startContentPrefab);
        var startContentComp = startContent.getComponent(teacherStartContent_1.default);
        startContentComp.loading = this.loading;
        this.content.addChild(startContent);
      };
      TeacherHome.prototype.onCourseClick = function() {
        TeacherHome_1.homeSelected = false;
        var courseContent = cc.instantiate(this.courseContentPrefab);
        var courseContentComp = courseContent.getComponent(teacherCourseContent_1.default);
        courseContentComp.loading = this.loading;
        courseContentComp.content = this.content;
        this.content.addChild(courseContent);
      };
      TeacherHome.prototype.selectHeaderButton = function(newButton) {
        null != this.selectedHeaderButton && (this.selectedHeaderButton.selected.node.active = false);
        newButton.selected.node.active = true;
        this.selectedHeaderButton = newButton;
      };
      var TeacherHome_1;
      TeacherHome.homeSelected = true;
      __decorate([ property(cc.Node) ], TeacherHome.prototype, "content", void 0);
      __decorate([ property(cc.Prefab) ], TeacherHome.prototype, "startContentPrefab", void 0);
      __decorate([ property(cc.Prefab) ], TeacherHome.prototype, "courseContentPrefab", void 0);
      __decorate([ property(cc.Node) ], TeacherHome.prototype, "header", void 0);
      __decorate([ property(cc.Prefab) ], TeacherHome.prototype, "headerButtonPrefab", void 0);
      __decorate([ property(cc.Node) ], TeacherHome.prototype, "homeButton", void 0);
      __decorate([ property(cc.Node) ], TeacherHome.prototype, "loading", void 0);
      TeacherHome = TeacherHome_1 = __decorate([ ccclass ], TeacherHome);
      return TeacherHome;
    }(cc.Component);
    exports.default = TeacherHome;
    cc._RF.pop();
  }, {
    "../../../chimple": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/constants": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/loading": void 0,
    "../../../common/scripts/services/parseApi": void 0,
    "../../../common/scripts/util": void 0,
    "./teacherCourseContent": "teacherCourseContent",
    "./teacherHeaderButton": "teacherHeaderButton",
    "./teacherStartContent": "teacherStartContent"
  } ],
  teacherLessonButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "58a0bZifp9BIK//mjx6rzsD", "teacherLessonButton");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var config_1 = require("../../../common/scripts/lib/config");
    var loading_1 = require("../../../common/scripts/loading");
    var landing_1 = require("../../school/scripts/landing");
    var lessonIcon_1 = require("../../../common/scripts/lessonIcon");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TeacherLessonButton = function(_super) {
      __extends(TeacherLessonButton, _super);
      function TeacherLessonButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.open = false;
        _this.assignmentAvailable = false;
        return _this;
      }
      TeacherLessonButton.prototype.onLoad = function() {
        return __awaiter(this, void 0, void 0, function() {
          var config, lessonIcon, lessonIconComp;
          var _this = this;
          return __generator(this, function(_a) {
            config = config_1.default.i;
            if (null != this.lesson && null != this.course && null != this.lesson) {
              this.label.string = this.lesson.name;
              lessonIcon = cc.instantiate(this.lessonIconPrefab);
              lessonIconComp = lessonIcon.getComponent(lessonIcon_1.default);
              lessonIconComp.lesson = this.lesson;
              lessonIconComp.open = true;
              this.button.node.insertChild(lessonIcon, 0);
              this.button.node.on("touchend", function() {
                config.course = _this.course;
                config.chapter = _this.chapter;
                config.lesson = _this.lesson;
                _this.loading.getComponent(loading_1.default).allowCancel = true;
                _this.loading.active = true;
                config.pushScene(landing_1.STUDENT_PROGRESS_FOR_LESSON, "private");
              });
              this.completedSprite.node.active = this.assignmentAvailable;
            }
            return [ 2 ];
          });
        });
      };
      __decorate([ property(cc.Label) ], TeacherLessonButton.prototype, "label", void 0);
      __decorate([ property(cc.Button) ], TeacherLessonButton.prototype, "button", void 0);
      __decorate([ property(cc.Prefab) ], TeacherLessonButton.prototype, "lessonIconPrefab", void 0);
      __decorate([ property(cc.Sprite) ], TeacherLessonButton.prototype, "completedSprite", void 0);
      __decorate([ property(cc.Sprite) ], TeacherLessonButton.prototype, "downloadSprite", void 0);
      TeacherLessonButton = __decorate([ ccclass ], TeacherLessonButton);
      return TeacherLessonButton;
    }(cc.Component);
    exports.default = TeacherLessonButton;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lessonIcon": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/loading": void 0,
    "../../school/scripts/landing": "landing"
  } ],
  teacherOtpRegistration: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "40b32ONcfhJWZVRRzWB7/kQ", "teacherOtpRegistration");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TeacherOtpRegistration = exports.EditOptions = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var customEditBox_1 = require("../../school/scripts/customEditBox");
    var util_logger_1 = require("../../../common/scripts/util-logger");
    var profile_1 = require("../../../common/scripts/lib/profile");
    var parseApi_1 = require("../../../common/scripts/services/parseApi");
    var config_1 = require("../../../common/scripts/lib/config");
    var landing_1 = require("../../school/scripts/landing");
    var handler = null;
    var EditOptions;
    (function(EditOptions) {
      EditOptions["RequestOtpChanged"] = "0";
      EditOptions["VerifyOtpChanged"] = "1";
      EditOptions["PasswordChanged"] = "2";
    })(EditOptions = exports.EditOptions || (exports.EditOptions = {}));
    var TeacherOtpRegistration = function(_super) {
      __extends(TeacherOtpRegistration, _super);
      function TeacherOtpRegistration() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.requestOtpEditBox = null;
        _this.passwordEditBox = null;
        _this.verifyOtpEditBox = null;
        _this.requestOtpText = null;
        _this.verifyOtpText = null;
        _this.requestOtp = null;
        _this.verifyOtp = null;
        _this.wText = null;
        _this.requestOtpUserText = null;
        _this.verifyOtpUserText = null;
        return _this;
      }
      TeacherOtpRegistration.prototype.onLoad = function() {
        handler = this;
        this.verifyOtpEditBox.active = false;
        this.verifyOtp.active = false;
        this.requestOtp.active = false;
        this.wText.active = false;
        this.requestOtpEditBox.name = EditOptions.RequestOtpChanged;
        this.verifyOtpEditBox.name = EditOptions.VerifyOtpChanged;
        this.passwordEditBox.name = EditOptions.PasswordChanged;
        this.registerEditBoxCustomEvent();
      };
      TeacherOtpRegistration.prototype.onRequestOtpClicked = function(event) {
        if (this.requestOtpUserText && this.requestOtpUserText.length > 0) {
          util_logger_1.default.requestOtp(this.requestOtpUserText);
          if (null != this.passwordUserText) {
            this.verifyOtpEditBox.active = true;
            this.verifyOtp.active = true;
          }
        }
      };
      TeacherOtpRegistration.prototype.onVerifyOtpClicked = function(event) {
        this.verifyOtpUserText && this.verifyOtpUserText.length > 0 && util_logger_1.default.verifyOtp(this.verifyOtpUserText);
      };
      TeacherOtpRegistration.prototype.registerEditBoxCustomEvent = function() {
        var _this = this;
        this.node.on(customEditBox_1.EDIT_ENDED_EVENT, function(event) {
          event.stopPropagation();
          var data = event.getUserData();
          switch (data.detectParent) {
           case EditOptions.RequestOtpChanged:
            _this.requestOtpUserText = data.text;
            cc.log(_this.requestOtpUserText);
            if (null !== _this.requestOtpUserText) {
              _this.verifyOtpEditBox.active = false;
              _this.verifyOtp.active = false;
            }
            _this.showRequestOtp();
            break;

           case EditOptions.PasswordChanged:
            _this.passwordUserText = data.text;
            cc.log(_this.passwordUserText);
            _this.showRequestOtp();
            break;

           case EditOptions.VerifyOtpChanged:
            _this.verifyOtpUserText = data.text;
            cc.log(_this.verifyOtpUserText);
          }
        });
      };
      TeacherOtpRegistration.prototype.showRequestOtp = function() {
        null != this.passwordUserText && null != this.requestOtpUserText && this.requestOtpUserText.length > 0 && this.passwordUserText.length > 0 ? this.requestOtp.active = true : this.requestOtp.active = false;
      };
      TeacherOtpRegistration.prototype.verifyRegistration = function(verificationId, code) {
        return __awaiter(this, void 0, void 0, function() {
          var currentUser, pNumber, e_1;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, profile_1.default.teacherPostLoginActivity(null) ];

             case 1:
              currentUser = _a.sent();
              pNumber = this.requestOtpUserText.replace("+", "");
              _a.label = 2;

             case 2:
              _a.trys.push([ 2, 4, , 5 ]);
              return [ 4, parseApi_1.ParseApi.getInstance().signUpTestUser({
                phoneNumber: pNumber,
                username: currentUser.id,
                password: this.passwordUserText,
                verficationId: verificationId,
                code: code
              }) ];

             case 3:
              _a.sent();
              return [ 3, 5 ];

             case 4:
              e_1 = _a.sent();
              cc.log(e_1);
              return [ 3, 5 ];

             case 5:
              config_1.default.loadScene(landing_1.SELECT_SECTIONS_SCENE, "private", null);
              return [ 2 ];
            }
          });
        });
      };
      __decorate([ property(cc.Node) ], TeacherOtpRegistration.prototype, "requestOtpEditBox", void 0);
      __decorate([ property(cc.Node) ], TeacherOtpRegistration.prototype, "passwordEditBox", void 0);
      __decorate([ property(cc.Node) ], TeacherOtpRegistration.prototype, "verifyOtpEditBox", void 0);
      __decorate([ property(cc.Node) ], TeacherOtpRegistration.prototype, "requestOtpText", void 0);
      __decorate([ property(cc.Node) ], TeacherOtpRegistration.prototype, "verifyOtpText", void 0);
      __decorate([ property(cc.Node) ], TeacherOtpRegistration.prototype, "requestOtp", void 0);
      __decorate([ property(cc.Node) ], TeacherOtpRegistration.prototype, "verifyOtp", void 0);
      __decorate([ property(cc.Node) ], TeacherOtpRegistration.prototype, "wText", void 0);
      TeacherOtpRegistration = __decorate([ ccclass ], TeacherOtpRegistration);
      return TeacherOtpRegistration;
    }(cc.Component);
    exports.TeacherOtpRegistration = TeacherOtpRegistration;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/services/parseApi": void 0,
    "../../../common/scripts/util-logger": void 0,
    "../../school/scripts/customEditBox": "customEditBox",
    "../../school/scripts/landing": "landing"
  } ],
  teacherRegistration: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c4116tpEAVFhrPfdznd29DL", "teacherRegistration");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TeacherRegistration = exports.EditOptions = exports.Mode = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var EditBox = cc.EditBox;
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var customEditBox_1 = require("../../school/scripts/customEditBox");
    var ParseNetwork_1 = require("../../../common/scripts/services/ParseNetwork");
    var parseApi_1 = require("../../../common/scripts/services/parseApi");
    var chimple_label_1 = require("../../../common/scripts/chimple-label");
    var parseConstants_1 = require("../../../common/scripts/domain/parseConstants");
    var loginButton_1 = require("./loginButton");
    var config_1 = require("../../../common/scripts/lib/config");
    var profile_1 = require("../../../common/scripts/lib/profile");
    var landing_1 = require("../../school/scripts/landing");
    var selectionScene_1 = require("../../school/scripts/selectionScene");
    var util_1 = require("../../../common/scripts/util");
    var FULL_NAME_PLACEHOLDER = "name";
    var EMAIL_PLACEHOLDER = "email";
    var PASSWORD_PLACEHOLDER = "password";
    var CONFIRM_PASSWORD_PLACEHOLDER = "confirm password";
    var EMAIL_LENGTH = 24;
    var Mode;
    (function(Mode) {
      Mode[Mode["Login"] = 1] = "Login";
      Mode[Mode["Register"] = 2] = "Register";
    })(Mode = exports.Mode || (exports.Mode = {}));
    var EditOptions;
    (function(EditOptions) {
      EditOptions["EmailChanged"] = "0";
      EditOptions["PasswordChanged"] = "1";
      EditOptions["FullNameChanged"] = "2";
      EditOptions["ConfirmPasswordChanged"] = "3";
    })(EditOptions = exports.EditOptions || (exports.EditOptions = {}));
    var TeacherRegistration = function(_super) {
      __extends(TeacherRegistration, _super);
      function TeacherRegistration() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.customEditBoxPrefab = null;
        _this.loginButtonPrefab = null;
        _this.loadingPrefab = null;
        _this.label = null;
        _this.switchModeNode = null;
        _this.wText = null;
        _this.loginComponent = null;
        _this.displayLabel = null;
        _this.fullNameEditBox = null;
        _this.emailEditBox = null;
        _this.passwordEditBox = null;
        _this.confirmPasswordEditBox = null;
        _this.loginButton = null;
        _this.email = null;
        _this.password = null;
        _this.fullName = null;
        _this.confirmPassword = null;
        _this.loading = null;
        _this.mode = Mode.Register;
        return _this;
      }
      TeacherRegistration.prototype.onLoad = function() {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, this.initUI() ];

             case 1:
              _a.sent();
              return [ 4, this.renderUI() ];

             case 2:
              _a.sent();
              return [ 4, this.registerEditBoxCustomEvent() ];

             case 3:
              _a.sent();
              return [ 4, this.registerLoginEvent() ];

             case 4:
              _a.sent();
              this.mode = Mode.Register;
              this.wText.active = false;
              return [ 2 ];
            }
          });
        });
      };
      TeacherRegistration.prototype.initUI = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            this.createLoading();
            this.loginButton = cc.instantiate(this.loginButtonPrefab);
            this.loginButton.setPosition(cc.v2(0, -cc.winSize.height / 3));
            this.loginComponent = this.loginButton.getComponent(loginButton_1.LoginButton);
            this.displayLabel = this.label.getComponent(chimple_label_1.default);
            this.switchModeNode.setPosition(cc.v2(0, -cc.winSize.height / 3 + 62));
            this.emailEditBox = this.renderEmailBox();
            this.node.addChild(this.emailEditBox);
            this.passwordEditBox = this.renderPasswordBox(PASSWORD_PLACEHOLDER);
            this.node.addChild(this.passwordEditBox);
            this.fullNameEditBox = this.renderFullNameBox();
            this.node.addChild(this.fullNameEditBox);
            this.confirmPasswordEditBox = this.renderConfirmPasswordBox(CONFIRM_PASSWORD_PLACEHOLDER);
            this.node.addChild(this.confirmPasswordEditBox);
            this.emailEditBox.setPosition(new cc.Vec2(this.emailEditBox.x, this.emailEditBox.y + 75));
            this.passwordEditBox.setPosition(new cc.Vec2(this.passwordEditBox.x, this.passwordEditBox.y - 25));
            this.fullNameEditBox.setPosition(new cc.Vec2(this.fullNameEditBox.x, this.fullNameEditBox.y + 175));
            this.confirmPasswordEditBox.setPosition(new cc.Vec2(this.confirmPasswordEditBox.x, this.confirmPasswordEditBox.y - 125));
            this.node.addChild(this.loginButton);
            return [ 2 ];
          });
        });
      };
      TeacherRegistration.prototype.renderUI = function() {
        switch (this.mode) {
         case Mode.Login:
          this.loginComponent.text.getComponent(chimple_label_1.default).string = util_1.Util.i18NText("Login");
          this.displayLabel.string = util_1.Util.i18NText("Login To Your Account");
          this.switchModeNode.getChildByName("sButton").getComponent(chimple_label_1.default).string = "Register";
          this.switchModeNode.getChildByName("sLabel").getComponent(chimple_label_1.default).string = util_1.Util.i18NText("Register Account?");
          this.confirmPasswordEditBox.active = false;
          this.fullNameEditBox.active = false;
          break;

         case Mode.Register:
          this.loginComponent.text.getComponent(chimple_label_1.default).string = util_1.Util.i18NText("Register");
          this.displayLabel.string = util_1.Util.i18NText("SignUp");
          this.switchModeNode.getChildByName("sButton").getComponent(chimple_label_1.default).string = util_1.Util.i18NText("Login");
          this.switchModeNode.getChildByName("sLabel").getComponent(chimple_label_1.default).string = util_1.Util.i18NText("Already have an Account?");
          this.confirmPasswordEditBox.active = true;
          this.fullNameEditBox.active = true;
        }
      };
      TeacherRegistration.prototype.createLoading = function() {
        this.loading = cc.instantiate(this.loadingPrefab);
        this.loading.zIndex = 3;
        this.node.addChild(this.loading);
        this.loading.active = false;
      };
      TeacherRegistration.prototype.showLoading = function() {
        this.loading.active = true;
        this.emailEditBox.active = false;
        this.passwordEditBox.active = false;
        this.confirmPasswordEditBox.active = false;
        this.fullNameEditBox.active = false;
        this.switchModeNode.active = false;
        this.wText.active = false;
      };
      TeacherRegistration.prototype.hideLoading = function() {
        this.loading.active = false;
        this.emailEditBox.active = true;
        this.passwordEditBox.active = true;
        this.switchModeNode.active = true;
        if (this.mode === Mode.Register) {
          this.confirmPasswordEditBox.active = true;
          this.fullNameEditBox.active = true;
        }
      };
      TeacherRegistration.prototype.registerEditBoxCustomEvent = function() {
        var _this = this;
        this.node.on(customEditBox_1.EDIT_ENDED_EVENT, function(event) {
          event.stopPropagation();
          var data = event.getUserData();
          switch (data.detectParent) {
           case EditOptions.EmailChanged:
            _this.email = data.text;
            break;

           case EditOptions.PasswordChanged:
            _this.password = data.text;
            break;

           case EditOptions.FullNameChanged:
            _this.fullName = data.text;
            break;

           case EditOptions.ConfirmPasswordChanged:
            _this.confirmPassword = data.text;
          }
          _this.showNext();
        });
      };
      TeacherRegistration.prototype.registerLoginEvent = function() {
        return __awaiter(this, void 0, void 0, function() {
          var that;
          var _this = this;
          return __generator(this, function(_a) {
            that = this;
            this.node.on(loginButton_1.PARSE_LOGIN_EVENT, function(event) {
              return __awaiter(_this, void 0, void 0, function() {
                var selectedItem, _a, currentUser, e_1;
                return __generator(this, function(_b) {
                  switch (_b.label) {
                   case 0:
                    event.stopPropagation();
                    selectedItem = event.getUserData();
                    _a = that.mode;
                    switch (_a) {
                     case Mode.Register:
                      return [ 3, 1 ];

                     case Mode.Login:
                      return [ 3, 6 ];
                    }
                    return [ 3, 8 ];

                   case 1:
                    this.showLoading();
                    currentUser = profile_1.User.createUserOrFindExistingUser({
                      name: selectedItem.fullName
                    });
                    if (!currentUser) return [ 3, 5 ];
                    _b.label = 2;

                   case 2:
                    _b.trys.push([ 2, 4, , 5 ]);
                    return [ 4, parseApi_1.ParseApi.getInstance().signUpUser({
                      username: currentUser.id,
                      fullName: currentUser.name || "",
                      email: selectedItem.email,
                      password: selectedItem.password
                    }) ];

                   case 3:
                    _b.sent();
                    this.wText.active = true;
                    this.wText.getComponent(chimple_label_1.default).string = util_1.Util.i18NText("Registration Successful - Verify your email");
                    return [ 3, 5 ];

                   case 4:
                    e_1 = _b.sent();
                    cc.log(e_1.message);
                    this.wText.active = true;
                    this.wText.getComponent(chimple_label_1.default).string = util_1.Util.i18NText("Registration Failed");
                    this.hideLoading();
                    this.showNext();
                    return [ 3, 5 ];

                   case 5:
                    return [ 3, 8 ];

                   case 6:
                    return [ 4, this.parseLogin(selectedItem.node, selectedItem.email, selectedItem.password) ];

                   case 7:
                    _b.sent();
                    return [ 3, 8 ];

                   case 8:
                    return [ 2 ];
                  }
                });
              });
            });
            return [ 2 ];
          });
        });
      };
      TeacherRegistration.prototype.parseLogin = function(node, email, password) {
        return __awaiter(this, void 0, void 0, function() {
          var teacherUser, nextScene;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this.showLoading();
              return [ 4, parseApi_1.ParseApi.getInstance().loginUser(email, password) ];

             case 1:
              _a.sent();
              ParseNetwork_1.ParseNetwork.getInstance().storeIntoCache(parseConstants_1.TEACHER_EMAIL, email);
              ParseNetwork_1.ParseNetwork.getInstance().storeIntoCache(parseConstants_1.TEACHER_PASSWORD, password);
              ParseNetwork_1.ParseNetwork.getInstance().storeIntoCache(parseConstants_1.LOGIN_TYPE, String(parseConstants_1.LoginType.Teacher));
              teacherUser = parseApi_1.ParseApi.getInstance().getLoggedInUser();
              if (!!ParseNetwork_1.ParseNetwork.getInstance().isEmpty(teacherUser)) return [ 3, 3 ];
              nextScene = landing_1.SELECT_SECTIONS_SCENE;
              selectionScene_1.nextSelectMode = parseApi_1.SelectionMode.Section;
              this.hideLoading();
              return [ 4, profile_1.default.teacherPostLoginActivity(teacherUser.objectId) ];

             case 2:
              _a.sent();
              config_1.default.loadScene(nextScene, "private", null);
              return [ 3, 4 ];

             case 3:
              node.getComponent(cc.Button).interactable = true;
              this.hideLoading();
              ParseNetwork_1.ParseNetwork.getInstance().removeFromCache(parseConstants_1.TEACHER_EMAIL);
              ParseNetwork_1.ParseNetwork.getInstance().removeFromCache(parseConstants_1.TEACHER_PASSWORD);
              this.showNext();
              this.wText.active = true;
              this.wText.getComponent(chimple_label_1.default).string = util_1.Util.i18NText("Login Failed!!!");
              _a.label = 4;

             case 4:
              return [ 2 ];
            }
          });
        });
      };
      TeacherRegistration.prototype.showNext = function() {
        var loginButtonComponent = this.loginButton.getComponent(loginButton_1.LoginButton);
        var shouldShowActive = false;
        if (this.mode === Mode.Login) {
          loginButtonComponent.email(this.email);
          loginButtonComponent.password(this.password);
          shouldShowActive = !(!this.email || !this.password);
        } else {
          loginButtonComponent.email(this.email);
          loginButtonComponent.password(this.password);
          loginButtonComponent.fullName(this.fullName);
          shouldShowActive = !!(this.email && this.password && this.fullName && this.confirmPassword && this.password === this.confirmPassword);
        }
        shouldShowActive ? loginButtonComponent.activate() : loginButtonComponent.deActivate();
      };
      TeacherRegistration.prototype.renderEmailBox = function() {
        this.emailEditBox = cc.instantiate(this.customEditBoxPrefab);
        var base = this.emailEditBox.getChildByName("base");
        var editBoxComponent = base.getComponent(cc.EditBox);
        editBoxComponent.maxLength = EMAIL_LENGTH;
        this.emailEditBox.name = EditOptions.EmailChanged;
        var chimpleLabel = this.getChimpleLabel(this.emailEditBox);
        null != chimpleLabel ? chimpleLabel.string = EMAIL_PLACEHOLDER : "";
        return this.emailEditBox;
      };
      TeacherRegistration.prototype.renderFullNameBox = function() {
        this.fullNameEditBox = cc.instantiate(this.customEditBoxPrefab);
        var base = this.fullNameEditBox.getChildByName("base");
        var editBoxComponent = base.getComponent(cc.EditBox);
        editBoxComponent.maxLength = EMAIL_LENGTH;
        this.fullNameEditBox.name = EditOptions.FullNameChanged;
        var chimpleLabel = this.getChimpleLabel(this.fullNameEditBox);
        null != chimpleLabel ? chimpleLabel.string = FULL_NAME_PLACEHOLDER : "";
        return this.fullNameEditBox;
      };
      TeacherRegistration.prototype.renderPasswordBox = function(placeHolder) {
        this.passwordEditBox = cc.instantiate(this.customEditBoxPrefab);
        this.passwordEditBox.name = EditOptions.PasswordChanged;
        var baseNode = this.passwordEditBox.getChildByName("base");
        baseNode.getComponent(cc.EditBox).inputFlag = EditBox.InputFlag.PASSWORD;
        var chimpleLabel = this.getChimpleLabel(this.passwordEditBox);
        null != chimpleLabel ? chimpleLabel.string = placeHolder : "";
        return this.passwordEditBox;
      };
      TeacherRegistration.prototype.renderConfirmPasswordBox = function(placeHolder) {
        this.confirmPasswordEditBox = cc.instantiate(this.customEditBoxPrefab);
        this.confirmPasswordEditBox.name = EditOptions.ConfirmPasswordChanged;
        var baseNode = this.confirmPasswordEditBox.getChildByName("base");
        baseNode.getComponent(cc.EditBox).inputFlag = EditBox.InputFlag.PASSWORD;
        var chimpleLabel = this.getChimpleLabel(this.confirmPasswordEditBox);
        null != chimpleLabel ? chimpleLabel.string = placeHolder : "";
        return this.confirmPasswordEditBox;
      };
      TeacherRegistration.prototype.getChimpleLabel = function(parent) {
        var chimpleLabelComponent = null;
        var placeHolderLabel = parent.getChildByName("PLACEHOLDER_LABEL");
        null != placeHolderLabel && (chimpleLabelComponent = placeHolderLabel.getComponent(chimple_label_1.default));
        return chimpleLabelComponent;
      };
      TeacherRegistration.prototype.onSwitchMode = function(event) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this.mode === Mode.Login ? this.mode = Mode.Register : this.mode = Mode.Login;
              return [ 4, this.renderUI() ];

             case 1:
              _a.sent();
              this.showNext();
              this.wText.active = false;
              return [ 2 ];
            }
          });
        });
      };
      __decorate([ property(cc.Prefab) ], TeacherRegistration.prototype, "customEditBoxPrefab", void 0);
      __decorate([ property(cc.Prefab) ], TeacherRegistration.prototype, "loginButtonPrefab", void 0);
      __decorate([ property(cc.Prefab) ], TeacherRegistration.prototype, "loadingPrefab", void 0);
      __decorate([ property(cc.Node) ], TeacherRegistration.prototype, "label", void 0);
      __decorate([ property(cc.Node) ], TeacherRegistration.prototype, "switchModeNode", void 0);
      __decorate([ property(cc.Node) ], TeacherRegistration.prototype, "wText", void 0);
      __decorate([ error_handler_1.catchError() ], TeacherRegistration.prototype, "onLoad", null);
      TeacherRegistration = __decorate([ ccclass ], TeacherRegistration);
      return TeacherRegistration;
    }(cc.Component);
    exports.TeacherRegistration = TeacherRegistration;
    cc._RF.pop();
  }, {
    "../../../common/scripts/chimple-label": void 0,
    "../../../common/scripts/domain/parseConstants": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/services/ParseNetwork": void 0,
    "../../../common/scripts/services/parseApi": void 0,
    "../../../common/scripts/util": void 0,
    "../../school/scripts/customEditBox": "customEditBox",
    "../../school/scripts/landing": "landing",
    "../../school/scripts/selectionScene": "selectionScene",
    "./loginButton": "loginButton"
  } ],
  teacherReportCard: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bb8cdRd5rpDE5Ri6TjunzAj", "teacherReportCard");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TeacherReportCard = exports.SELECTED_SUBJECT = exports.CHAPTER_NAME = exports.SUBJECT_ID = exports.CHAPTER_ID = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var parseApi_1 = require("../../../common/scripts/services/parseApi");
    var ParseImageDownloader_1 = require("../../../common/scripts/services/ParseImageDownloader");
    var chimple_label_1 = require("../../../common/scripts/chimple-label");
    var subjectButton_1 = require("./subjectButton");
    var config_1 = require("../../../common/scripts/lib/config");
    var chapterButton_1 = require("./chapterButton");
    var ParseNetwork_1 = require("../../../common/scripts/services/ParseNetwork");
    var landing_1 = require("../../school/scripts/landing");
    var profile_1 = require("../../../common/scripts/lib/profile");
    exports.CHAPTER_ID = "chapterId";
    exports.SUBJECT_ID = "subjectId";
    exports.CHAPTER_NAME = "chapterName";
    exports.SELECTED_SUBJECT = "selectedSubject";
    var TeacherReportCard = function(_super) {
      __extends(TeacherReportCard, _super);
      function TeacherReportCard() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.subjectItemPrefab = null;
        _this.chapterPrefab = null;
        _this.photoInfos = [];
        _this.body = null;
        _this.view = null;
        _this.content = null;
        _this.bodyLayout = null;
        return _this;
      }
      TeacherReportCard.prototype.onLoad = function() {
        return __awaiter(this, void 0, void 0, function() {
          var _this = this;
          return __generator(this, function(_a) {
            config_1.default.i.loadCourseJsons(profile_1.User.getCurrentUser(), this.node, function() {
              return __awaiter(_this, void 0, void 0, function() {
                return __generator(this, function(_a) {
                  switch (_a.label) {
                   case 0:
                    return [ 4, this.renderUI() ];

                   case 1:
                    _a.sent();
                    return [ 4, this.registerSubjectSelectedEvent() ];

                   case 2:
                    _a.sent();
                    return [ 4, this.registerChapterSelectedEvent() ];

                   case 3:
                    _a.sent();
                    return [ 2 ];
                  }
                });
              });
            });
            return [ 2 ];
          });
        });
      };
      TeacherReportCard.prototype.renderUI = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this.body = this.node.getChildByName("body");
              this.view = this.body.getChildByName("view");
              this.content = this.view.getChildByName("content");
              this.bodyLayout = this.content.getChildByName("bodyLayout");
              return [ 4, this.renderSubjects() ];

             case 1:
              _a.sent();
              this.loadImages();
              return [ 2 ];
            }
          });
        });
      };
      TeacherReportCard.prototype.registerSubjectSelectedEvent = function() {
        return __awaiter(this, void 0, void 0, function() {
          var _this = this;
          return __generator(this, function(_a) {
            this.node.on(subjectButton_1.SUBJECT_ITEM_SELECTED_EVENT, function(event) {
              return __awaiter(_this, void 0, void 0, function() {
                var selectedItem, selectedCourse, chapters;
                return __generator(this, function(_a) {
                  event.stopPropagation();
                  this.bodyLayout.removeAllChildren(true);
                  selectedItem = event.getUserData();
                  selectedCourse = config_1.default.i.curriculum.get(selectedItem.subject);
                  if (selectedCourse && Array.isArray(selectedCourse.chapters) && selectedCourse.chapters.length > 0) {
                    chapters = selectedCourse.chapters;
                    this.renderChapters(selectedItem, chapters);
                  }
                  return [ 2 ];
                });
              });
            });
            return [ 2 ];
          });
        });
      };
      TeacherReportCard.prototype.registerChapterSelectedEvent = function() {
        return __awaiter(this, void 0, void 0, function() {
          var _this = this;
          return __generator(this, function(_a) {
            this.node.on(chapterButton_1.CHAPTER_ITEM_SELECTED_EVENT, function(event) {
              return __awaiter(_this, void 0, void 0, function() {
                var selectedItem;
                return __generator(this, function(_a) {
                  event.stopPropagation();
                  selectedItem = event.getUserData();
                  ParseNetwork_1.ParseNetwork.getInstance().storeIntoCache(exports.CHAPTER_ID, selectedItem.chapterId);
                  ParseNetwork_1.ParseNetwork.getInstance().storeIntoCache(exports.SUBJECT_ID, selectedItem.subjectId);
                  ParseNetwork_1.ParseNetwork.getInstance().storeIntoCache(exports.CHAPTER_NAME, selectedItem.chapterName);
                  ParseNetwork_1.ParseNetwork.getInstance().storeIntoCache(exports.SELECTED_SUBJECT, selectedItem.subject);
                  config_1.default.loadScene(landing_1.TEACHER_REPORT_METRICS_SCENE, "private", null);
                  return [ 2 ];
                });
              });
            });
            return [ 2 ];
          });
        });
      };
      TeacherReportCard.prototype.renderSubjects = function() {
        return __awaiter(this, void 0, void 0, function() {
          var _a;
          var _this = this;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              _a = this;
              return [ 4, parseApi_1.ParseApi.getInstance().allSubjects() ];

             case 1:
              _a.subjects = _b.sent();
              this.subjects.forEach(function(s) {
                _this.renderSubject(s);
              });
              return [ 2 ];
            }
          });
        });
      };
      TeacherReportCard.prototype.renderChapters = function(data, chapters) {
        var _this = this;
        chapters.forEach(function(ch) {
          var chapter = cc.instantiate(_this.chapterPrefab);
          var cb = chapter.getComponent(chapterButton_1.ChapterButton);
          cb.subjectId = data.id;
          cb.subject = data.subject;
          cb.chapterId = ch.id;
          cb.chapterName = ch.name;
          var label = chapter.getChildByName("label");
          var chimpleLabelComponent = label.getComponent(chimple_label_1.default);
          chimpleLabelComponent.string = ch.name;
          _this.bodyLayout.addChild(chapter);
          _this.content.height += chapter.height;
        });
        var layout = this.bodyLayout.getComponent(cc.Layout);
        layout.updateLayout();
        this.view.height = this.content.height;
        this.body.height = this.content.height;
        subjectButton_1.SubjectButton.clickedEnabled(true);
      };
      TeacherReportCard.prototype.renderSubject = function(s) {
        var parent = this.node.getChildByName("subjects");
        var item = cc.instantiate(this.subjectItemPrefab);
        var subjectButton = item.getComponent(subjectButton_1.SubjectButton);
        subjectButton.id = s.objectId;
        subjectButton.subject = s.courseCode;
        this.renderPhoto({
          item: item,
          photoChildName: "photo",
          photoUrl: s.image.url,
          labelChildName: "name",
          label: s.name
        });
        parent.addChild(item);
        return item;
      };
      TeacherReportCard.prototype.renderPhoto = function(photoInfo) {
        try {
          var photo = photoInfo.item.getChildByName(photoInfo.photoChildName);
          photo.scale = !photoInfo.scale ? 1 : photoInfo.scale;
          if (null != photoInfo.labelChildName) {
            var name = photo.getChildByName(photoInfo.labelChildName);
            var nameLabel = name.getComponent(chimple_label_1.default);
            nameLabel.string = photoInfo.label;
          }
          photoInfo.photoUrl && this.photoInfos.push({
            photoNode: photo,
            photoUrl: photoInfo.photoUrl
          });
        } catch (e) {
          cc.log(e);
        }
      };
      TeacherReportCard.prototype.loadImages = function() {
        this.photoInfos.forEach(function(p) {
          cc.log("section image", p.photoUrl);
          ParseImageDownloader_1.ParseImageDownloader.loadImage(p.photoUrl, function(texture) {
            if (!!texture && p.photoNode) {
              var spriteFrame = new cc.SpriteFrame(texture);
              var maskNode = p.photoNode.getChildByName("mask");
              if (maskNode) {
                var image = maskNode.getChildByName("image");
                image.getComponent(cc.Sprite).spriteFrame = spriteFrame;
              }
            }
          });
        });
      };
      __decorate([ property(cc.Prefab) ], TeacherReportCard.prototype, "subjectItemPrefab", void 0);
      __decorate([ property(cc.Prefab) ], TeacherReportCard.prototype, "chapterPrefab", void 0);
      TeacherReportCard = __decorate([ ccclass ], TeacherReportCard);
      return TeacherReportCard;
    }(cc.Component);
    exports.TeacherReportCard = TeacherReportCard;
    cc._RF.pop();
  }, {
    "../../../common/scripts/chimple-label": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/services/ParseImageDownloader": void 0,
    "../../../common/scripts/services/ParseNetwork": void 0,
    "../../../common/scripts/services/parseApi": void 0,
    "../../school/scripts/landing": "landing",
    "./chapterButton": "chapterButton",
    "./subjectButton": "subjectButton"
  } ],
  teacherReportMetrics: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3c9b8Kpau1MRYIZVW377n+B", "teacherReportMetrics");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TeacherReportMetrics = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var ParseNetwork_1 = require("../../../common/scripts/services/ParseNetwork");
    var teacherReportCard_1 = require("./teacherReportCard");
    var parseApi_1 = require("../../../common/scripts/services/parseApi");
    var config_1 = require("../../../common/scripts/lib/config");
    var chimple_label_1 = require("../../../common/scripts/chimple-label");
    var profile_1 = require("../../../common/scripts/lib/profile");
    var MAX_ELEMENT_IN_ROW = 6;
    var TeacherReportMetrics = function(_super) {
      __extends(TeacherReportMetrics, _super);
      function TeacherReportMetrics() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.labelPrefab = null;
        _this.checkPrefab = null;
        _this.lessonNames = [];
        _this.studentNames = [];
        _this.tableData = [];
        _this.callBackReceived = false;
        _this.pageView = null;
        _this.view = null;
        _this.content = null;
        _this.page = null;
        _this.studentNodes = [];
        return _this;
      }
      TeacherReportMetrics.prototype.onLoad = function() {
        var _this = this;
        config_1.default.i.loadCourseJsons(profile_1.User.getCurrentUser(), this.node, function() {
          return __awaiter(_this, void 0, void 0, function() {
            var subject, chapterId_1, chapters, lessons;
            var _this = this;
            return __generator(this, function(_a) {
              switch (_a.label) {
               case 0:
                if (!!this.callBackReceived) return [ 3, 3 ];
                this.callBackReceived = true;
                subject = ParseNetwork_1.ParseNetwork.getInstance().getStringFromCache(teacherReportCard_1.SELECTED_SUBJECT);
                chapterId_1 = ParseNetwork_1.ParseNetwork.getInstance().getStringFromCache(teacherReportCard_1.CHAPTER_ID);
                chapters = config_1.default.i.curriculum.get(subject).chapters;
                lessons = chapters.filter(function(c) {
                  return c.id === chapterId_1;
                }).map(function(ch) {
                  return ch.lessons;
                });
                lessons.forEach(function(l) {
                  l.forEach(function(l1) {
                    _this.lessonNames.push(l1.name);
                  });
                });
                this.chapterId = ParseNetwork_1.ParseNetwork.getInstance().getStringFromCache(teacherReportCard_1.CHAPTER_ID);
                this.subjectId = ParseNetwork_1.ParseNetwork.getInstance().getStringFromCache(teacherReportCard_1.SUBJECT_ID);
                this.chapterName = ParseNetwork_1.ParseNetwork.getInstance().getStringFromCache(teacherReportCard_1.CHAPTER_NAME);
                cc.log("this.lessonNames", this.lessonNames);
                return [ 4, this.fetchLessonProgressData() ];

               case 1:
                _a.sent();
                this.pageView = this.node.getChildByName("pageView");
                if (this.pageView) {
                  this.view = this.pageView.getChildByName("view");
                  this.content = this.view.getChildByName("content");
                  this.page = this.content.getChildByName("page");
                }
                return [ 4, this.renderUI() ];

               case 2:
                _a.sent();
                _a.label = 3;

               case 3:
                return [ 2 ];
              }
            });
          });
        });
      };
      TeacherReportMetrics.prototype.fetchLessonProgressData = function() {
        return __awaiter(this, void 0, void 0, function() {
          var studentInfos, studentIds, query, _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              return [ 4, parseApi_1.ParseApi.getInstance().getStudentsForTeacher() ];

             case 1:
              studentInfos = _b.sent();
              studentIds = studentInfos.map(function(info) {
                return info.objectId;
              });
              query = {
                chapterId: this.chapterId,
                subjectId: this.subjectId,
                studentInfos: studentIds
              };
              _a = this;
              return [ 4, parseApi_1.ParseApi.getInstance().getProgressForChapter(query) ];

             case 2:
              _a.studentLessonInfos = _b.sent();
              this.studentNames = this.studentLessonInfos.map(function(s) {
                return s.studentName;
              });
              cc.log("this.studentLessonInfos", this.studentLessonInfos);
              return [ 2 ];
            }
          });
        });
      };
      TeacherReportMetrics.prototype.renderUI = function() {
        return __awaiter(this, void 0, void 0, function() {
          var layout;
          var _this = this;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!this.labelPrefab) return [ 3, 3 ];
              return [ 4, this.addHeader() ];

             case 1:
              _a.sent();
              return [ 4, this.addRows() ];

             case 2:
              _a.sent();
              cc.log("tableData", this.tableData);
              this.content.height += 100;
              this.tableData.forEach(function(t) {
                t.forEach(function(e) {
                  _this.page.addChild(e);
                  if (_this.studentNodes.includes(e)) {
                    cc.log(e.width, e.height);
                    _this.content.width += e.width;
                    _this.content.height += e.height + 50;
                  }
                });
              });
              layout = this.page.getComponent(cc.Layout);
              layout.updateLayout();
              this.page.width = this.content.width;
              this.pageView.width = this.content.width;
              this.page.height = this.content.height;
              this.pageView.height = this.content.height;
              cc.log("111", this.content.width, this.content.height);
              _a.label = 3;

             case 3:
              return [ 2 ];
            }
          });
        });
      };
      TeacherReportMetrics.prototype.addHeader = function() {
        return __awaiter(this, void 0, void 0, function() {
          var lessonsToRender, header;
          var _this = this;
          return __generator(this, function(_a) {
            lessonsToRender = [ "" ].concat(this.lessonNames);
            header = [];
            lessonsToRender.forEach(function(l) {
              if (_this.labelPrefab) {
                var label = _this.createLabel(l);
                header.push(label);
              }
            });
            this.tableData.push(header);
            return [ 2 ];
          });
        });
      };
      TeacherReportMetrics.prototype.addRows = function() {
        return __awaiter(this, void 0, void 0, function() {
          var _this = this;
          return __generator(this, function(_a) {
            new Set(this.studentNames).forEach(function(s) {
              var rows = [];
              if (_this.labelPrefab) {
                var label = _this.createLabel(s);
                rows.push(label);
                _this.studentNodes.push(label);
              }
              _this.lessonNames.forEach(function(l) {
                var lessonInfos = _this.studentLessonInfos.filter(function(sl) {
                  return sl.studentName === s && sl.lesson === l;
                });
                if (0 === lessonInfos.length) {
                  var check = cc.instantiate(_this.checkPrefab);
                  check.opacity = 10;
                  rows.push(check);
                }
                lessonInfos.forEach(function(li) {
                  var check = cc.instantiate(_this.checkPrefab);
                  rows.push(check);
                });
              });
              _this.tableData.push(rows);
            });
            return [ 2 ];
          });
        });
      };
      TeacherReportMetrics.prototype.createLabel = function(l) {
        var label = cc.instantiate(this.labelPrefab);
        var chimpleLabel = label.getComponent(chimple_label_1.default);
        chimpleLabel.string = l;
        return label;
      };
      __decorate([ property(cc.Prefab) ], TeacherReportMetrics.prototype, "labelPrefab", void 0);
      __decorate([ property(cc.Prefab) ], TeacherReportMetrics.prototype, "checkPrefab", void 0);
      TeacherReportMetrics = __decorate([ ccclass ], TeacherReportMetrics);
      return TeacherReportMetrics;
    }(cc.Component);
    exports.TeacherReportMetrics = TeacherReportMetrics;
    cc._RF.pop();
  }, {
    "../../../common/scripts/chimple-label": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/services/ParseNetwork": void 0,
    "../../../common/scripts/services/parseApi": void 0,
    "./teacherReportCard": "teacherReportCard"
  } ],
  teacherSignUp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7945fdnqmRGlb6ozvcQmN0S", "teacherSignUp");
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
    exports.TeacherSignUp = void 0;
    var ccclass = cc._decorator.ccclass;
    var TeacherSignUp = function(_super) {
      __extends(TeacherSignUp, _super);
      function TeacherSignUp() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      TeacherSignUp.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
      };
      TeacherSignUp = __decorate([ ccclass ], TeacherSignUp);
      return TeacherSignUp;
    }(cc.Component);
    exports.TeacherSignUp = TeacherSignUp;
    cc._RF.pop();
  }, {} ],
  teacherStartContent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a5d427tYsRPeq4QDPWQJ4u+", "teacherStartContent");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var config_1 = require("../../../common/scripts/lib/config");
    var parseApi_1 = require("../../../common/scripts/services/parseApi");
    var chimple_label_1 = require("../../../common/scripts/chimple-label");
    var constants_1 = require("../../../common/scripts/lib/constants");
    var rowButton_1 = require("./rowButton");
    var lessonIcon_1 = require("../../../common/scripts/lessonIcon");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TeacherStartContent = function(_super) {
      __extends(TeacherStartContent, _super);
      function TeacherStartContent() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.rowPrefab = null;
        _this.layout = null;
        _this.scrollView = null;
        _this.lessonPrefab = null;
        _this.lessonIconPrefab = null;
        _this.assignmentCompletedPrefab = null;
        _this.assignmentCompletedMidScorePrefab = null;
        _this.assignmentCompletedLowScorePrefab = null;
        _this.assignmentNotCompletedPrefab = null;
        _this.lessonsInRow = [];
        _this.totalLessons = 0;
        _this.learningSummary = [];
        return _this;
      }
      TeacherStartContent.prototype.onLoad = function() {
        return __awaiter(this, void 0, void 0, function() {
          var schoolId, sectionId, _a, _b;
          return __generator(this, function(_c) {
            switch (_c.label) {
             case 0:
              cc.log("curriculum", config_1.default.i.curriculum);
              schoolId = cc.sys.localStorage.getItem(constants_1.CURRENT_SCHOOL_ID);
              sectionId = cc.sys.localStorage.getItem(constants_1.CURRENT_SECTION_ID);
              _a = this;
              return [ 4, parseApi_1.ParseApi.getInstance().getAssignments(schoolId, sectionId) ];

             case 1:
              _a.assignment = _c.sent();
              _b = this;
              return [ 4, parseApi_1.ParseApi.getInstance().getLearningSummary(this.assignment.students.map(function(s) {
                return s.studentId;
              })) ];

             case 2:
              _b.learningSummary = _c.sent();
              cc.log("learningSummary", this.learningSummary);
              if (this.assignment && this.assignment.assignments && this.assignment.assignments.length > 0) {
                this.renderHeader();
                this.renderRow();
              }
              return [ 2 ];
            }
          });
        });
      };
      TeacherStartContent.prototype.renderHeader = function() {
        var _this = this;
        var row = cc.instantiate(this.rowPrefab);
        var h1 = row.getChildByName("h1");
        var header1 = h1.getChildByName("header1");
        var label = header1.getComponent(chimple_label_1.default);
        label.string = "Section 1";
        var lessonObjs = this.getLessons(this.assignment.assignments);
        this.totalLessons = lessonObjs.length;
        lessonObjs.forEach(function(a) {
          row.addChild(_this.renderLessonIcon(a));
        });
        this.layout.addChild(row);
        var layoutComponent = this.layout.getComponent(cc.Layout);
        layoutComponent.updateLayout();
      };
      TeacherStartContent.prototype.renderRow = function() {
        var _this = this;
        this.assignment.students.forEach(function(student) {
          var row = cc.instantiate(_this.rowPrefab);
          var rowButtonComponent = row.getComponent(rowButton_1.default);
          _this.layout.addChild(row);
          row.height = 100;
          var h1 = row.getChildByName("h1");
          var header1 = h1.getChildByName("header1");
          var label = header1.getComponent(chimple_label_1.default);
          label.string = student.name ? student.name.substring(0, 9) : "default";
          rowButtonComponent.studentId = student.studentId;
          var h2 = row.getChildByName("h2");
          var header2 = h2.getChildByName("header2");
          var label2 = header2.getComponent(chimple_label_1.default);
          var summary = _this.learningSummary.find(function(ls) {
            return ls.studentId === student.studentId;
          });
          label2.string = !!summary && summary.totalTime ? summary.totalTime + " s" : "0 s";
          _this.lessonsInRow.forEach(function(l) {
            _this.assignment.assignments.forEach(function(assn) {
              if (assn.chapter + "#" + assn.lesson === l) {
                var matched = assn.studentAssessments.filter(function(s) {
                  return s.studentId === student.studentId;
                });
                if (matched && matched.length > 0) matched.forEach(function(m) {
                  if (m.assessment < 50) {
                    var completed = cc.instantiate(_this.assignmentCompletedLowScorePrefab);
                    row.addChild(completed);
                  } else if (m.assessment > 50 && m.assessment < 75) {
                    var completed = cc.instantiate(_this.assignmentCompletedMidScorePrefab);
                    row.addChild(completed);
                  } else {
                    var completed = cc.instantiate(_this.assignmentCompletedPrefab);
                    row.addChild(completed);
                  }
                }); else {
                  var notCompleted = cc.instantiate(_this.assignmentNotCompletedPrefab);
                  row.addChild(notCompleted);
                }
              }
            });
          });
        });
        var layoutComponent = this.layout.getComponent(cc.Layout);
        layoutComponent.updateLayout();
        this.layout.parent.height = this.layout.height;
        var scrollViewComponent = this.scrollView.getComponent(cc.ScrollView);
        scrollViewComponent.scrollToTop(.25);
      };
      TeacherStartContent.prototype.getLessons = function(assignments) {
        var _this = this;
        var allChapterLessons = assignments.map(function(a) {
          return {
            subject: a.subject,
            lesson: a.lesson,
            chapter: a.chapter
          };
        });
        var allLessons = Array.from(new Set(allChapterLessons.map(function(item) {
          return item.subject + "#" + item.chapter + "#" + item.lesson;
        })));
        var allImagesToLoad = allLessons.map(function(e, index) {
          var lessonObj = null;
          var _a = e.split("#"), subject = _a[0], chapter = _a[1], lesson = _a[2];
          _this.lessonsInRow.push(chapter + "#" + lesson);
          var course = config_1.default.i.curriculum.get(subject);
          if (course) {
            var chapters = course.chapters.filter(function(c) {
              return c.id === chapter;
            });
            if (chapters && 1 === chapters.length) {
              var lessons = chapters[0].lessons.filter(function(l) {
                return l.id === lesson;
              });
              lessons && 1 === lessons.length && (lessonObj = lessons[0]);
              return lessonObj;
            }
          }
        });
        return allImagesToLoad;
      };
      TeacherStartContent.prototype.renderLessonIcon = function(lesson) {
        var lessonBg = cc.instantiate(this.lessonPrefab);
        var lessonIcon = cc.instantiate(this.lessonIconPrefab);
        var lessonIconComp = lessonIcon.getComponent(lessonIcon_1.default);
        lessonIconComp.lesson = lesson;
        lessonIconComp.open = true;
        lessonIcon.scale = .5;
        lessonBg.addChild(lessonIcon);
        return lessonBg;
      };
      __decorate([ property(cc.Prefab) ], TeacherStartContent.prototype, "rowPrefab", void 0);
      __decorate([ property(cc.Node) ], TeacherStartContent.prototype, "layout", void 0);
      __decorate([ property(cc.Node) ], TeacherStartContent.prototype, "scrollView", void 0);
      __decorate([ property(cc.Prefab) ], TeacherStartContent.prototype, "lessonPrefab", void 0);
      __decorate([ property(cc.Prefab) ], TeacherStartContent.prototype, "lessonIconPrefab", void 0);
      __decorate([ property(cc.Prefab) ], TeacherStartContent.prototype, "assignmentCompletedPrefab", void 0);
      __decorate([ property(cc.Prefab) ], TeacherStartContent.prototype, "assignmentCompletedMidScorePrefab", void 0);
      __decorate([ property(cc.Prefab) ], TeacherStartContent.prototype, "assignmentCompletedLowScorePrefab", void 0);
      __decorate([ property(cc.Prefab) ], TeacherStartContent.prototype, "assignmentNotCompletedPrefab", void 0);
      TeacherStartContent = __decorate([ ccclass ], TeacherStartContent);
      return TeacherStartContent;
    }(cc.Component);
    exports.default = TeacherStartContent;
    cc._RF.pop();
  }, {
    "../../../common/scripts/chimple-label": void 0,
    "../../../common/scripts/lessonIcon": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/constants": void 0,
    "../../../common/scripts/services/parseApi": void 0,
    "./rowButton": "rowButton"
  } ],
  teacherStudentButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2f4b3UrjUtKxogt66ElxzV6", "teacherStudentButton");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var config_1 = require("../../../common/scripts/lib/config");
    var util_1 = require("../../../common/scripts/util");
    var ParseImageDownloader_1 = require("../../../common/scripts/services/ParseImageDownloader");
    var teacherStudentProgress_1 = require("./teacherStudentProgress");
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var TeacherStudentButton = function(_super) {
      __extends(TeacherStudentButton, _super);
      function TeacherStudentButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.assessment = 0;
        _this.isAssignmentPresent = false;
        return _this;
      }
      TeacherStudentButton.prototype.onLoad = function() {
        return __awaiter(this, void 0, void 0, function() {
          var config;
          var _this = this;
          return __generator(this, function(_a) {
            config = config_1.default.i;
            this.label.string = this.lesson.name;
            this.node.getChildByName("checkmark").active = this.isAssignmentPresent;
            if (null != this.student) {
              this.star1.spriteFrame = this.assessment > 25 ? this.goldStar : this.grayStar;
              this.star2.spriteFrame = this.assessment > 50 ? this.goldStar : this.grayStar;
              this.star3.spriteFrame = this.assessment > 75 ? this.goldStar : this.grayStar;
              this.label.string = this.student.name;
              this.student && this.student.image && this.student.image.url && (this.student.image.url.startsWith("http") ? ParseImageDownloader_1.ParseImageDownloader.loadImage(this.student.image.url, function(texture) {
                !texture || (_this.sprite.spriteFrame = new cc.SpriteFrame(texture));
              }) : util_1.Util.load(this.student.image.url, function(err, texture) {
                err || !texture || (_this.sprite.spriteFrame = new cc.SpriteFrame(texture));
              }));
              this.button.node.on("touchend", function() {
                var customEvent = new cc.Event.EventCustom(teacherStudentProgress_1.ASSIGN_HW_TO_STUDENT, true);
                customEvent.setUserData({
                  studentId: _this.student ? _this.student.objectId : null,
                  name: _this.student ? _this.student.name : ""
                });
                _this.node.dispatchEvent(customEvent);
              });
            }
            return [ 2 ];
          });
        });
      };
      __decorate([ property(cc.Label) ], TeacherStudentButton.prototype, "label", void 0);
      __decorate([ property(cc.Button) ], TeacherStudentButton.prototype, "button", void 0);
      __decorate([ property(cc.Sprite) ], TeacherStudentButton.prototype, "sprite", void 0);
      __decorate([ property(cc.Sprite) ], TeacherStudentButton.prototype, "completedSprite", void 0);
      __decorate([ property(cc.Material) ], TeacherStudentButton.prototype, "grayMaterial", void 0);
      __decorate([ property(cc.Sprite) ], TeacherStudentButton.prototype, "star1", void 0);
      __decorate([ property(cc.Sprite) ], TeacherStudentButton.prototype, "star2", void 0);
      __decorate([ property(cc.Sprite) ], TeacherStudentButton.prototype, "star3", void 0);
      __decorate([ property(cc.SpriteFrame) ], TeacherStudentButton.prototype, "grayStar", void 0);
      __decorate([ property(cc.SpriteFrame) ], TeacherStudentButton.prototype, "goldStar", void 0);
      TeacherStudentButton = __decorate([ ccclass ], TeacherStudentButton);
      return TeacherStudentButton;
    }(cc.Component);
    exports.default = TeacherStudentButton;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/services/ParseImageDownloader": void 0,
    "../../../common/scripts/util": void 0,
    "./teacherStudentProgress": "teacherStudentProgress"
  } ],
  teacherStudentProcessScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5628flCaVRDy7zNMHTYHME9", "teacherStudentProcessScene");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var studentProgress_1 = require("../../home/secondscreen/script/studentProgress");
    var parseApi_1 = require("../../../common/scripts/services/parseApi");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TeacherStudentProcessScene = function(_super) {
      __extends(TeacherStudentProcessScene, _super);
      function TeacherStudentProcessScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.studentProgressPrefab = null;
        _this.studentProgressNode = null;
        _this.chapterProgresses = [];
        _this.curChapter = null;
        return _this;
      }
      TeacherStudentProcessScene_1 = TeacherStudentProcessScene;
      TeacherStudentProcessScene.prototype.onLoad = function() {
        return __awaiter(this, void 0, void 0, function() {
          var _a, studentProgress, studentProgressComp;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              _a = this;
              return [ 4, parseApi_1.ParseApi.getInstance().getChapterProgressByStudent(TeacherStudentProcessScene_1.user.id) ];

             case 1:
              _a.chapterProgresses = _b.sent();
              studentProgress = cc.instantiate(this.studentProgressPrefab);
              studentProgressComp = studentProgress.getComponent(studentProgress_1.default);
              studentProgressComp.user = TeacherStudentProcessScene_1.user;
              studentProgressComp.getChapterProgress = this.getChapterProgress.bind(this);
              studentProgressComp.getLessonProgressMap = this.getLessonProgressMap.bind(this);
              studentProgressComp.shouldShowAssignment = this.shouldShowAssignment.bind(this);
              this.studentProgressNode.addChild(studentProgress);
              return [ 2 ];
            }
          });
        });
      };
      TeacherStudentProcessScene.prototype.getChapterProgress = function(chapter) {
        this.curChapter = chapter;
        var progressByChapter = this.chapterProgresses.filter(function(cp) {
          return cp.chapter == chapter.id;
        });
        if (!!progressByChapter && progressByChapter.length > 0) {
          var tCompleted_1 = 0;
          progressByChapter.forEach(function(c) {
            tCompleted_1 += c.percentComplete;
          });
          var completion = {
            percentageComplete: tCompleted_1
          };
          return completion.percentageComplete;
        }
        return 0;
      };
      TeacherStudentProcessScene.prototype.shouldShowAssignment = function() {
        return true;
      };
      TeacherStudentProcessScene.prototype.getLessonProgressMap = function(chapter, callback) {
        var _this = this;
        return function(callback) {
          return __awaiter(_this, void 0, void 0, function() {
            var query, studentLessonInfos, pMap;
            return __generator(this, function(_a) {
              switch (_a.label) {
               case 0:
                query = {
                  chapterId: chapter.id,
                  studentInfos: [ TeacherStudentProcessScene_1.user.id ]
                };
                return [ 4, parseApi_1.ParseApi.getInstance().getProgressForChapter(query) ];

               case 1:
                studentLessonInfos = _a.sent();
                pMap = new Map();
                studentLessonInfos.forEach(function(s) {
                  var p = {};
                  p.score = s.assessment || 0;
                  pMap.set(s.lesson, p);
                });
                TeacherStudentProcessScene_1.user.lessonProgressMap = pMap;
                callback(TeacherStudentProcessScene_1.user.lessonProgressMap);
                return [ 2 ];
              }
            });
          });
        }(callback);
      };
      var TeacherStudentProcessScene_1;
      __decorate([ property(cc.Prefab) ], TeacherStudentProcessScene.prototype, "studentProgressPrefab", void 0);
      __decorate([ property(cc.Node) ], TeacherStudentProcessScene.prototype, "studentProgressNode", void 0);
      TeacherStudentProcessScene = TeacherStudentProcessScene_1 = __decorate([ ccclass ], TeacherStudentProcessScene);
      return TeacherStudentProcessScene;
    }(cc.Component);
    exports.default = TeacherStudentProcessScene;
    cc._RF.pop();
  }, {
    "../../../common/scripts/services/parseApi": void 0,
    "../../home/secondscreen/script/studentProgress": "studentProgress"
  } ],
  teacherStudentProgress: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2595aFUwERF5bQRuUOe1AeG", "teacherStudentProgress");
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
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ASSIGN_HW_TO_STUDENT = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var config_1 = require("../../../common/scripts/lib/config");
    var constants_1 = require("../../../common/scripts/lib/constants");
    var parseApi_1 = require("../../../common/scripts/services/parseApi");
    var teacherStudentButton_1 = require("./teacherStudentButton");
    var assignHomeWork_1 = require("./assignHomeWork");
    var util_1 = require("../../../common/scripts/util");
    var chimple_label_1 = require("../../../common/scripts/chimple-label");
    exports.ASSIGN_HW_TO_STUDENT = "ASSIGN_HW_TO_STUDENT";
    var TeacherStudentProgress = function(_super) {
      __extends(TeacherStudentProgress, _super);
      function TeacherStudentProgress() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lessonButtonPrefab = null;
        _this.assignHWPrefab = null;
        _this.assignHWButton = null;
        _this.layout = null;
        _this.label = null;
        _this.loading = null;
        return _this;
      }
      TeacherStudentProgress.prototype.onLoad = function() {
        return __awaiter(this, void 0, void 0, function() {
          var config, schoolId, sectionId, students, progressResults, assignments;
          var _this = this;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              config = config_1.default.i;
              this.label.string = config.lesson.name;
              this.loading.active = true;
              schoolId = cc.sys.localStorage.getItem(constants_1.CURRENT_SCHOOL_ID);
              sectionId = cc.sys.localStorage.getItem(constants_1.CURRENT_SECTION_ID);
              return [ 4, parseApi_1.ParseApi.getInstance().getStudentsForSection(schoolId, sectionId) ];

             case 1:
              students = _a.sent();
              return [ 4, parseApi_1.ParseApi.getInstance().getProgressForStudentByChapterAndLesson(config.chapter.id, config.lesson.id) ];

             case 2:
              progressResults = _a.sent();
              return [ 4, parseApi_1.ParseApi.getInstance().getAssignmentsForStudentsByChapterAndLesson(schoolId, sectionId, config.chapter.id, config.lesson.id, students) ];

             case 3:
              assignments = _a.sent();
              students.forEach(function(student, index) {
                var lessonButton = cc.instantiate(_this.lessonButtonPrefab);
                var lessonButtonComp = lessonButton.getComponent(teacherStudentButton_1.default);
                lessonButtonComp.student = student;
                lessonButtonComp.lesson = config.lesson;
                var assignmentCurrLesson = assignments.filter(function(a) {
                  return a.student && a.student.objectId === student.objectId && a.chapter === config.chapter.id && a.lesson === config.lesson.id;
                });
                var isAssignmentPresent = assignmentCurrLesson && assignmentCurrLesson.length > 0;
                lessonButtonComp.isAssignmentPresent = isAssignmentPresent;
                var result = progressResults.filter(function(sl) {
                  return sl.objectId === student.objectId && sl.lesson == config.lesson.id;
                });
                var assessment = 0;
                if (result && result.length > 0) {
                  var r = result[0];
                  assessment = r.assessment;
                }
                lessonButtonComp.assessment = assessment;
                lessonButtonComp.loading = _this.loading;
                _this.layout.addChild(lessonButton);
              });
              this.layout.width = cc.winSize.width;
              this.layout.parent.height = this.layout.height;
              this.layout.parent.width = cc.winSize.width;
              this.layout.parent.parent.width = cc.winSize.width;
              this.loading.active = false;
              this.node.on(exports.ASSIGN_HW_TO_STUDENT, function(event) {
                event.stopPropagation();
                var _a = event.getUserData(), studentId = _a.studentId, name = _a.name;
                _this.showAssignHWDialog(studentId, name);
              });
              return [ 2 ];
            }
          });
        });
      };
      TeacherStudentProgress.prototype.updateUI = function(studentId) {
        this.layout.children.filter(function(c) {
          var teacherStudentComponent = c.getComponent(teacherStudentButton_1.default);
          null != teacherStudentComponent && (studentId ? teacherStudentComponent.student.objectId === studentId && (c.getChildByName("checkmark").active = true) : c.getChildByName("checkmark").active = true);
        });
      };
      TeacherStudentProgress.prototype.onAssignHWClicked = function(event) {
        this.showAssignHWDialog();
      };
      TeacherStudentProgress.prototype.homeAssigned = function(studentId) {
        cc.log("homeAssigned", studentId);
        this.updateUI(studentId);
      };
      TeacherStudentProgress.prototype.showAssignHWDialog = function(studentId, name) {
        void 0 === studentId && (studentId = null);
        void 0 === name && (name = null);
        var assignHw = cc.instantiate(this.assignHWPrefab);
        var assignHwComponent = assignHw.getComponent(assignHomeWork_1.AssignHomeWork);
        assignHwComponent.parent = this.assignHWButton;
        assignHwComponent.studentId = studentId;
        var chimpleLabelComponent = assignHwComponent.text.getComponent(chimple_label_1.default);
        null === studentId ? chimpleLabelComponent.string = util_1.Util.i18NText("Assign Home to All") : null != studentId && null !== name && (chimpleLabelComponent.string = util_1.Util.i18NText("Assign Home to") + " " + name);
        assignHwComponent.chapterId = config_1.default.i.chapter.id;
        assignHwComponent.lessonId = config_1.default.i.lesson.id;
        assignHwComponent.callBack = this.homeAssigned.bind(this);
        this.node.addChild(assignHw);
        this.assignHWButton.active = false;
      };
      TeacherStudentProgress.prototype.onShareClicked = function() {
        var config = config_1.default.i;
        cc.sys.openURL("https://bahama-stage.web.app/?courseId=" + config.course.id + "&chapterId=" + config.chapter.id + "&lessonId=" + config.lesson.id);
      };
      __decorate([ property(cc.Prefab) ], TeacherStudentProgress.prototype, "lessonButtonPrefab", void 0);
      __decorate([ property(cc.Prefab) ], TeacherStudentProgress.prototype, "assignHWPrefab", void 0);
      __decorate([ property(cc.Node) ], TeacherStudentProgress.prototype, "assignHWButton", void 0);
      __decorate([ property(cc.Node) ], TeacherStudentProgress.prototype, "layout", void 0);
      __decorate([ property(cc.Label) ], TeacherStudentProgress.prototype, "label", void 0);
      __decorate([ property(cc.Node) ], TeacherStudentProgress.prototype, "loading", void 0);
      TeacherStudentProgress = __decorate([ ccclass ], TeacherStudentProgress);
      return TeacherStudentProgress;
    }(cc.Component);
    exports.default = TeacherStudentProgress;
    cc._RF.pop();
  }, {
    "../../../common/scripts/chimple-label": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/constants": void 0,
    "../../../common/scripts/services/parseApi": void 0,
    "../../../common/scripts/util": void 0,
    "./assignHomeWork": "assignHomeWork",
    "./teacherStudentButton": "teacherStudentButton"
  } ],
  usage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "276aaid1oBHyb2yVs6yxAJ7", "usage");
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
    var chimple_label_1 = require("../../../../common/scripts/chimple-label");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Usage = function(_super) {
      __extends(Usage, _super);
      function Usage() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.graphics = null;
        return _this;
      }
      Usage.prototype.onLoad = function() {
        var _this = this;
        this.lessons.slice(0, 7).map(function(num, index) {
          var x = index * _this.node.width / 7;
          var y = Math.min(num, 10) * _this.node.height / 10;
          index > 0 && _this.graphics.lineTo(x, y);
          _this.graphics.stroke();
          _this.graphics.moveTo(x, y);
          return [ x, y, num ];
        }).forEach(function(_a) {
          var x = _a[0], y = _a[1], num = _a[2];
          _this.graphics.circle(x, y, 16);
          _this.graphics.fillColor = 0 == num ? cc.Color.RED : num < 5 ? cc.Color.ORANGE : cc.Color.GREEN;
          _this.graphics.fill();
          var labelNode = new cc.Node();
          var label = labelNode.addComponent(chimple_label_1.default);
          label.string = num.toString();
          label.fontSize = 24;
          label.verticalAlign = cc.Label.VerticalAlign.CENTER;
          labelNode.position = cc.v3(x, y);
          _this.node.addChild(labelNode);
        });
      };
      __decorate([ property(cc.Graphics) ], Usage.prototype, "graphics", void 0);
      Usage = __decorate([ ccclass ], Usage);
      return Usage;
    }(cc.Component);
    exports.default = Usage;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/chimple-label": void 0
  } ],
  usercomponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fe3ecYSXCFGYIg7ramzW4AP", "usercomponent");
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
    var config_1 = require("../../../../common/scripts/lib/config");
    var usage_1 = require("./usage");
    var studentProgressScene_1 = require("./studentProgressScene");
    var chimple_label_1 = require("../../../../common/scripts/chimple-label");
    var util_1 = require("../../../../common/scripts/util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var UserComponent = function(_super) {
      __extends(UserComponent, _super);
      function UserComponent() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.usagePrefab = null;
        _this.usage = null;
        _this.report = null;
        return _this;
      }
      UserComponent.prototype.onLoad = function() {
        var _this = this;
        this.addUsage();
        this.report.on("touchend", function() {
          studentProgressScene_1.default.user = _this.user;
          config_1.default.i.pushScene("private/home/secondscreen/scenes/studentProgressScene", "private");
        });
        this.node.getChildByName("Label").getComponent(cc.Label).string = this.user.name;
        this.node.getChildByName("Edit").on("touchend", function() {
          return _this.onClickEdit();
        }, this);
        this.node.width = cc.winSize.width;
      };
      UserComponent.prototype.onEnable = function() {
        cc.log("enable");
        var label = this.report.getChildByName("Label");
        if (label) {
          var chimpleLabel = label.getComponent(chimple_label_1.default);
          chimpleLabel.string = util_1.Util.i18NText("report");
        }
      };
      UserComponent.prototype.addUsage = function() {
        var usageNode = cc.instantiate(this.usagePrefab);
        var lessons = [ 0, 0, 0, 0, 0, 0, 0 ];
        var now = Date.now();
        this.user.lessonProgressMap.forEach(function(lp) {
          lp.score >= 0 && lp.date && now - lp.date.getTime() < 6048e5 && lessons[Math.floor(Math.abs((now - lp.date.getTime()) / 864e5))]++;
        });
        usageNode.getComponent(usage_1.default).lessons = lessons;
        this.usage.addChild(usageNode);
      };
      UserComponent.prototype.onClickEdit = function() {
        cc.sys.localStorage.setItem("userToEdit", this.user.id);
        config_1.default.getInstance().pushScene("editProfile");
      };
      __decorate([ property(cc.Prefab) ], UserComponent.prototype, "usagePrefab", void 0);
      __decorate([ property(cc.Node) ], UserComponent.prototype, "usage", void 0);
      __decorate([ property(cc.Node) ], UserComponent.prototype, "report", void 0);
      UserComponent = __decorate([ ccclass ], UserComponent);
      return UserComponent;
    }(cc.Component);
    exports.default = UserComponent;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/chimple-label": void 0,
    "../../../../common/scripts/lib/config": void 0,
    "../../../../common/scripts/util": void 0,
    "./studentProgressScene": "studentProgressScene",
    "./usage": "usage"
  } ],
  welcomePage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "81dcfq91K9NyL/tEeDUMdHg", "welcomePage");
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
    var profile_1 = require("../../../../common/scripts/lib/profile");
    var constants_1 = require("../../../../common/scripts/lib/constants");
    var config_1 = require("../../../../common/scripts/lib/config");
    var util_1 = require("../../../../common/scripts/util");
    var chimple_label_1 = require("../../../../common/scripts/chimple-label");
    var languageButton_1 = require("./languageButton");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WelcomePage = function(_super) {
      __extends(WelcomePage, _super);
      function WelcomePage() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.addButton = null;
        _this.userButton = null;
        _this.parentButtonPrefab = null;
        _this.schoolButtonPrefab = null;
        _this.parentOrSettingNode = null;
        _this.languageDropDown = null;
        _this.soundOn = null;
        _this.soundOff = null;
        _this.soundButton = null;
        _this.languagelayout = null;
        _this.languagePrefab = null;
        _this.languageLabel = null;
        _this.bgMusic = null;
        _this.soundStatus = false;
        _this.langugeDropDownClicked = false;
        return _this;
      }
      WelcomePage_1 = WelcomePage;
      WelcomePage.prototype.onLoad = function() {
        var _this = this;
        this.setSoundSlider();
        util_1.Util.playSfx(this.bgMusic, true, true);
        this.languageLabel.string = config_1.LANG_CONFIGS.get(profile_1.default.lang).displayName;
        util_1.Util.loadi18NMapping(function() {
          var lang = profile_1.default.lang || config_1.Lang.ENGLISH;
          var langConfig = config_1.LANG_CONFIGS.get(lang);
          config_1.default.i.hasLoadedTextFont(langConfig.font) || config_1.default.i.loadFontDynamically(langConfig.font);
          _this.selectModes();
          _this.layoutManager();
          profile_1.default.initialize();
        });
      };
      WelcomePage.prototype.setSoundSlider = function() {
        if (profile_1.default.getItem(profile_1.SFX_OFF)) {
          this.soundStatus = false;
          this.soundButtonToggle();
        }
      };
      WelcomePage.prototype.soundButtonToggle = function() {
        this.soundStatus = !this.soundStatus;
        if (this.soundStatus) {
          cc.audioEngine.pauseMusic();
          this.soundButton.getComponent(cc.Sprite).spriteFrame = this.soundOff;
          profile_1.default.setItem(profile_1.SFX_OFF, 1);
        } else {
          this.soundButton.getComponent(cc.Sprite).spriteFrame = this.soundOn;
          profile_1.default.setItem(profile_1.SFX_OFF, 0);
          util_1.Util.playSfx(this.bgMusic, true, true);
          cc.audioEngine.resumeMusic();
        }
      };
      WelcomePage.prototype.languageSelector = function() {
        if (this.langugeDropDownClicked) {
          this.langugeDropDownClicked = false;
          this.languageDropDown.active = false;
        } else {
          this.languagelayout.destroyAllChildren();
          this.languageDropDown.active = true;
          this.languageDropDown.height = 60 * config_1.ALL_LANGS.length;
          for (var _i = 0, ALL_LANGS_1 = config_1.ALL_LANGS; _i < ALL_LANGS_1.length; _i++) {
            var data = ALL_LANGS_1[_i];
            var languageButton = cc.instantiate(this.languagePrefab);
            var languageButtonItem = languageButton.getComponent(languageButton_1.default);
            languageButtonItem.language = config_1.ALL_LANGS[config_1.ALL_LANGS.indexOf(data)];
            languageButtonItem.languageLable = this.languageLabel;
            languageButtonItem.parentNode = this.parentButtonNode;
            languageButtonItem.languageDropDownNode = this.languageDropDown;
            languageButtonItem.schoolNode = this.schoolButtonNode;
            languageButton.name = data;
            languageButton.getComponentInChildren(cc.Label).string = config_1.LANG_CONFIGS.get(config_1.ALL_LANGS[config_1.ALL_LANGS.indexOf(data)]).displayName;
            this.languagelayout.addChild(languageButton);
          }
          this.langugeDropDownClicked = true;
        }
      };
      WelcomePage.prototype.selectModes = function() {
        var mode = parseInt(profile_1.default.getValue(profile_1.CURRENTMODE));
        var modes = mode;
        switch (modes) {
         case constants_1.Mode.School:
          config_1.default.i.pushScene("private/school/scenes/selectSections", "private", null, true);
          break;

         case constants_1.Mode.Home:
          this.parentButtonNode = cc.instantiate(this.parentButtonPrefab);
          var bg = this.parentButtonNode.getChildByName("Background");
          if (bg) {
            var label = bg.getChildByName("Label");
            var chimpleLabelComponent = label.getComponent(chimple_label_1.default);
            chimpleLabelComponent.string = util_1.Util.i18NText("Parent");
          }
          this.parentOrSettingNode.addChild(this.parentButtonNode);
          break;

         case constants_1.Mode.None:
         default:
          this.schoolButtonNode = cc.instantiate(this.schoolButtonPrefab);
          this.parentOrSettingNode.addChild(this.schoolButtonNode);
        }
      };
      WelcomePage.prototype.layoutManager = function() {
        var _this = this;
        var filteredUsers = profile_1.User.getUsers().filter(function(e) {
          return !e.isTeacher && e.age > 0;
        }) || [];
        WelcomePage_1.userArr = filteredUsers;
        cc.log("=<>=" + WelcomePage_1.userArr.length);
        if (0 == WelcomePage_1.userArr.length) {
          var addBtn = cc.instantiate(this.addButton);
          this.node.getChildByName("plusbutton").addChild(addBtn);
          this.node.getChildByName("messageLabel").getComponent(cc.Label).string = "";
        }
        filteredUsers.forEach(function(e) {
          cc.log(e);
          var userButtonRef = cc.instantiate(_this.userButton);
          userButtonRef.getChildByName("Label").getComponent(cc.Label).string = e.name;
          cc.resources.load("avatars/" + e.avatarImage, function(err, sp) {
            userButtonRef.getChildByName("Background").getChildByName("avatar").getChildByName("icon").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
          });
          userButtonRef.name = e.id;
          _this.node.getChildByName("userLayout").addChild(userButtonRef);
        });
        var a = cc.sys.localStorage.getItem("userId");
      };
      var WelcomePage_1;
      __decorate([ property(cc.Prefab) ], WelcomePage.prototype, "addButton", void 0);
      __decorate([ property(cc.Prefab) ], WelcomePage.prototype, "userButton", void 0);
      __decorate([ property(cc.Prefab) ], WelcomePage.prototype, "parentButtonPrefab", void 0);
      __decorate([ property(cc.Prefab) ], WelcomePage.prototype, "schoolButtonPrefab", void 0);
      __decorate([ property(cc.Node) ], WelcomePage.prototype, "parentOrSettingNode", void 0);
      __decorate([ property(cc.Node) ], WelcomePage.prototype, "languageDropDown", void 0);
      __decorate([ property(cc.SpriteFrame) ], WelcomePage.prototype, "soundOn", void 0);
      __decorate([ property(cc.SpriteFrame) ], WelcomePage.prototype, "soundOff", void 0);
      __decorate([ property(cc.Button) ], WelcomePage.prototype, "soundButton", void 0);
      __decorate([ property(cc.Node) ], WelcomePage.prototype, "languagelayout", void 0);
      __decorate([ property(cc.Prefab) ], WelcomePage.prototype, "languagePrefab", void 0);
      __decorate([ property(cc.Label) ], WelcomePage.prototype, "languageLabel", void 0);
      __decorate([ property(cc.AudioClip) ], WelcomePage.prototype, "bgMusic", void 0);
      WelcomePage = WelcomePage_1 = __decorate([ ccclass ], WelcomePage);
      return WelcomePage;
    }(cc.Component);
    exports.default = WelcomePage;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/chimple-label": void 0,
    "../../../../common/scripts/lib/config": void 0,
    "../../../../common/scripts/lib/constants": void 0,
    "../../../../common/scripts/lib/profile": void 0,
    "../../../../common/scripts/util": void 0,
    "./languageButton": "languageButton"
  } ],
  welcomeScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2f443NhHCxAe77xbLEAurjz", "welcomeScene");
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
    var config_1 = require("../../../../common/scripts/lib/config");
    var profile_1 = require("../../../../common/scripts/lib/profile");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WelcomeScene = function(_super) {
      __extends(WelcomeScene, _super);
      function WelcomeScene() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      WelcomeScene.prototype.onLoad = function() {
        setTimeout(function() {
          null === profile_1.default.lang ? config_1.default.loadScene("private/home/loginnew/scenes/languageSelectScene", "private", null) : config_1.default.loadScene("private/home/loginnew/scenes/welcomePage", "private", null);
        }, 3500);
      };
      WelcomeScene = __decorate([ ccclass ], WelcomeScene);
      return WelcomeScene;
    }(cc.Component);
    exports.default = WelcomeScene;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/config": void 0,
    "../../../../common/scripts/lib/profile": void 0
  } ]
}, {}, [ "ageAndGender", "buttons", "cameraScene", "childGuard", "collectUserInfo", "languageButton", "languageSelect", "nameInputScene", "schoolButton", "starteffects", "welcomePage", "welcomeScene", "avatar_select", "chapterProgressBar", "countryCodesView", "editprofile", "lessonIndicator", "otp_verifier", "remove_user_popup", "secondscreen", "studentProgress", "studentProgressScene", "usage", "usercomponent", "register", "registerButton", "addSectionButton", "addSectionDialog", "currentLoggedInUser", "customEditBox", "itemButton", "landing", "nextButton", "schoolBackButton", "schoolRegistration", "sectionList", "selectionScene", "studentList", "assignHomeWork", "chapterButton", "loginButton", "rowButton", "subjectButton", "teacherChapterLessons", "teacherChapterMenuButton", "teacherCourseContent", "teacherHeaderButton", "teacherHome", "teacherLessonButton", "teacherOtpRegistration", "teacherRegistration", "teacherReportCard", "teacherReportMetrics", "teacherSignUp", "teacherStartContent", "teacherStudentButton", "teacherStudentProcessScene", "teacherStudentProgress" ]);