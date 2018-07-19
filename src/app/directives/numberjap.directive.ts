import { Directive, ElementRef, Input, HostListener, Renderer, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appNumberjap]'
})
export class NumberjapDirective {

  constructor(private el: ElementRef, public renderer: Renderer) {
    // this.renderer.setElementStyle(this.el.nativeElement, 'ime-mode', 'disabled');
  }
  // @Input() appNumberjap: boolean;

  // @Output() appNum = new EventEmitter<String>();

  @Output() addZero = new EventEmitter();

  // @HostListener('keydown', ['$event']) onKeyDown(event: any) {
  //   const e = <KeyboardEvent>event;
  //   const supportIMEMode = ('ime-mode' in document.body.style);
  //   // console.log(supportIMEMode);
  //   if (supportIMEMode) {
  //     console.log(supportIMEMode);
  //     return;
  //   }
  //   // if (this.appNumberjap) {
  //   //   if ([46, 8, 9, 27, 13, 92].indexOf(e.keyCode) !== -1 ||
  //   //     // Allow: Ctrl+A
  //   //     (e.keyCode === 65 && e.ctrlKey === true) ||
  //   //     // Allow: Ctrl+C
  //   //     (e.keyCode === 67 && e.ctrlKey === true) ||
  //   //     // Allow: Ctrl+X
  //   //     (e.keyCode === 88 && e.ctrlKey === true) ||
  //   //     // Allow: home, end, left, right
  //   //     (e.keyCode >= 35 && e.keyCode <= 39)) {
  //   //     // let it happen, don't do anything
  //   //     return;
  //   //   }
  @HostListener('focusout', ['$event']) onfocusOut(event: any) {
    this.el.nativeElement.value = this.zeroFill(event);
  }
  zeroFill(event) {
    let numN = event.target.value;
    let numM;
    let zero;

    if (numN !== undefined && numN != null) {
      // numM = Object.values(numN).length;
      numM = numN.length;
      if (numM < 10) {
        zero = '';
        for (let i = 0; i < 10 - numM; i++) {
          zero += '0';
        }
        numN = zero + numN;
      }
      return numN;
    }

    this.addZero.emit(numM);
  }
  //   //   // // Ensure that it is a number and stop the keypress
  //   //   if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
  //   //     (e.keyCode < 96 || e.keyCode > 105)) {
  //   //     e.preventDefault();
  //   //   }
  //   // }
  // }

  // filterMBC(src) {
  //   let str = '';
  //   let i;
  //   for (i = 0; i < src.length; i++) {
  //     const chr = src.charAt(i);
  //     if (chr === '%') {
  //       if (src.charAt(++i) === 'u') {
  //         i += 4;
  //         continue;
  //       }
  //       i++;
  //     }
  //     str += chr;
  //   }
  //   return str;
  // }

  // @HostListener('focus', ['$event'])
  // onFocus(event: any) {
  //   const e = <KeyboardEvent>event;
  //   if (this.appNumberjap) {
  //     this.el.nativeElement.select();
  //     this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', '#76FF03');
  //   } else {
  //     this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', '');
  //   }
  //   // console.log("Focus out called from HostListener");

  // }


  // @HostListener('focusout', ['$event'])
  // onFocusout(event: any) {
  //   const e = <KeyboardEvent>event;
  //   if (this.appNumberjap) {
  //     this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', '');
  //   }
  // }

}
