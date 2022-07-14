const mongoose = require('mongoose');
const mongo_url = 'mongodb+srv://ashrf:1234@cluster0.qfd84.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongo_url)

const CountreySchema=mongoose.Schema({
    name:{},
    tld:[] ,
    languages:String,
    cca2:String,
    cca3:String,
    ccn3:Number,
    cioc:String,
    independent:Boolean,
    status:String,
    unMember:Boolean,
    currencies:{},
    Region:String,
    coordinate:{},
    idd:{},
    capital:[],
    region:String,
    subregion:String,
    languages:{},
    landlocked:Boolean,
    area:Number,
    maps:{},
    population:Number,
    timezones:[],
    continents:[],
    postalCode:{}
},{ strict: false })






module.exports =mongoose.model('Country',CountreySchema)