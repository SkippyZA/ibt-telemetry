const SIZE_IN_BYTES = 144

/**
 *
 * Total size: 144 bytes
 */
class VarHeader {
  /**
   * Construct an instance of VarHeader
   *
   * params = {
   *   type,
   *   offset,
   *   count,
   *   countAsTime,
   *   name,
   *   description,
   *   unit
   * }
   */
  constructor (params) {
    Object.assign(this, params)
  }

  /**
   * Instantiate VarHeader from the contents of the supplied buffer
   */
  static fromBuffer (buffer) {
    if (buffer.length !== SIZE_IN_BYTES) {
      throw new RangeError(`Buffer length for VarHeader needs to be ${SIZE_IN_BYTES}, supplied ${buffer.length}`)
    }

    return new VarHeader({
      type: buffer.slice(0, 4).readInt32LE(),
      offset: buffer.slice(4, 8).readInt32LE(),
      count: buffer.slice(8, 12).readInt32LE(),
      countAsTime: buffer.slice(12, 13).readInt8(),
      // padding here, 16 byte align (3 bytes)
      name: buffer.slice(16, 48).toString().replace(/\0/g, ''),
      description: buffer.slice(48, 112).toString().replace(/\0/g, ''),
      unit: buffer.slice(112, 144).toString().replace(/\0/g, '')
    })
  }
}

export { SIZE_IN_BYTES, VarHeader }
export default VarHeader
