import bcrypt from 'bcryptjs'
const users = [
  {
    name: 'Admin User',
    email: 'admin@exemeple.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'john Doe',
    email: 'john@exemeple.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Yassine Sb',
    email: 'Yassine@exemeple.com',
    password: bcrypt.hashSync('123456', 10),
  },
]
export default users
