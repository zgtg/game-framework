namespace xgame {

    /**
     * @private
     */
    let getDefinitionByNameCache = {};

    /**
     * Returns a reference to the class object of the class specified by the name parameter.
     * @param name The name of a class.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getDefinitionByName.ts
     * @language en_US
     */
    /**
     * 返回 name 参数指定的类的类对象引用。
     * @param name 类的名称。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getDefinitionByName.ts
     * @language zh_CN
     */
    export function getDefinitionByName(name:string):any {
        if (!name)
            return null;
        let definition = getDefinitionByNameCache[name];
        if (definition) {
            return definition;
        }
        let paths = name.split(".");
        let length = paths.length;
        definition = window;
        for (let i = 0; i < length; i++) {
            let path = paths[i];
            definition = definition[path];
            if (!definition) {
                return null;
            }
        }
        getDefinitionByNameCache[name] = definition;
        return definition;
    }
}
