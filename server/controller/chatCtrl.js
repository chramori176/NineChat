const Message = require('../model/message');
// const messageSchema = require('../model/message');
const User = require('../model/users');
const bodyParser = require('body-parser')
let msgDoc; 
let msg; 

const chatCtrl = {

  addMsg(data, callback) {
    try {
      msg = JSON.parse(data)
      if ('src' in msg &&
          'dst' in msg &&
          'content' in msg){
        msgDoc = new Message({
          src: msg.src,
          dst: msg.dst,
          message: msg.content
        })
      } else {throw "msg data lacks key"}
    } catch (err) {
      msgDoc = new Message({
        src: "Garret",
        dst: "message_not_json",
        message: data
      })
      console.log('error ', err)
    }
    msgDoc.save((err, savedMsg)=>{
      if (err) return console.error(err)
      callback(err, savedMsg)
    })
  },
  getMsg(query, callback) {
    Message.find({}, (err, result)=>{
      return callback(err, result)
    })
  },
  getLastTen(userid, callback){
    Message.
      find({}).
      sort({timestamp: -1}).
      limit(10).
      exec((err, result)=>{
        console.log('err', err)
        return callback(err, result)
    })
  },
  get(req, res, next){
    let query = {}
    chatCtrl.getMsg(query, (err, messages)=>{
      if (err) {
        console.error(err)
        res.status(418).send(err)
        next()
      } else {
        res.json(messages)
        next()
      }
    })
  }
};

module.exports = chatCtrl
