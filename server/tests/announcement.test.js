import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import {userSignup3, userSignin3, adminSignin, announceTest} from './testData';


chai.use(chaiHttp);
chai.should();

describe('test register', () => {
    it('should return 201 if the user advertiser registration passed', (done) =>{
        chai
        .request(server)
        .post('/api/v2/auth/signup')
        .send(userSignup3)
        .end((err, res) => {
            res.should.have.status(201);
            done();
        });
    });
});
describe('test create announcement', () => {
    let userToken = '';
	before('check if user auth token available', (done) => {
		chai
		.request(server)
		.post('/api/v2/auth/signin')
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
        .post('/api/v2/announcement')
        .send(announceTest)
        .set('Authorization', userToken)
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
        .post('/api/v2/announcement')
        .send(announceTest1)
        .set('Authorization', userToken)
        .end((err, res) => {
            res.should.have.status(400);
            done();
        });
    });


    it('should return 401 if token is undefined', (done) => {
        userToken = '';
        chai
        .request(server)
        .post('/api/v2/announcement')
        .send(announceTest)
        .set('Authorization', userToken)
        .end((err, res) => {
            res.should.have.status(401);
            done();
        });
    });

    it('should return 401 if token not valid', (done) => {
        userToken = 'a';
        chai
        .request(server)
        .post('/api/v2/announcement')
        .send(announceTest)
        .set('Authorization', userToken)
        .end((err, res) => {
            res.should.have.status(401);
            done();
        });
    });

});

describe('test announcement update', () => {
    let userToken = '';
	before('check if user auth token available', (done) => {
		chai
		.request(server)
		.post('/api/v2/auth/signin')
		.send(userSignin3)
		.end((err, res) => {
			userToken = res.body.data.token;
			res.should.have.status(200);
			done();
		});
    });

    it('should return 200 if update announcement pass', function(done) {
        chai
        .request(server)
        .put('/api/v2/announcement/' + 1)
        .send({
                text: 'announcement new update'
           })
        .set('Authorization', userToken)
        .end(function(err, res) {
            res.should.have.status(200);
            done();
            });
    });

    it('should return 400 if announcement id does not match with the authenticated user', function(done) {
        chai
        .request(server)
        .put('/api/v2/announcement/' + 0)
        .send({
                text: 'announcement new update'
           })
        .set('Authorization', userToken)
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
		.post('/api/v2/auth/signin')
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
        .get('/api/v2/announcements/' + 1 + '/')
        .set('Authorization', userToken)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });

    it('should return announcement for specific state', done => {
        chai
        .request(server)
        .get(`/api/v2/announcements/${1}?status=pending`)
        .set('Authorization', userToken)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });

    it('should return 200 if viewing specifically passed', done => {
        chai
        .request(server)
        .get('/api/v2/announcement/' + 1)
        .set('Authorization', userToken)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});

describe('user admin announcement test', () => {
    let adminToken = '';
	before('check if user auth token available', (done) => {
		chai
		.request(server)
		.post('/api/v2/auth/signin')
		.send(adminSignin)
		.end((err, res) => {
			adminToken = res.body.data.token;
			res.should.have.status(200);
			done();
		});
    });

    it('should return 200 if id provided to be deleted pass', done => {
        chai
        .request(server)
        .delete('/api/v2/announcement/' + 1)
        .set('Authorization', adminToken)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });

    it('should return 400 if id provided to be deleted doesnt match', done => {
        chai
        .request(server)
        .delete('/api/v2/announcement/' + 0)
        .set('Authorization', adminToken)
        .end((err, res) => {
            res.should.have.status(400);
            done();
        });
    });
});