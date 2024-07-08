var _a, _b, _c, _d, _e, _f;
import * as PropertySymbol from '../../PropertySymbol.js';
import AsyncTaskManager from '../../async-task-manager/AsyncTaskManager.js';
import BrowserFrameURL from '../utilities/BrowserFrameURL.js';
import BrowserFrameScriptEvaluator from '../utilities/BrowserFrameScriptEvaluator.js';
import BrowserFrameNavigator from '../utilities/BrowserFrameNavigator.js';
import BrowserErrorCaptureEnum from '../enums/BrowserErrorCaptureEnum.js';
import BrowserFrameExceptionObserver from '../utilities/BrowserFrameExceptionObserver.js';
/**
 * Browser frame used when constructing a Window instance without a browser.
 */
class DetachedBrowserFrame {
    /**
     * Constructor.
     *
     * @param page Page.
     * @param [window] Window.
     */
    constructor(page) {
        this.childFrames = [];
        this.parentFrame = null;
        this[_a] = new AsyncTaskManager();
        this[_b] = null;
        this[_c] = { navigation: [] };
        this[_d] = null;
        this[_e] = null;
        this[_f] = false;
        this.page = page;
        if (page.context.browser.contexts[0]?.pages[0]?.mainFrame) {
            this.window = new this.page.context.browser.windowClass(this);
        }
        // Attach process level error capturing.
        if (page.context.browser.settings.errorCapture === BrowserErrorCaptureEnum.processLevel) {
            this[PropertySymbol.exceptionObserver] = new BrowserFrameExceptionObserver();
            this[PropertySymbol.exceptionObserver].observe(this);
        }
    }
    /**
     * Returns the content.
     *
     * @returns Content.
     */
    get content() {
        if (!this.window) {
            throw new Error('The frame has been destroyed, the "window" property is not set.');
        }
        return this.window.document.documentElement.outerHTML;
    }
    /**
     * Sets the content.
     *
     * @param content Content.
     */
    set content(content) {
        if (!this.window) {
            throw new Error('The frame has been destroyed, the "window" property is not set.');
        }
        this.window.document[PropertySymbol.isFirstWrite] = true;
        this.window.document[PropertySymbol.isFirstWriteAfterOpen] = false;
        this.window.document.open();
        this.window.document.write(content);
    }
    /**
     * Returns the URL.
     *
     * @returns URL.
     */
    get url() {
        if (!this.window) {
            throw new Error('The frame has been destroyed, the "window" property is not set.');
        }
        return this.window.location.href;
    }
    /**
     * Sets the content.
     *
     * @param url URL.
     */
    set url(url) {
        if (!this.window) {
            throw new Error('The frame has been destroyed, the "window" property is not set.');
        }
        this.window.location[PropertySymbol.setURL](this, BrowserFrameURL.getRelativeURL(this, url).href);
    }
    /**
     * Returns document.
     *
     * @returns Document.
     */
    get document() {
        return this.window?.document ?? null;
    }
    /**
     * Returns a promise that is resolved when all resources has been loaded, fetch has completed, and all async tasks such as timers are complete.
     */
    async waitUntilComplete() {
        await Promise.all([
            this[PropertySymbol.asyncTaskManager].waitUntilComplete(),
            ...this.childFrames.map((frame) => frame.waitUntilComplete())
        ]);
    }
    /**
     * Returns a promise that is resolved when the frame has navigated and the response HTML has been written to the document.
     */
    waitForNavigation() {
        return new Promise((resolve) => this[PropertySymbol.listeners].navigation.push(resolve));
    }
    /**
     * Aborts all ongoing operations.
     */
    abort() {
        if (!this.childFrames.length) {
            return this[PropertySymbol.asyncTaskManager].abort();
        }
        return new Promise((resolve, reject) => {
            // Using Promise instead of async/await to prevent microtask
            Promise.all(this.childFrames
                .map((frame) => frame.abort())
                .concat([this[PropertySymbol.asyncTaskManager].abort()]))
                .then(() => resolve())
                .catch(reject);
        });
    }
    /**
     * Evaluates code or a VM Script in the page's context.
     *
     * @param script Script.
     * @returns Result.
     */
    evaluate(script) {
        return BrowserFrameScriptEvaluator.evaluate(this, script);
    }
    /**
     * Go to a page.
     *
     * @param url URL.
     * @param [options] Options.
     * @returns Response.
     */
    goto(url, options) {
        return BrowserFrameNavigator.navigate({
            windowClass: this.page.context.browser.windowClass,
            frame: this,
            url: url,
            goToOptions: options
        });
    }
    /**
     * Reloads the current frame.
     *
     * @param [options] Options.
     * @returns Response.
     */
    reload(options) {
        return BrowserFrameNavigator.navigate({
            windowClass: this.page.context.browser.windowClass,
            frame: this,
            url: this.url,
            goToOptions: options
        });
    }
}
_a = PropertySymbol.asyncTaskManager, _b = PropertySymbol.exceptionObserver, _c = PropertySymbol.listeners, _d = PropertySymbol.openerFrame, _e = PropertySymbol.openerWindow, _f = PropertySymbol.popup;
export default DetachedBrowserFrame;
//# sourceMappingURL=DetachedBrowserFrame.js.map