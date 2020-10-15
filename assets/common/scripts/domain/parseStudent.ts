import { FilePointer, Pointer } from "./parseSchool";

export class ParseSchoolStudent {
    objectId: string;
    school: Pointer;
    section: Pointer;
    student: ParseStudent;
    createdAt: string;
    updatedAt: string;
}

export class ParseStudent {
    className: string;
    objectId: string;
    name: string;
    gender: string;
    age: number;
    image: FilePointer;
    profile: string;
    createdAt: string;
    updatedAt: string;

}