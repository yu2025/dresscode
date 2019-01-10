require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;

// Note: A production application should not expose database credentials in plain text.
// For strategies on handling credentials, visit 12factor: https://12factor.net/config.
const DB_URI = `mongodb://<${db_user}>:<${db_pass}>@ds125068.mlab.com:25068/nazotabi-db`;
const dbName = "nazotabi";

export default dbClient = () => {
    const client = MongoClient;
    return new Promise((resolve, reject) => {
        try {
            const db = client.connect(DB_URI);
            resolve(db(dbName));
        } catch (error) {
            reject(error);
        }
    });
};

