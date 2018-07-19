import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ShowService {

  constructor(private http: Http) { }

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users').map((res) => res.json());
  }

}
