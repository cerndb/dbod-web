import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { OverviewComponent } from './overview.component';

@NgModule({
  imports: [ThemeModule],
  declarations: [OverviewComponent],
})
export class OverviewModule {}
