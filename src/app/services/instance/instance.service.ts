import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 
import { Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class InstanceService {
  constructor(private http: Http) {
    var obj;
    this.getInstances().subscribe(data => obj=data, error => console.log(error));
  }

  getInstances(): Observable<any> {
    //return this.http.get('assets/instance-info.json')
    return this.http.get('./api/v1/instance')
                       .map((res:any) => res.json());
  }

  put(instanceId,attribute,fieldName,fieldValue) {
  	return new Promise( (resolve, reject) => {
  		var url = attribute ? './api/v1/instance/'+instanceId+'/attribute/'+fieldName : './api/v1/instance/'+instanceId;
  		var req;
  		if(attribute) { 
  			req = fieldValue;
  		}
  		else {
  			req = {};
	    	req[fieldName] = fieldValue;
  		}

  		var toReturn = {
  			message: '',
  			status: 0,
  		};

  		console.log(req);

  		this.http.put(url,req).subscribe( (res:any) => {
				if(!res.ok) {
					toReturn.message = res.message;
		      toReturn.status = res.status;
				}
				else {
					toReturn.message = 'Change applied with success.';
		      toReturn.status = 200;
				}
				resolve(toReturn);
	    }, (err:any) => {
	    	toReturn.message = err.message;
	    	toReturn.status = err.status;
	    	reject(toReturn);
	    });
    });
  }
}
