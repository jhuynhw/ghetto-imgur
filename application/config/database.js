const mysql = require('mysql2');

// MODIFY BASED ON YOUR OWN DATABASE
const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'rugmi',
    password: 'Rugmi123!',
    database: 'csc317db',
    //debug: true,
});

const promisePool = pool.promise();

module.exports = promisePool;