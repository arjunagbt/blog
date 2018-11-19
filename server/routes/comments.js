const express = require('express');
const router = express.Router();
const {CommentController} = require('../controllers')
const isLogin = require('../middlewares')

router.get('/', CommentController.getAll)
router.get('/myComments', isLogin, CommentController.getOwnComment)
router.get('/:idArticle', CommentController.getByArticle)
router.post('/:idArticle', isLogin, CommentController.newComment)
router.delete('/:idComment', isLogin, CommentController.removeComment)

module.exports = router