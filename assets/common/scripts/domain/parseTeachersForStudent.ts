import {Pointer} from "./parseSchool";
import {ParseUser} from "./parseUser";

export class ParseTeachersForStudent {
    objectId: string;
    section: Pointer;
    school: SchoolWithTeacher;
}

export class SchoolWithTeacher {
    objectId: string;
    name: string;
    user: ParseUser;
}

