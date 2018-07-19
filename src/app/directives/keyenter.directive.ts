import { Directive, Input, HostListener, ElementRef, Renderer } from '@angular/core';

/*
How to Use
1. Add id="" to your element Ex. id="focus1"
2. Add word to focus Default is 'focus'

*/

@Directive({
  selector: '[appKeyenter]'
})
export class KeyenterDirective {

  public elmm: any;
  public idAll: any[] = [];

  @Input() groupNm: string;
  @Input() firstFocus: boolean;

  constructor(private _el: ElementRef) {
    setTimeout(() => {
      if (!this.groupNm) {
        this.groupNm = 'focus';
      }

      this.getAllid();

      if (this.firstFocus) {
        if (this.idAll.length > 0) {
          (<HTMLInputElement>document.getElementById(this.idAll[0])).focus();
        }
      }


    }, 1000);
  }

  @HostListener('keydown.enter', ['$event']) onKeyDown(e) {
    if ((e.which === 13 || e.keyCode === 13)) {
      this.getAllid();
      const id = e.target.id;
      // console.log(id);
      if (this.idAll.length > 0) {
        const next = this.idAll[this.idAll.indexOf(id) + 1];
        // console.log(next);
        if (next) {
          (<HTMLInputElement>document.getElementById(next)).focus();
        } else {
          // console.log('out of id');
        }
      }
    }
  }

  getAllid() {
    const getId = document.querySelectorAll('*[id]');
    this.elmm = getId;
    this.elmm.forEach((val, i) => {
      const id = val.id;
      if (id.indexOf(this.groupNm) === 0) {
        this.idAll.push(id);
      }
    });
    this.idAll = (this.idAll.filter((e, i, dup) => i === dup.indexOf(e))).sort();
    // console.log(this.idAll);
  }


}
