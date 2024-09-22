const { Pool } = require('pg');

/*
 * creates a connection pool between node and pg
 *
 */
const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
});

/*
 * query wrapper for pool.query so we just can reference from `db`
 * 
 */
const query = async (text, params) => pool.query(text, params);

module.exports = {
  query
};


