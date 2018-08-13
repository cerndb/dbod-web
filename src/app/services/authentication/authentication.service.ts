import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

	user: any;

  constructor(private http: HttpClient) {}

  loadUser() {
	  return new Promise( (resolve, reject) => {
	  	if(this.user==undefined) {
	  		this.http.get('/auth').subscribe( (data:any) => {
		    	if(data.isAdmin==undefined) {
		    		data.isAdmin = false
		    	}
		    	this.user = data;
		    	// this.user.isAdmin = true;
		    	resolve();
		    }, (err) => {
		    	console.log(err);
		    	reject();
		    });
	  	}
	  	else {
	  		resolve();
	  	}
	  });
  }
}
