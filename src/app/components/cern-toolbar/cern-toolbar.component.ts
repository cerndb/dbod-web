import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AuthenticationService, User } from '../../services/authentication';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
  selector: 'cern-toolbar',
  templateUrl: './cern-toolbar.component.html',
  styleUrls: ['./cern-toolbar.component.scss']
})
export class CernToolbarComponent implements OnInit {

  @ViewChild('username') username: ElementRef;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.loadUser().then(user => { 
      this.username.nativeElement.innerHTML = `${user.username} (${user.affiliation})`;
      this.username.nativeElement.title = `Signed in as ${user.fullname} (${user.username})`;
    });
  }

}
