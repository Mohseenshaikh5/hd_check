const express = require('express');
const router = express.Router();
const { addPatient, listPatients } = require('../controllers/patientController');

router.post('/addPatient', addPatient);
router.get('/doctorId/:doctorId', listPatients);

module.exports = router;
