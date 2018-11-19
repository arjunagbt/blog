const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const Comment = require('../models/comment')
const User = require('../models/user')
const Article = require('../models/article')
chai.use(chaiHttp)

describe('GET all comments', () => {
  it('expects an array with status 200 if succeeded', done => {
    chai.request(app)
      .get('/comments')
      .end((err, res) => {

        expect(res).to.have.status(200)
        expect(res.body.result).to.be.an.instanceOf(Array)
        done()
      })
  })

})

describe('POST comments', () => {
  let id = ''
  let token = ''
  before(done => {
    chai.request(app)
      .post('/users/register')
      .send({
        name: 'tesuserdel',
        email: 'deluser@mail.com',
        password: 'q1w2e3r4'
      })
      .then(res => {
        return chai.request(app)
          .post('/users/register')
          .send({
            name: 'tesuserdel1',
            email: 'deluser1@mail.com',
            password: 'q1w2e3r4'
          })
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
        token = res.body.result.token
        return chai.request(app)
          .post('/articles')
          .set('token', token)
          .send({
            title: 'ini tes title',
            article_body: 'lorem ipsum dolor sit amet'
          })
      })
      .then(res => {
        id = res.body.result._id
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
  it('expects an array with status 200 if succeeded', done => {
    chai.request(app)
      .post(`/comments/${id}`)
      .set('token', token)
      .send({
        comment_body: 'hahaha'
      })
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        done()
      })
  })
  after(done => {
    User.deleteMany({})
      .then(data => {
        return Article.deleteMany({})
      })
      .then(data => {
        return Comment.deleteMany({})
      })
      .then(data => {
        done()
      })
      .catch(error => {
        console.log(error)
        done()
      })
  });
})

describe('GET my comments', () => {
  let id = ''
  let token = ''
  before(done => {
    chai.request(app)
      .post('/users/register')
      .send({
        name: 'tesuserdel',
        email: 'deluser@mail.com',
        password: 'q1w2e3r4'
      })
      .then(res => {
        return chai.request(app)
          .post('/users/register')
          .send({
            name: 'tesuserdel1',
            email: 'deluser1@mail.com',
            password: 'q1w2e3r4'
          })
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
        token = res.body.result.token
        return chai.request(app)
          .post('/articles')
          .set('token', token)
          .send({
            title: 'ini tes title',
            article_body: 'lorem ipsum dolor sit amet'
          })
      })
      .then(res => {
        id = res.body.result._id
        return chai.request(app)
        .post(`/comments/${id}`)
        .set('token', token)
        .send({
          comment_body: 'hahaha'
        })
      })
      .then(res => {
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('should return an array of object with status 200', done => {
    chai.request(app)
      .get('/comments/myComments')
      .set('token', token)
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body.result).to.be.an.instanceOf(Array)
        done()
      })
  })

  after(done => {
    User.deleteMany({})
      .then(data => {
        return Article.deleteMany({})
      })
      .then(data => {
        return Comment.deleteMany({})
      })
      .then(data => {
        done()
      })
      .catch(error => {
        console.log(error)
        done()
      })
  });
})

describe('GET an article\'s comments', () => {
  let id = ''
  let token = ''
  before(done => {
    chai.request(app)
      .post('/users/register')
      .send({
        name: 'tesuserdel',
        email: 'deluser@mail.com',
        password: 'q1w2e3r4'
      })
      .then(res => {
        return chai.request(app)
          .post('/users/register')
          .send({
            name: 'tesuserdel1',
            email: 'deluser1@mail.com',
            password: 'q1w2e3r4'
          })
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
        token = res.body.result.token
        return chai.request(app)
          .post('/articles')
          .set('token', token)
          .send({
            title: 'ini tes title',
            article_body: 'lorem ipsum dolor sit amet'
          })
      })
      .then(res => {
        id = res.body.result._id
        return chai.request(app)
        .post(`/comments/${id}`)
        .set('token', token)
        .send({
          comment_body: 'hahaha'
        })
      })
      .then(res => {
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('should return an array of object with status 200', done => {
    chai.request(app)
      .get(`/comments/${id}`)
      .set('token', token)
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body.result).to.be.an.instanceOf(Array)
        done()
      })
  })

  after(done => {
    User.deleteMany({})
      .then(data => {
        return Article.deleteMany({})
      })
      .then(data => {
        return Comment.deleteMany({})
      })
      .then(data => {
        done()
      })
      .catch(error => {
        console.log(error)
        done()
      })
  });
})

describe('DELETE own comments', () => {
  let id = ''
  let token = ''
  before(done => {
    chai.request(app)
      .post('/users/register')
      .send({
        name: 'tesuserdel',
        email: 'deluser@mail.com',
        password: 'q1w2e3r4'
      })
      .then(res => {
        return chai.request(app)
          .post('/users/register')
          .send({
            name: 'tesuserdel1',
            email: 'deluser1@mail.com',
            password: 'q1w2e3r4'
          })
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
        token = res.body.result.token
        return chai.request(app)
          .post('/articles')
          .set('token', token)
          .send({
            title: 'ini tes title',
            article_body: 'lorem ipsum dolor sit amet'
          })
      })
      .then(res => {
        id = res.body.result._id
        return chai.request(app)
        .post(`/comments/${id}`)
        .set('token', token)
        .send({
          comment_body: 'hahaha'
        })
      })
      .then(res => {
        id = res.body.result._id
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('should return an status 200', done => {
    chai.request(app)
      .delete(`/comments/${id}`)
      .set('token', token)
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
  })

  after(done => {
    User.deleteMany({})
      .then(data => {
        return Article.deleteMany({})
      })
      .then(data => {
        return Comment.deleteMany({})
      })
      .then(data => {
        done()
      })
      .catch(error => {
        console.log(error)
        done()
      })
  });
})