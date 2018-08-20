import {
  Directive,
  Input,
  Output,
  OnInit,
  ElementRef,
  HostListener,
  EventEmitter,
  Renderer
} from '@angular/core';

interface ByteStr {
  totalByte?: number;
  subByte?: string;
}

@Directive({
  selector: '[appInputBox]'
})

export class InputBoxDirective implements OnInit {

  @Input() optionBox: {
    checkByte?: boolean,
    onlyNumber?: boolean,
    allowNegative?: boolean,
    defaultZero?: boolean,
    onIME?: string,
    onFocus?: boolean,
    padNumber?: number
  };

  @Output() CheckBytes = new EventEmitter<ByteStr>();
  @Output() Negative = new EventEmitter<number>();
  @Output() fillNumber = new EventEmitter<string>();



  public jpFull = new RegExp(/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\u4E00-\u9FAF]/, 'g'); // Jap Charactor Full-Width
  public jpHalf = new RegExp(/[\uFF00-\uFFEF]/, 'g'); // Jap Charactor Half-Width
  public symbols = new RegExp(/[\u2605-\u2606]|[\u2190-\u2195]|\u203B/, 'g');
  public allowNumber = new RegExp(/[0-9\-]/, 'g'); // number only
  public notNumber = new RegExp(/[^0-9\-]/, 'g'); // number only
  public nonespace = new RegExp(/\s/, 'g'); // none white space
  // (/^-?[0-9]\d*(\.\d+)?$/) (/^\-?[1-9]\d{0,2}(\.\d*)?$/)

  public browsers: string[] = [
    'chrome',
    'safari',
    'firefox',
    'ie',
    'internet explorer',
    'edge'
  ];


  constructor(
    private el: ElementRef,
    private renderer: Renderer) {
    this.optionBox = {
      checkByte: false,
      onlyNumber: false,
      allowNegative: false,
      defaultZero: false,
      onFocus: false
    };
  }

  ngOnInit() {
    if (this.optionBox.onIME) {
      this.el.nativeElement.style.imeMode = this.optionBox.onIME;
    } // IME mode default auto
  }

  @HostListener('focus', ['$event'])
  onfocus(event) {
    const e = <KeyboardEvent>event;
    const elm = this.el.nativeElement;
    const matchDash = event.target.value.match(/[-]/, 'g');

    if (this.optionBox.onIME) {
      if (this.optionBox.onIME === 'disabled') {
        this.el.nativeElement.type = 'tel';
      } else if (this.optionBox.onIME === 'auto') {
        this.el.nativeElement.type = 'text';
      }
      // console.log('​optionBox.onIME', this.el.nativeElement.type, this.optionBox.onIME);
    }// IME mode


    if (this.optionBox.onFocus) {
      this.renderer.setElementStyle(
        this.el.nativeElement,
        'backgroundColor',
        '#76FF03'
      );
      if (this.el.nativeElement.value) {
        this.el.nativeElement.select();
      }
    }// on focus


  }

  @HostListener('focusout', ['$event'])
  onFocusout(event) {
    const e = <KeyboardEvent>event;
    const elm = this.el.nativeElement;
    const matchDash = event.target.value.match(/[-]/, 'g');

    if (this.optionBox.checkByte) {
      const result: ByteStr = this.onCheckByte(elm.value, elm.maxLength);
      this.CheckBytes.emit({ ...result });
    }// checkByte

    if (this.optionBox.onlyNumber) {
      const value = this.onNegativeValue(event, elm);
      this.Negative.emit(value);
    }// onlyNumber

    if (this.optionBox.onIME) {
      if (this.el.nativeElement.type === 'tel') {
        this.el.nativeElement.type = 'text';
      }
      // console.log('​optionBox.onIME', this.el.nativeElement.type, this.optionBox.onIME);
    }// IME mode

    if (this.optionBox.onFocus) {
      this.renderer.setElementStyle(
        this.el.nativeElement,
        'backgroundColor',
        ''
      );
    }// on focus

    if (this.optionBox.padNumber) {
      const pad = this.padNumber(this.el.nativeElement.value, this.optionBox.padNumber);
      this.el.nativeElement.value = pad;
      this.fillNumber.emit(pad);
    }

  }

  @HostListener('keydown', ['$event'])
  onkeydown(event) {
    const e = <KeyboardEvent>event;
    const elm = this.el.nativeElement;
    const matchDash = event.target.value.match(/[-]/, 'g');

    if (this.optionBox.onlyNumber) {
      this.onOnlyNumber(e, matchDash);
    }// onlyNumber

  }

  @HostListener('keyup', ['$event'])
  onkeyup(event) {
    const e = <KeyboardEvent>event;
    const elm = this.el.nativeElement;
    const matchDash = event.target.value.match(/[-]/, 'g');

  }

  onCheckByte(str: string, maxLength: number): ByteStr {
    let count: number;
    let subByte: string;
    const maxByte = Math.floor((maxLength ? maxLength : -1) / 2);

    str = str.replace(this.nonespace, '');
    count = 0;
    subByte = '';

    Array
      .from(str)
      .map((e: string) => {
        e.match(this.jpHalf)
          ? count += 1
          : e.match(this.jpFull)
            ? count += 2
            : count += 1;
        // Count Byte
        count <= maxByte && e
          ? subByte += e
          : subByte = subByte;
        // Check Byte
      });
    return { totalByte: count, subByte: subByte };

  }// for Check byte

  onOnlyNumber(e, matchDash) {
    if (
      [46, 8, 9, 27, 13, 92, 110, 190].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      // let it happen, don't do anything
      return;
    }

    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
      (e.keyCode < 96 || (e.keyCode > 105 && e.keyCode))
    ) {
      if (this.optionBox.allowNegative) {
        if (this.browserDetect().browser !== this.browsers[2]) {
          // isFirefox
          if (e.keyCode === 109 || e.keyCode === 189) {
            if (matchDash) {
              e.preventDefault();
            }
            return;
          } else {
            e.preventDefault();
          }
        } else {
          if (e.keyCode === 109 || e.keyCode === 173) {
            if (matchDash) {
              e.preventDefault();
            }
            return;
          } else {
            e.preventDefault();
          }
        }
      } else {
        e.preventDefault();
      }
    }
  }// for onLynumbber

  onNegativeValue(event, elm) {
    if (event.target.value.match(this.allowNumber)) {
      const num = event.target.value.replace(this.notNumber, '');
      const numConv = num.match(/[-]/, 'g')
        ? this.calcualate(num)
        : +num;
      elm.value = numConv !== 0
        ? numConv : this.optionBox.defaultZero
          ? 0 : '';

    } else {
      this.el.nativeElement.value = this.optionBox.defaultZero ? 0 : '';
    }
    return elm.value;
  }// for nagative value

  browserDetect(): { browser: string } {
    const userAgent = window.navigator.userAgent;
    const Detecting = this.browsers.filter((val, index) =>
      userAgent
        .toLocaleUpperCase()
        .includes(this.browsers[index].toLocaleUpperCase())
    );

    return { browser: Detecting[0].toString() };
  }

  calcualate(num: string): number {
    if (num) {
      const dashIndex = num.split('').findIndex(e => e === '-');
      return +num.substr(0, dashIndex) + +num.substr(dashIndex, num.length);
      // console.log('​calcualate -> aaa', numCal);
    }
  }

  padNumber(input: string, n: number): string {
    let s = input;
    while (s.length < n) {
      s = '0' + s;
    }
    return s;
  }

}
