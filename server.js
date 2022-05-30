'use strict';

//requires are saving the libraries into a variable named the same. 
//these are like imports, importing our libraries into our app

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { response } = require('express');
const { type } = require('express/lib/response');

//will be using express variable to instantiate a new instance of the Express server
const app = express();

//we will be createing an instance of cors for our middleware
app.use(cors());

// this is setting the PORT by standard Heroku friendly variable
const PORT = process.env.PORT || 3002;

//testing if PORT server works.
app.get('/', (request, response) => {
    response.send('testing');
});

// creating weather endpoint, route and searching with req and res paramiters.
app.get('/weather', (req, res) => {
    const type = req.query.type;
    const forcastResults = new Forcast(type);
    console.log("Forcast Results: ", forcastResults);
    // console.log('type of list requested: ', type);
    res.send('test from weather endpoint.');
});

//weather variable is bananas
class Forcast {
    static weather = require('./data/weather.json');

    constructor(type) {
        this.type = Forcast.weather.find(listObj => listObj.lon && listObj.lat && listObj.city_name === type);
        this.array = this.type.data.map(weatherObj => ({
            "date": weatherObj.datetime
        }))
        console.log(this.array);
    }
};

//telling app(express server) where (which port) to run on
// listening for PORT argument then callback function (this is the anonymous function)
app.listen(PORT, () => console.log(`listening to PORT ${PORT}`));
