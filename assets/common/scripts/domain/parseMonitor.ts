import { ParseACL } from "./parseACL";
import { Pointer } from "./parseSchool";

export class ParseMonitor {
    objectId?: string;
    incorrect?: number;
    totalQuestions?: number;
    correct?: number;
    acl?: ParseACL;
    activity: string;
    totalChallenges?: number;
    lesson: string;
    chapter: string;
    school: Pointer;
    class: Pointer;
    student: Pointer;
    totalSeconds?: number;
    createdAt?: string;
    updatedAt?: string;
}