import { AuthHeader, ParseNetwork, RequestParams } from "./ParseNetwork";
import { AcceptTeacherRequest, CustomAuthInfo, LeaderboardInfo, ServiceApi, StudentLeaderboardInfo, UpdateProgressInfo } from "./ServiceApi";
import { Queue } from "../../../queue";
import { UpdateHomeTeacher } from "./parseApi";
import {
    FIREBASE_CUSTOM_AUTH_URL,
    FIREBASE_GET_LEADERBOARD_URL,
    FIREBASE_LINK_STUDENT_URL,
    FIREBASE_LIST_ASSIGNMENTS,
    FIREBASE_SCHOOL_URL, FIREBASE_SYNC_FAILED_PROGRESS_URL,
    FIREBASE_UPDATE_HOME_TEACHER_URL, FIREBASE_UPDATE_PROGRESS_URL, LIST_ASSIGNMENTS, UPDATE_PROGRESS_URL
} from "../domain/parseConstants";
import { ServiceConfig } from "./ServiceConfig";
import Profile, { CURRENTMODE, LessonProgress, User } from "../lib/profile";
import UtilLogger from "../util-logger";
import { Mode } from "../lib/constants";

export class FirebaseApi implements ServiceApi {
    public static i: FirebaseApi;

    private constructor() {
    }

    public static getInstance(): FirebaseApi {
        if (!FirebaseApi.i) {
            FirebaseApi.i = new FirebaseApi();
        }

        return FirebaseApi.i;
    }

    getAuthHeader(): AuthHeader {
        const authHeader: AuthHeader = {
            "Accept": "application/json"
        };
        return authHeader;
    }

    async teacherRequestAccepted(request: AcceptTeacherRequest) {
        // const schoolId = await ServiceConfig.getI().handle.schoolById(request.teacherId);
        if (!!request.teacherId) {
            let updateHomeTeacherInfo: UpdateHomeTeacher = {
                homeId: request.studentId,
                teacherId: request.teacherId,
                kind: "UpdateHomeTeacher",
                firebaseStudentId: request.firebaseStudentId,
                studentName: request.studentName,
                schoolId: request.teacherId,
                sectionId: request.sectionId
            };
            Queue.getInstance().push(updateHomeTeacherInfo);
        }
    }

