import { Directive, Input, Output, EventEmitter, HostListener, ElementRef, Renderer } from '@angular/core';

/*
How to Use
1. Define the id="" to your element  // Ex. id="focus1"
2. if you want to grouping key you must put group namr like this [keyOption]="{groupNm:'mop'}"
3. in the last key If you wanna go another key you must put next [keyOption]="{groupNm:'mop',idEnd:'confirmBtn'}"

*/

export interface Keyenters {
  groupNm?: string;
  firstFocus?: boolean;
  idEnd?: string;
}

@Directive({
  selector: '[appKeyenter]'
})

export class KeyenterDirective {

  public elmm: any;
  public idAll: any[] = [];

  @Input() keyOption: Keyenters;
  @Output() keyNext = new EventEmitter<string>();

  public groupNm: string;
  public firstFocus: boolean;
  public idEnd: string;

  // @Input() groupNm: string;
  // @Input() firstFocus: boolean;
  // @Input() idEnd: string;

  constructor(private _el: ElementRef) {
    setTimeout(() => {

      if (this.keyOption) {
        this.firstFocus = this.keyOption.firstFocus;
        this.groupNm = this.keyOption.groupNm;
        this.idEnd = this.keyOption.idEnd;
      }
      // init
      if (!this.groupNm) {
        this.groupNm = 'focus';
      }
      // -------------init--------------
      this.getAllid();
      if (this.firstFocus) {
        if (this.idAll.length > 0) {
          (<HTMLInputElement>document.getElementById(this.idAll[0])).focus();
        }
      }
    }, 1000); //
  }

  @HostListener('keydown.enter', ['$event']) onKeyDown(e) {
    if ((e.which === 13 || e.keyCode === 13)) {
      this.getAllid();
      const id = e.target.id;
      // console.log(id);
      if (this.idAll.length > 0) {
        const next = this.idAll[this.idAll.indexOf(id) + 1]; // go to next id in stack
        // console.log(next);
        if (next) {
          // console.log('​next', next);
          this.keyNext.emit(next);
          (<HTMLInputElement>document.getElementById(next)).focus();
        } else {
          if (this.idEnd) {
            this.keyNext.emit(this.idEnd);
            (<HTMLInputElement>document.getElementById(this.idEnd)).focus(); // go to another you wanna go
          }
        }
      }
    }
  }

  getAllid() {
    this.idAll = [];
    // const getId = document.querySelectorAll('*[id]'); // get id arrays
    // this.elmm = getId;
    // this.elmm.forEach((val, i) => {
    //   const id = val.id;
    //   if (id.indexOf(this.groupNm) === 0) { // puting id stack to array
    //     this.idAll.push(id);
    //   }
    // });

    const getAllElm = Array
      .from(document.querySelectorAll(`*[id]`))
      .filter(elm => elm.id.includes(this.groupNm))
      .map(eid => eid.id);

    this.idAll = [...getAllElm];

    // this.idAll = (this.idAll.filter((e, i, dup) => i === dup.indexOf(e))).sort(); // sort array
    // this.idAll = this.idAll.filter((e, i, dup) => i === dup.indexOf(e)); // sort array
  }


}
