import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@asd.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'joao',
    email: 'joao@asd.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'test',
    email: 'teste@asd.com',
    password: bcrypt.hashSync('123456', 10),
  }
];

export default users;
