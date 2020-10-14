import { ParseUser } from "../domain/parseUser";
import { RequestParams, ParseNetwork } from "./ParseNetwork";
import { LOGIN_URL, USER_URL, LOGIN_TYPE, CONNECTION_URL, CURRENT_CONNECTION, SCHOOL_URL, CURRENT_TEACHER_SCHOOL, CHAPTER_ASSIGNMENT, CHAPTER_ASSIGNMENT_URL, SUBJECT_URL, SUBJECTS, SECTION_URL, SECTIONS, TUITION_URL, STUDENTS_FOR_TEACHER, PROGRESS_URL, CLASSES, SCHOOL_STUDENT_URL, STUDENTS, CLASS_URL, SUBJECT, TEACHER, CURRENT_SUBJECT_NAME, SCHOOL_CODE, SCHOOL_PASSWORD, MONITOR_URL, SIGN_UP_URL, SIGN_UP_TEST_URL, LIST_ASSIGNMENTS, UPDATE_PROGRESS_URL, ASSIGN_HOMEWORK_URL, UPDATE_MONITOR_URL, CREATE_SECTION_URL, UPDATE_HOME_TEACHER_URL, STUDENT_URL, ASSIGNMENTS_FOR_CHAPTER, ASSIGNMENTS_API_URL, CHAPTER_PROGRESS, CHAPTER_PROGRESS_URL, TEACHERS_FOR_STUDENT, ASSIGNMENTS, ASSIGNMENTS_URL, LEARNING_SUMMARY_URL } from "../domain/parseConstants";
import { LOGGED_IN_USER, CURRENT_SCHOOL_ID, CURRENT_SECTION_ID, CURRENT_CLASS_ID, CURRENT_SUBJECT_ID } from "../lib/constants";
import { ParseConnection } from "../domain/parseConnection";
import { ParseSchool, ParseSubjectByTeacher, Pointer } from "../domain/parseSchool";
import { ParseChapterAssignment } from "../domain/parseChapterAssignment";
import { ParseSubject } from "../domain/parseSubject";
import { ParseSection } from "../domain/parseSection";
import { ParseStudent } from "../domain/parseStudent";
import { ParseClass } from "../domain/parseClass";
import { ParseMonitor } from "../domain/parseMonitor";
import Profile, { Gender, User, LessonProgress } from "../lib/profile";
import { ParseAssignmentForChapter } from "../domain/parseAssignmentForChapter";
import { ParseTeachersForStudent } from "../domain/parseTeachersForStudent";
import { ParseChapterProgress } from "../domain/parseChapterProgress";
import { ParseAssignment, Result } from "../domain/parseAssignment";

export const enum SelectionMode {
    Home,
    Section,
    Student,
    Subject,
    TeacherHome
}

export interface StudentInfo {
    name: string;
    objectId: string;
    image: string;
}

export interface StudentLessonInfo {
    lesson: string;
    objectId: string;
    assessment: number;
    timeSpent: number;
    studentName: string;
}

export interface LearningSummaryForStudent {
    studentId: string;
    totalTime: number;
    totalLessons: number;
}

export interface ProgressReport {
    chapterId: string;
    studentInfos: string[];
    subjectId?: string;
}


export interface ProfileInfo {
    profile: string;
    kind: string;
    studentId: string;

}

export interface UpdateMonitorInfo {
    chapter?: string;
    lesson?: string;
    incorrect?: number;
    totalQuestions?: number;
    correct?: number;
    totalChallenges?: number;
    totalSeconds?: number;
    activity: string;
    schoolId?: string;
    studentId?: string;
    classId?: string;
}

export interface UpdateHomeTeacher {
    homeId: string;
    teacherId: string;
    kind: string;
    studentName?: string;
    schoolId?: string;
    sectionId?: string;
    studentAge?: number;
    studentGender?: string;
}

export interface UpdateProgressInfo {
    schoolId?: string;
    classId?: string;
    subjectId?: string;
    studentId?: string;
    sectionId?: string;
    chapter?: string;
    lesson?: string;
    timespent?: number;
    assessment?: number;
}


export interface AssignHomeWorkInfo {
    kind: string;
    schoolId: string;
    subjectId: string;
    sectionId: string;
    chapterId: string;
    lessonId: string;
    studentId?: string;
}


