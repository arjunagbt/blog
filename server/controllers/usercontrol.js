require('dotenv').config()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


class UserController {

  static createUserLocal(req, res, next) {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      OAuth: false
    })
    .then(user => {
      res.status(201).json({
        result: user,
        error: null
      })
    })
      .catch(error => {
        if (error.errors.email) {
          res.status(400).json({
            result: null,
            error: {
              error_code: error.errors.email.properties.error_code,
              message: error.errors.email.message
            }
          })
        } else if (error.errors.password) {
          res.status(400).json({
            result: null,
            error: {
              error_code: error.errors.password.message,
              message: 'password cannot be empty'
            }
          })
        } else {
          res.status(500).json({
            result: null,
            error: error
          })
        }
      })
  }
  static loginUserLocal(req, res, next) {
    User.findOne({ email: req.body.email })
      .then(data => {
        if (data) {
          if (bcrypt.compareSync(req.body.password, data.password)) {
            let token = jwt.sign({
              id: data._id,
              role: data.role,
              name: data.name,
              email: data.email
            }, process.env.JWT_SECRET)
            res.status(200).json({
              result: {
                message: 'successfully logged in',
                role: data.role,
                token
              },
              error: null
            })
          } else {
            res.status(400).json({
              result: null,
              error: {
                error_code: 'WRONG_PASSWORD',
                message: 'wrong password'
              }
            })
          }
        } else {
          res.status(404).json({
            result: null,
            error: {
              error_code:'EMAIL_NOT_REGISTERED',
              message: 'email is not registered'
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
  static getOneUser (req, res, next) {
    User.findById(req.auth_user._id).select('-password')
      .then(data => {
        if (data) {
          res.status(200).json({
            result: data,
            error: null
          })
        } else {
          res.status(404).json({
            result: null,
            error: {
              error_code: 'NOT_FOUND',
              message: 'No such user'
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

module.exports = UserController