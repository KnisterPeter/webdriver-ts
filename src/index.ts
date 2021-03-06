import 'isomorphic-fetch';
import { Get, Post, Delete } from 'pretend';

export interface ICapabilities {
  browserName: string;
  browserVersion?: string;
  platformName?: string;
  platformVersion?: string;
  acceptSslCerts?: boolean;
  applicationCacheEnabled?: boolean;
  rotatable?: boolean;
  handlesAlerts?: boolean;
  databaseEnabled?: boolean;
  nativeEvents?: boolean;
  webStorageEnabled?: boolean;
  locationContextEnabled?: boolean;
  takesScreenshot?: boolean;
  javascriptEnabled?: boolean;
  cssSelectorsEnabled?: boolean;
  [property: string]: string | boolean;
}

export interface IElement {
  ELEMENT: string;
}

export interface IResponse {
  status: number;
  state: 'success' | 'unhandled error';
  sessionId: string;
}

export interface IValueResponse<T> extends IResponse {
  value: T;
}

export interface ISessionRequest {
  desiredCapabilities?: ICapabilities;
}

export interface IGetRequest {
  url: string;
}

export interface IFindElementRequest {
  using: string;
  value: string;
}

export interface IFindElementsRequest {
  using: string;
  value: string;
}

export interface IElementSendKeysRequest {
  value: string[];
}

export interface IGetWindowSizeRequest {
  windowHandle: string;
}

export interface ISetWindowSizeRequest {
  windowHandle: string;
  width: number;
  height: number;
}

export interface ISetTimeoutRequest {
  type: string;
  ms: number;
}

export type ScriptArgument = boolean | number | string | IElement;

export interface IExecuteScriptRequest {
  script: string;
  args: ScriptArgument[];
}

export class SeleniumApi {

  @Post('/session')
  public async newSession(body: ISessionRequest): Promise<IResponse> { return; }

  @Delete('/session/{sessionId}')
  public async deleteSession(sessionId: string): Promise<IResponse> { return; }

  @Post('/session/{sessionId}/timeouts')
  public async setTimeout(sessionId: string, body: ISetTimeoutRequest): Promise<IResponse> { return; }

  @Post('/session/{sessionId}/url')
  public async get(sessionId: string, body: IGetRequest): Promise<IResponse> { return; }

  @Get('/session/{sessionId}/url')
  public async getCurrentUrl(sessionId: string): Promise<IValueResponse<string>> { return; }

  // TODO
  // @Post('/session/{sessionId}/back')
  // public async back(sessionId: string): Promise<any> { return; }

  // TODO
  // @Post('/session/{sessionId}/forward')
  // public async forward(sessionId: string): Promise<any> { return; }

  @Post('/session/{sessionId}/refresh')
  public async refresh(sessionId: string): Promise<IResponse> { return; }

  @Get('/session/{sessionId}/title')
  public async getTitle(sessionId: string): Promise<IValueResponse<string>> { return; }

  // TODO
  // @Get('/session/{sessionId}/window')
  // public async getWindowHandle(sessionId: string): Promise<any> { return; }

  // TODO
  // @Delete('/session/{sessionId}/window')
  // public async closeWindow(sessionId: string): Promise<any> { return; }

  // TODO
  // @Post('/session/{sessionId}/window')
  // public async switchToWindow(sessionId: string): Promise<any> { return; }

  // TODO
  // @Get('/session/{sessionId}/window/handles')
  // public async getWindowHandles(sessionId: string): Promise<any> { return; }

  // TODO
  // @Post('/session/{sessionId}/frame')
  // public async switchToFrame(sessionId: string): Promise<any> { return; }

  // TODO
  // @Post('/session/{sessionId}/frame/parent')
  // public async switchToParentFrame(sessionId: string): Promise<any> { return; }

  // Selenium API
  @Get('/session/{sessionId}/window/current/size')
  // Webdriver API
  // @Get('/session/{sessionId}/window/size')
  public async getWindowSize(sessionId: string, body: IGetWindowSizeRequest): Promise<IValueResponse<{width: number, height: number}>> { return; }

  // Selenium API
  @Post('/session/{sessionId}/window/current/size')
  // Webdriver API
  // @Post('/session/{sessionId}/window/size')
  public async setWindowSize(sessionId: string, body: ISetWindowSizeRequest): Promise<IResponse> { return; }

