const request = require('request')
const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoieXV2aTE2OTAiLCJhIjoiY2tvMnRsbWE4MDJkZzJ3bXhweXA1YjMyOSJ9.ah7G_dx6iQGMGIacFr9Q-A'
    request({url,json:true},(error,{ body }) =>{ // destructed response object to { body } read notes and docs
        if(error){
            callback('Unable to find network!',undefined)
        }
        else if(body.features.length===0){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode