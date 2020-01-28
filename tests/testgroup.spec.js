import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import db from '../server/database/db';
import { fakeGroups, fakeGroups1, fakeLogin, fakeMember } from './testData';

const should = chai.should();
chai.use(chaiHttp);
let token = ''; // token to pass in the header
describe('groups', () => {
  // clear groups table
  before(async () => {
    try {
      await db.query(
        'TRUNCATE groups CASCADE; ALTER SEQUENCE groups_id_seq RESTART WITH 1;'
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
  describe(' NOT allow anauthorized user to post a group', () => {
    it(' it should return an error', done => {
      chai
        .request(server)
        .post('/api/V2/groups')

        .send(fakeGroups)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(401);
          res.body.should.have.property('error', 'unauthorized access');
          done();
        });
    });
  });

  describe('POST group', () => {
    it(' it should return a valid object', done => {
      chai
        .request(server)
        .post('/api/V2/groups')
        .set('access-token', token)
        .send(fakeGroups)
        .end((err, res) => {
          // console.log(res.body);
          res.should.be.a('object');
          done();
        });
    });
  });
  describe('  not get group  anauthorized user to post a group', () => {
    it(' it should return an error', done => {
      chai
        .request(server)
        .get('/api/V2/groups')
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(401);
          res.body.should.have.property('error', 'unauthorized access');
          done();
        });
    });
  });
  describe('GET all group', () => {
    it(' it should return a valid object of groups in the database', done => {
      chai
        .request(server)
        .get('/api/V2/groups')
        .set('access-token', token)
        .end((err, res) => {
          // console.log(res.body);
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });
  });
  describe(' NOT allow anauthorized user to update a group', () => {
    it(' it should return an error', done => {
      chai
        .request(server)
        .patch(`/api/V2/groups/ ${fakeGroups1.id}/name`)
        .send(fakeGroups)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(401);
          res.body.should.have.property('error', 'unauthorized access');
          done();
        });
    });
  });

  describe('PATCH group', () => {
    it(' it should return a valid object', done => {
      chai
        .request(server)
        .patch(`/api/V2/groups/ ${fakeGroups1.id}/name`)
        .set('access-token', token)
        .send(fakeGroups)
        .end((err, res) => {
          // console.log(res.body);
          res.should.be.a('object');
          done();
        });
    });
  });
  describe('delete groups/: id group', () => {
    it('should not delete group with a specific id for unauthorized user', done => {
      chai
        .request(server)
        .delete('/api/V2/groups/' + fakeGroups1.id)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('error', 'unauthorized access');
          done();
        });
    });
    it('should delete group with a specific id', done => {
      chai
        .request(server)
        .delete('/api/V2/groups/' + fakeGroups1.id)
        .set('access-token', token) // pass the token
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message', 'group deleted');
          done();
        });
    });
  });
});
before(async () => {
  try {
    await db.query(
      'TRUNCATE groups CASCADE; ALTER SEQUENCE members_id_seq RESTART WITH 1;'
    );
  } catch (error) {
    console.log(error);
  }
});
describe(' NOT allow anauthorized user to post a member', () => {
  it(' it should return an error', done => {
    chai
      .request(server)
      .post(`/api/V2/groups/ ${fakeGroups1.id} /users`)

      .send(fakeMember)
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(401);
        res.body.should.have.property('error', 'unauthorized access');
        done();
      });
  });
});

describe('POST group', () => {
  it(' it should return a valid object', done => {
    chai
      .request(server)
      .post(`/api/V2/groups/ ${fakeGroups1.id} /users`)
      .set('access-token', token)
      .send(fakeMember)
      .end((err, res) => {
        // console.log(res.body);
        res.should.be.a('object');
        done();
      });
  });
});
