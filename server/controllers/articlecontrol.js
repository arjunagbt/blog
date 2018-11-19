const Article = require('../models/article')

class ArticleController {
  static getAllArticle(req, res, next) {
    Article.find().populate('owner', '-password')
      .then(data => {
        res.status(200).json({
          result: data,
          error: null
        })
      })
      .catch(error => {
        res.status(500).json({
          result: null,
          error: error
        })
      })
  }
  static getOwnArticle (req, res, next) {
    Article.find({owner: req.auth_user._id}).sort('-createdAt')
      .populate('owner', '-password')
      .then(data => {
        res.status(200).json({
          result: data,
          error: null
        })
      })
      .catch(error => {
        res.status(500).json({
          result: null,
          error: error
        })
      })
  }
  static getOneArticle(req, res, next) {
    Article.findById(req.params.id)
      .then(data => {
        res.status(200).json({
          result: data,
          error: null
        })
      })
      .catch(error => {
        res.status(500).json({
          result: null,
          error: error
        })
      })
  }
  static createNewArticle(req, res, next) {
    Article.create({
      title: req.body.title,
      owner: req.auth_user._id,
      article_body: req.body.article_body
    })
      .then(data => {
        res.status(201).json({
          result: data,
          error: null
        })
      })
      .catch(error => {
        res.status(500).json({
          result: null,
          error: error
        })
      })
  }
  static updateArticle(req, res, next) {
    Article.findById(req.params.id).populate('owner, -password')
    .then(data => {
      if (String(data.owner._id) === String(req.auth_user._id)){
        Article.findByIdAndUpdate(req.params.id, {
          title: req.body.title,
          article_body: req.body.article_body
        })
        .then(data => {
          res.status(200).json({
            result: data,
            error: null
          })
        })
      } else {
        res.status(500).json({
          result: null,
          error: {
            message: 'Unauthorized to make changes'
          }
        })
      }
    })
    .catch(error => {
      res.status(500).json({
        result: null,
        error: error
      })
    })
  }
  static deleteArticle(req, res, next) {
    Article.findById(req.params.id).populate('owner, -password')
      .then(data => {
        if (String(data.owner._id) === String(req.auth_user._id)){
          Article.findByIdAndDelete(req.params.id)
            .then(data => {
              res.status(200).json({
                result: data,
                error: null
              })
            })
        } else {
          res.status(500).json({
            result: null,
            error: {
              message: 'Unauthorized to make changes'
            }
          })
        }
      })
      .catch(error => {
        res.status(500).json({
          result: null,
          error: error
        })
      })
  }
}

module.exports = ArticleController