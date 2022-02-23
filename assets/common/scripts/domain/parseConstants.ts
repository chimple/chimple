export const APPLICATION_ID = 'x45P2SW2h1UfyDT8F0C9vpKmOGe7eFCnIo33Q2dk';
export const PARSE_REST_API_KEY = 'PIvgGRHCSFYNN9h1qhpHQ9KtEbtbwNbZ2oGknZ3g';
export const DEFAULT_TIMEOUT = 60000;
export const MINUTE_TIMEOUT = 60000;
export const GET = 'get';
export const POST = 'post';
export const PUT = 'put';

export enum LoginType {
    School,
    Teacher
};

export const LOGIN_TYPE = 'LOGIN_TYPE';
export const SCHOOL_CODE = 'SCHOOL_CODE';
export const SCHOOL_PASSWORD = 'SCHOOL_PASSWORD';

export const TEACHER_EMAIL = 'TEACHER_EMAIL';
export const TEACHER_PASSWORD = 'TEACHER_PASSWORD';

export const LOGGED_IN_USER = 'loggedInUser';
export const CURRENT_SELECTED_SCHOOL = 'selectedSchool';
export const CURRENT_CONNECTION = 'selectedConnection';
export const CURRENT_TEACHER_SCHOOL = 'selectedTeacherSchool';
export const CHAPTER_ASSIGNMENT = 'chapterAssignment';
export const CHAPTER_PROGRESS = 'chapterProgress';
export const SCHOOL_BY_ID = 'schoolById';

export const SECTIONS = 'sections';
export const SUBJECTS = 'subjects';
export const STUDENTS = 'students';
export const CLASSES = 'classes';
export const SUBJECT = 'subject';
export const TEACHER = 'teacher';
export const MONITORS = 'monitors';
export const ASSIGNMENTS = 'assignments';
export const STUDENTS_FOR_TEACHER = 'studentsForTeacher';
export const CURRENT_SUBJECT_NAME = 'CURRENT_SUBJECT_NAME';
export const ASSIGNMENTS_FOR_CHAPTER = 'ASSIGNMENTS_FOR_CHAPTER';
export const TEACHERS_FOR_STUDENT = 'TEACHERS_FOR_STUDENT';[]
// API

export const LOGIN_URL = 'https://parseapi.back4app.com/login';
export const CONNECTION_URL = 'https://parseapi.back4app.com/classes/Connection';
export const SCHOOL_URL = 'https://parseapi.back4app.com/classes/School';
export const CHAPTER_ASSIGNMENT_URL = 'https://parseapi.back4app.com/classes/ChapterAssignmentStatus';
export const SECTION_URL = 'https://parseapi.back4app.com/classes/Section';
export const SUBJECT_URL = 'https://parseapi.back4app.com/classes/Subject';
export const CLASS_URL = 'https://parseapi.back4app.com/classes/Class';
export const MONITOR_URL = 'https://parseapi.back4app.com/classes/Monitor';
export const USER_URL = 'https://parseapi.back4app.com/users';
export const STUDENT_URL = 'https://parseapi.back4app.com/classes/Student';
export const LEARNING_SUMMARY_URL = 'https://parseapi.back4app.com/classes/LearningSummary';
export const SCHOOL_STUDENT_URL = 'https://parseapi.back4app.com/classes/SchoolStudents';
export const UPDATE_PROGRESS_URL = 'https://parseapi.back4app.com/functions/updateProgress';
export const ASSIGN_HOMEWORK_URL = 'https://parseapi.back4app.com/functions/updateAssignment';
export const SIGN_UP_URL = 'https://parseapi.back4app.com/functions/signUp';
export const SIGN_UP_TEST_URL = 'https://parseapi.back4app.com/functions/signUpTest';
export const LIST_ASSIGNMENTS = 'https://parseapi.back4app.com/functions/listAssignment'
export const UPDATE_MONITOR_URL = 'https://parseapi.back4app.com/functions/updateMonitor';
export const UPDATE_HOME_TEACHER_URL = 'https://parseapi.back4app.com/functions/createStudent';
export const TUITION_URL = 'https://parseapi.back4app.com/classes/Tuition';
export const PROGRESS_URL = 'https://parseapi.back4app.com/classes/Progress';
export const ASSIGNMENTS_URL = 'https://parseapi.back4app.com/functions/assignments';
export const ASSIGNMENTS_API_URL = 'https://parseapi.back4app.com/classes/Assignment';
export const CREATE_SECTION_URL = 'https://parseapi.back4app.com/functions/createSection';
export const CHAPTER_PROGRESS_URL = 'https://parseapi.back4app.com/classes/ChapterProgress';

// Events
export const UPDATE_PROFILE = 'update_profile';
export const UPDATE_MONITOR = 'update_monitor';
export const UPDATE_PROGRESS = 'update_progress';
export const UPDATE_HOME_TEACHER = 'update_home_teacher';
export const ASSIGN_HOMEWORK = 'assign_homework';

export const UPDATE_HOME_TEACHER_FAILED = 'update_home_teacher_failed';
export const UPDATE_PROFILE_FAILED = 'update_profile_failed';
export const ASSIGN_HOMEWORK_FAILED = 'assign_homework_failed';
export const UPDATE_MONITOR_FAILED = 'update_monitor_failed';
export const UPDATE_PROGRESS_FAILED = 'update_progress_failed';
export const SYNC_PROGRESS_FAILED = 'sync_progress_failed';


export const FIREBASE_SCHOOL_URL = 'https://us-central1-bahama-stage.cloudfunctions.net/chimple/getSchool?id=';
export const FIREBASE_UPDATE_HOME_TEACHER_URL = 'https://us-central1-bahama-stage.cloudfunctions.net/chimple/createStudent';
export const FIREBASE_LIST_ASSIGNMENTS = 'https://us-central1-bahama-stage.cloudfunctions.net/chimple/assignments?studentId='
export const FIREBASE_UPDATE_PROGRESS_URL = 'https://us-central1-bahama-stage.cloudfunctions.net/chimple/updateProgressOnHttp';
export const FIREBASE_SYNC_FAILED_PROGRESS_URL = 'https://us-central1-bahama-stage.cloudfunctions.net/chimple/syncProgressOnHttp';
export const FIREBASE_LINK_STUDENT_URL = 'https://us-central1-bahama-stage.cloudfunctions.net/chimple/LinkStudent';

export const WEBCLASS_HISTORICAL_PROGRESS_URL_PROD = 'https://cvjgnzup21.execute-api.ap-south-1.amazonaws.com/webclasshistoricaldata-prod';
export const WEBCLASS_HISTORICAL_PROGRESS_URL_TEST = 'https://cvjgnzup21.execute-api.ap-south-1.amazonaws.com/webclasshistoricaldata-test';
