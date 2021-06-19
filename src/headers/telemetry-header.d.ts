/// <reference types="node" />
export declare const SIZE_IN_BYTES = 112;
export interface TelemetryHeaderProperties {
    version: number;
    status: number;
    tickRate: number;
    sessionInfoUpdate: number;
    sessionInfoLength: number;
    sessionInfoOffset: number;
    numVars: number;
    varHeaderOffset: number;
    numBuf: number;
    bufLen: number;
    bufOffset: number;
}
export declare class TelemetryHeader {
    readonly version: number;
    readonly status: number;
    readonly tickRate: number;
    readonly sessionInfoUpdate: number;
    readonly sessionInfoLength: number;
    readonly sessionInfoOffset: number;
    readonly numVars: number;
    readonly varHeaderOffset: number;
    readonly numBuf: number;
    readonly bufLen: number;
    readonly bufOffset: number;
    constructor(parts: number[]);
    static fromBuffer(buf: Buffer): TelemetryHeader;
}
