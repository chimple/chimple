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
  assignmentPopup: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fb2e2rrH3tCDpnAilQG3MVL", "assignmentPopup");
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
    var chapterLessons_1 = require("./chapterLessons");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var AssignmentPopup = function(_super) {
      __extends(AssignmentPopup, _super);
      function AssignmentPopup() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.text = null;
        _this.yesButton = null;
        _this.block = null;
        _this.dialog = null;
        _this.msg = null;
        return _this;
      }
      AssignmentPopup.prototype.onLoad = function() {};
      AssignmentPopup.prototype.onEnable = function() {
        this.dialog.active = true;
        this.block.active = true;
      };
      AssignmentPopup.prototype.onDisable = function() {
        this.dialog.active = false;
        this.block.active = false;
      };
      AssignmentPopup.prototype.onClickYes = function() {
        chapterLessons_1.default.showType = chapterLessons_1.ChapterLessonType.Assignments;
        config_1.default.i.pushScene("menu/start/scenes/chapterLessons", "menu");
      };
      AssignmentPopup.prototype.onClickNo = function() {
        this.dialog.active = false;
        this.block.active = false;
        this.node.active = false;
      };
      __decorate([ property(cc.Node) ], AssignmentPopup.prototype, "text", void 0);
      __decorate([ property(cc.Node) ], AssignmentPopup.prototype, "yesButton", void 0);
      __decorate([ property(cc.Node) ], AssignmentPopup.prototype, "block", void 0);
      __decorate([ property(cc.Node) ], AssignmentPopup.prototype, "dialog", void 0);
      __decorate([ property(cc.Node) ], AssignmentPopup.prototype, "msg", void 0);
      AssignmentPopup = __decorate([ ccclass ], AssignmentPopup);
      return AssignmentPopup;
    }(cc.Component);
    exports.default = AssignmentPopup;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "./chapterLessons": "chapterLessons"
  } ],
  chapterContent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "44799QSQ/dBoaNm8rQ2ydtk", "chapterContent");
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ChapterContent = function(_super) {
      __extends(ChapterContent, _super);
      function ChapterContent() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.layout = null;
        return _this;
      }
      ChapterContent.prototype.start = function() {
        var layoutComp = this.layout.getComponent(cc.Layout);
        layoutComp.updateLayout();
        this.layout.parent.width = this.layout.width;
      };
      __decorate([ property(cc.Label) ], ChapterContent.prototype, "label", void 0);
      __decorate([ property(cc.Node) ], ChapterContent.prototype, "layout", void 0);
      ChapterContent = __decorate([ ccclass ], ChapterContent);
      return ChapterContent;
    }(cc.Component);
    exports.default = ChapterContent;
    cc._RF.pop();
  }, {} ],
  chapterLessons: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0509cXbc2xOGKT4rGZRbk/1", "chapterLessons");
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
    exports.ChapterLessonType = void 0;
    var config_1 = require("../../../common/scripts/lib/config");
    var lessonButton_1 = require("./lessonButton");
    var profile_1 = require("../../../common/scripts/lib/profile");
    var util_1 = require("../../../common/scripts/util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HEADER_COLORS = {
      en: "#FFBC00",
      maths: "#42C0FF",
      hi: "#009158",
      puzzle: "#FF5500",
      "test-lit": "#FFBC00",
      "test-maths": "#42C0FF"
    };
    var ChapterLessonType;
    (function(ChapterLessonType) {
      ChapterLessonType[ChapterLessonType["Library"] = 0] = "Library";
      ChapterLessonType[ChapterLessonType["Assignments"] = 1] = "Assignments";
      ChapterLessonType[ChapterLessonType["Featured"] = 2] = "Featured";
    })(ChapterLessonType = exports.ChapterLessonType || (exports.ChapterLessonType = {}));
    var ChapterLessons = function(_super) {
      __extends(ChapterLessons, _super);
      function ChapterLessons() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lessonButtonPrefab = null;
        _this.layout = null;
        _this.label = null;
        _this.loading = null;
        _this.bgHolder = null;
        _this.header = null;
        _this.whatsappNode = null;
        _this.otpDialogNode = null;
        return _this;
      }
      ChapterLessons_1 = ChapterLessons;
      ChapterLessons.prototype.onLoad = function() {
        var _this = this;
        this.node.getChildByName("block").active = true;
        this.bgHolder.removeAllChildren();
        profile_1.User.getCurrentUser().currentBg ? this.setBackground(profile_1.User.getCurrentUser().currentBg) : this.setBackground("camp");
        var config = config_1.default.i;
        switch (ChapterLessons_1.showType) {
         case ChapterLessonType.Assignments:
          if (profile_1.User.getCurrentUser().isConnected) {
            this.label.string = "Assignments";
            config.getAssignmentLessonsTodo().forEach(function(les) {
              _this.createLessonButton(les, true);
            });
          } else this.label.string = "Connect To Class";
          break;

         case ChapterLessonType.Featured:
          this.label.string = "Featured";
          config.featuredLessons.forEach(function(les) {
            var lessonProgress = profile_1.User.getCurrentUser().lessonProgressMap.get(les.id);
            if (!lessonProgress) {
              var lesson = config_1.default.i.allLessons.get(les.id);
              if (lesson) _this.createLessonButton(lesson, true); else {
                var course = config.curriculum.get(les.course);
                course && (les.chapter = {
                  id: course.id + "_featured",
                  lessons: [],
                  name: course.name,
                  image: "",
                  course: course
                });
                _this.createLessonButton(les, true);
              }
            }
          });
          break;

         case ChapterLessonType.Library:
         default:
          this.label.string = config.chapter.name;
          config.chapter.lessons.forEach(function(lesson, index) {
            _this.createLessonButton(lesson, "reward" == lesson.chapter.course.id ? 1 == profile_1.User.getCurrentUser().unlockedRewards[util_1.REWARD_TYPES[4] + "-" + config.chapter.id + "-" + lesson.id] : 0 == index || lesson.open || profile_1.User.getCurrentUser().lessonProgressMap.has(lesson.id));
          });
        }
        this.layout.width = cc.winSize.width;
        this.layout.parent.width = cc.winSize.width;
        this.layout.parent.parent.width = cc.winSize.width;
        this.layout.getComponent(cc.Layout).updateLayout();
        this.layout.parent.height = this.layout.height;
        var color = HEADER_COLORS[config.course.id];
        color && (this.header.color = new cc.Color().fromHEX(color));
      };
      ChapterLessons.prototype.createLessonButton = function(lesson, open) {
        var lessonButton = cc.instantiate(this.lessonButtonPrefab);
        var lessonButtonComp = lessonButton.getComponent(lessonButton_1.default);
        lessonButtonComp.lesson = lesson;
        lessonButtonComp.loading = this.loading;
        lessonButtonComp.open = open;
        this.layout.addChild(lessonButton);
      };
      ChapterLessons.prototype.setBackground = function(bgprefabName) {
        var _this = this;
        cc.resources.load("backgrounds/prefabs/" + bgprefabName, function(err, sp) {
          var bgPrefabInstance = cc.instantiate(sp);
          bgPrefabInstance.y = 0;
          bgPrefabInstance.x = 0;
          !_this.bgHolder || null == bgPrefabInstance || _this.bgHolder.addChild(bgPrefabInstance);
        });
      };
      ChapterLessons.prototype.onBackClick = function() {
        config_1.default.i.popScene();
      };
      ChapterLessons.prototype.onWhatsappClick = function() {
        cc.sys.openURL("https://wa.me/919845206203?text=" + profile_1.User.getCurrentUser().id);
      };
      ChapterLessons.prototype.start = function() {
        this.node.getChildByName("block").active = false;
      };
      var ChapterLessons_1;
      ChapterLessons.showType = ChapterLessonType.Library;
      __decorate([ property(cc.Prefab) ], ChapterLessons.prototype, "lessonButtonPrefab", void 0);
      __decorate([ property(cc.Node) ], ChapterLessons.prototype, "layout", void 0);
      __decorate([ property(cc.Label) ], ChapterLessons.prototype, "label", void 0);
      __decorate([ property(cc.Node) ], ChapterLessons.prototype, "loading", void 0);
      __decorate([ property(cc.Node) ], ChapterLessons.prototype, "bgHolder", void 0);
      __decorate([ property(cc.Node) ], ChapterLessons.prototype, "header", void 0);
      __decorate([ property(cc.Node) ], ChapterLessons.prototype, "whatsappNode", void 0);
      __decorate([ property(cc.Node) ], ChapterLessons.prototype, "otpDialogNode", void 0);
      ChapterLessons = ChapterLessons_1 = __decorate([ ccclass ], ChapterLessons);
      return ChapterLessons;
    }(cc.Component);
    exports.default = ChapterLessons;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/util": void 0,
    "./lessonButton": "lessonButton"
  } ],
  chapterMenuButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0180cvk8A1LV7TLG+aOmJgN", "chapterMenuButton");
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
    var profile_1 = require("../../../common/scripts/lib/profile");
    var chapterIcon_1 = require("../../../common/scripts/chapterIcon");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var RADIUS = 54;
    var WIDTH = 4;
    var ChapterMenuButton = function(_super) {
      __extends(ChapterMenuButton, _super);
      function ChapterMenuButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.graphics = null;
        _this.open = true;
        return _this;
      }
      ChapterMenuButton.prototype.onLoad = function() {
        var _this = this;
        if (null != this.chapter) {
          var config_2 = config_1.default.i;
          var chapterIcon = cc.instantiate(this.chapterIconPrefab);
          var chapterIconComp = chapterIcon.getComponent(chapterIcon_1.default);
          chapterIconComp.chapter = this.chapter;
          chapterIconComp.open = this.open;
          this.button.node.insertChild(chapterIcon, 0);
          this.label.string = this.chapter.name;
          this.button.node.on("touchend", function(event) {
            if (event.target.getComponent(cc.Button).interactable) {
              config_2.chapter = _this.chapter;
              config_2.pushScene("menu/start/scenes/chapterLessons", "menu");
            }
          });
          this.button.interactable = this.open;
          var completedLessons = this.chapter.lessons.filter(function(les) {
            var lessonProgress = profile_1.User.getCurrentUser().lessonProgressMap.get(les.id);
            if (lessonProgress && lessonProgress.score >= 0) return true;
          }).length;
          var totalLessons = this.chapter.lessons.length;
          var endAngle = completedLessons / totalLessons * Math.PI * 2;
          this.graphics.arc(0, 0, RADIUS + WIDTH / 2, 1 * Math.PI / 2, -endAngle + 1 * Math.PI / 2);
          this.graphics.stroke();
          this.currentChapterIcon.active = profile_1.User.getCurrentUser().courseProgressMap.get(this.chapter.course.id).currentChapterId == this.chapter.id;
        }
      };
      __decorate([ property(cc.Label) ], ChapterMenuButton.prototype, "label", void 0);
      __decorate([ property(cc.Button) ], ChapterMenuButton.prototype, "button", void 0);
      __decorate([ property(cc.Graphics) ], ChapterMenuButton.prototype, "graphics", void 0);
      __decorate([ property(cc.Prefab) ], ChapterMenuButton.prototype, "chapterIconPrefab", void 0);
      __decorate([ property(cc.Node) ], ChapterMenuButton.prototype, "currentChapterIcon", void 0);
      ChapterMenuButton = __decorate([ ccclass ], ChapterMenuButton);
      return ChapterMenuButton;
    }(cc.Component);
    exports.default = ChapterMenuButton;
    cc._RF.pop();
  }, {
    "../../../common/scripts/chapterIcon": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/profile": void 0
  } ],
  character: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ac607T3kDFM0JEFGxTkBTUR", "character");
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Character = function(_super) {
      __extends(Character, _super);
      function Character() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Character = __decorate([ ccclass ], Character);
      return Character;
    }(cc.Component);
    exports.default = Character;
    cc._RF.pop();
  }, {} ],
  courseChapters: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cdf75lC/IFHCpbwumT2/QOh", "courseChapters");
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
    var profile_1 = require("../../../common/scripts/lib/profile");
    var chapterMenuButton_1 = require("./chapterMenuButton");
    var util_1 = require("../../../common/scripts/util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HEADER_COLORS = {
      en: "#FFBC00",
      maths: "#42C0FF",
      hi: "#009158",
      puzzle: "#FF5500",
      "test-lit": "#FFBC00",
      "test-maths": "#42C0FF"
    };
    var CourseChapters = function(_super) {
      __extends(CourseChapters, _super);
      function CourseChapters() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lessonButtonPrefab = null;
        _this.chaptersLayout = null;
        _this.chapterMenuButtonPrefab = null;
        _this.title = null;
        _this.loading = null;
        _this.bgHolder = null;
        _this.header = null;
        return _this;
      }
      CourseChapters.prototype.onLoad = function() {
        this.node.getChildByName("block").active = true;
        this.setBackground();
        var config = config_1.default.i;
        this.title.string = util_1.Util.i18NText(config.course.name);
        for (var _i = 0, _a = config.course.chapters; _i < _a.length; _i++) {
          var chapter = _a[_i];
          if (chapter.id == config.course.id + "_quiz") continue;
          var chapterMenuButton = cc.instantiate(this.chapterMenuButtonPrefab);
          var chapterMenuButtonComp = chapterMenuButton.getComponent(chapterMenuButton_1.default);
          chapterMenuButtonComp.chapter = chapter;
          this.chaptersLayout.addChild(chapterMenuButton);
        }
        this.chaptersLayout.width = cc.winSize.width;
        this.chaptersLayout.parent.width = cc.winSize.width;
        this.chaptersLayout.parent.parent.width = cc.winSize.width;
        this.chaptersLayout.getComponent(cc.Layout).updateLayout();
        this.chaptersLayout.parent.height = this.chaptersLayout.height;
        var color = HEADER_COLORS[config.course.id];
        color && (this.header.color = new cc.Color().fromHEX(color));
      };
      CourseChapters.prototype.start = function() {
        this.node.getChildByName("block").active = false;
      };
      CourseChapters.prototype.setBackground = function() {
        var _this = this;
        this.bgHolder.removeAllChildren();
        var bgprefabName = !profile_1.User.getCurrentUser().currentBg ? "camp" : profile_1.User.getCurrentUser().currentBg;
        cc.resources.load("backgrounds/prefabs/" + bgprefabName, function(err, sp) {
          var bgPrefabInstance = cc.instantiate(sp);
          bgPrefabInstance.y = 0;
          bgPrefabInstance.x = 0;
          _this.bgHolder.addChild(bgPrefabInstance);
        });
      };
      __decorate([ property(cc.Prefab) ], CourseChapters.prototype, "lessonButtonPrefab", void 0);
      __decorate([ property(cc.Node) ], CourseChapters.prototype, "chaptersLayout", void 0);
      __decorate([ property(cc.Prefab) ], CourseChapters.prototype, "chapterMenuButtonPrefab", void 0);
      __decorate([ property(cc.Label) ], CourseChapters.prototype, "title", void 0);
      __decorate([ property(cc.Node) ], CourseChapters.prototype, "loading", void 0);
      __decorate([ property(cc.Node) ], CourseChapters.prototype, "bgHolder", void 0);
      __decorate([ property(cc.Node) ], CourseChapters.prototype, "header", void 0);
      CourseChapters = __decorate([ ccclass ], CourseChapters);
      return CourseChapters;
    }(cc.Component);
    exports.default = CourseChapters;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/util": void 0,
    "./chapterMenuButton": "chapterMenuButton"
  } ],
  courseContent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d91c0gXhclDD6RZOzsKPeTI", "courseContent");
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
    var chapterMenuButton_1 = require("./chapterMenuButton");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CourseContent = function(_super) {
      __extends(CourseContent, _super);
      function CourseContent() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lessonButtonPrefab = null;
        _this.chaptersLayout = null;
        _this.chapterMenuButtonPrefab = null;
        return _this;
      }
      CourseContent.prototype.onLoad = function() {
        var config = config_1.default.i;
        for (var _i = 0, _a = config.course.chapters; _i < _a.length; _i++) {
          var chapter = _a[_i];
          var chapterMenuButton = cc.instantiate(this.chapterMenuButtonPrefab);
          var chapterMenuButtonComp = chapterMenuButton.getComponent(chapterMenuButton_1.default);
          chapterMenuButtonComp.chapter = chapter;
          chapterMenuButtonComp.content = this.content;
          chapterMenuButtonComp.loading = this.loading;
          this.chaptersLayout.addChild(chapterMenuButton);
        }
        this.chaptersLayout.width = cc.winSize.width;
        this.chaptersLayout.parent.width = cc.winSize.width;
        this.chaptersLayout.parent.parent.width = cc.winSize.width;
        this.chaptersLayout.getComponent(cc.Layout).updateLayout();
        this.chaptersLayout.parent.height = this.chaptersLayout.height;
      };
      __decorate([ property(cc.Prefab) ], CourseContent.prototype, "lessonButtonPrefab", void 0);
      __decorate([ property(cc.Node) ], CourseContent.prototype, "chaptersLayout", void 0);
      __decorate([ property(cc.Prefab) ], CourseContent.prototype, "chapterMenuButtonPrefab", void 0);
      CourseContent = __decorate([ ccclass ], CourseContent);
      return CourseContent;
    }(cc.Component);
    exports.default = CourseContent;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "./chapterMenuButton": "chapterMenuButton"
  } ],
  dairyrewards: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7e8edS3vYxPR5tHgI93uHjd", "dairyrewards");
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
    var config_2 = require("../../../common/scripts/lib/config");
    var rewards_1 = require("./rewards");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DairyRewards = function(_super) {
      __extends(DairyRewards, _super);
      function DairyRewards() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      DairyRewards.prototype.onLoad = function() {};
      DairyRewards.prototype.onHomeClick = function() {
        this.node.getChildByName("homeicon").getComponent(cc.Button).interactable = false;
        config_2.default.i.pushScene("menu/start/scenes/start", "menu");
      };
      DairyRewards.prototype.onStoryReadingClick = function() {};
      DairyRewards.prototype.onCharacterModificationClick = function() {
        this.node.getChildByName("characterModificationBG").getComponent(cc.Button).interactable = false;
        rewards_1.default.contentDecisionFlag = "0";
        config_2.default.i.pushScene("menu/rewards/scenes/rewards", "menu");
      };
      DairyRewards.prototype.onStickerPaintingClick = function() {
        this.node.getChildByName("stickerPaintingBG").getComponent(cc.Button).interactable = false;
        config_2.default.i.setRewardChapter("sticker");
        config_1.default.i.pushScene("menu/start/scenes/chapterLessons", "menu");
      };
      DairyRewards.prototype.onFunGameActivityClick = function() {
        this.node.getChildByName("funGameActivityBG").getComponent(cc.Button).interactable = false;
        config_2.default.i.setRewardChapter("platformer");
        config_1.default.i.pushScene("menu/start/scenes/chapterLessons", "menu");
      };
      DairyRewards.prototype.onBackgroundCollectionClick = function() {
        this.node.getChildByName("backgroundCollectionBG").getComponent(cc.Button).interactable = false;
        rewards_1.default.contentDecisionFlag = "1";
        config_2.default.i.pushScene("menu/rewards/scenes/rewards", "menu");
      };
      DairyRewards.prototype.onBadgesCollectionClick = function() {
        this.node.getChildByName("badgesCollectionBG").getComponent(cc.Button).interactable = false;
        rewards_1.default.contentDecisionFlag = "2";
        config_2.default.i.pushScene("menu/rewards/scenes/rewards", "menu");
      };
      DairyRewards = __decorate([ ccclass ], DairyRewards);
      return DairyRewards;
    }(cc.Component);
    exports.default = DairyRewards;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "./rewards": "rewards"
  } ],
  drawer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1c9d9TGdjxC9JGBtPPplkAO", "drawer");
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
    var profile_1 = require("../../../common/scripts/lib/profile");
    var config_1 = require("../../../common/scripts/lib/config");
    var util_1 = require("../../../common/scripts/util");
    var headerButton_1 = require("../../../common/scripts/headerButton");
    var header_1 = require("../../../common/scripts/header");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DRAWER_ICON_COLORS = {
      en: "#FFBC00",
      maths: "#42C0FF",
      hi: "#009158",
      kn: "#BD1F32",
      puzzle: "#FF5500",
      "test-lit": "#FFBC00",
      "test-maths": "#42C0FF"
    };
    var Drawer = function(_super) {
      __extends(Drawer, _super);
      function Drawer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.courseLayout = null;
        _this.drawerButtonPrefab = null;
        _this.block = null;
        _this.left = null;
        return _this;
      }
      Drawer.prototype.onLoad = function() {
        var _this = this;
        var config = config_1.default.i;
        this.left.x = -cc.winSize.width / 2;
        profile_1.User.getCurrentUser().courseProgressMap.forEach(function(val, courseId) {
          var drawerButton = cc.instantiate(_this.drawerButtonPrefab);
          var drawerButtonComp = drawerButton.getComponent(headerButton_1.default);
          var course = config.curriculum.get(courseId);
          if (config.course.id != course.id) {
            _this.courseLayout.addChild(drawerButton);
            drawerButtonComp.label.string = util_1.Util.i18NText(course.name);
          }
          var color = DRAWER_ICON_COLORS[courseId];
          color && (drawerButtonComp.selected.node.color = new cc.Color().fromHEX(color));
          util_1.Util.load(courseId + "/course/res/icons/" + courseId + ".png", function(err, texture) {
            drawerButtonComp.sprite.spriteFrame = err ? null : new cc.SpriteFrame(texture);
          });
          drawerButtonComp.button.node.on("touchend", function(event) {
            if (event.target.getComponent(cc.Button).enabled) if (config.course.id == course.id) config.pushScene("menu/start/scenes/courseChapters", "menu"); else {
              config.course = course;
              config_1.default.loadScene("menu/start/scenes/start", "menu");
            }
          });
          !header_1.default.homeSelected && config.course && config.course.id == course.id && _this.selectHeaderButton(drawerButtonComp);
        });
        this.node.width = cc.winSize.width;
        var spacing = Math.max(0, (this.courseLayout.width - this.courseLayout.childrenCount * this.courseLayout.children[0].width) / (this.courseLayout.childrenCount + 1));
        this.courseLayout.getComponent(cc.Layout).spacingX = spacing;
        this.courseLayout.getComponent(cc.Layout).paddingLeft = spacing;
        this.courseLayout.getComponent(cc.Layout).paddingRight = spacing;
      };
      Drawer.prototype.selectHeaderButton = function(newButton) {
        if (null != this.selectedHeaderButton) {
          this.selectedHeaderButton.selected.node.active = false;
          this.selectedHeaderButton.button.enabled = true;
        }
        newButton.selected.node.active = true;
        newButton.button.enabled = false;
        this.selectedHeaderButton = newButton;
      };
      Drawer.prototype.onEnable = function() {
        var _this = this;
        this.block.active = true;
        this.block.on("touchend", function() {
          _this.closeDrawer();
        });
        new cc.Tween().target(this.left).to(.5, {
          x: -cc.winSize.width / 2 + 320
        }, {
          progress: null,
          easing: "cubicInOut"
        }).start();
      };
      Drawer.prototype.closeDrawer = function() {
        var _this = this;
        new cc.Tween().target(this.left).to(.5, {
          x: -cc.winSize.width / 2
        }, {
          progress: null,
          easing: "cubicInOut"
        }).call(function() {
          _this.node.active = false;
        }).start();
      };
      __decorate([ property(cc.Node) ], Drawer.prototype, "courseLayout", void 0);
      __decorate([ property(cc.Prefab) ], Drawer.prototype, "drawerButtonPrefab", void 0);
      __decorate([ property(cc.Node) ], Drawer.prototype, "block", void 0);
      __decorate([ property(cc.Node) ], Drawer.prototype, "left", void 0);
      Drawer = __decorate([ ccclass ], Drawer);
      return Drawer;
    }(cc.Component);
    exports.default = Drawer;
    cc._RF.pop();
  }, {
    "../../../common/scripts/header": void 0,
    "../../../common/scripts/headerButton": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/util": void 0
  } ],
  home: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e8ad40c/lZIVay1x6a995wv", "home");
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
    var profile_1 = require("../../../common/scripts/lib/profile");
    var util_1 = require("../../../common/scripts/util");
    var util_logger_1 = require("../../../common/scripts/util-logger");
    var balloon_1 = require("../../../common/scripts/balloon");
    var constants_1 = require("../../../common/scripts/lib/constants");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Home = function(_super) {
      __extends(Home, _super);
      function Home() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.nestPrefab = null;
        _this.balloons = null;
        _this.balloonPrefab = null;
        _this.loadingPrefab = null;
        _this.logo = null;
        _this.nest = null;
        _this.bgMusic = null;
        return _this;
      }
      Home.prototype.onLoad = function() {
        var _this = this;
        var config = config_1.default.getInstance();
        util_logger_1.default.initPluginFirebase();
        cc.sys.isNative && jsb.fileUtils.setSearchPaths([ jsb.fileUtils.getWritablePath() + "subpackages", jsb.fileUtils.getWritablePath() + "HotUpdateSearchPaths", "@assets/subpackages/", "@assets/" ]);
        var log = Object.assign({});
        log["" + constants_1.LOG_TYPE] = constants_1.APP_START;
        util_logger_1.default.logEvent(log);
        util_1.Util.playSfx(this.bgMusic, true, true);
        var logoY = this.logo.y;
        new cc.Tween().target(this.logo).set({
          y: cc.winSize.height
        }).to(1, {
          y: logoY
        }, {
          progress: null,
          easing: "elasticOut"
        }).start();
        var courseNames = [ "en", "en-maths" ];
        courseNames.forEach(function(type, i, arr) {
          var litNode = cc.instantiate(_this.balloonPrefab);
          var lit = litNode.getComponent(balloon_1.default);
          lit.chimp = _this.nest.getChildByName("chimp");
          lit.type = balloon_1.BalloonType.Type;
          lit.game = type;
          lit.onClickCallback = function() {
            var nest = _this.node.getChildByName("nest");
            if (null != nest) {
              var home = nest.getChildByName("home");
              if (null != home) {
                var homeButton = home.getComponent(cc.Button);
                null != homeButton && (homeButton.interactable = false);
              }
            }
            config.pushScene("menu/map/scene/map" + profile_1.default.lastWorld.toString(), "menu");
          };
          litNode.scale = .8;
          if (arr.length > 2) {
            var layout = _this.balloons.getComponent(cc.Layout);
            null != layout && (layout.spacingX = 50);
          }
          var tempNode = new cc.Node();
          tempNode.width = .8 * litNode.width;
          tempNode.addChild(litNode);
          _this.balloons.addChild(tempNode);
          new cc.Tween().target(litNode).set({
            y: cc.winSize.height
          }).delay(1).to(1, {
            y: 0
          }, {
            progress: null,
            easing: "elasticOut"
          }).start();
        });
        var loading = cc.director.getScene().getChildByName("loading");
        if (null == loading) {
          var newLoading = cc.instantiate(this.loadingPrefab);
          newLoading.zIndex = 3;
          cc.game.addPersistRootNode(newLoading);
          newLoading.active = false;
        } else loading.active = false;
      };
      Home.prototype.nextFlow = function() {};
      Home.prototype.onInventoryButtonClicked = function() {
        config_1.default.getInstance().pushScene("rewards");
      };
      Home.prototype.onDestroy = function() {
        cc.audioEngine.stopMusic();
      };
      __decorate([ property(cc.Prefab) ], Home.prototype, "nestPrefab", void 0);
      __decorate([ property(cc.Node) ], Home.prototype, "balloons", void 0);
      __decorate([ property(cc.Prefab) ], Home.prototype, "balloonPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Home.prototype, "loadingPrefab", void 0);
      __decorate([ property(cc.Node) ], Home.prototype, "logo", void 0);
      __decorate([ property(cc.Node) ], Home.prototype, "nest", void 0);
      __decorate([ property(cc.AudioClip) ], Home.prototype, "bgMusic", void 0);
      Home = __decorate([ ccclass ], Home);
      return Home;
    }(cc.Component);
    exports.default = Home;
    cc._RF.pop();
  }, {
    "../../../common/scripts/balloon": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/constants": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/util": void 0,
    "../../../common/scripts/util-logger": void 0
  } ],
  hotUpdate: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1eddd6WqopBsqESK/HdMEPs", "hotUpdate");
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
    exports.PROJECT_MANIFEST = exports.UpdateEvent = void 0;
    var util_1 = require("../../../common/scripts/util");
    var util_logger_1 = require("../../../common/scripts/util-logger");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var UpdateConfig = function() {
      function UpdateConfig() {
        this.storagePath = null;
        this.manifestUrl = null;
      }
      return UpdateConfig;
    }();
    var UpdateEvent;
    (function(UpdateEvent) {
      UpdateEvent[UpdateEvent["Checking"] = 0] = "Checking";
      UpdateEvent[UpdateEvent["Updating"] = 1] = "Updating";
      UpdateEvent[UpdateEvent["UpdateDone"] = 2] = "UpdateDone";
      UpdateEvent[UpdateEvent["Done"] = 3] = "Done";
      UpdateEvent[UpdateEvent["Error"] = 4] = "Error";
    })(UpdateEvent = exports.UpdateEvent || (exports.UpdateEvent = {}));
    exports.PROJECT_MANIFEST = "project.manifest";
    var HotUpdate = function(_super) {
      __extends(HotUpdate, _super);
      function HotUpdate() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.status = null;
        _this.fileProgress = null;
        _this.manifest = null;
        return _this;
      }
      HotUpdate_1 = HotUpdate;
      HotUpdate.prototype.oneByOne = function(updates, index, callbackOnEnd) {
        var _this = this;
        HotUpdate_1.doHotUpdate(updates[index].storagePath, updates[index].manifestUrl, null, function(event, status, percent) {
          _this.status.string = status;
          _this.fileProgress.progress = percent;
          if (event == UpdateEvent.Done || event == UpdateEvent.UpdateDone || event == UpdateEvent.Error) {
            callbackOnEnd(index, event == UpdateEvent.UpdateDone && "HotUpdateSearchPaths" == updates[index].storagePath);
            ++index < updates.length && _this.oneByOne(updates, index, callbackOnEnd);
          }
        });
      };
      HotUpdate.prototype.onLoad = function() {
        util_logger_1.default.initPluginFirebase();
        if (!cc.sys.isNative) {
          cc.director.loadScene("home");
          return;
        }
        var updates = [ {
          storagePath: "HotUpdateSearchPaths",
          manifestUrl: this.manifest.nativeUrl
        } ];
        var subpackages = util_1.Util.getSubpackages().map(function(val) {
          return {
            storagePath: subpackages + "/" + val,
            manifestUrl: val + "/project.manifest"
          };
        });
        var doRestart = false;
        this.oneByOne(updates, 0, function(index, restart) {
          doRestart = doRestart || restart;
          if (index == updates.length - 1) if (doRestart) {
            cc.audioEngine.stopAll();
            cc.game.restart();
          } else cc.director.loadScene("home");
        });
      };
      HotUpdate.doHotUpdate = function(storagePath, manifestUrl, manifestJson, callback) {
        var fullStoragePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + storagePath;
        var am = new jsb.AssetsManager("", fullStoragePath, function(versionA, versionB) {
          return Number(versionA) - Number(versionB);
        });
        am.setVerifyCallback(function(path, asset) {
          var compressed = asset.compressed;
          var expectedMD5 = asset.md5;
          var relativePath = asset.path;
          var size = asset.size;
          if (compressed) {
            callback(UpdateEvent.Checking, "Verification passed : " + relativePath, 0);
            return true;
          }
          callback(UpdateEvent.Checking, "Verification passed : " + relativePath + " (" + expectedMD5 + ")", 0);
          return true;
        });
        callback(UpdateEvent.Checking, "Hot update is ready, please check or directly update", 0);
        if (cc.sys.os === cc.sys.OS_ANDROID) {
          am.setMaxConcurrentTask(2);
          callback(UpdateEvent.Checking, "Max concurrent tasks count have been limited to 2", 0);
        }
        callback(UpdateEvent.Checking, "Checking or updating ...", 0);
        if (am.getState() === jsb.AssetsManager.State.UNINITED) if (manifestUrl) {
          var url = manifestUrl;
          cc.loader.md5Pipe && (url = cc.loader.md5Pipe.transformURL(url));
          am.loadLocalManifest(url);
        } else {
          var manifest = new jsb.Manifest(manifestJson, fullStoragePath);
          am.loadLocalManifest(manifest, fullStoragePath);
        }
        am.getLocalManifest() && am.getLocalManifest().isLoaded() || callback(UpdateEvent.Error, "Failed to load local manifest ...", 0);
        am.setEventCallback(function(event) {
          switch (event.getEventCode()) {
           case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
            am.setEventCallback(null);
            callback(UpdateEvent.Error, "No local manifest file found, hot update skipped", 0);
            break;

           case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
           case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
            am.setEventCallback(null);
            callback(UpdateEvent.Error, "Fail to download manifest file, hot update skipped", 0);
            break;

           case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
            am.setEventCallback(null);
            callback(UpdateEvent.Done, "Already up to date with the latest remote version", 0);
            break;

           case jsb.EventAssetsManager.NEW_VERSION_FOUND:
            callback(UpdateEvent.Checking, "New version found, please try to update", 0);
            am.setEventCallback(null);
            if (am) {
              am.setEventCallback(function(event) {
                switch (event.getEventCode()) {
                 case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                  am.setEventCallback(null);
                  callback(UpdateEvent.Error, "No local manifest file found, hot update skipped", 0);
                  break;

                 case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                  var msg = event.getMessage();
                  callback(UpdateEvent.Updating, msg, event.getPercentByFile());
                  break;

                 case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                 case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                  am.setEventCallback(null);
                  callback(UpdateEvent.Error, "No local manifest file found, hot update skipped", 0);
                  break;

                 case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                  am.setEventCallback(null);
                  callback(UpdateEvent.Done, "Already up to date with the latest remote version", 0);
                  break;

                 case jsb.EventAssetsManager.UPDATE_FINISHED:
                  am.setEventCallback(null);
                  callback(UpdateEvent.UpdateDone, "Update finished. " + event.getMessage(), 1);
                  break;

                 case jsb.EventAssetsManager.UPDATE_FAILED:
                  am.setEventCallback(null);
                  callback(UpdateEvent.Error, "Update failed. " + event.getMessage(), 0);
                  break;

                 case jsb.EventAssetsManager.ERROR_UPDATING:
                  am.setEventCallback(null);
                  callback(UpdateEvent.Error, "Asset update error: " + event.getAssetId() + ", " + event.getMessage(), 0);
                  break;

                 case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                  am.setEventCallback(null);
                  callback(UpdateEvent.Error, event.getMessage(), 0);
                }
              });
              am.update();
            }
            break;

           default:
            return;
          }
        });
        am.checkUpdate();
      };
      HotUpdate.prototype.cancel = function() {
        cc.director.loadScene("home");
      };
      var HotUpdate_1;
      __decorate([ property(cc.Label) ], HotUpdate.prototype, "status", void 0);
      __decorate([ property(cc.ProgressBar) ], HotUpdate.prototype, "fileProgress", void 0);
      __decorate([ property({
        type: cc.Asset
      }) ], HotUpdate.prototype, "manifest", void 0);
      HotUpdate = HotUpdate_1 = __decorate([ ccclass ], HotUpdate);
      return HotUpdate;
    }(cc.Component);
    exports.default = HotUpdate;
    cc._RF.pop();
  }, {
    "../../../common/scripts/util": void 0,
    "../../../common/scripts/util-logger": void 0
  } ],
  inventory: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9525c5LUTFDcpDN2ZyfajcH", "inventory");
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
    var profile_1 = require("../../../common/scripts/lib/profile");
    var util_1 = require("../../../common/scripts/util");
    var item_1 = require("./item");
    var config_1 = require("../../../common/scripts/lib/config");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Inventory = function(_super) {
      __extends(Inventory, _super);
      function Inventory() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.itemPrefab = null;
        _this.layoutNode = null;
        _this.doneButtonNode = null;
        _this.bgNode = null;
        _this.crossButtonNode = null;
        _this.scrollViewNode = null;
        _this.scrollValue = 100;
        _this.individualLayoutNode = null;
        _this.currentScrollValue = 1e3;
        _this.lastSelectedButton = 0;
        _this.characterName = "bear";
        _this.normalSprite = null;
        return _this;
      }
      Inventory_1 = Inventory;
      Inventory.prototype.onLoad = function() {
        var _this = this;
        try {
          this.characterName = profile_1.User.getCurrentUser().currentCharacter;
        } catch (err) {
          console.log("error reading character name");
        }
        this.buildIndividualItems(util_1.INVENTORY_DATA[0]);
        util_1.Util.loadFriend(function(friendNode) {
          friendNode.name = profile_1.User.getCurrentUser().currentCharacter + "_dragon";
          friendNode.x = -270;
          friendNode.y = -212;
          console.log(_this.node, " hello ");
          _this.node.addChild(friendNode);
          util_1.Util.loadAccessoriesAndEquipAcc(friendNode.children[1], friendNode);
        });
        if (0 === profile_1.default.getItem(profile_1.IN_LOGIN_FLOW)) this.doneButtonNode.active = false; else {
          null != this.crossButtonNode && (this.crossButtonNode.active = false);
          this.bgNode.active = true;
        }
      };
      Inventory.prototype.onDoneButtonClick = function(event) {
        this.doneButtonNode.getComponent(cc.Button).interactable = false;
        util_1.Util.preloadStartScene(this.node, cc.director.getScene().getChildByName("Canvas").getChildByName("loading"));
        profile_1.User.getCurrentUser().openOnlyTheSelectedRewards("chimp");
        profile_1.default.setItem(profile_1.IN_LOGIN_FLOW, 0);
      };
      Inventory.prototype.onInventoryButtonClick = function(event) {
        var nodeName = "acc" + this.lastSelectedButton.toString();
        if (this.lastSelectedButton > -1) {
          var color_1 = cc.Color.BLACK;
          this.node.getChildByName("acc_layout").getChildByName(nodeName).getChildByName(this.lastSelectedButton.toString()).getChildByName("Background").color = color_1.fromHEX("#282C65");
          this.node.getChildByName("acc_layout").getChildByName(nodeName).getChildByName(this.lastSelectedButton.toString()).getChildByName("icon").color = color_1.fromHEX("#FFFFFF");
        }
        nodeName = "acc" + event.currentTarget.name;
        var color = cc.Color.BLACK;
        this.node.getChildByName("acc_layout").getChildByName(nodeName).getChildByName(event.currentTarget.name).getChildByName("Background").color = color.fromHEX("#FFFFFF");
        this.node.getChildByName("acc_layout").getChildByName(nodeName).getChildByName(event.currentTarget.name).getChildByName("icon").color = color.fromHEX("#282C65FFFFFF");
        this.buildIndividualItems(util_1.INVENTORY_DATA[parseInt(event.currentTarget.name)]);
        this.lastSelectedButton = parseInt(event.currentTarget.name);
      };
      Inventory.prototype.scrollRight = function() {
        var scrollView = this.node.getChildByName("scrollview").getComponent(cc.ScrollView);
        this.currentScrollValue < scrollView.getMaxScrollOffset().x + 1e3 && (this.currentScrollValue += this.scrollValue);
        var posInView = this.node.convertToNodeSpace(cc.v2(this.currentScrollValue, 0));
        scrollView.scrollToOffset(new cc.Vec2(Math.abs(posInView.x) - cc.winSize.width / 2, 0), 2);
      };
      Inventory.prototype.scrollLeft = function() {
        this.currentScrollValue > 1e3 && (this.currentScrollValue -= this.scrollValue);
        var posInView = this.node.convertToNodeSpace(cc.v2(this.currentScrollValue, 0));
        var scrollView = this.node.getChildByName("scrollview").getComponent(cc.ScrollView);
        scrollView.scrollToOffset(new cc.Vec2(Math.abs(posInView.x) - cc.winSize.width / 2, 0), 2);
      };
      Inventory.prototype.buildIndividualItems = function(items) {
        var _this = this;
        this.layoutNode.removeAllChildren();
        items.forEach(function(element, index) {
          var item = cc.instantiate(_this.itemPrefab);
          item.name = element;
          item.getChildByName("New Button").getChildByName("Background").getComponent(cc.Sprite).spriteFrame = _this.node.getChildByName("button_textures").getChildByName(element.split("-")[0]).getChildByName(element.split("-")[1]).getComponent(cc.Sprite).spriteFrame;
          item.getChildByName("New Button").height = _this.node.getChildByName("button_textures").getChildByName(element.split("-")[0]).getChildByName(element.split("-")[1]).height;
          item.getChildByName("New Button").width = _this.node.getChildByName("button_textures").getChildByName(element.split("-")[0]).getChildByName(element.split("-")[1]).width;
          var rewardItemName = profile_1.User.getCurrentUser().unlockedRewards[util_1.REWARD_TYPES[3] + "-" + _this.characterName + "-" + element];
          var itemComp = item.getComponent(item_1.default);
          if (!rewardItemName) {
            item.getChildByName("New Button").getChildByName("lock_icon").active = true;
            itemComp.isLocked = true;
          }
          itemComp.onClickCallback = function(name, isLocked) {
            var _a = name.split("-"), slot_name = _a[0], armature_name = _a[1];
            if (isLocked) {
              profile_1.User.getCurrentUser().currentReward = [ util_1.REWARD_TYPES[3], _this.characterName, slot_name, armature_name ];
              config_1.default.i.popAllScenes();
              config_1.default.i.pushScene("menu/start/scenes/start", "menu", null, true);
            } else {
              Inventory_1.updateCharacter(_this.node.getChildByName(_this.characterName + "_dragon").children[0].getComponent(dragonBones.ArmatureDisplay), util_1.INVENTORY_ANIMATIONS[_this.lastSelectedButton], armature_name, slot_name);
              var characterAndSlot = _this.characterName.concat("-", slot_name);
              profile_1.User.getCurrentUser().updateInventory(characterAndSlot, armature_name);
            }
          };
          item.getChildByName("New Button").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = element;
          item.getChildByName("New Button").name = element;
          _this.layoutNode.addChild(item);
        });
        this.scrollViewNode.scrollToTop();
      };
      Inventory.updateCharacter = function(db, animationName, armature_name, slot_name) {
        var newHatName = armature_name;
        var factory = dragonBones.CCFactory.getInstance();
        var _armature = db.armature();
        _armature.getSlot(slot_name).childArmature = factory.buildArmature(newHatName);
        db.playAnimation(animationName, 1);
        "left_shoe" === slot_name && (_armature.getSlot("right_shoe").childArmature = factory.buildArmature(newHatName));
      };
      Inventory.prototype.start = function() {};
      var Inventory_1;
      __decorate([ property(cc.Prefab) ], Inventory.prototype, "itemPrefab", void 0);
      __decorate([ property(cc.Node) ], Inventory.prototype, "layoutNode", void 0);
      __decorate([ property(cc.Node) ], Inventory.prototype, "doneButtonNode", void 0);
      __decorate([ property(cc.Node) ], Inventory.prototype, "bgNode", void 0);
      __decorate([ property(cc.Node) ], Inventory.prototype, "crossButtonNode", void 0);
      __decorate([ property(cc.ScrollView) ], Inventory.prototype, "scrollViewNode", void 0);
      __decorate([ property() ], Inventory.prototype, "scrollValue", void 0);
      __decorate([ property(cc.Node) ], Inventory.prototype, "individualLayoutNode", void 0);
      Inventory = Inventory_1 = __decorate([ ccclass ], Inventory);
      return Inventory;
    }(cc.Component);
    exports.default = Inventory;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/util": void 0,
    "./item": "item"
  } ],
  item: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e9c76rOfsRMNruLTUm9odcG", "item");
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Item = function(_super) {
      __extends(Item, _super);
      function Item() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.isLocked = false;
        _this.lockIconNode = null;
        _this.onClickCallback = null;
        return _this;
      }
      Item.prototype.onLoad = function() {};
      Item.prototype.onItemClick = function(event) {
        console.log(event.currentTarget.name);
        this.onClickCallback(event.currentTarget.name, this.isLocked);
      };
      Item.prototype.start = function() {};
      __decorate([ property(cc.Node) ], Item.prototype, "lockIconNode", void 0);
      Item = __decorate([ ccclass ], Item);
      return Item;
    }(cc.Component);
    exports.default = Item;
    cc._RF.pop();
  }, {} ],
  leaderboardProfile: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1289fGnh71OXIkxHw8YC6zL", "leaderboardProfile");
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
    var ServiceConfig_1 = require("../../../common/scripts/services/ServiceConfig");
    var util_1 = require("../../../common/scripts/util");
    var cameraScene_1 = require("../../../private/home/loginnew/scripts/cameraScene");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LeaderboardProfile = function(_super) {
      __extends(LeaderboardProfile, _super);
      function LeaderboardProfile() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.userPrefab = null;
        _this.loadingPrefab = null;
        _this.leaderboardlayout = null;
        _this.firstStudent = null;
        _this.secondStudent = null;
        _this.thirdStudent = null;
        _this.userNode = null;
        _this.weeklyRank = null;
        _this.schoolName = null;
        _this.className = null;
        _this.allTimeRank = null;
        _this.otpDialog = null;
        _this.connectButton = null;
        _this.loading = null;
        _this.leaderboardJson = null;
        return _this;
      }
      LeaderboardProfile.prototype.onLoad = function() {
        this.createLoading();
        this.showLeaderoard();
      };
      LeaderboardProfile.prototype.showLeaderoard = function() {
        return __awaiter(this, void 0, void 0, function() {
          var _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              this.showLoading();
              this.user = profile_1.User.getCurrentUser();
              this.loadUserImageOrAvatar(this.user, this.userNode);
              if (this.user.isConnected) {
                this.connectButton.interactable = false;
                this.connectButton.getComponentInChildren(cc.Label).string = "Connected";
                this.connectButton.node.color = new cc.Color(240, 88, 34);
              }
              this.user.schoolName && (this.schoolName.getComponent(cc.Label).string = util_1.Util.i18NText("School") + " : " + this.user.schoolName);
              this.user.sectionName && (this.className.getComponent(cc.Label).string = util_1.Util.i18NText("Class  :") + " " + this.user.sectionName);
              this.userNode.getComponentInChildren(cc.Label).string = this.user.name;
              _a = this;
              return [ 4, ServiceConfig_1.ServiceConfig.getI().handle.getLeaderboard(this.user.id, this.user.sectionId, this.user.schoolId) ];

             case 1:
              _a.leaderboardJson = _b.sent();
              this.weeklyIndex = this.leaderboardJson.weekly.map(function(v) {
                return v.userId;
              }).indexOf(this.user.id);
              this.allTimeIndex = this.leaderboardJson.allTime.map(function(v) {
                return v.userId;
              }).indexOf(this.user.id);
              this.weeklyIndex >= 0 && (this.weeklyRank.getComponent(cc.Label).string = (null === util_1.Util || void 0 === util_1.Util ? void 0 : util_1.Util.i18NText("This week rank")) + " : " + (this.weeklyIndex + 1).toString() + " ");
              this.allTimeIndex >= 0 && (this.allTimeRank.getComponent(cc.Label).string = util_1.Util.i18NText("All time rank") + " : " + (this.allTimeIndex + 1).toString() + " ");
              console.log("this leaderboard", this.leaderboardJson);
              this.loadUi(true);
              return [ 2 ];
            }
          });
        });
      };
      LeaderboardProfile.prototype.loadUi = function(thisweek) {
        this.hideLoading();
        this.leaderboardlayout.removeAllChildren();
        var studentList = thisweek ? this.leaderboardJson.weekly : this.leaderboardJson.allTime;
        var currentUserColor = new cc.Color(255, 85, 0);
        var availableWidth = cc.winSize.width - this.weeklyRank.parent.width;
        var student = cc.instantiate(this.userPrefab);
        var noOfColums = 3 * student.width <= availableWidth ? 3 : 2 * student.width <= availableWidth ? 2 : 1;
        var studentWidth = availableWidth / noOfColums;
        for (var i = 0; i < studentList.length; i++) {
          var isCurrentUser = thisweek ? this.weeklyIndex === i : this.allTimeIndex === i;
          var totalScore = studentList[i].lessonsPlayed.toString();
          var maskedName = studentList[i].name;
          if (isCurrentUser) this.userNode.getChildByName("starscore").getComponentInChildren(cc.Label).string = totalScore; else {
            var mask = maskedName.substring(1, maskedName.length - 1).replace(/./gi, "*") || "***";
            maskedName = maskedName[0] + mask.substring(0, 4) + maskedName[maskedName.length - 1];
          }
          maskedName.length > 6 && (maskedName = maskedName.substring(0, 5) + "..");
          if (0 === i) {
            this.firstStudent.getChildByName("name").getComponent(cc.Label).string = maskedName;
            isCurrentUser && (this.firstStudent.getChildByName("name").color = currentUserColor);
            this.firstStudent.getChildByName("starscore").getComponentInChildren(cc.Label).string = totalScore;
          } else if (1 === i) {
            this.secondStudent.getChildByName("name").getComponent(cc.Label).string = maskedName;
            isCurrentUser && (this.secondStudent.getChildByName("name").color = currentUserColor);
            this.secondStudent.getChildByName("starscore").getComponentInChildren(cc.Label).string = totalScore;
          } else if (2 === i) {
            this.thirdStudent.getChildByName("name").getComponent(cc.Label).string = maskedName;
            isCurrentUser && (this.thirdStudent.getChildByName("name").color = currentUserColor);
            this.thirdStudent.getChildByName("starscore").getComponentInChildren(cc.Label).string = totalScore;
          } else {
            var student_1 = cc.instantiate(this.userPrefab);
            var labelComponent = student_1.getChildByName("user").getComponentInChildren(cc.Label);
            student_1.getChildByName("name").getComponent(cc.Label).string = maskedName;
            isCurrentUser && (student_1.getChildByName("name").color = currentUserColor);
            student_1.width = studentWidth;
            this.loadRandomAvatar(student_1.getChildByName("user"), isCurrentUser);
            student_1.getChildByName("starscore").getComponentInChildren(cc.Label).string = totalScore;
            labelComponent.string = (i + 1).toString();
            this.leaderboardlayout.addChild(student_1);
          }
        }
        this.leaderboardlayout.width = availableWidth;
        this.leaderboardlayout.parent.width = availableWidth;
        this.leaderboardlayout.parent.parent.width = availableWidth;
        this.leaderboardlayout.getComponent(cc.Layout).updateLayout();
        this.leaderboardlayout.parent.height = this.leaderboardlayout.height;
      };
      LeaderboardProfile.prototype.tabNavigator = function(event, value) {
        event.target.parent.children.forEach(function(e) {
          return e.getChildByName("Active Tab").active = false;
        });
        event.target.getChildByName("Active Tab").active = true;
        this.loadUi("weekly" === value);
      };
      LeaderboardProfile.prototype.createLoading = function() {
        this.loading = cc.instantiate(this.loadingPrefab);
        this.loading.zIndex = 3;
        this.node.addChild(this.loading);
        this.loading.active = false;
      };
      LeaderboardProfile.prototype.showLoading = function() {
        this.loading.active = true;
      };
      LeaderboardProfile.prototype.hideLoading = function() {
        this.loading.active = false;
      };
      LeaderboardProfile.prototype.onHomeClick = function() {
        this.node.getChildByName("homebutton").getComponent(cc.Button).interactable = false;
        config_1.default.i.pushScene("menu/start/scenes/start", "menu");
      };
      LeaderboardProfile.prototype.onSignoutClick = function() {
        this.node.getChildByName("signout").getComponent(cc.Button).interactable = false;
        config_1.default.loadScene("private/home/loginnew/scenes/welcomePage", "private", null);
      };
      LeaderboardProfile.prototype.onConnectClick = function() {
        this.otpDialog.active = true;
      };
      LeaderboardProfile.prototype.loadRandomAvatar = function(student, isCurrentUser) {
        void 0 === isCurrentUser && (isCurrentUser = false);
        if (isCurrentUser) {
          this.loadUserImageOrAvatar(profile_1.User.getCurrentUser(), student);
          return;
        }
        var randomInt = Math.floor(Math.random() * (cameraScene_1.AVATARS.length - 1 - 0 + 1) + 0);
        cc.resources.load("avatars/" + cameraScene_1.AVATARS[randomInt], function(err, sp) {
          student.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
        });
      };
      LeaderboardProfile.prototype.loadUserImageOrAvatar = function(user, userNode) {
        user.imgPath && "" != user.imgPath ? cc.loader.load(user.imgPath, function(err, texture) {
          if (!err) {
            var temp = new cc.SpriteFrame(texture);
            userNode.getComponent(cc.Sprite).spriteFrame = temp;
          }
        }) : cc.resources.load("avatars/" + user.avatarImage, function(err, sp) {
          userNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
        });
      };
      __decorate([ property(cc.Prefab) ], LeaderboardProfile.prototype, "userPrefab", void 0);
      __decorate([ property(cc.Prefab) ], LeaderboardProfile.prototype, "loadingPrefab", void 0);
      __decorate([ property(cc.Node) ], LeaderboardProfile.prototype, "leaderboardlayout", void 0);
      __decorate([ property(cc.Node) ], LeaderboardProfile.prototype, "firstStudent", void 0);
      __decorate([ property(cc.Node) ], LeaderboardProfile.prototype, "secondStudent", void 0);
      __decorate([ property(cc.Node) ], LeaderboardProfile.prototype, "thirdStudent", void 0);
      __decorate([ property(cc.Node) ], LeaderboardProfile.prototype, "userNode", void 0);
      __decorate([ property(cc.Node) ], LeaderboardProfile.prototype, "weeklyRank", void 0);
      __decorate([ property(cc.Node) ], LeaderboardProfile.prototype, "schoolName", void 0);
      __decorate([ property(cc.Node) ], LeaderboardProfile.prototype, "className", void 0);
      __decorate([ property(cc.Node) ], LeaderboardProfile.prototype, "allTimeRank", void 0);
      __decorate([ property(cc.Node) ], LeaderboardProfile.prototype, "otpDialog", void 0);
      __decorate([ property(cc.Button) ], LeaderboardProfile.prototype, "connectButton", void 0);
      LeaderboardProfile = __decorate([ ccclass ], LeaderboardProfile);
      return LeaderboardProfile;
    }(cc.Component);
    exports.default = LeaderboardProfile;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/services/ServiceConfig": void 0,
    "../../../common/scripts/util": void 0,
    "../../../private/home/loginnew/scripts/cameraScene": void 0
  } ],
  lessonButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "65142Zn2nJMzL9T1AFOOeug", "lessonButton");
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
    var lessonIcon_1 = require("../../../common/scripts/lessonIcon");
    var config_1 = require("../../../common/scripts/lib/config");
    var profile_1 = require("../../../common/scripts/lib/profile");
    var util_1 = require("../../../common/scripts/util");
    var constants_1 = require("../../../common/scripts/lib/constants");
    var preTestDialog_1 = require("./preTestDialog");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LessonButton = function(_super) {
      __extends(LessonButton, _super);
      function LessonButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.preTestPopup = null;
        _this.lockIcon = null;
        _this.open = false;
        return _this;
      }
      LessonButton.prototype.onLoad = function() {
        var _this = this;
        var config = config_1.default.i;
        if (null != this.lesson && null != this.lesson.chapter.course && null != this.lesson) {
          var lessonIcon = cc.instantiate(this.lessonIconPrefab);
          var lessonIconComp = lessonIcon.getComponent(lessonIcon_1.default);
          lessonIconComp.lesson = this.lesson;
          lessonIconComp.open = this.open;
          this.button.node.insertChild(lessonIcon, 0);
          this.label.string = this.lesson.type == constants_1.EXAM ? util_1.Util.i18NText("Challenge") : this.lesson.name;
          this.button.node.on("touchend", function(event) {
            event.target.getComponent(cc.Button).interactable && _this.onClick();
          });
          this.button.interactable = this.open || "reward" == this.lesson.chapter.course.id;
          var lessonProgress = profile_1.User.getCurrentUser().lessonProgressMap.get(this.lesson.id);
          if (null !== this.lesson.assignmentId && void 0 !== this.lesson.assignmentId) {
            if (this.open && lessonProgress && lessonProgress.assignmentIds.includes(this.lesson.assignmentId) && lessonProgress.score >= 0) {
              this.star1.spriteFrame = lessonProgress.score > 25 ? this.goldStar : this.grayStar;
              this.star2.spriteFrame = lessonProgress.score > 50 ? this.goldStar : this.grayStar;
              this.star3.spriteFrame = lessonProgress.score > 75 ? this.goldStar : this.grayStar;
            }
          } else if (this.open && lessonProgress && lessonProgress.score >= 0) {
            this.star1.spriteFrame = lessonProgress.score > 25 ? this.goldStar : this.grayStar;
            this.star2.spriteFrame = lessonProgress.score > 50 ? this.goldStar : this.grayStar;
            this.star3.spriteFrame = lessonProgress.score > 75 ? this.goldStar : this.grayStar;
          }
          this.lockIcon.active = !this.open && "reward" == this.lesson.chapter.course.id;
        }
      };
      LessonButton.prototype.onClick = function() {
        if (!this.open && "reward" == this.lesson.chapter.course.id) {
          profile_1.User.getCurrentUser().currentReward = [ util_1.REWARD_TYPES[4], this.lesson.chapter.id, this.lesson.id ];
          config_1.default.i.popAllScenes();
          config_1.default.i.pushScene("menu/start/scenes/start", "menu", null, true);
        }
        var user = profile_1.User.getCurrentUser();
        if (config_1.COURSES_LANG_ID.includes(this.lesson.chapter.course.id)) {
          var courseProgress = user.courseProgressMap.get(this.lesson.chapter.course.id);
          if (null != courseProgress.currentChapterId || this.lesson.id.endsWith("_PreQuiz")) this.loadLesson(); else {
            cc.log(this.lesson.chapter.course.id);
            try {
              var dialog = cc.instantiate(this.preTestPopup);
              var canvasNode = cc.director.getScene().getChildByName("Canvas");
              var script = dialog.getComponent(preTestDialog_1.default);
              if (script.isValid) {
                script.courseId = this.lesson.chapter.course.id;
                script.chapter = this.lesson.chapter;
                canvasNode.addChild(dialog);
              }
            } catch (e) {}
          }
        } else this.loadLesson();
      };
      LessonButton.prototype.loadLesson = function() {
        util_1.Util.loadLesson(this.lesson, this.loading, this.node);
      };
      __decorate([ property(cc.Label) ], LessonButton.prototype, "label", void 0);
      __decorate([ property(cc.Button) ], LessonButton.prototype, "button", void 0);
      __decorate([ property(cc.Prefab) ], LessonButton.prototype, "lessonIconPrefab", void 0);
      __decorate([ property(cc.Sprite) ], LessonButton.prototype, "downloadSprite", void 0);
      __decorate([ property(cc.Sprite) ], LessonButton.prototype, "star1", void 0);
      __decorate([ property(cc.Sprite) ], LessonButton.prototype, "star2", void 0);
      __decorate([ property(cc.Sprite) ], LessonButton.prototype, "star3", void 0);
      __decorate([ property(cc.SpriteFrame) ], LessonButton.prototype, "grayStar", void 0);
      __decorate([ property(cc.SpriteFrame) ], LessonButton.prototype, "goldStar", void 0);
      __decorate([ property(cc.Prefab) ], LessonButton.prototype, "preTestPopup", void 0);
      __decorate([ property(cc.Node) ], LessonButton.prototype, "lockIcon", void 0);
      LessonButton = __decorate([ ccclass ], LessonButton);
      return LessonButton;
    }(cc.Component);
    exports.default = LessonButton;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lessonIcon": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/constants": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/util": void 0,
    "./preTestDialog": "preTestDialog"
  } ],
  "level-indicator": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a8776kXU99GSpSY943ub5Ck", "level-indicator");
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
    var profile_1 = require("../../../common/scripts/lib/profile");
    var util_1 = require("../../../common/scripts/util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LevelIndicator = function(_super) {
      __extends(LevelIndicator, _super);
      function LevelIndicator() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.touchable = true;
        _this.levelsClickAudio = null;
        return _this;
      }
      LevelIndicator.prototype.onLoad = function() {
        if (this.touchable) {
          this.node.on(util_1.TouchEvents.TOUCH_START, this.onTouchStart, this);
          this.node.on(util_1.TouchEvents.TOUCH_END, this.onTouchEnd, this);
        }
      };
      LevelIndicator.prototype.onTouchStart = function(touch) {
        new cc.Tween().target(this.node).to(.5, {
          scale: .9
        }, {
          progress: null,
          easing: "elasticOut"
        }).start();
      };
      LevelIndicator.prototype.onTouchEnd = function(touch) {
        var _this = this;
        new cc.Tween().target(this.node).to(.5, {
          scale: 1
        }, {
          progress: null,
          easing: "elasticOut"
        }).call(function() {
          util_1.Util.playSfx(_this.levelsClickAudio);
          var config = config_1.default.getInstance();
          if (config.flow != config_1.Flow.Default) {
            profile_1.default.lastWorld = _this.world;
            profile_1.default.lastLevel = _this.level;
          }
          config.flow == config_1.Flow.Debug ? config.pushScene("menu/home/scenes/games") : config.pushScene("menu/map/scene/submap", "menu");
        }).start();
      };
      __decorate([ property ], LevelIndicator.prototype, "touchable", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], LevelIndicator.prototype, "levelsClickAudio", void 0);
      LevelIndicator = __decorate([ ccclass ], LevelIndicator);
      return LevelIndicator;
    }(cc.Component);
    exports.default = LevelIndicator;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/util": void 0
  } ],
  mapBar: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c0e31IUiTpAn7jvWUsGTSL3", "mapBar");
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
    var map_1 = require("./map");
    var config_1 = require("../../../common/scripts/lib/config");
    var profile_1 = require("../../../common/scripts/lib/profile");
    var util_1 = require("../../../common/scripts/util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var mathWorlds = [ "Number identification\nPattern recognition", "Count and write numbers up to 10", "Compare magnitude of numbers within 10\nOrder numbers within 10", "Count and write numbers up to 50\nAdd, subtract numbers within 10", "Count and write two digit numbers\nCompose & decompose numbers within 10", "Recognize 2 digit numbers\nSkip counting within 50s", "Add, subtract numbers within 20\nFast operations within 10", "Skip counting within 100\nWord problems within 10", "Recognize 3 digit numbers\nMultiplication", "Add, subtract within 100\nFast operations within 20" ];
    var MapBar = function(_super) {
      __extends(MapBar, _super);
      function MapBar() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.worldMap = null;
        _this.icons = null;
        _this.blockPrefab = null;
        _this.block = null;
        _this.mapUpAudio = null;
        _this.mapDownAudio = null;
        return _this;
      }
      MapBar_1 = MapBar;
      MapBar.prototype.onLoad = function() {
        MapBar_1.clicked = false;
        var map = this.node.getParent().getChildByName("MapScrollView");
        if (null != map) {
          var mapComp = map.getComponent(map_1.default);
          if (null != mapComp) for (var index = profile_1.default.lastWorld + 1; index < this.icons.childrenCount; index++) this.disableButton(index, mapComp);
        }
        this.node.width = cc.winSize.width;
        this.node.height = cc.winSize.height;
        "en-maths" == config_1.default.i.course.id && this.icons.children.forEach(function(icon, index) {
          var text = icon.getChildByName("text");
          if (text) {
            var label = text.getComponent(cc.Label);
            label && (label.string = mathWorlds[index]);
          }
        });
      };
      MapBar.prototype.disableButton = function(index, mapComp) {
        var worldButton = this.icons.children[index];
        if (null != worldButton) {
          var buttonComp = worldButton.getComponent(cc.Button);
          null != buttonComp && config_1.default.getInstance().flow == config_1.Flow.Default && (buttonComp.interactable = false);
        }
      };
      MapBar.prototype.goToMap = function(event, customEventData) {
        if (!MapBar_1.clicked) {
          MapBar_1.clicked = true;
          var button = event.target;
          var world = button.getSiblingIndex();
          config_1.default.loadScene("menu/map/scene/map" + world.toString(), "menu");
        }
      };
      MapBar.prototype.raiseWorldMap = function(event, customEventData) {
        util_1.Util.playSfx(this.mapUpAudio);
        this.block = cc.instantiate(this.blockPrefab);
        this.block.on("touchstart", this.lowerWorldMap, this);
        this.node.insertChild(this.block, 1);
        new cc.Tween().target(this.worldMap).to(.5, {
          y: -24
        }, null).start();
      };
      MapBar.prototype.lowerWorldMap = function(event, customEventData) {
        util_1.Util.playSfx(this.mapDownAudio);
        this.block && this.block.removeFromParent();
        new cc.Tween().target(this.worldMap).to(.5, {
          y: -cc.winSize.height
        }, null).start();
      };
      var MapBar_1;
      MapBar.clicked = false;
      __decorate([ property(cc.Node) ], MapBar.prototype, "worldMap", void 0);
      __decorate([ property(cc.Node) ], MapBar.prototype, "icons", void 0);
      __decorate([ property(cc.Prefab) ], MapBar.prototype, "blockPrefab", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], MapBar.prototype, "mapUpAudio", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], MapBar.prototype, "mapDownAudio", void 0);
      MapBar = MapBar_1 = __decorate([ ccclass ], MapBar);
      return MapBar;
    }(cc.Component);
    exports.default = MapBar;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/util": void 0,
    "./map": "map"
  } ],
  map: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "45c3fT7Oh5G5IjB97cV3bEP", "map");
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
    var level_indicator_1 = require("./level-indicator");
    var config_1 = require("../../../common/scripts/lib/config");
    var util_1 = require("../../../common/scripts/util");
    var helper_1 = require("../../../common/scripts/helper");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Map = function(_super) {
      __extends(Map, _super);
      function Map() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.forestMap = null;
        _this.levelCompletedPrefab = null;
        _this.currentLevelPrefab = null;
        _this.unlockedPrefab = null;
        _this.view = null;
        _this.content = null;
        _this.layout = null;
        _this.block = null;
        _this.world = 0;
        _this.bgMusic = null;
        _this.worlds = [];
        _this.balloon = null;
        return _this;
      }
      Map.prototype.onLoad = function() {};
      Map.prototype.showLevelIndicator = function(node, lPrefab, pos, world, level, completed) {
        void 0 === completed && (completed = false);
        var lCNode = cc.instantiate(lPrefab);
        var levelIndicator = lCNode.getComponent(level_indicator_1.default);
        levelIndicator.level = level;
        levelIndicator.world = world;
        config_1.default.getInstance().flow != config_1.Flow.Default && (levelIndicator.touchable = true);
        lCNode.position = pos;
        node.addChild(lCNode);
        util_1.Util.initText(lCNode, null, String(level + 1), helper_1.LEVEL_FONT_SIZE, "#808080", true, new cc.Vec2(-2.5, 0));
        completed && (this.balloon = lCNode);
      };
      Map.prototype.scrollToCurrentLevel = function() {
        if (null != this.balloon) {
          var space = this.balloon.getParent().convertToWorldSpace(this.balloon.getPosition());
          var posInView = this.node.convertToNodeSpace(space);
          var scrollView = this.node.getComponent(cc.ScrollView);
          scrollView.scrollToOffset(new cc.Vec2(Math.abs(posInView.x) - cc.winSize.width / 2, 0), 2);
        }
      };
      Map.prototype.onDestroy = function() {
        console.log("map destroy");
        this.node.destroyAllChildren();
        this.node.destroy();
      };
      __decorate([ property(cc.Node) ], Map.prototype, "forestMap", void 0);
      __decorate([ property(cc.Prefab) ], Map.prototype, "levelCompletedPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Map.prototype, "currentLevelPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Map.prototype, "unlockedPrefab", void 0);
      __decorate([ property(cc.Node) ], Map.prototype, "view", void 0);
      __decorate([ property(cc.Node) ], Map.prototype, "content", void 0);
      __decorate([ property(cc.Node) ], Map.prototype, "layout", void 0);
      __decorate([ property(cc.Node) ], Map.prototype, "block", void 0);
      __decorate([ property ], Map.prototype, "world", void 0);
      __decorate([ property(cc.AudioClip) ], Map.prototype, "bgMusic", void 0);
      Map = __decorate([ ccclass ], Map);
      return Map;
    }(cc.Component);
    exports.default = Map;
    cc._RF.pop();
  }, {
    "../../../common/scripts/helper": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/util": void 0,
    "./level-indicator": "level-indicator"
  } ],
  oldrewards: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5aa08unT65KkqUM9PZp1jxo", "oldrewards");
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
    var profile_1 = require("../../../common/scripts/lib/profile");
    var constants_1 = require("../../../common/scripts/lib/constants");
    var util_1 = require("../../../common/scripts/util");
    var achievement_1 = require("../../../common/scorecard/scripts/achievement");
    var landing_1 = require("../../../private/school/scripts/landing");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var OldRewards = function(_super) {
      __extends(OldRewards, _super);
      function OldRewards() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.layoutHolder = null;
        _this.achievementPrefab = null;
        _this.characterPrefab = null;
        _this.bgsPrefab = null;
        _this.normalSprite = null;
        _this.lastSelectedButton = -1;
        _this.leftSideNormalSprite = null;
        _this.sideLayoutNode = null;
        _this.characterColors = [ "#F7D7BA", "#F9E5C5", "#FDD8B4", "#8CC757", "#A5E6F5", "#C0AACF", "#44FFFD", "#F3B866", "#3AC7D0", "#EDB957", "#B2DBCC" ];
        return _this;
      }
      OldRewards.prototype.onLoad = function() {
        for (var i = 0; i < 3; i++) {
          this.layoutHolder.children[i].width = cc.winSize.width - 290;
          this.layoutHolder.children[i].children[0].width = cc.winSize.width - 290;
          this.layoutHolder.children[i].children[0].children[0].children[0].width = cc.winSize.width - 290;
        }
        this.loadCharacters();
        this.loadBgs();
        this.checkAchievementsLockStatus();
      };
      OldRewards.prototype.loadCharacters = function() {
        var _this = this;
        util_1.REWARD_CHARACTERS.forEach(function(character, index) {
          cc.resources.load("char_icons/" + character + "_icon", function(err, sp) {
            if (!err) {
              var charPrefab = cc.instantiate(_this.characterPrefab);
              if (null != charPrefab) {
                charPrefab.getChildByName("characternode").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
                var color = cc.Color.BLACK;
                charPrefab.getChildByName("character_icon_color").color = color.fromHEX(_this.characterColors[index]);
                if (null != profile_1.User.getCurrentUser()) {
                  if (0 === profile_1.User.getCurrentUser().unlockedRewards[util_1.REWARD_TYPES[0] + "-" + character] || void 0 === profile_1.User.getCurrentUser().unlockedRewards[util_1.REWARD_TYPES[0] + "-" + character]) {
                    charPrefab.getChildByName("character_icon_color").getComponent(cc.Sprite).setMaterial(0, _this.grayMaterial);
                    charPrefab.getChildByName("character_icon_bg").getComponent(cc.Sprite).setMaterial(0, _this.grayMaterial);
                    charPrefab.getChildByName("characternode").getComponent(cc.Sprite).setMaterial(0, _this.grayMaterial);
                    charPrefab.getChildByName("characternode").getComponent(cc.Sprite).setMaterial(0, _this.grayMaterial);
                    charPrefab.getChildByName("lock").active = true;
                    _this.registerButton(charPrefab, "onInactiveCharacterClick", character);
                  } else {
                    _this.registerButton(charPrefab, "onCharacterClick", character);
                    _this.registerButton(charPrefab.getChildByName("edit"), "onEditButtonClicked", character);
                  }
                  if (character === profile_1.User.getCurrentUser().currentCharacter) {
                    charPrefab.getChildByName("tick").active = true;
                    charPrefab.getChildByName("edit").active = true;
                  }
                }
                var characterNode = _this.layoutHolder.children[0].children[0].children[0].children[0];
                characterNode.addChild(charPrefab);
              }
            }
          });
        });
      };
      OldRewards.prototype.loadBgs = function() {
        var _this = this;
        util_1.REWARD_BACKGROUNDS.forEach(function(bg) {
          var bgPrefab = cc.instantiate(_this.bgsPrefab);
          cc.resources.load("backgrounds/textures/bg_icons/background-" + bg, function(err, sp) {
            bgPrefab.name = bg;
            bgPrefab.getChildByName("backgroundnode").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
            if (null != profile_1.User.getCurrentUser()) {
              if (0 === profile_1.User.getCurrentUser().unlockedRewards[util_1.REWARD_TYPES[1] + "-" + bg] || void 0 === profile_1.User.getCurrentUser().unlockedRewards[util_1.REWARD_TYPES[1] + "-" + bg]) {
                bgPrefab.getChildByName("backgroundnode").getComponent(cc.Sprite).setMaterial(0, _this.grayMaterial);
                bgPrefab.getChildByName("lock").active = true;
                _this.registerButton(bgPrefab, "onInactiveBgClick", bg);
              } else _this.registerButton(bgPrefab, "onBgClick", bg);
              bg === profile_1.User.getCurrentUser().currentBg && (bgPrefab.getChildByName("tick").active = true);
            }
          });
          var bgNode = _this.layoutHolder.children[1].children[0].children[0].children[0];
          bgNode.addChild(bgPrefab);
        });
      };
      OldRewards.prototype.registerButton = function(buttonNode, functionName, customData) {
        var clickEditEventHandler = new cc.Component.EventHandler();
        clickEditEventHandler.target = this.node;
        clickEditEventHandler.component = "rewards";
        clickEditEventHandler.handler = functionName;
        clickEditEventHandler.customEventData = "" + customData;
        var button = buttonNode.getComponent(cc.Button);
        button.clickEvents.push(clickEditEventHandler);
      };
      OldRewards.prototype.checkAchievementsLockStatus = function() {
        var _this = this;
        var achievementsNode = this.layoutHolder.children[2].children[0].children[0].children[0];
        var lessonProgressMap = profile_1.User.getCurrentUser().lessonProgressMap;
        config_1.default.i.curriculum.forEach(function(course) {
          course.chapters.forEach(function(chapter) {
            chapter.lessons.forEach(function(lesson) {
              if (lesson.type == constants_1.EXAM && lessonProgressMap.has(lesson.id) && lessonProgressMap.get(lesson.id).score > constants_1.MIN_PASS) {
                var achievement = cc.instantiate(_this.achievementPrefab);
                var achievementComp = achievement.getComponent(achievement_1.default);
                achievementComp.image = lesson.image;
                achievementComp.courseId = course.id;
                achievementComp.score = lessonProgressMap.get(lesson.id).score;
                achievementsNode.addChild(achievement);
              }
            });
          });
        });
      };
      OldRewards.prototype.onContentClick = function(event, customEventData) {
        for (var i = 0; i < 3; i++) if (parseInt(customEventData) === i) {
          this.layoutHolder.getChildByName(i.toString()).active = true;
          this.layoutHolder.getChildByName(i.toString()).getComponent(cc.ScrollView).scrollToTop();
          var color = cc.Color.BLACK;
          this.sideLayoutNode.children[i].getChildByName("Background").color = color.fromHEX("#17ADEC");
          this.sideLayoutNode.children[i].getChildByName("Background").children[0].color = color.fromHEX("#17ADEC");
        } else {
          this.layoutHolder.getChildByName(i.toString()).active = false;
          var color = cc.Color.BLACK;
          this.sideLayoutNode.children[i].getChildByName("Background").color = color.fromHEX("#FFFFFF");
          this.sideLayoutNode.children[i].getChildByName("Background").children[0].color = color.fromHEX("#FFFFFF");
        }
      };
      OldRewards.prototype.onCharacterClick = function(event, customEventData) {
        var nodeName = "indi_button_prefab" + this.lastSelectedButton.toString();
        this.lastSelectedButton > -1;
        nodeName = "indi_button_prefab" + event.currentTarget.name;
        this.lastSelectedButton = parseInt(event.currentTarget.name);
        var numberOfChildren = this.layoutHolder.children[0].children[0].children[0].children[0].childrenCount;
        for (var i = 0; i < numberOfChildren; i++) {
          var eachElement = this.layoutHolder.children[0].children[0].children[0].children[0].children[i];
          eachElement.getChildByName("tick").active = false;
          eachElement.getChildByName("edit").active = false;
        }
        event.currentTarget.getChildByName("tick").active = true;
        event.currentTarget.getChildByName("edit").active = true;
        profile_1.User.getCurrentUser().currentCharacter === customEventData.toString().trim() && config_1.default.getInstance().pushScene("menu/inventory/scenes/inventory", "menu");
        profile_1.User.getCurrentUser().currentCharacter = customEventData.toString().trim();
      };
      OldRewards.prototype.onEditButtonClicked = function(event, customEventData) {
        profile_1.User.getCurrentUser().currentCharacter = customEventData.toString().trim();
        config_1.default.getInstance().pushScene("menu/inventory/scenes/inventory", "menu");
      };
      OldRewards.prototype.onInactiveCharacterClick = function(event, customEventData) {
        profile_1.User.getCurrentUser().currentReward = [ util_1.REWARD_TYPES[0], customEventData.toString().trim() ];
        config_1.default.i.popAllScenes();
        config_1.default.i.pushScene("menu/start/scenes/start", "menu", null, true);
      };
      OldRewards.prototype.onBgClick = function(event, customEventData) {
        var nodeName = "bg_button_prefab" + this.lastSelectedButton.toString();
        this.lastSelectedButton > -1;
        nodeName = "bg_button_prefab" + event.currentTarget.name;
        this.lastSelectedButton = parseInt(event.currentTarget.name);
        profile_1.User.getCurrentUser().currentBg = customEventData.toString().trim();
        var numberOfChildren = this.layoutHolder.children[1].children[0].children[0].children[0].childrenCount;
        for (var i = 0; i < numberOfChildren; i++) {
          var eachElement = this.layoutHolder.children[1].children[0].children[0].children[0].children[i];
          eachElement.getChildByName("tick").active = false;
        }
        event.currentTarget.getChildByName("tick").active = true;
      };
      OldRewards.prototype.onInactiveBgClick = function(event, customEventData) {
        profile_1.User.getCurrentUser().currentReward = [ util_1.REWARD_TYPES[1], customEventData.toString().trim() ];
        config_1.default.i.popAllScenes();
        config_1.default.i.pushScene("menu/start/scenes/start", "menu", null, true);
      };
      OldRewards.prototype.onLogoutButtonClick = function(event) {
        var node = event.target;
        var button = node.getComponent(cc.Button);
        button && (button.interactable = false);
        profile_1.User.setCurrentUser(null);
        config_1.default.i.popAllScenes();
        if (cc.sys.localStorage.getItem(constants_1.CURRENT_STUDENT_ID)) {
          cc.sys.localStorage.removeItem(constants_1.LOGGED_IN_USER);
          config_1.default.loadScene(landing_1.SECTION_LIST, "private", null);
        } else 3 == profile_1.default.getValue(profile_1.CURRENTMODE) ? null == cc.sys.localStorage.getItem(constants_1.IS_REMEMBER_TOGGLE_ON) || "false" === cc.sys.localStorage.getItem(constants_1.IS_REMEMBER_TOGGLE_ON) ? config_1.default.i.pushScene(landing_1.SECTION_LIST, "private", null) : config_1.default.i.pushScene("private/school/scenes/currentLoggedUser", "private", null) : cc.director.loadScene("welcomePage");
      };
      __decorate([ property(cc.Node) ], OldRewards.prototype, "layoutHolder", void 0);
      __decorate([ property(cc.Prefab) ], OldRewards.prototype, "achievementPrefab", void 0);
      __decorate([ property(cc.Prefab) ], OldRewards.prototype, "characterPrefab", void 0);
      __decorate([ property(cc.Prefab) ], OldRewards.prototype, "bgsPrefab", void 0);
      __decorate([ property(cc.Material) ], OldRewards.prototype, "grayMaterial", void 0);
      __decorate([ property(cc.Node) ], OldRewards.prototype, "sideLayoutNode", void 0);
      OldRewards = __decorate([ ccclass ], OldRewards);
      return OldRewards;
    }(cc.Component);
    exports.default = OldRewards;
    cc._RF.pop();
  }, {
    "../../../common/scorecard/scripts/achievement": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/constants": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/util": void 0,
    "../../../private/school/scripts/landing": void 0
  } ],
  picDisplayPrefab: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "36cb0+0OLxFoJh8vQWRMvMy", "picDisplayPrefab");
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
    var profile_1 = require("../../../common/scripts/lib/profile");
    var ParseImageDownloader_1 = require("../../../common/scripts/services/ParseImageDownloader");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PicDisplayPrefab = function(_super) {
      __extends(PicDisplayPrefab, _super);
      function PicDisplayPrefab() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.picNode = null;
        _this.usernameNode = null;
        return _this;
      }
      PicDisplayPrefab.prototype.onLoad = function() {
        this.loadUserImageOrAvatar();
      };
      PicDisplayPrefab.prototype.loadUserImageOrAvatar = function() {
        var _this = this;
        var currentUser = profile_1.User.getCurrentUser();
        var picNode = this.picNode;
        currentUser && currentUser.studentId && "" != currentUser.studentId && currentUser.studentId.length > 0 && null == currentUser.avatarImage ? ParseImageDownloader_1.ParseImageDownloader.loadImageForSchool(currentUser.imgPath, currentUser.studentId, function(texture) {
          if (!!texture && picNode) {
            var spriteFrame = new cc.SpriteFrame(texture);
            var maskNode = picNode.getChildByName("mask");
            if (maskNode) {
              var image = maskNode.getChildByName("image");
              image.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
          }
        }) : currentUser && currentUser.avatarImage && currentUser.avatarImage.length > 0 && cc.resources.load("avatars/" + currentUser.avatarImage, function(err, sp) {
          _this.picNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
        });
        currentUser.name.length > 10 ? this.usernameNode.getComponent(cc.Label).string = currentUser.name.substring(0, 10) + "..." : this.usernameNode.getComponent(cc.Label).string = currentUser.name;
      };
      __decorate([ property(cc.Node) ], PicDisplayPrefab.prototype, "picNode", void 0);
      __decorate([ property(cc.Node) ], PicDisplayPrefab.prototype, "usernameNode", void 0);
      PicDisplayPrefab = __decorate([ ccclass ], PicDisplayPrefab);
      return PicDisplayPrefab;
    }(cc.Component);
    exports.default = PicDisplayPrefab;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/services/ParseImageDownloader": void 0
  } ],
  preTestDialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "23815bQc+BO3pYCxF/Onkum", "preTestDialog");
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
    var lessonController_1 = require("../../../common/scripts/lessonController");
    var config_1 = require("../../../common/scripts/lib/config");
    var loading_1 = require("../../../common/scripts/loading");
    var util_1 = require("../../../common/scripts/util");
    var chapterLessons_1 = require("./chapterLessons");
    var start_1 = require("./start");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PreTestDialog = function(_super) {
      __extends(PreTestDialog, _super);
      function PreTestDialog() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.loading = null;
        return _this;
      }
      PreTestDialog.prototype.onClickYes = function() {
        var _this = this;
        var lessons;
        var config = config_1.default.i;
        var course = config.curriculum.get(this.courseId);
        lessons = [ start_1.default.preQuizLesson(course) ];
        config.lesson = lessons[0];
        config.chapter = lessons[0].chapter;
        config.course = lessons[0].chapter.course;
        this.node.getChildByName("dialog_box").active = false;
        this.node.getChildByName("block").active = false;
        this.loading.getComponent(loading_1.default).allowCancel = true;
        this.loading.active = true;
        lessonController_1.default.preloadLesson(this.node.parent, function(err) {
          chapterLessons_1.default.showType == chapterLessons_1.ChapterLessonType.Assignments || config_1.default.isMicroLink || (config.chapter = _this.chapter);
          err ? _this.loading.getComponent(loading_1.default).addMessage(util_1.Util.i18NText("Error downloading content. Please connect to internet and try again"), true, true) : _this.loading && _this.loading.activeInHierarchy && config.pushScene("common/scenes/lessonController");
        });
      };
      PreTestDialog.prototype.onClickNo = function() {
        config_1.default.isMicroLink && (config_1.default.isMicroLink = false);
        this.node.removeFromParent(true);
      };
      __decorate([ property(cc.Node) ], PreTestDialog.prototype, "loading", void 0);
      PreTestDialog = __decorate([ ccclass ], PreTestDialog);
      return PreTestDialog;
    }(cc.Component);
    exports.default = PreTestDialog;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lessonController": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/loading": void 0,
    "../../../common/scripts/util": void 0,
    "./chapterLessons": "chapterLessons",
    "./start": "start"
  } ],
  profileOtpDialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1972611HiBP/aseAUls4NnA", "profileOtpDialog");
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
    var util_1 = require("../../../common/scripts/util");
    var profile_1 = require("../../../common/scripts/lib/profile");
    var ServiceConfig_1 = require("../../../common/scripts/services/ServiceConfig");
    var util_logger_1 = require("../../../common/scripts/util-logger");
    var ProfileOtpDialog = function(_super) {
      __extends(ProfileOtpDialog, _super);
      function ProfileOtpDialog() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.editBox = null;
        _this.confirmBtn = null;
        _this.title = null;
        _this.btnLabel = null;
        _this.errLabel = null;
        _this.parentNode = null;
        _this.schoolName = null;
        _this.className = null;
        return _this;
      }
      ProfileOtpDialog.prototype.onLoad = function() {
        this.title.string = util_1.Util.i18NText("We sent an OTP to verify your number.");
        this.editBox.string = "";
        this.confirmBtn.interactable = false;
        this.btnLabel.string = util_1.Util.i18NText("Confirm");
        this.editBox.placeholder = util_1.Util.i18NText("Enter the 6-digit otp here...");
        this.errLabel.string = "";
        this.editBox.enabled = true;
      };
      ProfileOtpDialog.prototype.onEditingBegan = function() {
        this.editBox.placeholderLabel.string = "";
      };
      ProfileOtpDialog.prototype.onTextChanged = function() {
        var otp = this.editBox.string;
        6 === otp.length ? this.confirmBtn.interactable = true : this.confirmBtn.interactable = false;
      };
      ProfileOtpDialog.prototype.onOtpClose = function() {
        this.node.active = false;
      };
      ProfileOtpDialog.prototype.onSendLinkStudentRequest = function() {
        return __awaiter(this, void 0, void 0, function() {
          var studentId, otpCode, user, dial_code, phoneNumber, response, s, sec, e_1;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              studentId = profile_1.User.getCurrentUser().id;
              otpCode = this.editBox.string;
              user = profile_1.User.getCurrentUser();
              dial_code = !profile_1.default.getValue(profile_1.DIALING_CODE) ? null : profile_1.default.getValue(profile_1.DIALING_CODE);
              phoneNumber = !profile_1.default.getValue(profile_1.CONTACT) ? null : profile_1.default.getValue(profile_1.CONTACT).substring(dial_code.length);
              if (!(!!studentId && !!otpCode)) return [ 3, 4 ];
              this.confirmBtn.interactable = false;
              this.errLabel.string = "";
              _a.label = 1;

             case 1:
              _a.trys.push([ 1, 3, , 4 ]);
              return [ 4, ServiceConfig_1.ServiceConfig.getI().handle.linkStudent(studentId, otpCode, phoneNumber, user.age, user.name, dial_code) ];

             case 2:
              response = _a.sent();
              if (response && response.ok) {
                util_logger_1.default.processLinkStudent(response.data.sectionId, response.data.schoolId, response.data.studentId, response.data.schoolName, response.data.sectionName, response.data.progressId, otpCode, response.data.profile);
                s = response.data.schoolName ? response.data.schoolName : "";
                sec = response.data.sectionName ? response.data.sectionName : "";
                this.parentNode.getComponentInChildren(cc.Label).string = util_1.Util.i18NText("Connected");
                this.parentNode.node.color = new cc.Color(240, 88, 34);
                s && (this.schoolName.getComponent(cc.Label).string = util_1.Util.i18NText("School") + " : " + s);
                sec && (this.className.getComponent(cc.Label).string = util_1.Util.i18NText("Class  :") + " " + sec);
                this.parentNode.interactable = false;
                this.onOtpClose();
              }
              return [ 3, 4 ];

             case 3:
              e_1 = _a.sent();
              this.errLabel.string = "code is invalid or expired";
              this.confirmBtn.interactable = true;
              return [ 3, 4 ];

             case 4:
              return [ 2 ];
            }
          });
        });
      };
      __decorate([ property(cc.EditBox) ], ProfileOtpDialog.prototype, "editBox", void 0);
      __decorate([ property(cc.Button) ], ProfileOtpDialog.prototype, "confirmBtn", void 0);
      __decorate([ property(cc.Label) ], ProfileOtpDialog.prototype, "title", void 0);
      __decorate([ property(cc.Label) ], ProfileOtpDialog.prototype, "btnLabel", void 0);
      __decorate([ property(cc.Label) ], ProfileOtpDialog.prototype, "errLabel", void 0);
      __decorate([ property(cc.Button) ], ProfileOtpDialog.prototype, "parentNode", void 0);
      __decorate([ property(cc.Node) ], ProfileOtpDialog.prototype, "schoolName", void 0);
      __decorate([ property(cc.Node) ], ProfileOtpDialog.prototype, "className", void 0);
      ProfileOtpDialog = __decorate([ ccclass ], ProfileOtpDialog);
      return ProfileOtpDialog;
    }(cc.Component);
    exports.default = ProfileOtpDialog;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/services/ServiceConfig": void 0,
    "../../../common/scripts/util": void 0,
    "../../../common/scripts/util-logger": void 0
  } ],
  rewards: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4d3cakHbFBPdb0cWsMvTLq1", "rewards");
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
    var profile_1 = require("../../../common/scripts/lib/profile");
    var constants_1 = require("../../../common/scripts/lib/constants");
    var util_1 = require("../../../common/scripts/util");
    var achievement_1 = require("../../../common/scorecard/scripts/achievement");
    var landing_1 = require("../../../private/school/scripts/landing");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Rewards = function(_super) {
      __extends(Rewards, _super);
      function Rewards() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.layoutHolder = null;
        _this.achievementPrefab = null;
        _this.characterPrefab = null;
        _this.bgsPrefab = null;
        _this.normalSprite = null;
        _this.lastSelectedButton = -1;
        _this.leftSideNormalSprite = null;
        _this.sideLayoutNode = null;
        _this.characterColors = [ "#F7D7BA", "#F9E5C5", "#FDD8B4", "#8CC757", "#A5E6F5", "#C0AACF", "#44FFFD", "#F3B866", "#3AC7D0", "#EDB957", "#B2DBCC" ];
        return _this;
      }
      Rewards_1 = Rewards;
      Rewards.prototype.onLoad = function() {
        for (var i = 0; i < 3; i++) {
          this.layoutHolder.children[i].width = cc.winSize.width - 80;
          this.layoutHolder.children[i].children[0].width = cc.winSize.width - 80;
          this.layoutHolder.children[i].children[0].children[0].children[0].width = cc.winSize.width - 80;
        }
        this.loadCharacters();
        this.loadBgs();
        this.checkAchievementsLockStatus();
        if (Rewards_1.contentDecisionFlag) {
          console.log("this.node.getChildByName(rewards)", this.node.name);
          console.log("this.node.getChildByName(rewards)", this.node.getChildByName("Rewards label").name);
          switch (Rewards_1.contentDecisionFlag) {
           case "0":
            this.node.getChildByName("Rewards label").getComponent(cc.Label).string = "Character Collection";
            break;

           case "1":
            this.node.getChildByName("Rewards label").getComponent(cc.Label).string = "Background Collection";
            break;

           case "2":
            this.node.getChildByName("Rewards label").getComponent(cc.Label).string = "Achievement Collection";
          }
          this.onContentClick(null, Rewards_1.contentDecisionFlag);
          Rewards_1.contentDecisionFlag = null;
        }
      };
      Rewards.prototype.loadCharacters = function() {
        var _this = this;
        util_1.REWARD_CHARACTERS.forEach(function(character, index) {
          cc.resources.load("char_icons/" + character + "_icon", function(err, sp) {
            if (!err) {
              var charPrefab = cc.instantiate(_this.characterPrefab);
              if (null != charPrefab) {
                charPrefab.getChildByName("characternode").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
                var color = cc.Color.BLACK;
                charPrefab.getChildByName("character_icon_color").color = color.fromHEX(_this.characterColors[index]);
                if (null != profile_1.User.getCurrentUser()) {
                  if (0 === profile_1.User.getCurrentUser().unlockedRewards[util_1.REWARD_TYPES[0] + "-" + character] || void 0 === profile_1.User.getCurrentUser().unlockedRewards[util_1.REWARD_TYPES[0] + "-" + character]) {
                    charPrefab.getChildByName("character_icon_color").getComponent(cc.Sprite).setMaterial(0, _this.grayMaterial);
                    charPrefab.getChildByName("character_icon_bg").getComponent(cc.Sprite).setMaterial(0, _this.grayMaterial);
                    charPrefab.getChildByName("characternode").getComponent(cc.Sprite).setMaterial(0, _this.grayMaterial);
                    charPrefab.getChildByName("characternode").getComponent(cc.Sprite).setMaterial(0, _this.grayMaterial);
                    charPrefab.getChildByName("lock").active = true;
                    _this.registerButton(charPrefab, "onInactiveCharacterClick", character);
                  } else {
                    _this.registerButton(charPrefab, "onCharacterClick", character);
                    _this.registerButton(charPrefab.getChildByName("edit"), "onEditButtonClicked", character);
                  }
                  if (character === profile_1.User.getCurrentUser().currentCharacter) {
                    charPrefab.getChildByName("tick").active = true;
                    charPrefab.getChildByName("edit").active = true;
                  }
                }
                var characterNode = _this.layoutHolder.children[0].children[0].children[0].children[0];
                characterNode.addChild(charPrefab);
              }
            }
          });
        });
      };
      Rewards.prototype.loadBgs = function() {
        var _this = this;
        util_1.REWARD_BACKGROUNDS.forEach(function(bg) {
          var bgPrefab = cc.instantiate(_this.bgsPrefab);
          cc.resources.load("backgrounds/textures/bg_icons/background-" + bg, function(err, sp) {
            bgPrefab.name = bg;
            bgPrefab.getChildByName("backgroundnode").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
            if (null != profile_1.User.getCurrentUser()) {
              if (0 === profile_1.User.getCurrentUser().unlockedRewards[util_1.REWARD_TYPES[1] + "-" + bg] || void 0 === profile_1.User.getCurrentUser().unlockedRewards[util_1.REWARD_TYPES[1] + "-" + bg]) {
                bgPrefab.getChildByName("backgroundnode").getComponent(cc.Sprite).setMaterial(0, _this.grayMaterial);
                bgPrefab.getChildByName("lock").active = true;
                _this.registerButton(bgPrefab, "onInactiveBgClick", bg);
              } else _this.registerButton(bgPrefab, "onBgClick", bg);
              bg === profile_1.User.getCurrentUser().currentBg && (bgPrefab.getChildByName("tick").active = true);
            }
          });
          var bgNode = _this.layoutHolder.children[1].children[0].children[0].children[0];
          bgNode.addChild(bgPrefab);
        });
      };
      Rewards.prototype.registerButton = function(buttonNode, functionName, customData) {
        var clickEditEventHandler = new cc.Component.EventHandler();
        clickEditEventHandler.target = this.node;
        clickEditEventHandler.component = "rewards";
        clickEditEventHandler.handler = functionName;
        clickEditEventHandler.customEventData = "" + customData;
        var button = buttonNode.getComponent(cc.Button);
        button.clickEvents.push(clickEditEventHandler);
      };
      Rewards.prototype.checkAchievementsLockStatus = function() {
        var _this = this;
        var achievementsNode = this.layoutHolder.children[2].children[0].children[0].children[0];
        var lessonProgressMap = profile_1.User.getCurrentUser().lessonProgressMap;
        config_1.default.i.curriculum.forEach(function(course) {
          course.chapters.forEach(function(chapter) {
            chapter.lessons.forEach(function(lesson) {
              if (lesson.type == constants_1.EXAM && lessonProgressMap.has(lesson.id) && lessonProgressMap.get(lesson.id).score > constants_1.MIN_PASS) {
                var achievement = cc.instantiate(_this.achievementPrefab);
                var achievementComp = achievement.getComponent(achievement_1.default);
                achievementComp.image = lesson.image;
                achievementComp.courseId = course.id;
                achievementComp.score = lessonProgressMap.get(lesson.id).score;
                achievementsNode.addChild(achievement);
              }
            });
          });
        });
      };
      Rewards.prototype.onContentClick = function(event, customEventData) {
        for (var i = 0; i < 3; i++) if (parseInt(customEventData) === i) {
          this.layoutHolder.getChildByName(i.toString()).active = true;
          this.layoutHolder.getChildByName(i.toString()).getComponent(cc.ScrollView).scrollToTop();
          var color = cc.Color.BLACK;
          this.sideLayoutNode.children[i].getChildByName("Background").color = color.fromHEX("#17ADEC");
          this.sideLayoutNode.children[i].getChildByName("Background").children[0].color = color.fromHEX("#17ADEC");
        } else {
          this.layoutHolder.getChildByName(i.toString()).active = false;
          var color = cc.Color.BLACK;
          this.sideLayoutNode.children[i].getChildByName("Background").color = color.fromHEX("#FFFFFF");
          this.sideLayoutNode.children[i].getChildByName("Background").children[0].color = color.fromHEX("#FFFFFF");
        }
      };
      Rewards.prototype.onCharacterClick = function(event, customEventData) {
        var nodeName = "indi_button_prefab" + this.lastSelectedButton.toString();
        this.lastSelectedButton > -1;
        nodeName = "indi_button_prefab" + event.currentTarget.name;
        this.lastSelectedButton = parseInt(event.currentTarget.name);
        var numberOfChildren = this.layoutHolder.children[0].children[0].children[0].children[0].childrenCount;
        for (var i = 0; i < numberOfChildren; i++) {
          var eachElement = this.layoutHolder.children[0].children[0].children[0].children[0].children[i];
          eachElement.getChildByName("tick").active = false;
          eachElement.getChildByName("edit").active = false;
        }
        event.currentTarget.getChildByName("tick").active = true;
        event.currentTarget.getChildByName("edit").active = true;
        profile_1.User.getCurrentUser().currentCharacter === customEventData.toString().trim() && config_1.default.getInstance().pushScene("menu/inventory/scenes/inventory", "menu");
        profile_1.User.getCurrentUser().currentCharacter = customEventData.toString().trim();
      };
      Rewards.prototype.onEditButtonClicked = function(event, customEventData) {
        profile_1.User.getCurrentUser().currentCharacter = customEventData.toString().trim();
        config_1.default.getInstance().pushScene("menu/inventory/scenes/inventory", "menu");
      };
      Rewards.prototype.onInactiveCharacterClick = function(event, customEventData) {
        profile_1.User.getCurrentUser().currentReward = [ util_1.REWARD_TYPES[0], customEventData.toString().trim() ];
        config_1.default.i.popAllScenes();
        config_1.default.i.pushScene("menu/start/scenes/start", "menu", null, true);
      };
      Rewards.prototype.onBgClick = function(event, customEventData) {
        var nodeName = "bg_button_prefab" + this.lastSelectedButton.toString();
        this.lastSelectedButton > -1;
        nodeName = "bg_button_prefab" + event.currentTarget.name;
        this.lastSelectedButton = parseInt(event.currentTarget.name);
        profile_1.User.getCurrentUser().currentBg = customEventData.toString().trim();
        var numberOfChildren = this.layoutHolder.children[1].children[0].children[0].children[0].childrenCount;
        for (var i = 0; i < numberOfChildren; i++) {
          var eachElement = this.layoutHolder.children[1].children[0].children[0].children[0].children[i];
          eachElement.getChildByName("tick").active = false;
        }
        event.currentTarget.getChildByName("tick").active = true;
      };
      Rewards.prototype.onInactiveBgClick = function(event, customEventData) {
        profile_1.User.getCurrentUser().currentReward = [ util_1.REWARD_TYPES[1], customEventData.toString().trim() ];
        config_1.default.i.popAllScenes();
        config_1.default.i.pushScene("menu/start/scenes/start", "menu", null, true);
      };
      Rewards.prototype.onLogoutButtonClick = function(event) {
        var node = event.target;
        var button = node.getComponent(cc.Button);
        button && (button.interactable = false);
        profile_1.User.setCurrentUser(null);
        config_1.default.i.popAllScenes();
        if (cc.sys.localStorage.getItem(constants_1.CURRENT_STUDENT_ID)) {
          cc.sys.localStorage.removeItem(constants_1.LOGGED_IN_USER);
          config_1.default.loadScene(landing_1.SECTION_LIST, "private", null);
        } else 3 == profile_1.default.getValue(profile_1.CURRENTMODE) ? null == cc.sys.localStorage.getItem(constants_1.IS_REMEMBER_TOGGLE_ON) || "false" === cc.sys.localStorage.getItem(constants_1.IS_REMEMBER_TOGGLE_ON) ? config_1.default.i.pushScene(landing_1.SECTION_LIST, "private", null) : config_1.default.i.pushScene("private/school/scenes/currentLoggedUser", "private", null) : cc.director.loadScene("welcomePage");
      };
      var Rewards_1;
      __decorate([ property(cc.Node) ], Rewards.prototype, "layoutHolder", void 0);
      __decorate([ property(cc.Prefab) ], Rewards.prototype, "achievementPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Rewards.prototype, "characterPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Rewards.prototype, "bgsPrefab", void 0);
      __decorate([ property(cc.Material) ], Rewards.prototype, "grayMaterial", void 0);
      __decorate([ property(cc.Node) ], Rewards.prototype, "sideLayoutNode", void 0);
      Rewards = Rewards_1 = __decorate([ ccclass ], Rewards);
      return Rewards;
    }(cc.Component);
    exports.default = Rewards;
    cc._RF.pop();
  }, {
    "../../../common/scorecard/scripts/achievement": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/constants": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/util": void 0,
    "../../../private/school/scripts/landing": void 0
  } ],
  startContent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8dd3dM68/dIZr6N+Ydk2DUq", "startContent");
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
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var config_1 = require("../../../common/scripts/lib/config");
    var profile_1 = require("../../../common/scripts/lib/profile");
    var lessonButton_1 = require("./lessonButton");
    var util_1 = require("../../../common/scripts/util");
    var constants_1 = require("../../../common/scripts/lib/constants");
    var ServiceConfig_1 = require("../../../common/scripts/services/ServiceConfig");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StartContent = function(_super) {
      __extends(StartContent, _super);
      function StartContent() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.startLessonButtonPrefab = null;
        _this.pageView = null;
        return _this;
      }
      StartContent_1 = StartContent;
      StartContent.prototype.onLoad = function() {
        return __awaiter(this, void 0, void 0, function() {
          var user, buttons, STARTY, assignments;
          var _this = this;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              user = profile_1.User.getCurrentUser();
              buttons = [];
              user.courseProgressMap.forEach(function(courseProgress, name) {
                var course = config_1.default.i.curriculum.get(name);
                courseProgress.currentChapterId ? course.chapters.forEach(function(chapter, index) {
                  if (chapter.id == courseProgress.currentChapterId) {
                    buttons.push(_this.createButton(_this.recommendedLessonInChapter(chapter)));
                    var last3Chapters = util_1.Util.shuffleByMapSortMap(course.chapters.slice(Math.max(0, index - 3), index));
                    last3Chapters.length > 0 ? buttons.push(_this.createButton(_this.recommendedLessonInChapter(last3Chapters[0]))) : index + 1 < course.chapters.length && buttons.push(_this.createButton(_this.recommendedLessonInChapter(course.chapters[index + 1])));
                  }
                }) : buttons.push(StartContent_1.createPreQuizButton(course, _this.startLessonButtonPrefab, _this.loading));
              });
              util_1.Util.shuffle(buttons);
              STARTY = 256;
              buttons.forEach(function(node, index, array) {
                node.x = -cc.winSize.width / 2 + cc.winSize.width / array.length * index;
                node.y = -cc.winSize.height / 2 + STARTY + (cc.winSize.height - STARTY) / array.length * index;
                _this.node.addChild(node);
              });
              return [ 4, ServiceConfig_1.ServiceConfig.getI().handle.listAssignments(user.id) ];

             case 1:
              assignments = _a.sent();
              assignments.forEach(function(ass) {
                var course = config_1.default.i.curriculum.get(ass.courseCode);
                if (course) {
                  var chapter = course.chapters.find(function(c) {
                    return c.id == ass.chapterId;
                  });
                  var lesson = null;
                  if (chapter) {
                    lesson = chapter.lessons.find(function(l) {
                      return l.id == ass.lessonId;
                    });
                    lesson && _this.node.children[0].getComponent(cc.PageView).insertPage(_this.createButton(lesson), 0);
                  }
                }
              });
              return [ 2 ];
            }
          });
        });
      };
      StartContent.prototype.recommendedLessonInChapter = function(chapter) {
        var user = profile_1.User.getCurrentUser();
        var firstClosedIndex = chapter.lessons.findIndex(function(lesson, index) {
          return !(0 == index || lesson.open || user.lessonProgressMap.has(lesson.id));
        });
        var lastOpenLesson = chapter.lessons[-1 == firstClosedIndex ? 0 : firstClosedIndex - 1];
        if (lastOpenLesson.type == constants_1.EXAM && user.lessonProgressMap.has(lastOpenLesson.id) && user.lessonProgressMap.get(lastOpenLesson.id).score < constants_1.MIN_PASS) {
          var foundThisExam = false;
          var foundPrevExam = false;
          var lessonsToRevise = __spreadArrays(chapter.lessons).reverse().filter(function(l) {
            if (!foundThisExam) {
              l.id == lastOpenLesson.id && (foundThisExam = true);
              return false;
            }
            if (!foundPrevExam) {
              if (l.type == constants_1.EXAM) {
                foundPrevExam = true;
                return false;
              }
              return true;
            }
          }).sort(function(a, b) {
            var aProgress = user.lessonProgressMap.get(a.id);
            var bProgress = user.lessonProgressMap.get(b.id);
            var aAttempts = aProgress ? aProgress.attempts : 0;
            var bAttempts = bProgress ? bProgress.attempts : 0;
            return aAttempts - bAttempts;
          });
          if (0 == lessonsToRevise.length) return lastOpenLesson;
          if (1 == lessonsToRevise.length) {
            var firstProgress = user.lessonProgressMap.get(lessonsToRevise[0].id);
            var examProgress = user.lessonProgressMap.get(lastOpenLesson.id);
            var firstDate = firstProgress ? firstProgress.date : new Date();
            var examDate = examProgress ? examProgress.date : new Date();
            return firstDate < examDate ? lessonsToRevise[0] : lastOpenLesson;
          }
          var firstProgress = user.lessonProgressMap.get(lessonsToRevise[0].id);
          var secondProgress = user.lessonProgressMap.get(lessonsToRevise[1].id);
          var firstAttempts = firstProgress ? firstProgress.attempts : 0;
          var secondAttempts = secondProgress ? secondProgress.attempts : 0;
          var examProgress = user.lessonProgressMap.get(lastOpenLesson.id);
          var examAttempts = examProgress ? examProgress.attempts : 0;
          return firstAttempts < secondAttempts || firstAttempts <= examAttempts ? lessonsToRevise[0] : lastOpenLesson;
        }
        return lastOpenLesson;
      };
      StartContent.prototype.createButton = function(lesson) {
        return StartContent_1.createLessonButton(lesson, this.startLessonButtonPrefab, this.loading);
      };
      StartContent.createPreQuizButton = function(course, lessonButtonPrefab, loading) {
        var lesson = {
          id: course.id + "PreQuiz",
          image: "",
          name: util_1.Util.i18NText("Begin Quiz"),
          open: true,
          chapter: {
            id: course.id + "PreQuizChapter",
            lessons: [],
            name: course.name,
            image: "",
            course: course
          }
        };
        return StartContent_1.createLessonButton(lesson, lessonButtonPrefab, loading);
      };
      StartContent.createLessonButton = function(lesson, lessonButtonPrefab, loading) {
        var lessonButton = cc.instantiate(lessonButtonPrefab);
        var lessonButtonComp = lessonButton.getComponent(lessonButton_1.default);
        lessonButtonComp.lesson = lesson;
        lessonButtonComp.loading = loading;
        lessonButtonComp.open = true;
        return lessonButton;
      };
      var StartContent_1;
      __decorate([ property(cc.Prefab) ], StartContent.prototype, "startLessonButtonPrefab", void 0);
      __decorate([ property(cc.PageView) ], StartContent.prototype, "pageView", void 0);
      StartContent = StartContent_1 = __decorate([ ccclass ], StartContent);
      return StartContent;
    }(cc.Component);
    exports.default = StartContent;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/constants": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/services/ServiceConfig": void 0,
    "../../../common/scripts/util": void 0,
    "./lessonButton": "lessonButton"
  } ],
  startHeaderButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4cda04eVtFEeIHrF6+f3P9Y", "startHeaderButton");
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
    var chapterLessons_1 = require("./chapterLessons");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StartHeaderButton = function(_super) {
      __extends(StartHeaderButton, _super);
      function StartHeaderButton() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      StartHeaderButton.prototype.onMoreClick = function() {
        if (config_1.default.i.course.id == config_1.ASSIGNMENT_COURSE_ID) {
          chapterLessons_1.default.showType = chapterLessons_1.ChapterLessonType.Assignments;
          config_1.default.i.pushScene("menu/start/scenes/chapterLessons", "menu");
        } else config_1.default.i.pushScene("menu/start/scenes/courseChapters", "menu");
      };
      __decorate([ property(cc.Label) ], StartHeaderButton.prototype, "label", void 0);
      __decorate([ property(cc.Button) ], StartHeaderButton.prototype, "button", void 0);
      __decorate([ property(cc.Sprite) ], StartHeaderButton.prototype, "sprite", void 0);
      __decorate([ property(cc.Sprite) ], StartHeaderButton.prototype, "selected", void 0);
      __decorate([ property(cc.Button) ], StartHeaderButton.prototype, "moreButton", void 0);
      StartHeaderButton = __decorate([ ccclass ], StartHeaderButton);
      return StartHeaderButton;
    }(cc.Component);
    exports.default = StartHeaderButton;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "./chapterLessons": "chapterLessons"
  } ],
  startHeader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eb13593dUxFAI8dV1RHgoMT", "startHeader");
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
    var util_1 = require("../../../common/scripts/util");
    var startHeaderButton_1 = require("./startHeaderButton");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StartHeader = function(_super) {
      __extends(StartHeader, _super);
      function StartHeader() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.courseLayout = null;
        _this.headerButtonPrefab = null;
        _this.rightPos = null;
        _this.assignmentSprite = null;
        _this.firstSelected = true;
        return _this;
      }
      StartHeader_1 = StartHeader;
      StartHeader.prototype.onLoad = function() {
        var _this = this;
        var config = config_1.default.i;
        this.user.courseProgressMap.forEach(function(val, courseId) {
          _this.addButton(courseId, courseId == config.course.id);
        });
        this.node.width = cc.winSize.width;
        var spacing = Math.max(0, (this.courseLayout.width - this.courseLayout.childrenCount * this.courseLayout.children[0].width) / (this.courseLayout.childrenCount + 1));
        this.courseLayout.getComponent(cc.Layout).spacingX = spacing;
        this.courseLayout.getComponent(cc.Layout).paddingLeft = spacing;
        this.courseLayout.getComponent(cc.Layout).paddingRight = spacing;
      };
      StartHeader.prototype.addButton = function(courseId, selected) {
        var _this = this;
        var config = config_1.default.i;
        var headerButton = cc.instantiate(this.headerButtonPrefab);
        var headerButtonComp = headerButton.getComponent(startHeaderButton_1.default);
        headerButtonComp.selected.node.active = false;
        this.courseLayout.addChild(headerButton);
        selected && this.selectHeaderButton(headerButtonComp);
        util_1.Util.load(courseId + "/course/res/icons/" + courseId + ".png", function(err, texture) {
          headerButtonComp.sprite.spriteFrame = err ? null : new cc.SpriteFrame(texture);
        });
        var course = config.curriculum.get(courseId);
        headerButtonComp.label.string = util_1.Util.i18NText(course.name);
        headerButtonComp.button.node.on("touchend", function(event) {
          if (event.target.getComponent(cc.Button).enabled) {
            StartHeader_1.homeSelected = false;
            _this.selectHeaderButton(headerButtonComp);
            config.course = course;
            config.startCourse = course;
            _this.onCourseClick && _this.onCourseClick(courseId);
          }
        });
      };
      StartHeader.prototype.selectHeaderButton = function(newButton) {
        if (null != this.selectedHeaderButton) {
          this.selectedHeaderButton.selected.node.active = false;
          this.selectedHeaderButton.button.enabled = true;
          this.selectedHeaderButton.moreButton.node.active = false;
        }
        newButton.selected.node.active = true;
        newButton.button.enabled = false;
        newButton.moreButton.node.active = true;
        this.selectedHeaderButton = newButton;
      };
      var StartHeader_1;
      StartHeader.homeSelected = true;
      __decorate([ property(cc.Node) ], StartHeader.prototype, "courseLayout", void 0);
      __decorate([ property(cc.Prefab) ], StartHeader.prototype, "headerButtonPrefab", void 0);
      __decorate([ property(cc.Node) ], StartHeader.prototype, "rightPos", void 0);
      __decorate([ property(cc.SpriteFrame) ], StartHeader.prototype, "assignmentSprite", void 0);
      StartHeader = StartHeader_1 = __decorate([ ccclass ], StartHeader);
      return StartHeader;
    }(cc.Component);
    exports.default = StartHeader;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/util": void 0,
    "./startHeaderButton": "startHeaderButton"
  } ],
  start: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "334f2WfhThDUp2BXojJ6HNk", "start");
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
    var chimple_1 = require("../../../chimple");
    var friend_1 = require("../../../common/scripts/friend");
    var config_1 = require("../../../common/scripts/lib/config");
    var constants_1 = require("../../../common/scripts/lib/constants");
    var profile_1 = require("../../../common/scripts/lib/profile");
    var loading_1 = require("../../../common/scripts/loading");
    var ServiceConfig_1 = require("../../../common/scripts/services/ServiceConfig");
    var teacherAddedDialog_1 = require("../../../common/scripts/teacherAddedDialog");
    var util_1 = require("../../../common/scripts/util");
    var lessonButton_1 = require("./lessonButton");
    var chapterLessons_1 = require("./chapterLessons");
    var util_logger_1 = require("../../../common/scripts/util-logger");
    var assignmentPopup_1 = require("./assignmentPopup");
    var chimple_label_1 = require("../../../common/scripts/chimple-label");
    var startHeader_1 = require("./startHeader");
    var COMPLETE_AUDIOS = [ "congratulations", "excellent", "try_again", "very_good", "you_are_getting_better", "i_enjoyed_eating" ];
    var DEFAULT_AUDIOS = [ "i_am_hungry", "let_us_start_our_learning_journey", "may_i_help_you", "my_name_is_chimple" ];
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Start = function(_super) {
      __extends(Start, _super);
      function Start() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.profilePrefab = null;
        _this.loading = null;
        _this.teacherDialogPrefab = null;
        _this.bgHolder = null;
        _this.bgMusic = null;
        _this.homeButton = null;
        _this.lessonButtonPrefab = null;
        _this.content = null;
        _this.currentLesson = null;
        _this.giftBoxPrefab = null;
        _this.currentLessonButton = null;
        _this.ctx = null;
        _this.library = null;
        _this.assignmentButton = null;
        _this.featuredButton = null;
        _this.assignmentCount = null;
        _this.preTestPopup = null;
        _this.headerPrefab = null;
        _this.header = null;
        _this.rewardBg = null;
        _this.timer = 0;
        _this.flag = true;
        _this.assignPopupActive = true;
        return _this;
      }
      Start_1 = Start;
      Start.prototype.onLoad = function() {
        return __awaiter(this, void 0, void 0, function() {
          var user, loadingComp, config, startAction, mode, _a, featuredLessonsUrl;
          var _this = this;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              user = profile_1.User.getCurrentUser();
              this.bgHolder.removeAllChildren();
              cc.audioEngine.pauseMusic();
              user && user.currentBg ? this.setBackground(user.currentBg) : this.setBackground("camp");
              loadingComp = this.loading.getComponent(loading_1.default);
              loadingComp.allowCancel = false;
              config = config_1.default.i;
              if (config.course) {
                config.unsetRewardChapter();
                config.course = config.startCourse;
              } else {
                config.course = this.getNextCourse();
                config.startCourse = config.course;
              }
              startAction = config.startAction;
              user.curriculumLoaded ? this.initPage() : config.loadCourseJsons(user, this.node, this.initPage.bind(this));
              util_1.Util.loadFriend(function(node) {
                _this.friend = node;
                node.scale = .8;
                _this.node.addChild(_this.friend);
                node.y = -cc.winSize.height / 2 + 16;
                node.x = cc.winSize.width / 3.25;
                util_1.Util.loadAccessoriesAndEquipAcc(node.children[1], node);
                var friendComp = _this.friend.getComponent(friend_1.default);
                switch (startAction) {
                 case config_1.StartAction.Start:
                  friendComp.helpFile = "start";
                  break;

                 case config_1.StartAction.MoveLessonPlan:
                 case config_1.StartAction.LessonComplete:
                  friendComp.helpFile = COMPLETE_AUDIOS[Math.floor(Math.random() * COMPLETE_AUDIOS.length)];
                  break;

                 case config_1.StartAction.Default:
                  friendComp.helpFile = DEFAULT_AUDIOS[Math.floor(Math.random() * DEFAULT_AUDIOS.length)];
                }
                friendComp.speakHelp(true);
              });
              chapterLessons_1.default.showType = chapterLessons_1.ChapterLessonType.Library;
              util_logger_1.default.syncFmcTokenForUsers();
              mode = parseInt(profile_1.default.getValue(profile_1.CURRENTMODE));
              if (!(mode != constants_1.Mode.School)) return [ 3, 2 ];
              _a = this;
              return [ 4, ServiceConfig_1.ServiceConfig.getI().handle.listAssignments(user.id) ];

             case 1:
              _a.assignments = _b.sent();
              config.assignments = this.assignments;
              if (config.assignments.length > 0 || !user.isConnected) {
                if (config.assignments.length > 0 && !user.isConnected) {
                  user.isConnected = true;
                  user.storeUser();
                }
                !this.assignmentButton || (this.assignmentButton.interactable = true);
              }
              if (user.isConnected && config.assignments.length > 0) {
                this.previousHash = util_1.Util.getHash(this.assignments[0].assignmentId);
                try {
                  this.assignmentCount.active = true;
                  this.checkPendingAssignments();
                } catch (e) {}
              }
              featuredLessonsUrl = "https://raw.githubusercontent.com/chimple/chimple/master/featured_lessons.json";
              cc.assetManager.loadRemote(featuredLessonsUrl, function(err, jsonAsset) {
                if (!err && jsonAsset && jsonAsset.json) {
                  config.featuredLessons = jsonAsset.json;
                  config.featuredLessons.length > 0 && _this.featuredButton && (_this.featuredButton.interactable = true);
                }
              });
              _b.label = 2;

             case 2:
              this.gift = cc.instantiate(this.giftBoxPrefab);
              this.displayCurrentReward();
              return [ 2 ];
            }
          });
        });
      };
      Start.prototype.initPage = function() {
        var user = profile_1.User.getCurrentUser();
        var config = config_1.default.i;
        this.createAndDisplayLessonPlan();
        null != user.currentReward && 0 != user.currentReward.length || (user.currentReward = this.getNextReward());
        this.displayCurrentReward();
        config_1.default.isMicroLink || (this.loading.active = false);
        this.registerTeacherDialogCloseEvent();
        var headerNode = cc.instantiate(this.headerPrefab);
        var headerComp = headerNode.getComponent(startHeader_1.default);
        headerComp.user = user;
        headerComp.onCourseClick = this.onCourseClick.bind(this);
        this.header.addChild(headerNode);
      };
      Start.prototype.createAndDisplayLessonPlan = function() {
        var user = profile_1.User.getCurrentUser();
        var config = config_1.default.i;
        var courseProgressMap = user.courseProgressMap.get(config.course.id);
        if (courseProgressMap.lessonPlan && courseProgressMap.lessonPlan.length > 0 && courseProgressMap.lessonPlanIndex <= courseProgressMap.lessonPlan.length) this.displayLessonPlan(); else {
          this.createLessonPlan(config.course.id);
          this.displayLessonPlan();
        }
      };
      Start.prototype.getNextCourse = function() {
        var cpm = profile_1.User.getCurrentUser().courseProgressMap;
        var ar = Array.from(cpm.keys());
        try {
          ar.sort(function(a, b) {
            return cpm.get(a).date.getTime() - cpm.get(b).date.getTime();
          });
        } catch (error) {
          cc.log(error);
        }
        return config_1.default.i.curriculum.get(ar[0]);
      };
      Start.prototype.registerTeacherDialogCloseEvent = function() {
        var _this = this;
        this.node.on(teacherAddedDialog_1.TEACHER_ADD_DIALOG_CLOSED, function(event) {
          return __awaiter(_this, void 0, void 0, function() {
            var _this = this;
            return __generator(this, function(_a) {
              event.stopPropagation();
              this.scheduleOnce(function() {
                _this.showTeacherDialog();
              }, 1);
              return [ 2 ];
            });
          });
        });
      };
      Start.prototype.setBackground = function(bgprefabName) {
        var _this = this;
        cc.resources.load("backgrounds/prefabs/" + bgprefabName, function(err, sp) {
          var bgPrefabInstance = cc.instantiate(sp);
          bgPrefabInstance.y = 0;
          bgPrefabInstance.x = 0;
          _this.bgHolder.addChild(bgPrefabInstance);
        });
      };
      Start.prototype.loadLesson = function(data) {
        if (config_1.default.isMicroLink && data && data.length > 0) {
          var user = profile_1.User.getCurrentUser();
          var courseDetails = data.splice(data.length - 1, data.length)[0];
          if (cc.sys.isNative) if (config_1.COURSES_LANG_ID.includes(courseDetails["courseid"])) {
            var courseProgress = user.courseProgressMap.get(courseDetails["courseid"]);
            this.openDirectLesson(courseDetails);
          } else this.openDirectLesson(courseDetails); else this.openDirectLesson(courseDetails);
        }
      };
      Start.prototype.openDirectLesson = function(courseDetails) {
        this.loading.active = true;
        var input = {
          courseid: courseDetails["courseid"],
          chapterid: courseDetails["chapterid"],
          lessonid: courseDetails["lessonid"],
          assignmentid: courseDetails["assignmentid"] || null
        };
        util_1.Util.loadDirectLessonWithLink(input, this.node);
      };
      Start.prototype.showTeacherDialog = function() {
        try {
          var messageStr = cc.sys.localStorage.getItem(chimple_1.RECEIVED_TEACHER_REQUEST) || "[]";
          var messages = JSON.parse(messageStr);
          cc.log("showTeacherDialog", messageStr);
          if (messages && messages.length > 0) {
            var curMessage = messages.splice(0, 1)[0];
            var name = curMessage[chimple_1.TEACHER_NAME_KEY];
            var id = curMessage[chimple_1.TEACHER_ID_KEY];
            var sectionId = curMessage[chimple_1.TEACHER_SECTION_ID];
            var addStudentId = curMessage[chimple_1.TEACHER_ADD_STUDENT_ID];
            cc.sys.localStorage.setItem(chimple_1.RECEIVED_TEACHER_REQUEST, JSON.stringify(messages));
            var tKey = chimple_1.ACCEPT_TEACHER_REQUEST_LINKED_USED + id;
            var teacherRequestsAccepted = JSON.parse(cc.sys.localStorage.getItem(tKey) || "[]");
            var buildLink = id + "|" + sectionId + "|" + addStudentId;
            var linkUsed = teacherRequestsAccepted.includes(buildLink);
            cc.log("checking if received teacher request link " + buildLink + "  is used " + linkUsed);
            if (!!id && !!name && !!sectionId && !!addStudentId && !linkUsed) {
              var teacherDialog = cc.instantiate(this.teacherDialogPrefab);
              var script = teacherDialog.getComponent(teacherAddedDialog_1.default);
              script.TeacherName = name;
              script.TeacherId = id;
              script.SelectedSectionId = sectionId;
              script.SelectedAddStudentId = addStudentId;
              script.validate().length > 0 && this.node.addChild(teacherDialog);
            }
          }
        } catch (e) {}
      };
      Start.prototype.setUpTeacherDialog = function() {
        this.showTeacherDialog();
      };
      Start.prototype.onProfileClick = function(event, customEventData) {
        var node = event.target;
        var button = node.getComponent(cc.Button);
        button && (button.interactable = false);
        config_1.default.i.pushScene("menu/rewards/scenes/rewards", "menu");
      };
      Start.prototype.onDairyRewardClick = function(event, customEventData) {
        var node = event.target;
        var button = node.getComponent(cc.Button);
        button && (button.interactable = false);
        config_1.default.i.pushScene("menu/rewards/scenes/dairyrewards", "menu");
      };
      Start.prototype.onAssignmentsClick = function() {
        chapterLessons_1.default.showType = chapterLessons_1.ChapterLessonType.Assignments;
        config_1.default.i.pushScene("menu/Profile/scene/leaderboardProfile", "menu");
      };
      Start.prototype.onFeaturedClick = function() {
        chapterLessons_1.default.showType = chapterLessons_1.ChapterLessonType.Featured;
        config_1.default.i.pushScene("menu/start/scenes/chapterLessons", "menu");
      };
      Start.prototype.onLibraryClick = function() {
        this.node.getChildByName("library_button").getComponent(cc.Button).interactable = false;
        config_1.default.i.pushScene("menu/start/scenes/courseChapters", "menu");
      };
      Start.prototype.onCourseClick = function() {
        this.ctx.clear(true);
        this.createAndDisplayLessonPlan();
      };
      Start.prototype.createLessonPlan = function(courseId) {
        var user = profile_1.User.getCurrentUser();
        var courseProgress = user.courseProgressMap.get(courseId);
        var course = config_1.default.i.curriculum.get(courseId);
        if (courseId == config_1.ASSIGNMENT_COURSE_ID) {
          var lessonPlan = config_1.default.i.getAssignmentLessonsTodo();
          if (null != lessonPlan && lessonPlan.length > 0) {
            courseProgress.lessonPlan = lessonPlan.slice(0, Math.min(5, lessonPlan.length)).map(function(les) {
              return les.id;
            });
            courseProgress.lessonPlanIndex = 0;
            courseProgress.lessonPlanDate = new Date();
            user.storeUser();
          }
        } else {
          var currentChapter = course.chapters.find(function(chapter) {
            return chapter.id == courseProgress.currentChapterId;
          });
          !currentChapter || courseProgress.currentLessonId && currentChapter.lessons.find(function(l) {
            return l.id == courseProgress.currentLessonId;
          }) || (courseProgress.currentLessonId = currentChapter.lessons[0].id);
          var lessons;
          if ("puzzle" == course.id) {
            lessons = [];
            course.chapters.forEach(function(ch) {
              var puzLes = ch.lessons.find(function(l, i, ls) {
                return !user.lessonProgressMap.has(l.id) || i + 1 == ls.length;
              });
              puzLes && lessons.push(puzLes);
            });
          } else if (courseProgress.currentChapterId) {
            lessons = this.getLessonsForPlan(currentChapter, courseProgress.currentLessonId);
            if (!lessons || 0 == lessons.length) {
              courseProgress.currentLessonId = currentChapter.lessons[0].id;
              lessons = this.getLessonsForPlan(currentChapter, courseProgress.currentLessonId);
            }
          } else lessons = [ Start_1.preQuizLesson(course) ];
          courseProgress.lessonPlan = lessons.map(function(l) {
            return l.id;
          });
          courseProgress.lessonPlanIndex = 0;
          courseProgress.lessonPlanDate = new Date();
          user.storeUser();
        }
      };
      Start.prototype.getLessonsForPlan = function(currentChapter, currentLessonId) {
        var lessons;
        var foundCurrentChapter = false;
        var foundChallenge = false;
        lessons = currentChapter.lessons.filter(function(lesson) {
          foundCurrentChapter || lesson.id != currentLessonId || (foundCurrentChapter = true);
          if (foundCurrentChapter && !foundChallenge) {
            foundChallenge || lesson.type != constants_1.EXAM || (foundChallenge = true);
            return true;
          }
          return false;
        });
        return lessons;
      };
      Start.prototype.checkPendingAssignments = function() {
        var count = 0;
        for (var _i = 0, _a = config_1.default.i.assignments; _i < _a.length; _i++) {
          var assign = _a[_i];
          var lesson = config_1.default.i.allLessons.get(assign.lessonId);
          if (!!lesson) {
            lesson.assignmentId = assign.assignmentId;
            var lessonProgress = profile_1.User.getCurrentUser().lessonProgressMap.get(assign.lessonId);
            lessonProgress ? lessonProgress && ![].concat(lessonProgress.assignmentIds).includes(assign.assignmentId) && count++ : count++;
          }
        }
        this.assignmentCount.getChildByName("count").getComponent(cc.Label).string = count.toString();
      };
      Start.prototype.displayLessonPlan = function() {
        var _this = this;
        var user = profile_1.User.getCurrentUser();
        var courseProgressMap = user.courseProgressMap.get(config_1.default.i.course.id);
        this.content.removeAllChildren();
        if (null != courseProgressMap.lessonPlan && courseProgressMap.lessonPlan.length > 0) {
          this.node.getChildByName("rewardBg").active = true;
          this.node.getChildByName("giftBox").active = true;
          var planWidth = cc.winSize.width - 128;
          var x1_1 = -planWidth / 2;
          var y1_1 = -172;
          var x2_1 = planWidth / 4;
          var y2_1 = -172;
          var x3_1 = -planWidth / 4;
          var y3_1 = 172;
          var x4_1 = planWidth / 2;
          var y4_1 = 172;
          this.ctx.moveTo(x1_1, y1_1);
          this.ctx.bezierCurveTo(x2_1, y2_1, x3_1, y3_1, x4_1, y4_1);
          this.ctx.stroke();
          courseProgressMap.lessonPlan.forEach(function(lessonId, index, lessons) {
            var node = Start_1.createLessonButton(lessonId.endsWith("_PreQuiz") ? Start_1.preQuizLesson(config_1.default.i.curriculum.get(lessonId.split("_")[0])) : config_1.default.i.allLessons.get(lessonId), _this.lessonButtonPrefab, _this.loading, index <= courseProgressMap.lessonPlanIndex);
            var t = index / lessons.length;
            node.x = Math.pow(1 - t, 3) * x1_1 + 3 * Math.pow(1 - t, 2) * t * x2_1 + 3 * (1 - t) * Math.pow(t, 2) * x3_1 + Math.pow(t, 3) * x4_1;
            node.y = Math.pow(1 - t, 3) * y1_1 + 3 * Math.pow(1 - t, 2) * t * y2_1 + 3 * (1 - t) * Math.pow(t, 2) * y3_1 + Math.pow(t, 3) * y4_1;
            node.scale = .75;
            _this.content.addChild(node);
            if (index == courseProgressMap.lessonPlanIndex) {
              var currentLessonNode = cc.instantiate(_this.currentLessonButton);
              var animationCmp = currentLessonNode.getComponent(cc.Animation);
              animationCmp.play("level_play_button").repeatCount = 20;
              currentLessonNode.y = 80;
              currentLessonNode.scale = 1;
              var lessonButton_2 = node.getComponent(lessonButton_1.default);
              if (lessonButton_2) {
                var clsprite = currentLessonNode.getChildByName("play button");
                var clButton = clsprite.addComponent(cc.Button);
                clButton.transition = cc.Button.Transition.SCALE;
                clButton.node.on("touchend", function(event) {
                  if (lessonButton_2.button.interactable) {
                    animationCmp.stop("level_play_button");
                    _this.node.getChildByName("beginQuizPopup").active = false;
                    lessonButton_2.onClick();
                  }
                });
              }
              node.addChild(currentLessonNode);
              if (config_1.default.i.startAction == config_1.StartAction.MoveLessonPlan && index > 0) {
                var prevNode = _this.content.children[index - 1];
                var currentPos = currentLessonNode.position.clone();
                currentLessonNode.position = node.convertToNodeSpaceAR(prevNode.convertToWorldSpaceAR(cc.v3(0, 300, 0)));
                currentLessonNode.runAction(cc.bezierTo(1, [ cc.v2(currentLessonNode.position.x, currentPos.y + 200), cc.v2(currentPos.x, currentPos.y + 100), cc.v2(currentPos) ]));
              }
            }
          });
          this.gift = cc.instantiate(this.giftBoxPrefab);
          this.gift.x = Math.pow(0, 3) * x1_1 + 3 * Math.pow(0, 2) * 1 * x2_1 + 0 * Math.pow(1, 2) * x3_1 + Math.pow(1, 3) * x4_1;
          this.gift.y = Math.pow(0, 3) * y1_1 + 3 * Math.pow(0, 2) * 1 * y2_1 + 0 * Math.pow(1, 2) * y3_1 + Math.pow(1, 3) * y4_1;
          void 0 == this.node.getChildByName("giftBox").getChildByName(this.gift.name) && this.node.getChildByName("giftBox").addChild(this.gift);
          void 0 != this.node.getChildByName("giftBox").children[0].getChildByName("New Node") && this.node.getChildByName("giftBox").children[0].getChildByName("New Node").setContentSize(64, 64);
          courseProgressMap.lessonPlanIndex == courseProgressMap.lessonPlan.length && this.giveReward(this.gift, user);
          config_1.default.i.startAction = config_1.StartAction.Default;
        } else {
          this.node.getChildByName("rewardBg").active = false;
          this.node.getChildByName("giftBox").active = false;
          var label = new cc.Node();
          var chimpleLabel = label.addComponent(chimple_label_1.default);
          chimpleLabel.string = "No lessons found. Try another subject";
          this.content.addChild(label);
        }
      };
      Start.prototype.onBeginQuizCancelClick = function() {
        this.node.getChildByName("beginQuizPopup").active = false;
      };
      Start.prototype.onBeginQuizButtonClicked = function() {
        var lessonButton = this.beginQuiz.getComponent(lessonButton_1.default);
        lessonButton.onClick();
        this.loading.active = true;
      };
      Start.prototype.giveReward = function(node, user) {
        var _this = this;
        var seq = cc.repeat(cc.sequence(cc.scaleTo(.3, 1.2, 1.2), cc.scaleTo(.3, 1, 1)), 100);
        node.runAction(seq);
        this.node.getChildByName("beginQuizPopup").active = false;
        this.node.getChildByName("block").active = true;
        new cc.Tween().target(node).to(.5, {
          position: cc.Vec3.ZERO
        }, null).start();
        this.node.getChildByName("giftBox").once("touchend", function() {
          new cc.Tween().target(node).call(function() {
            var anim = node.getComponent(cc.Animation);
            anim.play();
          }).delay(2).call(function() {
            _this.unlockCurrentReward();
          }).start();
        });
      };
      Start.createPreQuizButton = function(course, lessonButtonPrefab, loading, open) {
        var lesson = {
          id: course.id + "_PreQuiz",
          image: "",
          name: course.name,
          open: open,
          chapter: {
            id: course.id + "_PreQuizChapter",
            lessons: [],
            name: course.name,
            image: "",
            course: course
          }
        };
        return Start_1.createLessonButton(lesson, lessonButtonPrefab, loading, open);
      };
      Start.preQuizLesson = function(course) {
        return {
          id: course.id + "_PreQuiz",
          image: "",
          name: course.name,
          open: true,
          chapter: {
            id: course.id + "_PreQuizChapter",
            lessons: [],
            name: course.name,
            image: "",
            course: course
          }
        };
      };
      Start.createLessonButton = function(lesson, lessonButtonPrefab, loading, open) {
        var lessonButton = cc.instantiate(lessonButtonPrefab);
        var lessonButtonComp = lessonButton.getComponent(lessonButton_1.default);
        lessonButtonComp.lesson = lesson;
        lessonButtonComp.loading = loading;
        lessonButtonComp.open = open;
        return lessonButton;
      };
      Start.prototype.onDisable = function() {
        var friendComp = this.friend.getComponent(friend_1.default);
        friendComp.stopAudio();
      };
      Start.prototype.onDestroy = function() {
        cc.audioEngine.stopMusic();
      };
      Start.prototype.showAssignmentPopup = function(pendingAssignment) {
        return __awaiter(this, void 0, void 0, function() {
          var user, _a, currentHash, assignmentPopupNode, assignmentPopupNode;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              if (!(this.flag && !config_1.default.isMicroLink)) return [ 3, 2 ];
              this.flag = false;
              user = profile_1.User.getCurrentUser();
              _a = this;
              return [ 4, ServiceConfig_1.ServiceConfig.getI().handle.listAssignments(user.id) ];

             case 1:
              _a.assignments = _b.sent();
              if (this.assignments.length > 0 && !pendingAssignment) {
                currentHash = util_1.Util.getHash(this.assignments[0].assignmentId);
                config_1.default.i.assignments = this.assignments;
                if (this.previousHash != currentHash) {
                  this.previousHash = currentHash;
                  assignmentPopupNode = this.node.getChildByName("assignment_popup");
                  if (false == assignmentPopupNode.active) {
                    assignmentPopupNode.getComponent(assignmentPopup_1.default).msg.getComponent(chimple_label_1.default).string = "New assignment has been assigned to you";
                    assignmentPopupNode.active = true;
                  }
                }
              }
              if (pendingAssignment) try {
                assignmentPopupNode = this.node.getChildByName("assignment_popup");
                if (false == assignmentPopupNode.active) {
                  assignmentPopupNode.getComponent(assignmentPopup_1.default).msg.getComponent(chimple_label_1.default).string = "You have pending assignments";
                  assignmentPopupNode.active = true;
                }
              } catch (e) {}
              this.flag = true;
              _b.label = 2;

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      Start.prototype.getNextReward = function() {
        var course = config_1.default.i.curriculum.get("reward");
        for (var _i = 0, _a = course.chapters; _i < _a.length; _i++) {
          var chapter = _a[_i];
          for (var _b = 0, _c = chapter.lessons; _b < _c.length; _b++) {
            var lesson = _c[_b];
            if (!profile_1.User.getCurrentUser().unlockedRewards[util_1.REWARD_TYPES[4] + "-" + chapter.id + "-" + lesson.id]) return [ util_1.REWARD_TYPES[4], chapter.id, lesson.id ];
            for (var _d = 0, _e = lesson.skills; _d < _e.length; _d++) {
              var single = _e[_d];
              if (!profile_1.User.getCurrentUser().unlockedRewards[util_1.REWARD_TYPES[4] + "-" + chapter.id + "-" + lesson.id + "-" + single]) return [ util_1.REWARD_TYPES[4], chapter.id, lesson.id, single ];
            }
          }
        }
        return [];
      };
      Start.prototype.displayCurrentReward = function() {
        var _this = this;
        if (this.gift) {
          var currentReward_1 = profile_1.User.getCurrentUser().currentReward;
          switch (currentReward_1[0]) {
           case util_1.REWARD_TYPES[0]:
            cc.resources.load("char_icons/" + currentReward_1[1] + "_icon", function(err, sp) {
              var image = new cc.Node();
              var imageComp = image.addComponent(cc.Sprite);
              imageComp.spriteFrame = new cc.SpriteFrame(sp);
              _this.gift.addChild(image);
              util_1.Util.resizeSprite(imageComp, 64, 64);
              _this.toAddGiftBoxNode(image, sp);
            });
            break;

           case util_1.REWARD_TYPES[1]:
            cc.resources.load("backgrounds/textures/bg_icons/background-" + currentReward_1[1], function(err, sp) {
              var image = new cc.Node();
              var imageComp = image.addComponent(cc.Sprite);
              imageComp.spriteFrame = new cc.SpriteFrame(sp);
              _this.gift.addChild(image);
              util_1.Util.resizeSprite(imageComp, 64, 64);
              _this.toAddGiftBoxNode(image, sp);
            });
            break;

           case util_1.REWARD_TYPES[2]:
            break;

           case util_1.REWARD_TYPES[3]:
            cc.resources.load(util_1.INVENTORY_ICONS[currentReward_1[2]] + currentReward_1[3], function(err, sp) {
              if (err) cc.log(JSON.stringify(err)); else {
                var image = new cc.Node();
                var imageComp = image.addComponent(cc.Sprite);
                imageComp.spriteFrame = new cc.SpriteFrame(sp);
                _this.gift.addChild(image);
                util_1.Util.resizeSprite(imageComp, 64, 64);
                _this.toAddGiftBoxNode(image, sp);
              }
            });
            break;

           case util_1.REWARD_TYPES[4]:
            if ("sticker" == currentReward_1[1]) config_1.default.loadBundle(currentReward_1[2], function(bundle) {
              bundle.load("res/" + currentReward_1[1] + "-" + currentReward_1[2], cc.Texture2D, function(err, asset) {
                if (err) cc.log(JSON.stringify(err)); else {
                  var image = new cc.Node();
                  var imageComp = image.addComponent(cc.Sprite);
                  imageComp.spriteFrame = new cc.SpriteFrame(asset);
                  _this.rewardBg.addChild(image);
                }
              });
              bundle.load("res/" + currentReward_1[3], cc.Texture2D, function(err, asset) {
                if (err) cc.log(JSON.stringify(err)); else {
                  var image = new cc.Node();
                  var imageComp = image.addComponent(cc.Sprite);
                  imageComp.spriteFrame = new cc.SpriteFrame(asset);
                  _this.gift.addChild(image);
                  util_1.Util.resizeSprite(imageComp, 64, 64);
                  _this.toAddGiftBoxNode(image, asset);
                }
              });
            }, function(err) {
              err && cc.log(JSON.stringify(err));
            }); else {
              var image_1 = new cc.Node();
              var imageComp_1 = image_1.addComponent(cc.Sprite);
              imageComp_1.spriteFrame = new cc.SpriteFrame();
              var lesson = config_1.default.i.allLessons.get(currentReward_1[2]);
              util_1.Util.load("reward/course/res/icons/" + lesson.image, function(err, texture) {
                if (!err) {
                  imageComp_1.spriteFrame = new cc.SpriteFrame(texture);
                  _this.gift.addChild(image_1);
                  util_1.Util.resizeSprite(imageComp_1, 64, 64);
                  _this.toAddGiftBoxNode(image_1, texture);
                }
              });
            }
          }
        }
      };
      Start.prototype.toAddGiftBoxNode = function(image, type) {
        if (void 0 == this.node.getChildByName("giftBox").getChildByName(this.gift.name)) {
          this.node.getChildByName("giftBox").addChild(this.gift);
          var planWidth = cc.winSize.width - 128;
          var x1 = -planWidth / 2;
          var y1 = -172;
          var x2 = planWidth / 4;
          var y2 = -172;
          var x3 = -planWidth / 4;
          var y3 = 172;
          var x4 = planWidth / 2;
          var y4 = 172;
          this.gift.x = Math.pow(0, 3) * x1 + 3 * Math.pow(0, 2) * 1 * x2 + 0 * Math.pow(1, 2) * x3 + Math.pow(1, 3) * x4;
          this.gift.y = Math.pow(0, 3) * y1 + 3 * Math.pow(0, 2) * 1 * y2 + 0 * Math.pow(1, 2) * y3 + Math.pow(1, 3) * y4;
          this.node.getChildByName("giftBox").children[0].getChildByName(image.name).setContentSize(64, 64);
        } else if (void 0 != this.node.getChildByName("giftBox").children[0].getChildByName(image.name)) {
          this.node.getChildByName("giftBox").children[0].getChildByName(image.name).getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(type);
          this.node.getChildByName("giftBox").children[0].getChildByName(image.name).setContentSize(64, 64);
        }
      };
      Start.prototype.unlockCurrentReward = function() {
        var currentReward = profile_1.User.getCurrentUser().currentReward;
        profile_1.User.getCurrentUser().unlockRewardsForItem(currentReward.join("-"), 1);
        var cpm = profile_1.User.getCurrentUser().courseProgressMap.get(config_1.default.i.course.id);
        cpm.lessonPlan = [];
        cpm.lessonPlanIndex = 0;
        profile_1.User.getCurrentUser().currentReward = null;
        switch (currentReward[0]) {
         case util_1.REWARD_TYPES[0]:
         case util_1.REWARD_TYPES[1]:
          config_1.default.i.pushScene("menu/rewards/scenes/rewards", "menu");
          break;

         case util_1.REWARD_TYPES[2]:
          break;

         case util_1.REWARD_TYPES[3]:
          config_1.default.getInstance().pushScene("menu/inventory/scenes/inventory", "menu");
          break;

         case util_1.REWARD_TYPES[4]:
          config_1.default.i.setRewardChapter(currentReward[1]);
          util_1.Util.loadLesson(config_1.default.i.allLessons.get(currentReward[2]), this.loading, this.node);
        }
      };
      Start.prototype.update = function(dt) {
        if (chimple_1.RECEIVED_TEACHER_REQUESTS) {
          chimple_1.RECEIVED_TEACHER_REQUESTS = false;
          this.setUpTeacherDialog();
        } else if (config_1.default.isMicroLink) {
          var dataStr = cc.sys.localStorage.getItem(chimple_1.MICROLINK);
          cc.sys.localStorage.removeItem(chimple_1.MICROLINK);
          if (!!dataStr && dataStr.length > 0) {
            var data = JSON.parse(dataStr) || [];
            data && data.length > 0 && this.loadLesson(data);
          }
        }
      };
      var Start_1;
      __decorate([ property(cc.Prefab) ], Start.prototype, "profilePrefab", void 0);
      __decorate([ property(cc.Node) ], Start.prototype, "loading", void 0);
      __decorate([ property(cc.Prefab) ], Start.prototype, "teacherDialogPrefab", void 0);
      __decorate([ property(cc.Node) ], Start.prototype, "bgHolder", void 0);
      __decorate([ property(cc.AudioClip) ], Start.prototype, "bgMusic", void 0);
      __decorate([ property(cc.Node) ], Start.prototype, "homeButton", void 0);
      __decorate([ property(cc.Prefab) ], Start.prototype, "lessonButtonPrefab", void 0);
      __decorate([ property(cc.Node) ], Start.prototype, "content", void 0);
      __decorate([ property(cc.SpriteFrame) ], Start.prototype, "currentLesson", void 0);
      __decorate([ property(cc.Prefab) ], Start.prototype, "giftBoxPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Start.prototype, "currentLessonButton", void 0);
      __decorate([ property(cc.Graphics) ], Start.prototype, "ctx", void 0);
      __decorate([ property(cc.Label) ], Start.prototype, "library", void 0);
      __decorate([ property(cc.Sprite) ], Start.prototype, "librarySprite", void 0);
      __decorate([ property(cc.Button) ], Start.prototype, "assignmentButton", void 0);
      __decorate([ property(cc.Button) ], Start.prototype, "featuredButton", void 0);
      __decorate([ property(cc.Node) ], Start.prototype, "assignmentCount", void 0);
      __decorate([ property(cc.Prefab) ], Start.prototype, "preTestPopup", void 0);
      __decorate([ property(cc.Prefab) ], Start.prototype, "headerPrefab", void 0);
      __decorate([ property(cc.Node) ], Start.prototype, "header", void 0);
      __decorate([ property(cc.Node) ], Start.prototype, "rewardBg", void 0);
      Start = Start_1 = __decorate([ ccclass ], Start);
      return Start;
    }(cc.Component);
    exports.default = Start;
    cc._RF.pop();
  }, {
    "../../../chimple": void 0,
    "../../../common/scripts/chimple-label": void 0,
    "../../../common/scripts/friend": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/constants": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/loading": void 0,
    "../../../common/scripts/services/ServiceConfig": void 0,
    "../../../common/scripts/teacherAddedDialog": void 0,
    "../../../common/scripts/util": void 0,
    "../../../common/scripts/util-logger": void 0,
    "./assignmentPopup": "assignmentPopup",
    "./chapterLessons": "chapterLessons",
    "./lessonButton": "lessonButton",
    "./startHeader": "startHeader"
  } ],
  stickerBookList: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6f3c6AXgtZCD7Eb3Hkaas4J", "stickerBookList");
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StickerBookList = function(_super) {
      __extends(StickerBookList, _super);
      function StickerBookList() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.stickerIconPrefab = null;
        _this.stickerBookIconScrollView = null;
        _this.config = config_1.default.i;
        return _this;
      }
      StickerBookList.prototype.onLoad = function() {
        for (var i = 0; i < this.config.stickerBook.length; i++) {
          var stickerBookIcon = cc.instantiate(this.stickerIconPrefab);
          stickerBookIcon.name = i.toString();
          this.stickerBookIconScrollView.addChild(stickerBookIcon);
        }
        this.stickerBookIconScrollView.width = 1024;
        this.stickerBookIconScrollView.parent.width = this.stickerBookIconScrollView.width;
        this.stickerBookIconScrollView.parent.parent.width = this.stickerBookIconScrollView.width;
        this.stickerBookIconScrollView.getComponent(cc.Layout).updateLayout();
        this.stickerBookIconScrollView.parent.height = this.stickerBookIconScrollView.height;
      };
      StickerBookList.prototype.onDairyRewardClick = function() {
        this.node.getChildByName("dairyRewardIcon").getComponent(cc.Button).interactable = false;
        config_1.default.i.popScene();
      };
      __decorate([ property(cc.Prefab) ], StickerBookList.prototype, "stickerIconPrefab", void 0);
      __decorate([ property(cc.Node) ], StickerBookList.prototype, "stickerBookIconScrollView", void 0);
      StickerBookList = __decorate([ ccclass ], StickerBookList);
      return StickerBookList;
    }(cc.Component);
    exports.default = StickerBookList;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0
  } ]
}, {}, [ "leaderboardProfile", "profileOtpDialog", "home", "hotUpdate", "inventory", "item", "character", "level-indicator", "map", "mapBar", "dairyrewards", "oldrewards", "rewards", "stickerBookList", "assignmentPopup", "chapterContent", "chapterLessons", "chapterMenuButton", "courseChapters", "courseContent", "drawer", "lessonButton", "picDisplayPrefab", "preTestDialog", "start", "startContent", "startHeader", "startHeaderButton" ]);