const request = require('supertest')
const app = require('../index')

describe('get api data', () => {
  it('save api  data if not  admin  ', async () => {
    const res = await request(app).get('/api/v1/getApi_data')
    expect(res.statusCode).toEqual(401)
    expect(res.body.message).toEqual(
      'you are not authorized '
    )
  })

  it('save api  data if admin  ', async () => {
    const res = await request(app).get('/api/v1/getApi_data').set('X-ADMIN', 1)
    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toEqual(
      'data downloaded'
    )
  })
  it('download api  data if not  admin  ', async () => {
    const res = await request(app).get('/api/v1/download')
    expect(res.statusCode).toEqual(401)
    expect(res.body.message).toEqual(
      'you are not authorized '
    )
  })

  it('download api  data if admin  ', async () => {
    const res = await request(app).get('/api/v1/download').set('X-ADMIN', 1)
    expect(res.statusCode).toEqual(200)
  })
})
