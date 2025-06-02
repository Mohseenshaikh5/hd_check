const { createDoctor, getAllDoctors } = require('../models/doctorModel');

const addDoctor = async (req, res) => {
  try {
    const doctor = await createDoctor(req.body);
    res.status(201).json({ message: 'Doctor added successfully', doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const listDoctors = async (req, res) => {
  const searchTerm = req.query.search || ''; // from ?search=Amit

  try {
    const doctors = await getAllDoctors(searchTerm);
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error });
  }
};

module.exports = {
  addDoctor,
  listDoctors
};
