var mongoose = require('mongoose');
var keys = require('../config/keys');

const options = {
    autoIndex: true, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 100, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};

exports.connectToMongo = mongoose.connect(keys.mongoURI, options, function(error) {
    // Check error in initial connection.
    if (error) {
        console.log("Failed to connect mongodb through mongoose");
        throw error;
    }
    console.log("Connected to mongodb ... :) ");
});