export interface SignUpInfo {
    username: string;
    password: string;
    email?: string;
    fullName?: string;
    image?: string;
    imageName?: string;
    phoneNumber?: string;
    verficationId?: string;
    code?: string;
}

export class ParseApi {
    private static instance: ParseApi;

    private constructor() {
    }

    public static getInstance(): ParseApi {
        if (!ParseApi.instance) {
            ParseApi.instance = new ParseApi();
        }

        return ParseApi.instance;
    }

    public async login(username: string, password: string): Promise<ParseUser> {
        let jsonResult = null;
        const requestParams: RequestParams = {
            url: LOGIN_URL,
            queryParams: {username, password}
        };
        jsonResult = await ParseNetwork.getInstance().get(requestParams, LOGGED_IN_USER);
        return ParseApi.instance.getLoggedInUser();
    }

    public async loginUser(email: string, password: string): Promise<ParseUser> {
        return ParseApi.instance.login(email, password);
    }

    public async registerUser(username: string, password: string): Promise<any> {
        const user: ParseUser = new ParseUser();
        user.email = username;
        user.username = username;
        user.password = password;

        const requestParams: RequestParams = {
            url: USER_URL,
            body: user
        };
        return await ParseNetwork.getInstance().post(requestParams);
    }

    public async isUserExists(username: string): Promise<boolean> {
        let userExists: boolean = false;
        const requestParams: RequestParams = {
            url: USER_URL,
            queryParams: {'username': username},
            isWhereQuery: true
        };
        let jsonResult = await ParseNetwork.getInstance().get(requestParams, username);
        userExists = jsonResult && Array.isArray(jsonResult) && jsonResult.length > 0 ? true : false;
        return userExists;
    }

    public getLoggedInUser(): ParseUser {
        return ParseApi.instance.fromJson(ParseNetwork.getInstance().getParseObjectFromCache(LOGGED_IN_USER), ParseUser);
    }

    public logout(): void {
        ParseNetwork.getInstance().removeFromCache(LOGGED_IN_USER);
        ParseNetwork.getInstance().removeFromCache(LOGIN_TYPE);
    }

    public async connections(): Promise<ParseConnection[]> {
        let jsonResult = null;
        const loggedInUser: ParseUser = ParseApi.instance.getLoggedInUser();
        const condition = {
            'user': ParseNetwork.getInstance().createPointer('_User', loggedInUser.objectId)
        };

        const requestParams: RequestParams = {
            url: CONNECTION_URL,
            queryParams: condition,
            isWhereQuery: true,
            includeParam: 'school,school.user'
        };
        jsonResult = await ParseNetwork.getInstance().get(requestParams, CURRENT_CONNECTION);
        const cons: ParseConnection[] = ParseApi.instance.selectedConnections();
        return cons;
    }

    public async schoolForTeacher(): Promise<ParseSchool> {
        let jsonResult = null;
        const loggedInUser: ParseUser = ParseApi.instance.getLoggedInUser();
        const condition = {
            'user': ParseNetwork.getInstance().createPointer('_User', loggedInUser.objectId)
        };

        const requestParams: RequestParams = {
            url: SCHOOL_URL,
            queryParams: condition,
            isWhereQuery: true
        };
        jsonResult = await ParseNetwork.getInstance().get(requestParams, CURRENT_TEACHER_SCHOOL);
        return ParseApi.instance.selectedSchool(CURRENT_TEACHER_SCHOOL);
    }

    public async schoolById(objectId: string): Promise<ParseSchool> {
        let jsonResult = null;
        const requestParams: RequestParams = {
            url: SCHOOL_URL + "/" + objectId
        };
        jsonResult = await ParseNetwork.getInstance().get(requestParams, objectId);
        return ParseApi.instance.selectedSchool(objectId);
    }

