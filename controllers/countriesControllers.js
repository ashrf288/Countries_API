const Countrey = require('../db/model')
const CountreyControllers = {}

CountreyControllers.showAllCounteries = async (req, res) => {
  try {
    const countries = await Countrey.find({}).select(
      'name.common name.official -_id'
    )
    await res.json(countries)
  } catch (e) {
    console.log(e)
  }
}
CountreyControllers.showCounteryByName = async (req, res) => {
  const { name } = req.params
  try {
    const country = await Countrey.findOne({
      $or: [{ 'name.common': name }, { 'name.official': name }]
    })
    if (country) {
      await res.json(country)
    } else {
      await res.status(404).json({ message: 'Country not found' })
    }
  } catch (e) {
    console.log(e)
  }
}
CountreyControllers.showCounteryByCountryCode = async (req, res) => {
  let countryCode = req.params.code
  try {
    let country = {}

    // if countryCode is  numerical value then excute the else  statement
    if (isNaN(countryCode)) {
      country = await Countrey.findOne({
        $or: [{ cca2: countryCode }, { cca3: countryCode }]
      })
    } else {
      countryCode = parseInt(countryCode)
      country = await Countrey.findOne({ ccn3: countryCode })
    }

    if (country) {
      await res.json(country)
    } else {
      await res.status(404).json({ message: 'Country not found' })
    }
  } catch (e) {
    console.log(e)
  }
}

CountreyControllers.getCurrency = async (req, res) => {
  const { cca2 } = req.params
  try {
    const currency = await Countrey.findOne({ cca2 }).select(
      'name.common currencies -_id'
    )
    if (currency) {
      await res.json(currency)
    } else {
      await res
        .status(404)
        .json({
          message: 'Country with that CCA2(country code alpha-2) not found'
        })
    }
  } catch (e) {
    console.log(e)
  }
}

CountreyControllers.getbyReagion = async (req, res) => {
  const { region } = req.params
  try {
    const countries = await Countrey.find({ region }).select('name region -_id')
    if (countries.length) {
      await res.json(countries)
    } else {
      await res
        .status(404)
        .json({ message: 'countries not found for this region' })
    }
  } catch (e) {
    console.log(e)
  }
}

CountreyControllers.getbyLanguage = async (req, res) => {
  const { language } = req.params
  const extension = language.slice(0, 3).toLowerCase()

  try {
    const countries = await Countrey.find({})
    const countriesWithLanguage = countries.filter(country => {
      return country.languages && country.languages[extension]
    })
    if (countriesWithLanguage.length) {
      await res.json(countriesWithLanguage)
    } else {
      await res.status(404).json({ message: 'no countries found that uses this language' })
    }
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports = { CountreyControllers }
