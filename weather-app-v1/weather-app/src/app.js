const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


// Create Express App
const app = express()


// Set Template Engine: Handlebar Plugin for Express
app.set('view engine', 'hbs')


// Set Customize Views DIR for Handlebar
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)


// Set Customize Partials DIR for Handlebar
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)


// Set Static Files to Serve
const publicDirPath = path.join(__dirname, '../public')
app.use(express.static(publicDirPath))


// Routers
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dhanushka'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dhanushka'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Dhanushka',
        helpText: 'This is help message'
    })
})


// Requests with Query String 
app.get('/weather', (req, res) => {
    const city = req.query.city

    if (!city) {
        return res.send({error: 'You mush provide a city'})
    }

    geocode(city, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(longitude, latitude, (error, report) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: report,
                location,
                city
            })
        })
    })
})


// Handle Errors
app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: '404',
        name: 'Dhanushka',
        errorMessage: 'Help article not found'
    })
})


app.get('*', (req, res) => {
    res.render('error404', {
        title: '404',
        name: 'Dhanushka',
        errorMessage: 'Page not found'
    }) 
})


// Start Express Server
app.listen(3000, () => {
    console.log('Server is up on port 3000....')
})
