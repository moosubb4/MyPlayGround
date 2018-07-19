import { Component, OnInit, Input } from '@angular/core';
import { ShowService } from '../../services/show.service';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: { street: String };
  phone: string;
  website: string;
  company: String;
}

export interface Userstat extends User {
  stat: boolean;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})



export class SearchBarComponent implements OnInit {
  public usersList: User[] = [];
  public usersStat: Userstat[] = [];
  public userSeek: User[] = [];
  public isCheck: boolean;
  public seeking: String = '';
  public wordSeek: User[] = [];


  constructor(private showSrevice: ShowService) { }

  ngOnInit() {
  }

  show() {
    this.usersStat = [];
    this.showSrevice.getUsers().subscribe(res => {
      this.usersList = res;
      this.usersList.forEach(e => {
        this.usersStat.push({ stat: false, ...e });
      });
      // console.log(this.usersStat);
    });
    this.showTable();
  }

  seek(word: String) {
    console.log(word + ' ');
    this.usersStat = [];
    this.showSrevice.getUsers().subscribe((res: User[]) => {
      this.usersStat = [];
      this.wordSeek = res.filter((val, i) => {
        if (val.name.toUpperCase().indexOf(word.toUpperCase()) > -1) {
          this.usersStat.push({ stat: false, ...val });
        } else if (val.email.toUpperCase().indexOf(word.toUpperCase()) > -1) {
          this.usersStat.push({ stat: false, ...val });
        } else if (val.username.toUpperCase().indexOf(word.toUpperCase()) > -1) {
          this.usersStat.push({ stat: false, ...val });
        } else if (val.address.street.toUpperCase().indexOf(word.toUpperCase()) > -1) {
          this.usersStat.push({ stat: false, ...val });
        }
      });
      console.log(this.wordSeek);
    });
    if (this.isCheck === false) {
      this.showTable();
    }
  }

  search() {
    if (this.seeking === '') {
      this.show();
    } else {
      this.seek(this.seeking);
    }
  }

  onReset() {
    // this.showTable();
    this.usersStat = [];
    this.seeking = '';
    if (this.isCheck === true) {
      this.showTable();
    }
  }

  showTable() {
    this.isCheck = !this.isCheck;
  }

}
