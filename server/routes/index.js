const express = require('express');
const router = express.Router();
const routeUser = require('./users')
const routeArticle = require('./articles')
const routeComment = require('./comments')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    msg: 'hello'
  });
});

router.use('/users', routeUser)
router.use('/articles', routeArticle)
router.use('/comments', routeComment)
module.exports = router;
