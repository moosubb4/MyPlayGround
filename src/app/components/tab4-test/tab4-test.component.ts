import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { forEach } from '@angular/router/src/utils/collection';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface User {
  user: string;
  age: number;
}

export interface Payload {
  data: User[];
  totalSize: number;
}

// export interface Configoption {
//   rowSelection: number[];
//   totalSize: number;
//   row: number;
// }


@Component({
  selector: 'app-tab4-test',
  templateUrl: './tab4-test.component.html',
  styleUrls: ['./tab4-test.component.css']
})



export class Tab4TestComponent implements OnInit {

  public toolText: string;
  public originText: string;
  public msg: string;
  public Todos: Todo[] = [];
  public todoBuffer: any[] = [];
  public plusAdd: number;

  public cha: string;
  public varr: string;

  public configOption: any;
  public pageSelect: number;
  public pageEnable: boolean;
  public dafuq = true;
  public btn = false;
  public sortTable;
  public dataSource: Payload;
  public showData: any[] = [];

  constructor(private searchServices: SearchService) {
    this.msg = '123456789abcdefghijKuyeieiKuykuy';
    this.pageEnable = false;
  }

  ngOnInit() {
    this.onTooltips();
    // this.onSearch();
    this.plusAdd = this.onAdd(1, 9);

    const userData = [
      { name: 'kuy', age: 18 },
      { name: 'kuy2', age: 19 },
      { name: 'kuy3', age: 18 },
      { name: 'kuy4', age: 19 },
      { name: 'kuy5', age: 18 },
      { name: 'kuy6', age: 19 },
      { name: 'kuy7', age: 18 },
      { name: 'kuy8', age: 19 },
      { name: 'kuy9', age: 18 },
      { name: 'kuy10', age: 19 },
      { name: 'kuy11', age: 18 },
      { name: 'kuy12', age: 19 }
    ];

    const inputData = {
      data: userData,
      totalSize: userData.length
    };

    this.setPagination(inputData, 1);

    // this.doSomething(this.foo);

  }

  doSomething(callback) {
    callback('stuff', 'goes', 'here');
  }

  foo(a, b, c) {
    alert(a + ' ' + b + ' ' + c);
  }



  onTooltips() {
    if (this.msg) {
      this.originText = this.msg;
      if (this.msg.length > 17) {
        this.toolText = this.msg.substr(0, 17) + '...';
        //  console.log(this.originText);
      }
    }
  }



  onAdd(x: number, y: number): number {
    return Number(x + y);
  }


  // doAsyncTask() {
  //   const promise = new Promise((resolve, reject) => {
  //     // setTimeout(() => {
  //     console.log('Async Work Complete');
  //     if (this.onClick() === true) {
  //       resolve('Success');
  //     }
  //     // else {
  //     //   reject('Fail');
  //     // }
  //     // }, 1000);
  //   });
  //   return promise;
  // }

  doAsyncTask2(cb) {
    setTimeout(() => {
      console.log('Async Task Calling Callback');
      cb();
    }, 1000);
  }

  onClick(): boolean {
    // this.btn = e;
    if (this.btn == true) {
      console.log('btn', this.btn);
      return this.btn;
    }
  }

  tryMe(param1, param2) {
    alert(param1 + ' and ' + param2);
  }

  callbackTester(callback): any {
    callback(arguments[0], arguments[2]);
  }




  onSearch() {

    // this.callbackTester(this.tryMe(), 'hello', 'goodbye');

    this.doAsyncTask2(() => console.log('Callback Called'));

    // this.doAsyncTask().then(
    //   (e) => {
    //     console.log('Task Complete!', e);
    //     this.dafuq = false;
    //   });
    // this.configOption = {
    //   displayNumber: 5,
    //   row: 5,
    //   rowSelection: [5, 10, 15],
    //   totalSize: 100
    // };

    // this.searchServices.getTest().subscribe((res: Todo[]) => {
    //   this.Todos = res;
    //   if (this.Todos.length > 0) {
    //     this.pageEnable = true;
    //   }
    //   console.log(this.Todos);
    //   const cloneData = [...this.Todos];
    //   const arr = [];
    //   const size = this.configOption.row;


    //   while (cloneData.length > 0) {
    //     arr.push(cloneData.splice(0, size));
    //   }

    //   this.todoBuffer = arr;
    //   this.Todos = this.todoBuffer[this.pageSelect];


    // });
  }

  onPagechange(event) {
    console.log(event);
    this.pageSelect = event;
    this.Todos = this.todoBuffer[this.pageSelect];
  }



  conVcha() {

    const str = this.cha;

    if (str !== undefined) {
      const n: number[] = [];
      for (let i = 0; i < str.length; i++) {
        n.push(str.charCodeAt(i));
      }

      this.varr = (n).toString();

      const res = String.fromCharCode(...n);
      console.log(res);
    }


  }

  // onRealtext() {
  //   this.toolText = this.originText;
  //   // console.log('Hi Mouses');
  // }


  setPagination(data: any, setPage?: number) {
    if (data && Object.keys(data).length > 0) {
      // initial pagination
      this.sortTable = {
        rowSelection: 5, // select row to show
        totalSize: data.totalSize, // total size data length
        row: 5, // row to show
        setPage: setPage // if u wanna set first page when rerender
      };

      this.dataSource = data.data; // DataInput
    }
  }

  lazyLoadPage(event) {
    if (event) {
      this.showData = event.data;
      // rereder table
      // Expression Changed After It Has Been Checked Error: problem
      // console.log('​lazyLoadePage -> ', event);
    }
  }


}
