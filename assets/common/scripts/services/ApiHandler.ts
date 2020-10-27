import {AcceptTeacherRequest, ServiceApi, UpdateProgressInfo} from "./ServiceApi";
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
}
