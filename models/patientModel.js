const pool = require('../config/db');

const createPatient = async (data) => {
  const { doctor_id, name, mobile, age, gender, email, } = data;
console.log("add patients>>>",data)
  const query = `
    INSERT INTO patients (doctor_id, name, mobile, age, gender, email )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [doctor_id, name, mobile, age, gender, email, ];
  console.log('value>>>>',values)
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getPatientsByDoctor = async (doctorId) => {
  const query = `SELECT * FROM patients WHERE doctor_id = $1 ORDER BY created_at DESC`;
  const result = await pool.query(query, [doctorId]);
  return result.rows;
};

module.exports = {
  createPatient,
  getPatientsByDoctor,
};
