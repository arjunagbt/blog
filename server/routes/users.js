const express = require('express');
const router = express.Router();
const {UserController} = require('../controllers')
const isLogin = require('../middlewares')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/register', UserController.createUserLocal)
router.post('/login', UserController.loginUserLocal)
router.get('/profile', isLogin, UserController.getOneUser)
module.exports = router;
