const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/user')
chai.use(chaiHttp)

describe('POST: User register feature test', function () {
  it('expects an object if succeeded', function (done) {
    chai.request(app)
      .post('/users/register')
      .send({
        name: 'testname',
        email: 'testmail@mail.com',
        password: 'q1w2e3r4'
      })
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res.body).to.not.be.empty
        expect(res.body.result).to.include({
          name: 'testname',
          email: 'testmail@mail.com'
        })
        done()
      })
  })
  it('expects an error if email is not in the right format', function (done) {
    chai.request(app)
      .post('/users/register')
      .send({
        name: 'testname1',
        email: 'tesemail.com',
        password: 'q1w2e3r4'
      })
      .end(function (err, res) {
        expect(res).to.have.status(400)
        expect(res.body.error.error_code).to.equal('INVALID_EMAIL')
        done()
      })
  })
  it('expects an error if email is a duplicate', function (done) {
    chai.request(app)
      .post('/users/register')
      .send({
        name: 'testname',
        email: 'testmail@mail.com',
        password: 'q1w2e3r4'
      })
      .end(function (err, res) {
        expect(res).to.have.status(400)
        expect(res.body.error.error_code).to.equal('EMAIL_NOT_UNIQUE')
        done()
      })
  })
  it('expects an error if password is empty', function (done) {
    chai.request(app)
      .post('/users/register')
      .send({
        name: 'testname',
        email: 'testdoang@mail.com',
        password: ''
      })
      .end(function (err, res) {
        expect(res).to.have.status(400)
        expect(res.body.error.error_code).to.equal('EMPTY_PASSWORD')
        done()
      })
  })


  describe('User login feature test', function () {
    it('expects an object with token if suceeded', function (done) {
      chai.request(app)
        .post('/users/login')
        .send({
          email: 'testmail@mail.com',
          password: 'q1w2e3r4'
        })
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body.result).to.have.ownPropertyDescriptor('token')
          done()
        })
    })
    it('expects an error if wrong password', function (done) {
      chai.request(app)
        .post('/users/login')
        .send({
          email: 'testmail@mail.com',
          password: 'hahaha'
        })
        .end(function (err, res) {
          expect(res).to.have.status(400)
          expect(res.body.error.error_code).to.equal('WRONG_PASSWORD')
          done()
        })
    })
    it('expects an error if not registered yet', function (done) {
      chai.request(app)
        .post('/users/login')
        .send({
          email: 'mailmail@mail.com',
          password: 'q1w2e3r4'
        })
        .end(function (err, res) {
          expect(res).to.have.status(404)
          expect(res.body.error.error_code).to.equal('EMAIL_NOT_REGISTERED')
          done()
        })
    })
    after(function (done) {
      User.deleteMany({})
        .then(data => {
          done()
        })
        .catch(error => {
          console.log(error)
        })
    });
  })

  describe('Find one user', () => {
    it('should return an object if succeeded', done => {
      chai.request(app)
        .post('/users/register')
        .send({
          name: 'tesuserdel',
          email: 'deluser@mail.com',
          password: 'q1w2e3r4'
        })
        .then(res => {
          return chai.request(app)
            .post('/users/login')
            .send({
              email: 'deluser@mail.com',
              password: 'q1w2e3r4'
            })
        })
      .then(res => {
        return chai.request(app)
        .get('/users/profile')
        .set('token', res.body.result.token)
      })
      .then(res => {
        expect(res).to.have.status(200)
        expect(res.body).to.not.be.empty
        expect(res.body.result).to.be.an('Object')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
    })
  })
})

