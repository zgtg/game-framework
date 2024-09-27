namespace xgame {

	/**
		 * 注册对象的配置接口
		 */
	export interface RegisterConfigData {
		//回调函数
		func: Function;
		//回调函数
		expFunc?: Function;
		//注册Key
		key: string;
		//注册回调的对象
		target: cc.EventTarget;
		//回调函数的调用者
		funcTarget: any;
	}

	/**
	 * 处理注册相关内容
	 * 1.做注册函数和对象的集中管理，统一注册以及统一释放注册
	 */
	export class RegisterHelper {
		//绑定的对象
		target: cc.EventTarget;

		private _datas: { [key: string]: Array<RegisterConfigData> };


		/** 条件处理事件 是否可以继续传递事件 */
		public static onCanContinueEvent: (eventKey: string, ...args) => boolean;


		public constructor() {
			this._datas = {};
		}

		/**
		 * 添加监听的数据并且监听
		 */
		public on(data: RegisterConfigData): RegisterHelper {

			if (!data || !data.target || !data.func || !data.key || data.key == "") {
				cc.error(`[RegisterHelper.addRegisterData] - 添加的注册数据错误！`);
				return this;
			}


			data.expFunc = (...args) => {
				if (RegisterHelper.onCanContinueEvent) {
					RegisterHelper.onCanContinueEvent(data.key, args) && data.func.apply(data.funcTarget, args);
				}
				else {
					data.func.apply(data.funcTarget, args);
				}
				// if (data.key == cc.Node.EventType.TOUCH_END && data.target instanceof cc.Node && data.target.name.indexOf('Btn') != -1) {
				// }
			}

			if (this._datas.hasOwnProperty(data.key)) {
				let tmpArr: Array<RegisterConfigData> = this._datas[data.key];
				for (let tmpData of tmpArr) {
					//重复加载函数
					if (compare(tmpData, data, { expFunc: true }))
						return this;
				}

				// if(xgame.getXGame().audioMgr.re)


				tmpArr.push(data);
				data.target.on(data.key, data.expFunc, data.funcTarget);
			}
			else {
				this._datas[data.key] = [];
				let tmpDataArr = this._datas[data.key];
				tmpDataArr.push(data);
				data.target.on(data.key, data.expFunc, data.funcTarget);
			}
			return this;
		}

		/**
		 * 删除所有的时间监听
		 */
		public offAll() {
			for (var key in this._datas) {
				let tmpDataArr: Array<RegisterConfigData> = this._datas[key];
				if (tmpDataArr) {
					for (let tmpData of tmpDataArr) {
						if (tmpData)
							tmpData.target.off(tmpData.key, tmpData.expFunc, tmpData.funcTarget);
					}
					delete this._datas[key];
				}
			}
		}

		public dispose() {
			this.offAll();
			delete this._datas;
		}

		/**
		 * 删除指定的时间监听
		 */
		public off(data: RegisterConfigData) {
			if (!this._datas || !this._datas.hasOwnProperty(data.key))
				return;
			let tmpDataArr: Array<RegisterConfigData> = this._datas[data.key];
			let index: number = 0;
			for (index; index < tmpDataArr.length; index++) {
				let tmpData: RegisterConfigData = tmpDataArr[index];
				if (compare(tmpData, data, { expFunc: 0 })) {
					tmpData.target.off(tmpData.key, tmpData.expFunc, tmpData.funcTarget);
					delete tmpDataArr[index];
					break;
				}
			}
		}

	}
}