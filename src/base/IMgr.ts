namespace xgame {
    export interface IMgr extends IXGameBase {
        isFinish: boolean;
        onUpdate(dt: XGameUpdateData): void;
        start(): void;

    }
}