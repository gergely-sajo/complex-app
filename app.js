const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const app = express()

// Session Configuration Options
let sessionOptions = session({
    secret: "verysecretsecret",
    store: new MongoStore({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // one day
        httpOnly: true
    }
})

app.use(sessionOptions)
app.use(flash())

const router = require('./router')

app.use(express.urlencoded({extended: false})) // have toconfigure the express app for the userController to be able to understand the input. It basically only tells express to add the user-submitted data onto our request object
app.use(express.json())

app.use(express.static('public'))
app.set('views', 'views') // the first argument has to be 'views', but the second argument should be the name of the folder of our view files, .ejs files
app.set('view engine', 'ejs') // we have to let express know which template engine or templating system we are using

app.use('/', router)

module.exports = app // we dont start our app from this file anymore, just exporting the express app, therefore the db.js file can start the app after the connection to the database is established