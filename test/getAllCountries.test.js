const request = require('supertest')
const app = require('../index')

describe('get all countries  data   (/api/v1) endpoint', () => {
  it('get all countries', async () => {
    const res = await request(app).get('/api/v1')
    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toEqual(250)
  })

  it('get country details by common name', async () => {
    const res = await request(app).get('/api/v1/Guam')
    expect(res.statusCode).toEqual(200)
    expect(res.body.name.common).toEqual('Guam')
  })
})
