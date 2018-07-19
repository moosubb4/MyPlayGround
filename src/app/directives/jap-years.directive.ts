import { Directive, Input, HostListener, ElementRef, Renderer } from '@angular/core';



@Directive({
  selector: '[appJapYears]'
})
export class JapYearsDirective {

  constructor(private el: ElementRef, public renderer: Renderer) { }

  @Input() japYear: boolean;
  @Input() era: string;

  public heisei: number = 1989;
  public showa: number = 1926;
  public taisho: number = 1912;
  public Meiji: number = 1868;
  public alphabet = new RegExp(/([H|S])/, 'g'); // check H or S
  public num = new RegExp(/([0-9])/, 'g'); // check only number
  public regDate = new RegExp(/\d{4}(?=[/]|[-]|\s)|\d{2}/, 'g'); // group date
  public a2c = new RegExp(/([A-Z]|[a-z])/, 'g'); // check A-Z
  public slash = new RegExp(/([/]|[-]|\s)/, 'g'); // check slash
  public getSlash: any[] = [];
  public mDate: any[] = [];
  public currentYears;
  public newYears;
  public day: Date;
  public month: Date;
  public year: number;
  public years: number;
  public showDate: any;
  public eras: any;


  @HostListener('focusout', ['$event']) onFocusout(event: any) {
    const currentYear = event.target.value;
    this.getSlash = currentYear.match(this.slash);
    this.mDate = currentYear.match(this.regDate);
    this.eras = currentYear.match(this.a2c);

    if (currentYear != null && currentYear !== undefined && currentYear != '') {
      // console.log(this.mDate);
      if (this.getSlash != null) {

        if (this.getSlash.length === 2) {

          this.year = this.mDate[0];
          this.month = this.mDate[1];
          this.day = this.mDate[2];
          // console.log(this.year + ' ' + this.month + ' ' + this.day);
          this.showDate = this.changeYears(this.year) + '/' + this.month + '/' + this.day;

        } else if (this.getSlash.length === 1) {

          this.year = this.mDate[0];
          this.month = this.mDate[1];
          //  console.log(this.year + ' ' + this.month);
          this.showDate = this.changeYears(this.year) + '/' + this.month;

        }

      } else {
        this.years = currentYear.toString().replace(/([A-Z]|[a-z])/g, '');
        // console.log(this.years);
        this.showDate = this.changeYears(this.years);
      }
    }

    // this.currentYears = currentYear;

    if (this.showDate) {
      this.el.nativeElement.value = this.showDate;
    }
  }

  changeYears(tooYear: any) {
    if (tooYear > this.heisei) {
      // this.el.nativeElement.value = this.toHeisei(tooYear);
      return this.toHeisei(tooYear);
    } else if (tooYear > this.showa && tooYear == this.heisei) {
      return this.toShowa(this.years) + ' / ' + this.toHeisei(tooYear);
    } else if (tooYear >= this.showa) {
      return this.toShowa(this.years);
    } else {
      return this.eras + tooYear;
    }
    // else if (tooYear > this.taisho && tooYear == this.showa) {
    //   return this.taisho + ' this is taisho ' + ' / ' + this.toShowa(tooYear);
    // } else if (tooYear > this.taisho) {
    //   return this.taisho + ' this is taisho';
    // } else if (tooYear > this.Meiji && tooYear == this.taisho) {
    //   return this.Meiji + ' this is meiji';
    // } else if (tooYear >= this.Meiji) {
    //   return this.Meiji + ' this is meiji';
    // }

    // if (currentYear > this.heisei) {
    //   this.el.nativeElement.value = this.toHeisei(this.years);
    // } else if (currentYear > this.showa && currentYear == this.heisei) {
    //   this.el.nativeElement.value = this.toShowa(this.years) + ' / ' + this.toHeisei(this.years);
    // } else if (currentYear > this.showa) {
    //   this.el.nativeElement.value = this.toShowa(this.years);
    // } else if (currentYear > this.taisho && currentYear == this.showa) {
    //   this.el.nativeElement.value = this.taisho + ' this is taisho ' + ' / ' + this.toShowa(this.years);
    // } else if (currentYear > this.taisho) {
    //   this.el.nativeElement.value = this.taisho + ' this is taisho';
    // } else if (currentYear > this.Meiji && currentYear == this.taisho) {
    //   this.el.nativeElement.value = this.Meiji + ' this is meiji';
    // } else if (currentYear >= this.Meiji) {
    //   this.el.nativeElement.value = this.Meiji + ' this is meiji';
    // } else {
    //   this.el.nativeElement.value = 'Hello Minamoto Yoshitsune';
    // }
  }

  toHeisei(year: any) {
    const h = 12;
    let yH: number;
    if (year && year !== undefined) {
      yH = Number(year) + h;
      this.newYears = yH;
      if (this.japYear === true) {
        return 'H' + yH.toString().substring(2, 4);
      } else {
        return yH.toString().substring(2, 4);
      }
    } else {
      return '';
    }
  }

  toShowa(year: any) {
    const s = 25;
    let yS: number;
    if (year && year !== undefined) {
      if (year > s) {
        yS = Number(year) - s;
      } else {
        yS = s - Number(year);
      }
      this.newYears = yS;
      if (this.japYear === true) {
        return 'S' + yS.toString().substring(2, 4);
      } else {
        return yS.toString().substring(2, 4);
      }
    } else {
      return '';
    }
  }

  toTaisho(year: any) {
    const t = 11;
    let tH: number;
    if (year && year !== undefined) {
      tH = Number(year) - t;
      this.newYears = tH;
      if (this.japYear === true) {
        return 'Taisho ' + tH.toString().substring(2, 4);
      } else {
        return tH.toString().substring(2, 4);
      }

    } else {
      return '';
    }
  }

  toMeiji(year: any) {
    const t = 11;
    let tH: number;
    if (year && year !== undefined) {
      tH = Number(year) - t;
      this.newYears = tH;
      if (this.japYear === true) {
        return 'Meiji ' + tH.toString().substring(2, 4);
      } else {
        return tH.toString().substring(2, 4);
      }
    } else {
      return '';
    }
  }

}
