const axios = require('axios');
const Countrey=require('../db/model')
const fs = require('fs');



const getApiData =async(req,res)=>{
    console.log()
    if (req.headers['x-admin']==1){
        try{
            const apiResponse=await axios.get('https://restcountries.com/v3.1/all')
            const data=await apiResponse.data;
            
            writeToFile(data);
            res.status(200).json('data downloaded')
            }catch(e){
                console.log(e);
            }
    }else{
        res.status(401).json({message:"you are not authorized "})
    }
    
        
}


const writeToFile=(data)=>{
    fs.writeFileSync('./countries.json',JSON.stringify(data) ,err=>{
        if (err){
            console.log(err)
        }
        })
}
module.exports={getApiData}