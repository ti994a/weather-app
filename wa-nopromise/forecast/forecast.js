const request = require('request');

var forecastCoordinates = (latitute, longitude, callback) => {

    const darkSkyEndpoint = 'https://api.darksky.net/forecast/';
    const darkSkyAPIKey = '393582b9d5c1b5000c2712178d82199e';    
    var requestURL = `${darkSkyEndpoint}${darkSkyAPIKey}/${latitude},${longitude}`;

    request ({
        url: requestURL,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
            tempurature: body.currently.temperature,
            apparentTempurature: body.currently.apparentTemperature,
            dailySummary: body.daily.summary
            });
        }
        else {
            callback('Error related to request to api.darksky.net.  Unable to fetch weather.');
        }
    });
};

module.exports = {
    forecastCoordinates
};