  // TODO
  // @Post('/session/{sessionId}/window/maximize')
  // public async maximizeWindow(sessionId: string): Promise<any> { return; }

  // TODO
  // @Post('/session/{sessionId}/window/fullscreen')
  // public async fullscreenWindow(sessionId: string): Promise<any> { return; }

  // TODO
  // @Get('/session/{sessionId}/element/active')
  // public async getActiveElement(sessionId: string): Promise<any> { return; }

  @Post('/session/{sessionId}/element')
  public async findElement(sessionId: string, body: IFindElementRequest): Promise<IValueResponse<IElement>> { return; }

  // TODO
  // @Post('/session/{sessionId}/element/{elementId}/element')
  // public async findElementFromElement(sessionId: string, elementId: string): Promise<any> { return; }

  @Post('/session/{sessionId}/elements')
  public async findElements(sessionId: string, body: IFindElementsRequest): Promise<IValueResponse<IElement[]>> { return; }

  // TODO
  // @Post('/session/{sessionId}/element/{elementId}/elements')
  // public async findElementsFromElement(sessionId: string, elementId: string): Promise<any> { return; }

  // TODO
  // @Get('/session/{sessionId}/element/{elementId}/selected')
  // public async isElementSelected(sessionId: string, elementId: string): Promise<any> { return; }

  @Get('/session/{sessionId}/element/{elementId}/attribute/{name}')
  public async getElementAttribute(sessionId: string, elementId: string, name: string): Promise<IValueResponse<string>> { return; }

  // Webdriver API
  // @Get('/session/{sessionId}/element/{elementId}/property/{name}')
  // public async getElementProperty(sessionId: string, elementId: string, name: string): Promise<any> { return; }

  // TODO
  // @Get('/session/{sessionId}/element/{elementId}/css/{propertyName}')
  // public async getElementCssValue(sessionId: string, elementId: string, propertyName: string): Promise<any> { return; }

  // TODO
  // @Get('/session/{sessionId}/element/{elementId}/text')
  // public async getElementText(sessionId: string, elementId: string): Promise<any> { return; }

  // TODO
  // @Get('/session/{sessionId}/element/{elementId}/name')
  // public async getElementTagName(sessionId: string, elementId: string): Promise<any> { return; }

  // TODO
  // @Get('/session/{sessionId}/element/{elementId}/rect')
  // public async getElementRect(sessionId: string, elementId: string): Promise<any> { return; }

  // TODO
  // @Get('/session/{sessionId}/element/{elementId}/enabled')
  // public async isElementEnabled(sessionId: string, elementId: string): Promise<any> { return; }

  @Post('/session/{sessionId}/element/{elementId}/click')
  public async elementClick(sessionId: string, elementId: string): Promise<IResponse> { return; }

  // TODO
  // @Post('/session/{sessionId}/element/{elementId}/clear')
  // public async elementClear(sessionId: string, elementId: string): Promise<any> { return; }

  // Selenium API
  @Post('/session/{sessionId}/element/{elementId}/value')
  // Webdriver API
  // @Post('/session/{sessionId}/element/{elementId}/sendKeys')
  public async elementSendKeys(sessionId: string, elementId: string, body: IElementSendKeysRequest): Promise<IResponse> { return; }

  // TODO
  // @Get('/session/{sessionId}/source')
  // public async getPageSource(sessionId: string): Promise<any> { return; }

  // Selenium API
  @Post('/session/{sessionId}/execute')
  // Webdriver API
  // @Post('/session/{sessionId}/execute/sync')
  public async executeScript<T>(sessionId: string, body: IExecuteScriptRequest): Promise<IValueResponse<T>> { return; }

  // TODO
  // @Post('/session/{sessionId}/execute/async')
  // public async executeAsyncScript(sessionId: string): Promise<any> { return; }

  // TODO
  // @Get('/session/{sessionId}/cookie/{name}')
  // public async getCookie(sessionId: string, name: string): Promise<any> { return; }

  // TODO
  // @Post('/session/{sessionId}/cookie')
  // public async addCookie(sessionId: string): Promise<any> { return; }

  // TODO
  // @Delete('/session/{sessionId}/cookie/{name}')
  // public async deleteCookie(sessionId: string, name: string): Promise<any> { return; }

  // TODO
  // @Delete('/session/{sessionId}/cookie')
  // public async deleteAllCookies(sessionId: string): Promise<any> { return; }

}