    public async getChapterAssignment(schoolId: string, sectionId: string, subjectId: string): Promise<ParseChapterAssignment[]> {
        const storeKey = CHAPTER_ASSIGNMENT + schoolId + sectionId + subjectId;
        let jsonResult = null;
        const condition = {
            'school': ParseNetwork.getInstance().createPointer('School', schoolId),
            'subject': ParseNetwork.getInstance().createPointer('Subject', subjectId),
            'section': ParseNetwork.getInstance().createPointer('Section', sectionId)
        };

        const requestParams: RequestParams = {
            url: CHAPTER_ASSIGNMENT_URL,
            queryParams: condition,
            isWhereQuery: true
        };
        jsonResult = await ParseNetwork.getInstance().get(requestParams, storeKey);
        let chapterAssignments: ParseChapterAssignment[] = ParseApi.instance.fromJson(ParseNetwork.getInstance().getParseObjectFromCache(storeKey), ParseChapterAssignment, false);
        return chapterAssignments;
    }

    public selectedConnections(): ParseConnection[] {
        return ParseApi.instance.fromJson(ParseNetwork.getInstance().getParseObjectFromCache(CURRENT_CONNECTION), ParseConnection, false);
    }

    public selectedSchool(key: string): ParseSchool {
        const schools = ParseApi.instance.fromJson(ParseNetwork.getInstance().getParseObjectFromCache(key), ParseSchool, false);
        if (Array.isArray(schools) && schools.length > 0) {
            return schools[0];
        }
        return schools;
    }


    public async getAllSubjects(): Promise<ParseSubject[]> {
        const requestParams: RequestParams = {
            url: SUBJECT_URL
        };
        await ParseNetwork.getInstance().get(requestParams, SUBJECTS);
        return ParseApi.instance.allSubjects();
    }

    public async getSectionsForSchool(schoolId: string): Promise<ParseSection[]> {
        let jsonResult = [];
        const schoolCondition = {
            'school': ParseNetwork.getInstance().createPointer('School', schoolId)
        };

        const requestParams: RequestParams = {
            url: SECTION_URL,
            queryParams: schoolCondition,
            isWhereQuery: true
        };
        jsonResult = await ParseNetwork.getInstance().get(requestParams, SECTIONS + schoolId);
        const sections: ParseSection[] = ParseApi.instance.fromJson(ParseNetwork.getInstance().getParseObjectFromCache(SECTIONS + schoolId), ParseSection, false);
        return sections;
    }

    public async getStudentsForTeacher(): Promise<StudentInfo[]> {
        const teacher: ParseUser = ParseApi.instance.getLoggedInUser();
        let jsonResult = [];
        const teacherCondition = {
            // 'teacher': ParseNetwork.getInstance().createPointer('_User', '6OMUtNNzLH')
            'teacher': ParseNetwork.getInstance().createPointer('_User', teacher.objectId)
        };

        const requestParams: RequestParams = {
            url: TUITION_URL,
            queryParams: teacherCondition,
            isWhereQuery: true,
            includeParam: 'student',
            keysParam: 'student'
        };
        jsonResult = await ParseNetwork.getInstance().get(requestParams, STUDENTS_FOR_TEACHER + teacher.objectId) || [];
        let result: StudentInfo[] = jsonResult.map(r => {
            return {
                name: r.student.name,
                objectId: r.student.objectId,
                image: r.student.image ? r.student.image.url : ''
            };
        });
        return result;
    }

    public async getProgressForChapter(query: ProgressReport): Promise<StudentLessonInfo[]> {
        // SHOULD WE CACHE TBD
        let jsonResult = [];
        let result: StudentLessonInfo[];
        if (query.studentInfos) {
            let studentIds = query.studentInfos.map(id => {
                return {
                    'student': ParseNetwork.getInstance().createPointer('Student', id)
                };
            });
            let queryCondition = null;
            if (query.subjectId) {
                queryCondition = {
                    'chapter': query.chapterId,
                    'max': true,
                    'subject': ParseNetwork.getInstance().createPointer('Subject', query.subjectId),
                    '$or': studentIds
                };
            } else {
                queryCondition = {
                    'chapter': query.chapterId,
                    'max': true,
                    '$or': studentIds
                };
            }

            const requestParams: RequestParams = {
                url: PROGRESS_URL,
                queryParams: queryCondition,
                isWhereQuery: true,
                includeParam: 'student',
                keysParam: 'student,lesson,assessment,timeSpent'
            };
            jsonResult = await ParseNetwork.getInstance().get(requestParams) || [];
            result = jsonResult.map(r => {
                return {
                    objectId: r.student.objectId,
                    lesson: r.lesson,
                    assessment: r.assessment,
                    timeSpent: r.timeSpent,
                    studentName: r.student.name
                };
            });
            cc.log('result', result);
        }
        return result;
    }

