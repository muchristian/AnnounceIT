import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import {userSignup1, userSignup2, userSignin1, userSignin2} from './testData';

chai.use(chaiHttp);
chai.should();

describe('test signup', () => {
    it('should return 200 if the registration passed', (done) =>{
        chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send(userSignup1)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });

    it('should return 400 if the user with that email exist', (done) =>{
        chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send(userSignup1)
        .end((err, res) => {
            res.should.have.status(400);
            done();
        });
    });

    it('should return 400 if the body is invalid', (done) => {
        chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send(userSignup2)
        .end((err, res) => {
            res.should.have.status(400);
            done(); 
        });
    });
});

describe('test signin', () => {
it('should return 200 if the authentication is passed', (done) => {
chai
.request(server)
.post('/api/v1/auth/signin')
.send(userSignin1)
.end((err, res) => {
res.should.have.status(200);
done();
});
});
it('should return 400 if the user doesnt exist', (done) => {
    chai
    .request(server)
    .post('/api/v1/auth/signin')
    .send(userSignin2)
    .end((err, res) => {
        res.should.have.status(400);
        done();
    });
})
});

