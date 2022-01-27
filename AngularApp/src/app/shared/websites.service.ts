//import { Injectable } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { toPromise } from 'rxjs/operators';


//import 'rxjs/operator/map';
//import 'rxjs/add/operator/toPromise';

import { Websites } from './websites.model';

@Injectable({
  providedIn: 'root'
})
export class WebsitesService {

  selectedWebsites: Websites = new Websites;
  websites: Websites[] = [];
  readonly baseURL = 'http://localhost:3004/website';

  constructor(private http: HttpClient) { }
  //constructor() { }

  postWeb(web: Websites) {
    return this.http.post(this.baseURL, web);
  }

  getWebList() {
    return this.http.get(this.baseURL);
  }

  putWeb(web: Websites) {
    return this.http.put(this.baseURL + `/${web._id}`,web);
  }

  deleteWeb(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }


}

