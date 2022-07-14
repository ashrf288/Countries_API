const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {getApiData} = require('./controllers/getApiDataController');
const app=express();
app.use(express.json())
app.use(cors());
const {PORT}=process.env || 3000;
const {CountreyControllers}=require('./controllers/countriesControllers')

/// endpoints 
app.get('/data',getApiData)

app.get('/',CountreyControllers.showAllCounteries)
app.get('/:name',CountreyControllers.showCounteryByName)
app.get('/by_country_code/:code',CountreyControllers.showCounteryByCountryCode)
app.get('/currency/:cca2',CountreyControllers.getCurrency)
app.get('/by_region/:region',CountreyControllers.getbyReagion)
app.get('/by_language/:language',CountreyControllers.getbyLanguage)




app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})