require('dotenv').config()

const http = require('./src/infrastructure/http/server')
const server = new http.Server()

server.start()
const app = http.app
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

module.exports = app
