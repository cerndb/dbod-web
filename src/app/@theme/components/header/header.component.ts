import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

import { AuthenticationService, User } from '../../../services/authentication';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit {

  @ViewChild('username') username: ElementRef;

  @Input() position = 'normal';

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  user: {};

  constructor(
    private authenticationService: AuthenticationService,
    ) {
  }

  ngOnInit() {
    this.user = this.authenticationService.loadUser().then(user => {
      this.username.nativeElement.innerHTML = `${user.username} (${user.federation})`;
      this.username.nativeElement.title = `Signed in as ${user.fullname} (${user.username})`;
    });
  }
}
