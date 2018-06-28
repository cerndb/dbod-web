import { Component } from '@angular/core';

@Component({
    selector: 'cern-ngx-footer',
    styleUrls: [ './footer.component.scss' ],
    template: `
    <span class="created-by">Created with ♥ by <b><a href="https://cern.ch" target="_blank">Nile</a></b> 2018 </span>
    <div class="socials">
      <a href="https://nile-user-guide.web.cern.ch/nile-user-guide/" target="_blank" class="fa fa-book"><span>User Guide</span></a>
      <a href="https://nile-admin-guide.web.cern.ch/nile-admin-guide/" target="_blank" class="fa fa-book"><span>Admin Guide</span></a>
    </div>
  `,
})
export class FooterComponent {}
