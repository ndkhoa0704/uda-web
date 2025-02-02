const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function AuthService() {
    const SELF = {
        salt_rounds: parseInt(process.env.SALT_ROUNDS),
    };
    return {
        hashPassword: async (password) => {
            const salt = await bcrypt.genSalt(SELF.salt_rounds);
            return await bcrypt.hash(password, salt);
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