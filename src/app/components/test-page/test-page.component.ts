import { Component, OnInit } from '@angular/core';

export interface Perdata {
  id: Number;
  name: String;
  age: Number;
}

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})

export class TestPageComponent implements OnInit {

  public nameList: string[] = [];
  public listData: string[] = ['nun', 'num1', 'num2', 'num3'];
  public bnkData: string[] = ['Cherprang', 'Music', 'Jan', 'Jennis'];
  public getVal: string = null;
  public getVal2: string = null;
  public getVal3: string = null;
  public findVal: string[] = [];
  public getVal4: string = null;
  public getVal5: Number = null;
  public persData: Perdata[] = [];
  public num: Number;

  constructor() { }

  ngOnInit() {
  }

  onAddList() {
    this.nameList.push(this.getVal);
    this.getVal = null;
  }

  onResetList() {
    this.nameList = [];
  }

  onRemoveList() {
    if (this.getVal2 != null) {
      // console.log(this.getVal2);
      this.listData.filter((e, i) => {
        if (e === this.getVal2) {
          this.listData.splice(i, 1);
          this.getVal2 = null;
        }
        //  else {
        //   this.getVal2 = null;
        // }
      });
    } else {
      this.listData.splice(this.listData.length - 1, 1);
    }

  }

  onSearch() {
    this.findVal = [];
    console.log(this.getVal3);
    this.bnkData.filter((e, i) => {
      if (e.toLowerCase().indexOf(this.getVal3.toLowerCase()) > -1) {
        console.log(e);
        this.findVal.push(e);
      } else {
        console.log('not' + e);
      }
    });
  }

  onSave() {
    if (this.getVal4 !== null && this.getVal5 !== null) {
      this.persData.push({ id: this.getRandomInt(10, 1000), name: this.getVal4, age: this.getVal5 });
    }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onDel(id, mem: Perdata) {
    console.log(id + ' ' + mem);
    if (mem !== null) {
      this.persData = this.persData.filter((e) => e.id !== mem.id);
    }
    console.log(this.persData);
  }

}
