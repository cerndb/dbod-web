import { NgaModule } from '../../theme/nga.module';
import { ESComponent } from './ES.component';
import { ESService } from '../../services/ES/ES.service';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule }       from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports:      [CommonModule, Ng2SmartTableModule, NgaModule],
  declarations: [ESComponent],
  bootstrap:    [ ],
  providers:    [ESService],
  exports:      [ESComponent, Ng2SmartTableModule],

})
export class ESModule { }