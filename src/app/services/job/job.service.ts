import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class JobService {
    constructor(private http: Http) {
         let obj;
         this.getJobs().subscribe(data => obj = data, error => console.log(error));
    }

    getJobs(): Observable<any> {
        return this.http.post(`/api/v1/job`, '{"owner": "user02", "groups": ["testgroupB"], "admin": true}')
            .map((res: any) => res.json());

    }

    getJobInfo(name: string, job: number): Observable<any> {
        return this.http.get(`/api/v1/instance/${name}/job/${job}`)
            .map(res => res.json());
    }

    getJobsForInstance(name: string): Observable<any> {
        return this.http.get(`/api/v1/instance/${name}/job`)
            .map(res => res.json());
    }
}
