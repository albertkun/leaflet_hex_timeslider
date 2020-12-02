
// constants for the slider
const slider = document.getElementById('map-slider');
const default_start_date = 'Jan 1,2020'
const default_end_date = 'Dec 1,2020'

// TO-DO: need to change the months to use the start and end dates...
monthVals = months_short.map(month=>Date.parse(month+" 1, 2020"))

// implement the noUiSlider
noUiSlider.create(slider, {
    // step: ,
    behaviour: 'tap-drag',
    connect: true,
    range: {
        min: timestamp(default_start_date),
        max: timestamp(default_end_date)
    },
    direction: 'ltr',
    step: 24 * 60 * 60 * 1000,
    start: [timestamp(default_start_date), timestamp(default_end_date)],
    format: wNumb({
    decimals: 0
    }),
    pips:{
        mode:'values',
        values:monthVals,
        format: {
            to: function(month){
                // custom function to format the months.
                let target_month = new Date(month)
                if (window.innerWidth > 740){
                    month_label = months_short[target_month.getMonth()]
                    console.log(target_month.getMonth())
                    console.log(month_label)
                    return month_label
                }
                else {
                    return []
                }
            },
            from: function(value){
                    return value
            }
        }
    }
});


// Create a string representation of the date.
function formatDate(date) {
    return months_short[date.getMonth()] + ", " +
        date.getFullYear();
}

let dateValues = [
    document.getElementById('event-start'),
    document.getElementById('event-end'),
    document.getElementById('event-total')
];


// add slider
let Slider = L.Control.extend({
    options: {
      position: 'topleft',
    },
    onAdd: function (map) {
      let controlSlider = L.DomUtil.create('div', 'map-slider', L.DomUtil.get('map'));
      // here we can fill the slider with colors, strings and whatever
      controlSlider.innerHTML = '<form><input id="command" type="checkbox"/>command</form>'; 
      return controlSlider;
    },
  });
  map.addControl(new Slider());


slider.noUiSlider.on('update', function (values, handle) {
    dateValues[handle].innerHTML = formatDate(new Date(+values[handle]));
    let new_times = slider.noUiSlider.get();
    // addDataToHexMap(geo_features,new_times[0],new_times[1])
    console.log(dateValues)
    dateValues[2].innerHTML = addDataToHexMap(geo_features,new_times[0],new_times[1])
    // console.log(values[handle])
});
