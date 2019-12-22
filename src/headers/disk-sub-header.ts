export const SIZE_IN_BYTES = 32

export interface DiskSubHeaderProperties {
  startDate: number
  startTime: number
  endTime: number
  lapCount: number
  recordCount: number
}

/**
 * Sub header used when writing telemetry to disk
 *
 * Total size: 32 bytes
 */
export class DiskSubHeader {
  /**
   * DiskSubHeader constructor.
   */
  constructor (params: DiskSubHeaderProperties) {
    Object.assign(this, params)
  }

  /**
   * Instantiate an instance of DiskSubHeader using the contents of the supplied buffer.
   */
  static fromBuffer (buffer: Buffer): DiskSubHeader {
    return new DiskSubHeader({
      startDate: buffer.slice(0, 8).readFloatLE(0),
      startTime: buffer.slice(8, 16).readDoubleLE(0),
      endTime: buffer.slice(16, 24).readDoubleLE(0),
      lapCount: buffer.slice(24, 28).readInt32LE(0),
      recordCount: buffer.slice(28, 32).readInt32LE(0)
    })
  }
}
