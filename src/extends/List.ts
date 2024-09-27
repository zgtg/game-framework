namespace xgame {
    export class ListNode<T extends IListNode>{
        /**下个节点 */
        nextNode: ListNode<T> = null;
        /**上个节点 */
        lastNode: ListNode<T> = null;
        /**数据 */
        data: T = null;

        public constructor(data: T) {
            this.data = data;
        }

        /**销毁数据 */
        public dispose() {
            delete this.nextNode;
            delete this.lastNode;
            this.data.doDestroy();
            delete this.data;
        }
    }

    export class List<T extends IListNode>{

        /**起始节点 */
        private _beginNode: ListNode<T> = null;
        /**末尾节点 */
        private _endNode: ListNode<T> = null;
        /**数量 */
        public count: number = 0;

        /**
         * 添加一个数据到链表开始
         * @param data 数据
         */
        public pushHead(data: T) {
            var result: ListNode<T> = new ListNode<T>(data);
            if (this._beginNode != null) {
                this._beginNode.lastNode = result;
                result.nextNode = this._beginNode.nextNode;
            }
            if (this._endNode == null)
                this._endNode = result;
            this._beginNode = result;
            this.count++;
            return result;
        }

        /**
         * 数据添加到末尾
         * @param data 数据
         */
        public pushEnd(data: T) {
            var result: ListNode<T> = new ListNode<T>(data);
            if (this._beginNode == null)
                this._beginNode = result;
            if (this._endNode != null) {
                result.lastNode = this._endNode;
                this._endNode.nextNode = result;
            }
            this._endNode = result;
            this.count++;
            return result;
        }

        public remove(data: ListNode<T>) {
            if (!data)
                return;
            var left = data.lastNode;
            var right = data.nextNode;
            if (left)
                left.nextNode = right;
            else
                this._beginNode = right;
            if (right)
                right.lastNode = left;
            else
                this._endNode = left;
            data.dispose();
            this.count--;
        }

        /**
         * 从前开始计算索引，指定索引获取节点对象
         * @param index 索引值
         */
        public getIndex(index: number): ListNode<T> {
            let result: ListNode<T> = this._beginNode;
            let tmpIndex = index;
            while (tmpIndex > 0 && result) {
                result = result.nextNode;
                tmpIndex--;
            }
            return result;
        }

        /**
         * 从后开始计算索引，指定索引获取节点对象
         * @param index 索引值
         */
        public getLastIndex(index: number): ListNode<T> { 
            let result: ListNode<T> = this._endNode;
            let tmpIndex = index;
            while (tmpIndex > 0 && result) {
                result = result.lastNode;
                tmpIndex--;
            }
            return result;
        }

        public front() {
            return this._beginNode;
        }

        public end() {
            return this._endNode;
        }

        /**
     * 遍历链表
     * @param func 遍历链表回调函数 node 为遍历到的当前位置上的节点
     */
        public forEach(func: (node: ListNode<T>) => boolean) {
            var _curNode = this._beginNode;
            while (_curNode) {
                if (!func(_curNode))
                    return;
                _curNode = _curNode.nextNode;
            }
        }

        public dispose() {
            while (this._beginNode != null && this._endNode != null) {
                this.remove(this._beginNode);
            }
        }
    }
}