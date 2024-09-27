namespace xgame {
    /**
     * view类型
     */
    export enum EnumViewType {
        Background = 0,
        Layer,
        UI,
        Board,
        Tips,
        Dynamic,    //动态变化层，所有非system和debug层的对象，都可设置为动态层，动态层UI遵循后添加永远在最上层规则
        Top,
        System,
        Debug
    }
}