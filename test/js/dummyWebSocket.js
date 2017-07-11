'use strict';
const WebSocket = require('ws');
// export function WebSocket () {
//   this.send = function (message) {
//     console.log('sent message:', message);
//   };
// }

global.WebSocket = WebSocket;