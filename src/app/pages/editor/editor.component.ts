import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from '../../components/jsoneditor/jsoneditor.component';
import { InstanceService } from '../../services/instance';

@Component({
  selector: 'editor',
  templateUrl: 'editor.html',
  styles:  ['div.jsoneditor { background-color: white; }'],
  encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit {

  editorOptions: JsonEditorOptions;
  data: any;

  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

  constructor(private _instanceService: InstanceService) {
    this.editorOptions = new JsonEditorOptions()
  }

  ngOnInit() {
    
    this._instanceService.getInstances().subscribe((res) => {
       this.data = res[0];
    });
      
    this.editorOptions.modes = ['code', 'tree']; // set all allowed modes
    
  }
}