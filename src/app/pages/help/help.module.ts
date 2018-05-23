import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { AppTranslationModule } from '../../app.translation.module';
import { ThemeModule } from '../../@theme/theme.module';
import { HelpComponent } from './help.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //AppTranslationModule,
    ThemeModule,
  ],
  declarations: [
    HelpComponent
  ]
})
export class HelpModule {}
