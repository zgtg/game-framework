// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

namespace xgame {

    export class RefCountStateHelper<T, K> extends MultipleStateHelper<T, K> {


        //持有状态对象
        protected _statsDict: { [key: number]: { [hashCode: number]: boolean } } = {};

        public activeState(state: number): number | boolean {
            super.activeState(state);
            let hascode = xgame.MathTools.getHashCode();
            this._statsDict[state] = this._statsDict[state] || {};
            this._statsDict[state][hascode] = true;
            return hascode;
        }

        public cancelState(state: number, serialID?: number): boolean {
            if (this._statsDict[state]?.hasOwnProperty(serialID)) {
                delete this._statsDict[state][serialID];
                //console.log("onStartExecute---cancelState ");
                if (Object.keys(this._statsDict[state]).length == 0) {
                    delete this._statsDict[state];
                    //console.log("onStartExecute---cancelState true");
                    return super.cancelState(state);
                }
            }
            return false;
        }
    }


}




