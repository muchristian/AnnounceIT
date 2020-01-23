import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import {userSignup3, userSignin3, announceTest} from './testData';

chai.use(chaiHttp);
chai.should();

describe('test register', () => {
    it('should return 200 if the registration passed', (done) =>{
        chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send(userSignup3)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});
describe('test create announcement', () => {
    let userToken = '';
	before('check if user auth token available', (done) => {
		chai
		.request(server)
		.post('/api/v1/auth/signin')
		.send(userSignin3)
		.end((err, res) => {
			userToken = res.body.data.token;
			res.should.have.status(200);
			done();
		});
    });
    
    it('should return 200 if creation of announcement passed', (done) => {
        chai
        .request(server)
        .post('/api/v1/announcement')
        .send(announceTest)
        .set('auth-token', userToken)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
    
    it('should return 400 if announcement body not valid', (done) => {
        const announceTest1 = {
            text: ''
        }
        chai
        .request(server)
        .post('/api/v1/announcement')
        .send(announceTest1)
        .set('auth-token', userToken)
        .end((err, res) => {
            res.should.have.status(400);
            done();
        });
    });


    it('should return 401 if token is undefined', (done) => {
        userToken = '';
        chai
        .request(server)
        .post('/api/v1/announcement')
        .send(announceTest)
        .set('auth-token', userToken)
        .end((err, res) => {
            res.should.have.status(401);
            done();
        });
    });

    it('should return 403 if token not valid', (done) => {
        userToken = 'a';
        chai
        .request(server)
        .post('/api/v1/announcement')
        .send(announceTest)
        .set('auth-token', userToken)
        .end((err, res) => {
            res.should.have.status(403);
            done();
        });
    });

});

describe('test announcement update', () => {
    let userToken = '';
	before('check if user auth token available', (done) => {
		chai
		.request(server)
		.post('/api/v1/auth/signin')
		.send(userSignin3)
		.end((err, res) => {
			userToken = res.body.data.token;
			res.should.have.status(200);
			done();
		});
    });
    it('update announcement', function(done) {
        chai
        .request(server)
        .put('/api/v1/announcement/' + 1)
        .send({
                text: 'announcement new update'
           })
        .set('auth-token', userToken)
        .end(function(err, res) {
            res.should.have.status(200);
            done();
            });
    });

    it('update announcement', function(done) {
        chai
        .request(server)
        .put('/api/v1/announcement/' + 0)
        .send({
                text: 'announcement new update'
           })
        .set('auth-token', userToken)
        .end(function(err, res) {
            res.should.have.status(400);
            done();
            });
    });
});


describe('test GET announcement', () => {
    let userToken = '';
	before('check if user auth token available', (done) => {
		chai
		.request(server)
		.post('/api/v1/auth/signin')
		.send(userSignin3)
		.end((err, res) => {
			userToken = res.body.data.token;
			res.should.have.status(200);
			done();
		});
    });

    it('should return 200 if all his/her announcement are outputed', (done) => {
        chai
        .request(server)
        .get('/api/v1/announcement/' + 1)
        .set('auth-token', userToken)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });

    it('should return 400 if his/her id doesnot exist', (done) => {
        chai
        .request(server)
        .get('/api/v1/announcement/' + 0)
        .set('auth-token', userToken)
        .end((err, res) => {
            res.should.have.status(400);
            done();
        });
    });

    it('should return 200 if provided id to view announcement pass', done => {
        chai
        .request(server)
        .get('/api/v1/announcement-id/' + 1)
        .set('auth-token', userToken)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });

    it('should return 400 if provided id to view announcement does not pass', done => {
        chai
        .request(server)
        .get('/api/v1/announcement-id/' + 0)
        .set('auth-token', userToken)
        .end((err, res) => {
            res.should.have.status(400);
            done();
        });
    });

    it('should return 200 if id provided to be deleted pass', done => {
        chai
        .request(server)
        .delete('/api/v1/announcement/' + 1)
        .set('auth-token', userToken)
        .end((err, res) => {
            res.should.have.status(200)
            done();
        });
    });

    it('should return 400 if id provided to be deleted doesnt match', done => {
        chai
        .request(server)
        .delete('/api/v1/announcement/' + 0)
        .set('auth-token', userToken)
        .end((err, res) => {
            res.should.have.status(400)
            done();
        });
    });
});