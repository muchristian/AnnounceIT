import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import {userSignup1, userSignup2} from './testData';
import Model from '../models/index.dbquery';
const user = new Model('users');

chai.use(chaiHttp);
chai.should();

describe('test signup', () => {
    before('it should truncate users table', async () =>{
		try{
			await user.truncate();
		}catch(err){
			throw err;
		}
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
    it('should return 201 if the registration passed', (done) =>{
        chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send(userSignup1)
        .end((err, res) => {
            res.should.have.status(201);
            done();
        });
    });
});

    describe('check if email exist', () => {
        it('should return 409 if the user with that email exist', (done) =>{
            chai
            .request(server)
            .post('/api/v1/auth/signup')
            .send(userSignup1)
            .end((err, res) => {
                res.should.have.status(409);
                done();
            });
        });
    });
    

    


