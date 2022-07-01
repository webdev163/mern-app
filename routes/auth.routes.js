const { Router } = require('express');
const bcrypt = require('bcryptjs');
const router = Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = await User.findOne({ email: email});

    if (newUser) {
      return res.status(400).json({ message: 'Such user already exists'})
    }

    const hashedPassword = bcrypt.hash(password, 22);
    const user = new User({ email: email, password: hashedPassword })

    await user.save();

    res.status(201).json({ message: 'User created' })

  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again later' });
  }
})

router.post('/login', async (req, res) => {

})

module.exports = router;