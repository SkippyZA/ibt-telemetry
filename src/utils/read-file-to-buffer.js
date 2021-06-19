"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function readFileToBuffer(fd, start, bufferLength) {
    return new Promise((resolve, reject) => {
        const buffer = Buffer.alloc(bufferLength);
        fs_1.read(fd, buffer, 0, bufferLength, start, (err) => {
            err ? reject(err) : resolve(buffer);
        });
    });
}
exports.readFileToBuffer = readFileToBuffer;
//# sourceMappingURL=read-file-to-buffer.js.map