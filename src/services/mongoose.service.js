const mongoose = require('mongoose');
const { database: databaseConfig } = require('../config/index');

const mongo = databaseConfig.mongo;

let uri = `mongodb://${mongo.host}:${mongo.port}/${mongo.name}`
if (mongo.user) {
    uri = `mongodb://${mongo.user}:${mongo.pass}@${mongo.host}:${mongo.port}/${mongodb.name}`
}

mongoose
    .connect(uri)
    .catch(error => console.log(error));

mongoose
    .connection
    .on('error', error => console.log(error));
