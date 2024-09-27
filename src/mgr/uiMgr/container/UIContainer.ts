namespace xgame {
    /**
     * UI容器
     */
    export class UIContainer extends cc.Node {

        public constructor(name?: string) {
            super(name);

            /**处理对其到父节点的尺寸 */
            let widget = this.addComponent<cc.Widget>(cc.Widget);
            widget.left = 0;
            widget.right = 0;
            widget.top = 0;
            widget.bottom = 0;
            widget.isAlignTop = true;
            widget.isAlignBottom = true;
            widget.isAlignLeft = true;
            widget.isAlignRight = true;
        }

    }
}