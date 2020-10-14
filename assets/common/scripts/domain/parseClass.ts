import { Pointer } from "./parseSchool";
import { ParseACL } from "./parseACL";
import { ParseSubject } from "./parseSubject";
import { ParseUser } from "./parseUser";

export class ParseClass {
    objectId: string;
    teacher: ParseUser;
    active: boolean;
    acl: ParseACL;
    subject: ParseSubject;
    sections: Pointer[];
    school: Pointer;
    createdAt: string;
    updatedAt: string;
}