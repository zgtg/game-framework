namespace xgame {
	/**
	 * 状态机的状态对象接口
	 * 1.单独处理每个状态下对象的逻辑
	 * @param {T} 持有状态机的类型
	 */
	export interface IMultipleStateObject<T, K> {

		//状态ID由状态对象定义
		stateID: T;

		//状态持续时间
		time: number;

		/**
		 * 进入状态的时候回调
		 */
		onEnter(target: K): boolean;

		/**
		 * 离开状态的时候回调
		 */
		onExit(target: K): boolean;

		/**
		 * 更新状态
		 * @param {number} dt 上次调用此接口到本地的时间
		 */
		onUpdate(dt: number, target: K);

	}
}