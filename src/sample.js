import Irsdk from './irsdk-constants'
import R from 'ramda'

const variableHeaders = new WeakMap()

export default class TelemetrySample {
  constructor (buff, varHeaders) {
    this._buff = buff
    variableHeaders.set(this, varHeaders)
  }

  getParam (sampleVariableName) {
    const header = variableHeaders.get(this)
      .find(h => h.name.toLowerCase() === sampleVariableName.toLowerCase())

    if (!header) {
      return null
    }

    const variable = Irsdk.varType[header.type]
    const valueBuffer = this._buff.slice(header.offset, header.offset + variable.size)

    return {
      name: header.name,
      description: header.description,
      value: valueBuffer[variable.jsBufferMethod](),
      unit: header.unit
    }
  }

  toJSON () {
    const getParam = x => this.getParam(x)
    const getName = R.prop('name')
    const valueFromHeader = R.compose(R.pick(['value', 'unit']), getParam, getName)

    return variableHeaders.get(this)
      .reduce((accum, header) => R.assoc(getName(header), valueFromHeader(header), accum), {})
  }
}
