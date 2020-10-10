const request = require('postman-request');

const geocode = (address, callback) => { // parameters for address and callback
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2FydGVyazk0IiwiYSI6ImNrZWozMHg0ZDIxMmoyd3M0NzZ5YzkwZDYifQ.feXsRLuvGPqSJ0V9uop_fg&limit=1'

    request({ url, json: true}, (error, { body }) => { //destructred to pull body out instead of response
           if (error){
                  callback('Unable to connect to location services!', undefined) // pass to callback for error and undefined as there is no data
           } else if (body.features.length === 0) {
                  callback('Unable to find location. Try another search.', undefined) // same as above
           } else {
                  callback(undefined, { 
                         latitude: body.features[0].center[1], // working code - pass back object of data
                         longitude: body.features[0].center[0],
                         location: body.features[0].place_name
                  })
           }
    })
}

module.exports = geocode