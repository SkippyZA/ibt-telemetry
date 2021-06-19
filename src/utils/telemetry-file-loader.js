"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const ramda_1 = require("ramda");
const telemetry_header_1 = require("../headers/telemetry-header");
const disk_sub_header_1 = require("../headers/disk-sub-header");
const var_header_1 = require("../headers/var-header");
const read_file_to_buffer_1 = require("../utils/read-file-to-buffer");
const telemetry_1 = require("../telemetry");
const openDataFile = (dataFile) => new Promise((resolve, reject) => {
    fs_1.open(dataFile, 'r', (err, fd) => {
        err ? reject(err) : resolve(fd);
    });
});
const telemetryHeaderFromFileDescriptor = async (fd) => read_file_to_buffer_1.readFileToBuffer(fd, 0, telemetry_header_1.SIZE_IN_BYTES)
    .then(telemetry_header_1.TelemetryHeader.fromBuffer);
const diskSubHeaderFromFileDescriptor = async (fd) => read_file_to_buffer_1.readFileToBuffer(fd, disk_sub_header_1.SIZE_IN_BYTES, telemetry_header_1.SIZE_IN_BYTES)
    .then(disk_sub_header_1.DiskSubHeader.fromBuffer);
const sessionInfoStringFromFileDescriptor = async (fd, telemetryHeader) => read_file_to_buffer_1.readFileToBuffer(fd, telemetryHeader.sessionInfoOffset, telemetryHeader.sessionInfoLength)
    .then(x => x.toString('ascii'));
const varHeadersFromFileDescriptor = async (fd, telemetryHeader) => {
    const numberOfVariables = telemetryHeader.numVars;
    const startPosition = telemetryHeader.varHeaderOffset;
    const fullBufferSize = numberOfVariables * var_header_1.SIZE_IN_BYTES;
    return read_file_to_buffer_1.readFileToBuffer(fd, startPosition, fullBufferSize)
        .then(buffer => {
        return ramda_1.range(0, numberOfVariables).map(count => {
            const start = count * var_header_1.SIZE_IN_BYTES;
            const end = start + var_header_1.SIZE_IN_BYTES;
            return var_header_1.VarHeader.fromBuffer(buffer.slice(start, end));
        });
    });
};
async function telemetryFileLoader(file) {
    const fd = await openDataFile(file);
    const resolvedHeaders = await Promise.all([
        telemetryHeaderFromFileDescriptor(fd),
        diskSubHeaderFromFileDescriptor(fd)
    ]);
    const telemetryHeader = resolvedHeaders[0];
    const diskSubHeader = resolvedHeaders[1];
    const [sessionInfo, varHeaders] = await Promise.all([
        sessionInfoStringFromFileDescriptor(fd, telemetryHeader),
        varHeadersFromFileDescriptor(fd, telemetryHeader)
    ]);
    return new telemetry_1.Telemetry(telemetryHeader, diskSubHeader, sessionInfo, varHeaders, fd);
}
exports.telemetryFileLoader = telemetryFileLoader;
//# sourceMappingURL=telemetry-file-loader.js.map