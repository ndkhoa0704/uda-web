const bcrypt = require('bcrypt');


function AuthService() {
    const SELF = {
        salt: process.env.SALT
    };
    return {
        hashPassword: async (password) => {
            return bcrypt.hash(password, SELF.salt).then((err, hash) => {
                if (err) {
                    Promise.reject(err);
                }
                Promise.resolve(hash);
            });
        },
        checkPassword: async (password, hash) => {
            return bcrypt.compare(password, hash);
        }
    }

}

module.exports = new AuthService()