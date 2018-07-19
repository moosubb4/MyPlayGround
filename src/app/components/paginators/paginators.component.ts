import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface Configoption {
  rowSelection?: number[];
  totalSize?: number;
  row?: number;
  displayNumber?: number;
}

@Component({
  selector: 'app-paginators',
  templateUrl: './paginators.component.html',
  styleUrls: ['./paginators.component.css']
})

export class PaginatorsComponent implements OnInit {
  // public page: number;
  // public pageCurrent: number[] = [];
  // public row: number;
  // public size: number;
  // public sizing: number[] = [];
  // public totalSize: number;
  // public sort: number;
  // public rowsPerPageOptions: number[] = [];
  // public displayNumber: number;
  // public enable: boolean;
  // @Input() rowSelection: number[] = [];
  // @Output() pageSelect: EventEmitter<number>; // = new EventEmitter(); // = new EventEmitter<number>();
  // @Input() configOption: Configoption;

  public size: number;
  public page: number[] = [];
  public pageSplice: number[] = [];
  public pageCurrent: number;
  public row: number;
  public rowPage: number[] = [];
  public displayPage: number;
  public totalSize: number;
  public focusPage: number;
  public numberOfpage: number;

  constructor() {
    this.totalSize = 100;
    this.displayPage = 5;
    this.rowPage = [5, 10, 15];
    this.row = 10;
    this.focusPage = 1;
    this.numberOfpage = 5;
  }


  ngOnInit() {
    this.pageDisplays();
  }

  pageDisplays() {
    const index = 10;
    const sizePage = 5;
    const arr = [];
    let arrSplic = [];


    // this.size = Math.ceil(this.totalSize / this.displayPage);
    this.size = Math.ceil(this.totalSize / this.row);
    this.page = Array(this.size).fill(2).map((x, i) => i + 1);
    // this.pageCurrent = this.page.slice(0, this.displayPage);
    arrSplic = [...this.page];

    while (arrSplic.length > 0) {
      arr.push(arrSplic.splice(0, sizePage));
    }

    this.pageSplice = arr;
    this.pageCurrent = this.pageSplice[0];
    console.log('size', this.size, 'page', this.page, 'pageCurrent', this.pageCurrent, 'pageSplic', this.pageSplice, 'arrSplic', arrSplic);
  }

  goFirst() {
    if (this.focusPage !== 1) {
      this.focusPage = 1;
      console.log(`goFirst()`);
      this.showPage(this.focusPage);
    }
  }

  golast() {
    if (this.focusPage !== this.size) {
      this.focusPage = this.size;
      console.log(`golast()`);
      this.showPage(this.focusPage);
    }
  }

  onPrevious() {
    if (this.focusPage > 1) {
      this.focusPage--;
      console.log(`onPrevious()`);
      this.showPage(this.focusPage);
    }
  }

  onNext() {
    if (this.focusPage < this.size) {
      this.focusPage++;
      console.log(`onNext()`);
      this.showPage(this.focusPage);
    }
  }

  onSelectrow() {
    console.log(`onSelectrow(${this.row})`);
    this.pageDisplays();
  }

  onSelectpage(pg) {
    this.focusPage = pg;
    console.log(`onSelectpage(${pg})`);
  }

  showPage(pg) {
    let index = 0;

    // console.log('this.pageCurrent++', this.pageCurrent, 'pg', pg, this.pageCurrent[this.numberOfpage - 1]);

    if (pg > this.pageCurrent[this.numberOfpage - 1]) {
      this.pageCurrent = this.pageSplice[index + 1];
      console.log('this.pageCurrent++', this.pageSplice[index + 1]);
      // this.pageCurrent = this.pageSplice[index + 1];
    } else if (pg < this.pageCurrent[0]) {
      this.pageCurrent = this.pageSplice[index + 0];
      // console.log('this.pageCurrent--', this.pageSplice[0]);
    }
    // else {
    //   console.log('this.pageCurrent', this.pageSplice[index--]);
    //   // this.pageCurrent = this.pageSplice[index - 1];
    // }

    // this.pageCurrent = this.pageSplice[0];
    // if (pg > this.pageSplice[index][4] && index <= 0) {
    //   index++;
    //   this.pageCurrent = this.pageSplice[index];
    //   console.log('this.pageCurrent++', this.pageCurrent, 'pg', pg, 'Index', index);
    // } else { // if (pg < this.pageSplice[index][0] && index > 0)
    //   index--;
    //   this.pageCurrent = this.pageSplice[index];
    //   console.log('this.pageCurrent--', this.pageCurrent, 'pg', pg, 'Index', index);
    // }
    // this.pageCurrent = this.page.slice(pg - 1, pg + 4);
  }






