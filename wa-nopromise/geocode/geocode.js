const request = require('request');

var geocodeAddress = (address, callback) => {

    const googleGeocodeEndpoint = 'https://maps.googleapis.com/maps/api/geocode/json';
    const googleAPIKey = 'AIzaSyCF23ks0NGyu9epZM0uRJTLadZvsfrGMMU';
    var encodedAddress = encodeURIComponent(address);
    var requestURL = `${googleGeocodeEndpoint}?address=${encodedAddress}&key=${googleAPIKey}`;
    console.log (requestURL);
    request ({
        url: requestURL,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to server.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find address.');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
        else {
            callback(`Error: ${body.status}`);
        }
    });
};

module.exports = {
    geocodeAddress
};