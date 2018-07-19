import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-check-select',
  templateUrl: './check-select.component.html',
  styleUrls: ['./check-select.component.css']
})
export class CheckSelectComponent implements OnInit {
  // public userStat: Userstat[] = [];
  @Input() userStat;
  constructor() { }

  ngOnInit() {
    // console.log(this.userStat);
  }

}
