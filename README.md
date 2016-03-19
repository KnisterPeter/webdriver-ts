# webdriver-ts

[![GitHub license](https://img.shields.io/github/license/KnisterPeter/webdriver-ts.svg)]()
[![Travis](https://img.shields.io/travis/KnisterPeter/webdriver-ts.svg)](https://travis-ci.org/KnisterPeter/webdriver-ts)
[![David](https://img.shields.io/david/KnisterPeter/webdriver-ts.svg)](https://david-dm.org/KnisterPeter/webdriver-ts)
[![David](https://img.shields.io/david/dev/KnisterPeter/webdriver-ts.svg)](https://david-dm.org/KnisterPeter/webdriver-ts#info=devDependencies&view=table)
[![npm](https://img.shields.io/npm/v/webdriver-ts.svg)](https://www.npmjs.com/package/webdriver-ts)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A lowlevel selenium implementation in typescript.

## Features

* Use local selenium-server
* Use [SauceLabs](https://saucelabs.com)
* Use [BrowserStack](https://www.browserstack.com/)

# Usage

## Installation
Install as npm package:

```sh
npm install webdriver-ts --save
```

Install latest development version:

```sh
npm install webdriver-ts@next --save
```

## API

```js
import { Pretend } from 'pretend';
import { SeleniumApi } from 'webdriver-ts';

async function local() {
  const browser = Pretend.builder().target(SeleniumApi, 'http://localhost:4444/wd/hub');
  const session = await api.newSession({
    desiredCapabilities: {
      browserName: 'firefox'
    }
  });
  const response = await api.get(session.sessionId, {url: 'https://www.google.com'});
  await api.deleteSession(session.sessionId);
}

async function sauceLabs() {
  const browser = Pretend.builder()
    .basicAuthentication('username', 'access-key')
    .target(SeleniumApi, 'http://ondemand.saucelabs.com/wd/hub');
  const session = await api.newSession({
    desiredCapabilities: {
      'browserName': 'firefox'
    }
  });
  const response = await api.get(session.sessionId, {url: 'https://www.google.com'});
  await api.deleteSession(session.sessionId);
}

async function browserStack() {
  const browser = Pretend.builder().target(SeleniumApi, 'https://hub.browserstack.com/wd/hub');
  const session = await api.newSession({
    desiredCapabilities: {
      'browserName': 'firefox',
      'browserstack.user': 'xxx',
      'browserstack.key' : 'yyy'
    }
  });
  const response = await api.get(session.sessionId, {url: 'https://www.google.com'});
  await api.deleteSession(session.sessionId);
}
```

----------

Thanks to [SauceLabs](https://saucelabs.com) and [BrowserStack](https://www.browserstack.com/) for a free test account.
