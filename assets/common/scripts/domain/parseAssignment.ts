export class ParseAssignment {
    schoolId: string;
    subjectId: string;
    sectionId: string;
    students: Student[]
    assignments: Result[];
}

export class Student {
    name: string;
    studentId: string;
}


export class Result {
    chapter: string;
    lesson: string;
    studentAssessments: StudentAssessment[];
    subject: string;
}

export class StudentAssessment {
    studentId: string;
    assessment: number;
}