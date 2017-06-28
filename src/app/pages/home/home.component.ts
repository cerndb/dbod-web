import { Component, OnInit } from '@angular/core';
import { InstanceService } from '../../theme/services/instance-service';
import { StateButtonComponent } from '../../theme/components/state-button';

@Component({
  selector: 'home',
  styleUrls: ['./home.scss'],
  templateUrl: './home.html'
})
export class Home {

  instances;

  settings = {
    selectMode: 'multi',
    columns: {
      db_name: {
        title: 'DB Name',
      },
      hosts: {
        title: 'Host',
      
      },
      username: {
        title: 'Username',
      
      },
      class: {
        title: 'Category',
       
      },
      db_type: {
        title: 'DB Type',
     
      },
      state: {
        title: 'State',
        type: 'custom',
        renderComponent: StateButtonComponent,
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    hideSubHeader: false,

  };

  constructor(private _instanceService: InstanceService) {
    _instanceService.getInstances().subscribe((res) => {
      this.instances = res;
    });
  }

}
