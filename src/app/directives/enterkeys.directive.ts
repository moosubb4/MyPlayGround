import { Directive, Input, Output, OnInit, ElementRef, HostListener, EventEmitter, Renderer } from '@angular/core';

@Directive({
  selector: '[appEnterkeys]'
})

export class EnterkeysDirective implements OnInit {

  private group: string;
  @Input() appEnterkeys: string;
  @Output() NextInput = new EventEmitter<{}>();

  constructor(private el: ElementRef) {
    this.group = 'groupEnter';
    // Set Default Group ID
  }

  ngOnInit() {
    if (this.appEnterkeys) {
      this.group = this.appEnterkeys;
    }
    // Set @Input Group ID
    this.el.nativeElement.setAttribute('class', this.group);
    // Set Class for count input Element
    const getDoc = document.querySelectorAll(`*[class=${this.group}]`);
    // Get All Class by Group name
    this.el.nativeElement.setAttribute('id', `${this.group}${getDoc.length}`);
    // Set Attribute ID to  input Element
  }

  @HostListener('keydown.enter', ['$event']) onKeyDown(e) {
    if ((e.which === 13 || e.keyCode === 13)) {
      // Enter Key checking

      const getAllElm = Array
        .from(document.querySelectorAll(`*[id]`))
        .filter(elm => elm.id.includes(this.group))
        .map(eid => eid.id);
      // Create Array
      // From All Id in document
      // Filter Element by Group name
      // Map only Id of input Element

      const elmAll = getAllElm.indexOf(this.el.nativeElement.id);
      // get Current ID
      const next = getAllElm[elmAll + 1];
      // set Next ID

      if (elmAll < getAllElm.length - 1) {
        // if Current ID Less than Element Array
        (<HTMLInputElement>document.querySelector(`#${next}`)).focus();
        // focus Next ID
      } else {
        this.el.nativeElement.blur();
        // focus out of current ID
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
