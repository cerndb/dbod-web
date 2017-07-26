import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { EditorComponent } from './editor.component';
import { routing } from './editor.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    AppTranslationModule,
    NgaModule,
  ],
  declarations: [
    EditorComponent
  ]
})
export class EditorModule {}