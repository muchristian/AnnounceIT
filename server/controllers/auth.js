import Model from '../models/index.dbquery';
import Utils from '../helpers/utils';
const user = new Model('users');

const createUser = async (req, res) => {
        const {first_name, last_name, email, password, phone_number, address} = req.body;
try{
    let passHash = await Utils.hashPassword(password);
    const mail = await user.selectByColWhere('email',
           'email=$1',
            [email]);
          if(mail.rowCount > 0){
            return res.status(409).send({
              status:409,
              err:"user already exist"
            });
          }
  const newUser = await user.insert('first_name, last_name, email, password, phone_number, address',
   '$1, $2, $3, $4, $5, $6',
   [first_name, last_name, email, passHash, phone_number, address]);
  if(newUser.rowCount == 0){
    throw 'unsuccessful register';
  }
    return res.status(201).send({
      status: 201,
      data:[{
          token: await Utils.jwtSigner({id:newUser.rows[0].id, email:newUser.rows[0].email}),
          user: {
              first_name:newUser.rows[0].first_name,
              last_name:newUser.rows[0].last_name,
              email:newUser.rows[0].email,
              phone_number:newUser.rows[0].phone_number
          }
      }],

  });
}catch(error){
    return res.status(400).send({
        status:400,
        error: error
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



export { createUser };