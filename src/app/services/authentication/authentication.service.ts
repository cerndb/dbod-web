import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export interface User {
  isAdmin: boolean;
  isAuthenticated: boolean;
  username: string;
}

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) {

  }

  loadUser() {
      return this.http.get('/auth')
        .map(res => res.json())
        .toPromise();
  }

}
