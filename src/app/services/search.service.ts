import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptionsArgs, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  public defaultHeaders: Headers = new Headers();

  constructor(private _http: Http) { }

  getMitsumori() {
    return this._http.get('https://jsonplaceholder.typicode.com/todos').map((res) => res.json());
    // const path = 'http://104.198.91.7:12001/ckj/v1/estimates/getMitsumoriItems?q=newcarFlg%3D1';
    // const queryParameters = new URLSearchParams();
    // const headerParams = this.defaultHeaders;
    // headerParams.set('auth', localStorage.getItem('token'));
    // const requestOptions: RequestOptionsArgs = {
    //   method: 'GET',
    //   headers: headerParams,
    //   search: queryParameters
    // };
    // return this._http.request(path, requestOptions)
    //   .map((response: Response) => {
    //     console.log(response);
    //   });
  }

  getTest() {
    return this._http.get('https://jsonplaceholder.typicode.com/todos').map((res) => res.json());
  }


}
