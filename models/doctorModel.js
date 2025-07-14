const pool = require('../config/db');

// const createDoctor = async (doctorData) => {

//   const {
//     first_name,
//     last_name,
//     specialization,
//     clinic_address,
//     phone,
//     campus_date
//   } = doctorData;

//   console.log('add doctor>>>>>',doctorData)
//   const query = `
//     INSERT INTO doctors 
//     ( first_name, last_name, specialization, clinic_address, phone, campus_date)
//     VALUES ($1, $2, $3, $4, $5, $6)
//     RETURNING *;
//   `;

//   const values = [first_name, last_name, specialization, clinic_address, phone, campus_date];
//   const result = await pool.query(query, values);
//   return result.rows[0];
// };

const createDoctor = async (doctorData) => {
  const {
    first_name,
    last_name,
    specialization,
    clinic_address,
    phone,
    campus_date,
    user_id
  } = doctorData;

  const query = `
    INSERT INTO doctors 
    (first_name, last_name, specialization, clinic_address, phone, campus_date, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [first_name, last_name, specialization, clinic_address, phone, campus_date, user_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getDoctorsByUserIdWithSearch = async (userId, searchTerm = '') => {
  let query = 'SELECT * FROM doctors WHERE user_id = $1';
  const values = [userId];

  if (searchTerm) {
    query += ' AND (first_name ILIKE $2 OR last_name ILIKE $2 OR phone ILIKE $2)';
    values.push(`%${searchTerm}%`);
  }

  query += ' ORDER BY id DESC'; // or created_at if you prefer

  const result = await pool.query(query, values);
  return result.rows;
};


module.exports = {
  createDoctor,
  getDoctorsByUserIdWithSearch
};
