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
  ApiHandler: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b373f71AwxMQ771vGzZA50o", "ApiHandler");
    "use strict";
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
    exports.ApiHandler = void 0;
    var ApiHandler = function() {
      function ApiHandler() {}
      ApiHandler.getInstance = function(s) {
        if (!ApiHandler.i) {
          ApiHandler.i = new ApiHandler();
          ApiHandler.i.s = s;
        }
        return ApiHandler.i;
      };
      ApiHandler.prototype.updateProgress = function(info) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, this.s.updateProgress(info) ];

             case 1:
              return [ 2, _a.sent() ];
            }
          });
        });
      };
      ApiHandler.prototype.teacherRequestAccepted = function(request) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, this.s.teacherRequestAccepted(request) ];

             case 1:
              return [ 2, _a.sent() ];
            }
          });
        });
      };
      ApiHandler.prototype.schoolById = function(id) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, this.s.schoolById(id) ];

             case 1:
              return [ 2, _a.sent() ];
            }
          });
        });
      };
      ApiHandler.prototype.updateHomeTeacher = function(info) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, this.s.updateHomeTeacher(info) ];

             case 1:
              return [ 2, _a.sent() ];
            }
          });
        });
      };
      ApiHandler.prototype.listAssignments = function(studentId, limit) {
        void 0 === limit && (limit = 10);
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, this.s.listAssignments(studentId, limit) ];

             case 1:
              return [ 2, _a.sent() ];
            }
          });
        });
      };
      ApiHandler.prototype.linkStudent = function(studentId, code, phoneNumber, age, name, countryCode) {
        void 0 === phoneNumber && (phoneNumber = null);
        void 0 === age && (age = null);
        void 0 === name && (name = null);
        void 0 === countryCode && (countryCode = null);
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, this.s.linkStudent(studentId, code, phoneNumber, age, name, countryCode) ];

             case 1:
              return [ 2, _a.sent() ];
            }
          });
        });
      };
      ApiHandler.prototype.syncFailedProgresses = function(infos) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, this.s.syncFailedProgresses(infos) ];

             case 1:
              return [ 2, _a.sent() ];
            }
          });
        });
      };
      ApiHandler.prototype.getLeaderboard = function(studentId, sectionId, schoolId) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, this.s.getLeaderboard(studentId, sectionId, schoolId) ];

             case 1:
              return [ 2, _a.sent() ];
            }
          });
        });
      };
      return ApiHandler;
    }();
    exports.ApiHandler = ApiHandler;
    cc._RF.pop();
  }, {} ],
  FirebaseApi: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d6bf5Voqq5Acr6MVa+HyvOb", "FirebaseApi");
    "use strict";
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
    exports.FirebaseApi = void 0;
    var ParseNetwork_1 = require("./ParseNetwork");
    var queue_1 = require("../../../queue");
    var parseConstants_1 = require("../domain/parseConstants");
    var profile_1 = require("../lib/profile");
    var util_logger_1 = require("../util-logger");
    var constants_1 = require("../lib/constants");
    var FirebaseApi = function() {
      function FirebaseApi() {}
      FirebaseApi.getInstance = function() {
        FirebaseApi.i || (FirebaseApi.i = new FirebaseApi());
        return FirebaseApi.i;
      };
      FirebaseApi.prototype.getAuthHeader = function() {
        var authHeader = {
          Accept: "application/json"
        };
        return authHeader;
      };
      FirebaseApi.prototype.teacherRequestAccepted = function(request) {
        return __awaiter(this, void 0, void 0, function() {
          var updateHomeTeacherInfo;
          return __generator(this, function(_a) {
            if (!!request.teacherId) {
              updateHomeTeacherInfo = {
                homeId: request.studentId,
                teacherId: request.teacherId,
                kind: "UpdateHomeTeacher",
                firebaseStudentId: request.firebaseStudentId,
                studentName: request.studentName,
                schoolId: request.teacherId,
                sectionId: request.sectionId
              };
              queue_1.Queue.getInstance().push(updateHomeTeacherInfo);
            }
            return [ 2 ];
          });
        });
      };
      FirebaseApi.prototype.updateProgress = function(info) {
        return __awaiter(this, void 0, Promise, function() {
          var user, requestParams;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!(info.studentId && info.studentId.length > 0)) return [ 3, 2 ];
              user = profile_1.User.getCurrentUser();
              requestParams = {
                url: parseConstants_1.FIREBASE_UPDATE_PROGRESS_URL,
                body: {
                  chapterId: info.chapter,
                  chapterName: info.chapterName,
                  lessonName: info.lessonName,
                  lessonId: info.lesson,
                  userId: info.studentId,
                  courseName: info.courseName,
                  score: info.assessment,
                  assignmentId: info.assignmentId,
                  dateTimeStamp: info.dateTimeStamp,
                  timeSpent: info.timespent,
                  name: user.name
                }
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().post(requestParams, this.getAuthHeader()) ];

             case 1:
              return [ 2, _a.sent() ];

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      FirebaseApi.prototype.syncFailedProgresses = function(infos) {
        return __awaiter(this, void 0, Promise, function() {
          var user_1, inputs, requestParams;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!(Array.isArray(infos) && infos.length > 0)) return [ 3, 2 ];
              user_1 = profile_1.User.getCurrentUser();
              inputs = infos.map(function(info) {
                return {
                  lessonId: info.lesson,
                  userId: info.studentId,
                  courseName: info.courseName,
                  score: info.assessment,
                  assignmentId: info.assignmentId,
                  timeSpent: info.timespent,
                  name: user_1.name
                };
              });
              requestParams = {
                url: parseConstants_1.FIREBASE_SYNC_FAILED_PROGRESS_URL,
                body: {
                  data: inputs
                }
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().post(requestParams, this.getAuthHeader()) ];

             case 1:
              return [ 2, _a.sent() ];

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      FirebaseApi.prototype.schoolById = function(id) {
        return __awaiter(this, void 0, Promise, function() {
          var schoolId, requestParams, jsonResult;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              schoolId = null;
              requestParams = {
                url: parseConstants_1.FIREBASE_SCHOOL_URL + id
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().get(requestParams, id, this.getAuthHeader()) ];

             case 1:
              jsonResult = _a.sent() || [];
              console.log("school id", jsonResult);
              jsonResult && Array.isArray(jsonResult) && jsonResult.length > 0 && (schoolId = jsonResult[0]);
              return [ 2, schoolId ];
            }
          });
        });
      };
      FirebaseApi.prototype.updateHomeTeacher = function(info) {
        return __awaiter(this, void 0, Promise, function() {
          var requestParams;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!(info.teacherId && info.teacherId.length > 0 && info.homeId && info.homeId.length > 0)) return [ 3, 2 ];
              requestParams = {
                url: parseConstants_1.FIREBASE_UPDATE_HOME_TEACHER_URL,
                body: info
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().post(requestParams, this.getAuthHeader()) ];

             case 1:
              return [ 2, _a.sent() ];

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      FirebaseApi.prototype.listAssignments = function(studentId, limit) {
        void 0 === limit && (limit = 10);
        return __awaiter(this, void 0, void 0, function() {
          var assignments, requestParams, mode, jsonResult, user, key, teachersForStudent, studentId_1, sectionId, schoolId, sectionName, schoolName;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              assignments = [];
              requestParams = {
                url: parseConstants_1.FIREBASE_LIST_ASSIGNMENTS + studentId
              };
              mode = parseInt(profile_1.default.getValue(profile_1.CURRENTMODE));
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().get(requestParams, null, this.getAuthHeader()) ];

             case 1:
              jsonResult = _a.sent() || [];
              if (!!jsonResult && "link" in jsonResult && !jsonResult.link) {
                user = profile_1.User.getCurrentUser();
                if (null != user) {
                  key = "teacher_for_student_" + profile_1.User.getCurrentUser().id;
                  teachersForStudent = JSON.parse(cc.sys.localStorage.getItem(key) || "[]");
                  teachersForStudent = teachersForStudent.filter(function(e) {
                    return e !== profile_1.User.getCurrentUser().sectionName;
                  });
                  cc.sys.localStorage.setItem(key, JSON.stringify(teachersForStudent));
                  user.studentId = null;
                  user.sectionId = null;
                  user.schoolId = null;
                  user.schoolName = null;
                  user.sectionName = null;
                  user.isConnected = false;
                  user.storeUser();
                }
              } else if (!!jsonResult.studentId && mode != constants_1.Mode.School) {
                studentId_1 = jsonResult.studentId;
                sectionId = jsonResult.sectionId;
                schoolId = jsonResult.schoolId;
                sectionName = jsonResult.sectionName;
                schoolName = jsonResult.schoolName;
                util_logger_1.default.processLinkStudent(sectionId, schoolId, studentId_1, schoolName, sectionName, null);
              }
              console.log("assignments query result", jsonResult);
              this.buildAssignments(assignments, [].concat(jsonResult.results));
              return [ 2, assignments ];
            }
          });
        });
      };
      FirebaseApi.prototype.buildAssignments = function(results, assignments) {
        try {
          if (!!profile_1.User.getCurrentUser()) {
            var lessonMap_1 = profile_1.User.getCurrentUser().lessonProgressMap;
            var allAssignments_1 = [];
            assignments.forEach(function(a) {
              return allAssignments_1 = allAssignments_1.concat(a);
            });
            allAssignments_1.forEach(function(a) {
              var b = {};
              var shouldInclude = true;
              b.assignmentId = a.assignmentId;
              b.chapterId = a.chapter;
              b.lessonId = a.lesson;
              b.lessonName = a.lessonName;
              b.courseCode = a.subject.courseCode;
              var dateString = a.createAt.toString();
              if (!dateString) b.createAt = new Date(); else if (8 === dateString.length) {
                var year = dateString.substring(0, 4);
                var month = dateString.substring(4, 6);
                var day = dateString.substring(6, 8);
                b.createAt = new Date(year, month - 1, day);
              } else {
                dateString = 1e3 * Number(a.createAt._seconds);
                b.createAt = new Date(dateString);
              }
              if (lessonMap_1.has(a.lesson)) {
                var lProgress = profile_1.User.getCurrentUser().lessonProgressMap.get(a.lesson);
                null === lProgress || void 0 === lProgress ? shouldInclude = true : null === lProgress.assignmentIds || void 0 === lProgress.assignmentIds || 0 === lProgress.assignmentIds.length ? shouldInclude = true : null !== lProgress.assignmentIds && lProgress.assignmentIds.length > 0 && !lProgress.assignmentIds.includes(a.assignmentId) && (shouldInclude = true);
                shouldInclude && results.push(b);
              } else results.push(b);
            });
            results = results.filter(function(v, i, a) {
              return a.findIndex(function(t) {
                return t.chapterId === v.chapterId && t.lessonId === v.lessonId;
              }) === i;
            });
            results = results.sort(function(a, b) {
              return a.createAt > b.createAt ? 1 : -1;
            });
          }
        } catch (e) {
          results = [];
        }
        return results;
      };
      FirebaseApi.prototype.linkStudent = function(studentId, code, phoneNumber, age, name, countryCode) {
        void 0 === phoneNumber && (phoneNumber = null);
        void 0 === age && (age = null);
        void 0 === name && (name = null);
        void 0 === countryCode && (countryCode = null);
        return __awaiter(this, void 0, Promise, function() {
          var sendCode, requestParams;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!(studentId && studentId.length > 0 && code && code.length > 0)) return [ 3, 2 ];
              sendCode = Number(code);
              requestParams = {
                url: parseConstants_1.FIREBASE_LINK_STUDENT_URL,
                body: {
                  studentId: studentId,
                  code: sendCode,
                  version: 2,
                  phoneNumber: phoneNumber,
                  age: age,
                  name: name,
                  countryCode: countryCode
                }
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().post(requestParams, this.getAuthHeader()) ];

             case 1:
              return [ 2, _a.sent() ];

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      FirebaseApi.prototype.getLeaderboard = function(studentId, sectionId, schoolId) {
        return __awaiter(this, void 0, Promise, function() {
          var requestParams, jsonResult, result, weekly, allTime, _i, _a, i, sortLeaderboard;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              requestParams = {
                url: parseConstants_1.FIREBASE_GET_LEADERBOARD_URL + "?progressId=" + studentId + "&sectionId=" + sectionId + "&schoolId=" + schoolId
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().get(requestParams, null, this.getAuthHeader()) ];

             case 1:
              jsonResult = _b.sent() || {};
              result = {
                weekly: [],
                allTime: []
              };
              if (Object.keys(jsonResult).length) {
                weekly = [];
                allTime = [];
                for (_i = 0, _a = Object.keys(jsonResult); _i < _a.length; _i++) {
                  i = _a[_i];
                  weekly.push({
                    name: jsonResult[i].n,
                    score: jsonResult[i].w.s,
                    timeSpent: jsonResult[i].w.t,
                    lessonsPlayed: jsonResult[i].w.l,
                    userId: i
                  });
                  allTime.push({
                    name: jsonResult[i].n,
                    score: jsonResult[i].a.s,
                    timeSpent: jsonResult[i].a.t,
                    lessonsPlayed: jsonResult[i].a.l,
                    userId: i
                  });
                }
                sortLeaderboard = function(arr) {
                  return arr.sort(function(a, b) {
                    return b.lessonsPlayed - a.lessonsPlayed || a.timeSpent - b.timeSpent || b.score - a.score;
                  });
                };
                sortLeaderboard(weekly);
                sortLeaderboard(allTime);
                result = {
                  weekly: weekly,
                  allTime: allTime
                };
                return [ 2, result ];
              }
              return [ 2, result ];
            }
          });
        });
      };
      return FirebaseApi;
    }();
    exports.FirebaseApi = FirebaseApi;
    cc._RF.pop();
  }, {
    "../../../queue": "queue",
    "../domain/parseConstants": "parseConstants",
    "../lib/constants": "constants",
    "../lib/profile": "profile",
    "../util-logger": "util-logger",
    "./ParseNetwork": "ParseNetwork"
  } ],
  ParseImageDownloader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b1d9baNS35ECb5weFAJ5gKr", "ParseImageDownloader");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ParseImageDownloader = void 0;
    var ParseNetwork_1 = require("./ParseNetwork");
    var util_logger_1 = require("../util-logger");
    var ParseImageDownloader = function() {
      function ParseImageDownloader() {}
      ParseImageDownloader.checkIfImageAlreadyDownloaded = function(key) {
        return ParseNetwork_1.ParseNetwork.getInstance().getStringFromCache(key);
      };
      ParseImageDownloader.loadImage = function(imageUrl, callBack) {
        if (!imageUrl) return;
        if (imageUrl && -1 == imageUrl.indexOf("/")) return;
        if (ParseImageDownloader.downloadStatuses.get(imageUrl)) {
          cc.log("downloading in progress ...", imageUrl);
          return;
        }
        ParseImageDownloader.downloadStatuses.set(imageUrl, true);
        if (ParseImageDownloader.isNative()) {
          var imageFileNameToSave = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
          ParseImageDownloader.downloadImageFromNetworkAndSave(imageUrl, imageFileNameToSave, callBack);
        } else ParseImageDownloader.loadImageFromNetwork(imageUrl, imageUrl, callBack);
      };
      ParseImageDownloader.getHash = function(input) {
        var hash = 0, len = input ? input.length : 0;
        for (var i = 0; i < len; i++) {
          hash = (hash << 5) - hash + input.charCodeAt(i);
          hash |= 0;
        }
        return hash;
      };
      ParseImageDownloader.loadImageForSchool = function(imageUrl, savedAs, callBack) {
        if (!imageUrl) return;
        if (imageUrl && -1 == imageUrl.indexOf("/")) return;
        if (ParseImageDownloader.downloadStatuses.get(imageUrl)) {
          cc.log("downloading in progress ...", imageUrl);
          return;
        }
        ParseImageDownloader.downloadStatuses.set(imageUrl, true);
        var hash = ParseImageDownloader.getHash(imageUrl);
        var saveAsHash = savedAs + "_" + hash;
        ParseImageDownloader.isNative() ? ParseImageDownloader.downloadImageFromNetworkAndSave(imageUrl, saveAsHash, callBack) : ParseImageDownloader.loadImageFromNetwork(imageUrl, imageUrl, callBack);
      };
      ParseImageDownloader.downloadImageFromNetworkAndSave = function(imageUrl, imageFileNameToSave, callBack) {
        var _this = this;
        var _storagePath = jsb.fileUtils.getWritablePath() + "/school-photos/";
        cc.log("_storagePath", _storagePath);
        var _inited = jsb.fileUtils.createDirectory(_storagePath);
        if (!_inited) {
          cc.log("Failed to create storage path, downloader won't work correctly");
          ParseImageDownloader.downloadStatuses.set(imageUrl, false);
          return;
        }
        imageFileNameToSave += ".jpg";
        var imageToSave = _storagePath + imageFileNameToSave;
        var isNetworkAvailable = util_logger_1.default.isNetworkAvailable();
        if (ParseNetwork_1.ParseNetwork.getInstance().getStringFromCache(imageToSave)) {
          cc.log("image found in cache", imageToSave);
          this.loadImageFromNetwork(imageUrl, imageToSave, callBack);
          return;
        }
        if (isNetworkAvailable) {
          var _downloader = new jsb.Downloader();
          _downloader.setOnFileTaskSuccess(function(task) {
            cc.log("setOnFileTaskSuccess called for:", task.requestURL, " stored: ", task.storagePath);
            ParseNetwork_1.ParseNetwork.getInstance().storeIntoCache(task.storagePath, "true");
            _this.loadImageFromNetwork(task.requestURL, task.storagePath, callBack);
          });
          _downloader.setOnTaskError(function(task, errorCode, errorCodeInternal, errorStr) {
            ParseImageDownloader.downloadStatuses.set(task.requestURL, false);
            cc.log("Failed to download file (" + task.requestURL + "): " + errorStr + "(" + errorCode + ")");
            _this.clearDownloadStatus(task.requestURL);
          });
          _downloader.createDownloadFileTask(imageUrl, imageToSave);
        }
      };
      ParseImageDownloader.clearDownloadStatus = function(imageUrl) {
        cc.log("clear download status", imageUrl);
        ParseImageDownloader.downloadStatuses.delete(imageUrl);
      };
      ParseImageDownloader.loadImageFromNetwork = function(imageUrl, savedImageUrl, callBack) {
        try {
          cc.assetManager.loadRemote(savedImageUrl, function(err, texture) {
            if (err || !texture) cc.log("failed loadImageFromNetwork", savedImageUrl); else {
              cc.log("successfully loadImageFromNetwork", savedImageUrl);
              callBack(texture);
            }
          });
        } catch (e) {
          cc.error(e);
          callBack(null);
        } finally {
          this.clearDownloadStatus(imageUrl);
        }
      };
      ParseImageDownloader.isNative = function() {
        return cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID;
      };
      ParseImageDownloader.downloadStatuses = new Map();
      return ParseImageDownloader;
    }();
    exports.ParseImageDownloader = ParseImageDownloader;
    cc._RF.pop();
  }, {
    "../util-logger": "util-logger",
    "./ParseNetwork": "ParseNetwork"
  } ],
  ParseNetwork: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0488c1hOmBHirQ4TvGnU1WD", "ParseNetwork");
    "use strict";
    var __assign = this && this.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
        }
        return t;
      };
      return __assign.apply(this, arguments);
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
    exports.ParseNetwork = exports.PARSE_CACHE = void 0;
    var parseApi_1 = require("./parseApi");
    var parseConstants_1 = require("../domain/parseConstants");
    var queue_1 = require("../../../queue");
    var util_logger_1 = require("../util-logger");
    var profile_1 = require("../lib/profile");
    var constants_1 = require("../lib/constants");
    var chimple_1 = require("../../../chimple");
    var ServiceConfig_1 = require("./ServiceConfig");
    exports.PARSE_CACHE = "PARSE_CACHE";
    cc.processQueue = function() {
      ParseNetwork.getInstance().consumeMessage();
    };
    var ParseNetwork = function() {
      function ParseNetwork() {
        this.cacheTimeInMillis = 6e4;
        this.cachedApiTimings = new Map();
        this.isHandlerBusy = false;
        this.handler = null;
      }
      ParseNetwork.init = function() {
        ParseNetwork.getInstance();
      };
      ParseNetwork.getInstance = function() {
        if (!ParseNetwork.instance) {
          ParseNetwork.instance = new ParseNetwork();
          var cachedItems_1 = ParseNetwork.instance.getParseObjectFromCache(exports.PARSE_CACHE);
          !cachedItems_1 || Object.keys(cachedItems_1).forEach(function(k) {
            ParseNetwork.instance.cachedApiTimings.set(k, cachedItems_1[k]);
          });
          var parseApi = parseApi_1.ParseApi.getInstance();
          ParseNetwork.instance.startOnlyIfWeb();
        }
        return ParseNetwork.instance;
      };
      ParseNetwork.prototype.withQuery = function(url, params, isWhereQuery, includeParam, keysParam) {
        if (!params) return url;
        var queryString = this.queryParams(params, isWhereQuery);
        var sep = -1 === url.indexOf("?") ? "?" : "&";
        var includeCriteria = !includeParam ? "" : "&include=" + includeParam;
        var keysCriteria = !keysParam ? "" : "&keys=" + keysParam;
        return queryString ? url + sep + queryString + includeCriteria + keysCriteria : url;
      };
      ParseNetwork.prototype.queryParams = function(params, isWhereQuery) {
        return isWhereQuery ? "where=" + JSON.stringify(params) : Object.keys(params).map(function(k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
        }).join("&");
      };
      ParseNetwork.prototype.parseXHRResult = function(xhr) {
        var isTextResponse = "" === xhr.responseType || "text" === xhr.responseType;
        var isJsonResponse = "json" === xhr.responseType;
        return {
          ok: xhr.status >= 200 && xhr.status < 300,
          status: xhr.status,
          statusText: xhr.statusText,
          responseType: xhr.responseType,
          headers: xhr.getAllResponseHeaders(),
          data: isTextResponse ? xhr.responseText : xhr.response
        };
      };
      ParseNetwork.prototype.errorResponse = function(xhr, message) {
        void 0 === message && (message = null);
        return {
          ok: false,
          status: xhr.status,
          statusText: xhr.statusText,
          headers: xhr.getAllResponseHeaders(),
          data: message || xhr.statusText
        };
      };
      ParseNetwork.prototype.storeIntoCache = function(key, data) {
        var storeData = "object" === typeof data ? JSON.stringify(data) : data;
        cc.sys.localStorage.setItem(key, storeData);
      };
      ParseNetwork.prototype.removeFromCache = function(key) {
        cc.sys.localStorage.removeItem(key);
      };
      ParseNetwork.prototype.getStringFromCache = function(key) {
        return cc.sys.localStorage.getItem(key);
      };
      ParseNetwork.prototype.getParseObjectFromCache = function(key) {
        try {
          return JSON.parse(cc.sys.localStorage.getItem(key));
        } catch (e) {
          return null;
        }
      };
      ParseNetwork.prototype.createMonitor = function(requestParams, options) {
        void 0 === options && (options = null);
        return __awaiter(this, void 0, void 0, function() {
          var jsonResult, result, e_1;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              jsonResult = null;
              _a.label = 1;

             case 1:
              _a.trys.push([ 1, 3, , 4 ]);
              return [ 4, ParseNetwork.getInstance().request(parseConstants_1.POST, requestParams, options) ];

             case 2:
              result = _a.sent();
              cc.log(result);
              return [ 3, 4 ];

             case 3:
              e_1 = _a.sent();
              cc.log("exception:", e_1);
              return [ 3, 4 ];

             case 4:
              return [ 2, jsonResult ];
            }
          });
        });
      };
      ParseNetwork.prototype.isEmpty = function(obj) {
        for (var prop in obj) if (obj.hasOwnProperty(prop)) return false;
        return true;
      };
      ParseNetwork.prototype.isCacheValidForKey = function(cachedKey) {
        var curTime = new Date().getTime();
        var cachedValidTimeInMillis = ParseNetwork.getInstance().cachedApiTimings.get(cachedKey) || 0;
        var cachedValue = ParseNetwork.getInstance().getStringFromCache(cachedKey);
        var isValid = false;
        try {
          var parsed = JSON.parse(cachedValue);
          isValid = !ParseNetwork.getInstance().isEmpty(parsed);
        } catch (e) {}
        return curTime < cachedValidTimeInMillis && isValid;
      };
      ParseNetwork.prototype.get = function(requestParams, cachedKey, options) {
        return __awaiter(this, void 0, void 0, function() {
          var jsonResult, isCacheValid, result, e_2;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              jsonResult = null;
              isCacheValid = false;
              _a.label = 1;

             case 1:
              _a.trys.push([ 1, 5, , 6 ]);
              isCacheValid = cachedKey && ParseNetwork.getInstance().isCacheValidForKey(cachedKey);
              if (!isCacheValid) return [ 3, 2 ];
              jsonResult = ParseNetwork.getInstance().getParseObjectFromCache(cachedKey);
              return [ 3, 4 ];

             case 2:
              return [ 4, ParseNetwork.getInstance().request(parseConstants_1.GET, requestParams, options) ];

             case 3:
              result = _a.sent();
              jsonResult = ParseNetwork.getInstance().processResult(result, cachedKey);
              _a.label = 4;

             case 4:
              return [ 3, 6 ];

             case 5:
              e_2 = _a.sent();
              cc.log("exception:", e_2);
              return [ 3, 6 ];

             case 6:
              return [ 2, jsonResult ];
            }
          });
        });
      };
      ParseNetwork.prototype.update = function(requestParams, options) {
        return __awaiter(this, void 0, Promise, function() {
          var result, e_3;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              _a.trys.push([ 0, 2, , 3 ]);
              return [ 4, ParseNetwork.getInstance().request(parseConstants_1.PUT, requestParams, options) ];

             case 1:
              result = _a.sent();
              cc.log("result:", result);
              return [ 3, 3 ];

             case 2:
              e_3 = _a.sent();
              cc.log("exception:", e_3);
              return [ 3, 3 ];

             case 3:
              return [ 2 ];
            }
          });
        });
      };
      ParseNetwork.prototype.post = function(requestParams, options) {
        return __awaiter(this, void 0, Promise, function() {
          var result, e_4;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              result = null;
              cc.log("calling post request with options", JSON.stringify(options));
              _a.label = 1;

             case 1:
              _a.trys.push([ 1, 3, , 4 ]);
              return [ 4, ParseNetwork.getInstance().request(parseConstants_1.POST, requestParams, options) ];

             case 2:
              result = _a.sent();
              cc.log("result:", result);
              if (!result.ok) {
                cc.log("processing failed to due:", result.data);
                throw Error("processing failed to due: " + result.data);
              }
              return [ 3, 4 ];

             case 3:
              e_4 = _a.sent();
              cc.log("exception:", e_4);
              throw e_4;

             case 4:
              return [ 2, result ];
            }
          });
        });
      };
      ParseNetwork.prototype.createPointer = function(className, objectId) {
        return {
          __type: "Pointer",
          className: className,
          objectId: objectId
        };
      };
      ParseNetwork.prototype.createFilePointer = function(name, url) {
        return {
          __type: "File",
          name: name,
          url: url
        };
      };
      ParseNetwork.prototype.processResult = function(result, cachedKey) {
        var jsonResult = null;
        try {
          if (result && result.data && result.ok && !result.data.error) {
            var isTextResponse = "" === result.responseType || "text" === result.responseType;
            var isJsonResponse = "json" === result.responseType;
            var isArrayBufferResponse = "arraybuffer" === result.responseType;
            var cachedValidTime = new Date().getTime() + ParseNetwork.getInstance().cacheTimeInMillis;
            if (isJsonResponse) {
              jsonResult = result.data;
              "results" in jsonResult && Array.isArray(jsonResult.results) && "link" in jsonResult && !jsonResult.link && (jsonResult.results = null);
              !cachedKey ? null : ParseNetwork.getInstance().storeIntoCache(cachedKey, jsonResult);
              ParseNetwork.getInstance().cachedApiTimings.set(cachedKey, cachedValidTime);
            } else if (isArrayBufferResponse) {
              var base64 = this.createBase64Image(result);
              !cachedKey ? null : ParseNetwork.getInstance().storeIntoCache(cachedKey, base64);
              ParseNetwork.getInstance().cachedApiTimings.set(cachedKey, cachedValidTime);
            }
          } else jsonResult = !cachedKey ? null : ParseNetwork.getInstance().getParseObjectFromCache(cachedKey);
        } catch (e) {
          cc.log("exception", e);
        } finally {
          var st_1 = {};
          ParseNetwork.getInstance().cachedApiTimings.forEach(function(value, key) {
            key && (st_1[key] = value);
          });
          ParseNetwork.getInstance().storeIntoCache(exports.PARSE_CACHE, st_1);
        }
        return jsonResult;
      };
      ParseNetwork.prototype.createBase64Image = function(result) {
        var uInt8Array = new Uint8Array(result.data);
        var i = uInt8Array.length;
        var biStr = new Array(i);
        while (i--) biStr[i] = String.fromCharCode(uInt8Array[i]);
        var base64 = window.btoa(biStr.join(""));
        return base64;
      };
      ParseNetwork.prototype.request = function(method, requestParams, options) {
        var _this = this;
        var url = requestParams.url, queryParams = requestParams.queryParams, body = requestParams.body, isWhereQuery = requestParams.isWhereQuery, includeParam = requestParams.includeParam, keysParam = requestParams.keysParam;
        var ignoreCache = options.ignoreCache || false;
        var headers = options.headers;
        var timeout = options.timeout || parseConstants_1.DEFAULT_TIMEOUT;
        return new Promise(function(resolve, reject) {
          var xhr = cc.loader.getXMLHttpRequest();
          xhr.responseType = !options.responseType ? "json" : options.responseType;
          var requestUrl = _this.withQuery(url, queryParams, isWhereQuery, includeParam, keysParam);
          xhr.open(method, requestUrl, true);
          headers && Object.keys(headers).forEach(function(key) {
            return xhr.setRequestHeader(key, headers[key]);
          });
          ignoreCache && xhr.setRequestHeader("Cache-Control", "no-cache");
          xhr.timeout = timeout;
          xhr.onload = function(evt) {
            resolve(_this.parseXHRResult(xhr));
          };
          xhr.onerror = function(evt) {
            resolve(_this.errorResponse(xhr, "Failed to make request."));
          };
          xhr.ontimeout = function(evt) {
            resolve(_this.errorResponse(xhr, "Request took longer than expected."));
          };
          if (method !== parseConstants_1.POST && method !== parseConstants_1.PUT || !body) xhr.send(); else {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(body));
          }
        });
      };
      ParseNetwork.prototype.updateProgress = function(payload) {
        cc.log("calling update progress API");
        ServiceConfig_1.ServiceConfig.getI().handle.updateProgress(payload).then(function(res) {
          util_logger_1.default.logChimpleEvent(parseConstants_1.UPDATE_PROGRESS, payload);
        }).catch(function(err) {
          var failedSyncProgresses = JSON.parse(cc.sys.localStorage.getItem(parseConstants_1.SYNC_PROGRESS_FAILED) || "[]");
          var failedPayload = __assign({}, payload);
          failedSyncProgresses.push(failedPayload);
          cc.sys.localStorage.setItem(parseConstants_1.SYNC_PROGRESS_FAILED, JSON.stringify(failedSyncProgresses));
        });
      };
      ParseNetwork.prototype.consumeMessage = function() {
        var _this = this;
        if (ParseNetwork.getInstance().isHandlerBusy) return;
        this.isHandlerBusy = true;
        var _loop_1 = function() {
          var payload = queue_1.Queue.getInstance().pop();
          cc.log("found payload to process", payload);
          if (!!payload) switch (payload.kind) {
           case "Progress":
            var lastFailedToSyncProgresses = JSON.parse(cc.sys.localStorage.getItem(parseConstants_1.SYNC_PROGRESS_FAILED) || "[]");
            Array.isArray(lastFailedToSyncProgresses) && lastFailedToSyncProgresses.length > 0 ? ServiceConfig_1.ServiceConfig.getI().handle.syncFailedProgresses(lastFailedToSyncProgresses).then(function(res) {
              cc.log("Successfully Synced Failed Progress");
              cc.sys.localStorage.removeItem(parseConstants_1.SYNC_PROGRESS_FAILED);
              ParseNetwork.getInstance().updateProgress(payload);
            }).catch(function(err) {}) : ParseNetwork.getInstance().updateProgress(payload);
            break;

           case "Monitor":
            cc.log("calling update monitor API");
            parseApi_1.ParseApi.getInstance().updateMonitor(payload).then(function(res) {
              cc.log(res);
              util_logger_1.default.logChimpleEvent(parseConstants_1.UPDATE_MONITOR, payload);
            }).catch(function(err) {});
            break;

           case "Profile":
            cc.log("calling update profile API");
            parseApi_1.ParseApi.getInstance().updateProfile(payload).then(function(r) {
              cc.log("successfully updated profile ", payload.studentId);
              util_logger_1.default.logChimpleEvent(parseConstants_1.UPDATE_PROFILE, payload);
            }).catch(function(err) {
              cc.log("failed to update profile ", payload.studentId, " with error ", err);
            });
            break;

           case "UpdateHomeTeacher":
            cc.log("calling update home teacher API");
            ServiceConfig_1.ServiceConfig.getI().handle.updateHomeTeacher(payload).then(function(res) {
              cc.log(res);
              _this.onHomeTeacherSuccess(payload.homeId, payload.homeId);
              util_logger_1.default.logChimpleEvent(parseConstants_1.UPDATE_HOME_TEACHER, payload);
            }).catch(function(err) {});
            break;

           case "AssignHomeWork":
            cc.log("calling assign Homework API");
            parseApi_1.ParseApi.getInstance().assignHomeWork(payload).then(function(res) {
              cc.log(res);
              util_logger_1.default.logChimpleEvent(chimple_1.ASSIGN_HOMEWORK, payload);
            }).catch(function(err) {});

           default:
            cc.log("found payload with no handler.. ignoring", payload);
          }
        };
        while (!queue_1.Queue.getInstance().isEmpty()) _loop_1();
        this.isHandlerBusy = false;
        cc.log("finished queue processing -> resetting isHandlerBusy", this.isHandlerBusy);
      };
      ParseNetwork.prototype.onHomeTeacherSuccess = function(homeId, studentId) {
        var associatedUser = profile_1.User.getUsers().find(function(u) {
          return u.id === homeId;
        });
        if (associatedUser) {
          associatedUser.serverId = studentId;
          if (profile_1.User.getCurrentUser().id === homeId) {
            ParseNetwork.getInstance().storeIntoCache(constants_1.CURRENT_STUDENT_ID, studentId);
            profile_1.User.getCurrentUser().serverId = studentId;
          }
        }
      };
      ParseNetwork.prototype.startOnlyIfWeb = function() {
        if (cc.sys.isBrowser) {
          ParseNetwork.getInstance().clearScheduler();
          ParseNetwork.getInstance().startScheduler();
        }
      };
      ParseNetwork.prototype.startScheduler = function() {
        this.handler = setInterval(this.consumeMessage, constants_1.QUEUE_OFFLOAD_FREQUENCY);
      };
      ParseNetwork.prototype.clearScheduler = function() {
        this.handler && clearInterval(this.handler);
      };
      return ParseNetwork;
    }();
    exports.ParseNetwork = ParseNetwork;
    cc._RF.pop();
  }, {
    "../../../chimple": "chimple",
    "../../../queue": "queue",
    "../domain/parseConstants": "parseConstants",
    "../lib/constants": "constants",
    "../lib/profile": "profile",
    "../util-logger": "util-logger",
    "./ServiceConfig": "ServiceConfig",
    "./parseApi": "parseApi"
  } ],
  ServiceApi: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d77f6wZhCZKfKN+tYODzqnp", "ServiceApi");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    cc._RF.pop();
  }, {} ],
  ServiceConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "df461yN7TNGR7R/gyDF2Kpr", "ServiceConfig");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ServiceConfig = exports.APIMode = void 0;
    var ApiHandler_1 = require("./ApiHandler");
    var parseApi_1 = require("./parseApi");
    var FirebaseApi_1 = require("./FirebaseApi");
    var ParseNetwork_1 = require("./ParseNetwork");
    var APIMode;
    (function(APIMode) {
      APIMode[APIMode["PARSE"] = 0] = "PARSE";
      APIMode[APIMode["FIREBASE"] = 1] = "FIREBASE";
    })(APIMode = exports.APIMode || (exports.APIMode = {}));
    var ServiceConfig = function() {
      function ServiceConfig() {}
      ServiceConfig.getInstance = function(mode) {
        if (!ServiceConfig.instance) {
          ServiceConfig.instance = new ServiceConfig();
          ServiceConfig.instance.mode = mode;
          ParseNetwork_1.ParseNetwork.getInstance();
        }
        switch (mode) {
         case APIMode.FIREBASE:
          this.instance.initializeFireBase();
          break;

         case APIMode.PARSE:
          this.instance.initializeParse();
        }
        return ServiceConfig.instance;
      };
      ServiceConfig.getI = function() {
        return ServiceConfig.instance;
      };
      ServiceConfig.prototype.initializeParse = function() {
        this._handler = ApiHandler_1.ApiHandler.getInstance(parseApi_1.ParseApi.getInstance());
      };
      ServiceConfig.prototype.initializeFireBase = function() {
        this._handler = ApiHandler_1.ApiHandler.getInstance(FirebaseApi_1.FirebaseApi.getInstance());
      };
      Object.defineProperty(ServiceConfig.prototype, "handle", {
        get: function() {
          return this._handler;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ServiceConfig.prototype, "mode", {
        get: function() {
          return this._mode;
        },
        set: function(mode) {
          this._mode = mode;
        },
        enumerable: false,
        configurable: true
      });
      return ServiceConfig;
    }();
    exports.ServiceConfig = ServiceConfig;
    cc._RF.pop();
  }, {
    "./ApiHandler": "ApiHandler",
    "./FirebaseApi": "FirebaseApi",
    "./ParseNetwork": "ParseNetwork",
    "./parseApi": "parseApi"
  } ],
  Utility: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2dfc9KbwGJJOKsnH1/ZwZLx", "Utility");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.AlphabetUtil = exports.LetterType = void 0;
    var config_1 = require("./lib/config");
    var util_1 = require("./util");
    var LetterType;
    (function(LetterType) {
      LetterType[LetterType["Consonant"] = 0] = "Consonant";
      LetterType[LetterType["Vowel"] = 1] = "Vowel";
    })(LetterType = exports.LetterType || (exports.LetterType = {}));
    var vowelList = [ "a", "e", "i", "o", "u" ];
    var consonantList = [ "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z" ];
    var hindiVowelList = [ "\u0905", "\u0906", "\u0907", "\u0908", "\u0909", "\u090a", "\u090b", "\u090f", "\u0910", "\u0913", "\u0914", "\u0905\u0902", "\u0905\u0903", "\u0905\u0901" ];
    var hindiConsonantList = [ "\u0915", "\u0916", "\u0917", "\u0918", "\u0919", "\u091a", "\u091b", "\u091c", "\u091d", "\u091e", "\u091f", "\u0920", "\u0921", "\u0922", "\u0923", "\u0924", "\u0925", "\u0926", "\u0927", "\u0928", "\u092a", "\u092b", "\u092c", "\u092d", "\u092e", "\u092f", "\u0930", "\u0932", "\u0935", "\u0936", "\u0937", "\u0938", "\u0939" ];
    var kannadaVowelList = [ "\u0c85", "\u0c86", "\u0c87", "\u0c88", "\u0c89", "\u0c8a", "\u0c8b", "\u0ce0   \u0c8e", "\u0c8f", "\u0c90", "\u0c92", "\u0c93", "\u0c94   \u0c82", "\u0c83" ];
    var kannadaConsonantList = [ "\u0c95", "\u0c96", "\u0c97", "\u0c98", "\u0c99", "\u0c9a", "\u0c9b", "\u0c9c", "\u0c9d", "\u0c9e   \u0c9f", "\u0ca0", "\u0ca1", "\u0ca2", "\u0ca3", "\u0ca4", "\u0ca5", "\u0ca6", "\u0ca7", "\u0ca8", "\u0caa", "\u0cab", "\u0cac", "\u0cad", "\u0cae   \u0caf", "\u0cb0", "\u0cb2", "\u0cb3", "\u0cb5", "\u0cb6", "\u0cb7", "\u0cb8", "\u0cb9" ];
    var langMap = {
      "en/": [ vowelList, consonantList ],
      "hi/": [ hindiVowelList, hindiConsonantList ],
      "kn/": [ kannadaVowelList, kannadaConsonantList ]
    };
    var AlphabetUtil = function() {
      function AlphabetUtil() {}
      AlphabetUtil.isConsonantOrVowel = function(character) {
        var letterType;
        letterType = AlphabetUtil.contains(langMap[config_1.default.i.course.lang + "/"][0], character) ? LetterType.Vowel : LetterType.Consonant;
        return letterType;
      };
      AlphabetUtil.getRandomVowel = function() {
        return langMap[config_1.default.i.course.lang + "/"][0][Math.floor(Math.random() * langMap[config_1.default.i.course.lang + "/"][0].length)].toUpperCase();
      };
      AlphabetUtil.getRandomConsonant = function() {
        return langMap[config_1.default.i.course.lang + "/"][1][Math.floor(Math.random() * langMap[config_1.default.i.course.lang + "/"][1].length)].toUpperCase();
      };
      AlphabetUtil.getRandomConsonantArray = function(lang) {
        return langMap[lang][1];
      };
      AlphabetUtil.contains = function(array, element) {
        return array.indexOf(element) > -1;
      };
      AlphabetUtil.getRandomVowelArray = function(size) {
        if (size > 5) throw new Error("Size should be less than or equal to 21");
        var randomVowelArray = new Array(size);
        for (var i = 0; i < size; i++) {
          var randomVowel = this.getRandomVowel();
          AlphabetUtil.contains(randomVowelArray, randomVowel) ? i-- : randomVowelArray[i] = randomVowel;
        }
        randomVowelArray.forEach(function(randomVowel) {
          console.log("Random Vowels Generated " + randomVowel);
        });
        return randomVowelArray;
      };
      AlphabetUtil.playLetterSound = function(letterOrWord, isWord) {
        isWord ? util_1.Util.load(config_1.default.dir + "sound/wordvoice/" + letterOrWord + ".mp3", function(err, clip) {
          cc.log("Audio Error: " + err);
          var audioID = cc.audioEngine.play(clip, false, 1);
        }, true) : util_1.Util.load(config_1.default.dir + "sound/lettervoice/" + letterOrWord + ".mp3", function(err, clip) {
          cc.log("Audio Error: " + err);
          var audioID = cc.audioEngine.play(clip, false, 1);
        }, true);
      };
      return AlphabetUtil;
    }();
    exports.AlphabetUtil = AlphabetUtil;
    cc._RF.pop();
  }, {
    "./lib/config": "config",
    "./util": "util"
  } ],
  achievement: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1086d51yhBIZpt83nyiEavl", "achievement");
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
    var util_1 = require("../../scripts/util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Achievement = function(_super) {
      __extends(Achievement, _super);
      function Achievement() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.reward = null;
        _this.gold = null;
        _this.silver = null;
        _this.bronze = null;
        return _this;
      }
      Achievement.prototype.onLoad = function() {
        var _this = this;
        util_1.Util.load(this.courseId + "/course/res/icons/" + this.image, function(err, texture) {
          err || (_this.reward.spriteFrame = new cc.SpriteFrame(texture));
        });
        this.getComponent(cc.Sprite).spriteFrame = this.score > 90 ? this.gold : this.score > 80 ? this.silver : this.bronze;
      };
      __decorate([ property(cc.Sprite) ], Achievement.prototype, "reward", void 0);
      __decorate([ property(cc.SpriteFrame) ], Achievement.prototype, "gold", void 0);
      __decorate([ property(cc.SpriteFrame) ], Achievement.prototype, "silver", void 0);
      __decorate([ property(cc.SpriteFrame) ], Achievement.prototype, "bronze", void 0);
      Achievement = __decorate([ ccclass ], Achievement);
      return Achievement;
    }(cc.Component);
    exports.default = Achievement;
    cc._RF.pop();
  }, {
    "../../scripts/util": "util"
  } ],
  "answer-grid": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "efe32Be6zlNM4Qf/FTLzyS9", "answer-grid");
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
    exports.HELP_BTN = exports.CONFIRM_BUTTON_CLICKED = exports.CLEAR_BUTTON_CLICKED = exports.ANSWER_GRID_BUTTON_CLICKED = exports.NUMBER_LABEL = exports.BACK_GROUND = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var error_handler_1 = require("./lib/error-handler");
    exports.BACK_GROUND = "Background";
    exports.NUMBER_LABEL = "numberLabel";
    exports.ANSWER_GRID_BUTTON_CLICKED = "ANSWER_GRID_BUTTON_CLICKED";
    exports.CLEAR_BUTTON_CLICKED = "CLEAR_BUTTON_CLICKED";
    exports.CONFIRM_BUTTON_CLICKED = "CONFIRM_BUTTON_CLICKED";
    exports.HELP_BTN = "HELP_BTN";
    var AnswerGrid = function(_super) {
      __extends(AnswerGrid, _super);
      function AnswerGrid() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.numberBtnPrefab = null;
        _this.numberpads = [];
        _this.delay = 2;
        _this.result = null;
        _this.correctBtns = [];
        return _this;
      }
      AnswerGrid.prototype.onLoad = function() {};
      AnswerGrid.prototype.start = function() {
        this.createGrid(this.delay);
      };
      AnswerGrid.prototype.createGrid = function(delay) {
        var _this = this;
        void 0 === delay && (delay = 2);
        this.addDummyBtn(this.node, null);
        for (var i = 0; i <= this.numberpads.length - 1; i++) {
          this.addNumberBtn(this.node, this.numberpads[i]);
          0 == i && this.addDummyBtn(this.node, null);
        }
        this.scheduleOnce(function() {
          if (null !== _this.correctBtns && _this.correctBtns.length > 0) {
            var customEvent = new cc.Event.EventCustom(exports.HELP_BTN, true);
            customEvent.setUserData({
              helpNodes: _this.correctBtns
            });
            _this.node.dispatchEvent(customEvent);
          }
        }, delay);
      };
      AnswerGrid.prototype.addNumberBtn = function(node, text) {
        var numberBtn = cc.instantiate(this.numberBtnPrefab);
        var backGround = numberBtn.getChildByName(exports.BACK_GROUND);
        if (!!backGround) {
          var labelNode = backGround.getChildByName(exports.NUMBER_LABEL);
          var label = labelNode.getComponent(cc.Label);
          labelNode.color = new cc.Color().fromHEX("#654321");
          label.string = text;
          var outLine = labelNode.addComponent(cc.LabelOutline);
          outLine.width = 2;
        }
        node.addChild(numberBtn);
        if (!!this.result && this.result.includes(text)) {
          var index = this.result.indexOf(text);
          this.correctBtns.splice(index, 0, numberBtn);
        }
      };
      AnswerGrid.prototype.addDummyBtn = function(node, text) {
        var n = new cc.Node();
        node.addChild(n);
      };
      __decorate([ property(cc.Prefab) ], AnswerGrid.prototype, "numberBtnPrefab", void 0);
      __decorate([ error_handler_1.default() ], AnswerGrid.prototype, "start", null);
      __decorate([ error_handler_1.default() ], AnswerGrid.prototype, "createGrid", null);
      __decorate([ error_handler_1.default() ], AnswerGrid.prototype, "addNumberBtn", null);
      __decorate([ error_handler_1.default() ], AnswerGrid.prototype, "addDummyBtn", null);
      AnswerGrid = __decorate([ ccclass ], AnswerGrid);
      return AnswerGrid;
    }(cc.Component);
    exports.default = AnswerGrid;
    cc._RF.pop();
  }, {
    "./lib/error-handler": "error-handler"
  } ],
  "arrow-node": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "59fe67aM39CLrMyO7fbCg85", "arrow-node");
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
    var ccclass = cc._decorator.ccclass;
    var DROP_GROUP = "drop";
    var ArrowNode = function(_super) {
      __extends(ArrowNode, _super);
      function ArrowNode() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.currentPath = null;
        _this.arrowValue = 0;
        _this.starCounter = 0;
        _this.location = null;
        return _this;
      }
      ArrowNode.prototype.onEnable = function() {
        var collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
      };
      ArrowNode = __decorate([ ccclass ], ArrowNode);
      return ArrowNode;
    }(cc.Component);
    exports.default = ArrowNode;
    cc._RF.pop();
  }, {} ],
  "auto-drag": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3b63fCgv6BHronsT9XJa36c", "auto-drag");
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
    var drag_1 = require("./drag");
    var drop_1 = require("./drop");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var AutoDrag = function(_super) {
      __extends(AutoDrag, _super);
      function AutoDrag() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._originalPosition = null;
        _this._isDragging = false;
        _this.match = false;
        _this.matchingNode = null;
        _this._dropObject = null;
        return _this;
      }
      AutoDrag.prototype.onLoad = function() {
        this.node.on("touchstart", this.onTouchStart, this);
        this.node.on("touchend", this.onTouchEnd, this);
        this.node.on("touchcancel", this.onTouchEnd, this);
      };
      AutoDrag.prototype.onTouchStart = function(touch) {
        if (drag_1.default.letDrag && !this.isDragging && this.allowDrag) {
          this._originalPosition = this.node.position;
          this.updateDropNode();
        }
      };
      AutoDrag.prototype.findMatch = function() {
        var _this = this;
        if (this.match) {
          this.allowDrag = false;
          this._isDragging = false;
          new cc.Tween().target(this.node).to(.3, {
            position: this.node.parent.convertToNodeSpaceAR(this.matchingNode.convertToWorldSpaceAR(cc.Vec2.ZERO))
          }, null).call(this.onMatchOver.bind(this)).start();
        } else if (this.returnBackOnNoMatch) new cc.Tween().target(this.node).to(1, {
          position: this._originalPosition
        }, {
          progress: null,
          easing: "sineOut"
        }).call(function() {
          _this.allowDrag = true;
          _this._isDragging = false;
          drag_1.default.letDrag = true;
        }).call(this.onMatchFail.bind(this)).start(); else {
          this.allowDrag = true;
          drag_1.default.letDrag = true;
          this._isDragging = false;
        }
      };
      AutoDrag.prototype.onCollisionEnter = function(other, self) {
        if (this.allowDrag && !this.isDragging && this.collisionEnterCondition(self, other) && other.node.getComponent(drop_1.default).allowDrop) {
          this.match = true;
          this.matchingNode = other.node;
        }
      };
      AutoDrag.prototype.onTouchEnd = function(touch) {
        var _this = this;
        if (this.allowDrag && !this._isDragging && null !== this._dropObject) {
          this._isDragging = true;
          new cc.Tween().target(this.node).to(.3, {
            position: this.node.parent.convertToNodeSpaceAR(this._dropObject.convertToWorldSpaceAR(cc.Vec2.ZERO))
          }, null).call(function() {
            _this.findMatch();
          }).start();
        }
      };
      AutoDrag.prototype.updateDropNode = function() {
        this._dropObject = this.findDropNode();
      };
      AutoDrag.prototype.disableTouch = function() {
        this.node.off("touchstart", this.onTouchStart, this);
        this.node.off("touchend", this.onTouchEnd, this);
        this.node.off("touchcancel", this.onTouchEnd, this);
      };
      AutoDrag.prototype.onDestroy = function() {
        this.node.off("touchstart", this.onTouchStart, this);
        this.node.off("touchend", this.onTouchEnd, this);
        this.node.off("touchcancel", this.onTouchEnd, this);
      };
      AutoDrag.prototype.onMatchOver = function() {
        drag_1.default.letDrag = true;
        this.allowDrag = false;
        if (this.fixOnMatch) {
          var mNode = this.matchingNode;
          this.node.opacity = 0;
          this.node.removeFromParent(false);
          this.node.position = cc.Vec2.ZERO;
          mNode.addChild(this.node);
          mNode.getComponent(drop_1.default).onMatchOver();
        } else this.allowDrag = true;
      };
      AutoDrag.prototype.onMatchFail = function() {};
      AutoDrag = __decorate([ ccclass ], AutoDrag);
      return AutoDrag;
    }(drag_1.default);
    exports.default = AutoDrag;
    cc._RF.pop();
  }, {
    "./drag": "drag",
    "./drop": "drop"
  } ],
  backButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7082dngCaFG/b2DSeSfDxXQ", "backButton");
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
    var config_1 = require("./lib/config");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BackButton = function(_super) {
      __extends(BackButton, _super);
      function BackButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.extraFunction = null;
        return _this;
      }
      BackButton.prototype.onLoad = function() {
        var _this = this;
        this.node.once("touchend", function() {
          _this.node.getComponent(cc.Button).interactable = false;
          _this.extraFunction && _this.extraFunction();
          config_1.default.i.popScene();
        });
      };
      BackButton = __decorate([ ccclass ], BackButton);
      return BackButton;
    }(cc.Component);
    exports.default = BackButton;
    cc._RF.pop();
  }, {
    "./lib/config": "config"
  } ],
  balloon: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eda288WiitPBJHPq4tfrMas", "balloon");
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
    exports.BalloonType = exports.MATHS_GAMES = exports.LITERACY_GAMES = void 0;
    var config_1 = require("./lib/config");
    var util_1 = require("./util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    exports.LITERACY_GAMES = "literacy";
    exports.MATHS_GAMES = "maths";
    var handleClick = true;
    var BalloonType;
    (function(BalloonType) {
      BalloonType[BalloonType["Game"] = 0] = "Game";
      BalloonType[BalloonType["Type"] = 1] = "Type";
    })(BalloonType = exports.BalloonType || (exports.BalloonType = {}));
    var Balloon = function(_super) {
      __extends(Balloon, _super);
      function Balloon() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.game = null;
        _this.seat = null;
        _this.image = null;
        _this.icon = null;
        _this.chimp = null;
        _this.doneIcon = null;
        _this.done = false;
        _this.waitingIcon = null;
        _this.waiting = false;
        _this.glow = null;
        _this.stars = null;
        _this.appearAudio = null;
        _this._color = null;
        _this.onClickCallback = null;
        _this.level = 0;
        _this.stopZigzag = false;
        _this.type = BalloonType.Game;
        return _this;
      }
      Balloon.prototype.onLoad = function() {
        var _this = this;
        var config = config_1.default.i;
        handleClick = true;
        this.done || null == this.doneIcon || (this.doneIcon.active = false);
        if (this.type == BalloonType.Type) if ("en" == this.game) {
          this.label.string = "English";
          this._color = new cc.Color().fromHEX("#FFD141");
        } else if ("hi" == this.game) {
          this.label.string = "\u0939\u093f\u0928\u094d\u0926\u0940";
          this._color = new cc.Color().fromHEX("#5E9C46");
        } else if ("en-maths" == this.game) {
          this.label.string = "Maths";
          this._color = new cc.Color().fromHEX("#6A5AAB");
        } else if ("hi-maths" == this.game) {
          this.label.string = "\u0917\u0923\u093f\u0924";
          this._color = new cc.Color().fromHEX("#6A5AAB");
        } else if ("ur" == this.game) {
          this.label.string = "\u0627\u0631\u062f\u0648";
          this._color = new cc.Color().fromHEX("#5E9C46");
        } else if ("ur-maths" == this.game) {
          this.label.string = "\u0631\u06cc\u0627\u0636\u06cc";
          this._color = new cc.Color().fromHEX("#6A5AAB");
        }
        !this.image || !this._color || (this.image.color = this._color);
        var button = this.node.getComponent(cc.Button);
        null != button && (button.interactable = false);
        this.waitingIcon.active = true;
        util_1.Util.downloadIfNeeded(this.node, this.game, this.level, function(success) {
          if (success) {
            var button_1 = _this.node.getComponent(cc.Button);
            null != button_1 && (button_1.interactable = true);
            _this.setIcon();
            _this.waitingIcon.active = false;
          }
        });
      };
      Balloon.prototype.setIcon = function() {
        var _this = this;
        var iconFile = (config_1.COURSES.indexOf(this.game) >= 0 ? this.game : config_1.default.i.course.id) + "/common/res/icons/" + this.game + ".png";
        util_1.Util.load(iconFile, function(err, texture) {
          err || (_this.icon.spriteFrame = new cc.SpriteFrame(texture));
        });
      };
      Object.defineProperty(Balloon.prototype, "color", {
        set: function(newColor) {
          this._color = newColor;
          this.image.color = newColor;
        },
        enumerable: false,
        configurable: true
      });
      Balloon.prototype.onBalloonClick = function() {
        if (handleClick && null != this.chimp) {
          handleClick = false;
          this.onClickCallback();
        }
      };
      Balloon.prototype.flyToNest = function(callback) {
        void 0 === callback && (callback = null);
        var nest = cc.director.getScene().getChildByName("nest");
        var nestPos = null != nest ? nest.position : cc.v2(cc.winSize.width - 65, cc.winSize.height - 61);
        this.node.runAction(cc.sequence(cc.bezierTo(2, [ cc.v2((nestPos.x - this.node.x) / 4, (nestPos.y - 118 - this.node.y) / 4), cc.v2((nestPos.x - this.node.x) / 2, (nestPos.y - 118 - this.node.y) / 2), cc.v2(nestPos.x, nestPos.y - 118) ]), cc.callFunc(function() {
          null != callback && callback();
        })));
      };
      Balloon.prototype.jumpChimpToBalloon = function(callback) {
        var _this = this;
        var finalPos = this.chimp.parent.convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(this.seat.position));
        this.chimp.runAction(cc.sequence([ cc.bezierTo(1, [ cc.v2(this.chimp.x, this.chimp.y + 100), cc.v2(finalPos.x / 2, finalPos.y + 100) ]), cc.callFunc(function() {
          _this.chimp.position = cc.Vec2.ZERO;
          _this.chimp.removeFromParent(false);
          _this.seat.addChild(_this.chimp);
          null != callback && callback();
        }) ]));
      };
      Balloon.prototype.jumpChimpFromBalloon = function(callback) {
        this.chimp.position = cc.director.getScene().convertToNodeSpaceAR(this.chimp.parent.convertToWorldSpaceAR(this.chimp.position));
        this.chimp.removeFromParent();
        cc.director.getScene().addChild(this.chimp);
        var finalPos = cc.v2(cc.winSize.width / 4, 400);
        this.chimp.runAction(cc.sequence(cc.bezierTo(1, [ cc.v2(this.chimp.x, this.chimp.y + 100), cc.v2(finalPos.x / 2, finalPos.y + 100), finalPos ]), cc.callFunc(function() {
          null != callback && callback();
        })));
      };
      Balloon.prototype.flyUpUpAndAbove = function(callback) {
        void 0 === callback && (callback = null);
        this.node.runAction(cc.sequence(cc.spawn(cc.scaleTo(1, .1), cc.bezierTo(1, [ cc.v2(this.node.x - 400 + 800 * Math.random(), cc.winSize.height / 3), cc.v2(this.node.x - 400 + 800 * Math.random(), 2 * cc.winSize.height / 3), cc.v2(this.node.x - 400 + 800 * Math.random(), 5 * cc.winSize.height / 3) ])), cc.callFunc(function() {
          null != callback && callback();
        })));
      };
      Balloon.prototype.flyZigzag = function(callback) {
        var _this = this;
        void 0 === callback && (callback = null);
        new cc.Tween().target(this.node).to(1, {
          position: this.node.parent.convertToNodeSpaceAR(cc.v2(Math.random() * cc.winSize.width, Math.random() * cc.winSize.height / 2))
        }, {
          progress: null,
          easing: "cubicInOut"
        }).call(function() {
          _this.stopZigzag ? null != callback && callback() : _this.flyZigzag(callback);
        }).start();
      };
      Balloon.prototype.flyToCenter = function(callback) {
        void 0 === callback && (callback = null);
        new cc.Tween().target(this.node).to(1, {
          position: this.node.parent.convertToNodeSpaceAR(cc.v2(cc.winSize.width / 2, cc.winSize.height / 4))
        }, {
          progress: null,
          easing: "cubicInOut"
        }).call(function() {
          null != callback && callback();
        }).start();
      };
      Balloon.prototype.animateGlow = function() {
        this.glow.active = true;
        this.stars.active = true;
        var anim = this.node.getComponent(cc.Animation);
        null != anim && anim.play();
      };
      __decorate([ property(cc.Label) ], Balloon.prototype, "label", void 0);
      __decorate([ property ], Balloon.prototype, "game", void 0);
      __decorate([ property(cc.Node) ], Balloon.prototype, "seat", void 0);
      __decorate([ property(cc.Node) ], Balloon.prototype, "image", void 0);
      __decorate([ property(cc.Sprite) ], Balloon.prototype, "icon", void 0);
      __decorate([ property(cc.Node) ], Balloon.prototype, "chimp", void 0);
      __decorate([ property(cc.Node) ], Balloon.prototype, "doneIcon", void 0);
      __decorate([ property ], Balloon.prototype, "done", void 0);
      __decorate([ property(cc.Node) ], Balloon.prototype, "waitingIcon", void 0);
      __decorate([ property ], Balloon.prototype, "waiting", void 0);
      __decorate([ property(cc.Node) ], Balloon.prototype, "glow", void 0);
      __decorate([ property(cc.Node) ], Balloon.prototype, "stars", void 0);
      __decorate([ property(cc.AudioClip) ], Balloon.prototype, "appearAudio", void 0);
      Balloon = __decorate([ ccclass ], Balloon);
      return Balloon;
    }(cc.Component);
    exports.default = Balloon;
    cc._RF.pop();
  }, {
    "./lib/config": "config",
    "./util": "util"
  } ],
  chapterIcon: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e053cr7qxBB+I3xXJEh8Bun", "chapterIcon");
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
    var util_1 = require("./util");
    var lessonIcon_1 = require("./lessonIcon");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ChapterIcon = function(_super) {
      __extends(ChapterIcon, _super);
      function ChapterIcon() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.open = true;
        return _this;
      }
      ChapterIcon.prototype.onLoad = function() {
        var _this = this;
        var defaultSpriteFrame = this.sprite.spriteFrame;
        this.sprite.spriteFrame = new cc.SpriteFrame();
        util_1.Util.load(this.chapter.course.id + "/course/res/icons/" + this.chapter.image, function(err, texture) {
          !_this.sprite || (_this.sprite.spriteFrame = err ? defaultSpriteFrame : new cc.SpriteFrame(texture));
        });
        if (this.open) this.bg.color = new cc.Color().fromHEX(this.chapter.color ? this.chapter.color : lessonIcon_1.LESSON_BG_COLORS[Math.floor(Math.random() * lessonIcon_1.LESSON_BG_COLORS.length)]); else {
          this.sprite.setMaterial(0, this.grayMaterial);
          this.bg.color = new cc.Color(224, 224, 224);
        }
      };
      __decorate([ property(cc.Sprite) ], ChapterIcon.prototype, "sprite", void 0);
      __decorate([ property(cc.Node) ], ChapterIcon.prototype, "bg", void 0);
      __decorate([ property(cc.Material) ], ChapterIcon.prototype, "grayMaterial", void 0);
      ChapterIcon = __decorate([ ccclass ], ChapterIcon);
      return ChapterIcon;
    }(cc.Component);
    exports.default = ChapterIcon;
    cc._RF.pop();
  }, {
    "./lessonIcon": "lessonIcon",
    "./util": "util"
  } ],
  "chimple-label": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0ddb3t+49REZ5s0SVkIuotE", "chimple-label");
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
    var ccclass = cc._decorator.ccclass;
    var config_1 = require("./lib/config");
    var util_1 = require("./util");
    var ChimpleLabel = function(_super) {
      __extends(ChimpleLabel, _super);
      function ChimpleLabel() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._key = null;
        return _this;
      }
      ChimpleLabel.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.useSystemFont = false;
        this._key = this.string;
        var config = config_1.default.i;
        if (null !== config) {
          var fontName = config.currentFontName;
          cc.log("applied font:", fontName);
          var fontLoaded = config.hasLoadedTextFont(fontName);
          fontLoaded && (this.font = config.getTextFont(fontName));
          config.direction == config_1.Direction.RTL && this.horizontalAlign == cc.Label.HorizontalAlign.LEFT && (this.horizontalAlign = cc.Label.HorizontalAlign.RIGHT);
          (null === config.game || void 0 === config.game || config.course && "literacy" != config.course.type) && (this.string = util_1.Util.i18NText(this._key));
        }
      };
      Object.defineProperty(ChimpleLabel.prototype, "key", {
        get: function() {
          return this._key;
        },
        enumerable: false,
        configurable: true
      });
      ChimpleLabel = __decorate([ ccclass ], ChimpleLabel);
      return ChimpleLabel;
    }(cc.Label);
    exports.default = ChimpleLabel;
    cc._RF.pop();
  }, {
    "./lib/config": "config",
    "./util": "util"
  } ],
  "chimple-richtext": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0f8cbR4trZMipR5IzFHkC0C", "chimple-richtext");
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
    var ccclass = cc._decorator.ccclass;
    var config_1 = require("./lib/config");
    var ChimpleRichText = function(_super) {
      __extends(ChimpleRichText, _super);
      function ChimpleRichText() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ChimpleRichText.prototype.onLoad = function() {
        this.useSystemFont = false;
        if (null !== config_1.default.getInstance()) {
          var fontName = config_1.default.getInstance().currentFontName;
          var fontLoaded = config_1.default.getInstance().hasLoadedTextFont(fontName);
          fontLoaded && (this.font = config_1.default.getInstance().getTextFont(fontName));
        }
      };
      ChimpleRichText = __decorate([ ccclass ], ChimpleRichText);
      return ChimpleRichText;
    }(cc.RichText);
    exports.default = ChimpleRichText;
    cc._RF.pop();
  }, {
    "./lib/config": "config"
  } ],
  chimple: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5c222p4y1JFPI6tk6YxS2K8", "chimple");
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
    exports.RECEIVED_TEACHER_REQUESTS = exports.DO_HOT_UPDATE = exports.PROJECT_MANIFEST = exports.UpdateEvent = exports.START_SCENE = exports.HOME_SCENE = exports.LANDING_SCENE = exports.LESSON_ID_KEY_FOR_ASSIGN_HW = exports.CHAPTER_ID_KEY_FOR_ASSIGN_HW = exports.TEACHER_ID_KEY_FOR_ASSIGN_HW = exports.STUDENT_ASSIGNMENT_ID_KEY = exports.ASSIGNMENT_ID_KEY_FOR_ASSIGN_HW = exports.ASSIGN_HOMEWORK = exports.TEACHER_ADD_STUDENT_ID = exports.TEACHER_SECTION_ID = exports.TEACHER_NAME_KEY = exports.TEACHER_ID_KEY = exports.MICROLINK = exports.RECEIVED_TEACHER_REQUEST = exports.TEACHER_ADDED = exports.ACCEPT_TEACHER_REQUEST_LINKED_USED = exports.ACCEPT_TEACHER_REQUEST = exports.REJECT_TEACHER_REQUEST = exports.NONE = exports.REGISTER = exports.SCHOOL = exports.HOME = exports.BASE = exports.DEPLOY_MODE = exports.CHIMPLE_MODE = void 0;
    var config_1 = require("./common/scripts/lib/config");
    var profile_1 = require("./common/scripts/lib/profile");
    var constants_1 = require("./common/scripts/lib/constants");
    var util_logger_1 = require("./common/scripts/util-logger");
    var util_1 = require("./common/scripts/util");
    var ServiceConfig_1 = require("./common/scripts/services/ServiceConfig");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    exports.CHIMPLE_MODE = "CHIMPLE_MODE";
    exports.DEPLOY_MODE = "DEPLOY_MODE";
    exports.BASE = "BASE";
    exports.HOME = "HOME";
    exports.SCHOOL = "SCHOOL";
    exports.REGISTER = "REGISTER";
    exports.NONE = "NONE";
    exports.REJECT_TEACHER_REQUEST = "reject_teacher_request";
    exports.ACCEPT_TEACHER_REQUEST = "accept_teacher_request";
    exports.ACCEPT_TEACHER_REQUEST_LINKED_USED = "accept_teacher_request_used";
    exports.TEACHER_ADDED = "teacher_added";
    exports.RECEIVED_TEACHER_REQUEST = "received_teacher_request";
    exports.MICROLINK = "microlink";
    exports.TEACHER_ID_KEY = "id";
    exports.TEACHER_NAME_KEY = "name";
    exports.TEACHER_SECTION_ID = "sectionid";
    exports.TEACHER_ADD_STUDENT_ID = "studentid";
    exports.ASSIGN_HOMEWORK = "assign_homework";
    exports.ASSIGNMENT_ID_KEY_FOR_ASSIGN_HW = "aid";
    exports.STUDENT_ASSIGNMENT_ID_KEY = "sid";
    exports.TEACHER_ID_KEY_FOR_ASSIGN_HW = "tid";
    exports.CHAPTER_ID_KEY_FOR_ASSIGN_HW = "cid";
    exports.LESSON_ID_KEY_FOR_ASSIGN_HW = "lid";
    exports.LANDING_SCENE = "private/school/scenes/landing";
    exports.HOME_SCENE = "menu/home/scenes/home";
    exports.START_SCENE = "menu/start/scenes/start";
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
    exports.DO_HOT_UPDATE = true;
    exports.RECEIVED_TEACHER_REQUESTS = false;
    cc.deep_link = function(url) {
      cc.log("deep link called with url:" + url);
      if (null !== url && url.includes("://chimple.cc/")) {
        var messageType = null;
        var splits = url.split("://chimple.cc/");
        if (null !== splits && 2 === splits.length) {
          var elements = splits[1].split("?");
          if (elements && 2 === elements.length) {
            messageType = elements.splice(0, 1)[0];
            if (messageType.includes(exports.RECEIVED_TEACHER_REQUEST) || messageType.includes(exports.MICROLINK)) {
              var items = elements[0].split(/[&=]+/);
              var data_1 = Object.assign({});
              if (null !== items && items.length % 2 === 0) {
                var all_keys = items;
                var all_values_1 = [];
                for (var i = 0; i < items.length; i++) all_values_1.push(all_keys.splice(i + 1, 1)[0]);
                var mappings = all_keys.map(function(e, i) {
                  return [ e, all_values_1[i] ];
                });
                mappings.forEach(function(arr) {
                  arr && 2 === arr.length && (data_1[arr[0].toLowerCase()] = arr[1]);
                });
              }
              if (messageType.includes(exports.MICROLINK)) {
                config_1.default.isMicroLink = true;
                var jsonMessages = util_1.Util.removeDuplicateMessages(data_1, messageType);
                cc.sys.localStorage.setItem(messageType, JSON.stringify(jsonMessages));
              }
              try {
                cc.log("RECEIVED_TEACHER_REQUEST", JSON.stringify(data_1));
                var jsonMessages = util_1.Util.removeDuplicateMessages(data_1, messageType);
                if (messageType.includes(exports.RECEIVED_TEACHER_REQUEST)) {
                  util_logger_1.default.logChimpleEvent(exports.RECEIVED_TEACHER_REQUEST, data_1);
                  cc.sys.localStorage.setItem(messageType, JSON.stringify(jsonMessages));
                  exports.RECEIVED_TEACHER_REQUESTS = true;
                }
              } catch (e) {}
            }
            cc.log("saved into local storage:" + cc.sys.localStorage.getItem(messageType));
          }
        }
      }
    };
    var Chimple = function(_super) {
      __extends(Chimple, _super);
      function Chimple() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.status = null;
        _this.fileProgress = null;
        _this.manifest = null;
        return _this;
      }
      Chimple_1 = Chimple;
      Chimple.prototype.onLoad = function() {
        return __awaiter(this, void 0, void 0, function() {
          var lang, langConfig, teachersAdded, updates, subpackages, doRestart;
          var _this = this;
          return __generator(this, function(_a) {
            cc.sys.isNative && jsb.fileUtils.setSearchPaths([ jsb.fileUtils.getWritablePath() + "HotUpdateSearchPaths", "@assets/" ]);
            cc.debug.setDisplayStats(false);
            ServiceConfig_1.ServiceConfig.getInstance(ServiceConfig_1.APIMode.FIREBASE);
            cc.macro.ENABLE_MULTI_TOUCH = false;
            util_logger_1.default.initPluginFirebase();
            util_1.Util.loadi18NMapping(function() {});
            lang = profile_1.default.lang || config_1.Lang.ENGLISH;
            langConfig = config_1.LANG_CONFIGS.get(lang);
            langConfig && config_1.default.i.loadFontDynamically(langConfig.font);
            util_logger_1.default.init();
            teachersAdded = JSON.parse(cc.sys.localStorage.getItem(exports.TEACHER_ADDED) || "[]");
            teachersAdded && teachersAdded.length > 0 && teachersAdded.forEach(function(t) {
              return util_logger_1.default.logChimpleEvent(exports.TEACHER_ADDED, t);
            });
            if (!cc.sys.isNative || !exports.DO_HOT_UPDATE) {
              this.selectModes();
              return [ 2 ];
            }
            updates = [ {
              storagePath: "HotUpdateSearchPaths",
              manifestUrl: this.manifest.nativeUrl
            } ];
            subpackages = util_1.Util.getSubpackages().map(function(val) {
              return {
                storagePath: subpackages + "/" + val,
                manifestUrl: val + "/project.manifest"
              };
            });
            doRestart = false;
            cc.log("Hot Update");
            this.oneByOne(updates, 0, function(index, restart) {
              doRestart = doRestart || restart;
              if (index == updates.length - 1) if (doRestart) {
                cc.audioEngine.stopAll();
                true;
                cc.assetManager.cacheManager.cachedFiles.forEach(function(val, key) {
                  cc.log("removeCache: " + key);
                  cc.assetManager.cacheManager.removeCache(key);
                });
                cc.game.restart();
              } else _this.selectModes();
            });
            return [ 2 ];
          });
        });
      };
      Chimple.prototype.selectModes = function() {
        var mode = parseInt(profile_1.default.getValue(profile_1.CURRENTMODE));
        var modes = mode;
        switch (modes) {
         case constants_1.Mode.Home:
          config_1.default.i.pushScene("private/home/loginnew/scenes/welcomePage", "private", null, true);
          break;

         case constants_1.Mode.School:
          null != cc.sys.localStorage.getItem(constants_1.REMEMBERED_USER) ? config_1.default.i.pushScene("private/school/scenes/currentLoggedUser", "private", null, true) : config_1.default.i.pushScene("private/school/scenes/sectionList", "private", null, true);
          break;

         default:
          config_1.default.i.pushScene("private/home/loginnew/scenes/welcomeScene", "private", null, true);
        }
      };
      Chimple.navigateToHome = function() {
        config_1.default.i.pushScene("private/home/loginnew/scenes/homeLoginScene", "private", null, true);
      };
      Chimple.prototype.navigateToBase = function() {
        var existingUsers = profile_1.User.getUsers();
        (null == existingUsers || existingUsers.length <= 0) && profile_1.User.createUser("test", "", 5, profile_1.Gender.GIRL, "test", "armydog");
        profile_1.User.setCurrentUser(profile_1.User.getUsers()[0]);
        config_1.default.i.pushScene("menu/start/scenes/start", "menu", null, true);
      };
      Chimple.prototype.oneByOne = function(updates, index, callbackOnEnd) {
        var _this = this;
        Chimple_1.doHotUpdate(updates[index].storagePath, updates[index].manifestUrl, null, function(event, status, percent) {
          _this.status.string = status;
          _this.fileProgress.progress = percent;
          if (event == UpdateEvent.Done || event == UpdateEvent.UpdateDone || event == UpdateEvent.Error) {
            callbackOnEnd(index, event == UpdateEvent.UpdateDone && "HotUpdateSearchPaths" == updates[index].storagePath);
            ++index < updates.length && _this.oneByOne(updates, index, callbackOnEnd);
          }
        });
      };
      Chimple.doHotUpdate = function(storagePath, manifestUrl, manifestJson, callback) {
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
      var Chimple_1;
      __decorate([ property(cc.Label) ], Chimple.prototype, "status", void 0);
      __decorate([ property(cc.ProgressBar) ], Chimple.prototype, "fileProgress", void 0);
      __decorate([ property({
        type: cc.Asset
      }) ], Chimple.prototype, "manifest", void 0);
      Chimple = Chimple_1 = __decorate([ ccclass ], Chimple);
      return Chimple;
    }(cc.Component);
    exports.default = Chimple;
    cc._RF.pop();
  }, {
    "./common/scripts/lib/config": "config",
    "./common/scripts/lib/constants": "constants",
    "./common/scripts/lib/profile": "profile",
    "./common/scripts/services/ServiceConfig": "ServiceConfig",
    "./common/scripts/util": "util",
    "./common/scripts/util-logger": "util-logger"
  } ],
  commonButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b30ec8FPl9AK6k5Jzt+78eL", "commonButton");
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
    var util_1 = require("./util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CommonButton = function(_super) {
      __extends(CommonButton, _super);
      function CommonButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.text = "hello";
        _this.label = null;
        return _this;
      }
      CommonButton.prototype.onLoad = function() {
        this.label.string = util_1.Util.i18NText(this.text);
      };
      CommonButton.prototype.start = function() {
        this.node.width = this.label.node.width + 48;
      };
      __decorate([ property ], CommonButton.prototype, "text", void 0);
      __decorate([ property(cc.Label) ], CommonButton.prototype, "label", void 0);
      CommonButton = __decorate([ ccclass ], CommonButton);
      return CommonButton;
    }(cc.Component);
    exports.default = CommonButton;
    cc._RF.pop();
  }, {
    "./util": "util"
  } ],
  config: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8d626S6TF5HCJ6vnsczwKzj", "config");
    "use strict";
    var __assign = this && this.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WORLDS = exports.World = exports.LANG_CONFIGS = exports.LangConfig = exports.ALL_LANGS = exports.Lang = exports.Direction = exports.ASSIGNMENT_COURSE_ID = exports.QUIZ_MATHS = exports.QUIZ_LITERACY = exports.BRIDGE_NAME = exports.BG_NAME = exports.StartAction = exports.Flow = exports.COURSES_LANG_ID = exports.COURSES = exports.STORY = exports.DEFAULT_FONT = void 0;
    var util_1 = require("../util");
    var util_logger_1 = require("../util-logger");
    var profile_1 = require("./profile");
    var gameConfigs_1 = require("./gameConfigs");
    var constants_1 = require("./constants");
    exports.DEFAULT_FONT = "main";
    exports.STORY = "story";
    exports.COURSES = [ "en", "en-maths", "hi", "hi-maths", "ur", "ur-maths" ];
    exports.COURSES_LANG_ID = [ "en", "hi", "maths", "kn" ];
    var Flow;
    (function(Flow) {
      Flow[Flow["Default"] = 0] = "Default";
      Flow[Flow["Platformer"] = 1] = "Platformer";
      Flow[Flow["Debug"] = 2] = "Debug";
      Flow[Flow["Open"] = 3] = "Open";
    })(Flow = exports.Flow || (exports.Flow = {}));
    var StartAction;
    (function(StartAction) {
      StartAction[StartAction["Start"] = 0] = "Start";
      StartAction[StartAction["MoveLessonPlan"] = 1] = "MoveLessonPlan";
      StartAction[StartAction["LessonComplete"] = 2] = "LessonComplete";
      StartAction[StartAction["Default"] = 3] = "Default";
    })(StartAction = exports.StartAction || (exports.StartAction = {}));
    exports.BG_NAME = "bgRoot";
    exports.BRIDGE_NAME = "bridge";
    exports.QUIZ_LITERACY = "quizliteracy";
    exports.QUIZ_MATHS = "quizmaths";
    exports.ASSIGNMENT_COURSE_ID = "assignment";
    var Direction;
    (function(Direction) {
      Direction[Direction["LTR"] = 0] = "LTR";
      Direction[Direction["RTL"] = 1] = "RTL";
    })(Direction = exports.Direction || (exports.Direction = {}));
    var RTL_COURSES = [ "ur", "ur-maths" ];
    var Lang;
    (function(Lang) {
      Lang["ENGLISH"] = "en";
      Lang["HINDI"] = "hi";
      Lang["KANNADA"] = "kn";
      Lang["MARATHI"] = "mr";
    })(Lang = exports.Lang || (exports.Lang = {}));
    exports.ALL_LANGS = [ Lang.ENGLISH, Lang.HINDI, Lang.KANNADA, Lang.MARATHI ];
    var LangConfig = function() {
      function LangConfig() {}
      return LangConfig;
    }();
    exports.LangConfig = LangConfig;
    exports.LANG_CONFIGS = new Map([ [ Lang.ENGLISH, {
      font: "en-main",
      displayName: "English",
      symbol: "A",
      colorCode: "#FFBC00"
    } ], [ Lang.HINDI, {
      font: "hi-main",
      displayName: "\u0939\u093f\u0928\u094d\u0926\u0940",
      symbol: "\u0905",
      colorCode: "#3E99E7"
    } ], [ Lang.KANNADA, {
      font: "kn-main",
      displayName: "\u0c95\u0ca8\u0ccd\u0ca8\u0ca1",
      symbol: "\u0c95",
      colorCode: "#6E4596"
    } ], [ Lang.MARATHI, {
      font: "hi-main",
      displayName: "\u092e\u0930\u093e\u0920\u0940",
      symbol: "\u092e",
      colorCode: "#99EE55"
    } ] ]);
    var World = function() {
      function World(scene, mapPrefab, armature) {
        this.scene = scene;
        this.mapPrefab = mapPrefab;
        this.armature = armature;
      }
      return World;
    }();
    exports.World = World;
    exports.WORLDS = [ new World("platform/scenes/assemble", "forestMapPrefab", "tiger"), new World("platform/scenes/cityAssemble", "cityMapPrefab", "dog"), new World("platform/scenes/desertAssemble", "desertMapPrefab", "camel"), new World("platform/scenes/gardenAssemble", "gardenMapPrefab", "rabbit"), new World("platform/scenes/seaAssemble", "seaMapPrefab", "koala"), new World("platform/scenes/skyAssemble", "skyMapPrefab", "horse"), new World("platform/scenes/snowAssemble", "snowMapPrefab", "bear"), new World("platform/scenes/beachAssemble", "beachMapPrefab", "hippo"), new World("platform/scenes/playgroundAssemble", "playgroundMapPrefab", "cat"), new World("platform/scenes/farmAssemble", "farmMapPrefab", "duck") ];
    var SceneDef = function() {
      function SceneDef(scene, bundle) {
        this.scene = scene;
        this.bundle = bundle;
      }
      return SceneDef;
    }();
    var Config = function() {
      function Config() {
        this._scenes = [];
        this._textFontMap = new Map();
        this.curriculum = new Map();
        this.allLessons = new Map();
        this.startAction = StartAction.Default;
      }
      Config.getInstance = function() {
        if (!Config.instance) {
          Config.instance = new Config();
          Config.instance.gameLevelName = "1";
          Config.instance.worksheet = 1;
          Config.instance.problem = 1;
          Config.instance.totalProblems = 1;
          Config.instance.flow = Flow.Default;
          Config.instance._textFontMap = new Map();
          Config.instance.currentFontName = exports.DEFAULT_FONT;
        }
        return Config.instance;
      };
      Object.defineProperty(Config, "i", {
        get: function() {
          return Config.getInstance();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Config, "dir", {
        get: function() {
          return Config.getInstance().course.id + "/";
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Config, "wide", {
        get: function() {
          return "kn" == Config.getInstance().course.id;
        },
        enumerable: false,
        configurable: true
      });
      Config.prototype.clear = function() {
        this.course = null;
        this.chapter = null;
        this.lesson = null;
      };
      Object.defineProperty(Config.prototype, "direction", {
        get: function() {
          return Direction.LTR;
        },
        enumerable: false,
        configurable: true
      });
      Config.prototype.setRewardChapter = function(chapterName) {
        this.course = this.curriculum.get("reward");
        this.chapter = this.course.chapters.find(function(c) {
          return c.id == chapterName;
        });
      };
      Config.prototype.unsetRewardChapter = function() {};
      Config.prototype.hasTracing = function() {
        return this._lessonData.rows.some(function(arr) {
          return arr[0].startsWith("write");
        });
      };
      Config.prototype.addTextFont = function(fontName, newVal) {
        this._textFontMap.set(fontName, newVal);
      };
      Config.prototype.hasLoadedTextFont = function(fontName) {
        var f = this._textFontMap.get(fontName);
        var isValid = this._textFontMap.has(fontName) && f && f.isValid;
        return isValid;
      };
      Config.prototype.hadLoadedTraceFont = function() {
        var traceFont = null;
        Array.from(this._textFontMap, function(_a) {
          var key = _a[0], value = _a[1];
          -1 !== key.indexOf("trace") && (traceFont = key);
        });
        return traceFont;
      };
      Config.prototype.getTextFont = function(fontName) {
        cc.log("fonts loaded:" + Array.from(this._textFontMap.keys()));
        return this._textFontMap.get(fontName);
      };
      Object.defineProperty(Config.prototype, "textFontMap", {
        get: function() {
          return this._textFontMap;
        },
        enumerable: false,
        configurable: true
      });
      Config.prototype.getAssignmentLessonsTodo = function() {
        return !this.assignments ? [] : this.assignments.filter(function(ass) {
          var lesson = Config.i.allLessons.get(ass.lessonId);
          var lessonProgress = profile_1.User.getCurrentUser().lessonProgressMap.get(ass.lessonId);
          return !!lesson && (!lessonProgress || ![].concat(lessonProgress.assignmentIds).includes(ass.assignmentId));
        }).map(function(ass) {
          var lesson = Config.i.allLessons.get(ass.lessonId);
          var newLesson = __assign({}, lesson);
          newLesson.assignmentId = ass.assignmentId;
          newLesson.name = !ass.lessonName ? lesson.name : ass.lessonName;
          return newLesson;
        });
      };
      Config.preloadScene = function(scene, callback) {
        cc.director.preloadScene(scene, function() {
          null != callback && callback();
        });
      };
      Config.loadScene = function(scene, bundle, callback) {
        void 0 === bundle && (bundle = null);
        void 0 === callback && (callback = null);
        util_1.Util.freeResources();
        var lang = "common/scenes/lessonController" == scene ? "maths" == Config.i.course.id ? Config.i.hasTracing ? Lang.ENGLISH : profile_1.default.lang : Config.i.course.lang : profile_1.default.lang || Lang.ENGLISH;
        var langConfig = exports.LANG_CONFIGS.get(lang);
        Config.i.currentFontName = langConfig.font;
        Config.i.hasLoadedTextFont(langConfig.font) ? Config.continueLoadScene(scene, bundle, callback) : Config.i.loadFontDynamically(langConfig.font, function() {
          cc.log("Loading font ....", langConfig.font);
          Config.continueLoadScene(scene, bundle, callback);
        });
      };
      Config.continueLoadScene = function(scene, bundle, callback) {
        void 0 === bundle && (bundle = null);
        void 0 === callback && (callback = null);
        if (null != bundle) {
          util_logger_1.default.logChimpleEvent("load_scene", {
            scene: scene,
            bundle: bundle
          });
          util_logger_1.default.logChimpleEvent("screen_view", {
            scene: scene,
            bundle: bundle
          });
          cc.assetManager.loadBundle(bundle, function(err, loadedBundle) {
            err ? cc.log("Failed loading bundle: " + bundle + " " + err) : loadedBundle.loadScene(scene, function(err, loadedScene) {
              err ? cc.log("Failed loading scene: " + bundle + " " + err) : cc.director.runScene(loadedScene, null, function() {
                cc.sys.garbageCollect();
                null != callback && callback();
              });
            });
          });
        } else cc.director.loadScene(scene, function() {
          util_logger_1.default.logChimpleEvent("load_scene", {
            scene: scene
          });
          util_logger_1.default.logChimpleEvent("screen_view", {
            scene: scene
          });
          cc.sys.garbageCollect();
          null != callback && callback();
        });
      };
      Config.prototype.pushScene = function(scene, bundle, callback, first) {
        void 0 === bundle && (bundle = null);
        void 0 === callback && (callback = null);
        void 0 === first && (first = false);
        first && this.popAllScenes();
        this._scenes.push(new SceneDef(scene, bundle));
        Config.loadScene(scene, bundle, callback);
      };
      Config.prototype.popScene = function() {
        var popScene = this._scenes.pop();
        util_logger_1.default.logChimpleEvent("scene_exit", {
          scene: popScene.scene,
          bundle: popScene.bundle
        });
        var config = Config.i;
        if (!!config && !!config.game) {
          var gameConfig = gameConfigs_1.GAME_CONFIGS[config.game];
          !gameConfig || !gameConfig.fontName || !config.currentFontName || config.releaseFont(config.currentFontName);
          config.game = null;
        }
        var sceneDef = this._scenes[this._scenes.length - 1];
        var scene = sceneDef.scene;
        scene.startsWith("menu/map/scene/map") && (scene = scene.substr(0, scene.length - 1) + profile_1.default.lastWorld);
        Config.loadScene(scene, sceneDef.bundle);
      };
      Config.prototype.prePopScene = function(callback) {
        var sceneDef = this._scenes[this._scenes.length - 2];
        var scene = sceneDef.scene;
        scene.startsWith("menu/map/scene/map") && (scene = scene.substr(0, scene.length - 1) + profile_1.default.lastWorld);
        Config.preloadScene(scene, callback);
      };
      Config.prototype.popAllScenes = function() {
        this._scenes = [];
      };
      Object.defineProperty(Config.prototype, "canPop", {
        get: function() {
          return this._scenes.length > 1;
        },
        enumerable: false,
        configurable: true
      });
      Config.prototype.releaseFont = function(fontName) {
        if (this._textFontMap.has(fontName)) {
          cc.log("releasing current font", fontName);
          cc.resources.release(fontName);
          this._textFontMap.delete(fontName);
          Config.i.currentFontName = null;
        }
      };
      Config.prototype.loadFontDynamically = function(fontName, callBack, data) {
        var _this = this;
        void 0 === callBack && (callBack = null);
        void 0 === data && (data = null);
        if (this.hasLoadedTextFont(fontName)) {
          this.currentFontName = fontName;
          !callBack || callBack(data);
        } else cc.resources.load("fonts/" + fontName, cc.Font, function(err, fontAsset) {
          if (err) !callBack || callBack(data); else {
            console.log("loading font from Config", fontName);
            _this._textFontMap.set(fontName, fontAsset);
            null !== _this.hadLoadedTraceFont() ? _this.currentFontName = _this.hadLoadedTraceFont() : _this.currentFontName = fontName;
            !callBack || callBack(data);
          }
        });
      };
      Config.prototype.loadLessonJson = function(callback, node, lessons, maxPerLesson) {
        var _this = this;
        void 0 === node && (node = null);
        void 0 === lessons && (lessons = null);
        void 0 === maxPerLesson && (maxPerLesson = 0);
        if (0 != this.problem) callback(this._lessonData.rows[this.problem - 1]); else if (null != lessons) {
          var allLessonData = [];
          var numLessons_1 = lessons.length;
          lessons.forEach(function(les) {
            var jsonFile = _this.course.id + "/" + les.id + "/res/" + les.id + ".json";
            util_1.Util.load(jsonFile, function(err, jsonAsset) {
              var lessonData = jsonAsset instanceof cc.JsonAsset ? jsonAsset.json : jsonAsset;
              var quizRows = lessonData.rows.filter(function(el) {
                return el[0].toLowerCase().includes("quiz");
              }).map(function(el) {
                el[2] = les.id;
                return el;
              });
              allLessonData = allLessonData.concat(maxPerLesson > 0 ? util_1.Util.shuffle(quizRows).slice(0, maxPerLesson) : quizRows);
              numLessons_1--;
            });
          });
          var checkAllLoaded_1 = function() {
            if (numLessons_1 <= 0) {
              cc.director.getScheduler().unschedule(checkAllLoaded_1, node);
              if (0 == maxPerLesson) {
                util_1.Util.shuffle(allLessonData);
                _this._lessonData = {
                  rows: allLessonData.slice(0, Math.min(10, allLessonData.length - 1))
                };
              } else _this._lessonData = {
                rows: allLessonData
              };
              _this.totalProblems = _this._lessonData.rows.length;
              _this.problem = 1;
              null != callback && callback(_this._lessonData.rows[_this.problem - 1]);
            }
          };
          cc.director.getScheduler().schedule(checkAllLoaded_1, node, 1);
        } else {
          var jsonFile = this.course.id + "/" + this.lesson.id + "/res/" + this.lesson.id + ".json";
          util_1.Util.load(jsonFile, function(err, jsonAsset) {
            _this._lessonData = jsonAsset instanceof cc.JsonAsset ? jsonAsset.json : jsonAsset;
            if (_this.lesson.id.endsWith("_PreQuiz")) {
              var numChunks = 4;
              var chunkLength = Math.floor(_this._lessonData.rows.length / numChunks);
              var subArr = [];
              for (var index = 0; index < numChunks; index++) {
                var r1 = util_1.Util.randomBetween(0, chunkLength - 2);
                var r2 = util_1.Util.randomBetween(r1 + 1, chunkLength - 1);
                var r3 = util_1.Util.randomBetween(r2 + 1, chunkLength);
                subArr.push(_this._lessonData.rows[index * chunkLength + r1]);
                subArr.push(_this._lessonData.rows[index * chunkLength + r2]);
                subArr.push(_this._lessonData.rows[index * chunkLength + r3]);
                cc.log(r1, r2, r3);
              }
              _this._lessonData.rows = subArr;
            }
            _this._lessonData.rows.forEach(function(el) {
              el[2] = _this.lesson.id;
            });
            _this.totalProblems = _this._lessonData.rows.length;
            _this.problem = 1;
            null != callback && callback(_this._lessonData.rows[_this.problem - 1]);
          }, true);
        }
      };
      Config.prototype.nextProblem = function() {
        if (this.problem < this.totalProblems) {
          this.problem++;
          this.data = [ this._lessonData.rows[this.problem - 1] ];
        }
      };
      Config.prototype.prevProblem = function() {
        if (this.problem > 1) {
          this.problem--;
          this.data = [ this._lessonData.rows[this.problem - 1] ];
        }
      };
      Config.prototype.loadPathJSON = function(fileName, callback, isNumber) {
        void 0 === isNumber && (isNumber = false);
        var data = [];
        var jsonData = null;
        var appendPath = null;
        fileName = fileName.trim();
        isNumber = !isNaN(Number(fileName));
        var jsonFile = null;
        if (-1 !== fileName.indexOf("tutorial")) {
          fileName = fileName.replace(".png", "");
          jsonFile = "course-" + this.course.id + "/" + this.lesson.id + "/res/" + fileName + "-json";
        } else {
          var isUpperCase = fileName === fileName.toUpperCase();
          appendPath = isNumber ? "numbers" : isUpperCase ? "upper" : "lower";
          jsonFile = this.course.id + "/course/res/paths/" + appendPath + "/" + fileName;
        }
        jsonFile += ".json";
        util_1.Util.load(jsonFile, function(err, jsonAsset) {
          data = [];
          if (null !== jsonAsset) {
            var json = jsonAsset instanceof cc.JsonAsset ? jsonAsset.json : jsonAsset;
            Array.isArray(json) && json.forEach(function(el) {
              data.push(el);
            });
          }
          jsonData = !!data && data.length > 0 ? JSON.stringify(data) : null != cc.sys.localStorage.getItem(fileName) && cc.sys.localStorage.getItem(fileName).length > 0 ? cc.sys.localStorage.getItem(fileName) : null;
          callback(jsonData);
        }, true);
      };
      Config.prototype.loadCourseJsons = function(user, node, callBack) {
        var _this = this;
        var numCourses = 0;
        user.courseProgressMap.forEach(function(courseProgress, name) {
          numCourses++;
          _this.loadSingleCourseJson(name, function() {
            numCourses--;
          });
        });
        numCourses++;
        this.loadSingleCourseJson("reward", function() {
          return numCourses--;
        });
        var checkAllLoaded = function() {
          if (numCourses <= 0) {
            user.curriculumLoaded = true;
            cc.director.getScheduler().unschedule(checkAllLoaded, node);
            callBack();
          }
        };
        cc.director.getScheduler().schedule(checkAllLoaded, node, 1);
      };
      Config.prototype.loadSingleCourseJson = function(name, callBack) {
        var _this = this;
        cc.assetManager.loadBundle(name, function(err, bundle) {
          if (err) return console.error(err);
          util_1.Util.bundles.set(name, bundle);
          var jsonFile = name + "/course/res/course.json";
          util_1.Util.load(jsonFile, function(err, jsonAsset) {
            if (!err) {
              var course_1 = jsonAsset instanceof cc.JsonAsset ? jsonAsset.json : jsonAsset;
              course_1.chapters.forEach(function(chapter) {
                chapter.course = course_1;
                chapter.lessons.forEach(function(lesson) {
                  lesson.chapter = chapter;
                  profile_1.User.getCurrentUser() && profile_1.User.getCurrentUser().debug ? lesson.open = true : lesson.open = false;
                  _this.allLessons.set(lesson.id, lesson);
                });
              });
              _this.curriculum.set(name, course_1);
            }
            callBack();
          });
        });
      };
      Config.loadBundle = function(lessonId, callback, errCallback) {
        cc.assetManager.loadBundle(lessonId, function(err, bundle) {
          err ? cc.assetManager.loadBundle(constants_1.BUNDLE_URL + lessonId, function(err2, bundle2) {
            err2 ? errCallback(err2) : callback(bundle2);
          }) : callback(bundle);
        });
      };
      Object.defineProperty(Config.prototype, "friend", {
        get: function() {
          return "chimp";
        },
        enumerable: false,
        configurable: true
      });
      return Config;
    }();
    exports.default = Config;
    cc._RF.pop();
  }, {
    "../util": "util",
    "../util-logger": "util-logger",
    "./constants": "constants",
    "./gameConfigs": "gameConfigs",
    "./profile": "profile"
  } ],
  constants: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fd8a7oihmBN6IXQofI2E6oP", "constants");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.FIREBASE_STUDENT_ID = exports.FIREBASE_SECTION_ID = exports.FIREBASE_SCHOOL_ID = exports.CURRENT_SUBJECT_ID = exports.CURRENT_SECTION_ID = exports.CURRENT_CLASS_ID = exports.CURRENT_STUDENT_ID = exports.CURRENT_SCHOOL_ID = exports.PARSE_ENABLED = exports.QUEUE_OFFLOAD_FREQUENCY = exports.LEVEL_END = exports.LEVEL_NAME = exports.LEVEL_START = exports.ACHIEVEMENT_ID = exports.UNLOCK_ACHIEVEMENT = exports.CONTENT_TYPE = exports.ITEM_ID = exports.SELECT_CONTENT = exports.FAIL_TO_COLLECT_ALL_REWARDS = exports.APP_END = exports.APP_START = exports.WORLD_COMPLETED = exports.LEVEL_COMPLETED = exports.GAME_END = exports.PROBLEM_END = exports.GAME_START = exports.PROBLEM_START = exports.LOG_TYPE = exports.LOG_RIGHT_MOVES = exports.LOG_WRONG_MOVES = exports.LOG_PROBLEM = exports.LOG_GAME_LEVEL = exports.SKILLS = exports.COURSE = exports.LOG_LEVEL = exports.LOG_WORLD = exports.LOG_GAME = exports.ASSET_URL = exports.BUNDLE_URL = exports.COURSES_URL = exports.COURSE_SERVER = exports.SIMULATOR_ROOT_DIR = exports.ANDROID_ROOT_DIR = exports.ASSET_LOAD_METHOD = exports.ENV = exports.LANG = exports.MODE = exports.D_MODE = exports.Mode = exports.DeployMode = void 0;
    exports.firebaseConfigWeb = exports.COUNTRY_CODES = exports.MICROLINK_END_BLANK = exports.MIN_PASS = exports.EXAM = exports.IS_REMEMBER_TOGGLE_ON = exports.REMEMBERED_USER = exports.LOGGED_IN_USER = void 0;
    var DeployMode;
    (function(DeployMode) {
      DeployMode[DeployMode["Open"] = 0] = "Open";
      DeployMode[DeployMode["Close"] = 1] = "Close";
    })(DeployMode = exports.DeployMode || (exports.DeployMode = {}));
    var Mode;
    (function(Mode) {
      Mode[Mode["Base"] = 0] = "Base";
      Mode[Mode["Home"] = 1] = "Home";
      Mode[Mode["Teacher"] = 2] = "Teacher";
      Mode[Mode["School"] = 3] = "School";
      Mode[Mode["None"] = 4] = "None";
    })(Mode = exports.Mode || (exports.Mode = {}));
    exports.D_MODE = DeployMode.Close;
    exports.MODE = Mode.None;
    exports.LANG = "en";
    exports.ENV = "web";
    exports.ASSET_LOAD_METHOD = "file";
    exports.ANDROID_ROOT_DIR = "/sdcard/bahama/";
    exports.SIMULATOR_ROOT_DIR = "/Users/shyamalupadhyaya/Dev/chimple-git/sdcard/bahama/";
    exports.COURSE_SERVER = {
      local: {
        hi: "http://localhost:8901/courses/",
        en: "http://localhost:8901/courses/",
        "en-maths": "http://localhost:8901/courses/",
        "hi-maths": "http://localhost:8901/courses/"
      },
      dev: {
        hi: "https://bahama-hi-stage.web.app/bundles/courses/",
        en: "https://bahama-hi-stage.web.app/bundles/courses/",
        "en-maths": "https://bahama-hi-stage.web.app/bundles/courses/",
        "hi-maths": "https://bahama-hi-stage.web.app/bundles/courses/"
      },
      stage: {
        hi: "https://bahama-hi-stage.web.app/new/courses/",
        en: "https://bahama-hi-stage.web.app/new/courses/",
        "en-maths": "https://bahama-hi-stage.web.app/new/courses/",
        "hi-maths": "https://bahama-hi-stage.web.app/new/courses/"
      },
      prod: {
        hi: "https://bahama-hi-prod.web.app/courses/",
        en: "https://bahama-hi-prod.web.app/courses/",
        "en-maths": "https://bahama-hi-prod.web.app/courses/",
        "hi-maths": "https://bahama-hi-prod.web.app/courses/"
      }
    };
    exports.COURSES_URL = "web" == exports.ENV ? "" : exports.COURSE_SERVER[exports.ENV][exports.LANG];
    exports.BUNDLE_URL = "https://bahama-ta-stage.web.app/remote/";
    exports.ASSET_URL = "https://media.githubusercontent.com/media/chimple/help-audio/main";
    exports.LOG_GAME = "game";
    exports.LOG_WORLD = "world";
    exports.LOG_LEVEL = "level";
    exports.COURSE = "course";
    exports.SKILLS = "skills";
    exports.LOG_GAME_LEVEL = "gameLevel";
    exports.LOG_PROBLEM = "problem";
    exports.LOG_WRONG_MOVES = "wrongMoves";
    exports.LOG_RIGHT_MOVES = "rightMoves";
    exports.LOG_TYPE = "type";
    exports.PROBLEM_START = "problemStart";
    exports.GAME_START = "gameStart";
    exports.PROBLEM_END = "problemEnd";
    exports.GAME_END = "gameEnd";
    exports.LEVEL_COMPLETED = "level_completed";
    exports.WORLD_COMPLETED = "world_completed";
    exports.APP_START = "app_start";
    exports.APP_END = "app_end";
    exports.FAIL_TO_COLLECT_ALL_REWARDS = "failToCollectAllRewards";
    exports.SELECT_CONTENT = "select_content";
    exports.ITEM_ID = "item_id";
    exports.CONTENT_TYPE = "content_type";
    exports.UNLOCK_ACHIEVEMENT = "unlock_achievement";
    exports.ACHIEVEMENT_ID = "achievement_id";
    exports.LEVEL_START = "level_start";
    exports.LEVEL_NAME = "level_name";
    exports.LEVEL_END = "level_end";
    exports.QUEUE_OFFLOAD_FREQUENCY = 3e4;
    exports.PARSE_ENABLED = true;
    exports.CURRENT_SCHOOL_ID = "CURRENT_SCHOOL_ID";
    exports.CURRENT_STUDENT_ID = "CURRENT_STUDENT_ID";
    exports.CURRENT_CLASS_ID = "CURRENT_CLASS_ID";
    exports.CURRENT_SECTION_ID = "CURRENT_SECTION_ID";
    exports.CURRENT_SUBJECT_ID = "CURRENT_SUBJECT_ID";
    exports.FIREBASE_SCHOOL_ID = "schoolId";
    exports.FIREBASE_SECTION_ID = "sectionId";
    exports.FIREBASE_STUDENT_ID = "studentId";
    exports.LOGGED_IN_USER = "loggedInUser";
    exports.REMEMBERED_USER = "currentlyRememberedUser";
    exports.IS_REMEMBER_TOGGLE_ON = "isRememberToggleOn";
    exports.EXAM = "exam";
    exports.MIN_PASS = 70;
    exports.MICROLINK_END_BLANK = "blank";
    exports.COUNTRY_CODES = [ {
      name: "Afghanistan",
      dial_code: "+93",
      code: "AF"
    }, {
      name: "Aland Islands",
      dial_code: "+358",
      code: "AX"
    }, {
      name: "Albania",
      dial_code: "+355",
      code: "AL"
    }, {
      name: "Algeria",
      dial_code: "+213",
      code: "DZ"
    }, {
      name: "American Samoa",
      dial_code: "+684",
      code: "AS"
    }, {
      name: "Andorra",
      dial_code: "+376",
      code: "AD"
    }, {
      name: "Angola",
      dial_code: "+244",
      code: "AO"
    }, {
      name: "Anguilla",
      dial_code: "+1264",
      code: "AI"
    }, {
      name: "Antarctica",
      dial_code: "+672",
      code: "AQ"
    }, {
      name: "Antigua & Barbuda",
      dial_code: "+1268",
      code: "AG"
    }, {
      name: "Argentina",
      dial_code: "+54",
      code: "AR"
    }, {
      name: "Armenia",
      dial_code: "+374",
      code: "AM"
    }, {
      name: "Aruba",
      dial_code: "+297",
      code: "AW"
    }, {
      name: "Australia",
      dial_code: "+61",
      code: "AU"
    }, {
      name: "Austria",
      dial_code: "+43",
      code: "AT"
    }, {
      name: "Azerbaijan",
      dial_code: "+994",
      code: "AZ"
    }, {
      name: "Bahamas",
      dial_code: "+1242",
      code: "BS"
    }, {
      name: "Bahrain",
      dial_code: "+973",
      code: "BH"
    }, {
      name: "Bangladesh",
      dial_code: "+880",
      code: "BD"
    }, {
      name: "Barbados",
      dial_code: "+1246",
      code: "BB"
    }, {
      name: "Belarus",
      dial_code: "+375",
      code: "BY"
    }, {
      name: "Belgium",
      dial_code: "+32",
      code: "BE"
    }, {
      name: "Belize",
      dial_code: "+501",
      code: "BZ"
    }, {
      name: "Benin",
      dial_code: "+229",
      code: "BJ"
    }, {
      name: "Bermuda",
      dial_code: "+1441",
      code: "BM"
    }, {
      name: "Bhutan",
      dial_code: "+975",
      code: "BT"
    }, {
      name: "Bolivia",
      dial_code: "+591",
      code: "BO"
    }, {
      name: "Bosnia & Herzegovina",
      dial_code: "+387",
      code: "BA"
    }, {
      name: "Botswana",
      dial_code: "+267",
      code: "BW"
    }, {
      name: "Brazil",
      dial_code: "+55",
      code: "BR"
    }, {
      name: "British Indian Ocean Territory",
      dial_code: "+246",
      code: "IO"
    }, {
      name: "Brunei Darussalam",
      dial_code: "+673",
      code: "BN"
    }, {
      name: "Bulgaria",
      dial_code: "+359",
      code: "BG"
    }, {
      name: "Burkina Faso",
      dial_code: "+226",
      code: "BF"
    }, {
      name: "Burundi",
      dial_code: "+257",
      code: "BI"
    }, {
      name: "Cambodia",
      dial_code: "+855",
      code: "KH"
    }, {
      name: "Cameroon",
      dial_code: "+237",
      code: "CM"
    }, {
      name: "Canada",
      dial_code: "+1",
      code: "CA"
    }, {
      name: "Cape Verde",
      dial_code: "+238",
      code: "CV"
    }, {
      name: "Cayman Islands",
      dial_code: "+ 345",
      code: "KY"
    }, {
      name: "Central African Republic",
      dial_code: "+236",
      code: "CF"
    }, {
      name: "Chad",
      dial_code: "+235",
      code: "TD"
    }, {
      name: "Chile",
      dial_code: "+56",
      code: "CL"
    }, {
      name: "China",
      dial_code: "+86",
      code: "CN"
    }, {
      name: "Christmas Island",
      dial_code: "+61",
      code: "CX"
    }, {
      name: "Cocos (Keeling) Islands",
      dial_code: "+61",
      code: "CC"
    }, {
      name: "Colombia",
      dial_code: "+57",
      code: "CO"
    }, {
      name: "Comoros",
      dial_code: "+269",
      code: "KM"
    }, {
      name: "Congo",
      dial_code: "+243",
      code: "CG"
    }, {
      name: "Cook Islands",
      dial_code: "+682",
      code: "CK"
    }, {
      name: "Costa Rica",
      dial_code: "+506",
      code: "CR"
    }, {
      name: "Cote d'Ivoire",
      dial_code: "+225",
      code: "CI"
    }, {
      name: "Croatia",
      dial_code: "+385",
      code: "HR"
    }, {
      name: "Cuba",
      dial_code: "+53",
      code: "CU"
    }, {
      name: "Cyprus",
      dial_code: "+537",
      code: "CY"
    }, {
      name: "Czechia",
      dial_code: "+420",
      code: "CZ"
    }, {
      name: "Denmark",
      dial_code: "+45",
      code: "DK"
    }, {
      name: "Djibouti",
      dial_code: "+253",
      code: "DJ"
    }, {
      name: "Dominica",
      dial_code: "+1767",
      code: "DM"
    }, {
      name: "Dominican Republic",
      dial_code: "+1849",
      code: "DO"
    }, {
      name: "Ecuador",
      dial_code: "+593",
      code: "EC"
    }, {
      name: "Egypt",
      dial_code: "+20",
      code: "EG"
    }, {
      name: "El Salvador",
      dial_code: "+503",
      code: "SV"
    }, {
      name: "Equatorial Guinea",
      dial_code: "+240",
      code: "GQ"
    }, {
      name: "Eritrea",
      dial_code: "+291",
      code: "ER"
    }, {
      name: "Estonia",
      dial_code: "+372",
      code: "EE"
    }, {
      name: "Ethiopia",
      dial_code: "+251",
      code: "ET"
    }, {
      name: "Falkland Islands (Malvinas)",
      dial_code: "+500",
      code: "FK"
    }, {
      name: "Faroe Islands",
      dial_code: "+298",
      code: "FO"
    }, {
      name: "Fiji",
      dial_code: "+679",
      code: "FJ"
    }, {
      name: "Finland",
      dial_code: "+358",
      code: "FI"
    }, {
      name: "France",
      dial_code: "+33",
      code: "FR"
    }, {
      name: "French Guiana",
      dial_code: "+594",
      code: "GF"
    }, {
      name: "French Polynesia",
      dial_code: "+689",
      code: "PF"
    }, {
      name: "Gabon",
      dial_code: "+241",
      code: "GA"
    }, {
      name: "Gambia",
      dial_code: "+220",
      code: "GM"
    }, {
      name: "Georgia",
      dial_code: "+995",
      code: "GE"
    }, {
      name: "Germany",
      dial_code: "+49",
      code: "DE"
    }, {
      name: "Ghana",
      dial_code: "+233",
      code: "GH"
    }, {
      name: "Gibraltar",
      dial_code: "+350",
      code: "GI"
    }, {
      name: "Greece",
      dial_code: "+30",
      code: "GR"
    }, {
      name: "Greenland",
      dial_code: "+299",
      code: "GL"
    }, {
      name: "Grenada",
      dial_code: "+1473",
      code: "GD"
    }, {
      name: "Guadeloupe",
      dial_code: "+590",
      code: "GP"
    }, {
      name: "Guam",
      dial_code: "+1671",
      code: "GU"
    }, {
      name: "Guatemala",
      dial_code: "+502",
      code: "GT"
    }, {
      name: "Guernsey",
      dial_code: "+44",
      code: "GG"
    }, {
      name: "Guinea",
      dial_code: "+224",
      code: "GN"
    }, {
      name: "Guinea-Bissau",
      dial_code: "+245",
      code: "GW"
    }, {
      name: "Guyana",
      dial_code: "+595",
      code: "GY"
    }, {
      name: "Haiti",
      dial_code: "+509",
      code: "HT"
    }, {
      name: "Honduras",
      dial_code: "+504",
      code: "HN"
    }, {
      name: "Hong Kong",
      dial_code: "+852",
      code: "HK"
    }, {
      name: "Hungary",
      dial_code: "+36",
      code: "HU"
    }, {
      name: "Iceland",
      dial_code: "+354",
      code: "IS"
    }, {
      name: "India",
      dial_code: "+91",
      code: "IN"
    }, {
      name: "Indonesia",
      dial_code: "+62",
      code: "ID"
    }, {
      name: "Iran, Islamic Republic of",
      dial_code: "+98",
      code: "IR"
    }, {
      name: "Iraq",
      dial_code: "+964",
      code: "IQ"
    }, {
      name: "Ireland",
      dial_code: "+353",
      code: "IE"
    }, {
      name: "Isle of Man",
      dial_code: "+44",
      code: "IM"
    }, {
      name: "Israel",
      dial_code: "+972",
      code: "IL"
    }, {
      name: "Italy",
      dial_code: "+39",
      code: "IT"
    }, {
      name: "Jamaica",
      dial_code: "+1876",
      code: "JM"
    }, {
      name: "Japan",
      dial_code: "+81",
      code: "JP"
    }, {
      name: "Jersey",
      dial_code: "+44",
      code: "JE"
    }, {
      name: "Jordan",
      dial_code: "+962",
      code: "JO"
    }, {
      name: "Kazakhstan",
      dial_code: "+7",
      code: "KZ"
    }, {
      name: "Kenya",
      dial_code: "+254",
      code: "KE"
    }, {
      name: "Kiribati",
      dial_code: "+686",
      code: "KI"
    }, {
      name: "Kuwait",
      dial_code: "+965",
      code: "KW"
    }, {
      name: "Kyrgyzstan",
      dial_code: "+996",
      code: "KG"
    }, {
      name: "Laos",
      dial_code: "+856",
      code: "LA"
    }, {
      name: "Latvia",
      dial_code: "+371",
      code: "LV"
    }, {
      name: "Lebanon",
      dial_code: "+961",
      code: "LB"
    }, {
      name: "Lesotho",
      dial_code: "+266",
      code: "LS"
    }, {
      name: "Liberia",
      dial_code: "+231",
      code: "LR"
    }, {
      name: "Libyan Arab Jamahiriya",
      dial_code: "+218",
      code: "LY"
    }, {
      name: "Liechtenstein",
      dial_code: "+423",
      code: "LI"
    }, {
      name: "Lithuania",
      dial_code: "+370",
      code: "LT"
    }, {
      name: "Luxembourg",
      dial_code: "+352",
      code: "LU"
    }, {
      name: "Macao",
      dial_code: "+853",
      code: "MO"
    }, {
      name: "Macedonia",
      dial_code: "+389",
      code: "MK"
    }, {
      name: "Madagascar",
      dial_code: "+261",
      code: "MG"
    }, {
      name: "Malawi",
      dial_code: "+265",
      code: "MW"
    }, {
      name: "Malaysia",
      dial_code: "+60",
      code: "MY"
    }, {
      name: "Maldives",
      dial_code: "+960",
      code: "MV"
    }, {
      name: "Mali",
      dial_code: "+223",
      code: "ML"
    }, {
      name: "Malta",
      dial_code: "+356",
      code: "MT"
    }, {
      name: "Marshall Islands",
      dial_code: "+692",
      code: "MH"
    }, {
      name: "Martinique",
      dial_code: "+596",
      code: "MQ"
    }, {
      name: "Mauritania",
      dial_code: "+222",
      code: "MR"
    }, {
      name: "Mauritius",
      dial_code: "+230",
      code: "MU"
    }, {
      name: "Mayotte",
      dial_code: "+262",
      code: "YT"
    }, {
      name: "Mexico",
      dial_code: "+52",
      code: "MX"
    }, {
      name: "Micronesia, Federated States of",
      dial_code: "+691",
      code: "FM"
    }, {
      name: "Moldova, Republic of",
      dial_code: "+373",
      code: "MD"
    }, {
      name: "Monaco",
      dial_code: "+377",
      code: "MC"
    }, {
      name: "Mongolia",
      dial_code: "+976",
      code: "MN"
    }, {
      name: "Montenegro",
      dial_code: "+382",
      code: "ME"
    }, {
      name: "Montserrat",
      dial_code: "+1664",
      code: "MS"
    }, {
      name: "Morocco",
      dial_code: "+212",
      code: "MA"
    }, {
      name: "Mozambique",
      dial_code: "+258",
      code: "MZ"
    }, {
      name: "Myanmar",
      dial_code: "+95",
      code: "MM"
    }, {
      name: "Namibia",
      dial_code: "+264",
      code: "NA"
    }, {
      name: "Nauru",
      dial_code: "+674",
      code: "NR"
    }, {
      name: "Nepal",
      dial_code: "+977",
      code: "NP"
    }, {
      name: "Netherlands",
      dial_code: "+31",
      code: "NL"
    }, {
      name: "Netherlands Antilles",
      dial_code: "+599",
      code: "AN"
    }, {
      name: "New Caledonia",
      dial_code: "+687",
      code: "NC"
    }, {
      name: "New Zealand",
      dial_code: "+64",
      code: "NZ"
    }, {
      name: "Nicaragua",
      dial_code: "+505",
      code: "NI"
    }, {
      name: "Niger",
      dial_code: "+227",
      code: "NE"
    }, {
      name: "Nigeria",
      dial_code: "+234",
      code: "NG"
    }, {
      name: "Niue",
      dial_code: "+683",
      code: "NU"
    }, {
      name: "Norfolk Island",
      dial_code: "+672",
      code: "NF"
    }, {
      name: "North Korea",
      dial_code: "+850",
      code: "KP"
    }, {
      name: "Northern Mariana Islands",
      dial_code: "+1670",
      code: "MP"
    }, {
      name: "Norway",
      dial_code: "+47",
      code: "NO"
    }, {
      name: "Oman",
      dial_code: "+968",
      code: "OM"
    }, {
      name: "Pakistan",
      dial_code: "+92",
      code: "PK"
    }, {
      name: "Palau",
      dial_code: "+680",
      code: "PW"
    }, {
      name: "Palestinian Territory, Occupied",
      dial_code: "+970",
      code: "PS"
    }, {
      name: "Panama",
      dial_code: "+507",
      code: "PA"
    }, {
      name: "Papua New Guinea",
      dial_code: "+675",
      code: "PG"
    }, {
      name: "Paraguay",
      dial_code: "+595",
      code: "PY"
    }, {
      name: "Peru",
      dial_code: "+51",
      code: "PE"
    }, {
      name: "Philippines",
      dial_code: "+63",
      code: "PH"
    }, {
      name: "Pitcairn",
      dial_code: "+872",
      code: "PN"
    }, {
      name: "Poland",
      dial_code: "+48",
      code: "PL"
    }, {
      name: "Portugal",
      dial_code: "+351",
      code: "PT"
    }, {
      name: "Puerto Rico",
      dial_code: "+1939",
      code: "PR"
    }, {
      name: "Qatar",
      dial_code: "+974",
      code: "QA"
    }, {
      name: "Romania",
      dial_code: "+40",
      code: "RO"
    }, {
      name: "Russia",
      dial_code: "+7",
      code: "RU"
    }, {
      name: "Rwanda",
      dial_code: "+250",
      code: "RW"
    }, {
      name: "R\xe9union",
      dial_code: "+262",
      code: "RE"
    }, {
      name: "Saint Barth\xe9lemy",
      dial_code: "+590",
      code: "BL"
    }, {
      name: "Saint Helena",
      dial_code: "+290",
      code: "SH"
    }, {
      name: "Saint Kitts & Nevis",
      dial_code: "+1869",
      code: "KN"
    }, {
      name: "Saint Lucia",
      dial_code: "+1758",
      code: "LC"
    }, {
      name: "Saint Martin",
      dial_code: "+590",
      code: "MF"
    }, {
      name: "Saint Pierre & Miquelon",
      dial_code: "+508",
      code: "PM"
    }, {
      name: "Saint Vincent & the Grenadines",
      dial_code: "+784",
      code: "VC"
    }, {
      name: "Samoa",
      dial_code: "+685",
      code: "WS"
    }, {
      name: "San Marino",
      dial_code: "+378",
      code: "SM"
    }, {
      name: "Sao Tome & Principe",
      dial_code: "+239",
      code: "ST"
    }, {
      name: "Saudi Arabia",
      dial_code: "+966",
      code: "SA"
    }, {
      name: "Senegal",
      dial_code: "+221",
      code: "SN"
    }, {
      name: "Serbia",
      dial_code: "+381",
      code: "RS"
    }, {
      name: "Seychelles",
      dial_code: "+248",
      code: "SC"
    }, {
      name: "Sierra Leone",
      dial_code: "+232",
      code: "SL"
    }, {
      name: "Singapore",
      dial_code: "+65",
      code: "SG"
    }, {
      name: "Slovakia",
      dial_code: "+421",
      code: "SK"
    }, {
      name: "Slovenia",
      dial_code: "+386",
      code: "SI"
    }, {
      name: "Solomon Islands",
      dial_code: "+677",
      code: "SB"
    }, {
      name: "Somalia",
      dial_code: "+252",
      code: "SO"
    }, {
      name: "South Africa",
      dial_code: "+27",
      code: "ZA"
    }, {
      name: "South Georgia Islands",
      dial_code: "+500",
      code: "GS"
    }, {
      name: "South Korea",
      dial_code: "+82",
      code: "KR"
    }, {
      name: "Spain",
      dial_code: "+34",
      code: "ES"
    }, {
      name: "Sri Lanka",
      dial_code: "+94",
      code: "LK"
    }, {
      name: "Sudan",
      dial_code: "+249",
      code: "SD"
    }, {
      name: "Suriname",
      dial_code: "+597",
      code: "SR"
    }, {
      name: "Svalbard & Jan Mayen",
      dial_code: "+47",
      code: "SJ"
    }, {
      name: "Swaziland",
      dial_code: "+268",
      code: "SZ"
    }, {
      name: "Sweden",
      dial_code: "+46",
      code: "SE"
    }, {
      name: "Switzerland",
      dial_code: "+41",
      code: "CH"
    }, {
      name: "Syrian Arab Republic",
      dial_code: "+963",
      code: "SY"
    }, {
      name: "Taiwan",
      dial_code: "+886",
      code: "TW"
    }, {
      name: "Tajikistan",
      dial_code: "+992",
      code: "TJ"
    }, {
      name: "Tanzania",
      dial_code: "+255",
      code: "TZ"
    }, {
      name: "Thailand",
      dial_code: "+66",
      code: "TH"
    }, {
      name: "Timor-Leste",
      dial_code: "+670",
      code: "TL"
    }, {
      name: "Togo",
      dial_code: "+228",
      code: "TG"
    }, {
      name: "Tokelau",
      dial_code: "+690",
      code: "TK"
    }, {
      name: "Tonga",
      dial_code: "+676",
      code: "TO"
    }, {
      name: "Trinidad & Tobago",
      dial_code: "+1868",
      code: "TT"
    }, {
      name: "Trinidad & Tobago",
      dial_code: "+868",
      code: "TT"
    }, {
      name: "Tunisia",
      dial_code: "+216",
      code: "TN"
    }, {
      name: "Turkey",
      dial_code: "+90",
      code: "TR"
    }, {
      name: "Turkmenistan",
      dial_code: "+993",
      code: "TM"
    }, {
      name: "Turks & Caicos Islands",
      dial_code: "+1649",
      code: "TC"
    }, {
      name: "Tuvalu",
      dial_code: "+688",
      code: "TV"
    }, {
      name: "Uganda",
      dial_code: "+256",
      code: "UG"
    }, {
      name: "Ukraine",
      dial_code: "+380",
      code: "UA"
    }, {
      name: "United Arab Emirates",
      dial_code: "+971",
      code: "AE"
    }, {
      name: "United Kingdom",
      dial_code: "+44",
      code: "GB"
    }, {
      name: "United States",
      dial_code: "+1",
      code: "US"
    }, {
      name: "Uruguay",
      dial_code: "+598",
      code: "UY"
    }, {
      name: "Uzbekistan",
      dial_code: "+998",
      code: "UZ"
    }, {
      name: "Vanuatu",
      dial_code: "+678",
      code: "VU"
    }, {
      name: "Vatican City",
      dial_code: "+379",
      code: "VA"
    }, {
      name: "Venezuela",
      dial_code: "+58",
      code: "VE"
    }, {
      name: "Vietnam",
      dial_code: "+84",
      code: "VN"
    }, {
      name: "Virgin Islands, British",
      dial_code: "+1284",
      code: "VG"
    }, {
      name: "Virgin Islands, U.S.",
      dial_code: "+1340",
      code: "VI"
    }, {
      name: "Wallis & Futuna",
      dial_code: "+681",
      code: "WF"
    }, {
      name: "Yemen",
      dial_code: "+967",
      code: "YE"
    }, {
      name: "Zambia",
      dial_code: "+260",
      code: "ZM"
    }, {
      name: "Zimbabwe",
      dial_code: "+263",
      code: "ZW"
    } ];
    exports.firebaseConfigWeb = {
      apiKey: "AIzaSyAi92k8nf7IDaviagF86wq164kqpZ_-3PA",
      authDomain: "bahama-stage.firebaseapp.com",
      databaseURL: "https://bahama-stage.firebaseio.com",
      projectId: "bahama-stage",
      storageBucket: "bahama-stage.appspot.com",
      messagingSenderId: "105857221433",
      appId: "1:105857221433:web:424f71c230302a6b70dee8",
      measurementId: "G-DB6WEMCZ0D"
    };
    cc._RF.pop();
  }, {} ],
  convert: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9cd80ua1RVJ7q7zB04OVwxd", "convert");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Convert = void 0;
    var Convert = function() {
      function Convert() {}
      Convert.toCourse = function(json) {
        return JSON.parse(json);
      };
      Convert.courseToJson = function(value) {
        return JSON.stringify(value);
      };
      return Convert;
    }();
    exports.Convert = Convert;
    cc._RF.pop();
  }, {} ],
  "counting-answer": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1ac78XfkPFH+rXRaCKhHdaG", "counting-answer");
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
    exports.VALIDATE_RESULT = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var answer_grid_1 = require("./answer-grid");
    var error_handler_1 = require("./lib/error-handler");
    var util_1 = require("./util");
    var chimple_richtext_1 = require("./chimple-richtext");
    var DIGITS = "digits";
    var LABEL = "label";
    var COUNTING_LABEL = "countingLabel";
    var CHIMPLE_RICHTEXT = "chimple-richtext";
    exports.VALIDATE_RESULT = "VALIDATE_RESULT";
    var CountingAnswer = function(_super) {
      __extends(CountingAnswer, _super);
      function CountingAnswer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.answerGridPrefab = null;
        _this.touchAudio = null;
        _this.numberpads = [];
        _this.result = null;
        _this.delay = 2;
        _this._answerGrid = null;
        _this._isValidResult = false;
        return _this;
      }
      CountingAnswer.prototype.onLoad = function() {
        this._answerGrid = cc.instantiate(this.answerGridPrefab);
        this._answerGrid.setPosition(new cc.Vec2(0, -125));
        this.node.addChild(this._answerGrid);
        var answerGridComponent = this._answerGrid.getComponent(answer_grid_1.default);
        answerGridComponent.numberpads = this.numberpads;
        answerGridComponent.result = this.result;
        answerGridComponent.delay = this.delay;
        this.updateRichText();
        this.updateDigits("?".repeat(this.result.length), true);
        this.registerEvents();
      };
      CountingAnswer.prototype.registerEvents = function() {
        var _this = this;
        this.node.on(answer_grid_1.ANSWER_GRID_BUTTON_CLICKED, function(event) {
          event.stopPropagation();
          try {
            !_this.touchAudio || util_1.Util.playSfx(_this.touchAudio);
          } catch (e) {}
          if (!_this.isValidResult) {
            var data = event.getUserData();
            var selectedDigit = data.selectedDigit;
            _this.updateDigits(selectedDigit, false);
          }
        });
      };
      CountingAnswer.prototype.updateDigits = function(digit, onLoad) {
        var _this = this;
        void 0 === onLoad && (onLoad = false);
        var digits = this.node.getChildByName(DIGITS);
        var label = digits.getChildByName(LABEL);
        var textComponent = label.getComponent(chimple_richtext_1.default);
        var displayStr = textComponent.string || "";
        displayStr = displayStr.concat(digit);
        if (onLoad) textComponent.string = displayStr; else {
          displayStr = displayStr.substring(1, displayStr.length);
          textComponent.string = displayStr;
          -1 === displayStr.indexOf("?") && displayStr.length === this.result.length && this.scheduleOnce(function() {
            _this.checkResult();
          }, .25);
        }
      };
      CountingAnswer.prototype.clearDigits = function(oneByOne) {
        void 0 === oneByOne && (oneByOne = false);
        var digits = this.node.getChildByName(DIGITS);
        var label = digits.getChildByName(LABEL);
        var textComponent = label.getComponent(chimple_richtext_1.default);
        textComponent.string = "?".repeat(this.result.length);
      };
      CountingAnswer.prototype.checkResult = function() {
        var digits = this.node.getChildByName(DIGITS);
        var label = digits.getChildByName(LABEL);
        var textComponent = label.getComponent(chimple_richtext_1.default);
        if (!!textComponent.string) {
          var customEvent = new cc.Event.EventCustom(exports.VALIDATE_RESULT, true);
          customEvent.setUserData({
            result: textComponent.string
          });
          this.node.dispatchEvent(customEvent);
        }
      };
      CountingAnswer.prototype.updateRichText = function() {
        var countingLabel = this.node.getChildByName(COUNTING_LABEL);
        var richText = countingLabel.getChildByName(CHIMPLE_RICHTEXT);
        var rc = richText.getComponent(chimple_richtext_1.default);
        rc.string = "<color=#8B4513><bold>" + util_1.Util.i18NText("How Many??") + "</bold></color>";
      };
      Object.defineProperty(CountingAnswer.prototype, "isValidResult", {
        get: function() {
          return this._isValidResult;
        },
        set: function(n) {
          this._isValidResult = n;
        },
        enumerable: false,
        configurable: true
      });
      __decorate([ property(cc.Prefab) ], CountingAnswer.prototype, "answerGridPrefab", void 0);
      __decorate([ property(cc.AudioClip) ], CountingAnswer.prototype, "touchAudio", void 0);
      __decorate([ error_handler_1.default() ], CountingAnswer.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], CountingAnswer.prototype, "registerEvents", null);
      __decorate([ error_handler_1.default() ], CountingAnswer.prototype, "updateDigits", null);
      __decorate([ error_handler_1.default() ], CountingAnswer.prototype, "clearDigits", null);
      __decorate([ error_handler_1.default() ], CountingAnswer.prototype, "checkResult", null);
      __decorate([ error_handler_1.default() ], CountingAnswer.prototype, "updateRichText", null);
      CountingAnswer = __decorate([ ccclass ], CountingAnswer);
      return CountingAnswer;
    }(cc.Component);
    exports.default = CountingAnswer;
    cc._RF.pop();
  }, {
    "./answer-grid": "answer-grid",
    "./chimple-richtext": "chimple-richtext",
    "./lib/error-handler": "error-handler",
    "./util": "util"
  } ],
  countingLayout: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8d7ffg2/nlOO5z9Ai5B9mse", "countingLayout");
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
    var CountingLayout = function(_super) {
      __extends(CountingLayout, _super);
      function CountingLayout() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.fullCount = 1;
        _this.emptyCount = 0;
        _this.fullTexture = null;
        _this.emptyTexture = null;
        _this.scale = 1;
        return _this;
      }
      CountingLayout.prototype.onLoad = function() {
        for (var index = 0; index < this.fullCount; index++) {
          var image = new cc.Node();
          image.scale = this.scale;
          var sprite = image.addComponent(cc.Sprite);
          index < this.fullCount - this.emptyCount ? sprite.spriteFrame = this.fullTexture : sprite.spriteFrame = this.emptyTexture;
          this.node.addChild(image);
        }
        cc.log("CountingLayout:init" + this.node.childrenCount);
      };
      CountingLayout.prototype.feed = function(friend) {
        var friendPos = friend.convertToWorldSpaceAR(cc.Vec2.ZERO);
        friendPos.y += 128;
        var _loop_1 = function() {
          var fruit = this_1.node.children[this_1.node.childrenCount - 1];
          var pos = fruit.convertToWorldSpaceAR(cc.Vec2.ZERO);
          fruit.removeFromParent(false);
          fruit.position = pos;
          cc.director.getScene().addChild(fruit);
          new cc.Tween().target(fruit).to(1, {
            position: friendPos
          }, null).call(function() {
            fruit.active = false;
          }).start();
        };
        var this_1 = this;
        while (this.node.childrenCount > 0) _loop_1();
      };
      __decorate([ property ], CountingLayout.prototype, "fullCount", void 0);
      __decorate([ property ], CountingLayout.prototype, "emptyCount", void 0);
      __decorate([ property(cc.SpriteFrame) ], CountingLayout.prototype, "fullTexture", void 0);
      __decorate([ property(cc.SpriteFrame) ], CountingLayout.prototype, "emptyTexture", void 0);
      __decorate([ property ], CountingLayout.prototype, "scale", void 0);
      CountingLayout = __decorate([ ccclass ], CountingLayout);
      return CountingLayout;
    }(cc.Component);
    exports.default = CountingLayout;
    cc._RF.pop();
  }, {} ],
  drag: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ba476WS2vlGRrmbU5ZUEfu+", "drag");
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
    var drop_1 = require("./drop");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MIN_MOVED_DELTA = 10;
    var Drag = function(_super) {
      __extends(Drag, _super);
      function Drag() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.resizeWithLabel = false;
        _this.fixOnMatch = true;
        _this.allowDrag = true;
        _this.returnBackOnNoMatch = true;
        _this.multipleDrags = false;
        _this.match = false;
        _this.matchingNode = null;
        _this.multipleNode = null;
        _this.isDragging = false;
        _this.touchStartOriginPos = null;
        _this.isMoved = false;
        _this.isReverseXNeeded = false;
        return _this;
      }
      Drag_1 = Drag;
      Drag.prototype.onLoad = function() {};
      Drag.prototype.onEnable = function() {
        this.enableTouch();
      };
      Drag.prototype.enableTouch = function() {
        this.node.on("touchstart", this.onTouchStart, this);
        this.node.on("touchend", this.onTouchEnd, this);
        this.node.on("touchcancel", this.onTouchEnd, this);
        this.node.on("touchmove", this.onTouchMove, this);
      };
      Drag.prototype.onDisable = function() {
        this.disableTouch();
      };
      Drag.prototype.disableTouch = function() {
        this.node.off("touchstart", this.onTouchStart, this);
        this.node.off("touchend", this.onTouchEnd, this);
        this.node.off("touchcancel", this.onTouchEnd, this);
        this.node.off("touchmove", this.onTouchMove, this);
      };
      Drag.prototype.start = function() {
        if (this.resizeWithLabel && null != this.label) {
          var labelWidth = this.label.node.width;
          this.node.width = labelWidth + 20;
          var boxCollider = this.node.getComponent(cc.BoxCollider);
          boxCollider.size.width = this.node.width;
          this.node.parent.width = this.node.width;
        }
      };
      Drag.prototype.onTouchStart = function(touch) {
        if (Drag_1.letDrag && !this.isDragging && this.allowDrag) {
          this.touchStartOriginPos = this.node.getPosition();
          Drag_1.letDrag = false;
          this.isDragging = true;
          this.allowDrag && this.touchStartAnimation();
          if (this.allowDrag && this.multipleDrags && null == this.multipleNode) {
            this.multipleNode = cc.instantiate(this.node);
            this.node.parent.insertChild(this.multipleNode, 0);
          }
        }
      };
      Drag.prototype.onTouchMove = function(touch) {
        this.allowDrag && this.isDragging && (this.isReverseXNeeded ? this.node.setPosition(this.node.position.x - touch.getDelta().x, this.node.position.y + touch.getDelta().y) : this.node.setPosition(this.node.position.add(touch.getDelta())));
      };
      Drag.prototype.onTouchEnd = function(touch, isGoBackOnNoMatch) {
        var _this = this;
        void 0 === isGoBackOnNoMatch && (isGoBackOnNoMatch = true);
        if (this.allowDrag && this.isDragging) {
          var diff = this.node.getPosition().sub(this.touchStartOriginPos);
          this.isMoved = diff.magSqr() >= MIN_MOVED_DELTA;
          this.touchEndAnimation();
          if (this.match) {
            this.allowDrag = false;
            this.disableTouch();
            this.matchingNode.getComponent(drop_1.default).onMatchOver(this.node);
            new cc.Tween().target(this.node).to(.25, {
              position: this.matchPos(touch.getLocation())
            }, null).call(function() {
              _this.onMatchOver();
            }).start();
          } else if (this.returnBackOnNoMatch) {
            this.disableTouch();
            if (!isGoBackOnNoMatch) {
              this.onReturnBackOnNoMatch();
              return;
            }
            new cc.Tween().target(this.node).to(.35, {
              position: this.returnBackOnNoMatchPos()
            }, {
              progress: null,
              easing: "sineOut"
            }).call(function() {
              _this.onReturnBackOnNoMatch();
            }).start();
          } else {
            this.isDragging = false;
            Drag_1.letDrag = true;
          }
        }
      };
      Drag.prototype.onReturnBackOnNoMatch = function() {
        if (this.multipleDrags && null != this.multipleNode) {
          this.multipleNode.removeFromParent();
          this.multipleNode = null;
        }
        this.enableTouch();
        this.isDragging = false;
        Drag_1.letDrag = true;
      };
      Drag.prototype.onCollisionEnter = function(other, self) {
        if (this.allowDrag && this.isDragging && this.collisionEnterCondition(self, other) && other.node.getComponent(drop_1.default).allowDrop) {
          this.match = true;
          this.matchingNode = other.node;
        }
      };
      Drag.prototype.onCollisionExit = function(other, self) {
        if (this.allowDrag && this.isDragging && this.collisionExitCondition(this.matchingNode, other.node)) {
          this.match = false;
          this.matchingNode = null;
        }
      };
      Drag.prototype.onDestroy = function() {
        this.disableTouch();
      };
      Drag.prototype.onMatchOver = function() {
        this.isDragging = false;
        Drag_1.letDrag = true;
        if (this.fixOnMatch) {
          this.allowDrag = false;
          var mNode = this.matchingNode;
          this.node.removeFromParent();
          this.node.position = cc.Vec2.ZERO;
          mNode.addChild(this.node);
          this.node.getChildByName("shouldFlip") && (this.node.scaleX = -1);
          this.disableTouch();
        } else {
          this.enableTouch();
          this.allowDrag = true;
        }
      };
      Drag.prototype.returnBackOnNoMatchPos = function() {
        return cc.Vec2.ZERO;
      };
      Drag.prototype.matchPos = function(location) {
        return this.node.parent.convertToNodeSpaceAR(this.matchingNode.convertToWorldSpaceAR(cc.Vec2.ZERO));
      };
      Drag.prototype.collisionEnterCondition = function(self, other) {
        return other.node.name === self.node.name;
      };
      Drag.prototype.collisionExitCondition = function(matchingNode, otherNode) {
        return matchingNode === otherNode;
      };
      Drag.prototype.touchStartAnimation = function() {
        new cc.Tween().target(this.node).to(.25, {
          scale: 1.1
        }, {
          progress: null,
          easing: "elasticOut"
        }).start();
      };
      Drag.prototype.touchEndAnimation = function() {
        new cc.Tween().target(this.node).to(.25, {
          scale: 1
        }, {
          progress: null,
          easing: "elasticOut"
        }).start();
      };
      var Drag_1;
      Drag.letDrag = true;
      __decorate([ property(cc.Label) ], Drag.prototype, "label", void 0);
      __decorate([ property ], Drag.prototype, "resizeWithLabel", void 0);
      __decorate([ property ], Drag.prototype, "fixOnMatch", void 0);
      __decorate([ property ], Drag.prototype, "allowDrag", void 0);
      __decorate([ property ], Drag.prototype, "returnBackOnNoMatch", void 0);
      __decorate([ property ], Drag.prototype, "multipleDrags", void 0);
      Drag = Drag_1 = __decorate([ ccclass ], Drag);
      return Drag;
    }(cc.Component);
    exports.default = Drag;
    cc._RF.pop();
  }, {
    "./drop": "drop"
  } ],
  drop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "08edb7X3GlB7rjongfPHlr4", "drop");
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
    var drag_1 = require("./drag");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Drop = function(_super) {
      __extends(Drop, _super);
      function Drop() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.allowDrop = true;
        _this.allowOnlyOneDrop = true;
        _this.match = false;
        _this.matchingNode = null;
        return _this;
      }
      Drop.prototype.onLoad = function() {};
      Drop.prototype.onCollisionEnter = function(other, self) {
        if (this.allowDrop && this.collisionEnterCondition(self, other) && other.node.getComponent(drag_1.default).allowDrag) {
          this.match = true;
          this.matchingNode = other.node;
        }
      };
      Drop.prototype.onCollisionExit = function(other, self) {
        if (this.allowDrop) {
          this.match = false;
          this.matchingNode = null;
        }
      };
      Drop.prototype.onMatchOver = function(matchedDragNode) {
        void 0 === matchedDragNode && (matchedDragNode = null);
        this.match = false;
        this.allowOnlyOneDrop && (this.allowDrop = false);
      };
      Drop.prototype.collisionEnterCondition = function(self, other) {
        return other.node.name === self.node.name;
      };
      __decorate([ property ], Drop.prototype, "allowDrop", void 0);
      __decorate([ property ], Drop.prototype, "allowOnlyOneDrop", void 0);
      Drop = __decorate([ ccclass ], Drop);
      return Drop;
    }(cc.Component);
    exports.default = Drop;
    cc._RF.pop();
  }, {
    "./drag": "drag"
  } ],
  "error-handler": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9e5224HgUhODLrW4Q2cpHSn", "error-handler");
    "use strict";
    var __assign = this && this.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
        }
        return t;
      };
      return __assign.apply(this, arguments);
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
    exports.catchError = void 0;
    var util_logger_1 = require("../util-logger");
    function isAsync(fn) {
      return "AsyncFunction" === fn.constructor.name;
    }
    function createTempFunction(originalFn, options) {
      var catchFunction = options.catchFunction, className = options.className, funcName = options.funcName;
      function handleError(err, funcName, className, context, args) {
        void 0 === context && (context = this);
        void 0 === args && (args = []);
        catchFunction(err.message, err.stack, funcName, className, context, args);
        return;
      }
      var method = originalFn;
      var isAsyncFunc = isAsync(method);
      return isAsyncFunc ? function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        return __awaiter(this, void 0, void 0, function() {
          var context, result, err_1;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              context = this;
              _a.label = 1;

             case 1:
              _a.trys.push([ 1, 3, , 4 ]);
              return [ 4, method.apply(context, args) ];

             case 2:
              result = _a.sent();
              return [ 2, result ];

             case 3:
              err_1 = _a.sent();
              return [ 2, handleError(err_1, funcName, className, context, args) ];

             case 4:
              return [ 2 ];
            }
          });
        });
      } : function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        var context = this;
        try {
          var result = method.apply(context, args);
          return result instanceof Promise ? result.catch(function(err) {
            return handleError(err, funcName, className, context, args);
          }) : result;
        } catch (err) {
          return handleError(err, funcName, className, context, args);
        }
      };
    }
    function logError(errMessage, errStack, funcName, className, context, args) {
      cc.log("errMessage:" + errMessage + "from className:" + className + " funcName:" + funcName);
      if (!!context) {
        var errorObj = {
          errMessage: errMessage,
          className: className,
          funcName: funcName
        };
        util_logger_1.default.logChimpleEvent("errorInfo", errorObj);
      }
    }
    function catchError(options) {
      return function(decoratorTargetOrFunction, propertyName, descriptor) {
        var _a;
        var decoratorOptions;
        options = {
          catchFunction: logError
        };
        decoratorOptions = __assign({
          funcName: propertyName,
          className: decoratorTargetOrFunction.constructor.name
        }, options);
        if ("function" === typeof decoratorTargetOrFunction && "undefined" === typeof descriptor) return createTempFunction(decoratorTargetOrFunction, __assign(__assign({}, decoratorOptions), {
          funcName: decoratorTargetOrFunction.name
        }));
        var func;
        var descriptorItemName;
        var getter = descriptor.get;
        var value = descriptor.value;
        if (getter) {
          func = getter;
          descriptorItemName = "get";
        } else {
          if ("function" !== typeof value) throw new TypeError("Invalid decoration");
          func = value;
          descriptorItemName = "value";
        }
        if ("function" === typeof decoratorTargetOrFunction && "undefined" !== typeof descriptor) {
          decoratorOptions.className = "static " + ("get" === descriptorItemName ? "getter" : "method");
          decoratorOptions.funcName = func.name;
        }
        return __assign(__assign({}, descriptor), (_a = {}, _a[descriptorItemName] = createTempFunction(func, decoratorOptions), 
        _a));
      };
    }
    exports.catchError = catchError;
    exports.default = catchError;
    cc._RF.pop();
  }, {
    "../util-logger": "util-logger"
  } ],
  friend: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "066afartCZBcbeIZXwSH9JA", "friend");
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
    var profile_1 = require("./lib/profile");
    var util_1 = require("./util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Friend = function(_super) {
      __extends(Friend, _super);
      function Friend() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.db = null;
        _this.button = null;
        _this.helpSpoken = new Set();
        _this.speakFullHelp = true;
        _this.isFace = false;
        _this.extraClip = null;
        _this.helpAudioId = -1;
        _this.helpFile = null;
        return _this;
      }
      Friend.prototype.playHappyAnimation = function(playTimes) {
        this.playAnimation(this.isFace ? "face_happy" : "happy", playTimes);
      };
      Friend.prototype.playSadAnimation = function(playTimes) {
        this.playAnimation(this.isFace ? "face_wrong" : "sad", playTimes);
      };
      Friend.prototype.playSpeakAnimation = function(playTimes) {
        this.playAnimation(this.isFace ? "face_eating" : "talking", playTimes);
      };
      Friend.prototype.playIdleAnimation = function(playTimes) {
        this.playAnimation(this.isFace ? "face_touch" : "idle", playTimes);
      };
      Friend.prototype.playAnimation = function(animName, playTimes) {
        this.db ? this.db.playAnimation(animName, playTimes) : "";
      };
      Friend.prototype.speakHelp = function(auto) {
        var _this = this;
        void 0 === auto && (auto = true);
        if ((auto || this.speakFullHelp && this.extraClip) && this.helpSpoken.has(this.helpFile)) {
          this.speakFullHelp = false;
          this.speakExtra();
        } else {
          var name_1 = profile_1.default.lang + "-help";
          var bundle = util_1.Util.bundles.get(name_1);
          bundle ? this.loadAndPlay(bundle) : cc.assetManager.loadBundle(profile_1.default.lang + "-help", function(err, bundle) {
            if (err) _this.speakExtra(); else {
              util_1.Util.bundles.set(name_1, bundle);
              _this.loadAndPlay(bundle);
            }
          });
        }
      };
      Friend.prototype.loadAndPlay = function(bundle) {
        var _this = this;
        bundle.load(this.helpFile, cc.AudioClip, function(err, clip) {
          if (!err && _this.isValid) {
            _this.helpSpoken.add(_this.helpFile);
            _this.speakFullHelp = true;
            _this.helpAudioId = _this.speak(clip, _this.speakExtra.bind(_this));
          } else _this.speakExtra();
        });
      };
      Friend.prototype.speakExtra = function(callback) {
        void 0 === callback && (callback = null);
        this.helpAudioId = this.speak(this.extraClip, callback);
      };
      Friend.prototype.speak = function(clip, callback, isSfx, anim) {
        var _this = this;
        void 0 === callback && (callback = null);
        void 0 === isSfx && (isSfx = false);
        void 0 === anim && (anim = null);
        var audioId = -1;
        if (!clip || isSfx && 0 != profile_1.default.getItem(profile_1.SFX_OFF)) {
          null != anim && this.playAnimation(anim, 1);
          callback && callback();
        } else {
          this.stopAudio();
          audioId = util_1.Util.play(clip, false);
          if (-1 != audioId) if (null == anim) {
            this.playSpeakAnimation(0);
            this.button.interactable = false;
            cc.audioEngine.setFinishCallback(audioId, function() {
              _this.helpAudioId = -1;
              _this.playIdleAnimation(1);
              _this.button.interactable = true;
              callback && callback();
            });
          } else {
            this.playAnimation(anim, 1);
            callback && callback();
          } else callback && callback();
        }
        return audioId;
      };
      Friend.prototype.speakGameAudioOrPhonics = function(audio, callback) {
        var _this = this;
        var extraCallback = function(index) {
          _this.playIdleAnimation(1);
          _this.button.interactable = true;
          callback(index);
        };
        this.playSpeakAnimation(0);
        this.button.interactable = false;
        util_1.Util.speakGameAudioOrPhonics(audio, extraCallback);
      };
      Friend.prototype.speakEquation = function(nums, callback) {
        var _this = this;
        var extraCallback = function(index) {
          if (index + 1 >= nums.length) {
            _this.playIdleAnimation(1);
            _this.button.interactable = true;
          }
          callback(index);
        };
        this.playSpeakAnimation(0);
        this.button.interactable = false;
        util_1.Util.speakEquation(nums, extraCallback);
      };
      Friend.prototype.speakPhonicsOrLetter = function(audio, callback) {
        var _this = this;
        var extraCallback = function(index) {
          _this.playIdleAnimation(1);
          _this.button.interactable = true;
          callback(index);
        };
        this.playSpeakAnimation(0);
        this.button.interactable = false;
        util_1.Util.speakPhonicsOrLetter(audio, extraCallback);
      };
      Friend.prototype.stopAudio = function() {
        try {
          cc.audioEngine.stopEffect(this.helpAudioId);
        } catch (e) {
          cc.log(e);
        }
        this.button.interactable = true;
        this.helpAudioId = -1;
      };
      Friend.prototype.stopAnimation = function(name) {
        this.db.armature().animation.stop(name);
      };
      Friend.prototype.onClick = function() {
        -1 == this.helpAudioId && this.speakHelp(false);
      };
      Object.defineProperty(Friend.prototype, "interactable", {
        get: function() {
          return this.button.interactable;
        },
        set: function(i) {
          this.button.interactable = i;
        },
        enumerable: false,
        configurable: true
      });
      __decorate([ property(dragonBones.ArmatureDisplay) ], Friend.prototype, "db", void 0);
      __decorate([ property(cc.Button) ], Friend.prototype, "button", void 0);
      Friend = __decorate([ ccclass ], Friend);
      return Friend;
    }(cc.Component);
    exports.default = Friend;
    cc._RF.pop();
  }, {
    "./lib/profile": "profile",
    "./util": "util"
  } ],
  gameConfigs: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d347fp/dOxG7oNayW5uZph3", "gameConfigs");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GAME_CONFIGS = void 0;
    exports.GAME_CONFIGS = {
      letterpair: {
        bundle: "letterpair",
        prefab: "prefabs/letterpair",
        youtube: "fDwymtxwy9s"
      },
      balloonpop: {
        bundle: "balloonpop",
        prefab: "prefabs/balloonpop",
        youtube: "Z5rnMcNKPD8"
      },
      fillblank: {
        bundle: "fillblank",
        prefab: "prefabs/fillblank",
        youtube: "j6fANDptuvo"
      },
      bubbletype: {
        bundle: "bubbletype",
        prefab: "prefabs/bubbletype",
        youtube: "MjFTkxrMbdc"
      },
      spelldoor: {
        bundle: "spelldoor",
        prefab: "prefabs/spelldoor",
        youtube: "enFOu65Uwx4"
      },
      jumpsentence: {
        bundle: "jumpsentence",
        prefab: "prefabs/jumpsentence",
        youtube: "ceXy55PXp-U"
      },
      createsentence: {
        bundle: "createsentence",
        prefab: "prefabs/createsentence",
        center: true,
        youtube: "slZwEasK-jo"
      },
      phonictractor: {
        bundle: "phonictractor",
        prefab: "prefabs/phonictractor",
        youtube: "a24jtA7oThk"
      },
      grid: {
        bundle: "grid",
        prefab: "prefabs/grid",
        youtube: "pDsB_CZxX5E"
      },
      tag: {
        bundle: "tag",
        prefab: "prefabs/tag",
        youtube: "-0GQkGkncJo"
      },
      speakingpet: {
        bundle: "speakingpet",
        prefab: "prefabs/speakingpet",
        youtube: "-Fonf3qzguY"
      },
      alphabetrecorder: {
        bundle: "alphabetrecorder",
        prefab: "prefabs/alphabetrecorder",
        fontName: "en-main",
        youtube: "Ez9oouE2pOE"
      },
      writeletter: {
        bundle: "writeletter",
        prefab: "prefabs/writeletter",
        fontName: "en-main",
        youtube: "n2F8q4I6zi8"
      },
      writecard: {
        bundle: "writecard",
        prefab: "prefabs/writecard",
        fontName: "en-main",
        youtube: "76TnIpzhXdA"
      },
      writeword: {
        bundle: "writeword",
        prefab: "prefabs/writeword",
        fontName: "en-main",
        youtube: "-u6-MF9iIus"
      },
      letterboard: {
        bundle: "board",
        prefab: "prefabs/board",
        youtube: "ekDV8yQKV38"
      },
      pictureboard: {
        bundle: "pictureboard",
        prefab: "prefabs/pictureboard",
        youtube: "fOoNh8HJ6u4"
      },
      stamp: {
        bundle: "stamp",
        prefab: "prefabs/stamp",
        youtube: "fOoNh8HJ6u4"
      },
      imagerecorder: {
        bundle: "imagerecorder",
        prefab: "prefabs/imagerecorder",
        youtube: "Ez9oouE2pOE"
      },
      drawshape: {
        bundle: "drawshape",
        prefab: "prefabs/drawshape",
        center: true,
        youtube: "9y_Bxu3d7QI"
      },
      rocket: {
        bundle: "rocket",
        prefab: "prefabs/rocket",
        youtube: "BIyAbT1hvTA"
      },
      openwindow: {
        bundle: "openwindow",
        prefab: "prefabs/openwindow",
        youtube: "VwVEw3cexvI"
      },
      picturemeaning: {
        bundle: "picturemeaning",
        prefab: "prefabs/picturemeaning",
        youtube: "HjGkNcubLSY"
      },
      story: {
        bundle: "story",
        prefab: "prefabs/story",
        fontName: "en-main",
        youtube: "HqNviQM4Dlg"
      },
      storyquiz: {
        bundle: "storyquiz",
        prefab: "prefabs/storyquiz",
        fontName: "en-main",
        youtube: "JOPV3cMwE_A"
      },
      youtube: {
        bundle: "youtube",
        prefab: "prefabs/youtube",
        youtube: "Ez9oouE2pOE"
      },
      monster: {
        bundle: "monster",
        prefab: "prefabs/monster",
        youtube: "YzzfbTQ61I4"
      },
      stickerbook: {
        bundle: "stickerbook",
        prefab: "prefabs/stickerbook",
        youtube: ""
      },
      calculator: {
        bundle: "calculator",
        prefab: "prefabs/calculator",
        youtube: "FdPshuC9xss"
      },
      rowblocks: {
        bundle: "rowblocks",
        prefab: "prefabs/rowblocks",
        youtube: "3b-Eqm31ITA"
      },
      matchbox: {
        bundle: "matchbox",
        prefab: "prefabs/matchbox",
        youtube: "_ZfxpZKDfA0"
      },
      multiplybeads: {
        bundle: "multiplybeads",
        prefab: "prefabs/multiplybeads",
        youtube: "Ss1-87ACiwc"
      },
      groupsum: {
        bundle: "groupsum",
        prefab: "prefab/groupsum",
        youtube: "cuBJc_OfYSo"
      },
      nimbletable: {
        bundle: "nimbletable",
        prefab: "prefabs/nimbletable",
        youtube: "rmqaFgpZgSY"
      },
      foodjar: {
        bundle: "foodjar",
        prefab: "prefabs/foodjar",
        youtube: "G8xRZoGMtt8"
      },
      writenumber: {
        bundle: "writenumber",
        prefab: "prefabs/writenumber",
        fontName: "en-main",
        youtube: "DlnrR7bdtgU"
      },
      writeset: {
        bundle: "writeset",
        prefab: "prefabs/writeset",
        fontName: "en-main",
        youtube: "HVBzuMqbLLw"
      },
      numberboard: {
        bundle: "board",
        prefab: "prefabs/board",
        youtube: "-cPVMr-LR_Q"
      },
      sumtogether: {
        bundle: "sumtogether",
        prefab: "prefabs/sumtogether",
        youtube: "jOqT2l4YSF0"
      },
      shapepair: {
        bundle: "letterpair",
        prefab: "prefabs/letterpair",
        youtube: "81wKOqF3UJM"
      },
      numberpair: {
        bundle: "letterpair",
        prefab: "prefabs/letterpair",
        youtube: "UvevHCxxJ2o"
      },
      questionboard: {
        bundle: "questionboard",
        prefab: "prefabs/questionboard",
        youtube: "zgAInxZ0ZAc"
      },
      matchingcard: {
        bundle: "matchingcard",
        prefab: "prefabs/matchingcard",
        youtube: "Vl0OX5oJY_I"
      },
      blender: {
        bundle: "blender",
        prefab: "prefabs/blender",
        youtube: "uYHbJ191884"
      },
      sequencebox: {
        bundle: "sequencebox",
        prefab: "prefabs/sequencebox",
        youtube: "ttqUscQd88g"
      },
      tenbox: {
        bundle: "tenbox",
        prefab: "prefabs/tenbox",
        youtube: "39zIZ3OAE5c"
      },
      taprise: {
        bundle: "taprise",
        prefab: "prefabs/taprise",
        youtube: "-7dYda3w1Rg"
      },
      total: {
        bundle: "total",
        prefab: "prefabs/total",
        youtube: "vD6wssd-97g"
      },
      checkerblocks: {
        bundle: "checkerblocks",
        prefab: "prefabs/checkerblocks",
        youtube: "SzV4lhawfPY"
      },
      ordertractor: {
        bundle: "ordertractor",
        prefab: "prefabs/ordertractor",
        youtube: "o3hhduN0KoY"
      },
      balancing: {
        bundle: "balancing",
        prefab: "prefabs/balancing",
        youtube: "H2nLW8CyfOw"
      },
      shapetractor: {
        bundle: "shapetractor",
        prefab: "prefabs/shapetractor",
        youtube: "5fFmHM1OfyU"
      },
      fillanswer: {
        bundle: "fillblank",
        prefab: "prefabs/fillblank",
        youtube: "5Ws5ouABV8o"
      },
      quizliteracy: {
        bundle: "quiz",
        prefab: "quizliteracy/prefabs/quizliteracy",
        youtube: "rNyr6GPVjH4"
      },
      quizmaths: {
        bundle: "quiz",
        prefab: "quizmaths/prefabs/quizmaths",
        youtube: "WF90chix1jU"
      },
      arrangeletters: {
        bundle: "arrangeletters",
        prefab: "prefabs/arrangeletters",
        youtube: "bcLLqULE5_0"
      },
      dragthealphabet: {
        bundle: "dragthealphabet",
        prefab: "prefabs/dragthealphabet",
        youtube: "2mU3FDZMgoY"
      },
      jungle: {
        bundle: "platform",
        prefab: "prefabs/assemble/Platform",
        youtube: "Fxbmzp7rvkE"
      },
      beach: {
        bundle: "platform",
        prefab: "prefabs/beach/Platform",
        youtube: "Fxbmzp7rvkE"
      },
      city: {
        bundle: "platform",
        prefab: "prefabs/city/Platform",
        youtube: "Fxbmzp7rvkE"
      },
      desert: {
        bundle: "platform",
        prefab: "prefabs/desert/Platform",
        youtube: "Fxbmzp7rvkE"
      },
      farm: {
        bundle: "platform",
        prefab: "prefabs/farm/Platform",
        youtube: "Fxbmzp7rvkE"
      },
      garden: {
        bundle: "platform",
        prefab: "prefabs/garden/Platform",
        youtube: "Fxbmzp7rvkE"
      },
      playground: {
        bundle: "platform",
        prefab: "prefabs/playground/Platform",
        youtube: "Fxbmzp7rvkE"
      },
      sea: {
        bundle: "platform",
        prefab: "prefabs/sea/Platform",
        youtube: "Fxbmzp7rvkE"
      },
      sky: {
        bundle: "platform",
        prefab: "prefabs/sky/Platform",
        youtube: "Fxbmzp7rvkE"
      },
      snow: {
        bundle: "platform",
        prefab: "prefabs/snow/Platform",
        youtube: "Fxbmzp7rvkE"
      }
    };
    cc._RF.pop();
  }, {} ],
  game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4c3bbRj+LpBv4jZ+9BBLq4z", "game");
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
    var Game = function(_super) {
      __extends(Game, _super);
      function Game() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.friendPos = null;
        _this.friend = null;
        return _this;
      }
      __decorate([ property(cc.Node) ], Game.prototype, "friendPos", void 0);
      Game = __decorate([ ccclass ], Game);
      return Game;
    }(cc.Component);
    exports.default = Game;
    cc._RF.pop();
  }, {} ],
  globals: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "52453a3z3xFCYsUXqHjog5c", "globals");
    "use strict";
    cc._RF.pop();
  }, {} ],
  headerButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3681eSnAN5MGoPeKVSnGUjg", "headerButton");
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
    var HeaderButton = function(_super) {
      __extends(HeaderButton, _super);
      function HeaderButton() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      __decorate([ property(cc.Label) ], HeaderButton.prototype, "label", void 0);
      __decorate([ property(cc.Button) ], HeaderButton.prototype, "button", void 0);
      __decorate([ property(cc.Sprite) ], HeaderButton.prototype, "sprite", void 0);
      __decorate([ property(cc.Sprite) ], HeaderButton.prototype, "selected", void 0);
      __decorate([ property(cc.SpriteFrame) ], HeaderButton.prototype, "homeSprite", void 0);
      HeaderButton = __decorate([ ccclass ], HeaderButton);
      return HeaderButton;
    }(cc.Component);
    exports.default = HeaderButton;
    cc._RF.pop();
  }, {} ],
  header: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1a43dS1gWNM66gKUikPcRGy", "header");
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
    var headerButton_1 = require("./headerButton");
    var config_1 = require("./lib/config");
    var util_1 = require("./util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Header = function(_super) {
      __extends(Header, _super);
      function Header() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.courseLayout = null;
        _this.headerButtonPrefab = null;
        _this.showHome = true;
        _this.homePos = null;
        _this.rightPos = null;
        _this.firstSelected = true;
        return _this;
      }
      Header_1 = Header;
      Header.prototype.onLoad = function() {
        var _this = this;
        var config = config_1.default.i;
        this.user.courseProgressMap.forEach(function(val, courseId) {
          var headerButton = cc.instantiate(_this.headerButtonPrefab);
          var headerButtonComp = headerButton.getComponent(headerButton_1.default);
          headerButtonComp.selected.node.active = false;
          _this.courseLayout.addChild(headerButton);
          if (_this.firstSelected) {
            _this.selectHeaderButton(headerButtonComp);
            _this.firstSelected = false;
          }
          var course = config.curriculum.get(courseId);
          headerButtonComp.label.string = util_1.Util.i18NText(course.name);
          util_1.Util.load(courseId + "/course/res/icons/" + courseId + ".png", function(err, texture) {
            headerButtonComp.sprite.spriteFrame = err ? null : new cc.SpriteFrame(texture);
          });
          headerButtonComp.button.node.on("touchend", function(event) {
            if (event.target.getComponent(cc.Button).enabled) {
              Header_1.homeSelected = false;
              _this.selectHeaderButton(headerButtonComp);
              config.course = course;
              _this.onCourseClick && _this.onCourseClick();
            }
          });
          !Header_1.homeSelected && config.course && config.course.id == course.id && _this.selectHeaderButton(headerButtonComp);
        });
        if (this.showHome) {
          var homeButton = cc.instantiate(this.headerButtonPrefab);
          var homeButtonComp_1 = homeButton.getComponent(headerButton_1.default);
          homeButtonComp_1.button.node.on("touchend", function(event) {
            if (event.target.getComponent(cc.Button).enabled) {
              Header_1.homeSelected = true;
              var config_2 = config_1.default.i;
              config_2.course = null;
              config_2.chapter = null;
              config_2.lesson = null;
              _this.selectHeaderButton(homeButtonComp_1);
              _this.onHomeClick && _this.onHomeClick();
            }
          });
          homeButtonComp_1.label.string = util_1.Util.i18NText("Home");
          this.homePos.addChild(homeButton);
          homeButtonComp_1.selected.node.active = false;
          Header_1.homeSelected && this.selectHeaderButton(homeButtonComp_1);
        }
        this.onRightClick && this.rightPos.on("touchend", this.onRightClick);
        this.node.width = cc.winSize.width;
        var spacing = Math.max(0, (this.courseLayout.width - this.courseLayout.childrenCount * this.courseLayout.children[0].width) / (this.courseLayout.childrenCount + 1));
        this.courseLayout.getComponent(cc.Layout).spacingX = spacing;
        this.courseLayout.getComponent(cc.Layout).paddingLeft = spacing;
        this.courseLayout.getComponent(cc.Layout).paddingRight = spacing;
      };
      Header.prototype.selectHeaderButton = function(newButton) {
        if (null != this.selectedHeaderButton) {
          this.selectedHeaderButton.selected.node.active = false;
          this.selectedHeaderButton.button.enabled = true;
        }
        newButton.selected.node.active = true;
        newButton.button.enabled = false;
        this.selectedHeaderButton = newButton;
      };
      var Header_1;
      Header.homeSelected = true;
      __decorate([ property(cc.Node) ], Header.prototype, "courseLayout", void 0);
      __decorate([ property(cc.Prefab) ], Header.prototype, "headerButtonPrefab", void 0);
      __decorate([ property() ], Header.prototype, "showHome", void 0);
      __decorate([ property(cc.Node) ], Header.prototype, "homePos", void 0);
      __decorate([ property(cc.Node) ], Header.prototype, "rightPos", void 0);
      Header = Header_1 = __decorate([ ccclass ], Header);
      return Header;
    }(cc.Component);
    exports.default = Header;
    cc._RF.pop();
  }, {
    "./headerButton": "headerButton",
    "./lib/config": "config",
    "./util": "util"
  } ],
  helpChimp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9ea8252xShAnYFifciKMS2w", "helpChimp");
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
    var profile_1 = require("./lib/profile");
    var util_1 = require("./util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var X_BORDER = 70;
    var Y_BORDER = 20;
    var spoken = new Map();
    var HelpChimp = function(_super) {
      __extends(HelpChimp, _super);
      function HelpChimp() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.chimp = null;
        _this.helpKey = null;
        _this.helpAudioId = -1;
        return _this;
      }
      HelpChimp.prototype.onLoad = function() {
        var _this = this;
        this.node.x = -cc.winSize.width / 2 - X_BORDER;
        new cc.Tween().target(this.node).to(.25, {
          x: -cc.winSize.width / 2 + X_BORDER
        }, {}).start();
        this.chimp.playAnimation("idle", 0);
        this.node.getComponent(cc.Button).interactable = false;
        var name = profile_1.default.lang + "-help";
        var bundle = util_1.Util.bundles.get(name);
        bundle ? this.loadAndPlay(bundle) : cc.assetManager.loadBundle(name, function(err, bundle) {
          if (!err) {
            util_1.Util.bundles.set(name, bundle);
            _this.loadAndPlay(bundle);
          }
        });
      };
      HelpChimp.prototype.loadAndPlay = function(bundle) {
        var _this = this;
        bundle.load(this.helpKey, cc.AudioClip, function(err, clip) {
          if (null != _this.node && !err) {
            _this.clip = clip;
            if (spoken.has(_this.helpKey)) _this.node.getComponent(cc.Button).interactable = true; else {
              spoken.set(_this.helpKey, 1);
              _this.speak();
            }
          }
        });
      };
      HelpChimp.prototype.speak = function() {
        var _this = this;
        if (-1 == this.helpAudioId && this.clip) {
          this.helpAudioId = util_1.Util.play(this.clip, false);
          if (-1 != this.helpAudioId) {
            this.chimp.armature().animation.stop("idle");
            this.chimp.playAnimation("talking", 0);
            this.node.getComponent(cc.Button).interactable = false;
            cc.audioEngine.setFinishCallback(this.helpAudioId, function() {
              _this.chimp.armature().animation.stop("talking");
              _this.chimp.playAnimation("idle", 0);
              _this.node.getComponent(cc.Button).interactable = true;
              _this.helpAudioId = -1;
            });
          }
        }
      };
      HelpChimp.prototype.onDisable = function() {
        -1 != this.helpAudioId && cc.audioEngine.stop(this.helpAudioId);
      };
      __decorate([ property(dragonBones.ArmatureDisplay) ], HelpChimp.prototype, "chimp", void 0);
      __decorate([ property ], HelpChimp.prototype, "helpKey", void 0);
      HelpChimp = __decorate([ ccclass ], HelpChimp);
      return HelpChimp;
    }(cc.Component);
    exports.default = HelpChimp;
    cc._RF.pop();
  }, {
    "./lib/profile": "profile",
    "./util": "util"
  } ],
  helper: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3795bHNzUtOY6Snt9nuSu8q", "helper");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Helper = exports.GO_TO_NEXT_PROBLEM = exports.BOTTOM_MIDDLE = exports.AUTO_TOUCH_START = exports.TUTORIAL_IMAGES = exports.LETTER_VOICE = exports.PHONIC_VOICE = exports.NUMBER_VOICE = exports.QUIZ_MATHS_DIR = exports.QUESTION_BOARD = exports.HELP_DIR = exports.SOUND_LOADED_EVENT = exports.WRONG_EVENT = exports.CORRECT_EVENT = exports.PROBLEM_OVER_EVENT = exports.GAME_OVER_EVENT = exports.GAME_START_EVENT = exports.MOVE_NOT_MATCH = exports.MOVE_MATCH = exports.RESET_TRACING = exports.BACK_FINISHED = exports.RECORDING_FINISHED = exports.MOVE_TO_NEXT_LETTER_EVENT = exports.TRACING_WRONG = exports.RESET_TRACING_NOT_ALLOWED = exports.RESET_TRACING_ALLOWED = exports.TRACING_CORRECT = exports.SHOW_CHILD_IMAGE = exports.TRACING_FINISHED = exports.CONFIG_LOADED = exports.DEFAULT_FONT_COLOR = exports.LEVEL_FONT_SIZE = exports.FONT_SIZE = exports.ALL_REWARDS = exports.DIAMOND_BOX = exports.DIAMOND = exports.CROWN = exports.BANANA = exports.COIN = exports.FILLER_GROUP = exports.QUIZ_GROUP = exports.OBSTACLE_GROUP = exports.REWARD_GROUP = exports.PLAYER_GROUP = exports.WALL_GROUP = exports.GROUND_GROUP = void 0;
    var singlelettertracing_1 = require("../Tracing/scripts/singlelettertracing");
    exports.GROUND_GROUP = "ground";
    exports.WALL_GROUP = "wall";
    exports.PLAYER_GROUP = "player";
    exports.REWARD_GROUP = "reward";
    exports.OBSTACLE_GROUP = "obstacle";
    exports.QUIZ_GROUP = "quizcollect";
    exports.FILLER_GROUP = "fillerwait";
    exports.COIN = "coin";
    exports.BANANA = "banana";
    exports.CROWN = "crown";
    exports.DIAMOND = "diamond";
    exports.DIAMOND_BOX = "diamondbox";
    exports.ALL_REWARDS = [ exports.COIN, exports.BANANA, exports.CROWN, exports.DIAMOND, exports.DIAMOND_BOX ];
    exports.FONT_SIZE = "65";
    exports.LEVEL_FONT_SIZE = "40";
    exports.DEFAULT_FONT_COLOR = cc.Color.BLACK;
    exports.CONFIG_LOADED = "configLoaded";
    exports.TRACING_FINISHED = "tracingFinished";
    exports.SHOW_CHILD_IMAGE = "showChildImage";
    exports.TRACING_CORRECT = "tracingCorrect";
    exports.RESET_TRACING_ALLOWED = "resetTracingAllowed";
    exports.RESET_TRACING_NOT_ALLOWED = "resetTracingNotAllowed";
    exports.TRACING_WRONG = "tracingWrong";
    exports.MOVE_TO_NEXT_LETTER_EVENT = "moveToNextLetter";
    exports.RECORDING_FINISHED = "recordingFinished";
    exports.BACK_FINISHED = "backFinished";
    exports.RESET_TRACING = "resetTracing";
    exports.MOVE_MATCH = "MoveMatch";
    exports.MOVE_NOT_MATCH = "MoveNotMatch";
    exports.GAME_START_EVENT = "gameStart";
    exports.GAME_OVER_EVENT = "gameOver";
    exports.PROBLEM_OVER_EVENT = "problemOver";
    exports.CORRECT_EVENT = "correct";
    exports.WRONG_EVENT = "wrong";
    exports.SOUND_LOADED_EVENT = "soundLoaded";
    exports.HELP_DIR = "help/";
    exports.QUESTION_BOARD = "questionboard";
    exports.QUIZ_MATHS_DIR = "quizmaths";
    exports.NUMBER_VOICE = "numbervoice/";
    exports.PHONIC_VOICE = "course/res/sound/phonicvoice/";
    exports.LETTER_VOICE = "course/res/sound/lettervoice/";
    exports.TUTORIAL_IMAGES = "drawshape/res/image/";
    exports.AUTO_TOUCH_START = "autoTouchStart";
    exports.BOTTOM_MIDDLE = new cc.Vec2(0, .5);
    exports.GO_TO_NEXT_PROBLEM = "goToNextProblem";
    var Helper = function() {
      function Helper() {}
      Helper.subScribeToTracingEvents = function(node, container, tracingFinishedCallback) {
        node.on(exports.TRACING_FINISHED, function(event) {
          tracingFinishedCallback();
        });
        node.on(exports.TRACING_CORRECT, function(event) {
          event.stopPropagation();
          container.emit("correct");
        });
        node.on(exports.TRACING_WRONG, function(event) {
          event.stopPropagation();
          container.emit("wrong");
        });
      };
      Helper.buildLetters = function(node, words, characters, singleLetterPrefab, width, height) {
        var wordLayout = words.getComponent(cc.Layout);
        wordLayout.spacingX = 50;
        words.scale = .75;
        characters.forEach(function(c, i) {
          var singleLetter = cc.instantiate(singleLetterPrefab);
          singleLetter.width = width;
          singleLetter.height = height;
          singleLetter.name = "L" + i;
          var singleLetterComponent = singleLetter.getComponent(singlelettertracing_1.SingleLetterTracing);
          singleLetterComponent.order = i;
          singleLetterComponent.letter = c;
          singleLetterComponent.wordTracingContainer = node;
          wordLayout.node.addChild(singleLetter);
        });
      };
      return Helper;
    }();
    exports.Helper = Helper;
    cc._RF.pop();
  }, {
    "../Tracing/scripts/singlelettertracing": "singlelettertracing"
  } ],
  help: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "753cd133+lDWoibLGRa2OFk", "help");
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
    var Help = function(_super) {
      __extends(Help, _super);
      function Help() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.callBack = null;
        _this.hand = null;
        _this.grayL = null;
        _this.grayR = null;
        _this.grayT = null;
        _this.grayB = null;
        return _this;
      }
      Help.prototype.initNodes = function(from, to, callBack) {
        this.from = from;
        this.to = to;
        this.callBack = callBack;
      };
      Help.prototype.onLoad = function() {
        this.drawGray(this.from);
      };
      Help.prototype.drawGray = function(node) {
        var bb = node.getBoundingBoxToWorld();
        this.grayL.right = cc.winSize.width - bb.xMin;
        this.grayR.left = bb.xMax;
        this.grayT.right = cc.winSize.width - bb.xMin;
        this.grayT.left = bb.xMax;
        this.grayT.bottom = bb.yMax;
        this.grayB.right = cc.winSize.width - bb.xMin;
        this.grayB.left = bb.xMax;
        this.grayB.top = cc.winSize.height - bb.yMin;
        this.grayL.updateAlignment();
        this.grayR.updateAlignment();
        this.grayT.updateAlignment();
        this.grayB.updateAlignment();
      };
      Help.prototype.start = function() {
        this.help();
      };
      Help.prototype.help = function() {
        var _this = this;
        this.node.active = true;
        new cc.Tween().target(this.hand).set({
          position: this.node.convertToNodeSpaceAR(this.from.getBoundingBoxToWorld().center)
        }).to(.25, {
          scale: .8
        }, null).delay(1).call(function() {
          _this.drawGray(_this.to);
        }).to(1, {
          position: this.node.convertToNodeSpaceAR(this.to.getBoundingBoxToWorld().center)
        }, null).to(.25, {
          scale: 1
        }, null).call(function() {
          _this.node.active = false;
          null != _this.callBack && _this.callBack();
        }).start();
      };
      __decorate([ property(cc.Node) ], Help.prototype, "hand", void 0);
      __decorate([ property(cc.Widget) ], Help.prototype, "grayL", void 0);
      __decorate([ property(cc.Widget) ], Help.prototype, "grayR", void 0);
      __decorate([ property(cc.Widget) ], Help.prototype, "grayT", void 0);
      __decorate([ property(cc.Widget) ], Help.prototype, "grayB", void 0);
      Help = __decorate([ ccclass ], Help);
      return Help;
    }(cc.Component);
    exports.default = Help;
    cc._RF.pop();
  }, {} ],
  "indicator-node": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "406a0I1/jFKSKXx9lktO5FY", "indicator-node");
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
    var ccclass = cc._decorator.ccclass;
    var tracing_node_1 = require("./tracing-node");
    var arrow_node_1 = require("./arrow-node");
    var CHOICE_GROUP = "choice";
    var IndicatorNode = function(_super) {
      __extends(IndicatorNode, _super);
      function IndicatorNode() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._collisionCount = 0;
        _this._counterValue = 0;
        _this._arrowValue = 0;
        _this.traceGraphics = null;
        _this.currentPath = null;
        return _this;
      }
      IndicatorNode.prototype.onEnable = function() {
        var collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
      };
      IndicatorNode.prototype.onCollisionEnter = function(other, self) {
        switch (other.node.group) {
         case CHOICE_GROUP:
          this.collisionEnter(other, self);
        }
      };
      IndicatorNode.prototype.collisionEnter = function(other, self) {
        if ("tracingNode" === other.node.name) {
          var tracingNodeComponent = other.node.getComponent(tracing_node_1.default);
          if (null !== tracingNodeComponent) {
            var currentPathInOtherNode = tracingNodeComponent.currentPath;
            if (this.currentPath === currentPathInOtherNode) {
              this._collisionCount++;
              this._counterValue = tracingNodeComponent.counter;
            }
          }
        } else if ("arrowNode" === other.node.name) {
          var arrowNodeComponent = other.node.getComponent(arrow_node_1.default);
          cc.log("checking contact with arrow Node", arrowNodeComponent.arrowValue, "with path", arrowNodeComponent.currentPath, " and current value", this.traceGraphics.currentArrowValue);
          if (null !== arrowNodeComponent) {
            var currentPathInOtherNode = arrowNodeComponent.currentPath;
            if (this.currentPath === currentPathInOtherNode) {
              this._arrowValue = arrowNodeComponent.arrowValue;
              if (this.traceGraphics.currentArrowValue + 1 === arrowNodeComponent.arrowValue) {
                this.traceGraphics.currentArrowValue = arrowNodeComponent.arrowValue;
                this.traceGraphics.nextArrowValue = this.traceGraphics.currentArrowValue + 1;
                this.traceGraphics.arrowPos = other.node.getPosition();
                this.traceGraphics.arrowStarCounter = arrowNodeComponent.starCounter;
                cc.log("contact with arrow Node", arrowNodeComponent.arrowValue);
              }
            }
          }
        }
      };
      IndicatorNode.prototype.onCollisionExit = function(other, self) {
        switch (other.node.group) {
         case CHOICE_GROUP:
          this.collisionExit(other, self);
        }
      };
      IndicatorNode.prototype.collisionExit = function(other, self) {
        if ("tracingNode" === other.node.name) {
          var tracingNodeComponent = other.node.getComponent(tracing_node_1.default);
          if (null !== tracingNodeComponent) {
            var currentPathInOtherNode = tracingNodeComponent.currentPath;
            if (this.currentPath === currentPathInOtherNode) {
              this._collisionCount--;
              this._collisionCount <= 0 && this.traceGraphics.disableTouchAsNoCollision(false);
            }
          }
        } else if ("arrowNode" === other.node.name) {
          var arrowNodeComponent = other.node.getComponent(arrow_node_1.default);
          if (null !== arrowNodeComponent) {
            var currentPathInOtherNode = arrowNodeComponent.currentPath;
            this.currentPath === currentPathInOtherNode && cc.log("contact lost with arrow Node", arrowNodeComponent.arrowValue);
          }
        }
      };
      Object.defineProperty(IndicatorNode.prototype, "collisionCount", {
        get: function() {
          return this._collisionCount;
        },
        set: function(scale) {
          this._collisionCount = scale;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(IndicatorNode.prototype, "counterValue", {
        get: function() {
          return this._counterValue;
        },
        enumerable: false,
        configurable: true
      });
      IndicatorNode = __decorate([ ccclass ], IndicatorNode);
      return IndicatorNode;
    }(cc.Component);
    exports.default = IndicatorNode;
    cc._RF.pop();
  }, {
    "./arrow-node": "arrow-node",
    "./tracing-node": "tracing-node"
  } ],
  kannada: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "982ebVMHqpNWo/tGaCwLVow", "kannada");
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
    var Kannada = function(_super) {
      __extends(Kannada, _super);
      function Kannada() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = "hello";
        return _this;
      }
      Kannada.prototype.onLoad = function() {
        this.node.width = 256;
      };
      Kannada.prototype.start = function() {
        this.node.width = 256;
      };
      __decorate([ property(cc.Label) ], Kannada.prototype, "label", void 0);
      __decorate([ property ], Kannada.prototype, "text", void 0);
      Kannada = __decorate([ ccclass ], Kannada);
      return Kannada;
    }(cc.Component);
    exports.default = Kannada;
    cc._RF.pop();
  }, {} ],
  lessonController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b559c8Ur4pLyZP4wRVFDP7W", "lessonController");
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
    var queue_1 = require("../../queue");
    var friend_1 = require("./friend");
    var game_1 = require("./game");
    var config_1 = require("./lib/config");
    var constants_1 = require("./lib/constants");
    var gameConfigs_1 = require("./lib/gameConfigs");
    var profile_1 = require("./lib/profile");
    var progressMonitor_1 = require("./progressMonitor");
    var quiz_monitor_1 = require("./quiz-monitor");
    var util_1 = require("./util");
    var util_logger_1 = require("./util-logger");
    var scorecard_1 = require("../scorecard/scripts/scorecard");
    var ServiceConfig_1 = require("./services/ServiceConfig");
    var ParseNetwork_1 = require("./services/ParseNetwork");
    var parseConstants_1 = require("./domain/parseConstants");
    var FirebaseApi_1 = require("./services/FirebaseApi");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LessonController = function(_super) {
      __extends(LessonController, _super);
      function LessonController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.progressMonitor = null;
        _this.correctAudio = null;
        _this.wrongAudio = null;
        _this.startAudio = null;
        _this.scorecardPrefab = null;
        _this.blockPrefab = null;
        _this.gameParent = null;
        _this.loading = null;
        _this.backButton = null;
        _this.progressMonitorNode = null;
        _this.gameNode = null;
        _this.wrongMoves = 0;
        _this.rightMoves = 0;
        _this.nest = null;
        _this.quizScore = 0;
        _this.totalQuizzes = 0;
        _this.isQuizAnsweredCorrectly = false;
        _this.lessonStartTime = 0;
        _this.lessonSessionId = null;
        _this.problemSessionId = null;
        _this.problemStartTime = new Date().getTime();
        _this.problemTime = 0;
        _this.isGameCompleted = false;
        _this.isQuizCompleted = false;
        _this.isQuiz = false;
        _this.gameTime = 0;
        _this.quizTime = 0;
        _this.quizScores = [];
        _this.tempWrongMoves = 0;
        return _this;
      }
      LessonController_1 = LessonController;
      LessonController.prototype.onLoad = function() {
        var _this = this;
        this.loading.width = cc.winSize.width;
        this.loading.zIndex = 10;
        this.progressMonitorNode = cc.instantiate(this.progressMonitor);
        this.progressMonitorNode.zIndex = 2;
        this.node.addChild(this.progressMonitorNode);
        this.node.addChild(LessonController_1.friend.node);
        util_1.Util.loadAccessoriesAndEquipAcc(LessonController_1.friend.node.children[1], LessonController_1.friend.node);
        LessonController_1.friend.node.removeFromParent();
        this.lessonStart();
        config_1.default.isMicroLink ? this.backButton.active = false : this.backButton.on("touchend", function() {
          _this.node.getChildByName("quit").active = true;
          if (parseInt(profile_1.default.getValue(profile_1.CURRENTMODE)) == constants_1.Mode.School) {
            _this.node.getChildByName("quit").getChildByName("quit_bg").getChildByName("exit_game").y = _this.node.getChildByName("quit").getPosition().y;
            _this.node.getChildByName("quit").getChildByName("quit_bg").getChildByName("help_video").active = false;
          }
        });
      };
      LessonController.preloadLesson = function(node, callback) {
        LessonController_1.bundles.forEach(function(bundle) {
          cc.log("Releasing bundle: " + bundle.name);
          bundle.releaseAll();
        });
        LessonController_1.bundles.length = 0;
        var config = config_1.default.i;
        config.problem = 0;
        if (config.lesson.type == constants_1.EXAM) {
          var lessons_1 = [];
          var found = false;
          config.chapter.lessons.forEach(function(les) {
            found || (les.type != constants_1.EXAM ? lessons_1.push(les) : les.type == constants_1.EXAM && (les.id == config.lesson.id ? found = true : lessons_1.length = 0));
          });
          LessonController_1.loadQuizzes(lessons_1, callback, node);
        } else config_1.default.loadBundle(config.lesson.id, function(bundle) {
          LessonController_1.preloadAndFirst(bundle, callback);
        }, callback);
      };
      LessonController.preloadAndFirst = function(bundle, callback) {
        bundle.preloadDir("res", null, null, function(err, items) {
          util_1.Util.bundles.set(config_1.default.i.lesson.id, bundle);
          LessonController_1.bundles.push(bundle);
          LessonController_1.loadDataAndFirstGame(callback);
        });
      };
      LessonController.loadDataAndFirstGame = function(callback, node, lessons, maxPerLesson) {
        var _this = this;
        void 0 === node && (node = null);
        void 0 === lessons && (lessons = null);
        void 0 === maxPerLesson && (maxPerLesson = 0);
        var config = config_1.default.i;
        config.loadLessonJson(function(data) {
          config.data = [ data ];
          _this.preloadGame(function(prefab) {
            _this.gamePrefab = prefab;
            util_1.Util.loadFriend(function(friendNode) {
              LessonController_1.friend = friendNode.getComponent(friend_1.default);
              callback();
            });
          });
        }, node, lessons, maxPerLesson);
      };
      LessonController.loadQuizzes = function(lessons, callback, node, maxPerLesson) {
        void 0 === maxPerLesson && (maxPerLesson = 0);
        var numLessons = lessons.length;
        lessons.forEach(function(les) {
          config_1.default.loadBundle(les.id, function(bundle) {
            bundle.preloadDir("res", null, null, function(err, items) {
              util_1.Util.bundles.set(les.id, bundle);
              LessonController_1.bundles.push(bundle);
              numLessons--;
            });
          }, callback);
        });
        var checkAllLoaded = function() {
          if (numLessons <= 0) {
            cc.director.getScheduler().unschedule(checkAllLoaded, node);
            LessonController_1.loadDataAndFirstGame(callback, node, lessons, maxPerLesson);
          }
        };
        cc.director.getScheduler().schedule(checkAllLoaded, node, 1);
      };
      LessonController.preloadGame = function(callback) {
        var config = config_1.default.i;
        config.game = config.data[0][0];
        config.currentGameLessonId = config.data[0][2];
        var gameConfig = gameConfigs_1.GAME_CONFIGS[config.game];
        var fontName = config.course.id.split("-")[0] + "-" + config_1.DEFAULT_FONT;
        if (null != gameConfig.fontName) {
          var splits = gameConfig.fontName.split("-");
          if (splits && 2 === splits.length) {
            var prefixFont = config.course.lang;
            var suffixFont = splits[1];
            fontName = prefixFont + "-" + suffixFont;
          }
        }
        config_1.default.i.hasLoadedTextFont(fontName) ? cc.assetManager.loadBundle(gameConfig.bundle, function(err, bundle) {
          bundle.load(gameConfig.prefab, cc.Prefab, function(err, prefab) {
            callback(prefab);
          });
        }) : config_1.default.i.loadFontDynamically(fontName, function() {
          cc.log("Loading font for game ...", fontName);
          cc.assetManager.loadBundle(gameConfig.bundle, function(err, bundle) {
            bundle.load(gameConfig.prefab, cc.Prefab, function(err, prefab) {
              callback(prefab);
            });
          });
        });
      };
      LessonController.prototype.lessonStart = function() {
        this.lessonStartTime = new Date().getTime();
        this.lessonSessionId = profile_1.User.createUUID();
        this.startGame(LessonController_1.gamePrefab);
        this.loading.active = false;
      };
      LessonController.prototype.problemStart = function(replaceScene) {
        var _this = this;
        this.problemStartTime = new Date().getTime();
        this.problemSessionId = profile_1.User.createUUID();
        if (replaceScene) LessonController_1.preloadGame(function(prefab) {
          LessonController_1.friend.extraClip = null;
          LessonController_1.friend.node.removeFromParent();
          LessonController_1.friend.isFace = false;
          _this.startGame(prefab);
          _this.loading.active = false;
        }); else {
          null != this.gameNode && this.gameNode.emit("nextIteration");
          this.loading.active = false;
        }
      };
      LessonController.prototype.startGame = function(prefab) {
        var newGameNode = cc.instantiate(prefab);
        var gameComponent = newGameNode.getComponent(game_1.default);
        if (gameComponent) {
          if (!gameComponent.friendPos) {
            gameComponent.friendPos = new cc.Node();
            gameComponent.friendPos.position = cc.v3(-512, -384);
            gameComponent.node.addChild(gameComponent.friendPos);
          }
          gameComponent.friend = LessonController_1.friend;
          gameComponent.friend.node.position = cc.Vec3.ZERO;
          gameComponent.friendPos.addChild(LessonController_1.friend.node);
          LessonController_1.friend.helpFile = "games/" + config_1.default.i.game;
          LessonController_1.friend.playIdleAnimation(1);
        }
        null != this.gameNode && this.gameNode.removeFromParent();
        this.gameNode = newGameNode;
        this.gameParent.addChild(this.gameNode);
        var gameConfig = gameConfigs_1.GAME_CONFIGS[config_1.default.i.game];
        if (gameConfig.center) {
          this.gameNode.x = -512;
          this.gameNode.y = -384;
        } else {
          this.gameNode.x = 0;
          this.gameNode.y = 0;
        }
        this.setupEventHandlers();
      };
      LessonController.prototype.problemEnd = function(replaceScene, forward) {
        var _this = this;
        void 0 === forward && (forward = true);
        var config = config_1.default.i;
        var gameConfig = gameConfigs_1.GAME_CONFIGS[config.game];
        !gameConfig || !gameConfig.fontName || config.releaseFont(config.currentFontName);
        var timeSpent = Math.ceil((new Date().getTime() - this.problemStartTime) / 1e3);
        var monitor = this.progressMonitorNode.getComponent(progressMonitor_1.default);
        var currentProblem = config.problem;
        this.isQuiz = config.game.toLowerCase().includes("quizmaths") || config.game.toLowerCase().includes("quizliteracy");
        this.isQuizCompleted = !!this.isQuiz;
        this.isGameCompleted = !this.isQuiz;
        if (this.isQuiz) {
          this.totalQuizzes++;
          this.quizScores.push(this.isQuizAnsweredCorrectly ? 1 : 0);
        }
        var isStory = "story" == config.game;
        if (cc.sys.localStorage.getItem(constants_1.CURRENT_STUDENT_ID)) {
          var monitorInfo = {
            chapter: config.chapter.id,
            lesson: config.lesson.id,
            incorrect: this.wrongMoves,
            totalQuestions: config.totalProblems,
            correct: this.rightMoves,
            totalChallenges: config.totalProblems,
            totalSeconds: timeSpent,
            activity: config.game,
            kind: "Monitor",
            schoolId: cc.sys.localStorage.getItem(constants_1.CURRENT_SCHOOL_ID),
            studentId: cc.sys.localStorage.getItem(constants_1.CURRENT_STUDENT_ID),
            classId: cc.sys.localStorage.getItem(constants_1.CURRENT_CLASS_ID)
          };
          queue_1.Queue.getInstance().push(monitorInfo);
        }
        var eventName = this.isQuiz ? "quizEnd" : "gameEnd";
        var event = {
          lessonSessionId: this.lessonSessionId,
          gameName: config.game,
          totalGames: config.totalProblems,
          currentGameNumber: config.problem,
          problemSessionId: this.problemSessionId,
          chapterName: config.chapter.name,
          chapterId: config.chapter.id,
          lessonName: config.lesson.name,
          lessonId: config.lesson.id,
          courseName: config.course.id,
          problemNo: config.problem,
          timeSpent: Math.abs(timeSpent),
          wrongMoves: this.wrongMoves,
          correctMoves: this.rightMoves,
          correct: this.isQuizAnsweredCorrectly ? 1 : 0,
          skills: config.lesson.skills && config.lesson.skills.length > 0 ? config.lesson.skills.join(",") : "",
          game_completed: this.isGameCompleted,
          quiz_completed: this.isQuizCompleted,
          assignmentId: config.lesson.assignmentId || null,
          mlStudentId: config.lesson.mlStudentId || null,
          mlClassId: config.lesson.mlClassId || null,
          mlPartnerId: config.lesson.mlPartnerId || null
        };
        util_logger_1.default.logChimpleEvent(eventName, event);
        if (!config_1.default.isMicroLink) {
          var deviceId = util_logger_1.default.currentDeviceId();
          var logEventForIxo = {
            lessonSessionId: this.lessonSessionId,
            gameName: config.game,
            totalGames: config.totalProblems,
            currentGameNumber: config.problem,
            problemSessionId: this.problemSessionId,
            chapterName: config.chapter.name,
            chapterId: config.chapter.id,
            lessonName: config.lesson.name,
            lessonId: config.lesson.id,
            courseName: config.course.id,
            problemNo: config.problem,
            timeSpent: Math.abs(timeSpent),
            userId: profile_1.User.getCurrentUser().id,
            deviceId: deviceId
          };
          var headerCSV = Object.keys(logEventForIxo).join(",");
          var eventCSV = Object.values(logEventForIxo).join(",");
          util_logger_1.default.logToDaily(deviceId, headerCSV, eventCSV);
        }
        var starType = this.isQuiz ? this.isQuizAnsweredCorrectly ? progressMonitor_1.StarType.Correct : progressMonitor_1.StarType.Wrong : isStory ? forward ? progressMonitor_1.StarType.NextPage : progressMonitor_1.StarType.PrevPage : progressMonitor_1.StarType.Default;
        monitor.updateProgress(currentProblem, starType, function() {
          LessonController_1.getFriend().stopAudio();
          monitor.stopStar = false;
          if (forward && currentProblem < config.totalProblems || !forward && currentProblem > 1) {
            _this.loading.active = true;
            forward ? config.nextProblem() : config.prevProblem();
            _this.problemStart(replaceScene);
          } else _this.lessonEnd();
        });
      };
      LessonController.prototype.lessonEnd = function() {
        return __awaiter(this, void 0, void 0, function() {
          var config, timeSpent, score, user, reward, finishedLessons_1, percentageComplete, updateInfo, mode, updateInfo_1, requestParams, error_1, block, scorecard, scorecardComp, gameConfig;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              util_1.Util.playSfx(this.startAudio);
              config = config_1.default.getInstance();
              timeSpent = Math.ceil((new Date().getTime() - this.lessonStartTime) / 1e3);
              score = Math.round(this.totalQuizzes > 0 ? this.quizScore / this.totalQuizzes * 70 + this.rightMoves / (this.rightMoves + this.wrongMoves) * 30 : this.rightMoves / (this.rightMoves + this.wrongMoves) * 100);
              isNaN(score) && (score = 0);
              user = profile_1.User.getCurrentUser();
              if (user) {
                reward = user.updateLessonProgress(config.lesson.id, score, this.quizScores, config.lesson.assignmentId);
                finishedLessons_1 = 0;
                percentageComplete = 0;
                if (config.chapter && config.chapter.lessons && config.chapter.lessons.length > 0) {
                  config.chapter.lessons.forEach(function(lesson) {
                    user.lessonProgressMap.has(lesson.id) ? finishedLessons_1++ : "";
                  });
                  percentageComplete = finishedLessons_1 / config.chapter.lessons.length;
                }
                switch (ServiceConfig_1.ServiceConfig.getI().mode) {
                 case ServiceConfig_1.APIMode.FIREBASE:
                  updateInfo = {
                    lessonName: config.lesson.name,
                    chapterName: config.chapter.name,
                    chapter: config.chapter.id,
                    lesson: config.lesson.id,
                    courseName: config.course.id,
                    percentComplete: percentageComplete,
                    timespent: Math.abs(timeSpent),
                    assignmentId: config.lesson.assignmentId,
                    assessment: score,
                    kind: "Progress",
                    studentId: profile_1.User.getCurrentUser().id,
                    dateTimeStamp: new Date().getTime()
                  };
                  mode = parseInt(profile_1.default.getValue(profile_1.CURRENTMODE));
                  mode === constants_1.Mode.School ? util_logger_1.default.historyProgress(updateInfo.chapter, updateInfo.chapterName, updateInfo.lesson, updateInfo.lessonName, profile_1.User.getCurrentUser().id, profile_1.User.getCurrentUser().schoolId, profile_1.User.getCurrentUser().sectionId, updateInfo.courseName, "" + updateInfo.assessment, config.lesson.assignmentId) : queue_1.Queue.getInstance().push(updateInfo);
                  break;

                 case ServiceConfig_1.APIMode.PARSE:
                  if (cc.sys.localStorage.getItem(constants_1.CURRENT_STUDENT_ID)) {
                    updateInfo_1 = {
                      chapter: config.chapter.id,
                      lesson: config.lesson.id,
                      courseName: config.course.id,
                      percentComplete: percentageComplete,
                      timespent: Math.abs(timeSpent),
                      assessment: score,
                      kind: "Progress",
                      schoolId: cc.sys.localStorage.getItem(constants_1.CURRENT_SCHOOL_ID),
                      studentId: cc.sys.localStorage.getItem(constants_1.CURRENT_STUDENT_ID),
                      sectionId: cc.sys.localStorage.getItem(constants_1.CURRENT_SECTION_ID),
                      subjectId: cc.sys.localStorage.getItem(constants_1.CURRENT_SUBJECT_ID)
                    };
                    queue_1.Queue.getInstance().push(updateInfo_1);
                  }
                }
              }
              util_logger_1.default.logChimpleEvent("lessonEnd", {
                lessonSessionId: this.lessonSessionId,
                chapterName: config.chapter.name,
                chapterId: config.chapter.id,
                lessonName: config.lesson.name,
                lessonId: config.lesson.id,
                courseName: config.course.id,
                lessonType: config.lesson.type,
                score: score,
                timeSpent: Math.abs(timeSpent),
                skills: config.lesson.skills && config.lesson.skills.length > 0 ? config.lesson.skills.join(",") : "",
                attempts: user && user.lessonProgressMap.get(config.lesson.id) ? user.lessonProgressMap.get(config.lesson.id).attempts : 1,
                assignmentId: config.lesson.assignmentId,
                mlStudentId: config.lesson.mlStudentId,
                mlClassId: config.lesson.mlClassId,
                mlPartnerId: config.lesson.mlPartnerId
              });
              _a.label = 1;

             case 1:
              _a.trys.push([ 1, 4, , 5 ]);
              if (!("true" === config.microLinkData.webclass && null != config.lesson.assignmentId)) return [ 3, 3 ];
              cc.log("config.microLinkData.isprod ", config.microLinkData.test);
              cc.log("config.microLinkData.isprod ", config.microLinkData);
              requestParams = {
                url: "true" == config.microLinkData.test ? parseConstants_1.WEBCLASS_HISTORICAL_PROGRESS_URL_TEST : parseConstants_1.WEBCLASS_HISTORICAL_PROGRESS_URL_PROD,
                body: {
                  lessonId: config.lesson.id,
                  chapterId: config.chapter.id,
                  lessonName: config.lesson.name,
                  chapterName: config.chapter.name,
                  assignmentId: config.lesson.assignmentId,
                  score: score,
                  sectionId: config.lesson.mlClassId,
                  subjectCode: config.course.id
                }
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().post(requestParams, FirebaseApi_1.FirebaseApi.getInstance().getAuthHeader()) ];

             case 2:
              _a.sent();
              _a.label = 3;

             case 3:
              return [ 3, 5 ];

             case 4:
              error_1 = _a.sent();
              cc.log("WEBCLASS_HISTORICAL_PROGRESS_URL Lamda function failed to call:", error_1);
              return [ 3, 5 ];

             case 5:
              block = cc.instantiate(this.blockPrefab);
              this.node.addChild(block);
              scorecard = cc.instantiate(this.scorecardPrefab);
              scorecardComp = scorecard.getComponent(scorecard_1.default);
              scorecardComp.score = score;
              scorecardComp.text = config.lesson.name;
              scorecardComp.reward = reward;
              config_1.default.isMicroLink && !cc.sys.isNative && (scorecardComp.continueButton.active = false);
              LessonController_1.friend.node.removeFromParent();
              this.node.addChild(scorecard);
              gameConfig = gameConfigs_1.GAME_CONFIGS[config.game];
              !gameConfig || !gameConfig.fontName || config.releaseFont(config.currentFontName);
              config.game = null;
              return [ 2 ];
            }
          });
        });
      };
      LessonController.prototype.setupEventHandlers = function() {
        var _this = this;
        var iconHighlightAnimation = this.backButton.getComponent(cc.Animation);
        this.gameNode.on("nextProblem", function(replaceScene) {
          void 0 === replaceScene && (replaceScene = true);
          _this.problemEnd(replaceScene, true);
        });
        this.gameNode.on("prevProblem", function(replaceScene) {
          void 0 === replaceScene && (replaceScene = true);
          _this.problemEnd(replaceScene, false);
        });
        this.gameNode.on("correct", function() {
          _this.rightMoves++;
          _this.tempWrongMoves = 0;
          iconHighlightAnimation.stop("icon_highlight");
          LessonController_1.friend.speak(_this.correctAudio, null, true, "happy");
        });
        this.gameNode.on("wrong", function() {
          _this.wrongMoves++;
          _this.tempWrongMoves++;
          _this.tempWrongMoves > 1 && iconHighlightAnimation.play("icon_highlight");
          LessonController_1.friend.speak(_this.wrongAudio, null, true, "sad");
        });
        this.gameNode.on(quiz_monitor_1.QUIZ_ANSWERED, function(isAnsweredCorrectly) {
          if (isAnsweredCorrectly) {
            cc.log("QUIZ_ANSWERED correctly");
            _this.isQuizAnsweredCorrectly = true;
            _this.quizScore++;
          } else {
            cc.log("QUIZ_ANSWERED wrongly");
            _this.isQuizAnsweredCorrectly = false;
          }
        });
      };
      LessonController.prototype.onDisable = function() {
        if (!this.isQuizCompleted && !this.isGameCompleted) {
          var timeSpent = Math.ceil((new Date().getTime() - this.problemStartTime) / 1e3);
          var eventName = this.isQuiz ? "quizIncomplete" : "gameIncomplete";
          var config = config_1.default.i;
          util_logger_1.default.logChimpleEvent(eventName, {
            gameName: config.game,
            totalGames: config.totalProblems,
            currentGameNumber: config.problem,
            lessonSessionId: this.lessonSessionId,
            problemSessionId: this.problemSessionId,
            chapterName: config.chapter.name,
            chapterId: config.chapter.id,
            lessonName: config.lesson.name,
            lessonId: config.lesson.id,
            courseName: config.course.id,
            problemNo: config.problem,
            timeSpent: Math.abs(timeSpent),
            wrongMoves: this.wrongMoves,
            correctMoves: this.rightMoves,
            skills: config.lesson.skills && config.lesson.skills.length > 0 ? config.lesson.skills.join(",") : "",
            mlStudentId: config.lesson.mlStudentId,
            mlClassId: config.lesson.mlClassId,
            mlPartnerId: config.lesson.mlPartnerId,
            assignmentId: config.lesson.assignmentId,
            game_completed: this.isGameCompleted,
            quiz_completed: this.isQuizCompleted
          });
        }
      };
      LessonController.getFriend = function() {
        return LessonController_1.friend;
      };
      LessonController.prototype.onClickHelpVideoButton = function() {
        util_logger_1.default.launchYoutube(gameConfigs_1.GAME_CONFIGS[config_1.default.i.game].youtube);
      };
      var LessonController_1;
      LessonController.bundles = [];
      LessonController.friend = null;
      __decorate([ property(cc.Prefab) ], LessonController.prototype, "progressMonitor", void 0);
      __decorate([ property(cc.AudioClip) ], LessonController.prototype, "correctAudio", void 0);
      __decorate([ property(cc.AudioClip) ], LessonController.prototype, "wrongAudio", void 0);
      __decorate([ property(cc.AudioClip) ], LessonController.prototype, "startAudio", void 0);
      __decorate([ property(cc.Prefab) ], LessonController.prototype, "scorecardPrefab", void 0);
      __decorate([ property(cc.Prefab) ], LessonController.prototype, "blockPrefab", void 0);
      __decorate([ property(cc.Node) ], LessonController.prototype, "gameParent", void 0);
      __decorate([ property(cc.Node) ], LessonController.prototype, "loading", void 0);
      __decorate([ property(cc.Node) ], LessonController.prototype, "backButton", void 0);
      LessonController = LessonController_1 = __decorate([ ccclass ], LessonController);
      return LessonController;
    }(cc.Component);
    exports.default = LessonController;
    cc._RF.pop();
  }, {
    "../../queue": "queue",
    "../scorecard/scripts/scorecard": "scorecard",
    "./domain/parseConstants": "parseConstants",
    "./friend": "friend",
    "./game": "game",
    "./lib/config": "config",
    "./lib/constants": "constants",
    "./lib/gameConfigs": "gameConfigs",
    "./lib/profile": "profile",
    "./progressMonitor": "progressMonitor",
    "./quiz-monitor": "quiz-monitor",
    "./services/FirebaseApi": "FirebaseApi",
    "./services/ParseNetwork": "ParseNetwork",
    "./services/ServiceConfig": "ServiceConfig",
    "./util": "util",
    "./util-logger": "util-logger"
  } ],
  lessonIcon: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7407aPuuqZI0qdT3Wu96Q1l", "lessonIcon");
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
    exports.LESSON_BG_COLORS = void 0;
    var util_1 = require("./util");
    var profile_1 = require("./lib/profile");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    exports.LESSON_BG_COLORS = [ "#72DDD3", "#FC8E83", "#B8D855", "#D48FF9", "#F98AC9" ];
    var LessonIcon = function(_super) {
      __extends(LessonIcon, _super);
      function LessonIcon() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.open = false;
        return _this;
      }
      LessonIcon.prototype.onLoad = function() {
        var _this = this;
        var defaultSpriteFrame = this.sprite.spriteFrame;
        this.sprite.spriteFrame = new cc.SpriteFrame();
        util_1.Util.load(this.lesson.chapter.course.id + "/course/res/icons/" + this.lesson.image, function(err, texture) {
          !_this.sprite || (_this.sprite.spriteFrame = err ? defaultSpriteFrame : new cc.SpriteFrame(texture));
        });
        if (this.open) {
          var currentLesson = profile_1.User.getCurrentUser().lessonProgressMap.get(this.lesson.id);
          if (true != profile_1.User.getCurrentUser().debug) try {
            if (currentLesson.score < 0) {
              var lessonHighlightAnimation = this.getComponent(cc.Animation);
              lessonHighlightAnimation.play("lesson_highlight");
            }
          } catch (error) {
            var lessonHighlightAnimation = this.getComponent(cc.Animation);
            lessonHighlightAnimation.play("lesson_highlight");
          }
          this.bg.color = new cc.Color().fromHEX(this.lesson.color ? this.lesson.color : exports.LESSON_BG_COLORS[Math.floor(Math.random() * exports.LESSON_BG_COLORS.length)]);
        } else {
          this.sprite.setMaterial(0, this.grayMaterial);
          this.bg.color = new cc.Color(224, 224, 224);
        }
      };
      __decorate([ property(cc.Sprite) ], LessonIcon.prototype, "sprite", void 0);
      __decorate([ property(cc.Node) ], LessonIcon.prototype, "bg", void 0);
      __decorate([ property(cc.Material) ], LessonIcon.prototype, "grayMaterial", void 0);
      LessonIcon = __decorate([ ccclass ], LessonIcon);
      return LessonIcon;
    }(cc.Component);
    exports.default = LessonIcon;
    cc._RF.pop();
  }, {
    "./lib/profile": "profile",
    "./util": "util"
  } ],
  loading: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "95aebuS+FpPyYalDcbBPw4a", "loading");
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
    var Loading = function(_super) {
      __extends(Loading, _super);
      function Loading() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.block = null;
        _this.animationPrefab = null;
        _this.animation = null;
        _this.messageLabel = null;
        _this.cancelBtn = null;
        _this.allowCancel = false;
        _this.animate = true;
        return _this;
      }
      Loading.prototype.onLoad = function() {
        this.node.width = cc.winSize.width;
      };
      Loading.prototype.start = function() {
        this.showLoading();
      };
      Loading.prototype.onEnable = function() {
        this.showLoading();
      };
      Loading.prototype.showLoading = function() {
        this.block.opacity = 0;
        this.animation.active = false;
        this.messageLabel.string = "";
        this.messageLabel.node.active = false;
        this.cancelBtn.active = false;
        this.cancelBtn.active = false;
        this.messageLabel.node.active = true;
        this.block.color = cc.Color.GRAY;
        this.block.opacity = 128;
        this.animate && (this.animation.active = true);
      };
      Loading.prototype.addMessage = function(message, stopAnimation, replace) {
        void 0 === stopAnimation && (stopAnimation = true);
        void 0 === replace && (replace = false);
        this.messageLabel.string = replace ? message : this.messageLabel.string + "\n" + message;
        if (stopAnimation) {
          this.animation.active = false;
          this.cancelBtn.active = true;
        }
      };
      Loading.prototype.onCancel = function() {
        this.node.active = false;
      };
      __decorate([ property(cc.Node) ], Loading.prototype, "block", void 0);
      __decorate([ property(cc.Prefab) ], Loading.prototype, "animationPrefab", void 0);
      __decorate([ property(cc.Node) ], Loading.prototype, "animation", void 0);
      __decorate([ property(cc.Label) ], Loading.prototype, "messageLabel", void 0);
      __decorate([ property(cc.Node) ], Loading.prototype, "cancelBtn", void 0);
      __decorate([ property(Boolean) ], Loading.prototype, "allowCancel", void 0);
      Loading = __decorate([ ccclass ], Loading);
      return Loading;
    }(cc.Component);
    exports.default = Loading;
    cc._RF.pop();
  }, {} ],
  nest: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7d6ccHPU2dK8pv4dYNNSQ+I", "nest");
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
    var config_1 = require("./lib/config");
    var util_1 = require("./util");
    var profile_1 = require("./lib/profile");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Nest = function(_super) {
      __extends(Nest, _super);
      function Nest() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.chimp = null;
        _this.blockPrefab = null;
        _this.homeButton = null;
        _this.backButton = null;
        _this.settingsButton = null;
        _this.soundEnable = null;
        _this.soundDisable = null;
        _this.backButtonAudio = null;
        _this.isOpen = false;
        _this.isTrasitioning = false;
        _this.numClicks = 0;
        _this.gameNode = null;
        return _this;
      }
      Nest.prototype.onLoad = function() {
        this.node.zIndex = 4;
        this.setSfxButton();
        var config = config_1.default.getInstance();
        if (config.flow == config_1.Flow.Debug) {
          var node = new cc.Node();
          var label = node.addComponent(cc.Label);
          node.y = 48;
          this.node.addChild(node);
        }
      };
      Nest.prototype.onDisable = function() {
        this.chimp.active = true;
      };
      Nest.prototype.onSettingsClicked = function(event, customEventData) {
        if (!this.isTrasitioning) {
          this.isTrasitioning = true;
          var sfxOff = 0 == profile_1.default.getItem(profile_1.SFX_OFF);
          var activeComp = null;
          profile_1.default.setItem(profile_1.SFX_OFF, sfxOff ? 1 : 0);
          sfxOff ? cc.audioEngine.stopMusic() : null != activeComp && util_1.Util.playSfx(activeComp.bgMusic, true, true);
          this.setSfxButton();
          this.goBack();
        }
      };
      Nest.prototype.setSfxButton = function() {
        var sprite = this.settingsButton.getComponent(cc.Sprite);
        sprite.spriteFrame = 0 == profile_1.default.getItem(profile_1.SFX_OFF) ? this.soundEnable : this.soundDisable;
      };
      Nest.prototype.onButtonClick = function(event, customEventData) {
        var _this = this;
        if (!this.isTrasitioning) {
          this.isTrasitioning = true;
          if (this.isOpen) this.goBack(); else {
            this.isOpen = true;
            var block = cc.instantiate(this.blockPrefab);
            var widgetComp = block.getComponent(cc.Widget);
            widgetComp.target = cc.director.getScene();
            block.on("touchstart", this.onButtonClick, this);
            this.node.insertChild(block, 0);
            config_1.default.getInstance().canPop && new cc.Tween().target(this.backButton).to(.5, {
              x: -300
            }, {
              progress: null,
              easing: "elasticOut"
            }).start();
            new cc.Tween().target(this.settingsButton).to(.5, {
              x: -200
            }, {
              progress: null,
              easing: "elasticOut"
            }).call(function() {
              cc.director.pause();
              _this.isTrasitioning = false;
            }).start();
          }
        }
      };
      Nest.prototype.onBackClick = function(event, customEventData) {
        var _this = this;
        if (!this.isTrasitioning) {
          this.isTrasitioning = true;
          this.goBack(function() {
            util_1.Util.playSfx(_this.backButtonAudio);
            _this.homeButton.interactable = false;
            config_1.default.getInstance().popScene();
          });
        }
      };
      Nest.prototype.goBack = function(callback) {
        var _this = this;
        void 0 === callback && (callback = null);
        cc.director.resume();
        new cc.Tween().target(this.backButton).to(.5, {
          x: 0
        }, {
          progress: null,
          easing: "elasticIn"
        }).call(function() {
          _this.node.removeChild(_this.node.children[0]);
          _this.isOpen = false;
          _this.isTrasitioning = false;
          null != callback && callback();
        }).start();
        new cc.Tween().target(this.settingsButton).to(.5, {
          x: 0
        }, {
          progress: null,
          easing: "elasticIn"
        }).call(function() {}).start();
      };
      __decorate([ property(cc.Node) ], Nest.prototype, "chimp", void 0);
      __decorate([ property(cc.Prefab) ], Nest.prototype, "blockPrefab", void 0);
      __decorate([ property(cc.Button) ], Nest.prototype, "homeButton", void 0);
      __decorate([ property(cc.Node) ], Nest.prototype, "backButton", void 0);
      __decorate([ property(cc.Node) ], Nest.prototype, "settingsButton", void 0);
      __decorate([ property(cc.SpriteFrame) ], Nest.prototype, "soundEnable", void 0);
      __decorate([ property(cc.SpriteFrame) ], Nest.prototype, "soundDisable", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], Nest.prototype, "backButtonAudio", void 0);
      Nest = __decorate([ ccclass ], Nest);
      return Nest;
    }(cc.Component);
    exports.default = Nest;
    cc._RF.pop();
  }, {
    "./lib/config": "config",
    "./lib/profile": "profile",
    "./util": "util"
  } ],
  "number-script": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d188cem8MZKo4EZw1jZ/0t0", "number-script");
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
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var error_handler_1 = require("./lib/error-handler");
    var answer_grid_1 = require("./answer-grid");
    var NumberScript = function(_super) {
      __extends(NumberScript, _super);
      function NumberScript() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.normalLabelColor = "";
        _this.pressedLabelColor = "";
        return _this;
      }
      NumberScript.prototype.onLoad = function() {};
      NumberScript.prototype.onButtonClick = function(event, customEventData) {
        var backGround = event.target.getChildByName(answer_grid_1.BACK_GROUND);
        if (!!backGround) {
          var labelNode = backGround.getChildByName(answer_grid_1.NUMBER_LABEL);
          var label = labelNode.getComponent(cc.Label);
          var outLine = labelNode.addComponent(cc.LabelOutline);
          outLine.width = 2;
          var customEvent = new cc.Event.EventCustom(answer_grid_1.ANSWER_GRID_BUTTON_CLICKED, true);
          customEvent.setUserData({
            selectedDigit: label.string
          });
          this.node.dispatchEvent(customEvent);
        }
      };
      __decorate([ property ], NumberScript.prototype, "normalLabelColor", void 0);
      __decorate([ property ], NumberScript.prototype, "pressedLabelColor", void 0);
      __decorate([ error_handler_1.default() ], NumberScript.prototype, "onButtonClick", null);
      NumberScript = __decorate([ ccclass ], NumberScript);
      return NumberScript;
    }(cc.Component);
    exports.default = NumberScript;
    cc._RF.pop();
  }, {
    "./answer-grid": "answer-grid",
    "./lib/error-handler": "error-handler"
  } ],
  parseACL: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cf983q0+mVH+61RSwOZxCBw", "parseACL");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ReadWriteACL = exports.ParseACL = void 0;
    var ParseACL = function() {
      function ParseACL() {}
      return ParseACL;
    }();
    exports.ParseACL = ParseACL;
    var ReadWriteACL = function() {
      function ReadWriteACL() {}
      return ReadWriteACL;
    }();
    exports.ReadWriteACL = ReadWriteACL;
    cc._RF.pop();
  }, {} ],
  parseApi: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2f3b4FOtDhA+6YMUhF2+Mai", "parseApi");
    "use strict";
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
    exports.ParseApi = exports.SelectionMode = void 0;
    var parseUser_1 = require("../domain/parseUser");
    var ParseNetwork_1 = require("./ParseNetwork");
    var parseConstants_1 = require("../domain/parseConstants");
    var constants_1 = require("../lib/constants");
    var parseConnection_1 = require("../domain/parseConnection");
    var parseSchool_1 = require("../domain/parseSchool");
    var parseChapterAssignment_1 = require("../domain/parseChapterAssignment");
    var parseSubject_1 = require("../domain/parseSubject");
    var parseSection_1 = require("../domain/parseSection");
    var parseStudent_1 = require("../domain/parseStudent");
    var parseClass_1 = require("../domain/parseClass");
    var parseMonitor_1 = require("../domain/parseMonitor");
    var profile_1 = require("../lib/profile");
    var parseAssignmentForChapter_1 = require("../domain/parseAssignmentForChapter");
    var parseTeachersForStudent_1 = require("../domain/parseTeachersForStudent");
    var parseChapterProgress_1 = require("../domain/parseChapterProgress");
    var parseAssignment_1 = require("../domain/parseAssignment");
    var queue_1 = require("../../../queue");
    var SelectionMode;
    (function(SelectionMode) {
      SelectionMode[SelectionMode["Home"] = 0] = "Home";
      SelectionMode[SelectionMode["Section"] = 1] = "Section";
      SelectionMode[SelectionMode["Student"] = 2] = "Student";
      SelectionMode[SelectionMode["Subject"] = 3] = "Subject";
      SelectionMode[SelectionMode["TeacherHome"] = 4] = "TeacherHome";
    })(SelectionMode = exports.SelectionMode || (exports.SelectionMode = {}));
    var ParseApi = function() {
      function ParseApi() {}
      ParseApi.prototype.teacherRequestAccepted = function(request) {
        return __awaiter(this, void 0, Promise, function() {
          var school, updateHomeTeacherInfo;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, ParseApi.getInstance().schoolById(request.teacherId) ];

             case 1:
              school = _a.sent();
              updateHomeTeacherInfo = {
                homeId: request.studentId,
                teacherId: school.user.objectId,
                kind: "UpdateHomeTeacher",
                studentName: request.studentName,
                schoolId: school.objectId,
                sectionId: request.sectionId
              };
              queue_1.Queue.getInstance().push(updateHomeTeacherInfo);
              return [ 2, true ];
            }
          });
        });
      };
      ParseApi.prototype.getAuthHeader = function() {
        var LoggedInUserType = ParseApi.getInstance().getLoggedInUser();
        var authHeader = {
          "X-Parse-Application-Id": parseConstants_1.APPLICATION_ID,
          "X-Parse-REST-API-Key": parseConstants_1.PARSE_REST_API_KEY,
          Accept: "application/json"
        };
        !LoggedInUserType || !LoggedInUserType.sessionToken || (authHeader["x-parse-session-token"] = LoggedInUserType.sessionToken);
        return {
          ignoreCache: false,
          headers: authHeader,
          timeout: parseConstants_1.DEFAULT_TIMEOUT
        };
      };
      ParseApi.getInstance = function() {
        ParseApi.instance || (ParseApi.instance = new ParseApi());
        return ParseApi.instance;
      };
      ParseApi.prototype.login = function(username, password) {
        return __awaiter(this, void 0, Promise, function() {
          var requestParams;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              requestParams = {
                url: parseConstants_1.LOGIN_URL,
                queryParams: {
                  username: username,
                  password: password
                }
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().get(requestParams, constants_1.LOGGED_IN_USER, this.getAuthHeader()) ];

             case 1:
              _a.sent();
              return [ 2, ParseApi.instance.getLoggedInUser() ];
            }
          });
        });
      };
      ParseApi.prototype.loginUser = function(email, password) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, ParseApi.instance.login(email, password) ];
          });
        });
      };
      ParseApi.prototype.registerUser = function(username, password) {
        return __awaiter(this, void 0, Promise, function() {
          var user, requestParams;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              user = new parseUser_1.ParseUser();
              user.email = username;
              user.username = username;
              user.password = password;
              requestParams = {
                url: parseConstants_1.USER_URL,
                body: user
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().post(requestParams, this.getAuthHeader()) ];

             case 1:
              return [ 2, _a.sent() ];
            }
          });
        });
      };
      ParseApi.prototype.isUserExists = function(username) {
        return __awaiter(this, void 0, Promise, function() {
          var userExists, requestParams, jsonResult;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              userExists = false;
              requestParams = {
                url: parseConstants_1.USER_URL,
                queryParams: {
                  username: username
                },
                isWhereQuery: true
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().get(requestParams, username, this.getAuthHeader()) ];

             case 1:
              jsonResult = _a.sent();
              userExists = !!(jsonResult && Array.isArray(jsonResult) && jsonResult.length > 0);
              return [ 2, userExists ];
            }
          });
        });
      };
      ParseApi.prototype.getLoggedInUser = function() {
        return ParseApi.instance.fromJson(ParseNetwork_1.ParseNetwork.getInstance().getParseObjectFromCache(constants_1.LOGGED_IN_USER), parseUser_1.ParseUser);
      };
      ParseApi.prototype.logout = function() {
        ParseNetwork_1.ParseNetwork.getInstance().removeFromCache(constants_1.LOGGED_IN_USER);
        ParseNetwork_1.ParseNetwork.getInstance().removeFromCache(parseConstants_1.LOGIN_TYPE);
      };
      ParseApi.prototype.connections = function() {
        return __awaiter(this, void 0, Promise, function() {
          var jsonResult, loggedInUser, condition, requestParams, cons;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              jsonResult = null;
              loggedInUser = ParseApi.instance.getLoggedInUser();
              condition = {
                user: ParseNetwork_1.ParseNetwork.getInstance().createPointer("_User", loggedInUser.objectId)
              };
              requestParams = {
                url: parseConstants_1.CONNECTION_URL,
                queryParams: condition,
                isWhereQuery: true,
                includeParam: "school,school.user"
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().get(requestParams, parseConstants_1.CURRENT_CONNECTION, this.getAuthHeader()) ];

             case 1:
              jsonResult = _a.sent();
              cons = ParseApi.instance.selectedConnections();
              return [ 2, cons ];
            }
          });
        });
      };
      ParseApi.prototype.schoolForTeacher = function() {
        return __awaiter(this, void 0, Promise, function() {
          var jsonResult, loggedInUser, condition, requestParams;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              jsonResult = null;
              loggedInUser = ParseApi.instance.getLoggedInUser();
              condition = {
                user: ParseNetwork_1.ParseNetwork.getInstance().createPointer("_User", loggedInUser.objectId)
              };
              requestParams = {
                url: parseConstants_1.SCHOOL_URL,
                queryParams: condition,
                isWhereQuery: true
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().get(requestParams, parseConstants_1.CURRENT_TEACHER_SCHOOL, this.getAuthHeader()) ];

             case 1:
              jsonResult = _a.sent();
              return [ 2, ParseApi.instance.selectedSchool(parseConstants_1.CURRENT_TEACHER_SCHOOL) ];
            }
          });
        });
      };
      ParseApi.prototype.schoolById = function(objectId) {
        return __awaiter(this, void 0, Promise, function() {
          var jsonResult, requestParams;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              jsonResult = null;
              requestParams = {
                url: parseConstants_1.SCHOOL_URL + "/" + objectId
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().get(requestParams, objectId, this.getAuthHeader()) ];

             case 1:
              jsonResult = _a.sent();
              return [ 2, ParseApi.instance.selectedSchool(objectId) ];
            }
          });
        });
      };
      ParseApi.prototype.getChapterAssignment = function(schoolId, sectionId, subjectId) {
        return __awaiter(this, void 0, Promise, function() {
          var storeKey, jsonResult, condition, requestParams, chapterAssignments;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              storeKey = parseConstants_1.CHAPTER_ASSIGNMENT + schoolId + sectionId + subjectId;
              jsonResult = null;
              condition = {
                school: ParseNetwork_1.ParseNetwork.getInstance().createPointer("School", schoolId),
                subject: ParseNetwork_1.ParseNetwork.getInstance().createPointer("Subject", subjectId),
                section: ParseNetwork_1.ParseNetwork.getInstance().createPointer("Section", sectionId)
              };
              requestParams = {
                url: parseConstants_1.CHAPTER_ASSIGNMENT_URL,
                queryParams: condition,
                isWhereQuery: true
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().get(requestParams, storeKey, this.getAuthHeader()) ];

             case 1:
              jsonResult = _a.sent();
              chapterAssignments = ParseApi.instance.fromJson(ParseNetwork_1.ParseNetwork.getInstance().getParseObjectFromCache(storeKey), parseChapterAssignment_1.ParseChapterAssignment, false);
              return [ 2, chapterAssignments ];
            }
          });
        });
      };
      ParseApi.prototype.selectedConnections = function() {
        return ParseApi.instance.fromJson(ParseNetwork_1.ParseNetwork.getInstance().getParseObjectFromCache(parseConstants_1.CURRENT_CONNECTION), parseConnection_1.ParseConnection, false);
      };
      ParseApi.prototype.selectedSchool = function(key) {
        var schools = ParseApi.instance.fromJson(ParseNetwork_1.ParseNetwork.getInstance().getParseObjectFromCache(key), parseSchool_1.ParseSchool, false);
        if (Array.isArray(schools) && schools.length > 0) return schools[0];
        return schools;
      };
      ParseApi.prototype.getAllSubjects = function() {
        return __awaiter(this, void 0, Promise, function() {
          var requestParams;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              requestParams = {
                url: parseConstants_1.SUBJECT_URL
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().get(requestParams, parseConstants_1.SUBJECTS, this.getAuthHeader()) ];

             case 1:
              _a.sent();
              return [ 2, ParseApi.instance.allSubjects() ];
            }
          });
        });
      };
      ParseApi.prototype.getSectionsForSchool = function(schoolId) {
        return __awaiter(this, void 0, Promise, function() {
          var jsonResult, schoolCondition, requestParams, sections;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              jsonResult = [];
              schoolCondition = {
                school: ParseNetwork_1.ParseNetwork.getInstance().createPointer("School", schoolId)
              };
              requestParams = {
                url: parseConstants_1.SECTION_URL,
                queryParams: schoolCondition,
                isWhereQuery: true
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().get(requestParams, parseConstants_1.SECTIONS + schoolId, this.getAuthHeader()) ];

             case 1:
              jsonResult = _a.sent();
              sections = ParseApi.instance.fromJson(ParseNetwork_1.ParseNetwork.getInstance().getParseObjectFromCache(parseConstants_1.SECTIONS + schoolId), parseSection_1.ParseSection, false);
              return [ 2, sections ];
            }
          });
        });
      };
      ParseApi.prototype.getStudentsForTeacher = function() {
        return __awaiter(this, void 0, Promise, function() {
          var teacher, jsonResult, teacherCondition, requestParams, result;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              teacher = ParseApi.instance.getLoggedInUser();
              jsonResult = [];
              teacherCondition = {
                teacher: ParseNetwork_1.ParseNetwork.getInstance().createPointer("_User", teacher.objectId)
              };
              requestParams = {
                url: parseConstants_1.TUITION_URL,
                queryParams: teacherCondition,
                isWhereQuery: true,
                includeParam: "student",
                keysParam: "student"
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().get(requestParams, parseConstants_1.STUDENTS_FOR_TEACHER + teacher.objectId, this.getAuthHeader()) ];

             case 1:
              jsonResult = _a.sent() || [];
              result = jsonResult.map(function(r) {
                return {
                  name: r.student.name,
                  objectId: r.student.objectId,
                  image: r.student.image ? r.student.image.url : ""
                };
              });
              return [ 2, result ];
            }
          });
        });
      };
      ParseApi.prototype.getProgressForChapter = function(query) {
        return __awaiter(this, void 0, Promise, function() {
          var jsonResult, result, studentIds, queryCondition, requestParams;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              jsonResult = [];
              if (!query.studentInfos) return [ 3, 2 ];
              studentIds = query.studentInfos.map(function(id) {
                return {
                  student: ParseNetwork_1.ParseNetwork.getInstance().createPointer("Student", id)
                };
              });
              queryCondition = null;
              queryCondition = query.subjectId ? {
                chapter: query.chapterId,
                max: true,
                subject: ParseNetwork_1.ParseNetwork.getInstance().createPointer("Subject", query.subjectId),
                $or: studentIds
              } : {
                chapter: query.chapterId,
                max: true,
                $or: studentIds
              };
              requestParams = {
                url: parseConstants_1.PROGRESS_URL,
                queryParams: queryCondition,
                isWhereQuery: true,
                includeParam: "student",
                keysParam: "student,lesson,assessment,timeSpent"
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().get(requestParams, null, this.getAuthHeader()) ];

             case 1:
              jsonResult = _a.sent() || [];
              result = jsonResult.map(function(r) {
                return {
                  objectId: r.student.objectId,
                  lesson: r.lesson,
                  assessment: r.assessment,
                  timeSpent: r.timeSpent,
                  studentName: r.student.name
                };
              });
              cc.log("result", result);
              _a.label = 2;

             case 2:
              return [ 2, result ];
            }
          });
        });
      };
      ParseApi.prototype.getProgressForStudentByChapterAndLesson = function(chapter, lesson) {
        return __awaiter(this, void 0, Promise, function() {
          var schoolId, sectionId, students, jsonResult, result, studentIds, queryCondition, requestParams;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              schoolId = cc.sys.localStorage.getItem(constants_1.CURRENT_SCHOOL_ID);
              sectionId = cc.sys.localStorage.getItem(constants_1.CURRENT_SECTION_ID);
              return [ 4, ParseApi.getInstance().getStudentsForSection(schoolId, sectionId) ];

             case 1:
              students = _a.sent();
              jsonResult = [];
              studentIds = students.map(function(s) {
                return {
                  student: ParseNetwork_1.ParseNetwork.getInstance().createPointer("Student", s.objectId)
                };
              });
              queryCondition = {
                chapter: chapter,
                lesson: lesson,
                max: true,
                $or: studentIds
              };
              requestParams = {
                url: parseConstants_1.PROGRESS_URL,
                queryParams: queryCondition,
                isWhereQuery: true,
                includeParam: "student",
                keysParam: "student,lesson,assessment,timeSpent"
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().get(requestParams, null, this.getAuthHeader()) ];

             case 2:
              jsonResult = _a.sent() || [];
              result = jsonResult.map(function(r) {
                return {
                  objectId: r.student.objectId,
                  lesson: r.lesson,
                  assessment: r.assessment,
                  timeSpent: r.timeSpent,
                  studentName: r.student.name
                };
              });
              cc.log("result", result);
              return [ 2, result ];
            }
          });
        });
      };
      ParseApi.prototype.selectedSection = function(schoolId) {
        var sections = ParseApi.instance.fromJson(ParseNetwork_1.ParseNetwork.getInstance().getParseObjectFromCache(parseConstants_1.SECTIONS + schoolId), parseSection_1.ParseSection, false);
        var sectionId = ParseNetwork_1.ParseNetwork.getInstance().getStringFromCache(constants_1.CURRENT_SECTION_ID);
        return sections.filter(function(s) {
          return s.objectId === sectionId;
        });
      };
      ParseApi.prototype.allSubjects = function() {
        return ParseApi.instance.fromJson(ParseNetwork_1.ParseNetwork.getInstance().getParseObjectFromCache(parseConstants_1.SUBJECTS), parseSubject_1.ParseSubject, false);
      };
      ParseApi.prototype.selectedClasses = function(schoolId) {
        return ParseApi.instance.fromJson(ParseNetwork_1.ParseNetwork.getInstance().getParseObjectFromCache(parseConstants_1.CLASSES + schoolId), parseClass_1.ParseClass, false);
      };
      ParseApi.prototype.getStudentsForSection = function(schoolId, sectionId) {
        return __awaiter(this, void 0, Promise, function() {
          var jsonResult, requestParams, students;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              jsonResult = [];
              requestParams = {
                url: parseConstants_1.SCHOOL_STUDENT_URL,
                queryParams: {
                  school: ParseNetwork_1.ParseNetwork.getInstance().createPointer("School", schoolId),
                  section: ParseNetwork_1.ParseNetwork.getInstance().createPointer("Section", sectionId)
                },
                isWhereQuery: true,
                includeParam: "student"
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().get(requestParams, parseConstants_1.STUDENTS + schoolId + sectionId, this.getAuthHeader()) ];

             case 1:
              jsonResult = _a.sent() || [];
              jsonResult = jsonResult.map(function(ps) {
                return ps.student;
              });
              students = ParseApi.instance.fromJson(jsonResult, parseStudent_1.ParseStudent, false);
              return [ 2, students ];
            }
          });
        });
      };
      ParseApi.prototype.selectedStudents = function(schoolId, sectionId) {
        return ParseApi.instance.fromJson(ParseNetwork_1.ParseNetwork.getInstance().getParseObjectFromCache(parseConstants_1.STUDENTS + schoolId + sectionId), parseStudent_1.ParseStudent, false);
      };
      ParseApi.prototype.getActiveClassesForSchoolAndSection = function(schoolId, sectionId) {
        void 0 === sectionId && (sectionId = null);
        return __awaiter(this, void 0, Promise, function() {
          var jsonResult, activeSchoolCondition, requestParams, classes;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              jsonResult = [];
              activeSchoolCondition = {
                school: ParseNetwork_1.ParseNetwork.getInstance().createPointer("School", schoolId),
                active: true
              };
              requestParams = {
                url: parseConstants_1.CLASS_URL,
                queryParams: activeSchoolCondition,
                isWhereQuery: true,
                includeParam: "subject,teacher"
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().get(requestParams, parseConstants_1.CLASSES + schoolId, this.getAuthHeader()) ];

             case 1:
              jsonResult = _a.sent();
              classes = ParseApi.instance.selectedClasses(schoolId);
              cc.log("classes", classes);
              classes.map(function(c) {
                var st = {
                  subject: c.subject,
                  teacher: c.teacher,
                  classId: c.objectId
                };
                ParseApi.instance.storeSubjectAndTeacherByClass(c.objectId, st);
              });
              return [ 2, classes ];
            }
          });
        });
      };
      ParseApi.prototype.storeSubjectAndTeacherByClass = function(classId, st) {
        ParseNetwork_1.ParseNetwork.getInstance().storeIntoCache(parseConstants_1.SUBJECT + classId, st.subject);
        ParseNetwork_1.ParseNetwork.getInstance().storeIntoCache(parseConstants_1.TEACHER + classId, st.teacher);
      };
      ParseApi.prototype.getSubjectByClass = function(classId) {
        return ParseApi.instance.fromJson(ParseNetwork_1.ParseNetwork.getInstance().getParseObjectFromCache(parseConstants_1.SUBJECT + classId), parseSubject_1.ParseSubject);
      };
      ParseApi.prototype.getTeacherByClass = function(classId) {
        return ParseApi.instance.fromJson(ParseNetwork_1.ParseNetwork.getInstance().getParseObjectFromCache(parseConstants_1.TEACHER + classId), parseUser_1.ParseUser);
      };
      ParseApi.prototype.fromJson = function(payload, ctor, isObject) {
        void 0 === isObject && (isObject = true);
        var result = null;
        if (null === payload || void 0 === payload) result = isObject ? Object.assign({}) : Object.assign([]); else if (payload && Array.isArray(payload)) result = payload.map(function(p) {
          var s = new ctor();
          return Object.assign(s, p);
        }); else if (payload) {
          var s = new ctor();
          result = Object.assign(s, payload);
        }
        return result;
      };
      ParseApi.prototype.asyncForEach = function(array, callback) {
        return __awaiter(this, void 0, void 0, function() {
          var index;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              index = 0;
              _a.label = 1;

             case 1:
              if (!(index < array.length)) return [ 3, 4 ];
              return [ 4, callback(array[index], index, array) ];

             case 2:
              _a.sent();
              _a.label = 3;

             case 3:
              index++;
              return [ 3, 1 ];

             case 4:
              return [ 2 ];
            }
          });
        });
      };
      ParseApi.prototype.convertDataURIToBinary = function(dataURI) {
        var BASE64_MARKER = ";base64,";
        var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
        var base64 = dataURI.substring(base64Index);
        var raw = window.atob(base64);
        var rawLength = raw.length;
        var array = new Uint8Array(new ArrayBuffer(rawLength));
        for (var i = 0; i < rawLength; i++) array[i] = raw.charCodeAt(i);
        return array;
      };
      ParseApi.prototype.findOrCreateMonitor = function(schoolId, studentId, classId, subject, subjectId) {
        return __awaiter(this, void 0, void 0, function() {
          var monitor, e_1;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              _a.trys.push([ 0, 3, 4, 5 ]);
              return [ 4, ParseApi.instance.getMonitorBySchoolAndStudentAndClass(schoolId, studentId, classId) ];

             case 1:
              monitor = _a.sent();
              if (!!monitor) return [ 2 ];
              return [ 4, ParseApi.instance.createMonitor(schoolId, studentId, classId) ];

             case 2:
              _a.sent();
              return [ 3, 5 ];

             case 3:
              e_1 = _a.sent();
              cc.log(e_1);
              return [ 3, 5 ];

             case 4:
              ParseNetwork_1.ParseNetwork.getInstance().storeIntoCache(constants_1.CURRENT_CLASS_ID, classId);
              ParseNetwork_1.ParseNetwork.getInstance().storeIntoCache(parseConstants_1.CURRENT_SUBJECT_NAME, subject);
              ParseNetwork_1.ParseNetwork.getInstance().storeIntoCache(constants_1.CURRENT_SUBJECT_ID, subjectId);
              return [ 7 ];

             case 5:
              return [ 2 ];
            }
          });
        });
      };
      ParseApi.prototype.buildAndLoginUser = function(student) {
        return __awaiter(this, void 0, void 0, function() {
          var code, password, gender, currentUser, e_2;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              _a.trys.push([ 0, 2, , 3 ]);
              code = ParseNetwork_1.ParseNetwork.getInstance().getStringFromCache(parseConstants_1.SCHOOL_CODE);
              password = ParseNetwork_1.ParseNetwork.getInstance().getStringFromCache(parseConstants_1.SCHOOL_PASSWORD);
              return [ 4, ParseApi.instance.login(code, password) ];

             case 1:
              _a.sent();
              gender = student.gender ? "male" === student.gender.toLowerCase() ? profile_1.Gender.BOY : profile_1.Gender.GIRL : profile_1.Gender.UNKNOWN;
              currentUser = profile_1.User.createUserOrFindExistingUser({
                id: student.objectId,
                name: student.name,
                age: student.age,
                gender: gender,
                imgPath: student.image ? student.image.url : ""
              });
              profile_1.User.setCurrentUser(currentUser);
              profile_1.default.fromJsonUsingParse(student.profile);
              return [ 3, 3 ];

             case 2:
              e_2 = _a.sent();
              cc.log(e_2);
              return [ 3, 3 ];

             case 3:
              return [ 2 ];
            }
          });
        });
      };
      ParseApi.prototype.createMonitor = function(schoolId, studentId, classId) {
        return __awaiter(this, void 0, Promise, function() {
          var monitor, requestParams;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              monitor = new parseMonitor_1.ParseMonitor();
              monitor.school = ParseApi.instance.createPointer("School", schoolId);
              monitor.student = ParseApi.instance.createPointer("Student", studentId);
              monitor.class = ParseApi.instance.createPointer("Class", classId);
              monitor.activity = "school-class";
              requestParams = {
                url: parseConstants_1.MONITOR_URL,
                body: monitor
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().post(requestParams, this.getAuthHeader()) ];

             case 1:
              _a.sent();
              return [ 2 ];
            }
          });
        });
      };
      ParseApi.prototype.signUpUser = function(info) {
        return __awaiter(this, void 0, Promise, function() {
          var requestParams;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!(info.username && info.password && info.email && info.fullName)) return [ 3, 2 ];
              requestParams = {
                url: parseConstants_1.SIGN_UP_URL,
                body: info
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().post(requestParams, this.getAuthHeader()) ];

             case 1:
              return [ 2, _a.sent() ];

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      ParseApi.prototype.signUpTestUser = function(info) {
        return __awaiter(this, void 0, Promise, function() {
          var requestParams;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!(info.username && info.phoneNumber && info.verficationId && info.code && info.password)) return [ 3, 2 ];
              requestParams = {
                url: parseConstants_1.SIGN_UP_TEST_URL,
                body: info
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().post(requestParams, this.getAuthHeader()) ];

             case 1:
              return [ 2, _a.sent() ];

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      ParseApi.prototype.listAssignments = function(studentId, limit) {
        void 0 === limit && (limit = 10);
        return __awaiter(this, void 0, void 0, function() {
          var assignments, requestParams, result;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              assignments = [];
              requestParams = {
                url: parseConstants_1.LIST_ASSIGNMENTS,
                body: {
                  studentId: studentId,
                  limit: limit
                }
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().post(requestParams, this.getAuthHeader()) ];

             case 1:
              result = _a.sent();
              if (result && result.data && result.data.result) {
                this.buildAssignments(assignments, result.data.result.myAssignments);
                this.buildAssignments(assignments, result.data.result.allAssignments);
              }
              return [ 2, assignments ];
            }
          });
        });
      };
      ParseApi.prototype.buildAssignments = function(results, assignments) {
        var lessonMap = profile_1.User.getCurrentUser().lessonProgressMap;
        assignments.forEach(function(s) {
          s.forEach(function(a) {
            var b = {};
            var shouldInclude = true;
            b.chapterId = a.chapter;
            b.lessonId = a.lesson;
            b.courseCode = a.subject.courseCode;
            b.createAt = new Date(a.createAt);
            if (lessonMap.has(a.lesson)) {
              var lProgress = profile_1.User.getCurrentUser().lessonProgressMap.get(a.lesson);
              shouldInclude = lProgress.date.getTime() < b.createAt.getTime();
            }
            shouldInclude && results.push(b);
          });
        });
        results = results.filter(function(v, i, a) {
          return a.findIndex(function(t) {
            return t.chapterId === v.chapterId && t.lessonId === v.lessonId;
          }) === i;
        });
        return results;
      };
      ParseApi.prototype.updateProgress = function(info) {
        return __awaiter(this, void 0, Promise, function() {
          var requestParams;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!(info.studentId && info.studentId.length > 0)) return [ 3, 2 ];
              requestParams = {
                url: parseConstants_1.UPDATE_PROGRESS_URL,
                body: info
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().post(requestParams, this.getAuthHeader()) ];

             case 1:
              return [ 2, _a.sent() ];

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      ParseApi.prototype.assignHomeWork = function(info) {
        return __awaiter(this, void 0, Promise, function() {
          var requestParams;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!!!info) return [ 3, 2 ];
              requestParams = {
                url: parseConstants_1.ASSIGN_HOMEWORK_URL,
                body: info
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().post(requestParams, this.getAuthHeader()) ];

             case 1:
              return [ 2, _a.sent() ];

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      ParseApi.prototype.updateMonitor = function(info) {
        return __awaiter(this, void 0, Promise, function() {
          var requestParams;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!(info.studentId && info.studentId.length > 0)) return [ 3, 2 ];
              requestParams = {
                url: parseConstants_1.UPDATE_MONITOR_URL,
                body: info
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().post(requestParams, this.getAuthHeader()) ];

             case 1:
              return [ 2, _a.sent() ];

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      ParseApi.prototype.createSection = function(sectionName) {
        return __awaiter(this, void 0, Promise, function() {
          var requestParams;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              requestParams = {
                url: parseConstants_1.CREATE_SECTION_URL,
                body: {
                  schoolId: cc.sys.localStorage.getItem(constants_1.CURRENT_SCHOOL_ID),
                  sectionName: sectionName
                }
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().post(requestParams, this.getAuthHeader()) ];

             case 1:
              return [ 2, _a.sent() ];
            }
          });
        });
      };
      ParseApi.prototype.removeFromCache = function(key) {
        ParseNetwork_1.ParseNetwork.getInstance().removeFromCache(key);
      };
      ParseApi.prototype.updateHomeTeacher = function(info) {
        return __awaiter(this, void 0, Promise, function() {
          var requestParams;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!(info.teacherId && info.teacherId.length > 0 && info.homeId && info.homeId.length > 0)) return [ 3, 2 ];
              requestParams = {
                url: parseConstants_1.UPDATE_HOME_TEACHER_URL,
                body: info
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().post(requestParams, this.getAuthHeader()) ];

             case 1:
              return [ 2, _a.sent() ];

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      ParseApi.prototype.updateProfile = function(info) {
        return __awaiter(this, void 0, Promise, function() {
          var studentId, requestParams;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              studentId = info.studentId;
              if (!(studentId && studentId.length > 0)) return [ 3, 2 ];
              requestParams = {
                url: parseConstants_1.STUDENT_URL + "/" + studentId,
                body: {
                  profile: info.profile
                }
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().update(requestParams, this.getAuthHeader()) ];

             case 1:
              return [ 2, _a.sent() ];

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      ParseApi.prototype.getMonitorBySchoolAndStudentAndClass = function(schoolId, studentId, classId) {
        return __awaiter(this, void 0, Promise, function() {
          var jsonResult, monitor, requestParams, monitors;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              jsonResult = [];
              monitor = null;
              requestParams = {
                url: parseConstants_1.MONITOR_URL,
                queryParams: {
                  school: ParseNetwork_1.ParseNetwork.getInstance().createPointer("School", schoolId),
                  student: ParseNetwork_1.ParseNetwork.getInstance().createPointer("Student", studentId),
                  class: ParseNetwork_1.ParseNetwork.getInstance().createPointer("Class", classId)
                },
                isWhereQuery: true
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().get(requestParams, null, this.getAuthHeader()) ];

             case 1:
              jsonResult = _a.sent();
              monitors = ParseApi.instance.fromJson(jsonResult, parseMonitor_1.ParseMonitor, false);
              monitor = monitors && monitors.length > 0 ? monitors[0] : null;
              return [ 2, monitor ];
            }
          });
        });
      };
      ParseApi.prototype.createPointer = function(className, objectId) {
        return {
          __type: "Pointer",
          className: className,
          objectId: objectId
        };
      };
      ParseApi.prototype.getAssignmentsForChapterForWholeClass = function(schoolId, chapter) {
        return __awaiter(this, void 0, Promise, function() {
          var storyKey, jsonResult, requestParams, responses;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              storyKey = parseConstants_1.ASSIGNMENTS_FOR_CHAPTER + schoolId + chapter;
              jsonResult = [];
              requestParams = {
                url: parseConstants_1.ASSIGNMENTS_API_URL,
                queryParams: {
                  school: ParseNetwork_1.ParseNetwork.getInstance().createPointer("School", schoolId),
                  student: null,
                  chapter: chapter
                },
                isWhereQuery: true
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().get(requestParams, storyKey, this.getAuthHeader()) ];

             case 1:
              jsonResult = _a.sent();
              responses = ParseApi.instance.fromJson(jsonResult, parseAssignmentForChapter_1.ParseAssignmentForChapter, false);
              return [ 2, responses ];
            }
          });
        });
      };
      ParseApi.prototype.getAssignmentsForStudentsByChapterAndLesson = function(schoolId, sectionId, chapter, lesson, students) {
        return __awaiter(this, void 0, Promise, function() {
          var jsonResult, studentPointers, requestParams, responses;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              jsonResult = [];
              studentPointers = students.map(function(s) {
                return {
                  student: ParseNetwork_1.ParseNetwork.getInstance().createPointer("Student", s.objectId)
                };
              });
              requestParams = {
                url: parseConstants_1.ASSIGNMENTS_API_URL,
                queryParams: {
                  school: ParseNetwork_1.ParseNetwork.getInstance().createPointer("School", schoolId),
                  section: ParseNetwork_1.ParseNetwork.getInstance().createPointer("Section", sectionId),
                  chapter: chapter,
                  lesson: lesson,
                  $or: studentPointers
                },
                isWhereQuery: true
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().get(requestParams, null, this.getAuthHeader()) ];

             case 1:
              jsonResult = _a.sent();
              responses = ParseApi.instance.fromJson(jsonResult, parseAssignmentForChapter_1.ParseAssignmentForChapter, false);
              return [ 2, responses ];
            }
          });
        });
      };
      ParseApi.prototype.getTeachers = function(studentId) {
        return __awaiter(this, void 0, Promise, function() {
          var teachers, names;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, this.getTeachersByStudent(studentId) ];

             case 1:
              teachers = _a.sent();
              names = teachers.map(function(t) {
                return t.school.user.fullName;
              });
              return [ 2, names ];
            }
          });
        });
      };
      ParseApi.prototype.getChapterProgressByStudent = function(studentId) {
        return __awaiter(this, void 0, Promise, function() {
          var storyKey, jsonResult, requestParams, responses;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              storyKey = parseConstants_1.CHAPTER_PROGRESS + studentId;
              jsonResult = [];
              requestParams = {
                url: parseConstants_1.CHAPTER_PROGRESS_URL,
                queryParams: {
                  student: ParseNetwork_1.ParseNetwork.getInstance().createPointer("Student", studentId)
                },
                isWhereQuery: true
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().get(requestParams, storyKey, this.getAuthHeader()) ];

             case 1:
              jsonResult = _a.sent();
              responses = ParseApi.instance.fromJson(jsonResult, parseChapterProgress_1.ParseChapterProgress, false);
              return [ 2, responses ];
            }
          });
        });
      };
      ParseApi.prototype.getTeachersByStudent = function(studentId) {
        return __awaiter(this, void 0, Promise, function() {
          var storyKey, jsonResult, requestParams, responses;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              storyKey = parseConstants_1.TEACHERS_FOR_STUDENT + studentId;
              jsonResult = [];
              requestParams = {
                url: parseConstants_1.SCHOOL_STUDENT_URL,
                queryParams: {
                  student: ParseNetwork_1.ParseNetwork.getInstance().createPointer("Student", studentId)
                },
                isWhereQuery: true,
                includeParam: "school.user"
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().get(requestParams, storyKey, this.getAuthHeader()) ];

             case 1:
              jsonResult = _a.sent();
              responses = ParseApi.instance.fromJson(jsonResult, parseTeachersForStudent_1.ParseTeachersForStudent, false);
              return [ 2, responses ];
            }
          });
        });
      };
      ParseApi.prototype.getAssignments = function(schoolId, sectionId) {
        return __awaiter(this, void 0, Promise, function() {
          var storyKey, assignment, jsonResult, requestParams, progressResults, students, e_3;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              storyKey = parseConstants_1.ASSIGNMENTS + schoolId + sectionId;
              assignment = new parseAssignment_1.ParseAssignment();
              assignment.schoolId = schoolId;
              assignment.sectionId = sectionId;
              assignment.assignments = [];
              assignment.students = [];
              _a.label = 1;

             case 1:
              _a.trys.push([ 1, 3, , 4 ]);
              jsonResult = void 0;
              requestParams = {
                url: parseConstants_1.ASSIGNMENTS_URL,
                body: {
                  schoolId: schoolId,
                  sectionId: sectionId
                }
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().post(requestParams, this.getAuthHeader()) ];

             case 2:
              jsonResult = _a.sent();
              if (!!jsonResult && !!jsonResult.data && !!jsonResult.data.result) {
                progressResults = jsonResult.data.result.progressResults || [];
                students = jsonResult.data.result.students || [];
                assignment.students = students.map(function(s) {
                  return {
                    name: s.student.name,
                    studentId: s.student.objectId
                  };
                });
                assignment.assignments = progressResults.map(function(p) {
                  var result = {};
                  assignment.assignments.push(result);
                  result.chapter = p.chapter;
                  result.subject = p.subject.courseCode;
                  result.lesson = p.lesson;
                  result.studentAssessments = [];
                  !!p.progressInfo && p.progressInfo.length > 0 && p.progressInfo.forEach(function(i) {
                    result.studentAssessments.push({
                      studentId: i.pStudent.objectId,
                      assessment: i.assessment
                    });
                  });
                  return result;
                });
                ParseNetwork_1.ParseNetwork.getInstance().storeIntoCache(storyKey, assignment);
                return [ 2, ParseApi.instance.fromJson(assignment, parseAssignment_1.ParseAssignment, true) ];
              }
              return [ 3, 4 ];

             case 3:
              e_3 = _a.sent();
              return [ 2, assignment ];

             case 4:
              return [ 2 ];
            }
          });
        });
      };
      ParseApi.prototype.getLearningSummary = function(ids) {
        return __awaiter(this, void 0, Promise, function() {
          var jsonResult, studentIds, result, queryCondition, requestParams;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              jsonResult = [];
              studentIds = ids.map(function(id) {
                return {
                  student: ParseNetwork_1.ParseNetwork.getInstance().createPointer("Student", id)
                };
              });
              result = [];
              queryCondition = null;
              queryCondition = {
                $or: studentIds
              };
              requestParams = {
                url: parseConstants_1.LEARNING_SUMMARY_URL,
                queryParams: queryCondition,
                isWhereQuery: true
              };
              return [ 4, ParseNetwork_1.ParseNetwork.getInstance().get(requestParams, null, this.getAuthHeader()) ];

             case 1:
              jsonResult = _a.sent() || [];
              jsonResult.forEach(function(r) {
                result.push({
                  studentId: r.student.objectId,
                  totalTime: r.totalTime,
                  totalLessons: r.totalLessons
                });
              });
              cc.log("result", result);
              return [ 2, result ];
            }
          });
        });
      };
      ParseApi.prototype.linkStudent = function(studentId, code) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, null ];
          });
        });
      };
      ParseApi.prototype.syncFailedProgresses = function(infos) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, null ];
          });
        });
      };
      ParseApi.prototype.getLeaderboard = function(studentId, sectionId, schoolId) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, null ];
          });
        });
      };
      return ParseApi;
    }();
    exports.ParseApi = ParseApi;
    cc._RF.pop();
  }, {
    "../../../queue": "queue",
    "../domain/parseAssignment": "parseAssignment",
    "../domain/parseAssignmentForChapter": "parseAssignmentForChapter",
    "../domain/parseChapterAssignment": "parseChapterAssignment",
    "../domain/parseChapterProgress": "parseChapterProgress",
    "../domain/parseClass": "parseClass",
    "../domain/parseConnection": "parseConnection",
    "../domain/parseConstants": "parseConstants",
    "../domain/parseMonitor": "parseMonitor",
    "../domain/parseSchool": "parseSchool",
    "../domain/parseSection": "parseSection",
    "../domain/parseStudent": "parseStudent",
    "../domain/parseSubject": "parseSubject",
    "../domain/parseTeachersForStudent": "parseTeachersForStudent",
    "../domain/parseUser": "parseUser",
    "../lib/constants": "constants",
    "../lib/profile": "profile",
    "./ParseNetwork": "ParseNetwork"
  } ],
  parseAssignmentForChapter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3dc3dMpA/VAUIpW71YMnW5V", "parseAssignmentForChapter");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ParseAssignmentForChapter = void 0;
    var ParseAssignmentForChapter = function() {
      function ParseAssignmentForChapter() {}
      return ParseAssignmentForChapter;
    }();
    exports.ParseAssignmentForChapter = ParseAssignmentForChapter;
    cc._RF.pop();
  }, {} ],
  parseAssignment: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "44306Au2r1DaJ5mZ4psO148", "parseAssignment");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.StudentAssessment = exports.Result = exports.Student = exports.ParseAssignment = void 0;
    var ParseAssignment = function() {
      function ParseAssignment() {}
      return ParseAssignment;
    }();
    exports.ParseAssignment = ParseAssignment;
    var Student = function() {
      function Student() {}
      return Student;
    }();
    exports.Student = Student;
    var Result = function() {
      function Result() {}
      return Result;
    }();
    exports.Result = Result;
    var StudentAssessment = function() {
      function StudentAssessment() {}
      return StudentAssessment;
    }();
    exports.StudentAssessment = StudentAssessment;
    cc._RF.pop();
  }, {} ],
  parseChapterAssignment: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9d910HI50lGMZpnNTfVJ5YO", "parseChapterAssignment");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ParseChapterAssignment = void 0;
    var ParseChapterAssignment = function() {
      function ParseChapterAssignment() {}
      return ParseChapterAssignment;
    }();
    exports.ParseChapterAssignment = ParseChapterAssignment;
    cc._RF.pop();
  }, {} ],
  parseChapterProgress: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1b613TbD3pJAJsRpf5/lx7V", "parseChapterProgress");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ParseChapterProgress = void 0;
    var ParseChapterProgress = function() {
      function ParseChapterProgress() {}
      return ParseChapterProgress;
    }();
    exports.ParseChapterProgress = ParseChapterProgress;
    cc._RF.pop();
  }, {} ],
  parseChapter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0e4c5JAtXJCY6A9EsSGR85e", "parseChapter");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ParseChapter = void 0;
    var ParseChapter = function() {
      function ParseChapter() {}
      return ParseChapter;
    }();
    exports.ParseChapter = ParseChapter;
    cc._RF.pop();
  }, {} ],
  parseClass: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1a89e795RNCsZtKwQ1AFQ9R", "parseClass");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ParseClass = void 0;
    var ParseClass = function() {
      function ParseClass() {}
      return ParseClass;
    }();
    exports.ParseClass = ParseClass;
    cc._RF.pop();
  }, {} ],
  parseConnection: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "352115XVTNLhbSKoWKum1oP", "parseConnection");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ParseConnection = void 0;
    var ParseConnection = function() {
      function ParseConnection() {}
      return ParseConnection;
    }();
    exports.ParseConnection = ParseConnection;
    cc._RF.pop();
  }, {} ],
  parseConstants: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0457bG92QRKcKcRDWQsqcDr", "parseConstants");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.UPDATE_MONITOR_URL = exports.LIST_ASSIGNMENTS = exports.SIGN_UP_TEST_URL = exports.SIGN_UP_URL = exports.ASSIGN_HOMEWORK_URL = exports.UPDATE_PROGRESS_URL = exports.SCHOOL_STUDENT_URL = exports.LEARNING_SUMMARY_URL = exports.STUDENT_URL = exports.USER_URL = exports.MONITOR_URL = exports.CLASS_URL = exports.SUBJECT_URL = exports.SECTION_URL = exports.CHAPTER_ASSIGNMENT_URL = exports.SCHOOL_URL = exports.CONNECTION_URL = exports.LOGIN_URL = exports.TEACHERS_FOR_STUDENT = exports.ASSIGNMENTS_FOR_CHAPTER = exports.CURRENT_SUBJECT_NAME = exports.STUDENTS_FOR_TEACHER = exports.ASSIGNMENTS = exports.MONITORS = exports.TEACHER = exports.SUBJECT = exports.CLASSES = exports.STUDENTS = exports.SUBJECTS = exports.SECTIONS = exports.SCHOOL_BY_ID = exports.CHAPTER_PROGRESS = exports.CHAPTER_ASSIGNMENT = exports.CURRENT_TEACHER_SCHOOL = exports.CURRENT_CONNECTION = exports.CURRENT_SELECTED_SCHOOL = exports.LOGGED_IN_USER = exports.TEACHER_PASSWORD = exports.TEACHER_EMAIL = exports.SCHOOL_PASSWORD = exports.SCHOOL_CODE = exports.LOGIN_TYPE = exports.LoginType = exports.PUT = exports.POST = exports.GET = exports.MINUTE_TIMEOUT = exports.DEFAULT_TIMEOUT = exports.PARSE_REST_API_KEY = exports.APPLICATION_ID = void 0;
    exports.WEBCLASS_HISTORICAL_PROGRESS_URL_TEST = exports.WEBCLASS_HISTORICAL_PROGRESS_URL_PROD = exports.FIREBASE_GET_LEADERBOARD_URL = exports.FIREBASE_LINK_STUDENT_URL = exports.FIREBASE_SYNC_FAILED_PROGRESS_URL = exports.FIREBASE_UPDATE_PROGRESS_URL = exports.FIREBASE_LIST_ASSIGNMENTS = exports.FIREBASE_UPDATE_HOME_TEACHER_URL = exports.FIREBASE_SCHOOL_URL = exports.SYNC_PROGRESS_FAILED = exports.UPDATE_PROGRESS_FAILED = exports.UPDATE_MONITOR_FAILED = exports.ASSIGN_HOMEWORK_FAILED = exports.UPDATE_PROFILE_FAILED = exports.UPDATE_HOME_TEACHER_FAILED = exports.ASSIGN_HOMEWORK = exports.UPDATE_HOME_TEACHER = exports.UPDATE_PROGRESS = exports.UPDATE_MONITOR = exports.UPDATE_PROFILE = exports.CHAPTER_PROGRESS_URL = exports.CREATE_SECTION_URL = exports.ASSIGNMENTS_API_URL = exports.ASSIGNMENTS_URL = exports.PROGRESS_URL = exports.TUITION_URL = exports.UPDATE_HOME_TEACHER_URL = void 0;
    exports.APPLICATION_ID = "x45P2SW2h1UfyDT8F0C9vpKmOGe7eFCnIo33Q2dk";
    exports.PARSE_REST_API_KEY = "PIvgGRHCSFYNN9h1qhpHQ9KtEbtbwNbZ2oGknZ3g";
    exports.DEFAULT_TIMEOUT = 6e4;
    exports.MINUTE_TIMEOUT = 6e4;
    exports.GET = "get";
    exports.POST = "post";
    exports.PUT = "put";
    var LoginType;
    (function(LoginType) {
      LoginType[LoginType["School"] = 0] = "School";
      LoginType[LoginType["Teacher"] = 1] = "Teacher";
    })(LoginType = exports.LoginType || (exports.LoginType = {}));
    exports.LOGIN_TYPE = "LOGIN_TYPE";
    exports.SCHOOL_CODE = "SCHOOL_CODE";
    exports.SCHOOL_PASSWORD = "SCHOOL_PASSWORD";
    exports.TEACHER_EMAIL = "TEACHER_EMAIL";
    exports.TEACHER_PASSWORD = "TEACHER_PASSWORD";
    exports.LOGGED_IN_USER = "loggedInUser";
    exports.CURRENT_SELECTED_SCHOOL = "selectedSchool";
    exports.CURRENT_CONNECTION = "selectedConnection";
    exports.CURRENT_TEACHER_SCHOOL = "selectedTeacherSchool";
    exports.CHAPTER_ASSIGNMENT = "chapterAssignment";
    exports.CHAPTER_PROGRESS = "chapterProgress";
    exports.SCHOOL_BY_ID = "schoolById";
    exports.SECTIONS = "sections";
    exports.SUBJECTS = "subjects";
    exports.STUDENTS = "students";
    exports.CLASSES = "classes";
    exports.SUBJECT = "subject";
    exports.TEACHER = "teacher";
    exports.MONITORS = "monitors";
    exports.ASSIGNMENTS = "assignments";
    exports.STUDENTS_FOR_TEACHER = "studentsForTeacher";
    exports.CURRENT_SUBJECT_NAME = "CURRENT_SUBJECT_NAME";
    exports.ASSIGNMENTS_FOR_CHAPTER = "ASSIGNMENTS_FOR_CHAPTER";
    exports.TEACHERS_FOR_STUDENT = "TEACHERS_FOR_STUDENT";
    [];
    exports.LOGIN_URL = "https://parseapi.back4app.com/login";
    exports.CONNECTION_URL = "https://parseapi.back4app.com/classes/Connection";
    exports.SCHOOL_URL = "https://parseapi.back4app.com/classes/School";
    exports.CHAPTER_ASSIGNMENT_URL = "https://parseapi.back4app.com/classes/ChapterAssignmentStatus";
    exports.SECTION_URL = "https://parseapi.back4app.com/classes/Section";
    exports.SUBJECT_URL = "https://parseapi.back4app.com/classes/Subject";
    exports.CLASS_URL = "https://parseapi.back4app.com/classes/Class";
    exports.MONITOR_URL = "https://parseapi.back4app.com/classes/Monitor";
    exports.USER_URL = "https://parseapi.back4app.com/users";
    exports.STUDENT_URL = "https://parseapi.back4app.com/classes/Student";
    exports.LEARNING_SUMMARY_URL = "https://parseapi.back4app.com/classes/LearningSummary";
    exports.SCHOOL_STUDENT_URL = "https://parseapi.back4app.com/classes/SchoolStudents";
    exports.UPDATE_PROGRESS_URL = "https://parseapi.back4app.com/functions/updateProgress";
    exports.ASSIGN_HOMEWORK_URL = "https://parseapi.back4app.com/functions/updateAssignment";
    exports.SIGN_UP_URL = "https://parseapi.back4app.com/functions/signUp";
    exports.SIGN_UP_TEST_URL = "https://parseapi.back4app.com/functions/signUpTest";
    exports.LIST_ASSIGNMENTS = "https://parseapi.back4app.com/functions/listAssignment";
    exports.UPDATE_MONITOR_URL = "https://parseapi.back4app.com/functions/updateMonitor";
    exports.UPDATE_HOME_TEACHER_URL = "https://parseapi.back4app.com/functions/createStudent";
    exports.TUITION_URL = "https://parseapi.back4app.com/classes/Tuition";
    exports.PROGRESS_URL = "https://parseapi.back4app.com/classes/Progress";
    exports.ASSIGNMENTS_URL = "https://parseapi.back4app.com/functions/assignments";
    exports.ASSIGNMENTS_API_URL = "https://parseapi.back4app.com/classes/Assignment";
    exports.CREATE_SECTION_URL = "https://parseapi.back4app.com/functions/createSection";
    exports.CHAPTER_PROGRESS_URL = "https://parseapi.back4app.com/classes/ChapterProgress";
    exports.UPDATE_PROFILE = "update_profile";
    exports.UPDATE_MONITOR = "update_monitor";
    exports.UPDATE_PROGRESS = "update_progress";
    exports.UPDATE_HOME_TEACHER = "update_home_teacher";
    exports.ASSIGN_HOMEWORK = "assign_homework";
    exports.UPDATE_HOME_TEACHER_FAILED = "update_home_teacher_failed";
    exports.UPDATE_PROFILE_FAILED = "update_profile_failed";
    exports.ASSIGN_HOMEWORK_FAILED = "assign_homework_failed";
    exports.UPDATE_MONITOR_FAILED = "update_monitor_failed";
    exports.UPDATE_PROGRESS_FAILED = "update_progress_failed";
    exports.SYNC_PROGRESS_FAILED = "sync_progress_failed";
    exports.FIREBASE_SCHOOL_URL = "https://us-central1-bahama-stage.cloudfunctions.net/chimple/getSchool?id=";
    exports.FIREBASE_UPDATE_HOME_TEACHER_URL = "https://us-central1-bahama-stage.cloudfunctions.net/chimple/createStudent";
    exports.FIREBASE_LIST_ASSIGNMENTS = "https://us-central1-bahama-stage.cloudfunctions.net/chimple/assignments?studentId=";
    exports.FIREBASE_UPDATE_PROGRESS_URL = "https://us-central1-bahama-stage.cloudfunctions.net/chimple/updateProgressOnHttp";
    exports.FIREBASE_SYNC_FAILED_PROGRESS_URL = "https://us-central1-bahama-stage.cloudfunctions.net/chimple/syncProgressOnHttp";
    exports.FIREBASE_LINK_STUDENT_URL = "https://us-central1-bahama-stage.cloudfunctions.net/chimple/LinkStudent";
    exports.FIREBASE_GET_LEADERBOARD_URL = "https://us-central1-bahama-stage.cloudfunctions.net/chimple/getLeaderboard";
    exports.WEBCLASS_HISTORICAL_PROGRESS_URL_PROD = "https://cvjgnzup21.execute-api.ap-south-1.amazonaws.com/webclasshistoricaldata-prod";
    exports.WEBCLASS_HISTORICAL_PROGRESS_URL_TEST = "https://cvjgnzup21.execute-api.ap-south-1.amazonaws.com/webclasshistoricaldata-test";
    cc._RF.pop();
  }, {} ],
  parseMonitor: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1d7c1bWu75IM6h4Qbsbf7XZ", "parseMonitor");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ParseMonitor = void 0;
    var ParseMonitor = function() {
      function ParseMonitor() {}
      return ParseMonitor;
    }();
    exports.ParseMonitor = ParseMonitor;
    cc._RF.pop();
  }, {} ],
  parseProgress: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0e5c03JcvhOQ7sSwEI5D6Fl", "parseProgress");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ParseProgress = void 0;
    var ParseProgress = function() {
      function ParseProgress() {}
      return ParseProgress;
    }();
    exports.ParseProgress = ParseProgress;
    cc._RF.pop();
  }, {} ],
  parseSchool: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4535amQJ29GB4/ktUT/Uxzp", "parseSchool");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ParseSchool = void 0;
    var ParseSchool = function() {
      function ParseSchool() {}
      return ParseSchool;
    }();
    exports.ParseSchool = ParseSchool;
    cc._RF.pop();
  }, {} ],
  parseSection: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "44cd6SSTEBA3YGj3eJ5Uasp", "parseSection");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ParseSection = void 0;
    var ParseSection = function() {
      function ParseSection() {}
      return ParseSection;
    }();
    exports.ParseSection = ParseSection;
    cc._RF.pop();
  }, {} ],
  parseStudent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b6ec9aklhxLX7oVcfkhoBjU", "parseStudent");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ParseStudent = exports.ParseSchoolStudent = void 0;
    var ParseSchoolStudent = function() {
      function ParseSchoolStudent() {}
      return ParseSchoolStudent;
    }();
    exports.ParseSchoolStudent = ParseSchoolStudent;
    var ParseStudent = function() {
      function ParseStudent() {}
      return ParseStudent;
    }();
    exports.ParseStudent = ParseStudent;
    cc._RF.pop();
  }, {} ],
  parseSubject: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "657d7HSnyFPbptfVc+X9L3S", "parseSubject");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ParseSubject = void 0;
    var ParseSubject = function() {
      function ParseSubject() {}
      return ParseSubject;
    }();
    exports.ParseSubject = ParseSubject;
    cc._RF.pop();
  }, {} ],
  parseTeachersForStudent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "86f34UrfZBBqLlPUUPjj0j5", "parseTeachersForStudent");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SchoolWithTeacher = exports.ParseTeachersForStudent = void 0;
    var ParseTeachersForStudent = function() {
      function ParseTeachersForStudent() {}
      return ParseTeachersForStudent;
    }();
    exports.ParseTeachersForStudent = ParseTeachersForStudent;
    var SchoolWithTeacher = function() {
      function SchoolWithTeacher() {}
      return SchoolWithTeacher;
    }();
    exports.SchoolWithTeacher = SchoolWithTeacher;
    cc._RF.pop();
  }, {} ],
  parseTuition: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f48b1lL7nJIxrdwyrwCd0yz", "parseTuition");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ParseTuition = void 0;
    var ParseTuition = function() {
      function ParseTuition() {}
      return ParseTuition;
    }();
    exports.ParseTuition = ParseTuition;
    cc._RF.pop();
  }, {} ],
  parseUser: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "32690Lm67pC5JfFr5+f7Pfy", "parseUser");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ParseUser = void 0;
    var ParseUser = function() {
      function ParseUser() {}
      return ParseUser;
    }();
    exports.ParseUser = ParseUser;
    cc._RF.pop();
  }, {} ],
  profile: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a96c31hmTFFGZ19nXKggkBB", "profile");
    "use strict";
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
    exports.User = exports.LessonProgressClass = exports.CourseProgressClass = exports.Gender = exports.IN_LOGIN_FLOW = exports.IS_OTP_VERIFIED = exports.PASSWORD = exports.CONTACT = exports.EMAIL = exports.CURRENTMODE = exports.LANGUAGE = exports.MAX_AGE = exports.MAX_USERS = exports.USER_ID = exports.AGE = exports.MUSIC_OFF = exports.GENDER = exports.SFX_OFF = exports.DIALING_CODE = void 0;
    var queue_1 = require("../../../queue");
    var header_1 = require("../header");
    var util_1 = require("../util");
    var util_logger_1 = require("../util-logger");
    var config_1 = require("./config");
    var constants_1 = require("./constants");
    var WORLD = "World";
    var LEVEL = "Level";
    var IS_INITIALIZED = "isInitialized";
    exports.DIALING_CODE = "dialingCode";
    exports.SFX_OFF = "sfxOff";
    exports.GENDER = "gender";
    exports.MUSIC_OFF = "musicOff";
    exports.AGE = "age";
    exports.USER_ID = "UserId";
    exports.MAX_USERS = 3;
    exports.MAX_AGE = 12;
    exports.LANGUAGE = "language";
    exports.CURRENTMODE = "currentMode";
    exports.EMAIL = "email";
    exports.CONTACT = "contact";
    exports.PASSWORD = "password";
    exports.IS_OTP_VERIFIED = "isOtpVerified";
    exports.IN_LOGIN_FLOW = "in_login_flow";
    var Gender;
    (function(Gender) {
      Gender[Gender["BOY"] = 0] = "BOY";
      Gender[Gender["GIRL"] = 1] = "GIRL";
      Gender[Gender["UNKNOWN"] = 2] = "UNKNOWN";
    })(Gender = exports.Gender || (exports.Gender = {}));
    var CourseProgressClass = function() {
      function CourseProgressClass(currentChapterId) {
        void 0 === currentChapterId && (currentChapterId = null);
        this.currentChapterId = currentChapterId;
        this.date = new Date();
        this.assignments = [];
        this.lessonPlan = [];
        this.lessonPlanIndex = 0;
      }
      CourseProgressClass.prototype.updateChapterId = function(c) {
        this.currentChapterId = c;
        config_1.default.i.course && util_logger_1.default.logChimpleEvent("student_level", {
          level: c,
          subject: config_1.default.i.course.name
        });
      };
      return CourseProgressClass;
    }();
    exports.CourseProgressClass = CourseProgressClass;
    var LessonProgressClass = function() {
      function LessonProgressClass(score, attempts, course, assignmentId, date) {
        var _this = this;
        void 0 === attempts && (attempts = 0);
        void 0 === course && (course = config_1.default.i.course.id);
        void 0 === assignmentId && (assignmentId = null);
        void 0 === date && (date = null);
        this.achievement = 0;
        this.date = null;
        this.assignmentIds = [];
        this.score = score;
        this.attempts = attempts;
        !date ? new Date() : this.date = date;
        this.course = course;
        var assignment_ids = !assignmentId ? [] : assignmentId.split(",");
        assignment_ids.length > 0 ? assignment_ids.forEach(function(value) {
          _this.assignmentIds.push(value);
        }) : !assignmentId ? "" : this.assignmentIds.push(assignmentId);
      }
      return LessonProgressClass;
    }();
    exports.LessonProgressClass = LessonProgressClass;
    var User = function() {
      function User(id, name, age, gender, imgPath, avatarImage, isTeacher, inventory, currentBg, currentCharacter, courseProgressMap, lessonProgressMap, chapterFinishedMap, unlockedInventory, unlockedRewards, debug, lessonPlan, serverId, schoolId, sectionId, studentId, schoolName, sectionName, currentReward) {
        void 0 === debug && (debug = false);
        void 0 === serverId && (serverId = "");
        void 0 === schoolId && (schoolId = "");
        void 0 === sectionId && (sectionId = "");
        void 0 === studentId && (studentId = "");
        void 0 === schoolName && (schoolName = "");
        void 0 === sectionName && (sectionName = "");
        void 0 === currentReward && (currentReward = []);
        this.isConnected = false;
        this.debug = false;
        this.curriculumLoaded = false;
        this._id = id;
        this._name = name;
        this._age = age;
        this._gender = gender;
        this._imgPath = imgPath;
        this._avatarImage = avatarImage;
        this._isTeacher = isTeacher;
        this._inventory = inventory;
        this._unlockedInventory = unlockedInventory;
        this._unlockedRewards = unlockedRewards;
        this._currentBg = currentBg;
        this._currentCharacter = currentCharacter;
        this._courseProgressMap = courseProgressMap;
        this._lessonProgressMap = lessonProgressMap;
        this._chapterFinishedMap = chapterFinishedMap;
        util_logger_1.default.setUserIdEvent(id);
        util_logger_1.default.setUserPropertiesEvent("userName", name);
        util_logger_1.default.setUserPropertiesEvent("userAge", age);
        this._genderEvent(gender);
        this.debug = debug;
        this._serverId = serverId;
        this._assignments = [];
        this._currentReward = currentReward;
        this._schoolId = schoolId;
        this._sectionId = sectionId;
        this._studentId = studentId;
        this._schoolName = schoolName;
        this._sectionName = sectionName;
      }
      User.prototype._genderEvent = function(gender) {
        switch (gender) {
         case Gender.BOY:
          util_logger_1.default.setUserPropertiesEvent("userGender", "Boy");
          break;

         case Gender.GIRL:
          util_logger_1.default.setUserPropertiesEvent("userGender", "Girl");
          break;

         case Gender.UNKNOWN:
          util_logger_1.default.setUserPropertiesEvent("userGender", "Unknown");
        }
      };
      Object.defineProperty(User.prototype, "serverId", {
        get: function() {
          return this._serverId;
        },
        set: function(id) {
          this._serverId = id;
          this.storeUser();
          util_logger_1.default.setUserIdEvent(id);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User.prototype, "id", {
        get: function() {
          return this._id;
        },
        set: function(id) {
          this._id = id;
          this.storeUser();
          util_logger_1.default.setUserIdEvent(id);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User.prototype, "name", {
        get: function() {
          return this._name;
        },
        set: function(name) {
          this._name = name;
          this.storeUser();
          util_logger_1.default.setUserPropertiesEvent("userName", name);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User.prototype, "age", {
        get: function() {
          return this._age;
        },
        set: function(age) {
          this._age = age;
          this.storeUser();
          util_logger_1.default.setUserPropertiesEvent("userAge", age);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User.prototype, "gender", {
        get: function() {
          return this._gender;
        },
        set: function(gender) {
          this._gender = gender;
          this.storeUser();
          this._genderEvent(gender);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User.prototype, "imgPath", {
        get: function() {
          return this._imgPath;
        },
        set: function(imgPath) {
          this._imgPath = imgPath;
          this.storeUser();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User.prototype, "avatarImage", {
        get: function() {
          return this._avatarImage;
        },
        set: function(avatarImage) {
          console.log(" avatar image : ", avatarImage);
          this._avatarImage = avatarImage;
          util_logger_1.default.setUserPropertiesEvent("userAvatarImage", avatarImage);
          this.storeUser();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User.prototype, "inventory", {
        get: function() {
          return this._inventory;
        },
        set: function(inventory) {
          this._inventory = inventory;
          this.storeUser();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User.prototype, "currentBg", {
        get: function() {
          return this._currentBg;
        },
        set: function(currentBg) {
          this._currentBg = currentBg;
          this.storeUser();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User.prototype, "currentCharacter", {
        get: function() {
          return this._currentCharacter;
        },
        set: function(currentCharacter) {
          this._currentCharacter = currentCharacter;
          this.storeUser();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User.prototype, "courseProgressMap", {
        get: function() {
          return this._courseProgressMap;
        },
        set: function(courseProgressMap) {
          this._courseProgressMap = courseProgressMap;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User.prototype, "lessonProgressMap", {
        get: function() {
          return this._lessonProgressMap;
        },
        set: function(lessonProgressMap) {
          this._lessonProgressMap = lessonProgressMap;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User.prototype, "unlockedInventory", {
        get: function() {
          return this._unlockedInventory;
        },
        set: function(unlockedInventory) {
          this._unlockedInventory = {};
          this.storeUser();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User.prototype, "unlockedRewards", {
        get: function() {
          return this._unlockedRewards;
        },
        set: function(unlockedRewards) {
          this._unlockedRewards = {};
          this.storeUser();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User.prototype, "isTeacher", {
        set: function(isTeacher) {
          this._isTeacher = isTeacher;
          this.storeUser();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User.prototype, "assignments", {
        get: function() {
          return this._assignments;
        },
        set: function(assignments) {
          this._assignments = assignments;
          this.storeUser();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User.prototype, "currentCourseId", {
        get: function() {
          return this._currentCourseId;
        },
        set: function(currentCourseId) {
          this._currentCourseId = currentCourseId;
          this.storeUser();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User.prototype, "currentReward", {
        get: function() {
          return this._currentReward;
        },
        set: function(currentReward) {
          this._currentReward = currentReward;
          this.storeUser();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User.prototype, "schoolId", {
        get: function() {
          return this._schoolId;
        },
        set: function(value) {
          this._schoolId = value;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User.prototype, "sectionId", {
        get: function() {
          return this._sectionId;
        },
        set: function(value) {
          this._sectionId = value;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User.prototype, "studentId", {
        get: function() {
          return this._studentId;
        },
        set: function(value) {
          this._studentId = value;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User.prototype, "sectionName", {
        get: function() {
          return this._sectionName;
        },
        set: function(value) {
          this._sectionName = value;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User.prototype, "schoolName", {
        get: function() {
          return this._schoolName;
        },
        set: function(value) {
          this._schoolName = value;
        },
        enumerable: false,
        configurable: true
      });
      User.prototype.unlockInventoryForItem = function(item) {
        this._unlockedInventory[item] = true;
        this.storeUser();
      };
      User.prototype.unlockRewardsForItem = function(item, value) {
        this._unlockedRewards[item] = value;
        this.storeUser();
      };
      User.prototype.updateInventory = function(name, value) {
        this._inventory[name] = value;
        this.storeUser();
      };
      User.prototype.openAllRewards = function() {
        var _this = this;
        util_1.REWARD_CHARACTERS.forEach(function(char) {
          _this._unlockedRewards[util_1.REWARD_TYPES[0] + "-" + char] = 1;
          util_1.INVENTORY_DATA.forEach(function(arr) {
            arr.forEach(function(inv) {
              _this._unlockedRewards[util_1.REWARD_TYPES[3] + "-" + char + "-" + inv] = 1;
            });
          });
        });
        util_1.REWARD_BACKGROUNDS.forEach(function(bg) {
          _this._unlockedRewards[util_1.REWARD_TYPES[1] + "-" + bg] = 1;
        });
        util_1.STICKER_REWARD.forEach(function(arr) {
          util_1.STICKER_BOOK.forEach(function(lessonId) {
            _this._unlockedRewards[util_1.REWARD_TYPES[4] + "-sticker-" + lessonId] = 1;
            arr.forEach(function(sticker) {
              _this._unlockedRewards[util_1.REWARD_TYPES[4] + "-sticker-" + lessonId + "-" + sticker] = 1;
            });
          });
        });
        this.storeUser();
      };
      User.prototype.openAllRewardsForCharacter = function(character) {
        var _this = this;
        util_1.INVENTORY_DATA.forEach(function(arr) {
          arr.forEach(function(inv) {
            _this._unlockedRewards[util_1.REWARD_TYPES[3] + "-" + character + "-" + inv] = 1;
          });
        });
      };
      User.prototype.openOnlyTheSelectedRewards = function(character) {
        var _this = this;
        util_1.INVENTORY_DATA.forEach(function(arr, i) {
          var unlockItem = _this._inventory[character + "-" + arr[0].split("-")[0]];
          arr.forEach(function(inv) {
            delete _this._unlockedRewards[util_1.REWARD_TYPES[3] + "-" + character + "-" + inv];
          });
          void 0 != unlockItem && (_this._unlockedRewards[util_1.REWARD_TYPES[3] + "-" + character + "-" + arr[i].split("-")[0].concat("-" + unlockItem)] = 1);
        });
      };
      User.prototype.unlockBydefaultRewards = function() {
        this.unlockRewardsForItem(util_1.REWARD_TYPES[0] + "-" + util_1.REWARD_CHARACTERS[0], 1);
        this.unlockRewardsForItem(util_1.REWARD_TYPES[1] + "-" + util_1.REWARD_BACKGROUNDS[0], 1);
      };
      User.prototype.updateLessonProgress = function(lessonId, score, quizScores, assignmentId) {
        var _this = this;
        void 0 === assignmentId && (assignmentId = null);
        var reward;
        var config = config_1.default.i;
        var cpm = this.courseProgressMap.get(config.course.id);
        if (cpm) {
          if (this._lessonProgressMap.has(lessonId)) {
            var lessonProgress = this._lessonProgressMap.get(lessonId);
            lessonProgress.assignmentIds.push(config_1.default.i.lesson.assignmentId);
            lessonProgress.attempts++;
            lessonProgress.date = new Date();
            if (score > lessonProgress.score) {
              lessonProgress.score = score;
              config_1.default.i.lesson.type == constants_1.EXAM && score >= constants_1.MIN_PASS && (reward = [ util_1.REWARD_TYPES[2], config_1.default.i.lesson.image ]);
            }
            config_1.default.i.lesson.type == constants_1.EXAM && score < constants_1.MIN_PASS;
          } else {
            config_1.default.i.lesson.type == constants_1.EXAM && score >= constants_1.MIN_PASS && (reward = [ util_1.REWARD_TYPES[2], config_1.default.i.lesson.image ]);
            this._lessonProgressMap.set(lessonId, new LessonProgressClass(score, 1, config_1.default.i.course.id, config_1.default.i.lesson.assignmentId));
          }
          if (lessonId == config.course.id + "_PreQuiz") {
            var quizChapter = config.course.chapters.find(function(c) {
              return c.id == config.course.id + "_quiz";
            });
            if (quizChapter) {
              var currentCourse = config.course.chapters.find(function(c) {
                return c.id != config.course.id + "_quiz";
              });
              var qzId_1 = 0;
              for (var index = 0; index + 2 < quizScores.length; index += 3) {
                if (!(quizScores[index] + quizScores[index + 1] + quizScores[index + 2] >= 2)) break;
                currentCourse = config.course.chapters.find(function(c) {
                  return c.id == config.course.levels[qzId_1];
                });
                qzId_1++;
              }
              cpm.updateChapterId(currentCourse.id);
            } else {
              var formulaScore = quizScores.reduce(function(acc, cur, i, arr) {
                var mul = Math.floor(arr.length / 2) - Math.floor(i / 2);
                var neg = 0 == cur ? -.5 : cur;
                return acc + neg * mul;
              }, 0);
              var max = quizScores.length / 2 * (quizScores.length / 2 + 1);
              var total = Math.max(0, formulaScore / max);
              var chapters = config.curriculum.get(config.course.id).chapters;
              cpm.updateChapterId(chapters[Math.floor((chapters.length - 1) * total)].id);
            }
          } else if (config_1.default.i.lesson.type != constants_1.EXAM || score >= constants_1.MIN_PASS) {
            var lessons = config_1.default.i.chapter.lessons;
            var lessonIndex = lessons.findIndex(function(les) {
              return les.id == lessonId;
            });
            if (lessons.length > lessonIndex + 1) {
              var nextLesson = lessons[lessonIndex + 1];
              this._lessonProgressMap.has(nextLesson.id) || this._lessonProgressMap.set(nextLesson.id, new LessonProgressClass(-1));
            }
          }
          var lessonPlan = cpm.lessonPlan;
          if (lessonPlan && lessonPlan[cpm.lessonPlanIndex] == config.lesson.id) {
            config_1.default.i.startAction = config_1.StartAction.MoveLessonPlan;
            if (config_1.default.i.lesson.type != constants_1.EXAM || score >= constants_1.MIN_PASS) {
              cpm.lessonPlanIndex++;
              var lessons = config_1.default.i.chapter.lessons;
              var lessonIndex = lessons.findIndex(function(les) {
                return les.id == lessonId;
              });
              if (lessons.length > lessonIndex + 1) {
                var nextLesson = lessons[lessonIndex + 1];
                cpm.currentLessonId = nextLesson.id;
              } else if (this.courseProgressMap.get(config_1.default.i.course.id).currentChapterId == config_1.default.i.chapter.id) {
                var found = false;
                var nextChapter = config_1.default.i.course.chapters.find(function(c) {
                  if (found) return true;
                  found = c.id == _this.courseProgressMap.get(config_1.default.i.course.id).currentChapterId;
                  return false;
                });
                if (nextChapter) {
                  cpm.currentLessonId = null;
                  cpm.updateChapterId(nextChapter.id);
                }
              }
            } else cpm.lessonPlanIndex = 0;
          }
        }
        if (config.startCourse.id == config_1.ASSIGNMENT_COURSE_ID) {
          var startCourseProgressMap = this.courseProgressMap.get(config.startCourse.id);
          var lessonPlan = startCourseProgressMap.lessonPlan;
          if (lessonPlan && lessonPlan[startCourseProgressMap.lessonPlanIndex] == config.lesson.id) {
            config_1.default.i.startAction = config_1.StartAction.MoveLessonPlan;
            startCourseProgressMap.lessonPlanIndex++;
          }
        }
        if (this.assignments) {
          var index = this.assignments.indexOf(config.lesson.id);
          index > -1 && this.assignments.splice(index, 1);
        }
        var courseProgress = this.courseProgressMap.get(config_1.default.i.course.id);
        if (!!courseProgress) {
          courseProgress.date = new Date();
          this._chapterFinishedMap = this._chapterFinishedMap ? this._chapterFinishedMap : new Map();
          var currentChapter = config.curriculum.get(config.course.id).chapters.find(function(c) {
            return c.id === courseProgress.currentChapterId;
          });
          if (!!currentChapter && !this._chapterFinishedMap.has(currentChapter.id)) {
            var allLessonIds = currentChapter.lessons.map(function(l) {
              return l.id;
            });
            var userFinishedLessonIds_1 = Array.from(this._lessonProgressMap.keys());
            var isAllLessonsFinished = 0 === allLessonIds.filter(function(arr1Item) {
              return !userFinishedLessonIds_1.includes(arr1Item);
            }).length;
            if (isAllLessonsFinished) {
              this._chapterFinishedMap.set(currentChapter.id, true);
              util_logger_1.default.logChimpleEvent("chapterEnd", {
                chapterName: config.chapter.name,
                chapterId: config.chapter.id,
                courseName: config.course.id
              });
            }
          }
        }
        this.storeUser();
        return reward;
      };
      User.prototype.storeUser = function() {
        User.storeUser(this);
      };
      User.storeUser = function(user) {
        cc.log("serverid", user._serverId);
        cc.sys.localStorage.setItem(user.id, User.toJson(user));
        if (!user.debug) {
          util_logger_1.default.logChimpleEvent("userProfile", {
            userAge: user.age,
            gender: user.gender,
            userId: user.id
          });
          if (cc.sys.localStorage.getItem(constants_1.CURRENT_STUDENT_ID)) {
            var profileInfo = {
              profile: User.toJson(user),
              kind: "Profile",
              studentId: cc.sys.localStorage.getItem(constants_1.CURRENT_STUDENT_ID)
            };
            queue_1.Queue.getInstance().push(profileInfo);
          }
        }
        User.syncProfile();
      };
      User.syncProfile = function() {
        var user = User._currentUser;
        !cc.sys.isNative || !user || !user.schoolId || !user.sectionId || !user.studentId || !user.id || util_logger_1.default.syncProfile(user.schoolId, user.sectionId, user.studentId, User.toJson(user), user.id);
      };
      User.createUUID = function() {
        var dt = new Date().getTime();
        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
          var r = (dt + 16 * Math.random()) % 16 | 0;
          dt = Math.floor(dt / 16);
          return ("x" == c ? r : 3 & r | 8).toString(16);
        });
        return uuid;
      };
      User.createUser = function(name, imgPath, age, gender, id, avatarImage, isTeacher) {
        void 0 === id && (id = null);
        void 0 === avatarImage && (avatarImage = null);
        void 0 === isTeacher && (isTeacher = false);
        var uid = !id ? User.createUUID() : id;
        var debug = "debug15" == name && "teacherbird" == avatarImage && 8 == age && gender == Gender.GIRL;
        var user = new User(uid, name, age, gender, imgPath, avatarImage, isTeacher, {}, "camp", "chimp", debug ? new Map([ [ "assignment", new CourseProgressClass() ], [ "en", new CourseProgressClass("en00") ], [ "maths", new CourseProgressClass("maths00") ], [ "hi", new CourseProgressClass("hi00") ], [ "puzzle", new CourseProgressClass("puzzle00") ], [ "test-lit", new CourseProgressClass("chapter_0") ], [ "test-maths", new CourseProgressClass("chapter_0") ] ]) : new Map([ [ "assignment", new CourseProgressClass() ], [ "en", new CourseProgressClass() ], [ "maths", new CourseProgressClass() ], [ "hi", new CourseProgressClass() ], [ "puzzle", new CourseProgressClass("puzzle00") ] ]), new Map(), new Map(), {}, {}, debug, [ "", "", "", "", "", "", "", "", "1", "2", "r", "1", "2", "r", "1", "2", "r" ]);
        debug && user.openAllRewards();
        user.unlockBydefaultRewards();
        var schoolId = cc.sys.localStorage.getItem(constants_1.FIREBASE_SCHOOL_ID);
        user.schoolId = !schoolId ? null : schoolId;
        var sectionId = cc.sys.localStorage.getItem(constants_1.FIREBASE_SECTION_ID);
        user.sectionId = !sectionId ? null : sectionId;
        var studentId = cc.sys.localStorage.getItem(constants_1.FIREBASE_STUDENT_ID);
        user.studentId = !studentId ? null : studentId;
        User.storeUser(user);
        var userIds = User.getUserIds();
        null == userIds ? userIds = [ uid ] : userIds.push(uid);
        User.setUserIds(userIds);
        console.log("User created ", User.fromJson(cc.sys.localStorage.getItem(uid)));
        return user;
      };
      User.getUsers = function() {
        var response = [];
        var userIdList = User.getUserIds();
        null != userIdList && userIdList.forEach(function(id) {
          var user = User.fromJson(cc.sys.localStorage.getItem(id));
          !user.isTeacher && user.age > 0 && response.push(user);
        });
        return response;
      };
      User.getUserIds = function() {
        return JSON.parse(cc.sys.localStorage.getItem(exports.USER_ID));
      };
      User.setUserIds = function(userId) {
        cc.sys.localStorage.setItem(exports.USER_ID, JSON.stringify(userId));
        console.log("User Id aray created ", JSON.parse(cc.sys.localStorage.getItem(exports.USER_ID)));
      };
      User.fromJson = function(jsonStr) {
        var data = JSON.parse(jsonStr);
        if (!data) return null;
        var courseProgressMap = new Map();
        for (var key in data.courseProgressMap) {
          var cpData = data.courseProgressMap[key];
          var cp = new CourseProgressClass(cpData.currentChapterId);
          cp.currentLessonId = cpData.currentLessonId;
          cp.date = new Date(cpData.date);
          cp.assignments = cpData.assignments;
          cp.lessonPlan = cpData.lessonPlan;
          cp.lessonPlanIndex = cpData.lessonPlanIndex;
          cp.lessonPlanDate && (cpData.lessonPlanDate = new Date(cp.lessonPlanDate));
          courseProgressMap.set(key, cp);
        }
        var lessonProgressMap = new Map();
        for (var key in data.lessonProgressMap) {
          var lp = data.lessonProgressMap[key];
          lp.date = new Date(lp.date);
          lessonProgressMap.set(key, lp);
        }
        var chapterFinishedMap = new Map();
        for (var key in data.chapterFinishedMap) chapterFinishedMap.set(key, data.chapterFinishedMap[key]);
        var user = new User(data.id, data.name, data.age, data.gender, data.imgPath, data.avatarImage, data.isTeacher, data.inventory, data.currentBg, data.currentCharacter, courseProgressMap, lessonProgressMap, chapterFinishedMap, data.unlockedInventory, data.unlockedRewards, data.debug, data.lessonPlan, data.serverId, data.schoolId, data.sectionId, data.studentId, data.schoolName, data.sectionName, data.currentReward);
        user.isConnected = data.isConnected;
        data.assignments && (user._assignments = data.assignments);
        return user;
      };
      User.toJson = function(user) {
        var courseProgressObj = {};
        user.courseProgressMap.forEach(function(cp, name) {
          courseProgressObj[name] = cp;
        });
        var lessonProgressObj = {};
        user.lessonProgressMap.forEach(function(lp, id) {
          lessonProgressObj[id] = lp;
        });
        var chapterFinishedMapObj = {};
        user._chapterFinishedMap.forEach(function(lp, id) {
          chapterFinishedMapObj[id] = lp;
        });
        return JSON.stringify({
          id: user.id,
          name: user.name,
          age: user.age,
          gender: user.gender,
          imgPath: user.imgPath,
          avatarImage: user.avatarImage,
          isTeacher: user.isTeacher,
          inventory: user.inventory,
          currentBg: user.currentBg,
          currentCharacter: user.currentCharacter,
          courseProgressMap: courseProgressObj,
          lessonProgressMap: lessonProgressObj,
          unlockedInventory: user.unlockedInventory,
          unlockedRewards: user.unlockedRewards,
          debug: user.debug,
          serverId: user.serverId,
          assignments: user.assignments,
          chapterFinishedMap: chapterFinishedMapObj,
          isConnected: user.isConnected,
          schoolId: user.schoolId,
          sectionId: user.sectionId,
          studentId: user.studentId,
          schoolName: user.schoolName,
          sectionName: user.sectionName,
          currentReward: user.currentReward
        });
      };
      User.setCurrentUser = function(user) {
        this._currentUser = user;
        config_1.default.i.clear();
        header_1.default.homeSelected = true;
      };
      User.getCurrentUser = function() {
        return this._currentUser;
      };
      User.getUser = function(uid) {
        return User.fromJson(cc.sys.localStorage.getItem(uid));
      };
      User.deleteUser = function(id) {
        cc.sys.localStorage.removeItem(id);
        var userIds = User.getUserIds();
        var index = userIds.indexOf(id);
        userIds.splice(index, 1);
        cc.sys.localStorage.setItem(exports.USER_ID, JSON.stringify(userIds));
      };
      User.replaceUserID = function(oldId, newId) {
        cc.sys.localStorage.removeItem(oldId);
        var userIds = User.getUserIds();
        var index = userIds.indexOf(oldId);
        userIds.splice(index, 1);
        userIds.push(newId);
        cc.sys.localStorage.setItem(exports.USER_ID, JSON.stringify(userIds));
      };
      User.createUserOrFindExistingUser = function(userAttribute) {
        var existingUser = null;
        if (!!userAttribute && !!userAttribute.id) {
          existingUser = this.getUser(userAttribute.id);
          if (!!existingUser) return existingUser;
        }
        return User.createUser(userAttribute.name, userAttribute.imgPath, userAttribute.age, userAttribute.gender, userAttribute.id, userAttribute.avatarImage || userAttribute.imgPath, userAttribute.isTeacher);
      };
      return User;
    }();
    exports.User = User;
    var Profile = function() {
      function Profile() {}
      Profile.initialize = function() {
        var _this = this;
        if ("true" != Profile.getValue(IS_INITIALIZED)) {
          this.setItem(exports.SFX_OFF, 0);
          this.setItem(exports.MUSIC_OFF, 0);
          this.setItem(exports.IS_OTP_VERIFIED, 0);
          this.setValue(IS_INITIALIZED, "true");
          var countryCode_1 = util_logger_1.default.getCountryCode();
          countryCode_1 ? constants_1.COUNTRY_CODES.forEach(function(e) {
            e["code"].toLowerCase() === countryCode_1 && _this.setValue(exports.DIALING_CODE, e["dial_code"]);
          }) : this.setValue(exports.DIALING_CODE, "+91");
        }
      };
      Profile.getValue = function(item) {
        return cc.sys.localStorage.getItem(item);
      };
      Profile.setValue = function(item, value) {
        cc.sys.localStorage.setItem(item, value);
      };
      Profile.getItem = function(item) {
        return Number(Profile.getValue(item) || 0);
      };
      Profile.setItem = function(item, val) {
        Profile.setValue(item, val.toString());
      };
      Object.defineProperty(Profile, "lang", {
        get: function() {
          return Profile.getValue(exports.LANGUAGE);
        },
        enumerable: false,
        configurable: true
      });
      Profile.fromJsonUsingParse = function(parseStoredProfile) {
        var parsedStoredProfile = JSON.parse(parseStoredProfile || "{}");
        var currentStudentProfile = util_logger_1.default.currentProfile();
        cc.sys.localStorage.setItem(currentStudentProfile, JSON.stringify(parsedStoredProfile));
      };
      Profile.toJson = function() {
        true;
        var currentStudentProfile = util_logger_1.default.currentProfile();
        var profileFile = currentStudentProfile + ".json";
        cc.log("writing profile information to ", profileFile, JSON.stringify(this._profile));
        util_logger_1.default.logProfile(JSON.stringify(this._profile), profileFile);
      };
      Object.defineProperty(Profile, "lastWorld", {
        get: function() {
          return this.getItem(config_1.default.getInstance().course.id + WORLD);
        },
        set: function(newVal) {
          this.setItem(config_1.default.getInstance().course.id + WORLD, newVal);
          this.setItem(config_1.default.getInstance().course.id + LEVEL, 0);
          this.toJson();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Profile, "lastLevel", {
        get: function() {
          return this.getItem(config_1.default.getInstance().course.id + LEVEL);
        },
        set: function(newVal) {
          if (this.lastLevel < newVal) {
            this.setItem(config_1.default.getInstance().course.id + LEVEL, newVal);
            this.toJson();
          }
        },
        enumerable: false,
        configurable: true
      });
      Profile.isGameCompleted = function(world, level, game) {
        return 1 == this.getItem(config_1.default.getInstance().course.id + "_" + world + "_" + level + "_" + game);
      };
      Profile.setGameCompleted = function(world, level, game, completed) {
        void 0 === completed && (completed = true);
        this.setItem(config_1.default.getInstance().course.id + "_" + world + "_" + level + "_" + game, completed ? 1 : 0);
        this.toJson();
      };
      Profile.teacherPostLoginActivity = function(objectId) {
        return __awaiter(this, void 0, void 0, function() {
          var currentUser;
          return __generator(this, function(_a) {
            currentUser = User.createUserOrFindExistingUser({
              id: objectId
            });
            User.setCurrentUser(currentUser);
            return [ 2, currentUser ];
          });
        });
      };
      Profile._profile = {};
      return Profile;
    }();
    exports.default = Profile;
    cc._RF.pop();
  }, {
    "../../../queue": "queue",
    "../header": "header",
    "../util": "util",
    "../util-logger": "util-logger",
    "./config": "config",
    "./constants": "constants"
  } ],
  progressMonitor: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d0b6fkKhtlG0Zv03asj558b", "progressMonitor");
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
    exports.StarType = void 0;
    var config_1 = require("./lib/config");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var currentStarScale = 4;
    var StarType;
    (function(StarType) {
      StarType[StarType["Default"] = 0] = "Default";
      StarType[StarType["Correct"] = 1] = "Correct";
      StarType[StarType["Wrong"] = 2] = "Wrong";
      StarType[StarType["NextPage"] = 3] = "NextPage";
      StarType[StarType["PrevPage"] = 4] = "PrevPage";
    })(StarType = exports.StarType || (exports.StarType = {}));
    var FRUITS = [ "rewards/fruits/baag/red_bellpepper", "rewards/fruits/baag/yellow_bellpepper", "rewards/fruits/baag/carrot", "rewards/fruits/baag/popato", "rewards/fruits/baag/tomato", "rewards/fruits/baag/red_chillie", "rewards/fruits/baag/brocolli", "rewards/fruits/baag/cucumber", "rewards/fruits/baag/green_chillie", "rewards/fruits/baag/turnip", "rewards/fruits/sehar/omlette", "rewards/fruits/sehar/coffee", "rewards/fruits/sehar/yogurt", "rewards/fruits/sehar/boiled_egg", "rewards/fruits/sehar/butter", "rewards/fruits/sehar/cheese", "rewards/fruits/sehar/porridge", "rewards/fruits/sehar/salad", "rewards/fruits/sehar/bread_sliced", "rewards/fruits/sehar/tea", "rewards/fruits/badal/chickoo", "rewards/fruits/badal/pineapple", "rewards/fruits/badal/mango", "rewards/fruits/badal/cherry", "rewards/fruits/badal/orange", "rewards/fruits/badal/grapes", "rewards/fruits/badal/apple", "rewards/fruits/badal/pear", "rewards/fruits/badal/banana", "rewards/fruits/badal/strawberry", "rewards/fruits/samundra/prawns", "rewards/fruits/samundra/coconut", "rewards/fruits/samundra/watermelon", "rewards/fruits/samundra/tender_coconut", "rewards/fruits/samundra/lemon", "rewards/fruits/samundra/orange_juice", "rewards/fruits/samundra/kiwi", "rewards/fruits/samundra/juice", "rewards/fruits/samundra/lemon_wedge", "rewards/fruits/samundra/fish", "rewards/fruits/barf/salmon", "rewards/fruits/barf/bread", "rewards/fruits/barf/momos", "rewards/fruits/barf/meat", "rewards/fruits/barf/rice", "rewards/fruits/barf/sushi", "rewards/fruits/barf/chicken_meat", "rewards/fruits/barf/jam", "rewards/fruits/barf/dumpling", "rewards/fruits/barf/soup", "rewards/fruits/sagar/squid", "rewards/fruits/sagar/fish_eggs", "rewards/fruits/sagar/lobster", "rewards/fruits/sagar/cilantro", "rewards/fruits/sagar/tuna", "rewards/fruits/sagar/garlic", "rewards/fruits/sagar/crab", "rewards/fruits/sagar/mussel", "rewards/fruits/sagar/seaweed", "rewards/fruits/sagar/sardine", "rewards/fruits/jungle/corn", "rewards/fruits/jungle/wheat", "rewards/fruits/jungle/honeycomb", "rewards/fruits/jungle/chicken", "rewards/fruits/jungle/honey", "rewards/fruits/jungle/milk", "rewards/fruits/jungle/meat", "rewards/fruits/jungle/cabbage", "rewards/fruits/jungle/egg", "rewards/fruits/jungle/pumpkin", "rewards/fruits/udyaan/coffee_bean", "rewards/fruits/udyaan/chestnut", "rewards/fruits/udyaan/dango", "rewards/fruits/udyaan/peanut", "rewards/fruits/udyaan/sausage", "rewards/fruits/udyaan/acorn", "rewards/fruits/udyaan/sandwich", "rewards/fruits/udyaan/cashew", "rewards/fruits/udyaan/almond", "rewards/fruits/udyaan/roasted_sausage", "rewards/fruits/khet/honeydew", "rewards/fruits/khet/mushroom", "rewards/fruits/khet/raspberry", "rewards/fruits/khet/peach", "rewards/fruits/khet/black_currant", "rewards/fruits/khet/dragonfruit", "rewards/fruits/khet/blackberry", "rewards/fruits/khet/button_mushroom", "rewards/fruits/khet/redcurrant", "rewards/fruits/khet/enoki_mushroom", "rewards/fruits/registan/grapefruit", "rewards/fruits/registan/coco_bean", "rewards/fruits/registan/starfruit", "rewards/fruits/registan/litchi", "rewards/fruits/registan/date", "rewards/fruits/registan/mangosteen_sliced", "rewards/fruits/registan/mangosteen", "rewards/fruits/registan/starfruit_sliced", "rewards/fruits/registan/jackfruit", "rewards/fruits/registan/dry_coconut" ];
    var ProgressMonitor = function(_super) {
      __extends(ProgressMonitor, _super);
      function ProgressMonitor() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.complete = null;
        _this.current = null;
        _this.incomplete = null;
        _this.correct = null;
        _this.wrong = null;
        _this.glowPrefab = null;
        _this.totalStars = 0;
        _this.stopStar = false;
        _this.fruit = null;
        return _this;
      }
      ProgressMonitor.prototype.onLoad = function() {
        var _this = this;
        var config = config_1.default.getInstance();
        var fruitPath = FRUITS[Math.floor(Math.random() * FRUITS.length)];
        cc.resources.load(fruitPath, cc.SpriteFrame, function(err, spriteFrame) {
          err || (_this.fruit = spriteFrame);
        });
        this.totalStars = config.totalProblems;
        for (var index = 1; index <= this.totalStars; index++) {
          var node = new cc.Node();
          node.name = index.toString();
          var spriteNode = new cc.Node();
          spriteNode.name = "sprite";
          node.addChild(spriteNode);
          var sprite = spriteNode.addComponent(cc.Sprite);
          index < config.problem || (index == config.problem ? sprite.spriteFrame = this.current : sprite.spriteFrame = this.incomplete);
          node.width = 2 * spriteNode.width;
          node.height = 2 * spriteNode.height;
          this.node.addChild(node);
        }
      };
      ProgressMonitor.prototype.updateProgress = function(current, starType, callback) {
        var _this = this;
        if (starType == StarType.NextPage) {
          var nowNode = this.node.getChildByName(current.toString());
          var nowSpriteNode = nowNode.getChildByName("sprite");
          nowSpriteNode.getComponent(cc.Sprite).spriteFrame = this.complete;
          if (current < this.totalStars) {
            var nowNode_1 = this.node.getChildByName((current + 1).toString());
            var nowSpriteNode_1 = nowNode_1.getChildByName("sprite");
            nowSpriteNode_1.getComponent(cc.Sprite).spriteFrame = this.current;
          }
          callback();
        } else if (starType == StarType.PrevPage) {
          var nowNode = this.node.getChildByName(current.toString());
          var nowSpriteNode = nowNode.getChildByName("sprite");
          nowSpriteNode.getComponent(cc.Sprite).spriteFrame = this.incomplete;
          if (current > 1) {
            var nowNode_2 = this.node.getChildByName((current - 1).toString());
            var nowSpriteNode_2 = nowNode_2.getChildByName("sprite");
            nowSpriteNode_2.getComponent(cc.Sprite).spriteFrame = this.current;
          }
          callback();
        } else {
          var newNode = new cc.Node();
          var glow_1 = cc.instantiate(this.glowPrefab);
          var anim_1 = glow_1.getComponent(cc.Animation);
          newNode.addChild(glow_1);
          glow_1.active = false;
          var spriteNode = new cc.Node();
          spriteNode.name = "sprite";
          var sprite = spriteNode.addComponent(cc.Sprite);
          switch (starType) {
           case StarType.Default:
            sprite.spriteFrame = this.fruit;
            break;

           case StarType.Correct:
            sprite.spriteFrame = this.correct;
            break;

           case StarType.Wrong:
            sprite.spriteFrame = this.wrong;
          }
          newNode.name = current.toString();
          newNode.scale = 1 / currentStarScale;
          newNode.addChild(spriteNode);
          var currentNode = this.node.getChildByName(current.toString());
          if (null != currentNode) {
            var currentSpriteNode_1 = currentNode.getChildByName("sprite");
            if (null != currentSpriteNode_1) {
              var currentPos = cc.v2(cc.winSize.width * Math.random() - cc.winSize.width / 2, -cc.winSize.height - 100);
              newNode.setPosition(currentPos);
              var newPos = cc.v2(cc.winSize.width / 2 * Math.random() - cc.winSize.width / 4, -cc.winSize.height / 2);
              currentNode.addChild(newNode);
              newNode.runAction(cc.sequence(cc.spawn(cc.scaleTo(.5, 1), cc.bezierTo(.5, [ cc.v2(currentPos.add(newPos).mul(.33).add(cc.v2(200, 0))), cc.v2(currentPos.add(newPos).mul(.33).add(cc.v2(100, 0))), newPos ])), cc.callFunc(function() {
                glow_1.active = true;
                anim_1.on("finished", function() {
                  glow_1.active = false;
                });
                anim_1.play();
              }), cc.delayTime(.75), cc.spawn(cc.moveTo(.5, currentSpriteNode_1.position), cc.scaleTo(.5, 1 / currentStarScale)), cc.callFunc(function() {
                glow_1.active = false;
              }), cc.callFunc(function() {
                currentSpriteNode_1.removeFromParent();
                if (current < _this.totalStars) {
                  var nowNode = _this.node.getChildByName((current + 1).toString());
                  var nowSpriteNode = nowNode.getChildByName("sprite");
                  nowSpriteNode.getComponent(cc.Sprite).spriteFrame = _this.current;
                }
                callback();
              })));
            }
          }
        }
      };
      __decorate([ property(cc.SpriteFrame) ], ProgressMonitor.prototype, "complete", void 0);
      __decorate([ property(cc.SpriteFrame) ], ProgressMonitor.prototype, "current", void 0);
      __decorate([ property(cc.SpriteFrame) ], ProgressMonitor.prototype, "incomplete", void 0);
      __decorate([ property(cc.SpriteFrame) ], ProgressMonitor.prototype, "correct", void 0);
      __decorate([ property(cc.SpriteFrame) ], ProgressMonitor.prototype, "wrong", void 0);
      __decorate([ property(cc.Prefab) ], ProgressMonitor.prototype, "glowPrefab", void 0);
      ProgressMonitor = __decorate([ ccclass ], ProgressMonitor);
      return ProgressMonitor;
    }(cc.Component);
    exports.default = ProgressMonitor;
    cc._RF.pop();
  }, {
    "./lib/config": "config"
  } ],
  queue: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "38a63Fp8GJKc7q7xPGC81jl", "queue");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Queue = exports.QUEUE_CACHE = void 0;
    var constants_1 = require("./common/scripts/lib/constants");
    exports.QUEUE_CACHE = "QUEUE_CACHE";
    var Queue = function() {
      function Queue() {
        this._store = [];
      }
      Queue.init = function() {
        Queue.getInstance();
      };
      Queue.getInstance = function() {
        if (!Queue.instance) {
          Queue.instance = new Queue();
          constants_1.PARSE_ENABLED && (Queue.instance._store = Queue.instance.getFromCache());
        }
        return Queue.instance;
      };
      Queue.prototype.push = function(val) {
        if (constants_1.PARSE_ENABLED) {
          this._store.push(val);
          cc.sys.localStorage.setItem(exports.QUEUE_CACHE, JSON.stringify(this._store));
        }
      };
      Queue.prototype.pop = function() {
        var result = void 0;
        if (constants_1.PARSE_ENABLED) {
          result = this._store.shift();
          cc.sys.localStorage.setItem(exports.QUEUE_CACHE, JSON.stringify(this._store));
        }
        return result;
      };
      Queue.prototype.isEmpty = function() {
        return 0 === this._store.length;
      };
      Queue.prototype.getFromCache = function() {
        try {
          return JSON.parse(cc.sys.localStorage.getItem(exports.QUEUE_CACHE)) || [];
        } catch (e) {
          return [];
        }
      };
      return Queue;
    }();
    exports.Queue = Queue;
    cc._RF.pop();
  }, {
    "./common/scripts/lib/constants": "constants"
  } ],
  "quit-popup": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "77022gNMaNC/aL1sjC9ITf5", "quit-popup");
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
    var lessonController_1 = require("./lessonController");
    var config_1 = require("./lib/config");
    var util_1 = require("./util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var QuitPopup = function(_super) {
      __extends(QuitPopup, _super);
      function QuitPopup() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.inputEventBlocker = null;
        _this.exitLabel = null;
        _this.videoLabel = null;
        return _this;
      }
      QuitPopup.prototype.onLoad = function() {
        this.inputEventBlocker.zIndex = 2;
        this.node.zIndex = 3;
        this.exitLabel.string = util_1.Util.i18NText("Exit");
        this.videoLabel.string = util_1.Util.i18NText("Watch Help Video");
      };
      QuitPopup.prototype.onClickYesButton = function() {
        this.node.getChildByName("quit_bg").getChildByName("exit_game").getComponent(cc.Button).interactable = false;
        config_1.default.isMicroLink = false;
        config_1.default.i.popScene();
        lessonController_1.default.getFriend().stopAudio();
      };
      QuitPopup.prototype.onClickNoButton = function() {
        this.node.active = false;
        this.inputEventBlocker.active = false;
      };
      QuitPopup.prototype.onClickHelpButton = function() {
        this.node.getChildByName("quit_bg").getChildByName("help_video").getComponent(cc.Button).interactable = false;
        cc.sys.openURL("https://wa.me/917019270679");
        this.node.active = false;
        this.inputEventBlocker.active = false;
      };
      QuitPopup.prototype.onEnable = function() {
        this.inputEventBlocker.active = true;
        cc.director.pause();
        cc.audioEngine.pauseAllEffects();
      };
      QuitPopup.prototype.onDisable = function() {
        cc.director.resume();
        cc.audioEngine.resumeAllEffects();
      };
      __decorate([ property(cc.Node) ], QuitPopup.prototype, "inputEventBlocker", void 0);
      __decorate([ property(cc.Label) ], QuitPopup.prototype, "exitLabel", void 0);
      __decorate([ property(cc.Label) ], QuitPopup.prototype, "videoLabel", void 0);
      QuitPopup = __decorate([ ccclass ], QuitPopup);
      return QuitPopup;
    }(cc.Component);
    exports.default = QuitPopup;
    cc._RF.pop();
  }, {
    "./lessonController": "lessonController",
    "./lib/config": "config",
    "./util": "util"
  } ],
  "quiz-monitor": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "386c90A60tEro/bc7nZBHiS", "quiz-monitor");
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
    exports.QUIZ_ANSWERED = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var config_1 = require("./lib/config");
    var error_handler_1 = require("./lib/error-handler");
    exports.QUIZ_ANSWERED = "QUIZ_ANSWERED";
    var QuizMonitor = function(_super) {
      __extends(QuizMonitor, _super);
      function QuizMonitor() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.correctImage = null;
        _this.wrongImage = null;
        _this.emptyImage = null;
        _this.imageNode = null;
        _this.totalItems = 0;
        _this.stopStar = false;
        return _this;
      }
      QuizMonitor.prototype.onLoad = function() {
        this.totalItems = config_1.default.getInstance().totalProblems;
        for (var index = 1; index <= this.totalItems; index++) {
          var node = new cc.Node();
          this.createRewardStar(node, index);
          this.node.addChild(node);
        }
      };
      QuizMonitor.prototype.createRewardStar = function(node, index) {
        node.name = index.toString();
        var spriteNode = cc.instantiate(this.imageNode);
        spriteNode.name = "sprite";
        spriteNode.group = "gameCamera";
        node.addChild(spriteNode);
        var sprite = spriteNode.getComponent(cc.Sprite);
        sprite.spriteFrame = this.emptyImage;
        node.width = spriteNode.width;
        node.height = spriteNode.height;
      };
      QuizMonitor.prototype.updateProgress = function(current, callback) {
        var newNode = new cc.Node();
        var sprite = newNode.addComponent(cc.Sprite);
        sprite.spriteFrame = this.stopStar ? this.correctImage : this.wrongImage;
        newNode.name = current.toString();
        var currentNode = this.node.getChildByName(current.toString());
        if (null != currentNode) {
          var currentSpriteNode = currentNode.getChildByName("sprite");
          if (null != currentSpriteNode) {
            currentSpriteNode.removeFromParent();
            currentNode.addChild(newNode);
            callback();
          }
        }
      };
      __decorate([ property(cc.SpriteFrame) ], QuizMonitor.prototype, "correctImage", void 0);
      __decorate([ property(cc.SpriteFrame) ], QuizMonitor.prototype, "wrongImage", void 0);
      __decorate([ property(cc.SpriteFrame) ], QuizMonitor.prototype, "emptyImage", void 0);
      __decorate([ property(cc.Prefab) ], QuizMonitor.prototype, "imageNode", void 0);
      __decorate([ error_handler_1.default() ], QuizMonitor.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], QuizMonitor.prototype, "createRewardStar", null);
      __decorate([ error_handler_1.default() ], QuizMonitor.prototype, "updateProgress", null);
      QuizMonitor = __decorate([ ccclass ], QuizMonitor);
      return QuizMonitor;
    }(cc.Component);
    exports.default = QuizMonitor;
    cc._RF.pop();
  }, {
    "./lib/config": "config",
    "./lib/error-handler": "error-handler"
  } ],
  resetTracingButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cf59aJ82wBD+ai9PuIn/viA", "resetTracingButton");
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
    var helper_1 = require("./helper");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ResetTracingButton = function(_super) {
      __extends(ResetTracingButton, _super);
      function ResetTracingButton() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ResetTracingButton.prototype.onLoad = function() {
        var _this = this;
        this.node.zIndex = 100;
        this.node.on("touchend", function() {
          _this.node.dispatchEvent(new cc.Event.EventCustom(helper_1.RESET_TRACING, true));
        });
      };
      ResetTracingButton = __decorate([ ccclass ], ResetTracingButton);
      return ResetTracingButton;
    }(cc.Component);
    exports.default = ResetTracingButton;
    cc._RF.pop();
  }, {
    "./helper": "helper"
  } ],
  scorecard: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "22536lUwHNFRICAGIkXssjK", "scorecard");
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
    var util_1 = require("../../scripts/util");
    var achievement_1 = require("./achievement");
    var friend_1 = require("../../scripts/friend");
    var constants_1 = require("../../scripts/lib/constants");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Scorecard = function(_super) {
      __extends(Scorecard, _super);
      function Scorecard() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.star1 = null;
        _this.star2 = null;
        _this.star3 = null;
        _this.active = null;
        _this.friendPos = null;
        _this.rewardPos = null;
        _this.score = 0;
        _this.text = "Lesson";
        return _this;
      }
      Scorecard.prototype.onLoad = function() {
        var _this = this;
        if (!cc.sys.isNative && config_1.default.isMicroLink) {
          this.continueButton.active = false;
          if (config_1.default.i.microLinkData.end != constants_1.MICROLINK_END_BLANK) {
            this.downloadButton.active = true;
            this.downloadButton.parent.getChildByName("web_scorecard_bg").active = true;
            this.downloadButton.parent.getChildByName("playstore_label").active = true;
          }
        }
        this.label.string = util_1.Util.i18NText(this.text);
        this.score > 25 && (this.star1.spriteFrame = this.active);
        this.score > 50 && (this.star2.spriteFrame = this.active);
        this.score > 75 && (this.star3.spriteFrame = this.active);
        util_1.Util.loadFriend(function(friendNode) {
          var friend = friendNode.getComponent(friend_1.default);
          friend.interactable = false;
          _this.friendPos.addChild(friendNode);
          util_1.Util.loadAccessoriesAndEquipAcc(friendNode.children[1], friendNode);
          friend.playHappyAnimation(1);
        });
        var scorecardAnim = this.getComponent(cc.Animation);
        scorecardAnim.play("scorecard");
        var continueNode = this.node.getChildByName("commonButton");
        var continueAnime = continueNode.getComponent(cc.Animation);
        continueAnime.play("continue");
        if (this.reward) if (this.reward[0] == util_1.REWARD_TYPES[0]) ; else if (this.reward[0] == util_1.REWARD_TYPES[1]) cc.resources.load("backgrounds/textures/bg_icons/" + this.reward[1], cc.SpriteFrame, function(err, spriteFrame) {
          if (!err) {
            var sprite = _this.rewardPos.addComponent(cc.Sprite);
            sprite.spriteFrame = spriteFrame;
          }
        }); else if (this.reward[0] == util_1.REWARD_TYPES[2]) {
          var achievement = cc.instantiate(this.achievementPrefab);
          var achievementComp = achievement.getComponent(achievement_1.default);
          achievementComp.image = config_1.default.i.lesson.image;
          achievementComp.courseId = config_1.default.i.course.id;
          achievementComp.score = this.score;
          this.rewardPos.addChild(achievement);
        } else this.reward[0] == util_1.REWARD_TYPES[3];
      };
      Scorecard.prototype.onContinueClick = function() {
        this.continueButton.getComponent(cc.Button).interactable = false;
        if (cc.sys.isNative && config_1.default.isMicroLink) {
          config_1.default.isMicroLink = false;
          config_1.default.i.pushScene("menu/start/scenes/start", "menu", null, true);
        } else config_1.default.i.popScene();
      };
      Scorecard.prototype.onDownloadButtonClick = function() {
        cc.sys.openURL("https://play.google.com/store/apps/details?id=org.chimple.bahama&hl=en_IN");
      };
      __decorate([ property(cc.Label) ], Scorecard.prototype, "label", void 0);
      __decorate([ property(cc.Sprite) ], Scorecard.prototype, "star1", void 0);
      __decorate([ property(cc.Sprite) ], Scorecard.prototype, "star2", void 0);
      __decorate([ property(cc.Sprite) ], Scorecard.prototype, "star3", void 0);
      __decorate([ property(cc.SpriteFrame) ], Scorecard.prototype, "active", void 0);
      __decorate([ property(cc.Node) ], Scorecard.prototype, "friendPos", void 0);
      __decorate([ property(cc.Node) ], Scorecard.prototype, "rewardPos", void 0);
      __decorate([ property ], Scorecard.prototype, "score", void 0);
      __decorate([ property ], Scorecard.prototype, "text", void 0);
      __decorate([ property(cc.Prefab) ], Scorecard.prototype, "achievementPrefab", void 0);
      __decorate([ property(cc.Node) ], Scorecard.prototype, "continueButton", void 0);
      __decorate([ property(cc.Node) ], Scorecard.prototype, "downloadButton", void 0);
      Scorecard = __decorate([ ccclass ], Scorecard);
      return Scorecard;
    }(cc.Component);
    exports.default = Scorecard;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": "config",
    "../../scripts/friend": "friend",
    "../../scripts/lib/constants": "constants",
    "../../scripts/util": "util",
    "./achievement": "achievement"
  } ],
  singlelettertracing: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "98bf6xTIJpBmaG5DyHWWMOH", "singlelettertracing");
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
    exports.SingleLetterTracing = exports.TRACE_NODE_POS_Y = exports.TRACE_NODE_POS_X = exports.LETTER_SCALE = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var helper_1 = require("../../../common/scripts/helper");
    var util_1 = require("../../../common/scripts/util");
    var tracing_container_1 = require("../../../common/Tracing/scripts/tracing-container");
    var writeword_1 = require("./writeword");
    var trace_graphics_1 = require("./trace-graphics");
    exports.LETTER_SCALE = .95;
    exports.TRACE_NODE_POS_X = -256;
    exports.TRACE_NODE_POS_Y = -300;
    var SingleLetterTracing = function(_super) {
      __extends(SingleLetterTracing, _super);
      function SingleLetterTracing() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._tracingContainerComponent = null;
        _this._traceGraphics = null;
        _this._letter = null;
        _this._wordTracingContainer = null;
        _this._wordTracingComponent = null;
        _this._tracingScale = null;
        _this._sound = null;
        return _this;
      }
      SingleLetterTracing.prototype.onLoad = function() {
        var _this = this;
        var manager = cc.director.getCollisionManager();
        manager.enabled = false;
        this._wordTracingComponent = this._wordTracingContainer.getComponent(writeword_1.default);
        this._tracingContainer = cc.instantiate(this.tracingContainerPrefab);
        this._tracingContainer.scale = .75;
        this._wordTracingContainer.on(helper_1.CONFIG_LOADED, function() {
          _this.setAlphabetToDisplay(_this._letter);
          _this.loadSounds(_this._letter);
        });
      };
      SingleLetterTracing.prototype.reset = function() {
        var traceGraphics = this._traceGraphics.getComponent(trace_graphics_1.default);
        traceGraphics.resetGraphics();
      };
      SingleLetterTracing.prototype.loadSounds = function(text) {
        var _this = this;
        try {
          var isString = isNaN(Number(text));
          isString ? util_1.Util.loadsPhonicsOrLetter(text.toLowerCase(), function(clip) {
            _this._sound = clip;
          }) : util_1.Util.loadNumericSound(text, function(clip) {
            _this._sound = clip;
          });
        } catch (e) {
          console.log(e);
        }
      };
      SingleLetterTracing.prototype.preloadSound = function(content, loadFrom) {
        var _this = this;
        var soundFile = loadFrom + content;
        util_1.Util.load(soundFile, function(err, clip) {
          err || null === clip || (_this._sound = clip);
        });
      };
      SingleLetterTracing.prototype.pronounce = function() {
        util_1.Util.speakPhonicsOrLetter(this._letter, function() {});
      };
      SingleLetterTracing.prototype.setAlphabetToDisplay = function(letter) {
        var _this = this;
        this._tracingContainerComponent = this._tracingContainer.getComponent(tracing_container_1.default);
        this._tracingContainerComponent.tracingLetter = letter;
        this._tracingContainerComponent.traceGenerationMode = false;
        this.node.addChild(this._tracingContainer);
        null !== this._tracingScale ? this._tracingContainerComponent._traceGraphicsComponent.adjustedScale = this._tracingScale : this._tracingContainerComponent._traceGraphicsComponent.adjustedScale = exports.LETTER_SCALE;
        this._traceGraphics = this._tracingContainerComponent.traceGraphics;
        this._tracingContainer.setPosition(new cc.Vec2(exports.TRACE_NODE_POS_X, exports.TRACE_NODE_POS_Y));
        this.node.on("letterEnabledEvent", function(index, timeToEnable) {
          void 0 === timeToEnable && (timeToEnable = 0);
          _this._order === index && _this.scheduleOnce(function() {
            _this._traceGraphics.emit("enabledGraphics");
          }, timeToEnable);
        });
        this.node.width = this._tracingContainer.width;
      };
      SingleLetterTracing.prototype.onDestroy = function() {
        cc.audioEngine.stopAllEffects();
      };
      Object.defineProperty(SingleLetterTracing.prototype, "letter", {
        set: function(l) {
          this._letter = l;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SingleLetterTracing.prototype, "wordTracingContainer", {
        set: function(c) {
          this._wordTracingContainer = c;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SingleLetterTracing.prototype, "order", {
        get: function() {
          return this._order;
        },
        set: function(o) {
          this._order = o;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SingleLetterTracing.prototype, "tracingScale", {
        get: function() {
          return this._tracingScale;
        },
        set: function(n) {
          this._tracingScale = n;
        },
        enumerable: false,
        configurable: true
      });
      __decorate([ property(cc.Prefab) ], SingleLetterTracing.prototype, "tracingContainerPrefab", void 0);
      SingleLetterTracing = __decorate([ ccclass ], SingleLetterTracing);
      return SingleLetterTracing;
    }(cc.Component);
    exports.SingleLetterTracing = SingleLetterTracing;
    cc._RF.pop();
  }, {
    "../../../common/Tracing/scripts/tracing-container": "tracing-container",
    "../../../common/scripts/helper": "helper",
    "../../../common/scripts/util": "util",
    "./trace-graphics": "trace-graphics",
    "./writeword": "writeword"
  } ],
  studentPreviewInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3c867lrcppBV4uGUBlvqMst", "studentPreviewInfo");
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
    exports.TEACHER_ADD_STUDENT_SELECTED = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    exports.TEACHER_ADD_STUDENT_SELECTED = "TEACHER_ADD_STUDENT_SELECTED";
    var StudentPreviewInfo = function(_super) {
      __extends(StudentPreviewInfo, _super);
      function StudentPreviewInfo() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.picNode = null;
        _this.usernameNode = null;
        _this._user = null;
        _this._parent = null;
        return _this;
      }
      StudentPreviewInfo.prototype.onLoad = function() {};
      StudentPreviewInfo.prototype.renderStudent = function() {
        var _this = this;
        var picNode = this.picNode;
        this._user.imgPath ? cc.loader.load(this._user.imgPath, function(err, texture) {
          if (!err) {
            var temp = new cc.SpriteFrame(texture);
            picNode.getComponent(cc.Sprite).spriteFrame = temp;
          }
        }) : !this._user.avatarImage || cc.resources.load("avatars/" + this._user.avatarImage, function(err, sp) {
          _this.picNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
        });
        this.usernameNode.getComponent(cc.Label).string = this._user.name || "";
      };
      StudentPreviewInfo.prototype.setUser = function(_user) {
        this._user = _user;
      };
      StudentPreviewInfo.prototype.onStudentClicked = function(event) {
        this._parent.children.forEach(function(c) {
          var pic = c.getChildByName("pic");
          if (pic) {
            var select = pic.getChildByName("select");
            select.active = false;
          }
        });
        this.generateEvent();
      };
      StudentPreviewInfo.prototype.generateEvent = function() {
        var selectNode = this.picNode.getChildByName("select");
        selectNode.active = true;
        var customEvent = new cc.Event.EventCustom(exports.TEACHER_ADD_STUDENT_SELECTED, true);
        customEvent.setUserData({
          selectedStudent: this._user.id,
          studentName: this._user.name || ""
        });
        this.node.dispatchEvent(customEvent);
      };
      StudentPreviewInfo.prototype.setParent = function(_parent) {
        this._parent = _parent;
      };
      __decorate([ property(cc.Node) ], StudentPreviewInfo.prototype, "picNode", void 0);
      __decorate([ property(cc.Node) ], StudentPreviewInfo.prototype, "usernameNode", void 0);
      StudentPreviewInfo = __decorate([ ccclass ], StudentPreviewInfo);
      return StudentPreviewInfo;
    }(cc.Component);
    exports.default = StudentPreviewInfo;
    cc._RF.pop();
  }, {} ],
  teacherAddedDialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0a77eH9W6JEBYthorx72VFK", "teacherAddedDialog");
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
    exports.TEACHER_ADD_DIALOG_CLOSED = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var profile_1 = require("./lib/profile");
    var studentPreviewInfo_1 = require("./studentPreviewInfo");
    var chimple_label_1 = require("./chimple-label");
    var chimple_1 = require("../../chimple");
    var util_logger_1 = require("./util-logger");
    var ServiceConfig_1 = require("./services/ServiceConfig");
    var util_1 = require("./util");
    exports.TEACHER_ADD_DIALOG_CLOSED = "TEACHER_ADD_DIALOG_CLOSED";
    var TeacherAddedDialog = function(_super) {
      __extends(TeacherAddedDialog, _super);
      function TeacherAddedDialog() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.studentPreviewInfoPrefab = null;
        _this.text = null;
        _this.yesButton = null;
        _this.studentLayout = null;
        return _this;
      }
      TeacherAddedDialog.prototype.onLoad = function() {
        var _this = this;
        this.node.on(studentPreviewInfo_1.TEACHER_ADD_STUDENT_SELECTED, function(event) {
          return __awaiter(_this, void 0, void 0, function() {
            var item;
            return __generator(this, function(_a) {
              event.stopPropagation();
              item = event.getUserData();
              this.selectedStudentId = item.selectedStudent;
              this.selectedStudentName = item.studentName;
              this.yesButton.color = new cc.Color().fromHEX("#C0E52F");
              this.yesButton.active = true;
              return [ 2 ];
            });
          });
        });
        this.users = profile_1.User.getUsers();
        this.render();
      };
      TeacherAddedDialog.prototype.validate = function() {
        var _this = this;
        var validUsers = [];
        this.users = profile_1.User.getUsers();
        var teachersAdded = JSON.parse(cc.sys.localStorage.getItem(chimple_1.TEACHER_ADDED) || "[]");
        console.log("teachersAdded", JSON.stringify(teachersAdded));
        this.users.forEach(function(u) {
          var t = teachersAdded.find(function(t) {
            return t.teacherId === _this._teacherId && t.sectionId === _this._teacherSectionId && t.studentId === u.id;
          });
          console.log("on filter found", t);
          if (!t) {
            console.log("Pushing to Validators", JSON.stringify(u));
            validUsers.push(u);
          }
        });
        return validUsers;
      };
      TeacherAddedDialog.prototype.render = function() {
        var _this = this;
        var chimpleLabel = this.text.getComponent(chimple_label_1.default);
        chimpleLabel.string = util_1.Util.i18NText("Add Teacher") + " " + this._teacherName;
        var validUsers = this.validate();
        console.log("Validators", JSON.stringify(validUsers));
        validUsers.forEach(function(user) {
          var studentPreviewInfoNode = cc.instantiate(_this.studentPreviewInfoPrefab);
          studentPreviewInfoNode.scale = 2;
          var script = studentPreviewInfoNode.getComponent(studentPreviewInfo_1.default);
          script.setUser(user);
          script.setParent(_this.studentLayout);
          script.renderStudent();
          _this.studentLayout.addChild(studentPreviewInfoNode);
          1 === validUsers.length && script.generateEvent();
        });
        if (validUsers.length > 1) {
          this.yesButton.color = new cc.Color().fromHEX("#6A6D5D");
          this.yesButton.active = true;
        }
      };
      TeacherAddedDialog.prototype.onYesClicked = function(event) {
        return __awaiter(this, void 0, void 0, function() {
          var request, teachersAdded, tKey, teacherRequestsAccepted, key, teachersForStudent;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!(!!this._teacherId && !!this.selectedStudentId)) return [ 3, 2 ];
              request = {
                teacherId: this._teacherId,
                sectionId: this._teacherSectionId,
                studentId: this.selectedStudentId,
                studentName: this.selectedStudentName,
                firebaseStudentId: this._firebaseStudentId
              };
              return [ 4, ServiceConfig_1.ServiceConfig.getI().handle.teacherRequestAccepted(request) ];

             case 1:
              _a.sent();
              util_logger_1.default.subscribeToTopic("assignment-" + this._teacherId + "-" + this._teacherSectionId);
              teachersAdded = JSON.parse(cc.sys.localStorage.getItem(chimple_1.TEACHER_ADDED) || "[]");
              teachersAdded.push(request);
              cc.sys.localStorage.setItem(chimple_1.TEACHER_ADDED, JSON.stringify(teachersAdded));
              teachersAdded && teachersAdded.length > 0 && teachersAdded.forEach(function(t) {
                return util_logger_1.default.logChimpleEvent(chimple_1.TEACHER_ADDED, t);
              });
              util_logger_1.default.logChimpleEvent(chimple_1.ACCEPT_TEACHER_REQUEST, request);
              tKey = chimple_1.ACCEPT_TEACHER_REQUEST_LINKED_USED + this._teacherId;
              teacherRequestsAccepted = JSON.parse(cc.sys.localStorage.getItem(tKey) || "[]");
              teacherRequestsAccepted.push(this._teacherId + "|" + this._teacherSectionId + "|" + this._firebaseStudentId);
              cc.sys.localStorage.setItem(tKey, JSON.stringify(teacherRequestsAccepted));
              key = "teacher_for_student_" + this.selectedStudentId;
              teachersForStudent = JSON.parse(cc.sys.localStorage.getItem(key) || "[]");
              teachersForStudent.push(this._teacherName);
              cc.sys.localStorage.setItem(key, JSON.stringify(teachersForStudent));
              _a.label = 2;

             case 2:
              this.closeDialog();
              return [ 2 ];
            }
          });
        });
      };
      TeacherAddedDialog.prototype.closeDialog = function() {
        var _this = this;
        var customEvent = new cc.Event.EventCustom(exports.TEACHER_ADD_DIALOG_CLOSED, true);
        this.node.dispatchEvent(customEvent);
        this.scheduleOnce(function() {
          _this.node.removeFromParent(true);
        }, .25);
      };
      TeacherAddedDialog.prototype.onNoClicked = function(event) {
        var updateHomeTeacherInfo = {
          homeId: this.selectedStudentId,
          teacherId: this._teacherId,
          firebaseStudentId: this._firebaseStudentId,
          kind: "UpdateHomeTeacher",
          studentName: this.selectedStudentName
        };
        util_logger_1.default.logChimpleEvent(chimple_1.REJECT_TEACHER_REQUEST, updateHomeTeacherInfo);
        this.closeDialog();
      };
      Object.defineProperty(TeacherAddedDialog.prototype, "TeacherId", {
        set: function(_teacherId) {
          this._teacherId = _teacherId;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TeacherAddedDialog.prototype, "TeacherName", {
        set: function(_name) {
          this._teacherName = _name;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TeacherAddedDialog.prototype, "SelectedSectionId", {
        set: function(_id) {
          this._teacherSectionId = _id;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TeacherAddedDialog.prototype, "SelectedAddStudentId", {
        set: function(_id) {
          this._firebaseStudentId = _id;
        },
        enumerable: false,
        configurable: true
      });
      __decorate([ property(cc.Prefab) ], TeacherAddedDialog.prototype, "studentPreviewInfoPrefab", void 0);
      __decorate([ property(cc.Node) ], TeacherAddedDialog.prototype, "text", void 0);
      __decorate([ property(cc.Node) ], TeacherAddedDialog.prototype, "yesButton", void 0);
      __decorate([ property(cc.Node) ], TeacherAddedDialog.prototype, "studentLayout", void 0);
      TeacherAddedDialog = __decorate([ ccclass ], TeacherAddedDialog);
      return TeacherAddedDialog;
    }(cc.Component);
    exports.default = TeacherAddedDialog;
    cc._RF.pop();
  }, {
    "../../chimple": "chimple",
    "./chimple-label": "chimple-label",
    "./lib/profile": "profile",
    "./services/ServiceConfig": "ServiceConfig",
    "./studentPreviewInfo": "studentPreviewInfo",
    "./util": "util",
    "./util-logger": "util-logger"
  } ],
  "trace-gen-container": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2cd9d3gQ7VNbYksOZvcod9Z", "trace-gen-container");
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
    var ccclass = cc._decorator.ccclass;
    var tracing_container_1 = require("./tracing-container");
    var TraceGenContainer = function(_super) {
      __extends(TraceGenContainer, _super);
      function TraceGenContainer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._fileName = null;
        _this._tracingContainerVisible = false;
        return _this;
      }
      TraceGenContainer.prototype.onLoad = function() {
        this._recordContainer = this.node.getChildByName("recordContainer");
        this._recordContainer.getComponent(tracing_container_1.default).traceGenerationMode = true;
        this._tracingContainer = this.node.getChildByName("tracingConainer");
        this._tracingContainer.getComponent(tracing_container_1.default).traceGenerationMode = false;
        this._tracingContainer.active = false;
      };
      TraceGenContainer.prototype.start = function() {
        var recordTracingContainerComponent = this._recordContainer.getComponent(tracing_container_1.default);
        recordTracingContainerComponent.traceGenerationMode = true;
        this._fileName = recordTracingContainerComponent.traceObject.name;
        if (null !== cc.sys.localStorage.getItem(this._fileName)) {
          this._tracingContainer.active = true;
          this._tracingContainerVisible = true;
          this._recordContainer.getComponent(tracing_container_1.default).showGeneratedPath();
        }
      };
      TraceGenContainer.prototype.update = function(dt) {};
      TraceGenContainer = __decorate([ ccclass ], TraceGenContainer);
      return TraceGenContainer;
    }(cc.Component);
    exports.default = TraceGenContainer;
    cc._RF.pop();
  }, {
    "./tracing-container": "tracing-container"
  } ],
  "trace-graphics": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7afd1G+VFxPtJxi3y2EUala", "trace-graphics");
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
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var Color = cc.Color;
    var tracing_container_1 = require("./tracing-container");
    var tracing_node_1 = require("./tracing-node");
    var indicator_node_1 = require("./indicator-node");
    var arrow_node_1 = require("./arrow-node");
    var config_1 = require("../../scripts/lib/config");
    var error_handler_1 = require("../../scripts/lib/error-handler");
    var util_1 = require("../../scripts/util");
    var helper_1 = require("../../scripts/helper");
    var Vec2 = cc.Vec2;
    var BOUNDARY_CHECK_LIMIT = 20;
    var TraceGraphics = function(_super) {
      __extends(TraceGraphics, _super);
      function TraceGraphics() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lineWidth = 0;
        _this.traceAudio = null;
        _this.star = null;
        _this.staringImage = null;
        _this.arrowImage = null;
        _this.endingImage = null;
        _this.indicator = null;
        _this.tracingNode = null;
        _this.arrowNode = null;
        _this.imageNode = null;
        _this.tracingImageNode = null;
        _this.indicatorNode = null;
        _this.tracingContainerComponent = null;
        _this._traceAudioId = null;
        _this._traceSoundOn = false;
        _this._graphics = null;
        _this._prevPoint = null;
        _this._currPoint = null;
        _this._recordPoint = null;
        _this._firstTouchInCurrentPath = false;
        _this._isTouchNotReleased = false;
        _this._traceGenerationMode = false;
        _this._shouldUpdateStartIndicator = true;
        _this._starNodesInPath = [];
        _this._matchingRects = [];
        _this._animationPoints = [];
        _this._hand = null;
        _this._showHelp = false;
        _this._currentMatchingRect = null;
        _this._currentPathIndex = 0;
        _this._path = 0;
        _this._allTracePoints = [];
        _this._validationOfCurrentPathCompleted = false;
        _this._touchEnabled = false;
        _this._tracingContainer = null;
        _this._adjustedScale = 1;
        _this._isValid = false;
        _this._isTouchStartValid = false;
        _this._finishCounter = 0;
        _this._lastValidPointIndexInCurrentPath = 0;
        _this._lastStarNodeInCurrentPath = null;
        _this._startIndicator = null;
        _this._endIndicator = null;
        _this._mTrigger = false;
        _this._totalValidationCheckPoints = 0;
        _this._tracingFinished = false;
        _this._indicatorNodeComponent = null;
        _this._lastCounterValue = 0;
        _this._activeStarsTillIndex = -1;
        _this.currentArrowValue = 0;
        _this.nextArrowValue = 0;
        _this.arrowPos = null;
        _this.arrowStarCounter = 0;
        _this._displayNodes = [];
        _this._displayScheduler = null;
        _this._isResetGraphicsAllowed = false;
        _this.displayIterator = function(array, from, to, step) {
          var _a;
          void 0 === to && (to = Infinity);
          void 0 === step && (step = 1);
          return _a = {}, _a[Symbol.iterator] = function() {
            var done = false;
            var value = 0;
            return {
              next: function() {
                value = from;
                done = from >= to;
                from = done ? value : from + step;
                return {
                  done: done,
                  value: array[value]
                };
              }
            };
          }, _a;
        };
        return _this;
      }
      TraceGraphics.prototype.onLoad = function() {
        var _this = this;
        cc.log("onLoad trace graphics");
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.node.opacity = 0;
        this.node.width = cc.winSize.width + cc.winSize.width / 4;
        this.node.height = cc.winSize.height;
        this.node.setPosition(new Vec2(this.node.x - cc.winSize.width / 4, this.node.y));
        this._graphics = this.getComponent(cc.Graphics);
        this._graphics.node.opacity = 1;
        this._graphics.lineJoin = cc.Graphics.LineJoin.ROUND;
        this._graphics.lineCap = cc.Graphics.LineCap.ROUND;
        this._graphics.strokeColor = this.strokeColor;
        this._graphics.lineWidth = this.lineWidth;
        this._tracingContainer = this.node.parent.getComponent(tracing_container_1.default);
        null == this._hand && void 0 == this._hand || (this._hand.active = false);
        this.node.on("enabledGraphics", function() {
          var isString = true;
          try {
            isString = isNaN(parseInt(_this._traceObject.name));
          } catch (e) {}
          _this.loadTracePath(_this._traceObject.name, !isString);
        });
        cc.log("onLoad trace graphics completed");
      };
      TraceGraphics.prototype.start = function() {
        cc.log("start called -> trace graphics");
        this.strokeColor = cc.Color.WHITE;
      };
      TraceGraphics.prototype.loadTracePath = function(letter, isNumber) {
        var _this = this;
        void 0 === isNumber && (isNumber = false);
        config_1.default.getInstance().loadPathJSON(letter, function(data) {
          !!data && data.length > 0 && (_this._allTracePoints = JSON.parse(data) || []);
          _this.postLoadPath();
        }, isNumber);
      };
      TraceGraphics.prototype.postLoadPath = function() {
        this.findHand();
        this.postLoad();
        this.enableTouchHandlers();
        this.node.opacity = 255;
      };
      TraceGraphics.prototype.findHand = function() {
        if (!this.traceGenerationMode) {
          this._showHelp = true;
          this._hand = this.node.parent.getChildByName("hand");
          this.scheduleHelpAnimation();
        }
      };
      TraceGraphics.prototype.enableTouchHandlers = function() {
        this.node.on(util_1.TouchEvents.TOUCH_START, this.onTouchStart, this);
        this.node.on(util_1.TouchEvents.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(util_1.TouchEvents.TOUCH_END, this.onTouchEnd, this);
        this.node.on(util_1.TouchEvents.TOUCH_CANCEL, this.onTouchEnd, this);
        this._touchEnabled = true;
      };
      TraceGraphics.prototype.disableTouchHandlers = function() {
        this.node.off(util_1.TouchEvents.TOUCH_START, this.onTouchStart, this);
        this.node.off(util_1.TouchEvents.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(util_1.TouchEvents.TOUCH_END, this.onTouchEnd, this);
        this._touchEnabled = false;
      };
      TraceGraphics.prototype.postLoad = function() {
        this.renderStar(this._path);
        this.configureCurrentValidationPath(this._path);
      };
      TraceGraphics.prototype.showIndicators = function() {
        this._touchEnabled = true;
        this.drawStartPointInCurrentPath();
        this.drawEndPointInCurrentPath();
        this._mTrigger = false;
      };
      TraceGraphics.prototype.isTouchValid = function(point) {
        if (this.traceGenerationMode) return true;
        !!this._indicatorNodeComponent && this._lastCounterValue <= 0 && (this._lastCounterValue = this._indicatorNodeComponent.counterValue);
        var isStartValid = !!this._indicatorNodeComponent && this._indicatorNodeComponent.collisionCount > 0;
        if (isStartValid && this._startIndicator.getBoundingBox().contains(point)) {
          this._touchEnabled = true;
          this._isValid = true;
          this._lastCounterValue = !!this._indicatorNodeComponent && this._indicatorNodeComponent.counterValue > this._lastCounterValue ? this._indicatorNodeComponent.counterValue : this._lastCounterValue;
        } else this._isValid = false;
        return this._isValid;
      };
      TraceGraphics.prototype.setUpGraphics = function() {
        this._graphics.lineJoin = cc.Graphics.LineJoin.ROUND;
        this._graphics.lineCap = cc.Graphics.LineCap.ROUND;
        this._graphics.strokeColor = this.strokeColor;
        this._graphics.lineWidth = this.lineWidth;
      };
      TraceGraphics.prototype.onTouchStart = function(touch) {
        cc.log("onTouchStart");
        if (this._touchEnabled) {
          !this._hand || (this._hand.opacity = 0);
          this._currPoint = this._prevPoint = this._recordPoint = this._traceObject.parent.convertToNodeSpaceAR(touch.getLocation());
          if (this.traceGenerationMode) {
            this.setUpGraphics();
            this._graphics.moveTo(this._prevPoint.x, this._prevPoint.y);
            this._graphics.strokeColor = Color.GRAY;
            this._tracingContainer.resetCurrentTracingPart();
            this.recordPoint(false);
          } else this._isTouchStartValid = this.isTouchValid(this._currPoint);
          this._isTouchNotReleased = true;
          if (this._isValid) {
            cc.log("onTouchStart valid");
            this._startIndicator.opacity = 255;
            this._endIndicator.opacity = 255;
          } else this.stopTracingSound();
        }
      };
      TraceGraphics.prototype.highLightStarNodes = function(point, arrowStarCounter) {
        var _this = this;
        if (this._mTrigger) return;
        var matchingNodes = [];
        this._starNodesInPath.map(function(n, i) {
          if (false === n.active && n.getBoundingBox().contains(point) && i <= arrowStarCounter) {
            _this._activeStarsTillIndex = i;
            return {
              oIndex: i,
              node: n
            };
          }
        });
        matchingNodes = matchingNodes.filter(function(element) {
          return void 0 !== element;
        });
        matchingNodes = matchingNodes.slice(0, matchingNodes.length);
        if (!!matchingNodes && matchingNodes.length > 0) {
          var tP = matchingNodes[matchingNodes.length - 1];
          var currentPointInIndex = tP.oIndex;
          this._lastValidPointIndexInCurrentPath <= currentPointInIndex && (this._shouldUpdateStartIndicator = true);
          this._lastValidPointIndexInCurrentPath = this._starNodesInPath.indexOf(tP.node);
          this._lastStarNodeInCurrentPath = tP.node;
          matchingNodes.forEach(function(m) {
            m.node.opacity = 255;
            m.node.active = true;
            null !== _this._starNodesInPath[m.oIndex] && (_this._starNodesInPath[m.oIndex].active = true);
          });
        }
      };
      TraceGraphics.prototype.onTouchMove = function(touch) {
        var _this = this;
        this._isValid = this._isTouchStartValid && !!this._indicatorNodeComponent && this._indicatorNodeComponent.collisionCount > 0;
        if (this._touchEnabled && (this._isValid || this.traceGenerationMode)) {
          this._lastCounterValue = this._indicatorNodeComponent.counterValue > this._lastCounterValue ? this._indicatorNodeComponent.counterValue : this._lastCounterValue;
          !this._hand || (this._hand.opacity = 0);
          var touchLocation = this._traceObject.parent.convertToNodeSpaceAR(touch.getLocation());
          var delta = new cc.Vec2(1 / this.adjustedScale * touch.getDelta().x, 1 / this.adjustedScale * touch.getDelta().y);
          touchLocation = touchLocation.add(delta);
          this._currPoint = touchLocation;
          if (this.traceGenerationMode) {
            this._graphics.lineTo(this._currPoint.x, this._currPoint.y);
            this._graphics.stroke();
            this._prevPoint = this._currPoint;
            this._graphics.moveTo(this._prevPoint.x, this._prevPoint.y);
            this.doAdditionalCheckToRecordPointsOnMove();
          } else if (null !== this.arrowPos) {
            cc.log("onTouchMove valid", this._isValid);
            this.highLightStarNodes(this.arrowPos, this.arrowStarCounter);
            this._starNodesInPath.forEach(function(n, i) {
              if (i < _this._activeStarsTillIndex && false === n.active) {
                n.active = true;
                _this._lastStarNodeInCurrentPath = _this._starNodesInPath[i];
              }
            });
            if (this._isValid) {
              this._startIndicator.setPosition(this._currPoint);
              if (!this._isResetGraphicsAllowed) {
                this._isResetGraphicsAllowed = true;
                this.node.dispatchEvent(new cc.Event.EventCustom(helper_1.RESET_TRACING_ALLOWED, true));
              }
            }
          }
          this._isTouchNotReleased = true;
        } else this.stopTracingSound();
      };
      TraceGraphics.prototype.loadImage = function(pos) {
        var image = cc.instantiate(this.imageNode);
        image.scale = 1.5;
        image.getComponent(cc.Sprite).spriteFrame = this.star;
        image.setPosition(pos);
        this._tracingContainer.node.addChild(image);
        image.zIndex = 99;
      };
      TraceGraphics.prototype.loadIndicator = function(cpIndex, pos, counter) {
        var image = cc.instantiate(this.tracingNode);
        image.name = "tracingNode";
        image.getComponent(cc.Sprite).spriteFrame = this.indicator;
        image.setPosition(pos);
        image.scale = .75;
        var tracingNode = image.getComponent(tracing_node_1.default);
        tracingNode.counter = counter;
        tracingNode.currentPath = "c" + cpIndex;
        this._tracingContainer.node.addChild(image);
        image.zIndex = 99;
        image.opacity = 0;
      };
      TraceGraphics.prototype.loadArrow = function(cpIndex, pos, counter, starCounter) {
        var image = cc.instantiate(this.arrowNode);
        image.name = "arrowNode";
        image.getComponent(cc.Sprite).spriteFrame = this.arrowImage;
        image.setPosition(pos);
        image.scale = .5;
        var arrowC = image.getComponent(arrow_node_1.default);
        arrowC.currentPath = "c" + cpIndex;
        arrowC.arrowValue = counter;
        arrowC.starCounter = starCounter;
        this._tracingContainer.node.addChild(image);
        image.zIndex = 99;
        image.opacity = 0;
      };
      TraceGraphics.prototype.loadDisplay = function(pos) {
        var image = cc.instantiate(this.tracingImageNode);
        image.name = "displayNode";
        image.setPosition(pos);
        image.opacity = 0;
        this._displayNodes.push(image);
        this._tracingContainer.node.addChild(image);
      };
      TraceGraphics.prototype.createStarAtPos = function(starNodes, pos) {
        var image = cc.instantiate(this.imageNode);
        image.name = "starNode";
        image.scale = 1.5;
        image.getComponent(cc.Sprite).spriteFrame = this.star;
        image.setPosition(pos);
        this._tracingContainer.node.addChild(image);
        image.zIndex = 99;
        image.active = false;
        starNodes.push(image);
      };
      TraceGraphics.prototype.playTracingSound = function() {
        if (!this._traceSoundOn && !this.traceGenerationMode) {
          this._traceSoundOn = true;
          try {
            !this.traceAudio || (this._traceAudioId = util_1.Util.playSfx(this.traceAudio, true, true));
          } catch (e) {}
        }
      };
      TraceGraphics.prototype.doAdditionalCheckToRecordPointsOnMove = function() {
        if (this.traceGenerationMode) {
          var diff = this._currPoint.sub(this._recordPoint);
          var needToLog = diff.magSqr() >= 10;
          if (needToLog) {
            this._recordPoint = this._currPoint;
            this.recordPoint(false);
          }
        }
      };
      TraceGraphics.prototype.onTouchEnd = function(touch) {
        this.stopTracingSound();
        this._endIndicator.opacity = 0;
        this._startIndicator.opacity = 0;
        if (this.traceGenerationMode) {
          this.recordPoint(true);
          return;
        }
        if (this._isValid && this._touchEnabled) {
          this._lastCounterValue = this._indicatorNodeComponent.counterValue > this._lastCounterValue ? this._indicatorNodeComponent.counterValue : this._lastCounterValue;
          this._shouldUpdateStartIndicator && !!this._lastStarNodeInCurrentPath && this._startIndicator.setPosition(this._lastStarNodeInCurrentPath.getPosition());
        }
        this.checkIfAllValidateTraceCompleted();
        this._tracingFinished || (this._startIndicator.opacity = 255);
        this.stopTracingSound();
      };
      TraceGraphics.prototype.scheduleHelpAnimation = function() {
        var _this = this;
        this.scheduleOnce(function() {
          _this._showHelp = true;
          _this._hand.active = true;
          _this.animate();
        }, 5);
      };
      TraceGraphics.prototype.stopTracingSound = function() {
        if (!this.traceGenerationMode && !!this._traceAudioId && this._traceSoundOn) {
          cc.audioEngine.stop(this._traceAudioId);
          this._traceSoundOn = false;
        }
      };
      TraceGraphics.prototype.recordPoint = function(ended) {
        if (this.traceGenerationMode) {
          this._graphics.lineTo(this._currPoint.x, this._currPoint.y);
          this._graphics.stroke();
          this._tracingContainer.recordTouchPoint(this._currPoint, ended);
        }
      };
      TraceGraphics.prototype.getTouchLocation = function() {
        return this._isTouchNotReleased ? this._currPoint : null;
      };
      TraceGraphics.prototype.checkIfAllValidateTraceCompleted = function() {
        var completed = this.currentArrowValue >= this._totalValidationCheckPoints;
        if (completed) {
          this._validationOfCurrentPathCompleted = true;
          this.node.dispatchEvent(new cc.Event.EventCustom(helper_1.TRACING_CORRECT, true));
          this.moveToNextPath();
        }
      };
      TraceGraphics.prototype.rectAroundPoint = function(point) {
        var rect = cc.Rect.fromMinMax(new cc.Vec2(point.x - BOUNDARY_CHECK_LIMIT, point.y - BOUNDARY_CHECK_LIMIT), new cc.Vec2(point.x + BOUNDARY_CHECK_LIMIT, point.y + BOUNDARY_CHECK_LIMIT));
        return rect;
      };
      TraceGraphics.prototype.setUpDebugDrawGraphics = function() {
        var _this = this;
        this._graphics.strokeColor = cc.Color.BLUE;
        this._graphics.lineWidth = 1;
        this._matchingRects.forEach(function(rect) {
          _this._graphics.rect(rect.x, rect.y, rect.width, rect.height);
          _this._graphics.stroke();
        });
      };
      TraceGraphics.prototype.renderStar = function(index) {
        var _this = this;
        this._starNodesInPath = [];
        if (this._allTracePoints.length > index) {
          var tracePaths = this._allTracePoints[index];
          tracePaths.forEach(function(p) {
            _this.createStarAtPos(_this._starNodesInPath, new cc.Vec2(p.x, p.y));
          });
        }
      };
      TraceGraphics.prototype.drawStartPointInCurrentPath = function() {
        var _this = this;
        this.scheduleOnce(function() {
          _this.createStartIndicator();
          if (_this._starNodesInPath.length > 0) {
            _this._startIndicator.setPosition(_this._starNodesInPath[0].getPosition());
            _this._startIndicator.active = true;
            _this._startIndicator.zIndex = 100;
            _this._tracingContainer.node.children.filter(function(c) {
              return "displayNode" === c.name;
            }).forEach(function(c) {
              c.opacity = 255;
              c.active = true;
            });
            _this.animateDisplayNodes(_this._displayNodes);
          }
        });
      };
      TraceGraphics.prototype.drawEndPointInCurrentPath = function() {
        var _this = this;
        this.scheduleOnce(function() {
          _this.createEndIndicator();
          if (_this._starNodesInPath.length > 0) {
            _this._endIndicator.setPosition(_this._starNodesInPath[_this._starNodesInPath.length - 1].getPosition());
            _this._endIndicator.active = true;
            _this._endIndicator.zIndex = 100;
          }
        });
      };
      TraceGraphics.prototype.createStartIndicator = function() {
        !this._startIndicator || this._startIndicator.removeFromParent(true);
        this._startIndicator = cc.instantiate(this.indicatorNode);
        this._indicatorNodeComponent = this._startIndicator.getComponent(indicator_node_1.default);
        this._indicatorNodeComponent.traceGraphics = this;
        this._indicatorNodeComponent.currentPath = "c" + this._path;
        var circleCollider = this._startIndicator.getComponent(cc.CircleCollider);
        circleCollider.radius = 18;
        this._startIndicator.name = "startImage";
        this._startIndicator.name = "startImage";
        this._startIndicator.zIndex = 100;
        this._startIndicator.scale = 2.5;
        this._startIndicator.opacity = 255;
        this._startIndicator.getComponent(cc.Sprite).spriteFrame = this.staringImage;
        this.node.parent.addChild(this._startIndicator);
        return this._startIndicator;
      };
      TraceGraphics.prototype.createEndIndicator = function() {
        if (!this._endIndicator) {
          this._endIndicator = cc.instantiate(this.imageNode);
          this._endIndicator.name = "endImage";
          this._endIndicator.zIndex = 100;
          this._endIndicator.scale = 2.5;
          this._endIndicator.opacity = 255;
          this._endIndicator.getComponent(cc.Sprite).spriteFrame = this.endingImage;
          this.node.parent.addChild(this._endIndicator);
        }
        return this._endIndicator;
      };
      TraceGraphics.prototype.distanceBetweenPoints = function(t1, t2) {
        return Math.sqrt((t1.x - t2.x) * (t1.x - t2.x) + (t1.y - t2.y) * (t1.y - t2.y));
      };
      TraceGraphics.prototype.computeDistance = function(tracePaths) {
        for (var i = 0; i < tracePaths.length; i++) for (var j = i; j < tracePaths.length; j++) {
          var t1 = tracePaths[i];
          var t2 = tracePaths[j];
          var distance = this.distanceBetweenPoints(t1, t2);
          if (distance >= 45) {
            i = j;
            this.loadDisplay(new cc.Vec2(t1.x, t1.y));
          }
        }
        this._starNodesInPath.length > 10 && this.loadDisplay(this._starNodesInPath[this._starNodesInPath.length - 10].getPosition());
      };
      TraceGraphics.prototype.configureCurrentValidationPath = function(index) {
        var _this = this;
        this._matchingRects = [];
        this._animationPoints = [];
        this._validationOfCurrentPathCompleted = false;
        var ac = 0;
        var j = 0;
        if (this._allTracePoints.length > index) {
          var tracePaths_1 = this._allTracePoints[index];
          this.computeDistance(tracePaths_1);
          this._finishCounter = tracePaths_1.length - 1;
          ac = 0;
          j = 0;
          tracePaths_1.forEach(function(t, i) {
            j = i;
            if (0 === i) {
              _this.loadIndicator(index, new cc.Vec2(t.x, t.y), i + 1);
              ac++;
              _this.loadArrow(index, new cc.Vec2(t.x, t.y), ac, i + 1);
            } else if (i % 5 === 0) {
              _this.loadIndicator(index, new cc.Vec2(t.x, t.y), i + 1);
              if (i % 15 === 0) {
                ac++;
                _this.loadArrow(index, new cc.Vec2(t.x, t.y), ac, i + 1);
              }
            } else if (i === tracePaths_1.length - 1) {
              ac++;
              _this.loadIndicator(index, new cc.Vec2(t.x, t.y), i + 1);
              _this.loadArrow(index, new cc.Vec2(t.x, t.y), ac, i + 1);
            }
            var rect = _this.rectAroundPoint(t);
            _this._matchingRects.push(rect);
            _this._animationPoints.push({
              x: rect.x + rect.width / 2,
              y: rect.y + rect.height / 2
            });
          });
        }
        ac++;
        !this._starNodesInPath[this._starNodesInPath.length - 1] || this.loadArrow(index, this._starNodesInPath[this._starNodesInPath.length - 1].getPosition(), ac, j + 1);
        this._totalValidationCheckPoints = ac;
        this.showIndicators();
        this.scheduleOnce(function() {
          null !== _this._displayScheduler && _this.unschedule(_this._displayScheduler);
          _this._displayScheduler = function() {
            _this.animateDisplayNodes(_this._displayNodes);
          };
          _this.schedule(_this._displayScheduler, 3);
        });
      };
      TraceGraphics.prototype.animateDisplayNodes = function(nodes) {
        var iterator = this.displayIterator(nodes, 0, nodes.length)[Symbol.iterator]();
        this.getNextFromIterator(iterator);
      };
      TraceGraphics.prototype.getNextFromIterator = function(iterator) {
        var _this = this;
        var result = iterator.next();
        result.done || !result.value ? iterator = null : this.glowDisplay(result.value, function() {
          _this.getNextFromIterator(iterator);
        });
      };
      TraceGraphics.prototype.glowDisplay = function(n, callBack) {
        var anim = n.getComponent(cc.Animation);
        if (null !== anim) {
          anim.stop();
          anim.on("finished", function() {
            callBack();
          }, this);
          anim.play("glowing_dot");
        }
      };
      TraceGraphics.prototype.drawDebugPath = function(shouldDebugDraw) {
        shouldDebugDraw && this._currentPathIndex > 0 && this.setUpDebugDrawGraphics();
      };
      TraceGraphics.prototype.moveToNextPath = function() {
        var _this = this;
        this._isResetGraphicsAllowed = false;
        this.node.dispatchEvent(new cc.Event.EventCustom(helper_1.RESET_TRACING_NOT_ALLOWED, true));
        this._lastStarNodeInCurrentPath = null;
        this.currentArrowValue = 0;
        this.nextArrowValue = 0;
        this.arrowPos = null;
        this._activeStarsTillIndex = -1;
        this._endIndicator.active = false;
        this._startIndicator.active = false;
        this._lastCounterValue = 0;
        this._firstTouchInCurrentPath = false;
        this._lastValidPointIndexInCurrentPath = -1;
        this.stopTracingSound();
        this._displayNodes.forEach(function(n) {
          n.active = false;
          n.removeFromParent(false);
        });
        this._starNodesInPath.filter(function(n, i) {
          return false === n.active || 0 === n.opacity;
        }).forEach(function(n) {
          n.active = true;
          n.opacity = 255;
        });
        this._displayNodes = [];
        this._tracingContainer.node.children.filter(function(c) {
          return "displayNode" === c.name;
        }).forEach(function(c) {
          c.removeFromParent(false);
          c.active = false;
        });
        if (this._currentPathIndex >= this._allTracePoints.length - 1) {
          this._showHelp = false;
          this._touchEnabled = false;
          if (!this._tracingFinished) {
            this._tracingFinished = true;
            this.disableTouchHandlers();
            this.tracingContainerComponent.node.emit(helper_1.SHOW_CHILD_IMAGE);
            this.scheduleOnce(function() {
              _this.node.dispatchEvent(new cc.Event.EventCustom(helper_1.TRACING_FINISHED, true));
              _this.scheduleOnce(function() {
                _this._hand.opacity = 0;
              }, 1);
            }, 1);
          }
        } else {
          this._mTrigger = true;
          this._isValid = false;
          this._touchEnabled = false;
          this._currentPathIndex = this._currentPathIndex + 1;
          this.renderStar(this._currentPathIndex);
          this._path = this._path + 1;
          this._animationPoints = [];
          this._starNodesInPath.forEach(function(n) {
            n.active = false;
          });
          this._showHelp = true;
          this.configureCurrentValidationPath(this._path);
        }
      };
      TraceGraphics.prototype.resetGraphics = function() {
        if (this._isResetGraphicsAllowed) {
          this._isResetGraphicsAllowed = false;
          this.node.dispatchEvent(new cc.Event.EventCustom(helper_1.RESET_TRACING_NOT_ALLOWED, true));
          this._lastStarNodeInCurrentPath = null;
          this.currentArrowValue = 0;
          this.nextArrowValue = 0;
          this._activeStarsTillIndex = -1;
          this._lastCounterValue = 0;
          this._firstTouchInCurrentPath = false;
          this._lastValidPointIndexInCurrentPath = -1;
          this.stopTracingSound();
          this._starNodesInPath.forEach(function(n) {
            n.active = false;
          });
          null !== this._startIndicator && this._startIndicator.setPosition(this._starNodesInPath[0].getPosition());
          null !== this._endIndicator && this._endIndicator.setPosition(this._starNodesInPath[this._starNodesInPath.length - 1].getPosition());
        }
      };
      TraceGraphics.prototype.moveBackToCurrentPath = function() {
        this._mTrigger = true;
        this._isValid = false;
        this._touchEnabled = false;
        this._lastCounterValue = 0;
        this._currentPathIndex = this._currentPathIndex;
        this._starNodesInPath.forEach(function(n) {
          n.active = false;
        });
        this._path = this._path;
        this._animationPoints = [];
        this._showHelp = true;
        this.showIndicators();
      };
      TraceGraphics.prototype.animate = function() {
        var _this = this;
        if (!this._validationOfCurrentPathCompleted && !this.traceGenerationMode && this._showHelp) try {
          this._hand.opacity = 255;
          this._hand.active = true;
          var moves = [];
          for (var i = 0; i < this._animationPoints.length; i++) {
            var p1 = this._animationPoints[i];
            moves.push(cc.moveTo(.02, new cc.Vec2(p1.x, p1.y)));
          }
          null != moves && moves.length > 0 && moves.push(cc.callFunc(function() {
            _this._hand.active = false;
            _this.scheduleHelpAnimation();
          }, this));
          null != moves && moves.length > 0 && (null !== this._hand || void 0 !== this._hand) && this._hand.active && this._hand.runAction(cc.sequence(moves));
        } catch (e) {}
      };
      TraceGraphics.prototype.drawCircleInTracingMode = function(storageKey) {
        var _this = this;
        this._graphics.strokeColor = Color.BLUE;
        try {
          var points = JSON.parse(cc.sys.localStorage.getItem(storageKey));
          points.forEach(function(p) {
            var point = p.shift();
            _this._graphics.moveTo(point.x, point.y);
            p.forEach(function(t, i) {
              if (i % 5 === 0) {
                _this._graphics.circle(t.x, t.y, 5);
                _this._graphics.stroke();
              }
            });
          });
        } catch (e) {}
      };
      Object.defineProperty(TraceGraphics.prototype, "traceObject", {
        get: function() {
          return this._traceObject;
        },
        set: function(n) {
          this._traceObject = n;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TraceGraphics.prototype, "traceGenerationMode", {
        get: function() {
          return this._traceGenerationMode;
        },
        set: function(n) {
          this._traceGenerationMode = n;
        },
        enumerable: false,
        configurable: true
      });
      TraceGraphics.prototype.clear = function() {
        this._graphics.clear(true);
        this.stopTracingSound();
      };
      TraceGraphics.prototype.onDestroy = function() {
        this._isValid = false;
        if (!!this._startIndicator) {
          this._startIndicator.active = false;
          this._startIndicator.removeFromParent(true);
        }
        this.stopTracingSound();
      };
      Object.defineProperty(TraceGraphics.prototype, "adjustedScale", {
        get: function() {
          return this._adjustedScale;
        },
        set: function(scale) {
          this._adjustedScale = scale;
        },
        enumerable: false,
        configurable: true
      });
      TraceGraphics.prototype.disableTouchAsNoCollision = function(b) {
        var _this = this;
        try {
          this._touchEnabled = b;
          this._tracingFinished || this.scheduleOnce(function() {
            cc.log("exit");
            _this._validationOfCurrentPathCompleted || !_this._lastStarNodeInCurrentPath || _this._startIndicator.setPosition(_this._lastStarNodeInCurrentPath.getPosition());
            _this.checkIfAllValidateTraceCompleted();
            _this._touchEnabled = true;
          }, .1);
        } catch (e) {}
      };
      __decorate([ property(cc.Color) ], TraceGraphics.prototype, "strokeColor", void 0);
      __decorate([ property() ], TraceGraphics.prototype, "lineWidth", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], TraceGraphics.prototype, "traceAudio", void 0);
      __decorate([ property(cc.SpriteFrame) ], TraceGraphics.prototype, "star", void 0);
      __decorate([ property(cc.SpriteFrame) ], TraceGraphics.prototype, "staringImage", void 0);
      __decorate([ property(cc.SpriteFrame) ], TraceGraphics.prototype, "arrowImage", void 0);
      __decorate([ property(cc.SpriteFrame) ], TraceGraphics.prototype, "endingImage", void 0);
      __decorate([ property(cc.SpriteFrame) ], TraceGraphics.prototype, "indicator", void 0);
      __decorate([ property(cc.Prefab) ], TraceGraphics.prototype, "tracingNode", void 0);
      __decorate([ property(cc.Prefab) ], TraceGraphics.prototype, "arrowNode", void 0);
      __decorate([ property(cc.Prefab) ], TraceGraphics.prototype, "imageNode", void 0);
      __decorate([ property(cc.Prefab) ], TraceGraphics.prototype, "tracingImageNode", void 0);
      __decorate([ property(cc.Prefab) ], TraceGraphics.prototype, "indicatorNode", void 0);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "start", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "loadTracePath", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "enableTouchHandlers", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "disableTouchHandlers", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "postLoad", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "showIndicators", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "isTouchValid", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "setUpGraphics", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "onTouchStart", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "highLightStarNodes", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "onTouchMove", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "loadImage", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "loadIndicator", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "loadArrow", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "loadDisplay", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "createStarAtPos", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "playTracingSound", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "doAdditionalCheckToRecordPointsOnMove", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "onTouchEnd", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "scheduleHelpAnimation", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "stopTracingSound", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "recordPoint", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "getTouchLocation", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "checkIfAllValidateTraceCompleted", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "rectAroundPoint", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "setUpDebugDrawGraphics", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "renderStar", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "drawStartPointInCurrentPath", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "drawEndPointInCurrentPath", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "createStartIndicator", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "createEndIndicator", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "distanceBetweenPoints", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "computeDistance", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "configureCurrentValidationPath", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "animateDisplayNodes", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "moveToNextPath", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "animate", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "drawCircleInTracingMode", null);
      __decorate([ error_handler_1.default() ], TraceGraphics.prototype, "disableTouchAsNoCollision", null);
      TraceGraphics = __decorate([ ccclass ], TraceGraphics);
      return TraceGraphics;
    }(cc.Component);
    exports.default = TraceGraphics;
    cc._RF.pop();
  }, {
    "../../scripts/helper": "helper",
    "../../scripts/lib/config": "config",
    "../../scripts/lib/error-handler": "error-handler",
    "../../scripts/util": "util",
    "./arrow-node": "arrow-node",
    "./indicator-node": "indicator-node",
    "./tracing-container": "tracing-container",
    "./tracing-node": "tracing-node"
  } ],
  "tracing-collider": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a1cacFWmO9DJ5+khTdKmxVv", "tracing-collider");
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
    var ccclass = cc._decorator.ccclass;
    var TracingCollider = function(_super) {
      __extends(TracingCollider, _super);
      function TracingCollider() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._isTouchInside = false;
        return _this;
      }
      TracingCollider.prototype.onLoad = function() {
        this._polygonCollider = this.node.getComponent(cc.PolygonCollider);
        this._isTouchInside = false;
      };
      TracingCollider.prototype.checkIfTouchInsideCollider = function(point) {
        var checkPoint = new cc.Vec2(point.x / this.node.scale, point.y / this.node.scale);
        return !!this._polygonCollider && !!cc.Intersection.pointInPolygon(checkPoint, this._polygonCollider.points);
      };
      TracingCollider = __decorate([ ccclass ], TracingCollider);
      return TracingCollider;
    }(cc.Component);
    exports.default = TracingCollider;
    cc._RF.pop();
  }, {} ],
  "tracing-container": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7217aYg9WtMvb4KzgWTWC2O", "tracing-container");
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
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var HorizontalAlign = cc.Label.HorizontalAlign;
    var VerticalAlign = cc.Label.VerticalAlign;
    var trace_graphics_1 = require("./trace-graphics");
    var tracing_part_1 = require("./tracing-part");
    var error_handler_1 = require("../../scripts/lib/error-handler");
    var config_1 = require("../../scripts/lib/config");
    var helper_1 = require("../../scripts/helper");
    var util_1 = require("../../scripts/util");
    var DEFAULT_RECORDING_FONT_SIZE = "512";
    var DEFAULT_FONT_COLOR = "#FFFFFF";
    var TracingContainer = function(_super) {
      __extends(TracingContainer, _super);
      function TracingContainer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.tracingImage = "";
        _this.imageNode = null;
        _this._imageLoadedTexture = null;
        _this._childImageLoadedTexture = null;
        _this._lineWidth = 0;
        _this.tracingLetter = "";
        _this.textFont = null;
        _this.traceGraphicsPrefab = null;
        _this.width = 0;
        _this.height = 0;
        _this.traceGenerationMode = false;
        _this._traceGraphics = null;
        _this._traceObject = null;
        _this._traceGraphicsComponent = null;
        _this._currentTracingPart = null;
        _this._tracingPaths = null;
        _this._childImage = null;
        _this._image = null;
        return _this;
      }
      TracingContainer.prototype.onLoad = function() {
        var _this = this;
        this.node.width = this.width;
        this.node.height = this.height;
        cc.log("required font", config_1.default.getInstance().currentFontName);
        this.textFont = config_1.default.getInstance().getTextFont(config_1.default.getInstance().currentFontName);
        this.node.on(helper_1.SHOW_CHILD_IMAGE, function() {
          if (!!_this._childImage && !!_this._childImageLoadedTexture) {
            _this.clearStarNodes();
            _this._image.opacity = 255;
            _this._childImage.opacity = 255;
          }
        });
        this.init();
      };
      TracingContainer.prototype.clearStarNodes = function() {
        this.node.children.filter(function(c) {
          return "starNode" === c.name;
        }).forEach(function(n, i) {
          n.opacity = 0;
        });
      };
      TracingContainer.prototype.resetCurrentTracingPart = function() {
        this._currentTracingPart = null;
      };
      TracingContainer.prototype.createText = function(parent, text, fontSize, fontColor) {
        void 0 === fontSize && (fontSize = DEFAULT_RECORDING_FONT_SIZE);
        void 0 === fontColor && (fontColor = DEFAULT_FONT_COLOR);
        return util_1.Util.initText(parent, this.textFont, text, fontSize, fontColor, true, new cc.Vec2(this.node.width / 2, this.node.height / 1.875), HorizontalAlign.CENTER, VerticalAlign.CENTER, new cc.Vec2(.5, .5), true, 2);
      };
      TracingContainer.prototype.createTracingImage = function(parent) {
        var _this = this;
        this._image = cc.instantiate(this.imageNode);
        var iName = -1 !== this.tracingImage.indexOf("/") ? this.tracingImage.substr(this.tracingImage.lastIndexOf("/") + 1).replace(".png", "") : this.tracingImage;
        var imageName = this.tracingImage;
        imageName && !this._imageLoadedTexture ? util_1.Util.loadTexture(imageName, function(texture) {
          if (!!texture) {
            _this._imageLoadedTexture = texture;
            _this._image.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(_this._imageLoadedTexture);
          }
        }) : this._image.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this._imageLoadedTexture);
        this._image.setAnchorPoint(new cc.Vec2(.5, .5));
        this._image.setPosition(new cc.Vec2(512, cc.winSize.height / 2));
        this._image.scale = 1;
        this._image.name = iName;
        this._image.children.forEach(function(c) {
          return c.opacity = 0;
        });
        this._childImage = this._image.getChildByName("childImageNode");
        this._childImage.opacity = 0;
        var childImageName = imageName.replace("-tutorial", "");
        childImageName && !this._childImageLoadedTexture ? util_1.Util.loadTexture(childImageName, function(texture) {
          if (!!texture) {
            _this._childImageLoadedTexture = texture;
            _this._childImage.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(_this._childImageLoadedTexture);
          }
        }) : this._childImage.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this._childImageLoadedTexture);
        parent.addChild(this._image);
        return this._image;
      };
      TracingContainer.prototype.init = function() {
        null === this._tracingPaths && (this._tracingPaths = []);
        null === this._currentTracingPart && (this._currentTracingPart = new tracing_part_1.TracingPart());
        var colors = [].concat.apply([], util_1.Util.pickRandomElements([ "#9900cc", "#f25949", "#00cfff", "#e556f4" ], 1));
        var colorSelected = colors.shift();
        this.node.opacity = 255;
        if (!this.tracingLetter) {
          if (!!this.tracingImage) {
            this._traceObject = this.createTracingImage(this.node);
            this._traceObject.setPosition(new cc.Vec2(this._traceObject.x, this._traceObject.y - 100));
            this._traceObject.scale = .75;
          }
        } else {
          this._traceObject = this.createText(this.node, this.tracingLetter, DEFAULT_RECORDING_FONT_SIZE, colorSelected);
          this._traceObject.scale = 1.25;
        }
        this._traceGraphics = cc.instantiate(this.traceGraphicsPrefab);
        this._traceGraphicsComponent = this._traceGraphics.getComponent(trace_graphics_1.default);
        this._traceGraphicsComponent.tracingContainerComponent = this;
        0 !== this._lineWidth && (this._traceGraphicsComponent.lineWidth = this._lineWidth);
        this._traceGraphicsComponent.traceObject = this._traceObject;
        this._traceGraphicsComponent.traceGenerationMode = this.traceGenerationMode;
        this.node.addChild(this._traceGraphics);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.initHandAndIndicator();
        this.node.width = this._traceObject.width;
        if (this.traceGenerationMode) {
          var finish = this.node.getChildByName("finish");
          if (finish) {
            finish.zIndex = 100;
            finish.active = true;
          }
          var reset = this.node.getChildByName("reset");
          if (reset) {
            reset.zIndex = 100;
            reset.active = true;
          }
          var back = this.node.getChildByName("back");
          if (back) {
            back.zIndex = 100;
            back.active = true;
          }
        } else {
          var finish = this.node.getChildByName("finish");
          finish.active = false;
          var reset = this.node.getChildByName("reset");
          reset.active = false;
          if ("imagerecorder" === config_1.default.getInstance().game) {
            var back = this.node.getChildByName("back");
            back.zIndex = 100;
            back.active = true;
          } else {
            var back = this.node.getChildByName("back");
            back.active = false;
          }
        }
        !this.traceGenerationMode;
      };
      TracingContainer.prototype.initHandAndIndicator = function() {
        var hand = this.node.getChildByName("hand");
        if (hand) {
          hand.active = false;
          hand.scale = 1;
          hand.zIndex = 999;
        }
        var indicator = this.node.getChildByName("indicator");
        if (indicator) {
          indicator.active = true;
          indicator.scale = 1;
          indicator.zIndex = 999;
        }
      };
      TracingContainer.prototype.onFinishedButtonClick = function(event, customEventData) {
        console.log("onFinishedButtonClick");
        var key = !this.tracingLetter ? this.tracingImage : this.tracingLetter;
        this.writeToLocalStorage(key, JSON.stringify(this._tracingPaths));
        this._traceGraphicsComponent.drawCircleInTracingMode(key);
        this.node.dispatchEvent(new cc.Event.EventCustom(helper_1.RECORDING_FINISHED, true));
      };
      TracingContainer.prototype.onBackButtonClick = function(event, customEventData) {
        console.log("onBackButtonClick");
        this.node.dispatchEvent(new cc.Event.EventCustom(helper_1.BACK_FINISHED, true));
      };
      TracingContainer.prototype.recordTouchPoint = function(point, ended) {
        void 0 === ended && (ended = false);
        null === this._tracingPaths && (this._tracingPaths = []);
        null === this._currentTracingPart && (this._currentTracingPart = new tracing_part_1.TracingPart());
        this._currentTracingPart.addPoint(point);
        if (ended) {
          this._tracingPaths.push(this._currentTracingPart.getAllTracingPoints());
          this._currentTracingPart = null;
        }
      };
      TracingContainer.prototype.removeFromLocalStorage = function() {
        var key = !this.tracingLetter ? this.tracingImage : this.tracingLetter;
        cc.sys.localStorage.removeItem(key);
        this._currentTracingPart = null;
        this._tracingPaths = null;
        this._traceGraphicsComponent.clear();
      };
      TracingContainer.prototype.writeToLocalStorage = function(letter, data) {
        cc.sys.localStorage.setItem(letter, data);
        this.showGeneratedPath();
        console.log("key:", letter, "json:", cc.sys.localStorage.getItem(letter));
      };
      TracingContainer.prototype.showGeneratedPath = function() {
        var key = !this.tracingLetter ? this.tracingImage : this.tracingLetter;
        this._traceGraphicsComponent.drawCircleInTracingMode(key);
      };
      TracingContainer.prototype.onResetButtonClick = function(event, customEventData) {
        console.log("onResetButtonClick");
        this.removeFromLocalStorage();
      };
      Object.defineProperty(TracingContainer.prototype, "traceObject", {
        get: function() {
          return this._traceObject;
        },
        set: function(n) {
          this._traceObject = n;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TracingContainer.prototype, "traceGraphics", {
        get: function() {
          return this._traceGraphics;
        },
        set: function(n) {
          this._traceGraphics = n;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TracingContainer.prototype, "lineWidth", {
        set: function(m) {
          this._lineWidth = m;
        },
        enumerable: false,
        configurable: true
      });
      __decorate([ property() ], TracingContainer.prototype, "tracingImage", void 0);
      __decorate([ property(cc.Prefab) ], TracingContainer.prototype, "imageNode", void 0);
      __decorate([ property() ], TracingContainer.prototype, "tracingLetter", void 0);
      __decorate([ property(cc.Prefab) ], TracingContainer.prototype, "traceGraphicsPrefab", void 0);
      __decorate([ property() ], TracingContainer.prototype, "width", void 0);
      __decorate([ property() ], TracingContainer.prototype, "height", void 0);
      __decorate([ property() ], TracingContainer.prototype, "traceGenerationMode", void 0);
      __decorate([ error_handler_1.default() ], TracingContainer.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], TracingContainer.prototype, "clearStarNodes", null);
      __decorate([ error_handler_1.default() ], TracingContainer.prototype, "resetCurrentTracingPart", null);
      __decorate([ error_handler_1.default() ], TracingContainer.prototype, "createText", null);
      __decorate([ error_handler_1.default() ], TracingContainer.prototype, "createTracingImage", null);
      __decorate([ error_handler_1.default() ], TracingContainer.prototype, "init", null);
      __decorate([ error_handler_1.default() ], TracingContainer.prototype, "initHandAndIndicator", null);
      __decorate([ error_handler_1.default() ], TracingContainer.prototype, "recordTouchPoint", null);
      __decorate([ error_handler_1.default() ], TracingContainer.prototype, "removeFromLocalStorage", null);
      __decorate([ error_handler_1.default() ], TracingContainer.prototype, "writeToLocalStorage", null);
      __decorate([ error_handler_1.default() ], TracingContainer.prototype, "showGeneratedPath", null);
      TracingContainer = __decorate([ ccclass ], TracingContainer);
      return TracingContainer;
    }(cc.Component);
    exports.default = TracingContainer;
    cc._RF.pop();
  }, {
    "../../scripts/helper": "helper",
    "../../scripts/lib/config": "config",
    "../../scripts/lib/error-handler": "error-handler",
    "../../scripts/util": "util",
    "./trace-graphics": "trace-graphics",
    "./tracing-part": "tracing-part"
  } ],
  "tracing-node": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d1829VJlWNJJIiI9R8IZTV8", "tracing-node");
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
    var ccclass = cc._decorator.ccclass;
    var DROP_GROUP = "drop";
    var TracingNode = function(_super) {
      __extends(TracingNode, _super);
      function TracingNode() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._collisionCount = 0;
        _this.counter = 0;
        _this.currentPath = null;
        return _this;
      }
      TracingNode.prototype.onEnable = function() {
        var collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
      };
      TracingNode.prototype.onCollisionEnter = function(other, self) {
        switch (other.node.group) {
         case DROP_GROUP:
          this.collisionEnter(other, self);
        }
      };
      TracingNode.prototype.collisionEnter = function(other, self) {
        this._collisionCount++;
      };
      TracingNode.prototype.onCollisionExit = function(other, self) {
        switch (other.node.group) {
         case DROP_GROUP:
          this.collisionExit(other, self);
        }
      };
      TracingNode.prototype.collisionExit = function(other, self) {
        this._collisionCount--;
      };
      Object.defineProperty(TracingNode.prototype, "collisionCount", {
        get: function() {
          return this._collisionCount;
        },
        set: function(scale) {
          this._collisionCount = scale;
        },
        enumerable: false,
        configurable: true
      });
      TracingNode = __decorate([ ccclass ], TracingNode);
      return TracingNode;
    }(cc.Component);
    exports.default = TracingNode;
    cc._RF.pop();
  }, {} ],
  "tracing-part": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b58dbgr5eFKSIEI7NwShGz0", "tracing-part");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TracingPart = void 0;
    var TracingPart = function() {
      function TracingPart() {
        this._points = [];
        this._points = [];
      }
      Object.defineProperty(TracingPart.prototype, "points", {
        get: function() {
          return this._points;
        },
        set: function(newVal) {
          this._points = newVal;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TracingPart.prototype, "priority", {
        get: function() {
          return this._priority;
        },
        set: function(newVal) {
          this._priority = newVal;
        },
        enumerable: false,
        configurable: true
      });
      TracingPart.prototype.addPoint = function(point) {
        this._points.push(point);
      };
      TracingPart.prototype.addPointAtIndex = function(point, startIndex) {
        this._points.splice(startIndex, 0, point);
      };
      TracingPart.prototype.getAllTracingPoints = function() {
        return this.points;
      };
      return TracingPart;
    }();
    exports.TracingPart = TracingPart;
    cc._RF.pop();
  }, {} ],
  "use_v2.1.x_cc.Action": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "36bcb1fx5FL3IfL5KRXfdal", "use_v2.1.x_cc.Action");
    "use strict";
    cc.macro.ROTATE_ACTION_CCW = true;
    cc._RF.pop();
  }, {} ],
  "util-logger": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3a012LPdUZJZ79GViodugmx", "util-logger");
    "use strict";
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
    var constants_1 = require("./lib/constants");
    var profile_1 = require("./lib/profile");
    var chimple_1 = require("../../chimple");
    var LOGGER_CLASS = "org/chimple/bahama/logger/ChimpleLogger";
    var LOGGER_METHOD = "logEvent";
    var LOGGER_METHOD_SIGNATURE = "(Ljava/lang/String;)V";
    var SET_USER_ID_METHOD = "setUserIdEvent";
    var SET_USER_ID_SIGNATURE = "(Ljava/lang/String;)V";
    var SET_USER_PROPERTY_METHOD = "setUserPropertiesEvent";
    var SET_USER_PROPERTY_SIGNATURE = "(Ljava/lang/String;Ljava/lang/String;)V";
    var PROFILE_METHOD = "logProfile";
    var PROFILE_METHOD_SIGNATURE = "(Ljava/lang/String;Ljava/lang/String;)V";
    var DOWNLOAD_FILE_METHOD = "downloadFile";
    var DOWNLOAD_FILE_METHOD_SIGNATURE = "(Ljava/lang/String;Ljava/lang/String;)V";
    var FILE_EXISTS_IN_PUBLIC_DIRECTORY_METHOD = "isFileExistsInPublicDirectory";
    var FILE_EXISTS_IN_PUBLIC_DIRECTORY_METHOD_SIGNATURE = "(Ljava/lang/String;)Z";
    var FILE_EXISTS_METHOD = "isFileExists";
    var FILE_EXISTS_METHOD_SIGNATURE = "(Ljava/lang/String;)Z";
    var CHECK_URL_DOWNLOADED_METHOD = "checkIfUrlDownloaded";
    var CHECK_URL_DOWNLOADED_METHOD_SIGNATURE = "(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;";
    var IS_NETWORK_AVAILABLE_METHOD = "isNetworkAvailable";
    var IS_NETWORK_AVAILABLE_METHOD_SIGNATURE = "()Z";
    var GET_STORAGE_DIRECTORY = "getStorageDirectory";
    var GET_STORAGE_DIRECTORY_METHOD_SIGNATURE = "()Ljava/lang/String;";
    var CURRENT_PROFILE_METHOD = "currentStudentId";
    var CURRENT_PROFILE_METHOD_SIGNATURE = "()Ljava/lang/String;";
    var GET_COUNTRY_CODE_METHOD = "getCountryCode";
    var GET_COUNTRY_CODE_METHOD_SIGNATURE = "()Ljava/lang/String;";
    var DEVICE_ID_METHOD = "getDeviceId";
    var DEVICE_ID_METHOD_SIGNATURE = "()Ljava/lang/String;";
    var LAUNCH_YOUTUBE_METHOD = "launchYoutube";
    var LAUNCH_YOUTUBE_METHOD_SIGNATURE = "(Ljava/lang/String;)V";
    var REQUEST_OTP_METHOD = "requestOtp";
    var REQUEST_OTP_METHOD_SIGNATURE = "(Ljava/lang/String;)V";
    var VERIFY_OTP_METHOD = "verifyOtp";
    var VERIFY_OTP_METHOD_SIGNATURE = "(Ljava/lang/String;)V";
    var SYNC_FMC_METHOD = "syncFmcForUsers";
    var SYNC_FMC_METHOD_SIGNATURE = "(Ljava/lang/String;)V";
    var SUBSCRIBE_TOPIC_METHOD = "subscribeToTopic";
    var SUBSCRIBE_TOPIC_METHOD_SIGNATURE = "(Ljava/lang/String;)V";
    var INITIALIZED = "init";
    var INITIALIZED_MEHTOD_SIGNATURE = "()V";
    var LOGIN_METHOD = "login";
    var LOGIN_METHOD_SIGNATURE = "(Ljava/lang/String;Ljava/lang/String;)V";
    var LOGOUT_METHOD = "logout";
    var LOGOUT_METHOD_SIGNATURE = "()V";
    var FIND_SCHOOL_METHOD = "findSchool";
    var FIND_SCHOOL_METHOD_SIGNATURE = "(Ljava/lang/String;)Ljava/lang/String;";
    var FETCH_SECTIONS_METHOD = "fetchSectionsForSchool";
    var FETCH_SECTIONS_METHOD_SIGNATURE = "(Ljava/lang/String;)Ljava/lang/String;";
    var FETCH_STUDENTS_METHOD = "fetchStudentsForSchoolAndSection";
    var FETCH_STUDENTS_METHOD_SIGNATURE = "(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;";
    var FETCH_CURRENT_USER_METHOD = "fetchStudentById";
    var FETCH_CURRENT_USER_METHOD_SIGNATURE = "(Ljava/lang/String;)Ljava/lang/String;";
    var SYNC_PROFILE_METHOD = "syncProfile";
    var SYNC_PROFILE_METHOD_SIGNATURE = "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V";
    var HISTORICAL_PROGRESS_METHOD = "historyProgress";
    var HISTORICAL_PROGRESS_METHOD_SIGNATURE = "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V";
    var LOG_DAILY_METHOD = "logToDailyFile";
    var LOG_DAILY_METHOD_SIGNATURE = "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V";
    var USER_ID = "userId";
    var DEVICE_ID = "deviceId";
    var TIMESTAMP = "timeStamp";
    var SCORE = "score";
    var COURSE = "course";
    var ASSIGNMENTIDS = "assignmentIds";
    var DATE = "date";
    var UtilLogger = function() {
      function UtilLogger() {}
      UtilLogger.logEvent = function(eventInfo) {
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            eventInfo["" + USER_ID] = this.currentProfile() || "";
            eventInfo["" + DEVICE_ID] = this.currentDeviceId() || "";
            eventInfo["" + TIMESTAMP] = new Date().getTime();
            cc.log("logging event", JSON.stringify(eventInfo));
            "file" != constants_1.ASSET_LOAD_METHOD && jsb.reflection.callStaticMethod(LOGGER_CLASS, LOGGER_METHOD, LOGGER_METHOD_SIGNATURE, JSON.stringify(eventInfo));
          }
          this.logEventToFireBase(eventInfo);
        } catch (e) {}
      };
      UtilLogger.setUserIdEvent = function(userId) {
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            cc.log("setUserId event", userId);
            jsb.reflection.callStaticMethod(LOGGER_CLASS, SET_USER_ID_METHOD, SET_USER_ID_SIGNATURE, userId);
          }
        } catch (e) {}
      };
      UtilLogger.setUserPropertiesEvent = function(key, value) {
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            cc.log("setUserPropertiesEvent event", key, ":", value);
            jsb.reflection.callStaticMethod(LOGGER_CLASS, SET_USER_PROPERTY_METHOD, SET_USER_PROPERTY_SIGNATURE, key, value);
          }
        } catch (e) {}
      };
      UtilLogger.logEventToFireBaseWithKey = function(key, data) {
        var _this = this;
        cc.log("logging firebase event", key, " with content", JSON.stringify(data));
        "undefined" != typeof sdkbox && sdkbox.firebase.Analytics.logEvent(key, data);
        cc.sys.isBrowser && (UtilLogger._isfireBaseInitialized ? UtilLogger.firebase ? UtilLogger.firebase.analytics().logEvent(key, data) : "" : function() {
          return __awaiter(_this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              switch (_a.label) {
               case 0:
                UtilLogger._isfireBaseInitialized = true;
                return [ 4, UtilLogger.importFirebaseForWeb() ];

               case 1:
                _a.sent();
                if (UtilLogger.firebase) {
                  UtilLogger.firebase.initializeApp(constants_1.firebaseConfigWeb);
                  UtilLogger.firebase.analytics();
                  UtilLogger.firebase.analytics().logEvent(key, data);
                }
                return [ 2 ];
              }
            });
          });
        }());
      };
      UtilLogger.importFirebaseForWeb = function() {
        return __awaiter(this, void 0, void 0, function() {
          var _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              _a = UtilLogger;
              return [ 4, Promise.resolve().then(function() {
                return require("firebase/app");
              }) ];

             case 1:
              _a.firebase = _b.sent();
              return [ 4, Promise.resolve().then(function() {
                return require("firebase/analytics");
              }) ];

             case 2:
              _b.sent();
              return [ 2 ];
            }
          });
        });
      };
      UtilLogger.logChimpleEvent = function(name, event) {
        event["" + USER_ID] = this.currentProfile() || "";
        event["" + DEVICE_ID] = this.currentDeviceId() || "";
        event["" + TIMESTAMP] = new Date().getTime();
        UtilLogger.logEventToFireBaseWithKey(name, event);
      };
      UtilLogger.logEventToFireBase = function(eventInfo) {
        eventInfo["" + USER_ID] = this.currentProfile() || "";
        eventInfo["" + DEVICE_ID] = this.currentDeviceId() || "";
        eventInfo["" + TIMESTAMP] = new Date().getTime();
        UtilLogger.logEventToFireBaseWithKey("logInfo", eventInfo);
      };
      UtilLogger.logProfile = function(profileInfo, profileFile) {
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            cc.log("logging profile", profileInfo, " ", profileFile);
            jsb.reflection.callStaticMethod(LOGGER_CLASS, PROFILE_METHOD, PROFILE_METHOD_SIGNATURE, profileInfo, profileFile);
          }
        } catch (e) {}
      };
      UtilLogger.currentProfile = function() {
        this._currentUserId = profile_1.User.getCurrentUser() ? profile_1.User.getCurrentUser().id : "";
        return this._currentUserId;
      };
      UtilLogger.getStorageDirectory = function() {
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            this._storageDirectory = jsb.reflection.callStaticMethod(LOGGER_CLASS, GET_STORAGE_DIRECTORY, GET_STORAGE_DIRECTORY_METHOD_SIGNATURE);
            cc.log("storage directory:", this._storageDirectory);
          }
        } catch (e) {}
        return this._storageDirectory;
      };
      UtilLogger.currentDeviceId = function() {
        try {
          if (null === this._currentDeviceId && cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            this._currentDeviceId = jsb.reflection.callStaticMethod(LOGGER_CLASS, DEVICE_ID_METHOD, DEVICE_ID_METHOD_SIGNATURE);
            cc.log("current device Id:", this._currentDeviceId);
          }
        } catch (e) {}
        return this._currentDeviceId;
      };
      UtilLogger.initPluginFirebase = function() {
        try {
          if ("undefined" == typeof sdkbox) {
            cc.log("sdkbox is undefined");
            return;
          }
          if ("undefined" == typeof sdkbox.firebase) {
            cc.log("sdkbox.firebase is undefined");
            return;
          }
          sdkbox.firebase.Analytics.init();
        } catch (e) {}
      };
      UtilLogger.initYoutubePlugin = function() {
        try {
          if ("undefined" == typeof sdkbox) {
            cc.log("sdkbox is undefined");
            return;
          }
          if ("undefined" == typeof sdkbox.PluginYoutube) {
            cc.log("sdkbox.PluginYoutube is undefined");
            return;
          }
          sdkbox.PluginYoutube.init();
        } catch (e) {}
      };
      UtilLogger.downloadFile = function(url, downloadDirectory) {
        try {
          cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID && "file" === constants_1.ASSET_LOAD_METHOD && jsb.reflection.callStaticMethod(LOGGER_CLASS, DOWNLOAD_FILE_METHOD, DOWNLOAD_FILE_METHOD_SIGNATURE, url, downloadDirectory);
        } catch (e) {}
      };
      UtilLogger.isFileExistsInPublicDirectory = function(file) {
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID && "file" === constants_1.ASSET_LOAD_METHOD) return jsb.reflection.callStaticMethod(LOGGER_CLASS, FILE_EXISTS_IN_PUBLIC_DIRECTORY_METHOD, FILE_EXISTS_IN_PUBLIC_DIRECTORY_METHOD_SIGNATURE, file);
          return false;
        } catch (e) {}
      };
      UtilLogger.isFileExists = function(downloadDirectory) {
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID && "file" === constants_1.ASSET_LOAD_METHOD) return jsb.reflection.callStaticMethod(LOGGER_CLASS, FILE_EXISTS_METHOD, FILE_EXISTS_METHOD_SIGNATURE, downloadDirectory);
          return false;
        } catch (e) {}
      };
      UtilLogger.init = function() {
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            cc.log("calling init");
            return jsb.reflection.callStaticMethod(LOGGER_CLASS, INITIALIZED, INITIALIZED_MEHTOD_SIGNATURE);
          }
        } catch (e) {}
      };
      UtilLogger.launchYoutube = function(videoId) {
        cc.log("calling launchYoutube");
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            cc.log("calling launchYoutube 1111");
            return jsb.reflection.callStaticMethod(LOGGER_CLASS, LAUNCH_YOUTUBE_METHOD, LAUNCH_YOUTUBE_METHOD_SIGNATURE, videoId);
          }
        } catch (e) {}
      };
      UtilLogger.checkIfUrlDownloaded = function(url, downloadDirectory) {
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID && "file" === constants_1.ASSET_LOAD_METHOD) return jsb.reflection.callStaticMethod(LOGGER_CLASS, CHECK_URL_DOWNLOADED_METHOD, CHECK_URL_DOWNLOADED_METHOD_SIGNATURE, url, downloadDirectory);
          return null;
        } catch (e) {}
      };
      UtilLogger.isNetworkAvailable = function() {
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID && "file" === constants_1.ASSET_LOAD_METHOD) return jsb.reflection.callStaticMethod(LOGGER_CLASS, IS_NETWORK_AVAILABLE_METHOD, IS_NETWORK_AVAILABLE_METHOD_SIGNATURE);
          return false;
        } catch (e) {}
      };
      UtilLogger.getCountryCode = function() {
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(LOGGER_CLASS, GET_COUNTRY_CODE_METHOD, GET_COUNTRY_CODE_METHOD_SIGNATURE);
        } catch (e) {}
      };
      UtilLogger.requestOtp = function(requestOtpText) {
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            cc.log("Request Otp event", requestOtpText);
            jsb.reflection.callStaticMethod(LOGGER_CLASS, REQUEST_OTP_METHOD, REQUEST_OTP_METHOD_SIGNATURE, requestOtpText);
          }
        } catch (e) {}
      };
      UtilLogger.verifyOtp = function(verifyOtpText) {
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            cc.log("Verify Otp event", verifyOtpText);
            jsb.reflection.callStaticMethod(LOGGER_CLASS, VERIFY_OTP_METHOD, VERIFY_OTP_METHOD_SIGNATURE, verifyOtpText);
          }
        } catch (e) {}
      };
      UtilLogger.syncFmcTokenForUsers = function() {
        var u = profile_1.User.getUserIds() || [];
        var userIds = u.join(",");
        console.log("syncFmcTokenForUsers:" + userIds);
        var mode = parseInt(profile_1.default.getValue(profile_1.CURRENTMODE));
        try {
          if (mode != constants_1.Mode.School && cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            cc.log("sync fmc userIds", userIds);
            jsb.reflection.callStaticMethod(LOGGER_CLASS, SYNC_FMC_METHOD, SYNC_FMC_METHOD_SIGNATURE, userIds);
          }
        } catch (e) {
          console.log(e);
        }
      };
      UtilLogger.subscribeToTopic = function(topicId) {
        try {
          var mode = parseInt(profile_1.default.getValue(profile_1.CURRENTMODE));
          if (mode != constants_1.Mode.School && cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID && topicId && topicId.length > 0) {
            cc.log("subscribe to topic", topicId);
            jsb.reflection.callStaticMethod(LOGGER_CLASS, SUBSCRIBE_TOPIC_METHOD, SUBSCRIBE_TOPIC_METHOD_SIGNATURE, topicId);
          }
        } catch (e) {}
      };
      UtilLogger.login = function(email, password) {
        cc.log("login using email: " + email + " and password: " + password);
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            -1 === email.indexOf("@") && (email += "@gmail.com");
            return jsb.reflection.callStaticMethod(LOGGER_CLASS, LOGIN_METHOD, LOGIN_METHOD_SIGNATURE, email, password);
          }
        } catch (e) {}
      };
      UtilLogger.logout = function() {
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(LOGGER_CLASS, LOGOUT_METHOD, LOGOUT_METHOD_SIGNATURE);
        } catch (e) {}
      };
      UtilLogger.fetchStudents = function(schoolId, sectionId) {
        cc.log("fetch Students: " + schoolId + " and password: " + sectionId);
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(LOGGER_CLASS, FETCH_STUDENTS_METHOD, FETCH_STUDENTS_METHOD_SIGNATURE, schoolId, sectionId);
        } catch (e) {}
      };
      UtilLogger.fetchStudentById = function(studentId) {
        cc.log("fetch Students: " + studentId);
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(LOGGER_CLASS, FETCH_CURRENT_USER_METHOD, FETCH_CURRENT_USER_METHOD_SIGNATURE, studentId);
        } catch (e) {}
      };
      UtilLogger.findSchool = function(email) {
        cc.log("find school using email: " + email);
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(LOGGER_CLASS, FIND_SCHOOL_METHOD, FIND_SCHOOL_METHOD_SIGNATURE, email);
        } catch (e) {}
      };
      UtilLogger.fetchSections = function(schoolId) {
        cc.log("fetch Sections: " + schoolId);
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(LOGGER_CLASS, FETCH_SECTIONS_METHOD, FETCH_SECTIONS_METHOD_SIGNATURE, schoolId);
        } catch (e) {}
      };
      UtilLogger.historyProgress = function(chapterId, chapterName, lessonId, lessonName, progressId, school, section, subjectCode, score, assignmentId) {
        cc.log("historyProgress for: " + chapterId + "-" + chapterName + "-" + lessonId + "-" + progressId);
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(LOGGER_CLASS, HISTORICAL_PROGRESS_METHOD, HISTORICAL_PROGRESS_METHOD_SIGNATURE, chapterId, chapterName, lessonId, lessonName, progressId, school, section, subjectCode, score, assignmentId);
        } catch (e) {}
      };
      UtilLogger.syncProfile = function(schoolId, sectionId, studentId, profile, progressId) {
        cc.log("syncProfile for: " + schoolId + "-" + sectionId + "-" + studentId + "-" + progressId);
        try {
          var mode = parseInt(profile_1.default.getValue(profile_1.CURRENTMODE));
          if (mode === constants_1.Mode.School && cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(LOGGER_CLASS, SYNC_PROFILE_METHOD, SYNC_PROFILE_METHOD_SIGNATURE, schoolId, sectionId, studentId, profile, progressId);
        } catch (e) {}
      };
      UtilLogger.processLinkStudent = function(sectionId, schoolId, studentId, schoolName, sectionName, progressId, otpCode, profile) {
        void 0 === otpCode && (otpCode = null);
        void 0 === profile && (profile = null);
        var user = profile_1.User.getCurrentUser();
        if (null != user && !!profile) for (var key in profile.lessonProgressMap) {
          var _course = profile.lessonProgressMap[key][COURSE];
          user.lessonProgressMap.has(key) && user.lessonProgressMap.get(key).score > profile.lessonProgressMap[key][SCORE] ? this.score = user.lessonProgressMap.get(key).score : this.score = profile.lessonProgressMap[key][SCORE];
          var _assignments = profile.lessonProgressMap[key][ASSIGNMENTIDS];
          var _date = profile.lessonProgressMap[key][DATE];
          if (key == _course + "_PreQuiz") {
            var cpm = user.courseProgressMap.get(_course);
            cpm.updateChapterId(_course + "00");
            user.courseProgressMap.get(_course).lessonPlanIndex++;
          }
          user.lessonProgressMap.set(key, new profile_1.LessonProgressClass(this.score, 1, _course, _assignments.toString(), _date));
        }
        if (null != user && !!schoolId && !!sectionId && !!studentId && !user.isConnected) {
          user.sectionId = sectionId;
          user.schoolId = schoolId;
          user.studentId = studentId;
          user.schoolName = schoolName;
          user.sectionName = sectionName;
          user.isConnected = true;
          !progressId ? "" : profile_1.User.replaceUserID(user.id, progressId);
          user.id = !progressId ? user.id : progressId;
          user.storeUser();
          var request = {
            teacherId: user.schoolId,
            sectionId: user.sectionId,
            studentId: user.id,
            studentName: user.name,
            firebaseStudentId: user.studentId,
            otpCode: otpCode
          };
          UtilLogger.logChimpleEvent(chimple_1.ACCEPT_TEACHER_REQUEST, request);
          UtilLogger.subscribeToTopic("assignment-" + user.schoolId + "-" + user.sectionId);
          UtilLogger.subscribeToTopic("assignment-" + user.schoolId);
          var key = "teacher_for_student_" + user.id;
          var teachersForStudent = JSON.parse(cc.sys.localStorage.getItem(key) || "[]");
          -1 == teachersForStudent.indexOf(user.sectionName) && teachersForStudent.push(user.sectionName);
          cc.sys.localStorage.setItem(key, JSON.stringify(teachersForStudent));
        }
      };
      UtilLogger.logToDaily = function(deviceId, header, event) {
        var curDate = new Date();
        var month = 1 == curDate.getMonth().toString().length ? "0" + (curDate.getMonth() + 1).toString() : (curDate.getMonth() + 1).toString();
        var year = curDate.getFullYear();
        var day = 1 == curDate.getDate().toString().length ? "0" + curDate.getDate() : curDate.getDate().toString();
        var lastFileGeneratedName = cc.sys.localStorage.getItem("lastFileGeneratedName") || null;
        var fileName = null == lastFileGeneratedName ? deviceId + "#" + profile_1.User.createUUID() + "-" + day + month + year + ".txt" : lastFileGeneratedName;
        cc.sys.localStorage.setItem("lastFileGeneratedName", fileName);
        if (UtilLogger.isFileExistsInPublicDirectory("Documents/events/processed/" + fileName)) {
          fileName = deviceId + "#" + profile_1.User.createUUID() + "-" + day + month + year + ".txt";
          cc.sys.localStorage.setItem("lastFileGeneratedName", fileName);
          cc.log("Generating new file " + fileName);
        }
        cc.log("logToDaily for: " + event + "-" + fileName);
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(LOGGER_CLASS, LOG_DAILY_METHOD, LOG_DAILY_METHOD_SIGNATURE, header, event, fileName);
        } catch (e) {}
      };
      UtilLogger._storageDirectory = null;
      UtilLogger._currentUserId = null;
      UtilLogger._currentDeviceId = null;
      UtilLogger._isfireBaseInitialized = false;
      return UtilLogger;
    }();
    exports.default = UtilLogger;
    cc._RF.pop();
  }, {
    "../../chimple": "chimple",
    "./lib/constants": "constants",
    "./lib/profile": "profile",
    "firebase/analytics": void 0,
    "firebase/app": void 0
  } ],
  util: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b6786RxBpJI57Hig0e66N7e", "util");
    "use strict";
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
    exports.Util = exports.TouchEvents = exports.SUBPACKAGES = exports.STICKER_REWARD = exports.STICKER_BOOK = exports.NUMBER_NAME = exports.REWARD_BACKGROUNDS = exports.REWARD_CHARACTERS = exports.REWARD_TYPES = exports.INVENTORY_ICONS = exports.INVENTORY_ANIMATIONS = exports.INVENTORY_SAVE_CONSTANTS = exports.INVENTORY_DATA = void 0;
    var chimple_label_1 = require("./chimple-label");
    var help_1 = require("./help");
    var helper_1 = require("./helper");
    var lessonController_1 = require("./lessonController");
    var config_1 = require("./lib/config");
    var constants_1 = require("./lib/constants");
    var profile_1 = require("./lib/profile");
    var util_logger_1 = require("./util-logger");
    var friend_1 = require("./friend");
    var Overflow = cc.Label.Overflow;
    var HorizontalAlign = cc.Label.HorizontalAlign;
    var VerticalAlign = cc.Label.VerticalAlign;
    var loading_1 = require("./loading");
    var ParseImageDownloader_1 = require("./services/ParseImageDownloader");
    exports.INVENTORY_DATA = [ [ "hat1-hat1", "hat1-hat2", "hat1-hat3", "hat1-hat4", "hat1-hat5", "hat1-hat6", "hat1-hat7", "hat1-hat8", "hat1-hat9", "hat1-hat10" ], [ "handacc-hand1", "handacc-hand2", "handacc-hand3", "handacc-hand4", "handacc-hand5", "handacc-hand6", "handacc-hand7", "handacc-hand8" ], [ "glassacc-glass1", "glassacc-glass2", "glassacc-glass3", "glassacc-glass4", "glassacc-glass5", "glassacc-glass6", "glassacc-glass7", "glassacc-glass8", "glassacc-glass9", "glassacc-glass10" ], [ "left_shoe-shoe1", "left_shoe-shoe2", "left_shoe-shoe3", "left_shoe-shoe4", "left_shoe-shoe5", "left_shoe-shoe6", "left_shoe-shoe7", "left_shoe-shoe8", "left_shoe-shoe9", "left_shoe-shoe10" ], [ "neck_acc-neck1", "neck_acc-neck2", "neck_acc-neck3", "neck_acc-neck4", "neck_acc-neck5", "neck_acc-neck6", "neck_acc-neck7", "neck_acc-neck8", "neck_acc-neck9", "neck_acc-neck10" ] ];
    exports.INVENTORY_SAVE_CONSTANTS = [ "hat1", "handacc", "glassacc", "left_shoe", "neck_acc" ];
    exports.INVENTORY_ANIMATIONS = [ "hat", "hand", "glass", "leg", "neck" ];
    exports.INVENTORY_ICONS = {
      hat1: "rewards/hat_icons/",
      handacc: "rewards/hand_icons/",
      glassacc: "rewards/glass_icons/",
      left_shoe: "rewards/shoe_icons/",
      neck_acc: "rewards/neck_icons/"
    };
    exports.REWARD_TYPES = [ "character", "background", "achievement", "inventory", "lesson" ];
    exports.REWARD_CHARACTERS = [ "chimp", "bear", "camel", "cat", "dog", "duck", "hippo", "horse", "koala", "rabbit", "tiger" ];
    exports.REWARD_BACKGROUNDS = [ "camp", "underwater", "beach", "forest", "city", "desert", "fair", "garden", "mountain", "snow", "village" ];
    exports.NUMBER_NAME = [ "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine" ];
    exports.STICKER_BOOK = [ "rewardsticker0000", "rewardsticker0001" ];
    exports.STICKER_REWARD = [ [ "ap_puzzle10_bush1_puzzle", "ap_puzzle10_bush2_puzzle", "ap_puzzle10_bush3_puzzle", "ap_puzzle10_camel1_puzzle", "ap_puzzle10_camel2_puzzle" ], [ "bulldozer_part1", "bulldozer_part2", "bulldozer_part3", "bulldozer_part4", "bulldozer_part5" ] ];
    exports.SUBPACKAGES = "subpackages";
    var numberMappings = {
      "+": "plus",
      "-": "minus",
      "&": "and",
      "=": "equals",
      x: "times"
    };
    var TouchEvents;
    (function(TouchEvents) {
      TouchEvents["TOUCH_START"] = "touchstart";
      TouchEvents["TOUCH_END"] = "touchend";
      TouchEvents["TOUCH_MOVE"] = "touchmove";
      TouchEvents["TOUCH_CANCEL"] = "touchCancel";
    })(TouchEvents = exports.TouchEvents || (exports.TouchEvents = {}));
    var DOWNLOAD_STARTED = "DOWNLOAED_STARTED";
    var DOWNLOAD_SUCCESS = "DOWNLOAD_SUCCESS";
    var DOWNLOAD_FAILED = "DOWNLOAD_FAILED";
    var Util = function() {
      function Util() {}
      Util.shuffle = function(arr) {
        var ctr = arr.length;
        var temp;
        var index;
        while (ctr > 0) {
          index = Math.floor(Math.random() * ctr);
          ctr--;
          temp = arr[ctr];
          arr[ctr] = arr[index];
          arr[index] = temp;
        }
        return arr;
      };
      Util.shuffleByMapSortMap = function(unshuffled) {
        return unshuffled.map(function(a) {
          return {
            sort: Math.random(),
            value: a
          };
        }).sort(function(a, b) {
          return a.sort - b.sort;
        }).map(function(a) {
          return a.value;
        });
      };
      Util.randomBetween = function(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      };
      Util.pickRandomElements = function(array, howManyElements) {
        var resultArray = [];
        for (var i = 0; i < howManyElements; i++) {
          var shuffledArray = Util.shuffle(array);
          var index = Math.floor(Math.random() * shuffledArray.length);
          resultArray.push(shuffledArray.splice(index, 1));
        }
        return resultArray;
      };
      Util.initText = function(parentNode, textFont, text, fontSize, fontColor, showLabel, adj, horizontalAlign, verticalAlign, anchorPoint, outlineEnable, outlineWidth) {
        void 0 === text && (text = "");
        void 0 === fontSize && (fontSize = "10");
        void 0 === fontColor && (fontColor = null);
        void 0 === showLabel && (showLabel = true);
        void 0 === adj && (adj = new cc.Vec2(0, 0));
        void 0 === horizontalAlign && (horizontalAlign = HorizontalAlign.CENTER);
        void 0 === verticalAlign && (verticalAlign = VerticalAlign.CENTER);
        void 0 === anchorPoint && (anchorPoint = new cc.Vec2(.5, .5));
        void 0 === outlineEnable && (outlineEnable = false);
        void 0 === outlineWidth && (outlineWidth = 0);
        var qLabelNode = new cc.Node(text);
        var label = qLabelNode.addComponent(chimple_label_1.default);
        label.string = showLabel ? text : "";
        label.overflow = Overflow.NONE;
        var defaultFontColor = helper_1.DEFAULT_FONT_COLOR;
        !fontColor || (defaultFontColor = defaultFontColor.fromHEX(fontColor));
        qLabelNode.color = defaultFontColor;
        var fSize = parseInt(fontSize);
        label.fontSize = fSize;
        label.horizontalAlign = horizontalAlign;
        label.verticalAlign = verticalAlign;
        label.lineHeight = fSize + 100;
        qLabelNode.setAnchorPoint(anchorPoint);
        qLabelNode.position = new cc.Vec2(adj.x, adj.y);
        if (outlineEnable) {
          var outLine = qLabelNode.addComponent(cc.LabelOutline);
          outLine.width = outlineWidth;
        }
        parentNode.addChild(qLabelNode);
        return qLabelNode;
      };
      Util.isBetweenRange = function(input, min, max) {
        return input >= min && input <= max;
      };
      Util.chunk = function(array, chunkSize) {
        var R = [];
        for (var i = 0; i < array.length; i += chunkSize) R.push(array.slice(i, i + chunkSize));
        return R;
      };
      Util.chunkByIncreaseSize = function(array, startChunkSize, increment) {
        var R = [];
        var chunkSize = startChunkSize;
        var counter = 1;
        for (var i = 0; i < array.length; i = chunkSize + counter * increment) {
          R.push(array.slice(i, i + chunkSize + counter * increment));
          counter++;
        }
        return R;
      };
      Util.speakEquation = function(nums, callbackOnEnd) {
        var index = 0;
        var audios = nums.map(function(val) {
          var num = val in numberMappings ? numberMappings[val] : "d_" + val;
          num = num.endsWith(".mp3") ? num : num + ".mp3";
          return config_1.default.dir + profile_1.default.lang + "-help/" + helper_1.NUMBER_VOICE + num;
        });
        this.speakOneByOne(audios, 0, callbackOnEnd);
      };
      Util.speakOneByOne = function(audios, index, callbackOnEnd) {
        var _this = this;
        this.speak(audios[index], function() {
          callbackOnEnd(index);
          ++index < audios.length && _this.speakOneByOne(audios, index, callbackOnEnd);
        });
      };
      Util.speak = function(audio, callback) {
        var _this = this;
        Util.load(audio, function(err, clip) {
          _this.speakClip(clip, callback);
        }, true);
      };
      Util.speakClip = function(clip, callback) {
        if (null != clip) if (Array.isArray(clip) && 0 === clip.length) callback(); else {
          var audioId = Util.play(clip, false);
          -1 != audioId ? cc.audioEngine.setFinishCallback(audioId, callback) : callback();
        } else callback();
      };
      Util.speakMusic = function(audio, callback) {
        Util.load(audio, function(err, clip) {
          if (null != clip) if (Array.isArray(clip) && 0 === clip.length) callback(); else {
            var audioId = cc.audioEngine.playMusic(clip, false);
            cc.audioEngine.setFinishCallback(audioId, callback);
          } else callback();
        }, true);
      };
      Util.loadNumericSound = function(text, callBack) {
        var fileName = "d_" + text.toLowerCase();
        fileName = fileName.endsWith(".mp3") ? fileName : fileName + ".mp3";
        var location = config_1.default.dir + profile_1.default.lang + "-help/" + helper_1.NUMBER_VOICE;
        var fullFilePath = location + fileName;
        Util.load(fullFilePath, function(err, clip) {
          callBack(err || null === clip ? null : clip);
        }, true);
      };
      Util.loadsPhonicsOrLetter = function(audio, callback) {
        audio = audio.replace(".m4a", "");
        audio = audio.endsWith(".mp3") ? audio : audio + ".mp3";
        var phonicsLoc = config_1.default.dir + helper_1.PHONIC_VOICE + audio;
        Util.load(phonicsLoc, function(err, clip) {
          if (err || null == clip) {
            if (null != err) {
              var letterLoc = config_1.default.dir + helper_1.LETTER_VOICE + audio;
              Util.load(letterLoc, function(err, clip) {
                err || null == clip ? null != err && callback(null) : callback(clip);
              }, true);
            }
          } else callback(clip);
        }, true);
      };
      Util.loadsLetter = function(audio, callback) {
        var _this = this;
        audio = audio.replace(".m4a", "");
        audio = audio.endsWith(".mp3") ? audio : audio + ".mp3";
        var letterLoc = config_1.default.dir + helper_1.LETTER_VOICE + audio;
        Util.load(letterLoc, function(err, clip) {
          err || null == clip ? null != err && _this.loadGameSound(audio, callback) : callback(clip);
        }, true);
      };
      Util.loadGameSound = function(path, callBack) {
        var filePath = path.startsWith(config_1.default.dir) ? path : "literacy" != config_1.default.i.course.type ? config_1.default.dir + (profile_1.default.lang + "-help/") + config_1.default.i.game + "/" + path : config_1.default.dir + (config_1.default.i.currentGameLessonId + "/res/") + path;
        var fullFilePath = filePath + (path.endsWith(".mp3") || path.endsWith(".m4a") ? "" : ".mp3");
        Util.load(fullFilePath, function(err, clip) {
          err && cc.log(err);
          callBack(err || null === clip ? null : clip);
        }, true);
      };
      Util.loadGameAudioOrPhonics = function(audio, callback) {
        var _this = this;
        audio = audio.replace(".m4a", "");
        audio = audio.endsWith(".mp3") ? audio : audio + ".mp3";
        var phonicsLoc = config_1.default.dir + helper_1.PHONIC_VOICE + audio;
        Util.load(phonicsLoc, function(err, clip) {
          null != err && null == clip ? _this.playGameSound(audio, callback) : err || null == clip ? _this.loadGameSound(audio, callback) : callback(clip);
        }, true);
      };
      Util.loadTexture = function(path, callBack, needsRelease) {
        void 0 === needsRelease && (needsRelease = true);
        path = path.endsWith(".png") || path.endsWith(".jpg") ? path : path + ".png";
        var fullFilePath = path.startsWith(config_1.default.dir) ? path : config_1.default.dir + (config_1.default.i.currentGameLessonId + "/res/") + path;
        Util.load(fullFilePath, function(err, texture) {
          !texture || err ? err && callBack(null) : callBack(texture, err);
        }, needsRelease);
      };
      Util.flattenDeep = function(arr) {
        var _this = this;
        return arr.reduce(function(acc, val) {
          return Array.isArray(val) ? acc.concat(_this.flattenDeep(val)) : acc.concat(val);
        }, []);
      };
      Util.randomElements = function(array, n) {
        var shuffled = array.sort(function() {
          return .5 - Math.random();
        });
        var selected = shuffled.slice(0, n);
        return selected;
      };
      Util.takePictureFromCamera = function(callback) {
        var _this = this;
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openCamera", "()V");
        var checkCount = 10;
        var result = null;
        return function() {
          return __awaiter(_this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              switch (_a.label) {
               case 0:
                if (!(checkCount > 0 && null == result)) return [ 3, 2 ];
                return [ 4, Util.checkCameraResult() ];

               case 1:
                result = _a.sent();
                checkCount--;
                return [ 3, 0 ];

               case 2:
                callback(result);
                return [ 2 ];
              }
            });
          });
        }();
      };
      Util.checkCameraResult = function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            var result = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "checkCameraResult", "()Ljava/lang/String;");
            resolve(result);
            console.log("Returned promise");
          }, 6e3);
        });
      };
      Util.shareText = function(text) {
        try {
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod("org/chimple/bahama/AppActivity", "shareText", "(Ljava/lang/String;)V", text);
        } catch (e) {}
      };
      Util.getRandomPosition = function(array, removeTaken) {
        var randomIndex;
        var coordinates;
        randomIndex = Util.randomBetween(0, array.length - 1);
        coordinates = array[randomIndex];
        removeTaken && array.splice(randomIndex, 1);
        return coordinates;
      };
      Util.generatePositionsArray = function(maxX, maxY, safeRadius, irregularity) {
        var positionsArray = [];
        var r, c;
        var rows;
        var columns;
        rows = Math.floor(maxY / safeRadius);
        columns = Math.floor(maxX / safeRadius);
        for (r = 1; r <= rows; r += 1) for (c = 1; c <= columns; c += 1) positionsArray.push({
          x: Math.round(maxX * c / columns) + Util.randomBetween(-1 * irregularity, irregularity) - maxX / 2 - 50,
          y: Math.round(maxY * r / rows) + Util.randomBetween(-1 * irregularity, irregularity) - maxY / 2
        });
        return positionsArray;
      };
      Util.speakLetter = function(audio, callback) {
        var letterLoc = config_1.default.dir + helper_1.LETTER_VOICE + audio;
        Util.load(letterLoc, function(err, clip) {
          if (err || null == clip) null != err && callback(); else {
            var audioId = Util.play(clip, false);
            -1 !== audioId ? cc.audioEngine.setFinishCallback(audioId, callback) : callback();
            cc.audioEngine.setFinishCallback(audioId, callback);
          }
        }, true);
      };
      Util.speakPhonicsOrLetter = function(audio, callback) {
        var _this = this;
        audio = audio.replace(".m4a", "");
        audio = audio.endsWith(".mp3") ? audio : audio + ".mp3";
        var phonicsLoc = config_1.default.dir + helper_1.PHONIC_VOICE + audio;
        Util.load(phonicsLoc, function(err, clip) {
          if (err || null == clip) null != err && _this.speakLetter(audio, callback); else {
            var audioId = Util.play(clip, false);
            -1 !== audioId ? cc.audioEngine.setFinishCallback(audioId, callback) : _this.speakLetter(audio, callback);
            cc.audioEngine.setFinishCallback(audioId, callback);
          }
        }, true);
      };
      Util.speakGameAudioOrPhonics = function(audio, callback) {
        var _this = this;
        audio = audio.replace(".m4a", "");
        audio = audio.endsWith(".mp3") ? audio : audio + ".mp3";
        var phonicsLoc = config_1.default.dir + helper_1.PHONIC_VOICE + audio;
        Util.load(phonicsLoc, function(err, clip) {
          if (null != err && null == clip) _this.playGameSound(audio, callback); else if (!err && null != clip) {
            var audioId = Util.play(clip, false);
            -1 !== audioId ? cc.audioEngine.setFinishCallback(audioId, callback) : _this.playGameSound(audio, callback);
            cc.audioEngine.setFinishCallback(audioId, callback);
          }
        }, true);
      };
      Util.playGameSound = function(nameOfSound, callback) {
        Util.loadGameSound(nameOfSound, function(clip) {
          if (null != clip) {
            var audioId = Util.play(clip, false);
            -1 != audioId && cc.audioEngine.setFinishCallback(audioId, function() {
              callback();
            });
          } else callback();
        });
      };
      Util.speakLettersOrWords = function(audio, callback) {
        audio = audio.replace(".m4a", "");
        audio = audio.endsWith(".mp3") ? audio : audio + ".mp3";
        var letterLoc = config_1.default.dir + helper_1.LETTER_VOICE + audio;
        Util.loadGameSound(letterLoc, function(clip) {
          var audioId = -1;
          null != clip && (audioId = cc.audioEngine.play(clip, false, 1));
          if (audioId >= 0) cc.audioEngine.setFinishCallback(audioId, callback); else {
            var wordLoc = config_1.default.dir + config_1.default.i.course.id + "/res/" + audio;
            Util.loadGameSound(wordLoc, function(clip) {
              null != clip && (audioId = cc.audioEngine.play(clip, false, 1));
              audioId >= 0 ? cc.audioEngine.setFinishCallback(audioId, callback) : null != callback && callback();
            });
          }
        });
      };
      Util.freeResources = function() {
        for (var i = this._resources.length - 1; i >= 0; i--) {
          try {
            cc.log("free resource ----\x3e:", this._resources[i]);
            cc.resources.release(this._resources[i]);
          } catch (e) {}
          this._resources.splice(i, 1);
        }
        cc.log("resources left: ---\x3e", this._resources.length);
      };
      Util.load = function(res, callback, needsRelease) {
        void 0 === needsRelease && (needsRelease = true);
        Util.bundles.get(profile_1.default.lang + "-help") || cc.assetManager.loadBundle(profile_1.default.lang + "-help", function(err, bundle) {
          Util.bundles.set(profile_1.default.lang + "-help", bundle);
        });
        var resArray = res.split("/");
        var courseName = resArray[0];
        var lessonName = resArray[1];
        var resDir = resArray.slice(2).join("/");
        var resName = resDir.split(".")[0];
        var bundle = this.bundles.get("course" == lessonName ? courseName : lessonName);
        var ext = resDir.split(".")[1];
        "mp3" === ext || "m4a" === ext ? bundle.load(resName, cc.AudioClip, function(err, asset) {
          err && cc.log(JSON.stringify(err));
          callback(err, asset);
        }) : "png" === ext || "jpg" === ext ? bundle.load(resName, cc.Texture2D, function(err, asset) {
          err && cc.log(JSON.stringify(err));
          callback(err, asset);
        }) : bundle.load(resName, function(err, asset) {
          err && cc.log(JSON.stringify(err));
          callback(err, asset);
        });
      };
      Util.removeAlli18NMapping = function() {
        Util._i18NMap.clear();
      };
      Util.loadi18NMapping = function(callBack) {
        var jsonFile = "lang/" + profile_1.default.lang + "/i18n";
        cc.resources.load(jsonFile, function(err, jsonAsset) {
          if (err || !jsonAsset) callBack(); else {
            var data_1 = jsonAsset instanceof cc.JsonAsset ? jsonAsset.json : jsonAsset;
            !data_1 || Object.keys(data_1).forEach(function(key) {
              var value = data_1[key];
              Util._i18NMap.set(key.toLowerCase(), value);
            });
            callBack();
          }
        });
      };
      Util.loadDirectLessonWithLink = function(data, node) {
        var config = config_1.default.i;
        config.loadSingleCourseJson(data.courseid, function() {
          config.course = config.curriculum.get(data.courseid);
          config.chapter = config.course.chapters.find(function(c) {
            return c.id == data.chapterid;
          });
          config.lesson = config.chapter.lessons.find(function(l) {
            return l.id == data.lessonid;
          });
          config.lesson.assignmentId = data.assignmentid || null;
          config.lesson.mlPartnerId = data.mlpartnerid || null;
          config.lesson.mlClassId = data.mlclassid || null;
          config.lesson.mlStudentId = data.mlstudentid || null;
          config.microLinkData = data;
          lessonController_1.default.preloadLesson(node, function(err) {
            err ? console.log(err) : config_1.default.loadScene("common/scenes/lessonController");
          });
        });
      };
      Util.loadLesson = function(lesson, loading, thisNode) {
        var config = config_1.default.i;
        config.course = lesson.chapter.course;
        config.chapter = lesson.chapter;
        config.lesson = lesson;
        loading.getComponent(loading_1.default).allowCancel = true;
        loading.active = true;
        lessonController_1.default.preloadLesson(thisNode, function(err) {
          err ? loading.getComponent(loading_1.default).addMessage(Util.i18NText("Error downloading content. Please connect to internet and try again"), true, true) : loading && loading.activeInHierarchy && config.pushScene("common/scenes/lessonController");
        });
      };
      Util.i18NText = function(key) {
        if ("string" === typeof key) return Util._i18NMap.has(key.toLowerCase()) ? this._i18NMap.get(key.toLowerCase()) : key;
        return key;
      };
      Util.i18NNumberConvert = function(lbString, startWithDigit) {
        void 0 === startWithDigit && (startWithDigit = true);
        var regExCondition = startWithDigit ? /^\d/.test(lbString) : /\d/.test(lbString);
        if (regExCondition) {
          var numbers = lbString.split("");
          numbers = numbers.map(function(n) {
            return Util.i18NText(n);
          });
          console.log("converted ", Util.i18NText(numbers.join("")));
          return Util.i18NText(numbers.join(""));
        }
        return lbString;
      };
      Util.showHelp = function(from, to, callBack, playAudio) {
        void 0 === callBack && (callBack = null);
        void 0 === playAudio && (playAudio = true);
        var config = config_1.default.getInstance();
        var lessonNode = cc.Canvas.instance.node;
        playAudio && lessonController_1.default.friend.speakHelp();
        1 == config.problem && null != from && null != to ? cc.resources.load("prefabs/help", function(err, prefab) {
          if (err) null != callBack && callBack(); else {
            var help = cc.instantiate(prefab);
            var helpComp = help.getComponent(help_1.default);
            null != helpComp ? helpComp.initNodes(from, to, callBack) : null != callBack && callBack();
            lessonNode.addChild(help);
          }
        }) : null != callBack && callBack();
      };
      Util.computeTimeDiff = function(append, startDate, endDate) {
        void 0 === startDate && (startDate = new Date());
        void 0 === endDate && (endDate = new Date());
        var diff = endDate.getTime() - startDate.getTime();
        cc.log(append + " -> computeTimeDiff in milliseconds " + diff);
      };
      Util.shuffleGenerator = function(array) {
        var i;
        return __generator(this, function(_a) {
          switch (_a.label) {
           case 0:
            i = array.length;
            _a.label = 1;

           case 1:
            if (!i--) return [ 3, 3 ];
            return [ 4, array.splice(Math.floor(Math.random() * (i + 1)), 1)[0] ];

           case 2:
            _a.sent();
            return [ 3, 1 ];

           case 3:
            return [ 2 ];
          }
        });
      };
      Util.loadFriend = function(callback) {
        var user = profile_1.User.getCurrentUser();
        var char = user ? user.currentCharacter : "chimp";
        cc.resources.load("prefabs/friend/" + char, function(err, prefab) {
          null != err && cc.log(err);
          var friendNode = null != prefab ? cc.instantiate(prefab) : null;
          null != callback && callback(friendNode);
        });
      };
      Util.loadAccessoriesAndEquipAcc = function(accessoriesNode, friendNode) {
        if (profile_1.User.getCurrentUser()) {
          accessoriesNode.x = 10 * cc.winSize.width;
          var accArmature = void 0;
          for (var i = 0; i < exports.INVENTORY_DATA.length; i++) {
            accArmature = accessoriesNode.children[i].getComponent(dragonBones.ArmatureDisplay);
            for (var j = 0; j < exports.INVENTORY_DATA[i].length; j++) accArmature.armatureName = exports.INVENTORY_DATA[i][j].split("-")[1];
          }
          Util.equipAcc(friendNode);
          return accArmature;
        }
        accessoriesNode.active = false;
      };
      Util.equipAcc = function(friendNode) {
        var factory = dragonBones.CCFactory.getInstance();
        var _armature = friendNode.getComponent(friend_1.default).db.armature();
        exports.INVENTORY_SAVE_CONSTANTS.forEach(function(key) {
          var characterAndSlot = profile_1.User.getCurrentUser().currentCharacter.concat("-", key);
          var newHatName = profile_1.User.getCurrentUser().inventory[characterAndSlot];
          if (void 0 != newHatName) {
            _armature.getSlot(key).childArmature = factory.buildArmature(newHatName);
            "left_shoe" === key && (_armature.getSlot("right_shoe").childArmature = factory.buildArmature(newHatName));
          }
        });
      };
      Util.playSfx = function(audioClip, isMusic, loop) {
        void 0 === isMusic && (isMusic = false);
        void 0 === loop && (loop = false);
        if (0 == profile_1.default.getItem(profile_1.SFX_OFF)) try {
          return isMusic ? cc.audioEngine.playMusic(audioClip, loop) : cc.audioEngine.playEffect(audioClip, loop);
        } catch (e) {}
        return -1;
      };
      Util.stopHelpAudio = function() {
        try {
          cc.audioEngine.stopEffect(this.helpAudioId);
          this.chimp && this.chimp.playAnimation("idle", 1);
        } catch (e) {
          cc.log(e);
        }
        return this.helpAudioId;
      };
      Util.play = function(audioClip, loop) {
        void 0 === loop && (loop = false);
        var audioId = -1;
        try {
          audioClip && (audioId = cc.audioEngine.playEffect(audioClip, loop));
        } catch (e) {
          cc.log(e);
        }
        return audioId;
      };
      Util.getSubpackages = function() {
        var subpackages = JSON.parse(cc.sys.localStorage.getItem(exports.SUBPACKAGES));
        return subpackages || [];
      };
      Util.addSubpackage = function(subpackage) {
        var subpackages = this.getSubpackages();
        subpackages.push(subpackage);
        cc.sys.localStorage.setItem(exports.SUBPACKAGES, JSON.stringify(subpackages));
      };
      Util.downloadIfNeeded = function(node, course, lesson, callbackOnExists) {
        var storageDir = course;
        var manifestPath = storageDir + "/" + lesson;
        var testFile = manifestPath + "/res/" + lesson + ".json";
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID && "file" === constants_1.ASSET_LOAD_METHOD && !jsb.fileUtils.isFileExist(testFile)) {
          util_logger_1.default.downloadFile("" + constants_1.COURSES_URL + manifestPath + ".zip", storageDir);
          var callback_1 = function() {
            cc.log("calling checkIfUrlDownloaded " + constants_1.COURSES_URL + manifestPath + ".zip");
            var isFileDownloaded = util_logger_1.default.checkIfUrlDownloaded("" + constants_1.COURSES_URL + manifestPath + ".zip", storageDir);
            if (isFileDownloaded == DOWNLOAD_FAILED || isFileDownloaded == DOWNLOAD_SUCCESS) {
              cc.director.getScheduler().unschedule(callback_1, node);
              if (isFileDownloaded == DOWNLOAD_SUCCESS) {
                Util.addSubpackage(manifestPath);
                callbackOnExists(true);
              } else callbackOnExists(false);
            }
          };
          cc.director.getScheduler().schedule(callback_1, node, 1);
        } else callbackOnExists(true);
      };
      Util.assignHomework = function(chapterId, lessonId, schoolId, sectionId, subjectId, studentId) {
        void 0 === studentId && (studentId = null);
        var updateInfo = {
          chapterId: chapterId,
          lessonId: lessonId,
          kind: "AssignHomeWork",
          schoolId: schoolId,
          studentId: studentId,
          subjectId: subjectId,
          sectionId: sectionId
        };
        return updateInfo;
      };
      Util.removeDuplicateMessages = function(data, messageType) {
        var messages = cc.sys.localStorage.getItem(messageType) || "[]";
        var jsonMessages = JSON.parse(messages);
        !data || jsonMessages.push(data);
        cc.log("requests", JSON.stringify(jsonMessages));
        return jsonMessages;
      };
      Util.unlockNextReward = function() {
        var user = profile_1.User.getCurrentUser();
        var unlockedRewards = user.unlockedRewards;
        var nextCharIndex = exports.REWARD_CHARACTERS.findIndex(function(char) {
          return !unlockedRewards[exports.REWARD_TYPES[0] + "-" + char];
        });
        if (0 == nextCharIndex) {
          var split = exports.INVENTORY_DATA[0][0].split("-");
          user.unlockRewardsForItem(exports.REWARD_TYPES[0] + "-" + exports.REWARD_CHARACTERS[0], 1);
          user.currentCharacter = exports.REWARD_CHARACTERS[0];
          user.updateInventory(exports.REWARD_CHARACTERS[0] + "-" + split[0], split[1]);
          user.unlockRewardsForItem(exports.REWARD_TYPES[3] + "-" + exports.REWARD_CHARACTERS[0] + "-" + exports.INVENTORY_DATA[0][0], 1);
          return exports.REWARD_TYPES[3] + "-" + exports.REWARD_CHARACTERS[0] + "-" + exports.INVENTORY_DATA[0][0];
        }
        var currentCharIndex = -1 == nextCharIndex ? exports.REWARD_CHARACTERS.length - 1 : nextCharIndex - 1;
        var currentChar_1 = exports.REWARD_CHARACTERS[currentCharIndex];
        var remainingInventory = [];
        exports.INVENTORY_DATA.forEach(function(val) {
          return remainingInventory = remainingInventory.concat(val);
        });
        var allInventoryCount = remainingInventory.length;
        remainingInventory = remainingInventory.filter(function(val) {
          return !(exports.REWARD_TYPES[3] + "-" + currentChar_1 + "-" + val in unlockedRewards);
        });
        if (0 == remainingInventory.length) {
          if (currentCharIndex + 1 < exports.REWARD_CHARACTERS.length) {
            user.unlockRewardsForItem(exports.REWARD_TYPES[0] + "-" + exports.REWARD_CHARACTERS[currentCharIndex + 1], 1);
            return exports.REWARD_TYPES[0] + "-" + exports.REWARD_CHARACTERS[currentCharIndex + 1];
          }
          return null;
        }
        if (remainingInventory.length < allInventoryCount / 2 && !(exports.REWARD_TYPES[1] + "-" + exports.REWARD_BACKGROUNDS[currentCharIndex] in unlockedRewards)) {
          user.unlockRewardsForItem(exports.REWARD_TYPES[1] + "-" + exports.REWARD_BACKGROUNDS[currentCharIndex], 1);
          return exports.REWARD_TYPES[1] + "-" + exports.REWARD_BACKGROUNDS[currentCharIndex];
        }
        var inventoryItem = remainingInventory[Math.floor(Math.random() * remainingInventory.length)];
        var split = inventoryItem.split("-");
        user.unlockRewardsForItem(exports.REWARD_TYPES[3] + "-" + exports.REWARD_CHARACTERS[currentCharIndex] + "-" + inventoryItem, 1);
        return exports.REWARD_TYPES[3] + "-" + exports.REWARD_CHARACTERS[currentCharIndex] + "-" + inventoryItem;
      };
      Util.preloadStartScene = function(node, loading) {
        var loadingComp = loading.getComponent(loading_1.default);
        loadingComp.allowCancel = false;
        loading.active = true;
        config_1.default.i.loadCourseJsons(profile_1.User.getCurrentUser(), node, function() {
          cc.assetManager.loadBundle("menu", function(err, loadedBundle) {
            config_1.default.i.startAction = config_1.StartAction.Start;
            loadedBundle.preloadScene("menu/start/scenes/start", function(err) {
              config_1.default.i.pushScene("menu/start/scenes/start", "menu", null);
            });
          });
        });
      };
      Util.loadImage = function(photoNode, imageUrl, saveAs) {
        ParseImageDownloader_1.ParseImageDownloader.loadImageForSchool(imageUrl, saveAs, function(texture) {
          if (!!texture && photoNode) {
            var spriteFrame = new cc.SpriteFrame(texture);
            var photo = photoNode.getChildByName("photo");
            if (photo) {
              var maskNode = photo.getChildByName("mask");
              if (maskNode) {
                var image = maskNode.getChildByName("image");
                image.getComponent(cc.Sprite).spriteFrame = spriteFrame;
              }
            }
          }
        });
      };
      Util.getHash = function(input) {
        var hash = 0, len = input ? input.length : 0;
        for (var i = 0; i < len; i++) {
          hash = (hash << 5) - hash + input.charCodeAt(i);
          hash |= 0;
        }
        return hash;
      };
      Util.resizeSprite = function(sprite, width, height, max) {
        void 0 === max && (max = 1);
        var _a = Util.minScale(sprite, width, height, max), scale = _a.scale, size = _a.size;
        sprite.node.width = scale * size.width;
        sprite.node.height = scale * size.height;
      };
      Util.minScale = function(sprite, width, height, max) {
        void 0 === max && (max = 1);
        var size = sprite.spriteFrame.getOriginalSize();
        var xScale = width / size.width;
        var yScale = height / size.height;
        var scale = Math.min(xScale, yScale, max);
        return {
          scale: scale,
          size: size
        };
      };
      Util._i18NMap = new Map();
      Util._resources = [];
      Util.bundles = new Map();
      Util.helpAudioId = -1;
      Util.chimp = null;
      return Util;
    }();
    exports.Util = Util;
    cc._RF.pop();
  }, {
    "./chimple-label": "chimple-label",
    "./friend": "friend",
    "./help": "help",
    "./helper": "helper",
    "./lessonController": "lessonController",
    "./lib/config": "config",
    "./lib/constants": "constants",
    "./lib/profile": "profile",
    "./loading": "loading",
    "./services/ParseImageDownloader": "ParseImageDownloader",
    "./util-logger": "util-logger"
  } ],
  webLesson: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ed1c8VDuJZBn4KCaCl8316c", "webLesson");
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
    var util_1 = require("./util");
    var config_1 = require("./lib/config");
    var profile_1 = require("./lib/profile");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WebLesson = function(_super) {
      __extends(WebLesson, _super);
      function WebLesson() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      WebLesson.prototype.onLoad = function() {
        var params = new URLSearchParams(window.location.search);
        config_1.default.isMicroLink = true;
        var lang = params.get("lang");
        lang == config_1.Lang.HINDI ? profile_1.default.setValue(profile_1.LANGUAGE, config_1.Lang.HINDI) : lang == config_1.Lang.KANNADA ? profile_1.default.setValue(profile_1.LANGUAGE, config_1.Lang.KANNADA) : lang == config_1.Lang.MARATHI ? profile_1.default.setValue(profile_1.LANGUAGE, config_1.Lang.MARATHI) : profile_1.default.setValue(profile_1.LANGUAGE, config_1.Lang.ENGLISH);
        var input = {
          courseid: params.get("courseid"),
          chapterid: params.get("chapterid"),
          lessonid: params.get("lessonid"),
          assignmentid: params.get("assignmentid"),
          webclass: params.get("webclass"),
          test: params.get("test"),
          mlpartnerid: params.get("mlPartnerId"),
          mlclassid: params.get("mlClassId"),
          mlstudentid: params.get("mlStudentId"),
          end: params.get("end")
        };
        util_1.Util.loadDirectLessonWithLink(input, this.node);
      };
      WebLesson = __decorate([ ccclass ], WebLesson);
      return WebLesson;
    }(cc.Component);
    exports.default = WebLesson;
    cc._RF.pop();
  }, {
    "./lib/config": "config",
    "./lib/profile": "profile",
    "./util": "util"
  } ],
  writeword: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "261599g5p5Ofoog5IhbdvFl", "writeword");
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
    exports.TRACE_HEIGHT = exports.TRACE_WIDTH = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var config_1 = require("../../../common/scripts/lib/config");
    var singlelettertracing_1 = require("./singlelettertracing");
    var util_1 = require("../../../common/scripts/util");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var helper_1 = require("../../../common/scripts/helper");
    var game_1 = require("../../scripts/game");
    exports.TRACE_WIDTH = 512;
    exports.TRACE_HEIGHT = 768;
    var WriteWord = function(_super) {
      __extends(WriteWord, _super);
      function WriteWord() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.words = null;
        _this.singleLetterPrefab = null;
        _this.imageNode = null;
        _this._currentConfig = null;
        _this._wordTracingContainer = null;
        _this._imageName = null;
        _this._sound = null;
        _this._currentLetterIndex = 0;
        _this._texture = null;
        return _this;
      }
      WriteWord.prototype.onLoad = function() {
        var _this = this;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.subScribeToTracingEvents();
        this.node.on(helper_1.MOVE_TO_NEXT_LETTER_EVENT, function(event) {
          event.stopPropagation();
          var data = event.getUserData();
          _this.moveToNextLetter(data);
        });
        this._currentConfig = this.processConfiguration(config_1.default.getInstance().data[0]);
        this._image = cc.instantiate(this.imageNode);
        if (null !== this._currentConfig) {
          this._wordTracingContainer = this.node;
          this._wordTracingContainer.scale *= 1;
          this.node.width = cc.winSize.width;
          this.node.height = cc.winSize.height;
          this.buildLetters();
          this.node.emit(helper_1.CONFIG_LOADED);
          this.loadSounds(this._currentConfig.sound);
          this.node.on(helper_1.SOUND_LOADED_EVENT, function() {
            _this.friend.extraClip = _this._sound;
            util_1.Util.showHelp(null, null);
          });
          this.emitLetterEnabledEvent(this._wordLayout.node.getChildByName(this._originalLetterName + "0"), 0);
          util_1.Util.loadTexture(this._currentConfig.image, function(texture, err) {
            !texture || err || (_this._texture = texture);
          });
        }
      };
      WriteWord.prototype.moveToNextLetter = function(data) {
        var index = data.elementIndex;
        if (index <= this._characters.length - 1) {
          var child = this._wordLayout.node.getChildByName(this._originalLetterName + index);
          if (config_1.default.i.direction == config_1.Direction.RTL) {
            this.minScrollToRight(index, child);
            this.scrollToRight(index, child);
          } else {
            this.minScrollToLeft(index, child);
            this.scrollToLeft(index, child);
          }
        } else this.loadImage(this._currentConfig.image);
      };
      WriteWord.prototype.minScrollToLeft = function(index, child) {
        var _this = this;
        var scrollToLeft = cc.winSize.width / 6;
        var newPos = new cc.Vec2(this._wordLayout.node.position.x - scrollToLeft, this._wordLayout.node.position.y);
        new cc.Tween().target(this._wordLayout.node).to(.5, {
          position: newPos
        }, {
          progress: null,
          easing: "sineOut"
        }).call(function() {
          _this.emitLetterEnabledEvent(_this._wordLayout.node.getChildByName(_this._originalLetterName + index), index);
        }).start();
      };
      WriteWord.prototype.scrollToLeft = function(index, child) {
        var _this = this;
        if (child.position.x - Math.abs(this._wordLayout.node.position.x / 2) + 1 * child.width > cc.winSize.width) {
          var scrollToLeft = .65 * child.width;
          var newPos = new cc.Vec2(this._wordLayout.node.position.x - scrollToLeft, this._wordLayout.node.position.y);
          new cc.Tween().target(this._wordLayout.node).to(.5, {
            position: newPos
          }, {
            progress: null,
            easing: "sineOut"
          }).call(function() {
            _this.emitLetterEnabledEvent(_this._wordLayout.node.getChildByName(_this._originalLetterName + index), index);
          }).start();
        } else this.minScrollToLeft(index, child);
      };
      WriteWord.prototype.minScrollToRight = function(index, child) {
        var _this = this;
        var scrollToRight = cc.winSize.width / 6;
        var newPos = new cc.Vec2(this._wordLayout.node.position.x + 1 * scrollToRight, this._wordLayout.node.position.y);
        new cc.Tween().target(this._wordLayout.node).to(.5, {
          position: newPos
        }, {
          progress: null,
          easing: "sineOut"
        }).call(function() {
          _this.emitLetterEnabledEvent(_this._wordLayout.node.getChildByName(_this._originalLetterName + index), index);
        }).start();
      };
      WriteWord.prototype.scrollToRight = function(index, child) {
        var _this = this;
        if (child.position.x - Math.abs(this._wordLayout.node.position.x / 2) + 1 * child.width > cc.winSize.width) {
          var scrollToRight = child.width;
          var newPos = new cc.Vec2(this._wordLayout.node.position.x + 1.2 * scrollToRight, this._wordLayout.node.position.y);
          new cc.Tween().target(this._wordLayout.node).to(.5, {
            position: newPos
          }, {
            progress: null,
            easing: "sineOut"
          }).call(function() {
            _this.emitLetterEnabledEvent(_this._wordLayout.node.getChildByName(_this._originalLetterName + index), index);
          }).start();
        } else this.minScrollToRight(index, child);
      };
      WriteWord.prototype.tracingFinished = function() {
        var letterNode = this._wordLayout.node.getChildByName(this._originalLetterName + this._currentLetterIndex);
        letterNode.getComponent(singlelettertracing_1.SingleLetterTracing).pronounce();
        this.pronounce();
        var customEvent = new cc.Event.EventCustom(helper_1.MOVE_TO_NEXT_LETTER_EVENT, true);
        this._currentLetterIndex++;
        customEvent.setUserData({
          elementIndex: this._currentLetterIndex
        });
        this.node.dispatchEvent(customEvent);
      };
      WriteWord.prototype.buildLetters = function() {
        var _this = this;
        this._wordLayout = this.words.getComponent(cc.Layout);
        this._wordLayout.spacingX = 50;
        if (config_1.default.i.direction == config_1.Direction.RTL) {
          this.words.scaleX = -singlelettertracing_1.LETTER_SCALE;
          this._wordTracingContainer.x = cc.winSize.width;
        } else this.words.scale = singlelettertracing_1.LETTER_SCALE;
        this._characters.forEach(function(c, i) {
          var singleLetter = cc.instantiate(_this.singleLetterPrefab);
          config_1.default.i.direction == config_1.Direction.RTL && (singleLetter.scaleX = -singlelettertracing_1.LETTER_SCALE);
          singleLetter.width = exports.TRACE_WIDTH;
          singleLetter.height = exports.TRACE_HEIGHT;
          _this._originalLetterName = singleLetter.name;
          singleLetter.name = _this._originalLetterName + i;
          _this._singleLetterComponent = singleLetter.getComponent(singlelettertracing_1.SingleLetterTracing);
          _this._singleLetterComponent.order = i;
          _this._singleLetterComponent.letter = c;
          _this._singleLetterComponent.wordTracingContainer = _this.node;
          _this._wordLayout.node.addChild(singleLetter);
          0 === i && (_this._currentLetterIndex = i);
        });
      };
      WriteWord.prototype.subScribeToTracingEvents = function() {
        var _this = this;
        this.node.on(helper_1.TRACING_FINISHED, function(event) {
          _this.tracingFinished();
        });
        this.node.on(helper_1.TRACING_CORRECT, function(event) {
          event.stopPropagation();
          _this._wordTracingContainer.emit("correct");
        });
        this.node.on(helper_1.TRACING_WRONG, function(event) {
          event.stopPropagation();
          _this._wordTracingContainer.emit("wrong");
        });
        this.node.on(helper_1.RESET_TRACING, function(event) {
          event.stopPropagation();
          console.log("RESET_TRACING.....");
          var child = _this._wordLayout.node.getChildByName(_this._originalLetterName + _this._currentLetterIndex);
          if (!!child) {
            var singleLetterComponent = child.getComponent(singlelettertracing_1.SingleLetterTracing);
            null !== singlelettertracing_1.SingleLetterTracing && singleLetterComponent.reset();
          }
        });
        this.node.on(helper_1.RESET_TRACING_ALLOWED, function() {
          null !== _this.node.getChildByName("reeetTracingButton") && (_this.node.getChildByName("reeetTracingButton").opacity = 255);
        });
        this.node.on(helper_1.RESET_TRACING_NOT_ALLOWED, function() {
          null !== _this.node.getChildByName("reeetTracingButton") && (_this.node.getChildByName("reeetTracingButton").opacity = 0);
        });
        null !== this.node.getChildByName("reeetTracingButton") && (this.node.getChildByName("reeetTracingButton").opacity = 0);
      };
      WriteWord.prototype.emitLetterEnabledEvent = function(fNode, index) {
        fNode.emit("letterEnabledEvent", index);
      };
      WriteWord.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var level = configurations[0], workSheet = configurations[1], problemNo = configurations[2], word = configurations[3], image = configurations[4], sound = configurations[5];
        this._characters = Array.from(word);
        image = !image ? word : image;
        sound = !sound ? word : sound;
        return {
          level: level,
          workSheet: workSheet,
          problemNo: problemNo,
          word: word,
          image: image,
          sound: sound
        };
      };
      WriteWord.prototype.loadImage = function(imageName) {
        this._imageName = imageName;
        if (!this._texture) this.node.emit("nextProblem"); else {
          var sprite = this._image.getComponent(cc.Sprite);
          sprite.spriteFrame = new cc.SpriteFrame(this._texture);
          this.node.addChild(this._image);
          util_1.Util.resizeSprite(sprite, 193, 153);
          this._image.opacity = 0;
          this._image.scale = 0;
          this.hideLayoutAndShowImage();
        }
      };
      WriteWord.prototype.hideLayoutAndShowImage = function() {
        var _this = this;
        new cc.Tween().target(this._wordLayout.node).to(1, {
          opacity: 0
        }, {
          progress: null,
          easing: "sineOut"
        }).call(function() {
          _this._image ? new cc.Tween().target(_this._image).to(1, {
            scale: 1,
            opacity: 255
          }, {
            progress: null,
            easing: "sineOut"
          }).call(function() {
            _this.scheduleOnce(function() {
              _this.node.emit("nextProblem");
            }, .01);
          }).start() : _this.node.emit("nextProblem");
        }).start();
      };
      Object.defineProperty(WriteWord.prototype, "currentConfig", {
        get: function() {
          return this._currentConfig;
        },
        enumerable: false,
        configurable: true
      });
      WriteWord.prototype.loadSounds = function(sound) {
        var _this = this;
        null === this._sound && util_1.Util.loadGameSound(sound, function(data) {
          _this._sound = data;
          _this.node.emit(helper_1.SOUND_LOADED_EVENT);
        });
      };
      WriteWord.prototype.pronounce = function() {
        var _this = this;
        this._currentLetterIndex === this._characters.length - 1 && this.scheduleOnce(function() {
          _this.friend.speak(_this._sound);
        }, 1.5);
      };
      WriteWord.prototype.onDestroy = function() {
        cc.audioEngine.stopAllEffects();
      };
      __decorate([ property(cc.Node) ], WriteWord.prototype, "words", void 0);
      __decorate([ property(cc.Prefab) ], WriteWord.prototype, "singleLetterPrefab", void 0);
      __decorate([ property(cc.Prefab) ], WriteWord.prototype, "imageNode", void 0);
      __decorate([ error_handler_1.default() ], WriteWord.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], WriteWord.prototype, "moveToNextLetter", null);
      __decorate([ error_handler_1.default() ], WriteWord.prototype, "minScrollToLeft", null);
      __decorate([ error_handler_1.default() ], WriteWord.prototype, "scrollToLeft", null);
      __decorate([ error_handler_1.default() ], WriteWord.prototype, "minScrollToRight", null);
      __decorate([ error_handler_1.default() ], WriteWord.prototype, "scrollToRight", null);
      __decorate([ error_handler_1.default() ], WriteWord.prototype, "tracingFinished", null);
      __decorate([ error_handler_1.default() ], WriteWord.prototype, "buildLetters", null);
      __decorate([ error_handler_1.default() ], WriteWord.prototype, "subScribeToTracingEvents", null);
      __decorate([ error_handler_1.default() ], WriteWord.prototype, "emitLetterEnabledEvent", null);
      WriteWord = __decorate([ ccclass ], WriteWord);
      return WriteWord;
    }(game_1.default);
    exports.default = WriteWord;
    cc._RF.pop();
  }, {
    "../../../common/scripts/helper": "helper",
    "../../../common/scripts/lib/config": "config",
    "../../../common/scripts/lib/error-handler": "error-handler",
    "../../../common/scripts/util": "util",
    "../../scripts/game": "game",
    "./singlelettertracing": "singlelettertracing"
  } ]
}, {}, [ "chimple", "arrow-node", "indicator-node", "singlelettertracing", "trace-gen-container", "trace-graphics", "tracing-collider", "tracing-container", "tracing-node", "tracing-part", "writeword", "achievement", "scorecard", "Utility", "answer-grid", "auto-drag", "backButton", "balloon", "chapterIcon", "chimple-label", "chimple-richtext", "commonButton", "counting-answer", "countingLayout", "parseACL", "parseAssignment", "parseAssignmentForChapter", "parseChapter", "parseChapterAssignment", "parseChapterProgress", "parseClass", "parseConnection", "parseConstants", "parseMonitor", "parseProgress", "parseSchool", "parseSection", "parseStudent", "parseSubject", "parseTeachersForStudent", "parseTuition", "parseUser", "drag", "drop", "friend", "game", "header", "headerButton", "help", "helpChimp", "helper", "lessonController", "lessonIcon", "config", "constants", "convert", "error-handler", "gameConfigs", "globals", "profile", "loading", "nest", "number-script", "progressMonitor", "quit-popup", "quiz-monitor", "resetTracingButton", "ApiHandler", "FirebaseApi", "ParseImageDownloader", "ParseNetwork", "ServiceApi", "ServiceConfig", "parseApi", "studentPreviewInfo", "teacherAddedDialog", "util-logger", "util", "webLesson", "kannada", "use_v2.1.x_cc.Action", "queue" ]);