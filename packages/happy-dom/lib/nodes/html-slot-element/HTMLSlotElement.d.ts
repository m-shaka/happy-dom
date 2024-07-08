import HTMLElement from '../html-element/HTMLElement.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import Text from '../text/Text.js';
import Element from '../element/Element.js';
import Node from '../node/Node.js';
import Event from '../../event/Event.js';
/**
 * HTML Slot Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement.
 */
export default class HTMLSlotElement extends HTMLElement {
    cloneNode: (deep?: boolean) => HTMLSlotElement;
    onslotchange: (event: Event) => void | null;
    /**
     * Returns name.
     *
     * @returns Name.
     */
    get name(): string;
    /**
     * Sets name.
     *
     * @param name Name.
     */
    set name(name: string);
    /**
     * Sets the slot's manually assigned nodes to an ordered set of slottables.
     *
     * @param _nodes Nodes.
     */
    assign(..._nodes: Array<Text | Element>): void;
    /**
     * Returns assigned nodes.
     *
     * @param [options] Options.
     * @param [options.flatten] A boolean value indicating whether to return the assigned nodes of any available child <slot> elements (true) or not (false). Defaults to false.
     * @returns Nodes.
     */
    assignedNodes(options?: {
        flatten?: boolean;
    }): Node[];
    /**
     * Returns assigned elements.
     *
     * @param [_options] Options.
     * @param [_options.flatten] A boolean value indicating whether to return the assigned elements of any available child <slot> elements (true) or not (false). Defaults to false.
     * @returns Nodes.
     */
    assignedElements(_options?: {
        flatten?: boolean;
    }): Element[];
    /**
     * @override
     */
    [PropertySymbol.cloneNode](deep?: boolean): HTMLSlotElement;
}
//# sourceMappingURL=HTMLSlotElement.d.ts.map