const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode') //reference other files in directory 
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public') //naviagte to another folder 
const viewsPath = path.join(__dirname, '../templates/views') //__dirname brings you to folder this file is in
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) 
hbs.registerPartials(partialsPath) //register partials location (headers, footers, etc)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => { //dynamic placeholders
    res.render('index', {
        title: 'Weather App',
        name: 'Kyle Carter'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Kyle Carter'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        help: 'I am here to help!',
        name: 'Kyle Carter'
    })
})

app.get('/weather', (req, res) => { // app.com/weather page
    if(!req.query.address) { // query is URL query eg.: test.com?name=kyle
        return res.send({ // Use return to stop code and not get an error
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) =>{ //passing everything for geocode - put emnpty array for fallback value
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
                address : req.query.address
            })
        })
    })
})


app.get('/products', (req, res) => {
    if(!req.query.search) { // Use URL search query
        return res.send({ // Use return to stop code and not get an error
            error: 'You must provide a seach term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {  // match anything after /help
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Kyle'
    })
})

app.get('*', (req, res) => {  // * matches anything that hasn't been matched so far - needs to be last as a catch all. Reads top down
res.render('404', {
    title: '404',
    errorMessage: 'Page not found.',
    name: 'Kyle'
})
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})









// app.get('', (req, res) => { // what server should do at specific URL
//     res.send('<h1>Weather</h1>')
// }) 

// app.get('/help', (req, res) => { // app.com/help page
//     res.send([{
//         name: 'Kyle',
//     }, {
//         name: 'Krista'
//     }])
// })

// app.get('/about', (req, res) => { // app.com/about page
//     res.send('<h1> This is great! </h1>')
// })