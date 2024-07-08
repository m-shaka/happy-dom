import CSSStyleSheet from './CSSStyleSheet.js';
import CSSRuleTypeEnum from './CSSRuleTypeEnum.js';
/**
 * CSSRule interface.
 */
export default class CSSRule {
    static CONTAINER_RULE: CSSRuleTypeEnum;
    static STYLE_RULE: CSSRuleTypeEnum;
    static IMPORT_RULE: CSSRuleTypeEnum;
    static MEDIA_RULE: CSSRuleTypeEnum;
    static FONT_FACE_RULE: CSSRuleTypeEnum;
    static PAGE_RULE: CSSRuleTypeEnum;
    static KEYFRAMES_RULE: CSSRuleTypeEnum;
    static KEYFRAME_RULE: CSSRuleTypeEnum;
    static NAMESPACE_RULE: CSSRuleTypeEnum;
    static COUNTER_STYLE_RULE: CSSRuleTypeEnum;
    static SUPPORTS_RULE: CSSRuleTypeEnum;
    static DOCUMENT_RULE: CSSRuleTypeEnum;
    static FONT_FEATURE_VALUES_RULE: CSSRuleTypeEnum;
    static REGION_STYLE_RULE: CSSRuleTypeEnum;
    parentRule: CSSRule;
    parentStyleSheet: CSSStyleSheet;
    type: number;
    /**
     * Returns selector text.
     *
     * @returns Selector text.
     */
    get cssText(): string;
}
//# sourceMappingURL=CSSRule.d.ts.map