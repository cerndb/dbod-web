import {Component, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'metadata-editor',
  templateUrl: './metadata-editor.component.html',
  styleUrls: ['./metadata-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MetadataEditorComponent {
  public editorOptions: JsonEditorOptions;
  @Input() data: any;

  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

  constructor() {
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code', 'tree']; // set all allowed modes
  }

}
