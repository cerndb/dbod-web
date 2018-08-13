import { Component, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
    selector: 'cern-ngx-header',
    styleUrls: [ './header.component.scss' ],
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

    user: any;

    constructor(
        private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
        private authService: AuthenticationService,
    ) {}

    ngOnInit() {
        this.authService
          .loadUser().then( () => {
              this.user = this.authService.user;
          });
    }

    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, 'menu-sidebar');
        return false;
    }

    goToHome() {
        this.menuService.navigateHome();
    }
}
