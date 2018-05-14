import { Component, OnInit, ElementRef, Input } from '@angular/core';
import * as editor from 'jsoneditor';

@Component({
  selector: 'json-editor',
  template: '<div></div>'
})

export class JsonEditorComponent implements OnInit {
  private editor: any;
  private optionsDiffer: any;
  private dataDiffer: any;

  @Input() options: JsonEditorOptions = new JsonEditorOptions();
  @Input() data: Object = {};

  constructor(private rootElement: ElementRef) { }

  ngOnInit() {
    this.editor = new editor(this.rootElement.nativeElement, this.options, this.data);
  }

  collapseAll() {
    this.editor.collapseAll();
  }

  expandAll() {
    this.editor.expandAll();
  }

  focus() {
    this.editor.focus();
  }

  get(): JSON {
    return this.editor.get();
  }

  getMode(): JsonEditorMode {
    return this.editor.getMode() as JsonEditorMode;
  }

  getName(): string {
    return this.editor.getName();
  }

  getText(): string {
    return this.editor.getText();
  }

  set(json: JSON) {
    this.editor.set(json);
  }

  setMode(mode: JsonEditorMode) {
    this.editor.setMode(mode);
  }

  setName(name: string) {
    this.editor.setName(name);
  }

  setSchema(schema: any) {
    this.editor.setSchema(schema);
  }

  destroy() {
    this.editor.destroy();
  }
}

export type JsonEditorMode = 'tree' | 'view' | 'form' | 'code' | 'text';

export interface JsonEditorTreeNode {
  field: String,
  value: String,
  path: String[]
}

export class JsonEditorOptions {
  ace: Object;
  ajv: Object;
  onChange: () => void;
  onEditable: (node: JsonEditorTreeNode | {}) => boolean | { field: boolean, value: boolean };
  onError: (error: any) => void;
  onModeChange: (newMode: JsonEditorMode, oldMode: JsonEditorMode) => void;
  escapeUnicode: boolean;
  sortObjectKeys: boolean;
  history: boolean;
  mode: JsonEditorMode;
  modes: JsonEditorMode[];
  name: String;
  schema: Object;
  search: boolean;
  indentation: Number;
  theme: Number;

  constructor() {
    this.escapeUnicode = false;
    this.sortObjectKeys = false;
    this.history = true;
    this.mode = 'tree';
    this.search = true;
    this.indentation = 2;
  }

}