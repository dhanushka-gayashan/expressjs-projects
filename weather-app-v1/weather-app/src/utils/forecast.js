const request = require('request')
const tokens = require('./api_tokens')


const forecast = (longitude, latitude, callback) => {
    const units = "f"
    const base_url = "http://api.weatherstack.com/current?access_key="
    const url = base_url + tokens.ws_token + "&query=" + latitude + "," + longitude + "&units=" + units

    request({url, json: true}, (error, { body }) => {
        if(error){
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error) {
            callback("Unable to find location!", undefined)
        } else {
            const current = body.current
            const desc = current.weather_descriptions[0]
            const tmp = current.temperature
            const feel = current.feelslike
            const report = desc + ". It is currently " + tmp + " degrees out. It feels like " + feel  + " degrees out."
            callback(undefined, report)
        }
    })
}

module.exports =  forecast
