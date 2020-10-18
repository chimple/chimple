import { Pointer } from "./parseSchool";
import { ParseACL } from "./parseACL";

export class ParseProgress {
    objectId: string;
    timeSpent: number;
    assessment: number;
    max: boolean;
    section: Pointer;
    acl: ParseACL;
    chapter: string;
    school: Pointer;
    lesson: string;
    student: Pointer;
    createdAt: string;
    updatedAt: string;
}