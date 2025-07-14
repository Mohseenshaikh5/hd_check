const { createDoctor, getDoctorsByUserIdWithSearch } = require('../models/doctorModel');

// const addDoctor = async (req, res) => {
//   try {
//     const doctor = await createDoctor(req.body);
//     res.status(201).json({ message: 'Doctor added successfully', doctor });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

const addDoctor = async (req, res) => {
  try {
    const { first_name, last_name, specialization, clinic_address, phone, campus_date } = req.body;
    const user_id = req.user.id; // Get the logged-in user's ID

    const doctor = await createDoctor({
      first_name,
      last_name,
      specialization,
      clinic_address,
      phone,
      campus_date,
      user_id
    });

    res.status(201).json({ message: 'Doctor added successfully', doctor });
  } catch (error) {
    res.status(500).json({ message: 'Error adding doctor', error });
  }
};

// const listDoctors = async (req, res) => {
//   const searchTerm = req.query.search || ''; // from ?search=Amit

//   try {
//     const doctors = await getAllDoctors(searchTerm);
//     res.status(200).json(doctors);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching doctors', error });
//   }
// };
const getDoctorsByUserId = async (req, res) => {
  const { userId } = req.params;
  const searchTerm = req.query.search || ''; // get ?search= from query params

  try {
    const doctors = await getDoctorsByUserIdWithSearch(userId, searchTerm);
    res.status(200).json({ doctors });
  } catch (error) {
    console.error('Error fetching doctors by user ID:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  addDoctor,
  getDoctorsByUserId
};


