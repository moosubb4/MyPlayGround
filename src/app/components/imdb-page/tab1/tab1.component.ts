import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PubsubService } from '../../../services/pubsub.service';
import { Movie } from '../imdb-page.component';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.css']
})

// export class Tab1Component implements OnInit, AfterViewInit {
export class Tab1Component implements OnInit {
  public movies: Movie[] = [];
  public movieSelect: Movie[] = [];
  public bobo: Movie[] = [];

  constructor(private msgSub: PubsubService) { }

  ngOnInit() {

    console.log('Tab 1!!!!');

    this.movies = [];
    this.msgSub.movieList.subscribe(data => {
      if (data !== null) {
        this.movies = data.filter((e) => e.type === 'Best');
        // console.log(this.movies);
      }
    });

    this.movieSelect = [];
    this.msgSub.movieSelected.subscribe(data => {
      if (data !== null) {
        this.movieSelect = data;
        console.log('Tab 1 Recive Selected');
        // console.log(this.movieSelect);
      }
    });
  }

  onSelect(index, mov: Movie) {

    if (mov.status === false) {
      this.movies[index].status = true;
    } else {
      this.movies[index].status = false;
    }

    if (this.movies[index].status === true) {
      this.movieSelect.push(mov);
    } else {
      this.movieSelect = this.movieSelect.filter((val) => mov.id !== val.id);
      //  console.log(this.movieSelect);
    }
    console.log('Tab 1 Send Selected');
    this.msgSub.send2Message(this.movieSelect);
  }


}
