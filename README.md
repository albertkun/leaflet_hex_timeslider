# Leaflet Hex Timeslider
<img width="664" alt="2020-12-02 02_32_27-Clipboard" src="https://user-images.githubusercontent.com/8574425/100862385-f6086600-3447-11eb-8ecf-9717d8d73be6.png">

This is a hex bin implementation of leaflet + d3 + nouislider, using vanilla JavaScript with ECM 2016 web standards, so Internet Explorer is not supported.

Leaflet + d3 plugin from:
https://github.com/Asymmetrik/leaflet-d3

Timeslider from:
https://refreshless.com/nouislider/
## Description
Takes in spatial-temporal point data from a geojson and converts it to a hex representation with start and end dates being scrollable.

## Installation
`git clone https://github.com/albertkun/leaflet_hex_timeslider.git`

### Point data
A geojson is used for the data, and it should be formatted with a features.geometry.coordinates[] array, as per GeoJSON standards:
https://en.wikipedia.org/wiki/GeoJSON

### Time data
The dates should be stored under the `properties` object, as per GeoJSON standards above, the field used is `Date` (case sentitive), with date format of `1/1/2020` or any other ISO standard.
ex. `json = features.properties.date`
