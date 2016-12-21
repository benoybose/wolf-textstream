'use strict';

const stream = require('stream');
const Readable = stream.Readable;

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
    else {
      throw new Error('Source type is not supported.');
    }
  }
  _read(size) {
  }
}

module.exports = TextStream;
