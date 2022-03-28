import { ParseSchool } from "../domain/parseSchool";
import { UpdateHomeTeacher } from "./parseApi";

export interface ServiceApi {
    teacherRequestAccepted(request: AcceptTeacherRequest): Promise<any>;

    schoolById(teacherId: string): Promise<any>;

    getAuthHeader(): any;

    updateProgress(info: UpdateProgressInfo): Promise<any>;

    updateHomeTeacher(info: UpdateHomeTeacher): Promise<any>;

    listAssignments(studentId: string, limit: number): Promise<any>;

    linkStudent(studentId: string, code: string, phoneNumber: string, age: number, name: string, countryCode: string): Promise<any>;

    syncFailedProgresses(infos: UpdateProgressInfo[]): Promise<any>;

    getLeaderboard(studentId: string, sectionId: string, schoolId: string): Promise<any>;
}

export interface AcceptTeacherRequest {
    teacherId: string;
    studentId: string;
    firebaseStudentId: string;
    sectionId: string;
    studentName?: string;
    studentAge?: string;
    studentGender?: string;
    otpCode?: string;
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
    courseName?: string;
    assignmentId?: string;
    chapterName?: string;
    lessonName?: string;
    dateTimeStamp?: number;
}
