import { SwapiPage } from './app.po';

describe('swapi App', () => {
  let page: SwapiPage;

  beforeEach(() => {
    page = new SwapiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
