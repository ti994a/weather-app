const request = require('request');

const googleGeocodeEndpoint = 'https://maps.googleapis.com/maps/api/geocode/json'
const googleAPIKey = 'AIzaSyCF23ks0NGyu9epZM0uRJTLadZvsfrGMMU';
request ({
    url: `${googleGeocodeEndpoint}?address=1301%20lombard%20street%20philadelphia&key=&{googleAPIKey}`,
    json: true
}, (error, response, body) => {
    // console.log(JSON.stringify(response, undefined, 4));  // format JSON with indent = 4
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}, Longitude: ${body.results[0].geometry.location.lng}`);
});

