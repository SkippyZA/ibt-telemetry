"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIZE_IN_BYTES = 32;
class DiskSubHeader {
    constructor(params) {
        Object.assign(this, params);
    }
    static fromBuffer(buffer) {
        return new DiskSubHeader({
            startDate: buffer.slice(0, 8).readFloatLE(0),
            startTime: buffer.slice(8, 16).readDoubleLE(0),
            endTime: buffer.slice(16, 24).readDoubleLE(0),
            lapCount: buffer.slice(24, 28).readInt32LE(0),
            recordCount: buffer.slice(28, 32).readInt32LE(0)
        });
    }
}
exports.DiskSubHeader = DiskSubHeader;
//# sourceMappingURL=disk-sub-header.js.map