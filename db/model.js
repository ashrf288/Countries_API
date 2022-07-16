const mongoose = require('mongoose')
const { mongoDBConnectionString } = process.env
mongoose.connect(mongoDBConnectionString)

const CountreySchema = mongoose.Schema({
  name: {},
  tld: [],
  cca2: String,
  cca3: String,
  ccn3: Number,
  cioc: String,
  independent: Boolean,
  status: String,
  unMember: Boolean,
  currencies: {},
  Region: String,
  coordinate: {},
  idd: {},
  capital: [],
  region: String,
  subregion: String,
  languages: {},
  landlocked: Boolean,
  area: Number,
  maps: {},
  population: Number,
  timezones: [],
  continents: [],
  postalCode: {}
}, { strict: false })

module.exports = mongoose.model('Country', CountreySchema)
