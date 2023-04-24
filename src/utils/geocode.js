const request = require('postman-request');

//Geocoding
//-----------------------------------
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1Ijoiay1uaWRoaSIsImEiOiJjbGdubzh0aGswOWg3M25rY21zMWZyaHpsIn0.js7AKcnoH1T6jHapG4MKxg";
    
    request({ url, json:true},(error,{body})=> {
        if (error){
            callback('unable to connect location service!', undefined);
        }
        else if(body.features.length === 0){
            callback('Unable to find location. Try another location.',undefined);
        }
        else{
            callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                });
        }
    });                                                                                                                                                                                                                                                                                                                                                             
}

module.exports = geocode