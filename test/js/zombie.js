const Browser = require('zombie');
const expect = require('expect');
// Include one of the following assertion libraries if you need to make assertions
// that Zombie does not provide out of the box.
// const expect = require('expect');
// const expect = require('chai').expect;
// const assert = require('chai').assert;


describe('Front-end Integration/Features', () => {
  const browser = new Browser();
  browser.silent = true;

  before(done => {
    browser.visit('http://localhost:3001/', done);
  });

  describe('Initial display', () => {
    it('loads successfully', () => {
      browser.assert.success();
    });

    it('displays a chat area', () => {
      browser.assert.element('#chat');
    });

    // TODO: Finish tests

    it('has a send button', () => {
      // browser assert elements - rows - 3
      browser.assert.element('#sendButton');
    });


    xit('lets you click on the send button', () => {
      browser.fire('#sendButton', 'click');
      browser.assert.elements('.msgcontainer');
    });

  });

});
