import { StateButtonComponent } from './../components/state-button/state-button.component';
import { DbNameComponent } from './../components/db-name/db-name.component';
import { JobsModule } from './home/jobs/jobs.module';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';
import { Pages } from './pages.component';
import { CernToolbarComponent } from '../components/cern-toolbar/cern-toolbar.component';

@NgModule({
  imports: [CommonModule, AppTranslationModule, NgaModule, routing, JobsModule],
  declarations: [Pages, CernToolbarComponent, DbNameComponent, StateButtonComponent],
  entryComponents: [DbNameComponent, StateButtonComponent]
})
export class PagesModule {
}