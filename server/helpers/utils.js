import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import key from '../config/constants';

export default class Utils {


    static jwtSigner(payload) {
        return jwt.sign(payload, key.JwtPrivateKey, { expiresIn: '24h' });
    }



    static jwtVerify(token, Jkey){
        return jwt.verify(token, Jkey);
    }



     
    static hashPassword(password) {
        const pwd = bcrypt.hashSync(password, 10);
        return pwd;
    }

    static pwdCompare(body, pass){
        return bcrypt.compareSync(body, pass);
    }

    
}