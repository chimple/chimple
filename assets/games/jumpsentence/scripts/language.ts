export enum Language {
    English,
    Hindi,
    Urdu
}

export enum Case {
    Upper,
    Lower,
    None
}

export default class Alphabets {

    static alphabets = {
        'en': {
            'upper': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                'U', 'V', 'W', 'X', 'Y', 'Z'],
            'lower': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                'u', 'v', 'w', 'x', 'y', 'z']
        },
        'ur': {},
        'hi': {}
    }


    static GetAlphabets(languageType: Language, caseType: Case) {
        switch (languageType) {
            case Language.English: return caseType == Case.Upper ? this.alphabets.en.upper : this.alphabets.en.lower;
            case Language.Hindi: return this.alphabets.hi;
            case Language.Urdu: return this.alphabets.ur;
        }
    }
} 
