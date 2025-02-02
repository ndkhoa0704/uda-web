const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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
        },
        getToken: async (user) => {
            return jwt.sign(user.id, SELF.salt, {expiresIn: '12h'});
        },
        verifyToken: async (token) => {
            return jwt.verify(token, SELF.salt);
        }
    }

}

module.exports = new AuthService()