import fs from 'fs'
import yaml from 'js-yaml'

import TelemetrySample from './sample'

const variableHeaders = new WeakMap()

export default class Telemetry {
  constructor (telemetryHeader, diskSubHeader, sessionInfo, varHeaders, fd) {
    this.headers = telemetryHeader
    this.diskHeaders = diskSubHeader
    this.sessionInfo = yaml.safeLoad(sessionInfo)
    this._fd = fd

    variableHeaders.set(this, varHeaders)
  }

  get varHeaders () {
    return variableHeaders.get(this)
  }

  /**
   * Generate a unique key for the telemetry session.
   *
   * The unique key is a combination of 3 fields:
   *   accountId-sessionId-subSessionId
   *
   * @return string
   */
  uniqueId () {
    const accountId = this.sessionInfo.DriverInfo.Drivers[this.sessionInfo.DriverInfo.DriverCarIdx].UserID
    const sessionId = this.sessionInfo.WeekendInfo.SessionID
    const subSessionId = this.sessionInfo.WeekendInfo.SubSessionID
    return `${accountId}-${sessionId}-${subSessionId}`
  }

/**
* Telemetry samples generator.
*/
  * samples () {
    let hasSample = true
    let count = 0

    const length = this.headers.bufLen
    const buffer = Buffer.alloc(length)

    while (hasSample) {
      const start = this.headers.bufOffset + (count++ * length)
      const bytesRead = fs.readSync(this._fd, buffer, 0, length, start)

      if (bytesRead !== length) {
        hasSample = false
      } else {
        yield new TelemetrySample(buffer, this.varHeaders)
      }
    }
  }
}
