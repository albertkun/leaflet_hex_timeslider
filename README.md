# Leaflet Hex Timeslider
<img width="664" alt="2020-12-02 02_32_27-Clipboard" src="https://user-images.githubusercontent.com/8574425/100862385-f6086600-3447-11eb-8ecf-9717d8d73be6.png">

This is a hex bin implementation of leaflet + d3 + nouislider, using vanilla JavaScript with ECM 2016 web standards, so Internet Explorer is not supported. You can use `babel` or other similar tools to make it IE compatible though.

## Example
See the example [here](https://albertkun.github.io/leaflet_hex_timeslider/).

## Technology used
Leaflet + d3 plugin from:
https://github.com/Asymmetrik/leaflet-d3

Timeslider from:
https://refreshless.com/nouislider/
## Description
Takes in spatial-temporal point data from a geojson and converts it to a hex representation with start and end dates being scrollable.

## Installation
Include the following in the header of the `HTML` file:

```html

		<!-- load css styles -->
		<link rel="stylesheet" href="./static/leaflet.css" />
		<link href="./static/nouislider.css" rel="stylesheet">
		<link href="./static/styles.css" rel="stylesheet">

		<!-- load libraries -->
		<script src="./static/d3.js" charset="utf-8"></script>
		<script src="./static/d3-hexbin.js" charset="utf-8"></script>
		<script src="./static/leaflet-src.js"></script>
		<script src="./static/nouislider.js"></script>
		<script src="./static/wNumb.min.js"></script>
		<script src="./static/leaflet-d3.js" charset="utf-8"></script>

		<!-- load data -->
		<script src="./SAMPLE_DATA.js" charset="utf-8"></script>
```

## Running example Code:
Clone the repository:
`git clone https://github.com/albertkun/leaflet_hex_timeslider.git`

### Point data
`geojson` is used for the data, and it should be formatted with a `features.geometry.coordinates[]` array, as per GeoJSON standards:
https://en.wikipedia.org/wiki/GeoJSON

However, in the example the `geojson` is brought in as a `variable` as follows:
```js
json = features.properties.Date
```

### geoJSON time data
Time data should be stored under the `properties` object, as per GeoJSON standards above.
The field used is `Date` (case sentitive), with date format of `1/1/2020` or any other ISO standard.
