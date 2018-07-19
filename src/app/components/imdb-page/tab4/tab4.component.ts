import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PubsubService } from '../../../services/pubsub.service';
import { Movie } from '../imdb-page.component';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.component.html',
  styleUrls: ['./tab4.component.css']
})
export class Tab4Component implements OnInit {

  public movies: Movie[] = [];
  public moc: Movie[] = [];
  public movieSelect: Movie[] = [];

  constructor(private msgSub: PubsubService) { }

  ngOnInit() {

    console.log('Tab 4!!!!');

    this.movies = [];
    this.msgSub.movieList.subscribe(data => {
      if (data !== null) {
        this.movies = data;
        // console.log(this.movies);
      }
    });

    this.movieSelect = [];
    this.msgSub.movieSelected.subscribe(data => {
      if (data !== null) {
        this.movieSelect = data;
        // console.log('recive tab 4');
        // console.log(this.movieSelect);
      }
    });
  }



  onSelect(index, mov: Movie) {

    this.movies.forEach((val, i) => {
      if (val.id === mov.id) {
        console.log(val);
        if (val.status === false) {
          this.movies[i].status = true;
          console.log('set True ' + this.movies[i].name);
        } else {
          this.movies[i].status = false;
          console.log('set False ' + this.movies[i].name);
        }
      }

      if (this.movies[i].status !== true) {
        this.movieSelect = this.movieSelect.filter((e) => mov.id !== e.id);
        console.log('Del ' + this.movieSelect);
      }

    });

    console.log('Tab 4 Send Selected');
    this.msgSub.send2Message(this.movieSelect);
    this.msgSub.sendMessage(this.movies);

  }

}
