const request = require('supertest');
// Start server
//const app = require('../../');
//const fs = require('fs');

import chatCtrl from '../../server/controller/chatCtrl.js';
const expect = require('expect');
const HOST = 'http://localhost:3001';
/**
* include an assertion library here so that you can make assertions other than those
* provided by supertest. Choose whichever assertion library suits you.
*/
// const expect = require('expect');
// const expect = require('chai').expect;
// const assert = require('chai').assert;

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('default responds with 200 status and text/html content type', done => {
        request(HOST)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200, done);
      });
    });
  });

  describe('/messages', () => {
    describe('GET', () => {
      it('message get request gets a response with 200 status and application/json content type', done => {
        // request '/games'
        // expect status 200
        // expect content to equal app json
        request (HOST)
          .get('/messages')
          .expect('Content-Type', /application\/json/)
          .expect(200, done);
     });
    });
  });

  describe('/cookies', () => {
    describe('GET', () => {
      let testSession 
      xit('requesting a cookie will get you one', done => {
        request (HOST)
          .get('/cookies')
          .expect(request.cookies.find(function (cookie) {
              return cookie.name === connect.sid;
          }).toEqual(true))
          .expect(200, done);
     });
    });
  });
});


describe('Database Direct Communication', () => {
  describe('/', () => {
    describe('GET', () => {
      it('allows chatCtrl to post new messages', done => {
        let data = JSON.stringify({src: "testserver", dst: "JanelleCS", content: "I am a robot"});
        chatCtrl.addMsg(data, (err, savedMsg) =>{
          expect(err).toNotExist();
          expect(savedMsg).toExist();
          done();
        });
      });
    });
  });
});
