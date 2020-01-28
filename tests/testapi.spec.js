import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import db from '../server/database/db';
import { fakeMessages, fakeMessages2, fakeMessages3, fakeLogin } from './testData';

const should = chai.should();
chai.use(chaiHttp);
let token = ''; // token to pass in the header
describe('message', () => {
  // clear messages table
  before(async () => {
    try {
      await db.query(
        'TRUNCATE messages CASCADE; ALTER SEQUENCE messages_id_seq RESTART WITH 1;'
      );
    } catch (error) {
      console.log(error);
    }
  });
  describe('POST a login', () => {
    it(' it should return a valid object', done => {
      chai
        .request(server)
        .post('/api/V2/auth/login')
        .send(fakeLogin)
        .end((err, res) => {
          res.should.be.a('object');
          res.should.have.status(200);
          res.body.should.have.property('data');
          token = res.body.data.token;
          done();
        });
    });
  });
  describe('/GET message', () => {
    it('should  not get all the message to unauthenticated user ', done => {
      chai
        .request(server)
        .get('/api/V2/messages')
        .end((err, res) => {
          res.should.have.status(401);

          done();
        });
    });
    it('should   get all the message to unauthenticated user ', done => {
      chai
        .request(server)
        .get('/api/V2/messages')
        .set('access-token', token) // pass the token
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');

          done();
        });
    });
  });

  describe('/GET unread message', () => {
    it('should  not display  all unread message to unathaurized user', done => {
      chai
        .request(server)
        .get('/api/V2/messages/unread')
        .end((err, res) => {
          res.should.have.status(401);
          // res.body.should.be.a('array');

          done();
        });
    });
  });

  describe('/GET sent message', () => {
    it('should not dispaly all sent message to unauthorized user', done => {
      chai
        .request(server)
        .get('/api/V2/messages/sent')
        .end((err, res) => {
          res.should.have.status(401);

          done();
        });
    });
    it('should  dispaly all sent message to unauthorized user', done => {
      chai
        .request(server)
        .get('/api/V2/messages/sent')
        .set('access-token', token) // pass the token
        .end((err, res) => {
          res.should.have.status(400);
          // res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('POST message', () => {
    it(' it should return a valid object', done => {
      chai
        .request(server)
        .post('/api/V2/messages')
        .set('access-token', token)
        .send(fakeMessages2)
        .end((err, res) => {
          res.should.be.a('object');
          done();
        });
    });
  });

  describe('POST not allow an anauthorized user post message', () => {
    it(' it should return an error', done => {
      chai
        .request(server)
        .post('/api/V2/messages')

        .send(fakeMessages3)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('error', 'unauthorized access');
          done();
        });
    });
  });

  describe('GET messages/: id message', () => {
    it('should display message with a specific id', done => {
      chai
        .request(server)
        .get('/api/V2/messages/' + fakeMessages.id)
        .set('access-token', token) // pass the token
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });
    it('should not display a message to unauthorized user', done => {
      chai
        .request(server)
        .get('/api/v2/messages/id message')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('error', 'unauthorized access');
          done();
        });
    });
  });

  describe('delete messages/: id message', () => {
    it('should not delete message with a specific id for unauthorized user', done => {
      chai
        .request(server)
        .delete('/api/V2/messages/' + fakeMessages.id)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('error', 'unauthorized access');
          done();
        });
    });
    it('should delete message with a specific id', done => {
      chai
        .request(server)
        .delete('/api/V2/messages/' + fakeMessages.id)
        .set('access-token', token) // pass the token
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message', 'message deleted');
          done();
        });
    });
  });
});
