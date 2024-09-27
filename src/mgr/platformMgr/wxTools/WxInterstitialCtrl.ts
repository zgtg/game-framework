namespace xgame {

    export interface BannerAdStyle {
        left?: number,
        top?: number,
        width?: number,
        height?: number
    }

    export class WxInterstitialCtrl {

        _curKey: string = null;

        private _insertAd: InterstitialAd = null;

        async showInterstitialAd(key: string): Promise<AdEventKey> {

            return new Promise<AdEventKey>(async (resolve, reject) => {
                if (!key) {
                    resolve(AdEventKey.noInit);
                }
                let result = await this.init(key);
                if (result) {
                    let onInterstitialClose = () => {
                        console.log("插屏广告展示");
                        this._insertAd.offClose(onInterstitialClose);
                        resolve(AdEventKey.playOver);
                    }
                    if (this._insertAd) {
                        this._insertAd.onClose(onInterstitialClose);
                        this._insertAd.show().then(() => {

                        }).catch((res) => {
                            xgame.openLog && console.error(`插屏广告错误码=>${res.errCode}------插屏广告显示失败错误信息=>${res.errMsg}------广告id${key}`);
                            resolve(AdEventKey.noAd);
                        });
                    }

                } else {
                    resolve(AdEventKey.noAd);
                }

            });
        }


        init(key: string): Promise<boolean> {
            return new Promise<boolean>((resolve, reject) => {

                let onInterstitialLoad = () => {
                    console.log("插屏广告加载成功");
                    resolve(true);
                }

                let onInterstitialError = (res) => {
                    console.log("插屏广告展示错误");
                    xgame.openLog && console.error(`插屏广告错误码=>${res.errCode}------插屏广告显示失败错误信息=>${res.errMsg}------广告id${key}`);
                    resolve(false);
                }

                if (this._insertAd) {
                    this._insertAd.offError(onInterstitialError);
                    this._insertAd.offLoad(onInterstitialLoad);
                    this._insertAd.destroy();
                }
                this._insertAd = wx.createInterstitialAd({
                    adUnitId: key
                });
                this._curKey = key;
                this._insertAd.onLoad(onInterstitialLoad);
                this._insertAd.onError(onInterstitialError);

                this._insertAd.load();

            })



        }
    }
}