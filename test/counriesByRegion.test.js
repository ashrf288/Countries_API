const request = require('supertest')
const app = require('../index')

describe('get all countries  data   (/api/v1/by_region/:region) endpoint', () => {
  it('get countries by region ', async () => {
    const res = await request(app).get('/api/v1/by_region/Asia')
    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toEqual(50)
    expect(res.body[0].region).toEqual('Asia')
  })
  it('get countries by region wrong region  ', async () => {
    const res = await request(app).get('/api/v1/by_region/wrong')
    expect(res.statusCode).toEqual(404)
    expect(res.body.message).toEqual('countries not found for this region')
  })
})
