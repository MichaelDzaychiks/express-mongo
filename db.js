require('dotenv').config();
const databaseUrl = process.env.databaseUrl;
const { MongoClient } = require('mongodb')

let dbConnection;

module.export = {
    connectToDb: (cb) => {
        MongoClient.connect(databaseUrl)
            .then((client) => {
                dbConnection = client.db();
                return db();
            })
            .catch(err => {
                console.log(err);
                return cb(err);
            })
    }, getDb: () => dbConnection
}