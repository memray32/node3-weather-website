const request= require('request')

const forecast=(latitude,longitude,callback) =>{

    const url='http://api.weatherstack.com/current?access_key=39408df94d0ba015d681d59aafa0b5d6&query='+latitude +',' + longitude +'&units=f'
    //console.log(url)
    request({url, json:true}, (error,{body})=>{

        if(error)
        {
          callback('Unable to find weather API', undefined)
        }else if(body.error)
        {
          callback('Unable to find location. Try another search', undefined)
        }
        else{
        
           
            callback(undefined,
                body.current.weather_descriptions[0] +'. The current tempature is '+ body.current.temperature+ ' .The Likely tempature is ' + body.current.feelslike +'. The Humidity is '+body.current.humidity+"%."
            )
        }

    })

}


module.exports=forecast