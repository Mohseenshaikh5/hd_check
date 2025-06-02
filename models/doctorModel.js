const pool = require('../config/db');

const createDoctor = async (doctorData) => {
  const {
    first_name,
    last_name,
    specialization,
    clinic_address,
    phone,
    campus_date
  } = doctorData;

  console.log('add doctor>>>>>',doctorData)
  const query = `
    INSERT INTO doctors 
    ( first_name, last_name, specialization, clinic_address, phone, campus_date)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [first_name, last_name, specialization, clinic_address, phone, campus_date];
  const result = await pool.query(query, values);
  return result.rows[0];
};


const getAllDoctors = async (searchTerm = '') => {
  let query = 'SELECT * FROM doctors';
  const values = [];

  if (searchTerm) {
    query += ' WHERE first_name ILIKE $1 OR last_name ILIKE $1 OR phone ILIKE $1';
    values.push(`%${searchTerm}%`);
  }

  query += ' ORDER BY id DESC'; // or created_at if added

  const result = await pool.query(query, values);
  return result.rows;
};

module.exports = {
  createDoctor,
  getAllDoctors
};
