import { Directive, ElementRef, Input, HostListener, Renderer } from '@angular/core';

@Directive({
  selector: '[appOnlynumber]'
})
export class OnlynumberDirective {
  constructor(private el: ElementRef, public renderer: Renderer) { }
  @Input() OnlyNumber: boolean;

  public numCha: number;
  // UNICODE RANGE : DESCRIPTION
  // 3000-303F : punctuation
  // 3040-309F : hiragana
  // 30A0-30FF : katakana
  // FF00-FFEF : Full-width roman + half-width katakana
  // 4E00-9FAF : Common and uncommon kanji
  public regex = new RegExp(/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/, 'g');


  @HostListener('keydown', ['$event'])
  onKeyDown(event: any) {
    let e = <KeyboardEvent>event;

    console.log(e.keyCode);
    console.log(event.target.value);

    if ([46, 8, 9, 27, 13, 92].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode == 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode == 88 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }

    if (e.keyCode >= this.conVcha(event.target.value)) {
      e.preventDefault();
    }

  }


  @HostListener('focus', ['$event'])
  onFocus(event: any) {
    let e = <KeyboardEvent>event;
    if (this.OnlyNumber) {
      this.el.nativeElement.select();
      this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', '#76FF03');
    } else {
      this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', '');
    }
  }


  // @HostListener('focusout', ['$event'])
  // onFocusout(event: any) {

  //   if (event.target.value.match(this.regex)) {
  //     this.el.nativeElement.value = '';
  //   }
  //   this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', '');

  // }

  conVcha(cha) {
    const str = cha;
    if (str !== undefined) {

      //  const n: number[] = [];
      let n: number;

      // for (let i = 0; i < str.length; i++) {
      //   n.push(str.charCodeAt(i));
      // }
      n = str.charCodeAt(0);
      // const res = String.fromCharCode(...n);
      console.log(n);
      return n;
    }


  }




}
