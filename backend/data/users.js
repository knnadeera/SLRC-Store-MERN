import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@test.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Nisala User",
    email: "nisala@test.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Nadeera User",
    email: "nadeera@test.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
