import UIEvent from '../UIEvent.js';
/**
 *
 */
class WheelEvent extends UIEvent {
    /**
     * Constructor.
     *
     * @param type Event type.
     * @param [eventInit] Event init.
     */
    constructor(type, eventInit = null) {
        super(type, eventInit);
        this.deltaX = eventInit?.deltaX ?? 0;
        this.deltaY = eventInit?.deltaY ?? 0;
        this.deltaZ = eventInit?.deltaZ ?? 0;
        this.deltaMode = eventInit?.deltaMode ?? 0;
    }
}
WheelEvent.DOM_DELTA_PIXEL = 0;
WheelEvent.DOM_DELTA_LINE = 1;
WheelEvent.DOM_DELTA_PAGE = 2;
export default WheelEvent;
//# sourceMappingURL=WheelEvent.js.map