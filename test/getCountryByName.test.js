const request = require('supertest')
const app = require('../index')

describe('get  country   data  by name   (/api/v1/:name) endpoint', () => {
  it('get country details by offical name', async () => {
    const res = await request(app).get('/api/v1/Guam')
    expect(res.statusCode).toEqual(200)
    expect(res.body.name.official).toEqual('Guam')
  })

  it('get country details by name provide wrong name', async () => {
    const res = await request(app).get('/api/v1/test')
    expect(res.statusCode).toEqual(404)
    expect(res.body.message).toEqual('Country not found')
  })
})
