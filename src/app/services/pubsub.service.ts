import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PubsubService {

  public movieList: BehaviorSubject<any> = new BehaviorSubject(null);
  public movieSelected: BehaviorSubject<any> = new BehaviorSubject(null);
  public data: any[] = [];

  constructor() { }


  sendMessage(message: any) {
    this.movieList.next(message);
  }

  clearMessage() {
    this.movieList.next(null);
  }

  unSub() {
    this.movieList.unsubscribe();
  }


  send2Message(message: any) {
    this.movieSelected.next(message);
  }

  clear2Message() {
    this.movieSelected.next(null);
  }

  // getMessage(): any {
  //   this.movieList.subscribe(res => {
  //     console.log('--------');
  //     console.log(res);
  //     console.log('--------');
  //     this.data = res;
  //   });
  // }


}
