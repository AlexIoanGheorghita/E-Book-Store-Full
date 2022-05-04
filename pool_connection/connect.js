const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config(); // Injecting env variables into process.env

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    ssl: {rejectUnauthorized: false}
}); 

const db_query = {
    query: function (query, callback) {
        return pool.query(query, (err, results) => {
            callback(err, results);
        });
    }
};

module.exports = db_query;