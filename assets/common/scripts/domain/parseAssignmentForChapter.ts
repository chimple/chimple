import {Pointer} from "./parseSchool";

export class ParseAssignmentForChapter {
    objectId: string;
    school: Pointer;
    section: Pointer;
    subject: Pointer;
    chapter: string;
    lesson: string;
    createdAt: string;
    updatedAt: string;
    student?: Pointer;
}