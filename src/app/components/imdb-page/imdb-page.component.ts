import { Component, OnInit } from '@angular/core';
import { PubsubService } from '../../services/pubsub.service';

export interface Tab {
  id: Number;
  name: String;
  status: Boolean;
}

export interface Movie {
  id: Number;
  name: String;
  pic: String;
  status: Boolean;
  type: String;
}


@Component({
  selector: 'app-imdb-page',
  templateUrl: './imdb-page.component.html',
  styleUrls: ['./imdb-page.component.css']
})

export class ImdbPageComponent implements OnInit {

  public tabs: Tab[] = [];
  public movies: Movie[] = [];
  // public movieSelect: Movie[] = [];
  public tabCurrent: any;

  constructor(private msgPub: PubsubService) {

    this.tabs = [
      { id: 0, name: 'The Best', status: true },
      { id: 1, name: 'Popular', status: false },
      { id: 2, name: 'New', status: false },
      { id: 3, name: 'Summary', status: false }
    ];

    this.movies = [
      {
        id: 1, name: 'หอแต๋วแตก แหกชิมิ',
        pic: 'https://pbs.twimg.com/profile_images/1182950247/PT_3.jpg', status: false, type: 'Best'
      },
      {
        id: 2, name: 'หอแต๋วแตก2',
        pic: 'http://movie.mthai.com/app/uploads/2015/10/hh2.jpg', status: false, type: 'Best'
      },
      {
        id: 3, name: 'หอแต๋วแตก',
        pic: 'https://4.bp.blogspot.com/-yIa_tb7UsJc/VinaYSEtvCI/AAAAAAAAbDM/GiiepPX7WIE/s320/Hor%2BTaew%2BTak%2B1%2B%25282007%2529.jpg',
        status: false, type: 'Best'
      },
      { id: 4, name: 'หอแต๋วแตก4', pic: 'http://p.s1sf.com/mv/0/ud/6/32879/hor1-ss.jpg', status: false, type: 'Best' },
      { id: 5, name: 'ม.6/5', pic: '../assets/pic/mor653_101-419x6001.jpg', status: false, type: 'Best' },
      { id: 6, name: 'ป๊าด888', pic: 'http://p4.isanook.com/mv/0/ud/12/63497/1.jpg', status: false, type: 'Best' },
      {
        id: 7, name: 'Thor : Ragnarok',
        pic: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjMyNDkzMzI1OF5BMl5BanBnXkFtZTgwODcxODg5MjI@._V1_SX146_CR0,0,146,215_.jpg',
        status: false, type: 'New'
      },
      {
        id: 8, name: 'Geostorm',
        pic: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTA0OTQwMTIxNzheQTJeQWpwZ15BbWU4MDQ1MzI3OTMy._V1_UX182_CR0,0,182,268_AL_.jpg',
        status: false, type: 'New'
      },
      {
        id: 10, name: 'Blade Runner 2049',
        pic: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_UX182_CR0,0,182,268_AL_.jpg',
        status: false, type: 'New'
      },
      {
        id: 11, name: 'The LEGO Ninjago Movie',
        pic: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNDI3MDljMTQtYzBiYS00NDk2LTlhYzUtYmM0NWIyMmZkMDZkXkEyXkFqcGdeQXVyNjk5NDA3OTk@._V1_UY222_CR0,0,150,222_AL.jpg',
        status: false, type: 'New'
      },
      {
        id: 12, name: 'Kingsman:The Golden Circle',
        pic: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ3OTgzMzY4NF5BMl5BanBnXkFtZTgwOTc4OTQyMzI@._V1_UY222_CR0,0,150,222_AL.jpg',
        status: false, type: 'New'
      },
      {
        id: 13, name: 'BAD GENIUS',
        pic: 'https://resizing.flixster.com/7bHNSX5Z0rB_maud2-D7Yd5ulHg=/206x305/v1.bTsxMjM5MTYzMjtqOzE3NTEzOzEyMDA7NzAwOzEwMDA',
        status: false, type: 'Popular'
      },
      {
        id: 14, name: 'cars 3',
        pic: 'https://resizing.flixster.com/25aO4PRPKqiN0El_as9LQzeW_W4=/206x305/v1.bTsxMjMzMDk5MTtqOzE3NTEyOzEyMDA7MTA4NjsxNjA5',
        status: false, type: 'Popular'
      },
      {
        id: 15, name: 'YOUR NAME',
        pic: 'https://resizing.flixster.com/yYNtW8wmiV4YpzqthmwICObA-v0=/206x305/v1.bTsxMjI1ODAxNztqOzE3NTExOzEyMDA7NjI0OzkyNQ',
        status: false, type: 'Popular'
      },
      {
        id: 16, name: 'IT',
        pic: 'https://resizing.flixster.com/D80WxYnklfHaF8rY3AmMKmrCBGU=/206x305/v1.bTsxMjM1MDg5ODtqOzE3NTEyOzEyMDA7NjQ4Ozk2MA',
        status: false, type: 'Popular'
      },
      {
        id: 17, name: 'SPIDER-MAN: HOMECOMING',
        pic: 'https://resizing.flixster.com/dnh25hJPdzGlXbXXEtP6xAojCpo=/206x305/v1.bTsxMjQxNTA2NTtqOzE3NTEzOzEyMDA7Mzc4OzU2MA',
        status: false, type: 'Popular'
      },
      {
        id: 18, name: 'THE EMOJI MOVIE',
        pic: 'https://resizing.flixster.com/XD4XYl1YFQBVkKMcIftjuTzOG34=/206x305/v1.bTsxMjQ0MTQwNjtqOzE3NTEzOzEyMDA7MjAyNTszMDAw',
        status: false, type: 'Popular'
      },
      {
        id: 19, name: 'Shanghai Knights',
        pic: 'https://4.bp.blogspot.com/-d3X5rT3y2R0/VhqaupwgaOI/AAAAAAAAZuc/R8DIePUZ3UY/s320/knights_3184.jpg',
        status: false, type: 'Popular'
      }
    ];
  }

  ngOnInit() {
    this.msgPub.sendMessage(this.movies);
    this.tabCurrent = 0;
  }

  onTab(tab: Tab) {
    this.tabs.forEach((e, i) => {
      if (e.id === tab.id) {
        this.tabs[i].status = true;
        this.tabCurrent = e.id;
      } else {
        this.tabs[i].status = false;
      }
    });
  }

}
