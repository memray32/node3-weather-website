const request = require('request')

const geoCodes = (address,callback) =>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibmE0OCIsImEiOiJjbDk2cDdzMmQwMHE0M25xOHFnZWc1djI2In0.WF8EMF33IQNULqZ_CZiKmg&limit=1'
    //console.log(geoCodeURL)

    request({url, json:true},(error,{body})=>{

        //console.log(response)

        if(error)
        {
          callback('Unable to find the location', undefined)
        }
        else if(body.features.length === 0){
          callback('Unable to find the location. Try a new search')
        }
        else{
           // console.log('HELLO')
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports=geoCodes