  // constructor() {
  //   this.row = 5;
  //   this.totalSize = 15;
  //   this.rowsPerPageOptions = [5, 10, 20];
  //   this.displayNumber = 5;
  //   // this.enable = false;
  //   // this.row = this.configOption.row;
  //   // this.size = Math.ceil(this.totalSize / this.row);
  //   // this.page = 1;
  //   // this.sizing = Array(this.size).fill(2).map((x, i) => i + 1);
  //   // this.pageCurrent = this.sizing.slice(0, 5);
  //   // this.rowSelection = [5, 10, 20];
  //   // this.page =
  //   // this.pageSelect = 1;

  // }

  // ngOnInit() {

  //   console.log('----Config----');
  //   console.log(this.configOption);

  //   if (this.configOption !== undefined) {
  //     this.enable = true;
  //     this.onCreate();
  //   } else {
  //     this.row = (this.rowsPerPageOptions.filter(key => this.row === key))[0];
  //     this.size = Math.ceil(this.totalSize / this.row);
  //     this.sizing = Array(this.size).fill(2).map((x, i) => i + 1);
  //     this.page = 1;
  //     this.pageCurrent = this.sizing.slice(0, this.displayNumber);
  //   }


  // }

  // onCreate() {
  //   this.row = this.configOption.row;
  //   this.totalSize = this.configOption.totalSize;
  //   this.rowsPerPageOptions = this.configOption.rowSelection;
  //   this.displayNumber = this.configOption.displayNumber;
  //   this.page = 1;
  //   this.pageSelect.emit(1);

  //   this.row = (this.rowsPerPageOptions.filter(key => this.row === key))[0];
  //   this.size = Math.ceil(this.totalSize / this.row);
  //   this.sizing = Array(this.size).fill(2).map((x, i) => i + 1);
  //   this.pageCurrent = this.sizing.slice(0, this.displayNumber);
  // }

  // onSelectpage(pg) {
  //   this.page = pg;
  //   this.pageSelect.emit(pg);
  // }

  // goFirst() {
  //   this.page = 1;
  //   this.showPage(this.page);
  // }

  // golast() {
  //   this.page = this.size;
  //   this.showPage(this.page);
  // }

  // onPrevious() {
  //   if (this.page <= 1) {
  //     this.page = 1;
  //   } else {
  //     this.page--;
  //   }
  //   this.showPage(this.page);
  // }

  // onNext() {
  //   if (this.page === this.size) {
  //     this.page = this.size;
  //   } else {
  //     this.page++;
  //   }
  //   this.showPage(this.page);
  // }

  // showPage(pg) {
  //   this.pageSelect.emit(pg);
  //   const last = this.size - 2;
  //   const sizePage = this.pageCurrent.length;
  //   if (this.page > 3 && this.page < last) {
  //     this.pageCurrent = this.sizing.slice(pg - 3, pg + 2);
  //   } else if (this.page > last) {
  //     this.pageCurrent = this.sizing.slice(this.size - sizePage, this.size);
  //   } else if (this.page < sizePage) {
  //     this.pageCurrent = this.sizing.slice(0, 5);
  //   } else {
  //     this.pageCurrent = this.sizing.slice(pg - 3, this.size);
  //   }
  // }

  // onSelectrow() {
  //   this.size = Math.ceil(this.totalSize / this.row);
  //   this.sizing = Array(this.size).fill(2).map((x, i) => i + 1);
  //   this.goFirst();
  // }

}
