import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ESService {
    constructor(private http: Http) {
        // let obj;
        // this.getES2().subscribe(data => obj = data, error => console.log(error));
    }

    getES(name: string, dbType: string, logType:string): Observable<any> {
        const size = 10;
        return this.http.get(`/ES/${name}/${dbType}/${logType}/${size}`)
        .map(res => res.json());
     }
    //  getES2(): Observable<any> {
    //     return this.http.get('assets/ES-info.json').map((res:any) => res.json());
    //  }
}
