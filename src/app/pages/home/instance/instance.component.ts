import { Component, OnInit, Input } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { InstanceService } from '../../../theme/services/instance-service';

@Component({
  selector: 'instance',
  styleUrls: ['./instance.scss'],
  templateUrl: './instance.html'
})
export class InstanceComponent {

    db_name: String;
    data: Object;

    constructor( private route: ActivatedRoute, private router: Router, private instanceService: InstanceService ) {

      this.route.params.subscribe(params => {
          this.db_name = params['id'];
      });

      this.instanceService.getInstances().subscribe((res) => {
        this.data = res.find(x => x.db_name == this.db_name);
      });

      this.router.events.subscribe(event => {
        if(event.constructor.name === "NavigationStart") {
            document.getElementById('instance-list-view').style.display = 'block';
        }
      });
    }
  
}
