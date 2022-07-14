import jwt from 'jsonwebtoken';
import config from '../config';

export default (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({message: 'Not authorized'});
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();

  } catch (e) {
    res.status(401).json({message: 'Not authorized'});
  }
}