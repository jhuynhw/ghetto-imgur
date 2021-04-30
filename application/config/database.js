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

// application/conf/database.js
// const mysql = require('mysql2');


// const pool = mysql.createPool({
//     host: "localhost",
//     user: "ghetto imgur",
//     password: "password",
//     database: "csc317db",
//     connectionLimit: 50,
//     debug: false,
// });

// const promisePool = pool.promise();
// module.exports = promisePool;