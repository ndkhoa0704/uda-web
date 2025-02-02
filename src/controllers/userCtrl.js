const {User} = require('../models/user');
const {Op} = require('sequelize');
const AuthService = require('../services/auth');


function UserController() {
    const SELF = {}
    return {
        createUser: async (req, res) => {
            const {username, fullname, email, password, user_type} = req.body;
            const hashedPassword = await AuthService.hashPassword(password);
            return User.create({
                username,
                fullname,
                email,
                hashedPassword,
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
                const isPasswordMatch = await AuthService.checkPassword(password, userDB.hashedPassword);
                if (isPasswordMatch) {
                    return res.status(200).json(userDB);
                } else {
                    return res.status(401).json({message: 'Invalid username or password'});
                }
            }
        },
    }
}

module.exports = new UserController();