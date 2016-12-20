import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { DbodWebAppComponent } from '../app/dbod-web.component';

beforeEachProviders(() => [DbodWebAppComponent]);

describe('App: DbodWeb', () => {
  it('should create the app',
      inject([DbodWebAppComponent], (app: DbodWebAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'dbod-web works!\'',
      inject([DbodWebAppComponent], (app: DbodWebAppComponent) => {
    expect(app.title).toEqual('dbod-web works!');
  }));
});
