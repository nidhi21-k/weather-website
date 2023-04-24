const request = require('postman-request');

// weather forecast
//-------------------------------------------
const forecast = (latitude,longitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=ec2741f59f7b73743c1c83d9f888a654&query="+ latitude +','+ longitude +"&units=m"; //37.8267,-122.4033

    request({ url, json:true},(error,{body})=> {
        if(error){
            callback(error,undefined);
        }
        else if(body.error){
            callback(body.error,undefined);
        }
        else{
            callback(undefined,{
                forecast: body.current.weather_descriptions + '. It is currently ' + body.current.temperature  + ' degress out. But it feels like a ' + body.current.feelslike + ' degress out.',
            });
        }
    });
}

module.exports = forecast
