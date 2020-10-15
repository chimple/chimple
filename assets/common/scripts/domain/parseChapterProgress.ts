import {Pointer} from "./parseSchool";
import {ParseACL} from "./parseACL";

export class ParseChapterProgress {
    objectId?: string;
    acl?: ParseACL;
    subject?: Pointer;
    chapter?: string;
    avgAssessment?: number;
    student?: Pointer;
    totalTimeSpent?: number;
    percentComplete?: number;
    createdAt?: string;
    updatedAt?: string;
}
