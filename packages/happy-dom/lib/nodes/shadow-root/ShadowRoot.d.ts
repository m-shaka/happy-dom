import DocumentFragment from '../document-fragment/DocumentFragment.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import Element from '../element/Element.js';
import CSSStyleSheet from '../../css/CSSStyleSheet.js';
import HTMLElement from '../../nodes/html-element/HTMLElement.js';
import Event from '../../event/Event.js';
import SVGElement from '../svg-element/SVGElement.js';
/**
 * ShadowRoot.
 */
export default class ShadowRoot extends DocumentFragment {
    cloneNode: (deep?: boolean) => ShadowRoot;
    onslotchange: (event: Event) => void | null;
    [PropertySymbol.adoptedStyleSheets]: CSSStyleSheet[];
    [PropertySymbol.mode]: string;
    [PropertySymbol.host]: Element | null;
    /**
     * Returns mode.
     *
     * @returns Mode.
     */
    get mode(): string;
    /**
     * Returns host.
     *
     * @returns Host.
     */
    get host(): Element;
    /**
     * Returns inner HTML.
     *
     * @returns HTML.
     */
    get innerHTML(): string;
    /**
     * Sets inner HTML.
     *
     * @param html HTML.
     */
    set innerHTML(html: string);
    /**
     * Returns adopted style sheets.
     *
     * @returns Adopted style sheets.
     */
    get adoptedStyleSheets(): CSSStyleSheet[];
    /**
     * Sets adopted style sheets.
     *
     * @param value Adopted style sheets.
     */
    set adoptedStyleSheets(value: CSSStyleSheet[]);
    /**
     * Returns active element.
     *
     * @returns Active element.
     */
    get activeElement(): HTMLElement | SVGElement | null;
    /**
     * Converts to string.
     *
     * @returns String.
     */
    toString(): string;
    /**
     * @override
     */
    [PropertySymbol.cloneNode](deep?: boolean): ShadowRoot;
}
//# sourceMappingURL=ShadowRoot.d.ts.map