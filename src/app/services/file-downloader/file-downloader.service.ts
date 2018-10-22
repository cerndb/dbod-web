import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable()
export class FileDownloaderService {
  constructor(private http: Http, private authService: AuthenticationService) { }

  getFile(file: string) {
    return new Promise( (resolve, reject) => {
      this.authService.loadUser().then( () => {
        this.http.get('/download' + '/' + file)
                       .map((res:any) => res.text())
                       .subscribe( (res) => resolve(res));
      });
    })
  }

}
