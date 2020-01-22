import { users } from '../models';
import Utils from '../helpers/utils';

const createUser = async (req, res) => {
    try {
        const user = {id:users.length + 1, ...req.body};
        user.password = await Utils.hashPassword(user.password);
        users.find((o) => {
            if(o.email == user.email){
                throw "user already exist";
            }
        });
        users.push(user);
            return res.status(200).json({
                status: 'success',
                data: {
                    token: Utils.jwtSigner({ id:user.id, email:user.email }),
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                }
            });
        
    }
    catch(error) {
        return res.status(400).json({
            status:'error',
            error:error
            
        });
    }
};

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await users.find(u => u.email == email);
        if(!user){
            throw 'user doesnt exist';
        }
         Utils.pwdCompare(password, user.password);
        return res.status(200).json({
            status: 'success',
            data: {
                token: Utils.jwtSigner({ id:user.id, email:user.email, is_admin:user.is_admin }),
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            }
        });
    } catch(error){
        return res.status(400).json({
            status:'error',
            error:error
            
        });
    }
}



export { createUser, loginUser };