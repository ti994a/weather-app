const yargs = require('yargs');
const request = require('request');

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

// console.log(argv);
var encodedAddress = encodeURIComponent(argv.address);
var googleGeocodeEndpoint = 'https://maps.googleapis.com/maps/api/geocode/json';
var googleAPIKey = 'AIzaSyCF23ks0NGyu9epZM0uRJTLadZvsfrGMMU';
var requestURL = `${googleGeocodeEndpoint}?address=${encodedAddress}&key=&{googleAPIKey}`;

request ({
    url: requestURL,
    json: true
}, (error, response, body) => {
    if (error) {
        console.log ('Unable to connect to server');
    } else if (body.status === 'ZERO_RESULTS') {
        console.log('Unable to find address');
    } else if (body.status === 'OK') {
        console.log(`Address: ${body.results[0].formatted_address}`);
        console.log(`Latitude: ${body.results[0].geometry.location.lat}, Longitude: ${body.results[0].geometry.location.lng}`);
    }
    else {
        console.log(`Error: ${body.status}`);
    }
});
