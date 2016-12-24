# wolf-textstream [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> A readable stream implementation for string and text files.

## Introduction
Wolf-TextStream is an implementation of node's stream.Readable specification. I developed this module personally to write some unit tests where I need to emulate reading from file, but I don't have an actual file. Hence, I thought to develop an Readable implementation that can accept a string as constructor parameter that mimic like a file content.

The Wolf-TextStream supports not just a string, but a file descriptor or another readable file stream itself.

## Installation

```sh
$ npm install --save wolf-textstream
```

## Usage

### Use a string as source of stream
```js
let textSource = 'Hello, World';
let stream = new WolfTextstream(textSource);
let textData = stream.read().toString();
```

### Use an another readable stream as source of stream
```js
let fileStream = fs.createReadStream(fileName);
let stream = new WolfTextstream(fileStream);
stream.on('data', (data) => {
  data = data.toString();
  data.should.equal(textData);
});
```
### Use file descriptor as source of stream
```js
let fd = fs.openSync(fileName, 'r');
let stream = new WolfTextstream(fd);
let data = stream.read();
data = data.toString();
```

## License

MIT © [Benoy Bose]()


[npm-image]: https://badge.fury.io/js/wolf-textstream.svg
[npm-url]: https://npmjs.org/package/wolf-textstream
[travis-image]: https://travis-ci.org/benoybose/wolf-textstream.svg?branch=master
[travis-url]: https://travis-ci.org/benoybose/wolf-textstream
[daviddm-image]: https://david-dm.org/benoybose/wolf-textstream.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/benoybose/wolf-textstream
[coveralls-image]: https://coveralls.io/repos/github/benoybose/wolf-textstream/badge.svg
[coveralls-url]: https://coveralls.io/github/benoybose/wolf-textstream
