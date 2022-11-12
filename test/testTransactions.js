const request = require('supertest');

const app = require('../app');

//Testing endpoint transactions
//Get all transactions
describe('GET /transactions/?', () => {
  it('respond "Transactions retrieved successfully" when contain a transactions list', done => {
    request(app)
      .get('/transactions/')
      .set('Accept', 'aplication/json')
      .expect('Content-Type', /json/)
      .expect(200);
    done();
  });
});

//Get transactions by Id Found
describe('GET /transactions/:id', () => {
  it('respond "Transaction retrieved successfully" when transaction exist', done => {
    request(app)
      .get('/transactions/2')
      .set('Accept', 'aplication/json')
      .expect('Content-Type', /json/)
      .expect(200);
    done();
  });
});

//Get transactions by Id Not Found
describe('GET /transactions/:id', () => {
  it('respond "Transacion not found" when transaction does not exist', done => {
    request(app)
      .get('/transactions/12')
      .set('Accept', 'aplication/json')
      .expect('Content-Type', /json/)
      .expect(400);
    done();
  });
});

//Post create new transactions
describe('POST /transactions', () => {
  it('respond "Transaction retrieved successfully" when transacction was successfully created', done => {
    const data = {
      userId: '1',
      categoryId: '1',
      amount: '5000',
    };
    request(app)
      .post('/transactions')
      .send(data)
      .set('Accept', 'aplication/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /transactions', () => {
  it('respond "Fields could not be validated" when transacction is wrong created', done => {
    const data = {
      userId: '',
      categoryId: '',
      amount: '',
    };
    request(app)
      .post('/transactions')
      .send(data)
      .set('Accept', 'aplication/json')
      .expect('Content-Type', /json/)
      .expect(400);
    done();
  });
});
