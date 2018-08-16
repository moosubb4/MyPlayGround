import { Directive, Input, Output, OnInit, ElementRef, HostListener, EventEmitter, Renderer } from '@angular/core';

@Directive({
  selector: '[appEnterkeys]'
})

export class EnterkeysDirective implements OnInit {

  private group: string;
  @Input() appEnterkeys: string;
  @Output() NextInput = new EventEmitter<{}>();
  // private groupArrLength: number;


  constructor(private el: ElementRef) {
    this.group = 'groupEnter';
  }

  ngOnInit() {

    if (this.appEnterkeys) {
      this.group = this.appEnterkeys;
    }

    this.el.nativeElement.setAttribute('class', this.group);
    // Set Group ID from @input
    const getDoc = document.querySelectorAll(`*[class=${this.group}]`);

    this.el.nativeElement.setAttribute('id', `${this.group}${getDoc.length}`);

    // console.log('​ngOnInit -> getDoc', getDoc, getDoc.length);
  }

  @HostListener('keydown.enter', ['$event']) onKeyDown(e) {
    if ((e.which === 13 || e.keyCode === 13)) {

      const getAllElm = Array
        .from(document.querySelectorAll(`*[id]`))
        .filter(elm => elm.id.includes(this.group))
        .map(eid => eid.id);

      const elmAll = getAllElm.indexOf(this.el.nativeElement.id);
      const next = getAllElm[elmAll + 1];

      if (elmAll < getAllElm.length - 1) {
        (<HTMLInputElement>document.querySelector(`#${next}`)).focus();
      } else {
        this.el.nativeElement.blur();
      }

      this.NextInput.emit({
        allElm: getAllElm,
        nextElm: next,
        curElm: this.el.nativeElement.id
      });
    }
  }

  // Reference

  // const getElm = this.el.nativeElement;
  // const nextElm = e.srcElement;
  // const parElm = e.srcElement.parentElement.childNodes[1];
  // nextElm ? nextElm.focus() : e.srcElement.blur();

  // const getDoc = document.querySelectorAll(`*[id=${this.group}${this.groupArrLength}]`);
  // const getDoc = document.querySelectorAll(`*[id]`);
  // const list = document.querySelectorAll('input[type=text]');


}
