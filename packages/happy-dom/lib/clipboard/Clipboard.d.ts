import BrowserWindow from '../window/BrowserWindow.js';
import ClipboardItem from './ClipboardItem.js';
/**
 * Clipboard API.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/Clipboard.
 */
export default class Clipboard {
    #private;
    /**
     * Constructor.
     *
     * @param ownerWindow Owner window.
     */
    constructor(ownerWindow: BrowserWindow);
    /**
     * Returns data.
     *
     * @returns Data.
     */
    read(): Promise<ClipboardItem[]>;
    /**
     * Returns text.
     *
     * @returns Text.
     */
    readText(): Promise<string>;
    /**
     * Writes data.
     *
     * @param data Data.
     */
    write(data: ClipboardItem[]): Promise<void>;
    /**
     * Writes text.
     *
     * @param text Text.
     */
    writeText(text: string): Promise<void>;
}
//# sourceMappingURL=Clipboard.d.ts.map