const request = require('supertest')
const app = require('../index')

describe('get country currency by CCA2 code  (/api/v1/currency/:cca2) endpoint', () => {
  it('get currency of country by cca2', async () => {
    const res = await request(app).get('/api/v1/currency/NP')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('currencies')
  })

  it('get currency of country by cca2 provide wrong cca2', async () => {
    const res = await request(app).get('/api/v1/currency/wrong')
    expect(res.statusCode).toEqual(404)
    expect(res.body.message).toEqual(
      'Country with that CCA2(country code alpha-2) not found'
    )
  })
})
