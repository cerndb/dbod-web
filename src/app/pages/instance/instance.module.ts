
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { InstanceService } from '../../services/instance';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { InstanceComponent } from './instance.component';
import { FileEditorComponent } from './../components/file-editor/file-editor.component';
import { MetadataEditorComponent } from './metadata-editor/metadata-editor.component';
import { InstanceRecoverComponent } from './instance-recover/instance-recover.component';
import { CalendarModule } from 'ap-angular2-fullcalendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    InlineEditorModule,
    NgJsonEditorModule,
    UiSwitchModule,
    CalendarModule,
  ],
  declarations: [
    InstanceComponent,
    FileEditorComponent,
    MetadataEditorComponent,
    InstanceRecoverComponent
  ],
  providers: [
    InstanceService,
  ]
})
export class InstanceModule {}
