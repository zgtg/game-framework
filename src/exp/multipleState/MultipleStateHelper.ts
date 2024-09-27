///<reference path="./IMultipleStateObject.ts" />
namespace xgame {

    //回调函数类型
    export type MultipleCallFunc = (state: number, isEnter: boolean) => void;

    /**
     * 多状态状态机 状态之间不会有互斥现象
     * @param {T} 状态枚举类型
     * @param {K} 使用状态机的类型
     */
    export class MultipleStateHelper<T, K>{


        /**持有状态的目标对象 */
        private _target: K;
        public get target(): K { return this._target };

        /**
         * param targetState:number 目标状态
         * param srcState:number 原来的状态
         */
        private _listerTarget: any;
        private _eventLister: MultipleCallFunc;

        //持有的状态对象
        private _stateObjects: { [key: number]: IMultipleStateObject<T, K> };

        //持有状态对象
        private _states: Array<boolean> = [];

        public constructor(target: K) {
            this._stateObjects = {};
            this._target = target;
        }

        public activeState(state: number): number | boolean {
            if (this._states[state])
                return false;
            let result = true;
            if (this._stateObjects[state])
                result = this._stateObjects[state].onEnter(this._target);
            this._states[state] = result;
            if (result)
                this.updateState(state, true);
            return result;
        }

        public isActiveState(state: number): boolean {
            return this._states[state] ? true : false;
        }

        public cancelState(state: number): boolean {
            if (!this._states[state])
                return false;
            let result = true;
            if (this._stateObjects[state])
                result = this._stateObjects[state].onExit(this._target);
            if (result)
                this.updateState(state, false);
            this._states[state] = !result;
            return result;
        }

        /**
         * 取消其他状态只保留指定状态
         * @param state 保留状态ID
         */
        public cancelAllState() {
            for (let tmpState in this._stateObjects) {
                this.cancelState(parseInt(tmpState));
            }
        }

        public refreshState(state: number): boolean {
            let result = true;
            if (this._states[state])
                result = this.cancelState(state);
            if (result)
                result = this.activeState(state) as boolean;
            return result;
        }

        /**
         * 刷新所有状态
         */
        public refreshAllState() {
            for (let stateID = 0; stateID < this._states.length; stateID++) {
                this._states[stateID] && this.refreshState(stateID);
            }
        }

        /**
         * 回调状态变化
         * @param state 当前变化状态
         * @param result 状态变化结果
         */
        public updateStateObject(dt: number) {
            for (let index = 0; index < this._states.length; index++) {
                if (this._states[index]) {
                    if (this._stateObjects.hasOwnProperty(index))
                        this._stateObjects[index].onUpdate(dt, this._target);
                }
            }
        }

        /**
         * 回调状态变化
         * @param state 当前变化状态
         * @param result 状态变化结果
         */
        private updateState(state: number, result: boolean) {
            if (this._listerTarget && this._eventLister) {
                this._eventLister.call(this._listerTarget, state, result);
            }
        }

        /**
         * 添加状态变化的监听回调
         * @param 被执行的函数
         * @param 执行函数目标对象
         */
        public setStateChangeEventListener(listener: MultipleCallFunc, target: any) {
            this._listerTarget = target;
            this._eventLister = listener;
        }

        /**
         * 添加一个状态对象给状态机持有
         */
        public addStateObject(stateObj: IMultipleStateObject<T, K>) {
            if (stateObj == null || stateObj.stateID == null || this._stateObjects.hasOwnProperty(stateObj.stateID.toString())) {
                console.error(`[MultipleStateHelper.addStateObject] - has sateID : ${stateObj.stateID}`);
                return;
            }
            this._stateObjects[stateObj.stateID.toString()] = stateObj;
        }

        /**
         * 移除一个状态
         * @param  {IMultipleStateObject<T>} state
         * @param  {any} K>
         */
        public removeStateObject(stateID: T) {
            if (stateID == null || !this._stateObjects.hasOwnProperty(stateID.toString())) {
                console.error(`[MultipleStateHelper.removeStateObject] - not have sateID : ${stateID}`);
                return;
            }
            delete this._stateObjects[stateID.toString()];
        }

        public destory() {
            for (var key in this._stateObjects) {
                if (this._stateObjects.hasOwnProperty(key)) {
                    delete this._stateObjects[key];
                }
            }
            delete this._target;
            delete this._listerTarget;
            delete this._eventLister;
            delete this._stateObjects;
        }

    }
}
