const request = require('supertest')
const app = require('../index')

describe('country endpoints', () => {
  it('wrong endpoint', async () => {
    const res = await request(app).get('/api/ss')
    expect(res.statusCode).toEqual(404)
  })
})
