const request = require('supertest')
const app = require('../index')

describe('group countries by langauge   (/api/v1) endpoint', () => {
  it('get countries by language ', async () => {
    const res = await request(app).get('/api/v1/by_language/Nepali')
    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toEqual(1)
    expect(res.body[0].languages).toHaveProperty('nep')
  })
  it('get countries by language shortcut ', async () => {
    const res = await request(app).get('/api/v1/by_language/eng')
    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toEqual(91)
    expect(res.body[0].languages).toHaveProperty('eng')
  })

  it('get countries by region wrong language  ', async () => {
    const res = await request(app).get('/api/v1/by_language/wrong')
    expect(res.statusCode).toEqual(404)
    expect(res.body.message).toEqual(
      'no countries found that uses this language'
    )
  })
})
