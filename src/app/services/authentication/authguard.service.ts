import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';

@Injectable()

export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService) { }

  canActivate(){
    if(this.authService.user!=undefined){
      return this.authService.user.isAdmin;
    }
  }
}
