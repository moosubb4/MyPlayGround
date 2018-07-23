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
    yearLenth?: string;
}

export interface Weeks {
    week1?: Daydetail[];
    week2?: Daydetail[];
    week3?: Daydetail[];
    week4?: Daydetail[];
    week5?: Daydetail[];
    week6?: Daydetail[];
}

export interface Yearlength {
    isYear?: number;
    monthOfyear?: number[];
}

export interface Daydetail {
    day?: number;
    month?: number;
}

export interface FormatDate {
    isEra: boolean;
    format: string;
}


