import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    //NOTE: Peebu is a angular model variable. By this E2E test we ensure the correct binding withouth knowing the implementation! 
    expect(page.getTitleText()).toEqual('Welcome to PeeBu');
  });

  it('should display charts', () => {
    page.navigateTo();

    //ToDo
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
