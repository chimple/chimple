import { ParseSchool, Pointer } from "./parseSchool";
import { ParseACL } from "./parseACL";

export class ParseConnection {
    objectId: string;
    role: string;
    user: Pointer;
    school: ParseSchool;
    createdAt: string;
    updatedAt: string;
    acl: ParseACL;
}