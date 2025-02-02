const router = require('express').Router();
const UserController = require('./controllers/userCtrl');


router.use(UserController.verifyLogin);
router.post('/user/login', UserController.login);
router.post('/user/create', UserController.createUser);


module.exports = router;