import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import User from '../models/User';
import config from '../config';

const router = Router();

router.post(
  '/register',
  [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password must be not less than 6 symbols').isLength({ min: 6 })
  ],
  async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid registration data'
      })
    }
    const { email, password } = req.body;
    const newUser = await User.findOne({ email: email});

    if (newUser) {
      return res.status(400).json({ message: 'Such user already exists'})
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email: email, password: hashedPassword });

    await user.save();

    res.status(201).json({ message: 'User created' })

  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again later' });
  }
})

router.post(
  '/login',
  [
    check('email', 'Enter valid email').normalizeEmail().isEmail(),
    check('password', 'Enter valid password').exists()
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Invalid login data'
        })
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'This login doesn\'t exist' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password, try again' });
      }

      const token = jwt.sign(
        { userId: user.id },
        config.jwtSecret,
        { expiresIn: '1h' }
      )

      res.json({ token, userId: user.id })

    } catch (e) {
      res.status(500).json({ message: 'Something went wrong, try again later' });
    }
})

module.exports = router;