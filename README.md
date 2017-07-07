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
```

## Reading telemetry update samples

#### Generator
```javascript
foreach (sample in telemetry.samples()) {
  // Use sample
}
```

#### Rx.JS
```javascript
const samples$ = Rx.Observable.from(telemetry.samples())

samples$
  .subscribe(s => console.log(s.toJSON()))
```

