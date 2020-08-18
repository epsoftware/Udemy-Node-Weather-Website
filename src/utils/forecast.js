const request = require('request')

const forecast = (latitude, longitude, callback) => {
   // const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude
   //  http://api.weatherstack.com/current?access_key=1b33a798482f894bbccba18b895bed3a&query=37.8267, -122.4233
    const url = 'http://api.weatherstack.com/current?access_key=1b33a798482f894bbccba18b895bed3a&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.current.temperature + ' hot degress out (feels like ' + body.current.feelslike + '). There is a ' + body.current.precip + '% chance of rain.')
            // callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
            //console.log(body.current.temperature)
        }
    })
}

module.exports = forecast