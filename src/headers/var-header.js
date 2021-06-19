"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIZE_IN_BYTES = 144;
class VarHeader {
    constructor(params) {
        Object.assign(this, params);
    }
    static fromBuffer(buffer) {
        if (buffer.length !== exports.SIZE_IN_BYTES) {
            throw new RangeError(`Buffer length for VarHeader needs to be ${exports.SIZE_IN_BYTES}, supplied ${buffer.length}`);
        }
        return new VarHeader({
            type: buffer.slice(0, 4).readInt32LE(0),
            offset: buffer.slice(4, 8).readInt32LE(0),
            count: buffer.slice(8, 12).readInt32LE(0),
            countAsTime: buffer.slice(12, 13).readInt8(0),
            name: buffer.slice(16, 48).toString().replace(/\0/g, ''),
            description: buffer.slice(48, 112).toString().replace(/\0/g, ''),
            unit: buffer.slice(112, 144).toString().replace(/\0/g, '')
        });
    }
}
exports.VarHeader = VarHeader;
//# sourceMappingURL=var-header.js.map