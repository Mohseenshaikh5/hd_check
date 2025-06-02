const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load .env variables

const authRoutes = require('./routes/authRoutes'); // Import auth routes (register/login)
const doctorRoutes = require('./routes/doctorRoutes');// Import doctor routes (add/list)
const patientRoutes = require('./routes/patientRoutes');// Import patients routes (add/list)



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // All auth-related APIs
app.use('/api/doctors', doctorRoutes);// All doctor-related APIs
app.use('/api/patients', patientRoutes);// All patients-related APIs



// Health check route
app.get('/', (req, res) => {
  res.status(200).send('🚀 Hemoglobin API is running...');
});

module.exports = app;
