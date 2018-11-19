const Comment = require('../models/comment')

class CommentController {
  static getAll (req, res, next) {
    Comment.find()
      .populate('owner', '-password')
      .populate('article', '-article_body')
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
    static getByArticle (req, res, next) {
      Comment.find({
        article: req.params.idArticle
      })
        .populate('owner', '-password')
        .populate('article', '-article_body')
        .sort('-createdAt')
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
    static getOwnComment (req, res, next) {
      Comment.find({
        owner: req.auth_user._id
      })
      .populate('owner', '-password')
      .populate('article', '-article_body')
      .sort('-createdAt')
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
    static newComment (req, res, next) {
      Comment.create({
        owner: req.auth_user._id,
        article: req.params.idArticle,
        comment_body: req.body.comment_body,
        createdAt: new Date()
      })
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
  static removeComment (req, res, next) {
    Comment.findById(req.params.idComment).populate('owner, -password')
      .then(data => {
        if (String(data.owner._id) === String(req.auth_user._id)){
          return Comment.findByIdAndDelete(req.params.idComment)
        } else {
          res.status(401).json({
            result: null,
            error: {
              message: 'Unauthorized to make changes'
            }
          })
        }
      })
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
}

module.exports = CommentController