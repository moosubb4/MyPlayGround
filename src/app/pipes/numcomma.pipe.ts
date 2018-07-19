import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numcomma'
})
export class NumcommaPipe implements PipeTransform {

  // transform(value: any): any {

  //   if (value === null || value === undefined) {
  //     return 0;
  //   } else {
  //     const chanum = Number(value.toString().replace(/[^0-9\.-]+/g, ''));

  //     if (isNaN(chanum) || chanum === null || chanum === undefined) {
  //       return 0;
  //     } else {
  //       const numback = chanum;
  //       return numback.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  //     }

  //   }
  // }
  transform(value: any): any {

    if (value == null || value == undefined) {

      return '0';

    } else {

      //  const chanum = Number(value.toString().replace(/[^0-9\.-]+/g, ''));

      return (value.toString().replace(/[^0-9\.-]+/g, '')).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      //   const chanum = value.toString().replace(/[^0-9\.-]+/g, '');

      //   if (chanum == null || chanum == undefined) {
      //     return '0';
      //   } else {
      //     const numback = chanum;
      //     return numback.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      //   }

    }


  }
}
