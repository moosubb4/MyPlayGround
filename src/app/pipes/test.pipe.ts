import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'test'
})
export class TestPipe implements PipeTransform {

  transform(value: any): any {

    let numN = value;
    let numM;
    let zero;

    if (numN !== undefined && numN != null) {
      numM = Object.values(numN).length;
      if (numM < 10) {
        zero = '';
        for (let i = 0; i < 10 - numM; i++) {
          zero += '0';
        }
        numN = zero + numN;
      }

    }
    return numN;
  }

}
