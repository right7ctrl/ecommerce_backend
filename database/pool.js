const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'ecommerce',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
module.exports = pool;