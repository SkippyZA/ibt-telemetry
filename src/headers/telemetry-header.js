"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIZE_IN_BYTES = 112;
class TelemetryHeader {
    constructor(parts) {
        this.version = parts[0];
        this.status = parts[1];
        this.tickRate = parts[2];
        this.sessionInfoUpdate = parts[3];
        this.sessionInfoLength = parts[4];
        this.sessionInfoOffset = parts[5];
        this.numVars = parts[6];
        this.varHeaderOffset = parts[7];
        this.numBuf = parts[8];
        this.bufLen = parts[9];
        this.bufOffset = parts[13];
    }
    static fromBuffer(buf) {
        const telemetryPartsFromBuffer = (buffer, size = 4, start = 0, accum = []) => {
            const bufferLength = buffer.length;
            if (bufferLength % size !== 0) {
                throw new RangeError(`Buffer length must be a multiple of size. (buffer: ${bufferLength}, size: ${size})`);
            }
            if (start >= bufferLength) {
                return accum;
            }
            else {
                const a = buffer.slice(start, start + size).readInt32LE(0);
                return telemetryPartsFromBuffer(buffer, size, start + size, [...accum, a]);
            }
        };
        return new TelemetryHeader(telemetryPartsFromBuffer(buf));
    }
}
exports.TelemetryHeader = TelemetryHeader;
//# sourceMappingURL=telemetry-header.js.map