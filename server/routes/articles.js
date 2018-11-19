const express = require('express');
const router = express.Router();
const {ArticleController} = require('../controllers')
const isLogin = require('../middlewares')


router.get('/', ArticleController.getAllArticle)
router.get('/myArticles', isLogin, ArticleController.getOwnArticle)
router.get('/:id', ArticleController.getOneArticle)
router.post('/', isLogin, ArticleController.createNewArticle)
router.delete('/:id', isLogin, ArticleController.deleteArticle)
router.put('/:id', isLogin, ArticleController.updateArticle)

module.exports = router