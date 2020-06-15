const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')

// Paramètres du moteur de rendu
app.set('views', './views')
app.set('view engine', 'twig')

// Middleware
// Charger les fichiers sans routage
app.use(express.static('public'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(session({
  secret: 'askfjdirotplrofp',
  resave: false,
  saveUninitialized: true,
  // secure = false car on utilise pas https
  cookie: { secure: false }
}))

app.use(require('./middlewares/flash'))
app.use(require('./middlewares/myMiddle'))

app.get('/', function (req, res) {
  // Affichage des messages
  let Message = require('./models/message')
  Message.all((messages) => {
    res.render('index', { title: 'Accueil', messages: messages, date: req.requestTime, call: req.callMyMiddle })
  })
})

app.post('/', (req, res) => {
  if (req.body.message === undefined || req.body.message === '') {
    // req.session.error = 'pas de message vide'
    req.flash('/', "pas de message vide :[")

    // res.redirect('/')
  } else {
    let Message = require('./models/message')
    Message.create(req.body.message, () => {
    req.flash('/', "message envoyé :]")
    })
  }
})

app.get('/message/:id', (req, res) => {
  let Message = require('./models/message')
  Message.find(req.params.id, (message) => {
    res.render('messages/show', {message: message})
  })
  
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
  console.log(process.env.NODE_ENV)
})

