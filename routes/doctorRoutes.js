const express = require('express');
const router = express.Router();
const { addDoctor, getDoctorsByUserId } = require('../controllers/doctorController');
const verifyToken = require('../middleware/authMiddleware');

// Protected routes with verifyToken
router.post('/add', verifyToken, addDoctor);
router.get('/list/:userId', verifyToken, getDoctorsByUserId);

module.exports = router;
    