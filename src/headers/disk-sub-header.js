const SIZE_IN_BYTES = 32

/**
 * Sub header used when writing telemetry to disk
 *
 * Total size: 32 bytes
 */
class DiskSubHeader {
  /**
   * DiskSubHeader constructor.
   *
   * params = {
   *  startDate,
   *  startTime,
   *  endTime,
   *  lapCount,
   *  recordCount
   * }
   */
  constructor (params) {
    Object.assign(this, params)
  }

  /**
   * Instantiate an instance of DiskSubHeader using the contents of the supplied buffer.
   */
  static fromBuffer (buffer) {
    return new DiskSubHeader({
      startDate: buffer.slice(0, 8).readFloatLE(),
      startTime: buffer.slice(8, 16).readDoubleLE(),
      endTime: buffer.slice(16, 24).readDoubleLE(),
      lapCount: buffer.slice(24, 28).readInt32LE(),
      recordCount: buffer.slice(28, 32).readInt32LE()
    })
  }
}

export { SIZE_IN_BYTES, DiskSubHeader }
export default DiskSubHeader
