const yargs = require('yargs');
const axios = require('axios');

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
    
var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `${googleGeocodeEndpoint}?address=${encodedAddress}&key=${googleAPIKey}`;

axios.get(geocodeURL).then( 
    (response) => {  // on resolve of axios.get(geocodeURL)
        if (response.status !== 200)
            throw new Error('Client or server error');
         
        var latitude = response.data.results[0].geometry.location.lat;
        var longitude = response.data.results[0].geometry.location.lng;
        var forecastURL = `${darkSkyEndpoint}${darkSkyAPIKey}/${latitude},${longitude}`;
        
        console.log(response.data.results[0].formatted_address);
        return axios.get(forecastURL);
    }
).then(
    (response) => { // on resolve of axios.get(forecastURL)
        var tempurature = response.data.currently.temperature;
        var apparentTempurature = response.data.currently.apparentTemperature;
        var dailySummary = response.data.daily.summary;
        console.log(`It is currently ${tempurature}, but feels like ${apparentTempurature}.`);
        console.log('Your daily forecast summary is:');
        console.log(dailySummary);
    }
).catch(
    (e) => {    // on reject
       if (e.code === 'ENOTFOUND')
            console.log('Unable to connect to API server');
        else if (e.response.status === 400)
            console.log('Invalid address');
        else 
            console.log(e.message);
    });
