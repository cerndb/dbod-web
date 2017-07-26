import { Component, OnInit } from '@angular/core';
import { InstanceService } from '../../services/instance';

@Component({
  selector: 'editor',
  templateUrl: 'editor.html',
})
export class EditorComponent implements OnInit {

  instanceMetadata: string = '';

  constructor(private _instanceService: InstanceService) {}

  ngOnInit() {
    this._instanceService.getInstances().subscribe((res) => {
       this.instanceMetadata = JSON.stringify(res[0], null, 2);
    });
  }
}