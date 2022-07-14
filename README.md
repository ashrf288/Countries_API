# Countries_API



## [base URL](https://restcountries.com/v3.1/all)



## endpoints 


|  num           | endpoint    | notes   |  
|---             |---          |---      |
|   1            |   `/`          |  view all countries **only names**        |
|   2            |   `/:name`          |  view all country data **works on common and official names**        |
|   3           |   `/by_country_code/:code`          |  get country by code workes on  **CCA2/CCA3/CCN3 codes**        |
|   4           |   `/currency/:cca2`          |  get currency by cca2 **cca2 only**        |
|   5           |   `/by_language/:language`          |  get all countries  that uses this language **you can use full name of language or only the first 3 letters**        |
|   6           |   `/region/:region`          |  group all countries by region  **type region name**        |
|   7            |   `/data`          |  download the original api data as json file **must pass "X-ADMIN=1" to the request header**       |
