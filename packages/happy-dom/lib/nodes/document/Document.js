var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Document_instances, _Document_selection, _Document_browserFrame, _Document_importNode, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
import Element from '../element/Element.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import Node from '../node/Node.js';
import NodeIterator from '../../tree-walker/NodeIterator.js';
import TreeWalker from '../../tree-walker/TreeWalker.js';
import XMLParser from '../../xml-parser/XMLParser.js';
import Event from '../../event/Event.js';
import DOMImplementation from '../../dom-implementation/DOMImplementation.js';
import NamespaceURI from '../../config/NamespaceURI.js';
import DocumentType from '../document-type/DocumentType.js';
import ParentNodeUtility from '../parent-node/ParentNodeUtility.js';
import QuerySelector from '../../query-selector/QuerySelector.js';
import DOMException from '../../exception/DOMException.js';
import NodeList from '../node/NodeList.js';
import HTMLCollection from '../element/HTMLCollection.js';
import DocumentReadyStateEnum from './DocumentReadyStateEnum.js';
import Selection from '../../selection/Selection.js';
import ElementUtility from '../element/ElementUtility.js';
import VisibilityStateEnum from './VisibilityStateEnum.js';
import NodeTypeEnum from '../node/NodeTypeEnum.js';
import CookieStringUtility from '../../cookie/urilities/CookieStringUtility.js';
import NodeFactory from '../NodeFactory.js';
import { URL } from 'url';
import HTMLElementConfig from '../../config/HTMLElementConfig.js';
const PROCESSING_INSTRUCTION_TARGET_REGEXP = /^[a-z][a-z0-9-]+$/;
/**
 * Document.
 */
