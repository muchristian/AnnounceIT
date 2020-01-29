import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import {userSignup3, userSignup4} from './testData';
import Model from '../models/index.dbquery';
const user = new Model('users');

chai.use(chaiHttp);
chai.should();

describe('test register', () => {
    it('should return 201 if the user advertiser registration passed', (done) =>{
        chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send(userSignup3)
        .end((err, res) => {
            res.should.have.status(201);
            done();
        });
    });
    it('should return 201 if the user admin registration passed', (done) =>{
        chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send(userSignup4)
        .end((err, res) => {
            res.should.have.status(201);
            done();
        });
    });
});