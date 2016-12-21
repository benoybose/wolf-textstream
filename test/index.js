'use strict';

const assert = require('should');
const fs = require('fs');
const WolfTextstream = require('../lib/wolf-textstream');

describe('WolfTextstream', () => {
  it('Should be a function (class constructor)', () => {
    WolfTextstream.should.be.type('function');
  });

  it('Should have at least one parameter, otherwise throw exception', () => {
    (() => {
      let stream = new WolfTextstream();
    }).should.throw();
  });

  it('Should accept string as parameter.', () => {
    (() => {
      let textSource = 'Hello, World';
      let stream = new WolfTextstream(textSource);
      stream.on('data', (data) => {
        let textData = data.toString();
        textData.should.equal(textSource);
      });
    }).should.not.throw();
  });

  describe('read', () => {
    it('Should return text data.', () => {
      let textSource = 'Hello, World';
      let stream = new WolfTextstream(textSource);
      let textData = stream.read().toString();
      textData.should.equal(textSource);
    });
  });

  it('should accept another stream as source.', () => {
    let textData = 'Hello, file content.';
    let fileName = 'testfile';

    fs.writeFile(fileName, textData);
    let fileStream = fs.createReadStream(fileName);
    let fileContent = null;
    let stream = new WolfTextstream(fileStream);
    fs.unlink(fileName);
  });

  it('should not accept options when source is a stream.', () => {
    let textData = 'Hello, file content.';
    let fileName = 'testfile';

    fs.writeFile(fileName, textData);
    let fileStream = fs.createReadStream(fileName);
    let fileContent = null;
    (() => {
      let stream = new WolfTextstream(fileStream, {});
    }).should.throw();
    fs.unlink(fileName);
  });

  it('should not accept source anything otherthan a string or readable stream.',
    () => {
      (() => {
        let stream = new WolfTextstream({});
      }).should.throw();
  });

});
