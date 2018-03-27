const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const forecast = require('./forecast/forecast');

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

geocode.geocodeAddress(argv.address, (errorMessage, geocodeAddressResults) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(geocodeAddressResults, undefined, 4));
        forecast.forecastCoordinates(geocodeAddressResults.latitude, geocodeAddressResults.longitude, (errorMessage, forecastCoordinatesResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(JSON.stringify(forecastCoordinatesResults, undefined, 4));
            }
        });
    }
});

