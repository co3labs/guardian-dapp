/**
 * @jest-environment ./node_modules/@keithers98/dappeteer-stable/dist/jest/DappeteerEnvironment.js
 */

import puppeteer from 'puppeteer';
import * as dappeteer from '@keithers98/dappeteer-stable';
import 'regenerator-runtime/runtime';

describe('Execute Standard Trades on Trade', () => {
  jest.setTimeout(300000);
  let page: puppeteer.Page;
  let browser: puppeteer.Browser;
  let metamask: dappeteer.Dappeteer;

});
