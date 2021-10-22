const path= require('path')
const express = require('express')
const  hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('request')
console.log(__dirname)
console.log(path.join(__dirname,'../public'))
const app = express()


//define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')

//set up handlebar engine and views loactions
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialpath)

//setup static directory to serve
app.use(express.static(publicDirPath))




//app.com
app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Ramsha Ahmed'
    })
})
// const wForm = document.querySelector('form')
// wForm.addEventListener('submit', ()=>{
// console.log('testing')
// })

app.get('/about',(req, res)=>{
    res.render('about', {
        title: 'About Me:',
        name: 'Ramsha Ahmed'
    })
})
app.get('/help',(req, res)=>{
    res.render('help', {
        msg: 'You are currently on the help page of our website.',
        name: 'Ramsha Ahmed',
        title: 'Weather'
    })
})
// app.get('',(req, res)=>{
//     res.send('<h1>Weather  App</h1>')
//     })
//app.com/help
// app.get('/help',(req, res)=>{
//     res.send({
//         name: 'Ramsha',
//         age: '22'
//     })
//     })
//app.com/about
// app.get('/about',(req, res)=>{
//     res.send('<h1>About Page</h1>')
//     })
//app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
    app.get('/product',(req, res)=>{
      if(!req.query.search)
      {
          return res.send({
              errorMgs: 'Must Provide a Search Term'
          })
      }
        console.log(req.query.search)
        res.send({
            products: []
        })
        })

app.get('/help/*', (req,res)=>{
    res.render('error', {

        msg : 'Help Article not found!',
        name: 'Ramsha Ahmed'
    })
        
    
    })

    app.get('*', (req,res)=>{
    res.render('404page',{
        msg: 'Page not Found',
        name: 'Ramsha Ahmed'
    })
       

})


app.listen(3000, ()=>{
    console.log('server started on port 3000!')
})
