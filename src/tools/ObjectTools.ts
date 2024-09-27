namespace xgame {
	/**
	 * 比较对象是否向相等
	 */
	export function compare(a: any, b: any, exportKeys?: {}): boolean {
		if (!a)
			return false;
		for (var key in a) {
			if (exportKeys && exportKeys.hasOwnProperty(key))
				continue;
			if (!b.hasOwnProperty(key) || a[key] != b[key]) {
				return false;
			}
		}
		return true;
	}

	export function transRequestParamWithEncode(data: any): string {
		data = data || {}
		let tmpArr: Array<any> = [];
		for (let key in data) {
			tmpArr.push(key + "=" + encodeURIComponent(data[key]))
		}
		return tmpArr.join("&")
	}

	/**
	 * 深度拷贝对象
	 */
	export function deepCopy(src: any): any {
		if (src === null)
			return null;
		if (src === undefined)
			return undefined;
		if (src instanceof Array) {
			let result = [];
			for (var value of src) {
				result.push(deepCopy(value));
			}
			return result;
		}
		else if (typeof src == "object") {
			let result = {};
			for (var key in src) {
				result[key] = deepCopy(src[key]);
			}
			return result;
		}
		else {
			return src;
		}
	}

	/**
	 * 修正数据
	 * @param 要修正的数据
	 * @param 参考数据
	 * @param 递归深度
	 */
	export function fixData(targetObj: any, fixObj: any, deepNum?: number) {
		//对象为undefined 直接覆盖对象
		if (targetObj == undefined) {
			return;
		}

		//类型不同放弃修复
		if (typeof targetObj != typeof fixObj) {
			return;
		}

		if (deepNum == undefined)
			deepNum = 0;
		for (let key in fixObj) {
			if (targetObj[key] === undefined) {
				targetObj[key] = fixObj[key];
			}
			else if (typeof targetObj[key] == "object") {
				fixData(targetObj[key], fixObj[key], deepNum + 1);
			}
		}
	}

	/**
	 * 用新对象覆盖原始对象，保留新对象全部特性
	 * @param srcObj 原始对象
	 * @param newObj 新对象
	 */
	export function coverObject(srcObj: any, newObj: any) {
		//对象为undefined 直接覆盖对象
		if (srcObj === undefined) {
			srcObj = newObj;
			return;
		}
		//类型不同直接覆盖对象
		if (typeof srcObj != typeof newObj) {
			return;
		}
		for (let key in newObj) {
			if (srcObj[key] === undefined) {
				srcObj[key] = newObj[key];
			}
			else if (typeof srcObj[key] == "object") {
				coverObject(srcObj[key], newObj[key]);
			}
			else {
				srcObj[key] = newObj[key];
			}
		}
		return;
	}

	/**
	 * 清楚对象数据到默认
	 */
	export function deepSetDefaultValue(src: any): any {

		if (src instanceof Array) {
			let result = [];
			for (var value of src) {
				result.push(deepSetDefaultValue(value));
			}
			return result;
		}
		else if (typeof src == "object") {
			let result = {};
			for (var key in src) {
				result[key] = deepSetDefaultValue(src[key]);
			}
			return result;
		}
		else if (typeof src == "number") {
			return src = 0;
		}
		else if (typeof src == "string") {
			return src = "";
		}
		else if (typeof src == "boolean") {
			return src = false;
		}
		else {
			return src;
		}
	}

	export type Nullable<T> = { [P in keyof T]: T[P] | null };

	export function createObj<T>(): T {
		let tmpData: any = {};
		let tmpDataA: Nullable<T> = tmpData;
		return tmpDataA;
	}

	export function __typeof__(objClass) {
		if (objClass && objClass.constructor) {
			var strFun = objClass.constructor.toString();
			var className = strFun.substr(0, strFun.indexOf('('));
			className = className.replace('function', '');
			return className.replace(/(^\s*)|(\s*$)/g, "");
		}
		return typeof (objClass);
	}

	/**
	 * trace
	 * @param [int] [count=10]
	 */
	export function trace(count = 10) {
		var caller = arguments.callee.caller;
		var i = 0;
		count = count || 10;
		while (caller && i < count) {
			xgame.openLog && console.log(caller.toString());
			caller = caller.caller;
			i++;
			xgame.openLog && console.log("***---------------------------------------- ** " + (i + 1));
		}
	}

	/**
	 * 随机enum中的一个值
	 * @param enumObj 
	 */
	export function randomEnum(enumObj: any) {
		let keys = Object.keys(enumObj);
		return keys[Math.floor(Math.random() * keys.length / 2)];
	}

	/**
	 * 遍历枚举
	 * @param enumObj 
	 */
	export function foreachEnum(enumObj: any, call: (enumKeyName: string, enumValue: string | number) => void) {
		for (let enumKey in enumObj) {
			let enumAnyKey: any = enumKey;
			if (isNaN(enumAnyKey)) {
				call(enumKey, enumObj[enumKey]);
			}
		}
	}
}