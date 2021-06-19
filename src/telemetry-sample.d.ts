/// <reference types="node" />
import { VarHeader } from './headers/var-header';
export declare class TelemetrySample {
    private buff;
    private varHeaders;
    constructor(buff: Buffer, varHeaders: VarHeader[]);
    getParam(sampleVariableName: string): {
        name: string;
        description: string;
        value: any;
        unit: string;
    } | null;
    toJSON(): {};
}
