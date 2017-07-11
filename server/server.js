const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const Message = require('./model/message.js')
const chatCtrl = require('./controller/chatCtrl')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(__dirname +'./../public/'));
app.use('/build', express.static(__dirname +'./../build/'))
const server = require('./socket.js')(app);
server.listen(3001)

