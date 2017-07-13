import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { InstanceComponent } from './instance.component';
import { InstanceService } from '../../services/instance';
import { AppTranslationModule } from '../../app.translation.module';
import { RouterModule } from '@angular/router';
import { routing } from './instance.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    InstanceComponent,
  ],
  providers: [
    InstanceService,
  ]
})
export class InstanceModule {}