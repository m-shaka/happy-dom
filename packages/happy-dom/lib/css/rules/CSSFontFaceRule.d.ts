import CSSRule from '../CSSRule.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import CSSStyleDeclaration from '../declaration/CSSStyleDeclaration.js';
/**
 * CSSRule interface.
 */
export default class CSSFontFaceRule extends CSSRule {
    #private;
    readonly type: import("../CSSRuleTypeEnum.js").default;
    [PropertySymbol.cssText]: string;
    /**
     * Returns style.
     *
     * @returns Style.
     */
    get style(): CSSStyleDeclaration;
}
//# sourceMappingURL=CSSFontFaceRule.d.ts.map