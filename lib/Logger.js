var Connection = require('./protocol/Connection.js');
var EventEmitter = require('events').EventEmitter;

module.exports = Logger;

function Logger(options) {
    var self = this;

    this.options = options || {};
    this.connection = new Connection(this.options.authorized);

    this.connection.listen(options.port, options.address, options.type);

    this.connection.on('data', function(data) {
        self.parse(data);
    });

    this.connection.on('error', function(err) {
        self.emit('error', err);
    });
}

Logger.prototype.__proto__ = EventEmitter.prototype;

Logger.prototype.parse = function(buffer) {
    const message = buffer.toString('utf8', 4, buffer.length - 2);
    this.emit('data', message.slice(message.indexOf('L') + 2));
};
