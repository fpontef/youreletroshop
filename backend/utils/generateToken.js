import jwt from 'jsonwebtoken';

// @id   receives the db "user._id"
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export default generateToken;
