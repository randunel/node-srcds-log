var dgram = require('dgram');
var EventEmitter = require('events').EventEmitter;

module.exports = Connection;

function Connection(authorized) {
    this.authorized = authorized || null;
    this.socket = null;
};

Connection.prototype.__proto__ = EventEmitter.prototype;

Connection.prototype.listen = function(port, address, type, cb) {
    var self = this;
    if(typeof(type) == 'function') {
        cb = type;
        type = null;
    }
    if(typeof(address) == 'function') {
        cb = address;
        address = null;
    }
    if(typeof(port) == 'function') {
        cb = port;
        port = null;
    }
    this.socket = dgram.createSocket(type || 'udp4');
    this.socket.bind(port || 27017, address || '0.0.0.0', function() {
        console.log('srcds-log listening on', port, address, type);
        cb && cb();
    });

    this.socket.on('message', function(msg, remote) {
        if(self.authorized)
            if(self.authorized.indexOf(remote.address) == -1)
                return;
        self.emit('data', msg);
    });

    this.socket.on('error', function(err) {
        self.emit('error', err);
    });
};
