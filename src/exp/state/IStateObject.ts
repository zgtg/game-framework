namespace xgame {
	/**
	 * 状态机的状态对象接口
	 * 1.单独处理每个状态下对象的逻辑
	 * @param {T} 持有状态机的类型
	 */
	export abstract class IStateObject<T, K> {

		//状态ID由状态对象定义
		stateID: T;

		constructor(stateID: T) {
			this.stateID = stateID;
		}

		/**
		 * 进入状态的时候回调
		 * @param {IStateObject<T>} lastState 上个状态
		 */
		abstract onEnter(lastState: IStateObject<T, K>, target: K);

		/**
		 * 离开状态的时候回调
		 * @param {IStateObject<T>} nextState 下个状态
		 */
		abstract onExit(nextState: IStateObject<T, K>, target: K);

		/**
		 * 更新状态
		 * @param {number} dt 上次调用此接口到本地的时间
		 */
		abstract onUpdate(dt: number, target: K);
	}
}