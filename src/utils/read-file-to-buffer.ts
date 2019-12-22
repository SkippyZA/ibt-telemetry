import fs from 'fs'

// Read a file from the start position and return a buffer of the supplied length
export function readFileToBuffer (fd: number, start: number, bufferLength: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const buffer = Buffer.alloc(bufferLength)

    fs.read(fd, buffer, 0, bufferLength, start, (err) => {
      err ? reject(err) : resolve(buffer)
    })
  })
}
