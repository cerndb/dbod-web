import { DbodPage } from './app.po';

describe('dbod App', () => {
  let page: DbodPage;

  beforeEach(() => {
    page = new DbodPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
