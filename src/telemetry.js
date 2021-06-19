"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const js_yaml_1 = require("js-yaml");
const telemetry_sample_1 = require("./telemetry-sample");
const telemetry_file_loader_1 = require("./utils/telemetry-file-loader");
class Telemetry {
    constructor(telemetryHeader, diskSubHeader, sessionInfoYaml, varHeaders, fd) {
        this.telemetryHeader = telemetryHeader;
        this.diskSubHeader = diskSubHeader;
        this.sessionInfoYaml = sessionInfoYaml;
        this.varHeaders = varHeaders;
        this.fd = fd;
        this.sessionInfo = js_yaml_1.safeLoad(sessionInfoYaml);
    }
    static fromFile(file) {
        return telemetry_file_loader_1.telemetryFileLoader(file);
    }
    uniqueId() {
        const accountId = this.sessionInfo.DriverInfo.Drivers[this.sessionInfo.DriverInfo.DriverCarIdx].UserID;
        const sessionId = this.sessionInfo.WeekendInfo.SessionID;
        const subSessionId = this.sessionInfo.WeekendInfo.SubSessionID;
        return `${accountId}-${sessionId}-${subSessionId}`;
    }
    *samples() {
        let hasSample = true;
        let count = 0;
        const length = this.telemetryHeader.bufLen;
        const buffer = Buffer.alloc(length);
        while (hasSample) {
            const start = this.telemetryHeader.bufOffset + (count++ * length);
            const bytesRead = fs_1.readSync(this.fd, buffer, 0, length, start);
            if (bytesRead !== length) {
                hasSample = false;
            }
            else {
                yield new telemetry_sample_1.TelemetrySample(buffer, this.varHeaders);
            }
        }
    }
}
exports.Telemetry = Telemetry;
//# sourceMappingURL=telemetry.js.map