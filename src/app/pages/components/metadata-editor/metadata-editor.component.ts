import { Component, OnInit, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from '../../components/jsoneditor/jsoneditor.component';

@Component({
  selector: 'metadata-editor',
  templateUrl: 'metadata-editor.html',
  styles:  ['div.jsoneditor { background-color: white; }'],
  encapsulation: ViewEncapsulation.None,
})
export class MetadataEditorComponent implements OnInit {

  editorOptions: JsonEditorOptions;
  @Input() data: any;

  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

  constructor() {
    this.editorOptions = new JsonEditorOptions();
  }

  ngOnInit() {
    this.editorOptions.modes = ['code', 'tree']; // set all allowed modes
  }

}