import { Component, OnInit } from '@angular/core';
import { ShowService } from '../../services/show.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})

export class ShowComponent implements OnInit {

  public usersList: User;
  public userCheck: User[] = [];
  public isCheck: boolean;
  public isChecking: boolean;
  // public userStats: Userstat;
  public userStat: Userstat[] = [];

  // protected usersList: any[];
  constructor(private showSrevice: ShowService) {
    this.isChecking = false;
  }

  ngOnInit() {
    // this.show();
  }

  show() {
    this.showSrevice.getUsers().subscribe(res => {
      this.usersList = res;
    });
  }

  search() {
    this.isChecked();
    this.show();
    console.log();
  }

  onReset() {
    this.isChecked();
    this.usersList = null;
    this.userStat = [];
  }

  onCheck(id, data: User, event) {
    console.log(event);
    this.isCheckings();
    if (event.target.checked === true && id === data.id) {
      this.userStat.push({ stat: true, ...data });
    } else {
      this.userStat.forEach((e, i) => {
        if (id === e.id && e.stat === true && event.target.checked === false) {
          this.userStat.splice(i, 1);
        }
      });
    }
  }

  isChecked() {
    this.isCheck = !this.isCheck;
  }

  isCheckings() {
    this.isChecking = !this.isChecking;
  }

}

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
}
