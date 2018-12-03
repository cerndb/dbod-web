import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable()
export class FileDownloaderService {
  constructor(private http: Http, private authService: AuthenticationService) { }

  saveFile(url, instance) {
    return new Promise( (resolve, reject) => {
      this.authService.loadUser().then( () => {
        this.http.get('/download', {"params": {"url": url, "instance": instance}})
        .map((res:any) => res.text())
        .subscribe( (res) => resolve(res));
      }, (err) => reject(err));
    })
  }

  getConfigFile(file) {
    return new Promise( (resolve, reject) => {
      this.authService.loadUser().then( () => {
        this.http.get('/download/' + file)
        .map((res:any) => res.text())
        .subscribe( (res) => resolve(res));
      }, (err) => reject(err));
    })
  }

  getLogFile(url) {
    return new Promise( (resolve, reject) => {
      this.authService.loadUser().then( () => {
        this.http.get('/download/log-file', {"params": {"url": url}})
        .map((res:any) => res.text())
        .subscribe( (res) => resolve(res));
      }, (err) => reject(err));
    })
  }

  /*getValidation(newFile, oldFile){
    return new Promise( (resolve, reject) => {
      this.authService.loadUser().then( () => {
        this.http.get('/validate', {"params": {"newFile": newFile, "oldFile": oldFile}})
        .map((res:any) => res.text())
        .subscribe( (res) => console.log(res));
      }, (err) => reject(err));
    })
  }*/
  getValidation(newFile){
    return new Promise( (resolve, reject) => {
      this.authService.loadUser().then( () => {
        this.http.post('/validate', {"newFile": newFile})
        .map((res:any) => res.json())
        .subscribe( (res) => resolve(res));
      }, (err) => reject(err));
    })
  }
}
