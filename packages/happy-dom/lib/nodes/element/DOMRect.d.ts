import DOMRectReadOnly from './DOMRectReadOnly.js';
import IDOMRectInit from './IDOMRectInit.js';
/**
 * Bounding rect object.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMRect
 */
export default class DOMRect extends DOMRectReadOnly {
    set x(value: number);
    get x(): number;
    set y(value: number);
    get y(): number;
    set width(value: number);
    get width(): number;
    set height(value: number);
    get height(): number;
    static fromRect(other: IDOMRectInit): DOMRect;
}
//# sourceMappingURL=DOMRect.d.ts.map