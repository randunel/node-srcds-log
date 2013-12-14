var Log = require('../lib/Logger.js');

var log = new Log( {
    address: '192.168.0.14',
    port: 27017
});

log.on('data', function(data) {
    console.log(data);
});
