import { open } from 'fs'
import { range } from 'ramda'
import { SIZE_IN_BYTES as HEADER_SIZE_IN_BYTES, TelemetryHeader } from '../headers/telemetry-header'
import { SIZE_IN_BYTES as DISK_SUB_HEADER_SIZE_IN_BYTES, DiskSubHeader } from '../headers/disk-sub-header'
import { SIZE_IN_BYTES as VAR_HEADER_SIZE_IN_BYTES, VarHeader } from '../headers/var-header'
import { readFileToBuffer } from '../utils/read-file-to-buffer'
import Telemetry from '../telemetry'

// Open the data file and return it's file descriptor as a promise
const openDataFile = (dataFile: string): Promise<number> => new Promise((resolve, reject) => {
  open(dataFile, 'r', (err, fd) => {
    err ? reject(err) : resolve(fd)
  })
})

// Return the Telemetry header from the supplied file descriptor
const telemetryHeaderFromFileDescriptor = async (fd: number): Promise<TelemetryHeader> =>
  readFileToBuffer(fd, 0, HEADER_SIZE_IN_BYTES)
    .then(TelemetryHeader.fromBuffer)

// Disk sub header telemetry
const diskSubHeaderFromFileDescriptor = async (fd: number): Promise<DiskSubHeader> =>
  readFileToBuffer(fd, DISK_SUB_HEADER_SIZE_IN_BYTES, HEADER_SIZE_IN_BYTES)
    .then(DiskSubHeader.fromBuffer)

const sessionInfoStringFromFileDescriptor = async (fd: number, telemetryHeader: TelemetryHeader): Promise<string> =>
  readFileToBuffer(fd, telemetryHeader.sessionInfoOffset, telemetryHeader.sessionInfoLength)
    .then(x => x.toString('ascii'))

const varHeadersFromFileDescriptor = async (fd: number, telemetryHeader: TelemetryHeader): Promise<VarHeader[]> => {
  const numberOfVariables = telemetryHeader.numVars
  const startPosition = telemetryHeader.varHeaderOffset
  const fullBufferSize = numberOfVariables * VAR_HEADER_SIZE_IN_BYTES

  return readFileToBuffer(fd, startPosition, fullBufferSize)
    .then(buffer => {
      return range(0, numberOfVariables).map(count => {
        const start = count * VAR_HEADER_SIZE_IN_BYTES
        const end = start + VAR_HEADER_SIZE_IN_BYTES
        return VarHeader.fromBuffer(buffer.slice(start, end))
      })
    })
}

export async function telemetryFileLoader (file: string): Promise<Telemetry> {
  const fd = await openDataFile(file)

  const resolvedHeaders = await Promise.all([
    telemetryHeaderFromFileDescriptor(fd),
    diskSubHeaderFromFileDescriptor(fd)
  ])
  const telemetryHeader = resolvedHeaders[0] as TelemetryHeader
  const diskSubHeader = resolvedHeaders[1] as DiskSubHeader

  const [ sessionInfo, varHeaders ]: [ string, VarHeader[] ] = await Promise.all([
    sessionInfoStringFromFileDescriptor(fd, telemetryHeader),
    varHeadersFromFileDescriptor(fd, telemetryHeader)
  ])

  return new Telemetry(telemetryHeader, diskSubHeader, sessionInfo, varHeaders, fd)
}

