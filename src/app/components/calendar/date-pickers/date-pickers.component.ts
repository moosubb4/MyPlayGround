import { Component, OnInit, OnChanges, Input, ViewChild, ElementRef } from '@angular/core';
import { DatepickerJapan, Datedata, JapEra, Weeks, Yearlength, FormatDate, Daydetail } from './date.model';
import { empty } from '../../../../../node_modules/rxjs/Observer';

@Component({
  selector: 'app-date-pickers',
  templateUrl: './date-pickers.component.html',
  styleUrls: ['./date-pickers.component.css']
})

export class DatePickersComponent implements OnInit, OnChanges {
  // Often in the form yyyy年mm月dd日;
  // sometimes Japanese era year is used, e.g. (平成=heisei) 18(年=Y)12(月=M)30(日=Y).
  @ViewChild('inputTel') inputTel: ElementRef;
  @Input() optionDate: {
    formatDate: string;
  };

  public dateJap: DatepickerJapan;
  public onDatepicker: boolean;
  public inputDates: string;
  public showDates: string;
  public heisei: number;
  public showa: number;
  public taisho: number;
  public meiji: number;
  public japYear: JapEra[] = [];
  public yearShort: string[] = [];

  public showYear: boolean;
  public showMonth: boolean;
  public showDay: boolean;
  public showDropdown: boolean;
  public weeks: Weeks = {};
  public showWeeks: number[] = [];
  public showYearLength: Yearlength[] = [];

  public selectJapEra: string;
  public selectYear: number;
  public selectMonth: number; // string;
  public selectDay: number;
  public monthOfyear: number[] = [];

  public formatDate: FormatDate[] = [];

  public maxLen: number;

