const request=require('request')

const weather=(latitude,longitude,callback)=>{
    weatherURL='https://api.darksky.net/forecast/706bfea07a16d5868dec4cd2f2113825/'+latitude+','+longitude+"?units=si"

    request({url:weatherURL,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect to the server',undefined)
        }
        else
        if(body.error)
        {
            callback('Insufficient information provided',undefined)
        }
        else
        {
            callback(undefined,body.currently)
        }
    })
}

module.exports=weather