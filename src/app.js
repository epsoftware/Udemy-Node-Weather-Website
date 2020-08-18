const express = require('express');
const hbs = require('hbs');
const path = require('path')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast');
const { groupCollapsed } = require('console');
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// New code below 

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup Static directoty to server
app.use(express.static(publicDirectoryPath)) // its going to load index.html


app.get('', (req, res) => {
   // res.send('Hello express!');
   // res.send('<h1>Hello express!</h1>'); // sending HTML
 //   res.render('index');

       res.render('index', {
       title: 'Weather App title',
       name: 'Edgar Pineda',
    })
})

// ==> /help
// app.get('/help', (req, res) => {
//      res.send('Help page!');

//  //  res.send ({
//  //      name: 'Edgar',         // sending JSON
//  //      lastname: 'Pineda',
//  //      age: 27
//  //  })
//      res.send([{                 // sending JSON (array)
//          name: 'Edgar',         
//          lastname: 'Pineda',
//          age: 22
//      }, {
//          name: 'Scarlette',         
//          lastname: 'Pineda',
//          age: 4
//      }
// ]
// })

// ==> /about
// app.get('/about', (req, res) => {
//     res.send('About: epSoftware Technologies!');
// })

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOUT',
        name: 'Edgar Pineda',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP',
        helpText: 'Help text message blah, blah',
        name: 'Edgar Pineda'
    })
})

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

            // res.send({
            //     latitude: latitude,
            //     longitude: longitude
            // })
        

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



   // res.send('Weather: Today is going to be hot!!!');
//    res.send ({
//        forecast: 'Its snowing',
//        location: 'Philadelphia',
//        address: req.query.address
//    })
// })

app.get('*', (req, res) => {
    res.render('404', {
    title: '404',
    name: 'Edgar Pineda',
    errorMessage: 'Invalid page!!!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})