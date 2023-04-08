require('dotenv').config();

const constant = require('./src/constant/common');
const http = require('./src/infrastructure/http/server');

const server = new http.Server();

server.start();
const { app } = http;
const port = constant.common.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
