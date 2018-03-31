const yargs = require('yargs');
const request = require('request');

const googleGeocodeEndpoint = 'https://maps.googleapis.com/maps/api/geocode/json';
const googleAPIKey = 'AIzaSyCF23ks0NGyu9epZM0uRJTLadZvsfrGMMU';
const darkSkyEndpoint = 'https://api.darksky.net/forecast/';
const darkSkyAPIKey = '393582b9d5c1b5000c2712178d82199e'; 

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string:true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;


var geocodeAddress = (address) => {
    var geocodeURL = `${googleGeocodeEndpoint}?address=${address}&key=${googleAPIKey}`;
    return new Promise((resolve, reject) => {
        request ({
            url: geocodeURL,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to server.');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find address.');
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
            else {
                reject(`Error: ${body.status}`);
            }
        });
    });
};

var forecastCoordinates = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
         var requestURL = `${darkSkyEndpoint}${darkSkyAPIKey}/${latitude},${longitude}`;
        request ({
            url: requestURL,
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve(
                    {
                        tempurature: body.currently.temperature,
                        apparentTempurature: body.currently.apparentTemperature,
                        dailySummary: body.daily.summary
                    }
                );
            }
            else {
                reject('Error related to request to api.darksky.net.  Unable to fetch weather.');
            }
        });
    });
};


var encodedAddress = encodeURIComponent(argv.address);

geocodeAddress(encodedAddress).then(
    (geocodeAddressResults) => { // on resolve of geocodeAddress(encodedAddress)
        console.log(JSON.stringify(geocodeAddressResults, undefined, 4));
        return forecastCoordinates(geocodeAddressResults.latitude, geocodeAddressResults.longitude);
    }).then(
        (forecastCoordinatesResults) => { // on resolve of forecast.forecastCoordinates
            console.log(JSON.stringify(forecastCoordinatesResults, undefined, 4));
        }).catch( // on any reject
            (errorMessage) => {
                console.log(errorMessage);
            });