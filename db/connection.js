require('dotenv').config();

let mongoose = require('mongoose');
let MONGO_DB = process.env.ATLAS_URI;

mongoose.connect(MONGO_DB, { useNewUrlParser: true, useUnifiedTopology:true });

let connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = connection;