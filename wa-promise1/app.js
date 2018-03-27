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
