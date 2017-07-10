const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://awesomeprogrammer:iloveclimbing@ds034677.mlab.com:34677/ninechatplusplus');
mongoose.connection.once('open', () => {
  console.log('Connected with MongoDB ORM - mongodb-orm');
});

let messagesSchema = mongoose.Schema({
    src: String,
    dst: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

messages = mongoose.model('Messages', messagesSchema)
module.exports = messages 