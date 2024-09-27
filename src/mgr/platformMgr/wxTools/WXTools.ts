namespace xgame.WXTools {

	//渲染目标类型
	export enum EnumRenderType {
		//普通排行榜
		normalRank = 1,
		//单曲排行榜
		singleMusicRank,
		//战斗中超越好友item
		battlePassItem,
	}

	export enum WxOpenContentCom {
		showRank,
		nextRank,
		lastRank,
		beyondFriendRank,
		close
	}

	export interface IMainContentData {
		command: WxOpenContentCom,
		x?: number,
		y?: number,
		w?: number,
		h?: number,
		dataKey?: string,
		shareTicket?: string,
		//当前分数
		curScore?: number,
		//数据版本号
		versionCode?: number,
		//社交关系
		socialType?: number,
		//榜单模式
		rankMode?: number,
	}

	let isDebug: boolean = false;

	export interface WXAnyncResult {
		sucess?: boolean,
		info?: string,
	}

	/**读取文件结果 */
	export interface WXDownLoadFileResult extends WXAnyncResult {
		nativePath: string,
	}

	/**检查版本文件信息 */
	export async function wxDownloadFile(url: string): Promise<WXDownLoadFileResult> {
		let WXFS = wx.getFileSystemManager();
		//xgame.openLog && console.log("[wxDownloadFile] - 版本文件url地址 : " + url);
		return new Promise<WXDownLoadFileResult>((resolve, reject) => {
			wx.downloadFile({
				url: url,
				success: (res: { statusCode: number, tempFilePath: string }) => {
					if (res.statusCode >= 400) {
						try {
							WXFS.accessSync(res.tempFilePath);
							WXFS.unlinkSync(res.tempFilePath);
						} catch (e) {
						}
						let err = `[wxDownloadFile] - wxDownloadFile下载完成，statusCode 异常 : ${url} res : ${JSON.stringify(res)}`;
						xgame.openLog && console.error(err);
						resolve({ sucess: false, nativePath: err, info: err })
					}
					else {
						let info = "[wxDownloadFile] - wxDownloadFile下载成功 : " + JSON.stringify(res);
						// xgame.openLog && console.log(info);
						resolve({ sucess: true, nativePath: res.tempFilePath, info: info });
					}
				},
				fail: (err) => {
					let errInfo = `[wxDownloadFile] - 文件下载失败:${url} info:${JSON.stringify(err)}`;
					resolve({ sucess: false, nativePath: errInfo, info: errInfo })
				},
				complete: (result) => {
					// xgame.openLog && console.log(`[wxDownloadFile] - 下载事件完成:${url} info:${JSON.stringify(result)}`);
				}
			})
		})
	}

	/**读取文件结果 */
	export interface WXReadFileResult extends WXAnyncResult {
		data: any,
	}

	/**检查版本文件信息 */
	export async function wxReadFile(filePath: string, encoding: string): Promise<WXReadFileResult> {
		let WXFS = wx.getFileSystemManager();
		xgame.openLog && console.log("[wxReadFile] - 读取文件 : " + filePath);

		try {
			WXFS.accessSync(filePath)
		}
		catch (e) {
			return new Promise<WXReadFileResult>((resolve, reject) => {
				resolve({ sucess: false, data: e, info: JSON.stringify(e) })
			})
		}

		return new Promise<WXReadFileResult>((resolve, reject) => {
			WXFS.readFile({
				filePath: filePath,
				encoding: encoding,//'utf-8'
				success: (res) => {
					if (res.data != null) {
						resolve({ sucess: true, data: res.data, info: JSON.stringify(res) });
						xgame.openLog && console.log("[wxReadFile] - 读取文件成功");
					}
					else {
						let err = "读取异常:数据为空";
						xgame.openLog && console.error("[wxReadFile] - 读取异常 : " + err);
						resolve({ sucess: false, data: err, info: err })
					}
				},
				fail: (err) => {
					let errInfo = "[wxReadFile] - 读取文件失败 : " + JSON.stringify(err);
					xgame.openLog && console.error(errInfo);
					resolve({ sucess: false, data: errInfo, info: errInfo })
				},
				complete: (readCom) => {
				},
			})
		})
	}

	/**检查版本文件信息 */
	export async function wxWriteFile(filePath: string, data: string | ArrayBuffer, encoding: string): Promise<WXAnyncResult> {
		let WXFS = wx.getFileSystemManager();
		// xgame.openLog && console.log("[wxWriteFile] - 写入文件 : " + filePath);
		try {
			WXFS.accessSync(filePath);
			//文件存在就删除
			WXFS.unlinkSync(filePath);
		}
		catch (e) {
		}

		return new Promise<WXAnyncResult>((resolve, reject) => {
			WXFS.writeFile({
				filePath: filePath,
				data: data,
				encoding: encoding,//'utf-8'
				success: (res) => {
					// //xgame.openLog && console.log("[wxWriteFile] - 写入文件成功 : " + JSON.stringify(res));
					resolve({ sucess: true, info: JSON.stringify(res) });
				},
				fail: (err) => {
					let errInfo = "[wxWriteFile] - 写入文件失败 : " + JSON.stringify(err);
					xgame.openLog && console.error(errInfo);
					resolve({ sucess: false, info: errInfo })
				},
				complete: (readCom) => {
					//xgame.openLog && console.log("[wxWriteFile] - 写入完成:" + filePath);
				},
			})
		})
	}

	/**读取文件结果 */
	export interface WXUnZipFileResult extends WXAnyncResult {
		data: any,
	}

	/**检查版本文件信息 */
	export async function wxUnZipFile(zipFilePath: string, targetPath: string): Promise<WXUnZipFileResult> {
		let WXFS = wx.getFileSystemManager();
		// xgame.openLog && console.log("[wxUnZipFile] - 解压文件 : " + zipFilePath);

		try {
			WXFS.accessSync(zipFilePath)
		}
		catch (e) {
			return new Promise<WXUnZipFileResult>((resolve, reject) => {
				xgame.openLog && console.error("[wxUnZipFile] - 本地不存在文件:" + zipFilePath);
				resolve({ sucess: false, data: e, info: "本地不存在文件:" + zipFilePath })
			})
		}

		return new Promise<WXUnZipFileResult>((resolve, reject) => {
			// xgame.openLog && console.log("[wxUnZipFile] - 解压到 : " + targetPath);
			try {
				WXFS.accessSync(zipFilePath);
			} catch (e) {
				//xgame.openLog && console.error(`要解压的文件不存在 path:${zipFilePath} err:${JSON.stringify(e)}`);
				return { sucess: false, data: "", info: JSON.stringify(e) };
			}
			WXFS.unzip({
				zipFilePath: zipFilePath,
				targetPath: targetPath,
				success: (res) => {
					xgame.openLog && console.log("[wxUnZipFile] - 解压文件成功 : " + JSON.stringify(res));
					resolve({ sucess: true, data: res.data, info: JSON.stringify(res) });
				},
				fail: (err) => {
					let errInfo = "[wxUnZipFile] - 解压文件失败 : " + err.errMsg;
					xgame.openLog && console.error(errInfo);
					resolve({ sucess: false, data: errInfo, info: errInfo })
				},
				complete: (readCom) => {
					xgame.openLog && console.log(`[wxUnZipFile] - 解压文件完成 : url->${zipFilePath} ${JSON.stringify(readCom)}`);
				},
			});
			return null;
		})
	}

	export async function wxCreateFullPath(root: string, path: string): Promise<WXAnyncResult> {
		// xgame.openLog && console.log(`[wxCreateFullPath] - path:${path}`);
		if (!path || path == '')
			return { sucess: false, info: `[wxCreateFullPath] - 创建路径失败 : "${path}"` };
		if (path.indexOf('/') == -1 && path.indexOf('.') != -1)
			return { sucess: false, info: `[wxCreateFullPath] - 无需创建路径 : "${path}"` };

		let pathArr = path.split('/');
		// xgame.openLog && console.log(`[wxCreateFullPath] - 路径:${pathArr}`);
		if (pathArr.length != 0 && pathArr[pathArr.length - 1].indexOf('.') != -1)
			pathArr.splice(pathArr.length - 1, 1);
		// xgame.openLog && console.log(`[wxCreateFullPath] - 要生成的路径:${pathArr}`);
		let curAddPath = "";
		for (var dirPath of pathArr) {
			curAddPath += (dirPath + "/");
			let result = await wxCreateDir(root + curAddPath);
		}
		return { sucess: true, info: `[wxCreateFullPath] - 创建路径完毕 : "${path}"` };
	}

	export async function wxCreateDir(path: string): Promise<WXAnyncResult> {
		let WXFS = wx.getFileSystemManager();
		return new Promise<WXAnyncResult>((resolve, reject) => {
			let isCreate = true;
			try {
				WXFS.accessSync(path);
				isCreate = false;
				// console.warn(`[wxCreateDir] - 文件已存在无需生成 path:${path}`);
			} catch (err) { }
			if (isCreate) {
				WXFS.mkdir({
					dirPath: path, success: (res: any) => {
						let tmpResult = `[wxCreatePath] - [wxCreatePath] - 成功 - 生成目标文件夹: ${path}`;
						// xgame.openLog && console.log(tmpResult);
						resolve({ sucess: true, info: tmpResult + JSON.stringify(res) });
					}, fail: (res: any) => {
						let tmpResult = `[wxCreatePath] - 失败 - 生成目标文件夹: ${path}`;
						xgame.openLog && console.error(tmpResult);
						resolve({ sucess: false, info: tmpResult + JSON.stringify(res) });
					}, complete: (res: any) => { }
				});
			}
			else {
				resolve({ sucess: true, info: "文件已存在无需生成:" + path });
			}
		})
	}

	/**删除本地缓存文件夹 */
	export async function wxRemovePath(path: string): Promise<WXAnyncResult> {
		let WXFS = wx.getFileSystemManager();
		return new Promise<WXAnyncResult>((resolve, reject) => {
			try {
				WXFS.accessSync(path);
			} catch (e) {
				// xgame.openLog && console.error('[wxRemoveUserDir] - 要删除的文件夹');
				resolve({ sucess: true, info: JSON.stringify(e) });
				return;
			}
			//删除文件
			walkFile(path, (file) => {
				WXFS.unlinkSync(file);
				// xgame.openLog && console.error(`[wxRemoveUserDir] - 删除文件 : ${file}`);
			});
			//删除文件夹
			walkDir(path, (dir) => {
				WXFS.rmdirSync(dir);
				// xgame.openLog && console.error(`[wxRemoveUserDir] - 删除文件夹 : ${dir}`);

			});
			resolve({ sucess: true, info: `[wxRemovePath] - 清除路径下所有文件: ${path}` });
		})
	}


	function walkFile(dirname, callback) {
		const files = wx.getFileSystemManager().readdirSync(dirname)
		for (let f of files) {
			const file = dirname + "/" + f;
			const stat = wx.getFileSystemManager().statSync(file);
			if (stat.isDirectory()) {
				walkFile(file, callback);
			} else {
				callback(file)
			}
		}
	}

	function walkDir(dirname, callback) {
		const files = wx.getFileSystemManager().readdirSync(dirname)
		for (let f of files) {
			const file = dirname + "/" + f;
			const stat = wx.getFileSystemManager().statSync(file);
			if (stat.isDirectory()) {
				walkDir(file, callback);
				callback(file)
			}
		}
	}

	/**
	 * 获取授权 AuthSetting
	 * @param key 授权的Key
	 */
	export function getSetting(scope: string): Promise<boolean> {
		return new Promise<boolean>(function (resolve, reject) {
			// 查看是否授权
			wx.getSetting(
				{
					complete(res) {
						resolve(res.authSetting[scope]);
					}
				})
		});
	}

	/**
	 * 获取授权
	 * scope.userInfo	wx.getUserInfo	用户信息
	 * scope.userLocation	wx.getLocation	地理位置
	 * scope.werun	wx.getWeRunData	微信运动步数
	 * scope.writePhotosAlbum
	 * @param scope 授权的Key
	 */
	export function authorize(scope: string): Promise<boolean> {
		return new Promise<boolean>(function (resolve, reject) {
			// 查看是否授权
			wx.authorize(
				{
					scope: scope,
					success(res) {
						resolve(true);
					},
					fail(res) {
						resolve(false);
					}
				})
		});
	}
}
