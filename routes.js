const express = require('express')
const { getApiData } = require('./controllers/getApiDataController')
const { CountreyControllers } = require('./controllers/countriesControllers')
const wrongPathController = require('./controllers/generalControllers')
const router = express.Router()

/// endpoints
router.get('/getApi_data', getApiData)

router.get('/', CountreyControllers.showAllCounteries)
router.get('/:name', CountreyControllers.showCounteryByName)
router.get('/by_country_code/:code', CountreyControllers.showCounteryByCountryCode)
router.get('/currency/:cca2', CountreyControllers.getCurrency)
router.get('/by_region/:region', CountreyControllers.getbyReagion)
router.get('/by_language/:language', CountreyControllers.getbyLanguage)

router.use(wrongPathController)

module.exports = router
