const router = require('express').Router();
const UserController = require('./controllers/userCtrl');
const ArticleController = require('./controllers/articleCtrl');


router.use(UserController.verifyLogin);
/* User */
router.post('/user/login', UserController.login);
router.post('/user/create', UserController.createUser);
/* Article */
router.get('/article', ArticleController.getArticles);




module.exports = router;