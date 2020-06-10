import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.id('titleId')).getText() as Promise<string>;
  }

  getShowChartsBttn() {
    return element(by.id('showChartBtnId'));
  }

  getTopIncomeChart() {
    return element(by.id('topIncomeMonthlyChart'));
  }

}
