const { createPatient, getPatientsByDoctor } = require('../models/patientModel');

const addPatient = async (req, res) => {
  try {
    const newPatient = await createPatient(req.body);
    res.status(201).json({ message: 'Patient added successfully', patient: newPatient });
  } catch (error) {
    res.status(500).json({ message: 'Error adding patient', error });
  }
};

const listPatients = async (req, res) => {
  const doctorId = req.params.doctorId;
  try {
    const patients = await getPatientsByDoctor(doctorId);
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error });
  }
};

module.exports = {
  addPatient,
  listPatients,
};
