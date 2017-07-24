import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { HelpComponent } from './help.component';
import { routing } from './help.routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    AppTranslationModule,
    NgaModule,
  ],
  declarations: [
    HelpComponent
  ]
})
export class HelpModule {}