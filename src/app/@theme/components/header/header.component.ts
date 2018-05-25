import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AuthenticationService } from '../../../services';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit {

  @ViewChild('username') username:ElementRef;

  @Input() position = 'normal';

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  user: {};

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private authenticationService: AuthenticationService,
    ) {
  }

  ngOnInit() {
    this.user = this.authenticationService.loadUser().then(user => {
      this.username.nativeElement.innerHTML = `${user.username} (${user.affiliation})`;
      this.username.nativeElement.title = `Signed in as ${user.fullname} (${user.username})`;
    });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

}
