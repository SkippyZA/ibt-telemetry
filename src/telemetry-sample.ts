import { constants as IrsdkConstants } from './irsdk-constants'
import { compose, pick, assoc } from 'ramda'
import { VarHeader } from './headers/var-header'

export type Nullable<T> = T | null

export type TelemetrySampleProperty = 'SessionTime' | 'SessionTick' | 'SessionNum' | 'SessionState' | 'SessionUniqueID' | 'SessionFlags' | 'SessionTimeRemain' | 'SessionLapsRemain' | 'SessionLapsRemainEx' | 'SessionTimeTotal' | 'SessionLapsTotal' | 'SessionTimeOfDay' | 'DriverMarker' | 'PushToPass' | 'ManualBoost' | 'ManualNoBoost' | 'IsOnTrack' | 'FrameRate' | 'CpuUsageBG' | 'PlayerCarPosition' | 'PlayerCarClassPosition' | 'PlayerCarClass' | 'PlayerTrackSurface' | 'PlayerTrackSurfaceMaterial' | 'PlayerCarIdx' | 'PlayerCarTeamIncidentCount' | 'PlayerCarMyIncidentCount' | 'PlayerCarDriverIncidentCount' | 'PlayerCarWeightPenalty' | 'PlayerCarPowerAdjust' | 'PlayerCarDryTireSetLimit' | 'PlayerCarTowTime' | 'PlayerCarInPitStall' | 'PlayerCarPitSvStatus' | 'PlayerTireCompound' | 'PlayerFastRepairsUsed' | 'PaceMode' | 'OnPitRoad' | 'SteeringWheelAngle' | 'Throttle' | 'Brake' | 'Clutch' | 'Gear' | 'RPM' | 'Lap' | 'LapCompleted' | 'LapDist' | 'LapDistPct' | 'LapBestLap' | 'LapBestLapTime' | 'LapLastLapTime' | 'LapCurrentLapTime' | 'LapLasNLapSeq' | 'LapLastNLapTime' | 'LapBestNLapLap' | 'LapBestNLapTime' | 'LapDeltaToBestLap' | 'LapDeltaToBestLap_DD' | 'LapDeltaToBestLap_OK' | 'LapDeltaToOptimalLap' | 'LapDeltaToOptimalLap_DD' | 'LapDeltaToOptimalLap_OK' | 'LapDeltaToSessionBestLap' | 'LapDeltaToSessionBestLap_DD' | 'LapDeltaToSessionBestLap_OK' | 'LapDeltaToSessionOptimalLap' | 'LapDeltaToSessionOptimalLap_DD' | 'LapDeltaToSessionOptimalLap_OK' | 'LapDeltaToSessionLastlLap' | 'LapDeltaToSessionLastlLap_DD' | 'LapDeltaToSessionLastlLap_OK' | 'Speed' | 'Yaw' | 'YawNorth' | 'Pitch' | 'Roll' | 'EnterExitReset' | 'Lat' | 'Lon' | 'Alt' | 'TrackTemp' | 'TrackTempCrew' | 'AirTemp' | 'WeatherType' | 'Skies' | 'AirDensity' | 'AirPressure' | 'WindVel' | 'WindDir' | 'RelativeHumidity' | 'FogLevel' | 'PitsOpen' | 'PitRepairLeft' | 'PitOptRepairLeft' | 'PitstopActive' | 'FastRepairUsed' | 'FastRepairAvailable' | 'LFTiresUsed' | 'RFTiresUsed' | 'LRTiresUsed' | 'RRTiresUsed' | 'LeftTireSetsUsed' | 'RightTireSetsUsed' | 'FrontTireSetsUsed' | 'RearTireSetsUsed' | 'TireSetsUsed' | 'LFTiresAvailable' | 'RFTiresAvailable' | 'LRTiresAvailable' | 'RRTiresAvailable' | 'LeftTireSetsAvailable' | 'RightTireSetsAvailable' | 'FrontTireSetsAvailable' | 'RearTireSetsAvailable' | 'TireSetsAvailable' | 'IsOnTrackCar' | 'SteeringWheelPctTorque' | 'SteeringWheelPctTorqueSign' | 'SteeringWheelPctTorqueSignStops' | 'SteeringWheelPctDamper' | 'SteeringWheelAngleMax' | 'SteeringWheelLimiter' | 'ShiftIndicatorPct' | 'ShiftPowerPct' | 'ShiftGrindRPM' | 'ThrottleRaw' | 'BrakeRaw' | 'HandbrakeRaw' | 'EngineWarnings' | 'FuelLevel' | 'FuelLevelPct' | 'PitSvFlags' | 'PitSvLFP' | 'PitSvRFP' | 'PitSvLRP' | 'PitSvRRP' | 'PitSvFuel' | 'PitSvTireCompound' | 'TireLF_RumblePitch' | 'TireRF_RumblePitch' | 'TireLR_RumblePitch' | 'TireRR_RumblePitch' | 'SteeringWheelTorque' | 'VelocityZ' | 'VelocityY' | 'VelocityX' | 'YawRate' | 'PitchRate' | 'RollRate' | 'VertAccel' | 'LatAccel' | 'LongAccel' | 'dcStarter' | 'dcPitSpeedLimiterToggle' | 'dcDRSToggle' | 'dcTearOffVisor' | 'dpTireChange' | 'dpFuelFill' | 'dpFuelAddKg' | 'dpFastRepair' | 'dcDashPage' | 'dcBrakeBias' | 'dpLFTireColdPress' | 'dpRFTireColdPress' | 'dpLRTireColdPress' | 'dpRRTireColdPress' | 'dcThrottleShape' | 'dcTractionControl' | 'RFbrakeLinePress' | 'RFspeed' | 'RFpressure' | 'RFcoldPressure' | 'RFtempL' | 'RFtempM' | 'RFtempR' | 'RFtempCL' | 'RFtempCM' | 'RFtempCR' | 'RFwearL' | 'RFwearM' | 'RFwearR' | 'LFbrakeLinePress' | 'LFspeed' | 'LFpressure' | 'LFcoldPressure' | 'LFtempL' | 'LFtempM' | 'LFtempR' | 'LFtempCL' | 'LFtempCM' | 'LFtempCR' | 'LFwearL' | 'LFwearM' | 'LFwearR' | 'CFshockDefl' | 'CFshockVel' | 'WaterTemp' | 'WaterLevel' | 'FuelPress' | 'FuelUsePerHour' | 'OilTemp' | 'OilPress' | 'OilLevel' | 'Voltage' | 'ManifoldPress' | 'RRbrakeLinePress' | 'RRspeed' | 'RRpressure' | 'RRcoldPressure' | 'RRtempL' | 'RRtempM' | 'RRtempR' | 'RRtempCL' | 'RRtempCM' | 'RRtempCR' | 'RRwearL' | 'RRwearM' | 'RRwearR' | 'LRbrakeLinePress' | 'LRspeed' | 'LRpressure' | 'LRcoldPressure' | 'LRtempL' | 'LRtempM' | 'LRtempR' | 'LRtempCL' | 'LRtempCM' | 'LRtempCR' | 'LRwearL' | 'LRwearM' | 'LRwearR' | 'RRshockDefl' | 'RRshockVel' | 'LRshockDefl' | 'LRshockVel' | 'DRS_Status' | 'DRS_Count' | 'LFrideHeight' | 'RFrideHeight' | 'LRrideHeight' | 'RRrideHeight' | 'CFSRrideHeight'


export interface TelemetryParamValue {
  name: string
  description: string
  value: string | number
  unit: string
}

export class TelemetrySample {
  constructor (private buff: Buffer, private varHeaders: VarHeader[]) {}

  getParam (sampleVariableName: TelemetrySampleProperty): Nullable<TelemetryParamValue> {
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
    const getParam = (x: string) => this.getParam(x as TelemetrySampleProperty)
    const getName = (x: { name: string }) => x.name
    const valueFromHeader = compose(pick([ 'value', 'unit' ]), getParam, getName)

    return this.varHeaders
      .reduce((accum, header) => assoc(getName(header), valueFromHeader(header), accum), {})
  }
}
