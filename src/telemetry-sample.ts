import { constants as IrsdkConstants } from './irsdk-constants'
import { compose, pick, assoc } from 'ramda'
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
      // TODO: This needs to be done better and is currently a hack
      value: (valueBuffer as any)[variable.jsBufferMethod](),
      unit: header.unit
    }
  }

  toJSON () {
    const getParam = (x: string) => this.getParam(x)
    const getName = (x: { name: string }) => x.name
    const valueFromHeader = compose(pick([ 'value', 'unit' ]), getParam, getName)

    return this.varHeaders
      .reduce((accum, header) => assoc(getName(header), valueFromHeader(header), accum), {})
  }
}