    public async getProgressForStudentByChapterAndLesson(chapter: string, lesson: string): Promise<StudentLessonInfo[]> {
        const schoolId: string = cc.sys.localStorage.getItem(CURRENT_SCHOOL_ID);
        const sectionId: string = cc.sys.localStorage.getItem(CURRENT_SECTION_ID);
        const students: ParseStudent[] = await ParseApi.getInstance().getStudentsForSection(schoolId, sectionId);
        let jsonResult = [];
        let result: StudentLessonInfo[];
        let studentIds = students.map(s => {
            return {
                'student': ParseNetwork.getInstance().createPointer('Student', s.objectId)
            };
        });
        const queryCondition = {
            'chapter': chapter,
            'lesson': lesson,
            'max': true,
            '$or': studentIds
        };

        const requestParams: RequestParams = {
            url: PROGRESS_URL,
            queryParams: queryCondition,
            isWhereQuery: true,
            includeParam: 'student',
            keysParam: 'student,lesson,assessment,timeSpent'
        };
        jsonResult = await ParseNetwork.getInstance().get(requestParams) || [];

        result = jsonResult.map(r => {
            return {
                objectId: r.student.objectId,
                lesson: r.lesson,
                assessment: r.assessment,
                timeSpent: r.timeSpent,
                studentName: r.student.name
            };
        });

        cc.log('result', result);
        return result;
    }

    public selectedSection(schoolId: string): ParseSection[] {
        const sections = ParseApi.instance.fromJson(ParseNetwork.getInstance().getParseObjectFromCache(SECTIONS + schoolId), ParseSection, false);
        const sectionId: string = ParseNetwork.getInstance().getStringFromCache(CURRENT_SECTION_ID);
        return sections.filter(s => s.objectId === sectionId);
    }

    public allSubjects(): ParseSubject[] {
        return ParseApi.instance.fromJson(ParseNetwork.getInstance().getParseObjectFromCache(SUBJECTS), ParseSubject, false);
    }

    public selectedClasses(schoolId: string): ParseClass[] {
        return ParseApi.instance.fromJson(ParseNetwork.getInstance().getParseObjectFromCache(CLASSES + schoolId), ParseClass, false);
    }

    public async getStudentsForSection(schoolId: string, sectionId: string): Promise<ParseStudent[]> {
        let jsonResult = [];
        const requestParams: RequestParams = {
            url: SCHOOL_STUDENT_URL,
            queryParams: {
                'school': ParseNetwork.getInstance().createPointer('School', schoolId),
                'section': ParseNetwork.getInstance().createPointer('Section', sectionId)
            },
            isWhereQuery: true,
            includeParam: 'student'
        };
        jsonResult = await ParseNetwork.getInstance().get(requestParams, STUDENTS + schoolId + sectionId) || [];
        jsonResult = jsonResult.map(ps => ps.student);
        const students: ParseStudent[] = ParseApi.instance.fromJson(jsonResult, ParseStudent, false);
        return students;
    }

    public selectedStudents(schoolId: string, sectionId: string): ParseStudent[] {
        return ParseApi.instance.fromJson(ParseNetwork.getInstance().getParseObjectFromCache(STUDENTS + schoolId + sectionId), ParseStudent, false);
    }

    public async getActiveClassesForSchoolAndSection(schoolId: string, sectionId: string = null): Promise<ParseClass[]> {
        // "EbeEeQzJGo"
        let jsonResult = [];
        const activeSchoolCondition = {
            'school': ParseNetwork.getInstance().createPointer('School', schoolId),
            'active': true
        };

        const requestParams: RequestParams = {
            url: CLASS_URL,
            queryParams: activeSchoolCondition,
            isWhereQuery: true,
            includeParam: 'subject,teacher'
        };
        jsonResult = await ParseNetwork.getInstance().get(requestParams, CLASSES + schoolId);
        const classes: ParseClass[] = ParseApi.instance.selectedClasses(schoolId);
        cc.log('classes', classes);

        classes.map(c => {
            const st: ParseSubjectByTeacher = {
                subject: c.subject,
                teacher: c.teacher,
                classId: c.objectId
            };
            ParseApi.instance.storeSubjectAndTeacherByClass(c.objectId, st);
        });

        return classes;
    }

