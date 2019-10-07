const request=require('request')

const geocode=(address,callback)=>{
    geocodeURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHJhdmVzaDQ1IiwiYSI6ImNrMTM2dDU3eTA1dmIzZHB5cnQ0YjA4NnIifQ.FGIOIXvkQb3BQTxpFpahQQ'

    request({url:geocodeURL,json:true},(error,response)=>{
        if(error)
        {
            callback('Unable to connect to the server',undefined)
        }
        else
        if(response.body.features.length===0)    
        {
            callback('Unable to find the location.Try Again',undefined)
        }
        else
        {
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                place:response.body.features[0].place_name
            })
        }
    })
}

module.exports=geocode