const request = require('supertest')
const app = require('../index')

describe('get  countrey details by code    (/api/v1/by_country_code/:code) endpoint', () => {
  it('get country details by country code cca2', async () => {
    const res = await request(app).get('/api/v1/by_country_code/GU')
    expect(res.statusCode).toEqual(200)
    expect(res.body.name.official).toEqual('Guam')
  })

  it('get country details by country code cca2/cca3 provide wrong code', async () => {
    const res = await request(app).get('/api/v1/by_country_code/test')
    expect(res.statusCode).toEqual(404)
    expect(res.body.message).toEqual('Country not found')
  })

  it('get country details by country code ccn3', async () => {
    const res = await request(app).get('/api/v1/by_country_code/12')
    expect(res.statusCode).toEqual(200)
    expect(res.body.name.official).toEqual(
      "People's Democratic Republic of Algeria"
    )
  })

  it('get country details by country code ccn3 provide wrong code', async () => {
    const res = await request(app).get('/api/v1/by_country_code/777')
    expect(res.statusCode).toEqual(404)
    expect(res.body.message).toEqual('Country not found')
  })

  it('get country details by country code cca3', async () => {
    const res = await request(app).get('/api/v1/by_country_code/COK')
    expect(res.statusCode).toEqual(200)
    expect(res.body.name.official).toEqual('Cook Islands')
  })
})
