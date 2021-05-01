const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and view loaction
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Yuvraj Singh Rana',
        img: '/img/weather.png'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Yuvraj Singh Rana',
        img: '/img/about.png',
        about: 'Hi My Name is Yuvraj Singh and i am a Developer you need!'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        message: 'Contact details: insta@yuvi_singh_rana',
        name: 'Yuvraj Singh Rana',
        img: '/img/help.png'
    })
})

 app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address to search!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
 })

 app.get('/help/*',(req,res)=>{
     res.render('404',{
        title:'404',
        message: 'Help Article not found!',
        name: 'Yuvraj Singh Rana'
     })
 })

 app.get('*',(req,res)=>{
     res.render('404',{
         title:'404',
         message: '404 page not found!',
         name: 'Yuvraj Singh Rana'
     })
 })


 app.listen(3000,()=>{
     console.log('Server is up on the port 3000')
 })