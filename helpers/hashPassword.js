import { genSaltSync, hashSync, compareSync } from "bcrypt";
const saltRounds = 10;

const hashPassword = (password) => {
  const salt = genSaltSync(saltRounds);
  const hash = hashSync(password, salt);
  return hash;
};

const comparePassword = (password, hash) => {
  return compareSync(password, hash);
};

export  { hashPassword, comparePassword };
