import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

export interface Configoption {
  rowSelection: number[];
  totalSize: number;
  row: number;
  setPage?: number; // first page when reload pagiantion
}

export interface SortBack {
  page: number;
  rowSelect: number;
  data?: any[];
}

// export interface Contents {
//   result?: any[];
//   totalSize?: number;
// }


@Component({
  selector: 'app-paginators',
  templateUrl: './paginators.component.html',
  styleUrls: ['./paginators.component.css']
})

export class PaginatorsComponent implements OnInit, OnChanges {

  public page: number;
  public pageCurrent: number[] = [];
  public row: number;
  public size: number;
  public sizing: number[] = [];
  public totalSize: number;
  public sort: number;
  public rowsPerPageOptions: number[] = [];
  public SortBacks: SortBack = { page: 1, rowSelect: 10 };
  public rowSelection: number[] = [];
  public disabled: boolean;
  public sortSource: any[] = [];
  // @Input() rowSelection: number[] = []; // row per page to display option [10,20,30]
  @Output() pageSelect: EventEmitter<number> = new EventEmitter(); // = new EventEmitter<number>();
  @Input() configOption: Configoption;
  @Output() SortBack: EventEmitter<SortBack> = new EventEmitter();
  @Input() position: string;
  @Input() dataSource: any[] = [];

  constructor() {
    this.disabled = true;
    this.rowSelection = [5, 10, 20];
    this.row = 0;
    this.totalSize = 0;
    this.size = 0;
    this.position = 'R';
  }

  ngOnInit() {
    this.page = 1;
    Object.keys(this.configOption).length > 0 ? this.disabled = true : this.disabled = false;
  }

  ngOnChanges() {
    if (Object.keys(this.configOption).length > 0) {
      this.disabled = true;
      this.row = this.configOption.row;
      this.totalSize = this.configOption.totalSize;
      this.rowsPerPageOptions = this.rowSelection;
      this.row = (this.rowsPerPageOptions.filter(key => this.row === key))[0];
      this.size = Math.ceil(this.totalSize / this.row);
      if (this.size) {
        this.sizing = Array(this.size).fill(2).map((x, i) => i + 1);
      }
      if (this.pageCurrent.length < 1) {
        this.pageCurrent = this.sizing.slice(0, 5);
      }

      if (this.configOption.setPage) {
        this.page = this.configOption.setPage;
      }

      this.SortBacks.rowSelect = this.row;
      this.SortBacks.page = this.page;
    } else {
      this.disabled = false;
    }

    if (this.dataSource) {
      this.sourceManage([...this.dataSource])
        .then((e: any[]) => {
          this.sortSource = e;
          this.sentSort(this.configOption.setPage);
          this.showPage(this.configOption.setPage);
        });
    }
  }

  sourceManage(data: any[]) {
    return new Promise(resolve => {
      const src = [];
      while (data.length > 0) {
        src.push(data.splice(0, this.row));
      }
      resolve(src);
    });
  }

  onSelectpage(pg) {
    this.page = pg;
    this.pageSelect.emit(pg);
    this.sentSort(pg);
  }

  goFirst() {
    this.page = 1;
    this.showPage(this.page);
  }

  golast() {
    this.page = this.size;
    this.showPage(this.page);
  }

  onPrevious() {
    if (this.page <= 1) {
      this.page = 1;
    } else {
      this.page--;
    }
    this.showPage(this.page);
  }

  onNext() {
    if (this.page === this.size) {
      this.page = this.size;
    } else {
      this.page++;
    }
    this.showPage(this.page);
  }

  // showPage(pg) {
  //   const last = this.size - 2;
  //   const sizePage = this.pageCurrent.length;
  //   if (this.page > 3 && this.page < last) {
  //     this.pageCurrent = this.sizing.slice(pg - 3, pg + 2);
  //     this.sentSort(pg);
  //   } else if (this.page > last) {
  //     this.pageCurrent = this.sizing.slice(this.size - sizePage > 1 ? this.size - sizePage : 0, this.size);
  //     this.sentSort(pg);
  //   } else if (this.page < sizePage) {
  //     this.pageCurrent = this.sizing.slice(0, 5);
  //     this.sentSort(pg);
  //   } else {
  //     this.pageCurrent = this.sizing.slice(pg - 3 > 1 ? pg - 3 : 0, this.size);
  //     this.sentSort(pg);
  //   }
  // }

  showPage(pg) {
    const last = this.size - 2;
    const sizePage = this.pageCurrent.length;
    if (this.page > 3 && this.page < last) {
      this.pageCurrent = this.sizing.slice(pg - 3, pg + 2);
      // console.log('​showPage -> 1');
      this.sentSort(pg);
    } else if (this.page > last) {
      this.pageCurrent = this.sizing.slice(this.size - sizePage > 1 ? this.size - sizePage : 0, this.size);
      // console.log('​showPage -> 2');
      this.sentSort(pg);
    } else if (this.page < sizePage) {
      this.pageCurrent = this.sizing.slice(0, 5);
      // console.log('​showPage -> 3');
      this.sentSort(pg);
    } else {
      this.pageCurrent = this.sizing.slice(pg - 3 > 1 ? pg - 3 : 0, this.size > 5 && pg < 5 ? 5 : this.size);
      // console.log('​showPage -> 4', this.pageCurrent, pg - 3, this.size > 5 ? 5 : this.size);
      this.sentSort(pg);
    }
  }

  sentSort(pg) {
    this.SortBacks.page = pg;
    this.SortBacks.rowSelect = this.row;
    this.SortBacks.data = this.sortSource[pg - 1 > -1 ? pg - 1 : 0];
    this.SortBack.emit(this.SortBacks);
  }

  onSelectrow() {
    this.sourceManage([...this.dataSource])
      .then((e: any[]) => {
        this.sortSource = e;
        this.size = Math.ceil(this.totalSize / this.row);
        if (this.size) {
          this.sizing = Array(this.size).fill(2).map((x, i) => i + 1);
        }
        this.goFirst();
      });
  }

}
