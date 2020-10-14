import { ParseACL } from "./parseACL";
import { Pointer } from "./parseSchool";

export class ParseTuition {
    objectId: string;
    acl: ParseACL;
    student: Pointer;
    teacher: Pointer;
    createdAt: string;
    updatedAt: string;
}