//db.js

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gama_net',
  password: '123456',
  port: 5432,
});

module.exports = pool;
