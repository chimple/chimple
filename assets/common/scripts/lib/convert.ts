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
    type: string;
    levels: string[];
}

export interface Chapter {
    id: string;
    lessons: Lesson[];
    name: string;
    image: string;
    color?: string;
    course: Course;
}

export interface Lesson {
    id: string;
    image: string;
    name: string;
    open?: boolean;
    type?: string;
    skills?: Array<string>;
    color?: string;
    chapter: Chapter;
    assignmentId?: string;
    mlPartnerId?: string;
    mlClassId?: string;
    mlStudentId?: string;
}

export interface StampReward {
    done: boolean;
    stickers: StickerReward[]
}

export interface StickerReward {
    id: string;
    unlocked: boolean;
    fixed: boolean;
    peeled: boolean;
    x?: number;
    y?: number;
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
