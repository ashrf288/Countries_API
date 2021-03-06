const axios = require('axios')
const fs = require('fs')
const path = require('path')

const getApiData = async (req, res) => {
  if (req.headers['x-admin'] === '1') {
    try {
      const apiResponse = await axios.get('https://restcountries.com/v3.1/all')
      const data = await apiResponse.data

      writeToFile('./countries.json', data)
      res.status(200).json({ message: 'data downloaded' })
    } catch (e) {
      console.log(e)
    }
  } else {
    res.status(401).json({ message: 'you are not authorized ' })
  }
}

const downloadData = async (req, res) => {
  if (req.headers['x-admin'] === '1') {
    try {
      if (!fs.existsSync('./countries.json')) {
        await getApiData(req, res)
      }
      const file = path.join(__dirname, '../countries.json')
      res.download(file)
    } catch (e) {
      console.log(e)
    }
  } else {
    res.status(401).json({ message: 'you are not authorized ' })
  }
}

const writeToFile = (fileName, data) => {
  fs.writeFileSync(fileName, JSON.stringify(data), (err) => {
    if (err) {
      console.log(err)
    }
  })
}
module.exports = { getApiData, downloadData }
