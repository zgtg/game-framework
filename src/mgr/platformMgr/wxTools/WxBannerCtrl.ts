namespace xgame {

    export interface BannerAdStyle {
        left?: number,
        top?: number,
        width?: number,
        height?: number
    }

    export class WxBannerCtrl {

        public static isLoad: boolean = false;

        private _rewardedBannerAd: BannerAd = undefined;

        _curKey: string = null;

        async showBannerAd(key: string, style: BannerAdStyle, adIntervals: number = 30): Promise<AdEventKey> {

            if (!key || !style) return;

            if (this._rewardedBannerAd && this._curKey != key) {
                this._rewardedBannerAd.destroy();
                this._rewardedBannerAd = wx.createBannerAd({
                    adUnitId: key,
                    style: style,
                    adIntervals: adIntervals
                })
            }
            if (!this._rewardedBannerAd) {
                this._rewardedBannerAd = wx.createBannerAd({
                    adUnitId: key,
                    style: style,
                    adIntervals: adIntervals
                })
            }
            this._curKey = key;

            this._rewardedBannerAd.onError((res: { errMsg: string, errCode: number }) => {
                console.log(`WxAdCtrl] : 广告Banner没有广告的错误${JSON.stringify(res)} key:${this._curKey}`);
            });

            this._rewardedBannerAd.onResize(res => {
                let size = cc.view.getFrameSize();
                let systemInfo = wx.getSystemInfoSync();
                let top = size.height - this._rewardedBannerAd.style.realHeight;
                if (systemInfo.model.indexOf("iPhone") != -1 && size.width / size.height < 0.48) {
                    top -= 25;
                }
                this._rewardedBannerAd.style.top = top;
                this._rewardedBannerAd.style.height = this._rewardedBannerAd.style.realHeight;
                console.log(this._rewardedBannerAd.style.width, this._rewardedBannerAd.style.height)
                console.log(this._rewardedBannerAd.style.realWidth, this._rewardedBannerAd.style.realHeight)
            })

            this._rewardedBannerAd.onLoad(() => {
                console.log(`banner 广告加载成功 key:${this._curKey}`);
            });

            return new Promise<any>((resolve, reject) => {
                this._rewardedBannerAd.show().then(() => {
                    // this.handleBIAdLog(xgame.AdEventKey.begin);
                    resolve(AdEventKey.playOver);
                }).catch(() => {
                    // this.handleBIAdLog(xgame.AdEventKey.noAd);
                    resolve(AdEventKey.noAd);
                });
            });
        }

        hideBannerAd() {
            if (this._rewardedBannerAd)
                this._rewardedBannerAd.hide();
        }

        //     值	说明	最低版本
        // 1000	后端接口调用失败	
        // 1001	参数错误	
        // 1002	广告单元无效	
        // 1003	内部错误	
        // 1004	无合适的广告	
        // 1005	广告组件审核中	
        // 1006	广告组件被驳回	
        // 1007	广告组件被封禁	
        // 1008	广告单元已关闭
        private onError(res: { errMsg: string, errCode: number }) {
            console.log(`WxAdCtrl] : 广告Banner没有广告的错误${JSON.stringify(res)}`);
        }

    }
}