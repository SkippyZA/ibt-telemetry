/// <reference types="node" />
export declare const SIZE_IN_BYTES = 32;
export interface DiskSubHeaderProperties {
    startDate: number;
    startTime: number;
    endTime: number;
    lapCount: number;
    recordCount: number;
}
export declare class DiskSubHeader {
    constructor(params: DiskSubHeaderProperties);
    static fromBuffer(buffer: Buffer): DiskSubHeader;
}
