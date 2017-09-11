import { MetadataEditorModule } from './../../components/metadata-editor/metadata-editor.module';
import { FileEditorComponent } from './../../components/file-editor/file-editor.component';
import { JobsModule } from './../home/jobs/jobs.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { InstanceComponent } from './instance.component';
import { InstanceService } from '../../services/instance';
import { AppTranslationModule } from '../../app.translation.module';
import { RouterModule } from '@angular/router';
import { routing } from './instance.routing';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JWBootstrapSwitchModule } from 'jw-bootstrap-switch-ng2';
import { InstanceJobsComponent } from './instance-jobs/instance-jobs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    InlineEditorModule,
    NgbModule.forRoot(),
    JWBootstrapSwitchModule,
    JobsModule,
    MetadataEditorModule,
  ],
  declarations: [
    InstanceComponent,
    FileEditorComponent,
    InstanceJobsComponent,
  ],
  providers: [
    InstanceService,
  ]
})
export class InstanceModule {}