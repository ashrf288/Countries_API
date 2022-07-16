// vonver binary to string
// Language: javascript
// 1- split string into array of binary numbers where each element is a word
// 2- convert each elemnt to number using parseInt and specify radix of 2 to indicate binary
// 3- convert each number to character using String.fromCharCode
// 4- push each word  into  the result array
// 5- reverse the result array
// 6- join the result array into a string and return it
function convertBinary (str) {
  const result = []
  str.split(' ').forEach(word => result.push(String.fromCharCode(parseInt(word, 2))))
  return result.reverse().join('')
}

module.exports = convertBinary

console.log(convertBinary(`01101100 01101100 01100001 00101111 00110001 00101110 00110011 01110110 
00101111 01101101 01101111 01100011 00101110 01110011 01100101 01101001 01110010 
01110100 01101110 01110101 01101111 01100011 01110100 01110011 01100101 01110010 
00101111 00101111 00111010 01110011 01110000 01110100 01110100 01101000
`))

// result : https://restcountries.com/v3.1/all