class Document extends Node {
    /**
     * Constructor.
     *
     * @param injected Injected properties.
     * @param injected.browserFrame Browser frame.
     * @param injected.window Window.
     */
    constructor(injected) {
        super();
        _Document_instances.add(this);
        // Internal properties
        this[_a] = new HTMLCollection();
        this[_b] = null;
        this[_c] = null;
        this[_d] = null;
        this[_e] = this;
        // Used as an unique identifier which is updated whenever the DOM gets modified.
        this[_f] = 0;
        this[_g] = true;
        this[_h] = false;
        this[_j] = NodeTypeEnum.documentNode;
        this[_k] = true;
        this[_l] = [];
        this[_m] = new DOMImplementation(this);
        this[_o] = DocumentReadyStateEnum.interactive;
        this[_p] = '';
        this[_q] = null;
        // Private properties
        _Document_selection.set(this, null);
        _Document_browserFrame.set(this, void 0);
        // Events
        this.onreadystatechange = null;
        this.onpointerlockchange = null;
        this.onpointerlockerror = null;
        this.onbeforecopy = null;
        this.onbeforecut = null;
        this.onbeforepaste = null;
        this.onfreeze = null;
        this.onresume = null;
        this.onsearch = null;
        this.onvisibilitychange = null;
        this.onfullscreenchange = null;
        this.onfullscreenerror = null;
        this.onwebkitfullscreenchange = null;
        this.onwebkitfullscreenerror = null;
        this.onbeforexrselect = null;
        this.onabort = null;
        this.onbeforeinput = null;
        this.onblur = null;
        this.oncancel = null;
        this.oncanplay = null;
        this.oncanplaythrough = null;
        this.onchange = null;
        this.onclick = null;
        this.onclose = null;
        this.oncontextlost = null;
        this.oncontextmenu = null;
        this.oncontextrestored = null;
        this.oncuechange = null;
        this.ondblclick = null;
        this.ondrag = null;
        this.ondragend = null;
        this.ondragenter = null;
        this.ondragleave = null;
        this.ondragover = null;
        this.ondragstart = null;
        this.ondrop = null;
        this.ondurationchange = null;
        this.onemptied = null;
        this.onended = null;
        this.onerror = null;
        this.onfocus = null;
        this.onformdata = null;
        this.oninput = null;
        this.oninvalid = null;
        this.onkeydown = null;
        this.onkeypress = null;
        this.onkeyup = null;
        this.onload = null;
        this.onloadeddata = null;
        this.onloadedmetadata = null;
        this.onloadstart = null;
        this.onmousedown = null;
        this.onmouseenter = null;
        this.onmouseleave = null;
        this.onmousemove = null;
        this.onmouseout = null;
        this.onmouseover = null;
        this.onmouseup = null;
        this.onmousewheel = null;
        this.onpause = null;
        this.onplay = null;
        this.onplaying = null;
        this.onprogress = null;
        this.onratechange = null;
        this.onreset = null;
        this.onresize = null;
        this.onscroll = null;
        this.onsecuritypolicyviolation = null;
        this.onseeked = null;
        this.onseeking = null;
        this.onselect = null;
        this.onslotchange = null;
        this.onstalled = null;
        this.onsubmit = null;
        this.onsuspend = null;
        this.ontimeupdate = null;
        this.ontoggle = null;
        this.onvolumechange = null;
        this.onwaiting = null;
        this.onwebkitanimationend = null;
        this.onwebkitanimationiteration = null;
        this.onwebkitanimationstart = null;
        this.onwebkittransitionend = null;
        this.onwheel = null;
        this.onauxclick = null;
        this.ongotpointercapture = null;
        this.onlostpointercapture = null;
        this.onpointerdown = null;
        this.onpointermove = null;
        this.onpointerrawupdate = null;
        this.onpointerup = null;
        this.onpointercancel = null;
        this.onpointerover = null;
        this.onpointerout = null;
        this.onpointerenter = null;
        this.onpointerleave = null;
        this.onselectstart = null;
        this.onselectionchange = null;
        this.onanimationend = null;
        this.onanimationiteration = null;
        this.onanimationstart = null;
        this.ontransitionrun = null;
        this.ontransitionstart = null;
        this.ontransitionend = null;
        this.ontransitioncancel = null;
        this.oncopy = null;
        this.oncut = null;
        this.onpaste = null;
        this.onbeforematch = null;
        __classPrivateFieldSet(this, _Document_browserFrame, injected.browserFrame, "f");
        this[PropertySymbol.ownerWindow] = injected.window;
    }
    /**
     * Returns adopted style sheets.
     *
     * @returns Adopted style sheets.
     */
    get adoptedStyleSheets() {
        return this[PropertySymbol.adoptedStyleSheets];
    }
    /**
     * Sets adopted style sheets.
     *
     * @param value Adopted style sheets.
     */
    set adoptedStyleSheets(value) {
        this[PropertySymbol.adoptedStyleSheets] = value;
    }
    /**
     * Returns DOM implementation.
     *
     * @returns DOM implementation.
     */
    get implementation() {
        return this[PropertySymbol.implementation];
    }
    /**
     * Returns document ready state.
     *
     * @returns Document ready state.
     */
    get readyState() {
        return this[PropertySymbol.readyState];
    }
    /**
     * Returns referrer.
     *
     * @returns Referrer.
     */
    get referrer() {
        return this[PropertySymbol.referrer];
    }
    /**
     * Returns default view.
     *
     * @returns Default view.
     */
    get defaultView() {
        return this[PropertySymbol.defaultView];
    }
    /**
     * Returns document children.
     */
    get children() {
        return this[PropertySymbol.children];
    }
    /**
     * Returns character set.
     *
     * @deprecated
     * @returns Character set.
     */
    get charset() {
        return this.characterSet;
    }
    /**
     * Returns character set.
     *
     * @returns Character set.
     */
    get characterSet() {
        const charset = this.querySelector('meta[charset]')?.getAttributeNS(null, 'charset');
        return charset ? charset : 'UTF-8';
    }
    /**
     * Returns title.
     *
     * @returns Title.
     */
    get title() {
        const element = ParentNodeUtility.getElementByTagName(this, 'title');
        if (element) {
            return element.textContent;
        }
        return '';
    }
    /**
     * Returns set title.
     *
     */
    set title(title) {
        const element = ParentNodeUtility.getElementByTagName(this, 'title');
        if (element) {
            element.textContent = title;
        }
        else {
            const newElement = this.createElement('title');
            newElement.textContent = title;
            this.head.appendChild(newElement);
        }
    }
    /**
     * Returns a collection of all area elements and a elements in a document with a value for the href attribute.
     */
    get links() {
        return this.querySelectorAll('a[href],area[href]');
    }
    /**
     * Returns a collection of all form elements in a document.
     */
    get forms() {
        return this.getElementsByTagName('form');
    }
    /**
     * Last element child.
     *
     * @returns Element.
     */
    get childElementCount() {
        return this[PropertySymbol.children].length;
    }
    /**
     * First element child.
     *
     * @returns Element.
     */
    get firstElementChild() {
        return this[PropertySymbol.children][0] ?? null;
    }
    /**
     * Last element child.
     *
     * @returns Element.
     */
    get lastElementChild() {
        return this[PropertySymbol.children][this[PropertySymbol.children].length - 1] ?? null;
    }
    /**
     * Returns cookie string.
     *
     * @returns Cookie.
     */
    get cookie() {
        return CookieStringUtility.cookiesToString(__classPrivateFieldGet(this, _Document_browserFrame, "f").page.context.cookieContainer.getCookies(new URL(this[PropertySymbol.ownerWindow].location.href), true));
    }
    /**
     * Sets a cookie string.
     *
     * @param cookie Cookie string.
     */
    set cookie(cookie) {
        __classPrivateFieldGet(this, _Document_browserFrame, "f").page.context.cookieContainer.addCookies([
            CookieStringUtility.stringToCookie(new URL(this[PropertySymbol.ownerWindow].location.href), cookie)
        ]);
    }
    /**
     * Node name.
     *
     * @returns Node name.
     */
    get nodeName() {
        return '#document';
    }
    /**
     * Returns <html> element.
     *
     * @returns Element.
     */
    get documentElement() {
        return ParentNodeUtility.getElementByTagName(this, 'html');
    }
    /**
     * Returns document type element.
     *
     * @returns Document type.
     */
    get doctype() {
        for (const node of this[PropertySymbol.childNodes]) {
            if (node instanceof DocumentType) {
                return node;
            }
        }
        return null;
    }
    /**
     * Returns <body> element.
     *
     * @returns Element.
     */
    get body() {
        return ParentNodeUtility.getElementByTagName(this, 'body');
    }
    /**
     * Returns <head> element.
     *
     * @returns Element.
     */
    get head() {
        return ParentNodeUtility.getElementByTagName(this, 'head');
    }
    /**
     * Returns CSS style sheets.
     *
     * @returns CSS style sheets.
     */
    get styleSheets() {
        const styles = (this.querySelectorAll('link[rel="stylesheet"][href],style'));
        const styleSheets = [];
        for (const style of styles) {
            const sheet = style.sheet;
            if (sheet) {
                styleSheets.push(sheet);
            }
        }
        return styleSheets;
    }
    /**
     * Returns active element.
     *
     * @returns Active element.
     */
    get activeElement() {
        if (this[PropertySymbol.activeElement] &&
            !this[PropertySymbol.activeElement][PropertySymbol.isConnected]) {
            this[PropertySymbol.activeElement] = null;
        }
        if (this[PropertySymbol.activeElement] &&
            this[PropertySymbol.activeElement] instanceof Element) {
            let rootNode = (this[PropertySymbol.activeElement].getRootNode());
            let activeElement = this[PropertySymbol.activeElement];
            while (rootNode !== this) {
                activeElement = rootNode.host;
                rootNode = activeElement ? activeElement.getRootNode() : this;
            }
            return activeElement;
        }
        return this[PropertySymbol.activeElement] || this.body || this.documentElement || null;
    }
    /**
     * Returns scrolling element.
     *
     * @returns Scrolling element.
     */
    get scrollingElement() {
        return this.documentElement;
    }
    /**
     * Returns location.
     *
     * @returns Location.
     */
    get location() {
        return this[PropertySymbol.ownerWindow].location;
    }
    /**
     * Returns scripts.
     *
     * @returns Scripts.
     */
    get scripts() {
        return this.getElementsByTagName('script');
    }
    /**
     * Returns base URI.
     *
     * @override
     * @returns Base URI.
     */
    get baseURI() {
        const element = ParentNodeUtility.getElementByTagName(this, 'base');
        if (element) {
            return element.href;
        }
        return this[PropertySymbol.ownerWindow].location.href;
    }
    /**
     * Returns URL.
     *
     * @returns the URL of the current document.
     * */
    get URL() {
        return this[PropertySymbol.ownerWindow].location.href;
    }
    /**
     * Returns document URI.
     *
     * @returns the URL of the current document.
     * */
    get documentURI() {
        return this.URL;
    }
    /**
     * Returns document visibility state.
     *
     * @returns the visibility state of the current document.
     * */
    get visibilityState() {
        if (this.defaultView) {
            return VisibilityStateEnum.visible;
        }
        return VisibilityStateEnum.hidden;
    }
    /**
     * Returns document hidden state.
     *
     * @returns the hidden state of the current document.
     * */
    get hidden() {
        if (this.defaultView) {
            return false;
        }
        return true;
    }
    /**
     * Gets the currently executing script element.
     *
     * @returns the currently executing script element.
     */
    get currentScript() {
        return this[PropertySymbol.currentScript];
    }
    /**
     * Inserts a set of Node objects or DOMString objects after the last child of the ParentNode. DOMString objects are inserted as equivalent Text nodes.
     *
     * @param nodes List of Node or DOMString.
     */
    append(...nodes) {
        ParentNodeUtility.append(this, ...nodes);
    }
    /**
     * Inserts a set of Node objects or DOMString objects before the first child of the ParentNode. DOMString objects are inserted as equivalent Text nodes.
     *
     * @param nodes List of Node or DOMString.
     */
    prepend(...nodes) {
        ParentNodeUtility.prepend(this, ...nodes);
    }
    /**
     * Replaces the existing children of a node with a specified new set of children.
     *
     * @param nodes List of Node or DOMString.
     */
    replaceChildren(...nodes) {
        ParentNodeUtility.replaceChildren(this, ...nodes);
    }
    /**
     * Query CSS selector to find matching elments.
     *
     * @param selector CSS selector.
     * @returns Matching elements.
     */
    querySelectorAll(selector) {
        return QuerySelector.querySelectorAll(this, selector);
    }
    /**
     * Query CSS Selector to find matching node.
     *
     * @param selector CSS selector.
     * @returns Matching element.
     */
    querySelector(selector) {
        return QuerySelector.querySelector(this, selector);
    }
    /**
     * Returns true if the command is supported.
     * @deprecated
     * @param _ Command.
     * @returns True if the command is supported, false otherwise.
     */
    queryCommandSupported(_) {
        if (!arguments.length) {
            throw new TypeError("Failed to execute 'queryCommandSupported' on 'Document': 1 argument required, but only 0 present.");
        }
        return true;
    }
    /**
     * Returns an elements by class name.
     *
     * @param className Tag name.
     * @returns Matching element.
     */
    getElementsByClassName(className) {
        return ParentNodeUtility.getElementsByClassName(this, className);
    }
    /**
     * Returns an elements by tag name.
     *
     * @param tagName Tag name.
     * @returns Matching element.
     */
    getElementsByTagName(tagName) {
        return ParentNodeUtility.getElementsByTagName(this, tagName);
    }
    /**
     * Returns an elements by tag name and namespace.
     *
     * @param namespaceURI Namespace URI.
     * @param tagName Tag name.
     * @returns Matching element.
     */
    getElementsByTagNameNS(namespaceURI, tagName) {
        return ParentNodeUtility.getElementsByTagNameNS(this, namespaceURI, tagName);
    }
    /**
     * Returns an element by ID.
     *
     * @param id ID.
     * @returns Matching element.
     */
    getElementById(id) {
        return ParentNodeUtility.getElementById(this, id);
    }
    /**
     * Returns an element by Name.
     *
     * @returns Matching element.
     * @param name
     */
    getElementsByName(name) {
        const getElementsByName = (parentNode, name) => {
            const matches = new NodeList();
            for (const child of parentNode[PropertySymbol.children]) {
                if (child.getAttributeNS(null, 'name') === name) {
                    matches.push(child);
                }
                for (const match of getElementsByName(child, name)) {
                    matches.push(match);
                }
            }
            return matches;
        };
        return getElementsByName(this, name);
    }
    /**
     * @override
     */
    [(_Document_selection = new WeakMap(), _Document_browserFrame = new WeakMap(), _Document_instances = new WeakSet(), _a = PropertySymbol.children, _b = PropertySymbol.activeElement, _c = PropertySymbol.nextActiveElement, _d = PropertySymbol.currentScript, _e = PropertySymbol.rootNode, _f = PropertySymbol.cacheID, _g = PropertySymbol.isFirstWrite, _h = PropertySymbol.isFirstWriteAfterOpen, _j = PropertySymbol.nodeType, _k = PropertySymbol.isConnected, _l = PropertySymbol.adoptedStyleSheets, _m = PropertySymbol.implementation, _o = PropertySymbol.readyState, _p = PropertySymbol.referrer, _q = PropertySymbol.defaultView, PropertySymbol.ownerWindow, PropertySymbol.cloneNode)](deep = false) {
        const clone = super[PropertySymbol.cloneNode](deep);
        if (deep) {
            for (const node of clone[PropertySymbol.childNodes]) {
                if (node[PropertySymbol.nodeType] === NodeTypeEnum.elementNode) {
                    clone[PropertySymbol.children].push(node);
                }
            }
        }
        return clone;
    }
    /**
     * @override
     */
    [PropertySymbol.appendChild](node) {
        // We do not call super here as this will be handled by ElementUtility to improve performance by avoiding validation and other checks.
        return ElementUtility.appendChild(this, node);
    }
    /**
     * @override
     */
    [PropertySymbol.removeChild](node) {
        // We do not call super here as this will be handled by ElementUtility to improve performance by avoiding validation and other checks.
        return ElementUtility.removeChild(this, node);
    }
    /**
     * @override
     */
    [PropertySymbol.insertBefore](newNode, referenceNode) {
        // We do not call super here as this will be handled by ElementUtility to improve performance by avoiding validation and other checks.
        return ElementUtility.insertBefore(this, newNode, referenceNode);
    }
    /**
     * Replaces the document HTML with new HTML.
     *
     * @param html HTML.
     */
    write(html) {
        const root = XMLParser.parse(this, html, { evaluateScripts: true });
        if (this[PropertySymbol.isFirstWrite] || this[PropertySymbol.isFirstWriteAfterOpen]) {
            if (this[PropertySymbol.isFirstWrite]) {
                if (!this[PropertySymbol.isFirstWriteAfterOpen]) {
                    this.open();
                }
                this[PropertySymbol.isFirstWrite] = false;
            }
            this[PropertySymbol.isFirstWriteAfterOpen] = false;
            let documentElement = null;
            let documentTypeNode = null;
            for (const node of root[PropertySymbol.childNodes]) {
                if (node['tagName'] === 'HTML') {
                    documentElement = node;
                }
                else if (node[PropertySymbol.nodeType] === NodeTypeEnum.documentTypeNode) {
                    documentTypeNode = node;
                }
                if (documentElement && documentTypeNode) {
                    break;
                }
            }
            if (documentElement) {
                if (!this.documentElement) {
                    if (documentTypeNode) {
                        this.appendChild(documentTypeNode);
                    }
                    this.appendChild(documentElement);
                    const head = ParentNodeUtility.getElementByTagName(this, 'head');
                    let body = ParentNodeUtility.getElementByTagName(this, 'body');
                    if (!body) {
                        body = this.createElement('body');
                        documentElement.appendChild(this.createElement('body'));
                    }
                    if (!head) {
                        documentElement.insertBefore(this.createElement('head'), body);
                    }
                }
                else {
                    const rootBody = ParentNodeUtility.getElementByTagName(root, 'body');
                    const body = ParentNodeUtility.getElementByTagName(this, 'body');
                    if (rootBody && body) {
                        for (const child of rootBody[PropertySymbol.childNodes].slice()) {
                            body.appendChild(child);
                        }
                    }
                }
                // Remaining nodes outside the <html> element are added to the <body> element.
                const body = ParentNodeUtility.getElementByTagName(this, 'body');
                if (body) {
                    for (const child of root[PropertySymbol.childNodes].slice()) {
                        if (child['tagName'] !== 'HTML' &&
                            child[PropertySymbol.nodeType] !== NodeTypeEnum.documentTypeNode) {
                            body.appendChild(child);
                        }
                    }
                }
            }
            else {
                const documentElement = this.createElement('html');
                const bodyElement = this.createElement('body');
                const headElement = this.createElement('head');
                for (const child of root[PropertySymbol.childNodes].slice()) {
                    bodyElement.appendChild(child);
                }
                documentElement.appendChild(headElement);
                documentElement.appendChild(bodyElement);
                this.appendChild(documentElement);
            }
        }
        else {
            const bodyNode = ParentNodeUtility.getElementByTagName(root, 'body');
            const body = ParentNodeUtility.getElementByTagName(this, 'body');
            for (const child of (bodyNode || root)[PropertySymbol.childNodes].slice()) {
                body.appendChild(child);
            }
        }
    }
    /**
     * Opens the document.
     *
     * @returns Document.
     */
    open() {
        this[PropertySymbol.isFirstWriteAfterOpen] = true;
        for (const eventType of Object.keys(this[PropertySymbol.listeners])) {
            const listeners = this[PropertySymbol.listeners][eventType];
            if (listeners) {
                for (const listener of listeners) {
                    this.removeEventListener(eventType, listener);
                }
            }
        }
        for (const child of this[PropertySymbol.childNodes].slice()) {
            this.removeChild(child);
        }
        return this;
    }
    /**
     * Closes the document.
     */
    close() { }
    /**
     * Creates an element.
     *
     * @param qualifiedName Tag name.
     * @param [options] Options.
     * @param [options.is] Tag name of a custom element previously defined via customElements.define().
     * @returns Element.
     */
    createElement(qualifiedName, options) {
        return this.createElementNS(NamespaceURI.html, qualifiedName, options);
    }
    /**
     * Creates an element with the specified namespace URI and qualified name.
     *
     * @param namespaceURI Namespace URI.
     * @param qualifiedName Tag name.
     * @param [options] Options.
     * @param [options.is] Tag name of a custom element previously defined via customElements.define().
     * @returns Element.
     */
    createElementNS(namespaceURI, qualifiedName, options) {
        qualifiedName = String(qualifiedName);
        if (!qualifiedName) {
            throw new DOMException("Failed to execute 'createElementNS' on 'Document': The qualified name provided is empty.");
        }
        // SVG element
        if (namespaceURI === NamespaceURI.svg) {
            const element = NodeFactory.createNode(this, qualifiedName === 'svg'
                ? this[PropertySymbol.ownerWindow].SVGSVGElement
                : this[PropertySymbol.ownerWindow].SVGElement);
            element[PropertySymbol.tagName] = qualifiedName;
            element[PropertySymbol.localName] = qualifiedName;
            element[PropertySymbol.namespaceURI] = namespaceURI;
            element[PropertySymbol.isValue] = options && options.is ? String(options.is) : null;
            return element;
        }
        // Custom HTML element
        const customElement = this[PropertySymbol.ownerWindow].customElements[PropertySymbol.registry]?.[options && options.is ? String(options.is) : qualifiedName];
        if (customElement) {
            const element = new customElement.elementClass();
            element[PropertySymbol.tagName] = qualifiedName.toUpperCase();
            element[PropertySymbol.localName] = qualifiedName;
            element[PropertySymbol.namespaceURI] = namespaceURI;
            element[PropertySymbol.isValue] = options && options.is ? String(options.is) : null;
            return element;
        }
        const localName = qualifiedName.toLowerCase();
        const elementClass = HTMLElementConfig[localName]
            ? this[PropertySymbol.ownerWindow][HTMLElementConfig[localName].className]
            : null;
        // Known HTML element
        if (elementClass) {
            const element = NodeFactory.createNode(this, elementClass);
            element[PropertySymbol.tagName] = qualifiedName.toUpperCase();
            element[PropertySymbol.localName] = localName;
            element[PropertySymbol.namespaceURI] = namespaceURI;
            element[PropertySymbol.isValue] = options && options.is ? String(options.is) : null;
            return element;
        }
        // Unknown HTML element
        const element = NodeFactory.createNode(this, 
        // If the tag name contains a hyphen, it is an unknown custom element and we should use HTMLElement.
        localName.includes('-')
            ? this[PropertySymbol.ownerWindow].HTMLElement
            : this[PropertySymbol.ownerWindow].HTMLUnknownElement);
        element[PropertySymbol.tagName] = qualifiedName.toUpperCase();
        element[PropertySymbol.localName] = localName;
        element[PropertySymbol.namespaceURI] = namespaceURI;
        element[PropertySymbol.isValue] = options && options.is ? String(options.is) : null;
        return element;
    }
    /* eslint-enable jsdoc/valid-types */
    /**
     * Creates a text node.
     *
     * @param [data] Text data.
     * @returns Text node.
     */
    createTextNode(data) {
        if (arguments.length < 1) {
            throw new TypeError(`Failed to execute 'createTextNode' on 'Document': 1 argument required, but only ${arguments.length} present.`);
        }
        return NodeFactory.createNode(this, this[PropertySymbol.ownerWindow].Text, String(data));
    }
    /**
     * Creates a comment node.
     *
     * @param [data] Text data.
     * @returns Text node.
     */
    createComment(data) {
        return NodeFactory.createNode(this, this[PropertySymbol.ownerWindow].Comment, data);
    }
    /**
     * Creates a document fragment.
     *
     * @returns Document fragment.
     */
    createDocumentFragment() {
        return new this[PropertySymbol.ownerWindow].DocumentFragment();
    }
    /**
     * Creates a node iterator.
     *
     * @param root Root.
     * @param [whatToShow] What to show.
     * @param [filter] Filter.
     */
    createNodeIterator(root, whatToShow = -1, filter = null) {
        return new NodeIterator(root, whatToShow, filter);
    }
    /**
     * Creates a Tree Walker.
     *
     * @param root Root.
     * @param [whatToShow] What to show.
     * @param [filter] Filter.
     */
    createTreeWalker(root, whatToShow = -1, filter = null) {
        return new TreeWalker(root, whatToShow, filter);
    }
    /**
     * Creates an event.
     *
     * @deprecated
     * @param type Type.
     * @returns Event.
     */
    createEvent(type) {
        if (typeof this[PropertySymbol.ownerWindow][type] === 'function') {
            return new this[PropertySymbol.ownerWindow][type]('init');
        }
        return new Event('init');
    }
    /**
     * Creates an Attr node.
     *
     * @param qualifiedName Name.
     * @returns Attribute.
     */
    createAttribute(qualifiedName) {
        return this.createAttributeNS(null, qualifiedName.toLowerCase());
    }
    /**
     * Creates a namespaced Attr node.
     *
     * @param namespaceURI Namespace URI.
     * @param qualifiedName Qualified name.
     * @returns Element.
     */
    createAttributeNS(namespaceURI, qualifiedName) {
        const attribute = NodeFactory.createNode(this, this[PropertySymbol.ownerWindow].Attr);
        attribute[PropertySymbol.namespaceURI] = namespaceURI;
        attribute[PropertySymbol.name] = qualifiedName;
        return attribute;
    }
    /**
     * Imports a node.
     *
     * @param node Node to import.
     * @param [deep=false] Set to "true" if the clone should be deep.
     */
    importNode(node, deep = false) {
        if (!(node instanceof Node)) {
            throw new DOMException('Parameter 1 was not of type Node.');
        }
        const clone = node.cloneNode(deep);
        __classPrivateFieldGet(this, _Document_instances, "m", _Document_importNode).call(this, clone);
        return clone;
    }
    /**
     * Creates a range.
     *
     * @returns Range.
     */
    createRange() {
        return new this[PropertySymbol.ownerWindow].Range();
    }
    /**
     * Adopts a node.
     *
     * @param node Node to adopt.
     * @returns Adopted node.
     */
    adoptNode(node) {
        if (!(node instanceof Node)) {
            throw new DOMException('Parameter 1 was not of type Node.');
        }
        const adopted = node[PropertySymbol.parentNode]
            ? node[PropertySymbol.parentNode].removeChild(node)
            : node;
        const document = this;
        Object.defineProperty(adopted, 'ownerDocument', { value: document });
        return adopted;
    }
    /**
     * Returns selection.
     *
     * @returns Selection.
     */
    getSelection() {
        if (!__classPrivateFieldGet(this, _Document_selection, "f")) {
            __classPrivateFieldSet(this, _Document_selection, new Selection(this), "f");
        }
        return __classPrivateFieldGet(this, _Document_selection, "f");
    }
    /**
     * Returns a boolean value indicating whether the document or any element inside the document has focus.
     *
     * @returns "true" if the document has focus.
     */
    hasFocus() {
        return !!this.activeElement;
    }
    /**
     * Creates a Processing Instruction node.
     *
     * @param target Target.
     * @param data Data.
     * @returns ProcessingInstruction.
     */
    createProcessingInstruction(target, data) {
        if (!target || !PROCESSING_INSTRUCTION_TARGET_REGEXP.test(target)) {
            throw new DOMException(`Failed to execute 'createProcessingInstruction' on 'Document': The target provided ('${target}') is not a valid name.`);
        }
        if (data.includes('?>')) {
            throw new DOMException(`Failed to execute 'createProcessingInstruction' on 'Document': The data provided ('?>') contains '?>'`);
        }
        const processingInstruction = NodeFactory.createNode(this, this[PropertySymbol.ownerWindow].ProcessingInstruction, data);
        processingInstruction[PropertySymbol.target] = target;
        return processingInstruction;
    }
    /**
     * Get element at a given point.
     *
     * @param _x horizontal coordinate
     * @param _y vertical coordinate
     * @returns Always returns null since Happy DOM does not render elements.
     */
    elementFromPoint(_x, _y) {
        return null;
    }
}
_Document_importNode = function _Document_importNode(node) {
    node[PropertySymbol.ownerDocument] = this;
    for (const child of node[PropertySymbol.childNodes]) {
        __classPrivateFieldGet(this, _Document_instances, "m", _Document_importNode).call(this, child);
    }
};
export default Document;
//# sourceMappingURL=Document.js.map