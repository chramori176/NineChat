const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://awesomeprogrammer:iloveclimbing@ds034677.mlab.com:34677/ninechatplusplus');
mongoose.connection.once('open', () => {
  console.log('Connected with MongoDB ORM - mongodb-orm');
});

let messagesSchema = mongoose.Schema({
    src: {type: String, required: true},
    dst: {type: String, required: true},
    content: {type: String, required: true},
    timestamp: { type: Date, default: Date.now }
});

let messages = mongoose.model('Messages', messagesSchema)
module.exports = messages 