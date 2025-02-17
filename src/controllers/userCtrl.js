const { User } = require('../models/user');
const AuthService = require('../services/auth');
const { isValidEmail } = require('../utils/utils');
const Logger = require('../utils/logger');

function UserController() {
    const SELF = {
        excludedRoutes: ['/user/login', '/user/create', '/article']
    }
    return {
        createUser: async (req, res) => {
            const { username, fullname, email, password } = req.body;
            if (!username || !fullname || !email || !password) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            if (!isValidEmail(email)) {
                return res.status(400).json({ message: 'Invalid email' });
            }
            const hashedPassword = await AuthService.hashPassword(password);
            return User.create({
                username: username.toLowerCase(),
                fullname: fullname,
                email: email,
                password: hashedPassword,
            }).then(user => {
                res.status(201).json(user);
            }).catch(err => {
                if (err.name === 'SequelizeUniqueConstraintError') {
                    return res.status(400).json({ message: 'Username or Email already exists' });
                }
                Logger.info('createdUser - error', err);
                res.status(500).json({ msg: 'Error creating user' });
            });
        },
        login: async (req, res) => {
            const { username, password } = req.body;
            const userDB = User.findOne({ where: { username: username } });
            if (userDB) {
                const isPasswordMatch = await AuthService.checkPassword(password, userDB.password);
                if (isPasswordMatch) {
                    res.cookie('token', await AuthService.getToken(userDB))
                    return res.status(200).json({ token: await AuthService.getToken(userDB) });
                } else {
                    return res.status(401).json({ message: 'Invalid username or password' });
                }
            }
        },
        verifyLogin: async (req, res, next) => {
            if (SELF.excludedRoutes.includes(req.url)) {
                return next();
            }
            const token = req.cookies?.token;
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }
            const user = await AuthService.verifyToken(token);
            if (user) {
                return next();
            } else {
                return res.status(401).json({ message: 'Invalid token' });
            }
        }
    }
}

module.exports = new UserController();