    public storeSubjectAndTeacherByClass(classId: string, st: ParseSubjectByTeacher) {
        ParseNetwork.getInstance().storeIntoCache(SUBJECT + classId, st.subject);
        ParseNetwork.getInstance().storeIntoCache(TEACHER + classId, st.teacher);
    }

    public getSubjectByClass(classId: string) {
        return ParseApi.instance.fromJson(ParseNetwork.getInstance().getParseObjectFromCache(SUBJECT + classId), ParseSubject);
    }

    public getTeacherByClass(classId: string) {
        return ParseApi.instance.fromJson(ParseNetwork.getInstance().getParseObjectFromCache(TEACHER + classId), ParseUser);
    }

    public fromJson<T>(payload: Object, ctor: { new(): T }, isObject: boolean = true): any {
        let result: T | T[] = null;
        if (payload === null || payload === undefined) {
            result = isObject ? Object.assign({}) : Object.assign([]);
        } else if (payload && Array.isArray(payload)) {
            result = payload.map(p => {
                    let s: T = new ctor();
                    return Object.assign(s, p);
                }
            );
        } else if (payload) {
            let s: T = new ctor();
            result = Object.assign(s, payload);
        }

        return result;
    }

    public async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    public convertDataURIToBinary(dataURI): Uint8Array {
        let BASE64_MARKER = ';base64,';
        var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
        var base64 = dataURI.substring(base64Index);
        var raw = window.atob(base64);
        var rawLength = raw.length;
        var array = new Uint8Array(new ArrayBuffer(rawLength));

        for (let i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }
        return array;
    }

    public async findOrCreateMonitor(schoolId: string, studentId: string, classId: string, subject: string, subjectId: string) {
        try {
            const monitor: ParseMonitor = await ParseApi.instance.getMonitorBySchoolAndStudentAndClass(schoolId, studentId, classId);
            if (!!monitor) return;
            await ParseApi.instance.createMonitor(schoolId, studentId, classId);
        } catch (e) {
            cc.log(e);
        } finally {
            ParseNetwork.getInstance().storeIntoCache(CURRENT_CLASS_ID, classId);
            ParseNetwork.getInstance().storeIntoCache(CURRENT_SUBJECT_NAME, subject);
            ParseNetwork.getInstance().storeIntoCache(CURRENT_SUBJECT_ID, subjectId);
        }
    }

    public async buildAndLoginUser(student: ParseStudent) {
        try {
            //  parse login (refresh sessions)
            const code: string = ParseNetwork.getInstance().getStringFromCache(SCHOOL_CODE);
            const password: string = ParseNetwork.getInstance().getStringFromCache(SCHOOL_PASSWORD);
            await ParseApi.instance.login(code, password);

            const gender: Gender = student.gender ? student.gender.toLowerCase() === "male" ? Gender.BOY : Gender.GIRL : Gender.UNKNOWN;
            // build current user or fetch existing user
            const currentUser: User = User.createUserOrFindExistingUser({
                    id: student.objectId,
                    name: student.name,
                    age: student.age,
                    gender: gender,
                    imgPath: student.image ? student.image.url : ''
                }
            );
            User.setCurrentUser(currentUser);

            // update Profile to local
            Profile.fromJsonUsingParse(student.profile);

        } catch (e) {
            cc.log(e);
        }
    }

    public async createMonitor(schoolId: string, studentId: string, classId: string): Promise<void> {
        const monitor: ParseMonitor = new ParseMonitor();
        monitor.school = ParseApi.instance.createPointer('School', schoolId);
        monitor.student = ParseApi.instance.createPointer('Student', studentId);
        monitor.class = ParseApi.instance.createPointer('Class', classId);
        monitor.activity = 'school-class'; // TBD

        const requestParams: RequestParams = {
            url: MONITOR_URL,
            body: monitor
        };
        await ParseNetwork.getInstance().post(requestParams);
    }

