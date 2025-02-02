const {User} = require('../models/user');
const AuthService = require('../services/auth');
const {isValidEmail} = require('../utils/utils');

function UserController() {
    const SELF = {}
    return {
        createUser: async (req, res) => {
            const {username, fullname, email, password} = req.body;
            if (!isValidEmail(email)) {
                return res.status(400).json({message: 'Invalid email'});
            }
            const hashedPassword = await AuthService.hashPassword(password);
            console.log(hashedPassword);
            return User.create({
                username: username.toLowerCase(),
                fullname: fullname,
                email: email,
                password: hashedPassword,
            }).then(user => {
                res.status(201).json(user);
            }).catch(err => {
                res.status(500).json(err);
            });
        },
        login: async (req, res) => {
            const {username, password} = req.body;
            const userDB = User.findOne({where: {username: username}});
            if (userDB) {
                const isPasswordMatch = await AuthService.checkPassword(password, userDB.password);
                if (isPasswordMatch) {
                    res.cookie('token', await AuthService.getToken(userDB))
                    return res.status(200).json({token: await AuthService.getToken(userDB)});
                } else {
                    return res.status(401).json({message: 'Invalid username or password'});
                }
            }
        },
        verifyLogin: async (req, res, next) => {
            if (req.url === '/user/login' || req.url === '/user/create') {
                return next();
            }
            const token = req.cookies?.token;
            if (!token) {
                return res.status(401).json({message: 'No token provided'});
            }
            const user = await AuthService.verifyToken(token);
            if (user) {
                return next();
            } else {
                return res.status(401).json({message: 'Invalid token'});
            }
        }
    }
}

module.exports = new UserController();