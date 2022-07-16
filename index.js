const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const { PORT } = process.env || 3001
app.use(express.json())
app.use(cors())
const router = require('./routes')

app.use('/api/v1', router)

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

module.exports = app
