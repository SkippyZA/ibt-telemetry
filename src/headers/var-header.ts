export const SIZE_IN_BYTES = 144

export interface VarHeaderProperties {
  type: number
  offset: number
  count: number
  countAsTime: number
  // padding here, 16 byte align (3 bytes)
  name: string
  description: string
  unit: string
}

/**
 *
 * Total size: 144 bytes
 */
export class VarHeader implements VarHeaderProperties {
  public readonly type: number
  public readonly offset: number
  public readonly count: number
  public readonly countAsTime: number
  public readonly name: string
  public readonly description: string
  public readonly unit: string

  /**
   * Construct an instance of VarHeader
   */
  constructor (params: VarHeaderProperties) {
    Object.assign(this, params)
  }

  /**
   * Instantiate VarHeader from the contents of the supplied buffer
   */
  static fromBuffer (buffer: Buffer): VarHeader {
    if (buffer.length !== SIZE_IN_BYTES) {
      throw new RangeError(`Buffer length for VarHeader needs to be ${SIZE_IN_BYTES}, supplied ${buffer.length}`)
    }

    return new VarHeader({
      type: buffer.slice(0, 4).readInt32LE(0),
      offset: buffer.slice(4, 8).readInt32LE(0),
      count: buffer.slice(8, 12).readInt32LE(0),
      countAsTime: buffer.slice(12, 13).readInt8(0),
      // padding here, 16 byte align (3 bytes)
      name: buffer.slice(16, 48).toString().replace(/\0/g, ''),
      description: buffer.slice(48, 112).toString().replace(/\0/g, ''),
      unit: buffer.slice(112, 144).toString().replace(/\0/g, '')
    })
  }
}
