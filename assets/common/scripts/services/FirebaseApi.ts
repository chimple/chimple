import {AuthHeader, ParseNetwork, RequestParams} from "./ParseNetwork";
import {AcceptTeacherRequest, ServiceApi, UpdateProgressInfo} from "./ServiceApi";
import {Queue} from "../../../queue";
import {UpdateHomeTeacher} from "./parseApi";
import {
    FIREBASE_LIST_ASSIGNMENTS,
    FIREBASE_GET_STUDENT_LIST_URL,
    FIREBASE_GET_SECTION_LIST_URL,
    FIREBASE_SCHOOL_URL,
    FIREBASE_UPDATE_HOME_TEACHER_URL, FIREBASE_UPDATE_PROGRESS_URL, LIST_ASSIGNMENTS, UPDATE_PROGRESS_URL
} from "../domain/parseConstants";
import {ServiceConfig} from "./ServiceConfig";
import {LessonProgress, User} from "../lib/profile";

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
            const requestParams: RequestParams = {
                url: FIREBASE_UPDATE_PROGRESS_URL,
                body: {
                    lessonId: info.lesson,
                    userId: info.studentId,
                    courseName: info.courseName,
                    score: info.assessment
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
        let jsonResult = await ParseNetwork.getInstance().get(requestParams, null, this.getAuthHeader()) || [];
        console.log('assignments', jsonResult)
        this.buildAssignments(assignments, jsonResult);
        return assignments;
    }
    async sectionList(schoolCode: string, password:string,limit: number = 10) {
        try {
            const requestParams: RequestParams = {
                url: FIREBASE_GET_SECTION_LIST_URL+schoolCode+"&password="+password
            };
            let jsonResult = await ParseNetwork.getInstance().get(requestParams, null, this.getAuthHeader()) || [];
            console.log('sectionList', jsonResult)
          //  this.buildAssignments(assignments, jsonResult);
            return jsonResult;
        } catch (error) {
            console.log('@@@@@@@@@@@@@@')
            
        }
    }
    async studentList(schoolCode: string, password:string,sectionId: string, limit: number = 10) {
        const requestParams: RequestParams = {
            url: FIREBASE_GET_STUDENT_LIST_URL
        };
        console.log('$$$$$$$$$$$$$$'+FIREBASE_GET_STUDENT_LIST_URL)
        let jsonResult = await ParseNetwork.getInstance().get(requestParams, null, this.getAuthHeader()) || [];
        console.log('studentList', jsonResult.name)
        console.log('studentLis11t', jsonResult['name'])
        //this.buildAssignments(assignments, jsonResult);
        return jsonResult;
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
                                if (lProgress.assignmentId === null || lProgress.assignmentId === undefined) {
                                    shouldInclude = true;
                                } else if (lProgress.assignmentId !== null && lProgress.assignmentId !== a.assignmentId) {
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
}
