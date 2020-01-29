import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import {userSignup1, userSignup2, userSignin1, userSignin2} from './testData';
import Model from '../models/index.dbquery';
import Utils from '../helpers/utils'
const user = new Model('users');

chai.use(chaiHttp);
chai.should();

describe('test signup', () => {
    before('it should truncate users table', async () =>{
		try{
            const pwd = 'admin123';
        let hashPwd = Utils.hashPassword(pwd);
        const truncate = await user.truncate();
            if(truncate){
                user.insert('first_name, last_name, email, password, phone_number, address, is_admin',
                '$1, $2, $3, $4, $5, $6, $7',
                ['chris', 'admin', 'admin@mail.com', `${hashPwd}`, '0786756493', 'kigali', true]);
            }
		}catch(err){
			throw err;
		}
    });
    it('should return 400 if the body is invalid', (done) => {
        chai
        .request(server)
        .post('/api/v2/auth/signup')
        .send(userSignup2)
        .end((err, res) => {
            res.should.have.status(400);
            done(); 
        });
    });
    it('should return 201 if the registration passed', (done) =>{
        chai
        .request(server)
        .post('/api/v2/auth/signup')
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
            .post('/api/v2/auth/signup')
            .send(userSignup1)
            .end((err, res) => {
                res.should.have.status(409);
                done();
            });
        });
    });

    describe('test signin', () => {
        it('should return 200 if the authentication is passed', (done) => {
        chai
        .request(server)
        .post('/api/v2/auth/signin')
        .send(userSignin1)
        .end((err, res) => {
        res.should.have.status(200);
        done();
        });
        });
        it('should return 400 if the user doesnt exist', (done) => {
            chai
            .request(server)
            .post('/api/v2/auth/signin')
            .send(userSignin2)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
        })
        });
    

    


