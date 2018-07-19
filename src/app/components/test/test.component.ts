import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public isDisable: boolean;
  public nameList: {
    name: String,
    surname: String
  };


  constructor() {
    this.isDisable = true;
    this.nameList = {
      name: 'Cherprang',
      surname: 'bnk48'
    };
  }

  ngOnInit() {
  }



  onDisabled() {
    this.isDisable = !this.isDisable;
  }

}
