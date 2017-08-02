import { JobsComponent } from './../home/jobs/jobs.component';
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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    InlineEditorModule,
    NgbModule.forRoot(),
    JWBootstrapSwitchModule,
  ],
  declarations: [
    InstanceComponent,
  ],
  providers: [
    InstanceService,
  ]
})
export class InstanceModule {}