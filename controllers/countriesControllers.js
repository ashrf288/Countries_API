const Countrey = require('../db/model')
const CountreyControllers = {}

CountreyControllers.showAllCounteries = async (req, res) => {
  try {
    const countries = await Countrey.find({})
    await res.json({ length: countries.length, data: countries })
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
      await res.json({ length: countries.length, data: countries })
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
  const languageVal = capitalize(req.params.language)
  const language = languageVal.slice(0, 3).toLowerCase()

  try {
    if (!isNaN(req.params.language)) {
      res.status(400).json({ message: 'please provide a valid language' })
    } else {
      const countries = await Countrey.aggregate([
        [
          { $addFields: { u: { $objectToArray: '$languages' } } },
          // { $match: { u: { $elemMatch: { v: { $regex: language } } } } },
          {
            $match: {
              u: {
                $elemMatch: {
                  $or: [
                    {
                      k: language
                    },
                    {
                      v: languageVal
                    }
                  ]
                }
              }
            }
          },
          // { $group: { _id: "$cca3", groups: { $push: "$u" } } },
          { $project: { u: 0 } }
        ]
      ])
      if (countries.length) {
        await res.json({ length: countries.length, data: countries })
      } else {
        await res.status(404).json({ message: 'countries not found for this language' })
      }
    }
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
}

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
module.exports = { CountreyControllers, capitalize }
