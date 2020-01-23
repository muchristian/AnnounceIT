import Utils from '../helpers/utils';
import key from '../config/constants';

const userVerify = async (req, res, next) => {
    const token  = req.header('auth-token');
    if(!token){
        return res.status(401).send("access denied please!");
    }

    try{
        const decode = await Utils.jwtVerify(token, key.JwtPrivateKey);
        req.token = decode;
        return next();
    }
    catch(err){
        return res.status(403).send("forbidden");
    }

}

export { userVerify };