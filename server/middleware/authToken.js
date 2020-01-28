import Utils from '../helpers/utils';
import key from '../config/constants';

const userVerify = async (req, res, next) => {
    const token  = req.header('Authorization');
    if(!token){
        return res.status(401).json({
            status:401,
            message:'access denied please'
        });
    }

    try{
        const decode = await Utils.jwtVerify(token, key.JwtPrivateKey);
        req.token = decode;
        return next();
    }
    catch(err){
        return res.status(400).json({
            status:400,
            message:'forbidden'
        });
    }

}

const isadminVerify = async (req, res, next) => {
    const { is_admin } = req.token;
    if(is_admin == false){
        return res.status(401).json({
            status:401,
            message:'access denied as admin'
        });
    }
    next();
}

export { userVerify, isadminVerify };