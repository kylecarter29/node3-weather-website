const request = require('postman-request'); // require reqeuests (same as postman)

const forecast = (latitude, longitute, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=cbb57f82ae67ac7b6fb2a1966a14403d&query=' + latitude + ',' + longitute + '&units=f' //plug in lat/long to find weather location
    
    request({ url, json: true }, (error, { body }) => { // api call with url, response of JSON - error and response handle any returns of data
           if(error){
               callback('Unable to connect to weather service!', undefined)
           } else if(body.error) {
               callback('Unable to find location.', undefined)
           }
          else {
          const currentTemp = body.current.temperature; // dig into data returned
          const feelsLike = body.current.feelslike;
          callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + currentTemp + ' degrees out. It feels like ' + feelsLike + ' degrees out.')
           }
    })
}

module.exports = forecast