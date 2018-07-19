import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as  encodeings from 'encoding-japanese';
// import { } from 'encoding-japanese';


@Component({
  selector: 'app-keyenter',
  templateUrl: './keyenter.component.html',
  styleUrls: ['./keyenter.component.css']
})
export class KeyenterComponent implements OnInit {

  public checkText: string;
  public txt1: string;
  public showAlert: string;
  public hiraJp = new
    RegExp(/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/, 'g');

  // [\u3000-\u303F] Japanese-style punctuation
  // [\u3040-\u309F] Hiragana
  // [\u30A0-\u30FF] Katakana
  // [\uFF00-\uFFEF] Full-width roman characters and half-width katakana
  // [\u4E00-\u9FAF] CJK unifed ideographs
  // [\u2605-\u2606],[\u2190-\u2195],\u203B symbol

  public jpFull = new RegExp(/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\u4E00-\u9FAF]/, 'g');
  public jpHalf = new RegExp(/[\uFF00-\uFFEF]/, 'g');
  public symbols = new RegExp(/[\u2605-\u2606]|[\u2190-\u2195]|\u203B/, 'g');
  public textNormal = new RegExp(/[a-z]|[A-Z]|[ก-ฮ]/, 'g');
  public wordstr: number;


  constructor() {
    this.wordstr = 25;
  }

  ngOnInit() {

    // const sjisArray = [
    //   130, 177, 130, 241, 130, 201, 130, 191, 130, 205
    // ];
    // const encoded = encodeings.base64Encode(sjisArray);
    // console.log(encoded); // 'grGC8YLJgr+CzQ=='

    // const decoded = encodeings.base64Decode(encoded);
    // console.log(decoded);

  }



  lengthInUtf8Bytes = (str: string) => {
    const m = encodeURIComponent(str).match(/%[一-龯][一-龯]/g);
    return str.length + (m ? m.length : 0);
  }

  isJIS = (data) => {
    let i = 0;
    const len = data && data.length;
    let b;

    while (i < len && data[i] > 0x80) {
      if (data[i++] > 0xFF) {
        return false;
      }
    }

    for (; i < len; i++) {
      b = data[i];
      if (b <= 0x80 ||
        (0xA1 <= b && b <= 0xDF)) {
        continue;
      }

      if (b === 0xA0 || b > 0xEF || i + 1 >= len) {
        return false;
      }

      b = data[++i];
      if (b < 0x40 || b === 0x7F || b > 0xFC) {
        return false;
      }
    }

    return true;

  }


  onCheck(event) {
    this.onCheckUni(this.txt1);
  }



  onCheckUni(txt: string): string {
    if (txt) {
      if (txt.match(this.jpFull)) {
        // this.showAlert = `Full ${txt}`;
        console.log('Full ', this.getByte(txt));
        return 'Full';
      } else if (this.txt1.match(this.jpHalf)) {
        // this.showAlert = `Half ${this.txt1}`;
        console.log('Half', this.getByte(txt));
        return 'Half';
      } else {
        // this.showAlert = `Other ${txt}`;
        console.log('Other ', this.getByte(txt));
        return 'Other';
      }
    }
  }

  getByte(str: string): number {
    if (!str) {
      return 0;
    }
    let ch;
    let byte = 0;
    let letter;
    let countTxt = 0;
    const steLength = str.length;
    for (let i = 0; i < str.length; i++) {
      ch = str.charCodeAt(i);
      if (str[i].match(this.jpFull)) {
        byte = byte + 2;
        letter = 'full 2';
      } else if (str[i].match(this.jpHalf)) {
        byte = byte + 1;
        letter = 'half 1';
      } else {
        let aaa = 0;
        do {
          byte++;
          ch = ch >> 8;
        } while (ch);
        aaa++;
        letter = `other ${aaa}`;
      }

      if (byte <= this.wordstr) {
        countTxt++;
      }

      // console.log('count', byte, letter);
    }
    console.log('steLength ', steLength, '\ncountTxt ', countTxt, '\nbyte', byte);
    if (byte > this.wordstr) {
      const substr = str.substr(0, countTxt);
      this.txt1 = substr;
      console.log(' ');
      console.log('wordStr ', this.wordstr, '\nStr', substr, '\nbyte', byte);
      console.log('-------///-------');

    }

    return byte;
  }


}
