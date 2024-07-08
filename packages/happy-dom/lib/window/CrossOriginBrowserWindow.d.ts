import EventTarget from '../event/EventTarget.js';
import BrowserWindow from './BrowserWindow.js';
import Location from '../location/Location.js';
/**
 * Browser window with limited access due to CORS restrictions in iframes.
 */
export default class CrossOriginBrowserWindow extends EventTarget implements CrossOriginBrowserWindow {
    #private;
    readonly self: this;
    readonly window: this;
    readonly parent: BrowserWindow | CrossOriginBrowserWindow;
    readonly top: BrowserWindow | CrossOriginBrowserWindow;
    readonly location: Location;
    /**
     * Constructor.
     *
     * @param target Target window.
     * @param [parent] Parent window.
     */
    constructor(target: BrowserWindow, parent?: BrowserWindow);
    /**
     * Returns the opener.
     *
     * @returns Opener.
     */
    get opener(): BrowserWindow | CrossOriginBrowserWindow | null;
    /**
     * Returns the closed state.
     *
     * @returns Closed state.
     */
    get closed(): boolean;
    /**
     * Shifts focus away from the window.
     */
    blur(): void;
    /**
     * Gives focus to the window.
     */
    focus(): void;
    /**
     * Closes the window.
     */
    close(): void;
    /**
     * Safely enables cross-origin communication between Window objects; e.g., between a page and a pop-up that it spawned, or between a page and an iframe embedded within it.
     *
     * @param message Message.
     * @param [targetOrigin=*] Target origin.
     * @param transfer Transfer. Not implemented.
     */
    postMessage(message: unknown, targetOrigin?: string, transfer?: unknown[]): void;
}
//# sourceMappingURL=CrossOriginBrowserWindow.d.ts.map