    // public async updateMonitor(info: UpdateMonitorInfo): Promise<any> {
    //     const schoolId: string = ParseNetwork.getInstance().getStringFromCache(CURRENT_SCHOOL_ID);
    //     const studentId: string = ParseNetwork.getInstance().getStringFromCache(CURRENT_STUDENT_ID);
    //     const classId: string = ParseNetwork.getInstance().getStringFromCache(CURRENT_CLASS_ID);
    //
    //     const monitor: ParseMonitor = await this.getMonitorBySchoolAndStudentAndClass(schoolId, studentId, classId);
    //     if (monitor) {
    //         const requestParams: RequestParams = {
    //             url : MONITOR_URL + "/" + monitor.objectId,
    //             body: info
    //         };
    //         return await ParseNetwork.getInstance().update(requestParams);
    //     }
    // }

    public async signUpUser(info: SignUpInfo): Promise<any> {
        if (info.username && info.password && info.email
            && info.fullName) {
            const requestParams: RequestParams = {
                url: SIGN_UP_URL,
                body: info
            };
            return await ParseNetwork.getInstance().post(requestParams);
        }
    }

    public async signUpTestUser(info: SignUpInfo): Promise<any> {
        if (info.username && info.phoneNumber && info.verficationId
            && info.code && info.password) {
            const requestParams: RequestParams = {
                url: SIGN_UP_TEST_URL,
                body: info
            };
            return await ParseNetwork.getInstance().post(requestParams);
        }
    }

    public async listAssignments(studentId: string, limit: number = 10) {
        let assignments: any[] = [];
        const requestParams: RequestParams = {
            url: LIST_ASSIGNMENTS,
            body: {
                studentId,
                limit
            }
        };
        const result = await ParseNetwork.getInstance().post(requestParams);
        if (result && result.data && result.data.result) {
            this.buildAssignments(assignments, result.data.result.myAssignments);
            this.buildAssignments(assignments, result.data.result.allAssignments);
        }
        return assignments;
    }

    buildAssignments(results: any[], assignments: any []) {
        const lessonMap = User.getCurrentUser().lessonProgressMap;
        assignments.forEach(
            (s: any[]) => {
                s.forEach(
                    a => {
                        let b: any = {};
                        let shouldInclude: boolean = true;
                        b.chapterId = a.chapter;
                        b.lessonId = a.lesson;
                        b.courseCode = a.subject.courseCode;
                        b.createAt = new Date(a.createAt);
                        if (lessonMap.has(a.lesson)) {
                            const lProgress: LessonProgress = User.getCurrentUser().lessonProgressMap.get(a.lesson);
                            shouldInclude = lProgress.date.getTime() < b.createAt.getTime();
                        }
                        if (shouldInclude) {
                            results.push(b)
                        }
                    }
                )
            }
        )

        results = results.filter((v, i, a) => a.findIndex(t => (t.chapterId === v.chapterId && t.lessonId === v.lessonId)) === i);
        return results;

    }

    public async updateProgress(info: UpdateProgressInfo): Promise<any> {
        if (info.studentId && info.studentId.length > 0) {
            const requestParams: RequestParams = {
                url: UPDATE_PROGRESS_URL,
                body: info
            };
            return await ParseNetwork.getInstance().post(requestParams);
        }
    }

    public async assignHomeWork(info: AssignHomeWorkInfo): Promise<any> {
        if (!!info) {
            const requestParams: RequestParams = {
                url: ASSIGN_HOMEWORK_URL,
                body: info
            };
            return await ParseNetwork.getInstance().post(requestParams);
        }
    }

    public async updateMonitor(info: UpdateMonitorInfo): Promise<any> {
        if (info.studentId && info.studentId.length > 0) {
            const requestParams: RequestParams = {
                url: UPDATE_MONITOR_URL,
                body: info
            };
            return await ParseNetwork.getInstance().post(requestParams);
        }
    }

    public async createSection(sectionName: string): Promise<any> {
        const requestParams: RequestParams = {
            url: CREATE_SECTION_URL,
            body: {
                schoolId: cc.sys.localStorage.getItem(CURRENT_SCHOOL_ID),
                sectionName: sectionName
            }
        };
        return await ParseNetwork.getInstance().post(requestParams);
    }

