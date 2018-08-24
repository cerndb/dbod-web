import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable()
export class RundeckService {
  constructor(private http: Http, private authService: AuthenticationService) { }

  post(path: string, params?) {
    return new Promise( (resolve, reject) => {
    	this.authService.loadUser().then( () => {
	    	this.http.post('./api/v1/rundeck/'+path, params, { headers: new Headers({ 'jwt-session': this.authService.user.jwt }) })
	    	.map((res:any) => res.json())
	    	.subscribe( (data: any) => {
	    		console.log(data);
	    		resolve(data.response.entries[0]);
	    	}, (err) => reject(err));
	    });
	});
  }
}