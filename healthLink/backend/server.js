const http = require('http');
const app = require('./app');
const port = 3001;
require('dotenv').config();
const server = http.createServer(app);

server.listen(port);
