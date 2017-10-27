import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ESService {
    constructor(private http: Http) {
    }

    getES(name: string, dbType: string, logType:string): Observable<any> {
        const size = 10;
        return this.http.get(`/ES/${name}/${dbType}/${logType}/${size}`)
        .map(res => res.json());
     }
}
