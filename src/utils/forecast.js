const request = require('request')
const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=3a9ade5045fe8d66cffe7c921e4b92e3&query='+latitude+','+longitude
    request({url,json:true},(error,{ body })=>{
        if(error){
            callback('Unable to find network!','Error')
        }
        else if(body.error){
            callback('Wrong Cordinates Entered!','Error')
        }
        else{
            const message = "It's currently "+body.current.temperature+" degrees and it feels like "+body.current.feelslike+" degrees out there."
            callback(undefined,message)
        }
    })
}
module.exports=forecast