import {ParseACL} from "./parseACL";
import {FilePointer} from "./parseSchool";

export class ParseUser {
    ACL: ParseACL;
    createdAt: string;
    email: string;
    allowLogin: boolean;
    emailVerified: boolean;
    objectId: string;
    sessionToken: string;
    updatedAt: string;
    username: string;
    image: FilePointer;
    fullName: string;
    password?: string;
}