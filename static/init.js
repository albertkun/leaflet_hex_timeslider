// options for the map
const map_options = {
    // center on LA
    center: [33.79487002, -118.23543],
    ZoomLevel: 7
}

// options for the Hexbin
const hex_options = {
    radius: 24,
    opacity: .7,
    colorRange: [ '#ffc961', '#1a110c' ],
    radiusRange: [ 4, 24 ]
};

// flatten the original geojson into a single array
const geo_features = json['features'].flat()
//console.log(geo_features)


////////// setup the leaflet map //////////
// use ArcGIS gray base map
let layer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    opacity: 1,
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    minZoom: 9,
    maxZoom: 14,
    minNativeZoom: 0,
    maxNativeZoom: 19
});

// init the map
let map = L.map('map', {
    layers: [ layer ],
    center: L.latLng(map_options.center[0],map_options.center[1]), zoom: map_options.ZoomLevel
});

// use the stamen labels
let Stamen_TonerLabels = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    opacity: .2,
    minZoom: 0,
    maxZoom: 11,
    ext: 'png'
  });        
  map.addLayer(Stamen_TonerLabels);

// add logo
L.Control.logo = L.Control.extend({
    onAdd: function(map) {
        let img = L.DomUtil.create('img');
        img.src = './imgs/garcettiville.png';
        img.style.width = '200px';
        return img;
    },

    onRemove: function(map) {
        // Nothing to do here
    }
});

L.control.logo = function(opts) {
    return new L.Control.logo(opts);
}
L.control.logo({ position: 'bottomright' }).addTo(map);



////////// add the hex bin here //////////
// Create the hexlayer
let hexLayer = L.hexbinLayer(hex_options);

// Set up hover handler ALBERT: disabled for now
//hexLayer.hoverHandler(L.HexbinHoverHandler.tooltip());


// Set up events, note that "on click" is not used.
hexLayer.dispatch()
    .on('mouseover', function(d, i) {

        //console.log({ type: 'mouseover', event: d, index: i, context: this });
        setHovered(d);
    })
    .on('mouseout', function(d, i) {
        //console.log({ type: 'mouseout', event: d, index: i, context: this });
        setHovered();
    })
    .on('click', function(d, i) {
        //console.log({ type: 'click', event: d, index: i, context: this });
        setClicked(d);
    });




////////// begin the helper functions //////////
function timestamp(str) {
    return new Date(str).getTime();
}

function addDataToHexMap(obj,start_date,end_date){
    let map_data
    if (start_date !== undefined){
        let filtered_obj = obj.filter(data => timestamp(data.properties['Date']) >= start_date && timestamp(data.properties['Date']) <= end_date)
        console.log('date provided')
        // console.log(end_date)
        map_data = filtered_obj
        
    }
    else{
        console.log('date not provided, so adding all data')
        map_data = obj
    }
    // get only the lat/long
    let geo_points = map_data.map(feature => ([feature.geometry.coordinates[0],feature.geometry.coordinates[1]]));
    //console.log(geo_points)
    hexLayer.data(geo_points)
    let total = geo_points.length
    console.log('total')
    //console.log(total)
    return total
}

function setHovered(d) {
    d3.select('#hovered .count').text((null != d) ? "Deaths here: "+ d.length : '');
}

function setClicked(d) {
    d3.select('#clicked .count').text((null != d) ? d.length : '');
}

// Add it to the map now that it's all set up
hexLayer.addTo(map);

//initial call for all the data
addDataToHexMap(geo_features)

