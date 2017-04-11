import { Stagekinect2Page } from './app.po';

describe('stagekinect2 App', () => {
  let page: Stagekinect2Page;

  beforeEach(() => {
    page = new Stagekinect2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
