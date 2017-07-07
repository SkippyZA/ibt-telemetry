# iRacing Telemetry Parser

Yup, that's right, this is a Node.js library for processing iRacing's ibt telemetry files.

This library has been built with memory consumption in mind, and therefore the data is streamed from the file
instead of being loaded completely in memory. This is advantageous when needing to deal with back pressure from
a slower services consuming the file.

This ibt-telemetry library is a 100% complete Node.js library for the processing of telemetry files. The library has
no requirements on any DLL or Windows library making this completely capable of being run on OSX, and *nix too.

## Loading up the telemetry

```javascript
const pathToIbt = '/path/to/telemetry.ibt'
const telemetry = Telemetry.fromFile(pathToIbt)

const telemetryId = telemetry.uniqueId()
// telemetryId = "188953-12312494-123910230"

const sessionInfo = telemetry.sessionInfo
// sessionInfo = {}
```

## Reading telemetry update samples

#### Generator
```javascript
foreach (sample in telemetry.samples()) {
  const speed = sample.getParam('speed')
  // speed = {
  //   name: "Speed",
  //   description: "GPS vehicle speed",
  //   value: 200.32943,
  //   unit: "m/s"
  // }
  
  const sampleJson = sample.toJSON()
  // sampleJson = {
  //   "AirTemp": {
  //     "unit": "C",
  //     "value": 25.55555534362793
  //   },
  //   "Alt": {
  //     "unit": "m",
  //     "value": 42.163856506347656
  //   },
  //   "Brake": {
  //     "unit": "%",
  //     "value": 1
  //   },
  //   "BrakeRaw": {
  //     "unit": "%",
  //     "value": 0
  //   },
  //   "CFshockDefl": {
  //     "unit": "m",
  //     "value": 0.04878242313861847
  //   }
  // }
```

#### Rx.JS
```javascript
const samples$ = Rx.Observable.from(telemetry.samples())

samples$
  .subscribe(s => console.log(s.toJSON()))
```

