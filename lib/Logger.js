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
    this.emit('data', buffer.toString('ascii', 0, buffer.length - 2))
};
