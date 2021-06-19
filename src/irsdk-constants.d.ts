export interface IrsdkConstants {
    varType: {
        [key: string]: VarType;
    };
    irsdk_EngineWarnings: IrsdkEngineWarnings;
    irsdk_Flags: {
        [key: string]: number;
    };
    irsdk_TrkLoc: IrsdkTrkLOC;
    irsdk_TrkSurf: {
        [key: string]: number;
    };
    irsdk_SessionState: IrsdkSessionState;
    irsdk_CameraState: {
        [key: string]: number;
    };
    irsdk_PitSvFlags: IrsdkPitSvFlags;
    irsdk_CarLeftRight: IrsdkCarLeftRight;
    irsdk_PitSvStatus: IrsdkPitServiceStatus;
    irsdk_PaceMode: IrsdkPaceMode;
    irsdk_PaceFlags: IrsdkPaceFlags;
}
export interface IrsdkPaceMode {
    irsdk_PaceModeSingleFileStart: number;
    irsdk_PaceModeDoubleFileStart: number;
    irsdk_PaceModeSingleFileRestart: number;
    irsdk_PaceModeDoubleFileRestart: number;
    irsdk_PaceModeNotPacing: number;
}
export interface IrsdkPaceFlags {
    irsdk_PaceFlagsEndOfLine: number;
    irsdk_PaceFlagsFreePass: number;
    irsdk_PaceFlagsWavedAround: number;
}
export interface IrsdkPitServiceStatus {
    irsdk_PitSvNone: number;
    irsdk_PitSvInProgress: number;
    irsdk_PitSvComplete: number;
    irsdk_PitSvTooFarLeft: number;
    irsdk_PitSvTooFarRight: number;
    irsdk_PitSvTooFarForward: number;
    irsdk_PitSvTooFarBack: number;
    irsdk_PitSvBadAngle: number;
    irsdk_PitSvCantFixThat: number;
}
export interface IrsdkCarLeftRight {
    irsdk_LROff: number;
    irsdk_LRClear: number;
    irsdk_LRCarLeft: number;
    irsdk_LRCarRight: number;
    irsdk_LRCarLeftRight: number;
    irsdk_LR2CarsLeft: number;
    irsdk_LR2CarsRight: number;
}
export interface IrsdkEngineWarnings {
    irsdk_waterTempWarning: number;
    irsdk_fuelPressureWarning: number;
    irsdk_oilPressureWarning: number;
    irsdk_engineStalled: number;
    irsdk_pitSpeedLimiter: number;
    irsdk_revLimiterActive: number;
    irsdk_oilTempWarning: number;
}
export interface IrsdkPitSvFlags {
    irsdk_LFTireChange: number;
    irsdk_RFTireChange: number;
    irsdk_LRTireChange: number;
    irsdk_RRTireChange: number;
    irsdk_FuelFill: number;
    irsdk_WindshieldTearoff: number;
    irsdk_FastRepair: number;
}
export interface IrsdkSessionState {
    irsdk_StateInvalid: number;
    irsdk_StateGetInCar: number;
    irsdk_StateWarmup: number;
    irsdk_StateParadeLaps: number;
    irsdk_StateRacing: number;
    irsdk_StateCheckered: number;
    irsdk_StateCoolDown: number;
}
export interface IrsdkTrkLOC {
    irsdk_NotInWorld: number;
    irsdk_OffTrack: number;
    irsdk_InPitStall: number;
    irsdk_AproachingPits: number;
    irsdk_OnTrack: number;
}
export interface VarType {
    size: number;
    iracingType: string;
    jsBufferMethod: string;
}
export declare const constants: IrsdkConstants;
