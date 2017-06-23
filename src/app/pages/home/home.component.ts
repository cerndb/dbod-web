import {Component} from '@angular/core';
import { InstanceService } from '../../theme/services/instance-service';

@Component({
  selector: 'home',
  styleUrls: ['./home.scss'],
  templateUrl: './home.html'
})
export class Home {

  instances;

  constructor(private _instanceService: InstanceService) {
    _instanceService.getInstances().subscribe((res) => {
      this.instances = res;
    });
  }

}
