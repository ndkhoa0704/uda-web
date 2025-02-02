const router = require('express').Router();
const UserController = require('./controllers/userCtrl');

router.use(UserController.verifyLogin);

router.post('/login', UserController.login);
router.post('/createUser', UserController.createUser);


module.exports = router;