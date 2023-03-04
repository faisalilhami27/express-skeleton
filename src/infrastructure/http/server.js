const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')

// import routes
const healthRouter = require('./routes/health/health')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json({ limit: '10mb' }))
app.use(logger('dev'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static())

class Server {
  start() {
    app.use('/health', healthRouter)
    app.use('/', (req, res) => {
      res.send('Welcome to the API')
    })
  }
}

module.exports = {
  app,
  Server,
}
