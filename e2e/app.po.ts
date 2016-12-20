export class DbodWebPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('dbod-web-app h1')).getText();
  }
}
