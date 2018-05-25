import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by"><b><a href="https://home.cern" target="_blank">© CERN</a></b> 2018</span>
    <div class="logo-cern"></div>
    <div class="logo-dbod"></div>
    <div class="socials">
      <a href="https://github.com/cerndb/dbod-web" target="_blank" class="ion ion-social-github"></a>
    </div>
  `,
})
export class FooterComponent {
}
