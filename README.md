# Countries_API



## Functional Requirements:

- Programmatically, Show us how did you figure out the API URL.
- Provide us with the following API's
 - Get all countries
    + should support search by CCA2/CCA3/CCN3
    + should support Search by country name. It can be the common name or official 
name
 - Get country currencies by CCA2
 - Group countries
    - by region
    - by language
- store the response that is coming from the API URL inside "countries.json" file
- file endpoints to download "countries.json" file only admins can download, To avoid 
implementing full authentication/authorization mechanism, assume an
admin user if the request contains the header "X-ADMIN=1"

## endpoints 


|  num           | endpoint    | notes   |  
|---             |---          |---      |
|   1            |   `/api/v1`          |  view all countries **only names**        |
|   2            |   `/api/v1/:name`          |  view all country data **works on common and official names**        |
|   3           |   `/api/v1/by_country_code/:code`          |  get country by code workes on  **CCA2/CCA3/CCN3 codes**        |
|   4           |   `/api/v1/currency/:cca2`          |  get currency by cca2 **only**        |
|   5           |   `/api/v1/by_language/:language`          |  get all countries  that uses this language **you can use full name of language or only the first 3 letters**        |
|   6           |   `/api/v1/region/:region`          |  group all countries by region  **type region name**        |
|   7            |   `/api/v1/data`          |  download the original api data as json file **must pass "X-ADMIN=1" to the request header**       |
|   8            |   `/api/v1/downlaod`          |  download api data and store it in  `./countries.json` **must pass "X-ADMIN=1" to the request header**       |






## get the api from binary code :

### steps :
1- split string into array of binary numbers where each element is a word

2- convert each elemnt to number using parseInt and specify radix of 2 to indicate binary

3- convert each number to character using String.fromCharCode

4- push each word  into  the result array

5- reverse the result array

6- join the result array into a string and return it

```
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
```

 **result :** https://restcountries.com/v3.1/all




 ## setup project 


 1- `npm i `

 2- create a `.env` file and copy this code to it 

 ```
 PORT=3000
mongoDBConnectionString=mongodb+srv://ashrf:1234@cluster0.qfd84.mongodb.net/?retryWrites=true&w=majority
 ```

3- to run the project use 
`npm start `  

or to use nodemon `npm run start-dev`


## testing 
 
1- to run the tests use `npm test`

2- to see test coverage use  `npm run coverage`