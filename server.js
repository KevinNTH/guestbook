'use strict'

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const session = require('express-session')

const nunjucks = require('nunjucks')

const objection = require('objection')
const Model = objection.Model
const Knex = require('knex')

// Initialize knex connection.
const knex = Knex({
  client: 'mysql',
  connection: require('./config/db')
})

// Give the connection to objection.
Model.knex(knex)

// template engine
app.set('view engine', 'njk')

nunjucks.configure('views', {
  autoescape: true,
  watch: true, // should be true in dev mode only
  express: app
})

app.use('/assets', express.static('public'))

// set up bodyParser middleware
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// session middleware
app.use(session({
  secret: 'My secret secret cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  } // no https for now
}))

app.use(require('./middlewares/flash'))

// routes
const homeRoutes = require('./routes/home')
const userRoutes = require('./routes/users')
const messageRoutes = require('./routes/messages')
app.use('/', homeRoutes)
app.use('/users', userRoutes)
app.use('/messages', messageRoutes)

// app.post('/', (req, res) => {
//   let message = req.body.message
//   if (message === undefined || message === '') {
//     req.flash('error', 'You didn\'t set any message')
//     res.redirect('/')
//   } else {
//     const Message = require('./models/Message')
//     Message.create(message, () => {
//       req.flash('success', 'Thanks !')
//       res.redirect('/')
//     })')
//       res.redirect('/')
//     })
//   }
// })

// app.post('/login', (req, res) => {
//   let username = req.body.username
//   let password = req.body.password
//
//   const User = require('./models/user')
//
//   User.login({
//     username,
//     password
//   }, (err, user) => {
//     if (err) {
//       req.flash('error', err)
//     } else {
//       req.flash('success', `Login successful for ${username}`)
//     }
//     res.redirect('/')
//   })
// })
//
// app.post('/register', (req, res) => {
//   const User = require('./models/user')
//
//   let username = req.body.username
//   let password = req.body.password
//   let password2 = req.body.password2
//
//   if (password === password2) {
//     User.register({
//       username,
//       password
//     }, user => {
//       req.flash('success', 'Registration is done, you can log in')
//       res.redirect('/')
//     })
//   } else {
//     req.flash('error', 'Passwords did not match')
//     res.redirect('/')
//   }
// })
//
// app.get('/message/:id', (req, res) => {
//   let Message = require('./models/message')
//
//   Message.find(req.params.id, message => {
//     res.render('messages/show', {
//       message
//     })
//   })
// })

app.listen(3000)