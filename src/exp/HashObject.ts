namespace xgame {
    export class HashObject implements IHashObject {
        private _hashCode: number = null;
        public get hashCode() {
            return this._hashCode;
        }
        public constructor() {
            this._hashCode = xgame.MathTools.getHashCode();
        }
    }

    export interface IHashObject {
        hashCode: number;
    }
}