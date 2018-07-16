import { Component } from '@angular/core';

@Component({
    selector: 'cern-ngx-footer',
    styleUrls: [ './footer.component.scss' ],
    template: `
    <span class="created-by">Created with ♥ by <b><a href="https://cern.ch" target="_blank">DBOD</a></b> 2018 </span>
    <div class="socials">
      <a href="https://cern.service-now.com/service-portal/privacy-policy.do?se=database-on-demand&draft=true" target="_blank" class="fa fa-book"><span>Privacy Policy</span></a>
      <a href="https://cern.ch/dbod-user-guide" target="_blank" class="fa fa-book"><span>User Guide</span></a>
      <a href="https://cern.ch/dbod-admin-guide" target="_blank" class="fa fa-book"><span>Admin Guide</span></a>
    </div>
  `,
})
export class FooterComponent {}
