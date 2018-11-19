const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/user')
const Article = require('../models/article')
chai.use(chaiHttp)

describe('GET:/articles get a list of all articles in the site', () => {
  it('expects an array if succeeded', done => {
    chai.request(app)
      .get('/articles')
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
        done()
      })
      .catch(error => {
        console.log(error)
        done()
      })
  });
})

describe('GET:/ Own articles get a list of articles the user posted', () => {
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
  it('expects an array if succeeded', done => {
    chai.request(app)
      .get('/articles/myArticles')
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
        done()
      })
      .catch(error => {
        console.log(error)
        done()
      })
  });
})

describe('GET:/articles/:id', () => {
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
  it('expects an object if succeeded', done => {
    chai.request(app)
      .get('/articles/' + id)
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body.result).to.be.an('Object')
        done()
      })
  })
  after(done => {
    User.deleteMany({})
      .then(data => {
        return Article.deleteMany({})
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

describe('POST:/articles create a new article', () => {
  let token = ''
  before(done => {
    chai.request(app)
      .post('/users/register')
      .send({
        name: 'tesuserpost',
        email: 'postuser@mail.com',
        password: 'q1w2e3r4'
      })
      .then(res => {
        return chai.request(app)
          .post('/users/login')
          .send({
            email: 'postuser@mail.com',
            password: 'q1w2e3r4'
          })
      })
      .then(res => {
        token = res.body.result.token
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
  it('expects an object after saving', done => {
    chai.request(app)
      .post('/articles')
      .set('token', token)
      .send({
        title: 'ini tes title',
        article_body: 'lorem ipsum dolor sit amet'
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res.body).to.not.be.empty
        expect(res.body.result).to.include({
          title: 'ini tes title',
          article_body: 'lorem ipsum dolor sit amet'
        })
        done()
      })
  })
  after(done => {
    User.deleteMany({})
      .then(data => {
        return Article.deleteMany({})
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

describe('DELETE:/articles/:id', () => {
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

  it('expects a status 200 if succeeded in deleting', done => {
    chai.request(app)
      .delete(`/articles/${id}`)
      .set('token', token)
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
  })
  it('expects a status 500 if unathorized to delete', done => {
    chai.request(app)
      .post('/users/login')
      .send({
        email: 'deluser1@mail.com',
        password: 'q1w2e3r4'
      })
      .then(res => {
        chai.request(app)
          .delete(`/articles/${id}`)
          .set('token', res.body.result.token)
          .end((err, res) => {
            expect(res).to.have.status(500)
            done()
          })
      })
  })
  after(done => {
    User.deleteMany({})
      .then(data => {
        return Article.deleteMany({})
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

describe('UPDATE:/articles/:id', () => {
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
  it('expects a status 200 if succeeded in updating', done => {
    chai.request(app)
      .put('/articles/' + id)
      .set('token', token)
      .send({
        title: 'ini update title',
        article_body: 'update lorem ipsum dolor sit amet'
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.not.be.empty
        done()
      })
  })
  it('expects a status 500 if unathorized to update', done => {
    chai.request(app)
      .post('/users/login')
      .send({
        email: 'deluser1@mail.com',
        password: 'q1w2e3r4'
      })
      .then(res => {
        chai.request(app)
          .put('/articles/' + id)
          .set('token', res.body.result.token)
          .send({
            title: 'ini update title',
            article_body: 'update lorem ipsum dolor sit amet'
          })
          .end((err, res) => {
            expect(res).to.have.status(500)
            done()
          })
      })
  })
  after(done => {
    User.deleteMany({})
      .then(data => {
        return Article.deleteMany({})
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