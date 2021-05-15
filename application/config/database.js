const mysql = require('mysql2');

// MODIFY BASED ON YOUR OWN DATABASE
const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'ghetto_imgur',
    password: 'password',
    database: 'csc317db',
    debug: false,
});

const promisePool = pool.promise();

module.exports = promisePool;