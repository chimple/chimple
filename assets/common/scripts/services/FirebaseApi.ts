import {AuthHeader, ParseNetwork, RequestParams} from "./ParseNetwork";
import {AcceptTeacherRequest, ServiceApi, UpdateProgressInfo} from "./ServiceApi";
import {Queue} from "../../../queue";
import {UpdateHomeTeacher} from "./parseApi";
import {
    FIREBASE_SCHOOL_URL,
    FIREBASE_UPDATE_HOME_TEACHER_URL
} from "../domain/parseConstants";
import {ServiceConfig} from "./ServiceConfig";

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
        const schoolId = await ServiceConfig.getI().handle.schoolById(request.teacherId);
        if(!!schoolId && schoolId.length > 0) {
            let updateHomeTeacherInfo: UpdateHomeTeacher = {
                homeId: request.studentId,
                teacherId: request.teacherId,
                kind: "UpdateHomeTeacher",
                studentName: request.studentName,
                schoolId: schoolId,
                sectionId: request.sectionId
            };
            Queue.getInstance().push(updateHomeTeacherInfo);
        }
    }

    async updateProgress(info: UpdateProgressInfo): Promise<any> {
        return Promise.resolve(undefined);
    }

    async schoolById(teacherId: string): Promise<any> {
        let schoolId = null;
        const requestParams: RequestParams = {
            url: FIREBASE_SCHOOL_URL + teacherId
        };
        let jsonResult = await ParseNetwork.getInstance().get(requestParams, teacherId, this.getAuthHeader()) || [];
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

}