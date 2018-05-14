import { ThemeModule } from './../../../@theme/theme.module';
import { JobsComponent } from './jobs.component';
import { JobService } from './../../../services/job/job.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports:      [CommonModule, Ng2SmartTableModule, ThemeModule],
  declarations: [JobsComponent],
  bootstrap:    [ ],
  providers:    [JobService],
  exports:      [JobsComponent, Ng2SmartTableModule],

})
export class JobsModule { }
