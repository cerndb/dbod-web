import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';

@Component({
    selector: 'cern-ngx-header',
    styleUrls: [ './header.component.scss' ],
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
    @Input() position = 'normal';

    user: any;

    constructor(
        private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
        private userService: UserService,
    ) {}

    ngOnInit() {
        this.userService.getUsers().subscribe((users: any) => (this.user = users.nick));
    }

    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, 'menu-sidebar');
        return false;
    }

    goToHome() {
        this.menuService.navigateHome();
    }
}
