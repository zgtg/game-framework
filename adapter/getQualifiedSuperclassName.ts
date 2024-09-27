namespace xgame {
    /**
     * 适配 egret 函数 getQualifiedSuperclassName
     */
    export function getQualifiedSuperclassName(value: any): string {
        if (!value || (typeof value != "object" && !value.prototype)) {
            return null;
        }
        let prototype: any = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        let superProto = Object.getPrototypeOf(prototype);
        if (!superProto) {
            return null;
        }
        let superClass = getQualifiedClassName(superProto.constructor);
        if (!superClass) {
            return null;
        }
        return superClass;
    }
}