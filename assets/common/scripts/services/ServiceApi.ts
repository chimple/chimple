import {ParseSchool} from "../domain/parseSchool";
import {UpdateHomeTeacher} from "./parseApi";

export interface ServiceApi {
    teacherRequestAccepted(request: AcceptTeacherRequest): Promise<any>;
    schoolById(teacherId: string): Promise<any>;
    getAuthHeader(): any;
    updateProgress(info: UpdateProgressInfo): Promise<any>;
    updateHomeTeacher(info: UpdateHomeTeacher): Promise<any>;
}

export interface AcceptTeacherRequest {
    teacherId: string;
    studentId: string,
    sectionId: string;
    studentName?: string;
    studentAge?: string;
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