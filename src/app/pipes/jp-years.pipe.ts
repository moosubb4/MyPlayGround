import { Pipe, PipeTransform, HostListener } from '@angular/core';

@Pipe({
  name: 'jpYears'
})
export class JpYearsPipe implements PipeTransform {

  private newYears: any;
  private retYear: any;
  public currentYears: any;
  public heisei: number = 1989;
  public showa: number = 1926;
  public jpFull = new RegExp(/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\u4E00-\u9FAF]/, 'g');
  public jpHalf = new RegExp(/[\uFF00-\uFFEF]/, 'g');
  public symbols = new RegExp(/[\u2605-\u2606]|[\u2190-\u2195]|\u203B/, 'g');
  public yearStrArr: any[] = [];

  // Format YYYY/MM/DD

  transform(value: any): any {
    if (value && value !== '') {
      const yearString: string = value.toString();
      let yearStr = [];
      // console.log('​isHeisei-> ', yearString.match(/[H|S]/g));
      if (yearString.length <= 10) {

        const yearSlash: any[] = [...yearString.split('/').map((e, i) => i === 0 ? +e : e)]; // If slash format

        const yearNoSlash: any[] = yearString.length > 0
          ? [+yearString.substr(0, 4), yearString.substr(4, 2), yearString.substr(6, 2)] : [];

        yearString.match(/[/]/g) ? yearStr = yearSlash : yearStr = yearNoSlash;


        // console.log('​isHeisei-> ', yearString.match(/[H|S]/g));

        // console.log('​JpYearsPipe -> ', yearStr);

        const years: number = yearStr[0];

        if (years > this.heisei) {
          return this.toHeisei(+years)
            + (yearStr[1] && yearStr[1] !== '' ? `/${yearStr[1]}` : '')
            + (yearStr[2] && yearStr[2] !== '' ? `/${yearStr[2]}` : '');
        } else if (years > this.showa && years === this.heisei) {
          // return this.toShowa(years) + ' / ' + this.toHeisei(years);
          return this.toHeisei(+years)
            + (yearStr[1] && yearStr[1] !== '' ? `/${yearStr[1]}` : '')
            + (yearStr[2] && yearStr[2] !== '' ? `/${yearStr[2]}` : '');
        } else if (years > this.showa) {
          return this.toShowa(+years)
            + (yearStr[1] && yearStr[1] !== '' ? `/${yearStr[1]}` : '')
            + (yearStr[2] && yearStr[2] !== '' ? `/${yearStr[2]}` : '');
        } else {
          return years
            + (yearStr[1] && yearStr[1] !== '' ? `/${yearStr[1]}` : '')
            + (yearStr[2] && yearStr[2] !== '' ? `/${yearStr[2]}` : '');
        }
      }

    } else {
      return '';
    }



  }

  toHeisei(year: any) {
    const h = 12;
    let yH: number;
    if (year && year !== undefined) {
      yH = Number(year) + h;
      this.newYears = yH;
      return 'H' + yH.toString().substring(2, 4);
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
      return 'S' + yS.toString().substring(2, 4);
    } else {
      return '';
    }
  }


}
