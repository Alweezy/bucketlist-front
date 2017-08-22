import { BucketListPage } from './app.po';

describe('bucketlist-front App', () => {
  let page: BucketListPage;

  beforeEach(() => {
    page = new BucketListPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
