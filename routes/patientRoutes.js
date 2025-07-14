const express = require('express');
const router = express.Router();
const { addPatient, listPatients } = require('../controllers/patientController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/addPatient',verifyToken, addPatient);
router.get('/doctorId/:doctorId',verifyToken, listPatients);

module.exports = router;
