import { Ng4JsonEditorModule } from '../../components/ng4-jsoneditor/ng4-jsoneditor.module';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { AppTranslationModule } from '../../app.translation.module';
//import { NgaModule } from '../../theme/nga.module';
import { MetadataEditorComponent } from './metadata-editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //AppTranslationModule,
    //NgaModule,
    Ng4JsonEditorModule,
  ],
  declarations: [
    MetadataEditorComponent,
  ],
exports: [Ng4JsonEditorModule, MetadataEditorComponent],
})
export class MetadataEditorModule {}