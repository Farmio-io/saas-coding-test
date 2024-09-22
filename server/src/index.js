const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
});

const query = async (text, params) => pool.query(text, params);

module.exports = {
  query
};

