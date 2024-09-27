namespace xgame {

    /**记录显示view信息 */
    interface TipsInfoStack {
        prefabUrl: string,
        data: any,
    }

    /**
     * 容器增加删除处理
     */
    export class TipsContainerHandler extends ContainerHandler {

        /**当前压栈 */
        private _tipsQueue: Array<TipsInfoStack> = [];
        private _forceCache: boolean = false;
        private _count: number = 0;

        reset() {
            this._tipsQueue.length = 0;
            this._count = 0;
            this._forceCache = false;
        }

        /**
         * 添加前
         * @param uuid 新对象的uuid
         */
        onBeforeAdd(prefabUrl: string, data?: any): string {
            if (!this._forceCache && this._count++ == 0) {
                return prefabUrl;
            }
            this._tipsQueue.push({ prefabUrl: prefabUrl, data: data });
            return null;
        }

        /**
         * 移除前
         * @param uuid 移除对象的uuid
         */
        onRemove(uuid: string): void {
            this._count--;
            if (this._tipsQueue.length > 0) {
                let stackData: TipsInfoStack = this._tipsQueue[0];
                this._tipsQueue.splice(0, 1);
                this._forceCache = true;
                xgame.getXGame().ui._addView(stackData.prefabUrl, stackData.data, (uuid: string) => {
                    this._forceCache = false;
                });
            }
            if (this.getActiveCount() <= 0)
                xgame.dispatchSysEvent(xgame.EnumSysEvtKey.ui_alltips_hide);
        }

        /**
         * 获得在激活使用中的UI数量
         */
        public getActiveCount(): number {
            return this._count;
        };

    }
}