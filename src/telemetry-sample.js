"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const irsdk_constants_1 = require("./irsdk-constants");
const ramda_1 = require("ramda");
class TelemetrySample {
    constructor(buff, varHeaders) {
        this.buff = buff;
        this.varHeaders = varHeaders;
    }
    getParam(sampleVariableName) {
        const header = this.varHeaders
            .find(h => h.name.toLowerCase() === sampleVariableName.toLowerCase());
        if (!header) {
            return null;
        }
        const variable = irsdk_constants_1.constants.varType[header.type];
        const valueBuffer = this.buff.slice(header.offset, header.offset + variable.size);
        return {
            name: header.name,
            description: header.description,
            value: valueBuffer[variable.jsBufferMethod](),
            unit: header.unit
        };
    }
    toJSON() {
        const getParam = (x) => this.getParam(x);
        const getName = (x) => x.name;
        const valueFromHeader = ramda_1.compose(ramda_1.pick(['value', 'unit']), getParam, getName);
        return this.varHeaders
            .reduce((accum, header) => ramda_1.assoc(getName(header), valueFromHeader(header), accum), {});
    }
}
exports.TelemetrySample = TelemetrySample;
//# sourceMappingURL=telemetry-sample.js.map