const express = require('express'); //express function
const path = require('path');  
const hbs = require('hbs'); //handlebars object

const app = express();  // express object
const port = process.env.PORT || 3000;

const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

//Define paths for express config
//------------------------------------
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// set handlebars engine and views engine
//-----------------------------------
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

// set static directory
//------------------------------
app.use(express.static(publicDirectoryPath));

app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather forecast',
        name: 'NIDHI'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Nidhi'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name: 'nidhi'
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address)
        return res.send({
            error:'you must provide an address.'
        });
        
    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({
                error: error
            });
        };
        
        forecast(latitude,longitude,(error, forecastData)=>{
            if(error){
                return res.send({
                    error: error
                });
            }
            else{
                return res.send({
                    forecast:forecastData.forecast,
                    location: location,
                    address:req.query.address
                });
            };
        });
    });
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error :'you must provide a search term.'});
    }

    res.send({
          products : []
    });
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:404,
        name: 'nidhi',
        errorMessage: 'Help article not found.'
    });
});

app.get('*',(req,res)=>{
    res.render('404',{
        title:404,
        name: 'nidhi',
        errorMessage:'Page not found.'
    });
});

app.listen(port,()=>{
    console.log('server is up on port '+ port);
});