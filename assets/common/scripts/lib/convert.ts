// To parse this data:
//
//   import { Convert, Course } from "./file";
//
//   const course = Convert.toCourse(json);

export interface Course {
    chapters: Chapter[];
    id: string;
    name: string;
    lang: string;
}

export interface Chapter {
    id: string;
    lessons: Lesson[];
    name: string;
    image: string;
}

export interface Lesson {
    id: string;
    image: string;
    name: string;
    open: boolean;
    type: string;
    skills: Array<string>;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toCourse(json: string): Course {
        return JSON.parse(json);
    }

    public static courseToJson(value: Course): string {
        return JSON.stringify(value);
    }
}
