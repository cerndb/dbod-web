import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 
import { Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LogService {
    constructor(private http: Http) {
         var obj;
         //this.getLogs().subscribe(data => obj=data, error => console.log(error));
    }

    getLogs(name: string, logType:string, size, from): Observable<any> {
        return this.http.get(`/ES/${name}/${logType}/${size}/${from}`)
		.map(res => res.json());
     }

    countLogs(name: string, logType:string): Observable<any> {
        return this.http.get(`/ES/${name}/${logType}/count`)
		.map(res => res.json());
    }
}
