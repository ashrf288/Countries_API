const convertBinary = require('../convertBinaryToString')

describe('convertBinary', () => {
  it('should convert binary to string', () => {
    expect(convertBinary('01110100 01100110 01101111 01110011 01100100 01100001 01001110'))
      .toEqual(
        'Nadsoft'
      )
  }
  )
  it('should convert binary to string', () => {
    expect(convertBinary('01101100 01101100 01100001 00101111 00110001 00101110 00110011 01110110 00101111 01101101 01101111 01100011 00101110 01110011 01100101 01101001 01110010 01110100 01101110 01110101 01101111 01100011 01110100 01110011 01100101 01110010 00101111 00101111 00111010 01110011 01110000 01110100 01110100 01101000'))
      .toEqual(
        'https://restcountries.com/v3.1/all'
      )
  }
  )
})
