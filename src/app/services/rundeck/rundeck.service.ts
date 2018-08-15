import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class RundeckService {
  constructor(private http: HttpClient) { }

  post(path: string, params?) {
    return new Promise( (resolve, reject) => {
    	this.http.post('./api/v1/rundeck/'+path,params).subscribe( (data: any) => {
    		resolve(data.response.entries[0]);
    	}, (err) => reject(err));
    });
  }
}