namespace xgame {
    /**
     * 适配白鹭 getQualifiedClassName 函数
     */
    export function getQualifiedClassName(value: any): string {
        let type = typeof value;
        if (!value || (type != "object" && !value.prototype)) {
            return type;
        }
        let prototype: any = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        if (prototype.hasOwnProperty("__classname__")) {
            return prototype["__classname__"];
        }
        let constructorString: string = prototype.constructor.toString().trim();
        let index: number = constructorString.indexOf("(");
        let className: string = constructorString.substring(9, index);
        Object.defineProperty(prototype, "__classname__", {
            value: className,
            enumerable: false,
            writable: true
        });
        return className;
    }
}
