import { Component, OnInit, Input, Renderer2 } from '@angular/core';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: String;
  phone: string;
  website: string;
  company: String;
}

export interface Userstat extends User {
  stat: boolean;
  // bg: {};
}

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})

export class UsersTableComponent implements OnInit {
  @Input() userStat;
  public userStatChange: String[] = [];
  public userEmpty: Boolean;
  public eventCheck: Boolean;



  constructor() {
  }

  ngOnInit() {
  }

  setStyle(index) {
    const styles = {
      'background-color': this.userStat[index].stat === true ? 'grey' : 'white'
    };
    return styles;
  }

  onCheck(index, data, event) {
    this.userStat[index].stat = event; // switch status
    // console.log(this.userStat[index]);
    if (this.userStat[index].stat === true) {
      this.userStatChange.push({ ...data });
    } else {
      this.userStat.forEach((e, i) => {
        if (this.userStat[i].stat === false && e.id === this.userStat[i].id) {
          this.userStatChange.splice(i, 1);
        }
      });
    }
    this.isEmpty();
    // console.log(this.userStatChange);
  }

  isEmpty() {
    if (this.userStatChange.length === 0) {
      this.userEmpty = true;
    } else {
      this.userEmpty = false;
    }
  }

}
