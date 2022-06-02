import {AcceptTeacherRequest, CustomAuthInfo, LeaderboardInfo, ServiceApi, UpdateProgressInfo} from "./ServiceApi";
import {UpdateHomeTeacher} from "./parseApi";

export class ApiHandler {
    public static i: ApiHandler;

    private s: ServiceApi;

    private constructor() {
    }

    public static getInstance(s: ServiceApi): ApiHandler {
        if (!ApiHandler.i) {
            ApiHandler.i = new ApiHandler();
            ApiHandler.i.s = s;
        }


        return ApiHandler.i;
    }

    public async updateProgress(info: UpdateProgressInfo): Promise<any> {
        return await this.s.updateProgress(info);
    }

    public async teacherRequestAccepted(request: AcceptTeacherRequest): Promise<any> {
        return await this.s.teacherRequestAccepted(request);
    }

    public async schoolById(id: string): Promise<string> {
        return await this.s.schoolById(id);
    }

    public async updateHomeTeacher(info: UpdateHomeTeacher): Promise<any> {
        return await this.s.updateHomeTeacher(info);
    }

    public async listAssignments(studentId: string, limit: number = 10) {
        return await this.s.listAssignments(studentId, limit);
    }

    public async linkStudent(studentId: string, code: string,phoneNumber: string = null,age: number = null,name: string = null,countryCode:string = null) {
        return await this.s.linkStudent(studentId, code,phoneNumber,age,name,countryCode);
    }

    public async syncFailedProgresses(infos: UpdateProgressInfo[]): Promise<any> {
        return await this.s.syncFailedProgresses(infos);
    }

    public async getLeaderboard(studentId: string, sectionId: string, schoolId: string): Promise<LeaderboardInfo> {
        return await this.s.getLeaderboard(studentId, sectionId, schoolId);
    }
    public async customAuth(code: string, phoneNumber: string, countryCode: string,progressId:string): Promise<CustomAuthInfo> {
        return await this.s.customAuth(code, phoneNumber, countryCode,progressId);
    }
}
