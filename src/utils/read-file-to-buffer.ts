import fs from 'fs'

// Read a file from the start position and return a buffer of the supplied length
const readFileToBuffer = (fd, startPosition, bufferLength) => new Promise((resolve, reject) => {
  const buffer = Buffer.alloc(bufferLength)
  fs.read(fd, buffer, 0, bufferLength, startPosition, (err, num) => {
    err ? reject(err) : resolve(buffer)
  })
})

export default readFileToBuffer
