import { DbNameComponent } from './../../components/db-name/db-name.component';
import { InstancesComponent } from './instances.component';
import { StateButtonComponent } from './../../components/state-button/state-button.component';
import { ThemeModule } from './../../../@theme/theme.module';
import { JobService } from './../../../services/job/job.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports:      [CommonModule, Ng2SmartTableModule, ThemeModule],
  declarations: [InstancesComponent],
  bootstrap:    [ ],
  providers:    [JobService],
  exports:      [InstancesComponent, Ng2SmartTableModule],
})
export class InstancesModule { }
