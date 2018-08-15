export interface DatepickerJapan {
    dayNames: string[];
    dayNamesShort: string[];
    dayNamesMin: string[];
    monthNames: string[];
    monthNamesShort: string[];
    yearNamesShort: string[];
}

export interface Datedata {
    year: number;
    month: number;
    day: number;
}

export interface JapEra {
    era: string;
    first: string;
    last: string;
}

export interface Weeks {
    week1?: number[];
    week2?: number[];
    week3?: number[];
    week4?: number[];
    week5?: number[];
}

export interface Yearlength {
    isYear?: number;
    monthOfyear?: number[];
}
