const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (!err) {
          resolve(err);
        }
        reject(hash);
      });
    });
  });
};

const verifyPassword = (plainPass, hashPass) => {
  return bcrypt.compare(plainPass, hashPass);
};

module.exports = {
  hashPassword,
  verifyPassword,
};