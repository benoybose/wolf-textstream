'use strict';

const stream = require('stream');
const Readable = stream.Readable;
const fs = require('fs');

class TextStream extends Readable{

  constructor(source, options) {
    super(options);
    this.source = source;

    if(typeof(source) === 'undefined') {
      throw new Error('The parameter source is expected.');
    }
    else if(typeof(source) == 'string') {
      this.push(source);
    }
    else if(source instanceof Readable) {
      if(options) {
        throw new Error('Options are not valid when source is a stream.');
      }
      else {
        source.on('data', (b) => {
          this.push(b.toString());
        });

        source.on('end', () => {
          this.push(null);
        });
      }
    }
    else if(typeof(source) == 'number') {
      if(options) {
        throw new Error('Options are not valid when source is a file descriptor.');
      } else {
        this.position = 0;
      }
    }
    else {
      throw new Error('Source type ' + typeof(source) + ' is not supported.');
    }
  }
  _read(size) {
    if(typeof(this.source) == 'number') {
      let buffer = Buffer.alloc(size);
      let length = fs.readSync(this.source, buffer, 0, size, this.position);
      if(length) {
        buffer = buffer.slice(0, length);
        this.push(buffer.toString());
      } else {
        this.push(null);
      }
    }
  }
}

module.exports = TextStream;
