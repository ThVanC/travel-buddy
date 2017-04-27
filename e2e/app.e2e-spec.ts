import { TravelBuddyAppPage } from './app.po';

describe('travel-buddy-app App', () => {
  let page: TravelBuddyAppPage;

  beforeEach(() => {
    page = new TravelBuddyAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
