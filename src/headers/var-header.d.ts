/// <reference types="node" />
export declare const SIZE_IN_BYTES = 144;
export interface VarHeaderProperties {
    type: number;
    offset: number;
    count: number;
    countAsTime: number;
    name: string;
    description: string;
    unit: string;
}
export declare class VarHeader implements VarHeaderProperties {
    readonly type: number;
    readonly offset: number;
    readonly count: number;
    readonly countAsTime: number;
    readonly name: string;
    readonly description: string;
    readonly unit: string;
    constructor(params: VarHeaderProperties);
    static fromBuffer(buffer: Buffer): VarHeader;
}
