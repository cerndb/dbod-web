
import { FileEditorComponent } from './../components/file-editor/file-editor.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { InstanceComponent } from './instance.component';
import { InstanceService } from '../../services/instance';
//import { AppTranslationModule } from '../../app.translation.module';
import { RouterModule } from '@angular/router';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { JWBootstrapSwitchModule } from 'jw-bootstrap-switch-ng2';
import { UiSwitchModule } from 'ngx-toggle-switch';
import {NgJsonEditorModule} from "ang-jsoneditor";
import {MetadataEditorComponent} from "./metadata-editor/metadata-editor.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    InlineEditorModule,
    NgJsonEditorModule,
    //NgbModule.forRoot(),
    //JWBootstrapSwitchModule,
    UiSwitchModule,
  ],
  declarations: [
    InstanceComponent,
    FileEditorComponent,
    MetadataEditorComponent,
  ],
  providers: [
    InstanceService,
  ]
})
export class InstanceModule {}
