import fs from 'fs'
import yaml from 'js-yaml'

import TelemetrySample from './telemetry-sample'
import telemetryFileLoader from './utils/telemetry-file-loader'

const variableHeaders = new WeakMap()
const fileDescriptor = new WeakMap()

/**
 * iRacing Telemetry
 */
export default class Telemetry {
  /**
   * Telemetry constructor.
   */
  constructor (telemetryHeader, diskSubHeader, sessionInfo, varHeaders, fd) {
    this.headers = telemetryHeader
    this.diskHeaders = diskSubHeader
    this.sessionInfo = yaml.safeLoad(sessionInfo)

    fileDescriptor.set(this, fd)
    variableHeaders.set(this, varHeaders)
  }

  /**
   * Instantiate a Telemetry instance from the contents of an ibt file
   *
   * @param file path to *.ibt file
   * @return Telemetry instance of telemetry
   */
  static fromFile (file) {
    return telemetryFileLoader(file)
  }

  /**
   * Telemetry variable headers.
   */
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

    const fd = fileDescriptor.get(this)
    const length = this.headers.bufLen
    const buffer = Buffer.alloc(length)

    while (hasSample) {
      const start = this.headers.bufOffset + (count++ * length)
      const bytesRead = fs.readSync(fd, buffer, 0, length, start)

      if (bytesRead !== length) {
        hasSample = false
      } else {
        yield new TelemetrySample(buffer, this.varHeaders)
      }
    }
  }
}
