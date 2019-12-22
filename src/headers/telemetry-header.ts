export const SIZE_IN_BYTES = 112

export interface TelemetryHeaderProperties {
  version: number
  status: number
  tickRate: number

  sessionInfoUpdate: number
  sessionInfoLength: number
  sessionInfoOffset: number

  numVars: number
  varHeaderOffset: number

  numBuf: number
  bufLen: number
  bufOffset: number
}

/**
 * iRacing Telemtry Header
 *
 * Total Size: 112 bytes
 */
export class TelemetryHeader {
  public readonly version: number
  public readonly status: number
  public readonly tickRate: number

  public readonly sessionInfoUpdate: number
  public readonly sessionInfoLength: number
  public readonly sessionInfoOffset: number

  public readonly numVars: number
  public readonly varHeaderOffset: number

  public readonly numBuf: number
  public readonly bufLen: number
  public readonly bufOffset: number

  constructor (parts: Buffer) {
    this.version = parts[0]
    this.status = parts[1]
    this.tickRate = parts[2]

    this.sessionInfoUpdate = parts[3]
    this.sessionInfoLength = parts[4]
    this.sessionInfoOffset = parts[5]

    this.numVars = parts[6]
    this.varHeaderOffset = parts[7]

    this.numBuf = parts[8]
    this.bufLen = parts[9]
    this.bufOffset = parts[13]
  }

  /**
   * Create an instance of TelemetryHeader from the contents of a buffer.
   */
  static fromBuffer (buf: Buffer): TelemetryHeader {
    const telemetryPartsFromBuffer = (buffer: Buffer, size = 4, start = 0, accum = []) => {
      const bufferLength = buffer.length

      if (bufferLength % size !== 0) {
        throw new RangeError(`Buffer length must be a multiple of size. (buffer: ${bufferLength}, size: ${size})`)
      }

      if (start >= bufferLength) {
        return accum
      } else {
        const a = buffer.slice(start, start + size).readInt32LE(0)
        return telemetryPartsFromBuffer(buffer, size, start + size, [ ...accum, a ])
      }
    }

    return new TelemetryHeader(telemetryPartsFromBuffer(buf))
  }
}
