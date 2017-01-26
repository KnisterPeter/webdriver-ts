import { assert } from 'chai';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { Pretend } from 'pretend';

import { SeleniumApi, ICapabilities, IResponse, IElement } from '../src/index';

const envFile = join(__dirname, '..', '..', '.env.json');
const env = existsSync(envFile) ? JSON.parse(readFileSync(envFile).toString()) : {};
Object.keys(env)
  .filter((key) => !process.env[key])
  .forEach((key) => process.env[key] = env[key]);

const localConfig = (): [string, ICapabilities] => [
  'http://localhost:4444/wd/hub',
  {
    browserName: process.env.BROWSER || 'firefox'
  }
];

const browserStackConfig = (): [string, ICapabilities] => [
  'https://hub.browserstack.com/wd/hub',
  {
    browserName : process.env.BROWSER || 'firefox',
    'browserstack.user': process.env.BROWSERSTACK_USERNAME,
    'browserstack.key' : process.env.BROWSERSTACK_KEY
  }
];

const saucueLabsConfig = (): [string, ICapabilities] => [
  'http://ondemand.saucelabs.com/wd/hub',
  {
    browserName : process.env.BROWSER || 'firefox'
  }
];

function buildClient(url: string): SeleniumApi {
  let builder = Pretend.builder();
  if (process.env.SELENIUM === 'saucelabs') {
    builder = builder
      .basicAuthentication(process.env.SAUCE_USERNAME, process.env.SAUCE_ACCESS_KEY);
  }
  return builder.target(SeleniumApi, url);
}

describe('SeleniumApi', () => {
  let config: [string, ICapabilities];

  before(() => {
    if (process.env.SELENIUM === 'browserstack') {
      config = browserStackConfig();
    } else if (process.env.SELENIUM === 'saucelabs') {
      config = saucueLabsConfig();
    } else {
      config = localConfig();
    }
  });

  it('should create and delete a new session', async () => {
    const api = buildClient(config[0]);
    const session = await api.newSession({
      desiredCapabilities: config[1]
    });

    try {
      assert.isString(session.sessionId);
    } finally {
      const response = await api.deleteSession(session.sessionId);
      assert.equal(response.status, 0);
    }
  });

  describe('within a session', () => {
    let api: SeleniumApi;
    let session: IResponse;

    beforeEach(async () => {
      api = buildClient(config[0]);
      session = await api.newSession({
        desiredCapabilities: config[1]
      });
    });

    afterEach(async () => {
      const response = await api.deleteSession(session.sessionId);
      assert.equal(response.status, 0);
    });

    it('should define the page load timeout', async () => {
      const response = await api.setTimeout(session.sessionId, {type: 'page load', ms: 3000});

      assert.equal(response.status, 0);
    });

    it('should return the window size', async () => {
      const response = await api.getWindowSize(session.sessionId, {windowHandle: 'current'});

      assert.equal(response.status, 0);
      assert.isAbove(response.value.width, 0);
      assert.isAbove(response.value.height, 0);
    });

    it('should resize the window', async () => {
      const response = await api.setWindowSize(session.sessionId,
        {windowHandle: 'current', width: 800, height: 600});

      assert.equal(response.status, 0);
    });

    it('should execute a synchronous script in the page', async () => {
      const response = await api.executeScript<number>(session.sessionId,
        {script: 'return (function(a) { return a; }).apply(null, arguments);', args: [1]});

      assert.equal(response.status, 0);
      assert.equal(response.value, 1);
    });

    it('should load a page', async () => {
      const response = await api.get(session.sessionId, {url: 'https://www.google.com'});

      assert.equal(response.status, 0);
    });

    describe('when loading google', () => {
      beforeEach(async () => {
        await api.get(session.sessionId, {url: 'https://www.google.com'});
      });

      it('should return the current page url', async () => {
        const response = await api.getCurrentUrl(session.sessionId);

        assert.equal(response.status, 0);
        assert.isTrue(response.value.startsWith('https://www.google'));
      });

      it('should return the current page title', async () => {
        const response = await api.getTitle(session.sessionId);

        assert.equal(response.status, 0);
        assert.equal(response.value, 'Google');
      });

      it('should reload the page', async () => {
        const response = await api.refresh(session.sessionId);

        assert.equal(response.status, 0);
      });

      it('should return an element on the page', async () => {
        const response = await api.findElement(session.sessionId,
          {using: 'css selector', value: '[name=q]'});

        assert.equal(response.status, 0);
        assert.isDefined(response.value.ELEMENT);
      });

      it('should return an element list on the page', async () => {
        const response = await api.findElements(session.sessionId,
          {using: 'css selector', value: 'input'});

        assert.equal(response.status, 0);
        assert.isAbove(response.value.length, 1);
      });

      describe('and selecting an element', () => {
        let element: IElement;

        beforeEach(async () => {
          element = (await api.findElement(session.sessionId,
            {using: 'css selector', value: '[name=q]'})).value;
        });

        it('should send keys to that element', async () => {
          const response = await api.elementSendKeys(session.sessionId, element.ELEMENT,
            {value: ['a', 'b', 'c']});

          assert.equal(response.status, 0);
        });

        it('should return the elements value', async () => {
          await api.elementSendKeys(session.sessionId, element.ELEMENT,
            {value: ['a', 'b', 'c']});
          const response = await api.getElementAttribute(session.sessionId, element.ELEMENT, 'value');

          assert.equal(response.status, 0);
          assert.equal(response.value, 'abc');
        });

        it('should click an element', async () => {
          const button = (await api.findElement(session.sessionId,
            {using: 'css selector', value: '[name=btnK]'})).value;
          const response = await api.elementClick(session.sessionId, button.ELEMENT);

          assert.equal(response.status, 0);
        });
      });
    });
  });
});
