namespace xgame {

	/**
	 * 简单状态机实现
	 * @param {T} 状态枚举类型
	 * @param {K} 使用状态机的类型
	 */
	export class AsyncStateHelper<T, K>{

		/**当前的状态 */
		private _curStateID: T;
		get curState() {
			return this._curStateID;
		}

		/**上一个状态 */
		private _lastStateID: T;
		get lastState() {
			return this._lastStateID;
		}

		/**持有状态的目标对象 */
		private _target: K;
		public get target(): K { return this._target };

		/**
		 * param targetState:number 目标状态
		 * param srcState:number 原来的状态
		 */
		private _listerTarget: any;
		private _eventLister: Function;

		//持有的状态对象
		private _states: { [key: number]: IAsyncStateObject<T, K> };

		/** 状态切换中 */
		private isBusy: boolean = false;

		/** 预订的下个状态 */
		private _nextState: T = null;
		public get nextState(): T {
			return this._nextState;
		}

		public constructor(target: K, defaultState: T = null) {
			this._curStateID = defaultState;
			this._states = {};
			this._target = target;
			this.isBusy = false;
		}

		/**
		 * 添加一个状态对象给状态机持有
		 */
		public addStateObject(stateObj: IAsyncStateObject<T, K>) {
			if (stateObj == null || stateObj.stateID == null || this._states.hasOwnProperty(stateObj.stateID.toString())) {
				console.error(`[AsyncStateHelper.addStateObject] - has sateID : ${stateObj.stateID}`);
				return;
			}
			this._states[stateObj.stateID.toString()] = stateObj;
		}

		/**
		 * 添加一个状态对象给状态机持有
		 */
		public replaceStateObject(stateObj: IAsyncStateObject<T, K>) {
			if (stateObj != null && this._states.hasOwnProperty(stateObj.stateID.toString())) {
				console.error(`[AsyncStateHelper.addStateObject] - dot have sateID : ${stateObj.stateID}`);
				return;
			}
			this._states[stateObj.stateID.toString()] = stateObj;
		}

		/**
		 * 移除一个状态
		 * @param  {IAsyncStateObject<T} state
		 * @param  {any} K>
		 */
		public removeStateObject(stateID: T) {
			if (stateID == null || !this._states.hasOwnProperty(stateID.toString())) {
				console.error(`[AsyncStateHelper.addStateObject] - not have sateID : ${stateID}`);
				return;
			}
			delete this._states[stateID.toString()];
		}

		public getCurStateObj(): IAsyncStateObject<T, K> {
			return this.getStateObj(this._curStateID);
		}

		public getStateObj(stateID: T): IAsyncStateObject<T, K> {
			if (stateID != null && this._states && this._states.hasOwnProperty(stateID.toString()))
				return this._states[stateID.toString()];
			return null;
		}

		/**
		 * 设置状态
		 * @param state 新的状态 
		 */
		public async setState(stateID: T) {
			if (stateID == null)
				return;
			if (this._curStateID != stateID) {
				if (this.isBusy) {
					this._nextState = stateID;
				} else {
					this.isBusy = true;
					this._lastStateID = this._curStateID;
					this._curStateID = stateID;
					await this.dispatchStateChangeEvent(stateID);
					this.isBusy = false;
					this.updateNextState();
				}
			}
		}

		/**
		 * 强制进入指定状态
		 * @param stateID 状态ID
		 */
		public async forceSetState(stateID: T) {
			if (stateID == this._curStateID) {
				await this.resetCurState(this._target);
			}
			else {
				await this.setState(stateID);
			}
		}

		/**
		 * 更新下个状态
		 */
		private updateNextState() {
			if (this.nextState) {
				this.setState(this.nextState);
				this._nextState = null;
			}
		}

		/**
		 * 重置状态
		 * @param state 新的状态 
		 */
		public async resetCurState(target: K) {
			let curStateObj = this.getCurStateObj();
			if (curStateObj) {
				await curStateObj.onExit(curStateObj, target);
				await curStateObj.onEnter(curStateObj, target);
			}
		}

		public async backSate() {
			await this.setState(this._lastStateID);
		}

		/**
		 * 更新状态
		 * @param {number} dt 上次调用此接口到本地的时间
		 */
		public updateCurState(dt: number) {
			let tmpCurState = this.getCurStateObj();
			if (tmpCurState != null) {
				tmpCurState.onUpdate(dt, this._target);
			}
		}

		/**
		 * 遍历所有状态
		 * @param call 
		 */
		public foreachState(call: (state: IAsyncStateObject<T, K>) => void) {
			for (var key in this._states) {
				if (this._states.hasOwnProperty(key)) {
					call(this._states[key]);
				}
			}
		}

		/**
		 * 添加状态变化的监听回调
		 * @param 被执行的函数
		 * @param 执行函数目标对象
		 */
		public setStateChangeEventListener(listener: (targetState: T, srcState: T) => void, target: any) {
			this._listerTarget = target;
			this._eventLister = listener;
		}

		public destory() {
			if (this.getCurStateObj()) {
				this.getCurStateObj().onExit(null, this._target);
			}
			for (var key in this._states) {
				if (this._states.hasOwnProperty(key)) {
					delete this._states[key];
				}
			}
			delete this._listerTarget;
			delete this._target;
			delete this._eventLister;
			delete this._states;
		}

		/**
		 * 处理状态变化
		 * @param newState 新状态
		 */
		private async dispatchStateChangeEvent(newState: T) {
			if (this._eventLister && this._listerTarget) {
				this._eventLister.call(this._listerTarget, this._curStateID, this._lastStateID);
			}
			await this.updateStateObj(this._lastStateID, this._curStateID);
		}

		private async updateStateObj(lastSatateID: T, newStateID) {
			let tmpCurStateObj = this.getStateObj(lastSatateID);
			let tmpNextStateObj = this.getStateObj(newStateID);

			if (tmpCurStateObj != null) {
				await tmpCurStateObj.onExit(tmpNextStateObj, this._target);
			}
			if (tmpNextStateObj != null) {
				await tmpNextStateObj.onEnter(tmpCurStateObj, this._target);
			}
		}
	}
}
