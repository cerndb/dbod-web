import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable()
export class InstanceService {
  constructor(private http: Http, private authService: AuthenticationService) { }

  getInstances() {
    return new Promise( (resolve, reject) => {
      this.authService.loadUser().then( () => {
        this.http.get('./api/v1/instance', { headers: new Headers({ 'jwt-session': this.authService.user.jwt }) })
                       .map((res:any) => res.json())
                       .subscribe( (res) => resolve(res));
      });
    })
  }

  getExpiredPending() {
    return new Promise( (resolve, reject) => {
      this.authService.loadUser().then( () => {
        this.http.get('./api/v1/instance', { headers: new Headers({ 'jwt-session': this.authService.user.jwt }) })
                       .map((res:any) => res.json())
                       .subscribe( (res) => resolve(res));
      });
    })
  }

  getUpgrades(): Observable<any> {
       return this.http.get('assets/upgrades-info.json')
                       .map((res:any) => res.json());
  }

  post(instanceId,attribute,fieldName,fieldValue) {
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

      this.http.post(url,req, { headers: new Headers({ 'jwt-session': this.authService.user.jwt }) }).subscribe( (res:any) => {
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

  		this.http.put(url,req, { headers: new Headers({ 'jwt-session': this.authService.user.jwt }) }).subscribe( (res:any) => {
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

  delete(instanceId,attribute,fieldName) {
    return new Promise( (resolve, reject) => {
      var url = attribute ? './api/v1/instance/'+instanceId+'/attribute/'+fieldName : './api/v1/instance/'+instanceId;

      var toReturn = {
        message: '',
        status: 0,
      };

      this.http.delete(url, { headers: new Headers({ 'jwt-session': this.authService.user.jwt }) }).subscribe( (res:any) => {
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
