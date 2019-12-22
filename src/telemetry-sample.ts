import { IrsdkConstants } from './irsdk-constants'
import { prop, compose, pick, assoc } from 'ramda'
import { VarHeader } from './headers/var-header'

export class TelemetrySample {
  constructor (private buff: Buffer, private varHeaders: VarHeader[]) {}

  getParam (sampleVariableName: string) {
    const header = this.varHeaders
      .find(h => h.name.toLowerCase() === sampleVariableName.toLowerCase())

    if (!header) {
      return null
    }

    const variable = IrsdkConstants.varType[header.type]
    const valueBuffer = this.buff.slice(header.offset, header.offset + variable.size)

    return {
      name: header.name,
      description: header.description,
      value: valueBuffer[variable.jsBufferMethod](),
      unit: header.unit
    }
  }

  toJSON () {
    const getParam = x => this.getParam(x)
    const getName = prop('name')
    const valueFromHeader = compose(pick([ 'value', 'unit' ]), getParam, getName)

    return this.varHeaders
      .reduce((accum, header) => assoc(getName(header), valueFromHeader(header), accum), {})
  }
}
