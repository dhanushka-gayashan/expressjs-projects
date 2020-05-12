const request = require('request')
const tokens = require('./api_tokens')


const geocode = (city, callback) => {
    const limit = "1"
    const base_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
    const url = base_url + encodeURIComponent(city) + ".json?access_token=" + tokens.mb_token + "&limit=" + limit

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to geolocation service!", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search", undefined)
        } else {
            const features = body.features[0]
            const data = {
                longitude: features.center[0],
                latitude: features.center[1],
                location: features.place_name,
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode
