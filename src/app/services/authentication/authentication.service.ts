import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  loadUser(): Observable<any> {
    return this.http.get('/auth');
  }
}
