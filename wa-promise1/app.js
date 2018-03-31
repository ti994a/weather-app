const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const forecast = require('./forecast/forecast');

/*
const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {

        const googleGeocodeEndpoint = 'https://maps.googleapis.com/maps/api/geocode/json';
        const googleAPIKey = 'AIzaSyCF23ks0NGyu9epZM0uRJTLadZvsfrGMMU';
        var encodedAddress = encodeURIComponent(address);
        var requestURL = `${googleGeocodeEndpoint}?address=${encodedAddress}&key=${googleAPIKey}`;

        request ({
            url: requestURL,
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
*/

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

geocodeAddress(argv.address).then(
    (geocodeAddressResults) => { // on resolve
        console.log(JSON.stringify(geocodeAddressResults, undefined, 4));
        return forecast.forecastCoordinates(geocodeAddressResults.latitude, geocodeAddressResults.longitude);
    }).then(
        (forecastCoordinatesResults) => { // on resolve
            console.log(JSON.stringify(forecastCoordinatesResults, undefined, 4));
        }).catch( // on any reject
            (errorMessage) => {
                console.log(errorMessage);
            });
