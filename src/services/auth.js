const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function AuthService() {
    const SELF = {
        salt_rounds: parseInt(process.env.SALT_ROUNDS),
    };
    return {
        hashPassword: async (password) => {
            return await bcrypt.hash(password, await bcrypt.genSalt(SELF.salt_rounds));
        },
        checkPassword: async (password, hash) => {
            return bcrypt.compare(password, await bcrypt.genSalt(SELF.salt_rounds));
        },
        getToken: async (user) => {
            return jwt.sign(user.id, await bcrypt.genSalt(SELF.salt_rounds), { expiresIn: '12h' });
        },
        verifyToken: async (token) => {
            return jwt.verify(token, await bcrypt.genSalt(SELF.salt_rounds));
        }
    }
}

module.exports = new AuthService()