  constructor() {

    this.dateJap = {
      dayNames: [
        'げつようび',
        'かようび',
        'すいようび',
        'もくようび',
        'きんようび',
        'どようび',
        'にちようび'
      ],
      dayNamesShort: [
        '日曜日',
        '月曜日',
        '火曜日',
        '水曜日',
        '木曜日',
        '金曜日',
        '土曜日'
      ],
      dayNamesMin: [
        '日',
        '月',
        '火',
        '水',
        '木',
        '金',
        '土'
      ],
      monthNames: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月'
      ],
      monthNamesShort: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月'
      ],
      yearNamesShort: [
        'S',
        'H'
      ]
    };

    this.japYear = [
      { era: 'heisei', first: '1989/1/8', last: '', yearLenth: '1989:' },
      { era: 'showa', first: '1926/12/25', last: '1989/1/7', yearLenth: '1926:1989' },
      // { era: 'taisho', first: '1912/7/30', last: '1926/12/24', yearLenth: '1912:1926'  },
      // { era: 'meiji', first: '1868/1/25', last: '1912/7/39' , yearLenth: '1868:1912' }
    ];

    this.yearShort = ['', ...this.dateJap.yearNamesShort];

    this.formatDate = [
      { isEra: true, format: 'yy/mm/dd' },
      { isEra: false, format: 'yyyy/mm/dd' }
    ];

    // ======================Set Defualts============== //

    const dates = new Date(Date.now());
    const date = dates.getDate();
    const month = dates.getMonth();
    const year = dates.getFullYear();
    // console.log(
    //   '​datesUTC', dates,
    //   '\nDate()', new Date(dates.setUTCDate(22)),
    //   '\nDays()', dates.getUTCDay(),
    //   '\nMonth()', dates.getUTCMonth(),
    //   '\nYear()', dates.getUTCFullYear()
    // );

    // console.log(`createDate -> ${dates.getFullYear()}/${dates.getMonth()}/${dates.getDate()}`);
    this.inputDates = `${year}/${month + 1}/${date}`;

    this.onDatepicker = true; // false;

    this.showDropdown = true;

  }

  ngOnInit() {
    this.requestOption();
    this.createDate();
    // this.selectedDate(this.setFormattDate(this.inputDates));
  }

  ngOnChanges() {
  }

  requestOption() { // setting option
    if (this.optionDate) {
      this.maxLen = this.showDropdown ? this.optionDate.formatDate.length - 1 : this.optionDate.formatDate.length;
      const format = this.optionDate.formatDate;
      const yStr = (format.match(/y/g) || []).length > 0 ? this.showYear = true : this.showYear = false;
      const mStr = (format.match(/m/g) || []).length > 0 ? this.showMonth = true : this.showMonth = false;
      // console.log('requestOption -> ', yStr, mStr);
    }
  }

  toggleDatepicker(isShow?: string) { // toggle Date picker when open
    // this.onDatepicker = true;
  }

  createDate() {
    // const oneDay = 1000 * 60 * 60 * 24; // hours*minutes*seconds*milliseconds
    // const firstDate = new Date(2008, 1, 12);
    // const secondDate = new Date(2008, 1, 22);
    // const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    // console.log('createDate ->', diffDays);
    // const first = new Date(y, m + 1, 1);
    // const second = new Date(y, m, 1);
    // this.daysInMonth(y, m);
    // const day = new Date(Date.now()).getDay();
    // const date = new Date(Date.now()).getDate();
    // const m = new Date(Date.now()).getMonth();
    // const y = new Date(Date.now()).getFullYear();
    // console.log(`createDate -> ${y}/${m}/${date} ->${this.dateJap.dayNamesMin[day]}`);

    // -----------------------------------//

    // const yearLength: Yearlength[] = this.setYearsLength('1989:2018');
    // this.showYearLength = yearLength;

    // let dayCreate: number[] = [];
    // dayCreate = dayCreate.concat(this.createDays(31),
    //   dayCreate.concat(this.createDays(28),
    //     this.createDays(31))
    // );

    // this.createMonth(this.createDays(31));

    // console.log('​createDays -> ', dayCreate);
    // console.log('weeks', this.weeks);


    this.selectedDate(this.setFormattDate(this.inputDates));

    this.showYearLength = this.setYearsLength(this.getYearsLength());

    const inYear = this.showYearLength.filter(e => e.isYear === this.selectYear)[0];

    // console.log('​showYearLength', inYear.monthOfyear);

    // console.log('​createDays -> ', this.createDays(inYear.monthOfyear[this.selectMonth], this.selectMonth));
    const t1 = this.createDays(inYear.monthOfyear[this.selectMonth - 1], this.selectMonth - 1);
    const tC = this.createDays(inYear.monthOfyear[this.selectMonth], this.selectMonth);
    const t2 = this.createDays(inYear.monthOfyear[this.selectMonth + 1], this.selectMonth + 1);
    let aaa = [];
    aaa = aaa.concat(t1, aaa.concat(tC, t2));


    // console.log('createDate -> ', aaa);

    this.createMonth(tC);


    console.log(this.selectJapEra, '​createDate -> ', this.selectYear, this.selectMonth, this.selectDay);

    // priority
    /*
       0. this.selectedDate(this.setFormattDate(this.inputDates))
       1. this.setYearsLength(this.selectEra()) setDefualt YearLength in that JapanEra
       2.
    */

  }

  createMonth(dayCreate: Daydetail[]) {
    const weeks: Weeks = { week1: [], week2: [], week3: [], week4: [], week5: [], week6: [] };
    const cells = 42;
    const weekDays = this.weekAndDay(this.inputDates);
    const inYear = this.showYearLength.filter(e => e.isYear === this.selectYear)[0];

    while (dayCreate.length < cells) {
      dayCreate.push({ day: 0, month: 0 });
    }

    dayCreate.map((e, i) => {

      if (weeks.week1.length < 7) {
        weeks.week1[weekDays.date + i] = e;

        if ((weekDays.date + i - 6) >= 0) {
          weeks.week1[0] = { day: inYear.monthOfyear[this.selectMonth - 1], month: this.selectMonth - 1 };
        }

      } else if (weeks.week2.length < 7) {
        weeks.week2.push(e);
      } else if (weeks.week3.length < 7) {
        weeks.week3.push(e);
      } else if (weeks.week4.length < 7) {
        weeks.week4.push(e);
      } else if (weeks.week5.length < 7) {
        weeks.week5.push(e.day !== 0 ? e : {
          day: (i - inYear.monthOfyear[this.selectMonth + 1]) + 1,
          month: this.selectMonth + 1
        });
      } else if (weeks.week6.length < 7) {
        weeks.week6.push(e.day !== 0 ? e : {
          day: (i - inYear.monthOfyear[this.selectMonth + 1]) + 1,
          month: this.selectMonth + 1
        });
      }
    });
    // console.log('​DatePickersComponent -> createMonth -> ', weeks.week1.findIndex(el => !el));
    this.weeks = { ...weeks };
    this.showWeeks = Object.values(weeks);
    console.log('​showWeeks', this.showWeeks);
  }

  getYearsLength(era?): string {
    // console.log('​selectEra -> ', this.selectJapEra);
    const defualtsYear = this.selectJapEra === 'H'
      ? this.japYear[0].yearLenth
      : this.selectJapEra === 'S'
        ? this.japYear[1].yearLenth
        : this.japYear[0].yearLenth;
    return defualtsYear;
  }

  selectEra(era?) {
    this.showYearLength = this.setYearsLength(this.getYearsLength());
  }

  setFormattDate(inputDate: string): Datedata { // set format 2018/07/01 -> {year:2018,month:07,day:01}
    const dateStr = inputDate.split('/');
    const day = this.daysInMonth(+dateStr[1] - 1, +dateStr[0]);
    const date: Datedata = {
      year: +dateStr[0],
      month: +dateStr[1] > 12 ? 12 : +dateStr[1],
      day: +dateStr[2] > day ? day : +dateStr[2]
    };
    return date;
  }

  selectedDate(select?: Datedata) {
    console.log('​selectedDate->', select);
    if (select) {
      this.selectYear = select.year;
      this.selectMonth = select.month - 1; // this.dateJap.monthNames[select.month - 1];
      this.selectDay = select.day;
    }
    // this.selectedYear();
    // this.setShowDate();
  }

  getInputDate() { // get Input when enter

    // const dates = new Date(this.inputDates).toLocaleDateString('ja-JP-u-ca-japanese');
    // dates.setFullYear(this.inputDates);
    // (<HTMLInputElement>document.getElementById('inputDate')).blur();
    // this.toggleDatepicker('close');

    // -------------------------//

    // if (!this.selectJapEra) {
    //   const d = new Date();
    //   const dateInput: string = this.inputDates
    //     ? this.inputDates
    //     : `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
    //   const date = this.setFormattDate(dateInput);
    //   const aaa = this.isJapYear(date);
    //   // console.log('​getInputDateDays -> ', aaa);
    // }


  }

  onFocusOut() {
    this.inputTel.nativeElement.blur();
    this.toggleDatepicker('close');
  }

  toDays(d) {
    d = d || new Date(Date.now()).getDay();
    return d / 24 / 60 / 60 / 1000;
  }

  daysInMonth(m, y?) { // get days of month 28 or 29 and 30 or 31
    y = y || new Date(Date.now()).getFullYear();
    return this.toDays(Date.UTC(y, m + 1, 1) - Date.UTC(y, m, 1));
  }

  daysInYears(year?: number): number[] { // get days of month in year
    const days: number[] = [];
    for (let i = 0; i < 12; i++) {
      days.push(this.daysInMonth(i, year));
    }
    return days;
  }

  setYearsLength(years?: string): Yearlength[] { // get days of month in between years
    const yearLength = years.split(':');
    const yStart = +yearLength[0];
    const yEnd = yearLength[1] ? +yearLength[1] : new Date(Date.now()).getFullYear();
    const monthInYear: any[] = [];

    for (let i = yStart; i <= yEnd; i++) {
      const obj = {};
      const set = { isYear: i, monthOfyear: this.daysInYears(i) };
      monthInYear.push(set);
    }
    return monthInYear.reverse();
  }

  // createDays(days: number): number[] {
  //   const dayArray: number[] = Array.from(new Array(days), (x, i) => i + 1);
  //   return dayArray;
  // }

  createDays(days?: number, month?: number): Daydetail[] {
    const dayArray = Array.from(new Array(days),
      (x, i) => {
        return { day: i + 1, month: month };
      });
    return dayArray;
  }

  isJapYear(inputDate: Datedata) {
    if (inputDate) {
      const japYear = [...this.japYear];
      const heisei = this.setFormattDate(this.japYear[0].first);
      const showa = this.setFormattDate(this.japYear[1].first);
      let eraYear;

      if (inputDate.year > heisei.year) {
        this.selectJapEra = 'H';
        eraYear = !this.showDropdown
          ? `H${this.toHeisei(inputDate.year)}`
          : this.toHeisei(inputDate.year);
      } else if (inputDate.year === heisei.year) {
        if (inputDate.month >= heisei.month && inputDate.day > heisei.day - 1) {
          this.selectJapEra = 'H';
          eraYear = !this.showDropdown
            ? `H${this.toHeisei(inputDate.year)}`
            : this.toHeisei(inputDate.year);
        } else {
          this.selectJapEra = 'S';
          eraYear = !this.showDropdown
            ? `S${this.toShowa(inputDate.year)}`
            : this.toShowa(inputDate.year);
        }
      } else {
        this.selectJapEra = 'S';
        eraYear = !this.showDropdown
          ? `S${this.toShowa(inputDate.year)}`
          : this.toShowa(inputDate.year);
      }

      if (this.showMonth) {
        eraYear = eraYear + `/${('0' + inputDate.month).slice(-2)}`;
      }
      if (this.showDay) {
        eraYear = eraYear + `/${('0' + inputDate.day).slice(-2)}`;
      }

      return eraYear;
    }
  }

  toHeisei(year: number) {
    const h = 12;
    let heisei: number;
    if (year) {
      heisei = +year + h;
      return +heisei.toString().substring(2, 4);
    }
  }

  toShowa(year: number) {
    const s = 25;
    let showa: number;
    if (year) {
      showa = +year - s;
      return +showa.toString().substring(2, 4);
    }
  }

  weekAndDay(inputDate?: string) { // one month has 5 week
    console.log('​weekAndDay -> inputDate', inputDate);
    const date = new Date(inputDate);
    const days = // this.dateJap.dayNamesMin;
      ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const prefixes = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];
    const pre = 0 | (date.getDate() / 7);

    console.log('​weekAndDay -> ', { week: prefixes[pre], date: days[date.getDay()] });
    return { week: pre, date: date.getDay() };
  }



  selectedYear(y?) {
    console.log('​selectedYear->', y, this.selectYear);
    // this.monthOfyear = this.showYearLength[this.showYearLength.findIndex(
    //   e => e.isYear === +this.selectYear)].monthOfyear;
    // this.onGoMonth('go');
  }

  selectedMonth(m?) {
    console.log('​selectedMonth->', m, this.selectMonth);
    // this.selectedYear();
  }

  onGoMonth(go?: string) {
    console.log('​onGoMonth -> ', go);
    // if (go && this.selectMonth) {
    //   const mIdex = this.dateJap.monthNames.findIndex(e => e === this.selectMonth);
    //   const lengthY = this.showYearLength.length;
    //   if (go === 'next') { // +Indexshow
    //     const mNext = mIdex + 1 > 11 ? 0 : mIdex + 1;
    //     if (mIdex >= 11) {
    //       this.selectYear =
    //         this.selectYear > this.showYearLength[lengthY - 1].isYear
    //           ? this.showYearLength[lengthY - 1].isYear
    //           : this.selectYear++;
    //       this.selectedYear();
    //     }
    //     this.selectMonth = this.dateJap.monthNames[mNext];
    //     this.createMonth(this.createDays(this.monthOfyear[mNext]));
    //   } else if (go === 'previous') {// -Indexshow
    //     const mBack = mIdex - 1 > -1 ? mIdex - 1 : 11;
    //     if (mIdex <= 0) {
    //       this.selectYear =
    //         this.selectYear < this.showYearLength[0].isYear
    //           ? this.showYearLength[0].isYear
    //           : this.selectYear--;
    //       this.selectedYear();
    //     }
    //     this.selectMonth = this.dateJap.monthNames[mBack];
    //     this.createMonth(this.createDays(this.monthOfyear[mBack]));
    //   } else {
    //     this.selectMonth = this.dateJap.monthNames[mIdex];
    //     this.createMonth(this.createDays(this.monthOfyear[mIdex]));
    //   }
    // }
    // this.setShowDate();
  }

  selectedDay(d?: Daydetail) {
    this.selectDay = d.day;
    // this.selectMonth = d.month;
    console.log('​selectedDay -> ', d, this.selectDay);
    // this.setShowDate();
  }

  setShowDate() {
    // this.inputDates = `${this.selectYear}/${this.dateJap.monthNames.findIndex(e => e === this.selectMonth) + 1}/${this.selectDay}`;
  }




}
