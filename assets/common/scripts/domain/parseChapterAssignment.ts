import {Pointer} from "./parseSchool";

export class ParseChapterAssignment {
    objectId: string;
    school: Pointer;
    section: Pointer;
    subject: Pointer;
    chapter: string;
    percentage: number;
    createdAt: string;
    updatedAt: string;
}