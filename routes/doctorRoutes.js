const express = require('express');
const router = express.Router();
const { addDoctor, listDoctors } = require('../controllers/doctorController');

router.post('/add', addDoctor);
router.get('/list', listDoctors);

module.exports = router;
    