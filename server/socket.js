const http = require('http');
const WebSocket = require('ws');
const chatCtrl = require('./controller/chatCtrl')

module.exports = function(app) {
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server: server, clientTracking: true });
  const connectList = {};

  const sendToAll = data => {
    Object.keys(connectList).forEach(id => {
      connectList[id].ws.send(data);
    });
  }

  wss.on('connection', function connection(ws, req) {
    let id = Object.keys(connectList).length;
    let username = req.headers.username ? req.headers.username : "Garret";
    connectList[id] = {id: id, ws: ws, username: username};
  
    chatCtrl.getLastTen(username, (err, messages)=>{
      ws.send(JSON.stringify(messages))
    });

    ws.on('message', function incoming(data) {
      chatCtrl.addMsg(data, (err, savedMsg) => {
        sendToAll(JSON.stringify(savedMsg));
      });
    });

    ws.on('close', () => {
      delete connectList[id];
    });
  });
 return server; 
}