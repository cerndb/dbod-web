import { NgModule } from '@angular/core';

import { TreeModule } from 'ng2-tree';
import { ToasterModule } from 'angular2-toaster';

import { ThemeModule } from '../../@theme/theme.module';
import { ComponentsRoutingModule, routedComponents } from './components-routing.module';
import { StateButtonComponent } from './state-button/state-button.component';
import { DbNameComponent } from './db-name/db-name.component';
import { MetadataEditorComponent } from './metadata-editor/metadata-editor.component';
import { FileEditorComponent } from './file-editor/file-editor.component';
import { JsonEditorComponent } from './jsoneditor/jsoneditor.component';
import { Ng4JsoneditorComponent } from './ng4-jsoneditor/ng4-jsoneditor.component';

@NgModule({
  imports: [
    ThemeModule,
    ComponentsRoutingModule,
    TreeModule,
    ToasterModule,
  ],
  declarations: [
    ...routedComponents,
    StateButtonComponent,
    DbNameComponent,
    MetadataEditorComponent,
    FileEditorComponent,
    JsonEditorComponent,
    Ng4JsoneditorComponent,
  ],
})
export class ComponentsModule { }
