'use strict';

const stream = require('stream');
const Readable = stream.Readable;
const fs = require('fs');

class TextStream extends Readable{

  constructor(source) {
    super();
    this.source = source;
    this.position = 0;
    this.sourcePaused = true;

    if(typeof(source) === 'undefined') {
      throw new Error('The parameter source is expected.');
    }
    else if(typeof(source) == 'string') {
      this.push(source);
    }
    else if(source instanceof Readable) {
      if(!source.isPaused()) {
        this.sourcePaused = false;
        source.on('data', (b) => {
          this.push(b.toString());
        });

        source.on('end', () => {
          this.push(null);
        });
      } else {
        this.position = 0;
      }
    }
    else if(typeof(source) == 'number') {
      this.position = 0;
    }
    else {
      throw new Error('Source type ' + typeof(source) + ' is not supported.');
    }

    if(this.sourcePaused) {
      this.pause();
    }
  }
  _read(size) {
    if(typeof(this.source) == 'number') {
      let buffer = Buffer.alloc(size);
      let length = fs.readSync(this.source, buffer, 0, size, this.position);

      if(length) {
        this.position += length;
        buffer = buffer.slice(0, length);
        this.push(buffer.toString());
      }
    } else if(this.source instanceof Readable) {
      let buffer = this.source.read(size);
      if(buffer) {
        this.push(buffer.toString());
        this.position += buffer.length;
      }
    }
  }
}

module.exports = TextStream;
