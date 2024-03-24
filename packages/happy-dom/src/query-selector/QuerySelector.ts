import Element from '../nodes/element/Element.js';
import * as PropertySymbol from '../PropertySymbol.js';
import SelectorItem from './SelectorItem.js';
import NodeList from '../nodes/node/NodeList.js';
import NodeTypeEnum from '../nodes/node/NodeTypeEnum.js';
import SelectorCombinatorEnum from './SelectorCombinatorEnum.js';
import Document from '../nodes/document/Document.js';
import DocumentFragment from '../nodes/document-fragment/DocumentFragment.js';
import SelectorParser from './SelectorParser.js';
import ISelectorMatch from './ISelectorMatch.js';
import IHTMLElementTagNameMap from '../config/IHTMLElementTagNameMap.js';
import ISVGElementTagNameMap from '../config/ISVGElementTagNameMap.js';

type DocumentPositionAndElement = {
	documentPosition: string;
	element: Element;
};

/**
 * Invalid Selector RegExp.
 */
const INVALID_SELECTOR_REGEXP = /^[.#\[]?\d|[.#]$/;

/**
 * Utility for query selection in an HTML element.
 *
 * @class QuerySelector
 */
export default class QuerySelector {
	/**
	 * Finds elements based on a query selector.
	 *
	 * @param node Node to search in.
	 * @param selector Selector.
	 * @returns HTML elements.
	 */
	public static querySelectorAll<K extends keyof IHTMLElementTagNameMap>(
		node: Element | Document | DocumentFragment,
		selector: K
	): NodeList<IHTMLElementTagNameMap[K]>;

	/**
	 * Finds elements based on a query selector.
	 *
	 * @param node Node to search in.
	 * @param selector Selector.
	 * @returns HTML elements.
	 */
	public static querySelectorAll<K extends keyof ISVGElementTagNameMap>(
		node: Element | Document | DocumentFragment,
		selector: K
	): NodeList<ISVGElementTagNameMap[K]>;

	/**
	 * Finds elements based on a query selector.
	 *
	 * @param node Node to search in.
	 * @param selector Selector.
	 * @returns HTML elements.
	 */
	public static querySelectorAll(
		node: Element | Document | DocumentFragment,
		selector: string
	): NodeList<Element>;

	/**
	 * Finds elements based on a query selector.
	 *
	 * @param node Node to search in.
	 * @param selector Selector.
	 * @returns HTML elements.
	 */
	public static querySelectorAll(
		node: Element | Document | DocumentFragment,
		selector: string
	): NodeList<Element> {
		if (<string>selector === '') {
			throw new Error(
				`Failed to execute 'querySelectorAll' on '${node.constructor.name}': The provided selector is empty.`
			);
		}

		if (selector === null || selector === undefined) {
			return new NodeList<Element>();
		}

		if (INVALID_SELECTOR_REGEXP.test(selector)) {
			throw new Error(
				`Failed to execute 'querySelectorAll' on '${node.constructor.name}': '${selector}' is not a valid selector.`
			);
		}

		const groups = SelectorParser.getSelectorGroups(selector);
		let matches: DocumentPositionAndElement[] = [];

		for (const items of groups) {
			matches = matches.concat(
				node[PropertySymbol.nodeType] === NodeTypeEnum.elementNode
					? this.findAll(<Element>node, [<Element>node], items)
					: this.findAll(null, (<Element>node)[PropertySymbol.children], items)
			);
		}

		const nodeList = new NodeList<Element>();
		const matchesMap: { [position: string]: Element } = {};

		for (let i = 0, max = matches.length; i < max; i++) {
			matchesMap[matches[i].documentPosition] = matches[i].element;
		}

		const keys = Object.keys(matchesMap).sort();
		for (let i = 0, max = keys.length; i < max; i++) {
			nodeList.push(matchesMap[keys[i]]);
		}

		return nodeList;
	}

	/**
	 * Finds an element based on a query selector.
	 *
	 * @param node Node to search in.
	 * @param selector Selector.
	 * @returns HTML element.
	 */
	public static querySelector<K extends keyof IHTMLElementTagNameMap>(
		node: Element | Document | DocumentFragment,
		selector: K
	): IHTMLElementTagNameMap[K] | null;

	/**
	 * Finds an element based on a query selector.
	 *
	 * @param node Node to search in.
	 * @param selector Selector.
	 * @returns HTML element.
	 */
	public static querySelector<K extends keyof ISVGElementTagNameMap>(
		node: Element | Document | DocumentFragment,
		selector: K
	): ISVGElementTagNameMap[K] | null;

	/**
	 * Finds an element based on a query selector.
	 *
	 * @param node Node to search in.
	 * @param selector Selector.
	 * @returns HTML element.
	 */
	public static querySelector(
		node: Element | Document | DocumentFragment,
		selector: string
	): Element | null;

	/**
	 * Finds an element based on a query selector.
	 *
	 * @param node Node to search in.
	 * @param selector Selector.
	 * @returns HTML element.
	 */
	public static querySelector(
		node: Element | Document | DocumentFragment,
		selector: string
	): Element | null {
		if (selector === '') {
			throw new Error(
				`Failed to execute 'querySelector' on '${node.constructor.name}': The provided selector is empty.`
			);
		}

		if (selector === null || selector === undefined) {
			return null;
		}

		if (INVALID_SELECTOR_REGEXP.test(selector)) {
			throw new Error(
				`Failed to execute 'querySelector' on '${node.constructor.name}': '${selector}' is not a valid selector.`
			);
		}

		for (const items of SelectorParser.getSelectorGroups(selector)) {
			const match =
				node[PropertySymbol.nodeType] === NodeTypeEnum.elementNode
					? this.findFirst(<Element>node, [<Element>node], items)
					: this.findFirst(null, (<Element>node)[PropertySymbol.children], items);

			if (match) {
				return match;
			}
		}

		return null;
	}

	/**
	 * Checks if an element matches a selector and returns priority weight.
	 *
	 * @param element Element to match.
	 * @param selector Selector to match with.
	 * @param [options] Options.
	 * @param [options.ignoreErrors] Ignores errors.
	 * @returns Result.
	 */
	public static matches(
		element: Element,
		selector: string,
		options?: { ignoreErrors?: boolean }
	): ISelectorMatch | null {
		if (!selector) {
			return null;
		}

		if (selector === '*') {
			return {
				priorityWeight: 1
			};
		}

		const ignoreErrors = options?.ignoreErrors;

		if (INVALID_SELECTOR_REGEXP.test(selector)) {
			if (ignoreErrors) {
				return null;
			}
			throw new Error(
				`Failed to execute 'matches' on '${element.constructor.name}': '${selector}' is not a valid selector.`
			);
		}

		for (const items of SelectorParser.getSelectorGroups(selector, options)) {
			const result = this.matchSelector(element, element, items.reverse(), 0);

			if (result) {
				return result;
			}
		}

		return null;
	}

	/**
	 * Checks if a node matches a selector.
	 *
	 * @param targetElement Target element.
	 * @param currentElement Current element.
	 * @param selectorItems Selector items.
	 * @param [priorityWeight] Priority weight.
	 * @returns Result.
	 */
	private static matchSelector(
		targetElement: Element,
		currentElement: Element,
		selectorItems: SelectorItem[],
		priorityWeight = 0
	): ISelectorMatch | null {
		const selectorItem = selectorItems[0];
		const result = selectorItem.match(currentElement);

		if (result) {
			if (selectorItems.length === 1) {
				return {
					priorityWeight: priorityWeight + result.priorityWeight
				};
			}

			switch (selectorItem.combinator) {
				case SelectorCombinatorEnum.adjacentSibling:
					if (currentElement.previousElementSibling) {
						const match = this.matchSelector(
							targetElement,
							currentElement.previousElementSibling,
							selectorItems.slice(1),
							priorityWeight + result.priorityWeight
						);

						if (match) {
							return match;
						}
					}
					break;
				case SelectorCombinatorEnum.child:
				case SelectorCombinatorEnum.descendant:
					if (currentElement.parentElement) {
						const match = this.matchSelector(
							targetElement,
							currentElement.parentElement,
							selectorItems.slice(1),
							priorityWeight + result.priorityWeight
						);
						if (match) {
							return match;
						}
					}
					break;
			}
		}

		if (
			selectorItem.combinator === SelectorCombinatorEnum.descendant &&
			targetElement !== currentElement &&
			currentElement.parentElement
		) {
			return this.matchSelector(
				targetElement,
				currentElement.parentElement,
				selectorItems,
				priorityWeight
			);
		}

		return null;
	}

	/**
	 * Finds elements based on a query selector for a part of a list of selectors separated with comma.
	 *
	 * @param rootElement Root element.
	 * @param children Child elements.
	 * @param selectorItems Selector items.
	 * @param [documentPosition] Document position of the element.
	 * @returns Document position and element map.
	 */
	private static findAll(
		rootElement: Element,
		children: Element[],
		selectorItems: SelectorItem[],
		documentPosition?: string
	): DocumentPositionAndElement[] {
		const selectorItem = selectorItems[0];
		const nextSelectorItem = selectorItems[1];
		let matched: DocumentPositionAndElement[] = [];

		for (let i = 0, max = children.length; i < max; i++) {
			const child = children[i];
			const position = (documentPosition ? documentPosition + '>' : '') + String.fromCharCode(i);

			if (selectorItem.match(child)) {
				if (!nextSelectorItem) {
					if (rootElement !== child) {
						matched.push({
							documentPosition: position,
							element: child
						});
					}
				} else {
					switch (nextSelectorItem.combinator) {
						case SelectorCombinatorEnum.adjacentSibling:
							if (child.nextElementSibling) {
								matched = matched.concat(
									this.findAll(
										rootElement,
										[child.nextElementSibling],
										selectorItems.slice(1),
										position
									)
								);
							}
							break;
						case SelectorCombinatorEnum.descendant:
						case SelectorCombinatorEnum.child:
							matched = matched.concat(
								this.findAll(
									rootElement,
									(<Element>child)[PropertySymbol.children],
									selectorItems.slice(1),
									position
								)
							);
							break;
					}
				}
			}

			if (
				selectorItem.combinator === SelectorCombinatorEnum.descendant &&
				(<Element>child)[PropertySymbol.children].length
			) {
				matched = matched.concat(
					this.findAll(
						rootElement,
						(<Element>child)[PropertySymbol.children],
						selectorItems,
						position
					)
				);
			}
		}

		return matched;
	}

	/**
	 * Finds an element based on a query selector for a part of a list of selectors separated with comma.
	 *
	 * @param rootElement Root element.
	 * @param children Child elements.
	 * @param selectorItems Selector items.
	 * @returns HTML element.
	 */
	private static findFirst(
		rootElement: Element,
		children: Element[],
		selectorItems: SelectorItem[]
	): Element {
		const selectorItem = selectorItems[0];
		const nextSelectorItem = selectorItems[1];

		for (const child of children) {
			if (selectorItem.match(child)) {
				if (!nextSelectorItem) {
					if (rootElement !== child) {
						return child;
					}
				} else {
					switch (nextSelectorItem.combinator) {
						case SelectorCombinatorEnum.adjacentSibling:
							if (child.nextElementSibling) {
								const match = this.findFirst(
									rootElement,
									[child.nextElementSibling],
									selectorItems.slice(1)
								);
								if (match) {
									return match;
								}
							}
							break;
						case SelectorCombinatorEnum.descendant:
						case SelectorCombinatorEnum.child:
							const match = this.findFirst(
								rootElement,
								(<Element>child)[PropertySymbol.children],
								selectorItems.slice(1)
							);
							if (match) {
								return match;
							}
							break;
					}
				}
			}

			if (
				selectorItem.combinator === SelectorCombinatorEnum.descendant &&
				(<Element>child)[PropertySymbol.children].length
			) {
				const match = this.findFirst(
					rootElement,
					(<Element>child)[PropertySymbol.children],
					selectorItems
				);

				if (match) {
					return match;
				}
			}
		}

		return null;
	}
}