    async updateProgress(info: UpdateProgressInfo): Promise<any> {
        if (info.studentId && info.studentId.length > 0) {
            const user = User.getCurrentUser();
            const requestParams: RequestParams = {
                url: FIREBASE_UPDATE_PROGRESS_URL,
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
            return await ParseNetwork.getInstance().post(requestParams, this.getAuthHeader());
        }
    }

    async syncFailedProgresses(infos: UpdateProgressInfo[]): Promise<any> {
        if (Array.isArray(infos) && infos.length > 0) {
            const user = User.getCurrentUser();
            let inputs = infos.map((info: UpdateProgressInfo) => {
                return {
                    lessonId: info.lesson,
                    userId: info.studentId,
                    courseName: info.courseName,
                    score: info.assessment,
                    assignmentId: info.assignmentId,
                    timeSpent: info.timespent,
                    name: user.name
                }
            })
            const requestParams: RequestParams = {
                url: FIREBASE_SYNC_FAILED_PROGRESS_URL,
                body: {
                    data: inputs
                }
            };
            return await ParseNetwork.getInstance().post(requestParams, this.getAuthHeader());
        }
    }

    async schoolById(id: string): Promise<any> {
        let schoolId = null;
        const requestParams: RequestParams = {
            url: FIREBASE_SCHOOL_URL + id
        };
        let jsonResult = await ParseNetwork.getInstance().get(requestParams, id, this.getAuthHeader()) || [];
        console.log('school id', jsonResult)
        if (jsonResult && Array.isArray(jsonResult) && jsonResult.length > 0) {
            schoolId = jsonResult[0];
        }
        return schoolId;
    }

    async updateHomeTeacher(info: UpdateHomeTeacher): Promise<any> {
        if (info.teacherId && info.teacherId.length > 0 &&
            info.homeId && info.homeId.length > 0) {
            const requestParams: RequestParams = {
                url: FIREBASE_UPDATE_HOME_TEACHER_URL,
                body: info
            };
            return await ParseNetwork.getInstance().post(requestParams, this.getAuthHeader());
        }
    }


    async listAssignments(studentId: string, limit: number = 10) {
        let assignments = [];
        const requestParams: RequestParams = {
            url: FIREBASE_LIST_ASSIGNMENTS + studentId
        };
        let mode = parseInt(Profile.getValue(CURRENTMODE));
        let jsonResult = await ParseNetwork.getInstance().get(requestParams, null, this.getAuthHeader()) || [];
        if (mode != Mode.HomeConnect) {
            if (!!jsonResult && 'link' in jsonResult && !jsonResult.link) {
                const user = User.getCurrentUser();
                if (user != null) {
                    const key = `teacher_for_student_${User.getCurrentUser().id}`;
                    let teachersForStudent: string[] = JSON.parse(cc.sys.localStorage.getItem(key) || '[]');
                    teachersForStudent = teachersForStudent.filter(e => e !== User.getCurrentUser().sectionName);
                    cc.sys.localStorage.setItem(key, JSON.stringify(teachersForStudent));
                    user.studentId = null;
                    user.sectionId = null;
                    user.schoolId = null;
                    user.schoolName = null;
                    user.sectionName = null;
                    user.isConnected = false;
                    user.storeUser();
                }
            } else if (!!jsonResult.studentId && mode != Mode.School && mode != Mode.HomeConnect) {
                const studentId: string = jsonResult.studentId;
                const sectionId: string = jsonResult.sectionId;
                const schoolId: string = jsonResult.schoolId;
                const sectionName: string = jsonResult.sectionName;
                const schoolName: string = jsonResult.schoolName;
                UtilLogger.processLinkStudent(sectionId, schoolId, studentId, schoolName, sectionName, null);
            }
        }
        console.log('assignments query result', jsonResult)
        this.buildAssignments(assignments, [].concat(jsonResult.results));
        return assignments.reverse();
    }

    buildAssignments(results: any[], assignments: any[]) {
        try {
            if (!!User.getCurrentUser()) {
                const lessonMap = User.getCurrentUser().lessonProgressMap;
                let allAssignments = [];
                assignments.forEach(a => allAssignments = allAssignments.concat(a));

                allAssignments.forEach(
                    a => {
                        let b: any = {};
                        let shouldInclude: boolean = true;
                        b.assignmentId = a.assignmentId;
                        b.chapterId = a.chapter;
                        b.lessonId = a.lesson;
                        b.lessonName = a.lessonName;
                        b.courseCode = a.subject.courseCode;
                        let dateString = a.createAt.toString();
                        if (!!dateString) {
                            if (dateString.length === 8) {
                                const year = dateString.substring(0, 4);
                                const month = dateString.substring(4, 6);
                                const day = dateString.substring(6, 8);
                                b.createAt = new Date(year, month - 1, day);
                            } else {
                                dateString = Number(a.createAt._seconds) * 1000;
                                b.createAt = new Date(dateString);
                            }
                        } else {
                            b.createAt = new Date();
                        }
                        if (lessonMap.has(a.lesson)) {
                            const lProgress: LessonProgress = User.getCurrentUser().lessonProgressMap.get(a.lesson);
                            if (lProgress === null || lProgress === undefined) {
                                shouldInclude = true;
                            } else {
                                if (lProgress.assignmentIds === null || lProgress.assignmentIds === undefined || lProgress.assignmentIds.length === 0) {
                                    shouldInclude = true;
                                } else if (lProgress.assignmentIds !== null && lProgress.assignmentIds.length > 0
                                    && !lProgress.assignmentIds.includes(a.assignmentId)) {
                                    shouldInclude = true;
                                }
                            }
                            if (shouldInclude) {
                                results.push(b)
                            }
                        } else {
                            results.push(b)
                        }
                    }
                )

                results = results.filter((v, i, a) => a.findIndex(t => (t.chapterId === v.chapterId && t.lessonId === v.lessonId)) === i);
                results = results.sort((a, b) => (a.createAt > b.createAt) ? 1 : -1)
            }
        } catch (e) {
            results = []
        }
        return results;
    }

    async linkStudent(studentId: string, code: string, phoneNumber: string = null, age: number = null, name: string = null, countryCode: string = null): Promise<any> {
        if (studentId && studentId.length > 0 &&
            code && code.length > 0) {
            let sendCode = Number(code);
            const requestParams: RequestParams = {
                url: FIREBASE_LINK_STUDENT_URL,
                body: {
                    studentId,
                    code: sendCode,
                    version: 2,
                    phoneNumber: phoneNumber,
                    age: age,
                    name: name,
                    countryCode: countryCode
                }
            };
            return await ParseNetwork.getInstance().post(requestParams, this.getAuthHeader());
        }
    }

    async getLeaderboard(studentId: string, sectionId: string, schoolId: string): Promise<LeaderboardInfo> {
        const requestParams: RequestParams = {
            url: FIREBASE_GET_LEADERBOARD_URL + "?progressId=" + studentId + "&sectionId=" + sectionId + "&schoolId=" + schoolId
        };
        const jsonResult = await ParseNetwork.getInstance().get(requestParams, null, this.getAuthHeader()) || {};
        let result: LeaderboardInfo = {
            weekly: [],
            allTime: [],
        }
        if (!Object.keys(jsonResult).length) {
            return result;
        }
        else {
            const weekly: StudentLeaderboardInfo[] = []
            const allTime: StudentLeaderboardInfo[] = []
            for (const i of Object.keys(jsonResult)) {
                weekly.push({
                    name: jsonResult[i].n,
                    score: jsonResult[i].w.s,
                    timeSpent: jsonResult[i].w.t,
                    lessonsPlayed: jsonResult[i].w.l,
                    userId: i,
                })
                allTime.push({
                    name: jsonResult[i].n,
                    score: jsonResult[i].a.s,
                    timeSpent: jsonResult[i].a.t,
                    lessonsPlayed: jsonResult[i].a.l,
                    userId: i
                })
            }
            const sortLeaderboard = (arr: Array<any>) => arr.sort((a, b) => b.lessonsPlayed - a.lessonsPlayed || a.timeSpent - b.timeSpent || b.score - a.score);
            sortLeaderboard(weekly)
            sortLeaderboard(allTime)
            result = {
                weekly: weekly,
                allTime: allTime,
            }
            return result;
        }
    }

    async customAuth(code: string, phoneNumber: string, countryCode: string, progressId: string): Promise<CustomAuthInfo> {
        if (progressId && progressId.length > 0 &&
            code && code.length > 0) {
            let sendCode = Number(code);
            const requestParams: RequestParams = {
                url: FIREBASE_CUSTOM_AUTH_URL,
                body: {
                    progressId,
                    code: sendCode,
                    version: 2,
                    phoneNumber: phoneNumber,
                    countryCode: countryCode
                }
            };
            console.log('req params', requestParams);
            const response = await ParseNetwork.getInstance().post(requestParams, this.getAuthHeader())
            const result: CustomAuthInfo = {
                email: response.data.email,
                progressId: response.data.progressId,
                schoolId: response.data.schoolId,
                schoolName: response.data.schoolName,
                sectionId: response.data.sectionId,
                sectionName: response.data.sectionName,
                student: response.data.student,
                studentId: response.data.studentId
            }
            return result;
        }
    }
}
