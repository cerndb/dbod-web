import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InstanceService } from '../../services/instance';

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
        this.data = res.find(x => x.db_name === this.db_name);
      });
    }
  
}
