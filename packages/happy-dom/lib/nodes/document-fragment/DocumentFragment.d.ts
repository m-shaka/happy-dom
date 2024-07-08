import Node from '../node/Node.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import Element from '../element/Element.js';
import HTMLCollection from '../element/HTMLCollection.js';
import NodeList from '../node/NodeList.js';
import NodeTypeEnum from '../node/NodeTypeEnum.js';
import IHTMLElementTagNameMap from '../../config/IHTMLElementTagNameMap.js';
import ISVGElementTagNameMap from '../../config/ISVGElementTagNameMap.js';
/**
 * DocumentFragment.
 */
export default class DocumentFragment extends Node {
    readonly [PropertySymbol.children]: HTMLCollection<Element>;
    [PropertySymbol.rootNode]: Node;
    [PropertySymbol.nodeType]: NodeTypeEnum;
    cloneNode: (deep?: boolean) => DocumentFragment;
    /**
     * Returns the document fragment children.
     */
    get children(): HTMLCollection<Element>;
    /**
     * Last element child.
     *
     * @returns Element.
     */
    get childElementCount(): number;
    /**
     * First element child.
     *
     * @returns Element.
     */
    get firstElementChild(): Element;
    /**
     * Last element child.
     *
     * @returns Element.
     */
    get lastElementChild(): Element;
    /**
     * Get text value of children.
     *
     * @returns Text content.
     */
    get textContent(): string;
    /**
     * Sets text content.
     *
     * @param textContent Text content.
     */
    set textContent(textContent: string);
    /**
     * Inserts a set of Node objects or DOMString objects after the last child of the ParentNode. DOMString objects are inserted as equivalent Text nodes.
     *
     * @param nodes List of Node or DOMString.
     */
    append(...nodes: (Node | string)[]): void;
    /**
     * Inserts a set of Node objects or DOMString objects before the first child of the ParentNode. DOMString objects are inserted as equivalent Text nodes.
     *
     * @param nodes List of Node or DOMString.
     */
    prepend(...nodes: (Node | string)[]): void;
    /**
     * Replaces the existing children of a node with a specified new set of children.
     *
     * @param nodes List of Node or DOMString.
     */
    replaceChildren(...nodes: (Node | string)[]): void;
    /**
     * Query CSS selector to find matching nodes.
     *
     * @param selector CSS selector.
     * @returns Matching elements.
     */
    querySelectorAll<K extends keyof IHTMLElementTagNameMap>(selector: K): NodeList<IHTMLElementTagNameMap[K]>;
    /**
     * Query CSS selector to find matching elments.
     *
     * @param selector CSS selector.
     * @returns Matching elements.
     */
    querySelectorAll<K extends keyof ISVGElementTagNameMap>(selector: K): NodeList<ISVGElementTagNameMap[K]>;
    /**
     * Query CSS selector to find matching elments.
     *
     * @param selector CSS selector.
     * @returns Matching elements.
     */
    querySelectorAll(selector: string): NodeList<Element>;
    /**
     * Query CSS Selector to find matching node.
     *
     * @param selector CSS selector.
     * @returns Matching element.
     */
    querySelector<K extends keyof IHTMLElementTagNameMap>(selector: K): IHTMLElementTagNameMap[K] | null;
    /**
     * Query CSS Selector to find a matching element.
     *
     * @param selector CSS selector.
     * @returns Matching element.
     */
    querySelector<K extends keyof ISVGElementTagNameMap>(selector: K): ISVGElementTagNameMap[K] | null;
    /**
     * Query CSS Selector to find a matching element.
     *
     * @param selector CSS selector.
     * @returns Matching element.
     */
    querySelector(selector: string): Element | null;
    /**
     * Returns an element by ID.
     *
     * @param id ID.
     * @returns Matching element.
     */
    getElementById(id: string): Element;
    /**
     * @override
     */
    [PropertySymbol.cloneNode](deep?: boolean): DocumentFragment;
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
}
//# sourceMappingURL=DocumentFragment.d.ts.map