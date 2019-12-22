import { readSync } from 'fs'
import { safeLoad as safeLoadYaml } from 'js-yaml'

import { TelemetrySample } from './telemetry-sample'
import { telemetryFileLoader } from './utils/telemetry-file-loader'
import { TelemetryHeader } from './headers/telemetry-header'
import { DiskSubHeader } from './headers/disk-sub-header'
import { VarHeader } from './headers/var-header'

/**
 * iRacing Telemetry
 */
export default class Telemetry {
  private sessionInfo: any

  /**
   * Telemetry constructor.
   */
  constructor (
    public readonly telemetryHeader: TelemetryHeader,
    public readonly diskSubHeader: DiskSubHeader,
    public readonly sessionInfoYaml: string,
    public readonly varHeaders: VarHeader[],
    private fd: number
  ) {
    this.sessionInfo = safeLoadYaml(sessionInfoYaml)
  }

  /**
   * Instantiate a Telemetry instance from the contents of an ibt file
   *
   * @param file path to *.ibt file
   * @return Telemetry instance of telemetry
   */
  static fromFile (file: string): Promise<Telemetry> {
    return telemetryFileLoader(file)
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
    const length = this.telemetryHeader.bufLen

    const buffer = Buffer.alloc(length)

    while (hasSample) {
      const start = this.telemetryHeader.bufOffset + (count++ * length)
      const bytesRead = readSync(this.fd, buffer, 0, length, start)

      if (bytesRead !== length) {
        hasSample = false
      } else {
        yield new TelemetrySample(buffer, this.varHeaders)
      }
    }
  }
}
