import * as PropertySymbol from '../../PropertySymbol.js';
import IDOMRectInit from './IDOMRectInit.js';
/**
 * Bounding rect readonly object.
 *
 * @see https://drafts.fxtf.org/geometry/#DOMRect
 */
export default class DOMRectReadOnly implements IDOMRectInit {
    protected [PropertySymbol.x]: number;
    protected [PropertySymbol.y]: number;
    protected [PropertySymbol.width]: number;
    protected [PropertySymbol.height]: number;
    /**
     * Constructor.
     *
     * @param [x] X position.
     * @param [y] Y position.
     * @param [width] Width.
     * @param [height] Height.
     */
    constructor(x?: number | null, y?: number | null, width?: number | null, height?: number | null);
    get x(): number;
    get y(): number;
    get width(): number;
    get height(): number;
    get top(): number;
    get right(): number;
    get bottom(): number;
    get left(): number;
    toJSON(): object;
    static fromRect(other: IDOMRectInit): DOMRectReadOnly;
}
//# sourceMappingURL=DOMRectReadOnly.d.ts.map