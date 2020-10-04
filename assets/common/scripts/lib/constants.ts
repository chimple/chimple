export enum DeployMode {
    Open,
    Close
}

export enum Mode {
    Base,
    Home,
    Teacher,
    School,
    None
}

export let D_MODE: DeployMode = DeployMode.Close;
export let MODE: Mode = Mode.None;

export const LANG = 'en';
export const ENV = 'web';
export const ASSET_LOAD_METHOD = 'file'; //'file', 'resources'
// export const ASSET_LOAD_METHOD = 'resources' //'file', 'resources'
// export const COURSES_URL = 'https://chimple-ee1ed.web.app/courses/'
// export const COURSES_URL = `https://bahama-${LANG}-${ENV}.web.app/courses/`
// export const COURSES_URL = 'http://localhost:8901/courses/'
export const ANDROID_ROOT_DIR = '/sdcard/bahama/';
export const SIMULATOR_ROOT_DIR = '/Users/shyamalupadhyaya/Dev/chimple-git/sdcard/bahama/';

export const COURSE_SERVER = {
    'local': {
        'hi'      : 'http://localhost:8901/courses/',
        'en'      : 'http://localhost:8901/courses/',
        'en-maths': 'http://localhost:8901/courses/',
        'hi-maths': 'http://localhost:8901/courses/'
    },
    'dev'  : {
        'hi'      : 'https://bahama-hi-stage.web.app/bundles/courses/',
        'en'      : 'https://bahama-hi-stage.web.app/bundles/courses/',
        'en-maths': 'https://bahama-hi-stage.web.app/bundles/courses/',
        'hi-maths': 'https://bahama-hi-stage.web.app/bundles/courses/'
    },
    'stage': {
        'hi'      : 'https://bahama-hi-stage.web.app/new/courses/',
        'en'      : 'https://bahama-hi-stage.web.app/new/courses/',
        'en-maths': 'https://bahama-hi-stage.web.app/new/courses/',
        'hi-maths': 'https://bahama-hi-stage.web.app/new/courses/'
    },
    'prod' : {
        'hi'      : 'https://bahama-hi-prod.web.app/courses/',
        'en'      : 'https://bahama-hi-prod.web.app/courses/',
        'en-maths': 'https://bahama-hi-prod.web.app/courses/',
        'hi-maths': 'https://bahama-hi-prod.web.app/courses/'
    }
};

export const COURSES_URL = ENV == 'web' ? '' : COURSE_SERVER[ENV][LANG];

// Moved from gameController
export const LOG_GAME = 'game';
export const LOG_WORLD = 'world';
export const LOG_LEVEL = 'level';
export const COURSE = 'course';
export const SKILLS = 'skills';
export const LOG_GAME_LEVEL = 'gameLevel';
export const LOG_PROBLEM = 'problem';
export const LOG_WRONG_MOVES = 'wrongMoves';
export const LOG_RIGHT_MOVES = 'rightMoves';
export const LOG_TYPE = 'type';
export const PROBLEM_START = 'problemStart';
export const GAME_START = 'gameStart';
export const PROBLEM_END = 'problemEnd';
export const GAME_END = 'gameEnd';
export const LEVEL_COMPLETED = 'level_completed';
export const WORLD_COMPLETED = 'world_completed';
export const APP_START = 'app_start';
export const APP_END = 'app_end';
export const FAIL_TO_COLLECT_ALL_REWARDS = 'failToCollectAllRewards';
export const SELECT_CONTENT = 'select_content';
export const ITEM_ID = 'item_id';
export const CONTENT_TYPE = 'content_type';
export const UNLOCK_ACHIEVEMENT = 'unlock_achievement';
export const ACHIEVEMENT_ID = 'achievement_id';
export const LEVEL_START = 'level_start';
export const LEVEL_NAME = 'level_name';
export const LEVEL_END = 'level_end';
export const QUEUE_OFFLOAD_FREQUENCY = 30000;
export const PARSE_ENABLED: boolean = true;
export const CURRENT_SCHOOL_ID = 'CURRENT_SCHOOL_ID';
export const CURRENT_STUDENT_ID = 'CURRENT_STUDENT_ID';
export const CURRENT_CLASS_ID = 'CURRENT_CLASS_ID';
export const CURRENT_SECTION_ID = 'CURRENT_SECTION_ID';
export const CURRENT_SUBJECT_ID = 'CURRENT_SUBJECT_ID';

export const LOGGED_IN_USER = 'loggedInUser';

export const EXAM = 'exam'
export const MIN_PASS = 70