    public removeFromCache(key: string) {
        ParseNetwork.getInstance().removeFromCache(key);
    }

    public async updateHomeTeacher(info: UpdateHomeTeacher): Promise<any> {
        if (info.teacherId && info.teacherId.length > 0 &&
            info.homeId && info.homeId.length > 0) {
            const requestParams: RequestParams = {
                url: UPDATE_HOME_TEACHER_URL,
                body: info
            };
            return await ParseNetwork.getInstance().post(requestParams);
        }
    }

    public async updateProfile(info: ProfileInfo): Promise<any> {
        const studentId: string = info.studentId;
        if (studentId && studentId.length > 0) {
            const requestParams: RequestParams = {
                url: STUDENT_URL + "/" + studentId,
                body: {
                    profile: info.profile
                }
            };
            return await ParseNetwork.getInstance().update(requestParams);
        }
    }

    /*
        no caching
     */
    public async getMonitorBySchoolAndStudentAndClass(schoolId: string, studentId: string, classId: string): Promise<ParseMonitor> {
        let jsonResult = [];
        let monitor: ParseMonitor = null;
        const requestParams: RequestParams = {
            url: MONITOR_URL,
            queryParams: {
                'school': ParseNetwork.getInstance().createPointer('School', schoolId),
                'student': ParseNetwork.getInstance().createPointer('Student', studentId),
                'class': ParseNetwork.getInstance().createPointer('Class', classId)
            },
            isWhereQuery: true
        };
        jsonResult = await ParseNetwork.getInstance().get(requestParams);
        const monitors: ParseMonitor[] = ParseApi.instance.fromJson(jsonResult, ParseMonitor, false);
        monitor = monitors && monitors.length > 0 ? monitors[0] : null;
        return monitor;
    }

    public createPointer(className: string, objectId: string): Pointer {
        return {
            __type: 'Pointer',
            className: className,
            objectId: objectId
        };
    }

    public async getAssignmentsForChapterForWholeClass(schoolId: string, chapter: string): Promise<ParseAssignmentForChapter[]> {
        const storyKey = ASSIGNMENTS_FOR_CHAPTER + schoolId + chapter;
        let jsonResult = [];
        const requestParams: RequestParams = {
            url: ASSIGNMENTS_API_URL,
            queryParams: {
                'school': ParseNetwork.getInstance().createPointer('School', schoolId),
                'student': null,
                'chapter': chapter
            },
            isWhereQuery: true
        };
        jsonResult = await ParseNetwork.getInstance().get(requestParams, storyKey);
        const responses: ParseAssignmentForChapter[] = ParseApi.instance.fromJson(jsonResult, ParseAssignmentForChapter, false);
        return responses;
    }

    public async getAssignmentsForStudentsByChapterAndLesson(schoolId: string, sectionId: string, chapter: string, lesson: string, students: ParseStudent[]): Promise<ParseAssignmentForChapter[]> {
        let jsonResult = [];

        let studentPointers = students.map(s => {
            return {
                'student': ParseNetwork.getInstance().createPointer('Student', s.objectId)
            };
        });

        const requestParams: RequestParams = {
            url: ASSIGNMENTS_API_URL,
            queryParams: {
                'school': ParseNetwork.getInstance().createPointer('School', schoolId),
                'section': ParseNetwork.getInstance().createPointer('Section', sectionId),
                'chapter': chapter,
                'lesson': lesson,
                '$or': studentPointers
            },
            isWhereQuery: true
        };
        jsonResult = await ParseNetwork.getInstance().get(requestParams);
        const responses: ParseAssignmentForChapter[] = ParseApi.instance.fromJson(jsonResult, ParseAssignmentForChapter, false);
        return responses;
    }

    public async getTeachers(studentId: string): Promise<string[]> {
        const teachers: ParseTeachersForStudent[] = await this.getTeachersByStudent(studentId);
        const names = teachers.map(t => t.school.user.fullName);
        return names;
    }

