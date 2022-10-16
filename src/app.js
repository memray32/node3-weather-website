const path=require('path')
const express= require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const app=express()
//define paths for express config
const pubDirectoryPath=path.join(__dirname,'../public')
const viewsDirectoryPath=path.join(__dirname,'../templates/views')
const partialsDirectoryPath=path.join(__dirname,'../templates/partials')

//Setup handle bars and views ocnfiguration
app.set('view engine', 'hbs')
app.set('views',viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

//setup static directory
app.use(express.static(pubDirectoryPath))

app.get('', (req,res)=>{
    res.render('index', {
        title:'Weather',
        name: 'Narasimha Ayyagari'
    })
})

app.get('/about',(req,res)=>{
     res.render('about',{
        title:'About Robots',
        name: 'Narasimha Ayyagari'
        
     })
})

app.get('/help',(req,res)=>{
    res.render('help', {
        title:'Help',
        message: 'This is a help page designed for practice programming using NodeJs',
        name: 'Narasimha Ayyagari'
    })
})

app.get('/weather', (req,res)=>{
    
   //console.log(req.query.address)

   if(!req.query.address){
      return res.send({
        error: 'You must provide address'
      })
   }

   geocode(req.query.address, (error,{latitude,longitude,location} = {})=>{
        if(error)
        {
            return res.send({error})
        }

        forecast(latitude,longitude, (error,forecastData)=>{
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })
   })

//    res.send({
       
//        forecast: 'Partly cloudy',
//        location: 'Bengaluru',
//        address: req.query.address
//     })
})
//app.com
//app.com/help
//app.com/about

app.get('/products', (req,res)=>{

    if(!req.query.search)
    {
       return res.send({
         error: 'You must provide a search term'
       })
    }

    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    //res.send('Help article not found')
    res.render('error',{
        title:'404',
        errorMsg:'Help article not found',
        name: 'Narasimha Ayyagari'
    })

})

app.get('*', (req,res)=>{
  
    //res.send('My 404 Page')

    res.render('error',{
        title:'404',
        errorMsg:'Page not found',
        name:'Narasimha Ayyagari'
    })

})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})
