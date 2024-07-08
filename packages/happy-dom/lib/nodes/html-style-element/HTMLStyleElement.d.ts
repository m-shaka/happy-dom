import CSSStyleSheet from '../../css/CSSStyleSheet.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import HTMLElement from '../html-element/HTMLElement.js';
import Node from '../node/Node.js';
/**
 * HTML Style Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLStyleElement.
 */
export default class HTMLStyleElement extends HTMLElement {
    private [PropertySymbol.sheet];
    [PropertySymbol.styleNode]: this;
    /**
     * Returns CSS style sheet.
     *
     * @returns CSS style sheet.
     */
    get sheet(): CSSStyleSheet;
    /**
     * Returns media.
     *
     * @returns Media.
     */
    get media(): string;
    /**
     * Sets media.
     *
     * @param media Media.
     */
    set media(media: string);
    /**
     * Returns type.
     *
     * @returns Type.
     */
    get type(): string;
    /**
     * Sets type.
     *
     * @param type Type.
     */
    set type(type: string);
    /**
     * Returns disabled.
     *
     * @returns Disabled.
     */
    get disabled(): boolean;
    /**
     * Sets disabled.
     *
     * @param disabled Disabled.
     */
    set disabled(disabled: boolean);
    /**
     * @override
     */
    [PropertySymbol.appendChild](node: Node): Node;
    /**
     * @override
     */
    [PropertySymbol.removeChild](node: Node): Node;
    /**
     * @override
     */
    [PropertySymbol.insertBefore](newNode: Node, referenceNode: Node | null): Node;
    /**
     * @override
     */
    [PropertySymbol.connectToNode](parentNode?: Node): void;
    /**
     * Updates the CSSStyleSheet with the text content.
     */
    [PropertySymbol.updateSheet](): void;
}
//# sourceMappingURL=HTMLStyleElement.d.ts.map