    public async getChapterProgressByStudent(studentId: string): Promise<ParseChapterProgress[]> {
        const storyKey = CHAPTER_PROGRESS + studentId;
        let jsonResult = [];
        const requestParams: RequestParams = {
            url: CHAPTER_PROGRESS_URL,
            queryParams: {
                'student': ParseNetwork.getInstance().createPointer('Student', studentId)
            },
            isWhereQuery: true
        };
        jsonResult = await ParseNetwork.getInstance().get(requestParams, storyKey);
        const responses: ParseChapterProgress[] = ParseApi.instance.fromJson(jsonResult, ParseChapterProgress, false);
        return responses;
    }

    public async getTeachersByStudent(studentId: string): Promise<ParseTeachersForStudent[]> {
        const storyKey = TEACHERS_FOR_STUDENT + studentId;
        let jsonResult = [];
        const requestParams: RequestParams = {
            url: SCHOOL_STUDENT_URL,
            queryParams: {
                'student': ParseNetwork.getInstance().createPointer('Student', studentId)
            },
            isWhereQuery: true,
            includeParam: 'school.user'
        };
        jsonResult = await ParseNetwork.getInstance().get(requestParams, storyKey);
        const responses: ParseTeachersForStudent[] = ParseApi.instance.fromJson(jsonResult, ParseTeachersForStudent, false);
        return responses;
    }

    public async getAssignments(schoolId: string, sectionId: string): Promise<ParseAssignment> {
        const storyKey = ASSIGNMENTS + schoolId + sectionId;
        const cachedAssignment = ParseNetwork.getInstance().getParseObjectFromCache(storyKey);
        if (!!cachedAssignment) {
            return ParseApi.instance.fromJson(cachedAssignment, ParseAssignment, true);
        }

        const assignment: ParseAssignment = new ParseAssignment();
        assignment.schoolId = schoolId;
        assignment.sectionId = sectionId;
        assignment.assignments = [];
        assignment.students = [];

        try {
            let jsonResult;
            const requestParams: RequestParams = {
                url: ASSIGNMENTS_URL,
                body: {
                    'schoolId': schoolId,
                    'sectionId': sectionId
                }
            };
            jsonResult = await ParseNetwork.getInstance().post(requestParams);
            if (!!jsonResult && !!jsonResult.data && !!jsonResult.data.result) {
                const progressResults = jsonResult.data.result.progressResults || [];
                let students = jsonResult.data.result.students || [];
                assignment.students = students.map(s => {
                    return {
                        name: s.student.name,
                        studentId: s.student.objectId
                    }
                });

                assignment.assignments = progressResults.map(
                    p => {
                        let result: Result = {} as Result;
                        assignment.assignments.push(result);
                        result.chapter = p.chapter;
                        result.subject = p.subject.courseCode;
                        result.lesson = p.lesson;
                        result.studentAssessments = [];
                        if (!!p.progressInfo && p.progressInfo.length > 0) {
                            p.progressInfo.forEach(i => {
                                result.studentAssessments.push({
                                    studentId: i.pStudent.objectId,
                                    assessment: i.assessment
                                })
                            })
                        }
                        return result;
                    }
                )

                ParseNetwork.getInstance().storeIntoCache(storyKey, assignment);
                return ParseApi.instance.fromJson(assignment, ParseAssignment, true);
            }
        } catch (e) {
            return assignment;
        }
    }

    public async getLearningSummary(ids: string[]): Promise<LearningSummaryForStudent[]> {
        // SHOULD WE CACHE TBD
        let jsonResult = [];

        let studentIds = ids.map(id => {
            return {
                'student': ParseNetwork.getInstance().createPointer('Student', id)
            };
        });

        let result: LearningSummaryForStudent[] = [];

        let queryCondition = null;
        queryCondition = {
            '$or': studentIds
        };

        const requestParams: RequestParams = {
            url: LEARNING_SUMMARY_URL,
            queryParams: queryCondition,
            isWhereQuery: true
        };
        jsonResult = await ParseNetwork.getInstance().get(requestParams) || [];
        jsonResult.forEach(r => {
            result.push({
                studentId: r.student.objectId,
                totalTime: r.totalTime,
                totalLessons: r.totalLessons
            });
        });
        cc.log('result', result);

        return result;
    }
}