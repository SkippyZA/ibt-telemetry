import { TelemetrySample } from './telemetry-sample';
import { TelemetryHeader } from './headers/telemetry-header';
import { DiskSubHeader } from './headers/disk-sub-header';
import { VarHeader } from './headers/var-header';
export declare class Telemetry {
    readonly telemetryHeader: TelemetryHeader;
    readonly diskSubHeader: DiskSubHeader;
    readonly sessionInfoYaml: string;
    readonly varHeaders: VarHeader[];
    private fd;
    private sessionInfo;
    constructor(telemetryHeader: TelemetryHeader, diskSubHeader: DiskSubHeader, sessionInfoYaml: string, varHeaders: VarHeader[], fd: number);
    static fromFile(file: string): Promise<Telemetry>;
    uniqueId(): string;
    samples(): Generator<TelemetrySample, void, unknown>;
}
