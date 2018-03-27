const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {

        const googleGeocodeEndpoint = 'https://maps.googleapis.com/maps/api/geocode/json';
        const googleAPIKey = 'AIzaSyCF23ks0NGyu9epZM0uRJTLadZvsfrGMMU';
        var encodedAddress = encodeURIComponent(address);
        var requestURL = `${googleGeocodeEndpoint}?address=${encodedAddress}&key=&{googleAPIKey}`;

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

geocodeAddress('603 Valley Lane 21286').then(
    (location) => { 
        console.log(JSON.stringify(location, undefined, 4));
    }, // on resolve
    (errorMessage) => {
        console.log(errorMessage);
    } // on reject
);

