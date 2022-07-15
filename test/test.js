const request = require('supertest')
const app = require('../index')

describe('country endpoints', () => {
  it('wrong endpoint', async () => {
    const res = await request(app).get('/api/ss')
    expect(res.statusCode).toEqual(404)
  })

  it('get all countries', async () => {
    const res = await request(app).get('/v1')
    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toEqual(250)
  })

  it('get country details by common name', async () => {
    const res = await request(app).get('/v1/Guam')
    expect(res.statusCode).toEqual(200)
    expect(res.body.name.common).toEqual('Guam')
  })

  it('get country details by offical name', async () => {
    const res = await request(app).get('/v1/Guam')
    expect(res.statusCode).toEqual(200)
    expect(res.body.name.official).toEqual('Guam')
  })

  it('get country details by name provide wrong name', async () => {
    const res = await request(app).get('/v1/test')
    expect(res.statusCode).toEqual(404)
    expect(res.body.message).toEqual('Country not found')
  })

  it('get country details by country code cca2', async () => {
    const res = await request(app).get('/v1/by_country_code/GU')
    expect(res.statusCode).toEqual(200)
    expect(res.body.name.official).toEqual('Guam')
  })

  it('get country details by country code cca2/cca3 provide wrong code', async () => {
    const res = await request(app).get('/v1/by_country_code/test')
    expect(res.statusCode).toEqual(404)
    expect(res.body.message).toEqual('Country not found')
  })

  it('get country details by country code ccn3', async () => {
    const res = await request(app).get('/v1/by_country_code/12')
    expect(res.statusCode).toEqual(200)
    expect(res.body.name.official).toEqual(
      "People's Democratic Republic of Algeria"
    )
  })

  it('get country details by country code ccn3 provide wrong code', async () => {
    const res = await request(app).get('/v1/by_country_code/777')
    expect(res.statusCode).toEqual(404)
    expect(res.body.message).toEqual('Country not found')
  })

  it('get country details by country code cca3', async () => {
    const res = await request(app).get('/v1/by_country_code/COK')
    expect(res.statusCode).toEqual(200)
    expect(res.body.name.official).toEqual('Cook Islands')
  })

  it('get currency of country by cca2', async () => {
    const res = await request(app).get('/v1/currency/NP')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('currencies')
  })

  it('get currency of country by cca2 provide wrong cca2', async () => {
    const res = await request(app).get('/v1/currency/wrong')
    expect(res.statusCode).toEqual(404)
    expect(res.body.message).toEqual(
      'Country with that CCA2(country code alpha-2) not found'
    )
  })

  it('get countries by region ', async () => {
    const res = await request(app).get('/v1/by_region/Asia')
    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toEqual(50)
    expect(res.body[0].region).toEqual('Asia')
  })
  it('get countries by region wrong region  ', async () => {
    const res = await request(app).get('/v1/by_region/wrong')
    expect(res.statusCode).toEqual(404)
    expect(res.body.message).toEqual('countries not found for this region')
  })

  it('get countries by language ', async () => {
    const res = await request(app).get('/v1/by_language/Nepali')
    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toEqual(1)
    expect(res.body[0].languages).toHaveProperty('nep')
  })
  it('get countries by language shortcut ', async () => {
    const res = await request(app).get('/v1/by_language/eng')
    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toEqual(91)
    expect(res.body[0].languages).toHaveProperty('eng')
  })

  it('get countries by region wrong language  ', async () => {
    const res = await request(app).get('/v1/by_language/wrong')
    expect(res.statusCode).toEqual(404)
    expect(res.body.message).toEqual(
      'no countries found that uses this language'
    )
  })
})

describe('get api data', () => {
  it('download api  data if not  admin  ', async () => {
    const res = await request(app).get('/v1/getApi_data')
    expect(res.statusCode).toEqual(401)
    expect(res.body.message).toEqual(
      'you are not authorized '
    )
  })

  it('download api  data if admin  ', async () => {
    const res = await request(app).get('/v1/getApi_data').set('X-ADMIN', 1)
    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toEqual(
      'data downloaded'
    )
  })
})
