import { DbodWebPage } from './app.po';

describe('dbod-web App', function() {
  let page: DbodWebPage;

  beforeEach(() => {
    page = new DbodWebPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('dbod-web works!');
  });
});
