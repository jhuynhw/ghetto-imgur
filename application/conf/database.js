const mysql = require('mysql2');


const pool = mysql.createPool({
    host: "localhost",
    user: "ghetto_imgur",
    password: "password",
    database: "csc317db",
    connectionLimit: 50,
    debug: false,
});

const promisePool = pool.promise();
module.exports = promisePool;