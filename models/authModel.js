const pool = require('../config/db');

const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const createUser = async ({ name, email, password, role }) => {
  console.log(name, email, password, role )
   const query = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role;
  `;
  const values = [name, email, password, role];

  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { findUserByEmail, createUser };
