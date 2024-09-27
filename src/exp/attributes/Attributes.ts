namespace xgame {

    /**
     * 属性行为定义
     */
    export enum EnumAttributesAction {
        //加
        add,
        //乘
        mul,
        //修改最大值
        max,
    }

    /**
     * 属性行为对象
     */
    interface AttributesAction extends xgame.IBaseData {
        value: number,
        actionType: EnumAttributesAction,
    }

    /**
     * 属性值对象
     */
    export interface AttributeData {
        /** 当前可用属性值 */
        value: number,
        /** 实际属性值 */
        _value: number,
        /** 最大属性值 */
        _maxValue: number,
        /** 最小属性值 */
        _minValue: number,
        /** 基础属性 */
        _baseValue: number,
        /** 属性变化记录 */
        _actionDict: { [serialID: number]: AttributesAction },

    }

    /**
     * 构建一个属性值
     * @param baseValue 初始值
     */
    export function createAttributes(baseValue: number, maxValue: number, minValue: number): AttributeData {
        return {
            _baseValue: baseValue,
            value: baseValue,
            _value: baseValue,
            _maxValue: maxValue,
            _minValue: minValue,
            _actionDict: {}
        };
    }

    /**
     * 重置属性值到默认
     * @param att 属性对象
     */
    export function resetAttributes(att: AttributeData) {
        att.value = att._baseValue;
        att._actionDict = {};
    }

    /**
     * 刷新属性最终值
     * @param att 属性对象
     */
    function updateAttributes(att: AttributeData) {
        let targetAdd: number = att._baseValue;
        let targetMul: number = 1;
        let targetMax: number = att._maxValue;
        let targetMin: number = att._minValue;
        for (const key in att._actionDict) {
            let action = att._actionDict[key];
            if (action.actionType == EnumAttributesAction.add) {
                targetAdd += action.value;
            }
            else if (action.actionType == EnumAttributesAction.mul) {
                targetMul = targetMul * action.value;
            }
            else if (action.actionType == EnumAttributesAction.max) {
                targetMax += action.value;
            }
        }
        att._value = targetAdd * targetMul;
        att.value = att._value;
        if (targetMax !== null && targetMax !== undefined && att.value > targetMax) {
            att.value = targetMax;
        }
        if (targetMin !== null && targetMin !== undefined && att.value < targetMin) {
            att.value = targetMin;
        }
    }

    /**
     * 添加一个变化到指定属性
     * @param att 属性对象
     * @param value 变化的值
     * @param actionType 变化类型
     * @param serialID 唯一标识（默认自动生成）
     * @returns serialID 返回一个唯一标识
     */
    export function addAttributes(att: AttributeData, value: number, actionType: EnumAttributesAction, serialID: number = xgame.MathTools.getHashCode()): number {
        let action: AttributesAction = { value: value, actionType: actionType, serialID: serialID };
        att._actionDict[action.serialID] = action;
        updateAttributes(att);
        return action.serialID;
    }

    /**
     * 根据唯一标识删除属性变化
     * @param att 属性对象
     * @param serialID 唯一标识
     * @returns boolean 是否删除成功
     */
    export function removeAttributes(att: AttributeData, serialID: number): boolean {
        if (att._actionDict.hasOwnProperty(serialID)) {
            delete att._actionDict[serialID];
            updateAttributes(att);
            return true;
        }
        return false;
    }

    /**
     * 设置属性的初始值
     * @param att 属性对象
     * @param baseValue 初始值
     */
    export function setAttributes(att: AttributeData, baseValue: number, maxValue?: number, minValue?: number) {
        maxValue === undefined && (maxValue = att._maxValue);
        minValue === undefined && (minValue = att._minValue);
        att._baseValue = baseValue;
        att._maxValue = maxValue;
        att._minValue = minValue;
        updateAttributes(att);
    }
}