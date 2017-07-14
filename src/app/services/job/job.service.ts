import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 
import { Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class JobService {
    constructor(private http: Http) {
         var obj;
         this.getJobs().subscribe(data => obj=data, error => console.log(error));
    }

    getJobs(): Observable<any> {
         return this.http.get('assets/job-info.json')
                         .map((res:any) => res.json());

     }
}
