import { ParseACL } from "./parseACL";
import { FilePointer, Pointer } from "./parseSchool";

export class ParseSubject {
    objectId: string;
    acl: ParseACL;
    name: string;
    image: FilePointer;
    chapters: Pointer[];
    courseCode: string;
    createdAt: string;
    updatedAt: string;
}