import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { log } from 'util';

@Component({
  selector: 'app-pipe-test',
  templateUrl: './pipe-test.component.html',
  styleUrls: ['./pipe-test.component.css']
})
export class PipeTestComponent implements OnInit {

  public num: any = 0;
  public num2: any = null;
  public param: any;
  public audio = new Audio();
  public loader: boolean;
  public list: String[] = ['Joox', 'Fungi', 'Apple music', 'Spotify'];
  public gift: String[] = ['Netflix'];
  public count: number = 1;
  public years: any;
  public years1: any;
  public numMax: any;
  public testL: string = 'HHHHH';
  public dateForm: string = '20180102';
  public regDate = new RegExp(/^\d{4}-\d{2}-\d{2}$/, 'g');
  public kuy1: string;
  public kuy2: string;
  // options: any = {
  //   removeOnSpill: true,
  //   // revertOnSpill: true,
  //   // copy: true,
  // };

  constructor(private route: ActivatedRoute, private dragulaService: DragulaService) {
    this.loader = false;
    // dragulaService.setOptions('third-bag', {
    //   removeOnSpill: true
    // });

    // dragulaService.setOptions('bag-one', {
    //   copy: true
    // });



    dragulaService.setOptions('bag-one', {
      moves: function (el, container, handle) {
        return handle.className === 'handle';
      }
    });

    dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    });

  }

  ngOnInit() {
    this.audio.src = '/assets/Epic Unease.mp3';
    this.audio.load();
    console.log(this.testL);
    console.log(this.testL.length);
    this.dateFormat();
    // console.log(this.list);
    // console.log('---------');
    // console.log(this.num);
  }

  onPress(event) {
    if (this.num2 == null || this.num2 == undefined || this.num2 == '') {
      this.count = 0;
    }
    console.log('event ' + (this.count++));
    console.log(event);
    console.log(this.num2);
    console.log((this.num2.toString().replace(/[^0-9\.-]+/g, '')).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    // this.num2 = (this.num2.toString().replace(/[^0-9\.-]+/g, '')).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  dateFormat() {

    // this.dateForm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    console.log(this.dateForm.toString().replace(/(\d{4})+[?!]+(\d{2})+[?!]+(\d{2})/g, '/'));
  }

  zeroFill(event) {
    let numN = event.target.value;
    let numM;
    let zero;

    if (numN !== undefined && numN != null) {
      numM = Object.values(numN).length;
      if (numM < 10) {
        zero = '';
        for (let i = 0; i < 10 - numM; i++) {
          zero += '0';
        }
        numN = zero + numN;
      }
      this.numMax = numN;
    }
  }

  // @HostListener('keydown', ['$event']) onKeyDown(event: any) {
  //   const e = <KeyboardEvent>event;
  //   console.log(e);
  //   // if (/[^0-9]/g) {
  //   //   // e.preventDefault();
  //   //   console.log(e);
  //   // } else {
  //   //   console.log('fuq');
  //   // }
  // }

  // @HostListener('keypress', ['$event']) onKeyPress(event: any) {
  //   const e = <KeyboardEvent>event;
  //   console.log(e);
  // }

  // @HostListener('keyup', ['$event']) onKeyUp(event: any) {
  //   const e = <KeyboardEvent>event;
  //   console.log(e);
  // }

  // private onDrag(args) {
  //   const [e, el] = args;
  //   // do something
  // }

  // private onDrop(args) {
  //   console.log(this.gift);
  //   // this.gift.push(args);
  //   const [e, el] = args;
  //   // do something
  // }

  // private onOver(args) {
  //   const [e, el, container] = args;
  //   // do something
  // }

  // private onOut(args) {
  //   console.log('---------');
  //   console.log(this.list);
  //   console.log(this.gift);
  //   console.log('---------');
  //   const [e, el, container] = args;
  //   // do something
  // }

  private hasClass(el: any, name: string) {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el: any, name: string) {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el: any, name: string) {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }

  private onDrag(args) {
    const [e, el] = args;
    this.removeClass(e, 'ex-moved');
  }

  private onDrop(args) {
    const [e, el] = args;
    this.addClass(e, 'ex-moved');
  }

  private onOver(args) {
    const [e, el, container] = args;
    this.addClass(el, 'ex-over');
  }

  private onOut(args) {
    const [e, el, container] = args;
    this.removeClass(el, 'ex-over');
  }


  onPlay() {
    this.audio.play();
    this.loader = true;
  }

  onPause() {
    this.audio.pause();
    this.loader = false;
  }



}
