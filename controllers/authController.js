const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../models/authModel');

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await findUserByEmail(email);

      console.log("existingUser",existingUser)
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await createUser({ name, email, password: hashedPassword, role });
  console.log("newUser",newUser)
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(email, password )
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Email not exites' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { register, login };
