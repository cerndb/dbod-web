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

    instanceId: Number;
    data: Object;

    constructor( private route: ActivatedRoute, private router: Router, private instanceService: InstanceService ) {

      this.route.params.subscribe(params => {
          this.instanceId = params['id'];
      });

      this.instanceService.getInstances().subscribe((res) => {
        this.data = res.find(x => x.id == this.instanceId);
      });

      this.router.events.subscribe(event => {
        if(event.constructor.name === "NavigationStart") {
            document.getElementById('instance-list-view').style.display = 'block';
        }
      });
    }
  
}
