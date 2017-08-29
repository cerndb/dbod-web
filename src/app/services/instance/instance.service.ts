import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 
import { Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class InstanceService {
    constructor(private http: Http) {
         let obj;
         this.getInstances().subscribe(data => obj = data, error => console.log(error));
    }

    getInstances(): Observable<any> {
        return this.http.get(`/api/v1/instance`)
                        .map((res: any) => res.json());

    }

    getInstanceDetail(name: string, job: number): Observable<any> {
        return this.http.get(`/api/v1/instance/${name}/metadata`)
                        .map(res => res.json());
    }

}
