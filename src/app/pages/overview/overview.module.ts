import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { OverviewComponent } from './overview.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [
    OverviewComponent,
  ],
  providers: [
  ],
  entryComponents: [
  ],
})
export class OverviewModule {}
