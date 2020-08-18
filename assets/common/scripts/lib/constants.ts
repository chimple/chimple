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
export const ENV = 'stage';
export const ASSET_LOAD_METHOD = 'file'; //'file', 'resources'
// export const ASSET_LOAD_METHOD = 'resources' //'file', 'resources'
// export const COURSES_URL = 'https://chimple-ee1ed.web.app/courses/'
// export const COURSES_URL = `https://bahama-${LANG}-${ENV}.web.app/courses/`
// export const COURSES_URL = 'http://localhost:8901/courses/'
export const ANDROID_ROOT_DIR = '/sdcard/bahama/';
export const SIMULATOR_ROOT_DIR = '/Users/shyamalupadhyaya/Dev/chimple-git/sdcard/bahama/';

export const COURSE_SERVER = {
    'dev'  : {
        'hi'      : 'http://localhost:8901/courses/',
        'en'      : 'http://localhost:8901/courses/',
        'en-maths': 'http://localhost:8901/courses/',
        'hi-maths': 'http://localhost:8901/courses/'
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

export const COURSES_URL = COURSE_SERVER[ENV][LANG];
